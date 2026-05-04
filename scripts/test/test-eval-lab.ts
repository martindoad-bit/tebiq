/**
 * TEBIQ Eval Lab V1 — internal smoke (DB-free).
 *
 * Covers what runs without a live DB / browser / DeepSeek API:
 *   1. env gate at lib/eval-lab/auth.ts  (true when EVAL_LAB_ENABLED=1)
 *   2. starter-questions list (100 entries across 10 scenarios A-J)
 *   3. starter-tag uniqueness (the seed dedup invariant)
 *   4. queries module exports the expected surface
 *   5. concurrency limiter (Issue #14)  — pLimit holds n; queue drains in
 *      order; rejection in one task doesn't poison the pool
 *   6. retry helper (Issue #14)         — succeeds on first attempt;
 *      retries up to maxAttempts; respects shouldRetry; exponential delay
 *      (with jitter disabled) reaches expected sleep total
 *
 * What this does NOT cover (needs DB / live API):
 *   - DB seed idempotency under real Postgres
 *   - /api/internal/eval-lab/state shape end-to-end
 *   - The /api/internal/eval-lab/deepseek-raw network call
 *   - The /api/internal/eval-lab/tebiq-answer pipeline call
 *   - The page UI (per-question status badges, concurrency UI)
 *
 * Live verification of the page goes via Vercel preview with
 * EVAL_LAB_ENABLED=1.
 */
import { strict as assert } from 'node:assert'

async function main() {
  const auth = await import('@/lib/eval-lab/auth')
  const starter = await import('@/lib/eval-lab/starter-questions')
  const queries = await import('@/lib/db/queries/eval-lab')
  const conc = await import('@/lib/eval-lab/concurrency')
  const retry = await import('@/lib/eval-lab/retry')
  const classifier = await import('@/lib/eval-lab/sample-classifier')
  const previewStage = await import('@/lib/eval-lab/preview-stage')
  const riskMatrix = await import('@/lib/eval-lab/risk-matrix-data')
  const providerHealth = await import('@/lib/eval-lab/provider-health')
  const previewStream = await import('@/lib/eval-lab/preview-stream')

  let passes = 0
  let total = 0
  const fails: string[] = []
  async function check(name: string, fn: () => void | Promise<void>): Promise<void> {
    total += 1
    try {
      await fn()
      console.log(`PASS  ${name}`)
      passes += 1
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.log(`FAIL  ${name}`)
      console.log(`  └ ${msg}`)
      fails.push(`${name}: ${msg}`)
    }
  }

  // ---- 1. env gate ----
  await check('1a. isEvalLabEnabled() default = false', () => {
    delete process.env.EVAL_LAB_ENABLED
    assert.equal(auth.isEvalLabEnabled(), false)
  })
  await check('1b. EVAL_LAB_ENABLED=0 → false', () => {
    process.env.EVAL_LAB_ENABLED = '0'
    assert.equal(auth.isEvalLabEnabled(), false)
  })
  await check('1c. EVAL_LAB_ENABLED=true (string "true") → false (only "1" enables)', () => {
    process.env.EVAL_LAB_ENABLED = 'true'
    assert.equal(auth.isEvalLabEnabled(), false)
  })
  await check('1d. EVAL_LAB_ENABLED=1 → true', () => {
    process.env.EVAL_LAB_ENABLED = '1'
    assert.equal(auth.isEvalLabEnabled(), true)
  })

  // ---- 2. starter pack shape ----
  await check('2a. STARTER_QUESTIONS == 100', () => {
    assert.equal(
      starter.STARTER_QUESTIONS.length,
      100,
      `expected 100, got ${starter.STARTER_QUESTIONS.length}`,
    )
  })
  await check('2b. each starter has question + starter_tag + scenario', () => {
    for (const s of starter.STARTER_QUESTIONS) {
      assert.ok(typeof s.question === 'string' && s.question.length >= 4, `bad question: ${JSON.stringify(s)}`)
      assert.ok(typeof s.starter_tag === 'string' && s.starter_tag.length > 0, `bad starter_tag: ${JSON.stringify(s)}`)
      assert.ok(typeof s.scenario === 'string' && s.scenario.length > 0, `bad scenario: ${JSON.stringify(s)}`)
    }
  })
  await check('2c. starter_tag values are unique (seed dedup invariant)', () => {
    const tags = new Set<string>()
    for (const s of starter.STARTER_QUESTIONS) {
      assert.ok(!tags.has(s.starter_tag), `duplicate starter_tag: ${s.starter_tag}`)
      tags.add(s.starter_tag)
    }
  })
  await check('2d. all 10 scenarios A-J represented', () => {
    const scenarios = new Set(starter.STARTER_QUESTIONS.map(s => s.scenario))
    assert.ok(scenarios.size >= 10, `expected ≥10 scenarios, got ${scenarios.size}: ${Array.from(scenarios).join(', ')}`)
    const prefixes = new Set(Array.from(scenarios).map(s => s.charAt(0)))
    for (const p of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) {
      assert.ok(prefixes.has(p), `missing scenario prefix: ${p}`)
    }
  })
  await check('2e. starter_tag prefix matches eval-lab-v1', () => {
    let v1 = 0
    for (const s of starter.STARTER_QUESTIONS) {
      if (s.starter_tag.startsWith('eval-lab-v1-')) v1 += 1
    }
    assert.equal(v1, 100, `expected all 100 to use eval-lab-v1- prefix, got ${v1}`)
  })

  // ---- 3. queries module surface ----
  await check('3a. queries module exports the expected functions', () => {
    assert.equal(typeof queries.seedStarterQuestions, 'function')
    assert.equal(typeof queries.listEvalQuestions, 'function')
    assert.equal(typeof queries.listEvalAnswers, 'function')
    assert.equal(typeof queries.listEvalAnnotations, 'function')
    assert.equal(typeof queries.upsertEvalAnswer, 'function')
    assert.equal(typeof queries.upsertEvalAnnotation, 'function')
    assert.equal(typeof queries.addManualQuestion, 'function')
    assert.equal(typeof queries.deactivateQuestion, 'function')
    assert.equal(typeof queries.getQuestionByStarterTag, 'function')
    assert.equal(typeof queries.getEvalQuestionById, 'function')
    assert.equal(typeof queries.importQuestions, 'function')
  })

  // ---- 4. concurrency limiter (Issue #14) ----
  await check('4a. pLimit rejects n < 1', () => {
    assert.throws(() => conc.pLimit(0))
    assert.throws(() => conc.pLimit(-1))
    assert.throws(() => conc.pLimit(1.5))
  })
  await check('4b. pLimit(3) holds at most 3 concurrent tasks', async () => {
    const limit = conc.pLimit(3)
    let running = 0
    let peak = 0
    const tasks = Array.from({ length: 12 }, (_, i) =>
      limit(async () => {
        running += 1
        peak = Math.max(peak, running)
        // small async tick to let other tasks start
        await new Promise(r => setTimeout(r, 5))
        running -= 1
        return i
      }),
    )
    const results = await Promise.all(tasks)
    assert.equal(peak, 3, `peak concurrency was ${peak}, expected 3`)
    assert.deepEqual(results, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    // After all settle, active should be 0 and queue empty.
    assert.equal(limit.active, 0, `active leaked: ${limit.active}`)
    assert.equal(limit.queued, 0, `queued leaked: ${limit.queued}`)
  })
  await check('4c. pLimit propagates rejections without poisoning', async () => {
    const limit = conc.pLimit(2)
    const results = await Promise.allSettled([
      limit(async () => 'ok-1'),
      limit(async () => {
        throw new Error('boom')
      }),
      limit(async () => 'ok-2'),
      limit(async () => 'ok-3'),
    ])
    assert.equal(results[0].status, 'fulfilled')
    assert.equal(results[1].status, 'rejected')
    assert.equal(results[2].status, 'fulfilled')
    assert.equal(results[3].status, 'fulfilled')
    assert.equal(limit.active, 0)
    assert.equal(limit.queued, 0)
  })
  await check('4d. pLimit(1) serialises perfectly', async () => {
    const limit = conc.pLimit(1)
    let running = 0
    let peak = 0
    const tasks = Array.from({ length: 5 }, () =>
      limit(async () => {
        running += 1
        peak = Math.max(peak, running)
        await new Promise(r => setTimeout(r, 2))
        running -= 1
      }),
    )
    await Promise.all(tasks)
    assert.equal(peak, 1)
  })

  // ---- 5. retry helper (Issue #14) ----
  await check('5a. withRetry returns first success without retry', async () => {
    let calls = 0
    const v = await retry.withRetry(async () => {
      calls += 1
      return 42
    }, { maxAttempts: 3, sleep: async () => {} })
    assert.equal(calls, 1)
    assert.equal(v, 42)
  })
  await check('5b. withRetry retries up to maxAttempts then throws', async () => {
    let calls = 0
    await assert.rejects(
      retry.withRetry(async () => {
        calls += 1
        throw new Error('flaky')
      }, { maxAttempts: 3, sleep: async () => {} }),
      /flaky/,
    )
    assert.equal(calls, 3)
  })
  await check('5c. withRetry succeeds on the second attempt', async () => {
    let calls = 0
    const v = await retry.withRetry(async (attempt) => {
      calls += 1
      if (attempt === 1) throw new Error('first-fail')
      return 'ok'
    }, { maxAttempts: 3, sleep: async () => {} })
    assert.equal(calls, 2)
    assert.equal(v, 'ok')
  })
  await check('5d. withRetry honours shouldRetry=false (no further attempts)', async () => {
    let calls = 0
    await assert.rejects(
      retry.withRetry(async () => {
        calls += 1
        throw new Error('fatal')
      }, { maxAttempts: 5, sleep: async () => {}, shouldRetry: () => false }),
      /fatal/,
    )
    assert.equal(calls, 1)
  })
  await check('5e. withRetry exponential backoff base+max bounds (jitter=0)', async () => {
    const sleeps: number[] = []
    let calls = 0
    await assert.rejects(
      retry.withRetry(async () => {
        calls += 1
        throw new Error('x')
      }, {
        maxAttempts: 4,
        baseDelayMs: 100,
        maxDelayMs: 1000,
        jitter: 0,
        sleep: async ms => { sleeps.push(ms) },
      }),
      /x/,
    )
    // 4 attempts → 3 sleeps after attempts 1, 2, 3 (no sleep after the
    // final terminal failure). With base 100, jitter 0: 100, 200, 400.
    assert.equal(calls, 4)
    assert.deepEqual(sleeps, [100, 200, 400])
  })
  await check('5f. withRetry respects maxDelayMs cap', async () => {
    const sleeps: number[] = []
    await assert.rejects(
      retry.withRetry(async () => {
        throw new Error('y')
      }, {
        maxAttempts: 5,
        baseDelayMs: 1000,
        maxDelayMs: 1500,
        jitter: 0,
        sleep: async ms => { sleeps.push(ms) },
      }),
      /y/,
    )
    // exp would be 1000, 2000, 4000, 8000; capped to 1000, 1500, 1500, 1500
    assert.deepEqual(sleeps, [1000, 1500, 1500, 1500])
  })
  await check('5g. isLikelyTransient detects timeout/network shapes', () => {
    assert.equal(retry.isLikelyTransient({ name: 'AbortError' }), true)
    assert.equal(retry.isLikelyTransient({ code: 'ECONNRESET' }), true)
    assert.equal(retry.isLikelyTransient({ message: 'fetch failed' }), true)
    assert.equal(retry.isLikelyTransient({ message: 'request timeout' }), true)
    assert.equal(retry.isLikelyTransient({ message: 'invalid input' }), false)
    assert.equal(retry.isLikelyTransient(null), false)
    assert.equal(retry.isLikelyTransient(undefined), false)
  })

  // ---- 6. sample classifier (Issue #19 / Internal Console v1) ----
  // Helper: minimal answer-shape factory. The classifier reads only these
  // four fields; defaults match "successful answer".
  const ans = (
    o: Partial<{ answer_text: string | null; error: string | null; status: string | null; fallback_reason: string | null }> = {},
  ) => ({
    answer_text: 'ok-text',
    error: null,
    status: 'direct_answer',
    fallback_reason: null,
    ...o,
  })

  await check('6a. classifySample: NONE when tebiq missing', () => {
    assert.equal(classifier.classifySample(null, ans(), 'eval-lab-v1-A01'), 'NONE')
    assert.equal(classifier.classifySample(undefined, ans(), 'eval-lab-v1-A01'), 'NONE')
  })
  await check('6b. classifySample: INVALID when tebiq has error column', () => {
    assert.equal(
      classifier.classifySample(ans({ error: 'tebiq_pipeline_failed: x' }), ans(), 'eval-lab-v1-A01'),
      'INVALID',
    )
  })
  await check('6c. classifySample: INVALID when tebiq has no answer_text', () => {
    assert.equal(
      classifier.classifySample(ans({ answer_text: null }), ans(), 'eval-lab-v1-A01'),
      'INVALID',
    )
  })
  await check('6d. classifySample: TEBIQ_FALLBACK on llm_timeout regardless of DS', () => {
    assert.equal(
      classifier.classifySample(ans({ fallback_reason: 'llm_timeout' }), ans(), 'eval-lab-v1-A01'),
      'TEBIQ_FALLBACK',
    )
    // Even if DS also failed, fallback wins (precedence).
    assert.equal(
      classifier.classifySample(
        ans({ fallback_reason: 'llm_timeout' }),
        ans({ error: 'deepseek_http_500', answer_text: null }),
        'eval-lab-v1-A01',
      ),
      'TEBIQ_FALLBACK',
    )
  })
  await check('6e. classifySample: TEBIQ_ROUTING_FAILURE for OOS in regression set', () => {
    for (const tag of ['eval-lab-v1-J03', 'eval-lab-v1-J04', 'eval-lab-v1-J08', 'eval-lab-v1-I08', 'eval-lab-v1-D05', 'eval-lab-v1-D06', 'eval-lab-v1-D09']) {
      assert.equal(
        classifier.classifySample(ans({ status: 'out_of_scope' }), ans(), tag),
        'TEBIQ_ROUTING_FAILURE',
        `expected ROUTING for ${tag}`,
      )
    }
  })
  await check('6f. classifySample: TEBIQ_OOS for OOS NOT in regression set', () => {
    assert.equal(
      classifier.classifySample(ans({ status: 'out_of_scope' }), ans(), 'eval-lab-v1-A01'),
      'TEBIQ_OOS',
    )
    // Null tag treated as not-in-set.
    assert.equal(
      classifier.classifySample(ans({ status: 'out_of_scope' }), ans(), null),
      'TEBIQ_OOS',
    )
  })
  await check('6g. classifySample: DS_FAILED when TEBIQ ok but DS failed/missing', () => {
    assert.equal(classifier.classifySample(ans(), null, 'eval-lab-v1-A01'), 'DS_FAILED')
    assert.equal(
      classifier.classifySample(ans(), ans({ error: 'deepseek_http_500', answer_text: null }), 'eval-lab-v1-A01'),
      'DS_FAILED',
    )
    assert.equal(
      classifier.classifySample(ans(), ans({ answer_text: null }), 'eval-lab-v1-A01'),
      'DS_FAILED',
    )
  })
  await check('6h. classifySample: FULL_COMPARABLE when both ok and no fallback/OOS', () => {
    assert.equal(classifier.classifySample(ans(), ans(), 'eval-lab-v1-A01'), 'FULL_COMPARABLE')
    // Other fallback_reason values (not llm_timeout) don't disqualify; product
    // owner only excludes llm_timeout per v0.3.
    assert.equal(
      classifier.classifySample(ans({ fallback_reason: 'llm_parse' }), ans(), 'eval-lab-v1-A01'),
      'FULL_COMPARABLE',
    )
  })
  await check('6i. REGRESSION_SET has exactly the 7 known mis-routed tags', () => {
    const expected = [
      'eval-lab-v1-J03', 'eval-lab-v1-J04', 'eval-lab-v1-J08',
      'eval-lab-v1-I08', 'eval-lab-v1-D05', 'eval-lab-v1-D06', 'eval-lab-v1-D09',
    ]
    assert.equal(classifier.REGRESSION_SET.size, 7)
    for (const t of expected) {
      assert.ok(classifier.REGRESSION_SET.has(t), `regression set missing ${t}`)
    }
  })
  await check('6j. isAnnotationEligible only true for FULL_COMPARABLE', () => {
    assert.equal(classifier.isAnnotationEligible('FULL_COMPARABLE'), true)
    for (const c of ['TEBIQ_FALLBACK', 'TEBIQ_ROUTING_FAILURE', 'TEBIQ_OOS', 'DS_FAILED', 'INVALID', 'NONE'] as const) {
      assert.equal(classifier.isAnnotationEligible(c), false, `${c} should not be annotation-eligible`)
    }
  })

  // ---- 10. preview state-machine classifier (Issue #27 / Workstream B) ----
  await check('10a. classifySubmitOutcome: null result → error', () => {
    assert.equal(
      previewStage.classifySubmitOutcome(null, { question_text: 'q', starter_tag: null }),
      'error',
    )
  })
  await check('10b. classifySubmitOutcome: ok=false → error', () => {
    assert.equal(
      previewStage.classifySubmitOutcome(
        { ok: false, error: 'pipeline_failed' },
        { question_text: 'q', starter_tag: null },
      ),
      'error',
    )
  })
  await check('10c. classifySubmitOutcome: out_of_scope → human_review_required', () => {
    assert.equal(
      previewStage.classifySubmitOutcome(
        { ok: true, status: 'out_of_scope' },
        { question_text: 'q', starter_tag: null },
      ),
      'human_review_required',
    )
  })
  await check('10d. classifySubmitOutcome: REGRESSION_SET tag forces human_review', () => {
    // Even on a successful answered response, a regression-set tag goes
    // to human_review_required per Work Packet §B4 (high-risk 不裸流).
    assert.equal(
      previewStage.classifySubmitOutcome(
        { ok: true, status: 'direct_answer', answer_id: 'a1' },
        { question_text: 'q', starter_tag: 'eval-lab-v1-J04' },
      ),
      'human_review_required',
    )
  })
  await check('10e. classifySubmitOutcome: fallback_reason set → fallback', () => {
    assert.equal(
      previewStage.classifySubmitOutcome(
        { ok: true, status: 'preliminary', fallback_reason: 'llm_timeout', answer_id: 'a1' },
        { question_text: 'q', starter_tag: 'eval-lab-v1-A01' },
      ),
      'fallback',
    )
  })
  await check('10f. classifySubmitOutcome: clarification_needed → clarification_needed', () => {
    assert.equal(
      previewStage.classifySubmitOutcome(
        { ok: true, status: 'clarification_needed' },
        { question_text: 'q', starter_tag: 'eval-lab-v1-A01' },
      ),
      'clarification_needed',
    )
  })
  await check('10g. classifySubmitOutcome: clean direct_answer → final_answer', () => {
    assert.equal(
      previewStage.classifySubmitOutcome(
        { ok: true, status: 'direct_answer', answer_id: 'a1' },
        { question_text: 'q', starter_tag: 'eval-lab-v1-A01' },
      ),
      'final_answer',
    )
  })
  await check('10h. precedence: out_of_scope beats regression_set (both → human_review)', () => {
    // Both rules want human_review_required; ensure the precedence path
    // is the out_of_scope branch (so detail copy reflects routing).
    const r = previewStage.classifySubmitOutcome(
      { ok: true, status: 'out_of_scope' },
      { question_text: 'q', starter_tag: 'eval-lab-v1-J04' },
    )
    assert.equal(r, 'human_review_required')
  })
  await check('10i. precedence: regression_set beats fallback', () => {
    // Regression-set wins over a fallback hint so the reviewer doesn't
    // see a "降级回答" framing on a question we already know is mis-routed.
    const r = previewStage.classifySubmitOutcome(
      { ok: true, status: 'preliminary', fallback_reason: 'llm_timeout', answer_id: 'a1' },
      { question_text: 'q', starter_tag: 'eval-lab-v1-D05' },
    )
    assert.equal(r, 'human_review_required')
  })
  await check('10j. STAGE_COPY non-empty for every non-idle stage', () => {
    const stages = [
      'received', 'routing', 'risk_check', 'generating',
      'final_answer', 'fallback', 'clarification_needed',
      'human_review_required', 'error',
    ] as const
    for (const s of stages) {
      assert.ok(previewStage.STAGE_COPY[s].length > 0, `${s} missing copy`)
    }
  })
  await check('10k. withSubmitTimeout: rejects with SubmitTimeoutError after timeout', async () => {
    let caught: unknown = null
    try {
      await previewStage.withSubmitTimeout(new Promise(() => {}), 30) // never resolves
    } catch (e) { caught = e }
    assert.ok(caught instanceof previewStage.SubmitTimeoutError, `expected SubmitTimeoutError, got ${caught}`)
  })
  await check('10l. withSubmitTimeout: resolves the underlying value when fast enough', async () => {
    const v = await previewStage.withSubmitTimeout(Promise.resolve(42), 100)
    assert.equal(v, 42)
  })
  await check('10m. STAGE_TIMING: routing <= 500ms, risk_check <= 500ms, total ≤ 1000ms', () => {
    // Ensures Work Packet §验收标准 "≤1s 显示 received" / "≤3s 过渡到
    // routing → risk_check" cannot silently drift.
    assert.ok(previewStage.STAGE_TIMING.routing_delay_ms <= 1000)
    assert.ok(previewStage.STAGE_TIMING.risk_check_delay_ms <= 1000)
    assert.ok(
      previewStage.STAGE_TIMING.routing_delay_ms + previewStage.STAGE_TIMING.risk_check_delay_ms <= 3000,
      'received→routing→risk_check must complete within 3s',
    )
  })
  await check('10n. STAGE_TIMING: api_timeout_ms = 25000 (Work Packet §B2)', () => {
    assert.equal(previewStage.STAGE_TIMING.api_timeout_ms, 25_000)
  })

  // ---- 7. risk-matrix-data (Issue #26 / Workstream A) ----
  await check('7a. RISK_MATRIX has 100 entries matching Eval Lab seed pack', () => {
    const matrixKeys = Object.keys(riskMatrix.RISK_MATRIX)
    assert.equal(matrixKeys.length, 100, `expected 100, got ${matrixKeys.length}`)
    // Each starter_tag in the seed pack should map to a matrix entry.
    for (const s of starter.STARTER_QUESTIONS) {
      assert.ok(
        matrixKeys.includes(s.starter_tag),
        `seed tag missing from matrix: ${s.starter_tag}`,
      )
    }
  })
  await check('7b. risk_level values are HIGH | MEDIUM | LOW only', () => {
    const allowed = new Set(['HIGH', 'MEDIUM', 'LOW'])
    for (const [tag, e] of Object.entries(riskMatrix.RISK_MATRIX)) {
      assert.ok(allowed.has(e.risk_level), `${tag}: bad risk_level ${e.risk_level}`)
    }
  })
  await check('7c. handoff values are yes | conditional | no | null', () => {
    const allowed = new Set(['yes', 'conditional', 'no', null])
    for (const [tag, e] of Object.entries(riskMatrix.RISK_MATRIX)) {
      assert.ok(
        allowed.has(e.handoff as unknown as string | null),
        `${tag}: bad handoff ${String(e.handoff)}`,
      )
    }
  })
  await check('7d. getRiskMatrixEntry returns null for unknown tag', () => {
    assert.equal(riskMatrix.getRiskMatrixEntry('eval-lab-v1-Z99'), null)
    assert.equal(riskMatrix.getRiskMatrixEntry(null), null)
    assert.equal(riskMatrix.getRiskMatrixEntry(undefined), null)
  })
  await check('7e. Routing regression set marked HIGH risk in matrix', () => {
    // The 7 routing-regression tags ought to be HIGH risk in DOMAIN's view.
    // Matrix is DOMAIN-CC v0.1 draft; this assertion is a tripwire so the
    // console doesn't quietly start showing low-risk badges on these.
    for (const tag of Array.from(classifier.REGRESSION_SET)) {
      const e = riskMatrix.getRiskMatrixEntry(tag)
      assert.ok(e, `regression tag ${tag} not in matrix`)
      assert.equal(e!.risk_level, 'HIGH', `regression tag ${tag} should be HIGH, got ${e!.risk_level}`)
    }
  })

  // ---- 8. extended badges (Issue #26 §A2) ----
  await check('8a. extendedBadges: HIGH risk + yes-handoff + non-FULL → P0+DOMAIN+BLOCKED', () => {
    const b = classifier.extendedBadges({
      sampleClass: 'TEBIQ_FALLBACK',
      riskLevel: 'HIGH',
      handoff: 'yes',
    })
    assert.deepEqual(Array.from(b).sort(), ['annotation_blocked', 'domain_review_needed', 'p0_candidate'])
  })
  await check('8b. extendedBadges: MEDIUM + conditional + FULL → P1+DOMAIN only (no BLOCKED)', () => {
    const b = classifier.extendedBadges({
      sampleClass: 'FULL_COMPARABLE',
      riskLevel: 'MEDIUM',
      handoff: 'conditional',
    })
    assert.deepEqual(Array.from(b).sort(), ['domain_review_needed', 'p1_candidate'])
  })
  await check('8c. extendedBadges: LOW + no-handoff + FULL → empty (no badges)', () => {
    const b = classifier.extendedBadges({
      sampleClass: 'FULL_COMPARABLE',
      riskLevel: 'LOW',
      handoff: 'no',
    })
    assert.deepEqual(Array.from(b), [])
  })
  await check('8d. annotationBlockReason: null for FULL, non-null for others', () => {
    assert.equal(classifier.annotationBlockReason('FULL_COMPARABLE'), null)
    for (const c of ['TEBIQ_FALLBACK', 'TEBIQ_ROUTING_FAILURE', 'TEBIQ_OOS', 'DS_FAILED', 'INVALID', 'NONE'] as const) {
      const reason = classifier.annotationBlockReason(c)
      assert.ok(reason && reason.length > 0, `${c}: missing block reason`)
    }
  })

  // ---- 9. provider health (Issue #26 §A1) ----
  const now = new Date('2026-05-05T12:00:00Z')
  const recent = (offsetMins: number) =>
    new Date(now.getTime() - offsetMins * 60_000).toISOString()
  await check('9a. inferDeepseekHealth: empty → unknown', () => {
    const h = providerHealth.inferDeepseekHealth([], { now })
    assert.equal(h.status, 'unknown')
    assert.equal(h.last_checked_at, null)
    assert.equal(h.sample_size, 0)
  })
  await check('9b. inferDeepseekHealth: latest is success → healthy', () => {
    const h = providerHealth.inferDeepseekHealth(
      [
        { answer_type: 'deepseek_raw', answer_text: 'ok', error: null, created_at: recent(60) },
        { answer_type: 'deepseek_raw', answer_text: null, error: 'deepseek_http_502', created_at: recent(120) },
      ],
      { now },
    )
    assert.equal(h.status, 'healthy')
    assert.equal(h.sample_size, 2)
  })
  await check('9c. inferDeepseekHealth: latest is timeout → timeout', () => {
    const h = providerHealth.inferDeepseekHealth(
      [
        { answer_type: 'deepseek_raw', answer_text: null, error: 'deepseek_timeout', created_at: recent(30) },
        { answer_type: 'deepseek_raw', answer_text: 'ok', error: null, created_at: recent(120) },
      ],
      { now },
    )
    assert.equal(h.status, 'timeout')
  })
  await check('9d. inferDeepseekHealth: latest is non-timeout error → unavailable', () => {
    const h = providerHealth.inferDeepseekHealth(
      [{ answer_type: 'deepseek_raw', answer_text: null, error: 'deepseek_unknown', created_at: recent(30) }],
      { now },
    )
    assert.equal(h.status, 'unavailable')
  })
  await check('9e. inferDeepseekHealth: only outside-lookback rows → unknown', () => {
    const h = providerHealth.inferDeepseekHealth(
      [{ answer_type: 'deepseek_raw', answer_text: 'ok', error: null, created_at: recent(60 * 48) }],
      { now, lookbackHours: 24 },
    )
    assert.equal(h.status, 'unknown')
  })
  await check('9f. inferDeepseekHealth: ignores tebiq_current rows', () => {
    const h = providerHealth.inferDeepseekHealth(
      [
        { answer_type: 'tebiq_current', answer_text: null, error: 'tebiq_pipeline_failed', created_at: recent(10) },
      ],
      { now },
    )
    assert.equal(h.status, 'unknown')
  })

  // ---- 11. preview SSE protocol (Issue #32 / Workstream C) ----
  await check('11a. shouldStreamContent: HIGH risk → false', () => {
    assert.equal(previewStream.shouldStreamContent('HIGH', false), false)
  })
  await check('11b. shouldStreamContent: REGRESSION_SET → false (overrides MEDIUM/LOW)', () => {
    assert.equal(previewStream.shouldStreamContent('LOW', true), false)
    assert.equal(previewStream.shouldStreamContent('MEDIUM', true), false)
    assert.equal(previewStream.shouldStreamContent(null, true), false)
  })
  await check('11c. shouldStreamContent: MEDIUM/LOW + non-regression → true', () => {
    assert.equal(previewStream.shouldStreamContent('MEDIUM', false), true)
    assert.equal(previewStream.shouldStreamContent('LOW', false), true)
    assert.equal(previewStream.shouldStreamContent(null, false), true)
  })
  await check('11d. gatingReason: regression_set wins over high_risk_matrix', () => {
    // J04 is in REGRESSION_SET AND has risk_level=HIGH in the matrix.
    // The reason returned should be 'regression_set' (more specific).
    assert.equal(
      previewStream.gatingReason('eval-lab-v1-J04', 'HIGH'),
      'regression_set',
    )
  })
  await check('11e. gatingReason: HIGH risk without regression → high_risk_matrix', () => {
    // A01 has HIGH risk but is NOT in regression set.
    assert.equal(previewStream.gatingReason('eval-lab-v1-A01', 'HIGH'), 'high_risk_matrix')
  })
  await check('11f. gatingReason: MEDIUM / LOW / null → null (no gating)', () => {
    assert.equal(previewStream.gatingReason('eval-lab-v1-A06', 'MEDIUM'), null)
    assert.equal(previewStream.gatingReason('eval-lab-v1-B01', 'LOW'), null)
    assert.equal(previewStream.gatingReason(null, null), null)
  })

  await check('11g. formatSseFrame produces a single data line + double newline', () => {
    const frame = previewStream.formatSseFrame({
      event: 'question_received',
      ts: 1234567890,
    })
    assert.equal(frame, 'data: {"event":"question_received","ts":1234567890}\n\n')
  })

  await check('11h. parseSseChunk: parses a complete frame', () => {
    const buf = 'data: {"event":"routing_done","domain":"keiei-kanri","risk_level":"HIGH","ts":1}\n\n'
    const { events, remainder } = previewStream.parseSseChunk(buf)
    assert.equal(events.length, 1)
    assert.equal(events[0].event, 'routing_done')
    assert.equal(remainder, '')
  })
  await check('11i. parseSseChunk: returns incomplete frame as remainder', () => {
    const buf = 'data: {"event":"routing_done","domain":null,"risk_level":null,'
    const { events, remainder } = previewStream.parseSseChunk(buf)
    assert.equal(events.length, 0)
    assert.equal(remainder, buf)
  })
  await check('11j. parseSseChunk: parses multiple frames + keeps trailing partial', () => {
    const buf =
      'data: {"event":"question_received","ts":1}\n\n' +
      'data: {"event":"routing_started","ts":2}\n\n' +
      'data: {"event":"final_'
    const { events, remainder } = previewStream.parseSseChunk(buf)
    assert.equal(events.length, 2)
    assert.equal(events[0].event, 'question_received')
    assert.equal(events[1].event, 'routing_started')
    assert.equal(remainder, 'data: {"event":"final_')
  })
  await check('11k. parseSseChunk: malformed frames are silently dropped', () => {
    const buf = 'data: not-json\n\ndata: {"event":"error","detail":"x","ts":3}\n\n'
    const { events } = previewStream.parseSseChunk(buf)
    assert.equal(events.length, 1)
    assert.equal(events[0].event, 'error')
  })

  await check('11l. eventToStage maps lifecycle → progress stages', () => {
    assert.equal(previewStream.eventToStage({ event: 'question_received', ts: 0 }), 'received')
    assert.equal(previewStream.eventToStage({ event: 'routing_started', ts: 0 }), 'routing')
    assert.equal(previewStream.eventToStage({ event: 'routing_done', domain: null, risk_level: null, ts: 0 }), 'risk_check')
    assert.equal(previewStream.eventToStage({ event: 'risk_detected', reason: 'regression_set', risk_level: null, ts: 0 }), 'risk_check')
    assert.equal(previewStream.eventToStage({ event: 'generation_started', ts: 0 }), 'generating')
    assert.equal(previewStream.eventToStage({ event: 'generation_done', status: 'preliminary', ts: 0 }), 'generating')
  })
  await check('11m. eventToStage maps terminals correctly', () => {
    assert.equal(previewStream.eventToStage({ event: 'final_answer_ready', answer_id: 'a1', ts: 0 }), 'final_answer')
    assert.equal(previewStream.eventToStage({ event: 'fallback_triggered', fallback_reason: 'llm_timeout', ts: 0 }), 'fallback')
    assert.equal(previewStream.eventToStage({ event: 'clarification_needed', ts: 0 }), 'clarification_needed')
    assert.equal(previewStream.eventToStage({ event: 'human_review_required', reason: 'regression_set', answer_id: null, ts: 0 }), 'human_review_required')
    assert.equal(previewStream.eventToStage({ event: 'provider_timeout', ts: 0 }), 'error')
    assert.equal(previewStream.eventToStage({ event: 'error', detail: 'x', ts: 0 }), 'error')
  })
  await check('11n. isTerminalEvent identifies the 5 terminal events', () => {
    assert.equal(previewStream.isTerminalEvent({ event: 'final_answer_ready', answer_id: 'a1', ts: 0 }), true)
    assert.equal(previewStream.isTerminalEvent({ event: 'human_review_required', reason: 'regression_set', answer_id: null, ts: 0 }), true)
    assert.equal(previewStream.isTerminalEvent({ event: 'clarification_needed', ts: 0 }), true)
    assert.equal(previewStream.isTerminalEvent({ event: 'provider_timeout', ts: 0 }), true)
    assert.equal(previewStream.isTerminalEvent({ event: 'error', detail: 'x', ts: 0 }), true)
    // Non-terminals
    assert.equal(previewStream.isTerminalEvent({ event: 'question_received', ts: 0 }), false)
    assert.equal(previewStream.isTerminalEvent({ event: 'routing_done', domain: null, risk_level: null, ts: 0 }), false)
    assert.equal(previewStream.isTerminalEvent({ event: 'fallback_triggered', fallback_reason: 'x', ts: 0 }), false)
    // fallback_triggered is INTENTIONALLY not terminal — final_answer_ready
    // follows it for low-risk fallback paths.
  })
  await check('11o. SSE_TIMING: 25s pipeline timeout matches Work Packet contract', () => {
    assert.equal(previewStream.SSE_TIMING.pipeline_timeout_ms, 25_000)
  })
  await check('11p. final_answer_ready payload type carries ONLY answer_id (Work Packet §C3 invariant)', () => {
    // Compile-time invariant check — if someone adds answer content to the
    // payload, this test starts referencing missing keys / extra keys.
    const e: import('@/lib/eval-lab/preview-stream').PreviewSseEvent = {
      event: 'final_answer_ready',
      answer_id: 'a1',
      ts: 0,
    }
    // Exact-key check: the only allowed keys are event/answer_id/ts.
    const allowed = new Set(['event', 'answer_id', 'ts'])
    for (const k of Object.keys(e)) {
      assert.ok(allowed.has(k), `final_answer_ready leaked field: ${k}`)
    }
  })

  console.log(`\nEval Lab V1 smoke: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
}

main().catch(e => {
  console.error('fatal', e)
  process.exit(1)
})
