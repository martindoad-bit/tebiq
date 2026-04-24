import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { saveProfile, type UserProfile } from '@/lib/auth/profile'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  try {
    const body = await req.json()
    const profile: UserProfile = {
      visaType: String(body?.visaType ?? '').trim(),
      expiryDate: String(body?.expiryDate ?? '').trim(),
      yearsInJapan: (body?.yearsInJapan ?? '1-3') as UserProfile['yearsInJapan'],
      companyType: (body?.companyType ?? 'unknown') as UserProfile['companyType'],
      recentChanges: Array.isArray(body?.recentChanges) ? body.recentChanges : [],
      updatedAt: new Date().toISOString(),
    }
    if (!profile.visaType) {
      return NextResponse.json({ error: '请选择签证类型' }, { status: 400 })
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(profile.expiryDate)) {
      return NextResponse.json({ error: '到期日格式不正确' }, { status: 400 })
    }
    await saveProfile(user.phone, profile)
    return NextResponse.json({ ok: true, profile })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}
