/**
 * Legal Source Engineering — P0 Cycle 3 Batch 2 dry-run fixture matrix.
 *
 * Scope:
 *   - Batch 2 status-acquisition / qualification-outside-activity cards must be observable in dry-run.
 *   - They must remain state=ai_extracted and decision=drop.
 *   - They must not appear in production-state prediction.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle3-batch2-dry-run-fixtures.ts
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

const CYCLE3_BATCH2_READY_IDS = new Set([
  'status-acquisition-birth-nationality-loss-scope',
  'status-acquisition-over-60-days-trigger',
  'status-acquisition-30-day-application-window',
  'status-acquisition-japan-birth-foreign-parents-nationality',
  'status-acquisition-not-coe-change-renewal',
  'qualification-outside-activity-procedure-scope',
  'qualification-outside-activity-table2-not-target',
  'qualification-outside-activity-permission-before-work',
  'qualification-outside-activity-comprehensive-permission-boundary',
  'qualification-outside-activity-individual-permission-router',
  'qualification-outside-activity-current-status-not-impeded',
  'qualification-outside-activity-prohibited-activities-exclusion',
  'student-dependent-qoa-28-hour-router',
  'qoa-business-scale-change-to-business-manager-router',
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
  /\bstatus-acquisition\b/i,
  /\bqualification-outside-activity\b/i,
  /\bstudent-dependent-qoa\b/i,
  /\bqoa\b/i,
  /\bprocedure_scope\b/i,
  /\bdeadline_trigger\b/i,
  /\bdeadline_window\b/i,
  /\bstatus_boundary\b/i,
  /\bdisambiguation\b/i,
  /\bpermission_boundary\b/i,
  /\bexclusion_scope\b/i,
  /\beligibility_criterion\b/i,
  /\brouting_boundary\b/i,
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
  /自动日本籍/,
  /自动有在留资格/,
  /什么时候办都一样/,
  /申请中就可以开始/,
  /先做后补没问题/,
  /28小时内任何工作都可以/,
  /每家公司28小时/,
  /万能工作许可/,
  /资格外活动许可=万能/,
  /身份签也要资格外活动许可/,
  /永住者必须申请资格外活动/,
  /开公司只要28小时以内即可/,
  /一定获批/,
]

const BATCH2_FIXTURES: Fixture[] = [
  {
    id: 'C3B2-001.status-acquisition-scope',
    question: '日本出生 小孩 在留資格取得',
    expected_primary_hit: 'status-acquisition-birth-nationality-loss-scope',
  },
  {
    id: 'C3B2-002.status-acquisition-60-days',
    question: '出生后60天 在留资格取得 小孩出生 60日 超える',
    expected_primary_hit: 'status-acquisition-over-60-days-trigger',
  },
  {
    id: 'C3B2-003.status-acquisition-30-days',
    question: '在留資格取得 30日以内 出生后30天内申请',
    expected_primary_hit: 'status-acquisition-30-day-application-window',
  },
  {
    id: 'C3B2-004.foreign-parents-nationality',
    question: '外国人父母 日本出生 日本国籍',
    expected_primary_hit: 'status-acquisition-japan-birth-foreign-parents-nationality',
  },
  {
    id: 'C3B2-005.not-coe',
    question: '新生儿 COE 还是在留資格取得',
    expected_primary_hit: 'status-acquisition-not-coe-change-renewal',
  },
  {
    id: 'C3B2-006.qoa-scope',
    question: '资格外活动许可 副业 当前签证外 有偿活动',
    expected_primary_hit: 'qualification-outside-activity-procedure-scope',
  },
  {
    id: 'C3B2-007.table2-not-target',
    question: '永住者 资格外活动许可 永住 副业 许可',
    expected_primary_hit: 'qualification-outside-activity-table2-not-target',
  },
  {
    id: 'C3B2-007b.table2-spouse-not-target',
    question: '日配 副业 资格外活动 身份签证 工作限制',
    expected_primary_hit: 'qualification-outside-activity-table2-not-target',
  },
  {
    id: 'C3B2-008.permission-before-work',
    question: '先打工再补资格外活动许可 副业开始前 许可',
    expected_primary_hit: 'qualification-outside-activity-permission-before-work',
  },
  {
    id: 'C3B2-009.comprehensive-not-universal',
    question: '包括许可 什么工作都可以吗 打工许可 万能吗',
    expected_primary_hit: 'qualification-outside-activity-comprehensive-permission-boundary',
  },
  {
    id: 'C3B2-010.individual-permission',
    question: '资格外活动 个别许可 包括许可范围外',
    expected_primary_hit: 'qualification-outside-activity-individual-permission-router',
  },
  {
    id: 'C3B2-011.current-status-not-impeded',
    question: '打工影响留学签证吗 资格外活动 本业 妨げ',
    expected_primary_hit: 'qualification-outside-activity-current-status-not-impeded',
  },
  {
    id: 'C3B2-012.prohibited-activities',
    question: '夜店 打工 资格外活动 風俗営業 資格外活動',
    expected_primary_hit: 'qualification-outside-activity-prohibited-activities-exclusion',
  },
  {
    id: 'C3B2-013.student-dependent-28h',
    question: '留学生 28小时 打工许可 家族滞在 28小时 兼职',
    expected_primary_hit: 'student-dependent-qoa-28-hour-router',
  },
  {
    id: 'C3B2-014.business-manager-router',
    question: '家族滞在 开公司 雇人 副业 开法人 经营管理',
    expected_primary_hit: 'qoa-business-scale-change-to-business-manager-router',
  },
  {
    id: 'C3B2-015.student-first-work-risk',
    question: '留学生打工许可还没下来，可以先上班吗 先打工再补资格外活动许可',
    expected_primary_hit: 'qualification-outside-activity-permission-before-work',
  },
  {
    id: 'C3B2-016.any-industry-risk',
    question: '留学生一周28小时内可以去夜店打工吗 28小时内 任何行业 包括许可 什么工作都可以吗',
    expected_primary_hit: 'qualification-outside-activity-prohibited-activities-exclusion',
    expected_secondary_hits: ['qualification-outside-activity-comprehensive-permission-boundary'],
  },
  {
    id: 'C3B2-017.student-business-scale',
    question: '留学生 开公司 资格外活动 新法人設立 経営管理 変更',
    expected_primary_hit: 'qoa-business-scale-change-to-business-manager-router',
  },
  {
    id: 'C3B2-018.not-automatic-nationality',
    question: '在日本生孩子 自动日本籍吗 日本出生 小孩国籍',
    expected_primary_hit: 'status-acquisition-japan-birth-foreign-parents-nationality',
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C3B2-N001.generic-baby',
    question: '宝宝发烧去哪里看病？',
    forbidden_hits: [
      'status-acquisition-birth-nationality-loss-scope',
      'status-acquisition-over-60-days-trigger',
      'status-acquisition-30-day-application-window',
    ],
  },
  {
    id: 'C3B2-N002.generic-birth',
    question: '出生证明怎么翻译？',
    forbidden_hits: ['status-acquisition-japan-birth-foreign-parents-nationality'],
  },
  {
    id: 'C3B2-N003.generic-work',
    question: '工作太累想辞职。',
    forbidden_hits: [
      'qualification-outside-activity-permission-before-work',
      'qualification-outside-activity-current-status-not-impeded',
    ],
  },
  {
    id: 'C3B2-N004.generic-28',
    question: '28岁还能去日本留学吗？',
    forbidden_hits: ['student-dependent-qoa-28-hour-router'],
  },
  {
    id: 'C3B2-N005.generic-company',
    question: '开公司需要会计吗？',
    forbidden_hits: ['qoa-business-scale-change-to-business-manager-router'],
  },
  {
    id: 'C3B2-N006.generic-acquisition',
    question: '这个资格证取得难吗？',
    forbidden_hits: [
      'status-acquisition-birth-nationality-loss-scope',
      'status-acquisition-30-day-application-window',
    ],
  },
  {
    id: 'C3B2-N007.generic-coe',
    question: '家族呼寄的 COE 材料有哪些？',
    forbidden_hits: ['status-acquisition-not-coe-change-renewal'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES = [
  {
    id: 'C3B2-R001.production-student-work',
    question: '留学生打工一周28小时可以吗？留学生 打工 28小时',
  },
  {
    id: 'C3B2-R002.production-dependent-work',
    question: '家族滞在可以打工吗？家族滞在 资格外活动',
  },
  {
    id: 'C3B2-R003.production-side-work',
    question: '技人国副业需要申请资格外活动吗？技人国 副业',
  },
  {
    id: 'C3B2-R004.production-child-status',
    question: '孩子在日本出生怎么申请在留？子供 在留 申請',
  },
  {
    id: 'C3B2-R005.production-28h-per-employer',
    question: '留学生打工一周28小时是每家公司吗？留学生 打工 28小时 掛け持ち',
  },
  {
    id: 'C3B2-R006.production-spouse-side-work',
    question: '日本人配偶者打工需要资格外活动许可吗？日配 副业',
  },
  {
    id: 'C3B2-R007.production-adult-entertainment',
    question: '留学生可以去夜店打工吗？留学生 風俗 打工',
  },
  {
    id: 'C3B2-R008.production-business-manager-router',
    question: '家族滞在想开公司雇人，用资格外活动可以吗？家族滞在 開業',
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
      .filter(card => candidateSet === 'full' || CYCLE3_BATCH2_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 3 Batch 2 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE3_BATCH2_READY_IDS) assert.ok(ids.has(id), `missing ${id}`)
  })

  check('0b. all Cycle 3 Batch 2 cards are ai_extracted with empty injection', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE3_BATCH2_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
    }
  })

  check('0c. user-visible fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE3_BATCH2_READY_IDS.has(item.factId))) {
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
      for (const match of dryRunMatches.filter(item => CYCLE3_BATCH2_READY_IDS.has(item.fact_id))) {
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
      for (const id of ids) assert.equal(CYCLE3_BATCH2_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  console.log(`\nCycle 3 Batch 2 dry-run fixtures: ${passes}/${total} checks passed`)
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
