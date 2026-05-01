import type { AnswerResult } from './types'

export interface IntentGuardResult {
  pass: boolean
  reason: string
  category?: 'pension_dormant' | 'office_relocation' | 'capital_shortage'
}

const PENSION_QUESTION_TERMS = [
  '年金',
  '国民年金',
  '厚生年金',
  '社保',
  '社会保险',
  '社会保険',
  '公司休眠',
  '会社休眠',
  '空白期',
]

const PENSION_ANSWER_TERMS = [
  '国民年金',
  '厚生年金',
  '第1号',
  '資格喪失',
  '资格丧失',
  '区役所',
  '市役所',
  '年金事務所',
  '年金事务所',
  '国民健康保険',
  '国民健康保险',
]

const MANAGEMENT_DORMANT_TERMS = [
  '経営管理',
  '经营管理',
  '会社休眠',
  '公司休眠',
  '会社解散',
  '公司解散',
  '在留資格影響',
  '在留资格影响',
]

const OFFICE_QUESTION_TERMS = [
  '办公室搬迁',
  '事務所搬迁',
  '事务所搬迁',
  '事務所移転',
  '办公室移转',
  '公司换地址',
  '本店移転',
  '法人地址',
]

const OFFICE_ANSWER_TERMS = [
  '法務局',
  '法务局',
  '税務署',
  '税务署',
  '入管',
  '出入国',
  '租赁合同',
  '賃貸契約',
  '办公室照片',
  '事務所写真',
  '本店所在地',
  '異動届',
  '异动届',
]

const CAPITAL_QUESTION_TERMS = [
  '资本金不够',
  '資本金不足',
  '资金不够',
  '資金不足',
  '3000万不够',
  '3000万円不足',
  '3000万不足',
  '经营管理新规',
  '経営管理新規',
  '增资',
  '増資',
]

const CAPITAL_ANSWER_TERMS = [
  '增资',
  '増資',
  '资金来源',
  '資金來源',
  '資金来源',
  '借款',
  '借入',
  '事业计划',
  '事業計画',
  '新规',
  '新規',
  '续签',
  '更新',
  '专家复核',
  '専門家',
  '行政書士',
]

const GENERIC_CAPITAL_AMOUNT_TERMS = [
  '资本金多少合适',
  '資本金多少合適',
  '资本金多少',
  '資本金多少',
  '多少最合适',
  '推奨金額',
]

export function matchIntentGuard(questionText: string, candidateAnswer: AnswerResult): IntentGuardResult {
  const question = normalize(questionText)
  const answerText = normalize(answerTextForGuard(candidateAnswer))

  if (hasAny(question, PENSION_QUESTION_TERMS)) {
    const pensionHits = countContains(answerText, PENSION_ANSWER_TERMS)
    const matchedManagementDormant = hasAny(answerText, MANAGEMENT_DORMANT_TERMS)
    if (pensionHits < 2 || matchedManagementDormant) {
      return {
        pass: false,
        reason: matchedManagementDormant
          ? 'pension_question_matched_management_dormant'
          : 'pension_question_missing_pension_terms',
        category: 'pension_dormant',
      }
    }
  }

  if (hasAny(question, OFFICE_QUESTION_TERMS)) {
    const officeHits = countContains(answerText, OFFICE_ANSWER_TERMS)
    if (officeHits < 3) {
      return {
        pass: false,
        reason: 'office_relocation_missing_required_terms',
        category: 'office_relocation',
      }
    }
  }

  if (hasAny(question, CAPITAL_QUESTION_TERMS)) {
    if (hasAny(answerText, GENERIC_CAPITAL_AMOUNT_TERMS)) {
      return {
        pass: false,
        reason: 'capital_shortage_matched_generic_amount',
        category: 'capital_shortage',
      }
    }
    const capitalHits = countContains(answerText, CAPITAL_ANSWER_TERMS)
    if (capitalHits < 2) {
      return {
        pass: false,
        reason: 'capital_shortage_missing_required_terms',
        category: 'capital_shortage',
      }
    }
  }

  return { pass: true, reason: 'pass' }
}

function answerTextForGuard(answer: AnswerResult): string {
  const action = answer.action_answer
  return [
    answer.title,
    answer.summary,
    answer.first_screen_answer,
    answer.why_not_simple_answer,
    ...answer.sections.flatMap(section => [section.heading, section.body]),
    ...answer.next_steps,
    ...(answer.expert_handoff
      ? [answer.expert_handoff.who, answer.expert_handoff.why, ...answer.expert_handoff.trigger]
      : []),
    ...(action ? [
      action.conclusion,
      ...action.what_to_do,
      ...action.where_to_go,
      ...action.how_to_do,
      ...action.documents_needed,
      ...action.deadline_or_timing,
      ...action.consequences,
      ...action.expert_handoff,
    ] : []),
  ].filter(Boolean).join('\n')
}

function hasAny(text: string, terms: string[]): boolean {
  return terms.some(term => text.includes(normalize(term)))
}

function countContains(text: string, keywords: string[]): number {
  return keywords.filter(keyword => text.includes(normalize(keyword))).length
}

function normalize(input: string): string {
  return input.trim().replace(/\s+/g, '').toLowerCase()
}
