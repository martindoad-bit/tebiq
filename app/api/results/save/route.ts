import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { judge, QUESTIONS, type AnsweredItem } from '@/lib/check/questions/gijinkoku'
import { buildSummary } from '@/lib/check/summary'
import { createQuizResult } from '@/lib/db/queries/quizResults'
import { visaTypeEnum } from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

const VALID_VISAS = visaTypeEnum.enumValues
type VisaTypeEnum = (typeof VALID_VISAS)[number]

function coerceVisa(v: string): VisaTypeEnum {
  return (VALID_VISAS as readonly string[]).includes(v) ? (v as VisaTypeEnum) : 'other'
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  try {
    const body = await req.json()
    const history = body?.history as AnsweredItem[] | undefined
    const visaTypeRaw = String(body?.visaType ?? 'gijinkoku')
    if (!Array.isArray(history) || history.length === 0) {
      return NextResponse.json({ error: '答题记录为空' }, { status: 400 })
    }
    const judgeResult = judge(history)
    const summary = buildSummary(judgeResult.verdict, judgeResult, history)

    // Map history → answers (questionId → optionIndex)
    const answers: Record<string, number> = {}
    for (const item of history) {
      answers[item.questionId] = item.optionIndex
    }

    const record = await createQuizResult({
      memberId: user.id,
      sessionId: null,
      visaType: coerceVisa(visaTypeRaw),
      answers,
      resultColor: judgeResult.verdict,
      summary: {
        triggered: judgeResult.triggered.map(t => ({
          id: t.id,
          severity: t.severity,
          label: t.triggerLabel,
          hint: t.fixHint,
        })),
        notes: summary,
      },
    })

    // Avoid lint warning for unused QUESTIONS import (used in older summary path)
    void QUESTIONS

    return NextResponse.json({
      ok: true,
      record: {
        id: record.id,
        date: record.createdAt.toISOString(),
        visaType: record.visaType,
        result: record.resultColor,
        summary,
        triggeredItems: judgeResult.triggered.map(t => t.triggerLabel),
        answers: Object.fromEntries(
          Object.entries(answers).map(([k, v]) => [k, v > 0]),
        ),
      },
    })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}
