/**
 * Legal Source Engineering — P0 Cycle 3 Batch 3 dry-run fixture matrix.
 *
 * Scope:
 *   - Batch 3 organization / spouse / institution notification cards must be observable in dry-run.
 *   - They must remain state=ai_extracted with empty injection blocks.
 *   - They must not appear in production-state prediction.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle3-batch3-dry-run-fixtures.ts
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

const CYCLE3_BATCH3_READY_IDS = new Set([
  'organization-notification-activity-institution-statuses',
  'organization-notification-contract-institution-statuses',
  'organization-notification-event-types',
  'organization-notification-methods-and-attachments',
  'organization-notification-fourteen-day-deadline',
  'organization-notification-late-penalty-review-risk',
  'organization-notification-future-event-not-accepted',
  'organization-notification-renewal-change-permit-distinction',
  'organization-notification-contract-content-only-not-required',
  'organization-notification-dual-work-long-term-second-organization',
  'organization-notification-not-work-permission',
  'secondment-dispatch-destination-change-notification-required',
  'organization-reorganization-merger-notification-router',
  'spouse-notification-divorce-death-fourteen-day',
  'spouse-notification-not-status-change-substitute',
  'spouse-notification-methods-no-divorce-certificate',
  'institution-side-work-status-start-end-fourteen-day',
  'institution-side-no-criminal-penalty-review-caution',
  'institution-side-foreign-employment-notification-exclusion-router',
  'student-institution-start-end-periodic-notification',
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
  /\borganization-notification\b/i,
  /\bspouse-notification\b/i,
  /\binstitution-side\b/i,
  /\bstudent-institution\b/i,
  /\bclaim_type\b/i,
  /\bprocedure_actor_scope\b/i,
  /\bnotification_trigger\b/i,
  /\bprocedure_method\b/i,
  /\bdeadline_window\b/i,
  /\bconsequence_boundary\b/i,
  /\bprocedure_boundary\b/i,
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
  /全ての外国人が同じ所属機関届出/,
  /届出だけで.*必ず/,
  /必ず不許可/,
  /必ず在留資格取消/,
  /未来日でもオンラインなら出せる/,
  /離婚しても何も届出しなくてよい/,
  /14日届出だけでそのまま問題ない/,
  /機関側届出漏れは必ず刑罰/,
]

const BATCH3_FIXTURES: Fixture[] = [
  {
    id: 'C3B3-001.activity-statuses',
    question: '経営管理 所属機関 届出 活動機関 届出 対象資格',
    expected_primary_hit: 'organization-notification-activity-institution-statuses',
  },
  {
    id: 'C3B3-002.contract-statuses',
    question: '技人国 転職 14日 届出 契約機関 届出 対象資格',
    expected_primary_hit: 'organization-notification-contract-institution-statuses',
  },
  {
    id: 'C3B3-003.event-types',
    question: '会社辞めた 届出 入管 新しい会社 入社 14日 届出 離脱 移籍 届出',
    expected_primary_hit: 'organization-notification-event-types',
    expected_secondary_hits: ['organization-notification-fourteen-day-deadline'],
  },
  {
    id: 'C3B3-004.methods',
    question: '転職 届出 雇用契約書 必要 所属機関 届出 オンライン 所属機関 届出 資料 不要',
    expected_primary_hit: 'organization-notification-methods-and-attachments',
  },
  {
    id: 'C3B3-005.deadline',
    question: '会社辞めた 14日 入管 届出 所属機関 届出 期限 14日以内 所属機関',
    expected_primary_hit: 'organization-notification-fourteen-day-deadline',
  },
  {
    id: 'C3B3-006.late-risk',
    question: '14日届出 忘れた 所属機関 届出 罰則 入管 届出漏れ 续签',
    expected_primary_hit: 'organization-notification-late-penalty-review-risk',
  },
  {
    id: 'C3B3-007.future-event',
    question: '来月転職 先に届出 転職前 14日届出 所属機関 届出 未来日',
    expected_primary_hit: 'organization-notification-future-event-not-accepted',
  },
  {
    id: 'C3B3-008.renewal-change',
    question: '転職 更新許可 14日届出 必要 在留資格変更 転職 届出 变更签证通过 还要14天届出吗',
    expected_primary_hit: 'organization-notification-renewal-change-permit-distinction',
  },
  {
    id: 'C3B3-009.contract-content-only',
    question: '同じ会社 契約内容 変わった 届出 契約内容だけ変更 入管届出 契約機関 変わらない 届出不要',
    expected_primary_hit: 'organization-notification-contract-content-only-not-required',
  },
  {
    id: 'C3B3-010.dual-work',
    question: '副業 別会社 長期間 所属機関届出 二重契約 入管 届出 ダブルワーク 所属機関 14日',
    expected_primary_hit: 'organization-notification-dual-work-long-term-second-organization',
  },
  {
    id: 'C3B3-011.secondment-dispatch',
    question: '派遣会社 同じ 派遣先変更 入管 出向 所属機関 届出 出向先 14日届出',
    expected_primary_hit: 'secondment-dispatch-destination-change-notification-required',
  },
  {
    id: 'C3B3-012.not-work-permission',
    question: '14日届出 出せば 働ける 所属機関届出 新しい仕事 許可 転職 届出 だけで合法',
    expected_primary_hit: 'organization-notification-not-work-permission',
  },
  {
    id: 'C3B3-013.reorganization',
    question: '会社合併 所属機関届出 吸収合併 入管 届出 部署分割 新会社 届出',
    expected_primary_hit: 'organization-reorganization-merger-notification-router',
  },
  {
    id: 'C3B3-014.spouse-deadline',
    question: '日配 離婚 14日 届出 配偶者届出 離婚 何日以内 离婚后 入管届出 14天',
    expected_primary_hit: 'spouse-notification-divorce-death-fourteen-day',
  },
  {
    id: 'C3B3-015.spouse-change-boundary',
    question: '離婚 届出すれば 在留資格変更 不要 日配 離婚 改签 必要 配偶者届出 だけでいい',
    expected_primary_hit: 'spouse-notification-not-status-change-substitute',
  },
  {
    id: 'C3B3-016.spouse-methods',
    question: '離婚届受理証明書 配偶者届出 必要 配偶者届出 郵送 在留カード コピー 配偶者に関する届出 資料不要',
    expected_primary_hit: 'spouse-notification-methods-no-divorce-certificate',
  },
  {
    id: 'C3B3-017.institution-start-end',
    question: '会社側 入管 届出 14日 所属機関による届出 受入開始 所属機関による届出 受入終了',
    expected_primary_hit: 'institution-side-work-status-start-end-fourteen-day',
  },
  {
    id: 'C3B3-018.institution-no-penalty',
    question: '会社側 届出 忘れた 罰則 所属機関による届出 未提出 刑罰 機関側届出 審査 慎重',
    expected_primary_hit: 'institution-side-no-criminal-penalty-review-caution',
  },
  {
    id: 'C3B3-019.foreign-employment-exclusion',
    question: '外国人雇用状況届出 入管 届出 ハローワーク 届出 入管 届出 不要 会社側 入管届出 雇用状況届出',
    expected_primary_hit: 'institution-side-foreign-employment-notification-exclusion-router',
  },
  {
    id: 'C3B3-020.student-institution-start',
    question: '学校側 留学生 受入開始 届出 教育機関 所属機関による届出 14日 入学 編入 卒業 退学 受入れ届出',
    expected_primary_hit: 'student-institution-start-end-periodic-notification',
  },
  {
    id: 'C3B3-021.student-periodic',
    question: '5月1日 11月1日 留学生 届出 留学生 定期届出 14日以内',
    expected_primary_hit: 'student-institution-start-end-periodic-notification',
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'C3B3-N001.generic-company-tax',
    question: '会社の法人税申告はいつまでですか？',
    forbidden_hits: [
      'organization-notification-event-types',
      'institution-side-work-status-start-end-fourteen-day',
    ],
  },
  {
    id: 'C3B3-N002.generic-divorce',
    question: '普通の離婚相談で財産分与について知りたいです。',
    forbidden_hits: [
      'spouse-notification-divorce-death-fourteen-day',
      'spouse-notification-not-status-change-substitute',
    ],
  },
  {
    id: 'C3B3-N003.generic-online',
    question: '入管のオンライン申請システムの登録方法だけ知りたいです。',
    forbidden_hits: [
      'organization-notification-methods-and-attachments',
      'spouse-notification-methods-no-divorce-certificate',
    ],
  },
  {
    id: 'C3B3-N004.generic-dispatch',
    question: '派遣社員の時給相場を知りたいです。',
    forbidden_hits: ['secondment-dispatch-destination-change-notification-required'],
  },
  {
    id: 'C3B3-N005.generic-school',
    question: '大学院の出願書類を教えてください。',
    forbidden_hits: ['student-institution-start-end-periodic-notification'],
  },
  {
    id: 'C3B3-N006.generic-address',
    question: '会社の住所を名刺にどう書けばいいですか？',
    forbidden_hits: ['organization-notification-event-types'],
  },
  {
    id: 'C3B3-N007.generic-may',
    question: '5月1日は学校が休みですか？',
    forbidden_hits: ['student-institution-start-end-periodic-notification'],
  },
  {
    id: 'C3B3-N008.generic-hello-work',
    question: 'ハローワークで求人を探す方法を知りたいです。',
    forbidden_hits: ['institution-side-foreign-employment-notification-exclusion-router'],
  },
]

const PRODUCTION_REGRESSION_FIXTURES = [
  {
    id: 'C3B3-R001.production-job-change',
    question: '技人国で転職しました。14日届出は必要ですか？ 技人国 転職 14日 届出',
  },
  {
    id: 'C3B3-R002.production-late-notification',
    question: '転職の14日届出を忘れたら更新で不利ですか？ 14日届出 忘れた',
  },
  {
    id: 'C3B3-R003.production-spouse-divorce',
    question: '日配で離婚しました。入管への届出と変更は必要ですか？ 日配 離婚 14日 届出',
  },
  {
    id: 'C3B3-R004.production-dispatch',
    question: '技人国の派遣先が変わりました。届出が必要ですか？ 派遣先 変わった 届出',
  },
  {
    id: 'C3B3-R005.production-company-side',
    question: '会社側も外国人社員の受入開始を入管へ届出しますか？ 会社側 入管 届出 14日',
  },
  {
    id: 'C3B3-R006.production-student-school',
    question: '学校は留学生の受入開始と終了を入管へ届出しますか？ 学校側 留学生 受入開始 届出',
  },
  {
    id: 'C3B3-R007.production-reorganization',
    question: '会社が合併したら所属機関届出が必要ですか？ 会社合併 所属機関届出',
  },
  {
    id: 'C3B3-R008.production-not-work-permission',
    question: '転職の14日届出を出せば新しい仕事をそのままできますか？ 14日届出 出せば 働ける',
  },
  {
    id: 'C3B3-R009.production-hello-work',
    question: 'ハローワークに外国人雇用状況届出を出したら入管の会社側届出は不要ですか？ 外国人雇用状況届出 入管 届出',
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
      .filter(card => candidateSet === 'full' || CYCLE3_BATCH3_READY_IDS.has(card.factId))
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

  check('0a. all Cycle 3 Batch 3 ready cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of CYCLE3_BATCH3_READY_IDS) assert.ok(ids.has(id), `missing ${id}`)
  })

  check('0b. all Cycle 3 Batch 3 cards are ai_extracted with empty injection', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of CYCLE3_BATCH3_READY_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
      assert.equal(byId.get(id)?.injectionCertainBlock, '', `${id} certain block must stay empty`)
    }
  })

  check('0c. user-visible fields do not leak internal terms or overcertainty phrases', () => {
    for (const card of cards.filter(item => CYCLE3_BATCH3_READY_IDS.has(item.factId))) {
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
      for (const match of dryRunMatches.filter(item => CYCLE3_BATCH3_READY_IDS.has(item.fact_id))) {
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
      for (const id of ids) assert.equal(CYCLE3_BATCH3_READY_IDS.has(id), false, `${id} surfaced in production prediction`)
    })
  }

  console.log(`\nCycle 3 Batch 3 dry-run fixtures: ${passes}/${total} checks passed`)
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
