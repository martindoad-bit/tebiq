import { SurveyAnswer, FormQuestion, ApplicationFormData } from '@/types/session'
import { FORM_QUESTIONS } from '@/lib/config/visa-form-fields'

const REGION = 'ap-northeast-1'
const MODEL_ID = 'anthropic.claude-3-haiku-20240307-v1:0'

async function bedrockInvoke(prompt: string): Promise<string> {
  const accessKey = process.env.AWS_ACCESS_KEY_ID || ''
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY || ''
  const endpoint = `https://bedrock-runtime.${REGION}.amazonaws.com/model/${MODEL_ID}/invoke`

  const body = JSON.stringify({
    anthropic_version: 'bedrock-2023-05-31',
    max_tokens: 500,
    messages: [{ role: 'user', content: prompt }],
  })

  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const timeStr = date.toISOString().replace(/[:-]/g, '').slice(0, 15) + 'Z'
  const bodyHash = await sha256Hex(body)

  const canonicalHeaders = `content-type:application/json\nhost:bedrock-runtime.${REGION}.amazonaws.com\nx-amz-content-sha256:${bodyHash}\nx-amz-date:${timeStr}\n`
  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date'
  const canonicalRequest = ['POST', `/model/${MODEL_ID}/invoke`, '', canonicalHeaders, signedHeaders, bodyHash].join('\n')

  const credentialScope = `${dateStr}/${REGION}/bedrock/aws4_request`
  const stringToSign = ['AWS4-HMAC-SHA256', timeStr, credentialScope, await sha256Hex(canonicalRequest)].join('\n')

  const signingKey = await getSigningKey(secretKey, dateStr, REGION, 'bedrock')
  const signature = await hmacHex(signingKey, stringToSign)

  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-amz-content-sha256': bodyHash,
      'x-amz-date': timeStr,
      Authorization: authorization,
    },
    body,
  })

  const data = await res.json()
  return data.content?.[0]?.text || ''
}

async function sha256Hex(data: string): Promise<string> {
  const buf = new TextEncoder().encode(data)
  const hash = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hmacHex(key: ArrayBuffer, data: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hmacBuf(key: ArrayBuffer | string, data: string): Promise<ArrayBuffer> {
  const keyBuf = typeof key === 'string' ? new TextEncoder().encode(key) : key
  const cryptoKey = await crypto.subtle.importKey('raw', keyBuf, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data))
}

async function getSigningKey(secret: string, date: string, region: string, service: string): Promise<ArrayBuffer> {
  const kDate = await hmacBuf(`AWS4${secret}`, date)
  const kRegion = await hmacBuf(kDate, region)
  const kService = await hmacBuf(kRegion, service)
  return hmacBuf(kService, 'aws4_request')
}

// ─── Kept for backward compatibility ──────────────────────────────────────────

export async function generateSurveyQuestion(
  visaType: string,
  answeredSoFar: SurveyAnswer[],
  nextQuestionHint: string
): Promise<string> {
  const history = answeredSoFar.map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n')
  return bedrockInvoke(`You are a friendly Japanese visa assistant. Ask the following question in simple, warm Japanese.
Visa type: ${visaType}
Previous Q&A:
${history || '(none)'}
Next question to ask: ${nextQuestionHint}
Reply with only the question text, nothing else.`)
}

export async function checkReferralCondition(
  visaType: string,
  answers: SurveyAnswer[],
  referralConditions: string[]
): Promise<{ required: boolean; reason: string }> {
  const answersText = answers.map(a => `${a.question}: ${a.answer}`).join('\n')
  const text = await bedrockInvoke(`Based on these visa application answers, determine if professional help is needed.
Visa: ${visaType}
Answers:
${answersText}
Referral conditions:
${referralConditions.join('\n')}
Reply ONLY with JSON: {"required": true/false, "reason": "brief reason in Japanese or empty string"}`)

  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim())
  } catch {
    return { required: false, reason: '' }
  }
}

// ─── New functions ─────────────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean
  reason?: string
  formattedValue?: string  // Cleaned/formatted value for the Japanese form
  followUp?: string        // Chinese follow-up if answer is invalid
}

/**
 * Validates a user's answer and formats it for the Japanese form.
 * Falls back to accepting the answer if AI call fails (don't block the user).
 */
export async function validateAnswer(
  question: FormQuestion,
  answer: string
): Promise<ValidationResult> {
  // Quick local check: reject obviously empty answers
  if (!answer || !answer.trim()) {
    return {
      valid: false,
      followUp: `请回答这个问题：${question.questionZh}`,
    }
  }

  const prompt = `你是签证材料填写助手。验证用户回答并格式化为日本申请书格式。

问题（中文）：${question.questionZh}
字段类型：${question.type}
${question.options ? `有效选项：${question.options.join('、')}` : ''}
用户回答：${answer}

验证规则：
- date：必须是可识别的日期
- number：必须包含数字（年收入等）
- yn：必须能判断是或否
- select：必须匹配选项之一（同义词可接受，如"男生"→"男"）
- text：不能为空或无意义的内容

格式化规则（formattedValue）：
- 日期 → "YYYY年MM月DD日" 格式（例：1990年05月20日）
- 年收入 → 换算后加円（例："450万" → "4,500,000円"，"45万" → "450,000円"）
- 是/否类 → "はい" 或 "いいえ"
- 未婚/已婚 → "無" 或 "有"
- 男/女 → "男" 或 "女"
- 大学本科 → "大学（学士）"，硕士 → "大学院（修士）"，专科 → "短期大学・専門学校"
- 其他文本 → 保持原样

只用JSON回复，不加任何其他内容：
{
  "valid": true或false,
  "reason": "无效原因（有效则留空字符串）",
  "formattedValue": "格式化后的值",
  "followUp": "中文追问（有效则留空字符串）"
}`

  try {
    const text = await bedrockInvoke(prompt)
    const result = JSON.parse(text.replace(/```json|```/g, '').trim())
    return result
  } catch {
    // AI call failed - pass through to avoid blocking user
    return { valid: true, formattedValue: answer.trim() }
  }
}

/**
 * Assembles ApplicationFormData from raw survey answers.
 * Called once at the end of the survey.
 */
export async function buildFormData(
  answers: SurveyAnswer[],
  visaType: string
): Promise<ApplicationFormData> {
  const questions = FORM_QUESTIONS[visaType] || []
  const formData: Partial<ApplicationFormData> = {}

  for (const answer of answers) {
    const question = questions.find(q => q.id === answer.questionId)
    if (question) {
      // Use formatted value if available, fall back to raw answer
      formData[answer.questionId] = answer.formattedValue || answer.answer
    }
  }

  return formData as ApplicationFormData
}
