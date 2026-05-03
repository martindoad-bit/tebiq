import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { submitQuestionForAnswer } from '@/lib/answer/submit-question'

// POST /api/internal/eval-lab/tebiq-answer
//
// Calls the production answer pipeline (rule_based → DeepSeek-LLM →
// legacy_seed → safe-clarification, with surface safety) for a given
// question. Returns the resulting answer_id + a flat snapshot of the
// user-visible fields plus internal observability fields
// (engine_version / fallback_reason / status / domain) so the Eval
// Lab can show side-by-side with the DeepSeek raw answer.
//
// V0 calls submitQuestionForAnswer directly — same path /api/questions
// uses, but bypasses the public route's request/response shaping. We
// surface ALL view-model fields (including internal ones) because
// this is an internal route.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface ReqBody {
  question?: string
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

  try {
    const result = await submitQuestionForAnswer({
      questionText: question,
      visaType: body.visa_type ?? null,
      sourcePage: '/internal/eval-lab',
    })
    const vm = result.viewModel
    const pa = vm.public
    return NextResponse.json({
      ok: true,
      answer_id: vm.id || result.legacy.answer_id || null,
      answer_link: vm.id ? `/answer/${vm.id}` : null,
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
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/tebiq-answer] submit failed', message)
    return NextResponse.json(
      { error: 'tebiq_pipeline_failed', detail: message },
      { status: 500 },
    )
  }
}
