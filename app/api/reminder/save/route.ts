import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { storage } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface ReminderRecord {
  date: string // 在留卡到期日 YYYY-MM-DD
  setAt: string
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  try {
    const body = await req.json()
    const date = String(body?.date ?? '').trim()
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json({ error: '日期格式应为 YYYY-MM-DD' }, { status: 400 })
    }
    const record: ReminderRecord = { date, setAt: new Date().toISOString() }
    await storage.set(`reminder:${user.id}`, record)
    return NextResponse.json({ ok: true, reminder: record })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}

export async function DELETE() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })
  await storage.del(`reminder:${user.id}`)
  return NextResponse.json({ ok: true })
}
