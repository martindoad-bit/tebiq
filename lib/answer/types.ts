import type { DecisionAnswerLevel, FeedbackType } from '@/lib/decision/types'

export type AnswerType = 'matched' | 'draft' | 'cannot_determine'
export type AnswerReviewStatus = 'reviewed' | 'unreviewed' | 'needs_expert' | 'rejected'

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
  saved?: boolean
  boundary_note?: string
  first_screen_answer?: string | null
  why_not_simple_answer?: string | null
  expert_handoff?: ExpertHandoff | null
  action_answer?: ActionAnswer
}

export const FEEDBACK_TYPES: FeedbackType[] = [
  'helpful',
  'inaccurate',
  'unclear',
  'my_case_differs',
]

export const ANSWER_BOUNDARY_NOTE =
  'TEBIQ 提供的是一般手续整理和准备方向，不判断你的申请一定会通过或不通过。如果涉及紧急期限、处分记录、公司异常或个别事实，请咨询行政書士等专业人士。'
