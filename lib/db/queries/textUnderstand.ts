import { and, eq, gte, isNull, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import {
  subscriptions,
  textUnderstandRequests,
  type NewTextUnderstandRequest,
  type TextUnderstandRequest,
} from '@/lib/db/schema'

export const FREE_TEXT_UNDERSTAND_PER_MONTH = 5

function startOfMonthUtc(now = new Date()): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0))
}

export interface TextUnderstandQuota {
  unlimited: boolean
  used: number
  limit: number
  remaining: number
}

async function familyHasUnlimited(familyId: string): Promise<boolean> {
  const rows = await db
    .select({ status: subscriptions.status, periodEnd: subscriptions.currentPeriodEnd })
    .from(subscriptions)
    .where(eq(subscriptions.familyId, familyId))
    .limit(1)
  const sub = rows[0]
  return Boolean(
    sub &&
      (sub.status === 'active' || sub.status === 'trialing') &&
      sub.periodEnd.getTime() > Date.now(),
  )
}

export async function getTextUnderstandQuotaForFamily(
  familyId: string,
): Promise<TextUnderstandQuota> {
  if (await familyHasUnlimited(familyId)) {
    return { unlimited: true, used: 0, limit: Infinity, remaining: Infinity }
  }

  const since = startOfMonthUtc()
  const rows = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(textUnderstandRequests)
    .where(and(eq(textUnderstandRequests.familyId, familyId), gte(textUnderstandRequests.createdAt, since)))
  const used = Number(rows[0]?.c ?? 0)
  return {
    unlimited: false,
    used,
    limit: FREE_TEXT_UNDERSTAND_PER_MONTH,
    remaining: Math.max(0, FREE_TEXT_UNDERSTAND_PER_MONTH - used),
  }
}

export async function getTextUnderstandQuotaForSession(
  sessionId: string,
): Promise<TextUnderstandQuota> {
  const since = startOfMonthUtc()
  const rows = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(textUnderstandRequests)
    .where(and(
      eq(textUnderstandRequests.sessionId, sessionId),
      isNull(textUnderstandRequests.familyId),
      gte(textUnderstandRequests.createdAt, since),
    ))
  const used = Number(rows[0]?.c ?? 0)
  return {
    unlimited: false,
    used,
    limit: FREE_TEXT_UNDERSTAND_PER_MONTH,
    remaining: Math.max(0, FREE_TEXT_UNDERSTAND_PER_MONTH - used),
  }
}

export async function createTextUnderstandRequest(
  input: NewTextUnderstandRequest,
): Promise<TextUnderstandRequest> {
  const [row] = await db.insert(textUnderstandRequests).values(input).returning()
  return row
}
