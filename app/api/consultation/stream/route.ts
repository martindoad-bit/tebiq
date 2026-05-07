import { matchFactCards, type FactCardMatch } from '@/lib/answer/fact-layer/matcher'
import { KEYWORD_BUCKETS, STATUS_LABEL_INITIAL_DEFAULT } from '@/lib/answer/intent/keyword-buckets'
import { matchBuckets, topBucket } from '@/lib/answer/intent/match-buckets'
import {
  CONSULTATION_ALPHA_MODEL,
  CONSULTATION_ALPHA_PROMPT_VERSION,
  buildConsultationMessages,
} from '@/lib/answer/prompt/consultation-alpha-v1'
import { anchorsToPromptContext, matchAnchors } from '@/lib/consultation/fact-anchors'
import { createForbiddenFilter } from '@/lib/consultation/forbidden-phrases'
import { detectRiskKeywords } from '@/lib/consultation/risk-keywords'
import {
  CONSULTATION_TIMEOUT_FALLBACK_TEXT,
  CONSULTATION_TIMING,
  formatConsultationFrame,
  type ConsultationEvent,
  type ConsultationFactCardAuditEntry,
} from '@/lib/consultation/stream-protocol'
import {
  completeAiConsultation,
  createAiConsultation,
  failAiConsultation,
  markFirstToken,
} from '@/lib/db/queries/aiConsultations'

// POST /api/consultation/stream
//
// 1.0 Alpha streaming consultation endpoint (Issue #39 / Work Packet
// WORKSTREAM_1_0_STREAMING_CONSULTATION_PACK §3 / §4).
//
// Request body:
//   { question: string, image_summary?: string }
//
// Response: text/event-stream with frames defined in
// lib/consultation/stream-protocol.ts. The client (POST + ReadableStream
// consumer) parses these and renders the streaming answer + lifecycle
// events.
//
// Pipeline:
//   1. Create ai_consultations row with status='streaming'
//   2. Detect risk keywords → emit 'received' + (optional) 'risk_hint'
//   3. Open DS V4 Pro stream connection (POST + stream:true)
//   4. As DS chunks arrive:
//        - Pass through createForbiddenFilter (redacts 7 banned phrases)
//        - Emit 'first_token' once (with first_token_latency_ms)
//        - Emit 'answer_chunk' for each filtered chunk
//        - Append filtered chunk to ai_answer_text in DB (live tail)
//   5. On DS done: emit 'completed', persist final + redactions count
//   6. On 90s hard timeout: emit 'timeout' with voice-canonical fallback,
//      mark partial_answer_saved if any tokens already arrived
//   7. On non-timeout error: emit 'failed', mark failed
//
// Strict invariants (Pack §3 + §10):
//   - DS raw text never reaches the client unfiltered
//   - On any timeout/failure, NEVER fall through to legacy_seed matcher
//     (the bug PR #38 fixed for /api/questions; here we don't even call
//     that pipeline — we go straight to fallback text)
//   - prompt_version='consultation_alpha_v1' / model='deepseek-v4-pro'
//     persisted on every row
//
// Internal-only env gate? No. The Charter says Alpha goes to
// limited-URL real users. We don't gate by EVAL_LAB_ENABLED — that's
// internal-tool-only. We DO require DEEPSEEK_API_KEY at runtime.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// 120s ceiling so the server's 90s timer fires cleanly before Vercel
// kills the function. Hobby plan caps at 60s; if deploy rejects, GM
// should upgrade to Pro (Charter §9 — Alpha is limited release, lower
// volume than 100Q M3-C batch but needs the full streaming budget).
export const maxDuration = 300

const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const TEMPERATURE = 0.3
const MAX_TOKENS = 1200

// 0.6 ENGINE Pack 1: routing_status `specific` layer fires after this
// delay if first_token still hasn't arrived. PL §3 spec: "3-5s 仍无正文";
// 3000ms is the lower bound for the most informative UX.
const ROUTING_STATUS_SPECIFIC_DELAY_MS = 3000

interface ReqBody {
  question?: string
  image_summary?: string | null
  /** Synthetic ref like 'bedrock://<sha256-prefix>'. The raw bytes are NOT
   * stored anywhere; this is only a dedup / observability marker. Set by
   * /api/consultation/upload (Issue #40 Photo Lite). */
  image_storage_ref?: string | null
  /** Optional cookie-derived viewer id. Persisted for /me/consultations scoping. */
  viewer_id?: string | null
}

export async function POST(req: Request) {
  let body: ReqBody
  try {
    body = (await req.json()) as ReqBody
  } catch {
    return new Response(JSON.stringify({ error: 'bad_request' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
  const question = (body.question ?? '').trim()
  if (!question) {
    return new Response(JSON.stringify({ error: 'missing_question' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
  if (question.length > 4000) {
    return new Response(JSON.stringify({ error: 'question_too_long' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'deepseek_disabled', detail: 'DEEPSEEK_API_KEY not set' }),
      { status: 503, headers: { 'content-type': 'application/json' } },
    )
  }

  // Resolve viewer id from body or cookie. Cookie takes precedence so
  // a tampered body can't impersonate. For Alpha we use the simple
  // 'tebiq_viewer' cookie set by the entry page; missing → null.
  const cookie = req.headers.get('cookie') ?? ''
  const cookieViewer = parseCookie(cookie, 'tebiq_viewer')
  const viewerId = cookieViewer ?? body.viewer_id ?? null

  // Risk keywords run on the user input synchronously — no LLM needed.
  const riskHits = detectRiskKeywords(question)

  // Fact-anchor matching (Issue #54 / 0.5 Sprint Workstream D). Pure
  // substring keyword match across 15 anchors transcribed from
  // docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md. Each match seeds prompt
  // context AND records the anchor_id list in fact_anchor_ids for the
  // Learning Console row.
  const trimmedImageSummary = (body.image_summary ?? '').trim()
  const matchedAnchors = matchAnchors(question, trimmedImageSummary || null)
  const anchorIds = matchedAnchors.map(a => a.anchorId)

  // 0.6 Sprint Workstream B (ENGINE Pack 1): keyword-bucket routing.
  // Run synchronously alongside risk + anchor scans so the UI can show
  // "正在核对 X、Y、Z" the moment `received` lands. The bucket scan
  // matches against question only — image summary is intentionally
  // excluded here because the routing label is about the user's
  // residency-status intent, not the document context.
  const bucketMatches = matchBuckets(question)
  const bucketTop = topBucket(bucketMatches)

  // 0.6 Sprint Workstream C (ENGINE Pack 2.2): fact-layer matcher.
  // Kick off the DB read NOW (before stream open) so its latency hides
  // under the routing_status `initial` emission and the DS connect
  // setup. We await the result inside the stream body, just before
  // assembling the LLM messages. The `FACT_LAYER_ENABLED` env flag is
  // the kill switch — when unset/false, the matcher is never called and
  // the stream behaves exactly as Pack 1 + 2.1 (zero user-facing diff).
  const factLayerEnabled = process.env.FACT_LAYER_ENABLED === 'true'
  // matchFactCards returns a Promise; not awaited here so it runs in
  // parallel with the routing_status emission below.
  const factMatchesPromise: Promise<FactCardMatch[]> = factLayerEnabled
    ? matchFactCards(question).catch(err => {
        // Fail soft: log and proceed with empty matches. Pack §"何时停下"
        // doesn't gate matcher errors — they shouldn't block answers.
        console.warn('[consultation/stream] matchFactCards failed', err)
        return [] as FactCardMatch[]
      })
    : Promise.resolve([] as FactCardMatch[])

  // Create the row before opening the stream so the consultation_id is
  // emitted in the very first 'received' frame.
  // Issue #60: pass the live prompt-version + model constants so the DB
  // row reflects what the LLM actually saw. Without this, the schema
  // default ('consultation_alpha_v1') was being written even when the
  // route had been bumped to v2 — the Learning Console showed stale
  // version data.
  const consultation = await createAiConsultation({
    viewerId,
    userQuestionText: question,
    hasImage: trimmedImageSummary.length > 0,
    imageSummary: trimmedImageSummary || null,
    imageStorageRef: body.image_storage_ref?.slice(0, 240) ?? null,
    riskKeywordHits: riskHits,
    factAnchorIds: anchorIds,
    promptVersion: CONSULTATION_ALPHA_PROMPT_VERSION,
    model: CONSULTATION_ALPHA_MODEL,
  })

  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false
      let firstTokenSeen = false
      let stillGeneratingEmitted = false
      let totalText = '' // for final persistence
      const filter = createForbiddenFilter()
      // 0.6 Pack 2.2: declared up here so the timeout/fail closures
      // (fireTimeout below) capture by reference. Filled in below
      // after `await factMatchesPromise` resolves.
      let factCardIds: string[] = []
      let factCardAudit: ConsultationFactCardAuditEntry[] = []

      const close = () => {
        if (closed) return
        closed = true
        try { controller.close() } catch { /* already closed */ }
      }
      const emit = (event: ConsultationEvent) => {
        if (closed) return
        try {
          controller.enqueue(encoder.encode(formatConsultationFrame(event)))
        } catch {
          closed = true
        }
      }

      // 1. received — immediately
      emit({ event: 'received', ts: Date.now(), consultation_id: consultation.id })

      // 2. risk_hint — fire when any keyword matched
      if (riskHits.length > 0) {
        emit({ event: 'risk_hint', ts: Date.now(), risk_keyword_hits: riskHits })
      }

      // 2b. routing_status (initial) — 0.6 ENGINE Pack 1 / Workstream B.
      // Fired immediately after received/risk_hint when matchBuckets
      // returned ANY buckets. Status label is the shared 0-1s default;
      // the bucket id list is included so a multi-bucket UI can show
      // "经营管理 + 年金 + 技人国" while the model is thinking. Skipped
      // entirely on zero matches (e.g. small-talk / off-topic input).
      if (bucketMatches.length > 0) {
        emit({
          event: 'routing_status',
          ts: Date.now(),
          level: 'initial',
          buckets: bucketMatches.map(m => m.bucket_id),
          status_label: STATUS_LABEL_INITIAL_DEFAULT,
        })
      }

      // 2c. routing_status (specific) — 3000ms timer.
      // Fires only when first_token still hasn't arrived after 3000ms
      // AND there's a top-1 bucket. Uses that bucket's
      // status_label_specific so the UI surfaces a more concrete
      // "正在核对经营管理、在留资格变更和当前基准。" line.
      // Cancelled when first_token lands or stream ends.
      let routingSpecificTimer: NodeJS.Timeout | null = null
      if (bucketTop) {
        routingSpecificTimer = setTimeout(() => {
          if (firstTokenSeen || closed) return
          const topBucketDef = KEYWORD_BUCKETS[bucketTop.bucket_id]
          emit({
            event: 'routing_status',
            ts: Date.now(),
            level: 'specific',
            buckets: bucketMatches.map(m => m.bucket_id),
            status_label: topBucketDef.status_label_specific,
          })
        }, ROUTING_STATUS_SPECIFIC_DELAY_MS)
      }

      // 3. still_generating watchdog (25s)
      const stillGenTimer = setTimeout(() => {
        if (!firstTokenSeen && !closed) {
          emit({ event: 'still_generating', ts: Date.now() })
          stillGeneratingEmitted = true
        }
      }, CONSULTATION_TIMING.still_generating_at_ms)

      // 4. timeout watchdog — Polish Sprint v0.2 hotfix (PL bug 2026-05-06).
      //
      // Original 90s wall-clock hard cap was aborting productive long
      // answers mid-stream. New design uses idle detection:
      //
      //   - If NO first_token by hard_timeout_ms (90s) → real timeout
      //   - Once chunks are flowing → reset timer to idle_after_chunk_ms
      //     (60s) on each chunk. Only fires if NO new chunk for 60s.
      //   - Wall clock cap (270s) as ultimate safety, set once on stream
      //     start, never reset. Stays under Vercel maxDuration=300.
      //
      // On timeout fire, branch on partial.length to set status:
      //   - partial.length > 0 → completion_status='partial' (UI shows
      //     "回答可能不完整", NOT [降级回答])
      //   - partial.length === 0 → completion_status='timeout' (UI shows
      //     [降级回答] canonical fallback copy)
      let hardTimedOut = false

      async function fireTimeout(triggerReason: string) {
        if (closed || hardTimedOut) return
        hardTimedOut = true
        try { dsAbort.abort() } catch { /* ignore */ }
        const partial = totalText
        const hasPartial = partial.length > 0
        const status: 'partial' | 'timeout' = hasPartial ? 'partial' : 'timeout'
        const reason = hasPartial ? `${triggerReason}_with_partial` : `${triggerReason}_no_partial`
        emit({
          event: 'timeout',
          ts: Date.now(),
          partial_answer_saved: hasPartial,
          fallback_text: CONSULTATION_TIMEOUT_FALLBACK_TEXT,
          completion_status: status,
        })
        try {
          await failAiConsultation({
            id: consultation.id,
            status,
            reason,
            partialText: hasPartial ? partial : null,
            factCardIds,
            factCardAudit,
          })
        } catch (err) {
          console.warn('[consultation/stream] failAiConsultation persist failed', err)
        }
        close()
      }

      // Pre-first-token deadline (90s); replaced by idle timer once first chunk arrives.
      let hardTimer: NodeJS.Timeout = setTimeout(
        () => { void fireTimeout('hard_timeout_pre_first_token_90s') },
        CONSULTATION_TIMING.hard_timeout_ms,
      )

      // Post-first-token idle reset: each chunk resets the timer to 60s.
      // Productive long answers extend naturally; truly stuck streams fire after 60s idle.
      function resetIdleTimer() {
        clearTimeout(hardTimer)
        hardTimer = setTimeout(
          () => { void fireTimeout('hard_timeout_idle_60s') },
          CONSULTATION_TIMING.idle_after_chunk_ms,
        )
      }

      // Wall clock ultimate cap (270s) — never reset. Below Vercel maxDuration=300.
      const wallClockTimer = setTimeout(
        () => { void fireTimeout('hard_timeout_wall_clock_270s') },
        CONSULTATION_TIMING.wall_clock_cap_ms,
      )

      // 4b. fact_cards_injected (0.6 ENGINE Pack 2.2 / Workstream C).
      //
      // Resolve the matcher promise that was kicked off pre-stream.
      // Build the audit payload + the fact-block system message, emit
      // the SSE event, and stash the audit for terminal-write
      // persistence. When FACT_LAYER_ENABLED=false, factMatches is `[]`
      // and we never emit the SSE event nor add a system message —
      // bit-for-bit identical to Pack 1 + 2.1 behavior.
      const factMatches = await factMatchesPromise
      const todayIso = new Date().toISOString().slice(0, 10)
      factCardAudit = factMatches.map(m => ({
        fact_id: m.fact_id,
        fact_card_state: m.state,
        risk_level: m.risk_level,
        confidence: m.confidence,
        source_quality: m.source_quality,
        official_sources: m.official_sources,
        // Pack §5 reserves `injected_fields` for direct_fact_field names.
        // The Pack 2.1 schema doesn't surface those (no column on
        // fact_cards table); a future migration may add them. For now
        // the audit row carries an empty array on every decision so the
        // shape is stable and consumers don't need to handle `undefined`.
        injected_fields: [],
        needs_review_flags: m.needs_review_flags,
        decision: m.decision,
      }))
      factCardIds = factMatches.map(m => m.fact_id)
      // Build the fact-block system message text from the inject-decision
      // cards. Each card contributes one block separated by a divider so
      // the LLM treats them as discrete cited sources, not blended prose.
      const injectBlocks = factMatches
        .filter(m => m.decision === 'inject')
        .map(m => m.injection_certain_block.replaceAll('{{TODAY_ISO}}', todayIso))
      const factSystemMessage = injectBlocks.length > 0
        ? injectBlocks.join('\n\n---\n\n')
        : null
      // Always emit the SSE event when fact-layer is enabled, even with
      // zero matches — gives the UI a positive "we checked" signal so
      // the absence of matches isn't ambiguous with "feature off".
      // When the feature is off we skip the event entirely (Pack 2.2
      // §"不能做什么": "FACT_LAYER_ENABLED=false 时影响任何 user-facing 行为").
      if (factLayerEnabled) {
        emit({ event: 'fact_cards_injected', ts: Date.now(), items: factCardAudit })
      }

      // 5. Open DS streaming connection
      const dsAbort = new AbortController()
      const baseMessages = buildConsultationMessages({
        userQuestion: question,
        imageSummary: body.image_summary ?? null,
        // Issue #54: fact-anchor injection. Empty array when no anchor
        // triggers fired; the prompt builder only emits the anchor
        // system message when factAnchors.length > 0.
        factAnchors: anchorsToPromptContext(matchedAnchors),
      })
      // 0.6 Pack 2.2: append the fact-card system message AFTER the
      // anchor block so the LLM reads them in priority order:
      //   (1) base voice prompt
      //   (2) image summary (if any)
      //   (3) fact anchors (DOMAIN-curated soft guidance)
      //   (4) fact cards (FACT-published hard facts) — most authoritative
      //   (5) user message
      // The order matters: the LLM weights later system context higher
      // when there's tension. Pack §"不能做什么" prohibits modifying the
      // alpha v1 prompt body itself, but appending an additional system
      // message is explicitly the sanctioned injection mechanism per
      // Pack §2 / design doc §"Injection point".
      const messages = factSystemMessage
        ? [
            ...baseMessages.slice(0, -1), // everything except the trailing user message
            { role: 'system' as const, content: factSystemMessage },
            baseMessages[baseMessages.length - 1], // re-append user message LAST
          ]
        : baseMessages

      try {
        const dsRes = await fetch(DEEPSEEK_ENDPOINT, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: CONSULTATION_ALPHA_MODEL,
            stream: true,
            temperature: TEMPERATURE,
            max_tokens: MAX_TOKENS,
            messages,
          }),
          signal: dsAbort.signal,
        })

        if (!dsRes.ok || !dsRes.body) {
          clearTimeout(stillGenTimer)
          clearTimeout(hardTimer)
          clearTimeout(wallClockTimer)
          if (routingSpecificTimer) clearTimeout(routingSpecificTimer)
          if (!closed) {
            emit({
              event: 'failed',
              ts: Date.now(),
              detail: `deepseek_http_${dsRes.status}`,
            })
            try {
              await failAiConsultation({
                id: consultation.id,
                status: 'failed',
                reason: `deepseek_http_${dsRes.status}`,
                partialText: null,
                factCardIds,
                factCardAudit,
              })
            } catch (err) {
              console.warn('[consultation/stream] persist on http error failed', err)
            }
            close()
          }
          return
        }

        // 6. Read DS SSE stream + relay
        const reader = dsRes.body.pipeThrough(new TextDecoderStream()).getReader()
        let dsBuf = ''

        try {
          while (!closed && !hardTimedOut) {
            const { value, done } = await reader.read()
            if (done) break
            dsBuf += value
            // DS streams SSE-style frames: "data: {...}\n\n" or "data: [DONE]\n\n"
            let nlIdx
            while ((nlIdx = dsBuf.indexOf('\n\n')) !== -1) {
              const frame = dsBuf.slice(0, nlIdx).trim()
              dsBuf = dsBuf.slice(nlIdx + 2)
              if (!frame || !frame.startsWith('data:')) continue
              const payload = frame.slice('data:'.length).trim()
              if (payload === '[DONE]') break
              try {
                const obj = JSON.parse(payload) as {
                  choices?: Array<{ delta?: { content?: string } }>
                }
                const delta = obj.choices?.[0]?.delta?.content
                if (typeof delta === 'string' && delta.length > 0) {
                  // First-token telemetry
                  if (!firstTokenSeen) {
                    firstTokenSeen = true
                    // 0.6 Pack 1: cancel routing_status `specific` timer
                    // if it hasn't fired yet — once we have first_token,
                    // the bucket-specific copy would arrive late and
                    // race the answer chunks.
                    if (routingSpecificTimer) {
                      clearTimeout(routingSpecificTimer)
                      routingSpecificTimer = null
                    }
                    const ftLatency = Date.now() - consultation.streamStartedAt!.getTime()
                    emit({
                      event: 'first_token',
                      ts: Date.now(),
                      first_token_latency_ms: ftLatency,
                    })
                    try { await markFirstToken(consultation.id) } catch (err) {
                      console.warn('[consultation/stream] markFirstToken failed', err)
                    }
                  }
                  // Filter forbidden phrases as tokens flow
                  const safeChunk = filter.push(delta)
                  if (safeChunk.length > 0) {
                    totalText += safeChunk
                    emit({ event: 'answer_chunk', ts: Date.now(), chunk: safeChunk })
                    // Reset idle timer — productive stream extends timeout (Polish v0.2 hotfix)
                    resetIdleTimer()
                    // PL hotfix 2026-05-07: per-chunk awaited appendPartialAnswer
                    // removed. Supabase pooler roundtrip ~296ms per chunk × 250 chunks
                    // = 74s of DB-bound delay that was blocking DS reader. totalText
                    // accumulates in memory and is persisted by completeAiConsultation
                    // (success path) / failAiConsultation (timeout/failure paths).
                    // Trade-off: browser disconnect mid-stream → no partial in DB.
                    // Alpha-acceptable per PL.
                  }
                }
              } catch {
                // Drop malformed frame and continue
              }
            }
          }
        } finally {
          try { reader.releaseLock() } catch { /* ignore */ }
        }

        // 7. Stream done — flush filter tail + emit completed
        if (!closed && !hardTimedOut) {
          const tail = filter.flush()
          if (tail.length > 0) {
            totalText += tail
            emit({ event: 'answer_chunk', ts: Date.now(), chunk: tail })
            // No DB write here either — completeAiConsultation below writes
            // finalAnswerText with the full totalText (incl. tail).
          }
          const redactions = filter.redactions()
          const totalLatency = Date.now() - consultation.streamStartedAt!.getTime()
          emit({
            event: 'completed',
            ts: Date.now(),
            total_latency_ms: totalLatency,
            redactions_count: redactions.length,
          })
          try {
            await completeAiConsultation({
              id: consultation.id,
              finalAnswerText: totalText,
              forbiddenRedactions: redactions.slice(),
              factCardIds,
              factCardAudit,
            })
          } catch (err) {
            console.warn('[consultation/stream] completeAiConsultation failed', err)
          }
        }
      } catch (err) {
        if (hardTimedOut) {
          // Hard timeout already emitted; don't double-emit failed.
        } else if (!closed) {
          const message = err instanceof Error ? err.message : String(err)
          emit({ event: 'failed', ts: Date.now(), detail: message.slice(0, 200) })
          try {
            await failAiConsultation({
              id: consultation.id,
              status: 'failed',
              reason: 'stream_exception',
              partialText: totalText.length > 0 ? totalText : null,
              factCardIds,
              factCardAudit,
            })
          } catch (persistErr) {
            console.warn('[consultation/stream] persist on exception failed', persistErr)
          }
        }
      } finally {
        clearTimeout(stillGenTimer)
        clearTimeout(hardTimer)
        clearTimeout(wallClockTimer)
        if (routingSpecificTimer) clearTimeout(routingSpecificTimer)
        // Suppress unused-var warnings on still_generating watchdog flag
        void stillGeneratingEmitted
        close()
      }
    },
    cancel() {
      // Reader bailed — we don't try to keep persisting; live-tail
      // already wrote what we have. No DS-cancel call (network already
      // detached).
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
      // Telemetry header so QA can observe the prompt version without
      // peering into DB. NOT used for any access control.
      'x-tebiq-prompt-version': CONSULTATION_ALPHA_PROMPT_VERSION,
      'x-tebiq-model': CONSULTATION_ALPHA_MODEL,
    },
  })
}

// ---- helpers ----

function parseCookie(cookieHeader: string, name: string): string | null {
  if (!cookieHeader) return null
  const parts = cookieHeader.split(';')
  for (const p of parts) {
    const [k, v] = p.split('=').map(s => s.trim())
    if (k === name && v) return decodeURIComponent(v)
  }
  return null
}
