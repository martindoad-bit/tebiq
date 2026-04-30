import { errors, ok } from '@/lib/api/response'
import { FEEDBACK_TYPES } from '@/lib/answer/types'
import { recordAnswerFeedback } from '@/lib/db/queries/answerDrafts'
import type { FeedbackType } from '@/lib/decision/types'

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
  const feedbackType = stringValue(row.feedback_type ?? row.feedbackType)
  if (!feedbackType || !(FEEDBACK_TYPES as readonly string[]).includes(feedbackType)) {
    return errors.badRequest('反馈类型不正确')
  }

  try {
    const saved = await recordAnswerFeedback({
      answerDraftId: stringValue(row.answer_draft_id ?? row.answerDraftId),
      cardId: stringValue(row.card_id ?? row.cardId),
      pagePath: stringValue(row.page_path ?? row.pagePath) ?? '/answer',
      feedbackType: feedbackType as FeedbackType,
      note: stringValue(row.note),
    })
    return ok({ saved })
  } catch (error) {
    console.warn('[answer/feedback] save failed', errorCode(error))
    return ok({ saved: false, unavailable: true })
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
