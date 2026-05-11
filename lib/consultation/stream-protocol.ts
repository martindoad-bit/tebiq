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
  | 'routing_status'     // 0.6 ENGINE Pack 1: keyword-bucket label (initial / specific)
  | 'fact_cards_injected' // 0.6 ENGINE Pack 2.2: fact-layer audit announcement
  | 'follow_up_limit_reached' // 0.6 ENGINE Pack 2.3: chain blocked at 4th attempt
  | 'still_generating'   // 25s elapsed without first_token
  | 'first_token'        // first DS token observed
  | 'answer_chunk'       // streaming token chunk
  | 'completed'          // DS stream done; final answer written
  | 'timeout'            // 90s hard cutoff (carries completion_status to disambiguate partial vs silent)
  | 'failed'             // non-timeout error

/**
 * 0.6 Sprint Workstream B (ENGINE Pack 1): two-layer routing-status
 * payload that surfaces "which residency-status bucket is being
 * processed" between `received` and `first_token`.
 *
 *   - level='initial' fires immediately after `received` (within 100ms),
 *     when matchBuckets() returns ANY buckets. status_label is the
 *     shared "已收到，正在整理 …" copy.
 *   - level='specific' fires only if `first_token` hasn't arrived
 *     within 3000ms AND there is a top-1 bucket. status_label is that
 *     bucket's status_label_specific.
 *
 * `buckets` is the full list of matched bucket ids in score order so
 * the UI can render multi-bucket cases (e.g. "经营管理 + 年金").
 * `status_label` is the single line of copy the UI should display.
 */
export type ConsultationRoutingStatusLevel = 'initial' | 'specific'

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

/**
 * 0.6 Sprint Workstream D (ENGINE Pack 2.3): rolling consultation
 * digest that the follow-up endpoint feeds back to the LLM in lieu of
 * raw chat history. Persisted on `ai_consultations.consultation_summary`
 * after each terminal turn so the next round can read its parent's
 * digest.
 *
 * The summary is intentionally short and structured (not free text) —
 * the digest builder is responsible for keeping each list bounded.
 * Pack §3 invariant: LLM never sees a full multi-turn history.
 */
export interface ConsultationSummary {
  /** What the user is ultimately trying to accomplish — the goal that
   *  spans all rounds, even if individual round questions vary. */
  user_goal: string
  /** Facts the user has volunteered or the answer has confirmed across
   *  prior rounds. The follow-up matcher reads these alongside the
   *  latest user_addition to score fact cards. Keep concise (1-2
   *  short sentences each, max ~6 entries). */
  known_facts: string[]
  /** Pieces of information the answer has flagged as still-needed.
   *  Used to nudge the LLM to keep asking for these when relevant. */
  missing_facts: string[]
  /** The 2-4 most actionable take-aways from the previous round's
   *  answer — what the LLM should treat as already-said so it doesn't
   *  repeat them in this round. */
  last_answer_key_points: string[]
}

/**
 * 0.6 Sprint Workstream C (ENGINE Pack 2.2): per-card audit row that
 * rides on the `fact_cards_injected` SSE event AND is persisted on
 * `ai_consultations.fact_card_audit`. CODEXUI Workstream G consumes
 * the SSE form to render "今日有效事实命中" hints; Learning Console
 * `/c/[id]` reads the DB form to show what cards informed the answer.
 *
 * Shape MUST stay in lockstep with `lib/answer/fact-layer/matcher.ts`
 * `FactCardMatch` shape and the audit jsonb column. Adding fields is
 * safe; removing or renaming requires a coordinated UI change.
 */
export interface ConsultationFactCardAuditEntry {
  fact_id: string
  /** User-facing fact-card title. Older persisted rows may not have it,
   *  so UI parsers should still provide a fallback. */
  title: string
  fact_card_state: string
  risk_level: string
  confidence: string
  source_quality: string
  /** Verbatim source URLs from the card's `official_sources`. */
  official_sources: ReadonlyArray<string>
  /** Field IDs that ENGINE counts as "this card actually contributed
   *  these facts to the prompt". For decision='inject' this is the
   *  card's `direct_fact_fields` list (sync derives them); for
   *  decision='hint_only' / 'drop' this is `[]`. */
  injected_fields: ReadonlyArray<string>
  /** Field IDs the card declared as withheld (`needs_review_flags`).
   *  Always passed through regardless of decision so audit trail is
   *  honest about what was deliberately not asserted. */
  needs_review_flags: ReadonlyArray<string>
  decision: 'inject' | 'hint_only' | 'drop'
}

export type ConsultationEvent =
  | { event: 'received'; ts: number; consultation_id: string }
  | { event: 'risk_hint'; ts: number; risk_keyword_hits: ReadonlyArray<string> }
  | {
      event: 'routing_status';
      ts: number;
      level: ConsultationRoutingStatusLevel;
      /** Matched bucket ids in score-descending order (declaration-order
       *  tiebreak). Empty when no buckets match — but in that case the
       *  server SHOULD NOT emit the event at all, so this should never
       *  be empty in practice. */
      buckets: ReadonlyArray<string>;
      /** UI-ready single-line copy. For level='initial' this is the
       *  shared STATUS_LABEL_INITIAL_DEFAULT; for level='specific' this
       *  is the top-1 bucket's status_label_specific. */
      status_label: string;
    }
  | {
      event: 'fact_cards_injected';
      ts: number;
      /** All matched cards in matcher score order, including hint_only
       *  rows. Empty array is allowed (server may emit anyway when matcher
       *  ran but produced zero usable matches; it tells the UI "we
       *  checked and there's nothing"). */
      items: ReadonlyArray<ConsultationFactCardAuditEntry>;
    }
  | {
      event: 'follow_up_limit_reached';
      ts: number;
      /** Voice-canonical copy the client renders. Populated server-side
       *  so the UI doesn't have to know the limit / wording. */
      message: string;
      /** The number of follow-up rounds the chain has already had. With
       *  the default 3-round cap this is always >= 3 when the event
       *  fires (the original question is round 0; rounds 1/2/3 are the
       *  3 allowed follow-ups; the 4th attempt triggers this event). */
      follow_up_count: number;
    }
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
    || event.event === 'follow_up_limit_reached'
}

// ---- Timing budget (Charter §7 + Pack §3) ----
//
// 0-2s    'received' frame (immediate)
// 25s     'still_generating' frame if no first_token yet — NOT a failure
// 90s     hard cutoff — emit 'timeout' frame with voice canonical fallback
//         (PR #38 buildProviderTimeoutFallback content) and close stream.
//
// Rationale: 0.5 Polish Sprint v0.2 hotfix — original 90s wall-clock
// hard cap aborted productive long answers (PL bug 2026-05-06).
// New design: idle-token detection.
//
// - first_token_hard_ms (90s): if NO first_token by 90s, real timeout
//   (DS likely stuck or dead — preserve original behavior)
// - idle_after_chunk_ms (60s): once chunks are flowing, only timeout
//   if no new chunk for 60s (catches genuine stalls, not productive
//   long answers)
// - wall_clock_cap_ms (270s): ultimate safety. Stays below Vercel
//   function maxDuration=300, leaves clean-shutdown headroom.
//
// Stream route resets the hard timer on every chunk to enforce idle
// detection. See app/api/consultation/stream/route.ts.
export const CONSULTATION_TIMING = {
  still_generating_at_ms: 30_000,
  hard_timeout_ms: 90_000, // pre-first-token cap (legacy name kept; semantics now "first-token deadline")
  idle_after_chunk_ms: 60_000, // post-first-token idle deadline
  wall_clock_cap_ms: 270_000, // ultimate cap below Vercel maxDuration=300
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
  '当前模型响应超时，不是你的输入问题。系统已记录这次咨询；你可以稍后从“我的咨询”查看，或重新生成。',
].join(' ')
