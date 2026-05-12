/**
 * Legal Source Engineering — P0 Cycle 3 Batch 4 dry-run fixture matrix.
 *
 * Scope:
 *   - Batch 4 residence-card / residence-address / card-return cards must be observable in dry-run.
 *   - They must remain state=ai_extracted with empty injection blocks.
 *   - They must not appear in production-state prediction.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle3-batch4-dry-run-fixtures.ts
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

const CYCLE3_BATCH4_READY_IDS = new Set([
  'resident-card-non-address-change-scope',
  'resident-card-non-address-change-fourteen-day',
  'resident-card-non-address-change-immigration-office-router',
  'resident-card-non-address-change-evidence-documents',
  'residence-address-notification-new-mid-long-term-scope',
  'residence-address-notification-new-landing-fourteen-day',
  'residence-address-notification-fourteen-day-municipality',
  'residence-address-change-fourteen-day-municipality',
  'residence-address-notification-deemed-by-municipality',
  'resident-card-loss-reissue-fourteen-day',
  'resident-card-loss-police-report-number',
  'resident-card-damaged-reissue-router',
  'resident-card-validity-renewal-targets',
  'resident-card-validity-renewal-window',
  'resident-card-validity-vs-residence-period-boundary',
  'resident-card-return-expiry-triggers',
  'resident-card-return-deadline-by-trigger',
  'resident-card-return-mail-or-office-method',
  'resident-card-found-old-card-return-after-reissue',
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
  /\bresident-card\b/i,
  /\baddress-notification\b/i,
  /\bcard-return\b/i,
  /\bclaim_type\b/i,
  /\bprocedure_scope\b/i,
  /\bprocedure_router\b/i,
  /\bdeadline_window\b/i,
  /\bprocedure_method\b/i,
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
  /照片可以代替原件/,
  /永住者不用带在留卡/,
  /短期出国也必须返納/,
  /在留カードをなくしたら在留資格も失効/,
  /搬家只要改邮局就行/,
  /住所変更就是更新签证/,
  /必ず在留資格取消/,
]

const BATCH4_FIXTURES: Fixture[] = [
  {
    id: 'C3B4-001.non-address-scope',
    question: '在留カード 氏名変更 在留カード 国籍変更 在留カード 記載事項変更 対象',
    expected_primary_hit: 'resident-card-non-address-change-scope',
  },
  {
    id: 'C3B4-002.non-address-deadline',
    question: '在留カード 氏名変更 14日 在留カード 国籍変更 14日以内 在留カード 記載事項変更 期限',
    expected_primary_hit: 'resident-card-non-address-change-fourteen-day',
  },
  {
    id: 'C3B4-003.non-address-office',
    question: '在留カード 氏名変更 どこで 在留カード 国籍変更 入管 住所以外 在留カード 変更 入管',
    expected_primary_hit: 'resident-card-non-address-change-immigration-office-router',
  },
  {
    id: 'C3B4-004.non-address-docs',
    question: '在留カード 氏名変更 必要書類 在留カード 国籍変更 必要書類 変更を証する資料 在留カード',
    expected_primary_hit: 'resident-card-non-address-change-evidence-documents',
  },
  {
    id: 'C3B4-005.new-midlong-scope',
    question: '在留資格変更後 住居地届出 新しく中長期在留者 住所登録 在留カード 住所 空欄 変更許可',
    expected_primary_hit: 'residence-address-notification-new-mid-long-term-scope',
  },
  {
    id: 'C3B4-005b.new-landing-address',
    question: '新規上陸後 住居地届出 入国後 住所登録 14日 在留カード 後日交付 住所登録',
    expected_primary_hit: 'residence-address-notification-new-landing-fourteen-day',
  },
  {
    id: 'C3B4-006.new-midlong-deadline',
    question: '住居地を定めた日から14日以内 在留資格変更後 住所登録 14日 新しく中長期在留者 14日以内',
    expected_primary_hit: 'residence-address-notification-fourteen-day-municipality',
  },
  {
    id: 'C3B4-007.address-change',
    question: '搬家后在留卡地址 在留カード 住所変更 14日 住居地変更届出 市区町村',
    expected_primary_hit: 'residence-address-change-fourteen-day-municipality',
  },
  {
    id: 'C3B4-008.deemed-municipality',
    question: '区役所で住所変更したら入管も必要 市役所で住所変更 入管 不要 在留カード 市区町村 みなし届出',
    expected_primary_hit: 'residence-address-notification-deemed-by-municipality',
  },
  {
    id: 'C3B4-009.loss-deadline',
    question: '在留カード 紛失 14日 在留カード 再交付 期限 在留卡 丢了 多久内',
    expected_primary_hit: 'resident-card-loss-reissue-fourteen-day',
  },
  {
    id: 'C3B4-010.loss-police',
    question: '在留カード 紛失 警察 在留カード 盗難 届出受理番号 在留卡 丢了 要报警吗',
    expected_primary_hit: 'resident-card-loss-police-report-number',
  },
  {
    id: 'C3B4-010b.damaged-card',
    question: '在留カード 汚損 再交付 在留カード IC 読めない 在留カード 再交付申請命令 14日',
    expected_primary_hit: 'resident-card-damaged-reissue-router',
  },
  {
    id: 'C3B4-011.validity-targets',
    question: '永住者 在留カード 有効期間 更新 高度専門職2号 在留カード 更新 子供 在留カード 16歳 更新',
    expected_primary_hit: 'resident-card-validity-renewal-targets',
  },
  {
    id: 'C3B4-012.validity-window',
    question: '永住者 在留カード 2か月前 在留カード 有効期間 更新 いつから 16歳 在留カード 6か月前',
    expected_primary_hit: 'resident-card-validity-renewal-window',
  },
  {
    id: 'C3B4-012b.validity-boundary',
    question: '在留カード 期限 在留期限 違い 在留カード 有効期間 在留期間 違う カード有効期間 更新 在留期間更新',
    expected_primary_hit: 'resident-card-validity-vs-residence-period-boundary',
  },
  {
    id: 'C3B4-013.return-triggers',
    question: '在留カード 返納 どんな時 在留カード 返す 必要 在留カード 失効 返納',
    expected_primary_hit: 'resident-card-return-expiry-triggers',
  },
  {
    id: 'C3B4-014.return-deadline',
    question: '在留カード 返納 14日以内 在留カード 空港 返納 直ちに 在留カード 返納 期限',
    expected_primary_hit: 'resident-card-return-deadline-by-trigger',
  },
  {
    id: 'C3B4-015.return-method',
    question: '在留カード 返納 郵送 在留カード 返納 送付先 在留カード 返納 持参',
    expected_primary_hit: 'resident-card-return-mail-or-office-method',
  },
  {
    id: 'C3B4-016.old-card-found',
    question: '古い在留カード 見つかった 在留カード 再交付後 見つかった 旧在留カード 返納 14日',
    expected_primary_hit: 'resident-card-found-old-card-return-after-reissue',
  },
  {
    id: 'C3B4-017.loss-cross-return',
    question: '在留カード 紛失 再交付後 見つかった 古い在留カード 見つかった 旧在留カード 返納 14日',
    expected_primary_hit: 'resident-card-found-old-card-return-after-reissue',
    expected_secondary_hits: ['resident-card-loss-reissue-fourteen-day'],
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C3B4-N001.generic-moving-company',
    question: '引っ越し業者の見積もりと家具の搬入について知りたいです。',
    forbidden_hits: ['residence-address-change-fourteen-day-municipality'],
  },
  {
    id: 'C3B4-N002.post-office-forwarding',
    question: '郵便局の転送届はいつまで使えますか。住所変更の郵便だけです。',
    forbidden_hits: ['residence-address-notification-deemed-by-municipality'],
  },
  {
    id: 'C3B4-N003.bank-address',
    question: '銀行口座の住所変更とクレジットカードの住所を変えたいです。',
    forbidden_hits: ['residence-address-change-fourteen-day-municipality'],
  },
  {
    id: 'C3B4-N004.passport-loss',
    question: 'パスポートをなくしました。大使館で再発行できますか。',
    forbidden_hits: [
      'resident-card-loss-reissue-fourteen-day',
      'resident-card-loss-police-report-number',
    ],
  },
  {
    id: 'C3B4-N005.my-number-card',
    question: 'マイナンバーカードの電子証明書更新と住所変更を知りたいです。',
    forbidden_hits: [
      'resident-card-validity-renewal-targets',
      'residence-address-change-fourteen-day-municipality',
    ],
  },
  {
    id: 'C3B4-N006.company-address',
    question: '会社の本店所在地が変わりました。名刺と登記の住所を変えます。',
    forbidden_hits: ['residence-address-change-fourteen-day-municipality'],
  },
  {
    id: 'C3B4-N007.product-return',
    question: 'ネット通販の商品を返納ではなく返品したいです。返金方法を教えてください。',
    forbidden_hits: [
      'resident-card-return-expiry-triggers',
      'resident-card-return-deadline-by-trigger',
      'resident-card-return-mail-or-office-method',
    ],
  },
  {
    id: 'C3B4-N008.student-card-carry',
    question: '学生証を毎日携帯する必要がありますか。',
    forbidden_hits: ['resident-card-validity-renewal-targets'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES = [
  {
    id: 'C3B4-R001.production-address',
    question: '搬家后在留卡地址要怎么改？ 搬家后在留卡地址',
  },
  {
    id: 'C3B4-R002.production-loss',
    question: '在留卡丢了，是不是签证也没了？ 在留カード 紛失 14日',
  },
  {
    id: 'C3B4-R003.production-pr-card',
    question: '永住者の在留カードが切れそうです。永住を更新しますか？ 永住者 在留カード 有効期間 更新',
  },
  {
    id: 'C3B4-R004.production-post-forwarding',
    question: '郵便局転送届の住所変更はどうすればいいですか？',
  },
  {
    id: 'C3B4-R005.production-mynumber',
    question: 'MyNumberカード住所変更と在留カード住所変更は同じですか？',
  },
  {
    id: 'C3B4-R006.production-passport-loss',
    question: 'パスポートをなくしたら在留カードも補辦しますか？',
  },
  {
    id: 'C3B4-R007.production-reentry-trip',
    question: '回国旅游两周，要把在留卡还给入管吗？ 再入国 在留カード 返納',
  },
  {
    id: 'C3B4-R008.production-card-photo',
    question: '外出没带在留卡，只带照片可以吗？ 在留カード 携帯義務',
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
      .filter(card => candidateSet === 'full' || CYCLE3_BATCH4_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 3 Batch 4 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE3_BATCH4_READY_IDS) assert.ok(ids.has(id), `missing ${id}`)
  })

  check('0b. all Cycle 3 Batch 4 cards are ai_extracted with empty injection', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE3_BATCH4_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
    }
  })

  check('0c. user-visible fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE3_BATCH4_READY_IDS.has(item.factId))) {
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
      for (const match of dryRunMatches.filter(item => CYCLE3_BATCH4_READY_IDS.has(item.fact_id))) {
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
      for (const id of ids) assert.equal(CYCLE3_BATCH4_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  console.log(`\nCycle 3 Batch 4 dry-run fixtures: ${passes}/${total} checks passed`)
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
