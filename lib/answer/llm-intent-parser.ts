import type { AnswerIntent, IntentDomain, IntentSubject, IntentType, PreferredTemplate } from './intent-router'

interface LlmIntentParserInput {
  question_text: string
  selected_visa_type?: string | null
}

export interface LlmIntentParserResult {
  normalized_question: string
  user_goal: string
  understood_question?: string
  intent_type: IntentType
  domain: IntentDomain
  subject: IntentSubject
  current_status?: string
  target_status?: string
  key_entities?: string[]
  extracted_entities: AnswerIntent['extracted_entities']
  preferred_template: PreferredTemplate
  confidence: 1 | 2 | 3 | 4
  should_answer: boolean
  clarification_questions: string[]
}

const DEFAULT_MODEL_ID = 'jp.anthropic.claude-sonnet-4-6'
const DEFAULT_REGION = 'ap-northeast-1'
const INTENT_TYPES = ['procedure_flow', 'eligibility_check', 'material_list', 'scenario_sequence', 'risk_assessment', 'misconception', 'document_notice', 'deadline_emergency', 'unknown'] as const
const DOMAINS = ['visa', 'pension', 'tax', 'health_insurance', 'company_registration', 'employment', 'school', 'housing', 'document', 'unknown'] as const
const SUBJECTS = ['individual', 'company', 'employee', 'employer', 'family', 'customer_manager', 'unknown'] as const
const TEMPLATES = ['flow_template', 'eligibility_template', 'material_template', 'sequence_template', 'risk_template', 'misconception_template', 'notice_template', 'deadline_template', 'clarify_template'] as const

export async function parseIntentWithLlm(input: LlmIntentParserInput): Promise<LlmIntentParserResult | null> {
  if (process.env.ANSWER_INTENT_DISABLE_AI === '1' || process.env.LLM_INTENT_DISABLE_AI === '1' || process.env.ANSWER_LLM_ENABLED === '0') return null
  const provider = process.env.ANSWER_LLM_PROVIDER ?? 'bedrock'
  if (provider !== 'bedrock') return null
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) return null

  const AnthropicBedrock = (await import('@anthropic-ai/bedrock-sdk')).default
  const client = new AnthropicBedrock({
    awsAccessKey: process.env.AWS_ACCESS_KEY_ID,
    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION ?? DEFAULT_REGION,
  })

  const response = await client.messages.create({
    model: process.env.ANSWER_LLM_MODEL ?? process.env.ANSWER_INTENT_MODEL_ID ?? process.env.PHOTO_RECOGNITION_MODEL_ID ?? DEFAULT_MODEL_ID,
    max_tokens: 800,
    temperature: 0,
    system: [
      '你是 TEBIQ 的意图解析器，只理解问题，不回答问题。',
      '必须输出严格 JSON，不要 markdown。',
      '重点：如果用户说「我是 A，想转 B」或「从 A 转 B」，current_status 必须是 A，target_status 必须是 B，绝对不能反过来。',
      '如果问题涉及公司休眠 + 年金 / 社保，domain 必须是 pension 或 health_insurance，主目标是个人年金 / 健保义务，不是经营管理续签。',
      '如果问题问「资本金不够怎么办」，user_goal 是补救路径，不是资本金标准金额。',
      'AI 不做法律判断，只分类、抽取实体、选择模板。低置信度时 should_answer=false。',
      'JSON 字段：normalized_question,understood_question,user_goal,intent_type,domain,subject,current_status,target_status,key_entities,extracted_entities,preferred_template,confidence,should_answer,clarification_questions。',
    ].join('\n'),
    messages: [{
      role: 'user',
      content: [
        `用户问题：${input.question_text}`,
        `用户选择身份/签证类型：${input.selected_visa_type ?? '未选择'}`,
      ].join('\n'),
    }],
  })

  const text = response.content
    .map(block => block.type === 'text' ? block.text : '')
    .join('\n')
  const parsed = JSON.parse(extractJson(text)) as Record<string, unknown>
  return coerceLlmIntent(parsed, input.question_text)
}

export function coerceLlmIntent(value: Record<string, unknown>, fallbackQuestion: string): LlmIntentParserResult {
  return {
    normalized_question: stringValue(value.normalized_question) ?? fallbackQuestion.trim().slice(0, 160),
    user_goal: stringValue(value.user_goal) ?? stringValue(value.understood_question) ?? fallbackQuestion.trim().slice(0, 160),
    understood_question: stringValue(value.understood_question),
    intent_type: enumValue(value.intent_type, INTENT_TYPES, 'unknown'),
    domain: enumValue(value.domain, DOMAINS, 'unknown'),
    subject: enumValue(value.subject, SUBJECTS, 'unknown'),
    current_status: stringValue(value.current_status),
    target_status: stringValue(value.target_status),
    key_entities: arrayValue(value.key_entities),
    extracted_entities: recordValue(value.extracted_entities),
    preferred_template: enumValue(value.preferred_template, TEMPLATES, 'clarify_template'),
    confidence: confidenceValue(value.confidence),
    should_answer: typeof value.should_answer === 'boolean' ? value.should_answer : false,
    clarification_questions: arrayValue(value.clarification_questions),
  }
}

function extractJson(text: string): string {
  const trimmed = text.trim()
  const first = trimmed.indexOf('{')
  const last = trimmed.lastIndexOf('}')
  if (first >= 0 && last > first) return trimmed.slice(first, last + 1)
  return trimmed
}

function stringValue(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, 240) : undefined
}

function arrayValue(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map(item => String(item).trim()).filter(Boolean).slice(0, 8)
}

function recordValue(value: unknown): AnswerIntent['extracted_entities'] {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const row = value as Record<string, unknown>
  return {
    current_visa: stringValue(row.current_visa),
    target_visa: stringValue(row.target_visa),
    company_status: stringValue(row.company_status),
    procedure: stringValue(row.procedure),
    document: stringValue(row.document),
    deadline: stringValue(row.deadline),
    location: stringValue(row.location),
  }
}

function confidenceValue(value: unknown): 1 | 2 | 3 | 4 {
  return value === 4 || value === '4'
    ? 4
    : value === 3 || value === '3'
      ? 3
      : value === 2 || value === '2'
        ? 2
        : 1
}

function enumValue<T extends readonly string[]>(value: unknown, allowed: T, fallback: T[number]): T[number] {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value)
    ? value as T[number]
    : fallback
}
