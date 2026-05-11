// 0.6 Sprint Workstream D — follow-up endpoint constants
// (ENGINE Pack 2.3).
//
// All limits + voice strings live here so tests can reference them
// without re-importing the route module.

/**
 * Hard upper bound on the number of follow-up rounds per chain.
 *
 * Pack §4 spec:
 *   - Round 0 = the original question (created via /api/consultation/stream)
 *   - Rounds 1-3 = follow-ups (created via /api/consultation/follow-up)
 *   - The 5th attempt (attempting follow_up_count = 4) is REJECTED
 *     before any LLM call with a follow_up_limit_reached SSE event.
 *
 * MAX_FOLLOW_UP_ROUNDS = 3 means we accept follow_up_count
 * values in {1, 2, 3} and reject {4, 5, …}.
 */
export const MAX_FOLLOW_UP_ROUNDS = 3

/**
 * Voice-canonical message the server emits on the
 * follow_up_limit_reached SSE event. Pack §4 supplies the wording;
 * we ship it verbatim. CODEXUI Workstream D-UI renders the message
 * field directly so the canonical copy is enforced server-side.
 */
export const FOLLOW_UP_LIMIT_MESSAGE =
  '这个问题已经包含多轮补充，建议先停在这里整理材料；如果是另一件事，可以重新开始。'

/**
 * How many distinct viewer cookies one parent_consultation_id can be
 * served. Pack §7 leaves abuse-guard semantics to ENGINE. We require
 * the follow-up viewer cookie to match the parent's viewer cookie
 * (if both are set) so a leaked consultation_id can't be used by an
 * unrelated browser to extend the chain. Set to 0 to disable the
 * check (e.g. test environments without cookies).
 */
export const ENFORCE_VIEWER_MATCH = true

/**
 * Maximum age of a parent consultation that can still accept a
 * follow-up. Per Pack §7 this is one of two abuse-guard knobs;
 * the rationale is that follow-ups should sit on still-fresh
 * context, not revive year-old chains.
 */
export const PARENT_MAX_AGE_HOURS = 24
