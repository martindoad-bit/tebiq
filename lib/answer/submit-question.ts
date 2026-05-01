import { buildAnswer } from './match-answer'
import { classifyAnswerIntent } from './intent-router'
import { detectScope } from './answer-scope'
import { generateLlmAnswer } from './llm-answer-generator'
import { fallbackEnvelopeFromLegacy, outOfScopeEnvelope } from './llm-answer-fallback'
import type { AnswerResult, AnswerType, LlmAnswerEnvelope } from './types'
import { createAnswerDraft } from '@/lib/db/queries/answerDrafts'
import { createQuestion, normalizeQuery } from '@/lib/db/queries/questions'
import type { QuestionMatchStatus } from '@/lib/db/queries/questions'

export interface SubmitQuestionInput {
  questionText: string
  visaType?: string | null
  contactEmail?: string | null
  sourcePage?: string | null
}

export async function submitQuestionForAnswer(input: SubmitQuestionInput): Promise<AnswerResult> {
  const intent = await classifyAnswerIntent({
    question_text: input.questionText,
    visa_type: input.visaType,
  })
  const scope = detectScope({
    questionText: input.questionText,
    intent,
    visaType: input.visaType,
  })

  const legacyAnswer = await buildAnswer({
    questionText: input.questionText,
    visaType: input.visaType,
  })

  const envelope = await resolveEnvelope({
    input,
    intent,
    scope,
    legacyAnswer,
  })

  const merged: AnswerResult = {
    ...legacyAnswer,
    llm_envelope: envelope,
  }

  // For out_of_scope we still persist the legacy answer rows but flag
  // match_status accordingly. The frontend dispatches on
  // llm_envelope.answer_mode regardless of legacy answer_type.
  let queryId: string | null = null
  let saved = false
  try {
    const question = await createQuestion({
      rawQuery: input.questionText,
      normalizedQuery: normalizeQuery(input.questionText),
      visaType: input.visaType ?? null,
      contactEmail: input.contactEmail ?? null,
      sourcePage: input.sourcePage ?? '/question-intake',
      matchedCardId: legacyAnswer.matched_card_id ?? null,
      matchStatus: matchStatusFor(legacyAnswer.answer_type),
      status: 'drafted',
      priority: legacyAnswer.review_status === 'needs_expert' ? 'high' : 'normal',
    })
    queryId = question.id
  } catch (error) {
    console.warn('[answer] query_backlog write skipped', errorCode(error))
  }

  let answerId: string | null = null
  if (queryId) {
    try {
      const draft = await createAnswerDraft({
        queryId,
        matchedCardId: legacyAnswer.matched_card_id ?? null,
        questionText: input.questionText,
        answer: merged,
        modelUsed: modelUsedLabel(envelope, legacyAnswer.preferred_template ?? null),
      })
      answerId = draft.id
      saved = true
    } catch (error) {
      console.warn('[answer] answer_draft write skipped', errorCode(error))
    }
  }

  return {
    ...merged,
    query_id: queryId,
    answer_id: answerId,
    saved,
  }
}

async function resolveEnvelope(args: {
  input: SubmitQuestionInput
  intent: ReturnType<typeof classifyAnswerIntent> extends Promise<infer T> ? T : never
  scope: ReturnType<typeof detectScope>
  legacyAnswer: AnswerResult
}): Promise<LlmAnswerEnvelope> {
  const { intent, scope, legacyAnswer, input } = args

  if (!scope.in_scope) {
    return outOfScopeEnvelope({ questionText: input.questionText, intent })
  }

  try {
    const llm = await generateLlmAnswer({
      questionText: input.questionText,
      visaType: input.visaType,
      intent,
      scope,
      legacyAnswer,
      candidateSeed: null,
      redlines: redlinesForIntent(intent),
    })
    if (llm) {
      // LLM produced a valid envelope. Force domain to the safer of
      // (LLM-reported, scope-detected) — never widen domain beyond what
      // scope said is in-scope.
      return {
        ...llm,
        domain: scope.in_scope && llm.domain === 'unknown' ? scope.domain : llm.domain,
      }
    }
  } catch (error) {
    console.warn('[answer] llm-generator threw', errorCode(error))
    return fallbackEnvelopeFromLegacy({
      questionText: input.questionText,
      legacyAnswer,
      intent,
      scope,
      llmError: true,
    })
  }

  // LLM disabled or returned null — graceful legacy fallback.
  return fallbackEnvelopeFromLegacy({
    questionText: input.questionText,
    legacyAnswer,
    intent,
    scope,
  })
}

function redlinesForIntent(intent: ReturnType<typeof classifyAnswerIntent> extends Promise<infer T> ? T : never): string[] {
  const redlines: string[] = []
  const cur = intent.current_status ?? ''
  const tgt = intent.target_status ?? ''
  if (/家族滞在/.test(cur) && /(技人国|人文|工作签|技術)/.test(tgt)) {
    redlines.push('这是「家族滞在 → 工作签」在留資格変更，不要答成资格外活动 28 小时。')
  }
  if (/家族滞在/.test(cur) && /(打工|资格外|兼职)/.test(intent.extracted_entities?.procedure ?? '')) {
    redlines.push('这是家族滞在配偶要打工，请回答「资格外活动许可 + 28 小时/周」，不要答成在留資格変更。')
  }
  if (/(配偶|配偶者)/.test(cur) && /定住/.test(tgt)) {
    redlines.push('这是「配偶签离婚 → 定住者」个案稳定性问题，不要答成换工作 14 日届出。')
  }
  if (/(经营管理|経営管理|经管)/.test(cur) && /(技人国|人文)/.test(tgt)) {
    redlines.push('这是「经营管理 → 技人国 / 人文」，不要把方向反转。')
  }
  if (/(技人国|人文)/.test(cur) && /(经营管理|経営管理|经管)/.test(tgt)) {
    redlines.push('这是「技人国 / 人文 → 经营管理」，不要把方向反转。')
  }
  return redlines
}

function modelUsedLabel(envelope: LlmAnswerEnvelope, preferredTemplate: string | null): string {
  const base = envelope.engine_version
  if (envelope.engine_version === 'llm-answer-v0') {
    return `${base}:${envelope.answer_mode}`
  }
  return preferredTemplate
    ? `${base}:${preferredTemplate}`
    : base
}

function matchStatusFor(answerType: AnswerType): QuestionMatchStatus {
  if (answerType === 'matched') return 'matched'
  if (answerType === 'draft') return 'low_confidence'
  return 'no_match'
}

function errorCode(error: unknown): string {
  if (error && typeof error === 'object' && 'code' in error) {
    return String((error as { code?: unknown }).code)
  }
  if (error instanceof Error) return error.message
  return 'unknown'
}
