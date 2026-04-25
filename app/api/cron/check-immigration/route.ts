import crypto from 'crypto'
import { storage } from '@/lib/storage'
import { watchList } from '@/lib/monitor/watch-list'
import { ok, errors } from '@/lib/api/response'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Vercel Hobby 上限

/**
 * Authentication: Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}`.
 * If CRON_SECRET is unset, allow the call (dev fallback). In production
 * the env var MUST be set so external traffic can't trigger scans.
 */
function checkCronAuth(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (!secret) return true
  const header = req.headers.get('authorization') ?? ''
  return header === `Bearer ${secret}`
}

interface MonitorState {
  hash: string
  lastChecked: string
}

interface MonitorAlert {
  detected: boolean
  date: string
}

export async function GET(req: Request) {
  if (!checkCronAuth(req)) return errors.unauthorized()

  const results: Array<{
    id: string
    changed: boolean
    error?: string
    lastChecked: string
  }> = []

  for (const target of watchList) {
    const lastChecked = new Date().toISOString()
    try {
      const res = await fetch(target.url, {
        headers: { 'User-Agent': 'TEBIQ-Monitor/1.0' },
        signal: AbortSignal.timeout(20000),
      })
      if (!res.ok) {
        results.push({
          id: target.id,
          changed: false,
          error: `HTTP ${res.status}`,
          lastChecked,
        })
        continue
      }
      const buf = Buffer.from(await res.arrayBuffer())
      const hash = crypto.createHash('sha1').update(buf).digest('hex')
      const prev = await storage.get<MonitorState>(`monitor:${target.id}`)
      const changed = !!prev && prev.hash !== hash
      await storage.set(
        `monitor:${target.id}`,
        { hash, lastChecked } satisfies MonitorState,
      )
      if (changed) {
        await storage.set(
          `monitor:alert:${target.id}`,
          { detected: true, date: lastChecked } satisfies MonitorAlert,
        )
      }
      results.push({ id: target.id, changed, lastChecked })
    } catch (err) {
      results.push({
        id: target.id,
        changed: false,
        error: err instanceof Error ? err.message : String(err),
        lastChecked,
      })
    }
  }

  return ok({ results, ranAt: new Date().toISOString() })
}
