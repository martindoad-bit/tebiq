import type { AnswerIntent } from './intent-router'
import { describeIntent, clarificationQuestionsForIntent } from './intent-router'
import { SUPPORTED_DOMAIN_SUMMARY, type ScopeResult } from './answer-scope'
import type {
  AnswerMode,
  AnswerResult,
  LlmAnswerEnvelope,
  NextAction,
} from './types'

// Build a v0 envelope from the legacy answer when the LLM is unavailable
// (env disabled, no AWS keys, timeout, parse failure, etc.). The envelope
// contract stays identical so the frontend can render uniformly.

export function fallbackEnvelopeFromLegacy(input: {
  questionText: string
  legacyAnswer: AnswerResult
  intent: AnswerIntent
  scope: ScopeResult
  llmError?: boolean
}): LlmAnswerEnvelope {
  const { legacyAnswer, scope, intent } = input
  const action = legacyAnswer.action_answer

  const answerMode: AnswerMode = legacyAnswerMode(legacyAnswer)
  const understood = legacyAnswer.intent_summary
    ?? describeIntent(intent, input.questionText)

  const nextActions: NextAction[] = (action?.what_to_do ?? legacyAnswer.next_steps ?? [])
    .slice(0, 5)
    .map((title, index) => ({
      title: trimMid(title, 80),
      detail: action?.how_to_do[index] ? trimMid(action.how_to_do[index], 240) : '',
      urgency: index === 0 ? 'now' : index <= 2 ? 'soon' : 'later',
    }))

  const keyMissing = answerMode === 'clarification_needed'
    ? clarificationQuestionsForIntent(intent).slice(0, 4).map(q => ({
      field: 'unknown',
      question: q,
      why_it_matters: '不确认这一点容易把别的手续答案套到你的情况上。',
    }))
    : []

  return {
    engine_version: 'legacy-fallback',
    answer_mode: answerMode,
    domain: scope.domain,
    understood_question: understood,
    short_answer: trimMid(action?.conclusion ?? legacyAnswer.summary ?? legacyAnswer.title, 320),
    assumptions: [],
    key_missing_info: keyMissing,
    next_actions: nextActions,
    materials: action?.documents_needed.slice(0, 6) ?? [],
    deadline: action?.deadline_or_timing.slice(0, 3).join('；') ?? '',
    where_to_go: action?.where_to_go.slice(0, 3).join(' / ') ?? '',
    risks: action?.consequences.slice(0, 4) ?? [],
    expert_checkpoints: action?.expert_handoff.slice(0, 3) ?? [],
    source_notes: legacyAnswer.sources.map(s => s.title).slice(0, 4),
    copy_text: legacyCopyText(legacyAnswer),
    confidence: legacyConfidence(legacyAnswer),
    source_article_ids: legacyAnswer.matched_seed_id
      ? [legacyAnswer.matched_seed_id]
      : legacyAnswer.matched_card_id
        ? [legacyAnswer.matched_card_id]
        : [],
    llm_error: input.llmError === true ? true : undefined,
  }
}

export function outOfScopeEnvelope(input: {
  questionText: string
  intent: AnswerIntent
}): LlmAnswerEnvelope {
  return {
    engine_version: 'out-of-scope-v0',
    answer_mode: 'out_of_scope',
    domain: 'unknown',
    understood_question: describeIntent(input.intent, input.questionText),
    short_answer: SUPPORTED_DOMAIN_SUMMARY,
    assumptions: [],
    key_missing_info: [
      {
        field: 'visa_type',
        question: '你想问的是哪一类在留资格？技人国 / 经营管理 / 家族滞在 / 永住 / 定住者？',
        why_it_matters: '当前 v0 只支持这五类。具体在留资格不同，手续路径会完全不同。',
      },
      {
        field: 'event',
        question: '你想办的是哪一件事？续签、变更、申请、补资料、家属、办公室、其它？',
        why_it_matters: '不同事项要走的窗口和材料完全不同。',
      },
    ],
    next_actions: [],
    materials: [],
    deadline: '',
    where_to_go: '',
    risks: [],
    expert_checkpoints: [],
    source_notes: [],
    copy_text: '这个问题暂时不在 TEBIQ v0 支持范围内。请补充一下你的在留资格（技人国 / 经营管理 / 家族滞在 / 永住 / 定住者）和具体想办的事项，TEBIQ 会按对应路径整理。',
    confidence: 'low',
    source_article_ids: [],
  }
}

function legacyAnswerMode(answer: AnswerResult): AnswerMode {
  if (answer.review_status === 'intent_unclear') return 'clarification_needed'
  if (answer.answer_type === 'cannot_determine') return 'clarification_needed'
  if (answer.answer_type === 'matched') return 'direct_answer'
  // Legacy "draft" answers carry a structured action_answer but they
  // were assembled from articles, not LLM-reasoned. Mark them as
  // assumption-bounded so the renderer surfaces uncertainty correctly.
  return 'answer_with_assumptions'
}

function legacyConfidence(answer: AnswerResult): 'high' | 'medium' | 'low' {
  if (answer.answer_type === 'matched') return 'medium'
  if (answer.answer_type === 'cannot_determine') return 'low'
  return 'low'
}

function legacyCopyText(answer: AnswerResult): string {
  const action = answer.action_answer
  if (action?.conclusion) {
    const first = action.what_to_do[0] ?? ''
    return [action.conclusion, first].filter(Boolean).join(' ').slice(0, 200)
  }
  return (answer.summary || answer.title).slice(0, 200)
}

function trimMid(value: string, max: number): string {
  const v = (value ?? '').trim()
  return v.length <= max ? v : `${v.slice(0, max - 1)}…`
}
