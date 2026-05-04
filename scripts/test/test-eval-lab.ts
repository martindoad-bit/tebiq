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
