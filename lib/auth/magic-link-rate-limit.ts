import { storage } from '@/lib/storage'

const EMAIL_WINDOW_SECONDS = 5 * 60
const EMAIL_MAX_ATTEMPTS = 3
const IP_WINDOW_SECONDS = 60 * 60
const IP_MAX_ATTEMPTS = 10

interface RateBucket {
  count: number
  resetAt: number
}

export type MagicLinkRateLimitResult =
  | { allowed: true }
  | { allowed: false; scope: 'email' | 'ip'; retryAfterSeconds: number }

function safeKeyPart(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._:-]+/g, '_')
    .slice(0, 180)
}

async function consumeBucket(
  key: string,
  maxAttempts: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
  const now = Date.now()
  const existing = await storage.get<RateBucket>(key)

  if (existing && existing.resetAt > now) {
    const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))
    if (existing.count >= maxAttempts) {
      return { allowed: false, retryAfterSeconds }
    }
    await storage.set(
      key,
      { count: existing.count + 1, resetAt: existing.resetAt },
      { ex: retryAfterSeconds },
    )
    return { allowed: true, retryAfterSeconds }
  }

  const resetAt = now + windowSeconds * 1000
  await storage.set(key, { count: 1, resetAt }, { ex: windowSeconds })
  return { allowed: true, retryAfterSeconds: windowSeconds }
}

export async function checkMagicLinkRateLimit(input: {
  email: string
  ip: string
}): Promise<MagicLinkRateLimitResult> {
  const emailResult = await consumeBucket(
    `rate:auth:magic-link:email:${safeKeyPart(input.email)}`,
    EMAIL_MAX_ATTEMPTS,
    EMAIL_WINDOW_SECONDS,
  )
  if (!emailResult.allowed) {
    return {
      allowed: false,
      scope: 'email',
      retryAfterSeconds: emailResult.retryAfterSeconds,
    }
  }

  const ipResult = await consumeBucket(
    `rate:auth:magic-link:ip:${safeKeyPart(input.ip)}`,
    IP_MAX_ATTEMPTS,
    IP_WINDOW_SECONDS,
  )
  if (!ipResult.allowed) {
    return {
      allowed: false,
      scope: 'ip',
      retryAfterSeconds: ipResult.retryAfterSeconds,
    }
  }

  return { allowed: true }
}
