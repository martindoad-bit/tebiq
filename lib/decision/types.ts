export type DecisionCardType = 'decision_card' | 'workflow' | 'risk_chain' | 'misconception'
export type DecisionAnswerLevel = 'L1' | 'L2' | 'L3' | 'L4'
export type DecisionStatus = 'draft' | 'needs_review' | 'approved' | 'rejected' | 'deprecated'
export type DecisionSourceGrade = 'S' | 'A' | 'B' | 'C'
export type QueryMatchStatus = 'matched' | 'no_match' | 'low_confidence'
export type FeedbackType = 'helpful' | 'inaccurate' | 'unclear' | 'my_case_differs'

export interface DecisionOption {
  label: string
  detail?: string
}

export interface DecisionStep {
  label: string
  detail?: string
}

export interface SourceRef {
  title: string
  url?: string
  source_grade?: DecisionSourceGrade
  sourceGrade?: DecisionSourceGrade
}

export interface DecisionCard {
  id: string | null
  slug: string
  title: string
  cardType: DecisionCardType
  answerLevel: DecisionAnswerLevel
  status: DecisionStatus
  visaTypes: string[]
  trigger: Record<string, unknown>
  userState: Record<string, unknown>
  decisionOptions: DecisionOption[]
  recommendedAction: string
  whyNotOtherOptions: DecisionOption[]
  steps: DecisionStep[]
  relatedDocuments: DecisionOption[]
  relatedCheckDimensions: DecisionOption[]
  sourceRefs: SourceRef[]
  sourceGrade: DecisionSourceGrade
  lastVerifiedAt: string | null
  requiresReviewAfterDays: number
  requiresReview: boolean
  expertHandoff: Record<string, unknown>
  bodyMarkdown: string
  fallback?: string
  boundaryNote?: string
}

export interface DecisionQueryMatch {
  status: QueryMatchStatus
  card: DecisionCard | null
  normalizedQuery: string
}

export const CARD_TYPE_LABEL: Record<DecisionCardType, string> = {
  decision_card: 'Decision Card',
  workflow: 'Workflow',
  risk_chain: 'Risk Chain',
  misconception: 'Misconception',
}

export const ANSWER_LEVEL_LABEL: Record<DecisionAnswerLevel, string> = {
  L1: 'L1 事实说明',
  L2: 'L2 流程说明',
  L3: 'L3 个案方向',
  L4: 'L4 专家确认',
}

export const SOURCE_GRADE_LABEL: Record<DecisionSourceGrade, string> = {
  S: 'S 官方原文',
  A: 'A 官方说明',
  B: 'B 实务资料',
  C: 'C 待补来源',
}
