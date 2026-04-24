import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { appendHistory, type HistoryRecord } from '@/lib/auth/store'
import { judge, QUESTIONS, type AnsweredItem } from '@/lib/check/questions'
import { buildSummary } from '@/lib/check/summary'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  try {
    const body = await req.json()
    const history = body?.history as AnsweredItem[] | undefined
    const visaType = String(body?.visaType ?? 'gijinkoku')
    if (!Array.isArray(history) || history.length === 0) {
      return NextResponse.json({ error: '答题记录为空' }, { status: 400 })
    }
    const judgeResult = judge(history)
    const summary = buildSummary(judgeResult.verdict, judgeResult, history)

    // answers: 把 path 上每题选项展平成 boolean（true = 选了带 severity 的危险答案）
    const answers: Record<string, boolean> = {}
    for (const item of history) {
      const opt = QUESTIONS[item.questionId]?.options[item.optionIndex]
      answers[item.questionId] = !!opt?.severity
    }

    const record: HistoryRecord = {
      date: new Date().toISOString(),
      visaType,
      result: judgeResult.verdict,
      summary,
      triggeredItems: judgeResult.triggered.map(t => t.triggerLabel),
      answers,
    }
    await appendHistory(user.phone, record)
    return NextResponse.json({ ok: true, record })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}
