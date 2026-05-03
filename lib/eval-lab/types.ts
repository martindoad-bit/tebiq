// TEBIQ Eval Lab V0 — types shared between page + API + storage helpers.
//
// Internal tool — these types and the data they carry are NOT subject to
// the user-side forbidden-words / internal-field rules. The Eval Lab
// page intentionally surfaces engine_version / fallback_reason /
// status / domain so reviewers can spot routing issues.

export type Severity = 'OK' | 'P2' | 'P1' | 'P0'
export type YesNo = 'yes' | 'no' | ''
export type Action =
  | 'golden_case'
  | 'prompt_rule'
  | 'fact_card_candidate'
  | 'handoff_rule'
  | 'ignore'
  | ''

export interface Annotation {
  score: 1 | 2 | 3 | 4 | 5 | null
  severity: Severity | ''
  launchable: YesNo
  direction_correct: YesNo
  answered_question: YesNo
  dangerous_claim: YesNo
  hallucination: YesNo
  should_handoff: YesNo
  must_have: string
  must_not_have: string
  missing_points: string
  reviewer_note: string
  action: Action
  annotated_at: string | null
}

export interface TebiqAnswerSnapshot {
  answer_id: string | null
  answer_link: string | null         // /answer/{id}
  status: string | null              // direct_answer / preliminary / clarification_needed / out_of_scope
  domain: string | null
  engine_version: string | null
  fallback_reason: string | null
  // Plain-text body of what the user would see, flattened for side-by-side comparison.
  visible_text: string | null
  // Title / summary as rendered by the projector. Used for the
  // comparison view's compact header above visible_text.
  title: string | null
  summary: string | null
  generated_at: string | null
  generation_error: string | null    // populated only when /api/questions failed
}

export interface DeepseekRawSnapshot {
  text: string | null
  generated_at: string | null
  generation_error: string | null
}

export interface EvalQuestion {
  id: string                         // local-generated; NOT persisted server-side
  question: string
  source: 'starter' | 'imported' | 'manual'
  starter_tag?: string               // e.g. 'answer-core-regression', 'deepseek-open-1', etc.
  deepseek_raw: DeepseekRawSnapshot
  tebiq: TebiqAnswerSnapshot
  annotation: Annotation
  created_at: string
}

export interface EvalLabState {
  schema_version: 'eval-lab-v0'
  exported_at: string
  questions: EvalQuestion[]
}

export const EMPTY_ANNOTATION: Annotation = {
  score: null,
  severity: '',
  launchable: '',
  direction_correct: '',
  answered_question: '',
  dangerous_claim: '',
  hallucination: '',
  should_handoff: '',
  must_have: '',
  must_not_have: '',
  missing_points: '',
  reviewer_note: '',
  action: '',
  annotated_at: null,
}

export const EMPTY_DEEPSEEK: DeepseekRawSnapshot = {
  text: null,
  generated_at: null,
  generation_error: null,
}

export const EMPTY_TEBIQ: TebiqAnswerSnapshot = {
  answer_id: null,
  answer_link: null,
  status: null,
  domain: null,
  engine_version: null,
  fallback_reason: null,
  visible_text: null,
  title: null,
  summary: null,
  generated_at: null,
  generation_error: null,
}
