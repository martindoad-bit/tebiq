import { errors, ok } from '@/lib/api/response'
import { matchDecisionQuery, recordQuery } from '@/lib/decision/cards'

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
  const rawQuery = String((body as { query?: unknown }).query ?? '').trim()
  const sourcePage = String((body as { sourcePage?: unknown }).sourcePage ?? '/decision-lab')
  if (!rawQuery) return errors.badRequest('请输入情况')
  if (rawQuery.length > 1000) return errors.badRequest('输入过长')

  const match = await matchDecisionQuery(rawQuery)
  const saved = await recordQuery({
    rawQuery,
    normalizedQuery: match.normalizedQuery,
    matchedCardId: match.card?.id ?? null,
    matchStatus: match.status,
    sourcePage,
  })

  return ok({
    matchStatus: match.status,
    slug: match.card?.slug ?? null,
    title: match.card?.title ?? null,
    saved,
    message: match.card
      ? '已找到相近决策卡'
      : '这个情况还没有整理，我们会根据收到的问题继续补充',
  })
}
