import { config as loadEnv } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// Prefer .env.local (Next.js convention) over .env
loadEnv({ path: '.env.local' })
loadEnv() // .env fallback

/**
 * drizzle-kit operations (generate / migrate / push / studio) require a
 * direct Postgres connection — Supabase's pooler (port 6543, pgbouncer)
 * does not support prepared statements / schema-introspection queries
 * that drizzle-kit emits.
 *
 * Runtime app code (lib/db/index.ts) still uses DATABASE_URL (the pooler).
 */
export default defineConfig({
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DIRECT_URL ?? 'postgresql://placeholder',
  },
  verbose: true,
  strict: true,
})
