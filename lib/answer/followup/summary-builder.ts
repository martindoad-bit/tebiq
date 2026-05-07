// 0.6 Sprint Workstream D — consultation summary builder
// (ENGINE Pack 2.3).
//
// Generates / updates the structured `consultation_summary` jsonb row
// after each terminal LLM turn. Future turns feed only the latest
// summary + the user's newest addition to the LLM, never the raw
// multi-turn history (Pack §3 invariant).
//
// Design choices:
//   - Pure helper module — does NOT touch DB. The caller persists.
//   - The LLM call is bounded short (max_tokens=400, temperature=0.0)
//     so latency stays well under Pack §"何时停下" 5-second gate.
//   - Returns null on any failure path — the caller writes the parent's
//     existing summary back unchanged so the chain still works without
//     LLM enrichment. Resilience > strict semantics here.
//   - JSON-mode response so we don't have to parse free text. DeepSeek
//     V4 Pro supports `response_format: { type: 'json_object' }`.
//
// NOT in scope:
//   - Multi-card composition or RAG over the summary
//   - Embedding-based "facts already covered" dedup
//   - Cross-chain user model

import type { ConsultationSummary } from '@/lib/consultation/stream-protocol'

const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'

/**
 * 'thinking off' summary model. Same provider, lighter call. Per Pack §3
 * note: "建议同 deepseek-v4-pro，但可以 thinking off + 短 prompt 节省成本"
 * — the v4-pro endpoint accepts a `thinking: false` toggle in the
 * extended-body shape used by /api/consultation/stream. We default to
 * the lightest model the deployment supports.
 */
const SUMMARY_MODEL = 'deepseek-chat'
const SUMMARY_MAX_TOKENS = 400
const SUMMARY_TEMPERATURE = 0.0
/** Soft latency budget. The summary call runs AFTER the user's stream
 *  has already completed, so latency only delays the persisted summary
 *  for the NEXT round — not the current user's answer. We still cap to
 *  prevent runaway requests. */
const SUMMARY_TIMEOUT_MS = 25_000

/**
 * Bound the summary's list lengths so the next round's prompt stays
 * compact even after several follow-ups.
 */
const KNOWN_FACTS_MAX = 6
const MISSING_FACTS_MAX = 4
const KEY_POINTS_MAX = 4
const FACT_LENGTH_MAX = 240
const GOAL_LENGTH_MAX = 240

const SUMMARY_SYSTEM_PROMPT = [
  '你是 TEBIQ 的咨询摘要器。',
  '任务：把一次在留咨询的「用户问题 + AI 回答」（可能附带上一轮摘要）压缩成一份结构化 JSON 摘要，',
  '让下一轮咨询不必重传完整对话历史。',
  '',
  '输出严格 JSON，字段固定：',
  '{',
  '  "user_goal": "用户最终想达成什么（≤80 字）",',
  '  "known_facts": ["已经确认的事实，每条 ≤80 字，最多 6 条"],',
  '  "missing_facts": ["AI 回答里指出还需要确认的关键点，每条 ≤80 字，最多 4 条"],',
  '  "last_answer_key_points": ["上一轮回答里 2-4 条最 actionable 的核心结论，每条 ≤80 字"]',
  '}',
  '',
  '严格要求：',
  '- 不要复制整段对话；只抽核心事实',
  '- 不要承诺签证一定通过 / 一定不通过',
  '- 不要使用「一定可以 / 没问题 / 不会影响 / 保证 / 必ず / 絶対 / 100% / 大丈夫 / 应该没问题」',
  '- 不要泄漏内部模型名（DeepSeek / AI / GPT / Claude）',
  '- 如果上一轮已有摘要，把新一轮的 user message + answer 合并进去（不是覆盖）',
  '- 输出仅 JSON 对象，无前后文字',
].join('\n')

interface BuildSummaryInput {
  /** Apex question of the chain — round 0's userQuestionText. */
  rootQuestion: string
  /** What the user just typed in this round (round 0 = same as
   *  rootQuestion; rounds 1+ = the follow-up addition). */
  userMessage: string
  /** What the LLM answered in this round. */
  answerText: string
  /** Existing summary from the parent's previous terminal turn — null
   *  on round 0. The builder merges into / replaces this. */
  priorSummary: ConsultationSummary | null
  /** Round index AFTER this turn (round 0 → 0; first follow-up → 1, …).
   *  Useful so the prompt can phrase "this is round N" guidance. */
  roundIndex: number
}

export interface BuildSummaryResult {
  summary: ConsultationSummary | null
  /** When the LLM call fails or returns garbage, we fall back to the
   *  prior summary and surface the reason for ops review. */
  fallback_reason?: string
  /** Wall-clock latency (ms). Useful telemetry; caller can persist. */
  latency_ms: number
}

/**
 * Validate + clamp a parsed JSON candidate to the
 * ConsultationSummary shape. Drops any unexpected fields silently.
 */
function coerceSummary(value: unknown): ConsultationSummary | null {
  if (!value || typeof value !== 'object') return null
  const v = value as Record<string, unknown>
  const userGoal = typeof v.user_goal === 'string' ? v.user_goal.slice(0, GOAL_LENGTH_MAX).trim() : ''
  if (!userGoal) return null
  const knownFacts = Array.isArray(v.known_facts)
    ? (v.known_facts as unknown[])
        .filter((s): s is string => typeof s === 'string')
        .map(s => s.slice(0, FACT_LENGTH_MAX).trim())
        .filter(Boolean)
        .slice(0, KNOWN_FACTS_MAX)
    : []
  const missingFacts = Array.isArray(v.missing_facts)
    ? (v.missing_facts as unknown[])
        .filter((s): s is string => typeof s === 'string')
        .map(s => s.slice(0, FACT_LENGTH_MAX).trim())
        .filter(Boolean)
        .slice(0, MISSING_FACTS_MAX)
    : []
  const keyPoints = Array.isArray(v.last_answer_key_points)
    ? (v.last_answer_key_points as unknown[])
        .filter((s): s is string => typeof s === 'string')
        .map(s => s.slice(0, FACT_LENGTH_MAX).trim())
        .filter(Boolean)
        .slice(0, KEY_POINTS_MAX)
    : []
  return {
    user_goal: userGoal,
    known_facts: knownFacts,
    missing_facts: missingFacts,
    last_answer_key_points: keyPoints,
  }
}

/**
 * Build the LLM messages array. Exposed for testing.
 */
export function buildSummaryMessages(input: BuildSummaryInput): Array<{
  role: 'system' | 'user'
  content: string
}> {
  const userBlock = [
    `根问题（chain 第 1 轮的原始问题）：${input.rootQuestion}`,
    '',
    `本轮用户输入（第 ${input.roundIndex + 1} 轮，roundIndex=${input.roundIndex}）：`,
    input.userMessage,
    '',
    '本轮 AI 回答：',
    input.answerText,
  ]
  if (input.priorSummary) {
    userBlock.push(
      '',
      '上一轮已有的结构化摘要（请合并，不要覆盖）：',
      JSON.stringify(input.priorSummary),
    )
  }
  userBlock.push(
    '',
    '请输出更新后的结构化摘要 JSON。',
  )
  return [
    { role: 'system', content: SUMMARY_SYSTEM_PROMPT },
    { role: 'user', content: userBlock.join('\n') },
  ]
}

/**
 * Run the LLM summary call. Always resolves; never throws. Caller
 * persists `result.summary` (which is null on failure → keep prior).
 *
 * `fetchImpl` lets tests stub the network without monkey-patching
 * global fetch.
 */
export async function buildConsultationSummary(
  input: BuildSummaryInput,
  options: {
    apiKey?: string
    fetchImpl?: typeof fetch
    timeoutMs?: number
  } = {},
): Promise<BuildSummaryResult> {
  const start = Date.now()
  const apiKey = options.apiKey ?? process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return {
      summary: input.priorSummary,
      fallback_reason: 'no_api_key',
      latency_ms: Date.now() - start,
    }
  }
  const fetchImpl = options.fetchImpl ?? fetch
  const ac = new AbortController()
  const timeout = setTimeout(() => ac.abort(), options.timeoutMs ?? SUMMARY_TIMEOUT_MS)
  try {
    const res = await fetchImpl(DEEPSEEK_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: SUMMARY_MODEL,
        temperature: SUMMARY_TEMPERATURE,
        max_tokens: SUMMARY_MAX_TOKENS,
        response_format: { type: 'json_object' },
        messages: buildSummaryMessages(input),
      }),
      signal: ac.signal,
    })
    if (!res.ok) {
      return {
        summary: input.priorSummary,
        fallback_reason: `http_${res.status}`,
        latency_ms: Date.now() - start,
      }
    }
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: unknown } }>
    }
    const raw = json?.choices?.[0]?.message?.content
    if (typeof raw !== 'string') {
      return {
        summary: input.priorSummary,
        fallback_reason: 'no_message_content',
        latency_ms: Date.now() - start,
      }
    }
    let parsed: unknown
    try {
      parsed = JSON.parse(raw)
    } catch {
      return {
        summary: input.priorSummary,
        fallback_reason: 'invalid_json',
        latency_ms: Date.now() - start,
      }
    }
    const coerced = coerceSummary(parsed)
    if (!coerced) {
      return {
        summary: input.priorSummary,
        fallback_reason: 'shape_invalid',
        latency_ms: Date.now() - start,
      }
    }
    return { summary: coerced, latency_ms: Date.now() - start }
  } catch (err) {
    return {
      summary: input.priorSummary,
      fallback_reason: err instanceof Error && err.name === 'AbortError' ? 'timeout' : 'exception',
      latency_ms: Date.now() - start,
    }
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Render the prior summary as a short additional system message that
 * the follow-up endpoint injects ahead of the user's new addition.
 * Returns null when there's nothing to inject.
 *
 * Pack §3 invariant: this is the ONLY way the LLM sees the prior
 * conversation — never the raw history.
 */
export function summaryAsSystemMessage(
  summary: ConsultationSummary | null,
): { role: 'system'; content: string } | null {
  if (!summary) return null
  const lines: string[] = ['以下是当前咨询链已有的结构化上下文（不是用户新输入的内容）：']
  lines.push(`- user_goal: ${summary.user_goal}`)
  if (summary.known_facts.length > 0) {
    lines.push('- known_facts:')
    for (const f of summary.known_facts) lines.push(`  · ${f}`)
  }
  if (summary.missing_facts.length > 0) {
    lines.push('- missing_facts:')
    for (const f of summary.missing_facts) lines.push(`  · ${f}`)
  }
  if (summary.last_answer_key_points.length > 0) {
    lines.push('- last_answer_key_points:')
    for (const p of summary.last_answer_key_points) lines.push(`  · ${p}`)
  }
  lines.push(
    '',
    '请基于上面的已知事实回答本轮新增问题；不要复述上一轮已说过的核心结论；',
    '如果用户新增内容与已知事实冲突，请明确指出。',
  )
  return { role: 'system', content: lines.join('\n') }
}

/**
 * Internal helpers exposed for unit tests.
 */
export const _summaryInternals = {
  coerceSummary,
  SUMMARY_MODEL,
  SUMMARY_MAX_TOKENS,
  SUMMARY_TEMPERATURE,
  SUMMARY_TIMEOUT_MS,
  KNOWN_FACTS_MAX,
  MISSING_FACTS_MAX,
  KEY_POINTS_MAX,
  GOAL_LENGTH_MAX,
  FACT_LENGTH_MAX,
}
