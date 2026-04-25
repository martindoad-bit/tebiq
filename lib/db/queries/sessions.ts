/**
 * Sessions DAL — replaces KV `session:{sid}`.
 *
 * Stored in Postgres so we can join with members for fast getCurrentUser.
 * 30-day TTL enforced by `expires_at`; cleanup is opportunistic (no cron).
 */
import { and, eq, gte } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import { sessions, type Session } from '@/lib/db/schema'

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000

function newSid(): string {
  return `sess_${Date.now().toString(36)}_${createId().slice(0, 16)}`
}

export async function createSession(memberId: string): Promise<Session> {
  const sid = newSid()
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS)
  const [row] = await db
    .insert(sessions)
    .values({ id: sid, memberId, expiresAt })
    .returning()
  return row
}

/** Returns the session only if still valid; otherwise null. */
export async function getValidSession(sid: string): Promise<Session | null> {
  const rows = await db
    .select()
    .from(sessions)
    .where(and(eq(sessions.id, sid), gte(sessions.expiresAt, new Date())))
    .limit(1)
  return rows[0] ?? null
}

export async function destroySession(sid: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, sid))
}

export async function destroySessionsByMember(memberId: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.memberId, memberId))
}
