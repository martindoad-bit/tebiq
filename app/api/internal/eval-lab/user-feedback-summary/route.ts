import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'

// GET /api/internal/eval-lab/user-feedback-summary
//
// Aggregate production user feedback from ai_consultations.feedback_type
// so Eval Lab can show "how real users reacted" alongside AQL annotations.
//
// Optional query params:
//   from=YYYY-MM-DD (inclusive)
//   to=YYYY-MM-DD (inclusive)
//   limit_recent=N (default 50) — most recent N consultations with feedback
//
// Internal-only; 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface FeedbackCount {
  feedback_type: string
  count: number
}

interface RecentFeedback {
  consultation_id: string
  feedback_type: string
  question_preview: string
  created_at: string
}

export async function GET(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  const url = new URL(req.url)
  const from = url.searchParams.get('from')
  const to = url.searchParams.get('to')
  const limitRecent = Math.min(Math.max(Number(url.searchParams.get('limit_recent') ?? '50') || 50, 1), 500)

  try {
    const conditions: string[] = ['feedback_type IS NOT NULL']
    const params: unknown[] = []
    if (from && /^\d{4}-\d{2}-\d{2}$/.test(from)) {
      params.push(from)
      conditions.push(`created_at >= $${params.length}`)
    }
    if (to && /^\d{4}-\d{2}-\d{2}$/.test(to)) {
      params.push(to)
      conditions.push(`created_at <= $${params.length}::date + interval '1 day'`)
    }
    const where = conditions.join(' AND ')

    // Drizzle raw sql is fine here; we only read aggregate counts.
    const countsRaw = await db.execute(
      sql.raw(
        `SELECT feedback_type, COUNT(*)::int AS count FROM ai_consultations WHERE ${where} GROUP BY feedback_type ORDER BY count DESC`,
      ),
    )
    const counts: FeedbackCount[] = (countsRaw as unknown as Array<Record<string, unknown>>).map(r => ({
      feedback_type: String(r.feedback_type ?? ''),
      count: Number(r.count ?? 0),
    }))

    const recentRaw = await db.execute(
      sql.raw(
        `SELECT id AS consultation_id, feedback_type, LEFT(user_question_text, 80) AS question_preview, created_at FROM ai_consultations WHERE ${where} ORDER BY created_at DESC LIMIT ${limitRecent}`,
      ),
    )
    const recent: RecentFeedback[] = (recentRaw as unknown as Array<Record<string, unknown>>).map(r => ({
      consultation_id: String(r.consultation_id ?? ''),
      feedback_type: String(r.feedback_type ?? ''),
      question_preview: String(r.question_preview ?? ''),
      created_at: r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at ?? ''),
    }))

    const total = counts.reduce((acc, c) => acc + c.count, 0)
    const helpful = counts.find(c => c.feedback_type === 'helpful')?.count ?? 0
    const inaccurate = counts.find(c => c.feedback_type === 'inaccurate')?.count ?? 0
    const addContext = counts.find(c => c.feedback_type === 'add_context')?.count ?? 0
    const humanReview = counts.find(c => c.feedback_type === 'human_review')?.count ?? 0
    const saved = counts.find(c => c.feedback_type === 'saved')?.count ?? 0

    return NextResponse.json({
      ok: true,
      schema_version: 'user-feedback-summary-v1',
      filter: { from, to, limit_recent: limitRecent },
      summary: {
        total,
        helpful,
        inaccurate,
        add_context: addContext,
        human_review: humanReview,
        saved,
        helpful_rate: total > 0 ? Math.round((helpful / total) * 100) / 100 : null,
        inaccurate_rate: total > 0 ? Math.round((inaccurate / total) * 100) / 100 : null,
      },
      counts,
      recent,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/user-feedback-summary] failed', message)
    return NextResponse.json({ error: 'summary_failed', detail: message }, { status: 500 })
  }
}
