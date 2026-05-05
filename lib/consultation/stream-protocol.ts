// 1.0 Alpha — Streaming protocol contract for /api/consultation/stream
// (Issue #39 / Work Packet §3 + §6).
//
// The endpoint emits SSE-style frames the client parses (POST + manual
// frame parsing — POST so the user_question can be 4000 chars, which is
// too long for an EventSource GET URL). Same pattern as
// /api/internal/preview/stream (PR #33).
//
// Events stream lifecycle stages PLUS the actual answer tokens. Token
// chunks ride on `answer_chunk` events; lifecycle markers (started /
// first_token / risk_hint / completed / timeout / failed) bracket them.

export type ConsultationEventName =
  | 'received'           // immediately after server creates the row
  | 'risk_hint'          // 0 or 1 — risk_keyword_hits[] non-empty
  | 'still_generating'   // 25s elapsed without first_token
  | 'first_token'        // first DS token observed
  | 'answer_chunk'       // streaming token chunk
  | 'completed'          // DS stream done; final answer written
  | 'timeout'            // 90-120s real failure
  | 'failed'             // non-timeout error

export type ConsultationEvent =
  | { event: 'received'; ts: number; consultation_id: string }
  | { event: 'risk_hint'; ts: number; risk_keyword_hits: ReadonlyArray<string> }
  | { event: 'still_generating'; ts: number }
  | { event: 'first_token'; ts: number; first_token_latency_ms: number }
  | { event: 'answer_chunk'; ts: number; chunk: string }
  | { event: 'completed'; ts: number; total_latency_ms: number; redactions_count: number }
  | { event: 'timeout'; ts: number; partial_answer_saved: boolean; fallback_text: string }
  | { event: 'failed'; ts: number; detail: string }

export function formatConsultationFrame(event: ConsultationEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`
}

/** Client-side: parse a streamed text buffer into events + remainder. */
export function parseConsultationChunk(
  buffer: string,
): { events: ConsultationEvent[]; remainder: string } {
  const events: ConsultationEvent[] = []
  const parts = buffer.split('\n\n')
  const remainder = parts.pop() ?? ''
  for (const frame of parts) {
    const dataLines: string[] = []
    for (const line of frame.split('\n')) {
      if (line.startsWith('data:')) {
        dataLines.push(line.slice('data:'.length).replace(/^\s/, ''))
      }
    }
    if (dataLines.length === 0) continue
    try {
      const parsed = JSON.parse(dataLines.join('\n')) as ConsultationEvent
      if (parsed && typeof parsed === 'object' && 'event' in parsed) {
        events.push(parsed)
      }
    } catch {
      // Drop malformed; protocol is server-controlled
    }
  }
  return { events, remainder }
}

export function isTerminalConsultationEvent(event: ConsultationEvent): boolean {
  return event.event === 'completed'
    || event.event === 'timeout'
    || event.event === 'failed'
}

// ---- Timing budget (Charter §7 + Pack §3) ----
//
// 0-2s    'received' frame (immediate)
// 25s     'still_generating' frame if no first_token yet — NOT a failure
// 90s     hard cutoff — emit 'timeout' frame with voice canonical fallback
//         (PR #38 buildProviderTimeoutFallback content) and close stream.
//
// Rationale for 90s vs 120s: Charter says 90-120s; we pick 90 to leave
// some headroom under Vercel function maxDuration (we set 120 on the
// route to stay below Pro plan ceiling). Server's 90s timer fires before
// the function hits maxDuration, giving us a clean shutdown.
export const CONSULTATION_TIMING = {
  still_generating_at_ms: 25_000,
  hard_timeout_ms: 90_000,
} as const

/**
 * Voice-canonical fallback text, sourced verbatim from
 * docs/voice/TEBIQ_STATUS_LANGUAGE_TEMPLATES.md STATE: provider_timeout
 * + the [降级回答] marker per VOICE S-07.
 *
 * This is what the streaming route emits as the final 'timeout' event's
 * fallback_text. Mirrors lib/answer/core/projector.ts buildProviderTimeoutFallback
 * (PR #38) but we don't import it here — that builder is for the legacy
 * AnswerRun shape, this is a streaming-frame string.
 */
export const CONSULTATION_TIMEOUT_FALLBACK_TEXT = [
  '[降级回答]',
  '当前模型响应超时，不是你的输入问题。你可以稍后重试；如果已识别出相关事项，也可以先保存继续处理。',
].join(' ')
