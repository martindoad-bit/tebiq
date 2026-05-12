/**
 * Legal Source Engineering — P0 Cycle 3 Batch 5 dry-run fixture matrix.
 *
 * Scope:
 *   - Batch 5 re-entry / special re-entry / online-procedure boundary cards must be observable in dry-run.
 *   - They must remain state=ai_extracted with empty injection blocks.
 *   - They must not appear in production-state prediction.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle3-batch5-dry-run-fixtures.ts
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

const CYCLE3_BATCH5_READY_IDS = new Set([
  'reentry-permit-status-continuity',
  'no-reentry-departure-status-extinguishes',
  'ordinary-reentry-before-departure',
  'ordinary-reentry-single-vs-multiple',
  'ordinary-reentry-validity-limit',
  'ordinary-reentry-online-simultaneous-only',
  'special-reentry-eligibility-valid-passport-card',
  'special-reentry-one-year-or-status-expiry',
  'special-reentry-no-overseas-extension',
  'special-reentry-excluded-persons',
  'special-reentry-departure-intent-ed-card',
  'special-permanent-resident-special-reentry-two-years',
  'pending-application-reentry-period-boundary',
  'temporary-visitor-not-reentry-target',
  'online-application-not-from-abroad',
  'online-final-day-not-available',
  'online-pr-card-procedures-excluded',
  'online-application-channel-not-permission',
  'online-card-mail-receipt-special-reentry-boundary',
  'reentry-permit-document-lost-passport-card-abroad',
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
  /\breentry-permit\b/i,
  /\bspecial-reentry\b/i,
  /\bonline-reentry\b/i,
  /\bprocedure_scope\b/i,
  /\bprocedure_router\b/i,
  /\bpermission_boundary\b/i,
  /\bonline guardrail\b/i,
  /\bordinary re-entry\b/i,
  /\bspecial re-entry\b/i,
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
  /みなし再入国は自動無限/,
  /在留カードが有効なら必ず戻れる/,
  /永住者は再入国許可不要/,
  /海外から在留更新できる/,
  /オンライン受付は許可/,
  /普通再入国許可とみなし再入国は同じ/,
]

const BATCH5_FIXTURES: Fixture[] = [
  {
    id: 'C3B5-001.status-continuity',
    question: '再入国許可 何のため 再入国許可 ビザ 免除 再入国許可 在留資格 継続',
    expected_primary_hit: 'reentry-permit-status-continuity',
  },
  {
    id: 'C3B5-002.no-reentry-status-extinguishes',
    question: '再入国許可なし 出国 在留資格 消える 出国カード チェック 忘れた 在留カード 有効 でも 戻れる',
    expected_primary_hit: 'no-reentry-departure-status-extinguishes',
  },
  {
    id: 'C3B5-003.ordinary-before-departure',
    question: '再入国許可 出国前 申請 再入国許可 いつ申請 長期出国 再入国許可 入管',
    expected_primary_hit: 'ordinary-reentry-before-departure',
  },
  {
    id: 'C3B5-004.single-multiple',
    question: '再入国許可 一次 数次 再入国許可 何回使える 再入国许可 多次',
    expected_primary_hit: 'ordinary-reentry-single-vs-multiple',
  },
  {
    id: 'C3B5-005.validity-limit',
    question: '再入国許可 最長 5年 再入国許可 在留期限 まで 特別永住者 再入国許可 6年',
    expected_primary_hit: 'ordinary-reentry-validity-limit',
  },
  {
    id: 'C3B5-006.online-simultaneous',
    question: '再入国許可 オンライン 申請 再入国許可 単独 オンライン 在留期間更新 再入国許可 同時申請',
    expected_primary_hit: 'ordinary-reentry-online-simultaneous-only',
  },
  {
    id: 'C3B5-007.special-eligibility',
    question: 'みなし再入国 対象 みなし再入国 有効な旅券 在留カード 短期帰国 再入国許可 不要',
    expected_primary_hit: 'special-reentry-eligibility-valid-passport-card',
  },
  {
    id: 'C3B5-008.special-one-year-or-expiry',
    question: 'みなし再入国 1年以内 在留期限 在留期限 4ヶ月 みなし再入国 1年 出国 10ヶ月 在留期限 半年',
    expected_primary_hit: 'special-reentry-one-year-or-status-expiry',
  },
  {
    id: 'C3B5-009.special-no-extension',
    question: 'みなし再入国 延長 海外 みなし再入国 期限 延ばす 1年以内 戻れない みなし再入国',
    expected_primary_hit: 'special-reentry-no-overseas-extension',
  },
  {
    id: 'C3B5-010.special-excluded',
    question: '在留資格取消 手続中 みなし再入国 難民申請中 みなし再入国 みなし再入国 対象外',
    expected_primary_hit: 'special-reentry-excluded-persons',
  },
  {
    id: 'C3B5-011.departure-intent',
    question: 'みなし再入国 チェック欄 出国カード みなし再入国 チェック 出国時 再入国 意思表示',
    expected_primary_hit: 'special-reentry-departure-intent-ed-card',
  },
  {
    id: 'C3B5-012.special-pr-two-years',
    question: '特別永住者 みなし再入国 2年 特別永住者証明書 みなし再入国 特别永住者 再入国 两年',
    expected_primary_hit: 'special-permanent-resident-special-reentry-two-years',
  },
  {
    id: 'C3B5-013.pending-application',
    question: '更新申請中 出国 みなし再入国 在留期間更新 申請中 一時帰国 特例期間 みなし再入国',
    expected_primary_hit: 'pending-application-reentry-period-boundary',
  },
  {
    id: 'C3B5-014.temporary-visitor',
    question: '短期滞在 みなし再入国 短期滞在 再入国許可 観光ビザ 一時出国 戻る',
    expected_primary_hit: 'temporary-visitor-not-reentry-target',
  },
  {
    id: 'C3B5-015.online-not-from-abroad',
    question: '海外から オンライン 更新申請 外国から 在留期間更新 オンライン みなし再入国中 オンライン申請',
    expected_primary_hit: 'online-application-not-from-abroad',
  },
  {
    id: 'C3B5-016.online-final-day',
    question: '在留期限 当日 オンライン申請 在留期間満了日 オンライン 更新 今日 期限 ネット申請',
    expected_primary_hit: 'online-final-day-not-available',
  },
  {
    id: 'C3B5-017.online-pr-card-excluded',
    question: '永住申請 オンライン できる 在留カード 有効期間更新 オンライン 在留カード 記載事項変更 オンライン',
    expected_primary_hit: 'online-pr-card-procedures-excluded',
  },
  {
    id: 'C3B5-018.online-channel',
    question: 'オンライン申請 早く許可 オンライン申請 条件 緩い ネット申請 免材料',
    expected_primary_hit: 'online-application-channel-not-permission',
  },
  {
    id: 'C3B5-019.card-mail-receipt',
    question: '在留カード 郵送受領中 出国 オンライン申請 カード 郵送 みなし再入国 在留カード 手元にない みなし再入国',
    expected_primary_hit: 'online-card-mail-receipt-special-reentry-boundary',
  },
  {
    id: 'C3B5-020.lost-abroad',
    question: '海外 在留カード 紛失 再入国 出国中 在留カード なくした 再入国許可 期限証明',
    expected_primary_hit: 'reentry-permit-document-lost-passport-card-abroad',
  },
  {
    id: 'C3B5-021.cross-pending-card',
    question: '更新申請中 出国 みなし再入国 在留カード 手元にない みなし再入国',
    expected_primary_hit: 'pending-application-reentry-period-boundary',
    expected_secondary_hits: ['online-card-mail-receipt-special-reentry-boundary'],
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C3B5-N001.generic-return-home',
    question: '来週実家に帰ります。新幹線のチケットと荷物の送り方を知りたいです。',
    forbidden_hits: ['special-reentry-eligibility-valid-passport-card', 'ordinary-reentry-before-departure'],
  },
  {
    id: 'C3B5-N002.travel-insurance',
    question: '海外旅行保険は一年契約と短期契約のどちらがいいですか。',
    forbidden_hits: ['special-reentry-one-year-or-status-expiry'],
  },
  {
    id: 'C3B5-N003.online-banking',
    question: 'オンライン銀行の申し込みが海外IPでブロックされます。',
    forbidden_hits: ['online-application-not-from-abroad'],
  },
  {
    id: 'C3B5-N004.company-permit',
    question: '飲食店の営業許可をオンラインで申請できますか。',
    forbidden_hits: ['ordinary-reentry-online-simultaneous-only', 'online-application-channel-not-permission'],
  },
  {
    id: 'C3B5-N005.short-video',
    question: '短期滞在型の旅行動画を作りたいです。再入国という言葉をタイトルに入れます。',
    forbidden_hits: ['temporary-visitor-not-reentry-target'],
  },
  {
    id: 'C3B5-N006-card-game',
    question: '在留カードではなくカードゲームの有効期限と返品方法を知りたいです。',
    forbidden_hits: ['online-card-mail-receipt-special-reentry-boundary'],
  },
  {
    id: 'C3B5-N007-multiple-choice',
    question: '試験問題で一次関数と数次方程式の違いを教えてください。',
    forbidden_hits: ['ordinary-reentry-single-vs-multiple'],
  },
  {
    id: 'C3B5-N008-passport-tourism',
    question: 'パスポートを失くした観光客向けの大使館案内を作りたいです。',
    forbidden_hits: ['reentry-permit-document-lost-passport-card-abroad'],
  },
  {
    id: 'C3B5-N009-application-status',
    question: '大学の出願申請中ですが、海外研修に行けますか。',
    forbidden_hits: ['pending-application-reentry-period-boundary'],
  },
  {
    id: 'C3B5-N010-pr-marketing',
    question: 'PRカードではなく広報用カードのデザインをオンラインで作りたいです。',
    forbidden_hits: ['online-pr-card-procedures-excluded'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES = [
  {
    id: 'C3B5-R001.production-minashi-basic',
    question: '我回国半年还回来，要办再入国许可吗？ みなし再入国 在留カード',
  },
  {
    id: 'C3B5-R002.production-over-one-year',
    question: '离开日本超过一年还能用みなし再入国吗？ みなし再入国 延長 海外',
  },
  {
    id: 'C3B5-R003.production-pr-long-trip',
    question: '永住者回国一年半，需要再入国许可吗？ 再入国許可 最長 5年',
  },
  {
    id: 'C3B5-R004.production-return-permanent',
    question: '我不回日本了，在留卡要怎么办？ 在留カード 返納 帰国',
  },
  {
    id: 'C3B5-R005.production-pending-trip',
    question: '更新申请中想回国，可以用みなし再入国吗？ 更新申請中 出国',
  },
  {
    id: 'C3B5-R006.production-card-expiry-trip',
    question: '在留卡快过期但想出国再回来怎么办？ 在留期限 みなし再入国',
  },
  {
    id: 'C3B5-R007.production-online-receipt',
    question: '线上申请已经受付，是不是等于许可了？ オンライン申請 受付',
  },
  {
    id: 'C3B5-R008.production-card-loss-trip',
    question: '在留卡丢了，还能みなし再入国吗？ 在留カード 紛失 再入国',
  },
  {
    id: 'C3B5-R009.production-final-day',
    question: '今天在留期限最后一天，可以网上更新吗？ 在留期限 当日 オンライン申請',
  },
  {
    id: 'C3B5-R010.production-abroad-online',
    question: '我人在国外，可以网上申请更新日本在留资格吗？ 海外から オンライン 更新申請',
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

  function predict(question: string, includeDryRunStates: boolean, candidateSet: 'batch5' | 'full' = 'batch5'): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE3_BATCH5_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 3 Batch 5 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE3_BATCH5_READY_IDS) assert.ok(ids.has(id), `missing ${id}`)
  })

  check('0b. all Cycle 3 Batch 5 cards are ai_extracted with empty injection', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE3_BATCH5_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
    }
  })

  check('0c. user-visible fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE3_BATCH5_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of BATCH5_FIXTURES) {
    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const ids = predict(fixture.question, true, 'batch5').map(item => item.fact_id)
      const top3 = ids.slice(0, 3)
      assert.ok(top3.includes(fixture.expected_primary_hit), `expected ${fixture.expected_primary_hit}; got ${top3.join(', ') || '[]'}`)
      for (const expected of fixture.expected_secondary_hits ?? []) {
        assert.ok(ids.includes(expected), `expected secondary ${expected}; got ${ids.join(', ') || '[]'}`)
      }
    })

    check(`${fixture.id}. ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch5')
      const prodIds = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE3_BATCH5_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  for (const fixture of BROAD_NEGATIVE_FIXTURES) {
    check(`${fixture.id}. broad terms alone do not match forbidden Batch 5 cards`, () => {
      const ids = predict(fixture.question, true, 'batch5').map(item => item.fact_id)
      for (const forbidden of fixture.forbidden_hits) {
        assert.ok(!ids.includes(forbidden), `${forbidden} unexpectedly matched broad-only prompt; got ${ids.join(', ')}`)
      }
    })
  }

  for (const fixture of PRODUCTION_REGRESSION_FIXTURES) {
    check(`${fixture.id}. production prediction keeps Batch 5 out`, () => {
      const ids = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const id of ids) assert.equal(CYCLE3_BATCH5_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  console.log(`\nCycle 3 Batch 5 dry-run fixtures: ${passes}/${total} checks passed`)
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
