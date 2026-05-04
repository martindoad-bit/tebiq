import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { submitQuestionForAnswer } from '@/lib/answer/submit-question'
import { REGRESSION_SET } from '@/lib/eval-lab/sample-classifier'
import { getRiskMatrixEntry } from '@/lib/eval-lab/risk-matrix-data'
import {
  SSE_TIMING,
  formatSseFrame,
  gatingReason,
  shouldStreamContent,
  type PreviewSseEvent,
  type PreviewSseEventName,
  type PreviewSseEventOf,
} from '@/lib/eval-lab/preview-stream'

// POST /api/internal/preview/stream — Workstream C SSE endpoint (Issue #32).
//
// Streams pipeline lifecycle events to /internal/preview. Body shape:
//   { question: string, starter_tag?: string | null }
//
// Why POST (not GET) for SSE: the question text can be ~4000 chars,
// well above what's safe in a query string. Browsers' `EventSource`
// only supports GET, so the client uses `fetch()` + manual SSE frame
// parsing — this route returns `text/event-stream` with `data: …\n\n`
// frames just like a standard SSE endpoint.
//
// What this route DOES emit:
//   - System lifecycle events ONLY (see PreviewSseEventName)
//   - Each event is a single JSON object with { event, ts, …meta }
//
// What this route NEVER emits:
//   - DeepSeek raw text (Work Packet §C3)
//   - Answer content (final_answer_ready carries only answer_id)
//   - Pipeline trace fields, intent reasoning, fallback raw payloads
//
// Stream gating contract:
//   - REGRESSION_SET 7 题 (Issue #18 routing-known-mis-routed) and DOMAIN
//     risk_level=HIGH ALWAYS terminate with `human_review_required`,
//     never `final_answer_ready` — even if the pipeline returned a
//     successful answer with no fallback.
//   - The pipeline still runs (so /answer/[id] exists for reviewer
//     reference), but the FE never auto-redirects the reviewer to it.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Vercel Hobby ceiling — pipeline can take up to 25s + we want to leave
// buffer for SSE frame flushes and the post-generation settle window.
export const maxDuration = 60

interface ReqBody {
  question?: string
  starter_tag?: string | null
}

export async function POST(req: Request) {
  if (!isEvalLabEnabled()) {
    // 404 — same shape the rest of /internal/eval-lab uses.
    return new Response(JSON.stringify({ error: 'not_found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    })
  }

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
  const starterTag = body.starter_tag?.trim() || null

  // Resolve gating BEFORE opening the stream — these signals are
  // available synchronously from static metadata (no LLM, no DB).
  const matrix = starterTag ? getRiskMatrixEntry(starterTag) : null
  const isRegressionSet = !!(starterTag && REGRESSION_SET.has(starterTag))
  const riskLevel = matrix?.risk_level ?? null
  const gatingHit = gatingReason(starterTag, riskLevel)

  const encoder = new TextEncoder()

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false
      const close = () => {
        if (closed) return
        closed = true
        try { controller.close() } catch { /* already closed */ }
      }
      const emit = <K extends PreviewSseEventName>(
        name: K,
        // Strip the discriminator + ts; whatever's left is the payload.
        payload: Omit<PreviewSseEventOf<K>, 'event' | 'ts'>,
      ) => {
        if (closed) return
        const event = { event: name, ts: Date.now(), ...payload } as PreviewSseEvent
        try {
          controller.enqueue(encoder.encode(formatSseFrame(event)))
        } catch {
          // Reader gone — stop attempting to enqueue.
          closed = true
        }
      }

      // 1. question_received — always first, before any work.
      emit('question_received', {})
      // 2. routing_started — about to consult risk matrix + (later) intent.
      emit('routing_started', {})
      // Yield to the event loop so the client can paint `received`/`routing`
      // before the pipeline-bound work starts.
      await new Promise<void>(r => setTimeout(r, 0))

      // 3. routing_done — we ALREADY have enough metadata from the risk
      //    matrix to declare routing complete (the LLM intent inside the
      //    pipeline is not exposed here; we'd need to refactor lib/answer
      //    for that and the Work Packet forbids it).
      emit('routing_done', { domain: matrix?.domain ?? null, risk_level: riskLevel })

      // 4. risk_detected — emitted only when there's a real signal.
      if (gatingHit) {
        emit('risk_detected', { reason: gatingHit, risk_level: riskLevel })
      }

      // 5. generation_started — pipeline call begins.
      emit('generation_started', {})

      // Run the pipeline with a 25s race.
      let result: Awaited<ReturnType<typeof submitQuestionForAnswer>> | null = null
      let timedOut = false
      let pipelineError: unknown = null
      const timer = new Promise<'__timeout__'>(resolve => {
        setTimeout(() => resolve('__timeout__'), SSE_TIMING.pipeline_timeout_ms)
      })
      try {
        const winner = await Promise.race([
          submitQuestionForAnswer({
            questionText: question,
            visaType: null,
            sourcePage: '/internal/preview',
          }),
          timer,
        ])
        if (winner === '__timeout__') {
          timedOut = true
        } else {
          result = winner
        }
      } catch (err) {
        pipelineError = err
      }

      if (timedOut) {
        emit('provider_timeout', {})
        close()
        return
      }
      if (pipelineError || !result) {
        emit('error', {
          detail: pipelineError instanceof Error
            ? pipelineError.message.slice(0, 300)
            : 'pipeline_failed',
        })
        close()
        return
      }

      const vm = result.viewModel
      const status = vm.status ?? null
      const fallbackReason = vm.fallback_reason ?? null
      const answerId = vm.id || result.legacy.answer_id || null

      // 6. generation_done — pipeline returned cleanly.
      emit('generation_done', { status })

      // 7. fallback_triggered — if pipeline degraded internally.
      //    NOTE: we ALSO still gate the terminal below; a fallback in a
      //    high-risk question still terminates as human_review_required.
      if (fallbackReason) {
        emit('fallback_triggered', { fallback_reason: fallbackReason })
      }

      // ----- Terminal selection (Stream Gating §C3) -----
      const canStreamFinal = shouldStreamContent(riskLevel, isRegressionSet)

      if (status === 'clarification_needed') {
        emit('clarification_needed', {})
        close()
        return
      }
      if (status === 'out_of_scope') {
        // OOS is a routing escape — Phase 1 also routes this to
        // human_review_required. Carry answer_id if present so the
        // reviewer can still inspect what the pipeline produced.
        emit('human_review_required', {
          reason: 'out_of_scope',
          answer_id: answerId,
        })
        close()
        return
      }
      if (!canStreamFinal) {
        // High-risk gating — pipeline produced something, but we don't
        // emit final_answer_ready. The reviewer is asked to use human
        // review framing; answer_id is provided for "open for reference".
        emit('human_review_required', {
          reason: gatingHit ?? 'high_risk_matrix',
          answer_id: answerId,
        })
        close()
        return
      }

      // Low/medium clean path: emit final_answer_ready with ONLY the id.
      // (fallback case: we emit final_answer_ready AFTER fallback_triggered;
      //  the client sees both events and renders the fallback banner +
      //  the "open answer page" link.)
      if (answerId) {
        emit('final_answer_ready', { answer_id: answerId })
      } else {
        // Pipeline didn't persist — surface as error so the client retries.
        emit('error', { detail: 'no_answer_id_returned' })
      }
      close()
    },

    cancel() {
      // Reader bailed (navigated away / ESC). Nothing to clean up — the
      // pipeline promise is already in flight; we just stop emitting.
    },
  })

  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': 'text/event-stream; charset=utf-8',
      'cache-control': 'no-cache, no-transform',
      'x-accel-buffering': 'no',
      // CORS not needed — same-origin only; gate is env-based.
    },
  })
}
