import { VisaSession, SessionStatus, SurveyAnswer } from '@/types/session'
import { cookies } from 'next/headers'

const SESSION_COOKIE = 'tebiq_session'

export function createSession(visaType: string): VisaSession {
  return {
    sessionId: `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    visaType,
    status: 'created' as SessionStatus,
    answers: [] as SurveyAnswer[],
    requiresReferral: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export async function getSession(sessionId?: string): Promise<VisaSession | null> {
  try {
    const cookieStore = await cookies()
    const raw = cookieStore.get(SESSION_COOKIE)?.value
    if (!raw) return null
    const session = JSON.parse(raw) as VisaSession
    if (sessionId && session.sessionId !== sessionId) return null
    return session
  } catch {
    return null
  }
}

export async function saveSession(session: VisaSession): Promise<void> {
  const cookieStore = await cookies()
  session.updatedAt = new Date().toISOString()
  cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}
