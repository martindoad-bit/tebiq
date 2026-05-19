#!/usr/bin/env tsx
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { parseConsultationChunk, type ConsultationEvent } from '@/lib/consultation/stream-protocol'

type SystemId = 'tebiq-production' | 'deepseek-v4-flash-thinking' | 'deepseek-v4-pro-thinking'

interface Question {
  question_id: string
  category: string
  persona: string
  background: string
  question: string
  why_asked: string
  user_need: string
  risk_level: string
  material_bridge: boolean
}

interface QuestionPack {
  benchmark_id: string
  title: string
  created_at: string
  purpose: string
  questions: Question[]
}

interface Args {
  questions: string
  baseUrl: string
  out: string
  limit: number
  offset: number
  concurrency: number
  systems: SystemId[]
  timeoutMs: number
  deepseekBaseUrl: string
}

interface AnswerRecord {
  question_id: string
  category: string
  persona: string
  background: string
  question: string
  user_need: string
  risk_level: string
  material_bridge: boolean
  system_id: SystemId
  status: 'completed' | 'timeout' | 'failed'
  answer_text: string
  answer_chars: number
  latency_ms: number
  http_status: number | null
  error: string | null
  terminal_event?: string | null
  metadata: Record<string, unknown>
}

interface Task {
  question: Question
  systemId: SystemId
}

const DEFAULT_SYSTEMS: SystemId[] = [
  'tebiq-production',
  'deepseek-v4-flash-thinking',
  'deepseek-v4-pro-thinking',
]

const DEEPSEEK_SYSTEM_PROMPT = [
  '你是一位熟悉日本在留资格、入管手续、税务/年金/社保基础实务的中文咨询助手。',
  '请用自然、清楚、专业但不僵硬的中文回答。',
  '优先回答用户真正担心的问题；如果存在条件分支，请说明需要确认哪些事实。',
  '不要为了显得谨慎而空泛地建议咨询专家；只有在确实需要个案判断时才提示。',
  '不要编造官方链接或不存在的制度。',
].join('\n')

function parseArgs(argv: string[]): Args {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const out: Args = {
    questions: 'docs/eval/TEBIQ_CEB01_QUESTIONS.json',
    baseUrl: 'https://tebiq.jp',
    out: `scripts/eval/output/tebiq-ceb01-${timestamp}`,
    limit: 40,
    offset: 0,
    concurrency: 3,
    systems: DEFAULT_SYSTEMS,
    timeoutMs: 240000,
    deepseekBaseUrl: 'https://api.deepseek.com',
  }

  for (const arg of argv) {
    if (arg.startsWith('--questions=')) out.questions = arg.slice('--questions='.length)
    else if (arg.startsWith('--base-url=')) out.baseUrl = arg.slice('--base-url='.length).replace(/\/$/, '')
    else if (arg.startsWith('--out=')) out.out = arg.slice('--out='.length)
    else if (arg.startsWith('--limit=')) out.limit = toInt(arg.slice('--limit='.length), 1, 200, 'limit')
    else if (arg.startsWith('--offset=')) out.offset = toInt(arg.slice('--offset='.length), 0, 200, 'offset')
    else if (arg.startsWith('--concurrency=')) out.concurrency = toInt(arg.slice('--concurrency='.length), 1, 6, 'concurrency')
    else if (arg.startsWith('--timeout-ms=')) out.timeoutMs = toInt(arg.slice('--timeout-ms='.length), 10000, 600000, 'timeout-ms')
    else if (arg.startsWith('--deepseek-base-url=')) out.deepseekBaseUrl = arg.slice('--deepseek-base-url='.length).replace(/\/$/, '')
    else if (arg.startsWith('--systems=')) out.systems = parseSystems(arg.slice('--systems='.length))
  }

  if (out.systems.length === 0) throw new Error('No systems selected')
  return out
}

function toInt(value: string, min: number, max: number, label: string): number {
  const n = Number(value)
  if (!Number.isInteger(n) || n < min || n > max) {
    throw new Error(`invalid --${label}=${value}; expected ${min}..${max}`)
  }
  return n
}

function parseSystems(value: string): SystemId[] {
  const allowed = new Set<SystemId>(DEFAULT_SYSTEMS)
  const systems = value.split(',').map(s => s.trim()).filter(Boolean)
  for (const system of systems) {
    if (!allowed.has(system as SystemId)) throw new Error(`unknown system: ${system}`)
  }
  return systems as SystemId[]
}

function readQuestions(path: string, args: Args): Question[] {
  const fullPath = resolve(path)
  const pack = JSON.parse(readFileSync(fullPath, 'utf8')) as QuestionPack
  if (!Array.isArray(pack.questions)) throw new Error(`questions file missing questions[]: ${path}`)
  const selected = pack.questions.slice(args.offset, args.offset + args.limit)
  assertUnique(selected.map(q => q.question_id), 'question_id')
  return selected
}

function assertUnique(values: string[], label: string): void {
  const seen = new Set<string>()
  for (const value of values) {
    if (seen.has(value)) throw new Error(`duplicate ${label}: ${value}`)
    seen.add(value)
  }
}

function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true })
}

function writeJson(path: string, data: unknown): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`)
}

function sha256(text: string): string {
  return createHash('sha256').update(text).digest('hex')
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await promise
  } catch (err) {
    if (controller.signal.aborted) throw new Error(`${label}_timeout`)
    throw err
  } finally {
    clearTimeout(timeout)
  }
}

function createAbortSignal(timeoutMs: number): { signal: AbortSignal, clear: () => void } {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  return { signal: controller.signal, clear: () => clearTimeout(timeout) }
}

async function callTebiq(question: Question, args: Args): Promise<AnswerRecord> {
  const started = Date.now()
  const timeout = createAbortSignal(args.timeoutMs)
  try {
    const res = await fetch(`${args.baseUrl}/api/consultation/stream`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question: question.question }),
      signal: timeout.signal,
    })
    let answerText = ''
    let terminal: ConsultationEvent['event'] | null = null
    const meta: Record<string, unknown> = {}

    if (!res.body) {
      const text = await res.text().catch(() => '')
      throw new Error(`tebiq_no_body:${res.status}:${text.slice(0, 160)}`)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const parsed = parseConsultationChunk(buffer)
      buffer = parsed.remainder
      for (const event of parsed.events) {
        if (event.event === 'answer_chunk') answerText += event.chunk
        if (event.event === 'received') meta.consultation_id = event.consultation_id
        if (event.event === 'completed' || event.event === 'timeout' || event.event === 'failed') {
          terminal = event.event
          if ('fact_card_ids' in event) meta.fact_card_ids = event.fact_card_ids
          if ('route_gate_ids' in event) meta.route_gate_ids = event.route_gate_ids
          if ('guardrail_findings' in event) meta.guardrail_findings = event.guardrail_findings
        }
      }
    }
    buffer += decoder.decode()
    const parsed = parseConsultationChunk(buffer)
    for (const event of parsed.events) {
      if (event.event === 'answer_chunk') answerText += event.chunk
      if (event.event === 'completed' || event.event === 'timeout' || event.event === 'failed') {
        terminal = event.event
        if ('fact_card_ids' in event) meta.fact_card_ids = event.fact_card_ids
        if ('route_gate_ids' in event) meta.route_gate_ids = event.route_gate_ids
        if ('guardrail_findings' in event) meta.guardrail_findings = event.guardrail_findings
      }
    }

    const status: AnswerRecord['status'] = terminal === 'completed'
      ? 'completed'
      : terminal === 'timeout'
        ? 'timeout'
        : terminal === 'failed'
          ? 'failed'
          : res.ok
            ? 'failed'
            : 'failed'

    return toRecord(question, 'tebiq-production', {
      status,
      answerText,
      started,
      httpStatus: res.status,
      error: status === 'completed' ? null : `terminal=${terminal ?? 'missing'}`,
      terminalEvent: terminal,
      metadata: meta,
    })
  } catch (err) {
    return toRecord(question, 'tebiq-production', {
      status: 'failed',
      answerText: '',
      started,
      httpStatus: null,
      error: err instanceof Error ? err.message : String(err),
      terminalEvent: null,
      metadata: {},
    })
  } finally {
    timeout.clear()
  }
}

async function callDeepseek(question: Question, systemId: SystemId, args: Args): Promise<AnswerRecord> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY is required for DeepSeek systems')
  }
  const model = systemId === 'deepseek-v4-pro-thinking' ? 'deepseek-v4-pro' : 'deepseek-v4-flash'
  const started = Date.now()
  const timeout = createAbortSignal(args.timeoutMs)
  const body = {
    model,
    messages: [
      { role: 'system', content: DEEPSEEK_SYSTEM_PROMPT },
      { role: 'user', content: question.question },
    ],
    stream: true,
    temperature: 0.3,
    max_tokens: 2600,
    thinking: { type: 'enabled' },
    reasoning_effort: 'high',
  }
  try {
    const res = await fetch(`${args.deepseekBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: timeout.signal,
    })

    if (!res.body) {
      const text = await res.text().catch(() => '')
      throw new Error(`deepseek_no_body:${res.status}:${text.slice(0, 300)}`)
    }
    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`deepseek_http_${res.status}:${text.slice(0, 500)}`)
    }

    const { answerText, finishReason, reasoningChars, usage } = await readOpenAiStyleSse(res)
    return toRecord(question, systemId, {
      status: 'completed',
      answerText,
      started,
      httpStatus: res.status,
      error: null,
      terminalEvent: finishReason,
      metadata: { model, reasoning_chars: reasoningChars, usage },
    })
  } catch (err) {
    return toRecord(question, systemId, {
      status: 'failed',
      answerText: '',
      started,
      httpStatus: null,
      error: err instanceof Error ? err.message : String(err),
      terminalEvent: null,
      metadata: { model },
    })
  } finally {
    timeout.clear()
  }
}

async function readOpenAiStyleSse(res: Response): Promise<{
  answerText: string
  finishReason: string | null
  reasoningChars: number
  usage: unknown
}> {
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let answerText = ''
  let finishReason: string | null = null
  let reasoningChars = 0
  let usage: unknown = null

  const handleLine = (line: string) => {
    const trimmed = line.trim()
    if (!trimmed.startsWith('data:')) return
    const payload = trimmed.slice('data:'.length).trim()
    if (!payload || payload === '[DONE]') return
    let json: any
    try {
      json = JSON.parse(payload)
    } catch {
      return
    }
    if (json.usage) usage = json.usage
    const choice = json.choices?.[0]
    if (!choice) return
    if (choice.finish_reason) finishReason = choice.finish_reason
    const delta = choice.delta ?? {}
    if (typeof delta.content === 'string') answerText += delta.content
    if (typeof delta.reasoning_content === 'string') reasoningChars += delta.reasoning_content.length
  }

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split(/\r?\n/)
    buffer = lines.pop() ?? ''
    for (const line of lines) handleLine(line)
  }
  buffer += decoder.decode()
  for (const line of buffer.split(/\r?\n/)) handleLine(line)
  return { answerText, finishReason, reasoningChars, usage }
}

function toRecord(
  question: Question,
  systemId: SystemId,
  input: {
    status: AnswerRecord['status']
    answerText: string
    started: number
    httpStatus: number | null
    error: string | null
    terminalEvent: string | null
    metadata: Record<string, unknown>
  },
): AnswerRecord {
  return {
    question_id: question.question_id,
    category: question.category,
    persona: question.persona,
    background: question.background,
    question: question.question,
    user_need: question.user_need,
    risk_level: question.risk_level,
    material_bridge: question.material_bridge,
    system_id: systemId,
    status: input.status,
    answer_text: input.answerText,
    answer_chars: input.answerText.length,
    latency_ms: Date.now() - input.started,
    http_status: input.httpStatus,
    error: input.error,
    terminal_event: input.terminalEvent,
    metadata: input.metadata,
  }
}

async function runWithConcurrency<T>(items: T[], concurrency: number, worker: (item: T, index: number) => Promise<void>): Promise<void> {
  let next = 0
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (true) {
      const index = next
      next += 1
      if (index >= items.length) return
      await worker(items[index], index)
    }
  })
  await Promise.all(runners)
}

function buildTasks(questions: Question[], systems: SystemId[]): Task[] {
  const tasks: Task[] = []
  for (const question of questions) {
    for (const systemId of systems) {
      tasks.push({ question, systemId })
    }
  }
  return tasks
}

function systemLabelOrder(questionId: string, systems: SystemId[]): Array<{ label: string, system_id: SystemId }> {
  const labels = ['A', 'B', 'C', 'D', 'E']
  const ordered = [...systems].sort((a, b) => {
    const ah = sha256(`${questionId}:${a}`).slice(0, 12)
    const bh = sha256(`${questionId}:${b}`).slice(0, 12)
    return ah.localeCompare(bh)
  })
  return ordered.map((system_id, index) => ({ label: labels[index], system_id }))
}

function writeBlindFiles(outDir: string, questions: Question[], systems: SystemId[], answers: AnswerRecord[]): void {
  const byKey = new Map(answers.map(answer => [`${answer.question_id}:${answer.system_id}`, answer]))
  const blindPacket = {
    benchmark_id: 'TEBIQ-CEB01',
    generated_at: new Date().toISOString(),
    scoring_protocol: 'docs/eval/TEBIQ_CEB01_PROTOCOL.md',
    questions: questions.map(question => {
      const order = systemLabelOrder(question.question_id, systems)
      return {
        question_id: question.question_id,
        category: question.category,
        persona: question.persona,
        background: question.background,
        question: question.question,
        user_need: question.user_need,
        risk_level: question.risk_level,
        material_bridge_expected: question.material_bridge,
        answers: order.map(item => {
          const answer = byKey.get(`${question.question_id}:${item.system_id}`)
          return {
            label: item.label,
            status: answer?.status ?? 'missing',
            answer_text: answer?.answer_text ?? '',
            answer_chars: answer?.answer_chars ?? 0,
            error: answer?.error ?? null,
          }
        }),
      }
    }),
  }
  const blindKey = {
    benchmark_id: 'TEBIQ-CEB01',
    generated_at: new Date().toISOString(),
    key: questions.map(question => ({
      question_id: question.question_id,
      labels: systemLabelOrder(question.question_id, systems),
    })),
  }
  writeJson(`${outDir}/blind-packet.json`, blindPacket)
  writeJson(`${outDir}/blind-key.json`, blindKey)
}

function buildSummary(args: Args, answers: AnswerRecord[]): Record<string, unknown> {
  const bySystem: Record<string, {
    total: number
    completed: number
    failed: number
    timeout: number
    avg_latency_ms: number
    avg_answer_chars: number
    errors: string[]
  }> = {}
  for (const systemId of args.systems) {
    const rows = answers.filter(answer => answer.system_id === systemId)
    const completed = rows.filter(row => row.status === 'completed').length
    bySystem[systemId] = {
      total: rows.length,
      completed,
      failed: rows.filter(row => row.status === 'failed').length,
      timeout: rows.filter(row => row.status === 'timeout').length,
      avg_latency_ms: rows.length ? Math.round(rows.reduce((sum, row) => sum + row.latency_ms, 0) / rows.length) : 0,
      avg_answer_chars: rows.length ? Math.round(rows.reduce((sum, row) => sum + row.answer_chars, 0) / rows.length) : 0,
      errors: rows.filter(row => row.error).slice(0, 10).map(row => `${row.question_id}: ${row.error}`),
    }
  }
  return {
    benchmark_id: 'TEBIQ-CEB01',
    generated_at: new Date().toISOString(),
    base_url: args.baseUrl,
    questions_file: args.questions,
    systems: args.systems,
    total_answers: answers.length,
    by_system: bySystem,
  }
}

async function runTask(task: Task, args: Args): Promise<AnswerRecord> {
  if (task.systemId === 'tebiq-production') return callTebiq(task.question, args)
  return callDeepseek(task.question, task.systemId, args)
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  if (args.systems.some(system => system.startsWith('deepseek')) && !process.env.DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY is required when DeepSeek systems are selected')
  }
  const outDir = resolve(args.out)
  if (existsSync(outDir)) {
    throw new Error(`output directory already exists: ${outDir}`)
  }
  ensureDir(outDir)

  const questions = readQuestions(args.questions, args)
  const tasks = buildTasks(questions, args.systems)
  const answers: AnswerRecord[] = []

  console.log(`[CEB01] questions=${questions.length} systems=${args.systems.join(',')} tasks=${tasks.length} concurrency=${args.concurrency}`)
  console.log(`[CEB01] output=${outDir}`)

  const started = Date.now()
  await runWithConcurrency(tasks, args.concurrency, async (task, index) => {
    const prefix = `[${index + 1}/${tasks.length}] ${task.question.question_id} ${task.systemId}`
    process.stdout.write(`${prefix} ... `)
    const record = await runTask(task, args)
    answers.push(record)
    writeJson(`${outDir}/answers.partial.json`, answers.sort(sortAnswers))
    console.log(`${record.status} ${record.answer_chars} chars ${record.latency_ms}ms`)
  })

  const sorted = answers.sort(sortAnswers)
  writeJson(`${outDir}/answers.json`, {
    benchmark_id: 'TEBIQ-CEB01',
    generated_at: new Date().toISOString(),
    duration_ms: Date.now() - started,
    questions,
    systems: args.systems,
    answers: sorted,
  })
  writeJson(`${outDir}/summary.json`, buildSummary(args, sorted))
  writeBlindFiles(outDir, questions, args.systems, sorted)
  console.log(`[CEB01] done duration=${Date.now() - started}ms`)
  console.log(`[CEB01] wrote ${outDir}`)
}

function sortAnswers(a: AnswerRecord, b: AnswerRecord): number {
  return a.question_id.localeCompare(b.question_id) || a.system_id.localeCompare(b.system_id)
}

main().catch(err => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
