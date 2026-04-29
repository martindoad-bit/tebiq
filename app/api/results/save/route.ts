import { NextResponse } from 'next/server'
import { getOrCreateAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { judge } from '@/lib/check/engine'
import type { AnsweredItem } from '@/lib/check/types'
import { getBank } from '@/lib/check/questions'
import { normalizeCheckVisa, CHECK_VISA_META } from '@/lib/check/dimensions'
import { buildSummary } from '@/lib/check/summary'
import { createQuizResult } from '@/lib/db/queries/quizResults'
import { upsertDimensionsFromQuiz } from '@/lib/db/queries/checkDimensions'
import { createTimelineEvent, findRelatedTimelineEvents } from '@/lib/db/queries/timeline'
import { visaTypeEnum } from '@/lib/db/schema'
import { buildSelfCheckTimelineEvent, formatTimelineAssociation } from '@/lib/timeline/builders'

export const dynamic = 'force-dynamic'

const VALID_VISAS = visaTypeEnum.enumValues
type VisaTypeEnum = (typeof VALID_VISAS)[number]

function coerceVisa(v: string): VisaTypeEnum {
  return (VALID_VISAS as readonly string[]).includes(v) ? (v as VisaTypeEnum) : 'other'
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  const sessionId = user ? null : await getOrCreateAnonymousSessionId()

  try {
    const body = await req.json()
    const history = body?.history as AnsweredItem[] | undefined
    const visaTypeRaw = String(body?.visaType ?? 'gijinkoku')
    if (!Array.isArray(history) || history.length === 0) {
      return NextResponse.json({ error: '答题记录为空' }, { status: 400 })
    }
    const canonicalVisa = normalizeCheckVisa(visaTypeRaw)
    const legacyVisa = CHECK_VISA_META[canonicalVisa].legacyQuizVisa
    const bank = getBank(legacyVisa)
    const judgeResult = judge(bank, history)
    const summary = buildSummary(judgeResult.verdict, judgeResult, history)

    // Map history → answers (questionId → optionIndex)
    const answers: Record<string, number> = {}
    for (const item of history) {
      answers[item.questionId] = item.optionIndex
    }

    const record = await createQuizResult({
      memberId: user?.id ?? null,
      sessionId,
      visaType: coerceVisa(legacyVisa),
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
    const timelineEvent = await createTimelineEvent(buildSelfCheckTimelineEvent({
      memberId: user?.id ?? null,
      sessionId,
      quizResultId: record.id,
      visaType: record.visaType,
      resultColor: record.resultColor,
      summary: record.summary as unknown as Record<string, unknown>,
    }))
    const relatedEvents = await findRelatedTimelineEvents({
      owner: { memberId: user?.id ?? null, sessionId },
      docType: `${record.visaType} 续签自查`,
      excludeId: timelineEvent.id,
      limit: 3,
    })
    const dimensions = await upsertDimensionsFromQuiz({
      owner: { memberId: user?.id ?? null, sessionId },
      visaType: canonicalVisa,
      quizResultId: record.id,
      result: judgeResult,
    })

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
      timeline: {
        eventId: timelineEvent.id,
        relatedEvents: relatedEvents.map(formatTimelineAssociation),
      },
      dimensions,
    })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}
