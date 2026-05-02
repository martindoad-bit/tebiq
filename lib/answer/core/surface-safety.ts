import type { DetectedIntent, PublicAnswer, SafetyHit, SafetyResult, SupportedDomain } from './types'

// Surface Safety Gate — runs against an already-projected PublicAnswer
// PLUS the surrounding ViewModel-visible text (`understood_question`,
// rendered in the page's "我理解你的问题是" panel). The contract is
// "safety judges what's about to render, regardless of where it
// comes from in the data shape".
//
// V1.1 change: previously `understood_question` was rendered by
// AnswerResultView from `viewModel.understood_question` but never
// scanned by the gate. ARCH flagged this as a blind spot. Now the
// gate scans it explicitly.

interface VisibleField {
  name: string
  text: string
}

export function collectVisibleText(p: PublicAnswer, understoodQuestion?: string): string {
  if (!understoodQuestion) return p.visible_text
  return [understoodQuestion, p.visible_text].filter(Boolean).join('\n')
}

interface JudgeInput {
  query: string
  detectedIntent: DetectedIntent
  domain: SupportedDomain
  publicAnswer: PublicAnswer
}

export function judgePublicAnswerSurface(input: JudgeInput): SafetyResult {
  const hits: SafetyHit[] = []
  const failed: Set<string> = new Set()

  // The single source of truth for "what is about to render".
  // understood_question is the page's "我理解你的问题是" panel — the
  // page reads it from `viewModel.understood_question`, NOT from
  // PublicAnswer, so we surface it explicitly here.
  const fields: VisibleField[] = collectFields(input)

  // Universal: literal `unknown` / `null` / `undefined` must never
  // appear in user-visible text. The projector should already strip
  // these via `scrub()`; this is defense-in-depth.
  scan(fields, hits, failed, 'NO_UNKNOWN_LITERAL', /\bunknown\b/i)
  scan(fields, hits, failed, 'NO_UNDEFINED_LITERAL', /\bundefined\b/)
  scan(fields, hits, failed, 'NO_NULL_LITERAL', /\bnull\b/)

  // Q5 redline: 配偶 + 离婚 + 定住 questions must not show 経営管理
  // family seed swallow.
  if (isSpouseDivorceTeijuQuery(input.query)) {
    scan(fields, hits, failed, 'Q5_NO_KEIEI', /(経営管理|经营管理|経営・管理|经管(?:签|ビザ)?)/)
    scan(fields, hits, failed, 'Q5_NO_JOKIN', /常勤職員/)
    scan(fields, hits, failed, 'Q5_NO_SHIHONKIN', /資本金/)
    scan(fields, hits, failed, 'Q5_NO_JIGYOUKEIKAKU', /(事業計画|会社設立|事業所要件)/)
    scan(fields, hits, failed, 'Q5_NO_DAIHYOU', /代表取締役/)
    scan(fields, hits, failed, 'Q5_NO_TENSHOKU_FRAMING', /(转职|転職).*?(14|十四)/)
    scan(fields, hits, failed, 'Q5_NO_SHOZOKU', /所属機関に関する届出/)
  }

  // 厚生年金 redline: pension+deadline questions without visa context
  // must NOT be packaged as a visa-transfer template.
  if (isKoseinenDeadlineQuery(input.query)) {
    scan(fields, hits, failed, 'KOSEINEN_NO_VISA_TRANSFER', /从「[^」]*」转为「[^」]*」/)
    if (input.publicAnswer.status !== 'out_of_scope' && input.publicAnswer.status !== 'clarification_needed') {
      failed.add('KOSEINEN_MUST_CLARIFY_OR_OOS')
      hits.push({ rule: 'KOSEINEN_MUST_CLARIFY_OR_OOS', pattern: '<status check>', in_field: 'status', excerpt: input.publicAnswer.status })
    }
  }

  // Mode contract: clarification_needed must not surface a full action
  // template.
  if (input.publicAnswer.status === 'clarification_needed') {
    if (input.publicAnswer.documents_needed.length > 0) {
      failed.add('CLARIFY_NO_DOCS_TEMPLATE')
      hits.push({
        rule: 'CLARIFY_NO_DOCS_TEMPLATE',
        pattern: '<documents_needed not empty>',
        in_field: 'documents_needed',
        excerpt: input.publicAnswer.documents_needed.join(' / '),
      })
    }
    if (input.publicAnswer.risk_warnings.length > 0) {
      failed.add('CLARIFY_NO_RISK_TEMPLATE')
      hits.push({
        rule: 'CLARIFY_NO_RISK_TEMPLATE',
        pattern: '<risk_warnings not empty>',
        in_field: 'risk_warnings',
        excerpt: input.publicAnswer.risk_warnings.join(' / '),
      })
    }
  }

  // out_of_scope contract: same as clarification.
  if (input.publicAnswer.status === 'out_of_scope') {
    if (input.publicAnswer.documents_needed.length > 0) {
      failed.add('OOS_NO_DOCS_TEMPLATE')
      hits.push({
        rule: 'OOS_NO_DOCS_TEMPLATE',
        pattern: '<documents_needed not empty>',
        in_field: 'documents_needed',
        excerpt: input.publicAnswer.documents_needed.join(' / '),
      })
    }
    if (input.publicAnswer.risk_warnings.length > 0) {
      failed.add('OOS_NO_RISK_TEMPLATE')
      hits.push({
        rule: 'OOS_NO_RISK_TEMPLATE',
        pattern: '<risk_warnings not empty>',
        in_field: 'risk_warnings',
        excerpt: input.publicAnswer.risk_warnings.join(' / '),
      })
    }
  }

  return {
    passed: failed.size === 0,
    failed_rules: Array.from(failed),
    hits,
    action: 'pass',
    evaluated: true,
  }
}

// ----- helpers ----------------------------------------------------------

function collectFields(input: JudgeInput): VisibleField[] {
  const p = input.publicAnswer
  return [
    // V1.1: understood_question is rendered on the page, must be
    // included in the safety surface.
    { name: 'understood_question', text: input.detectedIntent.understood_question },
    { name: 'title', text: p.title },
    { name: 'summary', text: p.summary },
    { name: 'conclusion', text: p.conclusion },
    ...p.sections.map((s, i) => ({ name: `sections[${i}].heading`, text: s.heading })),
    ...p.sections.map((s, i) => ({ name: `sections[${i}].body`, text: s.body })),
    ...p.next_steps.map((t, i) => ({ name: `next_steps[${i}]`, text: t })),
    ...p.risk_warnings.map((t, i) => ({ name: `risk_warnings[${i}]`, text: t })),
    ...p.clarification_questions.map((t, i) => ({ name: `clarification_questions[${i}]`, text: t })),
    ...p.documents_needed.map((t, i) => ({ name: `documents_needed[${i}]`, text: t })),
    { name: 'consult_trigger', text: p.consult_trigger ?? '' },
  ]
}

function scan(fields: VisibleField[], hits: SafetyHit[], failed: Set<string>, rule: string, pattern: RegExp): void {
  for (const f of fields) {
    if (!f.text) continue
    pattern.lastIndex = 0
    if (pattern.test(f.text)) {
      failed.add(rule)
      hits.push({ rule, pattern: pattern.source, in_field: f.name, excerpt: extractExcerpt(f.text, pattern) })
    }
    pattern.lastIndex = 0
  }
}

function extractExcerpt(text: string, pattern: RegExp): string {
  const flags = pattern.flags.replace('g', '')
  const m = text.match(new RegExp(pattern.source, flags))
  if (!m) return text.slice(0, 80)
  const idx = text.indexOf(m[0])
  const start = Math.max(0, idx - 16)
  const end = Math.min(text.length, idx + m[0].length + 16)
  return `…${text.slice(start, end)}…`
}

function isSpouseDivorceTeijuQuery(q: string): boolean {
  const teiju = /(定住|定住者)/.test(q)
  const spouse = /(配偶|配偶者|配偶签|日本人配偶|永住者の配偶|妻|夫)/.test(q)
  const divorce = /(离婚|離婚|分居|协议离婚|協議離婚|裁判離婚|別居)/.test(q)
  return teiju && spouse && divorce
}

function isKoseinenDeadlineQuery(q: string): boolean {
  const isPensionInsurance = /(厚生年金|国民年金|健康保険|健保|国保|社会保険|社会保险|社保)/.test(q)
  const asksDeadline = /(截止日期|期限|何时|什么时候|多久|多少天|几天|何日|期日|締切)/.test(q)
  const hasVisaContext = /(技人国|人文签|经营管理|経営管理|经管|家族滞在|永住|定住者|定住|在留|入管|续签|更新|変更|不许可)/.test(q)
  return isPensionInsurance && asksDeadline && !hasVisaContext
}
