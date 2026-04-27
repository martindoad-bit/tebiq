/**
 * Client-side track — fire-and-forget POST 到 /api/events。
 *
 * 用法：
 *   import { trackClient } from '@/lib/analytics/client'
 *   trackClient(EVENT.CTA_CLICK, { source: 'home_action_card', target: 'photo' })
 *
 * 永远不会抛、不会等。失败静默到 console.warn。
 */
import type { EventName } from './events'

export function trackClient(name: EventName, payload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  try {
    // navigator.sendBeacon 适合 fire-and-forget；某些场景退化到 fetch with keepalive
    const body = JSON.stringify({ name, payload })
    if ('sendBeacon' in navigator) {
      const blob = new Blob([body], { type: 'application/json' })
      navigator.sendBeacon('/api/events', blob)
      return
    }
    void fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {})
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[analytics] trackClient failed', name, err)
  }
}
