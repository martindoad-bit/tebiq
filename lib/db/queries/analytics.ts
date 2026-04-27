/**
 * Admin KPI 看板查询。
 *
 * 全部走 events / error_logs 两表 + Drizzle COUNT；不存中间聚合表，
 * 1.0 流量量级（< 10k events/day）SELECT COUNT 完全够用。
 *
 * 时间窗口 UTC（Block 1 起的惯例）；admin 显示时按需转 JST。
 */
import { and, count, desc, eq, gte, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { errorLogs, events } from '@/lib/db/schema'
import { ALL_EVENTS, type EventName } from '@/lib/analytics/events'

function hoursAgo(h: number): Date {
  return new Date(Date.now() - h * 60 * 60 * 1000)
}

// === Volume ===

export async function eventVolumeByName(
  windowHours: number,
): Promise<Array<{ name: EventName; n: number }>> {
  const since = hoursAgo(windowHours)
  const rows = await db
    .select({
      name: events.eventName,
      n: sql<number>`count(*)::int`,
    })
    .from(events)
    .where(gte(events.createdAt, since))
    .groupBy(events.eventName)
    .orderBy(desc(sql`count(*)`))

  // 不在 ALL_EVENTS 中的会被过滤（防止误投递的脏数据进入 KPI 看板）
  const allowed = new Set<string>(ALL_EVENTS)
  return rows
    .filter(r => allowed.has(r.name))
    .map(r => ({ name: r.name as EventName, n: Number(r.n) }))
}

export async function eventCount(name: EventName, windowHours: number): Promise<number> {
  const since = hoursAgo(windowHours)
  const [row] = await db
    .select({ n: count() })
    .from(events)
    .where(and(eq(events.eventName, name), gte(events.createdAt, since)))
  return Number(row?.n ?? 0)
}

// === Quiz funnel ===

export async function quizFunnel(windowHours: number) {
  const [start, visa, completed] = await Promise.all([
    eventCount('quiz.start', windowHours),
    eventCount('quiz.visa_selected', windowHours),
    eventCount('quiz.completed', windowHours),
  ])
  return { start, visa, completed }
}

// === Photo funnel ===

export async function photoFunnel(windowHours: number) {
  const [attempt, success, fail, quotaExceeded] = await Promise.all([
    eventCount('photo.recognize.attempt', windowHours),
    eventCount('photo.recognize.success', windowHours),
    eventCount('photo.recognize.fail', windowHours),
    eventCount('photo.quota.exceeded', windowHours),
  ])
  return { attempt, success, fail, quotaExceeded }
}

// === Subscribe + invite ===

export async function conversionFunnel(windowHours: number) {
  const [
    checkoutStarted,
    checkoutCompleted,
    inviteGenerated,
    loginSuccess,
  ] = await Promise.all([
    eventCount('subscribe.checkout_started', windowHours),
    eventCount('subscribe.checkout_completed', windowHours),
    eventCount('invite.link_generated', windowHours),
    eventCount('auth.login_success', windowHours),
  ])
  return { checkoutStarted, checkoutCompleted, inviteGenerated, loginSuccess }
}

// === Errors ===

export interface ErrorBucket {
  severity: 'warn' | 'error' | 'critical'
  n: number
}

export async function errorTotals(windowHours: number): Promise<ErrorBucket[]> {
  const since = hoursAgo(windowHours)
  const rows = await db
    .select({
      severity: errorLogs.severity,
      n: sql<number>`count(*)::int`,
    })
    .from(errorLogs)
    .where(gte(errorLogs.createdAt, since))
    .groupBy(errorLogs.severity)
  return rows.map(r => ({
    severity: (r.severity as ErrorBucket['severity']) ?? 'error',
    n: Number(r.n),
  }))
}

export async function recentErrors(limit = 10) {
  return await db
    .select()
    .from(errorLogs)
    .orderBy(desc(errorLogs.createdAt))
    .limit(limit)
}
