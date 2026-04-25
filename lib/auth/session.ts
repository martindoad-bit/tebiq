/**
 * Session helpers — Postgres-backed.
 *
 * `getCurrentUser()` keeps its old signature (returns a Member or null).
 * The Member type comes from `lib/db/schema` directly, so callers get
 * Drizzle-generated types for free.
 */
import { cookies } from 'next/headers'
import {
  createSession as createDbSession,
  destroySession,
  getValidSession,
} from '@/lib/db/queries/sessions'
import { getMemberById, getOrCreateMemberByPhone } from '@/lib/db/queries/members'
import type { Member } from '@/lib/db/schema'

const COOKIE_NAME = 'tebiq_user_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 天

/**
 * Returns the currently logged-in member, or null.
 * Compat alias: many older modules still refer to "user" — same object.
 */
export async function getCurrentUser(): Promise<Member | null> {
  const c = await cookies()
  const sid = c.get(COOKIE_NAME)?.value
  if (!sid) return null
  const session = await getValidSession(sid)
  if (!session) return null
  return await getMemberById(session.memberId)
}

/**
 * Establish a session for a phone number — creating a member + family
 * on first sight. Writes the session cookie.
 */
export async function setUserSession(phone: string): Promise<Member> {
  const member = await getOrCreateMemberByPhone(phone)
  const session = await createDbSession(member.id)
  const c = await cookies()
  c.set(COOKIE_NAME, session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
  return member
}

export async function clearUserSession(): Promise<void> {
  const c = await cookies()
  const sid = c.get(COOKIE_NAME)?.value
  if (sid) await destroySession(sid)
  c.delete(COOKIE_NAME)
}

// Compat re-export for callers that still type as User.
export type { Member as User } from '@/lib/db/schema'
