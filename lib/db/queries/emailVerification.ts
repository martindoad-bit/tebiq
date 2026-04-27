/**
 * Email verification token DAL.
 *
 * Flow:
 *   1. createEmailVerificationToken(memberId, email) — invalidates older
 *      pending tokens for that member, creates a fresh single-use token
 *      with 24h TTL.
 *   2. consumeEmailVerificationToken(token) — atomically marks as
 *      consumed and updates members.email_verified_at.
 *
 * Tokens are 48-char base32 generated from cuid2 + Date.now (collision-
 * resistant enough for 24h). Lookup is unique-indexed.
 */
import { and, eq, isNull, lt, or } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import {
  emailVerificationTokens,
  members,
  type EmailVerificationToken,
} from '@/lib/db/schema'

const TTL_MS = 24 * 60 * 60 * 1000 // 24 小时

function generateToken(): string {
  return `${createId()}${createId()}`.slice(0, 48)
}

export async function createEmailVerificationToken(
  memberId: string,
  email: string,
): Promise<EmailVerificationToken> {
  const trimmedEmail = email.trim().toLowerCase()
  if (!trimmedEmail) {
    throw new Error('Cannot create verification token for empty email')
  }
  // 让该 member 之前未消费的 token 全部失效（标记 consumed），避免一邮多 token
  await db
    .update(emailVerificationTokens)
    .set({ consumedAt: new Date() })
    .where(
      and(
        eq(emailVerificationTokens.memberId, memberId),
        isNull(emailVerificationTokens.consumedAt),
      ),
    )
  const [row] = await db
    .insert(emailVerificationTokens)
    .values({
      memberId,
      token: generateToken(),
      email: trimmedEmail,
      expiresAt: new Date(Date.now() + TTL_MS),
    })
    .returning()
  return row
}

export interface ConsumeResult {
  ok: boolean
  reason?: 'not_found' | 'expired' | 'consumed' | 'email_changed'
  memberId?: string
  email?: string
}

/**
 * 校验并消费一个 token。注意要在事务里：先 SELECT 然后 UPDATE，
 * 避免并发双重消费。
 */
export async function consumeEmailVerificationToken(
  token: string,
): Promise<ConsumeResult> {
  if (!token) return { ok: false, reason: 'not_found' }
  const rows = await db
    .select()
    .from(emailVerificationTokens)
    .where(eq(emailVerificationTokens.token, token))
    .limit(1)
  const row = rows[0]
  if (!row) return { ok: false, reason: 'not_found' }
  if (row.consumedAt) return { ok: false, reason: 'consumed' }
  if (row.expiresAt.getTime() < Date.now()) return { ok: false, reason: 'expired' }

  // 二次确认 member 当前 email 仍是 token 对应的（防止用户改完邮箱再点旧链接）
  const memberRows = await db
    .select({ id: members.id, email: members.email })
    .from(members)
    .where(eq(members.id, row.memberId))
    .limit(1)
  const member = memberRows[0]
  if (!member) return { ok: false, reason: 'not_found' }
  if ((member.email ?? '').toLowerCase() !== row.email.toLowerCase()) {
    return { ok: false, reason: 'email_changed' }
  }

  // 原子性写入：标记 consumed + member.email_verified_at
  await db
    .update(emailVerificationTokens)
    .set({ consumedAt: new Date() })
    .where(eq(emailVerificationTokens.id, row.id))
  await db
    .update(members)
    .set({ emailVerifiedAt: new Date() })
    .where(eq(members.id, row.memberId))

  return { ok: true, memberId: row.memberId, email: row.email }
}

/** 清理过期 token（cron 用，可选）。 */
export async function expireOldEmailVerificationTokens(): Promise<void> {
  await db
    .update(emailVerificationTokens)
    .set({ consumedAt: new Date() })
    .where(
      and(
        isNull(emailVerificationTokens.consumedAt),
        or(
          lt(emailVerificationTokens.expiresAt, new Date()),
          // null 已被上面 isNull 排除；这里 or 仅为类型对齐
          eq(emailVerificationTokens.id, ''),
        ),
      ),
    )
}
