import { cookies } from 'next/headers'
import { createSession, deleteSession, getSession, getUser, type User } from './store'

const COOKIE_NAME = 'tebiq_user_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 天

export async function getCurrentUser(): Promise<User | null> {
  const c = await cookies()
  const sid = c.get(COOKIE_NAME)?.value
  if (!sid) return null
  const session = getSession(sid)
  if (!session) return null
  return getUser(session.userId)
}

export async function setUserSession(userId: string): Promise<void> {
  const session = createSession(userId)
  const c = await cookies()
  c.set(COOKIE_NAME, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function clearUserSession(): Promise<void> {
  const c = await cookies()
  const sid = c.get(COOKIE_NAME)?.value
  if (sid) deleteSession(sid)
  c.delete(COOKIE_NAME)
}
