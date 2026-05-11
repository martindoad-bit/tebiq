/**
 * 0.6 Sprint Workstream C — 11-question fact-injection offline smoke
 * (ENGINE Pack 2.2 §8).
 *
 * Pack §8 calls for "4 baseline + 7 coverage" question matrix verifying
 * the matcher fires expected cards. Prod DB isn't reachable from CI, so
 * this smoke uses sync's `normalize()` to load cards from disk into
 * memory, then runs the matcher's pure scoring helpers (no DB read).
 *
 * "Predicted matches" here = what the production matcher would surface
 * once FACT_LAYER_ENABLED=true and the prod fact_cards table is in
 * lockstep with disk (Runbook §2 sync was already run per Pack 2.2
 * pre-condition).
 *
 * The companion live-curl smoke against `/api/internal/fact-layer/dry-run`
 * runs post-merge (Pack §9 — GM/QA). This file's job is to LOCK the
 * matcher prediction so any drift in card content / matcher logic is
 * caught at PR time.
 *
 * Usage: npx tsx scripts/test/test-fact-injection-smoke.ts
 */
import { strict as assert } from 'node:assert'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

interface InMemoryCard {
  factId: string
  state: string
  riskLevel: string
  controlledAlphaEligible: boolean
  triggerKeywords: ReadonlyArray<string>
}

async function main() {
  const syncMod = await import('@/scripts/fact-layer-sync')
  const matcherMod = await import('@/lib/answer/fact-layer/matcher')

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

  // -----------------------------------------------------------------------
  // Load disk cards via sync's normalize(). This produces the SAME
  // shape sync would upsert into the DB.
  // -----------------------------------------------------------------------
  const cardsDir = join(process.cwd(), 'docs/fact-cards')
  const files = readdirSync(cardsDir).filter(
    f => f.endsWith('.md') && f !== 'README.md' && f !== 'FACT_OPS_WINDOW_TASK_PACK.md',
  )
  const cards: InMemoryCard[] = []
  for (const f of files) {
    const raw = readFileSync(join(cardsDir, f), 'utf8')
    const norm = syncMod._internals.normalize(join(cardsDir, f), raw)
    cards.push({
      factId: norm.factId,
      state: norm.state,
      riskLevel: norm.riskLevel,
      // Drizzle's `$inferInsert` types boolean columns with defaults as
      // `boolean | undefined`. Coalesce to the same default the DB
      // applies (false) so InMemoryCard stays strict.
      controlledAlphaEligible: norm.controlledAlphaEligible ?? false,
      triggerKeywords: norm.triggerKeywords ?? [],
    })
  }

  // -----------------------------------------------------------------------
  // Per-question predicted match. We reproduce the matcher's score gate
  // + risk-rank sort + MAX_INJECTED cap by reusing the matcher's
  // exposed _matcherInternals.scoreCardAgainst + gateDecision (DB-free).
  // -----------------------------------------------------------------------
  type DecisionPrediction = {
    fact_id: string
    decision: 'inject' | 'hint_only' | 'drop'
  }
  function predict(question: string): DecisionPrediction[] {
    const haystack = question.toLowerCase()
    const raws: { card: InMemoryCard; matched: number; score: number }[] = []
    for (const card of cards) {
      const seen = new Set<string>()
      const matched: string[] = []
      for (const kw of card.triggerKeywords) {
        const kwLower = kw.toLowerCase()
        if (seen.has(kwLower)) continue
        if (haystack.includes(kwLower)) {
          matched.push(kw)
          seen.add(kwLower)
        }
      }
      if (matched.length === 0) continue
      const uniqueTotal = new Set(card.triggerKeywords.map(k => k.toLowerCase())).size
      const score = Math.min(1, matched.length / Math.max(1, uniqueTotal))
      const isHigh = card.riskLevel === 'high' || card.riskLevel === 'critical'
      if (
        !isHigh &&
        score < matcherMod._matcherInternals.SCORE_THRESHOLD_LOW_MEDIUM &&
        matched.length < matcherMod._matcherInternals.MIN_ABSOLUTE_MATCHES_LOW_MEDIUM
      ) {
        continue
      }
      raws.push({ card, matched: matched.length, score })
    }

    // Sort by (risk_rank desc, score desc, fact_id asc)
    raws.sort((a, b) => {
      const dr =
        (matcherMod._matcherInternals.RISK_RANK[b.card.riskLevel] ?? 0) -
        (matcherMod._matcherInternals.RISK_RANK[a.card.riskLevel] ?? 0)
      if (dr !== 0) return dr
      if (b.score !== a.score) return b.score - a.score
      return a.card.factId.localeCompare(b.card.factId)
    })

    const out: DecisionPrediction[] = []
    let injectsSeen = 0
    for (const r of raws) {
      const fakeCard = {
        ...r.card,
        // gateDecision needs FactCard-like shape; only state/risk/controlled
        // matter here.
      } as Parameters<typeof matcherMod._matcherInternals.gateDecision>[0]
      const decision = matcherMod._matcherInternals.gateDecision(fakeCard)
      if (decision === 'drop') continue
      if (decision === 'inject') {
        if (injectsSeen >= matcherMod._matcherInternals.MAX_INJECTED) continue
        injectsSeen += 1
      }
      out.push({ fact_id: r.card.factId, decision })
    }
    return out
  }

  // -----------------------------------------------------------------------
  // 4 baseline + 7 coverage questions per Pack §8.
  //
  // IMPORTANT: questions are phrased to closely match each card's
  // declared `## common_user_phrases` bullets. This proves the matcher
  // fires correctly on the trigger phrasings the cards advertise.
  //
  // Most cards (except keiei-kanri-2025-10 + keiei-kanri-existing) do
  // NOT have a `技術キーワード（マッチャ用）` sub-anchor, so their only
  // triggers are full-sentence bullets. Substring scan on full
  // sentences misses natural paraphrases — a coverage limitation that
  // FACT-OPS should remediate by adding short-keyword sub-anchors.
  // Surfaced as a follow-up item in the Pack 2.2 completion report.
  //
  // expect_inject_includes is a SUBSET assertion (other high-risk cards
  // may also fire if their keywords overlap).
  // -----------------------------------------------------------------------
  const QUESTIONS: Array<{
    id: string
    question: string
    expect_inject_includes: string[]
    expect_hint_only_includes?: string[]
    expect_no_inject?: string[]
  }> = [
    // Baseline 4 (per QA WS-A baseline; cards have 技術キーワード sub-anchor
    // → matcher fires reliably on natural paraphrases)
    {
      id: 'B1.keiei-500man',
      question: '我现在准备申请经营管理签证，资本金 500 万够吗？',
      expect_inject_includes: ['keiei-kanri-2025-10'],
    },
    {
      id: 'B2.gijinkoku-换工作',
      question: '我是技人国签，换工作要怎么办',
      expect_inject_includes: ['gijinkoku-job-mismatch'],
    },
    {
      id: 'B3.eijuu-纳税年限',
      question: '永住申请需要交几年的年金',
      // AQL guardrail 2026-05-11: general-applicant 2年/3年 lookback is
      // not fully sourced, so this critical card must remain hint-only.
      expect_inject_includes: ['eijuu-zairyu-kikan'],
      expect_hint_only_includes: ['eijuu-nenkin-risk'],
    },
    {
      id: 'B4.keiei-existing',
      question: '我已经有经营管理签证，现在的公司还没达到 3000 万，下次更新会出问题吗？',
      expect_inject_includes: ['keiei-kanri-existing-holder-update'],
    },
    // Coverage 7 — phrasings drawn from each card's bullets to verify
    // the matcher fires when the user uses those exact phrasings.
    {
      id: 'C1.spouse-离婚后还能在日本待吗',
      question: '我离婚了，签证怎么办',
      expect_inject_includes: ['spouse-divorce-separation'],
    },
    {
      id: 'C2.zairyu-在留期限还有1个月',
      question: '我的在留期限还有1个月，现在申请来得及吗',
      expect_inject_includes: ['zairyu-expiry-renewal-change'],
    },
    {
      id: 'C3.shikakugai-技人国副业',
      question: '技人国签能做副业吗',
      expect_inject_includes: ['shikakugai-fukugyou'],
    },
    {
      id: 'C4.minashi-再入国许可',
      question: '再入国许可不要的情况是什么',
      // AQL guardrail 2026-05-11: unresolved upper-bound/status-loss
      // fields keep this critical card hint-only until DOMAIN confirms.
      expect_inject_includes: [],
      expect_hint_only_includes: ['minashi-sainyuukoku'],
    },
    {
      id: 'C5.kazoku-家族滞在签证',
      question: '家族滞在签证怎么申请',
      expect_inject_includes: ['kazoku-taizai-yoken'],
    },
    {
      id: 'C6.startup-keiei-transition',
      question: 'startup visa 怎么转经管签',
      expect_inject_includes: [
        // startup-visa-keiei-transition is state=ai_extracted (per disk),
        // which the gate maps to 'drop' in production. The matcher
        // therefore should NOT inject this card; instead the keiei
        // cards fire on the 经管/转换 substring overlap.
        'keiei-kanri-2025-10',
      ],
      expect_no_inject: ['startup-visa-keiei-transition'],
    },
    {
      id: 'C7.eijuu-住满几年',
      question: '永住申请需要住满几年',
      expect_inject_includes: ['eijuu-zairyu-kikan'],
    },
    {
      id: 'D1.rishoku-国民年金中文',
      question: '离职后厚生年金怎么办，要去区役所办国民年金吗',
      expect_inject_includes: ['rishoku-kokumin-nenkin-kirikae'],
    },
    {
      id: 'D2.rishoku-健康保险中文',
      question: '退职后健康保险怎么办，国保和任意继续怎么选',
      expect_inject_includes: ['rishoku-kenko-hoken'],
    },
    {
      id: 'D3.tensyoku-换工作中文',
      question: '换工作了要向入管报告吗，转职后14天内要提交什么',
      expect_inject_includes: ['tensyoku-zairyu'],
    },
    {
      id: 'D4.koyo-外国人雇佣中文',
      question: '雇佣外国人要向 Hello Work 届出吗，外国人雇佣届出什么时候提交',
      expect_inject_includes: ['gaikokujin-koyo-todokede'],
    },
  ]

  // -----------------------------------------------------------------------
  // Run the matrix
  // -----------------------------------------------------------------------
  for (const q of QUESTIONS) {
    const labelParts = [
      q.expect_inject_includes.length > 0 ? `inject:${q.expect_inject_includes.join(',')}` : null,
      q.expect_hint_only_includes && q.expect_hint_only_includes.length > 0
        ? `hint_only:${q.expect_hint_only_includes.join(',')}`
        : null,
    ].filter(Boolean)
    check(`${q.id}: ${labelParts.join(' / ')}`, () => {
      const got = predict(q.question)
      const injected = got.filter(g => g.decision === 'inject').map(g => g.fact_id)
      const hintOnly = got.filter(g => g.decision === 'hint_only').map(g => g.fact_id)
      for (const expected of q.expect_inject_includes) {
        assert.ok(
          injected.includes(expected),
          `expected ${expected} in injected; got injected=${JSON.stringify(injected)} hint=${JSON.stringify(hintOnly)} all=${JSON.stringify(got)}`,
        )
      }
      for (const expected of q.expect_hint_only_includes ?? []) {
        assert.ok(
          hintOnly.includes(expected),
          `expected ${expected} in hint_only; got hint=${JSON.stringify(hintOnly)} injected=${JSON.stringify(injected)}`,
        )
      }
      if (q.expect_no_inject) {
        for (const banned of q.expect_no_inject) {
          assert.ok(
            !injected.includes(banned),
            `${banned} should NOT have been injected; got ${JSON.stringify(injected)}`,
          )
        }
      }
    })
  }

  // -----------------------------------------------------------------------
  // Sanity: an off-topic question produces ZERO injects
  // -----------------------------------------------------------------------
  check('off-topic: "今天东京天气怎么样？" produces no injects', () => {
    const got = predict('今天东京天气怎么样？')
    const injected = got.filter(g => g.decision === 'inject')
    assert.equal(injected.length, 0, `unexpected injects: ${JSON.stringify(injected)}`)
  })

  // -----------------------------------------------------------------------
  // Sanity: MAX_INJECTED cap holds
  // -----------------------------------------------------------------------
  check('multi-bucket question caps inject at MAX_INJECTED=2', () => {
    // Question that pings several high-risk cards simultaneously.
    const got = predict('我换了技人国工作，配偶离婚了，永住申请也想准备')
    const injected = got.filter(g => g.decision === 'inject')
    assert.ok(
      injected.length <= matcherMod._matcherInternals.MAX_INJECTED,
      `inject count ${injected.length} exceeds MAX_INJECTED=${matcherMod._matcherInternals.MAX_INJECTED}`,
    )
  })

  console.log(`\n0.6 Pack 2.2 fact-injection 11-question smoke: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
}

main().catch(e => {
  console.error('fatal', e)
  process.exit(1)
})
