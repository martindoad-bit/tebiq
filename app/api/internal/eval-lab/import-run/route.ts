import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import {
  importEvalRunItems,
  type EvalAnswerType,
  type ImportEvalRunAnswerInput,
  type ImportEvalRunItem,
} from '@/lib/db/queries/eval-lab'

// POST /api/internal/eval-lab/import-run
//
// Bulk import a generated evaluation run into Eval Lab, including questions
// and answer rows. This is for internal knowledge-layer debugging; it does
// not promote fact cards and does not affect user-facing retrieval.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
export const maxDuration = 60

interface IncomingAnswer {
  answer_type?: string
  type?: string
  model?: string | null
  prompt_version?: string | null
  answer_text?: string | null
  text?: string | null
  tebiq_answer_id?: string | null
  tebiq_answer_link?: string | null
  engine_version?: string | null
  status?: string | null
  domain?: string | null
  fallback_reason?: string | null
  latency_ms?: number | null
  error?: string | null
  raw_payload_json?: Record<string, unknown> | null
}

interface IncomingItem {
  question_text?: string
  question?: string
  scenario?: string | null
  starter_tag?: string
  source?: string
  metadata_json?: Record<string, unknown>
  answers?: IncomingAnswer[] | Record<string, IncomingAnswer>
}

interface Body {
  run_id?: string
  run_name?: string
  source?: string
  items?: IncomingItem[]
}

export async function POST(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  if (!isAuthorizedImport(req)) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  const runId = cleanTag(body.run_id ?? 'manual-eval-run', 80)
  const runName = cleanText(body.run_name ?? runId, 160)
  const source = cleanTag(body.source ?? 'knowledge_debug', 32)
  const items = normalizeItems(body.items ?? [], { runId, runName, source })
  if (items.length === 0) {
    return NextResponse.json({ error: 'no_items' }, { status: 400 })
  }

  try {
    const result = await importEvalRunItems(items)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/import-run] failed', message)
    return NextResponse.json({ error: 'import_run_failed', detail: message }, { status: 500 })
  }
}

function isAuthorizedImport(req: Request): boolean {
  if (process.env.NODE_ENV !== 'production') return true
  const expected = process.env.EVAL_LAB_IMPORT_KEY
  if (!expected) return false
  const bearer = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '').trim()
  const header = req.headers.get('x-eval-lab-import-key')?.trim()
  return bearer === expected || header === expected
}

function normalizeItems(
  rawItems: IncomingItem[],
  run: { runId: string; runName: string; source: string },
): ImportEvalRunItem[] {
  const out: ImportEvalRunItem[] = []
  for (const raw of rawItems) {
    const questionText = cleanText(raw.question_text ?? raw.question ?? '', 4000)
    const starterTag = cleanTag(raw.starter_tag ?? '', 80)
    if (!questionText || !starterTag) continue
    out.push({
      questionText,
      scenario: raw.scenario ? cleanText(raw.scenario, 80) : null,
      starterTag,
      source: cleanTag(raw.source ?? run.source, 32),
      metadataJson: {
        ...(raw.metadata_json ?? {}),
        eval_run_id: run.runId,
        eval_run_name: run.runName,
        eval_run_source: run.source,
        imported_at: new Date().toISOString(),
      },
      answers: normalizeAnswers(raw.answers),
    })
  }
  return out
}

function normalizeAnswers(
  rawAnswers: IncomingAnswer[] | Record<string, IncomingAnswer> | undefined,
): ImportEvalRunAnswerInput[] {
  const entries = Array.isArray(rawAnswers)
    ? rawAnswers
    : Object.entries(rawAnswers ?? {}).map(([key, value]) => ({ ...value, answer_type: value.answer_type ?? key }))

  const out: ImportEvalRunAnswerInput[] = []
  for (const raw of entries) {
    const answerType = normalizeAnswerType(raw.answer_type ?? raw.type)
    if (!answerType) continue
    out.push({
      answerType,
      model: raw.model ? cleanText(raw.model, 64) : null,
      promptVersion: raw.prompt_version ? cleanText(raw.prompt_version, 32) : null,
      answerText: raw.answer_text ?? raw.text ?? null,
      tebiqAnswerId: raw.tebiq_answer_id ? cleanText(raw.tebiq_answer_id, 24) : null,
      tebiqAnswerLink: raw.tebiq_answer_link ? cleanText(raw.tebiq_answer_link, 240) : null,
      engineVersion: raw.engine_version ? cleanText(raw.engine_version, 64) : null,
      status: raw.status ? cleanText(raw.status, 32) : null,
      domain: raw.domain ? cleanText(raw.domain, 32) : null,
      fallbackReason: raw.fallback_reason ? cleanText(raw.fallback_reason, 64) : null,
      latencyMs: asInt(raw.latency_ms),
      error: raw.error ?? null,
      rawPayloadJson: raw.raw_payload_json ?? {},
    })
  }
  return out
}

function normalizeAnswerType(value: string | undefined): EvalAnswerType | null {
  if (value === 'tebiq_current' || value === 'deepseek_raw' || value === 'deepseek_web') return value
  if (value === 'knowledge_candidate' || value === 'candidate' || value === 'knowledge_context') {
    return 'deepseek_web'
  }
  return null
}

function cleanText(value: string, max: number): string {
  return value.trim().slice(0, max)
}

function cleanTag(value: string, max: number): string {
  return cleanText(value, max).replace(/\s+/g, '-')
}

function asInt(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null
  return Math.round(value)
}
