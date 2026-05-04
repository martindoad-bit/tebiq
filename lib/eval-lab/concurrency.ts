// Eval Lab — concurrency limiter.
//
// Tiny worker-pool style `pLimit(n)`. Wraps an async function so that at
// most `n` invocations are in flight at once. Used by the batch-generate
// path to keep DeepSeek + TEBIQ pipeline calls under the cap (Issue #14:
// concurrency ≤ 3).
//
// We intentionally don't pull in p-limit / async-pool to keep the bundle
// footprint of the internal Eval Lab tiny. The implementation is small
// enough to inspect on one screen.

export interface Limiter {
  /** Run the task with a slot from the pool. Resolves with task's value. */
  <T>(task: () => Promise<T>): Promise<T>
  /** Number of tasks currently running (0..n). */
  readonly active: number
  /** Number of tasks queued behind the cap. */
  readonly queued: number
}

export function pLimit(n: number): Limiter {
  if (!Number.isInteger(n) || n < 1) {
    throw new Error(`pLimit: concurrency must be a positive integer, got ${n}`)
  }

  let active = 0
  const queue: Array<() => void> = []

  const next = () => {
    if (active >= n) return
    const fire = queue.shift()
    if (fire) fire()
  }

  const run = <T,>(task: () => Promise<T>): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const start = () => {
        active += 1
        Promise.resolve()
          .then(task)
          .then(
            v => {
              active -= 1
              next()
              resolve(v)
            },
            err => {
              active -= 1
              next()
              reject(err)
            },
          )
      }
      if (active < n) {
        start()
      } else {
        queue.push(start)
      }
    })
  }

  return Object.assign(run, {
    get active() {
      return active
    },
    get queued() {
      return queue.length
    },
  }) as Limiter
}
