import type { AnswerIntent } from './intent-router'
import type { SupportedDomain } from './types'

// LLM Answer Engine v0 — supported domain detection.
// v0 only supports five 在留 categories. Anything else is out of scope.
//
// 1. 技术・人文知识・国际业务 (gijinkoku)
// 2. 经营管理 (business_manager)
// 3. 家族滞在 (family_stay)
// 4. 永住 (permanent_resident)
// 5. 定住者 (long_term_resident)

export interface ScopeResult {
  domain: SupportedDomain
  in_scope: boolean
  reason: string
}

export function detectScope(input: {
  questionText: string
  intent: AnswerIntent
  visaType?: string | null
}): ScopeResult {
  const text = [
    input.questionText,
    input.intent.current_status ?? '',
    input.intent.target_status ?? '',
    input.intent.extracted_entities?.current_visa ?? '',
    input.intent.extracted_entities?.target_visa ?? '',
    input.visaType ?? '',
  ].join(' ')

  const matches = matchedDomains(text)

  if (matches.length === 0) {
    if (looksLikeVisaContext(input.questionText)) {
      // Question mentions 入管 / 在留 generically without naming any of
      // the 5 supported visas. We let it through (LLM will ask which
      // visa). Pick gijinkoku as the most-common-default placeholder so
      // the LLM still anchors on a recognisable domain — the answer mode
      // will most likely be `clarification_needed` or
      // `answer_with_assumptions`.
      return { domain: 'gijinkoku', in_scope: true, reason: 'visa_context_unspecified' }
    }
    return { domain: 'unknown', in_scope: false, reason: 'no_supported_visa_keywords' }
  }

  // Pick the strongest signal: target_status > current_status > question.
  const strong = strongestDomain(input)
  return {
    domain: strong ?? matches[0],
    in_scope: true,
    reason: strong ? `strong:${strong}` : `match:${matches[0]}`,
  }
}

function strongestDomain(input: {
  questionText: string
  intent: AnswerIntent
  visaType?: string | null
}): SupportedDomain | null {
  const target = input.intent.target_status ?? input.intent.extracted_entities?.target_visa ?? ''
  const targetDomain = matchedDomains(target)[0]
  if (targetDomain) return targetDomain
  const current = input.intent.current_status ?? input.intent.extracted_entities?.current_visa ?? ''
  const currentDomain = matchedDomains(current)[0]
  if (currentDomain) return currentDomain
  const visaDomain = matchedDomains(input.visaType ?? '')[0]
  if (visaDomain) return visaDomain
  return null
}

function matchedDomains(text: string): SupportedDomain[] {
  const result: SupportedDomain[] = []
  if (/(永住|永住権|永住权|永住者)/.test(text)) result.push('permanent_resident')
  if (/(经营管理|経営管理|经管|管理签|管理ビザ)/.test(text)) result.push('business_manager')
  if (/(家族滞在|家属签|家属簽|家属在留)/.test(text)) result.push('family_stay')
  if (/(定住者|定住资格|定住資格|长期居留|長期居留)/.test(text) || /(?:^|[^永])定住/.test(text)) {
    result.push('long_term_resident')
  }
  if (/(技人国|技術・?人文|技人|人文签|人文簽|国際業務|gijinkoku|技術人文知識|技人国際)/.test(text)) {
    result.push('gijinkoku')
  }
  return result
}

function looksLikeVisaContext(text: string): boolean {
  return /(入管|在留|签证|簽證|更新|续签|續簽|変更|变更|不许可|不許可|补资料|補資料|资格外|資格外|出入国在留管理|moj\.go\.jp)/.test(text)
}

export const SUPPORTED_DOMAIN_SUMMARY = '当前 TEBIQ v0 主线只支持以下五类在留：技术・人文知识・国际业务（技人国 / 人文签）、经营管理、家族滞在、永住、定住者。'
