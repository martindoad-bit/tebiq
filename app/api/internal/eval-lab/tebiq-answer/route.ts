import { NextResponse } from 'next/server'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import { submitQuestionForAnswer } from '@/lib/answer/submit-question'
import { upsertEvalAnswer } from '@/lib/db/queries/eval-lab'
import { isLikelyTransient, withRetry } from '@/lib/eval-lab/retry'

// POST /api/internal/eval-lab/tebiq-answer
//
// Calls the production answer pipeline (rule_based → DeepSeek-LLM →
// legacy_seed → safe-clarification, with surface safety) for a given
// question. Returns the resulting answer_id + a flat snapshot of the
// user-visible fields plus internal observability fields
// (engine_version / fallback_reason / status / domain) so the Eval
// Lab can show side-by-side with the DeepSeek raw answer.
//
// V1 + Issue #14:
//   - per-attempt timeout (Promise.race with 30s)
//   - retry ≤ 3 attempts on TRANSIENT errors only (timeout / network).
//     Pipeline-internal failures (validation, intent detection, missing
//     domain) are NOT retried — they won't get better.
//   - never writes eval_annotations
//
// Internal-only. 404 unless EVAL_LAB_ENABLED=1.

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const PER_ATTEMPT_TIMEOUT_MS = 30_000
const MAX_ATTEMPTS = 3
const RETRY_BASE_DELAY_MS = 800

interface ReqBody {
  question?: string
  question_id?: string
  visa_type?: string | null
}

class TebiqTimeoutError extends Error {
  constructor() {
    super('tebiq_timeout')
    this.name = 'TebiqTimeoutError'
  }
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new TebiqTimeoutError()), ms)
    p.then(
      v => {
        clearTimeout(t)
        resolve(v)
      },
      err => {
        clearTimeout(t)
        reject(err)
      },
    )
  })
}

function shouldRetry(err: unknown): boolean {
  if (err instanceof TebiqTimeoutError) return true
  return isLikelyTransient(err)
}

function classifyError(err: unknown): string {
  if (err instanceof TebiqTimeoutError) return 'tebiq_timeout'
  const name = (err as { name?: string }).name
  if (name === 'AbortError') return 'tebiq_timeout'
  return 'tebiq_pipeline_failed'
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

  const startedAt = Date.now()
  let attemptsTried = 0
  try {
    const result = await withRetry(
      attempt => {
        attemptsTried = attempt
        return withTimeout(
          submitQuestionForAnswer({
            questionText: question,
            visaType: body.visa_type ?? null,
            sourcePage: '/internal/eval-lab',
          }),
          PER_ATTEMPT_TIMEOUT_MS,
        )
      },
      {
        maxAttempts: MAX_ATTEMPTS,
        baseDelayMs: RETRY_BASE_DELAY_MS,
        shouldRetry,
        onRetry: (err, attempt, delayMs) => {
          const code = classifyError(err)
          console.warn(
            `[eval-lab/tebiq-answer] attempt ${attempt} failed (${code}); retrying in ${delayMs}ms`,
          )
        },
      },
    )

    const vm = result.viewModel
    const pa = vm.public
    const latencyMs = Date.now() - startedAt
    const answerId = vm.id || result.legacy.answer_id || null
    const answerLink = vm.id ? `/answer/${vm.id}` : null

    const responsePayload = {
      ok: true,
      answer_id: answerId,
      answer_link: answerLink,
      // Internal observability — surfaced ON PURPOSE in this route.
      status: vm.status,
      domain: vm.domain,
      engine_version: vm.engine_version,
      fallback_reason: vm.fallback_reason,
      safety: vm.safety,
      // What the user would see, flattened for the Eval Lab side-by-side.
      title: pa.title,
      summary: pa.summary,
      conclusion: pa.conclusion,
      visible_text: pa.visible_text,
      next_steps: pa.next_steps,
      clarification_questions: pa.clarification_questions,
      documents_needed: pa.documents_needed,
      // The detected_intent rendered on /answer/{id}'s "我理解你的问题是" panel.
      understood_question: vm.understood_question,
      latency_ms: latencyMs,
      attempts: attemptsTried,
    }

    if (questionId) {
      try {
        await upsertEvalAnswer({
          questionId,
          answerType: 'tebiq_current',
          model: vm.engine_version ?? null,
          promptVersion: 'tebiq-pipeline',
          answerText: pa.visible_text ?? null,
          tebiqAnswerId: answerId,
          tebiqAnswerLink: answerLink,
          engineVersion: vm.engine_version ?? null,
          status: vm.status ?? null,
          domain: vm.domain ?? null,
          fallbackReason: vm.fallback_reason ?? null,
          latencyMs,
          error: null,
          rawPayloadJson: {
            title: pa.title ?? null,
            summary: pa.summary ?? null,
            understood_question: vm.understood_question ?? null,
            safety: vm.safety ?? null,
            attempts: attemptsTried,
          },
        })
      } catch (persistErr) {
        const message = persistErr instanceof Error ? persistErr.message : String(persistErr)
        console.warn('[eval-lab/tebiq-answer] persist failed', message)
      }
    }

    return NextResponse.json(responsePayload)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    const code = classifyError(err)
    console.warn(`[eval-lab/tebiq-answer] submit failed (${code})`, message)
    if (questionId) {
      try {
        await upsertEvalAnswer({
          questionId,
          answerType: 'tebiq_current',
          model: null,
          promptVersion: 'tebiq-pipeline',
          answerText: null,
          error: `${code}: ${message.slice(0, 500)}`,
          latencyMs: Date.now() - startedAt,
          rawPayloadJson: { attempts: attemptsTried },
        })
      } catch (persistErr) {
        const persistMsg = persistErr instanceof Error ? persistErr.message : String(persistErr)
        console.warn('[eval-lab/tebiq-answer] persistError failed', persistMsg)
      }
    }
    const status = code === 'tebiq_timeout' ? 504 : 500
    return NextResponse.json(
      { error: code, detail: message, attempts: attemptsTried },
      { status },
    )
  }
}
