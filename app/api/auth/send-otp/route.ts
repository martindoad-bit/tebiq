import { NextResponse } from 'next/server'
import { generateOtp } from '@/lib/auth/store'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const phone = String(body?.phone ?? '').trim()
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: '手机号格式不正确' }, { status: 400 })
    }
    const otp = await generateOtp(phone)
    // mock：实际上线时替换为短信服务
    // eslint-disable-next-line no-console
    console.log(`[TEBIQ OTP MOCK] phone=${phone} otp=${otp}`)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}

function isValidPhone(phone: string): boolean {
  return /^[+]?\d{10,15}$/.test(phone)
}
