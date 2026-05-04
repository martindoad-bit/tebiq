// Preview stage feedback state machine (Issue #27 / Workstream B Phase 1).
//
// Non-streaming. The page submits to the existing POST /api/questions
// route, which can take up to ~25s. Without intermediate feedback the
// reviewer stares at a blank page. This module provides:
//
//   1. A typed state enum + display copy
//   2. A small `classifySubmitOutcome(result)` that maps the API
//      response into a terminal state (`final_answer` | `fallback` |
//      `clarification_needed` | `human_review_required` | `error`)
//   3. A 25s timeout helper
//
// The setTimeout-based progression `received → routing → risk_check →
// generating` lives in the React component itself (timer state is UI
// concern, not domain logic). This module is the testable part.

import { REGRESSION_SET } from './sample-classifier'

export type PreviewStage =
  | 'idle'
  | 'received'
  | 'routing'
  | 'risk_check'
  | 'generating'
  | 'final_answer'
  | 'fallback'
  | 'clarification_needed'
  | 'human_review_required'
  | 'error'

export const STAGE_COPY: Record<PreviewStage, string> = {
  idle: '',
  received: '已收到你的问题。',
  routing: '正在确认这个问题属于哪类在留事项。',
  risk_check: '正在检查是否涉及期限、身份变化或工作资格风险。',
  generating: '正在生成回答。',
  clarification_needed: '还需要确认一个关键信息，才能判断下一步。',
  human_review_required: '这类情况不建议只靠自动回答判断，需要人工确认。',
  fallback: '当前模型响应不完整，这条回答不能作为正式判断。',
  error: '当前回答生成失败，可以稍后重试，或先保存事项继续处理。',
  final_answer: '回答已就绪，正在打开回答页…',
}

/** Per Work Packet §B1 timing: received(0) → routing(500) → risk_check(1000). */
export const STAGE_TIMING = {
  routing_delay_ms: 500,
  risk_check_delay_ms: 500,
  /** §B2 timeout — 25s without API response → 'error'. */
  api_timeout_ms: 25_000,
} as const

/** Submitted question — minimum fields the classifier reads. */
export interface SubmitInput {
  question_text: string
  starter_tag?: string | null
}

/** What POST /api/questions can return (we only read what we need). */
export interface SubmitResult {
  ok: boolean
  /** answer_drafts.id when persisted, null in clarification flow. */
  answer_id?: string | null
  /** Pipeline status if surfaced. */
  status?: 'direct_answer' | 'preliminary' | 'clarification_needed' | 'out_of_scope' | string | null
  /** Set when DeepSeek-LLM fell back internally (llm_timeout, llm_parse, etc). */
  fallback_reason?: string | null
  /** Inline payload from the route (used when answer_id missing). */
  action_answer?: { conclusion?: string; what_to_do?: string[] } | null
  /** Error info if !ok. */
  error?: { code?: string; message?: string } | string | null
}

/**
 * Decide the terminal stage from a /api/questions response + the
 * starter_tag (if known — used to escalate REGRESSION_SET items to
 * human_review_required even on otherwise-successful returns).
 *
 * Precedence (top wins):
 *   1. Network/timeout error                   → 'error'
 *   2. !ok                                     → 'error'
 *   3. status === 'out_of_scope'               → 'human_review_required'
 *   4. starter in REGRESSION_SET               → 'human_review_required'
 *      (B4: high-risk题不裸流, force human review path)
 *   5. fallback_reason set (e.g. llm_timeout)  → 'fallback'
 *   6. status === 'clarification_needed'       → 'clarification_needed'
 *   7. otherwise                               → 'final_answer'
 */
export function classifySubmitOutcome(
  result: SubmitResult | null,
  input: SubmitInput,
): PreviewStage {
  if (!result) return 'error'
  if (!result.ok) return 'error'
  if (result.status === 'out_of_scope') return 'human_review_required'
  if (input.starter_tag && REGRESSION_SET.has(input.starter_tag)) {
    return 'human_review_required'
  }
  if (result.fallback_reason) return 'fallback'
  if (result.status === 'clarification_needed') return 'clarification_needed'
  return 'final_answer'
}

/** Wrap a promise with a timeout that rejects after `ms`. */
export function withSubmitTimeout<T>(p: Promise<T>, ms: number = STAGE_TIMING.api_timeout_ms): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new SubmitTimeoutError()), ms)
    p.then(
      v => { clearTimeout(t); resolve(v) },
      err => { clearTimeout(t); reject(err) },
    )
  })
}

export class SubmitTimeoutError extends Error {
  constructor() {
    super('preview_submit_timeout')
    this.name = 'SubmitTimeoutError'
  }
}

/** Tone hint per stage — used by the UI badge / banner. */
export type StageTone = 'neutral' | 'progress' | 'success' | 'warning' | 'danger'

export const STAGE_TONE: Record<PreviewStage, StageTone> = {
  idle: 'neutral',
  received: 'progress',
  routing: 'progress',
  risk_check: 'progress',
  generating: 'progress',
  clarification_needed: 'warning',
  human_review_required: 'warning',
  fallback: 'warning',
  error: 'danger',
  final_answer: 'success',
}
