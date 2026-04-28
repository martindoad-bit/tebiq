import { NextResponse } from 'next/server'
import { createOtpCode } from '@/lib/db/queries/otpCodes'
import { track } from '@/lib/analytics/track'
import { EVENT } from '@/lib/analytics/events'
import { sendSms } from '@/lib/notifications/sms-channel'

export const dynamic = 'force-dynamic'

function isOtpDevMode(): boolean {
  return process.env.OTP_DEV_MODE === 'true' && process.env.NODE_ENV !== 'production'
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const phone = String(body?.phone ?? '').trim()
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: '手机号格式不正确' }, { status: 400 })
    }
    const { code } = await createOtpCode(phone)
    const devMode = isOtpDevMode()
    if (devMode) {
      console.info(`[TEBIQ OTP DEV] phone=${phone} otp=${code}`)
    }

    const outcome = devMode
      ? { ok: true as const, provider: 'mock' as const }
      : await sendSms({
          to: phone,
          body: `TEBIQ 登录验证码：${code}。5 分钟内有效。`,
        })

    await track(EVENT.AUTH_OTP_SENT, {
      phonePrefix: phone.slice(0, 4),
      provider: outcome.provider,
      ok: outcome.ok,
    })

    if (!outcome.ok) {
      return NextResponse.json(
        { error: '短信发送暂时失败，请稍后再试' },
        { status: 503 },
      )
    }

    return NextResponse.json({
      ok: true,
      provider: outcome.provider,
      ...(devMode ? { devOtp: code } : {}),
    })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}

function isValidPhone(phone: string): boolean {
  return /^[+]?\d{10,15}$/.test(phone)
}
