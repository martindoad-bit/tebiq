import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { upsertEvalAnswer } from '@/lib/db/queries/eval-lab'

// POST /api/internal/eval-lab/deepseek-raw
//
// Calls DeepSeek V4 Pro with a deliberately LIGHT prompt — no TEBIQ
// structure, no JSON, no projector, no surface safety. The intent is
// to capture what DeepSeek alone would say to the user, so we can
// compare against TEBIQ's pipelined answer side-by-side and tell
// whether TEBIQ's structure is helping or hurting.
//
// V1: when `question_id` is supplied the result (text or error) is
// upserted into eval_answers (answer_type='deepseek_raw'). The route
// still returns the live response so the UI can render it without
// waiting for a refetch.
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const DEEPSEEK_ENDPOINT = 'https://api.deepseek.com/chat/completions'
const MODEL_ID = 'deepseek-v4-pro'
const PROMPT_VERSION = 'eval-lab-light-v1'
const TIMEOUT_MS = 25_000
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

  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'deepseek_disabled', detail: 'DEEPSEEK_API_KEY not set' }, { status: 503 })
  }

  const startedAt = Date.now()
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
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
      console.warn('[eval-lab/deepseek-raw] HTTP', res.status)
      await persistError(questionId, `deepseek_http_${res.status}`, Date.now() - startedAt)
      return NextResponse.json({ error: 'deepseek_http', status: res.status }, { status: 502 })
    }
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>
    }
    const text = json.choices?.[0]?.message?.content?.trim() ?? ''
    if (!text) {
      await persistError(questionId, 'deepseek_empty', Date.now() - startedAt)
      return NextResponse.json({ error: 'deepseek_empty' }, { status: 502 })
    }
    const latencyMs = Date.now() - startedAt
    if (questionId) {
      try {
        await upsertEvalAnswer({
          questionId,
          answerType: 'deepseek_raw',
          model: MODEL_ID,
          promptVersion: PROMPT_VERSION,
          answerText: text,
          latencyMs,
          error: null,
        })
      } catch (persistErr) {
        const message = persistErr instanceof Error ? persistErr.message : String(persistErr)
        console.warn('[eval-lab/deepseek-raw] persist failed', message)
      }
    }
    return NextResponse.json({
      ok: true,
      text,
      model: MODEL_ID,
      latency_ms: latencyMs,
    })
  } catch (err) {
    const name = (err as { name?: string })?.name
    const isAbort = name === 'AbortError'
    await persistError(
      questionId,
      isAbort ? 'deepseek_timeout' : 'deepseek_exception',
      Date.now() - startedAt,
    )
    return NextResponse.json(
      { error: isAbort ? 'deepseek_timeout' : 'deepseek_exception' },
      { status: 504 },
    )
  } finally {
    clearTimeout(timer)
  }
}

async function persistError(
  questionId: string | null,
  errorCode: string,
  latencyMs: number,
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
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[eval-lab/deepseek-raw] persistError failed', message)
  }
}
