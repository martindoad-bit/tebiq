import { createHash } from 'crypto'
import { storage } from '@/lib/storage'

const EMAIL_WINDOW_SECONDS = 5 * 60
const EMAIL_LIMIT = 3
const IP_WINDOW_SECONDS = 60 * 60
const IP_LIMIT = 10

interface RateBucket {
  count: number
  resetAt: number
}

export type MagicLinkRateLimitResult =
  | { ok: true }
  | { ok: false; scope: 'email' | 'ip'; retryAfterSeconds: number }

function hashValue(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 32)
}

async function consumeBucket(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<{ ok: true } | { ok: false; retryAfterSeconds: number }> {
  const now = Date.now()
  const existing = await storage.get<RateBucket>(key)
  const bucket =
    existing && existing.resetAt > now
      ? existing
      : { count: 0, resetAt: now + windowSeconds * 1000 }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    }
  }

  bucket.count += 1
  await storage.set(key, bucket, {
    ex: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
  })
  return { ok: true }
}

export async function checkMagicLinkRateLimit(
  email: string,
  ipAddress: string,
): Promise<MagicLinkRateLimitResult> {
  const emailResult = await consumeBucket(
    `rate:auth:magic-link:email:${hashValue(email.toLowerCase())}`,
    EMAIL_LIMIT,
    EMAIL_WINDOW_SECONDS,
  )
  if (!emailResult.ok) {
    return { ok: false, scope: 'email', retryAfterSeconds: emailResult.retryAfterSeconds }
  }

  const ipResult = await consumeBucket(
    `rate:auth:magic-link:ip:${hashValue(ipAddress || 'unknown')}`,
    IP_LIMIT,
    IP_WINDOW_SECONDS,
  )
  if (!ipResult.ok) {
    return { ok: false, scope: 'ip', retryAfterSeconds: ipResult.retryAfterSeconds }
  }

  return { ok: true }
}
