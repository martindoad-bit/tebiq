import { createHash } from 'crypto'
import { z } from 'zod'
import type { PhotoRecognitionResult } from './types'
import type { PhotoUserContext } from './user-context'

export const MAX_PHOTO_BYTES = 10 * 1024 * 1024

const DEFAULT_MODEL_ID = 'jp.anthropic.claude-sonnet-4-6'
const DEFAULT_REGION = 'ap-northeast-1'

const GENERAL_ACTIONS = [
  '在期限内打开并阅读完整内容',
  '若有金额,在期限内缴纳',
  '不明白时建议咨询专家',
  '持本通知前往居住地市役所窗口办理(以市役所公式为准)',
  '保留原件备查',
  '若是信封,请打开后再次拍摄获取详细信息',
] as const

type GeneralAction = (typeof GENERAL_ACTIONS)[number]

type BedrockImageMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

type DetectedImage =
  | { kind: 'jpeg'; mediaType: 'image/jpeg' }
  | { kind: 'png'; mediaType: 'image/png' }
  | { kind: 'webp'; mediaType: 'image/webp' }
  | { kind: 'heic'; mediaType: 'image/heic' }
  | { kind: 'heif'; mediaType: 'image/heif' }
  | { kind: 'unknown'; mediaType: 'application/octet-stream' }

const nullableTrimmed = z.preprocess(value => {
  if (value === null || value === undefined) return null
  const text = String(value).trim()
  return text ? text : null
}, z.string().max(120).nullable())

const recognitionSchema = z.object({
  docType: nullableTrimmed,
  issuer: nullableTrimmed,
  isEnvelope: z.boolean(),
  recognitionConfidence: z.enum(['high', 'medium', 'low', 'envelope_only']),
  deadline: z.preprocess(value => {
    if (value === null || value === undefined || value === '') return null
    return String(value).trim()
  }, z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable()),
  amount: nullableTrimmed,
  summary: z.string().trim().min(1).max(260),
  generalActions: z.array(z.string().trim().min(1).max(80)).min(1).max(6),
  isUrgent: z.boolean(),
  needsExpertAdvice: z.boolean(),
})

export class PhotoRecognitionError extends Error {
  constructor(
    public readonly code: 'bad_image' | 'too_large' | 'unsupported_type' | 'service_unavailable',
    message: string,
  ) {
    super(message)
    this.name = 'PhotoRecognitionError'
  }
}

export interface PhotoRecognitionInput {
  bytes: Buffer
  mediaType: string
  filename?: string
  userContext?: PhotoUserContext | null
}

export interface PhotoRecognitionOutput {
  result: PhotoRecognitionResult
  imageHash: string
  modelId: string
  mediaType: BedrockImageMediaType
  userContextInjected: boolean
}

interface PreparedPhotoInput extends PhotoRecognitionInput {
  mediaType: BedrockImageMediaType
}

export function detectImageFormat(bytes: Buffer): DetectedImage {
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xd8) {
    return { kind: 'jpeg', mediaType: 'image/jpeg' }
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return { kind: 'png', mediaType: 'image/png' }
  }
  if (
    bytes.length >= 12 &&
    bytes.subarray(0, 4).toString('ascii') === 'RIFF' &&
    bytes.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    return { kind: 'webp', mediaType: 'image/webp' }
  }
  if (bytes.length >= 12 && bytes.subarray(4, 8).toString('ascii') === 'ftyp') {
    const brand = bytes.subarray(8, 12).toString('ascii').toLowerCase()
    if (brand === 'heic' || brand === 'mif1' || brand === 'msf1') {
      return { kind: 'heic', mediaType: 'image/heic' }
    }
    if (brand === 'heif') return { kind: 'heif', mediaType: 'image/heif' }
  }
  return { kind: 'unknown', mediaType: 'application/octet-stream' }
}

async function convertHeicToJpeg(bytes: Buffer): Promise<Buffer> {
  try {
    const mod = await import('heic-convert')
    const output = await mod.default({
      buffer: bytes,
      format: 'JPEG',
      quality: 0.9,
    })
    return Buffer.from(output)
  } catch {
    throw new PhotoRecognitionError(
      'unsupported_type',
      '图片格式暂时不支持。若是微信里的图片，请尝试导出原图或重新截图后上传。',
    )
  }
}

export async function validatePhotoInput(input: PhotoRecognitionInput): Promise<PreparedPhotoInput> {
  if (!input.bytes.length) {
    throw new PhotoRecognitionError('bad_image', '请上传清晰的文书图片')
  }
  if (input.bytes.byteLength > MAX_PHOTO_BYTES) {
    throw new PhotoRecognitionError('too_large', '图片超过 10MB，请压缩后再上传')
  }

  const detected = detectImageFormat(input.bytes)
  if (detected.kind === 'jpeg' || detected.kind === 'png' || detected.kind === 'webp') {
    return { ...input, mediaType: detected.mediaType }
  }
  if (detected.kind === 'heic' || detected.kind === 'heif') {
    const converted = await convertHeicToJpeg(input.bytes)
    return { ...input, bytes: converted, mediaType: 'image/jpeg' }
  }

  throw new PhotoRecognitionError(
    'unsupported_type',
    '图片格式不支持。很少见的格式或微信转发图片请尝试导出原图后重新上传。',
  )
}

function buildSystemPrompt() {
  return `你是 TEBIQ 的日本生活手续文书识别助手。你只做文书识别和客观整理，不提供行政指导、法律意见或资格判断。

识别范围：日本政府、行政机关、税务、社会保险、年金、入管、市区町村、公共服务、银行、不动产、学校、雇主发出的日本生活相关文书。不要因为文书类型不在常见白名单内就返回无法识别；只要能读到标题、机构、金额、日期或正文，就按客观内容识别。

输出规则：
1. 只输出 JSON，不要 Markdown，不要解释。
2. 字段必须完全符合：docType, issuer, isEnvelope, recognitionConfidence, deadline, amount, summary, generalActions, isUrgent, needsExpertAdvice。
3. docType / issuer / deadline / amount 必须严格基于图片中文字。看不出就填 null。deadline 只在文书内有明确日期时填 YYYY-MM-DD。amount 只抄文书内明确金额，保留原文格式，不换算、不估算。
4. isEnvelope=true 仅用于只看到信封外面、没有正文内容的情况。信封可以识别 issuer/docType，但 recognitionConfidence 必须是 envelope_only，generalActions 必须包含「若是信封,请打开后再次拍摄获取详细信息」。
5. recognitionConfidence：high=标题/机构/正文清楚；medium=主要信息可读但部分不清；low=只能读出少量信息；envelope_only=只拍到信封。
6. summary 用简体中文一句话描述客观事实，例如「这是 X 发出的 Y 文书」。不要评价风险，不要说对用户有什么影响。
7. generalActions 只能从以下列表选择，逐字输出，不要自创：
   - 在期限内打开并阅读完整内容
   - 若有金额,在期限内缴纳
   - 不明白时建议咨询专家
   - 持本通知前往居住地市役所窗口办理(以市役所公式为准)
   - 保留原件备查
   - 若是信封,请打开后再次拍摄获取详细信息
8. isUrgent 只做简单判断：deadline 存在且距离今天 <= 7 天时为 true；其他都是 false。
9. needsExpertAdvice 只做简单分类：涉及法律、税务、签证/在留、行政决定或必须判断个人资格时为 true；日常账单、普通通知可为 false。
10. 严禁输出「对你续签/永住/在留資格的影响」。严禁输出具体金额预测、审查时间预测、办理成败判断。严禁输出「建议你 X 月 X 日做 Y」这类行政指导。
11. 如果图片模糊或不是日本生活相关文书，也仍返回 JSON：docType=null, issuer=null, isEnvelope=false, recognitionConfidence=low, deadline=null, amount=null, summary 说明无法可靠识别，generalActions 选择「保留原件备查」。`
}

function formatUserContext(userContext?: PhotoUserContext | null): string {
  if (!userContext) return ''
  const recentDocs = userContext.recentDocuments
    .map(doc => `${doc.issuer ?? '机构不明'} / ${doc.docType}`)
    .join('；') || '无'
  return `

用户基础上下文（仅用于相关性判断，不能用于行政建议）：
- 在留资格：${userContext.visaType ?? '未填写'}
- 在留期限剩余天数：${userContext.daysToVisaExpiry ?? '未填写'}
- 最近是否做过自查：${userContext.hasRecentQuizResult ? '是' : '否'}
- 过去 6 个月拍过的文书类型：${userContext.recentDocumentTypes.join('、') || '无'}
- 过去 6 个月同类文书线索：${recentDocs}

严格限制：
以下上下文仅用于判断本文书是否与用户相关。
- 如果用户最近 6 个月拍过同机构的同类文书，在 summary 中提示「你之前已收到同机构的类似文书，请检查是否为同一事项的后续」。
- 绝对不能基于用户上下文给出「对你续签/永住/在留資格的影响」判断。
- 绝对不能基于用户上下文输出「你应该 / 你需要 / 建议你」等行政指导。
只做相关性判断，不做行政建议。`
}

function buildUserPrompt(filename?: string, userContext?: PhotoUserContext | null) {
  const name = filename ? `文件名：${filename}\n` : ''
  return `${name}请识别这张图片里的日本生活相关文书，按系统要求返回 JSON。今天按服务器当前日期理解。${formatUserContext(userContext)}`
}

function textFromAnthropicContent(content: unknown): string {
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

function daysUntil(deadline: string | null) {
  if (!deadline) return null
  const target = new Date(`${deadline}T00:00:00+09:00`).getTime()
  if (Number.isNaN(target)) return null
  const now = new Date()
  const todayJst = new Date(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(now) + 'T00:00:00+09:00',
  ).getTime()
  return Math.ceil((target - todayJst) / 86_400_000)
}

function normalizeAction(value: string): GeneralAction | null {
  const normalized = value.trim().replace(/，/g, ',').replace(/（/g, '(').replace(/）/g, ')')
  return GENERAL_ACTIONS.find(action => action === normalized) ?? null
}

function inferExpertAdvice(parsed: z.infer<typeof recognitionSchema>): boolean {
  if (parsed.needsExpertAdvice) return true
  const text = `${parsed.docType ?? ''} ${parsed.issuer ?? ''} ${parsed.summary}`
  return /在留|入管|税|年金|保険|申告|市役所|区役所|行政|法律|許可|更新|永住|資格/.test(text)
}

function relatedContextHints(
  parsed: z.infer<typeof recognitionSchema>,
  userContext?: PhotoUserContext | null,
): string[] {
  if (!userContext || !parsed.docType || !parsed.issuer) return []
  const compact = (value: string) => value.replace(/\s/g, '')
  const docType = compact(parsed.docType)
  const issuer = compact(parsed.issuer)
  const hasSame = userContext.recentDocuments.some(doc => {
    if (!doc.issuer) return false
    return compact(doc.docType) === docType && compact(doc.issuer) === issuer
  })
  return hasSame
    ? ['你之前已收到同机构的类似文书，请检查是否为同一事项的后续']
    : []
}

function normalizeResult(
  parsed: z.infer<typeof recognitionSchema>,
  userContext?: PhotoUserContext | null,
): PhotoRecognitionResult {
  const deadlineRemainingDays = daysUntil(parsed.deadline)
  const actions = parsed.generalActions
    .map(normalizeAction)
    .filter((action): action is GeneralAction => Boolean(action))
  const contextHints = relatedContextHints(parsed, userContext)
  const summary = contextHints.length > 0 && !parsed.summary.includes(contextHints[0])
    ? `${parsed.summary} ${contextHints[0]}。`
    : parsed.summary

  return {
    docType: parsed.docType,
    issuer: parsed.issuer,
    isEnvelope: parsed.isEnvelope,
    recognitionConfidence: parsed.isEnvelope ? 'envelope_only' : parsed.recognitionConfidence,
    deadline: parsed.deadline,
    deadlineRemainingDays,
    amount: parsed.amount,
    summary,
    generalActions: actions.length > 0 ? actions.slice(0, 6) : ['保留原件备查'],
    isUrgent: deadlineRemainingDays !== null && deadlineRemainingDays <= 7,
    needsExpertAdvice: inferExpertAdvice(parsed),
    ...(contextHints.length > 0 ? { contextHints } : {}),
  }
}

function fallbackRecognition(): PhotoRecognitionResult {
  return {
    docType: null,
    issuer: null,
    isEnvelope: false,
    recognitionConfidence: 'low',
    deadline: null,
    deadlineRemainingDays: null,
    amount: null,
    summary: '这张图片里的关键信息暂时无法可靠识别。',
    generalActions: ['保留原件备查'],
    isUrgent: false,
    needsExpertAdvice: false,
  }
}

export function shouldUseFallbackPage(result: PhotoRecognitionResult): boolean {
  return !result.docType && !result.issuer && !result.isEnvelope
}

export async function recognizePhotoDocument(
  rawInput: PhotoRecognitionInput,
): Promise<PhotoRecognitionOutput> {
  const input = await validatePhotoInput(rawInput)
  const imageHash = createHash('sha256').update(input.bytes).digest('hex')

  const awsKey = process.env.AWS_ACCESS_KEY_ID
  const awsSecret = process.env.AWS_SECRET_ACCESS_KEY
  if (!awsKey || !awsSecret) {
    throw new PhotoRecognitionError('service_unavailable', '拍照识别服务暂时不可用，请稍后再试')
  }

  const modelId = process.env.PHOTO_RECOGNITION_MODEL_ID ?? DEFAULT_MODEL_ID
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
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: input.mediaType,
                data: input.bytes.toString('base64'),
              },
            },
            { type: 'text', text: buildUserPrompt(input.filename, input.userContext) },
          ],
        },
      ],
    })

    const text = textFromAnthropicContent(response.content)
    const json = JSON.parse(extractJson(text)) as unknown
    const parsed = recognitionSchema.parse(json)
    return {
      result: normalizeResult(parsed, input.userContext),
      imageHash,
      modelId,
      mediaType: input.mediaType,
      userContextInjected: Boolean(input.userContext),
    }
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof SyntaxError) {
      return {
        result: fallbackRecognition(),
        imageHash,
        modelId,
        mediaType: input.mediaType,
        userContextInjected: Boolean(input.userContext),
      }
    }
    throw new PhotoRecognitionError('service_unavailable', '拍照识别服务暂时不可用，请稍后再试')
  }
}
