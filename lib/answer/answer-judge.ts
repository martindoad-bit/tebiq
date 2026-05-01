import { answerMatchesIntent, type AnswerIntent } from './intent-router'
import type { AnswerResult } from './types'

export type AnswerMismatchType =
  | 'domain_mismatch'
  | 'visa_direction_mismatch'
  | 'subject_mismatch'
  | 'template_mismatch'
  | 'fallback_as_main_answer'
  | 'too_generic'

export interface AnswerJudgeInput {
  original_question: string
  parsed_intent: AnswerIntent
  answer: AnswerResult
}

export interface AnswerJudgeResult {
  answers_original_question: boolean
  mismatch_type?: AnswerMismatchType
  confidence: 1 | 2 | 3 | 4
  reason: string
  should_show: boolean
  clarification_question?: string
}

export function judgeAnswer(input: AnswerJudgeInput): AnswerJudgeResult {
  const question = normalize(input.original_question)
  const answerText = normalize(answerTextForJudge(input.answer))
  const intent = input.parsed_intent
  const guard = answerMatchesIntent(intent, input.answer)
  if (!guard.pass) {
    return reject('domain_mismatch', guard.reason, clarificationFor(intent), 4)
  }

  if (isManagementToHumanities(intent)) {
    if (/(配偶者|日本人配偶|永住者配偶|家族滞在)/.test(answerText)) {
      return reject(
        'subject_mismatch',
        'management_to_humanities_answered_as_family_or_spouse_conversion',
        '你是想确认从经营管理转技人国/人文签，还是从家族/配偶身份转工作签？',
        4,
      )
    }
    const employmentHits = countHits(answerText, [
      '接收公司',
      '受入会社',
      '雇用契約',
      '雇佣合同',
      '業務内容',
      '业务内容',
      '学歴',
      '学历',
      '実務経験',
      '实务经验',
      '技人国',
      '人文',
      '原公司',
      '代表',
      '役員',
      '退任',
    ])
    const reversedHits = countHits(answerText, ['500万', '出資', '事業所', '事业所', '会社設立', '事業計画', '经营管理申请条件'])
    if (employmentHits < 3 || reversedHits >= 2) {
      return reject(
        'visa_direction_mismatch',
        'management_to_humanities_answer_drifted_to_management_application',
        '你是想确认从经营管理转技人国/人文签，还是从技人国/人文签转经营管理？',
        4,
      )
    }
  }

  if (isHumanitiesToManagement(intent)) {
    const conversionHits = countHits(answerText, ['500万', '出資', '事業所', '賃貸契約', '事業計画', '会社設立', '在留資格変更'])
    if (/(契約機関|14日|14天|転職|换工作|離職|入職)/.test(answerText) && conversionHits < 3) {
      return reject('visa_direction_mismatch', 'humanities_to_management_answered_as_job_change_notice', clarificationFor(intent), 4)
    }
  }

  if (isCompanyDormantPensionQuestion(question, intent)) {
    if (/(交不起|免除|猶予|学生納付特例)/.test(normalize(input.answer.title)) && !/(会社|公司|休眠|倒闭|倒産|厚生年金|資格喪失)/.test(normalize(input.answer.title))) {
      return reject('fallback_as_main_answer', 'pension_exemption_used_as_main_answer', clarificationFor(intent), 4)
    }
    const hits = countHits(answerText, ['厚生年金', '資格喪失', '国民年金', '第1号', '国民健康保険', '区役所', '年金事務所'])
    if (hits < 3) return reject('domain_mismatch', 'company_dormant_pension_answer_missing_core_terms', clarificationFor(intent), 4)
  }

  if (/(资本金不够|資本金不足|资金不够|資金不足|3000万不够|3000万不足)/.test(question)) {
    if (/(资本金多少合适|資本金多少|多少最合适|推奨金額)/.test(answerText)) {
      return reject('template_mismatch', 'capital_shortage_answered_as_amount_standard', clarificationFor(intent), 4)
    }
  }

  if (intent.intent_type === 'material_list' && !/(材料|書類|清单|证明|証明)/.test(answerText)) {
    return reject('template_mismatch', 'material_question_without_materials', clarificationFor(intent), 3)
  }

  if (intent.confidence <= 1) {
    return reject('too_generic', 'intent_confidence_1', clarificationFor(intent), 2)
  }

  if (input.answer.answer_type === 'draft' && /(没有命中|一般手续整理方式|当前问题没有命中)/.test(answerText) && intent.confidence <= 2) {
    return reject('too_generic', 'generic_fallback_for_low_confidence', clarificationFor(intent), 2)
  }

  return {
    answers_original_question: true,
    confidence: Math.min(4, Math.max(1, intent.confidence)) as 1 | 2 | 3 | 4,
    reason: 'pass',
    should_show: true,
  }
}

function reject(type: AnswerMismatchType, reason: string, clarification: string, confidence: 1 | 2 | 3 | 4): AnswerJudgeResult {
  return {
    answers_original_question: false,
    mismatch_type: type,
    confidence,
    reason,
    should_show: false,
    clarification_question: clarification,
  }
}

function clarificationFor(intent: AnswerIntent): string {
  if (isManagementToHumanities(intent)) {
    return '你是想确认从经营管理转技人国/人文签，还是从技人国/人文签转经营管理？'
  }
  if (isHumanitiesToManagement(intent)) {
    return '你是想确认从技人国/人文签转经营管理，还是从经营管理转技人国/人文签？'
  }
  return '你是想确认条件、流程、材料，还是风险？'
}

function answerTextForJudge(answer: AnswerResult): string {
  const action = answer.action_answer
  return [
    answer.title,
    answer.summary,
    answer.first_screen_answer,
    answer.why_not_simple_answer,
    ...answer.sections.flatMap(section => [section.heading, section.body]),
    ...answer.next_steps,
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

function isCompanyDormantPensionQuestion(question: string, intent: AnswerIntent): boolean {
  return (intent.domain === 'pension' || intent.domain === 'health_insurance')
    && /(公司休眠|会社休眠|休眠|公司停|会社停|倒闭|倒産|厚生年金|国民年金|社保)/.test(question)
}

function isHumanitiesToManagement(intent: AnswerIntent): boolean {
  return Boolean(
    intent.current_status
      && /(技人国|人文|工作签|技術人文)/.test(normalize(intent.current_status))
      && intent.target_status
      && /(经营管理|経営管理|经管)/.test(normalize(intent.target_status)),
  )
}

function isManagementToHumanities(intent: AnswerIntent): boolean {
  return Boolean(
    intent.current_status
      && /(经营管理|経営管理|经管)/.test(normalize(intent.current_status))
      && intent.target_status
      && /(技人国|人文|工作签|技術人文)/.test(normalize(intent.target_status)),
  )
}

function countHits(text: string, terms: string[]): number {
  return terms.filter(term => text.includes(normalize(term))).length
}

function normalize(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, '')
    .replace(/[・･\/／→\-ー—_()（）「」『』【】,，、:：]/g, '')
    .toLowerCase()
}
