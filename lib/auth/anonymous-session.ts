import { createId } from '@paralleldrive/cuid2'
import { cookies } from 'next/headers'

export const ANON_SESSION_COOKIE_NAME = 'tebiq_anon_session'
export const INVITE_CODE_COOKIE_NAME = 'tebiq_invite_code'
const ANON_SESSION_MAX_AGE = 60 * 60 * 24 * 30
const INVITE_CODE_MAX_AGE = 60 * 60 * 24 * 30

function newAnonymousSessionId(): string {
  return `anon_${Date.now().toString(36)}_${createId().slice(0, 16)}`
}

export async function getAnonymousSessionId(): Promise<string | null> {
  const c = await cookies()
  return c.get(ANON_SESSION_COOKIE_NAME)?.value ?? null
}

export async function getOrCreateAnonymousSessionId(): Promise<string> {
  const c = await cookies()
  const existing = c.get(ANON_SESSION_COOKIE_NAME)?.value
  if (existing) return existing
  const sid = newAnonymousSessionId()
  c.set(ANON_SESSION_COOKIE_NAME, sid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ANON_SESSION_MAX_AGE,
    path: '/',
  })
  return sid
}

export async function clearAnonymousSessionId(): Promise<void> {
  const c = await cookies()
  c.delete(ANON_SESSION_COOKIE_NAME)
}

export async function setInviteCodeCookie(code: string): Promise<void> {
  const c = await cookies()
  c.set(INVITE_CODE_COOKIE_NAME, code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: INVITE_CODE_MAX_AGE,
    path: '/',
  })
}

export async function getInviteCodeFromCookie(): Promise<string | null> {
  const c = await cookies()
  return c.get(INVITE_CODE_COOKIE_NAME)?.value ?? null
}

export async function clearInviteCodeCookie(): Promise<void> {
  const c = await cookies()
  c.delete(INVITE_CODE_COOKIE_NAME)
}
