#!/usr/bin/env tsx
/**
 * TEBIQ 0.8 real-user regression runner.
 *
 * This runner is intentionally TEBIQ-only: it imports the 96 realistic
 * user questions into Eval Lab and executes `/api/internal/eval-lab/tebiq-answer`
 * against the production consultation stream. It does not call
 * `/deepseek-raw` and it does not touch Knowledge Atlas Batch29 snapshots.
 *
 * Usage:
 *   npx tsx scripts/eval/run-real-user-regression.ts --dry-run
 *   npx tsx --env-file=.env.local scripts/eval/run-real-user-regression.ts --import-only --base-url=http://127.0.0.1:3000
 *   npx tsx --env-file=.env.local scripts/eval/run-real-user-regression.ts --execute --resume --base-url=http://127.0.0.1:3000
 *   npx tsx --env-file=.env.local scripts/eval/run-real-user-regression.ts --execute --ids=RUR-036,RUR-037 --run-id=tebiq-0.8-rur-loop2b-targeted
 */
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface RealUserQuestion {
  id: string
  profile: string
  question: string
  followup?: string
  scenario: string
  risk_hint?: string[]
}

interface Args {
  mode: 'dry-run' | 'import-only' | 'execute'
  input: string
  runId: string
  baseUrl: string
  output: string | null
  resume: boolean
  concurrency: number
  limit: number | null
  ids: string[] | null
  abortOnProviderAuthError: boolean
}

interface EvalQuestionState {
  id: string
  question_text: string
  starter_tag: string
  source: string
  metadata_json?: Record<string, unknown> | null
}

interface SidecarCase {
  input_id: string
  starter_tag: string
  question_id?: string | null
  scenario: string
  risk_hint: string[]
  http_status?: number
  ok?: boolean
  status?: string | null
  engine_version?: string | null
  answer_id?: string | null
  answer_link?: string | null
  latency_ms?: number | null
  fallback_reason?: string | null
  error?: string | null
  fact_card_ids?: string[]
  route_gate_ids?: string[]
  guardrail_findings?: unknown[]
  answer_length?: number
  answer_sha256?: string | null
  started_at?: string
  completed_at?: string
}

interface Sidecar {
  run_id: string
  source: string
  source_file: string
  source_sha256: string
  base_url: string
  mode: Args['mode']
  created_at: string
  updated_at: string
  env_summary: {
    eval_lab_import_key_present: boolean
  }
  import_result?: unknown
  cases: SidecarCase[]
}

function parseArgs(argv: string[]): Args {
  const defaultRunId = `tebiq-0.8-rur-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-a`
  const args: Args = {
    mode: 'dry-run',
    input: 'docs/eval/TEBIQ_0_8_REAL_USER_REGRESSION_QUESTIONS.json',
    runId: defaultRunId,
    baseUrl: process.env.EVAL_LAB_BASE_URL ?? 'http://127.0.0.1:3000',
    output: null,
    resume: false,
    concurrency: 1,
    limit: null,
    ids: null,
    abortOnProviderAuthError: true,
  }

  for (const arg of argv) {
    if (arg === '--dry-run') args.mode = 'dry-run'
    else if (arg === '--import-only') args.mode = 'import-only'
    else if (arg === '--execute') args.mode = 'execute'
    else if (arg === '--resume') args.resume = true
    else if (arg.startsWith('--input=')) args.input = arg.slice('--input='.length)
    else if (arg.startsWith('--run-id=')) args.runId = cleanTag(arg.slice('--run-id='.length), 80)
    else if (arg.startsWith('--base-url=')) args.baseUrl = arg.slice('--base-url='.length).replace(/\/$/, '')
    else if (arg.startsWith('--output=')) args.output = arg.slice('--output='.length)
    else if (arg.startsWith('--concurrency=')) args.concurrency = clampInt(arg.slice('--concurrency='.length), 1, 2)
    else if (arg.startsWith('--limit=')) args.limit = clampInt(arg.slice('--limit='.length), 1, 96)
    else if (arg.startsWith('--ids=')) args.ids = parseIds(arg.slice('--ids='.length))
    else if (arg === '--no-abort-on-provider-auth-error') args.abortOnProviderAuthError = false
  }

  return args
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const inputPath = resolve(args.input)
  const rawInput = readFileSync(inputPath, 'utf8')
  const sourceSha = sha256(rawInput)
  const questions = selectQuestions(readQuestions(rawInput), args.ids).slice(0, args.limit ?? undefined)
  const items = questions.map((item, index) => toImportItem(item, args.runId, index))
  const starterTags = items.map(item => item.starter_tag)
  assertUnique(starterTags, 'starter_tag')

  const outputPath = resolve(args.output ?? `docs/eval/${args.runId}-production-answer-results.json`)
  const existing = args.resume && existsSync(outputPath)
    ? readSidecar(outputPath)
    : null
  const sidecar: Sidecar = existing ?? {
    run_id: args.runId,
    source: 'real_user_regression',
    source_file: args.input,
    source_sha256: sourceSha,
    base_url: args.baseUrl,
    mode: args.mode,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    env_summary: {
      eval_lab_import_key_present: Boolean(process.env.EVAL_LAB_IMPORT_KEY),
    },
    cases: items.map((item, index) => ({
      input_id: questions[index].id,
      starter_tag: item.starter_tag,
      scenario: questions[index].scenario,
      risk_hint: questions[index].risk_hint ?? [],
    })),
  }
  sidecar.mode = args.mode
  sidecar.base_url = args.baseUrl
  sidecar.updated_at = new Date().toISOString()

  console.log(`real-user-regression: mode=${args.mode} run=${args.runId} items=${items.length}`)
  if (args.ids) console.log(`selected_ids=${args.ids.join(',')}`)
  console.log(`input=${args.input} sha256=${sourceSha.slice(0, 12)} output=${outputPath}`)

  if (args.mode === 'dry-run') {
    const byScenario = countBy(questions.map(q => q.scenario))
    console.log('scenario_counts=', JSON.stringify(byScenario, null, 2))
    console.log(`first_starter_tag=${starterTags[0]} last_starter_tag=${starterTags[starterTags.length - 1]}`)
    writeSidecar(outputPath, sidecar)
    console.log('dry-run sidecar written')
    return
  }

  const importResult = await postJson(`${args.baseUrl}/api/internal/eval-lab/import-run`, {
    run_id: args.runId,
    run_name: `TEBIQ 0.8 Real User Regression ${args.runId}`,
    source: 'real_user_regression',
    items,
  })
  sidecar.import_result = importResult.body
  writeSidecar(outputPath, sidecar)
  console.log(`import-run: http=${importResult.status} ok=${importResult.ok}`)
  if (!importResult.ok) {
    throw new Error(`import-run failed: ${JSON.stringify(importResult.body).slice(0, 500)}`)
  }
  if (args.mode === 'import-only') return

  const state = await getState(args.baseUrl)
  const questionIdByStarterTag = mapQuestionIds(state.questions, starterTags)
  for (const kase of sidecar.cases) {
    kase.question_id = questionIdByStarterTag.get(kase.starter_tag) ?? null
  }

  const pending = sidecar.cases.filter(kase => {
    if (!kase.question_id) return false
    if (!args.resume) return true
    return !(kase.ok === true && kase.http_status === 200 && kase.status === 'completed')
  })
  console.log(`execute: pending=${pending.length} concurrency=${args.concurrency}`)

  let abortReason: string | null = null
  await runWithConcurrency(pending, args.concurrency, async kase => {
    if (abortReason) {
      kase.ok = false
      kase.status = 'skipped'
      kase.error = `skipped_after_abort: ${abortReason}`
      kase.completed_at = new Date().toISOString()
      sidecar.updated_at = new Date().toISOString()
      writeSidecar(outputPath, sidecar)
      return
    }
    const item = items.find(candidate => candidate.starter_tag === kase.starter_tag)
    if (!item || !kase.question_id) return
    kase.started_at = new Date().toISOString()
    try {
      const result = await postJson(`${args.baseUrl}/api/internal/eval-lab/tebiq-answer`, {
        question_id: kase.question_id,
        question: item.question,
      })
      kase.http_status = result.status
      const body = result.body as Record<string, unknown>
      kase.ok = result.ok && body.ok === true
      kase.status = asString(body.status)
      kase.engine_version = asString(body.engine_version)
      kase.answer_id = asString(body.answer_id)
      kase.answer_link = asString(body.answer_link)
      kase.latency_ms = asNumber(body.latency_ms)
      kase.fallback_reason = asString(body.fallback_reason)
      kase.error = result.ok ? null : JSON.stringify(body).slice(0, 800)
      if (
        !result.ok
        && args.abortOnProviderAuthError
        && isProviderAuthError(kase.error)
      ) {
        abortReason = 'provider_auth_failed'
      }
      kase.fact_card_ids = asStringArray(body.fact_card_ids)
      kase.route_gate_ids = asStringArray(body.route_gate_ids)
      kase.guardrail_findings = Array.isArray(body.guardrail_findings) ? body.guardrail_findings : []
      const visibleText = typeof body.visible_text === 'string' ? body.visible_text : ''
      kase.answer_length = visibleText.length
      kase.answer_sha256 = visibleText ? sha256(visibleText) : null
    } catch (err) {
      kase.ok = false
      kase.error = err instanceof Error ? err.message : String(err)
      if (args.abortOnProviderAuthError && isProviderAuthError(kase.error)) {
        abortReason = 'provider_auth_failed'
      }
    } finally {
      kase.completed_at = new Date().toISOString()
      sidecar.updated_at = new Date().toISOString()
      writeSidecar(outputPath, sidecar)
      console.log(`${kase.starter_tag}: ok=${kase.ok} status=${kase.status ?? 'n/a'} latency=${kase.latency_ms ?? 'n/a'}`)
      if (abortReason) {
        console.log(`abort_remaining=${abortReason}`)
      }
    }
  })

  const completed = sidecar.cases.filter(kase => kase.ok && kase.status === 'completed').length
  const failed = sidecar.cases.filter(kase => kase.ok === false).length
  console.log(`done: completed=${completed} failed=${failed} output=${outputPath}`)
}

function isProviderAuthError(value: string | null | undefined): boolean {
  return /deepseek_http_401|provider_auth|unauthori[sz]ed|invalid[_ -]?api[_ -]?key|http_401/i.test(value ?? '')
}

function readQuestions(raw: string): RealUserQuestion[] {
  const parsed = JSON.parse(raw) as RealUserQuestion[]
  if (!Array.isArray(parsed)) throw new Error('input must be an array')
  for (let index = 0; index < parsed.length; index += 1) {
    const item = parsed[index]
    for (const key of ['id', 'profile', 'question', 'scenario'] as const) {
      if (!item || typeof item[key] !== 'string' || !item[key].trim()) {
        throw new Error(`invalid item ${index}: missing ${key}`)
      }
    }
  }
  return parsed
}

function selectQuestions(
  questions: RealUserQuestion[],
  requestedIds: string[] | null,
): RealUserQuestion[] {
  if (!requestedIds || requestedIds.length === 0) return questions

  const selected = requestedIds.map(id => {
    const hit = questions.find(question => question.id === id || question.id.endsWith(id))
    if (!hit) throw new Error(`unknown regression id: ${id}`)
    return hit
  })
  assertUnique(selected.map(item => item.id), 'selected regression id')
  return selected
}

function toImportItem(item: RealUserQuestion, runId: string, index: number) {
  const starterTag = cleanTag(`rur-${runId}-${String(index + 1).padStart(3, '0')}`, 80)
  return {
    question: formatQuestionForAnswer(item),
    question_text: formatQuestionForAnswer(item),
    scenario: item.scenario,
    starter_tag: starterTag,
    source: 'real_user_regression',
    metadata_json: {
      real_user_regression_id: item.id,
      profile: item.profile,
      scenario: item.scenario,
      risk_hint: item.risk_hint ?? [],
      source_file: 'docs/eval/TEBIQ_0_8_REAL_USER_REGRESSION_QUESTIONS.json',
    },
  }
}

function formatQuestionForAnswer(item: RealUserQuestion): string {
  return [
    `用户背景：${item.profile}`,
    `问题：${item.question}`,
    item.followup ? `追问：${item.followup}` : null,
  ].filter(Boolean).join('\n')
}

async function postJson(url: string, body: unknown): Promise<{ ok: boolean; status: number; body: unknown }> {
  const headers: Record<string, string> = { 'content-type': 'application/json' }
  if (process.env.EVAL_LAB_IMPORT_KEY) {
    headers.authorization = `Bearer ${process.env.EVAL_LAB_IMPORT_KEY}`
  }
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  const text = await res.text()
  let parsed: unknown = text
  try {
    parsed = text ? JSON.parse(text) : null
  } catch {
    parsed = { raw_text: text.slice(0, 1000) }
  }
  return { ok: res.ok, status: res.status, body: parsed }
}

async function getState(baseUrl: string): Promise<{ questions: EvalQuestionState[] }> {
  const res = await fetch(`${baseUrl}/api/internal/eval-lab/state`)
  const text = await res.text()
  if (!res.ok) throw new Error(`state failed ${res.status}: ${text.slice(0, 500)}`)
  return JSON.parse(text) as { questions: EvalQuestionState[] }
}

function mapQuestionIds(
  questions: EvalQuestionState[],
  starterTags: string[],
): Map<string, string> {
  const wanted = new Set(starterTags)
  const out = new Map<string, string>()
  for (const q of questions) {
    if (wanted.has(q.starter_tag)) out.set(q.starter_tag, q.id)
  }
  const missing = starterTags.filter(tag => !out.has(tag))
  if (missing.length > 0) {
    throw new Error(`missing imported eval questions: ${missing.slice(0, 10).join(', ')}`)
  }
  return out
}

async function runWithConcurrency<T>(
  items: T[],
  concurrency: number,
  worker: (item: T) => Promise<void>,
): Promise<void> {
  let next = 0
  const runners = Array.from({ length: Math.max(1, concurrency) }, async () => {
    while (next < items.length) {
      const item = items[next]
      next += 1
      await worker(item)
    }
  })
  await Promise.all(runners)
}

function readSidecar(path: string): Sidecar {
  return JSON.parse(readFileSync(path, 'utf8')) as Sidecar
}

function writeSidecar(path: string, sidecar: Sidecar): void {
  writeFileSync(path, `${JSON.stringify(sidecar, null, 2)}\n`)
}

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

function cleanTag(value: string, max: number): string {
  return value.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9_.-]/g, '-').slice(0, max)
}

function clampInt(value: string, min: number, max: number): number {
  const n = Number(value)
  if (!Number.isFinite(n)) return min
  return Math.max(min, Math.min(max, Math.trunc(n)))
}

function parseIds(value: string): string[] {
  return value.split(',')
    .map(item => item.trim())
    .filter(Boolean)
}

function assertUnique(values: string[], label: string): void {
  const seen = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) throw new Error(`duplicate ${label}: ${value}`)
    seen.add(value)
  }
}

function countBy(values: string[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const value of values) out[value] = (out[value] ?? 0) + 1
  return out
}

function asString(value: unknown): string | null {
  return typeof value === 'string' ? value : null
}

function asNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

main().catch(err => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
