import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'
import { watchList } from '@/lib/monitor/watch-list'

export const dynamic = 'force-dynamic'

interface MonitorState {
  hash: string
  lastChecked: string
}

export async function GET() {
  const targets = await Promise.all(
    watchList.map(async t => {
      const state = await storage.get<MonitorState>(`monitor:${t.id}`)
      return {
        id: t.id,
        name: t.name,
        lastChecked: state?.lastChecked ?? null,
      }
    }),
  )
  return NextResponse.json({ targets })
}
