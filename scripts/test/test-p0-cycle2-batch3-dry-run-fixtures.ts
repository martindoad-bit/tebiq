/**
 * Legal Source Engineering — P0 Cycle 2 Batch 3 dry-run fixture matrix.
 *
 * DB-free. Loads docs/fact-cards from disk through fact-layer-sync's
 * normalizer, then reuses matcher scoring/gating helpers.
 *
 * Scope:
 *   - Batch 3 留学 / 家族滞在 criteria cards must be observable in dry-run.
 *   - They must remain state=ai_extracted and decision=drop.
 *   - They must not appear in production-state prediction.
 *   - Held/duplicate candidate fact ids must not exist as top-level cards.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle2-batch3-dry-run-fixtures.ts
 */
import { strict as assert } from 'node:assert'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

type Decision = 'inject' | 'hint_only' | 'drop'

interface DiskCard {
  factId: string
  title: string
  state: string
  riskLevel: string
  controlledAlphaEligible: boolean
  triggerKeywords: ReadonlyArray<string>
  injectionCertainBlock: string
  injectionNeedsReviewAddendum: string | null
  evidencePoints: ReadonlyArray<{ display_label?: string; claim?: string }>
  frontmatter: Record<string, unknown>
}

interface Prediction {
  fact_id: string
  state: string
  risk_level: string
  decision: Decision
  score: number
  matched_keywords: string[]
}

interface Batch3Fixture {
  id: string
  question: string
  expected_primary_hit: string
  expected_secondary_hits?: string[]
  expected_excluded_hits?: string[]
  severity_if_wrong: 'P0' | 'P1'
}

interface ProductionRegressionFixture {
  id: string
  question: string
  expected_production_hit?: string
  expected_excluded_hits?: string[]
  severity_if_wrong: 'P0' | 'P1'
}

const CYCLE2_BATCH3_READY_IDS = new Set([
  'student-landing-education-institution-category',
  'student-living-expense-support-criterion',
  'student-enrollment-or-admission-criterion',
  'student-japanese-language-education-source-row',
  'student-criteria-not-renewal-attendance-materials',
  'dependent-spouse-child-landing-relationship',
  'dependent-support-received-criterion',
  'dependent-sponsor-status-row-check',
])

const CYCLE2_BATCH3_HELD_OR_DUPLICATE_IDS = new Set([
  'dependent-parents-not-ordinary-route',
  'student-landing-undefined-055',
  'student-landing-undefined-056',
  'student-landing-undefined-057',
  'student-landing-undefined-058',
  'student-landing-undefined-059',
])

const USER_VISIBLE_LEAK_PATTERNS = [
  /\bFACT\b/i,
  /\bDOMAIN\b/i,
  /\bAQL\b/i,
  /\bmatcher\b/i,
  /\bdry-run\b/i,
  /\bfixture\b/i,
  /\bai_extracted\b/i,
  /\bneeds_review\b/i,
  /\bP[0-3]\b/,
  /\bmust_say\b/i,
  /\bmust_not_say\b/i,
  /\bClaude\b/i,
  /\bGPT\b/i,
  /\bLLM\b/i,
  /\bTODO\b/i,
  /\bnull\b/i,
  /\bundefined\b/i,
  /一定下签/,
  /保证许可/,
  /必过/,
  /固定收入阈值/,
  /固定存款阈值/,
]

const BATCH3_FIXTURES: Batch3Fixture[] = [
  {
    id: 'C2B3-001.student-school-category',
    question: '留学上陆基准是不是所有学校都一样？留学 上陆基准 学校类别 教育机构类别',
    expected_primary_hit: 'student-landing-education-institution-category',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-002.student-admission-not-enough',
    question: '拿到学校录取通知书是不是留学签一定能下？学校录取就行吗 入学关系 上陆基准',
    expected_primary_hit: 'student-enrollment-or-admission-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-003.student-living-expense',
    question: '申请留学一定要本人银行余额吗？留学 生活费支弁 经费支付能力',
    expected_primary_hit: 'student-living-expense-support-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-004.student-parent-support',
    question: '父母资助留学可以吗？留学资金证明 支弁者 父母收入可以吗',
    expected_primary_hit: 'student-living-expense-support-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-005.student-japanese-language-school',
    question: '任何日语培训班都算留学里的日本语教育机构吗？日本语学校 留学基准 告示日本语教育机构',
    expected_primary_hit: 'student-japanese-language-education-source-row',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-006.student-language-school-admission',
    question: '日语学校有录取就一定能办留学吗？语言学校 留学 认定日本语教育机构',
    expected_primary_hit: 'student-japanese-language-education-source-row',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-007.student-attendance-not-landing-threshold',
    question: '留学上陆基准是不是规定出席率必须达到 90%？出席率和上陆基准区别',
    expected_primary_hit: 'student-criteria-not-renewal-attendance-materials',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-008.student-renewal-materials-boundary',
    question: '留学更新材料里的成绩证明是不是初次上陆基准？留学 更新材料 出席率 不是上陆基准',
    expected_primary_hit: 'student-criteria-not-renewal-attendance-materials',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-009.dependent-spouse-child',
    question: '家族滞在对象是哪些人？家族滞在 被扶养 配偶者 子 上陆基准',
    expected_primary_hit: 'dependent-spouse-child-landing-relationship',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-010.dependent-parent-not-ordinary',
    question: '我是技术人文签证，可以给我妈妈办家族滞在吗？父母家族滞在 配偶者又は子',
    expected_primary_hit: 'dependent-spouse-child-landing-relationship',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-011.dependent-fiance-not-ordinary',
    question: '婚约者能办家族滞在吗？家族滞在对象 配偶者 子 婚约者',
    expected_primary_hit: 'dependent-spouse-child-landing-relationship',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-012.dependent-support',
    question: '办家族滞在是不是月收入 20 万日元以上就一定可以？家族滞在 扶养を受けて 生活费支弁',
    expected_primary_hit: 'dependent-support-received-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-013.dependent-health-insurance-confusion',
    question: '家族滞在的扶养和健康保险扶养一样吗？家族滞在收入多少 健康保险扶养',
    expected_primary_hit: 'dependent-support-received-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-014.dependent-sponsor-row',
    question: '什么签证都能给家属办家族滞在吗？家族滞在 sponsor status row 扶养者在留资格 row',
    expected_primary_hit: 'dependent-sponsor-status-row-check',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-015.dependent-student-sponsor',
    question: '只要我是留学生，就一定可以给配偶办家族滞在吗？留学生能带配偶吗 留学一号イロ',
    expected_primary_hit: 'dependent-sponsor-status-row-check',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-016.dependent-child-by-student',
    question: '留学生想带孩子办家族滞在，要不要看扶养者在留资格 row？留学生带孩子家族滞在',
    expected_primary_hit: 'dependent-sponsor-status-row-check',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-017.student-materials-not-criteria',
    question: '留学签申请材料要什么？材料清单和上陆基准一样吗？留学材料清单',
    expected_primary_hit: 'student-criteria-not-renewal-attendance-materials',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B3-018.dependent-materials-not-income-threshold',
    question: '家族滞在材料里要收入证明，是不是年收 300 万就一定过？扶养能力 固定收入门槛',
    expected_primary_hit: 'dependent-support-received-criterion',
    severity_if_wrong: 'P0',
  },
]

const PRODUCTION_REGRESSION_FIXTURES: ProductionRegressionFixture[] = [
  {
    id: 'C2B3-R001.production-student-work',
    question: '留学生打工一周可以多少小时？资格外活动许可 28小时',
    expected_production_hit: 'shikakugai-fukugyou',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-R002.production-student-renewal-attendance',
    question: '留学续签出席率低会不会影响？出席率 更新 留学',
    expected_production_hit: 'zairyu-expiry-renewal-change',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-R003.production-dependent-work',
    question: '家族滞在可以打工吗？资格外活动许可 家族滞在',
    expected_production_hit: 'kazoku-taizai-yoken',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-R004.production-family-invitation',
    question: '技人国想把老婆孩子叫到日本，家族呼び寄せ COE 怎么办？',
    expected_production_hit: 'kazoku-yobi-yose',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B3-R005.production-dependent-status-parent',
    question: '永住者的配偶者等和家族滞在是一个签证吗？',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B3-R006.production-health-insurance-dependent',
    question: '被扶養者の健康保険 収入要件 130万円 はどう判断しますか？',
    severity_if_wrong: 'P0',
  },
]

async function main() {
  const syncMod = await import('@/scripts/fact-layer-sync')
  const matcherMod = await import('@/lib/answer/fact-layer/matcher')
  const matcherInternals = matcherMod._matcherInternals
  const cards = loadDiskCards(syncMod)

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

  function predict(
    question: string,
    includeDryRunStates: boolean,
    candidateSet: 'batch3' | 'full' = 'batch3',
  ): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE2_BATCH3_READY_IDS.has(card.factId))
      .map(card => {
        const raw = matcherInternals.scoreCardAgainst(card as never, question.toLowerCase())
        return raw ? { card, score: raw.score, matched_keywords: raw.matchedKeywords } : null
      })
      .filter((item): item is { card: DiskCard; score: number; matched_keywords: string[] } => item !== null)

    rawMatches.sort((a, b) => {
      const dr =
        (matcherInternals.RISK_RANK[b.card.riskLevel] ?? 0) -
        (matcherInternals.RISK_RANK[a.card.riskLevel] ?? 0)
      if (dr !== 0) return dr
      if (b.score !== a.score) return b.score - a.score
      return a.card.factId.localeCompare(b.card.factId)
    })

    const out: Prediction[] = []
    let injectsSeen = 0
    for (const item of rawMatches) {
      const decision = matcherInternals.gateDecision(item.card as never) as Decision
      if (decision === 'drop' && !includeDryRunStates) continue
      if (decision === 'inject') {
        if (injectsSeen >= matcherInternals.MAX_INJECTED) continue
        injectsSeen += 1
      }
      out.push({
        fact_id: item.card.factId,
        state: item.card.state,
        risk_level: item.card.riskLevel,
        decision,
        score: item.score,
        matched_keywords: item.matched_keywords,
      })
    }
    return out
  }

  check('0a. all Cycle 2 Batch 3 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH3_READY_IDS) {
      assert.ok(ids.has(id), `missing ${id}`)
    }
  })

  check('0b. held/duplicate Cycle 2 Batch 3 ids do not exist as top-level cards', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH3_HELD_OR_DUPLICATE_IDS) {
      assert.equal(ids.has(id), false, `${id} should not exist as a top-level card`)
    }
  })

  check('0c. all Cycle 2 Batch 3 ready cards are still ai_extracted', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE2_BATCH3_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
    }
  })

  check('0d. user-visible card fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE2_BATCH3_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH3_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const matches = predict(fixture.question, true, 'batch3')
      const ids = matches.map(item => item.fact_id)
      const top3 = ids.slice(0, 3)
      assert.ok(
        top3.includes(fixture.expected_primary_hit),
        `expected primary ${fixture.expected_primary_hit} in top3; got ${top3.join(', ') || '[]'}`,
      )
      for (const expected of fixture.expected_secondary_hits ?? []) {
        assert.ok(ids.includes(expected), `expected secondary ${expected}; got ${ids.join(', ') || '[]'}`)
      }
      for (const excluded of fixture.expected_excluded_hits ?? []) {
        assert.ok(!top3.includes(excluded), `excluded ${excluded} unexpectedly in top3; got ${top3.join(', ')}`)
      }
    })

    check(`${fixture.id}. Cycle 2 Batch 3 ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch3')
      const prodMatches = predict(fixture.question, false, 'full')
      const prodIds = prodMatches.map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE2_BATCH3_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  for (const fixture of PRODUCTION_REGRESSION_FIXTURES) {
    check(`${fixture.id}. production prediction keeps existing reviewed card`, () => {
      const matches = predict(fixture.question, false, 'full')
      const ids = matches.map(item => item.fact_id)
      const top3 = ids.slice(0, 3)
      if (fixture.expected_production_hit) {
        assert.ok(
          top3.includes(fixture.expected_production_hit),
          `expected ${fixture.expected_production_hit} in production top3; got ${top3.join(', ') || '[]'}`,
        )
      }
      for (const excluded of fixture.expected_excluded_hits ?? []) {
        assert.ok(!ids.includes(excluded), `excluded ${excluded} unexpectedly surfaced in production; got ${ids.join(', ')}`)
      }
      for (const id of ids) {
        assert.equal(CYCLE2_BATCH3_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
      }
    })
  }

  console.log(`\nLegal Source P0 Cycle 2 Batch 3 dry-run fixture matrix: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
}

function loadDiskCards(syncMod: Awaited<typeof import('@/scripts/fact-layer-sync')>): DiskCard[] {
  const cardsDir = join(process.cwd(), 'docs/fact-cards')
  const files = readdirSync(cardsDir).filter(
    f => f.endsWith('.md') && f !== 'README.md' && f !== 'FACT_OPS_WINDOW_TASK_PACK.md',
  )
  return files.map(file => {
    const raw = readFileSync(join(cardsDir, file), 'utf8')
    const parsed = matter(raw)
    const norm = syncMod._internals.normalize(join(cardsDir, file), raw)
    return {
      factId: norm.factId,
      title: norm.title,
      state: norm.state,
      riskLevel: norm.riskLevel,
      controlledAlphaEligible: norm.controlledAlphaEligible ?? false,
      triggerKeywords: norm.triggerKeywords ?? [],
      injectionCertainBlock: norm.injectionCertainBlock,
      injectionNeedsReviewAddendum: norm.injectionNeedsReviewAddendum,
      evidencePoints: norm.evidencePoints ?? [],
      frontmatter: parsed.data,
    }
  })
}

function userVisibleText(card: DiskCard): string {
  const fm = card.frontmatter
  const chunks: string[] = [
    card.title,
    card.injectionCertainBlock,
    card.injectionNeedsReviewAddendum ?? '',
    stringValue(fm.citation_label),
    stringValue(fm.citation_summary),
    ...stringArrayValue(fm.source_display_names),
    ...card.evidencePoints.flatMap(point => [point.display_label ?? '', point.claim ?? '']),
  ]
  return chunks.filter(Boolean).join('\n')
}

function stringValue(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function stringArrayValue(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

main().catch(e => {
  console.error('fatal', e)
  process.exit(1)
})
