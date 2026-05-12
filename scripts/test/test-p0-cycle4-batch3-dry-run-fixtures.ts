/**
 * Legal Source Engineering — P0 Cycle 4 Batch 3 dry-run fixture matrix.
 *
 * Scope:
 *   - Batch 3 cancellation / status-stability / permanent-residence cancellation-boundary cards.
 *   - They must remain state=ai_extracted with empty injection blocks.
 *   - They must not appear in production-state prediction.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle4-batch3-dry-run-fixtures.ts
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

const CYCLE4_BATCH3_READY_IDS = new Set([
  'residence-cancellation-minister-can-cancel-discretion',
  'residence-cancellation-false-document-no-intent',
  'residence-cancellation-other-activity-intent-trigger',
  'residence-cancellation-opinion-hearing-rights',
  'residence-cancellation-deportation-vs-departure-period',
  'residence-cancellation-table1-statuses-scope',
  'job-loss-cancellation-not-automatic-router',
  'business-manager-activity-stop-risk-router',
  'spouse-divorce-notification-cancellation-distinction',
  'spouse-child-exclusion-from-six-month-rule',
  'spouse-justifiable-reason-examples-not-exhaustive',
  'spouse-cancellation-change-or-pr-opportunity',
  'residence-cancellation-false-address-trigger',
  'cancellation-vs-renewal-or-pr-denial-boundary',
  'permanent-resident-current-cancellation-basic',
  'permanent-resident-reform-intentional-nonpayment-boundary',
  'permanent-resident-reform-not-automatic-change-option',
  'permanent-resident-family-not-automatic-affected',
  'permanent-resident-reform-criminal-violation-boundary',
  'permanent-resident-tax-social-cancellation-review-boundary',
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
  /\bdeep_water_signal\b/i,
  /\brisk_signal\b/i,
  /\banswer_boundary\b/i,
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
  /马上取消/,
  /一定取消/,
  /必ず取消/,
  /绝对没事/,
  /永住不会取消/,
  /失业三个月必取消/,
  /離婚後6か月以内なら絶対安全/,
  /离婚后马上非法/,
]

const BATCH3_FIXTURES: Fixture[] = [
  {
    id: 'C4B3-001.discretion-not-automatic',
    question: '在留資格取消 自動 签证 马上失效 取消事由 すぐ失効 法務大臣 取り消すことができる',
    expected_primary_hit: 'residence-cancellation-minister-can-cancel-discretion',
  },
  {
    id: 'C4B3-002.false-document',
    question: '入管 材料 错了 取消 虚偽 書類 不実記載 文書 在留資格取消',
    expected_primary_hit: 'residence-cancellation-false-document-no-intent',
  },
  {
    id: 'C4B3-003.other-activity',
    question: '技人国 仕事辞めて フリーランス 本来活動 していない 他の活動 在留資格取消',
    expected_primary_hit: 'residence-cancellation-other-activity-intent-trigger',
  },
  {
    id: 'C4B3-004.hearing',
    question: '在留資格取消 通知 意見聴取 入管 出頭 收到取消通知 証拠提出 資料閲覧',
    expected_primary_hit: 'residence-cancellation-opinion-hearing-rights',
  },
  {
    id: 'C4B3-005.departure-period',
    question: '在留資格取消 強制送還 取消後 30日 出国期間 退去強制 いつ帰国',
    expected_primary_hit: 'residence-cancellation-deportation-vs-departure-period',
  },
  {
    id: 'C4B3-006.table1-scope',
    question: '3ヶ月ルール 対象 技人国 経営管理 留学 家族滞在 別表第一 活動資格',
    expected_primary_hit: 'residence-cancellation-table1-statuses-scope',
  },
  {
    id: 'C4B3-007.job-loss',
    question: '失業 3ヶ月 在留資格取消 工作签 失业 自动取消 会社を辞めた ビザ',
    expected_primary_hit: 'job-loss-cancellation-not-automatic-router',
  },
  {
    id: 'C4B3-008.business-stop',
    question: '経営管理 会社 休眠 取消 事業停止 经管 公司停业 活動不履行',
    expected_primary_hit: 'business-manager-activity-stop-risk-router',
  },
  {
    id: 'C4B3-009.spouse-notification-vs-cancellation',
    question: '日配 離婚 届出 取消 配偶者届出 したら 取消 离婚通知入管 签证失效',
    expected_primary_hit: 'spouse-divorce-notification-cancellation-distinction',
  },
  {
    id: 'C4B3-010.spouse-child-exclusion',
    question: '日配 子ども 離婚 取消 永配 子 6ヶ月ルール 日本人の子',
    expected_primary_hit: 'spouse-child-exclusion-from-six-month-rule',
  },
  {
    id: 'C4B3-011.spouse-justifiable-reasons',
    question: '日配 別居 6ヶ月 取消 DV 避難 離婚調停中 正当な理由',
    expected_primary_hit: 'spouse-justifiable-reason-examples-not-exhaustive',
  },
  {
    id: 'C4B3-012.spouse-change-opportunity',
    question: '配偶者ビザ 取消前 変更申請 日配 離婚 定住者 変更 永住申請 機会',
    expected_primary_hit: 'spouse-cancellation-change-or-pr-opportunity',
  },
  {
    id: 'C4B3-013.false-address',
    question: '虚偽 住居地 届出 假地址 借地址 在留カード 在留資格取消',
    expected_primary_hit: 'residence-cancellation-false-address-trigger',
  },
  {
    id: 'C4B3-014.procedure-boundary',
    question: '永住不許可 今のビザ 取消 更新不許可 取消 違い 届出忘れた',
    expected_primary_hit: 'cancellation-vs-renewal-or-pr-denial-boundary',
  },
  {
    id: 'C4B3-015.pr-current-cancellation',
    question: '永住者 取消 永住 绝对安全吗 永住者 在留資格取消 退去強制',
    expected_primary_hit: 'permanent-resident-current-cancellation-basic',
  },
  {
    id: 'C4B3-016.pr-nonpayment',
    question: '永住 税金 未払い 取消 公租公課 故意 不払い 病気 失業 払えない',
    expected_primary_hit: 'permanent-resident-reform-intentional-nonpayment-boundary',
    expected_secondary_hits: ['permanent-resident-tax-social-cancellation-review-boundary'],
  },
  {
    id: 'C4B3-017.pr-change-option',
    question: '永住 取消 必ず 永住者 在留資格変更 職権 定住者 新制度',
    expected_primary_hit: 'permanent-resident-reform-not-automatic-change-option',
  },
  {
    id: 'C4B3-018.pr-family',
    question: '永住 取消 家族 永住者 配偶者 子 影響 家族签证 自动取消',
    expected_primary_hit: 'permanent-resident-family-not-automatic-affected',
  },
  {
    id: 'C4B3-019.pr-criminal',
    question: '永住者 犯罪 取消 永住 交通違反 罰金 道路交通法 危険運転',
    expected_primary_hit: 'permanent-resident-reform-criminal-violation-boundary',
  },
  {
    id: 'C4B3-020.pr-tax-social-review',
    question: '永住者 社会保険料 滞納 永住 年金 未納 取り消し 住民税 払えない',
    expected_primary_hit: 'permanent-resident-tax-social-cancellation-review-boundary',
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C4B3-N001.shopping-cancel',
    question: 'ネット通販の注文をキャンセルしたいです。返金はいつですか。',
    forbidden_hits: ['residence-cancellation-minister-can-cancel-discretion'],
  },
  {
    id: 'C4B3-N002.hotel-cancel',
    question: 'ホテル予約キャンセル料はいつから発生しますか。',
    forbidden_hits: ['residence-cancellation-deportation-vs-departure-period'],
  },
  {
    id: 'C4B3-N003.normal-divorce',
    question: '離婚の財産分与と親権について相談したいです。在留資格の話ではありません。',
    forbidden_hits: [
      'spouse-divorce-notification-cancellation-distinction',
      'spouse-justifiable-reason-examples-not-exhaustive',
      'spouse-cancellation-change-or-pr-opportunity',
    ],
  },
  {
    id: 'C4B3-N004.hello-work',
    question: '失業保険の手続きとハローワークの初回認定日を知りたいです。',
    forbidden_hits: ['job-loss-cancellation-not-automatic-router'],
  },
  {
    id: 'C4B3-N005.accounting-dormant-company',
    question: '会社を休眠すると法人税の均等割はどうなりますか。経理の質問です。',
    forbidden_hits: ['business-manager-activity-stop-risk-router'],
  },
  {
    id: 'C4B3-N006.address-change-normal',
    question: '引っ越したので市役所で住所変更したいです。必要な持ち物は何ですか。',
    forbidden_hits: ['residence-cancellation-false-address-trigger'],
  },
  {
    id: 'C4B3-N007.pr-card-renewal',
    question: '永住者の在留カード更新はどこでできますか。カード期限だけです。',
    forbidden_hits: [
      'permanent-resident-current-cancellation-basic',
      'permanent-resident-reform-not-automatic-change-option',
    ],
  },
  {
    id: 'C4B3-N008.university-documents',
    question: '大学出願書類の不備で合格が取り消されることはありますか。',
    forbidden_hits: ['residence-cancellation-false-document-no-intent'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES = [
  {
    id: 'C4B3-R001.production-spouse-divorce',
    question: '日本人配偶者ビザで離婚しました。14日以内の届出と今後の在留資格が心配です。',
  },
  {
    id: 'C4B3-R002.production-job-loss',
    question: '技人国で失業しました。3か月で在留資格取消になりますか。',
  },
  {
    id: 'C4B3-R003.production-cancellation',
    question: '在留資格取消の通知が来ました。意見聴取とは何ですか。',
  },
  {
    id: 'C4B3-R004.production-pr-card',
    question: '永住者の在留カード更新を忘れそうです。永住申請ではありません。',
  },
  {
    id: 'C4B3-R005.production-business-manager-update',
    question: '経営管理の更新で会社が赤字です。取消ではなく更新の相談です。',
  },
  {
    id: 'C4B3-R006.production-renewal-vs-cancel',
    question: '更新不許可と在留資格取消は同じですか。',
  },
  {
    id: 'C4B3-R007.production-pr-refusal',
    question: '永住が不許可になったら今の技人国も消えますか。',
  },
  {
    id: 'C4B3-R008.production-fake-docs',
    question: '入管に出した書類に不実記載がありました。どうなりますか。',
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

  function predict(question: string, includeDryRunStates: boolean, candidateSet: 'batch3' | 'full' = 'batch3'): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE4_BATCH3_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 4 Batch 3 cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE4_BATCH3_READY_IDS) assert.ok(ids.has(id), `missing ${id}`)
  })

  check('0b. all Cycle 4 Batch 3 cards are ai_extracted with empty injection', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE4_BATCH3_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
    }
  })

  check('0c. user-visible fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE4_BATCH3_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH3_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const ids = predict(fixture.question, true, 'batch3').map(item => item.fact_id)
      const top3 = ids.slice(0, 3)
      assert.ok(top3.includes(fixture.expected_primary_hit), `expected ${fixture.expected_primary_hit}; got ${top3.join(', ') || '[]'}`)
      for (const expected of fixture.expected_secondary_hits ?? []) {
        assert.ok(ids.includes(expected), `expected secondary ${expected}; got ${ids.join(', ') || '[]'}`)
      }
    })

    check(`${fixture.id}. ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch3')
      const prodIds = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE4_BATCH3_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  for (const fixture of BROAD_NEGATIVE_FIXTURES) {
    check(`${fixture.id}. broad terms alone do not match forbidden Batch 3 cards`, () => {
      const ids = predict(fixture.question, true, 'batch3').map(item => item.fact_id)
      for (const forbidden of fixture.forbidden_hits) {
        assert.ok(!ids.includes(forbidden), `${forbidden} unexpectedly matched broad-only prompt; got ${ids.join(', ')}`)
      }
    })
  }

  for (const fixture of PRODUCTION_REGRESSION_FIXTURES) {
    check(`${fixture.id}. production prediction keeps Batch 3 out`, () => {
      const ids = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const id of ids) assert.equal(CYCLE4_BATCH3_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  console.log(`\nCycle 4 Batch 3 dry-run fixtures: ${passes}/${total} checks passed`)
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
