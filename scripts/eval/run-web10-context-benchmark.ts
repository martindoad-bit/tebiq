#!/usr/bin/env tsx
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { CONSULTATION_ALPHA_MAX_TOKENS, buildConsultationMessages } from '@/lib/answer/prompt/consultation-alpha-v1'
import {
  matchPracticalCards,
  practicalMatchesToPromptContext,
  type PracticalCardMatch,
} from '@/lib/answer/practical-layer/matcher'

type SystemId = 'tebiq-native-v2-web-context' | 'deepseek-v4-flash-thinking-web-context' | 'deepseek-v4-pro-thinking-web-context'

interface SourceContext {
  source: string
  url: string
  summary: string
}

interface QuestionItem {
  question_id: string
  source_question_id: string
  persona: string
  background: string
  question: string
  web_context: SourceContext[]
}

interface Pack {
  benchmark_id: string
  created_at: string
  note: string
  questions: QuestionItem[]
}

interface Args {
  input: string
  out: string
  systems: SystemId[]
  concurrency: number
  timeoutMs: number
  deepseekBaseUrl: string
}

interface AnswerRecord {
  question_id: string
  source_question_id: string
  persona: string
  background: string
  question: string
  system_id: SystemId
  status: 'completed' | 'failed'
  answer_text: string
  answer_chars: number
  latency_ms: number
  error: string | null
  metadata: Record<string, unknown>
}

const SYSTEMS: SystemId[] = [
  'tebiq-native-v2-web-context',
  'deepseek-v4-flash-thinking-web-context',
  'deepseek-v4-pro-thinking-web-context',
]

const RAW_SYSTEM_PROMPT = [
  '你是一位熟悉日本在留资格、入管手续、行政书士实务、税务/年金/社保基础的中文咨询助手。',
  '请结合用户问题和提供的联网资料回答。不要编造资料外的官方链接。',
  '回答要自然、准确、可执行；复杂问题分条件，简单问题直接说。',
].join('\n')

function parseArgs(argv: string[]): Args {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-')
  const args: Args = {
    input: 'docs/eval/TEBIQ_WEB10_CONTEXT_2026-05-19.json',
    out: `scripts/eval/output/tebiq-web10-${stamp}`,
    systems: SYSTEMS,
    concurrency: 3,
    timeoutMs: 240000,
    deepseekBaseUrl: 'https://api.deepseek.com',
  }
  for (const arg of argv) {
    if (arg.startsWith('--input=')) args.input = arg.slice('--input='.length)
    else if (arg.startsWith('--out=')) args.out = arg.slice('--out='.length)
    else if (arg.startsWith('--concurrency=')) args.concurrency = clamp(arg.slice('--concurrency='.length), 1, 5, 'concurrency')
    else if (arg.startsWith('--timeout-ms=')) args.timeoutMs = clamp(arg.slice('--timeout-ms='.length), 10000, 600000, 'timeout-ms')
    else if (arg.startsWith('--systems=')) args.systems = parseSystems(arg.slice('--systems='.length))
  }
  return args
}

function clamp(raw: string, min: number, max: number, name: string): number {
  const n = Number(raw)
  if (!Number.isInteger(n) || n < min || n > max) throw new Error(`invalid --${name}=${raw}`)
  return n
}

function parseSystems(raw: string): SystemId[] {
  const allowed = new Set<SystemId>(SYSTEMS)
  const systems = raw.split(',').map(s => s.trim()).filter(Boolean)
  for (const system of systems) {
    if (!allowed.has(system as SystemId)) throw new Error(`unknown system: ${system}`)
  }
  return systems as SystemId[]
}

function readPack(path: string): Pack {
  return JSON.parse(readFileSync(resolve(path), 'utf8')) as Pack
}

function writeJson(path: string, value: unknown): void {
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`)
}

function webContextText(item: QuestionItem): string {
  return [
    '联网资料（请优先使用，若来源之间有冲突，请说明冲突而不是硬凑结论）：',
    ...item.web_context.map((source, index) => [
      `${index + 1}. ${source.source}`,
      `URL: ${source.url}`,
      `要点: ${source.summary}`,
    ].join('\n')),
  ].join('\n\n')
}

function userWithContext(item: QuestionItem): string {
  return [
    `用户背景：${item.background}`,
    `用户问题：${item.question}`,
    '',
    webContextText(item),
  ].join('\n')
}

async function callSystem(item: QuestionItem, systemId: SystemId, args: Args): Promise<AnswerRecord> {
  const started = Date.now()
  try {
    const { messages, practicalMatches } = buildMessages(item, systemId)
    const model = systemId === 'deepseek-v4-pro-thinking-web-context' ? 'deepseek-v4-pro' : 'deepseek-v4-flash'
    const answer = await callDeepseek(messages, model, args)
    return {
      question_id: item.question_id,
      source_question_id: item.source_question_id,
      persona: item.persona,
      background: item.background,
      question: item.question,
      system_id: systemId,
      status: 'completed',
      answer_text: answer.answerText,
      answer_chars: answer.answerText.length,
      latency_ms: Date.now() - started,
      error: null,
      metadata: {
        model,
        finish_reason: answer.finishReason,
        reasoning_chars: answer.reasoningChars,
        source_count: item.web_context.length,
        practical_card_ids: practicalMatches.map(match => match.practical_card_id),
        practical_card_titles: practicalMatches.map(match => match.title),
      },
    }
  } catch (err) {
    return {
      question_id: item.question_id,
      source_question_id: item.source_question_id,
      persona: item.persona,
      background: item.background,
      question: item.question,
      system_id: systemId,
      status: 'failed',
      answer_text: '',
      answer_chars: 0,
      latency_ms: Date.now() - started,
      error: err instanceof Error ? err.message : String(err),
      metadata: { source_count: item.web_context.length },
    }
  }
}

function buildMessages(
  item: QuestionItem,
  systemId: SystemId,
): { messages: Array<{ role: 'system' | 'user'; content: string }>; practicalMatches: PracticalCardMatch[] } {
  if (systemId === 'tebiq-native-v2-web-context') {
    const practicalMatches = matchPracticalCards(item.question)
    const practicalSystemMessage = practicalMatchesToPromptContext(practicalMatches)
    const baseMessages = buildConsultationMessages({
      userQuestion: `用户背景：${item.background}\n用户问题：${item.question}`,
      factAnchors: item.web_context.map((source, index) => ({
        id: `web${index + 1}:${source.source}`,
        text: `${source.summary} URL: ${source.url}`,
      })),
    })
    if (!practicalSystemMessage) return { messages: baseMessages, practicalMatches }
    return {
      messages: [
        ...baseMessages.slice(0, -2),
        { role: 'system', content: practicalSystemMessage },
        ...baseMessages.slice(-2),
      ],
      practicalMatches,
    }
  }
  return {
    practicalMatches: [],
    messages: [
      { role: 'system', content: RAW_SYSTEM_PROMPT },
      { role: 'user', content: userWithContext(item) },
    ],
  }
}

async function callDeepseek(
  messages: Array<{ role: 'system' | 'user'; content: string }>,
  model: string,
  args: Args,
): Promise<{ answerText: string; finishReason: string | null; reasoningChars: number }> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY is required')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), args.timeoutMs)
  try {
    const res = await fetch(`${args.deepseekBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: 0.25,
        max_tokens: CONSULTATION_ALPHA_MAX_TOKENS,
        thinking: { type: 'enabled' },
        reasoning_effort: 'high',
      }),
      signal: controller.signal,
    })
    if (!res.ok || !res.body) {
      const text = await res.text().catch(() => '')
      throw new Error(`deepseek_http_${res.status}:${text.slice(0, 400)}`)
    }
    return await readSse(res)
  } finally {
    clearTimeout(timeout)
  }
}

async function readSse(res: Response): Promise<{ answerText: string; finishReason: string | null; reasoningChars: number }> {
  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let answerText = ''
  let finishReason: string | null = null
  let reasoningChars = 0
  const handleLine = (line: string) => {
    const trimmed = line.trim()
    if (!trimmed.startsWith('data:')) return
    const payload = trimmed.slice('data:'.length).trim()
    if (!payload || payload === '[DONE]') return
    let json: any
    try { json = JSON.parse(payload) } catch { return }
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
  return { answerText, finishReason, reasoningChars }
}

async function runWithConcurrency<T>(items: T[], concurrency: number, worker: (item: T, index: number) => Promise<void>): Promise<void> {
  let next = 0
  await Promise.all(Array.from({ length: Math.min(items.length, concurrency) }, async () => {
    while (true) {
      const index = next++
      if (index >= items.length) return
      await worker(items[index], index)
    }
  }))
}

function summary(answers: AnswerRecord[]) {
  const systems = Array.from(new Set(answers.map(a => a.system_id)))
  return Object.fromEntries(systems.map(system => {
    const rows = answers.filter(a => a.system_id === system)
    return [system, {
      total: rows.length,
      completed: rows.filter(a => a.status === 'completed').length,
      avg_latency_ms: Math.round(rows.reduce((sum, row) => sum + row.latency_ms, 0) / rows.length),
      avg_chars: Math.round(rows.reduce((sum, row) => sum + row.answer_chars, 0) / rows.length),
      errors: rows.filter(a => a.error).map(a => `${a.question_id}: ${a.error}`),
    }]
  }))
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const pack = readPack(args.input)
  const outDir = resolve(args.out)
  const tasks = pack.questions.flatMap(question => args.systems.map(system => ({ question, system })))
  const answers: AnswerRecord[] = []
  console.log(`[WEB10] questions=${pack.questions.length} systems=${args.systems.length} tasks=${tasks.length} concurrency=${args.concurrency}`)
  console.log(`[WEB10] out=${outDir}`)
  const started = Date.now()
  await runWithConcurrency(tasks, args.concurrency, async (task, index) => {
    const prefix = `[${index + 1}/${tasks.length}] ${task.question.question_id} ${task.system}`
    process.stdout.write(`${prefix} ... `)
    const answer = await callSystem(task.question, task.system, args)
    answers.push(answer)
    writeJson(`${outDir}/answers.partial.json`, { answers: answers.sort(sortAnswers) })
    console.log(`${answer.status} ${answer.answer_chars} chars ${answer.latency_ms}ms`)
  })
  const sorted = answers.sort(sortAnswers)
  writeJson(`${outDir}/answers.json`, {
    benchmark_id: pack.benchmark_id,
    generated_at: new Date().toISOString(),
    duration_ms: Date.now() - started,
    note: pack.note,
    systems: args.systems,
    questions: pack.questions,
    answers: sorted,
  })
  writeJson(`${outDir}/summary.json`, {
    benchmark_id: pack.benchmark_id,
    generated_at: new Date().toISOString(),
    duration_ms: Date.now() - started,
    by_system: summary(sorted),
  })
  console.log(`[WEB10] done duration=${Date.now() - started}ms`)
  console.log(`[WEB10] wrote ${outDir}`)
}

function sortAnswers(a: AnswerRecord, b: AnswerRecord): number {
  return a.question_id.localeCompare(b.question_id) || a.system_id.localeCompare(b.system_id)
}

main().catch(err => {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
})
