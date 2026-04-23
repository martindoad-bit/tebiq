import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { listResults } from '@/lib/auth/store'

export const dynamic = 'force-dynamic'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  const results = listResults(user.id)
  return NextResponse.json({ results })
}
