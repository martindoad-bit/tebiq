import { createHash } from 'crypto'
import { z } from 'zod'
import type { PhotoUserContext } from '@/lib/photo/user-context'
import type { TextUnderstandResult } from './types'

const DEFAULT_MODEL_ID = 'jp.anthropic.claude-sonnet-4-6'
const DEFAULT_REGION = 'ap-northeast-1'
const MAX_TEXT_CHARS = 2000
const MAX_CONTEXT_CHARS = 400

const GENERAL_ACTIONS = [
  '保留原文备查',
  '确认文中写明的日期、金额和提交窗口',
  '若有金额,在期限内缴纳',
  '若需要办理,以官方 website 或窗口说明为准',
  '不确定时建议咨询专家',
] as const

type GeneralAction = (typeof GENERAL_ACTIONS)[number]

const nullableTrimmed = z.preprocess(value => {
  if (value === null || value === undefined) return null
  const text = String(value).trim()
  return text ? text : null
}, z.string().max(120).nullable())

const textUnderstandSchema = z.object({
  detectedTopic: nullableTrimmed,
  confidence: z.enum(['high', 'medium', 'low']),
  meaning: z.string().trim().min(1).max(900),
  relevance: z.string().trim().min(1).max(600),
  generalActions: z.array(z.string().trim().min(1).max(80)).min(1).max(5),
  needsExpertAdvice: z.boolean(),
  relatedTags: z.array(z.string().trim().min(1).max(40)).max(8),
})

export class TextUnderstandError extends Error {
  constructor(
    public readonly code: 'bad_text' | 'too_long' | 'service_unavailable',
    message: string,
  ) {
    super(message)
    this.name = 'TextUnderstandError'
  }
}

export interface TextUnderstandInput {
  text: string
  userNote?: string | null
  userContext?: PhotoUserContext | null
}

export interface TextUnderstandOutput {
  result: TextUnderstandResult
  inputHash: string
  modelId: string
  userContextInjected: boolean
}

function cleanInput(text: string, max: number): string {
  return text.replace(/\u0000/g, '').trim().slice(0, max)
}

function validateInput(raw: TextUnderstandInput): Required<Pick<TextUnderstandInput, 'text'>> & TextUnderstandInput {
  const text = cleanInput(raw.text, MAX_TEXT_CHARS + 1)
  if (!text) throw new TextUnderstandError('bad_text', '请先粘贴或输入一段日文')
  if (text.length > MAX_TEXT_CHARS) {
    throw new TextUnderstandError('too_long', '文字最多 2000 字，请删短后再试')
  }
  return {
    ...raw,
    text,
    userNote: raw.userNote ? cleanInput(raw.userNote, MAX_CONTEXT_CHARS) : null,
  }
}

function buildSystemPrompt() {
  return `你是 TEBIQ 的日文生活文本理解助手。你把日本生活相关日文整理成中文，但不提供法律意见、行政指导或资格判断。

输出规则：
1. 只输出 JSON，不要 Markdown，不要解释。
2. 字段必须完全符合：detectedTopic, confidence, meaning, relevance, generalActions, needsExpertAdvice, relatedTags。
3. meaning：用简体中文解释原文意思，可以保留必要日文术语，如 在留カード、市役所、住民税、国民年金。
4. relevance：只说明这段文字与用户上下文的相关性。不能判断「会不会影响续签/永住/在留資格」。
5. generalActions 只能从以下列表选择，逐字输出，不要自创：
   - 保留原文备查
   - 确认文中写明的日期、金额和提交窗口
   - 若有金额,在期限内缴纳
   - 若需要办理,以官方 website 或窗口说明为准
   - 不确定时建议咨询专家
6. needsExpertAdvice 只做保守分类：涉及法律、税务、签证/在留、行政决定或必须判断个人资格时为 true；普通说明、广告、日常通知可为 false。
7. relatedTags 输出 2-6 个中文或日文短标签，用于匹配相关文章。
8. 严禁输出对续签、永住、在留資格影响的判断。严禁金额预测、审查时间预测、办理成败判断。严禁输出「你应该在 X 日做 Y」这类行政指导。
9. 如果原文不是日本生活相关内容，也返回 JSON，说明无法确认与在日手续相关，generalActions 选择「保留原文备查」。`
}

function formatUserContext(userContext?: PhotoUserContext | null, userNote?: string | null): string {
  const profile = userContext
    ? [
        `- 在留资格：${userContext.visaType ?? '未填写'}`,
        `- 在留期限剩余天数：${userContext.daysToVisaExpiry ?? '未填写'}`,
        `- 最近是否做过自查：${userContext.hasRecentQuizResult ? '是' : '否'}`,
        `- 过去 6 个月拍过的文书类型：${userContext.recentDocumentTypes.join('、') || '无'}`,
      ].join('\n')
    : '- 未登录或未填写档案'
  const note = userNote ? `\n用户补充上下文：${userNote}` : ''
  return `用户上下文（仅用于相关性判断，不得用于行政建议）：\n${profile}${note}`
}

function extractText(content: unknown): string {
  if (!Array.isArray(content)) return ''
  return content
    .map(block => {
      if (block && typeof block === 'object' && 'type' in block && block.type === 'text' && 'text' in block) {
        return String(block.text)
      }
      return ''
    })
    .join('\n')
    .trim()
}

function extractJson(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)
  const raw = fenced?.[1] ?? text
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON object in Bedrock response')
  }
  return raw.slice(start, end + 1)
}

function normalizeAction(value: string): GeneralAction | null {
  const normalized = value.trim().replace(/，/g, ',')
  return GENERAL_ACTIONS.find(action => action === normalized) ?? null
}

function normalizeResult(parsed: z.infer<typeof textUnderstandSchema>): TextUnderstandResult {
  const actions = parsed.generalActions
    .map(normalizeAction)
    .filter((action): action is GeneralAction => Boolean(action))
  return {
    detectedTopic: parsed.detectedTopic,
    confidence: parsed.confidence,
    meaning: parsed.meaning,
    relevance: parsed.relevance,
    generalActions: actions.length > 0 ? actions : ['保留原文备查'],
    needsExpertAdvice: parsed.needsExpertAdvice,
    relatedTags: parsed.relatedTags.slice(0, 8),
  }
}

export async function understandJapaneseText(
  rawInput: TextUnderstandInput,
): Promise<TextUnderstandOutput> {
  const input = validateInput(rawInput)
  const inputHash = createHash('sha256')
    .update(input.text)
    .update(input.userNote ?? '')
    .digest('hex')

  const awsKey = process.env.AWS_ACCESS_KEY_ID
  const awsSecret = process.env.AWS_SECRET_ACCESS_KEY
  if (!awsKey || !awsSecret) {
    throw new TextUnderstandError('service_unavailable', '文字理解服务暂时不可用，请稍后再试')
  }

  const modelId =
    process.env.TEXT_UNDERSTAND_MODEL_ID ??
    process.env.PHOTO_RECOGNITION_MODEL_ID ??
    DEFAULT_MODEL_ID
  const AnthropicBedrock = (await import('@anthropic-ai/bedrock-sdk')).default
  const client = new AnthropicBedrock({
    awsAccessKey: awsKey,
    awsSecretKey: awsSecret,
    awsRegion: process.env.AWS_REGION ?? DEFAULT_REGION,
  })

  try {
    const response = await client.messages.create({
      model: modelId,
      max_tokens: 1200,
      temperature: 0,
      system: buildSystemPrompt(),
      messages: [
        {
          role: 'user',
          content: `${formatUserContext(input.userContext, input.userNote)}\n\n需要理解的日文原文：\n${input.text}`,
        },
      ],
    })
    const json = JSON.parse(extractJson(extractText(response.content))) as unknown
    return {
      result: normalizeResult(textUnderstandSchema.parse(json)),
      inputHash,
      modelId,
      userContextInjected: Boolean(input.userContext || input.userNote),
    }
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof SyntaxError) {
      throw new TextUnderstandError('service_unavailable', 'AI 返回格式异常，请稍后再试')
    }
    if (error instanceof TextUnderstandError) throw error
    throw new TextUnderstandError('service_unavailable', '文字理解服务暂时不可用，请稍后再试')
  }
}
