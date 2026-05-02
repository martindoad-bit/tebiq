import type { AnswerRun, AnswerViewModel } from './types'
import { STATUS_CLASSES, STATUS_LABELS } from './types'

// PublicAnswer + AnswerRun → AnswerViewModel.
//
// The view model is a thin wrapper that the page consumes. It
// intentionally exposes the PublicAnswer object as `public` (one
// nested namespace) so callers can never accidentally read a legacy
// field — the type system prevents it.

export function toViewModel(run: AnswerRun, options: { id: string }): AnswerViewModel {
  const status = run.public_answer.status
  return {
    id: options.id,
    question: run.raw_query,
    understood_question: run.detected_intent.understood_question,
    status,
    status_label: STATUS_LABELS[status],
    status_class: STATUS_CLASSES[status],
    public: run.public_answer,
    engine_version: run.engine_version,
    fallback_reason: run.fallback_reason,
    safety_passed: run.safety_result.passed,
    domain: run.detected_domain,
  }
}
