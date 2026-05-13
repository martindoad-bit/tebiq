#!/usr/bin/env tsx
/**
 * Legal Source Engineering — Shadow A/B retrieval probe.
 *
 * This script compares:
 *   A. production-visible fact cards (`ai_verified`, `human_reviewed`, `needs_review`)
 *   B. dry-run candidate set, including `ai_extracted` legal-source cards
 *
 * It does not promote cards and it does not inject `ai_extracted` facts into
 * answers. The goal is to identify whether the new legal-source layer produces
 * retrieval signal strong enough to justify answer-level A/B testing.
 *
 * Usage:
 *   npx tsx scripts/eval/legal-source-shadow-ab.ts
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'

type GateDecision = 'inject' | 'hint_only' | 'drop'
type Priority = 'P0' | 'P1' | 'P2'

interface EvalQuestion {
  id: string
  priority: Priority
  family: string
  question: string
  expectedCandidateIds: string[]
  why: string
}

interface MatchLite {
  fact_id: string
  title: string
  matched_keywords: string[]
  score: number
  state: string
  risk_level: string
  decision: GateDecision
  sprint?: string
}

interface EvalRow {
  id: string
  priority: Priority
  family: string
  question: string
  expectedCandidateIds: string[]
  productionMatches: MatchLite[]
  dryRunMatches: MatchLite[]
  expectedHitIds: string[]
  candidateOnlyIds: string[]
  status: 'candidate_gain' | 'production_already_visible' | 'miss'
  needsAnswerAB: boolean
}

const QUESTIONS: EvalQuestion[] = [
  {
    id: 'LS-001',
    priority: 'P0',
    family: '特定技能',
    question: '特定技能 换公司 只要14天届出',
    expectedCandidateIds: ['ssw-organization-change-requires-status-change-source'],
    why: '换公司不是只有所属机构届出，通常涉及在留资格変更许可。'
  },
  {
    id: 'LS-002',
    priority: 'P0',
    family: '特定技能',
    question: '特定技能1号 配偶孩子 家族滞在',
    expectedCandidateIds: ['ssw1-family-stay-not-sponsor-source'],
    why: '特定技能1号与家族滞在扶养范围边界。'
  },
  {
    id: 'LS-003',
    priority: 'P1',
    family: '特定技能',
    question: '特定技能2号 家族滞在',
    expectedCandidateIds: ['ssw2-family-stay-sponsor-dependent-scope-source'],
    why: '特定技能2号与特定技能1号的家属带同差异。'
  },
  {
    id: 'LS-004',
    priority: 'P0',
    family: '特定技能',
    question: '特定技能 契約終了 受入れ困難 届出',
    expectedCandidateIds: ['ssw-employment-contract-end-acceptance-difficulty-boundary-source'],
    why: '雇用契约结束是否同时触发受入困難届出。'
  },
  {
    id: 'LS-005',
    priority: 'P1',
    family: '特定技能',
    question: '特定技能 1か月以上 活動できない 届出',
    expectedCandidateIds: ['ssw-acceptance-difficulty-one-month-inactivity-source'],
    why: '长期无法活动的届出触发条件。'
  },
  {
    id: 'LS-006',
    priority: 'P1',
    family: '特定技能',
    question: '特定技能 行方不明 届出',
    expectedCandidateIds: ['ssw-acceptance-difficulty-missing-person-source'],
    why: '失踪场景对受入机构的届出义务。'
  },
  {
    id: 'LS-007',
    priority: 'P1',
    family: '特定技能',
    question: '特定技能 支援 全部委託 定期届出',
    expectedCandidateIds: ['ssw-outsourced-support-periodic-report-via-host-source'],
    why: '注册支援机构全委托后，定期届出的提交主体。'
  },
  {
    id: 'LS-008',
    priority: 'P1',
    family: '特定技能',
    question: '登録支援機関 更新 間に合わない 支援できる',
    expectedCandidateIds: ['ssw-rso-renewal-lapse-no-support-source'],
    why: '注册支援机构更新失效后的支援能力边界。'
  },
  {
    id: 'LS-009',
    priority: 'P2',
    family: '特定技能',
    question: '特定技能 支援計画 変更 届出 14日',
    expectedCandidateIds: ['ssw-support-plan-change-notification-14day-source'],
    why: '支援计划变更随时届出。'
  },
  {
    id: 'LS-010',
    priority: 'P2',
    family: '特定技能',
    question: '特定技能 定期届出 年1回',
    expectedCandidateIds: ['ssw-periodic-notification-integrated-annual-form-source'],
    why: '定期届出频率变更后用户容易按旧认知回答。'
  },
  {
    id: 'LS-011',
    priority: 'P0',
    family: '永住',
    question: '永住申請 更新 違い',
    expectedCandidateIds: ['permanent-residence-permission-separate-from-renewal'],
    why: '永住许可申请不是当前在留资格更新。'
  },
  {
    id: 'LS-012',
    priority: 'P0',
    family: '永住',
    question: '永住申請中 更新 必要',
    expectedCandidateIds: ['permanent-application-does-not-extend-current-status'],
    why: '永住申请不自动延长当前在留资格。'
  },
  {
    id: 'LS-013',
    priority: 'P0',
    family: '永住',
    question: '永住 材料齐了 一定能过',
    expectedCandidateIds: ['permanent-residence-materials-vs-eligibility-boundary'],
    why: '材料清单和许可要件不是同一件事。'
  },
  {
    id: 'LS-014',
    priority: 'P1',
    family: '永住',
    question: '永住 年金 2年',
    expectedCandidateIds: ['permanent-residence-pension-two-year-record-materials'],
    why: '年金材料范围与证明方式。'
  },
  {
    id: 'LS-015',
    priority: 'P1',
    family: '永住',
    question: '永住 年金免除',
    expectedCandidateIds: ['permanent-residence-public-obligation-exemption-deferment-gap'],
    why: '年金免除/猶予是高风险解释缺口，不能简单说没事。'
  },
  {
    id: 'LS-016',
    priority: 'P1',
    family: '永住',
    question: '永住 国税 納税証明書 その3',
    expectedCandidateIds: ['permanent-residence-national-tax-certificate-materials'],
    why: '永住申请国税证明材料。'
  },
  {
    id: 'LS-017',
    priority: 'P1',
    family: '永住',
    question: '永住 了解書 必要',
    expectedCandidateIds: ['permanent-residence-understanding-letter-required'],
    why: '永住了解书是材料层新增/易漏项。'
  },
  {
    id: 'LS-018',
    priority: 'P1',
    family: '永住',
    question: '高度専門職 永住 80点 1年',
    expectedCandidateIds: ['highly-skilled-permanent-residence-70-80-year-router'],
    why: '高度人才永住年限例外入口。'
  },
  {
    id: 'LS-019',
    priority: 'P0',
    family: '更新/变更',
    question: '特例期间 是什么',
    expectedCandidateIds: ['special-period-renewal-change-applies'],
    why: '更新/变更申请中的特例期间。'
  },
  {
    id: 'LS-020',
    priority: 'P0',
    family: '更新/变更',
    question: '变更申请中 能先上班吗',
    expectedCandidateIds: ['change-approval-before-new-activity-guardrail'],
    why: '变更未许可前不能把申请等同许可。'
  },
  {
    id: 'LS-021',
    priority: 'P1',
    family: '更新/变更',
    question: '特例期间 以前の資格 活動',
    expectedCandidateIds: ['special-period-previous-status-activity-only'],
    why: '特例期间可继续的是原在留资格活动，不是新活动。'
  },
  {
    id: 'LS-022',
    priority: 'P1',
    family: '更新/变更',
    question: '更新申请 3ヶ月前',
    expectedCandidateIds: ['residence-renewal-application-window'],
    why: '更新申请窗口。'
  },
  {
    id: 'LS-023',
    priority: 'P1',
    family: '更新/变更',
    question: '変更申請 いつから',
    expectedCandidateIds: ['residence-change-application-window'],
    why: '在留资格变更申请窗口。'
  },
  {
    id: 'LS-024',
    priority: 'P0',
    family: '届出',
    question: '出生后30天内申请',
    expectedCandidateIds: ['status-acquisition-30-day-application-window'],
    why: '日本出生等取得在留资格申请期限。'
  },
  {
    id: 'LS-025',
    priority: 'P1',
    family: '届出',
    question: '小孩出生 60天 日本 国籍',
    expectedCandidateIds: ['status-acquisition-over-60-days-trigger'],
    why: '出生后超过60天滞留触发在留资格取得问题。'
  },
  {
    id: 'LS-026',
    priority: 'P1',
    family: '届出',
    question: '离婚 14天 届出',
    expectedCandidateIds: ['spouse-notification-divorce-death-fourteen-day'],
    why: '配偶者身份关系变化届出。'
  },
  {
    id: 'LS-027',
    priority: 'P1',
    family: '届出',
    question: '换工作 14天届出 等于变更许可吗',
    expectedCandidateIds: ['guard-shozoku-notification-does-not-replace-status-change'],
    why: '所属机构届出不能替代在留资格变更。'
  },
  {
    id: 'LS-028',
    priority: 'P1',
    family: '再入国',
    question: 'みなし再入国 海外で延長',
    expectedCandidateIds: ['special-reentry-no-overseas-extension'],
    why: '特别再入国许可不能在海外延长。'
  },
  {
    id: 'LS-029',
    priority: 'P1',
    family: '再入国',
    question: 'みなし再入国 1年 在留期限',
    expectedCandidateIds: ['special-reentry-one-year-or-status-expiry'],
    why: '特别再入国期限与在留期限较短者。'
  },
  {
    id: 'LS-030',
    priority: 'P1',
    family: '取消/稳定性',
    question: '日配 离婚 会马上失效吗',
    expectedCandidateIds: ['residence-cancellation-spouse-status-six-months'],
    why: '离婚后并非马上失效，但有取消风险。'
  },
  {
    id: 'LS-031',
    priority: 'P1',
    family: '取消/稳定性',
    question: '技人国 失业 会马上取消吗',
    expectedCandidateIds: ['job-loss-cancellation-not-automatic-router'],
    why: '失业不等于立即取消，但有活动不持续风险。'
  },
  {
    id: 'LS-032',
    priority: 'P1',
    family: '取消/稳定性',
    question: '在留資格取消 意見聴取',
    expectedCandidateIds: ['residence-cancellation-opinion-hearing-rights'],
    why: '取消程序不是自动执行，有意见听取程序。'
  },
  {
    id: 'LS-033',
    priority: 'P1',
    family: '取消/稳定性',
    question: '虚假资料入国 在留取消',
    expectedCandidateIds: ['residence-cancellation-fraud-false-application-entry'],
    why: '虚假资料与在留资格取消边界。'
  },
  {
    id: 'LS-034',
    priority: 'P0',
    family: '经营管理',
    question: '经营管理 没有营业',
    expectedCandidateIds: ['business-manager-activity-stop-risk-router'],
    why: '经管活动停止/休眠的高风险识别。'
  },
  {
    id: 'LS-035',
    priority: 'P1',
    family: '经营管理',
    question: '経営管理 事業停止 ビザ',
    expectedCandidateIds: ['business-manager-activity-stop-risk-router'],
    why: '经管活动持续性与取消/更新风险。'
  },
  {
    id: 'LS-036',
    priority: 'P1',
    family: '经营管理',
    question: '经营管理 法律会计业务',
    expectedCandidateIds: ['business-manager-excludes-legal-accounting-qualified-business'],
    why: '经营管理活动范围排除法律会计等资格业务。'
  },
  {
    id: 'LS-037',
    priority: 'P0',
    family: '高度人才',
    question: '高度人材 转职 14天',
    expectedCandidateIds: ['guard-hsp1-institution-change-not-14day-only'],
    why: '高度1号转职不是只做14天届出。'
  },
  {
    id: 'LS-038',
    priority: 'P1',
    family: '高度人才',
    question: 'J-Skip 転職 14日',
    expectedCandidateIds: ['guard-hsp1-institution-change-not-14day-only'],
    why: 'J-Skip/高度1号机构变更边界。'
  },
  {
    id: 'LS-039',
    priority: 'P1',
    family: '高度人才',
    question: 'J-Skip 经理 经营管理 3000万',
    expectedCandidateIds: ['guard-jskip-manager-not-business-manager-3000man'],
    why: '高度人才经营管理型与经管签新门槛的混淆。'
  },
  {
    id: 'LS-040',
    priority: 'P1',
    family: '技人国',
    question: '技人国专业不一致',
    expectedCandidateIds: ['gijinkoku-background-relevance-required'],
    why: '技人国学历/经历与业务相关性。'
  },
  {
    id: 'LS-041',
    priority: 'P1',
    family: '技人国',
    question: '人文签销售',
    expectedCandidateIds: ['gijinkoku-job-mismatch'],
    why: '职位名不能替代实际业务内容判断。'
  },
  {
    id: 'LS-042',
    priority: 'P2',
    family: '留学/变更',
    question: '留学转工作 审查中 上班',
    expectedCandidateIds: ['change-approval-before-new-activity-guardrail'],
    why: '留学转工作未许可前的活动边界。'
  },
]

async function main() {
  const syncMod = await import('@/scripts/fact-layer-sync')
  const matcherMod = await import('@/lib/answer/fact-layer/matcher')
  const normalize = syncMod._internals.normalize
  const matcherInternals = matcherMod._matcherInternals

  const factCardsDir = join(process.cwd(), 'docs/fact-cards')
  const files = readdirSync(factCardsDir).filter(
    f => f.endsWith('.md') && f !== 'README.md' && f !== 'FACT_OPS_WINDOW_TASK_PACK.md',
  )
  const cards = files.map(file => {
    const filesystemPath = join(factCardsDir, file)
    const raw = readFileSync(filesystemPath, 'utf8')
    const parsed = matter(raw)
    const card = normalize(filesystemPath, raw)
    return {
      ...card,
      sprint: typeof parsed.data.sprint === 'string' ? parsed.data.sprint : undefined,
    }
  })

  const rows: EvalRow[] = QUESTIONS.map(q => {
    const productionMatches = runMatches(q.question, false, cards, matcherInternals)
    const dryRunMatches = runMatches(q.question, true, cards, matcherInternals)
    const productionIds = new Set(productionMatches.map(m => m.fact_id))
    const expectedHitIds = q.expectedCandidateIds.filter(id => dryRunMatches.some(m => m.fact_id === id))
    const candidateOnlyIds = expectedHitIds.filter(id => !productionIds.has(id))
    const status: EvalRow['status'] =
      candidateOnlyIds.length > 0
        ? 'candidate_gain'
        : expectedHitIds.length > 0
          ? 'production_already_visible'
          : 'miss'

    return {
      id: q.id,
      priority: q.priority,
      family: q.family,
      question: q.question,
      expectedCandidateIds: q.expectedCandidateIds,
      productionMatches,
      dryRunMatches,
      expectedHitIds,
      candidateOnlyIds,
      status,
      needsAnswerAB: status === 'candidate_gain' && q.priority !== 'P2',
    }
  })

  const report = renderMarkdownReport(rows, cards.length)
  const json = JSON.stringify({
    generatedAt: new Date().toISOString(),
    mode: 'retrieval_shadow_ab',
    productionStates: Array.from(matcherInternals.PRODUCTION_CANDIDATE_STATES),
    dryRunStates: Array.from(matcherInternals.DRY_RUN_CANDIDATE_STATES),
    cardCount: cards.length,
    rows,
  }, null, 2)

  const outDir = join(process.cwd(), 'docs/eval')
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true })
  const mdPath = join(outDir, 'LEGAL_SOURCE_SHADOW_AB_ROUND1.md')
  const jsonPath = join(outDir, 'legal-source-shadow-ab-round1-results.json')
  writeFileSync(mdPath, report)
  writeFileSync(jsonPath, `${json}\n`)

  const totals = summarize(rows)
  console.log(`legal-source-shadow-ab: questions=${rows.length} cards=${cards.length}`)
  console.log(
    `candidate_gain=${totals.candidateGain} production_visible=${totals.productionVisible} miss=${totals.miss} answer_ab=${totals.answerAB}`,
  )
  console.log(`wrote ${mdPath}`)
  console.log(`wrote ${jsonPath}`)
}

function runMatches(
  question: string,
  includeDryRunStates: boolean,
  cards: any[],
  matcherInternals: any,
): MatchLite[] {
  const haystackLower = question.toLowerCase()
  const allowedStates = new Set<string>(
    includeDryRunStates
      ? Array.from(matcherInternals.DRY_RUN_CANDIDATE_STATES)
      : Array.from(matcherInternals.PRODUCTION_CANDIDATE_STATES),
  )
  const rawMatches: Array<{ card: any; matchedKeywords: string[]; score: number }> = []
  for (const card of cards) {
    if (!allowedStates.has(card.state)) continue
    const raw = matcherInternals.scoreCardAgainst(card, haystackLower)
    if (raw) rawMatches.push(raw)
  }

  rawMatches.sort((a, b) => {
    const riskDelta =
      (matcherInternals.RISK_RANK[b.card.riskLevel] ?? 0) -
      (matcherInternals.RISK_RANK[a.card.riskLevel] ?? 0)
    if (riskDelta !== 0) return riskDelta
    if (b.score !== a.score) return b.score - a.score
    return a.card.factId.localeCompare(b.card.factId)
  })

  const out: MatchLite[] = []
  let injectsSeen = 0
  for (const raw of rawMatches) {
    const decision = matcherInternals.gateDecision(raw.card)
    if (decision === 'drop' && !includeDryRunStates) continue
    if (decision === 'inject') {
      if (injectsSeen >= matcherInternals.MAX_INJECTED) continue
      injectsSeen += 1
    }
    out.push({
      fact_id: raw.card.factId,
      title: raw.card.title,
      matched_keywords: raw.matchedKeywords,
      score: Number(raw.score.toFixed(4)),
      state: raw.card.state,
      risk_level: raw.card.riskLevel,
      decision,
      sprint: raw.card.sprint,
    })
  }
  return out
}

function renderMarkdownReport(rows: EvalRow[], cardCount: number): string {
  const totals = summarize(rows)
  const byFamily = groupBy(rows, row => row.family)
  const abRows = rows.filter(row => row.needsAnswerAB)
  const misses = rows.filter(row => row.status === 'miss')

  const lines: string[] = []
  lines.push('# Legal Source Engineering — Shadow A/B Round 1')
  lines.push('')
  lines.push(`Generated: ${new Date().toISOString()}`)
  lines.push(`Fact cards scanned from disk: ${cardCount}`)
  lines.push('')
  lines.push('## Scope')
  lines.push('')
  lines.push('- A 组：生产可见状态 `ai_verified` / `human_reviewed` / `needs_review`。')
  lines.push('- B 组：dry-run 候选状态，在 A 组基础上加入 `ai_extracted`。')
  lines.push('- 本轮只测检索命中，不提升卡片状态，不把 `ai_extracted` 注入生产答案。')
  lines.push('- 目标：找出“新增法源层让哪些问题多看见了关键卡”，再交给 AQL 做答案层对比。')
  lines.push('')
  lines.push('## Result')
  lines.push('')
  lines.push(`- 测试问题：${rows.length}`)
  lines.push(`- B 组新增候选命中：${totals.candidateGain}`)
  lines.push(`- A 组已可见命中：${totals.productionVisible}`)
  lines.push(`- 预期卡未命中：${totals.miss}`)
  lines.push(`- 建议进入答案 A/B 的问题：${totals.answerAB}`)
  lines.push('')
  lines.push('## Interpretation')
  lines.push('')
  lines.push('- 第一轮有明确检索增益：多数高风险问题在 B 组能看到更贴近的法源卡。')
  lines.push('- 这还不是“答案已改善”的证明；它证明的是新法源层值得进入答案层 A/B。')
  lines.push('- Miss 不直接等于卡片无用，优先当成 matcher/trigger 质量清单处理。')
  lines.push('- AQL 下一步只需要跑 `AQL Answer A/B Queue` 中的题，不必把 42 题全量跑完。')
  lines.push('')
  lines.push('## By Family')
  lines.push('')
  lines.push('| Family | Questions | Candidate gain | Production visible | Miss |')
  lines.push('|---|---:|---:|---:|---:|')
  for (const [family, group] of byFamily) {
    const s = summarize(group)
    lines.push(`| ${family} | ${group.length} | ${s.candidateGain} | ${s.productionVisible} | ${s.miss} |`)
  }
  lines.push('')
  lines.push('## AQL Answer A/B Queue')
  lines.push('')
  lines.push('这些问题最适合下一步做答案层对比：A 组按现状答，B 组把 candidate-only 卡作为“候选法源上下文”加入，但仍标注为未审核，不作为确定事实硬注入。')
  lines.push('')
  lines.push('AQL 首轮建议优先跑 15 题：`LS-001`, `LS-002`, `LS-004`, `LS-008`, `LS-011`, `LS-012`, `LS-013`, `LS-015`, `LS-019`, `LS-020`, `LS-024`, `LS-030`, `LS-034`, `LS-037`, `LS-040`。')
  lines.push('')
  lines.push('| ID | Priority | Family | Question | Candidate-only card(s) |')
  lines.push('|---|---|---|---|---|')
  for (const row of abRows) {
    lines.push(
      `| ${row.id} | ${row.priority} | ${row.family} | ${escapePipe(row.question)} | ${row.candidateOnlyIds.map(formatCode).join('<br>')} |`,
    )
  }
  lines.push('')
  lines.push('## Misses / Matcher Gaps')
  lines.push('')
  lines.push('AQL 归因：`LS-021`, `LS-022`, `LS-023`, `LS-026`, `LS-031`, `LS-032`, `LS-041` 优先扩 trigger；`LS-018`, `LS-027`, `LS-028`, `LS-029` 先确认旧卡答案是否已覆盖；`LS-025`, `LS-033`, `LS-039` 需要 DOMAIN/FACT 补充或拆分。')
  lines.push('')
  if (misses.length === 0) {
    lines.push('- 无。')
  } else {
    lines.push('| ID | Family | Question | Expected card(s) | Top dry-run matches |')
    lines.push('|---|---|---|---|---|')
    for (const row of misses) {
      lines.push(
        `| ${row.id} | ${row.family} | ${escapePipe(row.question)} | ${row.expectedCandidateIds.map(formatCode).join('<br>')} | ${formatTopMatches(row.dryRunMatches)} |`,
      )
    }
  }
  lines.push('')
  lines.push('## Full Retrieval Rows')
  lines.push('')
  lines.push('| ID | Status | Family | Question | A: production top | B: dry-run top | Expected hit |')
  lines.push('|---|---|---|---|---|---|---|')
  for (const row of rows) {
    lines.push(
      `| ${row.id} | ${statusLabel(row.status)} | ${row.family} | ${escapePipe(row.question)} | ${formatTopMatches(row.productionMatches)} | ${formatTopMatches(row.dryRunMatches)} | ${row.expectedHitIds.map(formatCode).join('<br>') || '—'} |`,
    )
  }
  lines.push('')
  lines.push('## QA Notes')
  lines.push('')
  lines.push('- P0/P1：无。')
  lines.push('- 可复现性：脚本每次会刷新 `generatedAt`，忽略该字段后 JSON/Markdown 结果稳定。')
  lines.push('- 安全性：`ai_extracted` 在 B 组可见，但 gate decision 仍为 `drop`；本脚本不写 DB、不提升状态、不改生产注入路径。')
  lines.push('')
  lines.push('## How To Reproduce')
  lines.push('')
  lines.push('```bash')
  lines.push('npx tsx scripts/eval/legal-source-shadow-ab.ts')
  lines.push('```')
  lines.push('')
  return `${lines.join('\n')}\n`
}

function summarize(rows: EvalRow[]) {
  return {
    candidateGain: rows.filter(row => row.status === 'candidate_gain').length,
    productionVisible: rows.filter(row => row.status === 'production_already_visible').length,
    miss: rows.filter(row => row.status === 'miss').length,
    answerAB: rows.filter(row => row.needsAnswerAB).length,
  }
}

function groupBy<T>(items: T[], getKey: (item: T) => string): Array<[string, T[]]> {
  const map = new Map<string, T[]>()
  for (const item of items) {
    const key = getKey(item)
    const group = map.get(key) ?? []
    group.push(item)
    map.set(key, group)
  }
  return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b))
}

function formatTopMatches(matches: MatchLite[]): string {
  if (matches.length === 0) return '—'
  return matches
    .slice(0, 3)
    .map(match => `${formatCode(match.fact_id)} ${match.state}/${match.risk_level}/${match.decision}`)
    .join('<br>')
}

function statusLabel(status: EvalRow['status']): string {
  if (status === 'candidate_gain') return 'B新增'
  if (status === 'production_already_visible') return 'A已可见'
  return '未命中'
}

function formatCode(value: string): string {
  return `\`${value}\``
}

function escapePipe(value: string): string {
  return value.replace(/\|/g, '\\|')
}

void main().catch(error => {
  console.error(error)
  process.exit(1)
})
