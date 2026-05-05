import {
  CONSULTATION_ALPHA_MODEL,
  CONSULTATION_ALPHA_PROMPT_VERSION,
  buildConsultationMessages,
} from '@/lib/answer/prompt/consultation-alpha-v1'
import { createForbiddenFilter } from '@/lib/consultation/forbidden-phrases'
import { detectRiskKeywords } from '@/lib/consultation/risk-keywords'
import {
  CONSULTATION_TIMEOUT_FALLBACK_TEXT,
  CONSULTATION_TIMING,
  formatConsultationFrame,
  type ConsultationEvent,
} from '@/lib/consultation/stream-protocol'
import {
  appendPartialAnswer,
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
export const maxDuration = 120

const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const TEMPERATURE = 0.3
const MAX_TOKENS = 1200

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

  // Create the row before opening the stream so the consultation_id is
  // emitted in the very first 'received' frame.
  const trimmedImageSummary = (body.image_summary ?? '').trim()
  const consultation = await createAiConsultation({
    viewerId,
    userQuestionText: question,
    hasImage: trimmedImageSummary.length > 0,
    imageSummary: trimmedImageSummary || null,
    imageStorageRef: body.image_storage_ref?.slice(0, 240) ?? null,
    riskKeywordHits: riskHits,
  })

  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false
      let firstTokenSeen = false
      let stillGeneratingEmitted = false
      let totalText = '' // for final persistence
      const filter = createForbiddenFilter()

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

      // 3. still_generating watchdog (25s)
      const stillGenTimer = setTimeout(() => {
        if (!firstTokenSeen && !closed) {
          emit({ event: 'still_generating', ts: Date.now() })
          stillGeneratingEmitted = true
        }
      }, CONSULTATION_TIMING.still_generating_at_ms)

      // 4. hard timeout watchdog (90s)
      let hardTimedOut = false
      const hardTimer = setTimeout(async () => {
        if (closed) return
        hardTimedOut = true
        try { dsAbort.abort() } catch { /* ignore */ }
        const partial = totalText
        // Emit voice-canonical timeout frame (NEVER falls through to legacy)
        emit({
          event: 'timeout',
          ts: Date.now(),
          partial_answer_saved: partial.length > 0,
          fallback_text: CONSULTATION_TIMEOUT_FALLBACK_TEXT,
        })
        try {
          await failAiConsultation({
            id: consultation.id,
            status: 'timeout',
            reason: 'hard_timeout_90s',
            partialText: partial.length > 0 ? partial : null,
          })
        } catch (err) {
          console.warn('[consultation/stream] failAiConsultation persist failed', err)
        }
        close()
      }, CONSULTATION_TIMING.hard_timeout_ms)

      // 5. Open DS streaming connection
      const dsAbort = new AbortController()
      const messages = buildConsultationMessages({
        userQuestion: question,
        imageSummary: body.image_summary ?? null,
        // factAnchors will land via DOMAIN Pack #42; left empty for #39.
      })

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
                    // Live-tail persistence — append to DB so a partial
                    // is captured even if the connection drops mid-stream
                    try { await appendPartialAnswer(consultation.id, safeChunk) } catch (err) {
                      console.warn('[consultation/stream] appendPartialAnswer failed', err)
                    }
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
            try { await appendPartialAnswer(consultation.id, tail) } catch { /* ignore */ }
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
            })
          } catch (persistErr) {
            console.warn('[consultation/stream] persist on exception failed', persistErr)
          }
        }
      } finally {
        clearTimeout(stillGenTimer)
        clearTimeout(hardTimer)
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
