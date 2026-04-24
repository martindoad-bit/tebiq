import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { getProfile } from '@/lib/auth/profile'

export const dynamic = 'force-dynamic'

export async function GET() {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })
  const profile = await getProfile(user.phone)
  return NextResponse.json({ profile })
}
