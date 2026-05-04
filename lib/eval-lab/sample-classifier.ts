// Eval Lab — sample classification (v0.3).
//
// Source of truth for the taxonomy: docs/eval/EVAL_ROUND1_SAMPLE_PACK.md
// "样本分级定义 v0.3". This module is the canonical front-end implementation
// of that classifier — used by the Internal Console (/internal/eval-console)
// to render per-question sample class and roll up stats.
//
// We classify a (TEBIQ answer, DeepSeek answer, starter_tag) tuple into one
// of seven buckets. The classifier is deliberately pure / sync / cheap — it
// reads only the fields we already have on the eval_answers row, so the
// console can re-classify on every render without an extra fetch.
//
// IMPORTANT: not all sample classes from the pack are computable from
// answer rows alone. `TEBIQ_OUT_OF_SCOPE_CORRECT` requires DOMAIN
// confirmation and is NOT produced by this classifier — that promotion
// happens in a downstream review step.

/**
 * Routing regression set (v0.3): the seven starter_tags currently known
 * to be mis-routed as `out_of_scope` despite being in-scope. Updated by
 * product owner / GM in coordination with `EVAL_ROUTING_SAFETY_GATE_PACK`.
 *
 * Until R01-R05 land, anything in this set that hits `out_of_scope` is a
 * routing FAILURE, not a legitimate OOS. Excluded from FULL_COMPARABLE
 * and from formal DOMAIN annotation per product owner gate.
 */
export const REGRESSION_SET: ReadonlySet<string> = new Set([
  'eval-lab-v1-J03',
  'eval-lab-v1-J04',
  'eval-lab-v1-J08',
  'eval-lab-v1-I08',
  'eval-lab-v1-D05',
  'eval-lab-v1-D06',
  'eval-lab-v1-D09',
])

export type SampleClass =
  | 'FULL_COMPARABLE'
  | 'TEBIQ_FALLBACK'
  | 'TEBIQ_ROUTING_FAILURE'
  | 'TEBIQ_OOS'
  | 'DS_FAILED'
  | 'INVALID'
  | 'NONE'

/** The minimal eval_answers shape this classifier reads. */
export interface AnswerForClassifier {
  answer_text: string | null
  error: string | null
  status: string | null
  fallback_reason: string | null
}

/**
 * Classify a (tebiq_current, deepseek_raw, starter_tag) tuple.
 *
 * Precedence (top wins, matches v0.3 sample-pack table):
 *
 *  1. tebiq missing                                → NONE
 *  2. tebiq.error or no answer_text                → INVALID
 *  3. tebiq.fallback_reason === 'llm_timeout'      → TEBIQ_FALLBACK
 *  4. tebiq.status === 'out_of_scope'              → TEBIQ_ROUTING_FAILURE if
 *                                                    starter_tag in regression
 *                                                    set, else TEBIQ_OOS
 *  5. ds missing / errored / no answer_text        → DS_FAILED
 *  6. otherwise                                    → FULL_COMPARABLE
 */
export function classifySample(
  tebiq: AnswerForClassifier | null | undefined,
  ds: AnswerForClassifier | null | undefined,
  starterTag: string | null | undefined,
): SampleClass {
  if (!tebiq) return 'NONE'
  if (tebiq.error || !tebiq.answer_text) return 'INVALID'
  if (tebiq.fallback_reason === 'llm_timeout') return 'TEBIQ_FALLBACK'
  if (tebiq.status === 'out_of_scope') {
    return starterTag && REGRESSION_SET.has(starterTag)
      ? 'TEBIQ_ROUTING_FAILURE'
      : 'TEBIQ_OOS'
  }
  if (!ds || ds.error || !ds.answer_text) return 'DS_FAILED'
  return 'FULL_COMPARABLE'
}

/** Whether a sample class is eligible for formal DOMAIN annotation. */
export function isAnnotationEligible(c: SampleClass): boolean {
  return c === 'FULL_COMPARABLE'
}

/** Human-readable Chinese label for a sample class. */
export const SAMPLE_CLASS_LABEL: Record<SampleClass, string> = {
  FULL_COMPARABLE: 'FULL',
  TEBIQ_FALLBACK: 'FALLBACK',
  TEBIQ_ROUTING_FAILURE: 'ROUTING',
  TEBIQ_OOS: 'OOS',
  DS_FAILED: 'DS_FAIL',
  INVALID: 'INVALID',
  NONE: 'NONE',
}

/** Tailwind class hint for a sample class — used by the console badge. */
export const SAMPLE_CLASS_TONE: Record<
  SampleClass,
  'green' | 'orange' | 'red' | 'amber' | 'yellow' | 'slate' | 'rose'
> = {
  FULL_COMPARABLE: 'green',
  TEBIQ_FALLBACK: 'orange',
  TEBIQ_ROUTING_FAILURE: 'red',
  TEBIQ_OOS: 'amber',
  DS_FAILED: 'yellow',
  INVALID: 'rose',
  NONE: 'slate',
}
