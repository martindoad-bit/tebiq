import { buildAnswer } from '@/lib/answer/match-answer'
import type { AnswerSource } from './types'

// Wraps the existing match-answer.ts as a V1 AnswerSource.
//
// Critical contract: this provider DOES NOT decide what the user sees.
// It only assembles a candidate AnswerSource. The projector +
// surface-safety gate downstream make the final call.
//
// Legacy `match-answer.ts` is treated read-only here. We deliberately
// strip away its `answer_type` / `review_status` / `title` /
// `summary` / `action_answer` from any direct render path; those
// fields land on `AnswerSource.legacy_*` so they're explicitly marked
// as "raw, not user-visible until projected".

export async function provideLegacySeedSource(input: {
  questionText: string
  visaType?: string | null
}): Promise<AnswerSource> {
  const legacy = await buildAnswer({
    questionText: input.questionText,
    visaType: input.visaType,
  })

  // The legacy answer always returns *something* (even a generic
  // clarification). Decide source kind from how strong its match is.
  //
  // - hasMatch: hit a seed / decision card → 'legacy_seed'.
  // - generic clarification (legacy.title === '这个情况需要进一步确认'):
  //   the legacy `clarifyAnswerForIntent` fallback. Treat as 'none'
  //   so the projector emits its own clarification using the V1
  //   domain-specific question list.
  // - everything else (including ruleBasedAnswerForIntent that returned
  //   answer_type='cannot_determine' but has specific content): treat
  //   as 'rule_based'. The projector will downgrade these to
  //   `clarification_needed` if review_status='intent_unclear', but
  //   their specific titles / sections survive.
  const hasMatch = Boolean(legacy.matched_seed_id || legacy.matched_card_id)
  const isGenericClarify = legacy.title === '这个情况需要进一步确认'
    || legacy.title === '初步整理，尚未人工复核'

  const kind: AnswerSource['kind'] = hasMatch
    ? 'legacy_seed'
    : isGenericClarify
      ? 'none'
      : 'rule_based'

  const sourceConfidence: AnswerSource['source_confidence'] = legacy.answer_type === 'matched'
    ? 'medium'
    : legacy.answer_type === 'cannot_determine'
      ? 'low'
      : 'low'

  return {
    kind,
    legacy_title: legacy.title,
    legacy_summary: legacy.summary,
    legacy_conclusion: legacy.action_answer?.conclusion,
    legacy_what_to_do: legacy.action_answer?.what_to_do,
    legacy_how_to_do: legacy.action_answer?.how_to_do,
    legacy_where_to_go: legacy.action_answer?.where_to_go,
    legacy_documents_needed: legacy.action_answer?.documents_needed,
    legacy_deadline_or_timing: legacy.action_answer?.deadline_or_timing,
    legacy_consequences: legacy.action_answer?.consequences,
    legacy_expert_handoff: legacy.action_answer?.expert_handoff,
    legacy_sections: legacy.sections.map(s => ({ heading: s.heading, body: s.body })),
    legacy_next_steps: legacy.next_steps,
    legacy_seed_id: legacy.matched_seed_id ?? null,
    legacy_card_id: legacy.matched_card_id ?? null,
    legacy_review_status: legacy.review_status,
    legacy_answer_type: legacy.answer_type,
    source_confidence: sourceConfidence,
  }
}
