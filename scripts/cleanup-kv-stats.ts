/**
 * scripts/cleanup-kv-stats.ts
 *
 * Wipe all `stats:*` keys from Upstash Redis. Block 2 moves stats from
 * counter rows in KV to runtime Drizzle COUNT() queries against Postgres,
 * so these counters are no longer authoritative.
 *
 * Idempotent — safe to run multiple times.
 *
 * Usage:
 *   npm run cleanup-kv-stats
 */
import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })
loadEnv()

import { Redis } from '@upstash/redis'

const url = process.env.tebiq_KV_REST_API_URL
const token = process.env.tebiq_KV_REST_API_TOKEN
if (!url || !token) {
  console.error('FAIL: Upstash env vars not set (tebiq_KV_REST_API_URL / tebiq_KV_REST_API_TOKEN).')
  process.exit(1)
}
const redis = new Redis({ url, token })

const PATTERN = 'stats:*'

async function main() {
  console.log(`Scanning Upstash for keys matching "${PATTERN}" …`)
  const matched: string[] = []
  let cursor = 0
  do {
    const [next, batch] = await redis.scan(cursor, { match: PATTERN, count: 100 })
    matched.push(...batch)
    cursor = Number(next)
  } while (cursor !== 0)

  if (matched.length === 0) {
    console.log('Nothing to clean — no stats:* keys present.')
    return
  }

  console.log(`Found ${matched.length} key(s):`)
  for (const k of matched) console.log(`  - ${k}`)
  console.log()

  let deleted = 0
  for (const k of matched) {
    await redis.del(k)
    deleted++
  }
  console.log(`✓ Deleted ${deleted} key(s).`)
}

main().catch(err => {
  console.error('FAIL:', err.message ?? err)
  process.exit(1)
})
