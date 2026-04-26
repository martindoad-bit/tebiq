import { NextResponse } from 'next/server'
import { consumeOtpCode } from '@/lib/db/queries/otpCodes'
import { setUserSession } from '@/lib/auth/session'
import { getMemberByPhone } from '@/lib/db/queries/members'
import { acceptInvitationAndGrantReward } from '@/lib/db/queries/invitations'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const phone = String(body?.phone ?? '').trim()
    const otp = String(body?.otp ?? '').trim()
    const inviteCode = String(body?.inviteCode ?? '').trim()
    if (!phone || !otp) {
      return NextResponse.json({ error: '请输入手机号和验证码' }, { status: 400 })
    }
    const valid = await consumeOtpCode(phone, otp)
    if (!valid) {
      return NextResponse.json({ error: '验证码错误或已过期' }, { status: 401 })
    }
    const existingMember = await getMemberByPhone(phone)
    const member = await setUserSession(phone)
    let invitationAccepted = false
    if (inviteCode && !existingMember) {
      try {
        const accepted = await acceptInvitationAndGrantReward(inviteCode, member.id)
        invitationAccepted = !!accepted
      } catch {
        invitationAccepted = false
      }
    }
    return NextResponse.json({ user: { phone: member.phone }, invitationAccepted })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}
