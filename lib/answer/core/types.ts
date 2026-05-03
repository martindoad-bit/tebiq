// TEBIQ Answer Core V1 — type system.
//
// One-way data flow:
//
//   raw query
//     -> DetectedIntent (existing intent-router output, normalized)
//     -> SupportedDomain (scope detector)
//     -> AnswerSource (legacy seed lookup OR rule-based OR none)
//     -> PublicAnswer (the SINGLE source of truth for user-visible content)
//     -> SafetyResult (verdict on the PublicAnswer's surface)
//     -> AnswerRun (persisted record)
//     -> AnswerViewModel (page-friendly shape)
//
// `AnswerSource` carries the raw seed match — but its fields are NEVER
// directly user-visible. They flow through the projector first.
//
// `PublicAnswer.visible_text` is a flattened pre-computed string of
// every user-visible field; the safety gate uses it.

import type { AnswerIntent } from '@/lib/answer/intent-router'

// ---------------------------------------------------------------- Domain

export type SupportedDomain =
  | 'gijinkoku'
  | 'business_manager'
  | 'family_stay'
  | 'permanent_resident'
  | 'long_term_resident'
  // V1.1 — broader 在留行政 in-scope. Anything DeepSeek can give a
  // hedged preliminary answer for that isn't one of the 5 visa
  // categories above: 入管 / 区役所 / 年金 / 税务 / 社保 / 住民票 /
  // 公司变更 / 补材料 / 不许可 / 期限 etc. Only `'unknown'` (truly
  // unrelated topics like dieting, stocks, tourism) routes to OOS.
  | 'admin_general'
  | 'unknown'

export const SUPPORTED_DOMAIN_LABELS: Record<SupportedDomain, string> = {
  gijinkoku: '技人国 / 人文签',
  business_manager: '经营管理',
  family_stay: '家族滞在',
  permanent_resident: '永住',
  long_term_resident: '定住者',
  admin_general: '在留行政',
  unknown: '在留资格',
}

// ---------------------------------------------------------------- Intent

// The Answer Core's intent shape is intentionally narrower than the
// legacy AnswerIntent — we only persist the fields V1 actually uses
// for routing. The full AnswerIntent stays available via `legacy_intent`
// for analytics / debug.
export interface DetectedIntent {
  intent_type: AnswerIntent['intent_type']
  current_status: string | null
  target_status: string | null
  confidence: 1 | 2 | 3 | 4
  understood_question: string
  legacy_intent: AnswerIntent
}

// ---------------------------------------------------------------- AnswerSource

// What a provider produces BEFORE projection. Never directly rendered.
export type AnswerSourceKind =
  | 'legacy_seed'    // matched a seed via match-answer.ts
  | 'rule_based'     // matched a hard rule (e.g. 配偶离婚→定住 deterministic)
  | 'llm_primary'    // V1.1 — produced by the DeepSeek provider
  | 'none'           // nothing matched; projector will use clarification

export interface AnswerSource {
  kind: AnswerSourceKind
  // For legacy_seed / rule_based: the raw answer assembled by the
  // legacy provider. The projector reads these fields, runs them
  // through scrubbing, and decides which to surface.
  legacy_title?: string
  legacy_summary?: string
  legacy_conclusion?: string
  legacy_what_to_do?: string[]
  legacy_how_to_do?: string[]
  legacy_where_to_go?: string[]
  legacy_documents_needed?: string[]
  legacy_deadline_or_timing?: string[]
  legacy_consequences?: string[]
  legacy_expert_handoff?: string[]
  legacy_sections?: { heading: string; body: string }[]
  legacy_next_steps?: string[]
  legacy_seed_id?: string | null
  legacy_card_id?: string | null
  legacy_review_status?: string
  legacy_answer_type?: string
  // The provider's own assessment of whether its match is reliable.
  // The projector + safety gate may downgrade further.
  source_confidence: 'high' | 'medium' | 'low'
  // For rule_based, the rule id — useful for telemetry.
  rule_id?: string
  // V1.1 — for `kind === 'none'` produced by a provider that tried but
  // declined, this carries WHY (e.g. 'llm_timeout', 'llm_parse').
  // Internal observability only. NEVER user-visible.
  skip_reason?: FallbackReason
}

// ---------------------------------------------------------------- PublicAnswer

// The single source of truth for user-visible content.
//
// status drives rendering:
//   answered             — full action card visible
//   preliminary          — short answer + assumptions + key questions, no full action template
//   clarification_needed — only clarification questions; action template hidden
//   out_of_scope         — scope explanation + key questions; action template hidden
//
// `visible_text` is computed once at construction time and used by
// the safety gate (and post-hoc audit logs).
export type PublicAnswerStatus =
  | 'answered'
  | 'preliminary'
  | 'clarification_needed'
  | 'out_of_scope'

export interface PublicAnswerSection {
  heading: string
  body: string
}

export interface PublicAnswer {
  status: PublicAnswerStatus
  domain: SupportedDomain
  title: string
  summary: string
  conclusion: string
  sections: PublicAnswerSection[]
  next_steps: string[]
  risk_warnings: string[]
  clarification_questions: string[]
  documents_needed: string[]
  consult_trigger: string | null
  disclaimer: string
  // Pre-flattened concatenation of every user-visible field above,
  // for safety-gate scanning. Set by the projector.
  visible_text: string
}

// ---------------------------------------------------------------- SafetyResult

export interface SafetyHit {
  rule: string
  pattern: string
  in_field: string
  excerpt: string
}

export interface SafetyResult {
  passed: boolean
  // Closed enum names (e.g. "Q5_NO_KEIEI", "NO_UNKNOWN_LITERAL").
  failed_rules: string[]
  hits: SafetyHit[]
  // What the gate did when it failed: replace the PublicAnswer or
  // pass-through with warnings.
  action: 'pass' | 'replaced_with_safe_clarification'
  // Was the gate actually run for this AnswerRun? Pre-V1 legacy rows
  // that get reconstructed via `reconstructLegacyRun` set this to
  // `false` so admin / monitoring can distinguish "passed because we
  // checked" from "passed because we never checked".
  evaluated: boolean
}

// ---------------------------------------------------------------- AnswerRun

// The persisted record of one question → answer cycle.
export type AnswerEngineVersion = 'answer-core-v1' | 'answer-core-v1.1-llm'

// FallbackReason values are INTERNAL — never user-visible. The
// `llm_*` prefix family is added in V1.1 to distinguish DeepSeek
// failure modes from the original V1 fallback reasons. All of these
// must NOT appear in any rendered surface (banned by Voice / Surface
// Safety; also enforced by the Q5 / unknown literals scan).
export type FallbackReason =
  | 'no_source_matched'
  | 'safety_gate_replaced'
  | 'out_of_scope'
  | 'low_confidence'
  // V1.1 DeepSeek failure modes (internal, never user-visible) ↓
  | 'llm_disabled'
  | 'llm_timeout'
  | 'llm_parse'
  | 'llm_validation'
  | 'llm_exception'

export interface AnswerRun {
  engine_version: AnswerEngineVersion
  raw_query: string
  normalized_query: string
  detected_intent: DetectedIntent
  detected_domain: SupportedDomain
  source: AnswerSource
  public_answer: PublicAnswer
  safety_result: SafetyResult
  fallback_reason: FallbackReason | null
  // Link back to the answer_drafts row for backward compat.
  legacy_draft_id: string | null
  created_at: string
}

// ---------------------------------------------------------------- AnswerViewModel

// What the answer page consumes. Extracted from AnswerRun so the page
// has zero direct knowledge of legacy fields.
//
// Observability fields (engine_version / domain / safety / fallback)
// are NOT user-visible by default. The page may surface them in a
// dev-only debug panel, but production rendering must not leak raw
// enum strings to end users.
export interface AnswerViewModel {
  id: string
  question: string
  understood_question: string
  status: PublicAnswerStatus
  status_label: string
  status_class: string
  public: PublicAnswer
  // Observability (dev / admin only) ↓
  engine_version: AnswerEngineVersion
  fallback_reason: FallbackReason | null
  domain: SupportedDomain
  safety: {
    evaluated: boolean
    passed: boolean
    action: 'pass' | 'replaced_with_safe_clarification'
    failed_rules: string[]
  }
}

// ---------------------------------------------------------------- helpers

export const ANSWER_CORE_DISCLAIMER =
  'TEBIQ 提供的是一般手续整理和准备方向，不判断你的申请一定会通过或不通过。如果涉及紧急期限、处分记录、公司异常或个别事实，请咨询行政書士等专业人士。'

export const STATUS_LABELS: Record<PublicAnswerStatus, string> = {
  answered: '已整理',
  preliminary: '初步整理',
  clarification_needed: '需先确认',
  out_of_scope: '暂未支持',
}

export const STATUS_CLASSES: Record<PublicAnswerStatus, string> = {
  answered: 'bg-paper text-ink',
  preliminary: 'bg-[#FFF7E8] text-ink',
  clarification_needed: 'bg-paper text-ink',
  out_of_scope: 'bg-paper text-ink',
}
