import { and, asc, desc, eq, isNull, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  articles,
  checkDimensionEvents,
  checkDimensionResults,
  checkRuns,
  type CheckDimensionResult,
  type NewCheckDimensionResult,
} from '@/lib/db/schema'
import {
  defaultActionForStatus,
  dimensionsForVisa,
  fallbackDimensionTitle,
  isDimensionTriggered,
  normalizeCheckVisa,
  type CanonicalCheckVisa,
  type CheckDimensionDefinition,
  type DimensionStatus,
  type DimensionView,
} from '@/lib/check/dimensions'
import type { JudgeResult } from '@/lib/check/types'

export interface CheckOwner {
  memberId?: string | null
  sessionId?: string | null
}

function ownerCondition(owner: CheckOwner) {
  if (owner.memberId) return eq(checkDimensionResults.memberId, owner.memberId)
  if (owner.sessionId) {
    return and(eq(checkDimensionResults.sessionId, owner.sessionId), isNull(checkDimensionResults.memberId))
  }
  return sql`false`
}

function ownerValues(owner: CheckOwner) {
  return {
    memberId: owner.memberId ?? null,
    sessionId: owner.memberId ? null : owner.sessionId ?? null,
  }
}

function isRecent(date: Date | null): boolean {
  return !!date && Date.now() - date.getTime() <= 90 * 86_400_000
}

function viewStatus(row: CheckDimensionResult | undefined): DimensionStatus {
  if (!row) return 'unchecked'
  if (row.status === 'checked' && isRecent(row.lastCheckedAt)) return 'recent'
  return row.status
}

async function listArticleDimensionDefinitions(
  visa: CanonicalCheckVisa,
): Promise<CheckDimensionDefinition[]> {
  if (!process.env.DATABASE_URL) return []
  const rows = await db
    .select({
      key: articles.dimensionKey,
      title: articles.title,
      priority: articles.priority,
      expiryDays: articles.expiryDays,
    })
    .from(articles)
    .where(and(
      eq(articles.visaType, visa),
      sql`${articles.dimensionKey} is not null`,
    ))
    .orderBy(
      sql`case when ${articles.priority} = 'must_see' then 0 when ${articles.priority} = 'should_see' then 1 else 2 end`,
      asc(articles.expiryDays),
      asc(articles.title),
    )

  const seen = new Set<string>()
  const definitions: CheckDimensionDefinition[] = []
  for (const row of rows) {
    if (!row.key || seen.has(row.key)) continue
    seen.add(row.key)
    definitions.push({
      key: row.key,
      title: row.title || fallbackDimensionTitle(row.key),
      description: '按该项确认递交前材料和记录。',
      riskFlag: row.priority === 'must_see' ? 'recommended' : null,
      linkedQuestionIds: [],
    })
  }
  return definitions
}

export async function listDimensionViews(
  owner: CheckOwner,
  visaInput: string,
): Promise<DimensionView[]> {
  const visa = normalizeCheckVisa(visaInput)
  let definitions = await listArticleDimensionDefinitions(visa).catch(() => [])
  if (definitions.length === 0) definitions = dimensionsForVisa(visa)
  const rows = owner.memberId || owner.sessionId
    ? process.env.DATABASE_URL
      ? await db
        .select()
        .from(checkDimensionResults)
        .where(and(ownerCondition(owner), eq(checkDimensionResults.visaType, visa)))
        .orderBy(desc(checkDimensionResults.updatedAt))
        .catch(() => [])
      : []
    : []
  const byKey = new Map(rows.map(row => [row.dimensionKey, row]))
  return definitions.map(definition => {
    const row = byKey.get(definition.key)
    const status = viewStatus(row)
    return {
      ...definition,
      status,
      reason: row?.reason ?? null,
      actionLabel: row?.actionLabel ?? defaultActionForStatus(status),
      lastCheckedAt: row?.lastCheckedAt ?? null,
    }
  })
}

export async function upsertDimensionsFromQuiz(input: {
  owner: CheckOwner
  visaType: string
  quizResultId: string
  result: JudgeResult
}): Promise<{ runId: string; updated: number }> {
  const visa = normalizeCheckVisa(input.visaType)
  const owner = ownerValues(input.owner)
  const [run] = await db
    .insert(checkRuns)
    .values({
      ...owner,
      visaType: visa,
      runType: 'full_quiz',
      status: 'completed',
      sourceQuizResultId: input.quizResultId,
      completedAt: new Date(),
    })
    .returning()

  let updated = 0
  for (const definition of dimensionsForVisa(visa)) {
    const triggered = isDimensionTriggered(definition, input.result.triggered)
    const status: DimensionStatus = triggered ? 'needs_action' : 'checked'
    const values: NewCheckDimensionResult = {
      checkRunId: run.id,
      ...owner,
      visaType: visa,
      dimensionKey: definition.key,
      title: definition.title,
      status,
      riskFlag: definition.riskFlag ?? null,
      reason: triggered?.fixHint ?? null,
      actionLabel: triggered ? '递交前确认' : '已确认',
      sourceRecordId: input.quizResultId,
      sourceRecordType: 'quiz_result',
      lastCheckedAt: new Date(),
      expiresAt: nextExpiry(),
    }

    const existing = await db
      .select({ id: checkDimensionResults.id })
      .from(checkDimensionResults)
      .where(and(ownerCondition(input.owner), eq(checkDimensionResults.visaType, visa), eq(checkDimensionResults.dimensionKey, definition.key)))
      .limit(1)

    let resultId: string
    if (existing[0]) {
      const [row] = await db
        .update(checkDimensionResults)
        .set({ ...values, updatedAt: new Date() })
        .where(eq(checkDimensionResults.id, existing[0].id))
        .returning({ id: checkDimensionResults.id })
      resultId = row.id
    } else {
      const [row] = await db.insert(checkDimensionResults).values(values).returning({ id: checkDimensionResults.id })
      resultId = row.id
    }
    await db.insert(checkDimensionEvents).values({
      checkDimensionResultId: resultId,
      ...owner,
      eventType: 'quiz_completed',
      eventPayload: {
        visaType: visa,
        dimensionKey: definition.key,
        status,
        quizResultId: input.quizResultId,
        triggered: triggered?.triggerLabel ?? null,
      },
    })
    updated += 1
  }

  return { runId: run.id, updated }
}

export async function listNeedsActionDimensions(owner: CheckOwner, limit = 5) {
  if (!owner.memberId && !owner.sessionId) return []
  return await db
    .select()
    .from(checkDimensionResults)
    .where(and(ownerCondition(owner), eq(checkDimensionResults.status, 'needs_action')))
    .orderBy(desc(checkDimensionResults.updatedAt))
    .limit(limit)
}

function nextExpiry(): Date {
  const d = new Date()
  d.setDate(d.getDate() + 90)
  return d
}

export type { CanonicalCheckVisa }
