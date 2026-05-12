/**
 * Legal Source Engineering — P0 Cycle 2 Batch 2 dry-run fixture matrix.
 *
 * DB-free. Loads docs/fact-cards from disk through fact-layer-sync's
 * normalizer, then reuses matcher scoring/gating helpers.
 *
 * Scope:
 *   - Batch 2 経営・管理 granular criteria cards must be observable in dry-run.
 *   - They must remain state=ai_extracted and decision=drop.
 *   - They must not appear in production-state prediction.
 *   - Duplicate/held candidate fact ids must not exist as top-level cards.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle2-batch2-dry-run-fixtures.ts
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

interface Batch2Fixture {
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
  expected_production_hit: string
  expected_excluded_hits?: string[]
  severity_if_wrong: 'P0' | 'P1'
}

const CYCLE2_BATCH2_READY_IDS = new Set([
  'keiei-kanri-full-time-employee-criterion',
  'keiei-kanri-capital-asset-3000man-criterion',
  'keiei-kanri-office-establishment-criterion',
  'keiei-kanri-degree-or-three-year-experience-criterion',
  'keiei-kanri-japanese-language-criterion',
  'keiei-kanri-management-remuneration-criterion',
])

const CYCLE2_BATCH2_HELD_OR_DUPLICATE_IDS = new Set([
  'keiei-kanri-2025-amendment-anchor',
  'keiei-kanri-business-plan-expert-confirmation',
  'keiei-kanri-transition-domain-queue',
  'keiei-kanri-existing-holder-renewal-router',
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
  /500 万即可/,
  /500万円即可/,
]

const BATCH2_FIXTURES: Batch2Fixture[] = [
  {
    id: 'C2B2-001.capital-500man-old-rule',
    question: '现在经管签新申请还是 500 万资本金就可以吗？经管 3000万 资本金 500万',
    expected_primary_hit: 'keiei-kanri-capital-asset-3000man-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-002.capital-not-guarantee',
    question: '2026 年新设公司申请经管，3000 万满足了是不是稳了？经管 3000万 一定下签',
    expected_primary_hit: 'keiei-kanri-capital-asset-3000man-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-003.employee-required',
    question: '经营管理新申请需要雇员工吗？经管 常勤职员 雇一个人',
    expected_primary_hit: 'keiei-kanri-full-time-employee-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-004.student-employee-count',
    question: '常勤职员找一个留学生全职打工可以算吗？经管 常勤职员 留学生能不能算',
    expected_primary_hit: 'keiei-kanri-full-time-employee-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-005.table2-employee-count',
    question: '经管常勤职员必须是日本人吗，永住者可以算吗？常勤职员 可以算谁',
    expected_primary_hit: 'keiei-kanri-full-time-employee-criterion',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B2-006.office-required',
    question: '经营管理申请需要办公室吗？经管 事业所 事务所',
    expected_primary_hit: 'keiei-kanri-office-establishment-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-007.home-office',
    question: '自宅登记成公司地址，经管一定不行吗？经管 自宅兼办公室 事业所',
    expected_primary_hit: 'keiei-kanri-office-establishment-criterion',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B2-008.office-area',
    question: '经营管理办公室是不是必须 20 平米以上？经管 办公室 固定面积 事业所',
    expected_primary_hit: 'keiei-kanri-office-establishment-criterion',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B2-009.degree-not-mba-only',
    question: '申请经管一定要 MBA 吗？经管 需要硕士 学位或3年经验',
    expected_primary_hit: 'keiei-kanri-degree-or-three-year-experience-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-010.three-year-experience-route',
    question: '没有相关学位，但有 3 年以上经营管理经验可以申请经管吗？经管三年经验',
    expected_primary_hit: 'keiei-kanri-degree-or-three-year-experience-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-011.ordinary-work-not-enough',
    question: '我有三年普通打工经验，可以算经管经验吗？经营管理经验3年 普通工作',
    expected_primary_hit: 'keiei-kanri-degree-or-three-year-experience-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-012.japanese-employee-subject',
    question: '经管申请人本人没有 N2，但常勤职员有 N2 可以吗？经管 N2 申请人或常勤职员',
    expected_primary_hit: 'keiei-kanri-japanese-language-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-013.no-japanese-requirement-myth',
    question: '经管新规是不是完全没有日语要求？经管 日语能力 B2相当 JLPT N2',
    expected_primary_hit: 'keiei-kanri-japanese-language-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-014.bjt-route-signal',
    question: 'BJT 400 能不能作为经管日语能力证明？经管 BJT 400 B2相当',
    expected_primary_hit: 'keiei-kanri-japanese-language-criterion',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B2-015.management-remuneration',
    question: '经管申请人从事管理，报酬可以明显低于同岗位日本人吗？管理报酬 日本人同等',
    expected_primary_hit: 'keiei-kanri-management-remuneration-criterion',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B2-016.fixed-salary-overreach',
    question: '经管老板必须每月给自己发固定工资吗？经管报酬 役员报酬 固定工资',
    expected_primary_hit: 'keiei-kanri-management-remuneration-criterion',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B2-017.management-vs-all-employees',
    question: '经管的日本人同等报酬是不是公司所有员工工资都要比？从事管理 报酬 日本人同等',
    expected_primary_hit: 'keiei-kanri-management-remuneration-criterion',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B2-018.materials-not-criteria',
    question: '经管材料清单里有登记事项证明书，是不是等于满足上陆基准？经管 上陆基准 3000万',
    expected_primary_hit: 'keiei-kanri-capital-asset-3000man-criterion',
    severity_if_wrong: 'P0',
  },
]

const PRODUCTION_REGRESSION_FIXTURES: ProductionRegressionFixture[] = [
  {
    id: 'C2B2-R001.production-new-application-parent',
    question: '2026 年以后新申请经营管理签，新规有什么核心条件？经营管理签 3000万 常勤 N2',
    expected_production_hit: 'keiei-kanri-2025-10',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-R002.production-existing-holder-2027',
    question: '我已经有经管签，2027年续签过渡期怎么适用？既存 经管 更新 过渡',
    expected_production_hit: 'keiei-kanri-existing-holder-update',
    expected_excluded_hits: ['keiei-kanri-capital-asset-3000man-criterion'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-R003.production-existing-holder-2029',
    question: '我经管签 2029 年才到期，到时候续签还在过渡期吗？经管 2029 更新',
    expected_production_hit: 'keiei-kanri-existing-holder-update',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B2-R004.production-no-batch2-injection-capital',
    question: '现在经营管理还是 500 万就能新申请吗？经营管理 资本金 3000万',
    expected_production_hit: 'keiei-kanri-2025-10',
    expected_excluded_hits: ['keiei-kanri-capital-asset-3000man-criterion'],
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
    candidateSet: 'batch2' | 'full' = 'batch2',
  ): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE2_BATCH2_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 2 Batch 2 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH2_READY_IDS) {
      assert.ok(ids.has(id), `missing ${id}`)
    }
  })

  check('0b. held/duplicate Cycle 2 Batch 2 ids do not exist as top-level cards', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH2_HELD_OR_DUPLICATE_IDS) {
      assert.equal(ids.has(id), false, `${id} should not exist as a top-level card`)
    }
  })

  check('0c. all Cycle 2 Batch 2 ready cards are still ai_extracted', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE2_BATCH2_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
    }
  })

  check('0d. user-visible card fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE2_BATCH2_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH2_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const matches = predict(fixture.question, true, 'batch2')
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

    check(`${fixture.id}. Cycle 2 Batch 2 ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch2')
      const prodMatches = predict(fixture.question, false, 'full')
      const prodIds = prodMatches.map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE2_BATCH2_READY_IDS.has(item.fact_id))) {
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
      assert.ok(
        top3.includes(fixture.expected_production_hit),
        `expected ${fixture.expected_production_hit} in production top3; got ${top3.join(', ') || '[]'}`,
      )
      for (const excluded of fixture.expected_excluded_hits ?? []) {
        assert.ok(!ids.includes(excluded), `excluded ${excluded} unexpectedly surfaced in production; got ${ids.join(', ')}`)
      }
    })
  }

  console.log(`\nLegal Source P0 Cycle 2 Batch 2 dry-run fixture matrix: ${passes}/${total} pass`)
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
