import { NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface RecentEntry {
  date: string
  result: 'green' | 'yellow' | 'red'
  triggeredItems: string[]
}

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const verdict = body?.verdict as 'green' | 'yellow' | 'red' | undefined
    const triggeredItems = (body?.triggeredItems as string[]) ?? []
    if (verdict !== 'green' && verdict !== 'yellow' && verdict !== 'red') {
      return NextResponse.json({ error: 'verdict 不合法' }, { status: 400 })
    }

    const today = todayKey()
    const [tt, vt, recent] = await Promise.all([
      storage.get<number>(`stats:tests:${today}`),
      storage.get<number>(`stats:result:${verdict}`),
      storage.get<RecentEntry[]>('stats:recent'),
    ])

    await Promise.all([
      storage.set(`stats:tests:${today}`, (tt ?? 0) + 1),
      storage.set(`stats:result:${verdict}`, (vt ?? 0) + 1),
      storage.set(
        'stats:recent',
        [
          {
            date: new Date().toISOString(),
            result: verdict,
            triggeredItems,
          } satisfies RecentEntry,
          ...(recent ?? []),
        ].slice(0, 50),
      ),
    ])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}
