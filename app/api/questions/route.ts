import { errors, ok } from '@/lib/api/response'
import { matchDecisionQuery } from '@/lib/decision/cards'
import { createQuestion } from '@/lib/db/queries/questions'

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
  const questionText = stringOrNull(row.question_text ?? row.questionText ?? row.rawQuery)
  if (!questionText) return errors.badRequest('请输入情况')
  if (questionText.length > 4000) return errors.badRequest('输入过长')

  const contactEmail = parseEmail(row.contact_email ?? row.contactEmail)
  const visaType = stringOrNull(row.visa_type ?? row.visaType)
  const sourcePage = stringOrNull(row.source_page ?? row.sourcePage) ?? '/question-intake'
  const match = await matchDecisionQuery(questionText)

  try {
    const saved = await createQuestion({
      rawQuery: questionText,
      normalizedQuery: match.normalizedQuery,
      visaType,
      contactEmail,
      sourcePage,
      matchedCardId: match.card?.id ?? null,
      matchStatus: match.status,
      status: 'new',
      priority: 'normal',
    })
    return ok({
      id: saved.id,
      matchStatus: saved.matchStatus,
      matchedSlug: match.card?.slug ?? null,
      message: '已收到。TEBIQ 会根据收到的问题继续整理场景和手续说明。',
    })
  } catch (error) {
    console.warn('[questions] submit failed', errorCode(error))
    return errors.internal('提交暂时没有保存成功，请稍后再试')
  }
}

function stringOrNull(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function parseEmail(value: unknown): string | null {
  const email = stringOrNull(value)?.toLowerCase()
  if (!email) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null
  return email.slice(0, 255)
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
