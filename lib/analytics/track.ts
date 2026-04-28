/**
 * Server-side track helper.
 *
 * 用法（在 API 路由 / Server Action 里）：
 *   await track(EVENT.PHOTO_RECOGNIZE_SUCCESS, { docType: result.docType }, { user })
 *
 * 失败永远不抛 — 埋点不能阻塞业务逻辑。错误吞掉但写到 console。
 */
import { db } from '@/lib/db'
import { events, type Member, type NewEventRow } from '@/lib/db/schema'
import type { EventName } from './events'

export interface TrackContext {
  user?: Pick<Member, 'id' | 'familyId'> | null
  sessionId?: string | null
}

export async function track(
  name: EventName,
  payload: Record<string, unknown> = {},
  ctx: TrackContext = {},
): Promise<void> {
  const row: NewEventRow = {
    eventName: name,
    familyId: ctx.user?.familyId ?? null,
    memberId: ctx.user?.id ?? null,
    sessionId: ctx.sessionId ?? null,
    payload: Object.keys(payload).length > 0 ? payload : null,
  }
  try {
    await db.insert(events).values(row)
  } catch (err) {
    // 埋点失败不影响业务；console.warn 让 admin error log 可看到
    // eslint-disable-next-line no-console
    console.warn('[analytics] track failed', name, err)
  }
}
