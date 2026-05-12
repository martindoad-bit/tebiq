/**
 * Legal Source Engineering — P0 Cycle 4 Batch 4 dry-run fixture matrix.
 *
 * Scope:
 *   - Batch 4 permanent-resident card / reentry / cancellation-deportation boundary cards.
 *   - They must remain state=ai_extracted with empty injection blocks.
 *   - They must not appear in production-state prediction.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle4-batch4-dry-run-fixtures.ts
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

const CYCLE4_BATCH4_READY_IDS = new Set([
  'permanent-resident-card-validity-seven-year-law',
  'permanent-resident-card-under-sixteen-before-birthday',
  'permanent-resident-card-renewal-window-procedure',
  'permanent-resident-card-renewal-early-application-exception',
  'permanent-resident-card-renewal-no-fee-materials-boundary',
  'permanent-resident-card-expiry-not-pr-period-renewal-boundary',
  'permanent-resident-long-absence-special-reentry-one-year',
  'permanent-resident-long-absence-ordinary-reentry-five-year',
  'permanent-resident-no-reentry-departure-status-extinguishes',
  'special-reentry-intent-expression-and-card-required',
  'special-reentry-excluded-cancellation-proceeding',
  'permanent-resident-deportation-separate-from-cancellation',
  'residence-cancellation-to-deportation-ground-boundary',
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
  /\bcancellation_trigger\b/i,
  /\bprocedure_boundary\b/i,
  /\brouting_boundary\b/i,
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
  /永住.*到期/,
  /永住资格.*更新/,
  /永住.*重新审查/,
  /永住卡过期.*永住.*失效/,
  /永住者.*出国.*多久都没事/,
  /在留卡.*有效.*一定.*回来/,
  /取消.*马上.*遣返/,
  /自动.*定住者/,
  /職権変更.*必ず/,
]

const BATCH4_FIXTURES: Fixture[] = [
  {
    id: 'C4B4-001.pr-card-seven-years',
    question: '永住者 在留カード 7年 有効期間 永住カード 7年 期限',
    expected_primary_hit: 'permanent-resident-card-validity-seven-year-law',
  },
  {
    id: 'C4B4-002.pr-card-under-sixteen',
    question: '永住者 子ども 16歳 在留カード 有効期限 誕生日 前日 未满16岁 永住卡',
    expected_primary_hit: 'permanent-resident-card-under-sixteen-before-birthday',
  },
  {
    id: 'C4B4-003.pr-card-renewal-window',
    question: '永住者 在留カード 更新 いつから 2ヶ月前 期限まで 窓口 永住カード更新',
    expected_primary_hit: 'permanent-resident-card-renewal-window-procedure',
  },
  {
    id: 'C4B4-004.pr-card-early-application',
    question: '永住カード 更新 早め 長期海外出張 留学 再入国できない 早期申請',
    expected_primary_hit: 'permanent-resident-card-renewal-early-application-exception',
  },
  {
    id: 'C4B4-005.pr-card-no-fee-materials',
    question: '永住者 在留カード更新 手数料 無料 费用 材料 照片 护照 在留卡',
    expected_primary_hit: 'permanent-resident-card-renewal-no-fee-materials-boundary',
  },
  {
    id: 'C4B4-006.card-expiry-not-status-renewal',
    question: '永住カード 期限切れ 永住 消える 永住資格 更新 必要 永住ビザ 更新',
    expected_primary_hit: 'permanent-resident-card-expiry-not-pr-period-renewal-boundary',
  },
  {
    id: 'C4B4-007.special-reentry-one-year',
    question: '永住者 みなし再入国 1年 回国 一年半 永住卡还有效 可以入境吗',
    expected_primary_hit: 'permanent-resident-long-absence-special-reentry-one-year',
  },
  {
    id: 'C4B4-008.ordinary-reentry-five-years',
    question: '永住者 再入国許可 5年 海外 長期 普通再入国许可 最长多久',
    expected_primary_hit: 'permanent-resident-long-absence-ordinary-reentry-five-year',
  },
  {
    id: 'C4B4-009.no-reentry-status-extinguishes',
    question: '永住者 出国 没有再入国許可 没勾みなし再入国 在留資格 消える',
    expected_primary_hit: 'permanent-resident-no-reentry-departure-status-extinguishes',
  },
  {
    id: 'C4B4-010.special-reentry-intent-card',
    question: 'みなし再入国 EDカード チェック 在留カード 必要 有効な旅券 意思表示',
    expected_primary_hit: 'special-reentry-intent-expression-and-card-required',
  },
  {
    id: 'C4B4-011.special-reentry-excluded-cancellation',
    question: '在留資格取消 手続中 みなし再入国 使える 取消手続 特別再入国',
    expected_primary_hit: 'special-reentry-excluded-cancellation-proceeding',
  },
  {
    id: 'C4B4-012.pr-deportation-separate',
    question: '永住 取消 退去強制 永住者 犯罪 退去強制 取消 和 强制送还',
    expected_primary_hit: 'permanent-resident-deportation-separate-from-cancellation',
  },
  {
    id: 'C4B4-013.cancellation-to-deportation-boundary',
    question: '在留資格取消 退去強制 取消後 30日 出国 ビザ取消 すぐ強制送還',
    expected_primary_hit: 'residence-cancellation-to-deportation-ground-boundary',
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C4B4-N001.credit-card-expiry',
    question: 'クレジットカードの有効期限が切れました。再発行できますか。',
    forbidden_hits: ['permanent-resident-card-expiry-not-pr-period-renewal-boundary'],
  },
  {
    id: 'C4B4-N002.mynumber-card-renewal',
    question: 'マイナンバーカードの更新はいつからできますか。2か月前ですか。',
    forbidden_hits: ['permanent-resident-card-renewal-window-procedure'],
  },
  {
    id: 'C4B4-N003.product-warranty',
    question: '家電の保証期間が7年あります。期限切れ後も修理できますか。',
    forbidden_hits: ['permanent-resident-card-validity-seven-year-law'],
  },
  {
    id: 'C4B4-N004.hotel-cancel',
    question: 'ホテル予約をキャンセルしたら30日前からキャンセル料がかかりますか。',
    forbidden_hits: ['residence-cancellation-to-deportation-ground-boundary'],
  },
  {
    id: 'C4B4-N005.online-shopping-cancel',
    question: 'ネット注文をキャンセルしたいです。返金の期限を知りたいです。',
    forbidden_hits: ['permanent-resident-deportation-separate-from-cancellation'],
  },
  {
    id: 'C4B4-N006.train-reentry-ticket',
    question: '新幹線の改札を出たあと再入場できますか。切符の話です。',
    forbidden_hits: ['permanent-resident-long-absence-special-reentry-one-year'],
  },
  {
    id: 'C4B4-N007.passport-renewal',
    question: 'パスポートの更新はいつからできますか。海外旅行のために早めたいです。',
    forbidden_hits: ['permanent-resident-card-renewal-early-application-exception'],
  },
  {
    id: 'C4B4-N008.child-birthday',
    question: '子どもの16歳の誕生日プレゼントを予約したいです。',
    forbidden_hits: ['permanent-resident-card-under-sixteen-before-birthday'],
  },
  {
    id: 'C4B4-N009.business-trip',
    question: '会社の海外出張が半年あります。航空券とホテルをどう取ればいいですか。',
    forbidden_hits: [
      'permanent-resident-long-absence-ordinary-reentry-five-year',
      'permanent-resident-long-absence-special-reentry-one-year',
    ],
  },
  {
    id: 'C4B4-N010.tax-payment',
    question: '住民税をコンビニで払いたいです。納付書の期限が切れました。',
    forbidden_hits: ['permanent-resident-deportation-separate-from-cancellation'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES = [
  {
    id: 'C4B4-R001.production-pr-card-update',
    question: '永住者在留カード更新 7年 いつからできますか。',
  },
  {
    id: 'C4B4-R002.production-pr-no-period',
    question: '永住は無期限なら在留カードは更新しなくていいですか。',
  },
  {
    id: 'C4B4-R003.production-regular-renewal',
    question: '普通の技人国の在留期限が近いです。更新はいつからできますか。',
  },
  {
    id: 'C4B4-R004.production-special-reentry',
    question: 'みなし再入国で1年以内に日本へ戻れば大丈夫ですか。',
  },
  {
    id: 'C4B4-R005.production-ordinary-reentry',
    question: '再入国許可は5年まで取れますか。永住者です。',
  },
  {
    id: 'C4B4-R006.production-return-card',
    question: '日本から永久帰国するとき在留カードは返納しますか。',
  },
  {
    id: 'C4B4-R007.production-card-loss',
    question: '在留カードを紛失しました。再発行はどうすればいいですか。',
  },
  {
    id: 'C4B4-R008.production-pr-tax',
    question: '永住者が税金を払っていないとすぐ退去強制になりますか。',
  },
  {
    id: 'C4B4-R009.production-business-manager',
    question: '経営管理 3000万 既存者 更新 2025改正の対象ですか。',
  },
  {
    id: 'C4B4-R010.production-spouse-change',
    question: '日本人配偶者と離婚しました。定住者に変更できますか。',
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

  function predict(question: string, includeDryRunStates: boolean, candidateSet: 'batch4' | 'full' = 'batch4'): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE4_BATCH4_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 4 Batch 4 cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE4_BATCH4_READY_IDS) assert.ok(ids.has(id), `missing ${id}`)
  })

  check('0b. all Cycle 4 Batch 4 cards are ai_extracted with empty injection', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE4_BATCH4_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
      assert.equal(byId.get(id)?.injectionNeedsReviewAddendum ?? '', '', `${id} needs-review addendum must stay empty`)
    }
  })

  check('0c. user-visible fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE4_BATCH4_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH4_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const ids = predict(fixture.question, true, 'batch4').map(item => item.fact_id)
      const top3 = ids.slice(0, 3)
      assert.ok(top3.includes(fixture.expected_primary_hit), `expected ${fixture.expected_primary_hit}; got ${top3.join(', ') || '[]'}`)
      for (const expected of fixture.expected_secondary_hits ?? []) {
        assert.ok(ids.includes(expected), `expected secondary ${expected}; got ${ids.join(', ') || '[]'}`)
      }
    })

    check(`${fixture.id}. ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch4')
      const prodIds = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE4_BATCH4_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  for (const fixture of BROAD_NEGATIVE_FIXTURES) {
    check(`${fixture.id}. broad terms alone do not match forbidden Batch 4 cards`, () => {
      const ids = predict(fixture.question, true, 'batch4').map(item => item.fact_id)
      for (const forbidden of fixture.forbidden_hits) {
        assert.ok(!ids.includes(forbidden), `${forbidden} unexpectedly matched broad-only prompt; got ${ids.join(', ')}`)
      }
    })
  }

  for (const fixture of PRODUCTION_REGRESSION_FIXTURES) {
    check(`${fixture.id}. production prediction keeps Batch 4 out`, () => {
      const ids = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const id of ids) assert.equal(CYCLE4_BATCH4_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  console.log(`\nCycle 4 Batch 4 dry-run fixtures: ${passes}/${total} checks passed`)
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
