import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { getEvalQuestionById, upsertEvalAnswer } from '@/lib/db/queries/eval-lab'
import { isLikelyTransient, withRetry } from '@/lib/eval-lab/retry'

// POST /api/internal/eval-lab/deepseek-raw
//
// Calls DeepSeek V4 Pro with a deliberately LIGHT prompt — no TEBIQ
// structure, no JSON, no projector, no surface safety. The intent is
// to capture what DeepSeek alone would say to the user, so we can
// compare against TEBIQ's pipelined answer side-by-side and tell
// whether TEBIQ's structure is helping or hurting.
//
// V1 + Issue #14:
//   - timeout 30s per attempt
//   - retry ≤ 3 attempts on transient failures (timeout / network / 5xx),
//     exponential backoff
//   - on terminal failure, persist error row to eval_answers (so the UI
//     can render `failed` status without a separate fetch)
//   - never writes eval_annotations — annotation fields are owned by the
//     reviewer, batch path is answer-only
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// Vercel Hobby cap. Default would be 10s, which is too tight when retry
// budget kicks in (worst-case 3 × 30s + backoff). 60s is the Hobby max
// and matches the existing cron handlers.
export const maxDuration = 60

const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const MODEL_ID = 'deepseek-v4-pro'
const PROMPT_VERSION = 'eval-lab-light-v1'
// 25s per attempt × 2 attempts + ~1s backoff = ~51s, fits inside 60s cap.
const PER_ATTEMPT_TIMEOUT_MS = 25_000
const MAX_ATTEMPTS = 2
const RETRY_BASE_DELAY_MS = 800
const MAX_TOKENS = 800
const TEMPERATURE = 0.2

const LIGHT_SYSTEM_PROMPT = [
  '你是一位熟悉日本在留资格、入管、区役所、年金、税务等行政手续的中文回答助手。',
  '用中文回答。语气克制、清晰、实用。',
  '不要保证签证一定通过 / 一定不通过。',
  '不要承诺结果。需要个案判断时，建议用户找行政書士或对应窗口确认。',
  '回答自然语言，不要用 JSON、不要写 Markdown 代码块。',
].join('\n')

interface ReqBody {
  question?: string
  question_id?: string
}

class DeepseekHttpError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.name = 'DeepseekHttpError'
    this.status = status
  }
}

class DeepseekEmptyError extends Error {
  constructor() {
    super('deepseek_empty')
    this.name = 'DeepseekEmptyError'
  }
}

interface AttemptResult {
  text: string
}

async function callDeepseekOnce(question: string, apiKey: string): Promise<AttemptResult> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), PER_ATTEMPT_TIMEOUT_MS)
  try {
    const res = await fetch(DEEPSEEK_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL_ID,
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: 'system', content: LIGHT_SYSTEM_PROMPT },
          { role: 'user', content: question },
        ],
      }),
      signal: controller.signal,
    })
    if (!res.ok) {
      throw new DeepseekHttpError(res.status, `deepseek_http_${res.status}`)
    }
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const text = json.choices?.[0]?.message?.content?.trim() ?? ''
    if (!text) throw new DeepseekEmptyError()
    return { text }
  } finally {
    clearTimeout(timer)
  }
}

function shouldRetry(err: unknown, _attempt: number): boolean {
  if (err instanceof DeepseekHttpError) {
    // Retry on 5xx and 429; everything else is the model / our request
    // and won't get better by retrying.
    return err.status >= 500 || err.status === 429
  }
  if (err instanceof DeepseekEmptyError) return true
  return isLikelyTransient(err)
}

function classifyError(err: unknown): string {
  if (err instanceof DeepseekHttpError) return `deepseek_http_${err.status}`
  if (err instanceof DeepseekEmptyError) return 'deepseek_empty'
  const name = (err as { name?: string }).name
  if (name === 'AbortError') return 'deepseek_timeout'
  return 'deepseek_exception'
}

export async function POST(req: Request) {
  if (!isEvalLabEnabled()) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  let body: ReqBody
  try {
    body = (await req.json()) as ReqBody
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }
  const question = (body.question ?? '').trim()
  if (!question) {
    return NextResponse.json({ error: 'missing_question' }, { status: 400 })
  }
  if (question.length > 4000) {
    return NextResponse.json({ error: 'question_too_long' }, { status: 400 })
  }
  const questionId = body.question_id?.trim() || null

  // P2.1: when a question_id is supplied, verify it exists BEFORE
  // calling DeepSeek. Otherwise upsertEvalAnswer would FK-fail silently
  // and the route would return ok:true with no persisted row.
  if (questionId) {
    const exists = await getEvalQuestionById(questionId)
    if (!exists) {
      return NextResponse.json(
        { error: 'unknown_question_id', question_id: questionId },
        { status: 400 },
      )
    }
  }

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'deepseek_disabled', detail: 'DEEPSEEK_API_KEY not set' }, { status: 503 })
  }

  const startedAt = Date.now()
  let attemptsTried = 0
  try {
    const result = await withRetry(
      attempt => {
        attemptsTried = attempt
        return callDeepseekOnce(question, apiKey)
      },
      {
        maxAttempts: MAX_ATTEMPTS,
        baseDelayMs: RETRY_BASE_DELAY_MS,
        shouldRetry,
        onRetry: (err, attempt, delayMs) => {
          const code = classifyError(err)
          console.warn(
            `[eval-lab/deepseek-raw] attempt ${attempt} failed (${code}); retrying in ${delayMs}ms`,
          )
        },
      },
    )
    const latencyMs = Date.now() - startedAt
    if (questionId) {
      try {
        await upsertEvalAnswer({
          questionId,
          answerType: 'deepseek_raw',
          model: MODEL_ID,
          promptVersion: PROMPT_VERSION,
          answerText: result.text,
          latencyMs,
          error: null,
          rawPayloadJson: { attempts: attemptsTried },
        })
      } catch (persistErr) {
        const message = persistErr instanceof Error ? persistErr.message : String(persistErr)
        console.warn('[eval-lab/deepseek-raw] persist failed', message)
      }
    }
    return NextResponse.json({
      ok: true,
      text: result.text,
      model: MODEL_ID,
      latency_ms: latencyMs,
      attempts: attemptsTried,
    })
  } catch (err) {
    const code = classifyError(err)
    const latencyMs = Date.now() - startedAt
    await persistError(questionId, code, latencyMs, attemptsTried)
    const status = err instanceof DeepseekHttpError ? 502
      : code === 'deepseek_timeout' ? 504
      : 502
    return NextResponse.json(
      { error: code, attempts: attemptsTried },
      { status },
    )
  }
}

async function persistError(
  questionId: string | null,
  errorCode: string,
  latencyMs: number,
  attempts: number,
): Promise<void> {
  if (!questionId) return
  try {
    await upsertEvalAnswer({
      questionId,
      answerType: 'deepseek_raw',
      model: MODEL_ID,
      promptVersion: PROMPT_VERSION,
      answerText: null,
      error: errorCode,
      latencyMs,
      rawPayloadJson: { attempts },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/deepseek-raw] persistError failed', message)
  }
}
