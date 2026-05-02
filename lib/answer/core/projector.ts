import type {
  AnswerSource,
  DetectedIntent,
  PublicAnswer,
  PublicAnswerStatus,
  SupportedDomain,
} from './types'
import { ANSWER_CORE_DISCLAIMER, SUPPORTED_DOMAIN_LABELS } from './types'

// projectLegacyToPublicAnswer
//
// Single function that turns an AnswerSource into a PublicAnswer.
// The PublicAnswer is the ONLY thing that lands on user screens.
//
// Routing logic:
//   domain === 'unknown'              → out_of_scope
//   source.kind === 'none'            → clarification_needed
//   source.kind === 'rule_based'      → preliminary
//   source.kind === 'legacy_seed'
//     legacy_review_status='intent_unclear'   → clarification_needed
//     legacy_answer_type='cannot_determine'   → clarification_needed
//     legacy_answer_type='matched'            → answered
//     else (draft / unreviewed)                → preliminary
//
// Rule of thumb: when in doubt, drop a level. preliminary is much
// safer than answered, and clarification is much safer than preliminary.

export interface ProjectInput {
  source: AnswerSource
  detectedIntent: DetectedIntent
  domain: SupportedDomain
  questionText: string
}

export function projectLegacyToPublicAnswer(input: ProjectInput): PublicAnswer {
  const status = decideStatus(input)
  switch (status) {
    case 'answered':
      return finalize(buildAnswered(input))
    case 'preliminary':
      return finalize(buildPreliminary(input))
    case 'clarification_needed':
      return finalize(buildClarification(input))
    case 'out_of_scope':
      return finalize(buildOutOfScope(input))
  }
}

// Build a clarification-only PublicAnswer to swap in when the safety
// gate rejects the original. The replacement explicitly references
// the user's question + scope so they don't see a dead-end blank.
export function buildSafeClarificationReplacement(input: {
  domain: SupportedDomain
  detectedIntent: DetectedIntent
  questionText: string
  reason: string
}): PublicAnswer {
  return finalize({
    status: 'clarification_needed',
    domain: input.domain,
    title: clarificationTitle(input.domain),
    summary: '原本匹配到的整理与你的问题不完全一致，TEBIQ 已替换为安全澄清版。请补充以下事实，再给具体路径。',
    conclusion: '需要先确认几个关键事实，才能给你对应的路径。',
    sections: [
      { heading: '需要先确认', body: defaultClarificationBody(input.domain).join('\n') },
    ],
    next_steps: defaultClarificationBody(input.domain),
    risk_warnings: [],
    clarification_questions: defaultClarificationBody(input.domain),
    documents_needed: [],
    consult_trigger: null,
    disclaimer: ANSWER_CORE_DISCLAIMER,
  })
}

// ----- decideStatus -----------------------------------------------------

function decideStatus(input: ProjectInput): PublicAnswerStatus {
  if (input.domain === 'unknown') return 'out_of_scope'
  if (input.source.kind === 'none') return 'clarification_needed'

  const reviewStatus = input.source.legacy_review_status ?? ''
  const answerType = input.source.legacy_answer_type ?? ''
  if (reviewStatus === 'intent_unclear' || answerType === 'cannot_determine') {
    return 'clarification_needed'
  }
  if (input.source.kind === 'legacy_seed' && answerType === 'matched') {
    return 'answered'
  }
  // legacy_seed with draft / rule_based with full content / etc.
  return 'preliminary'
}

// ----- builders ---------------------------------------------------------

function buildAnswered(input: ProjectInput): Omit<PublicAnswer, 'visible_text'> {
  const { source, domain } = input
  const conclusion = scrub(source.legacy_conclusion ?? source.legacy_summary ?? '') || '我先按已知信息整理一个方向。'
  return {
    status: 'answered',
    domain,
    title: domainTitle(domain, source.legacy_title) || conclusion,
    summary: pickFirstSentence(conclusion),
    conclusion,
    sections: buildAnsweredSections(source),
    next_steps: limit(source.legacy_what_to_do ?? source.legacy_next_steps ?? [], 5).map(scrub).filter(Boolean),
    risk_warnings: limit(source.legacy_consequences ?? [], 4).map(scrub).filter(Boolean),
    clarification_questions: [],
    documents_needed: limit(source.legacy_documents_needed ?? [], 8).map(scrub).filter(Boolean),
    consult_trigger: pickConsultTrigger(source),
    disclaimer: ANSWER_CORE_DISCLAIMER,
  }
}

function buildPreliminary(input: ProjectInput): Omit<PublicAnswer, 'visible_text'> {
  const { source, domain } = input
  const conclusion = scrub(source.legacy_conclusion ?? source.legacy_summary ?? '') || '我先按已知信息整理一个方向。'

  const sections = source.legacy_sections && source.legacy_sections.length > 0
    ? source.legacy_sections.map(s => ({ heading: scrub(s.heading), body: scrub(s.body) })).filter(s => s.heading && s.body)
    : buildAnsweredSections(source)

  return {
    status: 'preliminary',
    domain,
    title: '初步整理：' + (domainTitle(domain, source.legacy_title) || pickFirstSentence(conclusion)),
    summary: pickFirstSentence(conclusion),
    conclusion,
    sections,
    next_steps: limit(source.legacy_what_to_do ?? source.legacy_next_steps ?? [], 4).map(scrub).filter(Boolean),
    risk_warnings: limit(source.legacy_consequences ?? [], 4).map(scrub).filter(Boolean),
    clarification_questions: [],
    documents_needed: limit(source.legacy_documents_needed ?? [], 6).map(scrub).filter(Boolean),
    consult_trigger: pickConsultTrigger(source),
    disclaimer: ANSWER_CORE_DISCLAIMER,
  }
}

function buildClarification(input: ProjectInput): Omit<PublicAnswer, 'visible_text'> {
  const { source, detectedIntent, domain } = input

  // If the source has specific clarification content (e.g. legacy
  // ruleBasedAnswerForIntent returned cannot_determine for 代表者変更
  // with a 3-question 需要先確認 list), prefer those. Otherwise fall
  // back to the V1 domain-specific defaults.
  const sourceQuestions = (source.legacy_next_steps ?? [])
    .map(scrub)
    .filter(s => s.length > 0 && s.length < 200)
  const specific = sourceQuestions.length >= 2
  const questions = specific ? sourceQuestions.slice(0, 5) : defaultClarificationBody(domain)
  const sourceSummary = scrub(source.legacy_summary ?? '')
  const sourceConclusion = scrub(source.legacy_conclusion ?? '')
  const summaryBody = specific && sourceSummary
    ? sourceSummary
    : '需要先确认几个关键事实，TEBIQ 才能给出具体路径。' + (
      domain !== 'unknown' ? ` 这是关于「${SUPPORTED_DOMAIN_LABELS[domain]}」的问题。` : ''
    )
  const conclusionBody = specific && sourceConclusion
    ? sourceConclusion
    : '需要先确认几个关键事实，才能给你对应的路径。'

  return {
    status: 'clarification_needed',
    domain,
    title: specific && source.legacy_title
      ? domainTitle(domain, source.legacy_title) || clarificationTitle(domain)
      : clarificationTitle(domain),
    summary: summaryBody,
    conclusion: conclusionBody,
    sections: [
      { heading: '我理解你的问题是', body: detectedIntent.understood_question },
      { heading: '需要先确认', body: questions.map((q, i) => `${i + 1}. ${q}`).join('\n') },
    ],
    next_steps: questions,
    risk_warnings: [],
    clarification_questions: questions,
    documents_needed: [],
    consult_trigger: null,
    disclaimer: ANSWER_CORE_DISCLAIMER,
  }
}

function buildOutOfScope(input: ProjectInput): Omit<PublicAnswer, 'visible_text'> {
  const { detectedIntent, questionText } = input
  const topic = detectAmbiguousTopic(questionText)
  if (topic) {
    return {
      status: 'out_of_scope',
      domain: 'unknown',
      title: '这个问题先具体一下，TEBIQ 才能给路径',
      summary: topic.summary,
      conclusion: topic.summary,
      sections: [
        { heading: '我理解你的问题是', body: detectedIntent.understood_question },
        { heading: '请具体说明', body: topic.questions.map((q, i) => `${i + 1}. ${q}`).join('\n') },
      ],
      next_steps: topic.questions,
      risk_warnings: [],
      clarification_questions: topic.questions,
      documents_needed: [],
      consult_trigger: null,
      disclaimer: ANSWER_CORE_DISCLAIMER,
    }
  }

  return {
    status: 'out_of_scope',
    domain: 'unknown',
    title: '这个问题暂时不在 TEBIQ v1 支持范围内',
    summary: '当前 TEBIQ 主线只支持五类在留：技人国 / 人文签、经营管理、家族滞在、永住、定住者。请补充你的在留资格和具体事项。',
    conclusion: '当前 TEBIQ 主线只支持五类在留。请补充你的在留资格和具体事项。',
    sections: [
      { heading: '我理解你的问题是', body: detectedIntent.understood_question },
      {
        heading: '请补充',
        body: [
          '· 你想问的是哪一类在留资格？技人国 / 经营管理 / 家族滞在 / 永住 / 定住者？',
          '· 你想办的是哪一件事？续签、变更、申请、补资料、家属、办公室、其它？',
        ].join('\n'),
      },
    ],
    next_steps: [
      '你想问的是哪一类在留资格？技人国 / 经营管理 / 家族滞在 / 永住 / 定住者？',
      '你想办的是哪一件事？续签、变更、申请、补资料、家属、办公室、其它？',
    ],
    risk_warnings: [],
    clarification_questions: [
      '你想问的是哪一类在留资格？',
      '你想办的是哪一件事？',
    ],
    documents_needed: [],
    consult_trigger: null,
    disclaimer: ANSWER_CORE_DISCLAIMER,
  }
}

// ----- helpers ----------------------------------------------------------

function buildAnsweredSections(source: AnswerSource): PublicAnswer['sections'] {
  const sections: PublicAnswer['sections'] = []
  const conclusion = scrub(source.legacy_conclusion ?? source.legacy_summary ?? '')
  if (conclusion) sections.push({ heading: '结论', body: conclusion })

  const next = source.legacy_what_to_do ?? source.legacy_next_steps ?? []
  if (next.length > 0) {
    const detail = source.legacy_how_to_do ?? []
    sections.push({
      heading: '下一步',
      body: limit(next, 5).map((title, i) => {
        const d = detail[i]
        return d ? `${i + 1}. ${scrub(title)}\n${scrub(d)}` : `${i + 1}. ${scrub(title)}`
      }).join('\n'),
    })
  }

  const docs = source.legacy_documents_needed ?? []
  if (docs.length > 0) {
    sections.push({ heading: '需要材料', body: limit(docs, 8).map(d => `· ${scrub(d)}`).join('\n') })
  }

  const deadline = source.legacy_deadline_or_timing ?? []
  if (deadline.length > 0) {
    sections.push({ heading: '期限和时机', body: deadline.map(scrub).filter(Boolean).join('\n') })
  }

  const where = source.legacy_where_to_go ?? []
  if (where.length > 0) {
    sections.push({ heading: '办理窗口', body: where.map(scrub).filter(Boolean).join(' / ') })
  }

  const risks = source.legacy_consequences ?? []
  if (risks.length > 0) {
    sections.push({ heading: '不做会怎样', body: risks.map(r => `· ${scrub(r)}`).join('\n') })
  }

  const expert = source.legacy_expert_handoff ?? []
  if (expert.length > 0) {
    sections.push({ heading: '什么情况下要找专家', body: expert.map(e => `· ${scrub(e)}`).join('\n') })
  }

  return sections.filter(s => s.heading && s.body)
}

function defaultClarificationBody(domain: SupportedDomain): string[] {
  if (domain === 'long_term_resident') {
    return [
      '你目前的在留资格是哪一种？（家族滞在 / 配偶者 / 永住者の配偶者 / 其他）',
      '你想转定住者的具体原因是什么？（离婚 / 长期在日 / 子女 / 其他）',
      '你已经在日本住了多少年？',
      '当前在留期限还剩多久？',
    ]
  }
  if (domain === 'business_manager') {
    return [
      '是新申请、续签、还是变更到经管？',
      '公司的状态：是否已设立？资本金多少？是否有事業所、雇佣？',
      '当前在留期限还剩多久？',
      '是否已收到入管的文书或窗口指示？',
    ]
  }
  if (domain === 'family_stay') {
    return [
      '主签证持有人（家族滞在的「本人」）是谁？什么在留资格？',
      '你想办的是哪一件事？（首次申请 / 续签 / 变更 / 资格外活动 / 其他）',
      '是否涉及配偶或子女的具体情况？',
    ]
  }
  if (domain === 'permanent_resident') {
    return [
      '你目前的在留资格是哪一种？在日累计多少年？',
      '年金 / 健保 / 住民税 是否全部按时缴纳？是否有过欠缴 / 滞纳记录？',
      '你目前是稳定就业还是自营？',
      '是否已经收到官方通知或有不利记录？',
    ]
  }
  if (domain === 'gijinkoku') {
    return [
      '你想办的是哪一件事？（变更到技人国 / 续签技人国 / 换工作 / 不许可 / 其他）',
      '岗位的业务内容、你的学历或职歴，能否构成技人国 該当性？',
      '当前在留期限还剩多久？',
      '是否已经收到入管文书或窗口指示？',
    ]
  }
  return [
    '你目前持有哪种在留资格？',
    '你想办的是哪一件事？',
    '事情发生日期或截止日期是什么？',
    '是否已收到官方文书或有逾期记录？',
  ]
}

function clarificationTitle(domain: SupportedDomain): string {
  if (domain === 'unknown') {
    return '这个问题先确认几件事，TEBIQ 再给具体方向'
  }
  return `关于${SUPPORTED_DOMAIN_LABELS[domain]}：先确认几件事，TEBIQ 再给具体方向`
}

function domainTitle(domain: SupportedDomain, legacyTitle: string | undefined): string {
  const t = scrub(legacyTitle ?? '')
  if (!t) return ''
  if (domain === 'unknown') return t
  // If the legacy title already names the domain, use as-is. Otherwise
  // prepend a domain label so the user sees the relevant track.
  const mention: Record<SupportedDomain, RegExp> = {
    gijinkoku: /(技人国|技術人文|国際業務|人文)/,
    business_manager: /(经营管理|経営管理|経営・管理|经管)/,
    family_stay: /家族滞在/,
    permanent_resident: /(永住|永住者)/,
    long_term_resident: /(定住|定住者)/,
    unknown: /^$/,
  }
  if (mention[domain].test(t)) return t
  return `关于${SUPPORTED_DOMAIN_LABELS[domain]}：${t}`
}

function pickConsultTrigger(source: AnswerSource): string | null {
  const expert = source.legacy_expert_handoff ?? []
  return expert.length > 0 ? scrub(expert[0]) : null
}

interface AmbiguousTopic { summary: string; questions: string[] }

function detectAmbiguousTopic(questionText: string): AmbiguousTopic | null {
  const isPensionInsurance = /(厚生年金|国民年金|健康保険|健保|国保|社会保険|社会保险|社保)/.test(questionText)
  const asksDeadline = /(截止日期|期限|何时|什么时候|多久|多少天|几天|何日|期日|締切)/.test(questionText)
  const hasVisaContext = /(技人国|人文签|经营管理|経営管理|经管|家族滞在|永住|定住者|定住|在留|入管|续签|更新|変更|不许可)/.test(questionText)

  if (isPensionInsurance && asksDeadline && !hasVisaContext) {
    return {
      summary: '「年金 / 健保的截止日期」要看是公司加入手续、个人保险料缴纳、离职退保切换，还是永住申请的纳付记录——不同期限相互独立，请先告诉 TEBIQ 是哪一种。',
      questions: [
        '你想问的是哪一种期限？(1) 公司加入厚生年金的手续期限 (2) 每月保险料缴纳期限 (3) 离职 / 退保后切换国民年金的期限 (4) 永住申请用的年金缴纳记录期限',
        '是公司角度（雇主）还是个人角度（员工 / 自营）在问？',
        '你目前的在留资格是哪一种？（这关系到要不要把年金记录用于永住或更新）',
      ],
    }
  }
  return null
}

// ----- text helpers -----------------------------------------------------

// Replace literal "unknown" / "null" / "undefined" / "未知" in any
// piece of text the projector pulls from a legacy field. Empty/blank
// inputs return ''.
function scrub(value: string | null | undefined): string {
  if (!value) return ''
  let out = value.trim()
  if (!out) return ''
  out = out.replace(/(\b(?:unknown|null|undefined)\b|未定义|未知)/gi, '')
  out = out.replace(/从\s*「\s*」\s*转为\s*「\s*」/g, '')
  out = out.replace(/\s+/g, ' ').trim()
  return out
}

function pickFirstSentence(text: string): string {
  if (!text) return ''
  const m = text.split(/(?<=[。！？!?])\s+/)[0] ?? text
  return m.trim()
}

function limit<T>(arr: T[], n: number): T[] { return arr.slice(0, n) }

// finalize attaches the visible_text field, computed once over every
// rendered field. The safety gate uses this directly.
function finalize(p: Omit<PublicAnswer, 'visible_text'>): PublicAnswer {
  return { ...p, visible_text: collectVisibleTextRaw(p) }
}

function collectVisibleTextRaw(p: Omit<PublicAnswer, 'visible_text'>): string {
  const parts: string[] = [
    p.title,
    p.summary,
    p.conclusion,
    ...p.sections.flatMap(s => [s.heading, s.body]),
    ...p.next_steps,
    ...p.risk_warnings,
    ...p.clarification_questions,
    ...p.documents_needed,
    p.consult_trigger ?? '',
    p.disclaimer,
  ]
  return parts.filter(Boolean).join('\n')
}
