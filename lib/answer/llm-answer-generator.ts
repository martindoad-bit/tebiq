import type { AnswerIntent } from './intent-router'
import type { AnswerSeed } from './answer-seeds'
import type { ScopeResult } from './answer-scope'
import { SUPPORTED_DOMAIN_SUMMARY } from './answer-scope'
import type {
  AnswerMode,
  AnswerResult,
  FallbackReason,
  KeyMissingInfo,
  LlmAnswerEnvelope,
  NextAction,
  SupportedDomain,
} from './types'

// LLM Answer Engine v0 ----------------------------------------------------
//
// One LLM call after candidate retrieval. Input: user question, parsed
// intent, the legacy answer (best deterministic guess), redline warnings,
// supported domains, optional matching seed/article info. Output: a
// strict JSON envelope — no free text. The caller is responsible for
// using a deterministic safe fallback when this generator returns
// `envelope: null` and inspecting `reason` for observability.

const DEFAULT_MODEL_ID = 'jp.anthropic.claude-sonnet-4-6'
const DEFAULT_REGION = 'ap-northeast-1'
const TIMEOUT_MS = 22_000

const ANSWER_MODES: readonly AnswerMode[] = ['direct_answer', 'answer_with_assumptions', 'clarification_needed', 'out_of_scope'] as const
const DOMAINS: readonly SupportedDomain[] = ['gijinkoku', 'business_manager', 'family_stay', 'permanent_resident', 'long_term_resident', 'unknown']
const URGENCIES = ['now', 'soon', 'later'] as const
const CONFIDENCES = ['high', 'medium', 'low'] as const

export interface GenerateLlmAnswerInput {
  questionText: string
  visaType?: string | null
  intent: AnswerIntent
  scope: ScopeResult
  legacyAnswer: AnswerResult
  candidateSeed?: AnswerSeed | null
  redlines?: string[]
}

export interface GenerateLlmAnswerResult {
  envelope: LlmAnswerEnvelope | null
  attempted: boolean
  reason?: FallbackReason
}

export async function generateLlmAnswer(
  input: GenerateLlmAnswerInput,
): Promise<GenerateLlmAnswerResult> {
  if (!isLlmEnabled()) {
    return { envelope: null, attempted: false, reason: 'disabled' }
  }

  let response: { content: Array<{ type: string; text?: string }> }
  try {
    const AnthropicBedrock = (await import('@anthropic-ai/bedrock-sdk')).default
    const client = new AnthropicBedrock({
      awsAccessKey: process.env.AWS_ACCESS_KEY_ID as string,
      awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      awsRegion: process.env.AWS_REGION ?? DEFAULT_REGION,
    })
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    try {
      response = await client.messages.create(
        {
          model: process.env.ANSWER_GENERATION_MODEL_ID
            ?? process.env.ANSWER_LLM_MODEL
            ?? DEFAULT_MODEL_ID,
          max_tokens: 1500,
          temperature: 0,
          system: buildSystemPrompt(),
          messages: [{ role: 'user', content: buildUserPayload(input) }],
        },
        { signal: controller.signal },
      ) as { content: Array<{ type: string; text?: string }> }
    } finally {
      clearTimeout(timer)
    }
  } catch (error) {
    const code = errorCode(error)
    const isAbort = /abort/i.test(code) || code === 'AbortError'
    console.warn('[answer/llm-generator] bedrock call failed', code)
    return {
      envelope: null,
      attempted: true,
      reason: isAbort ? 'timeout' : 'llm_exception',
    }
  }

  const text = response.content
    .map(block => block.type === 'text' ? (block.text ?? '') : '')
    .join('\n')

  if (!text.trim()) {
    console.warn('[answer/llm-generator] empty response')
    return { envelope: null, attempted: true, reason: 'empty_response' }
  }

  const jsonText = extractJson(text)
  if (!jsonText) {
    console.warn('[answer/llm-generator] no JSON object found in response')
    return { envelope: null, attempted: true, reason: 'json_parse_failed' }
  }

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(jsonText) as Record<string, unknown>
  } catch (error) {
    console.warn('[answer/llm-generator] json parse failed', errorCode(error))
    return { envelope: null, attempted: true, reason: 'json_parse_failed' }
  }

  const envelope = coerceEnvelope(parsed, input.scope)
  if (!envelope) {
    console.warn('[answer/llm-generator] envelope validation failed: missing answer_mode')
    return { envelope: null, attempted: true, reason: 'validation_failed' }
  }

  return { envelope, attempted: true }
}

function isLlmEnabled(): boolean {
  if (process.env.ANSWER_GENERATION_DISABLE_AI === '1') return false
  if (process.env.ANSWER_LLM_ENABLED === '0') return false
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) return false
  const provider = process.env.ANSWER_LLM_PROVIDER ?? 'bedrock'
  return provider === 'bedrock'
}

function buildSystemPrompt(): string {
  return [
    '你是 TEBIQ 的在留资格答案生成器。',
    '只针对五类在留：技术・人文知识・国际业务（gijinkoku）、经营管理（business_manager）、家族滞在（family_stay）、永住（permanent_resident）、定住者（long_term_resident）。',
    '',
    '【输出格式（最重要）】',
    '- 你的回答必须是且只能是一个 JSON object。',
    '- 不要任何前导文字、不要任何解释、不要 markdown 代码块、不要尾部说明。',
    '- 第一个字符必须是 {，最后一个字符必须是 }。',
    '- 不允许多个 JSON object，不允许换行解释，不允许在 JSON 外加注释。',
    '- 字符串内部不要使用未转义的换行；多行内容请用 \\n。',
    '- 一旦你不能严格满足上述格式，就改用 answer_mode = clarification_needed 输出最简结构。',
    '',
    '硬规则（违反任意一条都视为严重错误）：',
    '1. 不要保证签证一定通过 / 一定不通过。',
    '2. 资料不足或事实模糊时，answer_mode 必须是 clarification_needed 或 answer_with_assumptions，绝对不能是 direct_answer。',
    '3. 家族滞在转工作签 ≠ 资格外活动 28 小时；这是「在留資格変更」类问题。',
    '4. 配偶签离婚后转定住 ≠ 换工作 14 日届出 ≠ 经营管理常勤职员；这是个案稳定性 + 在留路径问题。',
    '5. 经管转人文 ≠ 人文转经管，方向不能反转；current_status 和 target_status 必须严格按用户陈述。',
    '6. 信息不足时，给「初步方向 + 关键缺失信息」，不要硬下结论。',
    '7. 如果问题超出五类在留范围，answer_mode 必须是 out_of_scope。',
    '8. 回答语言用中文，必要日本术语保留日文（如 在留カード、住民税、年金事務所、出入国在留管理庁）。',
    '9. 不要把 A 路径答成 B 路径。问的是 long_term_resident（定住者）就不要给 business_manager（経営管理）的答案。',
    '',
    '输出 JSON 必须包含全部字段：',
    'engine_version (固定 "llm-answer-v0"), answer_mode, domain, understood_question, short_answer,',
    'assumptions[], key_missing_info[]{field,question,why_it_matters}, next_actions[]{title,detail,urgency},',
    'materials[], deadline, where_to_go, risks[], expert_checkpoints[], source_notes[], copy_text,',
    'confidence (high|medium|low), source_article_ids[]。',
    '',
    'answer_mode 含义：',
    '- direct_answer：用户问题清楚，且参考资料里有明确路径。',
    '- answer_with_assumptions：先给方向但需要列出 assumptions 和 key_missing_info。',
    '- clarification_needed：不澄清就容易答错。next_actions、materials、deadline、where_to_go 都留空数组或空字符串，重点放在 key_missing_info。',
    '- out_of_scope：超出五类在留主线。说明当前支持范围，引导补充身份和事项；其他字段除 short_answer 外尽量留空数组。',
    '',
    'copy_text：用第一人称中文，不超过 200 字，是给用户复制走的总结，不要出现"客户"二字，不要承诺结果。',
  ].join('\n')
}

function buildUserPayload(input: GenerateLlmAnswerInput): string {
  const intent = input.intent
  const legacy = input.legacyAnswer

  return [
    '=== 用户问题 ===',
    input.questionText,
    '',
    '=== 用户已选身份 ===',
    input.visaType ?? '未选择',
    '',
    '=== 解析意图（规则引擎 + 可选 LLM 共识） ===',
    JSON.stringify({
      intent_type: intent.intent_type,
      domain: intent.domain,
      subject: intent.subject,
      current_status: intent.current_status,
      target_status: intent.target_status,
      extracted_entities: intent.extracted_entities,
      preferred_template: intent.preferred_template,
      confidence: intent.confidence,
      should_answer: intent.should_answer,
      understood_as: intent.understood_as,
    }, null, 2),
    '',
    '=== 候选 / 旧管道 整理 ===',
    [
      `legacy_answer_type: ${legacy.answer_type}`,
      `legacy_review_status: ${legacy.review_status}`,
      `legacy_title: ${legacy.title}`,
      legacy.first_screen_answer ? `legacy_first_screen: ${legacy.first_screen_answer}` : '',
      legacy.action_answer
        ? `legacy_action_conclusion: ${legacy.action_answer.conclusion}`
        : '',
      `legacy_summary: ${legacy.summary}`,
      legacy.next_steps?.length ? `legacy_next_steps: ${legacy.next_steps.slice(0, 6).join(' / ')}` : '',
    ].filter(Boolean).join('\n'),
    '',
    input.candidateSeed
      ? [
        '=== 命中 seed ===',
        `slug: ${input.candidateSeed.slug}`,
        `title: ${input.candidateSeed.title}`,
        `summary: ${input.candidateSeed.summary}`,
      ].join('\n')
      : '=== 命中 seed === 无',
    '',
    '=== 红线提醒 ===',
    (input.redlines && input.redlines.length > 0
      ? input.redlines.map(r => `- ${r}`).join('\n')
      : '- 注意经管/人文方向不能反转\n- 注意家族滞在打工 vs 家族滞在转工作签 是两种不同问题\n- 注意配偶签离婚转定住 不是换工作 14 日届出 也不是经营管理常勤职员'),
    '',
    '=== 当前支持范围 ===',
    SUPPORTED_DOMAIN_SUMMARY,
    `本次系统判定 domain：${input.scope.domain}（in_scope=${input.scope.in_scope}）`,
    '',
    '现在请输出严格 JSON：第一个字符 {，最后一个字符 }，无任何额外文字。',
  ].join('\n')
}

export function coerceEnvelope(value: Record<string, unknown>, scope: ScopeResult): LlmAnswerEnvelope | null {
  const answerMode = enumValue(value.answer_mode, ANSWER_MODES, null)
  if (!answerMode) return null
  const domain = enumValue(value.domain, DOMAINS, scope.domain)

  return {
    engine_version: 'llm-answer-v0',
    answer_mode: answerMode,
    domain,
    understood_question: stringValue(value.understood_question) ?? '',
    short_answer: stringValue(value.short_answer) ?? '',
    assumptions: stringArray(value.assumptions),
    key_missing_info: keyMissingInfoArray(value.key_missing_info),
    next_actions: nextActionArray(value.next_actions),
    materials: stringArray(value.materials),
    deadline: stringValue(value.deadline) ?? '',
    where_to_go: stringValue(value.where_to_go) ?? '',
    risks: stringArray(value.risks),
    expert_checkpoints: stringArray(value.expert_checkpoints),
    source_notes: stringArray(value.source_notes),
    copy_text: stringValue(value.copy_text) ?? '',
    confidence: enumValue(value.confidence, CONFIDENCES, 'low'),
    source_article_ids: stringArray(value.source_article_ids),
  }
}

// JSON extraction with three layers of tolerance:
//   1. Strip surrounding markdown / fenced code blocks (```json ... ```).
//   2. Trim leading/trailing prose down to the first `{` / last `}`.
//   3. Walk the string and return the first balanced top-level object.
// This handles the most common Claude-on-Bedrock JSON-in-prose failures.
export function extractJson(text: string): string | null {
  let body = text.trim()
  if (!body) return null

  // Strip ```json ... ``` or ``` ... ``` fences.
  body = body
    .replace(/^```(?:json|JSON)?\s*\n/, '')
    .replace(/\n```\s*$/, '')
    .trim()

  // Try a greedy slice between first `{` and last `}` first — fastest path.
  const firstBrace = body.indexOf('{')
  const lastBrace = body.lastIndexOf('}')
  if (firstBrace < 0 || lastBrace <= firstBrace) return null

  const greedy = body.slice(firstBrace, lastBrace + 1)
  if (isParseable(greedy)) return greedy

  // Greedy didn't parse — walk the string and return the first balanced
  // top-level object. Skips braces inside string literals.
  const balanced = firstBalancedObject(body, firstBrace)
  return balanced ?? greedy // fall back to greedy so the caller's parse error reports a clearer position
}

function isParseable(text: string): boolean {
  try {
    JSON.parse(text)
    return true
  } catch {
    return false
  }
}

function firstBalancedObject(body: string, startIndex: number): string | null {
  let depth = 0
  let inString = false
  let escape = false
  for (let i = startIndex; i < body.length; i += 1) {
    const ch = body[i]
    if (escape) {
      escape = false
      continue
    }
    if (ch === '\\') {
      escape = true
      continue
    }
    if (ch === '"') {
      inString = !inString
      continue
    }
    if (inString) continue
    if (ch === '{') depth += 1
    else if (ch === '}') {
      depth -= 1
      if (depth === 0) return body.slice(startIndex, i + 1)
    }
  }
  return null
}

function stringValue(value: unknown, max = 600): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  if (!trimmed) return undefined
  return trimmed.slice(0, max)
}

function stringArray(value: unknown, max = 8): string[] {
  if (!Array.isArray(value)) return []
  return value
    .map(item => typeof item === 'string' ? item.trim() : '')
    .filter(Boolean)
    .slice(0, max)
}

function keyMissingInfoArray(value: unknown): KeyMissingInfo[] {
  if (!Array.isArray(value)) return []
  return value
    .map(item => {
      if (!item || typeof item !== 'object') return null
      const row = item as Record<string, unknown>
      const field = stringValue(row.field, 80)
      const question = stringValue(row.question, 200)
      if (!field && !question) return null
      return {
        field: field ?? '',
        question: question ?? '',
        why_it_matters: stringValue(row.why_it_matters, 240) ?? '',
      }
    })
    .filter((row): row is KeyMissingInfo => row !== null)
    .slice(0, 6)
}

function nextActionArray(value: unknown): NextAction[] {
  if (!Array.isArray(value)) return []
  return value
    .map(item => {
      if (!item || typeof item !== 'object') return null
      const row = item as Record<string, unknown>
      const title = stringValue(row.title, 80)
      if (!title) return null
      return {
        title,
        detail: stringValue(row.detail, 320) ?? '',
        urgency: enumValue(row.urgency, URGENCIES, 'soon'),
      }
    })
    .filter((row): row is NextAction => row !== null)
    .slice(0, 6)
}

function enumValue<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number]): T[number]
function enumValue<T extends readonly string[]>(value: unknown, allowed: T, fallback: null): T[number] | null
function enumValue<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number] | null): T[number] | null {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
    ? value as T[number]
    : fallback
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
