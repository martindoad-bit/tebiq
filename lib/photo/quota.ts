/**
 * 拍照配额逻辑。
 * - 免费用户 3 次/月（自然月，UTC 计算）
 * - 订阅用户无限（status='active' 或 'trialing' 的 family）
 *
 * Block 3：基于 documents 表的 created_at + family_id 计数；不需要新表。
 */
import { and, eq, gte, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { documents, subscriptions } from '@/lib/db/schema'

export const FREE_QUOTA_PER_MONTH = 3

function startOfMonthUtc(now = new Date()): Date {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0))
}

export interface QuotaStatus {
  unlimited: boolean
  used: number
  limit: number
  remaining: number
}

/**
 * 查询当前 family 的本月拍照配额状态。
 */
export async function getPhotoQuotaForFamily(familyId: string): Promise<QuotaStatus> {
  // 1. 检查订阅
  const sub = await db
    .select({ status: subscriptions.status, periodEnd: subscriptions.currentPeriodEnd })
    .from(subscriptions)
    .where(eq(subscriptions.familyId, familyId))
    .limit(1)

  const active = sub[0]
  const isUnlimited =
    !!active &&
    (active.status === 'active' || active.status === 'trialing') &&
    active.periodEnd.getTime() > Date.now()

  if (isUnlimited) {
    return { unlimited: true, used: 0, limit: Infinity, remaining: Infinity }
  }

  // 2. 计算本月用量
  const since = startOfMonthUtc()
  const rows = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(documents)
    .where(and(eq(documents.familyId, familyId), gte(documents.createdAt, since)))

  const used = Number(rows[0]?.c ?? 0)
  const remaining = Math.max(0, FREE_QUOTA_PER_MONTH - used)
  return {
    unlimited: false,
    used,
    limit: FREE_QUOTA_PER_MONTH,
    remaining,
  }
}
