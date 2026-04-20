import { NextRequest, NextResponse } from 'next/server'
import { createPaymentSession } from '@/lib/payment/paypay'
import { createSession, saveSession } from '@/lib/session'
import { VISA_TYPES } from '@/lib/config/visa-types'

export async function POST(req: NextRequest) {
  try {
    const { visaType } = await req.json()

    const config = VISA_TYPES[visaType]
    if (!config) {
      return NextResponse.json({ error: 'Invalid visa type' }, { status: 400 })
    }

    const session = createSession(visaType)
    session.status = 'payment_pending'
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Skip PayPay in development
    if (!process.env.PAYPAY_API_KEY) {
      session.status = 'payment_completed'
      await saveSession(session)
      return NextResponse.json({ redirectUrl: `${baseUrl}/survey?session=${session.sessionId}` })
    }

    const payUrl = await createPaymentSession({
      merchantPaymentId: session.sessionId,
      amount: config.price,
      orderDescription: `TEBIQ ${config.labelZh}`,
      redirectUrl: `${baseUrl}/survey?session=${session.sessionId}`,
    })

    await saveSession(session)
    return NextResponse.json({ redirectUrl: payUrl })
  } catch (error) {
    console.error('Payment create error:', error)
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 })
  }
}
