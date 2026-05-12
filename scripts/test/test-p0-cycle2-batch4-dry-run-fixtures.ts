/**
 * Legal Source Engineering — P0 Cycle 2 Batch 4 dry-run fixture matrix.
 *
 * DB-free. Loads docs/fact-cards from disk through fact-layer-sync's
 * normalizer, then reuses matcher scoring/gating helpers.
 *
 * Scope:
 *   - Batch 4 特定技能 / 企業内転勤 / 技能 criteria cards must be observable in dry-run.
 *   - They must remain state=ai_extracted and decision=drop.
 *   - They must not appear in production-state prediction.
 *   - Router/disambiguation cards must avoid broad single-word overmatching.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle2-batch4-dry-run-fixtures.ts
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

interface Batch4Fixture {
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

const CYCLE2_BATCH4_READY_IDS = new Set([
  'ssw1-skill-evaluation-criterion',
  'ssw1-japanese-ability-criterion',
  'ssw1-contract-support-plan-router',
  'ssw2-landing-criteria-differs-from-ssw1',
  'ssw-field-specific-criteria-source-router',
  'intra-company-transfer-one-year-overseas-office',
  'intra-company-transfer-gijinkoku-equivalent-work',
  'intra-company-transfer-japanese-comparable-pay',
  'skilled-labor-occupation-specific-criteria',
  'skilled-labor-foreign-cuisine-ten-year-route',
  'skilled-labor-ssw-titp-disambiguation',
])

const CYCLE2_BATCH4_HELD_OR_DUPLICATE_IDS = new Set<string>()

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
  /日语过了就能/,
  /考试过了就能/,
  /自动变2号/,
]

const BATCH4_FIXTURES: Batch4Fixture[] = [
  {
    id: 'C2B4-001.ssw1-japanese-not-enough',
    question: '我日语过了，是不是就能申请特定技能1号？特定技能1号 日本语能力 基准',
    expected_primary_hit: 'ssw1-japanese-ability-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-002.ssw1-skill-not-enough',
    question: '特定技能1号只要技能考试过了就可以吗？特定技能1号 技能水准 指定分野',
    expected_primary_hit: 'ssw1-skill-evaluation-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-003.ssw1-contract-support-router',
    question: '特定技能1号只要日语和技能过了就能拿吗？特定技能1号 雇用契约 支援计划 路由',
    expected_primary_hit: 'ssw1-contract-support-plan-router',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-004.ssw2-not-automatic',
    question: '特定技能1号到期后是不是自动变2号？特定技能2号 与1号差异 熟练技能',
    expected_primary_hit: 'ssw2-landing-criteria-differs-from-ssw1',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-005.ssw-field-specific-router',
    question: '外食考试通过后，能不能用同样条件去做建筑特定技能？特定技能 分野别基准 不能从通用row推断',
    expected_primary_hit: 'ssw-field-specific-criteria-source-router',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-006.intra-company-one-year',
    question: '我在海外A公司工作一年，现在想跳槽到日本B公司，可以办企业内转勤吗？企业内转勤 海外事业所 1年以上',
    expected_primary_hit: 'intra-company-transfer-one-year-overseas-office',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-007.intra-company-work-scope',
    question: '我被集团派到日本工厂做生产线作业，可以办企业内转勤吗？企业内转勤 活动范围 技人国相当',
    expected_primary_hit: 'intra-company-transfer-gijinkoku-equivalent-work',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-008.intra-company-pay',
    question: '公司说按我原国家工资发薪，可以办企业内转勤吗？企业内转勤 报酬 日本人同等',
    expected_primary_hit: 'intra-company-transfer-japanese-comparable-pay',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-009.skilled-labor-occupation',
    question: '我有餐厅工作经验，可以直接办技能签吗？技能签 职业类别 特殊产业领域',
    expected_primary_hit: 'skilled-labor-occupation-specific-criteria',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-010.skilled-labor-cuisine-ten-year',
    question: '我做外国料理厨师6年，可以申请技能签证吗？技能签 厨师 10年经验 外国料理',
    expected_primary_hit: 'skilled-labor-foreign-cuisine-ten-year-route',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-011.skill-ssw-titp-disambiguation',
    question: '我技能实习2号结束了，是不是可以免考试办技能签证？技能 特定技能 技能实习 区别',
    expected_primary_hit: 'skilled-labor-ssw-titp-disambiguation',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-012.ssw1-titp-exception-boundary',
    question: '技能实习2号良好修了，特定技能1号是不是所有考试都免？特定技能1号 技能实习 良好修了 相关性',
    expected_primary_hit: 'ssw1-skill-evaluation-criterion',
    expected_secondary_hits: ['skilled-labor-ssw-titp-disambiguation'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-013.ssw2-do-not-import-ssw1',
    question: '特定技能2号是不是也需要1号支援计划和生活日语？特定技能2号 不是1号结构 熟练技能',
    expected_primary_hit: 'ssw2-landing-criteria-differs-from-ssw1',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-014.ssw-field-name-not-generic',
    question: '农业特定技能考试合格，能不能去介护领域工作？特定技能 分野别 条件不同',
    expected_primary_hit: 'ssw-field-specific-criteria-source-router',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-015.intra-company-not-ordinary-job-change',
    question: '我从海外公司辞职后去日本新公司上班，可以走企业内转勤吗？企业内转勤 转勤 不是普通跳槽',
    expected_primary_hit: 'intra-company-transfer-one-year-overseas-office',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-016.skilled-labor-ten-year-not-all',
    question: '技能签证是不是所有职业都要10年经验？技能 职业类别 外国料理10年 不泛化',
    expected_primary_hit: 'skilled-labor-occupation-specific-criteria',
    expected_secondary_hits: ['skilled-labor-foreign-cuisine-ten-year-route'],
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B4-017.skilled-labor-ssw-exam-confusion',
    question: '特定技能考试合格后，是不是可以直接办技能签证？技能和特定技能区别 考试不能互套',
    expected_primary_hit: 'skilled-labor-ssw-titp-disambiguation',
    severity_if_wrong: 'P0',
  },
]

const BROAD_TRIGGER_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C2B4-N001.generic-japanese',
    question: '日语不好，在日本生活有什么学习建议？日语',
    forbidden_hits: ['ssw1-japanese-ability-criterion'],
  },
  {
    id: 'C2B4-N002.generic-skill',
    question: '我想提升自己的技能，应该先学什么？技能',
    forbidden_hits: [
      'ssw1-skill-evaluation-criterion',
      'skilled-labor-occupation-specific-criteria',
      'skilled-labor-ssw-titp-disambiguation',
    ],
  },
  {
    id: 'C2B4-N003.generic-support',
    question: '公司给外国员工生活支援，哪些地方比较重要？支援',
    forbidden_hits: ['ssw1-contract-support-plan-router'],
  },
  {
    id: 'C2B4-N004.generic-field',
    question: '这个行业分野最近有没有变化？分野',
    forbidden_hits: ['ssw-field-specific-criteria-source-router'],
  },
  {
    id: 'C2B4-N005.generic-pay',
    question: '日本工资太低怎么办？报酬 工资',
    forbidden_hits: ['intra-company-transfer-japanese-comparable-pay'],
  },
  {
    id: 'C2B4-N006.generic-transfer',
    question: '我想转勤到东京办公室，通勤方便吗？转勤',
    forbidden_hits: [
      'intra-company-transfer-one-year-overseas-office',
      'intra-company-transfer-gijinkoku-equivalent-work',
      'intra-company-transfer-japanese-comparable-pay',
    ],
  },
]

const PRODUCTION_REGRESSION_FIXTURES: ProductionRegressionFixture[] = [
  {
    id: 'C2B4-R001.production-ssw1-family',
    question: '特定技能1号能带家属吗？家族滞在 特定技能1号',
    expected_production_hit: 'tokuteiginou-ichigou-youken',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-R002.production-permanent-residence-ssw',
    question: '永住申请就劳5年和特定技能年限怎么算？永住 特定技能 年限',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-R003.production-training-worker-system',
    question: '育成就労制度和技能实习有什么关系？育成就労 技能実習',
    expected_production_hit: 'ikusei-shuroh-seido',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-R004.production-ssw-dispatch',
    question: '特定技能派遣可以吗？派遣 特定技能',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B4-R005.production-ssw-exam',
    question: '特定技能考试没过可以申请吗？特定技能 技能试验 日语考试',
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
    candidateSet: 'batch4' | 'full' = 'batch4',
  ): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE2_BATCH4_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 2 Batch 4 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH4_READY_IDS) {
      assert.ok(ids.has(id), `missing ${id}`)
    }
  })

  check('0b. held/duplicate Cycle 2 Batch 4 ids do not exist as top-level cards', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH4_HELD_OR_DUPLICATE_IDS) {
      assert.equal(ids.has(id), false, `${id} should not exist as a top-level card`)
    }
  })

  check('0c. all Cycle 2 Batch 4 ready cards are still ai_extracted', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE2_BATCH4_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
    }
  })

  check('0d. user-visible card fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE2_BATCH4_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH4_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const matches = predict(fixture.question, true, 'batch4')
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

    check(`${fixture.id}. Cycle 2 Batch 4 ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch4')
      const prodMatches = predict(fixture.question, false, 'full')
      const prodIds = prodMatches.map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE2_BATCH4_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  for (const fixture of BROAD_TRIGGER_NEGATIVE_FIXTURES) {
    check(`${fixture.id}. broad terms alone do not match Batch 4 cards`, () => {
      const ids = predict(fixture.question, true, 'batch4').map(item => item.fact_id)
      for (const forbidden of fixture.forbidden_hits) {
        assert.ok(!ids.includes(forbidden), `${forbidden} unexpectedly matched broad-only prompt; got ${ids.join(', ')}`)
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
        assert.equal(CYCLE2_BATCH4_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
      }
    })
  }

  console.log(`\nLegal Source P0 Cycle 2 Batch 4 dry-run fixture matrix: ${passes}/${total} pass`)
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
