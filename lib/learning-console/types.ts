// 1.0 Alpha — Learning Console types (Issue #41).
//
// The Learning Console reads from the ai_consultations table populated
// by the streaming consultation pipeline (Issue #39). We do NOT touch
// eval_answers — that is a separate data surface owned by the Eval
// Console (`/internal/eval-console`).

import type { AiConsultation } from '@/lib/db/queries/aiConsultations'

export const LEARNING_CONSOLE_TABS = [
  'all',
  'image',
  'risk',
  'inaccurate',
  'human_review',
  'saved',
  'failure',
] as const

export type LearningConsoleTab = (typeof LEARNING_CONSOLE_TABS)[number]

export const LEARNING_CONSOLE_TAB_LABELS: Record<LearningConsoleTab, string> = {
  all:          '全部咨询',
  image:        '图片咨询',
  risk:         '命中高风险词',
  inaccurate:   '不准确反馈',
  human_review: '想人工确认',
  saved:        '已保存问题',
  failure:      '超时 / 失败',
}

/** Pack §4 — filter predicate per tab. */
export function matchesTab(row: AiConsultation, tab: LearningConsoleTab): boolean {
  switch (tab) {
    case 'all':
      return true
    case 'image':
      return row.hasImage === true
    case 'risk':
      return Array.isArray(row.riskKeywordHits) && row.riskKeywordHits.length > 0
    case 'inaccurate':
      return row.feedbackType === 'inaccurate'
    case 'human_review':
      return row.humanConfirmClicked === true || row.feedbackType === 'human_review'
    case 'saved':
      return row.savedQuestion === true
    case 'failure':
      return row.completionStatus === 'timeout' || row.completionStatus === 'failed'
  }
}

/** Pack §5 — top-of-console KPI row. */
export interface LearningConsoleKpis {
  todayConsultations: number
  todayImages: number
  todayRiskHits: number
  todayInaccurateRate: number | null
  todayTimeoutRate: number | null
  /** Sample size used for the rates above (today's total feedback count
   * for inaccurate; today's total for timeout). null when 0 to avoid
   * divide-by-zero rendering as "NaN%". */
  todayInaccurateSampleSize: number
  todayTimeoutSampleSize: number
}

export function isTodayJst(d: Date | string): boolean {
  const date = typeof d === 'string' ? new Date(d) : d
  const todayJst = formatYmdInJst(new Date())
  return formatYmdInJst(date) === todayJst
}

export function formatYmdInJst(d: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d)
}

/** Compute KPI roll-up across today's rows. Pack §5. */
export function computeKpis(rows: AiConsultation[]): LearningConsoleKpis {
  const today = rows.filter(r => isTodayJst(r.createdAt))
  const todayImages = today.filter(r => r.hasImage === true).length
  const todayRiskHits = today.filter(
    r => Array.isArray(r.riskKeywordHits) && r.riskKeywordHits.length > 0,
  ).length

  const todayWithFeedback = today.filter(r => r.feedbackType != null)
  const todayInaccurateSampleSize = todayWithFeedback.length
  const todayInaccurate = todayWithFeedback.filter(r => r.feedbackType === 'inaccurate').length
  const todayInaccurateRate = todayInaccurateSampleSize > 0
    ? todayInaccurate / todayInaccurateSampleSize
    : null

  const todayTimeoutSampleSize = today.length
  const todayTimeout = today.filter(r => r.completionStatus === 'timeout').length
  const todayTimeoutRate = todayTimeoutSampleSize > 0
    ? todayTimeout / todayTimeoutSampleSize
    : null

  return {
    todayConsultations: today.length,
    todayImages,
    todayRiskHits,
    todayInaccurateRate,
    todayInaccurateSampleSize,
    todayTimeoutRate,
    todayTimeoutSampleSize,
  }
}
