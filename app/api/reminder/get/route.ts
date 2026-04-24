import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { storage } from '@/lib/storage'

export const dynamic = 'force-dynamic'

interface ReminderRecord {
  date: string
  setAt: string
}

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  const reminder = await storage.get<ReminderRecord>(`reminder:${user.phone}`)
  if (!reminder) return NextResponse.json({ reminder: null })

  const today = new Date()
  const expiry = new Date(reminder.date + 'T00:00:00')
  const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return NextResponse.json({ reminder, daysLeft })
}
