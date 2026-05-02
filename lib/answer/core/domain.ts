import type { AnswerIntent } from '@/lib/answer/intent-router'
import type { DetectedIntent, SupportedDomain } from './types'

// Detect the V1 supported domain from intent + question text.
// V1 only supports 5 visa categories. Anything else returns 'unknown',
// and the orchestrator will treat that as out_of_scope.

export function detectDomain(input: {
  questionText: string
  intent: AnswerIntent
  visaType?: string | null
}): SupportedDomain {
  const targetMatch = matchDomain(input.intent.target_status ?? '')
  if (targetMatch !== 'unknown') return targetMatch

  const currentMatch = matchDomain(input.intent.current_status ?? '')
  if (currentMatch !== 'unknown') return currentMatch

  const procMatch = matchDomain(input.intent.extracted_entities?.procedure ?? '')
  if (procMatch !== 'unknown') return procMatch

  const visaMatch = matchDomain(input.visaType ?? '')
  if (visaMatch !== 'unknown') return visaMatch

  const textMatch = matchDomain(input.questionText)
  return textMatch
}

function matchDomain(text: string): SupportedDomain {
  if (!text) return 'unknown'
  if (/(永住|永住権|永住权|永住者)/.test(text)) return 'permanent_resident'
  if (/(经营管理|経営管理|经管|管理签|管理ビザ)/.test(text)) return 'business_manager'
  if (/(家族滞在|家属签|家属簽)/.test(text)) return 'family_stay'
  if (/(定住者|定住資格)/.test(text)) return 'long_term_resident'
  // Bare "定住" alone (only if not preceded by 永) — broad pattern last.
  if (/(?:^|[^永])定住/.test(text)) return 'long_term_resident'
  if (/(技人国|技術・?人文|人文签|人文簽|国際業務|gijinkoku|技術人文知識)/.test(text)) {
    return 'gijinkoku'
  }
  return 'unknown'
}

export function buildDetectedIntent(input: {
  questionText: string
  intent: AnswerIntent
}): DetectedIntent {
  return {
    intent_type: input.intent.intent_type,
    current_status: meaningfulStatus(input.intent.current_status),
    target_status: meaningfulStatus(input.intent.target_status),
    confidence: input.intent.confidence,
    understood_question: rewriteUnderstoodQuestion(input.intent, input.questionText),
    legacy_intent: input.intent,
  }
}

// V1 contract: never let literal "unknown" / "null" / "undefined" /
// "未知" leak into user-visible text. The legacy intent-router can
// produce status='unknown' from the LLM intent parser; we treat all
// of those as "missing" here.
function meaningfulStatus(value: string | null | undefined): string | null {
  if (!value) return null
  const trimmed = value.trim()
  if (!trimmed) return null
  if (/^(?:unknown|null|undefined|未知|未定义|n\/a|none)$/i.test(trimmed)) return null
  return trimmed
}

function rewriteUnderstoodQuestion(intent: AnswerIntent, questionText: string): string {
  const cur = meaningfulStatus(intent.current_status)
  const tgt = meaningfulStatus(intent.target_status)
  if (cur && tgt) {
    return `从「${cur}」转为「${tgt}」需要满足什么条件，以及接下来怎么做。`
  }
  if (cur) {
    return `你目前持有「${cur}」，TEBIQ 还需要你告知具体想办的手续。`
  }
  if (tgt) {
    return `你想办到「${tgt}」，TEBIQ 还需要你告知现在的在留资格。`
  }
  if (intent.intent_type === 'misconception') {
    return '这个想法是否存在常见误解，以及有没有稳定可行路径。'
  }
  if (intent.intent_type === 'risk_assessment') {
    return '这件事可能影响谁、先保留什么证据，以及什么情况要找专家。'
  }
  return questionText.trim() || '我还不能确定你的当前身份和目标手续。'
}
