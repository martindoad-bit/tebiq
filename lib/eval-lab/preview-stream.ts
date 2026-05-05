// Preview Phase 2 — SSE event protocol + stream gating (Issue #32 / Workstream C).
//
// This module defines the **contract** for the SSE flow between the
// preview SSE endpoint (POST /api/internal/preview/stream) and the
// preview client. Both sides import from here so the event names,
// payload shapes, and gating decisions stay synchronised.
//
// The stream is INTENTIONALLY system-event-only. Per Work Packet §C3 +
// §"不能做什么":
//   - DeepSeek raw text never appears in any SSE payload
//   - `final_answer_ready` carries ONLY answer_id, not content
//   - REGRESSION_SET 7 题 + DOMAIN risk_level=HIGH force the stream to
//     terminate with `human_review_required` instead of `final_answer_ready`
//
// Phase 2 is non-token-streaming. The events report **pipeline lifecycle
// transitions**, not LLM token deltas. Token streaming (Phase 3, if ever)
// would need a separate gating design.

import { REGRESSION_SET } from './sample-classifier'

/** Every event the SSE endpoint can emit. The order is documented but
 *  not strictly enforced by the type — the client must tolerate
 *  reorderings (e.g. risk_detected before/after routing_done). */
export type PreviewSseEventName =
  | 'question_received'
  | 'routing_started'
  | 'routing_done'
  | 'risk_detected'
  | 'clarification_needed'
  | 'human_review_required'
  | 'generation_started'
  | 'generation_done'
  | 'fallback_triggered'
  | 'provider_timeout'
  | 'final_answer_ready'
  | 'error'

/**
 * Minimal payload shape per event, expressed as a flat discriminated union
 * so empty-payload events compose cleanly with `event` + `ts`.
 *
 * We intentionally do NOT embed answer content, DS raw text, intent
 * reasoning, or pipeline trace fields anywhere here — these stay
 * server-side. The client doesn't need them for stage UI.
 */
export type PreviewSseEvent =
  | { event: 'question_received'; ts: number }
  | { event: 'routing_started'; ts: number }
  | { event: 'routing_done'; ts: number; domain: string | null; risk_level: 'HIGH' | 'MEDIUM' | 'LOW' | null }
  | { event: 'risk_detected'; ts: number; reason: 'regression_set' | 'high_risk_matrix'; risk_level: 'HIGH' | 'MEDIUM' | 'LOW' | null }
  | { event: 'clarification_needed'; ts: number }
  /** Terminal for high-risk and regression set. answer_id may be present
   *  when the pipeline still produced a draft (for "查看(仅供参考)" link).
   *  NEVER carries answer content. */
  | { event: 'human_review_required'; ts: number; reason: 'regression_set' | 'high_risk_matrix' | 'out_of_scope'; answer_id: string | null }
  | { event: 'generation_started'; ts: number }
  | { event: 'generation_done'; ts: number; status: string | null }
  | { event: 'fallback_triggered'; ts: number; fallback_reason: string }
  | { event: 'provider_timeout'; ts: number }
  /** Terminal for low/medium clean responses. ONLY answer_id — no content. */
  | { event: 'final_answer_ready'; ts: number; answer_id: string }
  | { event: 'error'; ts: number; detail: string }

/** Helper alias for picking a specific event variant by name (used internally). */
export type PreviewSseEventOf<K extends PreviewSseEventName> =
  Extract<PreviewSseEvent, { event: K }>

/** Server-side helper: format an event as an SSE frame (`data: …\n\n`). */
export function formatSseFrame(event: PreviewSseEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`
}

/**
 * Stream gating decision (Work Packet §C3).
 *
 *   shouldStreamContent(risk_level, isRegressionSet)
 *     - true   → MEDIUM / LOW / unknown: emit final_answer_ready when ready
 *     - false  → HIGH or REGRESSION_SET: terminate with human_review_required
 *
 * NOTE: this only governs the FINAL terminal event. Earlier lifecycle
 * events (routing/risk/generation) still flow regardless.
 */
export function shouldStreamContent(
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | null | undefined,
  isRegressionSet: boolean,
): boolean {
  if (isRegressionSet) return false
  if (riskLevel === 'HIGH') return false
  return true
}

/** Why a stream was gated to human_review. Used by the endpoint to
 *  pick the `reason` field on the human_review_required event. */
export function gatingReason(
  starterTag: string | null | undefined,
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW' | null | undefined,
): 'regression_set' | 'high_risk_matrix' | null {
  if (starterTag && REGRESSION_SET.has(starterTag)) return 'regression_set'
  if (riskLevel === 'HIGH') return 'high_risk_matrix'
  return null
}

/** SSE Phase 2 default request budget. Mirrors Phase 1's 25s contract. */
export const SSE_TIMING = {
  pipeline_timeout_ms: 25_000,
  /** Max time we'll keep the stream open after generation_done before
   *  giving up and closing — usually generation_done is followed by a
   *  terminal event in the same tick. */
  post_generation_settle_ms: 1_000,
} as const

// ---------- Client SSE frame parser ----------

/**
 * Parse SSE frames out of a streamed text buffer. Returns the events that
 * could be fully decoded, plus the leftover buffer (incomplete frame).
 *
 * SSE frames are separated by `\n\n`. Each frame may have multiple lines;
 * we only care about lines starting with `data: ` (other field types
 * `event:` / `id:` / `retry:` are ignored — our protocol uses `data:`
 * exclusively, with the event name embedded inside the JSON body).
 */
export function parseSseChunk(buffer: string): { events: PreviewSseEvent[]; remainder: string } {
  const events: PreviewSseEvent[] = []
  // Find frame boundaries; keep the last (possibly incomplete) chunk.
  const parts = buffer.split('\n\n')
  const remainder = parts.pop() ?? ''
  for (const frame of parts) {
    const dataLines: string[] = []
    for (const line of frame.split('\n')) {
      if (line.startsWith('data:')) {
        dataLines.push(line.slice('data:'.length).replace(/^\s/, ''))
      }
      // Lines starting with `:` are SSE keep-alive comments — ignored.
    }
    if (dataLines.length === 0) continue
    const json = dataLines.join('\n')
    try {
      const parsed = JSON.parse(json) as PreviewSseEvent
      if (parsed && typeof parsed === 'object' && 'event' in parsed) {
        events.push(parsed)
      }
    } catch {
      // Drop the malformed frame — the protocol is server-controlled, so
      // a bad frame is unexpected; we'd rather skip than crash the stream.
    }
  }
  return { events, remainder }
}

// ---------- Stage mapping (used by client to drive the existing UI) ----------

/**
 * Translate an SSE event into the Phase 1 PreviewStage so the existing
 * StagePanel UI keeps rendering correctly. Non-terminal events update
 * progress; terminal events drive the terminal state.
 *
 * Returns `null` for events that don't map to a stage transition (e.g.
 * `routing_started` is implicit, we already showed `routing` from
 * `question_received` arriving — but we explicitly list each event so
 * future protocol additions surface as type errors).
 */
export type PreviewStage =
  | 'idle' | 'received' | 'routing' | 'risk_check' | 'generating'
  | 'final_answer' | 'fallback' | 'clarification_needed'
  | 'human_review_required' | 'error'

export function eventToStage(event: PreviewSseEvent): PreviewStage | null {
  switch (event.event) {
    case 'question_received': return 'received'
    case 'routing_started':   return 'routing'
    case 'routing_done':      return 'risk_check'
    case 'risk_detected':     return 'risk_check'
    case 'generation_started': return 'generating'
    case 'generation_done':    return 'generating'
    case 'fallback_triggered': return 'fallback'
    case 'clarification_needed': return 'clarification_needed'
    case 'human_review_required': return 'human_review_required'
    case 'provider_timeout':  return 'error'
    case 'final_answer_ready': return 'final_answer'
    case 'error':             return 'error'
  }
}

/** Whether an event marks the stream's terminal state. */
export function isTerminalEvent(event: PreviewSseEvent): boolean {
  switch (event.event) {
    case 'final_answer_ready':
    case 'human_review_required':
    case 'clarification_needed':
    case 'provider_timeout':
    case 'error':
      return true
    default:
      return false
  }
}
