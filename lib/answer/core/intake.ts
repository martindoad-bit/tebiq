import { classifyAnswerIntent } from '@/lib/answer/intent-router'
import { buildDetectedIntent, detectDomain } from './domain'
import { provideLegacySeedSource } from './legacy-seed-provider'
import { tryRuleBasedSource } from './rule-based-provider'
import { buildSafeClarificationReplacement, projectLegacyToPublicAnswer } from './projector'
import { judgePublicAnswerSurface } from './surface-safety'
import type { AnswerRun, AnswerSource, FallbackReason } from './types'

// The Answer Core V1 orchestrator.
//
//   intake(query)
//     → classify intent
//     → detect domain
//     → try rule-based source (deterministic safe shortcuts)
//     → if no rule match, fall back to legacy seed provider
//     → project source → PublicAnswer
//     → surface-safety judges PublicAnswer
//     → if safety failed, replace with safe clarification
//     → return AnswerRun
//
// Note: this function does NOT touch the database. Persistence is the
// caller's responsibility (submit-question.ts handles it).

export interface IntakeInput {
  questionText: string
  visaType?: string | null
}

export async function runAnswerIntake(input: IntakeInput): Promise<AnswerRun> {
  const intent = await classifyAnswerIntent({
    question_text: input.questionText,
    visa_type: input.visaType,
  })
  const detectedIntent = buildDetectedIntent({
    questionText: input.questionText,
    intent,
  })
  const domain = detectDomain({
    questionText: input.questionText,
    intent,
    visaType: input.visaType,
  })

  // Source selection — rule-based wins when it matches.
  let source: AnswerSource
  let fallback_reason: FallbackReason | null = null

  const ruleMatch = tryRuleBasedSource({ questionText: input.questionText })
  if (ruleMatch) {
    source = ruleMatch.source
  } else {
    source = await provideLegacySeedSource({
      questionText: input.questionText,
      visaType: input.visaType,
    })
  }

  if (source.kind === 'none') {
    fallback_reason = 'no_source_matched'
  }
  if (domain === 'unknown') {
    fallback_reason = 'out_of_scope'
  }

  // Projection — the only place that turns a source into something
  // user-visible.
  let publicAnswer = projectLegacyToPublicAnswer({
    source,
    detectedIntent,
    domain,
    questionText: input.questionText,
  })

  // Safety gate — judges what's about to be rendered.
  let safetyResult = judgePublicAnswerSurface({
    query: input.questionText,
    detectedIntent,
    domain,
    publicAnswer,
  })

  // If safety failed, swap in a safe clarification version. The user
  // never sees the original (potentially contaminated) PublicAnswer.
  if (!safetyResult.passed) {
    publicAnswer = buildSafeClarificationReplacement({
      domain,
      detectedIntent,
      questionText: input.questionText,
      reason: safetyResult.failed_rules.join(','),
    })
    fallback_reason = 'safety_gate_replaced'
    // Re-run safety on the replacement (sanity check). The replacement
    // is hand-crafted and should always pass.
    const recheck = judgePublicAnswerSurface({
      query: input.questionText,
      detectedIntent,
      domain,
      publicAnswer,
    })
    safetyResult = {
      passed: recheck.passed,
      failed_rules: safetyResult.failed_rules, // keep original failure log
      hits: safetyResult.hits,
      action: 'replaced_with_safe_clarification',
      evaluated: true,
    }
  }

  return {
    engine_version: 'answer-core-v1',
    raw_query: input.questionText,
    normalized_query: normalize(input.questionText),
    detected_intent: detectedIntent,
    detected_domain: domain,
    source,
    public_answer: publicAnswer,
    safety_result: safetyResult,
    fallback_reason,
    legacy_draft_id: null,
    created_at: new Date().toISOString(),
  }
}

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim().toLowerCase()
}
