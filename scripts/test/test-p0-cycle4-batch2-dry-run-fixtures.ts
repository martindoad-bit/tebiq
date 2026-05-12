/**
 * Legal Source Engineering — P0 Cycle 4 Batch 2 dry-run fixture matrix.
 *
 * Scope:
 *   - Batch 2 permanent-residence tax / pension / health-insurance / materials-boundary cards.
 *   - They must remain state=ai_extracted with empty injection blocks.
 *   - They must not appear in production-state prediction.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle4-batch2-dry-run-fixtures.ts
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

const CYCLE4_BATCH2_READY_IDS = new Set([
  'permanent-residence-resident-tax-five-year-materials',
  'permanent-residence-resident-tax-timing-evidence',
  'permanent-residence-national-tax-certificate-materials',
  'permanent-residence-pension-two-year-record-materials',
  'permanent-residence-national-pension-receipts-materials',
  'permanent-residence-health-insurance-two-year-materials',
  'permanent-residence-health-insurance-card-transition-materials',
  'permanent-residence-business-owner-social-insurance-materials',
  'permanent-residence-guarantor-document-boundary',
  'permanent-residence-understanding-letter-required',
  'permanent-residence-materials-by-status-checksheet',
  'permanent-residence-material-shortage-review-delay-risk',
  'permanent-residence-self-checksheet-no-approval-guarantee',
  'permanent-residence-public-obligation-exemption-deferment-gap',
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
  /\bmaterials_boundary\b/i,
  /\bmaterials_evidence\b/i,
  /\bsource_gap\b/i,
  /\bdeep_water_signal\b/i,
  /\bpermission_boundary\b/i,
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
  /材料齐.*一定/,
  /必ず許可/,
  /补缴.*没问题/,
  /免除.*必ず安全/,
  /保証人.*通る/,
  /了解書.*保証/,
]

const BATCH2_FIXTURES: Fixture[] = [
  {
    id: 'C4B2-001.resident-tax-five-years',
    question: '永住 住民税 何年分 永住 納税証明 5年 課税証明書 就労資格 書類 税',
    expected_primary_hit: 'permanent-residence-resident-tax-five-year-materials',
  },
  {
    id: 'C4B2-002.resident-tax-timing',
    question: '永住 住民税 普通徴収 特別徴収 領収書 税金 遅れ 通帳 コピー 税',
    expected_primary_hit: 'permanent-residence-resident-tax-timing-evidence',
  },
  {
    id: 'C4B2-003.national-tax-five-items',
    question: '永住 国税 納税証明書 その3 所得税 消費税 税務署 5税目',
    expected_primary_hit: 'permanent-residence-national-tax-certificate-materials',
  },
  {
    id: 'C4B2-004.pension-records',
    question: '永住 年金 2年 年金記録 ねんきんネット 被保険者記録照会 国民年金 厚生年金',
    expected_primary_hit: 'permanent-residence-pension-two-year-record-materials',
  },
  {
    id: 'C4B2-005.national-pension-receipts',
    question: '永住 国民年金 領収書 年金 收据 領収証書 ない 24ヶ月 理由書',
    expected_primary_hit: 'permanent-residence-national-pension-receipts-materials',
  },
  {
    id: 'C4B2-006.health-insurance-two-years',
    question: '永住 健康保険 2年 国民健康保険 国保 未納 医保 材料 健保 空白',
    expected_primary_hit: 'permanent-residence-health-insurance-two-year-materials',
  },
  {
    id: 'C4B2-007.health-card-transition',
    question: '永住 マイナ保険証 健康保険証 廃止 資格確認証 マイナポータル 健康保険',
    expected_primary_hit: 'permanent-residence-health-insurance-card-transition-materials',
  },
  {
    id: 'C4B2-008.business-owner-social-insurance',
    question: '経営管理 永住 会社 社会保険 事業主 社会保険料 会社の厚生年金 法人 社保 資料',
    expected_primary_hit: 'permanent-residence-business-owner-social-insurance-materials',
  },
  {
    id: 'C4B2-009.guarantor',
    question: '永住 身元保証人 保证人 身元保証書 保証人 書類 保证人 有了能过吗',
    expected_primary_hit: 'permanent-residence-guarantor-document-boundary',
  },
  {
    id: 'C4B2-010.understanding-letter',
    question: '永住 了解書 了解书 中国語 2021 了解書 必要 了解書 是什么',
    expected_primary_hit: 'permanent-residence-understanding-letter-required',
  },
  {
    id: 'C4B2-011.materials-by-status',
    question: '永住 書類 みんな同じ 就労資格 家族滞在 日配 書類 違う チェックシート',
    expected_primary_hit: 'permanent-residence-materials-by-status-checksheet',
  },
  {
    id: 'C4B2-012.material-shortage',
    question: '永住 材料 不足 書類 足りない 先に出す 追加資料 不利益 審査 遅れる',
    expected_primary_hit: 'permanent-residence-material-shortage-review-delay-risk',
  },
  {
    id: 'C4B2-013.self-check-not-guarantee',
    question: '永住 セルフチェック 全部はい 条件 全部満たす 材料全部ある 通る 必ず許可',
    expected_primary_hit: 'permanent-residence-self-checksheet-no-approval-guarantee',
  },
  {
    id: 'C4B2-014.pension-exemption-gap',
    question: '永住 年金免除 年金猶予 学生納付特例 承認済み免除 年金 免除なら大丈夫',
    expected_primary_hit: 'permanent-residence-public-obligation-exemption-deferment-gap',
  },
  {
    id: 'C4B2-015.cross-public-obligation',
    question: '永住 住民税 何年分 年金 2年 健康保険 2年 税 年金 医保 材料',
    expected_primary_hit: 'permanent-residence-resident-tax-five-year-materials',
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C4B2-N001.normal-resident-tax',
    question: '住民税の納付書が届きました。コンビニで支払えますか。',
    forbidden_hits: [
      'permanent-residence-resident-tax-five-year-materials',
      'permanent-residence-resident-tax-timing-evidence',
    ],
  },
  {
    id: 'C4B2-N002.normal-tax-certificate',
    question: '課税証明書をコンビニで取る方法を知りたいです。',
    forbidden_hits: ['permanent-residence-resident-tax-five-year-materials'],
  },
  {
    id: 'C4B2-N003.normal-pension-exemption',
    question: '国民年金の免除申請はどこでできますか。永住ではなく普通の手続です。',
    forbidden_hits: ['permanent-residence-public-obligation-exemption-deferment-gap'],
  },
  {
    id: 'C4B2-N004.retirement-switch',
    question: '退職後の国民年金と国民健康保険の切り替えをしたいです。',
    forbidden_hits: [
      'permanent-residence-pension-two-year-record-materials',
      'permanent-residence-health-insurance-two-year-materials',
    ],
  },
  {
    id: 'C4B2-N005.mynaportal-normal',
    question: 'マイナポータルで健康保険証情報を確認する方法だけ知りたいです。',
    forbidden_hits: ['permanent-residence-health-insurance-card-transition-materials'],
  },
  {
    id: 'C4B2-N006.rental-guarantor',
    question: '賃貸契約の保証人がいない場合は保証会社を使えますか。',
    forbidden_hits: ['permanent-residence-guarantor-document-boundary'],
  },
  {
    id: 'C4B2-N007.school-guarantor',
    question: '学校の身元保証人欄に誰を書けばいいですか。永住申請ではありません。',
    forbidden_hits: ['permanent-residence-guarantor-document-boundary'],
  },
  {
    id: 'C4B2-N008.generic-checksheet',
    question: '健康診断のチェックシートを提出する必要がありますか。',
    forbidden_hits: ['permanent-residence-materials-by-status-checksheet'],
  },
  {
    id: 'C4B2-N009.application-delay-non-immigration',
    question: '大学の出願書類が足りないと審査が遅れますか。',
    forbidden_hits: ['permanent-residence-material-shortage-review-delay-risk'],
  },
  {
    id: 'C4B2-N010.company-social-insurance-normal',
    question: '会社が社会保険に加入してくれません。労働相談をしたいです。',
    forbidden_hits: ['permanent-residence-business-owner-social-insurance-materials'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES = [
  {
    id: 'C4B2-R001.production-pr-materials',
    question: '永住申请材料需要哪些？ 永住許可申請 書類 身元保証書 了解書',
  },
  {
    id: 'C4B2-R002.production-pr-pension',
    question: '年金漏缴会不会影响永住？ 永住 年金 未納 補缴',
  },
  {
    id: 'C4B2-R003.production-pr-card',
    question: '永住者の在留カード更新に了解書や身元保証書は必要ですか。',
  },
  {
    id: 'C4B2-R004.production-normal-tax',
    question: '住民税の課税証明書と納税証明書はどこで取れますか。',
  },
  {
    id: 'C4B2-R005.production-pension-exemption',
    question: '国民年金の免除申請をしたいです。永住ではないです。',
  },
  {
    id: 'C4B2-R006.production-health-switch',
    question: '退職したので国民健康保険に切り替えたいです。',
  },
  {
    id: 'C4B2-R007.production-hsp-pr',
    question: '高度人才 80点 永住 1年 资料要几年的税和年金？',
  },
  {
    id: 'C4B2-R008.production-guarantor',
    question: '永住 保证人 身元保証人 没有怎么办？',
  },
  {
    id: 'C4B2-R009.production-materials-complete',
    question: '永住 材料全部齐了 是不是一定能过？',
  },
  {
    id: 'C4B2-R010.production-business-owner',
    question: '我是経営管理，公司社保有过延迟，永住会不会有问题？',
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

  function predict(question: string, includeDryRunStates: boolean, candidateSet: 'batch2' | 'full' = 'batch2'): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE4_BATCH2_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 4 Batch 2 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE4_BATCH2_READY_IDS) assert.ok(ids.has(id), `missing ${id}`)
  })

  check('0b. all Cycle 4 Batch 2 cards are ai_extracted with empty injection', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE4_BATCH2_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
    }
  })

  check('0c. user-visible fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE4_BATCH2_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH2_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const ids = predict(fixture.question, true, 'batch2').map(item => item.fact_id)
      const top3 = ids.slice(0, 3)
      assert.ok(top3.includes(fixture.expected_primary_hit), `expected ${fixture.expected_primary_hit}; got ${top3.join(', ') || '[]'}`)
      for (const expected of fixture.expected_secondary_hits ?? []) {
        assert.ok(ids.includes(expected), `expected secondary ${expected}; got ${ids.join(', ') || '[]'}`)
      }
    })

    check(`${fixture.id}. ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch2')
      const prodIds = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE4_BATCH2_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  for (const fixture of BROAD_NEGATIVE_FIXTURES) {
    check(`${fixture.id}. broad terms alone do not match forbidden Batch 2 cards`, () => {
      const ids = predict(fixture.question, true, 'batch2').map(item => item.fact_id)
      for (const forbidden of fixture.forbidden_hits) {
        assert.ok(!ids.includes(forbidden), `${forbidden} unexpectedly matched broad-only prompt; got ${ids.join(', ')}`)
      }
    })
  }

  for (const fixture of PRODUCTION_REGRESSION_FIXTURES) {
    check(`${fixture.id}. production prediction keeps Batch 2 out`, () => {
      const ids = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const id of ids) assert.equal(CYCLE4_BATCH2_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  console.log(`\nCycle 4 Batch 2 dry-run fixtures: ${passes}/${total} checks passed`)
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
