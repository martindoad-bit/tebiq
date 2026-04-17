export interface Material {
  name: string
  description?: string
  conditional?: boolean
  condition?: string
}

export interface SubmissionStep {
  step: number
  title: string
  description: string
}

export interface VisaTypeConfig {
  id: string
  label: string
  description: string
  price: number
  materials: Material[]
  submissionSteps: SubmissionStep[]
  referralConditions?: string[]
}

export interface SurveyAnswer {
  questionId: string
  question: string
  answer: string
}

export type SessionStatus =
  | 'created'
  | 'payment_pending'
  | 'payment_completed'
  | 'survey_in_progress'
  | 'survey_completed'
  | 'referral_requested'

export interface VisaSession {
  sessionId: string
  visaType: string
  status: SessionStatus
  answers: SurveyAnswer[]
  materials: Material[]
  submissionSteps: SubmissionStep[]
  requiresReferral: boolean
  referralReason?: string
  pdfUrl?: string
  createdAt: string
  updatedAt: string
}
