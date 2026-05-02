import type { AnswerRun, AnswerSource, PublicAnswer, PublicAnswerSection } from './types'

// AnswerRun persistence — sidecar pattern.
//
// V1 does NOT add a new database table. Instead, the entire AnswerRun
// JSON is stored as a special section in `answer_drafts.sections_json`,
// with heading `__answer_run_v1__`. Read paths strip this section
// before rendering.
//
// This trades a small write/read overhead for zero migration risk and
// zero new infrastructure. A later iteration can add a real
// `answer_runs` table; the migration story is documented in
// `docs/qa/ANSWER_CORE_V1_MIGRATION.md`.

export const ANSWER_RUN_SECTION_HEADING = '__answer_run_v1__'

// Build the synthetic section that carries the AnswerRun.
export function answerRunAsSidecarSection(run: AnswerRun): { heading: string; body: string } {
  return {
    heading: ANSWER_RUN_SECTION_HEADING,
    body: JSON.stringify(run),
  }
}

// Pull the AnswerRun out of a sectionsJson array and return the
// remaining sections (so they don't render the JSON blob).
export function extractAnswerRun(sections: Array<{ heading: string; body: string }>): {
  run: AnswerRun | null
  rest: Array<{ heading: string; body: string }>
} {
  const rest: Array<{ heading: string; body: string }> = []
  let run: AnswerRun | null = null
  for (const section of sections) {
    if (section.heading === ANSWER_RUN_SECTION_HEADING) {
      try {
        run = JSON.parse(section.body) as AnswerRun
      } catch {
        run = null
      }
      continue
    }
    rest.push(section)
  }
  return { run, rest }
}

// When a previously stored draft pre-dates V1 (no sidecar found), we
// reconstruct a minimal AnswerRun from the legacy draft fields. This
// keeps `/answer/{id}` from breaking on old rows.
export function reconstructLegacyRun(input: {
  rawQuery: string
  legacyTitle: string
  legacySummary: string
  legacySections: Array<{ heading: string; body: string }>
  legacyNextSteps: string[]
  legacyAnswerType: string
  legacyReviewStatus: string
  legacyDraftId: string
}): AnswerRun {
  const isClar = input.legacyReviewStatus === 'intent_unclear' || input.legacyAnswerType === 'cannot_determine'
  const status: PublicAnswer['status'] = isClar
    ? 'clarification_needed'
    : input.legacyAnswerType === 'matched'
      ? 'answered'
      : 'preliminary'

  const sections: PublicAnswerSection[] = input.legacySections
    .filter(s => s.heading !== ANSWER_RUN_SECTION_HEADING)
    .map(s => ({ heading: s.heading, body: s.body }))

  const publicAnswer: PublicAnswer = {
    status,
    domain: 'unknown',
    title: input.legacyTitle,
    summary: input.legacySummary,
    conclusion: input.legacySummary,
    sections,
    next_steps: input.legacyNextSteps,
    risk_warnings: [],
    clarification_questions: status === 'clarification_needed' ? input.legacyNextSteps : [],
    documents_needed: [],
    consult_trigger: null,
    disclaimer: 'TEBIQ 提供的是一般手续整理和准备方向。这是 V1 之前的旧整理，仅供参考。',
    visible_text: '',
  }

  // Recompute visible_text on this minimal reconstruction so safety
  // checks still work.
  publicAnswer.visible_text = [
    publicAnswer.title,
    publicAnswer.summary,
    publicAnswer.conclusion,
    ...sections.flatMap(s => [s.heading, s.body]),
    ...publicAnswer.next_steps,
    publicAnswer.disclaimer,
  ].filter(Boolean).join('\n')

  const source: AnswerSource = {
    kind: 'legacy_seed',
    source_confidence: 'low',
    legacy_title: input.legacyTitle,
    legacy_summary: input.legacySummary,
    legacy_sections: sections,
    legacy_next_steps: input.legacyNextSteps,
    legacy_answer_type: input.legacyAnswerType,
    legacy_review_status: input.legacyReviewStatus,
  }

  return {
    engine_version: 'answer-core-v1',
    raw_query: input.rawQuery,
    normalized_query: input.rawQuery.replace(/\s+/g, ' ').trim().toLowerCase(),
    detected_intent: {
      intent_type: 'unknown',
      current_status: null,
      target_status: null,
      confidence: 1,
      understood_question: input.rawQuery,
      legacy_intent: {
        intent_type: 'unknown',
        subject: 'unknown',
        domain: 'unknown',
        confidence: 1,
        extracted_entities: {},
        preferred_template: 'clarify_template',
        should_answer: true,
        understood_as: input.rawQuery,
      },
    },
    detected_domain: 'unknown',
    source,
    public_answer: publicAnswer,
    safety_result: { passed: true, failed_rules: [], hits: [], action: 'pass' },
    fallback_reason: null,
    legacy_draft_id: input.legacyDraftId,
    created_at: new Date().toISOString(),
  }
}
