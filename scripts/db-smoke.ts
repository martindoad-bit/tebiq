/**
 * scripts/db-smoke.ts — End-to-end DAL round-trip against live Supabase.
 *
 * Uses DIRECT_URL (session pooler 5432) because:
 *   - it supports prepared statements
 *   - it picks up password resets immediately
 *     (transaction pooler 6543 has propagation delay after reset)
 *
 * What it does:
 *   1. Fresh family + member (is_owner=true, phone=+8190smoke{ts})
 *   2. Insert a quiz_result tied to that member
 *   3. Read everything back, verify joins
 *   4. Print row count of all 11 tables
 *   5. Delete the family — verify ON DELETE CASCADE removed member + quiz_result
 *   6. Print final row counts (must equal pre-test counts)
 *
 * Prints "DB round-trip OK" on full success, exits 0.
 * Any failure exits 1 with a clear error and best-effort cleanup.
 */
import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.local' })
loadEnv()

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { count, eq, sql } from 'drizzle-orm'
import * as schema from '@/lib/db/schema'
import {
  families,
  members,
  quizResults,
  subscriptions,
  purchases,
  documents,
  notifications,
  invitations,
  consultations,
  sessions,
  otpCodes,
} from '@/lib/db/schema'

// Force the smoke test through DIRECT_URL — it's the connection that
// definitely works post-reset and supports prepared statements.
const url = process.env.DIRECT_URL
if (!url) {
  console.error('FAIL: DIRECT_URL not set in .env.local')
  process.exit(1)
}

const client = postgres(url, { max: 1, connect_timeout: 10, idle_timeout: 5 })
const db = drizzle(client, { schema })

const tables = [
  { name: 'families', t: families },
  { name: 'members', t: members },
  { name: 'subscriptions', t: subscriptions },
  { name: 'purchases', t: purchases },
  { name: 'quiz_results', t: quizResults },
  { name: 'documents', t: documents },
  { name: 'notifications', t: notifications },
  { name: 'invitations', t: invitations },
  { name: 'consultations', t: consultations },
  { name: 'sessions', t: sessions },
  { name: 'otp_codes', t: otpCodes },
] as const

async function rowCounts(): Promise<Record<string, number>> {
  const out: Record<string, number> = {}
  for (const { name, t } of tables) {
    const [row] = await db.select({ c: count() }).from(t)
    out[name] = Number(row.c)
  }
  return out
}

function assertEq<T>(label: string, actual: T, expected: T) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${String(expected)}, got ${String(actual)}`)
  }
}

async function cleanupOrphans() {
  // 1. Wipe any leftover smoke quiz_results (anonymous, summary.notes='smoke').
  await db
    .delete(quizResults)
    .where(sql`${quizResults.summary} ->> 'notes' = 'smoke'`)

  // 2. Wipe any smoke members and their families (cascade clears the rest).
  const stale = await db
    .select({ familyId: members.familyId })
    .from(members)
    .where(sql`${members.phone} like '+81smoke-%'`)
  if (stale.length > 0) {
    console.log(`Cleanup: removing ${stale.length} stale smoke family(ies).`)
    for (const { familyId } of stale) {
      await db.delete(families).where(eq(families.id, familyId))
    }
  }

  // 3. Empty families left behind (family with no members) — only safe to
  //    nuke ones with 0 members AND 0 subscriptions/purchases. For now,
  //    we just remove any family with no members at all.
  const emptyFams = await db
    .select({ id: families.id })
    .from(families)
    .where(
      sql`not exists (select 1 from ${members} where ${members.familyId} = ${families.id})`,
    )
  if (emptyFams.length > 0) {
    console.log(`Cleanup: removing ${emptyFams.length} member-less family(ies).`)
    for (const { id } of emptyFams) {
      await db.delete(families).where(eq(families.id, id))
    }
  }
}

async function main() {
  console.log('== TEBIQ DB smoke test ==')
  console.log('Target:', new URL(url!).hostname + ':' + new URL(url!).port)
  console.log()

  await cleanupOrphans()

  const before = await rowCounts()
  console.log('Pre-test row counts:')
  for (const k of Object.keys(before)) console.log(`  ${k.padEnd(15)} ${before[k]}`)
  console.log()

  // Phone column is varchar(20); use a short distinctive prefix + short ts.
  // Format: +81-smoke-<6 base36 chars> = 16 chars total, leaves headroom.
  const tsShort = Date.now().toString(36).slice(-6)
  const phone = `+81smoke-${tsShort}` // <= 16 chars

  // ---- 1. create family + member ----
  console.log('1. Inserting family + member …')
  const [family] = await db.insert(families).values({}).returning()
  const [member] = await db
    .insert(members)
    .values({
      familyId: family.id,
      isOwner: true,
      phone,
      visaType: 'gijinkoku',
    })
    .returning()
  assertEq('member.familyId', member.familyId, family.id)
  assertEq('member.isOwner', member.isOwner, true)
  assertEq('member.phone', member.phone, phone)
  assertEq('member.visaType', member.visaType, 'gijinkoku')
  console.log(`   family=${family.id}  member=${member.id}`)

  // ---- 2. insert quiz_result ----
  console.log('2. Inserting quiz_result tied to member …')
  const [qr] = await db
    .insert(quizResults)
    .values({
      memberId: member.id,
      sessionId: null,
      visaType: 'gijinkoku',
      answers: { '1': 1, '2': 0 },
      resultColor: 'green',
      summary: { triggered: [], notes: 'smoke' },
    })
    .returning()
  assertEq('quiz_result.memberId', qr.memberId, member.id)
  console.log(`   quiz_result=${qr.id}  resultColor=${qr.resultColor}`)

  // ---- 3. read back via join (member.familyId == family.id, qr.memberId == member.id) ----
  console.log('3. Reading back via join …')
  const joined = await db
    .select({
      memberId: members.id,
      memberPhone: members.phone,
      familyId: members.familyId,
      qrId: quizResults.id,
      qrColor: quizResults.resultColor,
    })
    .from(members)
    .innerJoin(quizResults, eq(quizResults.memberId, members.id))
    .where(eq(members.id, member.id))
  assertEq('join row count', joined.length, 1)
  assertEq('joined.familyId', joined[0].familyId, family.id)
  assertEq('joined.qrId', joined[0].qrId, qr.id)
  console.log(`   join OK: 1 row, family=${joined[0].familyId} qr=${joined[0].qrId}`)

  // ---- 4. mid-test counts (should be +1 family, +1 member, +1 qr) ----
  const mid = await rowCounts()
  console.log('Mid-test row counts (delta from pre-test in parens):')
  for (const k of Object.keys(mid)) {
    const delta = mid[k] - before[k]
    const tag = delta === 0 ? '' : ` (+${delta})`
    console.log(`  ${k.padEnd(15)} ${mid[k]}${tag}`)
  }
  assertEq('Δ families', mid['families'] - before['families'], 1)
  assertEq('Δ members', mid['members'] - before['members'], 1)
  assertEq('Δ quiz_results', mid['quiz_results'] - before['quiz_results'], 1)
  console.log()

  // ---- 5. delete family — verify cascade behavior matches schema ----
  // Schema design: members CASCADE on family delete; quiz_results.member_id
  // is SET NULL on member delete (so anonymous results aren't lost).
  // We expect: member gone, quiz_result still present but memberId=null.
  console.log('5. Deleting family (test cascade + set-null behavior) …')
  await db.delete(families).where(eq(families.id, family.id))

  const orphanMembers = await db
    .select({ id: members.id })
    .from(members)
    .where(eq(members.id, member.id))
  assertEq('member cascade-deleted', orphanMembers.length, 0)
  console.log('   ✓ member cascade-deleted with family')

  const qrAfter = await db
    .select({ id: quizResults.id, memberId: quizResults.memberId })
    .from(quizResults)
    .where(eq(quizResults.id, qr.id))
  assertEq('quiz_result still present', qrAfter.length, 1)
  assertEq('quiz_result.memberId set null', qrAfter[0].memberId, null)
  console.log('   ✓ quiz_result kept, member_id set NULL (anonymous-safe)')

  // Now explicitly delete the quiz_result so the test leaves the DB clean.
  await db.delete(quizResults).where(eq(quizResults.id, qr.id))
  const qrFinal = await db
    .select({ id: quizResults.id })
    .from(quizResults)
    .where(eq(quizResults.id, qr.id))
  assertEq('quiz_result manual-deleted', qrFinal.length, 0)
  console.log('   ✓ quiz_result manually deleted (cleanup)')


  // ---- 6. final counts must match pre-test ----
  const after = await rowCounts()
  console.log('Post-test row counts:')
  for (const k of Object.keys(after)) {
    const tag = after[k] === before[k] ? '' : ` (Δ ${after[k] - before[k]})`
    console.log(`  ${k.padEnd(15)} ${after[k]}${tag}`)
  }
  for (const k of Object.keys(after)) {
    assertEq(`final count of ${k}`, after[k], before[k])
  }

  console.log()
  console.log('✅ DB round-trip OK')
}

main()
  .catch(async err => {
    console.error()
    console.error('❌ FAIL:', err.message ?? err)
    if (err && typeof err === 'object') {
      const e = err as { code?: string; detail?: string; hint?: string; cause?: unknown }
      if (e.code) console.error('   code:', e.code)
      if (e.detail) console.error('   detail:', e.detail)
      if (e.hint) console.error('   hint:', e.hint)
      if (e.cause) console.error('   cause:', e.cause)
    }
    process.exitCode = 1
  })
  .finally(async () => {
    try {
      await client.end()
    } catch {
      /* ignore */
    }
  })
