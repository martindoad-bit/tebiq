/**
 * Drizzle DB client
 *
 * Single shared postgres connection (reused across hot reloads in dev).
 * Connection string from env DATABASE_URL — Block 1 leaves this as a
 * placeholder. Block 2 will wire it to a real Supabase Postgres in Tokyo.
 *
 * Usage:
 *   import { db } from '@/lib/db'
 *   await db.select().from(members).where(eq(members.phone, '...'))
 */
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL ?? ''

// Lazy singleton: only construct the client when first used.
// This lets builds + dev tooling import the module without a real DB.
let _client: ReturnType<typeof postgres> | null = null
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null

function getClient() {
  if (_client) return _client
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL not configured. Set it in .env.local before calling DAL functions.',
    )
  }
  // Reuse client across HMR in dev to avoid leaking connections.
  const g = globalThis as { __tebiqPg?: ReturnType<typeof postgres> }
  if (g.__tebiqPg) {
    _client = g.__tebiqPg
  } else {
    _client = postgres(connectionString, {
      max: 10,
      idle_timeout: 30,
      prepare: false, // safer with pgbouncer / supabase pooler
    })
    if (process.env.NODE_ENV !== 'production') g.__tebiqPg = _client
  }
  return _client
}

/**
 * The Drizzle DB instance. Throws on first use if DATABASE_URL is missing.
 * Tests should mock this module entirely.
 */
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
  get(_target, prop, receiver) {
    if (!_db) _db = drizzle(getClient(), { schema })
    return Reflect.get(_db, prop, receiver)
  },
})

export { schema }
