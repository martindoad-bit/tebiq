// 0.6 Sprint Workstream D — controlled follow-up endpoint
// (ENGINE Pack 2.3).
//
// POST /api/consultation/follow-up
//
// Continues an existing consultation chain by creating a NEW
// ai_consultations row whose `parentConsultationId` points back to the
// chain root. The LLM sees ONLY the parent's persisted
// `consultation_summary` plus the user's new addition — never raw
// multi-turn history (Pack §3 invariant).
//
// Hard limits (Pack §4):
//   - Round 0       = the original /api/consultation/stream call
//   - Rounds 1..3   = follow-ups (this endpoint creates them)
//   - Round 4+      = REJECTED with `follow_up_limit_reached` SSE event
//                     before any LLM call. The chain caps at 3 follow-ups.
//
// Per-row audit invariants:
//   - Each follow-up gets its own consultation_id, latency, fact_card
//     audit, feedback, etc. Every round is independently observable.
//   - `fact_card_ids` are accumulated across the chain (this round's
//     hits ∪ parent's union) on the new row, so a chain summary view
//     can read the latest row to see all cards consulted.
//
// Sensitive zones:
//   - This endpoint does NOT modify /api/consultation/stream behavior
//     (Pack §"不能做什么").
//   - Same DS V4 Pro streaming as the stream route; it's a deliberate
//     near-duplicate with chain-specific pre/post-flight, NOT a
//     refactor of the stream route.
//   - lib/answer/prompt/consultation-alpha-v1.ts is untouched. Prior
//     summary is appended as an additional system message between the
//     base prompt and user input — same mechanism Pack 2.2 used for
//     fact_cards.

import { matchFactCards, type FactCardMatch } from '@/lib/answer/fact-layer/matcher'
import {
  FOLLOW_UP_LIMIT_MESSAGE,
  MAX_FOLLOW_UP_ROUNDS,
  PARENT_MAX_AGE_HOURS,
  ENFORCE_VIEWER_MATCH,
} from '@/lib/answer/followup/constants'
import {
  buildConsultationSummary,
  summaryAsSystemMessage,
} from '@/lib/answer/followup/summary-builder'
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
  type ConsultationSummary,
} from '@/lib/consultation/stream-protocol'
import {
  completeAiConsultation,
  createAiConsultation,
  failAiConsultation,
  getAiConsultationById,
  markFirstToken,
  setConsultationSummary,
} from '@/lib/db/queries/aiConsultations'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 300

const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const TEMPERATURE = 0.3
const MAX_TOKENS = 1200
const ROUTING_STATUS_SPECIFIC_DELAY_MS = 3000

interface ReqBody {
  parent_consultation_id?: string
  user_addition?: string
  /** Optional cookie-derived viewer id; cookie takes precedence. */
  viewer_id?: string | null
}

export async function POST(req: Request): Promise<Response> {
  let body: ReqBody
  try {
    body = (await req.json()) as ReqBody
  } catch {
    return new Response(JSON.stringify({ error: 'bad_request' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const parentId = (body.parent_consultation_id ?? '').trim()
  const userAddition = (body.user_addition ?? '').trim()
  if (!parentId) {
    return jsonError(400, 'missing_parent', 'parent_consultation_id is required')
  }
  if (!userAddition) {
    return jsonError(400, 'missing_user_addition', 'user_addition is required and must be non-empty')
  }
  if (userAddition.length > 4000) {
    return jsonError(400, 'user_addition_too_long', 'user_addition must be ≤ 4000 chars')
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return jsonError(503, 'deepseek_disabled', 'DEEPSEEK_API_KEY not set')
  }

  const cookie = req.headers.get('cookie') ?? ''
  const cookieViewer = parseCookie(cookie, 'tebiq_viewer')
  const viewerId = cookieViewer ?? body.viewer_id ?? null

  // ---- Pre-flight: load parent + cap check ----
  const parent = await getAiConsultationById(parentId)
  if (!parent) {
    return jsonError(404, 'parent_not_found', `parent_consultation_id ${parentId} not found`)
  }

  // Resolve the chain root. The parent might itself be a follow-up;
  // walk one level up to the root.
  const rootId = parent.parentConsultationId ?? parent.id
  const root = parent.parentConsultationId
    ? (await getAiConsultationById(rootId)) ?? parent
    : parent

  // Viewer-match abuse guard. When both parent + caller carry a viewer
  // cookie, they must match. NULL cookies on either side bypass the
  // check (Alpha allows anonymous flow).
  if (
    ENFORCE_VIEWER_MATCH &&
    viewerId &&
    parent.viewerId &&
    parent.viewerId !== viewerId
  ) {
    return jsonError(403, 'viewer_mismatch', 'viewer cookie does not match parent consultation')
  }

  // Age guard. Refuse follow-ups against very old chains so a leaked
  // consultation_id can't revive a year-old chain.
  const parentAgeMs = Date.now() - new Date(parent.createdAt).getTime()
  if (parentAgeMs > PARENT_MAX_AGE_HOURS * 3600 * 1000) {
    return jsonError(
      410,
      'parent_too_old',
      `parent consultation older than ${PARENT_MAX_AGE_HOURS}h; start a new question`,
    )
  }

  // The parent's followUpCount is the round index of the parent itself;
  // this new round is parent.followUpCount + 1.
  const newFollowUpCount = (parent.followUpCount ?? 0) + 1

  if (newFollowUpCount > MAX_FOLLOW_UP_ROUNDS) {
    // Cap reached: emit follow_up_limit_reached + completed and close.
    // No DB row is created, no LLM call. CODEXUI Workstream D-UI
    // renders the message into a "save / find a human / new question"
    // CTA screen.
    return streamLimitReached(parent.followUpCount ?? 0)
  }

  // ---- Pre-stream: synchronous scans (risk / anchors / buckets / facts) ----
  const riskHits = detectRiskKeywords(userAddition)
  const matchedAnchors = matchAnchors(userAddition, null)
  const anchorIds = matchedAnchors.map(a => a.anchorId)
  const bucketMatches = matchBuckets(userAddition)
  const bucketTop = topBucket(bucketMatches)

  // Fact-layer matcher (Pack 2.2). Per Pack 2.3 §5: matcher input
  // includes summary.user_goal + known_facts + latest_user_addition,
  // NOT the raw history.
  const priorSummary = parsePriorSummary(parent.consultationSummary)
  const matcherInput = composeMatcherInput(priorSummary, userAddition)
  const factLayerEnabled = process.env.FACT_LAYER_ENABLED === 'true'
  const factMatchesPromise: Promise<FactCardMatch[]> = factLayerEnabled
    ? matchFactCards(matcherInput).catch(err => {
        console.warn('[consultation/follow-up] matchFactCards failed', err)
        return [] as FactCardMatch[]
      })
    : Promise.resolve([])

  // ---- Persist new row BEFORE opening the stream ----
  // Cross-round factCardIds union is finalized at completion time
  // (we union parent's persisted ids with this round's matches once
  // the matcher promise resolves). The row starts with parent's union
  // so even partial / timeout / failed terminations leave a record.
  const parentUnionIds = uniqueStrings(parent.factCardIds ?? [])
  const consultation = await createAiConsultation({
    viewerId,
    userQuestionText: userAddition,
    riskKeywordHits: riskHits,
    factAnchorIds: anchorIds,
    promptVersion: CONSULTATION_ALPHA_PROMPT_VERSION,
    model: CONSULTATION_ALPHA_MODEL,
    parentConsultationId: rootId,
    followUpCount: newFollowUpCount,
  })

  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false
      let firstTokenSeen = false
      let stillGeneratingEmitted = false
      let totalText = ''
      const filter = createForbiddenFilter()
      let factCardIds: string[] = parentUnionIds
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

      // 1. received
      emit({ event: 'received', ts: Date.now(), consultation_id: consultation.id })

      // 2. risk_hint
      if (riskHits.length > 0) {
        emit({ event: 'risk_hint', ts: Date.now(), risk_keyword_hits: riskHits })
      }

      // 2b. routing_status (initial)
      if (bucketMatches.length > 0) {
        emit({
          event: 'routing_status',
          ts: Date.now(),
          level: 'initial',
          buckets: bucketMatches.map(m => m.bucket_id),
          status_label: STATUS_LABEL_INITIAL_DEFAULT,
        })
      }
      let routingSpecificTimer: NodeJS.Timeout | null = null
      if (bucketTop) {
        routingSpecificTimer = setTimeout(() => {
          if (firstTokenSeen || closed) return
          const def = KEYWORD_BUCKETS[bucketTop.bucket_id]
          emit({
            event: 'routing_status',
            ts: Date.now(),
            level: 'specific',
            buckets: bucketMatches.map(m => m.bucket_id),
            status_label: def.status_label_specific,
          })
        }, ROUTING_STATUS_SPECIFIC_DELAY_MS)
      }

      // 3. still_generating watchdog
      const stillGenTimer = setTimeout(() => {
        if (!firstTokenSeen && !closed) {
          emit({ event: 'still_generating', ts: Date.now() })
          stillGeneratingEmitted = true
        }
      }, CONSULTATION_TIMING.still_generating_at_ms)

      // 4. timeout watchdogs (mirrors stream route Polish v0.2 hotfix)
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
          console.warn('[consultation/follow-up] failAiConsultation persist failed', err)
        }
        close()
      }
      let hardTimer: NodeJS.Timeout = setTimeout(
        () => { void fireTimeout('hard_timeout_pre_first_token_90s') },
        CONSULTATION_TIMING.hard_timeout_ms,
      )
      function resetIdleTimer() {
        clearTimeout(hardTimer)
        hardTimer = setTimeout(
          () => { void fireTimeout('hard_timeout_idle_60s') },
          CONSULTATION_TIMING.idle_after_chunk_ms,
        )
      }
      const wallClockTimer = setTimeout(
        () => { void fireTimeout('hard_timeout_wall_clock_270s') },
        CONSULTATION_TIMING.wall_clock_cap_ms,
      )

      // 4b. fact_cards_injected (Pack 2.2 emission, run on follow-up too)
      const factMatches = await factMatchesPromise
      const todayIso = new Date().toISOString().slice(0, 10)
      factCardAudit = factMatches.map(m => ({
        fact_id: m.fact_id,
        fact_card_state: m.state,
        risk_level: m.risk_level,
        confidence: m.confidence,
        source_quality: m.source_quality,
        official_sources: m.official_sources,
        injected_fields: [],
        needs_review_flags: m.needs_review_flags,
        decision: m.decision,
      }))
      // Cross-round union: merge parent's persisted ids with this
      // round's matches (Pack §5).
      factCardIds = uniqueStrings([...parentUnionIds, ...factMatches.map(m => m.fact_id)])
      const injectBlocks = factMatches
        .filter(m => m.decision === 'inject')
        .map(m => m.injection_certain_block.replaceAll('{{TODAY_ISO}}', todayIso))
      const factSystemMessage = injectBlocks.length > 0
        ? injectBlocks.join('\n\n---\n\n')
        : null
      if (factLayerEnabled) {
        emit({ event: 'fact_cards_injected', ts: Date.now(), items: factCardAudit })
      }

      // 5. Open DS streaming connection
      const dsAbort = new AbortController()
      // Build messages: base voice prompt → image_summary (none on
      // follow-ups) → fact_anchors → fact_cards → SUMMARY (Pack 2.3) →
      // user message LAST. Summary slots in just before the user
      // message so the LLM treats it as the most-recent system
      // context, but priority below fact_cards (FACT trumps DOMAIN
      // anchor / summary on conflicts).
      const baseMessages = buildConsultationMessages({
        userQuestion: userAddition,
        imageSummary: null,
        factAnchors: anchorsToPromptContext(matchedAnchors),
      })
      const summaryMsg = summaryAsSystemMessage(priorSummary)
      const messages: Array<{ role: 'system' | 'user'; content: string }> = []
      // Slice: every system message in baseMessages...
      for (const m of baseMessages.slice(0, -1)) messages.push(m)
      if (factSystemMessage) {
        messages.push({ role: 'system', content: factSystemMessage })
      }
      if (summaryMsg) {
        messages.push(summaryMsg)
      }
      // ...then re-append the trailing user message LAST.
      messages.push(baseMessages[baseMessages.length - 1])

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
              console.warn('[consultation/follow-up] persist on http error failed', err)
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
            let nlIdx
            while ((nlIdx = dsBuf.indexOf('\n\n')) !== -1) {
              const frame = dsBuf.slice(0, nlIdx).trim()
              dsBuf = dsBuf.slice(nlIdx + 2)
              if (!frame || !frame.startsWith('data:')) continue
              const payload = frame.slice('data:'.length).trim()
              if (payload === '[DONE]') {
                continue
              }
              let obj: { choices?: Array<{ delta?: { content?: unknown } }> }
              try { obj = JSON.parse(payload) } catch { continue }
              const delta = obj.choices?.[0]?.delta?.content
              if (typeof delta === 'string' && delta.length > 0) {
                if (!firstTokenSeen) {
                  firstTokenSeen = true
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
                    console.warn('[consultation/follow-up] markFirstToken failed', err)
                  }
                }
                const safeChunk = filter.push(delta)
                if (safeChunk.length > 0) {
                  totalText += safeChunk
                  emit({ event: 'answer_chunk', ts: Date.now(), chunk: safeChunk })
                  resetIdleTimer()
                }
              }
            }
          }
        } finally {
          try { reader.releaseLock() } catch { /* ignore */ }
        }

        if (!closed && !hardTimedOut) {
          const trailing = filter.flush()
          if (trailing.length > 0) {
            totalText += trailing
            emit({ event: 'answer_chunk', ts: Date.now(), chunk: trailing })
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
            console.warn('[consultation/follow-up] completeAiConsultation failed', err)
          }
          // Update the rolling summary with this round's user addition
          // + answer. Persists onto THIS row so the next follow-up
          // reads the latest digest.
          void buildAndPersistRollingSummary({
            consultationId: consultation.id,
            rootQuestion: root.userQuestionText,
            userAddition,
            answerText: totalText,
            priorSummary,
            roundIndex: newFollowUpCount,
          })
        }
      } catch (err) {
        if (hardTimedOut) {
          // already emitted timeout
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
            console.warn('[consultation/follow-up] persist on exception failed', persistErr)
          }
        }
      } finally {
        clearTimeout(stillGenTimer)
        clearTimeout(hardTimer)
        clearTimeout(wallClockTimer)
        if (routingSpecificTimer) clearTimeout(routingSpecificTimer)
        void stillGeneratingEmitted
        close()
      }
    },
    cancel() {
      // Reader bailed; live state already persisted on whatever
      // terminal path fired.
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
      'x-tebiq-prompt-version': CONSULTATION_ALPHA_PROMPT_VERSION,
      'x-tebiq-model': CONSULTATION_ALPHA_MODEL,
      'x-tebiq-follow-up-round': String(newFollowUpCount),
    },
  })
}

// ---------------------------------------------------------------------------
// Limit-reached short-stream
// ---------------------------------------------------------------------------
function streamLimitReached(currentFollowUpCount: number): Response {
  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const ts = Date.now()
      controller.enqueue(
        encoder.encode(formatConsultationFrame({
          event: 'follow_up_limit_reached',
          ts,
          message: FOLLOW_UP_LIMIT_MESSAGE,
          follow_up_count: currentFollowUpCount,
        })),
      )
      // Pair with a `completed` event so client SSE parsers that key
      // on terminal events still see a clean close.
      controller.enqueue(
        encoder.encode(formatConsultationFrame({
          event: 'completed',
          ts: ts + 1,
          total_latency_ms: 0,
          redactions_count: 0,
        })),
      )
      controller.close()
    },
  })
  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
      'x-tebiq-follow-up-limit-reached': '1',
    },
  })
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function jsonError(status: number, error: string, detail?: string): Response {
  return new Response(JSON.stringify({ error, ...(detail ? { detail } : {}) }), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}

function parseCookie(cookieHeader: string, name: string): string | null {
  if (!cookieHeader) return null
  const parts = cookieHeader.split(';')
  for (const p of parts) {
    const [k, v] = p.split('=').map(s => s.trim())
    if (k === name && v) return decodeURIComponent(v)
  }
  return null
}

function uniqueStrings(arr: ReadonlyArray<string>): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const s of arr) {
    if (typeof s !== 'string' || !s) continue
    if (seen.has(s)) continue
    seen.add(s)
    out.push(s)
  }
  return out
}

/**
 * Defensive parse of `ai_consultations.consultation_summary` jsonb.
 * Older rows or rows where the digest builder failed will have null;
 * any unexpected shape returns null too. Caller treats null as "no
 * prior summary" and feeds only the latest user_addition + root
 * question to the LLM.
 */
function parsePriorSummary(raw: unknown): ConsultationSummary | null {
  if (!raw || typeof raw !== 'object') return null
  const v = raw as Record<string, unknown>
  if (typeof v.user_goal !== 'string' || v.user_goal.length === 0) return null
  return {
    user_goal: v.user_goal,
    known_facts: Array.isArray(v.known_facts)
      ? (v.known_facts as unknown[]).filter((s): s is string => typeof s === 'string')
      : [],
    missing_facts: Array.isArray(v.missing_facts)
      ? (v.missing_facts as unknown[]).filter((s): s is string => typeof s === 'string')
      : [],
    last_answer_key_points: Array.isArray(v.last_answer_key_points)
      ? (v.last_answer_key_points as unknown[]).filter((s): s is string => typeof s === 'string')
      : [],
  }
}

/**
 * Pack §5: matcher input on follow-up rounds is summary.user_goal +
 * known_facts + the user's latest addition — NOT the full multi-turn
 * history.
 */
function composeMatcherInput(
  prior: ConsultationSummary | null,
  userAddition: string,
): string {
  if (!prior) return userAddition
  const parts: string[] = [userAddition, prior.user_goal]
  for (const f of prior.known_facts ?? []) parts.push(f)
  return parts.filter(Boolean).join(' 　 ')
}

/**
 * Fire-and-forget rolling summary update that runs after the
 * follow-up's stream closes. Reads the parent's prior summary +
 * this round's user_addition + answer, calls the digest builder,
 * persists the result on THIS round's row.
 */
async function buildAndPersistRollingSummary(input: {
  consultationId: string
  rootQuestion: string
  userAddition: string
  answerText: string
  priorSummary: ConsultationSummary | null
  roundIndex: number
}): Promise<void> {
  if (!input.answerText || !input.answerText.trim()) return
  try {
    const result = await buildConsultationSummary({
      rootQuestion: input.rootQuestion,
      userMessage: input.userAddition,
      answerText: input.answerText,
      priorSummary: input.priorSummary,
      roundIndex: input.roundIndex,
    })
    if (result.summary) {
      await setConsultationSummary(input.consultationId, result.summary)
    } else if (result.fallback_reason) {
      console.warn(
        '[consultation/follow-up] rolling summary skipped:',
        result.fallback_reason,
        `(latency=${result.latency_ms}ms)`,
      )
    }
  } catch (err) {
    console.warn('[consultation/follow-up] buildAndPersistRollingSummary error', err)
  }
}
