import { and, count, desc, eq, gte, ilike, isNull, lte, ne, or, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { isMemberTrialActive } from '@/lib/db/queries/members'
import { isSubscriptionActive } from '@/lib/db/queries/subscriptions'
import {
  members,
  timelineEvents,
  type Member,
  type NewTimelineEvent,
  type TimelineEvent,
} from '@/lib/db/schema'

export type TimelineEventType = NewTimelineEvent['eventType']
export type TimelineSourceRecordType = 'document' | 'quiz_result' | 'text_understand'

export interface TimelineOwner {
  memberId?: string | null
  sessionId?: string | null
}

export interface TimelineFilters {
  eventType?: TimelineEventType | null
  docType?: string | null
  issuer?: string | null
  from?: string | null
  to?: string | null
  tag?: string | null
  includeArchived?: boolean
  archived?: boolean | null
  limit?: number
  offset?: number
}

export interface TimelineSummary {
  total: number
  archived: number
  active: number
  selfChecks: number
  documents: number
  textUnderstands: number
  monthsCovered: number
  issuerCount: number
  docTypeCount: number
  latestDeadline: string | null
}

export type TimelinePatch = Partial<Pick<NewTimelineEvent, 'userNote' | 'archived' | 'tags'>>

function ownerCondition(owner: TimelineOwner) {
  if (owner.memberId) return eq(timelineEvents.memberId, owner.memberId)
  if (owner.sessionId) {
    return and(eq(timelineEvents.sessionId, owner.sessionId), isNull(timelineEvents.memberId))
  }
  return sql`false`
}

function normalizeLimit(limit: number | undefined, fallback = 50): number {
  if (!limit || Number.isNaN(limit)) return fallback
  return Math.max(1, Math.min(100, Math.floor(limit)))
}

function clean(value: string | null | undefined): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

export async function createTimelineEvent(input: NewTimelineEvent): Promise<TimelineEvent> {
  const [row] = await db.insert(timelineEvents).values(input).returning()
  return row
}

export async function countTimelineEvents(
  owner: TimelineOwner,
  filters: Pick<TimelineFilters, 'eventType' | 'includeArchived'> = {},
): Promise<number> {
  const conditions = [ownerCondition(owner)]
  if (filters.eventType) conditions.push(eq(timelineEvents.eventType, filters.eventType))
  if (!filters.includeArchived) conditions.push(eq(timelineEvents.archived, false))

  const rows = await db
    .select({ value: count() })
    .from(timelineEvents)
    .where(and(...conditions))
    .limit(1)
  return rows[0]?.value ?? 0
}

export async function listTimelineEvents(
  owner: TimelineOwner,
  filters: TimelineFilters = {},
): Promise<TimelineEvent[]> {
  const conditions = [ownerCondition(owner)]
  if (filters.eventType) conditions.push(eq(timelineEvents.eventType, filters.eventType))
  if (clean(filters.docType)) conditions.push(ilike(timelineEvents.docType, `%${clean(filters.docType)}%`))
  if (clean(filters.issuer)) conditions.push(ilike(timelineEvents.issuer, `%${clean(filters.issuer)}%`))
  if (filters.from) conditions.push(gte(timelineEvents.createdAt, new Date(filters.from)))
  if (filters.to) conditions.push(lte(timelineEvents.createdAt, new Date(filters.to)))
  if (clean(filters.tag)) conditions.push(sql`${timelineEvents.tags} @> ARRAY[${clean(filters.tag)}]::text[]`)
  if (filters.archived !== null && filters.archived !== undefined) {
    conditions.push(eq(timelineEvents.archived, filters.archived))
  } else if (!filters.includeArchived) {
    conditions.push(eq(timelineEvents.archived, false))
  }

  return await db
    .select()
    .from(timelineEvents)
    .where(and(...conditions))
    .orderBy(desc(timelineEvents.createdAt))
    .limit(normalizeLimit(filters.limit))
    .offset(Math.max(0, filters.offset ?? 0))
}

export async function getTimelineEventForOwner(
  id: string,
  owner: TimelineOwner,
): Promise<TimelineEvent | null> {
  const rows = await db
    .select()
    .from(timelineEvents)
    .where(and(eq(timelineEvents.id, id), ownerCondition(owner)))
    .limit(1)
  return rows[0] ?? null
}

export async function updateTimelineEventForOwner(
  id: string,
  owner: TimelineOwner,
  patch: TimelinePatch,
): Promise<TimelineEvent | null> {
  const [row] = await db
    .update(timelineEvents)
    .set({ ...patch, updatedAt: new Date() })
    .where(and(eq(timelineEvents.id, id), ownerCondition(owner)))
    .returning()
  return row ?? null
}

export async function findRelatedTimelineEvents(input: {
  owner: TimelineOwner
  issuer?: string | null
  docType?: string | null
  excludeId?: string | null
  limit?: number
}): Promise<TimelineEvent[]> {
  const issuer = clean(input.issuer)
  const docType = clean(input.docType)
  if (!issuer && !docType) return []

  const relevance = [
    issuer ? eq(timelineEvents.issuer, issuer) : undefined,
    docType ? eq(timelineEvents.docType, docType) : undefined,
  ].filter(Boolean) as NonNullable<ReturnType<typeof eq>>[]

  const conditions = [
    ownerCondition(input.owner),
    eq(timelineEvents.archived, false),
    or(...relevance),
  ]
  if (input.excludeId) conditions.push(ne(timelineEvents.id, input.excludeId))

  return await db
    .select()
    .from(timelineEvents)
    .where(and(...conditions))
    .orderBy(desc(timelineEvents.createdAt))
    .limit(normalizeLimit(input.limit, 5))
}

export async function getTimelineSummary(owner: TimelineOwner): Promise<TimelineSummary> {
  const rows = await listTimelineEvents(owner, { includeArchived: true, limit: 100 })
  const activeRows = rows.filter(row => !row.archived)
  const monthKeys = new Set(rows.map(row => `${row.createdAt.getFullYear()}-${row.createdAt.getMonth()}`))
  const issuers = new Set(rows.map(row => row.issuer).filter(Boolean))
  const docTypes = new Set(rows.map(row => row.docType).filter(Boolean))
  const deadlines = rows
    .map(row => row.deadline)
    .filter((value): value is string => Boolean(value))
    .sort()

  return {
    total: rows.length,
    archived: rows.length - activeRows.length,
    active: activeRows.length,
    selfChecks: rows.filter(row => row.eventType === 'self_check').length,
    documents: rows.filter(row => row.eventType === 'photo_recognition').length,
    textUnderstands: rows.filter(row => row.eventType === 'text_understand').length,
    monthsCovered: monthKeys.size,
    issuerCount: issuers.size,
    docTypeCount: docTypes.size,
    latestDeadline: deadlines[0] ?? null,
  }
}

export async function archiveExpiredTimelineEventsForMember(member: Member): Promise<number> {
  if (await isSubscriptionActive(member.familyId)) return 0
  if (isMemberTrialActive(member)) return 0
  if (!member.archiveRetentionUntil) return 0
  const until = new Date(`${member.archiveRetentionUntil}T00:00:00+09:00`)
  if (Number.isNaN(until.getTime()) || until.getTime() >= Date.now()) return 0
  const rows = await db
    .update(timelineEvents)
    .set({ archived: true, updatedAt: new Date() })
    .where(and(eq(timelineEvents.memberId, member.id), eq(timelineEvents.archived, false)))
    .returning({ id: timelineEvents.id })
  return rows.length
}

export async function unarchiveTimelineEventsForFamily(familyId: string): Promise<number> {
  const rows = await db
    .update(timelineEvents)
    .set({ archived: false, updatedAt: new Date() })
    .where(sql`${timelineEvents.memberId} IN (SELECT id FROM ${members} WHERE family_id = ${familyId})`)
    .returning({ id: timelineEvents.id })
  return rows.length
}
