import type { AnswerIntent } from './intent-router'
import { describeIntent } from './intent-router'
import type { ScopeResult } from './answer-scope'
import type { FallbackReason, LlmAnswerEnvelope, SupportedDomain } from './types'

// 必修 2 — Deterministic safe fallbacks for high-risk question shapes.
//
// These envelopes are produced from rule pattern matches alone — no
// LLM, no legacy seed lookup. They are intentionally conservative:
// they never give a "you can definitely do X" answer; they always frame
// the answer as a path with required preconditions. They exist so that
// when the LLM fails AND the legacy seed swallow gate has tripped, we
// still return safe content for known-dangerous question shapes.
//
// Currently covers:
//   - 配偶 + 离婚 + 转定住者 (Q5 redline)
//
// Adding patterns here is preferred over making the LLM fallback try
// to "guess" — the patterns below are individually reviewed.

export interface DeterministicResult {
  envelope: LlmAnswerEnvelope
  reason: FallbackReason
  pattern_id: string
}

export function deterministicSafeAnswer(input: {
  questionText: string
  intent: AnswerIntent
  scope: ScopeResult
}): DeterministicResult | null {
  if (matchesSpouseDivorceTeiju(input.questionText, input.intent)) {
    return {
      envelope: spouseDivorceToTeijuEnvelope(input),
      reason: 'deterministic_safe_fallback',
      pattern_id: 'spouse_divorce_to_teiju',
    }
  }
  return null
}

function matchesSpouseDivorceTeiju(questionText: string, intent: AnswerIntent): boolean {
  const targetStatus = intent.target_status ?? intent.extracted_entities?.target_visa ?? ''
  const targetIsTeiju = /(定住|定住者)/.test(targetStatus) || /(定住|定住者)/.test(questionText)
  const mentionsSpouse = /(配偶|配偶者|配偶签|日本人配偶|永住者の配偶|妻|夫)/.test(questionText)
  const mentionsDivorce = /(离婚|離婚|分居|协议离婚|協議離婚|裁判離婚|別居)/.test(questionText)
  return targetIsTeiju && mentionsSpouse && mentionsDivorce
}

function spouseDivorceToTeijuEnvelope(_input: {
  questionText: string
  intent: AnswerIntent
  scope: ScopeResult
}): LlmAnswerEnvelope {
  return {
    engine_version: 'safe-fallback-v0-1',
    answer_mode: 'answer_with_assumptions',
    domain: 'long_term_resident',
    understood_question: '配偶（日本人配偶者等 / 永住者の配偶者等）签证持有人在离婚后，希望把在留资格变更为「定住者」，需要满足什么条件、要怎么办。',
    short_answer: '配偶离婚后想转「定住者」不是届出可以解决的事，需要走「在留資格変更許可申請」。能不能批，看婚姻持续期间、在日年数、子女与亲权、收入与税金、住所与生活基础、离婚原因、是否有暴力 / 不法行为记录这些个案事实。TEBIQ 不能保证一定能转。',
    assumptions: [
      '你目前的在留资格是「日本人の配偶者等」或「永住者の配偶者等」。',
      '你已经办理或即将办理离婚（協議離婚 / 調停離婚 / 裁判離婚 任一）。',
      '你想知道的是怎么从配偶签转到「定住者」（不是简单延签）。',
    ],
    key_missing_info: [
      {
        field: 'marriage_duration',
        question: '婚姻关系实际持续了多少年？同居期间多少年？',
        why_it_matters: '婚姻持续期长（一般 3 年以上同居 + 婚姻 3 年以上）是「離婚定住」的重要前提之一。短婚通常不被认可。',
      },
      {
        field: 'years_in_japan',
        question: '你目前在日本累计居住了多少年？',
        why_it_matters: '在日年数（一般 5 年以上、但具体看个案）是审查的重点之一。',
      },
      {
        field: 'children',
        question: '是否有日本国籍子女或抚养中的子女？亲权和监护权归谁？是否实际抚养？',
        why_it_matters: '抚养未成年日本国籍子女是「離婚定住」最强的事由之一。亲权归你 + 实际抚养 + 抚养能力，会显著加分。',
      },
      {
        field: 'income_tax',
        question: '你目前是否有稳定收入？住民税、所得税、年金、社保是否按时缴纳？',
        why_it_matters: '生活基础与公的義務履行是「定住者」审查的核心要素。未缴税或未缴年金都是减分项。',
      },
      {
        field: 'residence_remaining',
        question: '你当前在留期限还剩多久？',
        why_it_matters: '如果在留期限将至，要先确认是先做「在留期間更新」再申请变更，还是直接做「在留資格変更」。',
      },
      {
        field: 'divorce_status',
        question: '离婚是否已经登记？是否已向入管做了「配偶者に関する届出」（14 日内）？',
        why_it_matters: '离婚 14 日内必须向出入国在留管理庁做「配偶者に関する届出」——这是义务，但做了届出≠取得定住者，二者是分开的两件事。',
      },
    ],
    next_actions: [
      {
        title: '先把离婚事实和 14 日内届出做掉',
        detail: '离婚成立（戸籍記載）后 14 日内，向出入国在留管理庁提交「配偶者に関する届出」。可以网上、邮寄或窗口。这个届出是义务，做不做都不直接决定定住能否取得，但不做会被记一笔。',
        urgency: 'now',
      },
      {
        title: '整理「離婚定住」要看的事实',
        detail: '把婚姻持续期、同居期、在日年数、子女出生地与亲权、最近 3 年的所得 / 課税 / 納税証明、年金缴纳记录、住所证明集中放在一起。',
        urgency: 'soon',
      },
      {
        title: '判断是「在留資格変更」还是先「在留期間更新」',
        detail: '如果在留期限尚远，可直接申请在留資格変更為定住者。如果期限将至且事实尚未齐备，要权衡先更新配偶签再变更，还是直接变更。',
        urgency: 'soon',
      },
      {
        title: '咨询行政書士做个案诊断',
        detail: '离婚定住高度依赖个案事实，TEBIQ 不替你判断。建议带婚姻 / 离婚 / 子女 / 收入 / 在留 文书咨询有「離婚定住」实务经验的行政書士。',
        urgency: 'soon',
      },
    ],
    materials: [
      '在留カード',
      '护照',
      '戸籍謄本（離婚記載あり） / 離婚届受理証明書',
      '婚姻期間 / 同居期間を示す資料',
      '住民票（世帯全員）',
      '直近 3 年の課税証明書 / 納税証明書',
      '年金加入記録 / 健康保険加入記録',
      '在職証明書 / 雇用契約書 / 給与明細',
      '子女の出生証明 / 親権者を示す書類（如有）',
    ],
    deadline: '离婚成立 14 日内必须提交「配偶者に関する届出」。在留資格変更建议在当前在留期限到期前留出 2 - 3 个月窗口。',
    where_to_go: '出入国在留管理局（管辖你居住地） / 行政書士事务所',
    risks: [
      '婚姻持续期短（同居 3 年以下）通常很难直接转定住者。',
      '没有日本国籍子女且在日年数不长时，审查会显著严格。',
      '未缴年金 / 未缴税记录会成为强减分项。',
      'TEBIQ 不能保证一定能转定住者；最终结果由出入国在留管理庁判断。',
    ],
    expert_checkpoints: [
      '婚姻持续 < 3 年、子女不归你抚养、年金 / 税金有空白、或离婚原因复杂的，必须带材料咨询有「離婚定住」实务经验的行政書士再决定申请。',
    ],
    source_notes: [
      '出入国在留管理庁 在留資格「定住者」告示',
      '出入国在留管理庁 在留資格変更許可申請',
      '出入国在留管理庁 配偶者に関する届出',
    ],
    copy_text: '配偶离婚后想转定住者，不是届出可以解决的事，要走「在留資格変更許可申請」。能否被批看婚姻持续期、在日年数、子女与亲权、收入与税金、生活基础。离婚 14 日内先做「配偶者に関する届出」（义务，但和能否取得定住者是两件事）。具体能不能转，建议带婚姻、离婚、子女、收入、在留文书咨询有「離婚定住」经验的行政書士。',
    confidence: 'medium',
    source_article_ids: [],
    llm_attempted: false,
    fallback_reason: 'deterministic_safe_fallback',
    fallback_from: 'llm-answer-v0',
  }
}

// Build a generic safe fallback envelope when the legacy seed swallow
// gate trips and no specific deterministic pattern applies. The result
// is always answer_with_assumptions or clarification_needed — never
// direct_answer — and never carries the legacy answer's content.
export function genericSafeFallbackEnvelope(input: {
  questionText: string
  intent: AnswerIntent
  scope: ScopeResult
  reason: FallbackReason
}): LlmAnswerEnvelope {
  const understood = describeIntent(input.intent, input.questionText)
  const domain: SupportedDomain = input.scope.domain

  return {
    engine_version: 'safe-fallback-v0-1',
    answer_mode: 'clarification_needed',
    domain,
    understood_question: understood,
    short_answer: '这个问题需要先确认几个关键事实，TEBIQ 才能给出具体路径。当前找不到与你的问题完全匹配的整理，避免用相邻话题的答案误导你，所以先列出确认项。',
    assumptions: [],
    key_missing_info: defaultClarifyForDomain(domain, input.questionText),
    next_actions: [],
    materials: [],
    deadline: '',
    where_to_go: '',
    risks: [],
    expert_checkpoints: [],
    source_notes: [],
    copy_text: '这个问题先要确认几件事 TEBIQ 才能给出具体路径，避免把相邻话题的答案套到你的情况上。',
    confidence: 'low',
    source_article_ids: [],
    llm_attempted: false,
    fallback_reason: input.reason,
    fallback_from: 'llm-answer-v0',
  }
}

function defaultClarifyForDomain(domain: SupportedDomain, _questionText: string): LlmAnswerEnvelope['key_missing_info'] {
  if (domain === 'long_term_resident') {
    return [
      { field: 'current_visa', question: '你目前的在留资格是哪一种？（家族滞在 / 配偶者 / 永住者の配偶者 / 其他）', why_it_matters: '不同起点路径不同。' },
      { field: 'reason', question: '你想转定住者的具体原因是什么？（离婚 / 长期在日 / 子女 / 其他）', why_it_matters: '「定住者」有多条事由，每条要看的事实不同。' },
      { field: 'years_in_japan', question: '你已经在日本住了多少年？', why_it_matters: '在日年数是审查的重点之一。' },
      { field: 'residence_remaining', question: '当前在留期限还剩多久？', why_it_matters: '决定要不要先更新再变更。' },
    ]
  }
  if (domain === 'business_manager') {
    return [
      { field: 'stage', question: '是新申请、续签、还是变更到经管？', why_it_matters: '三种申请要看的材料和事实不同。' },
      { field: 'company_status', question: '公司的状态：是否已设立？资本金多少？是否有事業所、雇佣？', why_it_matters: '经管申请的核心是事業実態。' },
      { field: 'residence_remaining', question: '当前在留期限还剩多久？', why_it_matters: '续签 / 变更的窗口取决于此。' },
    ]
  }
  if (domain === 'family_stay') {
    return [
      { field: 'sponsor', question: '主签证持有人（家族滞在的「本人」）是谁？什么在留资格？', why_it_matters: '家族滞在的稳定性取决于主签证。' },
      { field: 'event', question: '你想办的是哪一件事？（首次申请 / 续签 / 变更 / 资格外活动 / 其他）', why_it_matters: '完全不同路径。' },
    ]
  }
  if (domain === 'permanent_resident') {
    return [
      { field: 'current_visa', question: '你目前的在留资格是哪一种？在日累计多少年？', why_it_matters: '永住申请年数门槛因身份不同而不同。' },
      { field: 'public_obligations', question: '年金 / 健保 / 住民税 是否全部按时缴纳？是否有过欠缴 / 滞纳记录？', why_it_matters: '永住审查对公的义务履行非常严格。' },
    ]
  }
  if (domain === 'gijinkoku') {
    return [
      { field: 'event', question: '你想办的是哪一件事？（变更到技人国 / 续签技人国 / 换工作 / 不许可 / 其他）', why_it_matters: '不同事项路径不同。' },
      { field: 'job_match', question: '岗位的业务内容、你的学历或职歴，能否构成技人国 該当性？', why_it_matters: '技人国的核心是岗位与本人能力的匹配。' },
    ]
  }
  return [
    { field: 'visa_type', question: '你目前持有哪种在留资格？', why_it_matters: '当前 v0 只支持五类在留：技人国 / 经营管理 / 家族滞在 / 永住 / 定住者。' },
    { field: 'event', question: '你想办的是哪一件事？', why_it_matters: '不同事项路径不同。' },
  ]
}
