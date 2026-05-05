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
//
// Issue #51 (Alpha Polish §2 state mapping): the 'timeout' event now
// carries a `completion_status` field so the client can distinguish
// "true silent provider timeout" (status='timeout' → fallback canonical
// rendering) from "provider streamed some text then we cut at 90s"
// (status='partial' → "回答可能不完整" rendering, NOT [降级回答]).
// `partial_answer_saved` is preserved for backward compat but UI should
// prefer `completion_status` since it's the canonical mapping.

export type ConsultationEventName =
  | 'received'           // immediately after server creates the row
  | 'risk_hint'          // 0 or 1 — risk_keyword_hits[] non-empty
  | 'still_generating'   // 25s elapsed without first_token
  | 'first_token'        // first DS token observed
  | 'answer_chunk'       // streaming token chunk
  | 'completed'          // DS stream done; final answer written
  | 'timeout'            // 90s hard cutoff (carries completion_status to disambiguate partial vs silent)
  | 'failed'             // non-timeout error

/**
 * The 5 DB-level completion statuses. Mirrors `ai_consultation_status`
 * pgEnum in lib/db/schema.ts. Issue #51: 'partial' added so partial-
 * with-answer at 90s is distinguishable from silent-provider timeout.
 *
 * NOTE: 'streaming' never appears in a terminal SSE event — it's the
 * row default while DS is in flight. Only the 4 terminal values
 * (completed / partial / timeout / failed) ever ride on the
 * 'timeout' or 'completed' frame's `completion_status` field.
 */
export type ConsultationCompletionStatus =
  | 'streaming'
  | 'completed'
  | 'partial'
  | 'timeout'
  | 'failed'

export type ConsultationEvent =
  | { event: 'received'; ts: number; consultation_id: string }
  | { event: 'risk_hint'; ts: number; risk_keyword_hits: ReadonlyArray<string> }
  | { event: 'still_generating'; ts: number }
  | { event: 'first_token'; ts: number; first_token_latency_ms: number }
  | { event: 'answer_chunk'; ts: number; chunk: string }
  | { event: 'completed'; ts: number; total_latency_ms: number; redactions_count: number }
  | {
      event: 'timeout';
      ts: number;
      /** True iff completion_status==='partial' (i.e. some answer text already streamed). */
      partial_answer_saved: boolean;
      /** Voice-canonical [降级回答] copy. Client should ONLY render this
       *  text when `completion_status === 'timeout'` (silent provider).
       *  When `completion_status === 'partial'`, client renders the
       *  streamed text + a "回答可能不完整" hint instead. */
      fallback_text: string;
      /** Pack §3.4 (Issue #51): canonical DB status for this terminal
       *  event. 'partial' = some text streamed before 90s cut.
       *  'timeout' = provider truly silent (no token ever arrived). */
      completion_status: 'partial' | 'timeout';
    }
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
