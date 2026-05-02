import type { AnswerIntent } from './intent-router'
import {
  ANSWER_BOUNDARY_NOTE,
  type ActionAnswer,
  type AnswerLink,
  type AnswerResult,
  type AnswerSection,
  type AnswerSource,
  type LlmAnswerEnvelope,
  type SupportedDomain,
} from './types'

// v0.2 — envelope-first answer surface projector.
//
// Every user-visible field in AnswerResult must be derived from the
// LlmAnswerEnvelope, never copied from the legacy `buildAnswer` output.
// The legacy answer is only consulted for non-user-visible passthrough
// (matched_card_id, matched_seed_id, intent, intent_summary) so admin
// dashboards and analytics keep working.
//
// Each answer_mode produces a different shape:
//
//   direct_answer            full action card driven entirely by envelope
//   answer_with_assumptions  short answer + assumptions + next actions only,
//                            sections list assumptions + key_missing_info,
//                            no full template
//   clarification_needed     only key_missing_info; action_answer fields
//                            (where_to_go, materials, deadline, etc) all
//                            empty so the renderer hides them
//   out_of_scope             scope explanation + key_missing_info; no
//                            action_answer fields surface

const SUPPORTED_DOMAIN_LABELS: Record<SupportedDomain, string> = {
  gijinkoku: '技人国 / 人文签',
  business_manager: '经营管理',
  family_stay: '家族滞在',
  permanent_resident: '永住',
  long_term_resident: '定住者',
  unknown: '在留资格',
}

// Pattern that detects whether a piece of text already mentions a
// supported domain. Used to decide whether to inject domain context
// into a title that would otherwise be domain-blind.
const DOMAIN_MENTION_PATTERN: Record<SupportedDomain, RegExp> = {
  gijinkoku: /(技人国|人文|技術・人文|国際業務|gijinkoku)/i,
  business_manager: /(经营管理|経営管理|経営・管理|经管|管理签|管理ビザ)/,
  family_stay: /家族滞在/,
  permanent_resident: /(永住|永住权|永住権|永住者)/,
  long_term_resident: /(定住|定住者|定住資格)/,
  unknown: /^$/,
}

interface ProjectInput {
  envelope: LlmAnswerEnvelope
  legacyAnswer: AnswerResult
  intent: AnswerIntent
  questionText: string
}

// Returns the user-visible AnswerResult fields. The caller is
// responsible for merging in the non-user-visible passthrough fields
// (query_id, answer_id, saved, intent, etc).
export function projectEnvelopeToPublicAnswer(input: ProjectInput): AnswerResult {
  const { envelope, legacyAnswer } = input
  const safeUnderstood = scrubUnknown(envelope.understood_question, '我先理清楚你的问题')

  switch (envelope.answer_mode) {
    case 'direct_answer':
      return projectDirect(input, safeUnderstood)
    case 'answer_with_assumptions':
      return projectAssumptions(input, safeUnderstood)
    case 'clarification_needed':
      return projectClarification(input, safeUnderstood)
    case 'out_of_scope':
      return projectOutOfScope(input, safeUnderstood)
    default:
      // Unreachable per type, but provide a safe path.
      return projectClarification(input, safeUnderstood)
  }

  // legacyAnswer is intentionally NOT spread anywhere. Keep this
  // referenced once so the type checker keeps the input around for
  // future extensions (e.g. domain-specific copy fallbacks) without
  // making the projector implicitly accept legacy content into the
  // user-visible surface.
  void legacyAnswer
}

// ----- direct_answer -----------------------------------------------------

function projectDirect(input: ProjectInput, understood: string): AnswerResult {
  const { envelope } = input
  const action = buildActionAnswer(envelope, { mode: 'direct_answer' })
  const sections = buildDirectSections(envelope)

  return scaffold(input, {
    answer_type: 'matched',
    answer_level: 'L2',
    review_status: envelope.confidence === 'high' ? 'reviewed' : 'unreviewed',
    title: enrichWithDomain(directTitle(envelope, understood), envelope.domain, envelope.short_answer),
    summary: enrichWithDomain(
      pickFirstSentence(envelope.short_answer) || understood,
      envelope.domain,
      envelope.short_answer,
    ),
    sections,
    next_steps: envelope.next_actions.map(a => a.title).filter(Boolean).slice(0, 5),
    action_answer: action,
    intent_summary: understood,
  })
}

function projectAssumptions(input: ProjectInput, understood: string): AnswerResult {
  const { envelope } = input
  const action = buildActionAnswer(envelope, { mode: 'answer_with_assumptions' })
  const sections = buildAssumptionSections(envelope)

  return scaffold(input, {
    answer_type: 'draft',
    answer_level: 'L2',
    review_status: 'unreviewed',
    title: enrichWithDomain(assumptionTitle(envelope, understood), envelope.domain, envelope.short_answer),
    summary: enrichWithDomain(
      pickFirstSentence(envelope.short_answer) || understood,
      envelope.domain,
      envelope.short_answer,
    ),
    sections,
    next_steps: envelope.next_actions.map(a => a.title).filter(Boolean).slice(0, 5),
    action_answer: action,
    intent_summary: understood,
  })
}

function projectClarification(input: ProjectInput, understood: string): AnswerResult {
  const { envelope } = input
  const sections = buildClarificationSections(envelope)
  const next_steps = envelope.key_missing_info
    .map(info => info.question.trim())
    .filter(Boolean)
    .slice(0, 5)

  return scaffold(input, {
    answer_type: 'cannot_determine',
    answer_level: 'L4',
    review_status: 'intent_unclear',
    title: clarificationTitle(envelope, understood),
    summary: clarificationSummary(envelope, understood),
    sections,
    next_steps: next_steps.length ? next_steps : ['请补充你的在留资格、事情发生日期，以及希望办的具体手续。'],
    // Critical: action_answer must be EMPTY so the renderer hides
    // 最紧的两件 / 步骤 / 期限 / 不做会怎样 / 要找专家.
    action_answer: emptyActionAnswer(envelope.short_answer),
    intent_summary: understood,
  })
}

function projectOutOfScope(input: ProjectInput, understood: string): AnswerResult {
  const { envelope } = input
  const sections: AnswerSection[] = [
    {
      heading: '当前支持范围',
      body: scrubUnknown(envelope.short_answer, '当前 TEBIQ v0 主线只支持五类在留：技人国 / 人文签、经营管理、家族滞在、永住、定住者。'),
    },
  ]
  if (envelope.key_missing_info.length > 0) {
    sections.push({
      heading: '请补充',
      body: envelope.key_missing_info.map(info => `· ${info.question}`).join('\n'),
    })
  }

  return scaffold(input, {
    answer_type: 'cannot_determine',
    answer_level: 'L4',
    review_status: 'intent_unclear',
    title: '这个问题暂时不在 TEBIQ v0 支持范围内',
    summary: scrubUnknown(envelope.short_answer, '当前 TEBIQ v0 主线只支持五类在留。请补充你的在留资格和具体事项。'),
    sections,
    next_steps: envelope.key_missing_info.map(info => info.question).slice(0, 4),
    action_answer: emptyActionAnswer(envelope.short_answer),
    intent_summary: understood,
  })
}

// ----- helpers -----------------------------------------------------------

interface ScaffoldInput {
  answer_type: AnswerResult['answer_type']
  answer_level: AnswerResult['answer_level']
  review_status: AnswerResult['review_status']
  title: string
  summary: string
  sections: AnswerSection[]
  next_steps: string[]
  action_answer: ActionAnswer
  intent_summary: string
}

function scaffold(input: ProjectInput, fields: ScaffoldInput): AnswerResult {
  const { envelope, legacyAnswer } = input
  // related_links + sources come from envelope.source_notes when
  // available; otherwise empty. Legacy related_links are NOT copied —
  // they could carry seed-specific URLs that don't match the projected
  // content.
  const sources: AnswerSource[] = envelope.source_notes
    .filter(Boolean)
    .map(title => ({ title, source_grade: 'B' }))
    .slice(0, 6)
  const related_links: AnswerLink[] = []

  return {
    ok: true,
    answer_type: fields.answer_type,
    answer_level: fields.answer_level,
    review_status: fields.review_status,
    title: clipTitle(fields.title),
    summary: fields.summary,
    sections: fields.sections,
    next_steps: fields.next_steps,
    related_links,
    sources,
    query_id: legacyAnswer.query_id,
    answer_id: legacyAnswer.answer_id,
    matched_card_id: legacyAnswer.matched_card_id ?? null,
    matched_seed_id: legacyAnswer.matched_seed_id ?? null,
    intent_guard_pass: legacyAnswer.intent_guard_pass,
    intent: legacyAnswer.intent,
    intent_summary: fields.intent_summary,
    preferred_template: legacyAnswer.preferred_template,
    saved: legacyAnswer.saved,
    boundary_note: ANSWER_BOUNDARY_NOTE,
    first_screen_answer: envelope.short_answer || null,
    why_not_simple_answer: null,
    expert_handoff: null,
    action_answer: fields.action_answer,
    llm_envelope: envelope,
  }
}

function buildActionAnswer(envelope: LlmAnswerEnvelope, opts: { mode: 'direct_answer' | 'answer_with_assumptions' }): ActionAnswer {
  const next = envelope.next_actions
    .map(a => a.title)
    .filter(Boolean)
  const detail = envelope.next_actions
    .map(a => a.detail)
    .filter(Boolean)

  return {
    conclusion: scrubUnknown(envelope.short_answer, '我先按已知信息整理一个方向。'),
    what_to_do: opts.mode === 'answer_with_assumptions' ? next.slice(0, 4) : next.slice(0, 6),
    how_to_do: detail.slice(0, 5),
    where_to_go: splitList(envelope.where_to_go).slice(0, 6),
    documents_needed: envelope.materials.filter(Boolean).slice(0, 8),
    deadline_or_timing: splitList(envelope.deadline).slice(0, 5),
    consequences: envelope.risks.filter(Boolean).slice(0, 5),
    expert_handoff: envelope.expert_checkpoints.filter(Boolean).slice(0, 5),
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function emptyActionAnswer(shortAnswer: string): ActionAnswer {
  // We keep `conclusion` populated so admin/analytics still has
  // something to log, but every list field is empty so the renderer
  // (which guards on `.length > 0`) hides every section.
  return {
    conclusion: scrubUnknown(shortAnswer, '需要先确认几个关键事实。'),
    what_to_do: [],
    how_to_do: [],
    where_to_go: [],
    documents_needed: [],
    deadline_or_timing: [],
    consequences: [],
    expert_handoff: [],
    boundary_note: ANSWER_BOUNDARY_NOTE,
  }
}

function buildDirectSections(envelope: LlmAnswerEnvelope): AnswerSection[] {
  const sections: AnswerSection[] = []
  if (envelope.short_answer) {
    sections.push({ heading: '结论', body: envelope.short_answer })
  }
  if (envelope.next_actions.length > 0) {
    sections.push({
      heading: '下一步',
      body: envelope.next_actions
        .slice(0, 5)
        .map((a, i) => `${i + 1}. ${a.title}${a.detail ? `\n${a.detail}` : ''}`)
        .join('\n'),
    })
  }
  if (envelope.materials.length > 0) {
    sections.push({ heading: '需要材料', body: envelope.materials.slice(0, 8).map(m => `· ${m}`).join('\n') })
  }
  if (envelope.deadline) {
    sections.push({ heading: '期限和时机', body: envelope.deadline })
  }
  if (envelope.where_to_go) {
    sections.push({ heading: '办理窗口', body: envelope.where_to_go })
  }
  if (envelope.risks.length > 0) {
    sections.push({ heading: '不做会怎样', body: envelope.risks.map(r => `· ${r}`).join('\n') })
  }
  if (envelope.expert_checkpoints.length > 0) {
    sections.push({ heading: '什么情况下要找专家', body: envelope.expert_checkpoints.map(e => `· ${e}`).join('\n') })
  }
  return sections
}

function buildAssumptionSections(envelope: LlmAnswerEnvelope): AnswerSection[] {
  const sections: AnswerSection[] = []
  if (envelope.assumptions.length > 0) {
    sections.push({
      heading: '我先按这些假设整理',
      body: envelope.assumptions.map(a => `· ${a}`).join('\n'),
    })
  }
  if (envelope.short_answer) {
    sections.push({ heading: '初步答案', body: envelope.short_answer })
  }
  if (envelope.next_actions.length > 0) {
    sections.push({
      heading: '下一步',
      body: envelope.next_actions
        .slice(0, 4)
        .map((a, i) => `${i + 1}. ${a.title}${a.detail ? `\n${a.detail}` : ''}`)
        .join('\n'),
    })
  }
  if (envelope.key_missing_info.length > 0) {
    sections.push({
      heading: '还需要确认',
      body: envelope.key_missing_info
        .slice(0, 4)
        .map(info => `· ${info.question}${info.why_it_matters ? `（${info.why_it_matters}）` : ''}`)
        .join('\n'),
    })
  }
  return sections
}

function buildClarificationSections(envelope: LlmAnswerEnvelope): AnswerSection[] {
  const items = envelope.key_missing_info.length > 0
    ? envelope.key_missing_info
    : [{ field: 'context', question: '请补充你的在留资格、事情发生日期、是否已收到官方文书。', why_it_matters: '不同前提下手续路径完全不同。' }]

  return [
    {
      heading: '需要先确认',
      body: items.map((info, i) => `${i + 1}. ${info.question}${info.why_it_matters ? `\n   （${info.why_it_matters}）` : ''}`).join('\n'),
    },
  ]
}

// ---- text helpers ------------------------------------------------------

// Replace literal 'unknown', 'null', 'undefined', and the "从「unknown」
// 转为「unknown」" idiom that appears when intent fields leak through.
function scrubUnknown(value: string | null | undefined, fallback: string): string {
  const raw = (value ?? '').trim()
  if (!raw) return fallback
  // Reject literal markers — anywhere in the string.
  if (/(\b(?:unknown|null|undefined)\b|未定义|未知)/i.test(raw)) {
    return fallback
  }
  if (/从\s*「\s*unknown\s*」\s*转为\s*「\s*unknown\s*」/i.test(raw)) {
    return fallback
  }
  // The legacy `buildUnderstoodAs` produced "从「X」转为「Y」需要..." —
  // when X or Y is empty / missing we get spurious 「」. Reject too.
  if (/从\s*「\s*」\s*转为\s*「\s*」/.test(raw)) {
    return fallback
  }
  return raw
}

function pickFirstSentence(text: string): string {
  if (!text) return ''
  const match = text.split(/(?<=[。！？!?])\s+/)[0]
  return (match ?? text).trim()
}

function splitList(value: string): string[] {
  if (!value) return []
  return value
    .split(/[／/，,；;]\s*/)
    .map(s => s.trim())
    .filter(Boolean)
}

function clipTitle(title: string): string {
  const cleaned = title.trim().replace(/\s+/g, ' ')
  return cleaned.length <= 80 ? cleaned : `${cleaned.slice(0, 79)}…`
}

function directTitle(envelope: LlmAnswerEnvelope, understood: string): string {
  // Prefer a one-sentence summary derived from the short_answer. Falls
  // back to the understood-question or the supported-domain label.
  const short = pickFirstSentence(scrubUnknown(envelope.short_answer, ''))
  if (short && short.length >= 12) return short
  if (understood && understood.length >= 8) return understood
  const label = SUPPORTED_DOMAIN_LABELS[envelope.domain]
  return `关于${label}的整理`
}

function assumptionTitle(envelope: LlmAnswerEnvelope, understood: string): string {
  const short = pickFirstSentence(scrubUnknown(envelope.short_answer, ''))
  if (short && short.length >= 12) return `初步整理：${short}`
  if (understood && understood.length >= 8) return `初步整理：${understood}`
  return '初步整理（需要先核对几个事实）'
}

function clarificationTitle(envelope: LlmAnswerEnvelope, understood: string): string {
  const domain = envelope.domain
  const label = SUPPORTED_DOMAIN_LABELS[domain]
  if (domain !== 'unknown' && !DOMAIN_MENTION_PATTERN[domain].test(understood)) {
    return `关于${label}：先确认几件事，TEBIQ 再给具体方向`
  }
  if (domain !== 'unknown') {
    return `关于${label}：先确认几件事，TEBIQ 再给具体方向`
  }
  return '这个问题先确认几件事，TEBIQ 再给具体方向'
}

function clarificationSummary(envelope: LlmAnswerEnvelope, understood: string): string {
  const domain = envelope.domain
  const base = scrubUnknown(envelope.short_answer, '需要先确认几个关键事实，TEBIQ 才能给出具体路径。')
  if (domain !== 'unknown') {
    const label = SUPPORTED_DOMAIN_LABELS[domain]
    if (!DOMAIN_MENTION_PATTERN[domain].test(base) && !DOMAIN_MENTION_PATTERN[domain].test(understood)) {
      return `${base} 这是关于「${label}」的问题，但还需要先确认几个事实。`
    }
  }
  return base
}

// If `text` is set and the envelope has a non-unknown domain, but
// `text` doesn't already mention that domain, prepend "关于{label}：".
// This avoids domain-blind titles like "找接收公司..." that hide the
// fact the question was about 经营管理.
function enrichWithDomain(text: string, domain: SupportedDomain, contextText: string): string {
  if (!text) return text
  if (domain === 'unknown') return text
  if (DOMAIN_MENTION_PATTERN[domain].test(text)) return text
  if (DOMAIN_MENTION_PATTERN[domain].test(contextText)) {
    // Domain mention exists in context but not in this short variant.
    // Prepend.
    return `关于${SUPPORTED_DOMAIN_LABELS[domain]}：${text}`
  }
  // Even if context doesn't mention it, scope said this is the domain;
  // the user expects to see it.
  return `关于${SUPPORTED_DOMAIN_LABELS[domain]}：${text}`
}
