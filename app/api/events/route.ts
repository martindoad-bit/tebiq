/**
 * POST /api/events — 客户端埋点 endpoint。
 *
 * 接收 JSON body { name, payload? }，写到 events 表。
 * 不强制鉴权（匿名行也有意义），但有登录就关联 family/member。
 *
 * 防滥用：name 必须在白名单 ALL_EVENTS；payload 限制 4KB；返回 204 不带任何信息。
 */
import { ALL_EVENTS, type EventName } from '@/lib/analytics/events'
import { track } from '@/lib/analytics/track'
import { getCurrentUser } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const PAYLOAD_LIMIT_BYTES = 4 * 1024

export async function POST(req: Request) {
  let body: unknown
  try {
    const text = await req.text()
    if (text.length > PAYLOAD_LIMIT_BYTES) {
      return new Response(null, { status: 413 })
    }
    body = JSON.parse(text)
  } catch {
    return new Response(null, { status: 400 })
  }

  if (!body || typeof body !== 'object') return new Response(null, { status: 400 })
  const name = String((body as { name?: unknown }).name ?? '')
  if (!ALL_EVENTS.includes(name as EventName)) return new Response(null, { status: 422 })

  const rawPayload = (body as { payload?: unknown }).payload
  const payload =
    rawPayload && typeof rawPayload === 'object' && !Array.isArray(rawPayload)
      ? (rawPayload as Record<string, unknown>)
      : {}

  const user = await getCurrentUser().catch(() => null)
  await track(name as EventName, payload, { user })
  return new Response(null, { status: 204 })
}
