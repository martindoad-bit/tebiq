/**
 * Legal Source Engineering — P0 Cycle 2 Batch 5 dry-run fixture matrix.
 *
 * DB-free. Loads docs/fact-cards from disk through fact-layer-sync's
 * normalizer, then reuses matcher scoring/gating helpers.
 *
 * Scope:
 *   - Batch 5 regulated-profession/router/disambiguation cards must be observable in dry-run.
 *   - They must remain state=ai_extracted and decision=drop.
 *   - They must not appear in production-state prediction.
 *   - Broad daily-language terms must not trigger these high-risk cards by themselves.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle2-batch5-dry-run-fixtures.ts
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

interface Batch5Fixture {
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

const CYCLE2_BATCH5_READY_IDS = new Set([
  'nursing-care-landing-care-worker-route',
  'legal-accounting-landing-qualified-profession-criterion',
  'medical-landing-qualified-profession-criterion',
  'advanced-professional-landing-points-router',
  'advanced-professional-category-disambiguation',
  'research-education-landing-criteria-locator',
  'entertainer-amendment-sensitive-router',
  'trainee-technical-intern-training-disambiguation',
])

const CYCLE2_BATCH5_HELD_OR_DUPLICATE_IDS = new Set([
  'nursing-care-landing-duplicate-with-cycle1',
  'regulated-professions-combined-medical-legal-accounting',
  'advanced-professional-permanent-residence-final-answer',
  'entertainer-eligibility-final-answer',
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
  /马上永住/,
  /医院工作都可以/,
  /养老院工作即可/,
]

const BATCH5_FIXTURES: Batch5Fixture[] = [
  {
    id: 'C2B5-001.nursing-care-worker-route',
    question: '介護签证需要介护福祉士吗？介護 上陆基准 介护福祉士',
    expected_primary_hit: 'nursing-care-landing-care-worker-route',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-002.nursing-care-not-any-care-job',
    question: '在养老院做介护工作，是不是就能申请介護在留资格？介護 资格路线',
    expected_primary_hit: 'nursing-care-landing-care-worker-route',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-003.legal-accounting-qualification',
    question: '外国律师/会计师在日本做法律会计业务，是否需要对应资格？法律会计 法定资格',
    expected_primary_hit: 'legal-accounting-landing-qualified-profession-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-004.legal-accounting-assistant',
    question: '会计助理属于法律会计业务吗？会计助理 法律会计业务',
    expected_primary_hit: 'legal-accounting-landing-qualified-profession-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-005.medical-qualified-profession',
    question: '外国医生在日本医院工作，需要看医療资格吗？医療 法定资格',
    expected_primary_hit: 'medical-landing-qualified-profession-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-006.medical-hospital-admin',
    question: '医院前台能办医疗签吗？医院前台 医療资格',
    expected_primary_hit: 'medical-landing-qualified-profession-criterion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-007.advanced-points-router',
    question: '高度人才70分怎么判断？高度専門職 points 点数表',
    expected_primary_hit: 'advanced-professional-landing-points-router',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-008.advanced-application-router',
    question: '高度専門職申请条件是不是要看积分制？高度人才 评分表',
    expected_primary_hit: 'advanced-professional-landing-points-router',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-009.advanced-category-iroha',
    question: '高度専門職1号イロハ有什么区别？高度1号イ ロ ハ',
    expected_primary_hit: 'advanced-professional-category-disambiguation',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-010.advanced-category-worker',
    question: '我是研究人员/公司职员/经营者，高度専門職类别怎么分？高度1号分类',
    expected_primary_hit: 'advanced-professional-category-disambiguation',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-011.research-education-locator',
    question: '教授签证和研究签证的上陆基准要看哪一行？教授 研究 教育 基准行',
    expected_primary_hit: 'research-education-landing-criteria-locator',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B5-012.research-education-not-same',
    question: '教育签和研究签是不是同一个资格？教授 研究 教育 区分',
    expected_primary_hit: 'research-education-landing-criteria-locator',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B5-013.entertainer-amendment',
    question: '兴行签证规则是不是经常改？興行 上陆基准 改正',
    expected_primary_hit: 'entertainer-amendment-sensitive-router',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-014.entertainer-activity-sensitive',
    question: '演出艺人来日本办兴行，需要看最新改正吗？興行 amendment',
    expected_primary_hit: 'entertainer-amendment-sensitive-router',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-015.trainee-titp-disambiguation',
    question: '研修和技能实习是同一个签证吗？研修 技能実習 区别',
    expected_primary_hit: 'trainee-technical-intern-training-disambiguation',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-016.trainee-not-general-training',
    question: '公司说先研修再技能实习，这两个资格可以混用吗？研修 技能实习',
    expected_primary_hit: 'trainee-technical-intern-training-disambiguation',
    severity_if_wrong: 'P0',
  },
]

const BROAD_TRIGGER_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C2B5-N001.generic-care-service',
    question: '家里老人需要介护服务，怎么找护理机构？介護',
    forbidden_hits: ['nursing-care-landing-care-worker-route'],
  },
  {
    id: 'C2B5-N002.generic-medical-cost',
    question: '外国人在日本看病医療费多少钱？医療',
    forbidden_hits: ['medical-landing-qualified-profession-criterion'],
  },
  {
    id: 'C2B5-N003.generic-law-rights',
    question: '外国人生活保护有没有法律权利？法律',
    forbidden_hits: ['legal-accounting-landing-qualified-profession-criterion'],
  },
  {
    id: 'C2B5-N004.generic-accounting-tax',
    question: '公司会计报税怎么做？会計',
    forbidden_hits: ['legal-accounting-landing-qualified-profession-criterion'],
  },
  {
    id: 'C2B5-N005.generic-advanced-japanese',
    question: '高度な日本語表現怎么学习？高度',
    forbidden_hits: [
      'advanced-professional-landing-points-router',
      'advanced-professional-category-disambiguation',
    ],
  },
  {
    id: 'C2B5-N006.generic-professor-income',
    question: '大学教授的收入证明怎么准备？教授',
    forbidden_hits: ['research-education-landing-criteria-locator'],
  },
  {
    id: 'C2B5-N007.generic-research-student-materials',
    question: '研究生留学申请材料有哪些？研究',
    forbidden_hits: ['research-education-landing-criteria-locator'],
  },
  {
    id: 'C2B5-N008.generic-child-education',
    question: '孩子在日本上学需要什么手续？教育',
    forbidden_hits: ['research-education-landing-criteria-locator'],
  },
  {
    id: 'C2B5-N009.generic-concert-ticket',
    question: '演唱会门票和活动安排怎么查？興行',
    forbidden_hits: ['entertainer-amendment-sensitive-router'],
  },
  {
    id: 'C2B5-N010.generic-company-training',
    question: '公司内部新人研修怎么安排？研修',
    forbidden_hits: ['trainee-technical-intern-training-disambiguation'],
  },
  {
    id: 'C2B5-N011.training-worker-system',
    question: '技能实习废止后育成就劳是什么？技能実習',
    forbidden_hits: ['trainee-technical-intern-training-disambiguation'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES: ProductionRegressionFixture[] = [
  {
    id: 'C2B5-R001.production-care-work',
    question: '介护工作怎么换签？介護 特定技能介护',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-R002.production-hospital-work',
    question: '医院工作签证怎么申请？医療 医院工作',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-R003.production-advanced-pr',
    question: '高度人才70点可以马上永住吗？高度専門職 永住 70点',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-R004.production-trainee-titp',
    question: '研修和技能实习怎么选？研修 技能実習',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-R005.production-research-materials',
    question: '教授/研究/教育签材料清单怎么准备？教授 研究 教育 材料',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B5-R006.production-entertainer-materials',
    question: '兴行签证材料要什么？興行 材料',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B5-R007.production-medical-life',
    question: '外国人在日本看病，没有保险怎么办？医療費 健康保险',
    severity_if_wrong: 'P1',
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
    candidateSet: 'batch5' | 'full' = 'batch5',
  ): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE2_BATCH5_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 2 Batch 5 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH5_READY_IDS) {
      assert.ok(ids.has(id), `missing ${id}`)
    }
  })

  check('0b. held/duplicate Cycle 2 Batch 5 ids do not exist as top-level cards', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH5_HELD_OR_DUPLICATE_IDS) {
      assert.equal(ids.has(id), false, `${id} should not exist as a top-level card`)
    }
  })

  check('0c. all Cycle 2 Batch 5 ready cards are still ai_extracted', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE2_BATCH5_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
    }
  })

  check('0d. user-visible card fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE2_BATCH5_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH5_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const matches = predict(fixture.question, true, 'batch5')
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

    check(`${fixture.id}. Cycle 2 Batch 5 ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch5')
      const prodMatches = predict(fixture.question, false, 'full')
      const prodIds = prodMatches.map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE2_BATCH5_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  for (const fixture of BROAD_TRIGGER_NEGATIVE_FIXTURES) {
    check(`${fixture.id}. broad terms alone do not match Batch 5 cards`, () => {
      const ids = predict(fixture.question, true, 'batch5').map(item => item.fact_id)
      for (const forbidden of fixture.forbidden_hits) {
        assert.ok(!ids.includes(forbidden), `${forbidden} unexpectedly matched broad-only prompt; got ${ids.join(', ')}`)
      }
    })
  }

  for (const fixture of PRODUCTION_REGRESSION_FIXTURES) {
    check(`${fixture.id}. production prediction keeps Batch 5 out`, () => {
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
        assert.equal(CYCLE2_BATCH5_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
      }
    })
  }

  console.log(`\nLegal Source P0 Cycle 2 Batch 5 dry-run fixture matrix: ${passes}/${total} pass`)
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
