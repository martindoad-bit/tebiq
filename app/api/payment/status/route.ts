import { NextRequest, NextResponse } from 'next/server'
import { getPaymentStatus } from '@/lib/payment/paypay'
import { getSession, saveSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get('sessionId')
    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId required' }, { status: 400 })
    }

    const session = await getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    if (!process.env.PAYPAY_API_KEY) {
      return NextResponse.json({ status: 'COMPLETED' })
    }

    const status = await getPaymentStatus(sessionId)

    if (status === 'COMPLETED' && session.status === 'payment_pending') {
      session.status = 'payment_completed'
      await saveSession(session)
    }

    return NextResponse.json({ status })
  } catch (error) {
    console.error('Payment status error:', error)
    return NextResponse.json({ error: 'Status check failed' }, { status: 500 })
  }
}
