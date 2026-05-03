// TEBIQ DeepSeek V4 Pro — prompt contract.
//
// This file is the canonical prompt for the LLM AnswerSource. It is
// intentionally heavy on inline rules so that any change goes through
// review (the prompt and its caller live next to each other).
//
// Every constant here is referenced by `llm-deepseek-provider.ts`.
// Do NOT inline these values into the provider — keep one source of
// truth.

import type { DetectedIntent, SupportedDomain } from './types'
import type { AnswerSource } from './types'

// ---------------------------------------------------------------- Config

export const DEEPSEEK_MODEL_ID = 'deepseek-v4-pro'
export const DEEPSEEK_TEMPERATURE = 0
export const DEEPSEEK_MAX_TOKENS = 1500
export const DEEPSEEK_TIMEOUT_MS = 18_000
// DeepSeek's chat completions endpoint. The provider wraps this with
// `Authorization: Bearer ${DEEPSEEK_API_KEY}`.
export const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'

// JSON mode is required — we cannot accept free-text from DeepSeek.
export const DEEPSEEK_RESPONSE_FORMAT = { type: 'json_object' as const }

// Closed-set values the response is checked against. Any value outside
// these sets fails validation and we fall through to legacy_seed.
export const DEEPSEEK_STATUS_VALUES = ['answered', 'preliminary', 'clarification_needed', 'out_of_scope'] as const
export const DEEPSEEK_DOMAIN_VALUES: readonly SupportedDomain[] = [
  'gijinkoku',
  'business_manager',
  'family_stay',
  'permanent_resident',
  'long_term_resident',
  'admin_general',
  'unknown',
]
export const DEEPSEEK_CONFIDENCE_VALUES = ['high', 'medium', 'low'] as const

export type DeepseekStatus = typeof DEEPSEEK_STATUS_VALUES[number]
export type DeepseekConfidence = typeof DEEPSEEK_CONFIDENCE_VALUES[number]

// ---------------------------------------------------------------- System prompt

// Edited only via review. This text lands verbatim in the API call.
export const DEEPSEEK_SYSTEM_PROMPT = [
  '你是 TEBIQ 的在留风险助手。TEBIQ 不是 AI 问答，是面向在日外国人的在留风险管理服务。',
  '',
  '【硬规则】',
  '1. 五类在留资格（gijinkoku / business_manager / family_stay / permanent_resident / long_term_resident）以外的在留行政问题（入管 / 区役所 / 年金 / 税务 / 社保 / 公司变更 / 补材料 / 不许可 / 期限）也可以回答 —— domain 用 "admin_general"，status 用 "preliminary" 或 "clarification_needed"，不要用 "answered"（信息不全的情况下不能给确定答案）。',
  '2. 完全无关的话题（如减肥 / 股票 / 旅游攻略） → status="out_of_scope"，domain="unknown"。',
  '3. 信息不足或无法确定 → status="clarification_needed"，不许凭推测下结论，不许保证签证一定通过 / 一定不通过。',
  '4. 不要写「你没问，但要注意」「重要风险提醒」「立即预约专家」「AI 智能分析」「别担心」「我懂你」「我可以帮你」「一键开启专业守护」「严重违规」等营销腔 / 情绪 AI 腔 / 官腔。',
  '5. 不要把内部字段（fallback_reason / safety_gate / domain / unknown / null / undefined / __answer_run_v1__）写进任何输出字段值里。',
  '6. 不要把 X 路径答成 Y 路径。例：',
  '   - 「家族滞在转工作签」是「在留資格変更」，不是「资格外活动 28 小时」。',
  '   - 「配偶离婚转定住」要走「在留資格変更許可申請」，不是「14 日届出」。',
  '   - 「经管转人文」≠「人文转经管」，方向不可反转。',
  '7. 不要 hallucinate 法律事实。手续名 / 期限 / 适用条件不确定时，明确写"不确定"或要求用户补充。',
  '',
  '【输出格式 — 严格 JSON】',
  '- 第一字 {，最后字 }',
  '- 不允许 markdown / 代码块 / 解释性文本',
  '- 必填字段全部存在',
  '- 字段如下：',
  '{',
  '  "status": "answered" | "preliminary" | "clarification_needed" | "out_of_scope",',
  '  "domain": "gijinkoku" | "business_manager" | "family_stay" | "permanent_resident" | "long_term_resident" | "admin_general" | "unknown",',
  '  "answer_paragraph": "1-3 句直接回答用户问的事，事实优先，不要绕，不要解释你在做什么。如果是 clarification_needed，这里写一句简短的处境描述。",',
  '  "true_focus_paragraph": "用「真正容易漏的不是 X，而是 Y」「这件事的关键其实在 Z」「比 X 更要紧的是 Y」类句式自然写一段，揭示用户没问但会影响结果的点。禁止写「你没问但要注意」。如果信息不足无法判定真正重点，留空字符串。",',
  '  "next_steps_paragraph": "现在先做这一步…，给 1-3 件具体动作，不要给 5 件以上。如果是 clarification_needed，留空字符串。",',
  '  "next_steps_bullets": ["动作 1（具体可做）", "动作 2", "动作 3"],',
  '  "documents_needed": ["如有，列具体材料名"],',
  '  "consult_trigger": "什么情况下要找行政書士确认（一句话；或留空字符串）",',
  '  "confidence": "high" | "medium" | "low",',
  '  "boundary_note": "TEBIQ 不判断申请一定通过 / 不通过；紧急期限 / 处分记录 / 公司异常请咨询行政書士等专业人士。"',
  '}',
  '',
  '【Voice 锚点】',
  '你不在教用户，也不在展示自己聪明；你在描述事情真正的样子。冷静、可靠、懂日本规矩、边界清楚。',
  '不卖萌、不装亲切、不像 AI 产品、不像行政书士官网、不像政务宣传。',
].join('\n')

// ---------------------------------------------------------------- User message

export interface BuildUserMessageInput {
  questionText: string
  visaType: string | null
  detectedDomain: SupportedDomain
  detectedIntent: DetectedIntent
  // Optional grounding from a legacy seed match (V1 already runs the
  // legacy seed lookup; if it found something, we pass the title +
  // summary to DeepSeek as candidate grounding).
  candidateSeedSnippet?: string | null
  // Inline redlines specific to the question shape. The provider
  // composes these from the intent + domain to nudge DeepSeek away
  // from known-bad framings (e.g. "经管→人文 不要反转").
  redlines: string[]
}

export function buildUserMessage(input: BuildUserMessageInput): string {
  const lines: string[] = []
  lines.push('=== 用户问题 ===')
  lines.push(input.questionText.trim())
  lines.push('')
  lines.push('=== 已选身份 ===')
  lines.push(input.visaType?.trim() || '未选择')
  lines.push('')
  lines.push('=== TEBIQ 系统检测的 domain ===')
  lines.push(`${input.detectedDomain}（in_scope=${input.detectedDomain !== 'unknown'}）`)
  lines.push('')
  lines.push('=== 解析意图 ===')
  lines.push(JSON.stringify({
    intent_type: input.detectedIntent.intent_type,
    current_status: input.detectedIntent.current_status,
    target_status: input.detectedIntent.target_status,
    confidence: input.detectedIntent.confidence,
    understood_question: input.detectedIntent.understood_question,
  }, null, 2))
  lines.push('')
  if (input.candidateSeedSnippet) {
    lines.push('=== 候选 grounding（V1 legacy_seed 命中） ===')
    lines.push(input.candidateSeedSnippet)
    lines.push('')
  }
  lines.push('=== 红线提醒 ===')
  if (input.redlines.length > 0) {
    for (const r of input.redlines) lines.push(`- ${r}`)
  } else {
    lines.push('- 注意五类在留方向不能反转；家族滞在打工 ≠ 转工作签；配偶离婚转定住 ≠ 14 日届出。')
  }
  lines.push('')
  lines.push('请输出严格 JSON：第一字 {，最后字 }，无任何额外文字。')
  return lines.join('\n')
}

// ---------------------------------------------------------------- Output → AnswerSource

// The DeepSeek output shape (after schema validation). The provider
// converts this into an `AnswerSource` so the projector / safety gate
// don't need any LLM-specific logic.
export interface DeepseekValidatedOutput {
  status: DeepseekStatus
  domain: SupportedDomain
  answer_paragraph: string
  true_focus_paragraph: string
  next_steps_paragraph: string
  next_steps_bullets: string[]
  documents_needed: string[]
  consult_trigger: string
  confidence: DeepseekConfidence
  boundary_note: string
}

// Map DeepSeek output → V1 AnswerSource (kind='llm_primary'). The
// projector treats this identically to a rule-based source.
//
// Layout of the 3 paragraphs in legacy_summary: we concatenate
// `answer_paragraph + true_focus_paragraph + next_steps_paragraph`
// with double-newlines, into one body. The page renderer surfaces
// this as a single text block (no "结论 / 下一步" labels — V1.1
// removes those labels per Voice anchor).
export function deepseekOutputToAnswerSource(out: DeepseekValidatedOutput): AnswerSource {
  const paragraphs = [
    out.answer_paragraph,
    out.true_focus_paragraph,
    out.next_steps_paragraph,
  ].map(s => s.trim()).filter(Boolean)
  const body = paragraphs.join('\n\n')

  // Map status → legacy answer_type / review_status (used by the
  // projector to decide PublicAnswer.status).
  const { answerType, reviewStatus } = mapStatus(out.status)

  return {
    kind: 'llm_primary',
    source_confidence: out.confidence,
    legacy_title: paragraphs[0]?.split(/[。！？!?]/)[0]?.slice(0, 80) || '',
    legacy_summary: body,
    legacy_conclusion: out.next_steps_paragraph?.trim() || out.answer_paragraph.split(/[。！？!?]/)[0] || '',
    legacy_what_to_do: out.next_steps_bullets.slice(0, 5),
    legacy_documents_needed: out.documents_needed.slice(0, 8),
    legacy_expert_handoff: out.consult_trigger ? [out.consult_trigger] : [],
    legacy_review_status: reviewStatus,
    legacy_answer_type: answerType,
  }
}

function mapStatus(status: DeepseekStatus): { answerType: string; reviewStatus: string } {
  switch (status) {
    case 'answered':
      return { answerType: 'matched', reviewStatus: 'reviewed' }
    case 'preliminary':
      return { answerType: 'draft', reviewStatus: 'unreviewed' }
    case 'clarification_needed':
      return { answerType: 'cannot_determine', reviewStatus: 'intent_unclear' }
    case 'out_of_scope':
      return { answerType: 'cannot_determine', reviewStatus: 'intent_unclear' }
  }
}
