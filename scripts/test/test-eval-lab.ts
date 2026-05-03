/**
 * TEBIQ Eval Lab V0 — internal smoke.
 *
 * Covers what runs without a live browser or DeepSeek API:
 *   1. env gate at lib/eval-lab/auth.ts  (true when EVAL_LAB_ENABLED=1)
 *   2. starter-questions list (≥30 entries with the expected shape)
 *   3. localStorage round-trip via storage.ts (shimmed in-memory)
 *   4. import/export JSON round-trip
 *   5. annotation update + filtering
 *
 * What this does NOT cover (needs browser / live API):
 *   - The /api/internal/eval-lab/deepseek-raw network call
 *   - The /api/internal/eval-lab/tebiq-answer pipeline call
 *   - The page UI
 *
 * Live verification of the page goes via Vercel preview with
 * EVAL_LAB_ENABLED=1.
 */
import { strict as assert } from 'node:assert'

class MemStorage {
  private map = new Map<string, string>()
  get length() { return this.map.size }
  key(i: number): string | null { return Array.from(this.map.keys())[i] ?? null }
  getItem(k: string): string | null { return this.map.get(k) ?? null }
  setItem(k: string, v: string): void { this.map.set(k, String(v)) }
  removeItem(k: string): void { this.map.delete(k) }
  clear(): void { this.map.clear() }
}
const memStorage = new MemStorage()
;(globalThis as { window?: unknown }).window = { localStorage: memStorage }
;(globalThis as { localStorage?: unknown }).localStorage = memStorage

async function main() {
  const auth = await import('@/lib/eval-lab/auth')
  const starter = await import('@/lib/eval-lab/starter-questions')
  const storage = await import('@/lib/eval-lab/storage')

  let passes = 0
  let total = 0
  const fails: string[] = []
  function check(name: string, fn: () => void) {
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
  check('2a. STARTER_QUESTIONS ≥ 30', () => {
    assert.ok(starter.STARTER_QUESTIONS.length >= 30, `expected ≥30, got ${starter.STARTER_QUESTIONS.length}`)
  })
  check('2b. each starter has question + starter_tag', () => {
    for (const s of starter.STARTER_QUESTIONS) {
      assert.ok(typeof s.question === 'string' && s.question.length >= 4)
      assert.ok(typeof s.starter_tag === 'string' && s.starter_tag.length > 0)
    }
  })
  check('2c. answer-core 10 + deepseek-open ≥ 20', () => {
    const ac = starter.STARTER_QUESTIONS.filter(s => s.starter_tag.startsWith('answer-core-regression'))
    const ds = starter.STARTER_QUESTIONS.filter(s => s.starter_tag.startsWith('deepseek-open'))
    assert.equal(ac.length, 10, `expected 10 answer-core, got ${ac.length}`)
    assert.ok(ds.length >= 20, `expected ≥20 deepseek-open, got ${ds.length}`)
  })

  // ---- 3. storage round-trip ----
  memStorage.clear()
  check('3a. loadState() seeds with starter pack on first call', () => {
    const initial = storage.loadState()
    assert.ok(initial.length >= 30)
    assert.equal(initial[0].source, 'starter')
    // Side effect: localStorage now contains the seeded state
    assert.ok(memStorage.getItem(storage.STORAGE_KEY))
  })

  let qs = storage.loadState()
  check('3b. saveState writes JSON with schema_version', () => {
    storage.saveState(qs)
    const raw = memStorage.getItem(storage.STORAGE_KEY)
    assert.ok(raw)
    const parsed = JSON.parse(raw!)
    assert.equal(parsed.schema_version, 'eval-lab-v0')
    assert.ok(Array.isArray(parsed.questions))
  })

  check('3c. addQuestions appends imported lines', () => {
    qs = storage.addQuestions(qs, ['新问题 1', '新问题 2', ' '], 'imported')
    storage.saveState(qs)
    assert.equal(qs[qs.length - 2].question, '新问题 1')
    assert.equal(qs[qs.length - 1].question, '新问题 2')
    assert.equal(qs[qs.length - 1].source, 'imported')
  })

  check('3d. updateAnnotation persists patch + sets annotated_at', () => {
    const target = qs[0]
    qs = storage.updateAnnotation(qs, target.id, {
      score: 4,
      severity: 'P1',
      direction_correct: 'yes',
      must_have: '在留資格変更',
    })
    const updated = qs.find(q => q.id === target.id)
    assert.ok(updated)
    assert.equal(updated.annotation.score, 4)
    assert.equal(updated.annotation.severity, 'P1')
    assert.equal(updated.annotation.direction_correct, 'yes')
    assert.equal(updated.annotation.must_have, '在留資格変更')
    assert.ok(updated.annotation.annotated_at)
  })

  check('3e. updateDeepseek persists snapshot', () => {
    const target = qs[0]
    qs = storage.updateDeepseek(qs, target.id, {
      text: 'mocked deepseek raw answer',
      generated_at: new Date().toISOString(),
    })
    const u = qs.find(q => q.id === target.id)
    assert.equal(u?.deepseek_raw.text, 'mocked deepseek raw answer')
  })

  check('3f. updateTebiq persists snapshot', () => {
    const target = qs[0]
    qs = storage.updateTebiq(qs, target.id, {
      answer_id: 'ans-test-001',
      answer_link: '/answer/ans-test-001',
      status: 'preliminary',
      domain: 'long_term_resident',
      engine_version: 'answer-core-v1.1-llm',
      visible_text: 'mocked TEBIQ output body',
    })
    const u = qs.find(q => q.id === target.id)
    assert.equal(u?.tebiq.answer_id, 'ans-test-001')
    assert.equal(u?.tebiq.engine_version, 'answer-core-v1.1-llm')
  })

  check('3g. removeQuestion drops by id', () => {
    const before = qs.length
    qs = storage.removeQuestion(qs, qs[qs.length - 1].id)
    assert.equal(qs.length, before - 1)
  })

  // ---- 4. export / import round-trip ----
  let exportedFull = ''
  check('4a. exportFullJSON has schema_version + questions[]', () => {
    exportedFull = storage.exportFullJSON(qs)
    const parsed = JSON.parse(exportedFull)
    assert.equal(parsed.schema_version, 'eval-lab-v0')
    assert.ok(Array.isArray(parsed.questions))
    assert.equal(parsed.questions.length, qs.length)
  })

  check('4b. importJSON round-trips full state', () => {
    const imported = storage.importJSON(exportedFull)
    assert.ok(imported)
    assert.equal(imported.length, qs.length)
    assert.equal(imported[0].id, qs[0].id)
  })

  check('4c. exportGoldenJSON includes spec fields only', () => {
    const golden = storage.exportGoldenJSON(qs)
    const parsed = JSON.parse(golden)
    assert.equal(parsed.schema_version, 'eval-lab-golden-v0')
    assert.ok(Array.isArray(parsed.items))
    const item = parsed.items[0]
    // Required golden fields per spec §6
    assert.ok('question' in item)
    assert.ok('deepseek_raw_answer' in item)
    assert.ok('tebiq_answer_text' in item)
    assert.ok('tebiq_answer_id' in item)
    assert.ok('score' in item)
    assert.ok('severity' in item)
    assert.ok('direction_correct' in item)
    assert.ok('must_have' in item)
    assert.ok('must_not_have' in item)
    assert.ok('should_handoff' in item)
    assert.ok('action' in item)
    // Should NOT contain raw annotation fields not in golden spec
    assert.ok(!('hallucination' in item), 'golden export must not include hallucination flag')
    assert.ok(!('reviewer_note' in item), 'golden export must not include reviewer_note')
  })

  // ---- 5. resetToStarters reseeds ----
  check('5. resetToStarters wipes user data and reseeds starter pack', () => {
    qs = storage.resetToStarters()
    assert.ok(qs.length >= 30)
    // No annotations after reset
    assert.equal(qs.filter(q => q.annotation.score !== null).length, 0)
  })

  console.log(`\nEval Lab V0 smoke: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
}

main().catch(e => { console.error('fatal', e); process.exit(1) })
