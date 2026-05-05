import { classifyAnswerIntent } from '@/lib/answer/intent-router'
import { buildDetectedIntent, detectDomain } from './domain'
import { provideLegacySeedSource } from './legacy-seed-provider'
import { provideLlmDeepseekSource } from './llm-deepseek-provider'
import { tryRuleBasedSource } from './rule-based-provider'
import {
  buildProviderTimeoutFallback,
  buildSafeClarificationReplacement,
  projectLegacyToPublicAnswer,
} from './projector'
import { judgePublicAnswerSurface } from './surface-safety'
import type { AnswerEngineVersion, AnswerRun, AnswerSource, FallbackReason } from './types'

/**
 * Issue #37 P0 — provider-failure skip reasons that MUST NOT fall through
 * to legacy_seed. The legacy matcher does fuzzy text matching that can
 * return wrong-topic content with `legacy_answer_type='matched'` (D05/D06
 * 配偶离婚 bug returned a "换工作" themed cached answer). For these reasons
 * we emit a clean voice-canonical fallback instead.
 *
 * - llm_timeout / llm_exception: provider-side failure. No LLM output
 *   exists; legacy is not a safe substitute for the user's actual question.
 * - llm_parse / llm_validation: LLM produced something but it failed our
 *   parsing/validation; we shouldn't smuggle in unrelated legacy content.
 *
 * `llm_disabled` is excluded — it means DEEPSEEK_API_KEY is missing
 * (typically dev mode), where legacy is the intentional fallback path.
 */
function isProviderFailure(reason: FallbackReason | null): boolean {
  return reason === 'llm_timeout'
    || reason === 'llm_exception'
    || reason === 'llm_parse'
    || reason === 'llm_validation'
}

// The Answer Core V1.1 orchestrator.
//
//   intake(query)
//     → classify intent
//     → detect domain
//     → 1. try rule-based source (deterministic safe shortcuts)
//     → 2. if no rule match, ask DeepSeek (V1.1 — primary LLM)
//     → 3. if DeepSeek skipped or yielded none, try legacy seed
//     → 4. if all empty, projector emits clarification
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

  // Source selection — order is intentional:
  //   1. rule_based (deterministic safe answers, e.g. 配偶离婚→定住).
  //      These have human-reviewed surface text and bypass the LLM.
  //   2. llm_primary (DeepSeek V4 Pro). When rule_based misses, try
  //      DeepSeek next. Failures (timeout/parse/validation/disabled)
  //      flow through transparently to legacy_seed.
  //   3. legacy_seed (V0 match-answer.ts) as the deterministic
  //      fallback. Existed before V1.1; kept as the safety net.
  //   4. projector emits clarification when source.kind='none'.
  //
  // V1.1 — domain==='unknown' (truly off-topic) skips the LLM call
  // entirely; the projector routes to out_of_scope without burning a
  // request. Anything else (including admin_general for 入管 / 区役所
  // / 年金 / 税务) is in_scope and gets the LLM.
  let source: AnswerSource
  let fallback_reason: FallbackReason | null = null

  const ruleMatch = tryRuleBasedSource({ questionText: input.questionText })
  if (ruleMatch) {
    source = ruleMatch.source
  } else if (domain !== 'unknown') {
    // V1.2 — DeepSeek primary path, with no-downgrade guard:
    //
    //   1. Call DeepSeek.
    //   2. If DeepSeek gives a confident matched answer → use it.
    //   3. Else (DeepSeek hedged with preliminary/clarification, OR
    //      DeepSeek skipped/failed): also call legacy_seed, and if
    //      legacy_seed has a `matched` answer, prefer it (no
    //      downgrade). Otherwise prefer DeepSeek's hedged answer.
    //
    // This guarantees that questions with stable legacy answers
    // (e.g. Q03 家族滞在→工作签 / Q04 经管→人文 etc.) are never
    // downgraded to clarification when DeepSeek hedges.
    const llmSource = await provideLlmDeepseekSource({
      questionText: input.questionText,
      visaType: input.visaType ?? null,
      detectedDomain: domain,
      detectedIntent,
      candidateSeedSnippet: null, // PR-A scope: no candidate grounding yet (deferred)
      redlines: redlinesForDomain(domain, detectedIntent),
    })
    const llmIsConfidentMatch = llmSource.kind === 'llm_primary'
      && (llmSource.legacy_answer_type === 'matched')
    if (llmIsConfidentMatch) {
      source = llmSource
    } else {
      // DeepSeek hedged or skipped.
      if (llmSource.kind === 'none' && llmSource.skip_reason) {
        fallback_reason = llmSource.skip_reason
      }
      // Issue #37 P0 hotfix — when LLM fully failed for a provider-side
      // reason (timeout/exception/parse/validation), DO NOT call
      // legacy_seed. The legacy fuzzy matcher returns
      // `legacy_answer_type='matched'` based on lexical similarity that's
      // not topic-aware; a 配偶离婚 question returned a 换工作 cached
      // answer (D05/D06 P0 reproduction 2026-05-05). Emit a clean
      // voice-canonical fallback instead and short-circuit.
      if (llmSource.kind === 'none' && isProviderFailure(fallback_reason)) {
        const fallbackPublicAnswer = buildProviderTimeoutFallback({
          domain,
          detectedIntent,
          questionText: input.questionText,
        })
        const safetyResult = judgePublicAnswerSurface({
          query: input.questionText,
          detectedIntent,
          domain,
          publicAnswer: fallbackPublicAnswer,
        })
        return {
          // Issue #37 P0 — dedicated 'fallback' engine_version so the
          // frontend can distinguish a controlled fallback from a normal
          // LLM answer ('-llm') or a legacy_seed answer ('v1'). Per
          // Project Lead 2026-05-05: "engine_version 不得让前端误认为
          // 正常 LLM answer".
          engine_version: 'answer-core-v1.1-fallback',
          raw_query: input.questionText,
          normalized_query: normalize(input.questionText),
          detected_intent: detectedIntent,
          detected_domain: domain,
          // Synthetic source so AnswerRun shape stays valid; consumers
          // that want to know "was there a real source" check `kind`.
          source: {
            kind: 'none',
            source_confidence: 'low',
            skip_reason: fallback_reason ?? undefined,
          },
          public_answer: fallbackPublicAnswer,
          safety_result: safetyResult,
          fallback_reason,
          legacy_draft_id: null,
          created_at: new Date().toISOString(),
        }
      }
      // Non-provider-failure paths (e.g. llm_disabled, or LLM returned
      // a hedged/non-matched answer): keep the existing no-downgrade
      // guard. legacy_seed is still consulted; if it has a `matched`
      // entry it wins, otherwise fall back to whatever the LLM hedged.
      const legacySource = await provideLegacySeedSource({
        questionText: input.questionText,
        visaType: input.visaType,
      })
      const legacyIsMatched = legacySource.kind === 'legacy_seed'
        && legacySource.legacy_answer_type === 'matched'
      if (legacyIsMatched) {
        source = legacySource
      } else if (llmSource.kind === 'llm_primary') {
        // DeepSeek gave a hedged answer; legacy didn't have a stable
        // match either — better to surface DeepSeek's voice than fall
        // back to legacy's lower-confidence content.
        source = llmSource
      } else {
        source = legacySource
      }
    }
  } else {
    // Truly off-topic — domain==='unknown'. Don't burn an LLM call.
    source = await provideLegacySeedSource({
      questionText: input.questionText,
      visaType: input.visaType,
    })
  }

  if (source.kind === 'none' && fallback_reason === null) {
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

  const engineVersion: AnswerEngineVersion = source.kind === 'llm_primary'
    ? 'answer-core-v1.1-llm'
    : 'answer-core-v1'

  return {
    engine_version: engineVersion,
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

// Compose narrow per-question redlines for the DeepSeek prompt. These
// are anti-hallucination hints, NOT a replacement for the surface
// safety gate. The gate still runs after projection regardless.
function redlinesForDomain(
  domain: AnswerRun['detected_domain'],
  intent: AnswerRun['detected_intent'],
): string[] {
  const out: string[] = []
  const cur = intent.current_status ?? ''
  const tgt = intent.target_status ?? ''

  if (/家族滞在/.test(cur) && /(技人国|人文|工作签|技術)/.test(tgt)) {
    out.push('家族滞在 → 工作签是「在留資格変更」，不要写成「资格外活动 28 小时」。')
  }
  if (/(配偶|配偶者)/.test(cur) && /定住/.test(tgt)) {
    out.push('配偶离婚 → 定住者要走「在留資格変更許可申請」，不是「14 日届出」。')
    out.push('不要给「経営管理 / 常勤職員 / 資本金 / 事業計画」相关内容。')
  }
  if (/(经营管理|経営管理|经管)/.test(cur) && /(技人国|人文)/.test(tgt)) {
    out.push('经管 → 人文，不要把方向反转。')
  }
  if (/(技人国|人文)/.test(cur) && /(经营管理|経営管理|经管)/.test(tgt)) {
    out.push('人文 → 经管，不要把方向反转。')
  }
  if (domain === 'admin_general') {
    out.push('admin_general 类问题 status 不能用 "answered"，必须 "preliminary" 或 "clarification_needed"。')
  }
  return out
}
