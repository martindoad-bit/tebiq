import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { watchList } from '@/lib/monitor/watch-list'

export const dynamic = 'force-dynamic'

interface MonitorState {
  hash: string
  lastChecked: string
}

interface MonitorAlert {
  detected: boolean
  date: string
}

interface RecentEntry {
  date: string
  result: 'green' | 'yellow' | 'red'
  triggeredItems: string[]
}

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export async function GET(req: NextRequest) {
  const adminKey = process.env.ADMIN_KEY
  if (adminKey && req.nextUrl.searchParams.get('key') !== adminKey) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  const today = todayKey()

  const [
    userCount,
    todayTests,
    greenTotal,
    yellowTotal,
    redTotal,
    recentRaw,
  ] = await Promise.all([
    storage.get<number>('stats:user_count'),
    storage.get<number>(`stats:tests:${today}`),
    storage.get<number>('stats:result:green'),
    storage.get<number>('stats:result:yellow'),
    storage.get<number>('stats:result:red'),
    storage.get<RecentEntry[]>('stats:recent'),
  ])

  const totalTests = (greenTotal ?? 0) + (yellowTotal ?? 0) + (redTotal ?? 0)
  const greenPct = totalTests > 0 ? Math.round(((greenTotal ?? 0) / totalTests) * 100) : 0
  const redPct = totalTests > 0 ? Math.round(((redTotal ?? 0) / totalTests) * 100) : 0

  const monitors = await Promise.all(
    watchList.map(async t => {
      const [state, alert] = await Promise.all([
        storage.get<MonitorState>(`monitor:${t.id}`),
        storage.get<MonitorAlert>(`monitor:alert:${t.id}`),
      ])
      return {
        id: t.id,
        name: t.name,
        url: t.url,
        lastChecked: state?.lastChecked ?? null,
        alert: alert?.detected ? alert.date : null,
      }
    }),
  )

  return NextResponse.json({
    userCount: userCount ?? 0,
    todayTests: todayTests ?? 0,
    totalTests,
    greenPct,
    redPct,
    monitors,
    recent: (recentRaw ?? []).slice(0, 10),
  })
}
