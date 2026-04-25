import { NextResponse } from 'next/server'
import { consumeOtpCode } from '@/lib/db/queries/otpCodes'
import { setUserSession } from '@/lib/auth/session'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const phone = String(body?.phone ?? '').trim()
    const otp = String(body?.otp ?? '').trim()
    if (!phone || !otp) {
      return NextResponse.json({ error: '请输入手机号和验证码' }, { status: 400 })
    }
    const valid = await consumeOtpCode(phone, otp)
    if (!valid) {
      return NextResponse.json({ error: '验证码错误或已过期' }, { status: 401 })
    }
    // setUserSession internally calls getOrCreateMemberByPhone, so no need to do it here.
    const member = await setUserSession(phone)
    return NextResponse.json({ user: { phone: member.phone } })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}
