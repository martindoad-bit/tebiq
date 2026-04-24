import { cookies } from 'next/headers'
import {
  createSession,
  deleteSession,
  getSessionPhone,
  getUserByPhone,
  type User,
} from './store'

const COOKIE_NAME = 'tebiq_user_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 天

export async function getCurrentUser(): Promise<User | null> {
  const c = await cookies()
  const sid = c.get(COOKIE_NAME)?.value
  if (!sid) return null
  const phone = await getSessionPhone(sid)
  if (!phone) return null
  return await getUserByPhone(phone)
}

export async function setUserSession(phone: string): Promise<void> {
  const sid = await createSession(phone)
  const c = await cookies()
  c.set(COOKIE_NAME, sid, {
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
  if (sid) await deleteSession(sid)
  c.delete(COOKIE_NAME)
}
