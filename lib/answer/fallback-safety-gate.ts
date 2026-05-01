import type { AnswerIntent } from './intent-router'
import type { ScopeResult } from './answer-scope'
import type { AnswerResult } from './types'

// 必修 1 — Cross-domain fallback safety gate.
//
// The legacy `bestSeedFromList` path can swallow a question into an
// unrelated seed when keyword overlap dominates the safe filter. This
// gate runs after legacy `buildAnswer` and BEFORE we wrap the legacy
// answer into the fallback envelope. If the legacy result is clearly
// incompatible with the parsed intent / scope, we discard it and tell
// the caller to build a deterministic safe envelope instead.
//
// Rules are intentionally narrow and explicit. Each rule names exactly
// the (question shape, legacy content shape) pair we know is wrong.
// Adding new rules here is safer than widening the existing rules.

export interface SafetyGateResult {
  compatible: boolean
  reason?: string
  triggered_rule?: string
}

export function isLegacyAnswerCompatibleWithScope(input: {
  questionText: string
  intent: AnswerIntent
  scope: ScopeResult
  legacyAnswer: AnswerResult
}): SafetyGateResult {
  const { questionText, intent, scope, legacyAnswer } = input
  const haystack = legacyContentText(legacyAnswer)

  // Rule A: long_term_resident (定住者) questions must NOT receive
  // business_manager / 経営管理 / 常勤職員 / 役員報酬 content.
  if (scope.domain === 'long_term_resident') {
    if (/(経営・管理|経営管理|经营管理|经管|常勤職員|役員報酬|代表取締役|資本金|事業計画|会社設立|事務所要件)/.test(haystack)) {
      return { compatible: false, reason: 'A:long_term_resident_got_business_manager', triggered_rule: 'A' }
    }
  }

  // Rule B: 配偶 + 离婚 + 定住 questions must NOT receive 転職 / 所属機関 /
  // 14 日内届出 / 経営管理 常勤職員 content.
  if (isSpouseDivorceTeijuQuestion(questionText, intent)) {
    if (/(転職|所属機関|14\s*日(?:以内|内|間)?|常勤職員|経営管理|経営・管理|代表取締役|事業所|本店移転|地址変更|地址变更)/.test(haystack)) {
      return { compatible: false, reason: 'B:spouse_divorce_teiju_got_unrelated_seed', triggered_rule: 'B' }
    }
  }

  // Rule C: family_stay → work visa questions must NOT receive 資格外活動
  // 28 時間 as the primary answer.
  if (isFamilyStayToWorkVisaQuestion(questionText, intent)) {
    if (/(資格外活動|资格外活动|28\s*時間|28\s*小时)/.test(haystack)
      && !/(在留資格変更|在留资格変更|変更許可|内定|雇用契約|学歴|職歴)/.test(haystack)) {
      return { compatible: false, reason: 'C:family_stay_to_work_got_28_hour', triggered_rule: 'C' }
    }
  }

  // Rule D: 代表取締役换人 / 役员変更 + 入管 questions must NOT be
  // mistaken for office / 本店地址 relocation.
  if (isRepresentativeChangeImmigrationQuestion(questionText, intent)) {
    if (/(本店移転|本店所在地|事務所(?:移転|搬迁|搬家)|办公室搬迁|地址変更|地址变更)/.test(haystack)
      && !/(代表取締役|代表者|役員変更|役员变更|商業登記)/.test(haystack)) {
      return { compatible: false, reason: 'D:representative_change_got_address_change', triggered_rule: 'D' }
    }
  }

  return { compatible: true }
}

function legacyContentText(answer: AnswerResult): string {
  const parts: string[] = [
    answer.title,
    answer.summary,
    answer.first_screen_answer ?? '',
    answer.why_not_simple_answer ?? '',
    ...(answer.next_steps ?? []),
    ...(answer.sections ?? []).flatMap(s => [s.heading, s.body]),
  ]
  if (answer.action_answer) {
    const a = answer.action_answer
    parts.push(
      a.conclusion,
      ...a.what_to_do,
      ...a.where_to_go,
      ...a.how_to_do,
      ...a.documents_needed,
      ...a.deadline_or_timing,
      ...a.consequences,
      ...a.expert_handoff,
    )
  }
  return parts.filter(Boolean).join('\n')
}

function isSpouseDivorceTeijuQuestion(questionText: string, intent: AnswerIntent): boolean {
  const target = intent.target_status ?? intent.extracted_entities?.target_visa ?? ''
  const targetIsTeiju = /(定住|定住者)/.test(target)
  const questionMentionsTeiju = /(定住|定住者|teiju)/i.test(questionText)
  const questionMentionsDivorce = /(离婚|離婚|分居|协议离婚|協議離婚|裁判離婚)/.test(questionText)
  const questionMentionsSpouse = /(配偶|配偶者|配偶签|妻|夫|日本人配偶|永住者の配偶)/.test(questionText)
  return (targetIsTeiju || questionMentionsTeiju)
    && questionMentionsDivorce
    && questionMentionsSpouse
}

function isFamilyStayToWorkVisaQuestion(questionText: string, intent: AnswerIntent): boolean {
  const cur = intent.current_status ?? ''
  const tgt = intent.target_status ?? ''
  const fromFamily = /家族滞在/.test(cur) || /家族滞在/.test(questionText)
  const toWork = /(技人国|人文|工作签|技術|gijinkoku)/.test(tgt)
    || /(转工作签|转技人国|转人文|変更.*工作|転職.*工作签)/.test(questionText)
  return fromFamily && toWork
}

function isRepresentativeChangeImmigrationQuestion(questionText: string, intent: AnswerIntent): boolean {
  const procedure = intent.extracted_entities?.procedure ?? ''
  if (/(代表者|代表取締役|役員変更|役员变更)/.test(procedure)) return true
  return /(代表取締役|代表者).*(换人|変更|变更|入管|届出|通知)/.test(questionText)
    || /(代表|役員|役员).*(换人|変更|变更).*(入管|届出|通知)/.test(questionText)
}
