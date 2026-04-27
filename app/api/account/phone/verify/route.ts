import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { consumeOtpCode } from '@/lib/db/queries/otpCodes'
import { getMemberByPhone, updateMemberPhone } from '@/lib/db/queries/members'

export const dynamic = 'force-dynamic'

function isValidPhone(phone: string): boolean {
  return /^[+]?\d{10,15}$/.test(phone)
}

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: '未登录' }, { status: 401 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }

  const phone = String(body.phone ?? '').trim()
  const otp = String(body.otp ?? '').trim()
  if (!isValidPhone(phone)) {
    return NextResponse.json({ error: '手机号格式不正确' }, { status: 400 })
  }
  if (!/^\d{6}$/.test(otp)) {
    return NextResponse.json({ error: '验证码为 6 位数字' }, { status: 400 })
  }

  const existing = await getMemberByPhone(phone)
  if (existing && existing.id !== user.id) {
    return NextResponse.json({ error: '这个手机号已绑定其他账户' }, { status: 409 })
  }

  const valid = await consumeOtpCode(phone, otp)
  if (!valid) {
    return NextResponse.json({ error: '验证码错误或已过期' }, { status: 401 })
  }

  const updated = await updateMemberPhone(user.id, phone)
  if (!updated) return NextResponse.json({ error: '绑定失败' }, { status: 500 })
  return NextResponse.json({ ok: true, phone: updated.phone })
}
