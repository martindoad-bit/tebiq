import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import {
  isTerminalConsultationEvent,
  parseConsultationChunk,
  type ConsultationEvent,
  type ConsultationFactCardAuditEntry,
} from '@/lib/consultation/stream-protocol'

type SimCase = {
  case_id: string
  scenario: string
  user_profile_brief: string
  initial_question?: string
  question?: string
  followups?: Record<string, string>
  hidden_risk_hint: string
  why_this_is_realistic: string
  risk_mix?: string
}

type RoundRun = {
  round: number
  input: string
  endpoint: string
  parent_consultation_id: string | null
  consultation_id: string | null
  http_status: number
  completion_status: 'completed' | 'timeout' | 'failed' | 'limit_reached' | 'http_error' | 'stream_error' | 'unknown'
  terminal_event: ConsultationEvent['event'] | null
  answer_text: string
  total_latency_ms: number | null
  fact_cards: ConsultationFactCardAuditEntry[]
  event_counts: Record<string, number>
  qa_flags: string[]
  error: string | null
}

type CaseRun = {
  case_id: string
  scenario: string
  user_profile_brief: string
  hidden_risk_hint: string
  why_this_is_realistic: string
  rounds: RoundRun[]
  qa_flags: string[]
}

type RunOutput = {
  schema_version: 'tebiq-followup-flywheel-v1'
  base_url: string
  generated_at: string
  input_file: string
  cases: CaseRun[]
  summary: {
    cases_total: number
    rounds_total: number
    completed_rounds: number
    failed_rounds: number
    cases_with_flags: number
    flag_counts: Record<string, number>
  }
}

const DEFAULT_INPUT = 'docs/qa/user_simulator/cycle1_followup_cases_v1.json'
const DEFAULT_OUT_JSON = 'docs/qa/followup_runs/cycle1_followup_run_v1.json'
const DEFAULT_OUT_MD = 'docs/qa/followup_runs/cycle1_followup_run_v1.md'
const DEFAULT_BASE_URL = 'https://tebiq.jp'

function argValue(name: string): string | null {
  const prefix = `${name}=`
  const hit = process.argv.find(a => a.startsWith(prefix))
  if (hit) return hit.slice(prefix.length)
  const idx = process.argv.indexOf(name)
  if (idx >= 0 && process.argv[idx + 1]) return process.argv[idx + 1]
  return null
}

function hasArg(name: string): boolean {
  return process.argv.includes(name)
}

async function main() {
  const baseUrl = normalizeBaseUrl(argValue('--base-url') ?? process.env.TEBIQ_BASE_URL ?? DEFAULT_BASE_URL)
  const inputPath = resolve(argValue('--input') ?? DEFAULT_INPUT)
  const outJsonPath = resolve(argValue('--out-json') ?? DEFAULT_OUT_JSON)
  const outMdPath = resolve(argValue('--out-md') ?? DEFAULT_OUT_MD)
  const caseFilter = parseCaseFilter(argValue('--case-id'))
  const limit = parseOptionalInt(argValue('--limit'))
  const timeoutMs = parseOptionalInt(argValue('--timeout-ms')) ?? 300_000
  const viewerSeed = argValue('--viewer-id') ?? `followup-flywheel-${Date.now().toString(36)}`

  const cases = JSON.parse(readFileSync(inputPath, 'utf8')) as SimCase[]
  const selected = cases
    .filter(c => !caseFilter || caseFilter.has(c.case_id))
    .slice(0, limit ?? undefined)

  if (selected.length === 0) {
    throw new Error('No cases selected')
  }

  const caseRuns: CaseRun[] = []
  for (let idx = 0; idx < selected.length; idx += 1) {
    const c = selected[idx]
    const viewerId = `${viewerSeed}-${idx + 1}`
    console.log(`[followup-flywheel] ${c.case_id} (${idx + 1}/${selected.length})`)
    caseRuns.push(await runCase(baseUrl, c, viewerId, timeoutMs))
  }

  const output: RunOutput = {
    schema_version: 'tebiq-followup-flywheel-v1',
    base_url: baseUrl,
    generated_at: new Date().toISOString(),
    input_file: inputPath,
    cases: caseRuns,
    summary: summarize(caseRuns),
  }

  mkdirSync(dirname(outJsonPath), { recursive: true })
  mkdirSync(dirname(outMdPath), { recursive: true })
  writeFileSync(outJsonPath, JSON.stringify(output, null, 2) + '\n')
  writeFileSync(outMdPath, renderMarkdown(output), 'utf8')

  console.log(`[followup-flywheel] wrote ${outJsonPath}`)
  console.log(`[followup-flywheel] wrote ${outMdPath}`)
  console.log(`[followup-flywheel] completed rounds: ${output.summary.completed_rounds}/${output.summary.rounds_total}`)
  if (hasArg('--fail-on-flags') && output.summary.failed_rounds > 0) {
    process.exit(1)
  }
}

async function runCase(
  baseUrl: string,
  c: SimCase,
  viewerId: string,
  timeoutMs: number,
): Promise<CaseRun> {
  const rounds: RoundRun[] = []
  const initial = await postSse({
    baseUrl,
    endpoint: '/api/consultation/stream',
    body: {
      question: initialQuestionOf(c),
      viewer_id: viewerId,
    },
    viewerId,
    timeoutMs,
    round: 0,
    input: initialQuestionOf(c),
    parentConsultationId: null,
  })
  rounds.push(initial)

  let parentId = initial.consultation_id
  const additions = Object.entries(c.followups ?? {})
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, text]) => text)

  for (let index = 0; index < additions.length; index += 1) {
    const addition = additions[index]
    if (!parentId) {
      rounds.push(skippedRound(index + 1, addition, 'missing_parent_consultation_id'))
      continue
    }
    const round = await postSse({
      baseUrl,
      endpoint: '/api/consultation/follow-up',
      body: {
        parent_consultation_id: parentId,
        user_addition: addition,
        viewer_id: viewerId,
      },
      viewerId,
      timeoutMs,
      round: index + 1,
      input: addition,
      parentConsultationId: parentId,
    })
    rounds.push(round)
    if (round.consultation_id && (round.completion_status === 'completed' || round.completion_status === 'timeout')) {
      parentId = round.consultation_id
    }
  }

  const flags = unique(rounds.flatMap(r => r.qa_flags))
  return {
    case_id: c.case_id,
    scenario: c.scenario,
    user_profile_brief: c.user_profile_brief,
    hidden_risk_hint: c.hidden_risk_hint,
    why_this_is_realistic: c.why_this_is_realistic,
    rounds,
    qa_flags: flags,
  }
}

function initialQuestionOf(c: SimCase): string {
  const question = (c.initial_question ?? c.question ?? '').trim()
  if (!question) throw new Error(`Case ${c.case_id} has no initial_question/question`)
  return question
}

async function postSse(input: {
  baseUrl: string
  endpoint: string
  body: unknown
  viewerId: string
  timeoutMs: number
  round: number
  input: string
  parentConsultationId: string | null
}): Promise<RoundRun> {
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), input.timeoutMs)
  const url = `${input.baseUrl}${input.endpoint}`
  const eventCounts: Record<string, number> = {}
  const factCards: ConsultationFactCardAuditEntry[] = []
  let answerText = ''
  let consultationId: string | null = null
  let totalLatency: number | null = null
  let terminalEvent: ConsultationEvent['event'] | null = null
  let completionStatus: RoundRun['completion_status'] = 'unknown'

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        cookie: `tebiq_viewer=${encodeURIComponent(input.viewerId)}`,
      },
      body: JSON.stringify(input.body),
      signal: ac.signal,
    })

    if (!res.ok || !res.body) {
      const body = await res.text().catch(() => '')
      return {
        round: input.round,
        input: input.input,
        endpoint: input.endpoint,
        parent_consultation_id: input.parentConsultationId,
        consultation_id: consultationId,
        http_status: res.status,
        completion_status: 'http_error',
        terminal_event: null,
        answer_text: '',
        total_latency_ms: null,
        fact_cards: [],
        event_counts: {},
        qa_flags: ['http_error'],
        error: body.slice(0, 500) || `HTTP ${res.status}`,
      }
    }

    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader()
    let buffer = ''
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        buffer += value
        const parsed = parseConsultationChunk(buffer)
        buffer = parsed.remainder
        for (const ev of parsed.events) {
          eventCounts[ev.event] = (eventCounts[ev.event] ?? 0) + 1
          if (ev.event === 'received') consultationId = ev.consultation_id
          if (ev.event === 'answer_chunk') answerText += ev.chunk
          if (ev.event === 'fact_cards_injected') factCards.push(...ev.items)
          if (ev.event === 'completed') totalLatency = ev.total_latency_ms
          if (ev.event === 'timeout') completionStatus = 'timeout'
          if (ev.event === 'failed') completionStatus = 'failed'
          if (ev.event === 'follow_up_limit_reached') completionStatus = 'limit_reached'
          if (isTerminalConsultationEvent(ev)) terminalEvent = ev.event
        }
      }
    } finally {
      try { reader.releaseLock() } catch { /* ignore */ }
    }

    if (completionStatus === 'unknown' && terminalEvent === 'completed') completionStatus = 'completed'
    return {
      round: input.round,
      input: input.input,
      endpoint: input.endpoint,
      parent_consultation_id: input.parentConsultationId,
      consultation_id: consultationId,
      http_status: res.status,
      completion_status: completionStatus,
      terminal_event: terminalEvent,
      answer_text: answerText,
      total_latency_ms: totalLatency,
      fact_cards: factCards,
      event_counts: eventCounts,
      qa_flags: scoreRound(input.input, answerText, completionStatus, factCards),
      error: null,
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return {
      round: input.round,
      input: input.input,
      endpoint: input.endpoint,
      parent_consultation_id: input.parentConsultationId,
      consultation_id: consultationId,
      http_status: 0,
      completion_status: 'stream_error',
      terminal_event: terminalEvent,
      answer_text: answerText,
      total_latency_ms: totalLatency,
      fact_cards: factCards,
      event_counts: eventCounts,
      qa_flags: ['stream_error'],
      error: message,
    }
  } finally {
    clearTimeout(timer)
  }
}

function skippedRound(round: number, input: string, reason: string): RoundRun {
  return {
    round,
    input,
    endpoint: '/api/consultation/follow-up',
    parent_consultation_id: null,
    consultation_id: null,
    http_status: 0,
    completion_status: 'stream_error',
    terminal_event: null,
    answer_text: '',
    total_latency_ms: null,
    fact_cards: [],
    event_counts: {},
    qa_flags: [reason],
    error: reason,
  }
}

function scoreRound(
  userInput: string,
  answerText: string,
  status: RoundRun['completion_status'],
  factCards: ConsultationFactCardAuditEntry[],
): string[] {
  const flags: string[] = []
  const text = answerText.trim()
  if (status !== 'completed') flags.push(`status_${status}`)
  if (text.length < 180 && status === 'completed') flags.push('answer_too_short')
  if (text.length > 0 && text.length < 400 && /具体情况|需要根据|因人而异/.test(text)) flags.push('over_safe_short')
  if (factCards.length === 0) flags.push('no_fact_cards_injected')
  if (hasJapaneseNarrative(text)) flags.push('non_chinese_narrative')
  if (hasSelfRepetition(text)) flags.push('self_repetition')
  if (isLikelyQuestionListOnly(text)) flags.push('question_list_only')
  if (!hasActionVerb(text) && status === 'completed') flags.push('no_next_action_signal')
  if (weaklyMissesLatestInput(userInput, text)) flags.push('weak_latest_followup_overlap')
  return unique(flags)
}

function hasJapaneseNarrative(text: string): boolean {
  const kana = text.match(/[\u3040-\u30ff]/g)?.length ?? 0
  const cjk = text.match(/[\u4e00-\u9fff]/g)?.length ?? 0
  return kana >= 12 && kana / Math.max(cjk + kana, 1) > 0.08
}

function hasSelfRepetition(text: string): boolean {
  const normalized = text
    .replace(/[ \t]+/g, '')
    .split(/\n+|[。！？!?]/)
    .map(s => s.trim())
    .filter(s => s.length >= 14)
  const seen = new Set<string>()
  let repeats = 0
  for (const s of normalized) {
    if (seen.has(s)) repeats += 1
    seen.add(s)
  }
  return repeats >= 2
}

function isLikelyQuestionListOnly(text: string): boolean {
  const questionMarks = (text.match(/[?？]/g) ?? []).length
  const actionSignals = (text.match(/先|下一步|准备|确认|提交|联系|补交|记录|避免/g) ?? []).length
  return questionMarks >= 5 && actionSignals < 3
}

function hasActionVerb(text: string): boolean {
  return /先|下一步|今天|现在|确认|准备|提交|补交|联系|记录|保存|整理|预约|说明|届出|咨询|避免/.test(text)
}

function weaklyMissesLatestInput(input: string, answer: string): boolean {
  const terms = importantTerms(input)
  if (terms.length === 0 || answer.length === 0) return false
  const hits = terms.filter(t => answer.includes(t)).length
  return hits === 0 && terms.length >= 2
}

function importantTerms(input: string): string[] {
  const raw = input.match(/[A-Za-z0-9]{2,}|[\u4e00-\u9fff]{2,}|[\u30a0-\u30ff]{2,}/g) ?? []
  const stop = new Set([
    '这个', '那个', '现在', '如果', '是不是', '可以', '怎么办', '还有', '需要', '已经',
    '因为', '但是', '这样', '不是', '没有', '时候', '一下', '什么',
  ])
  return unique(raw.filter(t => !stop.has(t)).slice(0, 8))
}

function summarize(cases: CaseRun[]): RunOutput['summary'] {
  const rounds = cases.flatMap(c => c.rounds)
  const flagCounts: Record<string, number> = {}
  for (const flag of rounds.flatMap(r => r.qa_flags)) {
    flagCounts[flag] = (flagCounts[flag] ?? 0) + 1
  }
  return {
    cases_total: cases.length,
    rounds_total: rounds.length,
    completed_rounds: rounds.filter(r => r.completion_status === 'completed').length,
    failed_rounds: rounds.filter(r => r.completion_status !== 'completed').length,
    cases_with_flags: cases.filter(c => c.qa_flags.length > 0).length,
    flag_counts: flagCounts,
  }
}

function renderMarkdown(output: RunOutput): string {
  const lines: string[] = []
  lines.push('# TEBIQ Follow-up Flywheel Run v1')
  lines.push('')
  lines.push(`- Generated: ${output.generated_at}`)
  lines.push(`- Base URL: ${output.base_url}`)
  lines.push(`- Cases: ${output.summary.cases_total}`)
  lines.push(`- Completed rounds: ${output.summary.completed_rounds}/${output.summary.rounds_total}`)
  lines.push(`- Failed/non-completed rounds: ${output.summary.failed_rounds}`)
  lines.push('')
  lines.push('## Flag Counts')
  lines.push('')
  const flagEntries = Object.entries(output.summary.flag_counts).sort((a, b) => b[1] - a[1])
  if (flagEntries.length === 0) {
    lines.push('- none')
  } else {
    for (const [flag, count] of flagEntries) lines.push(`- ${flag}: ${count}`)
  }
  lines.push('')
  lines.push('## Cases')
  lines.push('')
  for (const c of output.cases) {
    lines.push(`### ${c.case_id} — ${c.scenario}`)
    lines.push('')
    lines.push(`- Profile: ${c.user_profile_brief}`)
    lines.push(`- Hidden risk hint: ${c.hidden_risk_hint}`)
    lines.push(`- Case flags: ${c.qa_flags.length ? c.qa_flags.join(', ') : 'none'}`)
    lines.push('')
    lines.push('| Round | Status | Parent | ID | Fact cards | Flags | Input | Answer preview |')
    lines.push('|---:|---|---|---|---:|---|---|---|')
    for (const r of c.rounds) {
      lines.push([
        String(r.round),
        r.completion_status,
        r.parent_consultation_id ? shortId(r.parent_consultation_id) : '-',
        r.consultation_id ? shortId(r.consultation_id) : '-',
        String(r.fact_cards.length),
        r.qa_flags.length ? r.qa_flags.join(', ') : '-',
        mdCell(r.input, 48),
        mdCell(r.answer_text, 72),
      ].join('|').replace(/^/, '|').replace(/$/, '|'))
    }
    lines.push('')
  }
  return lines.join('\n') + '\n'
}

function mdCell(text: string, max: number): string {
  return compact(text, max).replaceAll('|', '\\|').replace(/\s+/g, ' ')
}

function compact(text: string, max: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim()
  if (normalized.length <= max) return normalized
  return normalized.slice(0, max - 1) + '…'
}

function shortId(id: string): string {
  return id.length <= 10 ? id : `${id.slice(0, 6)}…${id.slice(-4)}`
}

function unique<T>(items: T[]): T[] {
  return Array.from(new Set(items))
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '')
}

function parseCaseFilter(value: string | null): Set<string> | null {
  if (!value) return null
  return new Set(value.split(',').map(v => v.trim()).filter(Boolean))
}

function parseOptionalInt(value: string | null): number | null {
  if (!value) return null
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) && n > 0 ? n : null
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
