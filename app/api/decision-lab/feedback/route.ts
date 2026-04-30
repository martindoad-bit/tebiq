import { errors, ok } from '@/lib/api/response'
import { recordFeedback } from '@/lib/decision/cards'
import type { FeedbackType } from '@/lib/decision/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const FEEDBACK_TYPES: FeedbackType[] = ['helpful', 'inaccurate', 'unclear', 'my_case_differs']

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return errors.badRequest()
  }
  if (!body || typeof body !== 'object') return errors.badRequest()
  const rawType = String((body as { feedbackType?: unknown }).feedbackType ?? '')
  if (!FEEDBACK_TYPES.includes(rawType as FeedbackType)) return errors.badRequest('反馈类型无效')

  const saved = await recordFeedback({
    cardSlug: nullableString((body as { cardSlug?: unknown }).cardSlug),
    cardId: nullableString((body as { cardId?: unknown }).cardId),
    pagePath: nullableString((body as { pagePath?: unknown }).pagePath) ?? '/decision-lab',
    feedbackType: rawType as FeedbackType,
    note: nullableString((body as { note?: unknown }).note),
  })

  return ok({ saved })
}

function nullableString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null
}
