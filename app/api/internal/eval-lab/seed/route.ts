import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { seedStarterQuestions } from '@/lib/db/queries/eval-lab'

// POST /api/internal/eval-lab/seed
//
// Idempotent — safe to call repeatedly. Re-runs no-op on existing
// starter_tag rows.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST() {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  try {
    const result = await seedStarterQuestions()
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/seed] failed', message)
    return NextResponse.json({ error: 'seed_failed', detail: message }, { status: 500 })
  }
}
