import { errors } from '@/lib/api/response'
import { submitQuestionForAnswer } from '@/lib/answer/submit-question'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errors.badRequest()
  }

  if (!body || typeof body !== 'object') return errors.badRequest()
  const row = body as Record<string, unknown>
  const questionText = stringValue(row.question_text ?? row.questionText)
  if (!questionText) return errors.badRequest('请输入要整理的问题')
  if (questionText.length > 4000) return errors.badRequest('问题最多 4000 字')

  const contactEmail = stringValue(row.contact_email ?? row.contactEmail)
  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return errors.badRequest('邮箱格式不正确')
  }

  try {
    const { viewModel, legacy } = await submitQuestionForAnswer({
      questionText,
      visaType: stringValue(row.visa_type ?? row.visaType),
      contactEmail,
      sourcePage: stringValue(row.source_page ?? row.sourcePage) ?? '/question-intake',
    })

    // V1 contract: clients should consume `view_model` for everything
    // user-visible. Top-level legacy fields are kept for back-compat
    // but every value here was projected from PublicAnswer (i.e. they
    // already passed surface safety).
    return Response.json({
      ok: true,
      // Authoritative for user-visible rendering ↓
      view_model: viewModel,
      // Back-compat surface (still derived from PublicAnswer) ↓
      answer_type: legacy.answer_type,
      answer_level: legacy.answer_level,
      review_status: legacy.review_status,
      title: legacy.title,
      summary: legacy.summary,
      action_answer: legacy.action_answer,
      related_links: legacy.related_links,
      sources: legacy.sources,
      query_id: legacy.query_id,
      answer_id: legacy.answer_id,
      saved: legacy.saved,
      intent_summary: legacy.intent_summary,
      // Observability (top-level so QA can see without descending) ↓
      engine_version: viewModel.engine_version,
      status: viewModel.status,
      domain: viewModel.domain,
      safety: viewModel.safety,
      fallback_reason: viewModel.fallback_reason,
    })
  } catch (error) {
    console.warn('[api/questions] answer failed', errorCode(error))
    return errors.internal('整理暂时失败，请稍后再试')
  }
}

function stringValue(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
