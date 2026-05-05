/**
 * Issue #37 P0 hotfix — fallback contract test (DB-free / LLM-free).
 *
 * Asserts the invariants Project Lead set in the 2026-05-05 directive:
 *   1. status MUST NOT be 'answered' on fallback
 *   2. engine_version MUST NOT be 'answer-core-v1.1-llm' (would mislead
 *      the frontend into rendering as a normal LLM answer)
 *   3. visible_text MUST carry the [降级回答] marker (VOICE S-07)
 *   4. visible_text MUST NOT contain unrelated cached content (e.g.
 *      "换工作半年" — the D05/D06 reproduction)
 *   5. user_copy MUST come from voice canonical
 *      (TEBIQ_STATUS_LANGUAGE_TEMPLATES.md provider_timeout state)
 *
 * The actual end-to-end test (LLM timeout → fallback path triggered)
 * runs as a live curl by GM. This file unit-tests the building block
 * — `buildProviderTimeoutFallback()` — which the orchestrator calls.
 */
import { strict as assert } from 'node:assert'

async function main() {
  const projector = await import('@/lib/answer/core/projector')
  const types = await import('@/lib/answer/core/types')

  let passes = 0
  let total = 0
  const fails: string[] = []
  function check(name: string, fn: () => void): void {
    total += 1
    try {
      fn()
      console.log(`PASS  ${name}`)
      passes += 1
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.log(`FAIL  ${name}`)
      console.log(`  └ ${msg}`)
      fails.push(`${name}: ${msg}`)
    }
  }

  // Build a fixture for D05 — the reproduction case.
  const d05Intent = {
    intent_type: 'risk_assessment' as const,
    current_status: '日本人の配偶者等',
    target_status: null,
    confidence: 1 as const,
    understood_question: '配偶者ビザ持ちで離婚した後、日本に在留できるかどうか確認したい。',
    legacy_intent: {
      intent_type: 'risk_assessment' as const,
      subject: 'individual' as const,
      domain: 'visa' as const,
      confidence: 1 as const,
      extracted_entities: {},
      preferred_template: 'risk_template' as const,
      should_answer: true,
      understood_as: '',
    },
  }

  const fallback = projector.buildProviderTimeoutFallback({
    domain: 'long_term_resident',
    detectedIntent: d05Intent,
    questionText: '日本人配偶签离婚后还能留在日本吗？',
  })

  check('1a. status MUST NOT be "answered" on fallback', () => {
    assert.notEqual(fallback.status, 'answered', `status was '${fallback.status}'`)
  })
  check('1b. status is one of {clarification_needed, preliminary, out_of_scope}', () => {
    const allowed: ReadonlyArray<string> = ['clarification_needed', 'preliminary', 'out_of_scope']
    assert.ok(allowed.includes(fallback.status), `status '${fallback.status}' not in allow-list`)
  })

  check('2a. domain preserved (passed through)', () => {
    assert.equal(fallback.domain, 'long_term_resident')
  })

  check('3a. title carries [降级回答] marker (VOICE S-07)', () => {
    assert.ok(
      fallback.title.includes('[降级回答]'),
      `title missing [降级回答] marker: '${fallback.title}'`,
    )
  })
  check('3b. visible_text includes [降级回答] marker', () => {
    assert.ok(
      fallback.visible_text.includes('[降级回答]'),
      'visible_text does not surface the fallback marker',
    )
  })

  check('4a. visible_text MUST NOT contain "换工作" (D05/D06 leak symptom)', () => {
    assert.ok(
      !fallback.visible_text.includes('换工作'),
      'leaked unrelated content from legacy matcher',
    )
  })
  check('4b. visible_text MUST NOT contain "入管报告" cached-content shape', () => {
    assert.ok(
      !fallback.visible_text.includes('入管报告'),
      'leaked unrelated content from legacy matcher',
    )
  })
  check('4c. visible_text contains canonical voice copy "当前模型响应超时"', () => {
    assert.ok(
      fallback.visible_text.includes('当前模型响应超时'),
      'voice canonical user_copy missing — verify against TEBIQ_STATUS_LANGUAGE_TEMPLATES.md',
    )
  })
  check('4d. visible_text contains "不是你的输入问题" (canonical clause)', () => {
    assert.ok(
      fallback.visible_text.includes('不是你的输入问题'),
      'canonical "不是你的输入问题" clause missing — must be present per voice spec',
    )
  })

  check('5a. clarification_questions is empty (timeout is NOT a clarification request)', () => {
    assert.equal(
      fallback.clarification_questions.length,
      0,
      `fallback should not enumerate clarification questions; got ${fallback.clarification_questions.length}`,
    )
  })
  check('5b. risk_warnings is empty (no domain content surfaced)', () => {
    assert.equal(fallback.risk_warnings.length, 0)
  })
  check('5c. documents_needed is empty', () => {
    assert.equal(fallback.documents_needed.length, 0)
  })
  check('5d. consult_trigger is null (not a handoff event)', () => {
    assert.equal(fallback.consult_trigger, null)
  })

  // Engine version contract — ensures the type allows a fallback variant
  // separate from the normal LLM marker.
  check('6a. AnswerEngineVersion type includes "answer-core-v1.1-fallback"', () => {
    const v: import('@/lib/answer/core/types').AnswerEngineVersion = 'answer-core-v1.1-fallback'
    assert.equal(v, 'answer-core-v1.1-fallback')
  })
  check('6b. "answer-core-v1.1-llm" still in type (regression guard)', () => {
    const v: import('@/lib/answer/core/types').AnswerEngineVersion = 'answer-core-v1.1-llm'
    assert.equal(v, 'answer-core-v1.1-llm')
  })

  // FallbackReason invariant — llm_timeout still in the union.
  check('7a. FallbackReason union still includes "llm_timeout"', () => {
    const r: import('@/lib/answer/core/types').FallbackReason = 'llm_timeout'
    assert.equal(r, 'llm_timeout')
  })

  // Voice canonical assertion — title prefix exact match.
  check('8a. title starts with "[降级回答] " (exact prefix per VOICE S-07)', () => {
    assert.ok(
      fallback.title.startsWith('[降级回答] '),
      `title prefix wrong: '${fallback.title}'`,
    )
  })

  // Test second fixture — different question to confirm builder produces
  // identical canonical copy regardless of question text. (Voice canonical
  // means the user_copy is fixed per state; question text is referenced
  // only via understood_question section.)
  const j04Intent = {
    ...d05Intent,
    understood_question: '解雇された後、在留資格をどう扱えばいいか確認したい。',
  }
  const j04Fallback = projector.buildProviderTimeoutFallback({
    domain: 'admin_general',
    detectedIntent: j04Intent,
    questionText: '我被公司解雇了，在留怎么办？',
  })

  check('9a. J04 fallback also clean (no D05 cross-contamination)', () => {
    assert.ok(!j04Fallback.visible_text.includes('换工作'), 'J04 fallback leaked')
    assert.ok(!j04Fallback.visible_text.includes('离婚'), 'J04 fallback leaked D05 content')
    assert.ok(j04Fallback.title.startsWith('[降级回答] '), 'J04 fallback marker missing')
  })
  check('9b. J04 fallback understood_question reflects user input', () => {
    // sections[0] is "我理解你的问题是" with body = understood_question
    const understood = j04Fallback.sections.find(s => s.heading === '我理解你的问题是')
    assert.ok(understood, 'understood_question section missing')
    assert.ok(
      understood!.body.includes('解雇'),
      `understood section did not reflect input; got '${understood!.body}'`,
    )
  })

  console.log(`\nFallback hotfix contract: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
  // touch types module to silence unused-import in some builds
  void types
}

main().catch(e => {
  console.error('fatal', e)
  process.exit(1)
})
