import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { storage } from '@/lib/storage'
import { watchList } from '@/lib/monitor/watch-list'

export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Vercel Hobby 上限

interface MonitorState {
  hash: string
  lastChecked: string
}

interface MonitorAlert {
  detected: boolean
  date: string
}

export async function GET() {
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

  return NextResponse.json({ results, ranAt: new Date().toISOString() })
}
