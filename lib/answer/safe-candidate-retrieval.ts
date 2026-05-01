import type { AnswerSeed } from './answer-seeds'
import type { AnswerIntent } from './intent-router'

export interface SafeCandidateResult {
  safe: boolean
  reason: string
}

export function safeCandidateForIntent(seed: AnswerSeed, intent: AnswerIntent, questionText: string): SafeCandidateResult {
  const question = compact(questionText)
  const seedText = compact([
    seed.slug,
    seed.title,
    seed.question,
    seed.intent,
    seed.summary,
    ...seed.keywords,
    ...(seed.testQueries ?? []),
    seed.actionAnswer?.conclusion,
    ...(seed.actionAnswer?.what_to_do ?? []),
    ...(seed.actionAnswer?.how_to_do ?? []),
  ].filter(Boolean).join('\n'))

  if (seed.mustNotMatch?.some(item => item && question.includes(compact(item)))) {
    return { safe: false, reason: 'must_not_match_hit' }
  }

  if (seed.intentType && !intentTypeCompatible(seed.intentType, intent.intent_type)) {
    return { safe: false, reason: `intent_type_mismatch:${seed.intentType}->${intent.intent_type}` }
  }

  if (seed.domain && seed.domain !== 'unknown' && intent.domain !== 'unknown' && seed.domain !== intent.domain) {
    if (!(seed.domain === 'visa' && intent.domain === 'company_registration')) {
      return { safe: false, reason: `domain_mismatch:${seed.domain}->${intent.domain}` }
    }
  }

  if (seed.currentStatus && intent.current_status && !statusCompatible(seed.currentStatus, intent.current_status)) {
    return { safe: false, reason: 'current_status_conflict' }
  }

  if (seed.targetStatus && intent.target_status && !statusCompatible(seed.targetStatus, intent.target_status)) {
    return { safe: false, reason: 'target_status_conflict' }
  }

  if (isMaterialQuestion(intent, question) && isCapitalShortageSeed(seedText) && !/(资本金|資本金|资金|資金|增资|増資)/.test(question)) {
    return { safe: false, reason: 'material_question_swallowed_by_capital_seed' }
  }

  if (isTokuteiCompanyChangeQuestion(question) && /(技能实习|技能実習|技人国|人文|工作签|在留資格変更|2号|二号|移行)/.test(seedText)) {
    return { safe: false, reason: 'tokutei_company_change_swallowed_by_adjacent_visa_seed' }
  }

  if (isDocumentDeadlineQuestion(question) && /(护照|パスポート|在留卡有效期|在留カード有効期限)/.test(seedText)) {
    return { safe: false, reason: 'document_deadline_swallowed_by_id_validity' }
  }

  if (isRepresentativeChangeQuestion(question) && /(年金|健康保険|国民健康|国保)/.test(seedText)) {
    return { safe: false, reason: 'representative_change_swallowed_by_insurance_seed' }
  }

  if (isRepresentativeChangeQuestion(question) && /(契約機関|所属機関|换工作|転職|離職|入職|締結届|終了届)/.test(seedText)) {
    return { safe: false, reason: 'representative_change_swallowed_by_job_change_notice' }
  }

  if (isMaterialQuestion(intent, question) && !/(材料|書類|资料|清单|証明|证明|必要書類|要带什么|要什么)/.test(seedText)) {
    return { safe: false, reason: 'material_question_candidate_without_materials' }
  }

  if (isMaterialQuestion(intent, question) && /(契約機関|所属機関|换工作|転職|離職|入職|締結届|終了届)/.test(seedText)) {
    return { safe: false, reason: 'material_question_swallowed_by_job_change_notice' }
  }

  if (/(资本金|資本金|资金|資金).*(不够|不足|足り|怎么办|补救|補強)|3000万.*(不够|不足)/.test(question) && !/(capitalinsufficient|capitalshortage|资本金不够|資本金不足|资金不足|借款|借入|增资|増資)/.test(seedText)) {
    return { safe: false, reason: 'capital_shortage_swallowed_by_adjacent_management_seed' }
  }

  if (intent.domain === 'employment' && /(年金|健康保険|国民健康|国保|厚生年金)/.test(seedText) && !/(雇用|従業員|员工|離職|入職|届出)/.test(seedText)) {
    return { safe: false, reason: 'employment_question_swallowed_by_insurance_seed' }
  }

  if (/(办公室|事務所|住宅|自宅|个人名义|個人名義|租约|賃貸).*(经营管理|経営管理|经管)|(?:经营管理|経営管理|经管).*(办公室|事務所|住宅|自宅|个人名义|個人名義|租约|賃貸)/.test(question)
    && !/(办公室|事務所|住宅|自宅|賃貸|租赁|租約|租约|事業所要件|经营场所|経営場所)/.test(seedText)) {
    return { safe: false, reason: 'office_requirement_swallowed_by_adjacent_management_seed' }
  }

  if (/(既存|已有|已经有|已取得).*(经营管理|経営管理|经管).*(新规|新規)|(?:经营管理|経営管理|经管).*(新规|新規).*(既存|已有|已经有|已取得)/.test(question)
    && /(技人国|人文|自己开公司|会社設立|公司設立)/.test(seedText)) {
    return { safe: false, reason: 'existing_management_new_rule_swallowed_by_engineer_to_management' }
  }

  if (intent.intent_type === 'scenario_sequence' && /(刚到|第一周|初到|来日本)/.test(question) && seed.intentType === 'material_list') {
    return { safe: false, reason: 'first_week_sequence_swallowed_by_material_list' }
  }

  return { safe: true, reason: 'pass' }
}

export function isHighRiskGenericSeed(seed: AnswerSeed): boolean {
  const text = compact(`${seed.slug}\n${seed.title}\n${seed.intent ?? ''}`)
  return [
    /capital|资本金|資本金/,
    /不许可|不許可|top6|公的義務|滞納|滞纳/,
    /特定技能.*(转换|変更|change)/,
    /父母.*短期|parents/,
    /技能实习|技能実習/,
    /学历|学歴|職務|职务/,
  ].some(pattern => pattern.test(text))
}

function intentTypeCompatible(seedIntent: string, intentType: string): boolean {
  if (seedIntent === intentType) return true
  if (seedIntent === 'procedure_flow' && intentType === 'scenario_sequence') return true
  if (seedIntent === 'scenario_sequence' && intentType === 'procedure_flow') return true
  if (seedIntent === 'deadline_emergency' && intentType === 'document_notice') return true
  if (seedIntent === 'document_notice' && intentType === 'deadline_emergency') return true
  return false
}

function statusCompatible(seedStatus: string, intentStatus: string): boolean {
  const seed = compact(seedStatus)
  const intent = compact(intentStatus)
  if (/经营管理|経営管理|经管/.test(seed) !== /经营管理|経営管理|经管/.test(intent)) return false
  if (/技人国|人文|工作签|技術人文/.test(seed) !== /技人国|人文|工作签|技術人文/.test(intent)) return false
  if (/特定技能/.test(seed) !== /特定技能/.test(intent)) return false
  if (/留学/.test(seed) !== /留学/.test(intent)) return false
  return true
}

function isMaterialQuestion(intent: AnswerIntent, question: string): boolean {
  return intent.intent_type === 'material_list' || /(材料|書類|资料|清单|有哪些|需要什么)/.test(question)
}

function isCapitalShortageSeed(seedText: string): boolean {
  return /(资本金|資本金).*(不足|不够|足り|补救|增资|増資)/.test(seedText)
}

function isTokuteiCompanyChangeQuestion(question: string): boolean {
  return /特定技能.*(换会社|换公司|換会社|転職|雇主変更|雇用主変更)/.test(question)
}

function isDocumentDeadlineQuestion(question: string): boolean {
  return /(入管|市役所|区役所|通知|文书|書類).*(補資料|补材料|补资料|期限|赶不上|間に合わ)/.test(question)
}

function isRepresentativeChangeQuestion(question: string): boolean {
  return /(代表取締役|取締役|代表|役員|役员).*(换人|変更|变更|入管|届出|通知)/.test(question)
}

function compact(value: string): string {
  return value
    .replace(/\s+/g, '')
    .replace(/[・･\/／→\-ー—_()（）「」『』【】,，、:：]/g, '')
    .toLowerCase()
}
