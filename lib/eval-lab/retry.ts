// Eval Lab — retry with exponential backoff.
//
// Used by the API routes (and the client-side batch loop, indirectly) to
// recover from transient DeepSeek / pipeline failures (Issue #14:
// retry ≤ 3, exponential backoff).
//
// Convention: `attempt` is 1-indexed in the caller (1, 2, 3 attempts);
// `maxAttempts` is the total number of attempts including the first.
// So `maxAttempts: 3` means "first try + up to 2 retries" — i.e., ≤ 3
// total invocations of `fn`.

export interface RetryOptions {
  /** Total attempts (≥ 1). Default 3. */
  maxAttempts?: number
  /** Base delay between attempts in ms. Default 500. */
  baseDelayMs?: number
  /** Cap on a single delay. Default 4000. */
  maxDelayMs?: number
  /** Jitter ratio in [0, 1]. Default 0.25 (±25%). 0 disables jitter. */
  jitter?: number
  /** Decide whether a thrown error is retryable. Default: always retry. */
  shouldRetry?: (err: unknown, attempt: number) => boolean
  /** Hook fired after each failed attempt (before sleeping). */
  onRetry?: (err: unknown, attempt: number, delayMs: number) => void
  /** Sleep impl (override for tests). Default: setTimeout. */
  sleep?: (ms: number) => Promise<void>
}

const defaultSleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

/**
 * Run `fn`, retrying on rejection up to `maxAttempts` total attempts with
 * exponential backoff. Throws the last error after attempts exhausted.
 */
export async function withRetry<T>(
  fn: (attempt: number) => Promise<T>,
  opts: RetryOptions = {},
): Promise<T> {
  const maxAttempts = opts.maxAttempts ?? 3
  const baseDelayMs = opts.baseDelayMs ?? 500
  const maxDelayMs = opts.maxDelayMs ?? 4000
  const jitter = opts.jitter ?? 0.25
  const shouldRetry = opts.shouldRetry ?? (() => true)
  const sleep = opts.sleep ?? defaultSleep

  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new Error(`withRetry: maxAttempts must be ≥ 1, got ${maxAttempts}`)
  }

  let lastErr: unknown
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await fn(attempt)
    } catch (err) {
      lastErr = err
      if (attempt === maxAttempts || !shouldRetry(err, attempt)) {
        throw err
      }
      const exp = baseDelayMs * 2 ** (attempt - 1)
      const capped = Math.min(exp, maxDelayMs)
      const j = jitter > 0 ? capped * jitter * (Math.random() * 2 - 1) : 0
      const delay = Math.max(0, Math.round(capped + j))
      opts.onRetry?.(err, attempt, delay)
      await sleep(delay)
    }
  }
  // Unreachable — loop either returns or throws — but the type system
  // doesn't know that. Re-throw the last error for completeness.
  throw lastErr
}

/** Heuristic: errors worth retrying on the API-route side. */
export function isLikelyTransient(err: unknown): boolean {
  if (!err) return false
  const name = (err as { name?: string }).name
  if (name === 'AbortError') return true // timeout
  const code = (err as { code?: string }).code
  if (code === 'ECONNRESET' || code === 'ETIMEDOUT' || code === 'EAI_AGAIN') return true
  const message = (err as { message?: string }).message ?? ''
  return /timeout|fetch failed|network|ECONNRESET|socket hang up/i.test(message)
}
