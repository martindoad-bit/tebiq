/**
 * 1.0 Alpha Learning Console contract tests (Issue #41).
 *
 * DB-free / SSR-free unit tests for:
 *   - 7-tab filter predicate semantics (Pack §4)
 *   - KPI roll-up math (Pack §5)
 *   - Today-vs-yesterday boundary handling (Asia/Tokyo)
 *
 * Live console smoke (page renders / detail page renders / EVAL_LAB
 * gate returns 404) lives as live curl GM/QA verification on the
 * Vercel Preview after deploy.
 */
import { strict as assert } from 'node:assert'
import type { AiConsultation } from '../../lib/db/queries/aiConsultations'

async function main() {
  const mod = await import('@/lib/learning-console/types')

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

  function row(p: Partial<AiConsultation> = {}): AiConsultation {
    const now = new Date()
    return {
      id: 'r_' + Math.random().toString(36).slice(2, 10),
      viewerId: 'v_test',
      userQuestionText: 'Q',
      hasImage: false,
      imageSummary: null,
      imageStorageRef: null,
      aiAnswerText: null,
      finalAnswerText: null,
      model: 'deepseek-v4-pro',
      promptVersion: 'consultation_alpha_v1',
      factAnchorIds: [],
      riskKeywordHits: [],
      forbiddenRedactions: [],
      streamStartedAt: now,
      firstTokenAt: null,
      completedAt: null,
      firstTokenLatencyMs: null,
      totalLatencyMs: null,
      completionStatus: 'completed',
      partialAnswerSaved: false,
      timeoutReason: null,
      feedbackType: null,
      savedQuestion: false,
      humanConfirmClicked: false,
      followUpCount: 0,
      schemaVersion: 'ai-consultation-v1',
      createdAt: now,
      updatedAt: now,
      ...p,
    } as AiConsultation
  }

  // ---- 1. Tab labels + tab list ----
  check('1a. LEARNING_CONSOLE_TABS has exactly 7 entries (Pack §4)', () => {
    assert.equal(mod.LEARNING_CONSOLE_TABS.length, 7)
  })
  check('1b. LEARNING_CONSOLE_TAB_LABELS keys match LEARNING_CONSOLE_TABS', () => {
    for (const t of mod.LEARNING_CONSOLE_TABS) {
      assert.ok(mod.LEARNING_CONSOLE_TAB_LABELS[t], `missing label for tab "${t}"`)
    }
  })
  check('1c. tab order matches Pack §4 (1.全部 / 2.图片 / 3.高风险 / 4.不准确 / 5.人工 / 6.已保存 / 7.超时)', () => {
    assert.deepEqual(mod.LEARNING_CONSOLE_TABS, [
      'all', 'image', 'risk', 'inaccurate', 'human_review', 'saved', 'failure',
    ])
  })

  // ---- 2. matchesTab predicate ----
  check('2a. all → matches every row', () => {
    assert.equal(mod.matchesTab(row(), 'all'), true)
    assert.equal(mod.matchesTab(row({ completionStatus: 'failed' }), 'all'), true)
  })
  check('2b. image → only hasImage=true', () => {
    assert.equal(mod.matchesTab(row({ hasImage: true }), 'image'), true)
    assert.equal(mod.matchesTab(row({ hasImage: false }), 'image'), false)
  })
  check('2c. risk → riskKeywordHits.length > 0', () => {
    assert.equal(mod.matchesTab(row({ riskKeywordHits: ['离婚'] }), 'risk'), true)
    assert.equal(mod.matchesTab(row({ riskKeywordHits: [] }), 'risk'), false)
  })
  check('2d. inaccurate → feedbackType === "inaccurate"', () => {
    assert.equal(mod.matchesTab(row({ feedbackType: 'inaccurate' }), 'inaccurate'), true)
    assert.equal(mod.matchesTab(row({ feedbackType: 'helpful' }), 'inaccurate'), false)
    assert.equal(mod.matchesTab(row({ feedbackType: null }), 'inaccurate'), false)
  })
  check('2e. human_review → feedbackType="human_review" OR humanConfirmClicked=true', () => {
    assert.equal(mod.matchesTab(row({ feedbackType: 'human_review' }), 'human_review'), true)
    assert.equal(mod.matchesTab(row({ humanConfirmClicked: true }), 'human_review'), true)
    assert.equal(mod.matchesTab(row(), 'human_review'), false)
  })
  check('2f. saved → savedQuestion=true', () => {
    assert.equal(mod.matchesTab(row({ savedQuestion: true }), 'saved'), true)
    assert.equal(mod.matchesTab(row({ savedQuestion: false }), 'saved'), false)
  })
  check('2g. failure → timeout OR failed', () => {
    assert.equal(mod.matchesTab(row({ completionStatus: 'timeout' }), 'failure'), true)
    assert.equal(mod.matchesTab(row({ completionStatus: 'failed' }), 'failure'), true)
    assert.equal(mod.matchesTab(row({ completionStatus: 'completed' }), 'failure'), false)
    assert.equal(mod.matchesTab(row({ completionStatus: 'streaming' }), 'failure'), false)
  })

  // ---- 3. KPI roll-up ----
  check('3a. empty rows → all KPIs zero, rates null', () => {
    const k = mod.computeKpis([])
    assert.equal(k.todayConsultations, 0)
    assert.equal(k.todayImages, 0)
    assert.equal(k.todayRiskHits, 0)
    assert.equal(k.todayInaccurateRate, null)
    assert.equal(k.todayTimeoutRate, null)
  })
  check('3b. only old rows (created yesterday JST) → today counts zero', () => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const k = mod.computeKpis([
      row({ createdAt: yesterday, hasImage: true, riskKeywordHits: ['离婚'] }),
      row({ createdAt: yesterday, completionStatus: 'timeout' }),
    ])
    assert.equal(k.todayConsultations, 0)
    assert.equal(k.todayImages, 0)
    assert.equal(k.todayRiskHits, 0)
  })
  check('3c. today rows aggregate correctly: 3 total / 1 image / 1 risk / 1 inaccurate / 1 timeout', () => {
    const today = new Date()
    const k = mod.computeKpis([
      row({ createdAt: today, hasImage: true }),
      row({ createdAt: today, riskKeywordHits: ['永住'], feedbackType: 'inaccurate' }),
      row({ createdAt: today, completionStatus: 'timeout' }),
    ])
    assert.equal(k.todayConsultations, 3)
    assert.equal(k.todayImages, 1)
    assert.equal(k.todayRiskHits, 1)
    // inaccurate rate denominator = today rows with feedback (1) → 1/1 = 1.0
    assert.equal(k.todayInaccurateSampleSize, 1)
    assert.equal(k.todayInaccurateRate, 1)
    // timeout rate denominator = today total (3); 1 timeout → 1/3
    assert.equal(k.todayTimeoutSampleSize, 3)
    assert.ok(Math.abs((k.todayTimeoutRate ?? -1) - 1 / 3) < 1e-9)
  })
  check('3d. inaccurate rate ignores rows without feedback (denominator = today w/ feedback)', () => {
    const today = new Date()
    const k = mod.computeKpis([
      row({ createdAt: today, feedbackType: 'helpful' }),
      row({ createdAt: today, feedbackType: 'helpful' }),
      row({ createdAt: today, feedbackType: 'inaccurate' }),
      row({ createdAt: today, feedbackType: null }),
    ])
    assert.equal(k.todayInaccurateSampleSize, 3)
    assert.ok(Math.abs((k.todayInaccurateRate ?? -1) - 1 / 3) < 1e-9)
  })

  // ---- 4. JST today boundary ----
  check('4a. isTodayJst: now → true', () => {
    assert.equal(mod.isTodayJst(new Date()), true)
  })
  check('4b. isTodayJst: a date 2 days ago → false', () => {
    const d = new Date()
    d.setDate(d.getDate() - 2)
    assert.equal(mod.isTodayJst(d), false)
  })
  check('4c. formatYmdInJst returns YYYY-MM-DD', () => {
    const out = mod.formatYmdInJst(new Date())
    assert.match(out, /^\d{4}-\d{2}-\d{2}$/)
  })

  console.log(`\n1.0 Alpha learning console contract: ${passes}/${total} pass`)
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
