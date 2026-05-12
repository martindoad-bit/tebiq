/**
 * Legal Source Engineering — P0 Cycle 3 Batch 1 dry-run fixture matrix.
 *
 * DB-free. Loads docs/fact-cards from disk through fact-layer-sync's
 * normalizer, then reuses matcher scoring/gating helpers.
 *
 * Scope:
 *   - Batch 1 renewal/change/special-period cards must be observable in dry-run.
 *   - They must remain state=ai_extracted and decision=drop.
 *   - They must not appear in production-state prediction.
 *   - Broad daily-language terms must not trigger these high-risk cards by themselves.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle3-batch1-dry-run-fixtures.ts
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

interface Batch1Fixture {
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
}

const CYCLE3_BATCH1_READY_IDS = new Set([
  'residence-renewal-same-status-extension',
  'residence-renewal-current-activity-target',
  'residence-renewal-application-window',
  'residence-change-activity-purpose-change',
  'residence-change-application-window',
  'residence-change-excludes-permanent-residence',
  'change-renewal-substantial-reason-review',
  'change-renewal-landing-criteria-relationship',
  'change-renewal-tax-social-insurance-notification-review',
  'special-period-renewal-change-applies',
  'special-period-endpoint-two-months-or-disposition',
  'special-period-previous-status-activity-only',
  'special-period-card-back-online-exception',
  'residence-online-procedure-availability-router',
  'change-approval-before-new-activity-guardrail',
])

const USER_VISIBLE_LEAK_PATTERNS = [
  /\bFACT\b/i,
  /\bDOMAIN\b/i,
  /\bAQL\b/i,
  /\bmatcher\b/i,
  /\bdry-run\b/i,
  /\bfixture\b/i,
  /\bsource package\b/i,
  /\bfact card\b/i,
  /\blegal-source\b/i,
  /\bworkpack\b/i,
  /\bcandidate\b/i,
  /\bsource_role\b/i,
  /\bprocedure_scope\b/i,
  /\bdeadline_window\b/i,
  /\bprocedure_effect\b/i,
  /\bpermission_boundary\b/i,
  /\bevidence_boundary\b/i,
  /\brouting_boundary\b/i,
  /\brisk_signal\b/i,
  /\bdeep_water_signal\b/i,
  /\bgateDecision\b/i,
  /\bproduction prediction\b/i,
  /\binjection\b/i,
  /\bai_extracted\b/i,
  /\bai_verified\b/i,
  /\bhuman_reviewed\b/i,
  /\bneeds_review\b/i,
  /\bdrop\b/i,
  /\binject\b/i,
  /\btop3\b/i,
  /\bP[0-3]\b/,
  /\bmust_say\b/i,
  /\bmust_not_say\b/i,
  /\bClaude\b/i,
  /\bGPT\b/i,
  /\bLLM\b/i,
  /\bTODO\b/i,
  /\bnull\b/i,
  /\bundefined\b/i,
  /申请等于许可/,
  /申请中=许可/,
  /提交就能上班/,
  /一定获批/,
  /自动获批/,
  /保证许可/,
  /必过/,
  /无限延期/,
  /一直可以工作/,
  /背面贴纸=许可/,
  /线上申请=更容易通过/,
]

const BATCH1_FIXTURES: Batch1Fixture[] = [
  {
    id: 'C3B1-001.renewal-same-status',
    question: '更新和变更有什么区别 在留期間更新 续签 同一资格',
    expected_primary_hit: 'residence-renewal-same-status-extension',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-002.renewal-current-activity',
    question: '已经离职还能续签吗 现资格活动继续 续签',
    expected_primary_hit: 'residence-renewal-current-activity-target',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-003.renewal-window',
    question: '续签提前多久申请 在留更新 3个月前',
    expected_primary_hit: 'residence-renewal-application-window',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-004.change-scope',
    question: '家族滞在转工作要换签吗 在留資格変更 换签 活动变更',
    expected_primary_hit: 'residence-change-activity-purpose-change',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-005.change-window',
    question: 'offer拿到以后什么时候换签 变更申请什么时候提交',
    expected_primary_hit: 'residence-change-application-window',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-006.pr-not-general-change',
    question: '永住申请是变更吗 永住 换签 在留資格変更',
    expected_primary_hit: 'residence-change-excludes-permanent-residence',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C3B1-007.no-approval-guarantee',
    question: '更新一定过吗 相当の理由 总合判断',
    expected_primary_hit: 'change-renewal-substantial-reason-review',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-008.landing-criteria-relationship',
    question: '续签还看上陆基准吗 更新 技人国 上陆基准',
    expected_primary_hit: 'change-renewal-landing-criteria-relationship',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-009.tax-insurance-notification-review',
    question: '14天届出忘了 续签 税金 社保 届出 变更审查',
    expected_primary_hit: 'change-renewal-tax-social-insurance-notification-review',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-010.special-period-applies',
    question: '特例期间 是什么 更新申请中 期限到了',
    expected_primary_hit: 'special-period-renewal-change-applies',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-011.special-period-endpoint',
    question: '特例期间 两个月 申请中可以等多久',
    expected_primary_hit: 'special-period-endpoint-two-months-or-disposition',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-012.previous-activity-only',
    question: '变更申请中 能先上班吗 特例期間 従前の活動',
    expected_primary_hit: 'special-period-previous-status-activity-only',
    expected_secondary_hits: ['change-approval-before-new-activity-guardrail'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-013.card-back-online-exception',
    question: 'online申请 没有背面贴纸 在留卡背面 申请中',
    expected_primary_hit: 'special-period-card-back-online-exception',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C3B1-014.online-router',
    question: '签证变更可以网上申请吗 在线申请 更新 变更',
    expected_primary_hit: 'residence-online-procedure-availability-router',
    severity_if_wrong: 'P1',
  },
  {
    id: 'C3B1-015.approval-before-new-activity',
    question: '换签还没下来 可以开始工作吗 新资格活动 许可前',
    expected_primary_hit: 'change-approval-before-new-activity-guardrail',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-016.application-not-permission',
    question: '申请中 等于许可吗 家族滞在转技人国 先工作',
    expected_primary_hit: 'change-approval-before-new-activity-guardrail',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-017.materials-not-guarantee',
    question: '材料齐了是不是一定续签 换签材料齐全 必过',
    expected_primary_hit: 'change-renewal-substantial-reason-review',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-018.keiei-renewal-criteria-router',
    question: '经管续签还看新的上陆基准吗 换签 经管 新基准',
    expected_primary_hit: 'change-renewal-landing-criteria-relationship',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-019.tax-late-review',
    question: '住民税未纳会影响续签吗 纳税义务 续签影响',
    expected_primary_hit: 'change-renewal-tax-social-insurance-notification-review',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C3B1-020.card-back-not-approval',
    question: '在留卡背面写申请中 是许可吗 申请中贴纸 是许可吗',
    expected_primary_hit: 'special-period-card-back-online-exception',
    severity_if_wrong: 'P0',
  },
]

const BROAD_TRIGGER_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C3B1-N001.generic-visa',
    question: '签证怎么办？',
    forbidden_hits: Array.from(CYCLE3_BATCH1_READY_IDS),
  },
  {
    id: 'C3B1-N002.generic-renewal-word',
    question: '更新资料在哪里下载？',
    forbidden_hits: ['residence-renewal-application-window', 'change-renewal-substantial-reason-review'],
  },
  {
    id: 'C3B1-N003.generic-work',
    question: '工作好累，想换公司。',
    forbidden_hits: ['change-approval-before-new-activity-guardrail', 'special-period-previous-status-activity-only'],
  },
  {
    id: 'C3B1-N004.generic-tax',
    question: '税金怎么交？',
    forbidden_hits: ['change-renewal-tax-social-insurance-notification-review'],
  },
  {
    id: 'C3B1-N005.generic-application-pending',
    question: '补助金申请中，什么时候有结果？',
    forbidden_hits: ['special-period-renewal-change-applies', 'special-period-endpoint-two-months-or-disposition'],
  },
  {
    id: 'C3B1-N006.generic-card-back',
    question: '表格背面怎么写？',
    forbidden_hits: ['special-period-card-back-online-exception'],
  },
  {
    id: 'C3B1-N007.generic-online',
    question: '线上申请账号怎么注册？',
    forbidden_hits: ['residence-online-procedure-availability-router', 'special-period-card-back-online-exception'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES: ProductionRegressionFixture[] = [
  {
    id: 'C3B1-R001.production-special-period',
    question: '在留卡过期了但更新申请中还能工作吗？在留期限 切れ 申請中 就労',
    expected_production_hit: 'shinseichu-zairyu-keizoku',
  },
  {
    id: 'C3B1-R002.production-renewal-window',
    question: '在留更新要提前多久申请？在留期限が近づき 更新',
    expected_production_hit: 'zairyu-expiry-renewal-change',
  },
  {
    id: 'C3B1-R003.production-change-work',
    question: '留学转技人国申请中能先上班吗？留学 技人国 変更',
  },
  {
    id: 'C3B1-R004.production-tax',
    question: '住民税晚交了会影响续签吗？住民税 未納 续签',
  },
  {
    id: 'C3B1-R005.production-online',
    question: '在留资格变更可以在线申请吗？オンライン 在留手続',
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
    candidateSet: 'batch1' | 'full' = 'batch1',
  ): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE3_BATCH1_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 3 Batch 1 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE3_BATCH1_READY_IDS) {
      assert.ok(ids.has(id), `missing ${id}`)
    }
  })

  check('0b. all Cycle 3 Batch 1 ready cards are still ai_extracted', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE3_BATCH1_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
    }
  })

  check('0c. all Cycle 3 Batch 1 cards have empty injection blocks', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE3_BATCH1_READY_IDS) {
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
    }
  })

  check('0d. user-visible card fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE3_BATCH1_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH1_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const matches = predict(fixture.question, true, 'batch1')
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

    check(`${fixture.id}. Cycle 3 Batch 1 ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch1')
      const prodMatches = predict(fixture.question, false, 'full')
      const prodIds = prodMatches.map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE3_BATCH1_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  for (const fixture of BROAD_TRIGGER_NEGATIVE_FIXTURES) {
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
      const top3 = ids.slice(0, 3)
      if (fixture.expected_production_hit) {
        assert.ok(
          top3.includes(fixture.expected_production_hit),
          `expected production hit ${fixture.expected_production_hit} in top3; got ${top3.join(', ') || '[]'}`,
        )
      }
      for (const id of ids) {
        assert.equal(CYCLE3_BATCH1_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
      }
    })
  }

  console.log(`\nCycle 3 Batch 1 dry-run fixtures: ${passes}/${total} checks passed`)
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
