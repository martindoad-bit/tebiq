/**
 * Legal Source Engineering — P0 Cycle 4 Batch 1 dry-run fixture matrix.
 *
 * Scope:
 *   - Batch 1 permanent-residence / residence-cancellation boundary cards must be observable in dry-run.
 *   - They must remain state=ai_extracted with empty injection blocks.
 *   - They must not appear in production-state prediction.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle4-batch1-dry-run-fixtures.ts
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
  triggerKeywords: ReadonlyArray<string>
  injectionCertainBlock: string
  injectionNeedsReviewAddendum: string | null
  evidencePoints: ReadonlyArray<{ display_label?: string; claim?: string }>
  frontmatter: Record<string, unknown>
}

interface Prediction {
  fact_id: string
  state: string
  decision: Decision
  score: number
  matched_keywords: string[]
}

interface Fixture {
  id: string
  question: string
  expected_primary_hit: string
  expected_secondary_hits?: string[]
}

const CYCLE4_BATCH1_READY_IDS = new Set([
  'permanent-residence-permission-separate-from-renewal',
  'permanent-permission-legal-three-part-core',
  'permanent-good-conduct-requirement',
  'permanent-independent-livelihood-requirement',
  'permanent-national-interest-framework',
  'permanent-10-year-5-year-general-residence',
  'permanent-spouse-child-exception-router',
  'permanent-long-term-resident-5-year-router',
  'permanent-highly-skilled-points-router',
  'permanent-public-obligations-tax-pension-health',
  'permanent-late-payment-negative-evaluation',
  'permanent-current-longest-period-requirement',
  'permanent-three-year-transitional-handling',
  'permanent-current-status-landing-criteria-fit',
  'permanent-application-does-not-extend-current-status',
  'residence-cancellation-fraud-false-application-entry',
  'residence-cancellation-activity-nonperformance',
  'residence-cancellation-spouse-status-six-months',
  'residence-cancellation-address-notification-risk',
  'residence-cancellation-procedure-not-automatic',
])

const USER_VISIBLE_LEAK_PATTERNS = [
  /\bFACT\b/i,
  /\bDOMAIN\b/i,
  /\bAQL\b/i,
  /\bmatcher\b/i,
  /\bdry-run\b/i,
  /\bfixture\b/i,
  /\blegal-source\b/i,
  /\bworkpack\b/i,
  /\bcandidate\b/i,
  /\bpermission_boundary\b/i,
  /\brouting_boundary\b/i,
  /\beligibility_criterion\b/i,
  /\brisk_signal\b/i,
  /\bcancellation\b/i,
  /\bgateDecision\b/i,
  /\bproduction prediction\b/i,
  /\bstate\b/i,
  /\bdrop\b/i,
  /\binject\b/i,
  /\btop3\b/i,
  /\binjection\b/i,
  /\bai_extracted\b/i,
  /\bai_verified\b/i,
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
  /住满10年一定能永住/,
  /永住申请就是续签/,
  /永住申请中就不用更新/,
  /税金没问题就一定许可/,
  /年金漏一次就绝对不许可/,
  /离婚后马上取消/,
  /失业后必然取消/,
  /取消和更新不许可是同一件事/,
]

const BATCH1_FIXTURES: Fixture[] = [
  {
    id: 'C4B1-001.pr-not-renewal',
    question: '永住申請 更新 違い 永住許可 在留期間更新 違う 永住申请 是不是续签',
    expected_primary_hit: 'permanent-residence-permission-separate-from-renewal',
  },
  {
    id: 'C4B1-002.legal-three-core',
    question: '永住 条件 三つ 永住 素行善良 独立生計 国益 永住 要件 法律',
    expected_primary_hit: 'permanent-permission-legal-three-part-core',
  },
  {
    id: 'C4B1-003.good-conduct',
    question: '永住 素行善良 永住 交通違反 永住 違反歴 影響',
    expected_primary_hit: 'permanent-good-conduct-requirement',
  },
  {
    id: 'C4B1-004.independent-livelihood',
    question: '永住 独立生計 永住 年収 低い 永住 収入 安定',
    expected_primary_hit: 'permanent-independent-livelihood-requirement',
  },
  {
    id: 'C4B1-005.national-interest',
    question: '永住 国益適合 永住 日本国の利益 永住 公的義務 現在資格',
    expected_primary_hit: 'permanent-national-interest-framework',
  },
  {
    id: 'C4B1-006.ten-five-years',
    question: '永住 10年 5年 永住 就労資格 5年以上 永住 特定技能1号 5年 含まれる',
    expected_primary_hit: 'permanent-10-year-5-year-general-residence',
  },
  {
    id: 'C4B1-007.spouse-child-exception',
    question: '日配 永住 3年 1年 日本人配偶者 永住 何年 日配 结婚三年 永住',
    expected_primary_hit: 'permanent-spouse-child-exception-router',
  },
  {
    id: 'C4B1-008.long-term-resident',
    question: '定住者 永住 5年 定住者 永住 何年 定住者 5年以上 永住',
    expected_primary_hit: 'permanent-long-term-resident-5-year-router',
  },
  {
    id: 'C4B1-009.hsp-points',
    question: '高度人才 70点 永住 3年 高度人才 80点 永住 1年 永住 ポイント 80',
    expected_primary_hit: 'permanent-highly-skilled-points-router',
  },
  {
    id: 'C4B1-010.public-obligations',
    question: '永住 年金 税金 保険 永住 公的義務 永住 住民税 年金 医保',
    expected_primary_hit: 'permanent-public-obligations-tax-pension-health',
  },
  {
    id: 'C4B1-011.late-payment',
    question: '永住 年金 迟缴 永住 住民税 遅れ 永住 税金 補交',
    expected_primary_hit: 'permanent-late-payment-negative-evaluation',
  },
  {
    id: 'C4B1-012.current-longest-period',
    question: '永住 1年签 可以申请 永住 5年 在留期間 永住 最長 在留期間',
    expected_primary_hit: 'permanent-current-longest-period-requirement',
  },
  {
    id: 'C4B1-013.three-year-transition',
    question: '永住 3年签 2027 永住 3年 在留期間 令和9年 3年签 永住 过渡',
    expected_primary_hit: 'permanent-three-year-transitional-handling',
  },
  {
    id: 'C4B1-014.current-status-fit',
    question: '永住 当前签证 条件 永住 现在资格 不符合 永住 上陆基准',
    expected_primary_hit: 'permanent-current-status-landing-criteria-fit',
  },
  {
    id: 'C4B1-015.pr-does-not-extend',
    question: '永住申請中 更新 必要 永住申请中 签证到期 永住申请 自动延长',
    expected_primary_hit: 'permanent-application-does-not-extend-current-status',
  },
  {
    id: 'C4B1-016.false-application',
    question: '在留資格取消 虚偽申請 假材料 签证取消 入管 发现 材料不实',
    expected_primary_hit: 'residence-cancellation-fraud-false-application-entry',
  },
  {
    id: 'C4B1-017.activity-nonperformance',
    question: '失業 3ヶ月 在留資格取消 経営管理 会社 停止 取消 工作签 失业 三个月',
    expected_primary_hit: 'residence-cancellation-activity-nonperformance',
  },
  {
    id: 'C4B1-018.spouse-six-months',
    question: '日配 離婚 取消 配偶者ビザ 6ヶ月 取消 日配 离婚 会马上失效吗',
    expected_primary_hit: 'residence-cancellation-spouse-status-six-months',
  },
  {
    id: 'C4B1-019.address-risk',
    question: '住所変更 90日 在留資格取消 搬家 没报 会取消签证吗 在留カード 住所 未届出 取消',
    expected_primary_hit: 'residence-cancellation-address-notification-risk',
  },
  {
    id: 'C4B1-020.procedure-not-automatic',
    question: '在留資格取消 自動 签证取消 马上失效 更新不许可 和 取消 区别',
    expected_primary_hit: 'residence-cancellation-procedure-not-automatic',
  },
  {
    id: 'C4B1-021.cross-pr-and-current-status',
    question: '永住申请中 签证到期 永住 当前签证 条件 永住 最長 在留期間',
    expected_primary_hit: 'permanent-application-does-not-extend-current-status',
    expected_secondary_hits: ['permanent-current-longest-period-requirement'],
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C4B1-N001.pr-card-renewal',
    question: '永住者の在留カード有効期間更新はいつからできますか。',
    forbidden_hits: ['permanent-residence-permission-separate-from-renewal'],
  },
  {
    id: 'C4B1-N002.generic-renewal',
    question: 'マイナンバーカードの電子証明書更新と住所変更をしたいです。',
    forbidden_hits: ['permanent-residence-permission-separate-from-renewal'],
  },
  {
    id: 'C4B1-N003.tax-normal',
    question: '住民税の納付書が届きました。コンビニで払えますか。',
    forbidden_hits: ['permanent-public-obligations-tax-pension-health', 'permanent-late-payment-negative-evaluation'],
  },
  {
    id: 'C4B1-N004.pension-retirement',
    question: '退職後の国民年金切り替えと国民健康保険の加入を知りたいです。',
    forbidden_hits: ['permanent-public-obligations-tax-pension-health'],
  },
  {
    id: 'C4B1-N005.generic-10-year',
    question: '賃貸契約を10年にするか5年にするか迷っています。',
    forbidden_hits: ['permanent-10-year-5-year-general-residence'],
  },
  {
    id: 'C4B1-N006.cancel-order',
    question: 'ネット通販の注文をキャンセルしたいです。',
    forbidden_hits: ['residence-cancellation-procedure-not-automatic'],
  },
  {
    id: 'C4B1-N007.divorce-family-law',
    question: '離婚の財産分与と親権について相談したいです。在留資格の話ではありません。',
    forbidden_hits: ['residence-cancellation-spouse-status-six-months'],
  },
  {
    id: 'C4B1-N008.unemployment-insurance',
    question: '失業保険の基本手当とハローワーク手続を知りたいです。',
    forbidden_hits: ['residence-cancellation-activity-nonperformance'],
  },
  {
    id: 'C4B1-N009.business-manager-renewal',
    question: '経営管理の既存者更新で3000万円要件はいつから見られますか。',
    forbidden_hits: ['residence-cancellation-activity-nonperformance'],
  },
  {
    id: 'C4B1-N010.school-application',
    question: '大学の申請中ですが、在留ではなく入学手続の締切を知りたいです。',
    forbidden_hits: ['permanent-application-does-not-extend-current-status'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES = [
  {
    id: 'C4B1-R001.production-pr-card',
    question: '永住者の在留カード快过期了，是不是要重新申请永住？ 永住者 在留カード 有効期間 更新',
  },
  {
    id: 'C4B1-R002.production-pension',
    question: '年金漏缴会不会影响永住？ 永住 年金 未納',
  },
  {
    id: 'C4B1-R003.production-materials',
    question: '永住申请材料需要哪些？ 永住許可申請 書類',
  },
  {
    id: 'C4B1-R004.production-spouse-divorce',
    question: '离婚后配偶签会马上失效吗？ 日配 離婚 在留',
  },
  {
    id: 'C4B1-R005.production-job-loss',
    question: '失业三个月会被取消签证吗？ 失業 在留資格',
  },
  {
    id: 'C4B1-R006.production-keiei-existing',
    question: '经管既存者下次更新要不要马上满足3000万？ 経営管理 既存者 更新',
  },
  {
    id: 'C4B1-R007.production-pr-pending',
    question: '永住申请中，现在签证快到期还要续签吗？ 永住申請中 在留期限',
  },
  {
    id: 'C4B1-R008.production-10-years',
    question: '住满10年是不是一定能永住？ 永住 10年',
  },
  {
    id: 'C4B1-R009.production-status-cancel',
    question: '在留资格取消是什么意思？ 在留資格取消',
  },
  {
    id: 'C4B1-R010.production-address',
    question: '搬家后在留卡地址改晚了，会马上取消签证吗？ 在留カード 住所変更',
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

  function predict(question: string, includeDryRunStates: boolean, candidateSet: 'batch1' | 'full' = 'batch1'): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE4_BATCH1_READY_IDS.has(card.factId))
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
        decision,
        score: item.score,
        matched_keywords: item.matched_keywords,
      })
    }
    return out
  }

  check('0a. all Cycle 4 Batch 1 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE4_BATCH1_READY_IDS) assert.ok(ids.has(id), `missing ${id}`)
  })

  check('0b. all Cycle 4 Batch 1 cards are ai_extracted with empty injection', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE4_BATCH1_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
    }
  })

  check('0c. user-visible fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE4_BATCH1_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH1_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const ids = predict(fixture.question, true, 'batch1').map(item => item.fact_id)
      const top3 = ids.slice(0, 3)
      assert.ok(top3.includes(fixture.expected_primary_hit), `expected ${fixture.expected_primary_hit}; got ${top3.join(', ') || '[]'}`)
      for (const expected of fixture.expected_secondary_hits ?? []) {
        assert.ok(ids.includes(expected), `expected secondary ${expected}; got ${ids.join(', ') || '[]'}`)
      }
    })

    check(`${fixture.id}. ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch1')
      const prodIds = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE4_BATCH1_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  for (const fixture of BROAD_NEGATIVE_FIXTURES) {
    check(`${fixture.id}. broad terms alone do not match forbidden Batch 1 cards`, () => {
      const ids = predict(fixture.question, true, 'batch1').map(item => item.fact_id)
      for (const forbidden of fixture.forbidden_hits) {
        assert.ok(!ids.includes(forbidden), `${forbidden} unexpectedly matched broad-only prompt; got ${ids.join(', ')}`)
      }
    })
  }

  for (const fixture of PRODUCTION_REGRESSION_FIXTURES) {
    check(`${fixture.id}. production prediction keeps Batch 1 out`, () => {
      const ids = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const id of ids) assert.equal(CYCLE4_BATCH1_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  console.log(`\nCycle 4 Batch 1 dry-run fixtures: ${passes}/${total} checks passed`)
  if (fails.length > 0) {
    console.log('\nFailures:')
    for (const fail of fails) console.log(`- ${fail}`)
    process.exit(1)
  }
}

function loadDiskCards(syncMod: typeof import('@/scripts/fact-layer-sync')): DiskCard[] {
  const cardsDir = join(process.cwd(), 'docs/fact-cards')
  return readdirSync(cardsDir)
    .filter(file => file.endsWith('.md'))
    .filter(file => !['README.md', 'FACT_OPS_WINDOW_TASK_PACK.md'].includes(file))
    .map(file => {
      const raw = readFileSync(join(cardsDir, file), 'utf8')
      const parsed = matter(raw)
      const norm = syncMod._internals.normalize(join(cardsDir, file), raw)
      return {
        factId: norm.factId,
        title: norm.title,
        state: norm.state,
        riskLevel: norm.riskLevel,
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
