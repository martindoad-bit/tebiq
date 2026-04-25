/**
 * OTP codes DAL — replaces KV `otp:{phone}`.
 *
 * Each request generates a new row with 5-minute TTL.
 * Verification is single-use: success marks consumed_at; old codes stay
 * until rotated out by cleanup (Block 2 may add a cron).
 */
import { and, desc, eq, gte, isNull } from 'drizzle-orm'
import { db } from '@/lib/db'
import { otpCodes, type OtpCode } from '@/lib/db/schema'

const OTP_TTL_MS = 5 * 60 * 1000

function generateCode(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export async function createOtpCode(phone: string): Promise<{ code: string; row: OtpCode }> {
  const code = generateCode()
  const expiresAt = new Date(Date.now() + OTP_TTL_MS)
  const [row] = await db
    .insert(otpCodes)
    .values({ phone, code, expiresAt })
    .returning()
  return { code, row }
}

/**
 * Validate `code` against the most recent unconsumed OTP for `phone`.
 * On match, marks consumed_at and returns true.
 */
export async function consumeOtpCode(phone: string, code: string): Promise<boolean> {
  const candidates = await db
    .select()
    .from(otpCodes)
    .where(
      and(
        eq(otpCodes.phone, phone),
        gte(otpCodes.expiresAt, new Date()),
        isNull(otpCodes.consumedAt),
      ),
    )
    .orderBy(desc(otpCodes.createdAt))
    .limit(5)

  const match = candidates.find(c => c.code === code)
  if (!match) return false

  await db
    .update(otpCodes)
    .set({ consumedAt: new Date() })
    .where(eq(otpCodes.id, match.id))
  return true
}
