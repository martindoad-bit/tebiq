import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { getEvalQuestionById, upsertEvalAnswer } from '@/lib/db/queries/eval-lab'
import {
  CONSULTATION_ALPHA_MODEL,
  CONSULTATION_ALPHA_PROMPT_VERSION,
} from '@/lib/answer/prompt/consultation-alpha-v1'
import {
  parseConsultationChunk,
  type ConsultationEvent,
  type ConsultationFactCardAuditEntry,
} from '@/lib/consultation/stream-protocol'
import { validateAnswer } from '@/lib/consultation/guardrail-validator'
import { getRouteGateIds, matchRouteGates } from '@/lib/consultation/route-gates'

// POST /api/internal/eval-lab/tebiq-answer
//
// Calls the same production consultation stream used by the public
// /ai-consultation page, then flattens the emitted answer_chunk events
// for Eval Lab side-by-side review. This is intentional: Cycle 1 labels
// must judge the actual user-facing TEBIQ path, including current prompt,
// fact-card injection, forbidden phrase filter, and production persistence.
//
// Hardening notes:
//
// The previous version (77dbc2c) wrapped submitQuestionForAnswer in
// withTimeout(30s) + withRetry(3). That introduced a regression on
// Vercel Hobby:
//
//   - The pipeline already has its own internal DeepSeek timeout
//     (DEEPSEEK_TIMEOUT_MS = 18s). Stacking a 30s outer wrapper creates
//     two competing clocks; Promise.race rejects the outer wrapper but
//     the underlying pipeline keeps running, leaving orphaned writes.
//   - Vercel Hobby caps function duration at 60s. With retry-of-3 each
//     attempt potentially 30s, total budget can reach 90s + backoffs,
//     well past the ceiling. The function gets killed mid-flight; the
//     UI sees an empty/aborted response (or our 30s timer fires first
//     and writes `tebiq_timeout` to eval_answers).
//   - Pipeline-level failures aren't transient — retrying doesn't help
//     and creates orphan answer_drafts rows.
//
// Resolution:
//   - Remove the outer timeout/retry. Trust the pipeline's own internal
//     timeouts.
//   - Set `maxDuration` explicitly so the internal eval pipeline has
//     enough room for real answer generation instead of recording a
//     fallback simply because the review bench was impatient.
//   - On failure, persist a structured error and return 500 — the
//     reviewer can re-trigger via the per-question 重跑失败 button.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Internal eval only. Match the production stream's ceiling so a valid
// long answer is not misclassified as an Eval Lab failure.
export const maxDuration = 300

const MIN_TEBIQ_ANSWER_CHARS = 120

interface ReqBody {
  question?: string
  question_id?: string
  visa_type?: string | null
}

export async function POST(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  let body: ReqBody
  try {
    body = (await req.json()) as ReqBody
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
  const question = (body.question ?? '').trim()
  if (!question) {
    return NextResponse.json({ error: 'missing_question' }, { status: 400 })
  }
  if (question.length > 4000) {
    return NextResponse.json({ error: 'question_too_long' }, { status: 400 })
  }
  const questionId = body.question_id?.trim() || null

  // P2.1: when a question_id is supplied, verify it exists BEFORE running
  // the (expensive) pipeline. Otherwise upsertEvalAnswer would FK-fail
  // silently and the route would still return ok:true.
  if (questionId) {
    const exists = await getEvalQuestionById(questionId)
    if (!exists) {
      return NextResponse.json(
        { error: 'unknown_question_id', question_id: questionId },
        { status: 400 },
      )
    }
    if (exists.source === 'knowledge_debug') {
      return NextResponse.json(
        {
          error: 'knowledge_snapshot_locked',
          detail: 'Knowledge Atlas A/B imports are snapshot-only. Create a new run instead of regenerating this answer in place.',
          question_id: questionId,
        },
        { status: 409 },
      )
    }
  }

  const startedAt = Date.now()
  try {
    const routeGateMatches = matchRouteGates(question)
    const routeGateIds = getRouteGateIds(routeGateMatches)
    const streamResult = await generateViaProductionStream(req, question)
    const guardrailFindings = validateAnswer({
      question,
      answer: streamResult.answerText,
      routeGateMatches,
    })
    const latencyMs = Date.now() - startedAt
    const answerId = streamResult.consultationId
    const answerLink = answerId ? `/c/${answerId}` : null
    const engineVersion = `${CONSULTATION_ALPHA_PROMPT_VERSION}:${CONSULTATION_ALPHA_MODEL}`
    const fallbackReason =
      streamResult.completionStatus === 'completed' ? null : `stream_${streamResult.completionStatus}`

    const responsePayload = {
      ok: true,
      answer_id: answerId,
      answer_link: answerLink,
      // Internal observability — surfaced ON PURPOSE in this route.
      status: streamResult.completionStatus,
      domain: null,
      engine_version: engineVersion,
      fallback_reason: fallbackReason,
      fact_card_ids: streamResult.factCardAudit.map(item => item.fact_id),
      route_gate_ids: routeGateIds,
      guardrail_findings: guardrailFindings,
      fact_card_audit: streamResult.factCardAudit,
      visible_text: streamResult.answerText,
      latency_ms: latencyMs,
    }

    if (questionId) {
      try {
        await upsertEvalAnswer({
          questionId,
          answerType: 'tebiq_current',
          model: CONSULTATION_ALPHA_MODEL,
          promptVersion: CONSULTATION_ALPHA_PROMPT_VERSION,
          answerText: streamResult.answerText,
          tebiqAnswerId: answerId,
          tebiqAnswerLink: answerLink,
          engineVersion,
          status: streamResult.completionStatus,
          domain: null,
          fallbackReason,
          latencyMs,
          error: null,
          rawPayloadJson: {
            source_route: '/api/consultation/stream',
            prompt_version: CONSULTATION_ALPHA_PROMPT_VERSION,
            model: CONSULTATION_ALPHA_MODEL,
            completion_status: streamResult.completionStatus,
            terminal_event: streamResult.terminalEvent,
            fact_card_audit: streamResult.factCardAudit,
            route_gate_ids: routeGateIds,
            guardrail_findings: guardrailFindings,
            event_counts: streamResult.eventCounts,
            min_answer_chars: MIN_TEBIQ_ANSWER_CHARS,
          },
        })
      } catch (persistErr) {
        const message = persistErr instanceof Error ? persistErr.message : String(persistErr)
        console.warn('[eval-lab/tebiq-answer] persist failed', message)
      }
    }

    return NextResponse.json(responsePayload)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/tebiq-answer] submit failed', message)
    if (questionId) {
      try {
        await upsertEvalAnswer({
          questionId,
          answerType: 'tebiq_current',
          model: null,
          promptVersion: 'tebiq-pipeline',
          answerText: null,
          error: `tebiq_pipeline_failed: ${message.slice(0, 500)}`,
          latencyMs: Date.now() - startedAt,
        })
      } catch (persistErr) {
        const persistMsg = persistErr instanceof Error ? persistErr.message : String(persistErr)
        console.warn('[eval-lab/tebiq-answer] persistError failed', persistMsg)
      }
    }
    return NextResponse.json(
      { error: 'tebiq_pipeline_failed', detail: message },
      { status: 500 },
    )
  }
}

interface StreamEvalResult {
  answerText: string
  consultationId: string | null
  completionStatus: 'completed'
  terminalEvent: ConsultationEvent['event']
  factCardAudit: ConsultationFactCardAuditEntry[]
  eventCounts: Partial<Record<ConsultationEvent['event'], number>>
}

async function generateViaProductionStream(req: Request, question: string): Promise<StreamEvalResult> {
  const streamUrl = new URL('/api/consultation/stream', req.url)
  const res = await fetch(streamUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: req.headers.get('cookie') ?? '',
    },
    body: JSON.stringify({ question }),
  })

  if (!res.ok || !res.body) {
    const body = await res.text().catch(() => '')
    throw new Error(`production_stream_http_${res.status}: ${body.slice(0, 300)}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let answerText = ''
  let consultationId: string | null = null
  let terminalEvent: ConsultationEvent | null = null
  let factCardAudit: ConsultationFactCardAuditEntry[] = []
  const eventCounts: Partial<Record<ConsultationEvent['event'], number>> = {}

  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const parsed = parseConsultationChunk(buffer)
      buffer = parsed.remainder
      for (const event of parsed.events) {
        eventCounts[event.event] = (eventCounts[event.event] ?? 0) + 1
        if (event.event === 'received') {
          consultationId = event.consultation_id
        } else if (event.event === 'answer_chunk') {
          answerText += event.chunk
        } else if (event.event === 'fact_cards_injected') {
          factCardAudit = event.items.slice()
        } else if (event.event === 'completed' || event.event === 'timeout' || event.event === 'failed') {
          terminalEvent = event
        }
      }
    }
    buffer += decoder.decode()
    if (buffer.trim()) {
      const parsed = parseConsultationChunk(buffer + '\n\n')
      for (const event of parsed.events) {
        eventCounts[event.event] = (eventCounts[event.event] ?? 0) + 1
        if (event.event === 'answer_chunk') answerText += event.chunk
        if (event.event === 'completed' || event.event === 'timeout' || event.event === 'failed') {
          terminalEvent = event
        }
      }
    }
  } finally {
    try { reader.releaseLock() } catch { /* already released */ }
  }

  const trimmed = answerText.trim()
  if (terminalEvent?.event === 'failed') {
    throw new Error(`production_stream_failed: ${terminalEvent.detail}`)
  }
  if (terminalEvent?.event === 'timeout') {
    throw new Error(`production_stream_timeout: ${terminalEvent.completion_status}`)
  }
  if (terminalEvent?.event !== 'completed') {
    throw new Error(`production_stream_no_completed_event`)
  }
  if (trimmed.length < MIN_TEBIQ_ANSWER_CHARS) {
    throw new Error(`production_stream_too_short:${trimmed.length}`)
  }

  return {
    answerText: trimmed,
    consultationId,
    completionStatus: 'completed',
    terminalEvent: terminalEvent.event,
    factCardAudit,
    eventCounts,
  }
}
