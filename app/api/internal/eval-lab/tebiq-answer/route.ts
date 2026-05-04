import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { submitQuestionForAnswer } from '@/lib/answer/submit-question'
import { getEvalQuestionById, upsertEvalAnswer } from '@/lib/db/queries/eval-lab'

// POST /api/internal/eval-lab/tebiq-answer
//
// Calls the production answer pipeline (rule_based → DeepSeek-LLM →
// legacy_seed → safe-clarification, with surface safety) for a given
// question. Returns the resulting answer_id + a flat snapshot of the
// user-visible fields plus internal observability fields
// (engine_version / fallback_reason / status / domain) so the Eval
// Lab can show side-by-side with the DeepSeek raw answer.
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
//   - Set `maxDuration = 60` explicitly so Vercel uses the Hobby ceiling
//     instead of the 10s default.
//   - On failure, persist a structured error and return 500 — the
//     reviewer can re-trigger via the per-question 重跑失败 button.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Vercel Hobby cap is 60s; default for unspecified routes is 10s, which
// is too tight for the TEBIQ pipeline (intent + DeepSeek-LLM up to 18s
// + projection + DB writes). 60s gives the pipeline room without
// retrying.
export const maxDuration = 60

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
  }

  const startedAt = Date.now()
  try {
    const result = await submitQuestionForAnswer({
      questionText: question,
      visaType: body.visa_type ?? null,
      sourcePage: '/internal/eval-lab',
    })

    const vm = result.viewModel
    const pa = vm.public
    const latencyMs = Date.now() - startedAt
    const answerId = vm.id || result.legacy.answer_id || null
    const answerLink = vm.id ? `/answer/${vm.id}` : null

    const responsePayload = {
      ok: true,
      answer_id: answerId,
      answer_link: answerLink,
      // Internal observability — surfaced ON PURPOSE in this route.
      status: vm.status,
      domain: vm.domain,
      engine_version: vm.engine_version,
      fallback_reason: vm.fallback_reason,
      safety: vm.safety,
      // What the user would see, flattened for the Eval Lab side-by-side.
      title: pa.title,
      summary: pa.summary,
      conclusion: pa.conclusion,
      visible_text: pa.visible_text,
      next_steps: pa.next_steps,
      clarification_questions: pa.clarification_questions,
      documents_needed: pa.documents_needed,
      // The detected_intent rendered on /answer/{id}'s "我理解你的问题是" panel.
      understood_question: vm.understood_question,
      latency_ms: latencyMs,
    }

    if (questionId) {
      try {
        await upsertEvalAnswer({
          questionId,
          answerType: 'tebiq_current',
          model: vm.engine_version ?? null,
          promptVersion: 'tebiq-pipeline',
          answerText: pa.visible_text ?? null,
          tebiqAnswerId: answerId,
          tebiqAnswerLink: answerLink,
          engineVersion: vm.engine_version ?? null,
          status: vm.status ?? null,
          domain: vm.domain ?? null,
          fallbackReason: vm.fallback_reason ?? null,
          latencyMs,
          error: null,
          rawPayloadJson: {
            title: pa.title ?? null,
            summary: pa.summary ?? null,
            understood_question: vm.understood_question ?? null,
            safety: vm.safety ?? null,
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
