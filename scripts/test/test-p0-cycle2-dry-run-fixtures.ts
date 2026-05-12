/**
 * Legal Source Engineering — P0 Cycle 2 Batch 1 dry-run fixture matrix.
 *
 * DB-free. Loads docs/fact-cards from disk through fact-layer-sync's
 * normalizer, then reuses matcher scoring/gating helpers.
 *
 * Scope:
 *   - Batch 1 landing-criteria cards must be observable in dry-run.
 *   - They must remain state=ai_extracted and decision=drop.
 *   - They must not appear in production-state prediction.
 *   - Held/duplicate candidate fact ids must not exist as top-level cards.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle2-dry-run-fixtures.ts
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

interface Fixture {
  id: string
  question: string
  expected_primary_hit: string
  expected_secondary_hits?: string[]
  expected_excluded_hits?: string[]
  severity_if_wrong: 'P0' | 'P1'
}

const CYCLE2_BATCH1_READY_IDS = new Set([
  'landing-criteria-ordinance-source-role',
  'landing-criteria-not-approval-guarantee',
  'landing-criteria-read-by-status-row',
  'gijinkoku-background-relevance-required',
  'gijinkoku-degree-or-equivalent-route',
  'gijinkoku-ten-year-experience-route',
  'gijinkoku-international-services-cultural-basis',
  'gijinkoku-international-services-three-year-experience',
  'gijinkoku-translation-interpreting-language-instruction-exception',
  'gijinkoku-remuneration-japanese-comparable',
  'gijinkoku-it-exam-qualification-exception',
])

const CYCLE2_BATCH1_HELD_OR_DUPLICATE_IDS = new Set([
  'landing-criteria-not-material-checklist',
  'gijinkoku-job-title-not-enough-simple-labor-router',
  'gijinkoku-criteria-not-side-work-answer',
])

const USER_VISIBLE_LEAK_PATTERNS = [
  /\bFACT\b/i,
  /\bDOMAIN\b/i,
  /\bAQL\b/i,
  /\bmatcher\b/i,
  /\bdry-run\b/i,
  /\bfixture\b/i,
  /\bai_extracted\b/i,
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
  /一定下签/,
  /保证许可/,
  /必过/,
]

const FIXTURES: Fixture[] = [
  {
    id: 'C2B1-001.source-role-not-checklist',
    question: '上陆基准省令是材料清单吗？上陆基准 上陸基準省令 基准省令',
    expected_primary_hit: 'landing-criteria-ordinance-source-role',
    expected_excluded_hits: ['gijinkoku-background-relevance-required'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-002.not-approval-guarantee',
    question: '符合上陆基准是不是一定能下签？一定下签 符合基准 许可概率',
    expected_primary_hit: 'landing-criteria-not-approval-guarantee',
    expected_secondary_hits: ['landing-criteria-ordinance-source-role'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-003.row-locator',
    question: '技人国的上陆基准要看哪一行？哪一行 资格对应基准 row',
    expected_primary_hit: 'landing-criteria-read-by-status-row',
    expected_secondary_hits: ['landing-criteria-ordinance-source-role'],
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B1-004.background-relevance',
    question: '文科毕业可以做人文签销售吗？文科销售 专业相关 业务内容',
    expected_primary_hit: 'gijinkoku-background-relevance-required',
    expected_secondary_hits: ['gijinkoku-degree-or-equivalent-route'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-005.major-not-exact-match',
    question: '专业和工作不完全一致，技人国一定不行吗？专业相关 学历相关 技人国专业不一致',
    expected_primary_hit: 'gijinkoku-background-relevance-required',
    expected_secondary_hits: ['gijinkoku-degree-or-equivalent-route'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-006.ten-year-route',
    question: '没有大学学历，有十年相关经验能申请技人国吗？没有学历 10年经验 实务经验',
    expected_primary_hit: 'gijinkoku-ten-year-experience-route',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-007.not-any-experience',
    question: '我只有五年相关工作经验，能按十年经验路线申请吗？10年经验 实务经验',
    expected_primary_hit: 'gijinkoku-ten-year-experience-route',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-008.international-services-cultural-basis',
    question: '国际业务是不是只要会中文就可以？国际业务 外国文化 海外业务经验',
    expected_primary_hit: 'gijinkoku-international-services-cultural-basis',
    expected_secondary_hits: ['gijinkoku-international-services-three-year-experience'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-009.international-services-three-years',
    question: '国际业务通常需要几年经验？国际业务经验 3年经验 海外业务经验',
    expected_primary_hit: 'gijinkoku-international-services-three-year-experience',
    expected_secondary_hits: ['gijinkoku-international-services-cultural-basis'],
    expected_excluded_hits: ['gijinkoku-ten-year-experience-route'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-010.translation-exception',
    question: '大学毕业做翻译，需要三年经验吗？翻译需要经验吗 大学毕业例外 语学指导',
    expected_primary_hit: 'gijinkoku-translation-interpreting-language-instruction-exception',
    expected_secondary_hits: ['gijinkoku-international-services-three-year-experience'],
    expected_excluded_hits: ['gijinkoku-ten-year-experience-route'],
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B1-011.no-broad-exception',
    question: '大学毕业做海外销售也能免三年经验吗？国际业务经验 3年经验 广报经验',
    expected_primary_hit: 'gijinkoku-international-services-three-year-experience',
    expected_secondary_hits: ['gijinkoku-international-services-cultural-basis'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-012.remuneration-comparable',
    question: '技人国工资比日本人低一点可以吗？工资 比日本人低 同等额以上',
    expected_primary_hit: 'gijinkoku-remuneration-japanese-comparable',
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-013.low-salary-later-raise',
    question: '公司说先低工资入职，更新时再涨，技人国可以吗？技人国低工资 薪资 日本人同等 能不能批',
    expected_primary_hit: 'gijinkoku-remuneration-japanese-comparable',
    expected_secondary_hits: ['landing-criteria-not-approval-guarantee'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-014.it-exam-exception',
    question: '基本情报考试能替代学历申请技人国吗？基本情报 信息处理 替代学历',
    expected_primary_hit: 'gijinkoku-it-exam-qualification-exception',
    expected_secondary_hits: ['gijinkoku-degree-or-equivalent-route'],
    expected_excluded_hits: ['gijinkoku-ten-year-experience-route'],
    severity_if_wrong: 'P1',
  },
  {
    id: 'C2B1-015.no-any-it-certificate',
    question: '民间 IT 培训证书能不能直接代替学历？IT证书 信息处理 替代学历',
    expected_primary_hit: 'gijinkoku-it-exam-qualification-exception',
    expected_secondary_hits: ['gijinkoku-degree-or-equivalent-route'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-016.job-title-not-enough',
    question: '技人国去便利店做店长可以吗？职位名 业务内容 技人国专业不一致',
    expected_primary_hit: 'gijinkoku-background-relevance-required',
    expected_excluded_hits: ['gijinkoku-degree-or-equivalent-route'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-017.side-work-not-landing-criteria',
    question: '技人国下班后接外包副业，可以用这些上陆基准判断吗？技人国副业 资格外活动许可 打工许可范围',
    expected_primary_hit: 'qualification-outside-activity-permission-framework',
    expected_secondary_hits: ['permission-scope-not-universal'],
    expected_excluded_hits: ['gijinkoku-background-relevance-required', 'gijinkoku-degree-or-equivalent-route'],
    severity_if_wrong: 'P0',
  },
  {
    id: 'C2B1-018.materials-not-guarantee',
    question: '技人国材料都准备齐了，是不是就能下签？一定下签 符合基准',
    expected_primary_hit: 'landing-criteria-not-approval-guarantee',
    expected_excluded_hits: ['gijinkoku-degree-or-equivalent-route'],
    severity_if_wrong: 'P0',
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
    candidateSet: 'cycle2' | 'full' = 'cycle2',
  ): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => candidateSet === 'full' || CYCLE2_BATCH1_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 2 Batch 1 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH1_READY_IDS) {
      assert.ok(ids.has(id), `missing ${id}`)
    }
  })

  check('0b. held/duplicate Cycle 2 Batch 1 ids do not exist as top-level cards', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE2_BATCH1_HELD_OR_DUPLICATE_IDS) {
      assert.equal(ids.has(id), false, `${id} should not exist as a top-level card`)
    }
  })

  check('0c. all Cycle 2 Batch 1 ready cards are still ai_extracted', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE2_BATCH1_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
    }
  })

  check('0d. user-visible card fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE2_BATCH1_READY_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
      }
    }
  })

  for (const fixture of FIXTURES) {
    const candidateSet = fixture.expected_primary_hit.startsWith('gijinkoku-') || fixture.expected_primary_hit.startsWith('landing-')
      ? 'cycle2'
      : 'full'

    check(`${fixture.id}. dry-run top3 hits expected primary`, () => {
      const matches = predict(fixture.question, true, candidateSet)
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

    check(`${fixture.id}. Cycle 2 ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, 'cycle2')
      const prodMatches = predict(fixture.question, false, 'full')
      const prodIds = prodMatches.map(item => item.fact_id)
      for (const match of dryRunMatches.filter(item => CYCLE2_BATCH1_READY_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  console.log(`\nLegal Source P0 Cycle 2 Batch 1 dry-run fixture matrix: ${passes}/${total} pass`)
  if (fails.length > 0) {
    console.log('Failures:')
    for (const f of fails) console.log(`  └ ${f}`)
    process.exit(1)
  }
}

function loadDiskCards(syncMod: Awaited<typeof import('@/scripts/fact-layer-sync')>): DiskCard[] {
  const cardsDir = join(process.cwd(), 'docs/fact-cards')
  const files = readdirSync(cardsDir).filter(
    f => f.endsWith('.md') && f !== 'README.md' && f !== 'FACT_OPS_WINDOW_TASK_PACK.md',
  )
  return files.map(file => {
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
