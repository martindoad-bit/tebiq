import { and, eq, isNull, lt, or } from 'drizzle-orm'
import { createId } from '@paralleldrive/cuid2'
import { db } from '@/lib/db'
import { loginMagicLinkTokens, type LoginMagicLinkToken } from '@/lib/db/schema'

const MAGIC_LINK_TTL_MS = 7 * 60 * 1000

function generateToken(): string {
  return `${createId()}${createId()}`.slice(0, 48)
}

export async function createLoginMagicLinkToken(input: {
  email: string
  nextPath?: string | null
  inviteCode?: string | null
}): Promise<LoginMagicLinkToken> {
  const email = input.email.trim().toLowerCase()
  await db
    .update(loginMagicLinkTokens)
    .set({ consumedAt: new Date() })
    .where(
      and(
        eq(loginMagicLinkTokens.email, email),
        isNull(loginMagicLinkTokens.consumedAt),
      ),
    )

  const [row] = await db
    .insert(loginMagicLinkTokens)
    .values({
      email,
      token: generateToken(),
      nextPath: input.nextPath ?? null,
      inviteCode: input.inviteCode ?? null,
      expiresAt: new Date(Date.now() + MAGIC_LINK_TTL_MS),
    })
    .returning()
  return row
}

export type ConsumeMagicLinkResult =
  | { ok: true; token: LoginMagicLinkToken }
  | { ok: false; reason: 'not_found' | 'expired' | 'consumed' }

export async function consumeLoginMagicLinkToken(
  token: string,
): Promise<ConsumeMagicLinkResult> {
  if (!token) return { ok: false, reason: 'not_found' }
  const rows = await db
    .select()
    .from(loginMagicLinkTokens)
    .where(eq(loginMagicLinkTokens.token, token))
    .limit(1)
  const row = rows[0]
  if (!row) return { ok: false, reason: 'not_found' }
  if (row.consumedAt) return { ok: false, reason: 'consumed' }
  if (row.expiresAt.getTime() < Date.now()) return { ok: false, reason: 'expired' }

  await db
    .update(loginMagicLinkTokens)
    .set({ consumedAt: new Date() })
    .where(eq(loginMagicLinkTokens.id, row.id))

  return { ok: true, token: row }
}

export async function expireOldLoginMagicLinkTokens(): Promise<void> {
  await db
    .update(loginMagicLinkTokens)
    .set({ consumedAt: new Date() })
    .where(
      and(
        isNull(loginMagicLinkTokens.consumedAt),
        or(lt(loginMagicLinkTokens.expiresAt, new Date()), eq(loginMagicLinkTokens.id, '')),
      ),
    )
}
