import { NextRequest, NextResponse } from 'next/server'
import { getSession, saveSession } from '@/lib/session'
import { notifyReferralRequest } from '@/lib/notify/line'

export async function POST(req: NextRequest) {
  try {
    const { sessionId, name, email, message } = await req.json()

    const session = await getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    session.status = 'referral_requested'
    await saveSession(session)

    await notifyReferralRequest(
      sessionId,
      session.visaType,
      `${name} (${email}): ${message}`
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Referral error:', error)
    return NextResponse.json({ error: 'Referral submission failed' }, { status: 500 })
  }
}
