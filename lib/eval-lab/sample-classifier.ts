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

/**
 * Workstream A — extended status badges (Issue #26). These are NOT
 * mutually exclusive with the SampleClass; a question can simultaneously
 * be `DS_FAILED` (sample class) and `annotation_blocked` + `p0_candidate`
 * (extended badges). The console renders both.
 */
export type ExtendedBadge =
  | 'p0_candidate'         // risk_level === HIGH
  | 'p1_candidate'         // risk_level === MEDIUM
  | 'domain_review_needed' // handoff !== null and handoff !== 'no'
  | 'annotation_blocked'   // sample class is anything other than FULL_COMPARABLE

export interface BadgeContext {
  sampleClass: SampleClass
  riskLevel?: 'HIGH' | 'MEDIUM' | 'LOW' | null
  handoff?: 'yes' | 'conditional' | 'no' | null
}

/** Compute the set of extended badges for a question row. */
export function extendedBadges(ctx: BadgeContext): ReadonlyArray<ExtendedBadge> {
  const out: ExtendedBadge[] = []
  if (ctx.riskLevel === 'HIGH') out.push('p0_candidate')
  else if (ctx.riskLevel === 'MEDIUM') out.push('p1_candidate')
  if (ctx.handoff === 'yes' || ctx.handoff === 'conditional') {
    out.push('domain_review_needed')
  }
  if (ctx.sampleClass !== 'FULL_COMPARABLE') out.push('annotation_blocked')
  return out
}

/**
 * Human-readable explanation for why a sample is not annotation-eligible.
 * Returns null when the sample IS eligible.
 */
export function annotationBlockReason(c: SampleClass): string | null {
  switch (c) {
    case 'FULL_COMPARABLE': return null
    case 'TEBIQ_FALLBACK': return 'TEBIQ 降级为 fallback（llm_timeout）— LLM 恢复后重跑'
    case 'TEBIQ_ROUTING_FAILURE': return 'Routing 错误（regression set）— 修复后重跑'
    case 'TEBIQ_OOS': return 'TEBIQ 判定为 out_of_scope — 等 DOMAIN 复核或 routing 修复'
    case 'DS_FAILED': return 'DeepSeek 失败 — DS 恢复后补跑'
    case 'INVALID': return 'TEBIQ 生成失败 — 重跑'
    case 'NONE': return '尚未生成 — 触发 TEBIQ + DeepSeek 重跑'
  }
}

/** Human-readable label for an extended badge. */
export const BADGE_LABEL: Record<ExtendedBadge, string> = {
  p0_candidate: 'P0',
  p1_candidate: 'P1',
  domain_review_needed: 'DOMAIN',
  annotation_blocked: 'BLOCKED',
}

/** Human-readable label for a sample class. */
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
