import { NextResponse } from 'next/server'
import { createOtpCode } from '@/lib/db/queries/otpCodes'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const phone = String(body?.phone ?? '').trim()
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: '手机号格式不正确' }, { status: 400 })
    }
    const { code } = await createOtpCode(phone)
    // mock: 实际上线时替换为 SMS 发送服务
    // eslint-disable-next-line no-console
    console.log(`[TEBIQ OTP MOCK] phone=${phone} otp=${code}`)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}

function isValidPhone(phone: string): boolean {
  return /^[+]?\d{10,15}$/.test(phone)
}
