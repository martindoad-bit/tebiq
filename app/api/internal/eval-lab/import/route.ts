import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { importQuestions, type ImportItem } from '@/lib/db/queries/eval-lab'

// POST /api/internal/eval-lab/import
//
// Bulk import questions. Accepts either:
//   { items: Array<{ question_text, scenario?, starter_tag?, source?, metadata_json? }> }
//   { questions: string[] }   // shorthand: each entry becomes a manual question
//
// Items with `starter_tag` are dedup'd via the unique index. Untagged
// items always insert. We do NOT import answers/annotations here —
// only the question rows. Re-running the relevant generation calls
// repopulates eval_answers; reviewers re-annotate against the new IDs.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

interface IncomingItem {
  question_text?: string
  question?: string
  scenario?: string | null
  starter_tag?: string | null
  source?: string
  metadata_json?: Record<string, unknown>
}

interface Body {
  items?: IncomingItem[]
  questions?: string[]
}

export async function POST(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const items: ImportItem[] = []
  if (Array.isArray(body.items)) {
    for (const raw of body.items) {
      const text = (raw.question_text ?? raw.question ?? '').trim()
      if (!text) continue
      if (text.length > 4000) continue
      items.push({
        questionText: text,
        scenario: raw.scenario ?? null,
        starterTag: raw.starter_tag ?? null,
        source: normalizeSource(raw.source),
        metadataJson: raw.metadata_json ?? {},
      })
    }
  }
  if (Array.isArray(body.questions)) {
    for (const q of body.questions) {
      const text = typeof q === 'string' ? q.trim() : ''
      if (!text || text.length > 4000) continue
      items.push({ questionText: text, source: 'manual' })
    }
  }
  if (items.length === 0) {
    return NextResponse.json({ error: 'no_items' }, { status: 400 })
  }
  try {
    const inserted = await importQuestions(items)
    return NextResponse.json({
      ok: true,
      inserted,
      received: items.length,
      skipped: items.length - inserted,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/import] failed', message)
    return NextResponse.json({ error: 'import_failed', detail: message }, { status: 500 })
  }
}

function normalizeSource(s?: string): 'starter' | 'imported' | 'manual' {
  if (s === 'starter' || s === 'manual') return s
  return 'imported'
}
