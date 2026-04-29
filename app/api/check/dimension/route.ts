import { NextResponse } from 'next/server'
import { and, eq, isNull } from 'drizzle-orm'
import { getOrCreateAnonymousSessionId } from '@/lib/auth/anonymous-session'
import { getCurrentUser } from '@/lib/auth/session'
import { normalizeCheckVisa } from '@/lib/check/dimensions'
import { db } from '@/lib/db'
import {
  checkDimensionEvents,
  checkDimensionResults,
  checkRuns,
} from '@/lib/db/schema'

export const dynamic = 'force-dynamic'

type DimensionStatus = 'checked' | 'needs_action'

interface SubmitBody {
  visaType?: string
  dimensionKey?: string
  title?: string
  status?: DimensionStatus
  resultLevel?: 'green' | 'yellow' | 'red'
  reason?: string | null
  actionLabel?: string | null
  riskFlag?: string | null
  articleId?: string | null
  expiryDays?: number | null
  answers?: Record<string, string>
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  const sessionId = user ? null : await getOrCreateAnonymousSessionId()
  const body = await req.json().catch(() => null) as SubmitBody | null
  if (!body?.visaType || !body.dimensionKey || !body.title) {
    return NextResponse.json({ ok: false, error: 'invalid_payload' }, { status: 400 })
  }

  const visaType = normalizeCheckVisa(body.visaType)
  const status: DimensionStatus = body.status === 'needs_action' ? 'needs_action' : 'checked'
  const now = new Date()
  const expiryDays = typeof body.expiryDays === 'number' ? body.expiryDays : 90
  const expiresAt = new Date(now.getTime() + expiryDays * 86_400_000)
  const owner = {
    memberId: user?.id ?? null,
    sessionId,
  }

  const [run] = await db
    .insert(checkRuns)
    .values({
      ...owner,
      visaType,
      runType: 'dimension_check',
      status: 'completed',
      completedAt: now,
    })
    .returning({ id: checkRuns.id })

  const existing = await db
    .select({ id: checkDimensionResults.id })
    .from(checkDimensionResults)
    .where(and(
      owner.memberId
        ? eq(checkDimensionResults.memberId, owner.memberId)
        : and(eq(checkDimensionResults.sessionId, owner.sessionId ?? ''), isNull(checkDimensionResults.memberId)),
      eq(checkDimensionResults.visaType, visaType),
      eq(checkDimensionResults.dimensionKey, body.dimensionKey),
    ))
    .limit(1)

  const values = {
    checkRunId: run.id,
    ...owner,
    visaType,
    dimensionKey: body.dimensionKey,
    title: body.title,
    status,
    riskFlag: body.riskFlag ?? null,
    reason: body.reason ?? null,
    actionLabel: body.actionLabel ?? (status === 'needs_action' ? '递交前确认' : '已确认'),
    sourceRecordId: body.articleId ?? null,
    sourceRecordType: 'article',
    lastCheckedAt: now,
    expiresAt,
    updatedAt: now,
  }

  const [result] = existing[0]
    ? await db
        .update(checkDimensionResults)
        .set(values)
        .where(eq(checkDimensionResults.id, existing[0].id))
        .returning({ id: checkDimensionResults.id })
    : await db
        .insert(checkDimensionResults)
        .values(values)
        .returning({ id: checkDimensionResults.id })

  await db.insert(checkDimensionEvents).values({
    checkDimensionResultId: result.id,
    ...owner,
    eventType: status === 'needs_action' ? 'marked_needs_action' : 'marked_checked',
    eventPayload: {
      visaType,
      dimensionKey: body.dimensionKey,
      resultLevel: body.resultLevel ?? null,
      answers: body.answers ?? {},
    },
  })

  return NextResponse.json({ ok: true, resultId: result.id, status })
}
