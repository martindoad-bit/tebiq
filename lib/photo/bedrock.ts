import { createHash } from 'crypto'
import { z } from 'zod'
import type { PhotoRecognitionResult, Urgency } from './types'

export const MAX_PHOTO_BYTES = 10 * 1024 * 1024

const DEFAULT_MODEL_ID = 'anthropic.claude-sonnet-4-5-20250929-v1:0'
const DEFAULT_REGION = 'ap-northeast-1'

const ACCEPTED_MEDIA_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/heif',
])

const recognitionSchema = z.object({
  docType: z.string().trim().min(1).max(80),
  issuer: z.string().trim().min(1).max(80),
  urgency: z.enum(['critical', 'high', 'normal', 'ignorable']),
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
  deadlineRemainingDays: z.number().int().nullable().optional(),
  amount: z.number().int().nonnegative().nullable(),
  summary: z.string().trim().min(1).max(180),
  actions: z.array(z.string().trim().min(1).max(80)).min(1).max(5),
  consequences: z.string().trim().min(1).max(240),
  detail: z.object({
    sections: z.array(z.object({
      heading: z.string().trim().min(1).max(40),
      body: z.string().trim().min(1).max(260),
      bullets: z.array(z.string().trim().min(1).max(120)).max(5).optional(),
    })).min(1).max(5),
  }),
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
}

export interface PhotoRecognitionOutput {
  result: PhotoRecognitionResult
  imageHash: string
  modelId: string
}

type BedrockImageMediaType = 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp'

function buildSystemPrompt() {
  return `你是 TEBIQ 的日本生活手续文书识别助手。只处理日本生活、税金、年金、入管、保险、银行、不动产相关文书图片。

输出规则：
1. 只输出 JSON，不要 Markdown，不要解释。
2. 字段必须完全符合：docType, issuer, urgency, deadline, deadlineRemainingDays, amount, summary, actions, consequences, detail.sections。
3. 用户母语是中文；UI 操作和说明用简体中文。现实窗口、政府文件、专业概念保留日文原文，例如 在留カード、市役所、住民税、年金、確定申告、入国管理局。
4. 文案克制、具体、信息密度高。不要夸张，不要恐吓，不要使用“看不懂怕出事”一类戏剧化表达。
5. urgency 只能是 critical/high/normal/ignorable：
   - critical：已过期、今天/3天内必须处理、明显会导致滞纳/资格风险。
   - high：30天内有期限或金额需要处理。
   - normal：有信息价值但不紧急。
   - ignorable：广告、通知副本、无需行动。
6. deadline 用 YYYY-MM-DD；看不出具体日期填 null。amount 用日元整数；看不出填 null。
7. actions 写 2-4 条具体下一步，避免泛泛建议。detail.sections 写 2-4 段，适合手机阅读。
8. 如果图片模糊、不是文书或无法可靠识别，也必须返回同一 JSON 结构：docType 写“无法确认的文书”，issuer 写“不明”，urgency 写 normal，并给出重新拍摄/确认来源的行动建议。`
}

function buildUserPrompt(filename?: string) {
  const name = filename ? `文件名：${filename}\n` : ''
  return `${name}请识别这张图片里的日本文书，按系统要求返回 JSON。今天按服务器当前日期理解。`
}

function normalizeMediaType(mediaType: string, filename?: string) {
  const lower = mediaType.toLowerCase().split(';')[0]?.trim()
  if (lower && ACCEPTED_MEDIA_TYPES.has(lower)) return lower

  const ext = filename?.toLowerCase().split('.').pop()
  if (ext === 'jpg' || ext === 'jpeg') return 'image/jpeg'
  if (ext === 'png') return 'image/png'
  if (ext === 'heic') return 'image/heic'
  if (ext === 'heif') return 'image/heif'
  return lower || 'application/octet-stream'
}

export function validatePhotoInput(input: PhotoRecognitionInput): PhotoRecognitionInput {
  if (!input.bytes.length) {
    throw new PhotoRecognitionError('bad_image', '请上传清晰的文书图片')
  }
  if (input.bytes.byteLength > MAX_PHOTO_BYTES) {
    throw new PhotoRecognitionError('too_large', '图片超过 10MB，请压缩后再上传')
  }
  const mediaType = normalizeMediaType(input.mediaType, input.filename)
  if (!ACCEPTED_MEDIA_TYPES.has(mediaType)) {
    throw new PhotoRecognitionError('unsupported_type', '请上传 JPEG、PNG 或 HEIC 图片')
  }
  return { ...input, mediaType }
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

function normalizeResult(parsed: z.infer<typeof recognitionSchema>): PhotoRecognitionResult {
  const deadlineRemainingDays = daysUntil(parsed.deadline)
  return {
    ...parsed,
    urgency: parsed.urgency as Urgency,
    deadlineRemainingDays,
    actions: parsed.actions.slice(0, 5),
    detail: {
      sections: parsed.detail.sections.map(section => ({
        ...section,
        bullets: section.bullets?.length ? section.bullets : undefined,
      })),
    },
  }
}

function fallbackRecognition(): PhotoRecognitionResult {
  return {
    docType: '无法确认的文书',
    issuer: '不明',
    urgency: 'normal',
    deadline: null,
    deadlineRemainingDays: null,
    amount: null,
    summary: '这张图片里的关键信息暂时无法可靠识别。',
    actions: [
      '重新拍摄整页，保持文字清晰且不要裁掉边角',
      '确认是否有背面或第二页需要一起查看',
      '如涉及在留期限或缴费期限，先按纸面日期自行确认',
    ],
    consequences: '识别不清时不建议直接按结果行动，避免漏看期限、金额或提交窗口。',
    detail: {
      sections: [
        {
          heading: '为什么没有识别出来',
          body: '图片可能过暗、反光、文字太小，或不是 TEBIQ 当前支持的日本生活手续文书。',
        },
        {
          heading: '建议怎么拍',
          body: '把整张纸平放在明亮处，尽量让标题、发行机构、日期和金额都进入画面。',
        },
      ],
    },
  }
}

export async function recognizePhotoDocument(
  rawInput: PhotoRecognitionInput,
): Promise<PhotoRecognitionOutput> {
  const input = validatePhotoInput(rawInput)
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
      max_tokens: 1800,
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
                // The Bedrock SDK type list currently omits HEIC/HEIF. Product accepts
                // HEIC uploads and lets the service decide whether that region/model can
                // process it; failures are mapped to the friendly fallback below.
                media_type: input.mediaType as BedrockImageMediaType,
                data: input.bytes.toString('base64'),
              },
            },
            { type: 'text', text: buildUserPrompt(input.filename) },
          ],
        },
      ],
    })

    const text = textFromAnthropicContent(response.content)
    const json = JSON.parse(extractJson(text)) as unknown
    const parsed = recognitionSchema.parse(json)
    return {
      result: normalizeResult(parsed),
      imageHash,
      modelId,
    }
  } catch (error) {
    if (error instanceof z.ZodError || error instanceof SyntaxError) {
      return {
        result: fallbackRecognition(),
        imageHash,
        modelId,
      }
    }
    throw new PhotoRecognitionError('service_unavailable', '拍照识别服务暂时不可用，请稍后再试')
  }
}
