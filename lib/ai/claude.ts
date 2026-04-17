import { SurveyAnswer } from '@/types/session'

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
