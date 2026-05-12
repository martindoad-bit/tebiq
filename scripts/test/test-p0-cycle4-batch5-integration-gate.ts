/**
 * Legal Source Engineering — P0 Cycle 4 Batch 5 integration gate.
 *
 * Scope:
 *   - Batch 5 bridge cards.
 *   - Whole Cycle 4 production isolation.
 *   - AQL-style A/B questions for permanent residence, cancellation, and reentry.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle4-batch5-integration-gate.ts
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
  sprint: string
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
}

const CYCLE4_BATCH5_READY_IDS = new Set([
  'permanent-residence-core-procedure-router',
  'permanent-residence-materials-vs-eligibility-boundary',
  'permanent-residence-public-obligation-document-vs-evaluation',
  'permanent-resident-current-vs-reform-cancellation-router',
  'permanent-resident-card-expiry-risk-router',
  'reentry-status-continuity-router',
  'ordinary-vs-special-reentry-boundary',
  'status-cancellation-departure-deportation-router',
  'spouse-notification-vs-cancellation-risk-router',
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
  /\brouter\b/i,
  /\bcancellation_trigger\b/i,
  /\bprocedure_boundary\b/i,
  /\brouting_boundary\b/i,
  /\bdeep_water_signal\b/i,
  /\bsource_gap\b/i,
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
  /永住.*定期.*更新/,
  /永住カード.*失効/,
  /補納.*必ず/,
  /自动.*取消/,
  /必ず.*退去強制/,
  /必ず.*定住者/,
  /絶対安全/,
  /完全没事/,
]

const BATCH5_FIXTURES: Fixture[] = [
  {
    id: 'C4B5-001.core-procedure',
    question: '永住申請 在留カード更新 在留期間更新 違い',
    expected_primary_hit: 'permanent-residence-core-procedure-router',
  },
  {
    id: 'C4B5-002.materials-eligibility',
    question: '永住 材料齐了 一定能过',
    expected_primary_hit: 'permanent-residence-materials-vs-eligibility-boundary',
  },
  {
    id: 'C4B5-003.public-obligation',
    question: '永住 税 年金 医保 材料 審査',
    expected_primary_hit: 'permanent-residence-public-obligation-document-vs-evaluation',
  },
  {
    id: 'C4B5-004.current-vs-reform',
    question: '永住 现行 取消 新制度 区别',
    expected_primary_hit: 'permanent-resident-current-vs-reform-cancellation-router',
  },
  {
    id: 'C4B5-005.card-expiry-risk',
    question: '永住 在留カード 期限切れ リスク',
    expected_primary_hit: 'permanent-resident-card-expiry-risk-router',
  },
  {
    id: 'C4B5-006.reentry-continuity',
    question: '出国後 在留資格 続く 再入国',
    expected_primary_hit: 'reentry-status-continuity-router',
  },
  {
    id: 'C4B5-007.reentry-boundary',
    question: '再入国許可 みなし再入国 違い',
    expected_primary_hit: 'ordinary-vs-special-reentry-boundary',
  },
  {
    id: 'C4B5-008.cancellation-path',
    question: '在留資格取消 すぐ強制送還',
    expected_primary_hit: 'status-cancellation-departure-deportation-router',
  },
  {
    id: 'C4B5-009.spouse-notification',
    question: '配偶者 届出 取消 6ヶ月 違い',
    expected_primary_hit: 'spouse-notification-vs-cancellation-risk-router',
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C4B5-N001.document-translation',
    question: '提出書類の日本語翻訳はどこで依頼できますか。永住ではありません。',
    forbidden_hits: ['permanent-residence-materials-vs-eligibility-boundary'],
  },
  {
    id: 'C4B5-N002.public-tax-normal',
    question: '住民税の納付書をなくしました。再発行できますか。',
    forbidden_hits: ['permanent-residence-public-obligation-document-vs-evaluation'],
  },
  {
    id: 'C4B5-N003.train-reentry',
    question: '駅の改札を出た後、同じ切符で再入場できますか。',
    forbidden_hits: ['reentry-status-continuity-router', 'ordinary-vs-special-reentry-boundary'],
  },
  {
    id: 'C4B5-N004.credit-card-expiry',
    question: 'クレジットカードの期限切れで決済できません。',
    forbidden_hits: ['permanent-resident-card-expiry-risk-router'],
  },
  {
    id: 'C4B5-N005.subscription-cancel',
    question: 'サブスクをキャンセルしたら返金されますか。',
    forbidden_hits: ['status-cancellation-departure-deportation-router'],
  },
  {
    id: 'C4B5-N006.spouse-tax',
    question: '配偶者控除と扶養控除の違いを知りたいです。',
    forbidden_hits: ['spouse-notification-vs-cancellation-risk-router'],
  },
  {
    id: 'C4B5-N007.pr-marketing',
    question: 'PR会社に転職したいです。広報職の求人を探しています。',
    forbidden_hits: ['permanent-resident-current-vs-reform-cancellation-router'],
  },
  {
    id: 'C4B5-N008.normal-renewal',
    question: '運転免許証の更新手続きはいつからできますか。',
    forbidden_hits: ['permanent-residence-core-procedure-router'],
  },
]

const AQL_AB_QUESTIONS = [
  '永住者在留卡快到期了，要更新永住吗？',
  '永住卡 7 年到期，是不是永住资格到期？',
  '永住卡过期是不是非法滞在？',
  '卡过期但我是永住，还能工作吗？',
  '永住申请需要交税年金医保证明吗？',
  '税年金医保材料齐了，是不是永住稳了？',
  '年金免除会不会影响永住？',
  '补交完住民税是不是就没问题？',
  '永住申请材料齐全多久能批？',
  '我失业三个月，工作签会自动取消吗？',
  '更新不许可是不是在留资格取消？',
  '我以前材料有假，会不会取消在留资格？',
  '离婚后配偶签自动失效吗？',
  '短期回国要交回在留卡吗？',
  'みなし再入国一年内回来就行吗？',
  'みなし再入国超过一年但卡还有效，可以回来吗？',
  '永住者长期海外生活，永住会不会自动没？',
  '永住取消后会自动变定住吗？',
  '永住申请和在留资格更新能同时办吗？',
  '永住申请中现在签证快到期怎么办？',
]

const PRODUCTION_PROTECTION_FIXTURES = [
  '永住は何年住めば申請できますか？',
  '永住申請で年金の未納があります。',
  '永住申請の必要書類を知りたいです。',
  '永住者の在留カード更新をしたいです。',
  'みなし再入国で一時帰国します。',
  '再入国許可を取りたいです。',
  '日本人配偶者と離婚しました。',
  '技人国で失業しました。3ヶ月で取消ですか。',
  '在留資格取消の通知が来ました。',
  '経営管理の既存者更新で3000万円が心配です。',
]

async function main() {
  const syncMod = await import('@/scripts/fact-layer-sync')
  const matcherMod = await import('@/lib/answer/fact-layer/matcher')
  const matcherInternals = matcherMod._matcherInternals
  const cards = loadDiskCards(syncMod)
  const cycle4Ids = new Set(cards.filter(card => card.sprint.includes('P0 Cycle 4')).map(card => card.factId))

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
      .filter(card => candidateSet === 'full' || CYCLE4_BATCH5_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 4 Batch 5 cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE4_BATCH5_READY_IDS) assert.ok(ids.has(id), `missing ${id}`)
  })

  check('0b. all Cycle 4 cards are ai_extracted with empty injection', () => {
    assert.ok(cycle4Ids.size >= 76, `expected at least 76 Cycle 4 cards, got ${cycle4Ids.size}`)
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of cycle4Ids) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
      assert.equal(byId.get(id)?.injectionNeedsReviewAddendum ?? '', '', `${id} addendum must stay empty`)
    }
  })

  check('0c. Cycle 4 user-visible fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => cycle4Ids.has(item.factId))) {
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
    })

    check(`${fixture.id}. ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'batch5')
      const prodIds = predict(fixture.question, false, 'full').map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE4_BATCH5_READY_IDS.has(item.fact_id))) {
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

  for (const [idx, question] of AQL_AB_QUESTIONS.entries()) {
    check(`C4B5-AB-${String(idx + 1).padStart(2, '0')}. production prediction keeps all Cycle 4 out`, () => {
      const ids = predict(question, false, 'full').map(item => item.fact_id)
      for (const id of ids) assert.equal(cycle4Ids.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  for (const [idx, question] of PRODUCTION_PROTECTION_FIXTURES.entries()) {
    check(`C4B5-PROD-${String(idx + 1).padStart(2, '0')}. protected production scenario keeps Cycle 4 out`, () => {
      const ids = predict(question, false, 'full').map(item => item.fact_id)
      for (const id of ids) assert.equal(cycle4Ids.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  console.log(`\nCycle 4 Batch 5 integration gate: ${passes}/${total} checks passed`)
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
        sprint: stringValue(parsed.data.sprint),
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
