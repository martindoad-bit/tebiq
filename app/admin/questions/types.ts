import type { QuestionPriority, QuestionStatus } from '@/lib/db/queries/questions'

export interface AdminQuestionRow {
  id: string
  rawQuery: string
  normalizedQuery: string | null
  visaType: string | null
  contactEmail: string | null
  sourcePage: string | null
  matchStatus: string
  status: QuestionStatus | string
  priority: QuestionPriority | string
  note: string | null
  createdAt: string
  updatedAt: string
}

export interface AdminQuestionStats {
  total: number
  today: number
  unprocessed: number
  highPriority: number
  ignored: number
  published: number
}
