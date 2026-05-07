/**
 * 0.6 Sprint Workstream D — 4-round dialogue smoke
 * (ENGINE Pack 2.3 Pack §"完成回报" "4 轮对话样例").
 *
 * DB-free / network-free walk-through of the chain semantics:
 *
 *   Round 0 (original)       — created via /api/consultation/stream
 *   Round 1 (1st follow-up)  — /api/consultation/follow-up, follow_up_count=1
 *   Round 2 (2nd follow-up)  — /api/consultation/follow-up, follow_up_count=2
 *   Round 3 (3rd follow-up)  — /api/consultation/follow-up, follow_up_count=3
 *   Round 4 (4th attempt)    — REJECTED with follow_up_limit_reached
 *
 * For each ALLOWED round we walk the summary builder with a stubbed
 * fetch that returns the canonical post-LLM digest, asserting the
 * summary evolves (known_facts grow, missing_facts shrink, last_
 * answer_key_points reflect the latest answer). The rejected round
 * is verified against the cap-check arithmetic, not the LLM.
 *
 * This is a SCRIPTED scenario — predicted summary text is what we
 * author here, not what production DS would produce. It exists to
 * lock the call shape, the round indexing, and the
 * follow_up_limit_reached gate. Live behavior is verified post-merge
 * by GM/QA against Vercel preview with `FACT_LAYER_ENABLED=true` +
 * a real DS API key.
 *
 * Usage: npx tsx scripts/test/test-followup-4-round-smoke.ts
 */
import { strict as assert } from 'node:assert'

async function main() {
  const summaryMod = await import('@/lib/answer/followup/summary-builder')
  const constantsMod = await import('@/lib/answer/followup/constants')

  let passes = 0
  let total = 0
  const fails: string[] = []
  async function check(name: string, fn: () => Promise<void> | void): Promise<void> {
    total += 1
    try {
      await fn()
      console.log(`PASS  ${name}`)
      passes += 1
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      console.log(`FAIL  ${name}\n  └ ${msg}`)
      fails.push(`${name}: ${msg}`)
    }
  }

  // ---------------------------------------------------------------------
  // The 4-round scripted scenario.
  //
  // User's apex goal: 永住申请 (PR application). Each round adds a
  // detail; each LLM answer addresses that detail and (per the digest
  // builder) updates the rolling structured summary.
  // ---------------------------------------------------------------------
  const rootQuestion = '我想申请永住，需要什么准备？'

  interface Round {
    label: string
    follow_up_count: number
    user_message: string
    answer_text: string
    expected_summary: {
      user_goal: string
      known_facts: string[]
      missing_facts: string[]
      last_answer_key_points: string[]
    }
  }

  const rounds: Round[] = [
    {
      label: 'Round 0 (original)',
      follow_up_count: 0,
      user_message: rootQuestion,
      answer_text:
        '永住申请的核心审查方向：' +
        '(1) 在留 10 年以上其中 5 年以上就労；' +
        '(2) 直近 5 年的厚生年金 / 国民年金 / 国保连续缴纳；' +
        '(3) 直近 5 年内的住民税 / 所得税完納証明；' +
        '(4) 出国时间不能过长。' +
        '建议先核对自己的在留年数 + 年金缴纳记录，再决定下一步。',
      expected_summary: {
        user_goal: '申请永住',
        known_facts: [],
        missing_facts: [
          '在留年数 / 就労年数',
          '直近 5 年的年金缴纳记录',
          '直近 5 年的纳税记录',
        ],
        last_answer_key_points: [
          '永住审查看 4 个核心维度（在留 / 年金 / 税金 / 出国）',
          '建议先核对在留年数 + 年金缴纳记录',
        ],
      },
    },
    {
      label: 'Round 1 (1st follow-up)',
      follow_up_count: 1,
      user_message:
        '我已经在日本工作 7 年，技人国签证，' +
        '直近 5 年厚生年金都是公司代扣，看了 nenkin.go.jp 显示无空白。',
      answer_text:
        '基于你给的信息：在留 7 年（其中就労 7 年）且厚生年金 5 年连续缴纳——' +
        '在永住硬性条件中已经满足年金 + 在留年数维度。' +
        '剩余需要核对：直近 5 年的住民税完納证明（市役所开），' +
        '以及直近 1 年的出国天数（建议 90 日以内为安全）。',
      expected_summary: {
        user_goal: '申请永住',
        known_facts: [
          '在留 7 年，技人国签证',
          '直近 5 年厚生年金 nenkin.go.jp 显示无空白',
        ],
        missing_facts: [
          '直近 5 年住民税完納证明',
          '直近 1 年出国天数',
        ],
        last_answer_key_points: [
          '年金 + 在留年数维度已经满足',
          '下一步核对住民税 + 出国天数',
        ],
      },
    },
    {
      label: 'Round 2 (2nd follow-up)',
      follow_up_count: 2,
      user_message:
        '住民税我已经请市役所开了完納证明，' +
        '直近 5 年都是 0 滞纳。出国天数去年是 35 天去中国探亲。',
      answer_text:
        '住民税 + 出国天数都在永住安全范围内。' +
        '现在你的核心硬条件全部满足；下一步建议：' +
        '(1) 整理在留資格認定証明書 / 雇用証明 / 在职证明；' +
        '(2) 准备身元保証書（公司或永住者亲属）；' +
        '(3) 写理由書，自评准备充分后正式申请。',
      expected_summary: {
        user_goal: '申请永住',
        known_facts: [
          '在留 7 年，技人国签证',
          '直近 5 年厚生年金 0 空白',
          '直近 5 年住民税 0 滞纳',
          '直近 1 年出国 35 天',
        ],
        missing_facts: [
          '雇用 / 在職証明书',
          '身元保証人候选',
          '理由书',
        ],
        last_answer_key_points: [
          '硬性条件全部满足',
          '剩余是在职证明 + 身元保証 + 理由书',
        ],
      },
    },
    {
      label: 'Round 3 (3rd follow-up — last allowed)',
      follow_up_count: 3,
      user_message:
        '雇用证明公司可以开，' +
        '身元保証人想找永住的同事，理由书需要提哪些重点？',
      answer_text:
        '理由书的核心是连接「来日动机 → 现在的稳定就労 → 未来定住意愿」。' +
        '建议明确写出：' +
        '(1) 来日初衷与现职业的连贯性；' +
        '(2) 7 年间在日本的家庭 / 生活根扎实情况；' +
        '(3) 长期纳税 + 社保贡献的事实；' +
        '(4) 未来 10 年的生活规划。' +
        '建议写完后请行政書士 review 一次再提交。',
      expected_summary: {
        user_goal: '申请永住',
        known_facts: [
          '在留 7 年，技人国签证',
          '直近 5 年年金 / 住民税 / 出国均合规',
          '雇用证明可以由公司开',
          '身元保証人候选：永住同事',
        ],
        missing_facts: ['理由书定稿'],
        last_answer_key_points: [
          '理由书 4 个核心叙述维度',
          '提交前建议行政書士 review',
        ],
      },
    },
  ]

  // ---------------------------------------------------------------------
  // For each allowed round, drive the summary builder with a stub
  // fetch that returns expected_summary as the LLM's JSON response,
  // and assert the builder coerces it correctly + supplies prior
  // summary into the user message body when present.
  // ---------------------------------------------------------------------
  let priorSummary: import('@/lib/consultation/stream-protocol').ConsultationSummary | null = null
  for (const round of rounds) {
    await check(`${round.label}: summary builder accepts JSON response and coerces`, async () => {
      const stubFetch = (async (_url: string, init: RequestInit | undefined) => {
        // Echo-test: confirm the LLM call ALSO carries the prior
        // summary inside the user-message body, NOT as raw history.
        const body = init?.body as string
        if (priorSummary && round.follow_up_count > 0) {
          assert.ok(
            body.includes('上一轮已有的结构化摘要'),
            `${round.label}: builder did not include prior summary in body`,
          )
          assert.ok(
            body.includes(priorSummary.user_goal),
            `${round.label}: builder dropped prior user_goal`,
          )
        }
        // Round 0 must NOT carry a prior summary block.
        if (round.follow_up_count === 0) {
          assert.ok(
            !body.includes('上一轮已有的结构化摘要'),
            'Round 0: builder should not include prior summary block',
          )
        }
        return new Response(JSON.stringify({
          choices: [{ message: { content: JSON.stringify(round.expected_summary) } }],
        }), { status: 200, headers: { 'content-type': 'application/json' } })
      }) as unknown as typeof fetch

      const result = await summaryMod.buildConsultationSummary({
        rootQuestion,
        userMessage: round.user_message,
        answerText: round.answer_text,
        priorSummary,
        roundIndex: round.follow_up_count,
      }, { apiKey: 'fake', fetchImpl: stubFetch })

      assert.equal(result.fallback_reason, undefined,
        `${round.label}: unexpected fallback ${result.fallback_reason}`)
      assert.ok(result.summary !== null, `${round.label}: summary is null`)
      assert.equal(result.summary!.user_goal, round.expected_summary.user_goal)
      assert.deepEqual(result.summary!.known_facts, round.expected_summary.known_facts)
      assert.deepEqual(result.summary!.last_answer_key_points, round.expected_summary.last_answer_key_points)

      // Roll forward into the next round.
      priorSummary = result.summary
    })
  }

  // ---------------------------------------------------------------------
  // Round 4 (the 4th follow-up attempt) — verify cap arithmetic.
  // ---------------------------------------------------------------------
  await check('Round 4: 4th follow-up attempt > MAX_FOLLOW_UP_ROUNDS → reject', () => {
    // Simulating the route's check: `newFollowUpCount = parent.followUpCount + 1`.
    // Parent here is round 3 (followUpCount=3), so the candidate would be 4.
    const parentFollowUpCount = 3
    const newFollowUpCount = parentFollowUpCount + 1
    assert.equal(newFollowUpCount, 4)
    assert.ok(
      newFollowUpCount > constantsMod.MAX_FOLLOW_UP_ROUNDS,
      `expected ${newFollowUpCount} > ${constantsMod.MAX_FOLLOW_UP_ROUNDS}`,
    )
  })
  await check('Round 4 limit message matches Pack §4 canonical', () => {
    // The route emits FOLLOW_UP_LIMIT_MESSAGE on this branch.
    assert.equal(
      constantsMod.FOLLOW_UP_LIMIT_MESSAGE,
      '这个问题已经包含多轮补充，建议保存咨询、整理材料后再继续，或考虑人工确认。',
    )
  })

  // ---------------------------------------------------------------------
  // Cross-cutting invariants: summary growth properties
  // ---------------------------------------------------------------------
  await check('Across rounds 0→3: known_facts grows monotonically', () => {
    let prev = 0
    for (const r of rounds) {
      const cur = r.expected_summary.known_facts.length
      assert.ok(cur >= prev, `${r.label}: known_facts shrunk (${prev} → ${cur})`)
      prev = cur
    }
  })
  await check('Across rounds 0→3: missing_facts shrinks (or stays same) by round 3', () => {
    const round0 = rounds[0].expected_summary.missing_facts.length
    const round3 = rounds[3].expected_summary.missing_facts.length
    assert.ok(round3 < round0, `expected missing_facts to shrink: ${round0} → ${round3}`)
  })
  await check('All rounds: user_goal stays stable', () => {
    const goal0 = rounds[0].expected_summary.user_goal
    for (const r of rounds) {
      assert.equal(r.expected_summary.user_goal, goal0,
        `${r.label}: user_goal drifted from "${goal0}" to "${r.expected_summary.user_goal}"`)
    }
  })

  console.log(`\n0.6 Pack 2.3 follow-up 4-round smoke: ${passes}/${total} pass`)

  // Print the dialogue evolution for the PR description / GM report.
  console.log('\n=== 4-Round Dialogue Evolution ===\n')
  let evol: import('@/lib/consultation/stream-protocol').ConsultationSummary | null = null
  for (const r of rounds) {
    console.log(`---- ${r.label} (follow_up_count=${r.follow_up_count}) ----`)
    console.log(`USER: ${r.user_message}`)
    console.log(`AI:   ${r.answer_text}`)
    console.log(`SUMMARY (post-round):`)
    console.log(`  user_goal: ${r.expected_summary.user_goal}`)
    console.log(`  known_facts (${r.expected_summary.known_facts.length}):`)
    for (const f of r.expected_summary.known_facts) console.log(`    · ${f}`)
    console.log(`  missing_facts (${r.expected_summary.missing_facts.length}):`)
    for (const f of r.expected_summary.missing_facts) console.log(`    · ${f}`)
    console.log(`  last_answer_key_points (${r.expected_summary.last_answer_key_points.length}):`)
    for (const f of r.expected_summary.last_answer_key_points) console.log(`    · ${f}`)
    console.log('')
    evol = r.expected_summary
  }
  void evol
  console.log('---- Round 4 attempt ----')
  console.log(`HTTP 200 + SSE: { event: 'follow_up_limit_reached', message: "${constantsMod.FOLLOW_UP_LIMIT_MESSAGE}", follow_up_count: 3 }`)
  console.log(`               → no DB row created, no LLM call, paired with synthetic 'completed' for clean stream close.`)

  if (fails.length > 0) {
    console.log('\nFailures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
}

main().catch(e => {
  console.error('fatal', e)
  process.exit(1)
})
