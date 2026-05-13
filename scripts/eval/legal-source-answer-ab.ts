#!/usr/bin/env tsx
/**
 * Legal Source Engineering — answer-level A/B probe.
 *
 * A = current production TEBIQ answer via `/api/internal/eval-lab/tebiq-answer`.
 * B = candidate legal-source context probe via `/api/internal/eval-lab/deepseek-raw`.
 *
 * B is NOT the production answer path. It is a candidate-context answer probe:
 * the prompt includes `ai_extracted` legal-source cards as unpromoted candidate
 * context so AQL can judge whether the added legal source changes answer quality.
 *
 * Usage:
 *   npx tsx scripts/eval/legal-source-answer-ab.ts
 *   npx tsx scripts/eval/legal-source-answer-ab.ts --limit=5
 *   npx tsx scripts/eval/legal-source-answer-ab.ts --concurrency=3
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

interface ShadowRow {
  id: string
  priority: 'P0' | 'P1' | 'P2'
  family: string
  question: string
  candidateOnlyIds: string[]
  status: string
  needsAnswerAB: boolean
}

interface FactContext {
  fact_id: string
  title: string
  state: string
  risk_level: string
  citation_summary: string
  current_effective_fact: string
  must_say: string[]
  must_not_say: string[]
  evidence_claims: string[]
}

interface AnswerABRow {
  id: string
  priority: string
  family: string
  question: string
  candidateOnlyIds: string[]
  a: {
    ok: boolean
    attempts?: number
    status?: string
    engine_version?: string
    fact_card_ids?: string[]
    visible_text?: string
    latency_ms?: number
    error?: string
  }
  b: {
    ok: boolean
    attempts?: number
    model?: string
    text?: string
    latency_ms?: number
    provider_status?: string
    error?: string
  }
  heuristic: {
    b_mentions_candidate_boundary: boolean
    a_contains_forbidden_candidate_phrase: string[]
    b_contains_forbidden_candidate_phrase: string[]
  }
}

const BASE_URL = process.env.BASE_URL ?? 'https://tebiq.jp'
const AQL_FIRST_PASS_IDS = new Set([
  'LS-001', 'LS-002', 'LS-004', 'LS-008', 'LS-011',
  'LS-012', 'LS-013', 'LS-015', 'LS-019', 'LS-020',
  'LS-024', 'LS-030', 'LS-034', 'LS-037', 'LS-040',
])

async function main() {
  const limit = readLimit()
  const concurrency = readConcurrency()
  const shadow = JSON.parse(
    readFileSync(join(process.cwd(), 'docs/eval/legal-source-shadow-ab-round1-results.json'), 'utf8'),
  ) as { rows: ShadowRow[] }
  const selected = shadow.rows.filter(row => AQL_FIRST_PASS_IDS.has(row.id) && row.candidateOnlyIds.length > 0)
    .slice(0, limit ?? undefined)

  console.log(`legal-source-answer-ab: selected=${selected.length} concurrency=${concurrency}`)
  const rows = await mapWithConcurrency(selected, concurrency, async (row, idx) => {
    console.log(`[${idx + 1}/${selected.length}] ${row.id} ${row.question}`)
    const contexts = row.candidateOnlyIds.map(loadFactContext)
    const [a, b] = await Promise.all([
      callTebiqAnswer(row.question),
      callCandidateContextAnswer(row.question, contexts),
    ])
    const aText = a.visible_text ?? ''
    const bText = b.text ?? ''
    return {
      id: row.id,
      priority: row.priority,
      family: row.family,
      question: row.question,
      candidateOnlyIds: row.candidateOnlyIds,
      a,
      b,
      heuristic: {
        b_mentions_candidate_boundary: contexts.some(ctx => roughBoundaryHit(bText, ctx)),
        a_contains_forbidden_candidate_phrase: forbiddenHits(aText, contexts),
        b_contains_forbidden_candidate_phrase: forbiddenHits(bText, contexts),
      },
    }
  })

  const generatedAt = new Date().toISOString()
  const output = {
    generatedAt,
    baseUrl: BASE_URL,
    mode: 'answer_level_ab_probe',
    caveat: 'B is candidate-context DeepSeek probe, not production answer path.',
    rows,
  }

  const outDir = join(process.cwd(), 'docs/eval')
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  const isSample = limit !== null
  const jsonPath = join(outDir, isSample
    ? 'legal-source-answer-ab-round1-sample-results.json'
    : 'legal-source-answer-ab-round1-results.json')
  const mdPath = join(outDir, isSample
    ? 'LEGAL_SOURCE_ANSWER_AB_ROUND1_SAMPLE.md'
    : 'LEGAL_SOURCE_ANSWER_AB_ROUND1.md')
  writeFileSync(jsonPath, `${JSON.stringify(output, null, 2)}\n`)
  writeFileSync(mdPath, renderMarkdown(generatedAt, rows))

  const okA = rows.filter(row => row.a.ok).length
  const okB = rows.filter(row => row.b.ok).length
  console.log(`legal-source-answer-ab: rows=${rows.length} A_ok=${okA} B_ok=${okB}`)
  console.log(`wrote ${mdPath}`)
  console.log(`wrote ${jsonPath}`)
}

function readLimit(): number | null {
  return readPositiveIntArg('--limit') ?? null
}

function readConcurrency(): number {
  return readPositiveIntArg('--concurrency') ?? 3
}

function readPositiveIntArg(name: string): number | null {
  const arg = process.argv.find(v => v.startsWith(`${name}=`))
  if (!arg) return null
  const n = Number(arg.split('=')[1])
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : null
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length)
  let next = 0
  const workerCount = Math.max(1, Math.min(concurrency, items.length))
  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (true) {
      const index = next
      next += 1
      if (index >= items.length) break
      results[index] = await worker(items[index], index)
    }
  }))
  return results
}

async function callTebiqAnswer(question: string): Promise<AnswerABRow['a']> {
  return withRetries(() => callTebiqAnswerOnce(question), isTransientAnswerError)
}

async function callTebiqAnswerOnce(question: string): Promise<AnswerABRow['a']> {
  try {
    const started = Date.now()
    const res = await fetch(`${BASE_URL}/api/internal/eval-lab/tebiq-answer`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question }),
    })
    const json = await res.json() as {
      ok?: boolean
      status?: string
      engine_version?: string
      fact_card_ids?: string[]
      visible_text?: string
      latency_ms?: number
      error?: string
      detail?: string
    }
    if (!res.ok || json.ok !== true) {
      return { ok: false, error: json.error ?? json.detail ?? `http_${res.status}`, latency_ms: Date.now() - started }
    }
    return {
      ok: true,
      status: json.status,
      engine_version: json.engine_version,
      fact_card_ids: json.fact_card_ids ?? [],
      visible_text: json.visible_text ?? '',
      latency_ms: json.latency_ms,
    }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}

async function callCandidateContextAnswer(
  question: string,
  contexts: FactContext[],
): Promise<AnswerABRow['b']> {
  return withRetries(() => callCandidateContextAnswerOnce(question, contexts), isTransientAnswerError)
}

async function callCandidateContextAnswerOnce(
  question: string,
  contexts: FactContext[],
): Promise<AnswerABRow['b']> {
  try {
    const started = Date.now()
    const prompt = buildCandidatePrompt(question, contexts)
    const res = await fetch(`${BASE_URL}/api/internal/eval-lab/deepseek-raw`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question: prompt }),
    })
    const json = await res.json() as {
      ok?: boolean
      text?: string
      model?: string
      latency_ms?: number
      provider_status?: string
      error?: string
    }
    if (!res.ok || json.ok !== true) {
      return { ok: false, error: json.error ?? `http_${res.status}`, latency_ms: Date.now() - started }
    }
    return {
      ok: true,
      text: json.text ?? '',
      model: json.model,
      latency_ms: json.latency_ms,
      provider_status: json.provider_status,
    }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}

async function withRetries<T extends { ok: boolean; error?: string; attempts?: number }>(
  fn: () => Promise<T>,
  shouldRetry: (result: T) => boolean,
  maxAttempts = 2,
): Promise<T> {
  let last: T | null = null
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const result = await fn()
    result.attempts = attempt
    if (result.ok || !shouldRetry(result) || attempt === maxAttempts) return result
    last = result
    await sleep(1200 * attempt)
  }
  return last as T
}

function isTransientAnswerError(result: { ok: boolean; error?: string }): boolean {
  if (result.ok) return false
  return /timeout|empty|pipeline_failed|http_5|curl|fetch|exception/i.test(result.error ?? '')
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function buildCandidatePrompt(question: string, contexts: FactContext[]): string {
  const contextText = contexts.map(ctx => [
    `- fact_id: ${ctx.fact_id}`,
    `  title: ${ctx.title}`,
    `  state/risk: ${ctx.state}/${ctx.risk_level}`,
    `  citation_summary: ${ctx.citation_summary}`,
    `  current_effective_fact: ${ctx.current_effective_fact}`,
    `  must_say: ${ctx.must_say.join(' / ')}`,
    `  must_not_say: ${ctx.must_not_say.join(' / ')}`,
    `  evidence: ${ctx.evidence_claims.join(' / ')}`,
  ].join('\n')).join('\n\n')
  return [
    '这是 TEBIQ 法源结构化工程的答案层 A/B 测试。',
    '请用简体中文直接回答用户，不要提“测试”、不要提内部字段。',
    '除日本手续名、在留资格名、官方机构名外，不要使用整段日文回答。',
    '候选法源卡尚未提升到生产状态；你可以把它作为边界提醒，但不要说成已审核结论或保证结果。',
    '答案开头必须逐行使用这四个标签，且文字和顺序完全不变；第2-4行不得为空：',
    '先看这里',
    '当前判断：一句话判断',
    '建议动作：一句话动作',
    '暂缓事项：一句话暂缓',
    '不要使用 Markdown 粗体、标题、分割线或表格。',
    '官方机构名写「出入国在留管理庁」或「入管」，不要改写成其他中文机关名。',
    '不要保证申请一定通过 / 不通过；有个案判断时说明需要向入管或行政書士确认。',
    '',
    '=== 用户问题 ===',
    question,
    '',
    '=== 候选法源上下文 ===',
    contextText,
    '',
    '=== 输出要求 ===',
    '1. 先给四标签摘要。',
    '2. 再用 2-4 段解释真正边界。',
    '3. 明确避免 must_not_say 里的错误说法。',
    '4. 不要写 Markdown 表格。',
  ].join('\n')
}

function loadFactContext(factId: string): FactContext {
  const path = join(process.cwd(), 'docs/fact-cards', `${factId}.md`)
  const parsed = matter(readFileSync(path, 'utf8'))
  const body = parsed.content
  const evidence = Array.isArray(parsed.data.evidence_points)
    ? parsed.data.evidence_points.map((p: { claim?: unknown }) => typeof p.claim === 'string' ? p.claim : '').filter(Boolean)
    : []
  return {
    fact_id: factId,
    title: typeof parsed.data.title === 'string' ? parsed.data.title : factId,
    state: typeof parsed.data.state === 'string' ? parsed.data.state : '',
    risk_level: typeof parsed.data.risk_level === 'string' ? parsed.data.risk_level : '',
    citation_summary: typeof parsed.data.citation_summary === 'string' ? parsed.data.citation_summary : '',
    current_effective_fact: extractSection(body, 'current_effective_fact'),
    must_say: extractBullets(body, 'must_say'),
    must_not_say: extractBullets(body, 'must_not_say'),
    evidence_claims: evidence.slice(0, 3),
  }
}

function extractSection(body: string, name: string): string {
  const lines = body.split('\n')
  const out: string[] = []
  let inSection = false
  for (const line of lines) {
    if (line.trim() === `## ${name}`) {
      inSection = true
      continue
    }
    if (inSection && line.startsWith('## ')) break
    if (inSection) out.push(line)
  }
  return out.join('\n').trim().replace(/\s+/g, ' ').slice(0, 900)
}

function extractBullets(body: string, name: string): string[] {
  const section = extractSection(body, name)
  return section
    .split('\n')
    .map(line => line.match(/^-\s+(.+?)\s*$/)?.[1]?.trim() ?? '')
    .filter(Boolean)
    .slice(0, 8)
}

function roughBoundaryHit(text: string, ctx: FactContext): boolean {
  const haystack = text.toLowerCase()
  const probes = [
    ...ctx.must_say,
    ctx.current_effective_fact,
    ctx.citation_summary,
  ]
    .flatMap(item => item.split(/[。；;、，,]/))
    .map(item => item.trim())
    .filter(item => item.length >= 6)
    .slice(0, 12)
  return probes.some(probe => haystack.includes(probe.toLowerCase().slice(0, Math.min(probe.length, 24))))
}

function forbiddenHits(text: string, contexts: FactContext[]): string[] {
  return contexts.flatMap(ctx => ctx.must_not_say)
    .filter(phrase => phrase.length >= 6 && text.includes(phrase))
}

function renderMarkdown(generatedAt: string, rows: AnswerABRow[]): string {
  const lines: string[] = []
  lines.push('# Legal Source Engineering — Answer A/B Round 1')
  lines.push('')
  lines.push(`Generated: ${generatedAt}`)
  lines.push(`Base URL: ${BASE_URL}`)
  lines.push('')
  lines.push('## Scope')
  lines.push('')
  lines.push('- A 组：生产 TEBIQ 当前答案，来自 `/api/internal/eval-lab/tebiq-answer`。')
  lines.push('- B 组：候选法源上下文答案，来自 `/api/internal/eval-lab/deepseek-raw`，用户消息中加入 candidate legal-source cards。')
  lines.push('- B 组不是生产路径，不提升 `ai_extracted` 状态，不改 production fact injection。')
  lines.push('- 本轮目的：让 AQL 判断“加入候选法源边界后，答案文本是否明显更安全、更少误导行动”。')
  lines.push('')
  lines.push('## Result')
  lines.push('')
  lines.push(`- Cases: ${rows.length}`)
  lines.push(`- A success: ${rows.filter(row => row.a.ok).length}/${rows.length}`)
  lines.push(`- B success: ${rows.filter(row => row.b.ok).length}/${rows.length}`)
  lines.push('- Automated heuristic is only a debugging hint; final judgment should be human/AQL review over the full answer pairs.')
  lines.push('')
  lines.push('## AQL Review Table')
  lines.push('')
  lines.push('The `Heuristic` column is not a quality score. It only flags crude string-level hints and should not replace reading the answer pair.')
  lines.push('')
  lines.push('| ID | Family | Question | Candidate cards | A fact cards | Heuristic |')
  lines.push('|---|---|---|---|---|---|')
  for (const row of rows) {
    lines.push([
      row.id,
      row.family,
      escapePipe(row.question),
      row.candidateOnlyIds.map(code).join('<br>'),
      (row.a.fact_card_ids ?? []).map(code).join('<br>') || '—',
      [
        row.heuristic.b_mentions_candidate_boundary ? 'B_boundary=yes' : 'B_boundary=no',
        row.heuristic.a_contains_forbidden_candidate_phrase.length ? `A_forbidden=${row.heuristic.a_contains_forbidden_candidate_phrase.length}` : 'A_forbidden=0',
        row.heuristic.b_contains_forbidden_candidate_phrase.length ? `B_forbidden=${row.heuristic.b_contains_forbidden_candidate_phrase.length}` : 'B_forbidden=0',
      ].join('<br>'),
    ].join(' | ').replace(/^/, '| ').replace(/$/, ' |'))
  }
  lines.push('')
  lines.push('## Answer Pairs')
  lines.push('')
  for (const row of rows) {
    lines.push(`### ${row.id} — ${row.question}`)
    lines.push('')
    lines.push(`Candidate cards: ${row.candidateOnlyIds.map(code).join(', ')}`)
    lines.push('')
    lines.push('#### A 当前生产答案')
    lines.push('')
    lines.push(row.a.ok ? fenced(row.a.visible_text ?? '') : `ERROR: ${row.a.error}`)
    lines.push('')
    lines.push('#### B 候选法源上下文答案')
    lines.push('')
    lines.push(row.b.ok ? fenced(row.b.text ?? '') : `ERROR: ${row.b.error}`)
    lines.push('')
  }
  lines.push('## How To Reproduce')
  lines.push('')
  lines.push('```bash')
  lines.push('npx tsx scripts/eval/legal-source-answer-ab.ts')
  lines.push('```')
  lines.push('')
  return `${lines.join('\n')}\n`
}

function fenced(text: string): string {
  return ['```text', text.trim(), '```'].join('\n')
}

function code(value: string): string {
  return `\`${value}\``
}

function escapePipe(value: string): string {
  return value.replace(/\|/g, '\\|')
}

void main().catch(error => {
  console.error(error)
  process.exit(1)
})
