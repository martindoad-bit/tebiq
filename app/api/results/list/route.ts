import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { listQuizResultsByMemberId } from '@/lib/db/queries/quizResults'

export const dynamic = 'force-dynamic'

/**
 * GET /api/results/list — return current member's quiz history.
 * Response shape preserved for backwards compat with /my page.
 */
export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  const rows = await listQuizResultsByMemberId(user.id, 100)

  // Map new schema rows back to legacy HistoryRecord shape
  const history = rows.map(r => {
    const triggered =
      r.summary && Array.isArray((r.summary as { triggered?: unknown }).triggered)
        ? ((r.summary as { triggered: { label: string }[] }).triggered.map(t => t.label))
        : []
    const summary =
      typeof r.summary === 'object' && r.summary && 'notes' in r.summary
        ? String((r.summary as { notes?: string }).notes ?? '')
        : ''
    const answers: Record<string, boolean> = {}
    for (const [k, v] of Object.entries(r.answers)) {
      answers[k] = typeof v === 'number' && v > 0
    }
    return {
      date: r.createdAt.toISOString(),
      visaType: r.visaType,
      result: r.resultColor,
      summary,
      triggeredItems: triggered,
      answers,
    }
  })

  return NextResponse.json({ history })
}
