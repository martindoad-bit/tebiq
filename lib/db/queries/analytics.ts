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

/** 按 path 聚合错误数量，TOP N 最容易出错的路径。 */
export async function errorsByPath(
  windowHours: number,
  limit = 8,
): Promise<Array<{ path: string; n: number }>> {
  const since = hoursAgo(windowHours)
  const rows = await db
    .select({
      path: errorLogs.path,
      n: sql<number>`count(*)::int`,
    })
    .from(errorLogs)
    .where(gte(errorLogs.createdAt, since))
    .groupBy(errorLogs.path)
    .orderBy(desc(sql`count(*)`))
    .limit(limit)
  return rows.map(r => ({ path: r.path ?? '(unknown)', n: Number(r.n) }))
}

// === Time series (sparkline) ===

/** 24h 内每小时事件数（UTC 桶）。返回 24 个点。 */
export async function eventsPerHour(): Promise<Array<{ t: string; n: number }>> {
  const since = hoursAgo(24)
  const rows = await db
    .select({
      hour: sql<string>`date_trunc('hour', ${events.createdAt})::text`,
      n: sql<number>`count(*)::int`,
    })
    .from(events)
    .where(gte(events.createdAt, since))
    .groupBy(sql`date_trunc('hour', ${events.createdAt})`)
    .orderBy(sql`date_trunc('hour', ${events.createdAt})`)
  return rows.map(r => ({ t: String(r.hour), n: Number(r.n) }))
}

/** 7d 内每天事件数（UTC 桶）。返回 7 个点。 */
export async function eventsPerDay(): Promise<Array<{ t: string; n: number }>> {
  const since = hoursAgo(7 * 24)
  const rows = await db
    .select({
      day: sql<string>`date_trunc('day', ${events.createdAt})::text`,
      n: sql<number>`count(*)::int`,
    })
    .from(events)
    .where(gte(events.createdAt, since))
    .groupBy(sql`date_trunc('day', ${events.createdAt})`)
    .orderBy(sql`date_trunc('day', ${events.createdAt})`)
  return rows.map(r => ({ t: String(r.day), n: Number(r.n) }))
}

/** 最近 N 条事件（实时事件流）。 */
export async function recentEvents(limit = 50) {
  return await db
    .select()
    .from(events)
    .orderBy(desc(events.createdAt))
    .limit(limit)
}

// === 转化漏斗（distinct member 计数） ===

/** 在窗口期内触达过 eventName 的不重复 member id 集合。 */
async function distinctMemberSet(
  eventName: EventName,
  windowHours: number,
): Promise<Set<string>> {
  const since = hoursAgo(windowHours)
  const rows = await db
    .select({ memberId: events.memberId })
    .from(events)
    .where(and(eq(events.eventName, eventName), gte(events.createdAt, since)))
  const set = new Set<string>()
  for (const r of rows) {
    if (r.memberId) set.add(r.memberId)
  }
  return set
}

/**
 * 用户路径转化率 — 各漏斗节点：登录 → 自查完成 → 拍照尝试 →
 * 订阅 checkout 启动 → checkout 完成。每一步用 distinct memberId 算。
 *
 * 注意：基于 events 表的 memberId 字段。匿名访问没有 memberId 的事件
 * 不进入分母（属于「漏斗外」流量）。
 */
export async function memberConversionFunnel(windowHours: number): Promise<{
  signedIn: number
  quizCompleted: number
  photoAttempted: number
  checkoutStarted: number
  checkoutCompleted: number
}> {
  const [signedIn, quizCompleted, photoAttempted, checkoutStarted, checkoutCompleted] =
    await Promise.all([
      distinctMemberSet('auth.login_success', windowHours),
      distinctMemberSet('quiz.completed', windowHours),
      distinctMemberSet('photo.recognize.attempt', windowHours),
      distinctMemberSet('subscribe.checkout_started', windowHours),
      distinctMemberSet('subscribe.checkout_completed', windowHours),
    ])
  return {
    signedIn: signedIn.size,
    quizCompleted: quizCompleted.size,
    photoAttempted: photoAttempted.size,
    checkoutStarted: checkoutStarted.size,
    checkoutCompleted: checkoutCompleted.size,
  }
}
