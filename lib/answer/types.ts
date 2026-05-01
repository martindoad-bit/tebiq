import type { DecisionAnswerLevel, FeedbackType } from '@/lib/decision/types'

export type AnswerType = 'matched' | 'draft' | 'cannot_determine'
export type AnswerReviewStatus = 'reviewed' | 'unreviewed' | 'needs_expert' | 'rejected' | 'intent_unclear'

// LLM Answer Engine v0 types ---------------------------------------------
export type AnswerMode =
  | 'direct_answer'
  | 'answer_with_assumptions'
  | 'clarification_needed'
  | 'out_of_scope'

export type SupportedDomain =
  | 'gijinkoku'
  | 'business_manager'
  | 'family_stay'
  | 'permanent_resident'
  | 'long_term_resident'
  | 'unknown'

export type EngineVersion =
  | 'llm-answer-v0'
  | 'legacy-fallback'
  | 'out-of-scope-v0'
  | 'safe-fallback-v0-1'

// Why the LLM-generated envelope did not survive (set on the envelope
// when engine_version != 'llm-answer-v0'). Used for observability + Vercel
// log correlation. The set is closed; new reasons should be added here.
export type FallbackReason =
  | 'disabled'
  | 'out_of_scope'
  | 'timeout'
  | 'empty_response'
  | 'json_parse_failed'
  | 'validation_failed'
  | 'llm_exception'
  | 'cross_domain_seed_swallow'
  | 'deterministic_safe_fallback'

export interface KeyMissingInfo {
  field: string
  question: string
  why_it_matters: string
}

export interface NextAction {
  title: string
  detail: string
  urgency: 'now' | 'soon' | 'later'
}

export interface LlmAnswerEnvelope {
  engine_version: EngineVersion
  answer_mode: AnswerMode
  domain: SupportedDomain
  understood_question: string
  short_answer: string
  assumptions: string[]
  key_missing_info: KeyMissingInfo[]
  next_actions: NextAction[]
  materials: string[]
  deadline: string
  where_to_go: string
  risks: string[]
  expert_checkpoints: string[]
  source_notes: string[]
  copy_text: string
  confidence: 'high' | 'medium' | 'low'
  source_article_ids: string[]
  // Observability — present whenever engine_version != 'llm-answer-v0'.
  // `llm_attempted` records whether we actually called Bedrock for this
  // request (false means we short-circuited before the call).
  // `fallback_reason` says why the LLM result did not survive.
  // `fallback_from` is always 'llm-answer-v0' when set, recording the
  // engine that was supposed to produce this envelope.
  llm_attempted?: boolean
  fallback_reason?: FallbackReason
  fallback_from?: 'llm-answer-v0'
  // Deprecated: kept for compatibility with v0 callers that read
  // `llm_error`. New code should branch on `fallback_reason`.
  llm_error?: boolean
}

export interface AnswerSection {
  heading: string
  body: string
}

export interface AnswerLink {
  title: string
  href: string
}

export interface AnswerSource {
  title: string
  url?: string
  source_grade?: string
}

export interface ExpertHandoff {
  trigger: string[]
  who?: string
  why?: string
}

export interface ActionAnswer {
  conclusion: string
  what_to_do: string[]
  where_to_go: string[]
  how_to_do: string[]
  documents_needed: string[]
  deadline_or_timing: string[]
  consequences: string[]
  expert_handoff: string[]
  boundary_note: string
}

export interface AnswerResult {
  ok: true
  answer_type: AnswerType
  answer_level: DecisionAnswerLevel
  review_status: AnswerReviewStatus
  title: string
  summary: string
  sections: AnswerSection[]
  next_steps: string[]
  related_links: AnswerLink[]
  sources: AnswerSource[]
  query_id: string | null
  answer_id: string | null
  matched_card_id?: string | null
  matched_seed_id?: string | null
  intent_guard_pass?: boolean
  intent?: unknown
  intent_summary?: string | null
  preferred_template?: string | null
  saved?: boolean
  boundary_note?: string
  first_screen_answer?: string | null
  why_not_simple_answer?: string | null
  expert_handoff?: ExpertHandoff | null
  action_answer?: ActionAnswer
  // LLM Answer Engine v0 envelope. Always present once the new pipeline
  // is wired in. `engine_version === 'legacy-fallback'` means the legacy
  // article-assembly path produced the answer and the LLM was not used.
  llm_envelope?: LlmAnswerEnvelope
}

export const FEEDBACK_TYPES: FeedbackType[] = [
  'helpful',
  'inaccurate',
  'unclear',
  'my_case_differs',
]

export const ANSWER_BOUNDARY_NOTE =
  'TEBIQ 提供的是一般手续整理和准备方向，不判断你的申请一定会通过或不通过。如果涉及紧急期限、处分记录、公司异常或个别事实，请咨询行政書士等专业人士。'
