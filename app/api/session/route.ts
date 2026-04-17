import { NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/session'

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('sessionId')
  const session = await getSession(sessionId || undefined)
  if (!session) {
    return NextResponse.json({ error: 'Session not found' }, { status: 404 })
  }
  return NextResponse.json({ session })
}
