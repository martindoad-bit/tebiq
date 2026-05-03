/**
 * TEBIQ Eval Lab V1 — internal smoke (DB-free).
 *
 * Covers what runs without a live DB / browser / DeepSeek API:
 *   1. env gate at lib/eval-lab/auth.ts  (true when EVAL_LAB_ENABLED=1)
 *   2. starter-questions list (100 entries across 10 scenarios A-J)
 *   3. starter-tag uniqueness (the seed dedup invariant)
 *   4. queries module exports the expected surface
 *
 * What this does NOT cover (needs DB / live API):
 *   - DB seed idempotency under real Postgres
 *   - /api/internal/eval-lab/state shape end-to-end
 *   - The /api/internal/eval-lab/deepseek-raw network call
 *   - The /api/internal/eval-lab/tebiq-answer pipeline call
 *   - The page UI
 *
 * Live verification of the page goes via Vercel preview with
 * EVAL_LAB_ENABLED=1.
 */
import { strict as assert } from 'node:assert'

async function main() {
  const auth = await import('@/lib/eval-lab/auth')
  const starter = await import('@/lib/eval-lab/starter-questions')
  const queries = await import('@/lib/db/queries/eval-lab')

  let passes = 0
  let total = 0
  const fails: string[] = []
  function check(name: string, fn: () => void | Promise<void>) {
    total += 1
    try {
      const r = fn()
      if (r instanceof Promise) {
        return r.then(
          () => {
            console.log(`PASS  ${name}`)
            passes += 1
          },
          (e: unknown) => {
            const msg = e instanceof Error ? e.message : String(e)
            console.log(`FAIL  ${name}`)
            console.log(`  └ ${msg}`)
            fails.push(`${name}: ${msg}`)
          },
        )
      }
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
  check('1a. isEvalLabEnabled() default = false', () => {
    delete process.env.EVAL_LAB_ENABLED
    assert.equal(auth.isEvalLabEnabled(), false)
  })
  check('1b. EVAL_LAB_ENABLED=0 → false', () => {
    process.env.EVAL_LAB_ENABLED = '0'
    assert.equal(auth.isEvalLabEnabled(), false)
  })
  check('1c. EVAL_LAB_ENABLED=true (string "true") → false (only "1" enables)', () => {
    process.env.EVAL_LAB_ENABLED = 'true'
    assert.equal(auth.isEvalLabEnabled(), false)
  })
  check('1d. EVAL_LAB_ENABLED=1 → true', () => {
    process.env.EVAL_LAB_ENABLED = '1'
    assert.equal(auth.isEvalLabEnabled(), true)
  })

  // ---- 2. starter pack shape ----
  check('2a. STARTER_QUESTIONS == 100', () => {
    assert.equal(
      starter.STARTER_QUESTIONS.length,
      100,
      `expected 100, got ${starter.STARTER_QUESTIONS.length}`,
    )
  })
  check('2b. each starter has question + starter_tag + scenario', () => {
    for (const s of starter.STARTER_QUESTIONS) {
      assert.ok(typeof s.question === 'string' && s.question.length >= 4, `bad question: ${JSON.stringify(s)}`)
      assert.ok(typeof s.starter_tag === 'string' && s.starter_tag.length > 0, `bad starter_tag: ${JSON.stringify(s)}`)
      assert.ok(typeof s.scenario === 'string' && s.scenario.length > 0, `bad scenario: ${JSON.stringify(s)}`)
    }
  })
  check('2c. starter_tag values are unique (seed dedup invariant)', () => {
    const tags = new Set<string>()
    for (const s of starter.STARTER_QUESTIONS) {
      assert.ok(!tags.has(s.starter_tag), `duplicate starter_tag: ${s.starter_tag}`)
      tags.add(s.starter_tag)
    }
  })
  check('2d. all 10 scenarios A-J represented', () => {
    const scenarios = new Set(starter.STARTER_QUESTIONS.map(s => s.scenario))
    assert.ok(scenarios.size >= 10, `expected ≥10 scenarios, got ${scenarios.size}: ${Array.from(scenarios).join(', ')}`)
    // Per the spec each of A-J should have at least one entry.
    const prefixes = new Set(Array.from(scenarios).map(s => s.charAt(0)))
    for (const p of ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']) {
      assert.ok(prefixes.has(p), `missing scenario prefix: ${p}`)
    }
  })
  check('2e. starter_tag prefix matches eval-lab-v1', () => {
    let v1 = 0
    for (const s of starter.STARTER_QUESTIONS) {
      if (s.starter_tag.startsWith('eval-lab-v1-')) v1 += 1
    }
    assert.equal(v1, 100, `expected all 100 to use eval-lab-v1- prefix, got ${v1}`)
  })

  // ---- 3. queries module surface ----
  check('3a. queries module exports the expected functions', () => {
    assert.equal(typeof queries.seedStarterQuestions, 'function')
    assert.equal(typeof queries.listEvalQuestions, 'function')
    assert.equal(typeof queries.listEvalAnswers, 'function')
    assert.equal(typeof queries.listEvalAnnotations, 'function')
    assert.equal(typeof queries.upsertEvalAnswer, 'function')
    assert.equal(typeof queries.upsertEvalAnnotation, 'function')
    assert.equal(typeof queries.addManualQuestion, 'function')
    assert.equal(typeof queries.deactivateQuestion, 'function')
    assert.equal(typeof queries.getQuestionByStarterTag, 'function')
    assert.equal(typeof queries.importQuestions, 'function')
  })

  // Drain any pending async checks.
  await new Promise<void>(resolve => setTimeout(resolve, 0))

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
