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
// History:
//   - V1 (Issue #14): 30s timeout × 3 attempts (interactive)
//   - Stabilization (Issue #14 P1): 25s × 2 attempts (interactive,
//     Vercel Hobby maxDuration=60 fit)
//   - M3-C (Issue #34, this commit): 90s × 1 attempt (batch eval).
//     Per Project Lead Directive v0.3 §3 + Work Packet
//     `docs/ops/WORKSTREAM_M3C_DS_BATCH_PACK.md`, this route serves
//     batch eval ONLY (the user-facing pipeline lives behind
//     `lib/answer/` and `app/api/questions/`, both unchanged).
//
// Why 90s + 1 attempt instead of retry:
//   - Batch eval wants clean latency data; retry skews the distribution.
//   - 90s × 2 = 180s blows past any reasonable Vercel function cap.
//   - If a batch call fails, GM/QA reruns manually via
//     scripts/eval/m3c-phased-run.sh — we don't need automatic retry.
//
// Vercel function maxDuration:
//   - Set to 90s here per Work Packet §3.1.
//   - Hobby plan caps maxDuration at 60s; Pro at 300s. If the deployment
//     environment is Hobby and Vercel rejects the 90s declaration, this
//     route's deploy will fail (fail loud, don't silently truncate).
//     This is a Project Lead / GM call — the spec mandates 90s.
//   - The cap applies per-route. user-facing routes (e.g.
//     /api/questions, /api/internal/eval-lab/tebiq-answer) keep their
//     own maxDuration; this change does not propagate to them.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
// 90s per Work Packet §3.1. See note above.
export const maxDuration = 90

const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const MODEL_ID = 'deepseek-v4-pro'
const PROMPT_VERSION = 'eval-lab-light-v1'
// 90s per attempt × 1 attempt = 90s wall-clock. Internal batch eval
// only — see route header comment for rationale.
const PER_ATTEMPT_TIMEOUT_MS = 90_000
const MAX_ATTEMPTS = 1
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

/**
 * Per Work Packet §3.1: response carries `provider_status` ∈ {healthy,
 * timeout, error} for the DeepSeek diagnostic dashboard / health probe.
 */
type ProviderStatus = 'healthy' | 'timeout' | 'error'

function classifyProviderStatus(errorCode: string | null): ProviderStatus {
  if (errorCode === null) return 'healthy'
  if (errorCode === 'deepseek_timeout') return 'timeout'
  return 'error'
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
    const providerStatus = classifyProviderStatus(null)
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
          rawPayloadJson: {
            attempts: attemptsTried,
            timeout_ms: PER_ATTEMPT_TIMEOUT_MS,
            provider_status: providerStatus,
          },
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
      timeout_ms: PER_ATTEMPT_TIMEOUT_MS,
      provider_status: providerStatus,
      attempts: attemptsTried,
    })
  } catch (err) {
    const code = classifyError(err)
    const latencyMs = Date.now() - startedAt
    const providerStatus = classifyProviderStatus(code)
    await persistError(questionId, code, latencyMs, attemptsTried, providerStatus)
    const status = err instanceof DeepseekHttpError ? 502
      : code === 'deepseek_timeout' ? 504
      : 502
    return NextResponse.json(
      {
        ok: false,
        error: code,
        latency_ms: latencyMs,
        timeout_ms: PER_ATTEMPT_TIMEOUT_MS,
        provider_status: providerStatus,
        attempts: attemptsTried,
      },
      { status },
    )
  }
}

async function persistError(
  questionId: string | null,
  errorCode: string,
  latencyMs: number,
  attempts: number,
  providerStatus: ProviderStatus,
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
      rawPayloadJson: {
        attempts,
        timeout_ms: PER_ATTEMPT_TIMEOUT_MS,
        provider_status: providerStatus,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/deepseek-raw] persistError failed', message)
  }
}
