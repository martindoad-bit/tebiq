/**
 * Legal Source Engineering — P0 Cycle 1 dry-run fixture matrix.
 *
 * This is DB-free. It loads docs/fact-cards from disk through the same
 * normalizer as fact-layer-sync, then reuses matcher scoring/gating helpers.
 *
 * The point is deliberately different from production injection smoke:
 *   - dry-run SHOULD surface ai_extracted legal-source cards as matches;
 *   - those matches MUST still have decision='drop';
 *   - production-state prediction MUST NOT surface ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p0-cycle1-dry-run-fixtures.ts
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
  evidencePoints: ReadonlyArray<{
    display_label?: string
    claim?: string
  }>
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
  expected_policy: string
  severity_if_wrong: 'P0' | 'P1'
}

const LEGAL_SOURCE_CYCLE1_IDS = new Set([
  'legal-status-table1-activity-skeleton',
  'legal-status-table2-status-skeleton',
  'legal-status-table1-section1-work-activity',
  'legal-status-table1-section2-work-landing-criteria',
  'legal-status-table1-sections3-4-nonwork-activity',
  'legal-status-designated-activities-individual-designation',
  'business-manager-activity-anchor',
  'technical-humanities-international-activity-anchor',
  'skilled-labor-activity-anchor',
  'student-activity-anchor',
  'dependent-activity-anchor',
  'spouse-or-child-of-japanese-status-anchor',
  'long-term-resident-status-anchor',
  'dependent-work-restriction-router',
  'student-work-restriction-router',
  'qualification-outside-activity-permission-framework',
  'permission-scope-not-universal',
  'long-vacation-work-limit',
  'prohibited-work-categories',
  'business-manager-excludes-legal-accounting-qualified-business',
  'gijinkoku-requires-contract-with-japan-organization',
  'gijinkoku-three-knowledge-cultural-basis-scope',
  'gijinkoku-excludes-other-listed-status-activities',
  'intra-company-transferee-foreign-office-to-japan-office',
  'nursing-care-certified-care-worker-scope',
  'legal-accounting-qualified-profession-scope',
  'medical-qualified-profession-scope',
  'specified-skilled-worker-1-designated-field-skill-scope',
  'specified-skilled-worker-2-skilled-scope',
  'technical-intern-training-plan-type-scope',
  'cultural-activities-non-remunerated-research-scope',
  'temporary-visitor-short-stay-activity-scope',
  'dependent-sponsor-and-family-member-scope',
  'permanent-resident-period-indefinite',
  'spouse-or-child-of-japanese-status-includes-spouse-special-adopted-child-child-born',
  'spouse-or-child-of-permanent-resident-status-includes-spouse-and-japan-born-continuing-child',
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
]

const FIXTURES: Fixture[] = [
  {
    id: 'LS1.table1-activity-skeleton',
    question: '別表第一 活動資格 签证活动范围 这个在留资格能做哪些工作',
    expected_primary_hit: 'legal-status-table1-activity-skeleton',
    expected_excluded_hits: ['legal-status-table2-status-skeleton'],
    expected_policy: 'table1_activity_scope_first',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS2.table2-status-skeleton',
    question: '永住者能工作吗 別表第二 居住資格 身份签有没有工作限制',
    expected_primary_hit: 'legal-status-table2-status-skeleton',
    expected_excluded_hits: ['qualification-outside-activity-permission-framework'],
    expected_policy: 'status_class_no_activity_work_limit',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS3.japanese-spouse-status-not-shikakugai',
    question: '日配能打工吗 日本人の配偶者等 別表第二',
    expected_primary_hit: 'spouse-or-child-of-japanese-status-anchor',
    expected_secondary_hits: ['legal-status-table2-status-skeleton'],
    expected_excluded_hits: ['qualification-outside-activity-permission-framework'],
    expected_policy: 'status_work_scope_not_pr_equivalence',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS4.dependent-work-router',
    question: '家族滞在可以打工吗 家族滞在资格外活动许可 家属签工作',
    expected_primary_hit: 'dependent-work-restriction-router',
    expected_secondary_hits: ['qualification-outside-activity-permission-framework'],
    expected_excluded_hits: ['legal-status-table2-status-skeleton'],
    expected_policy: 'dependent_work_permission_scope_check',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS5.dependent-fulltime-router',
    question: '家族滞在正社员 家族滞在全职 家族滞在收入超过扶养',
    expected_primary_hit: 'dependent-work-restriction-router',
    expected_secondary_hits: ['dependent-activity-anchor'],
    expected_policy: 'dependent_fulltime_requires_status_path_check',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS6.dependent-parent-scope',
    question: '永住者能给父母办家族滞在吗 家族滞在 父母家族滞在',
    expected_primary_hit: 'dependent-sponsor-and-family-member-scope',
    expected_secondary_hits: ['dependent-activity-anchor'],
    expected_policy: 'dependent_family_scope_no_parent',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS7.student-work-router',
    question: '留学生打工 留学签工作 学生签兼职',
    expected_primary_hit: 'student-work-restriction-router',
    expected_policy: 'student_work_permission_scope_check',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS8.student-graduation-router',
    question: '毕业后还能继续打工吗 留学签没过期 留学生打工',
    expected_primary_hit: 'student-activity-anchor',
    expected_secondary_hits: ['student-work-restriction-router'],
    expected_excluded_hits: ['long-vacation-work-limit'],
    expected_policy: 'student_basis_change_not_card_expiry',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS9.student-long-vacation',
    question: '留学生暑假可以一天打8小时吗 长假打工 暑假打工',
    expected_primary_hit: 'long-vacation-work-limit',
    expected_policy: 'student_vacation_limit_with_school_basis',
    severity_if_wrong: 'P1',
  },
  {
    id: 'LS10.prohibited-work-category',
    question: '留学生打工 可以在酒吧打工吗 风俗店 28小时以内可以在风俗店吗',
    expected_primary_hit: 'prohibited-work-categories',
    expected_secondary_hits: ['student-work-restriction-router'],
    expected_policy: 'permission_never_overrides_prohibited_work',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS11.permission-not-universal',
    question: '有资格外活动许可可以做任何副业吗 许可条件 打工许可范围',
    expected_primary_hit: 'permission-scope-not-universal',
    expected_policy: 'permission_scope_not_universal',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS12.gijinkoku-anchor',
    question: '技人国 餐厅服务员 便利店 销售 工程师 市场',
    expected_primary_hit: 'technical-humanities-international-activity-anchor',
    expected_secondary_hits: ['gijinkoku-three-knowledge-cultural-basis-scope'],
    expected_policy: 'gijinkoku_scope_no_job_title_answer',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS13.gijinkoku-contract',
    question: '技人国必须有雇佣合同吗 委托合同 日本公司契约',
    expected_primary_hit: 'gijinkoku-requires-contract-with-japan-organization',
    expected_policy: 'gijinkoku_contract_is_entry_not_sufficient',
    severity_if_wrong: 'P1',
  },
  {
    id: 'LS14.gijinkoku-exclusion',
    question: '技人国开公司 技人国经营 技人国当老师',
    expected_primary_hit: 'gijinkoku-excludes-other-listed-status-activities',
    expected_policy: 'gijinkoku_other_status_activity_exclusion',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS15.business-manager-anchor',
    question: '经营管理签证 经管签可以打工吗 去别家公司上班',
    expected_primary_hit: 'business-manager-activity-anchor',
    expected_policy: 'business_manager_no_free_employment',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS16.business-manager-regulated-business',
    question: '经管签可以开会计事务所吗 经营管理 法律会计业务 税理士 行政书士',
    expected_primary_hit: 'business-manager-excludes-legal-accounting-qualified-business',
    expected_secondary_hits: ['business-manager-activity-anchor', 'legal-accounting-qualified-profession-scope'],
    expected_policy: 'regulated_profession_exclusion_check',
    severity_if_wrong: 'P1',
  },
  {
    id: 'LS17.ssw1-scope',
    question: '特定技能1号 特定产业分野 特定技能1号可以做文员吗',
    expected_primary_hit: 'specified-skilled-worker-1-designated-field-skill-scope',
    expected_policy: 'ssw1_designated_field_scope',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS18.ssw2-scope',
    question: '特定技能2号 特定技能2号家属 2号和1号一样吗',
    expected_primary_hit: 'specified-skilled-worker-2-skilled-scope',
    expected_policy: 'ssw2_separate_from_ssw1',
    severity_if_wrong: 'P1',
  },
  {
    id: 'LS19.temporary-visitor-remote-work',
    question: '短期滞在 旅游签 远程办公 短期滞在可以远程办公吗',
    expected_primary_hit: 'temporary-visitor-short-stay-activity-scope',
    expected_policy: 'short_stay_remote_work_no_simple_yes_no',
    severity_if_wrong: 'P1',
  },
  {
    id: 'LS20.permanent-resident-period',
    question: '永住者签证几年 永住者在留期间 无期限',
    expected_primary_hit: 'permanent-resident-period-indefinite',
    expected_policy: 'period_indefinite_card_renewal_separate',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS21.permanent-resident-card-not-period',
    question: '永住卡还要更新吗 永住者在留期间 无期限',
    expected_primary_hit: 'permanent-resident-period-indefinite',
    expected_policy: 'period_indefinite_card_renewal_separate',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS22.japanese-spouse-family-scope',
    question: '日配 日本人父母 日本人男朋友 日本人孩子 特别养子',
    expected_primary_hit: 'spouse-or-child-of-japanese-status-includes-spouse-special-adopted-child-child-born',
    expected_policy: 'spouse_child_scope_no_partner_parent',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS23.permanent-resident-spouse-family-scope',
    question: '永配 永住者父母 永住者孩子 日本出生 海外出生孩子',
    expected_primary_hit: 'spouse-or-child-of-permanent-resident-status-includes-spouse-and-japan-born-continuing-child',
    expected_policy: 'pr_spouse_child_scope_no_partner_parent',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS24.short-stay-business',
    question: '短期滞在 商务会议 短期商务 现场安装设备',
    expected_primary_hit: 'temporary-visitor-short-stay-activity-scope',
    expected_policy: 'short_stay_paid_work_not_assumed_allowed',
    severity_if_wrong: 'P1',
  },
  {
    id: 'LS25.similar-status-disambiguation',
    question: '技能签、技能实习是不是一回事？技能和技能实习一样吗 技能实习区别',
    expected_primary_hit: 'skilled-labor-activity-anchor',
    expected_secondary_hits: ['technical-intern-training-plan-type-scope'],
    expected_excluded_hits: ['technical-humanities-international-activity-anchor', 'business-manager-activity-anchor'],
    expected_policy: 'similar_status_disambiguation_no_auto_path',
    severity_if_wrong: 'P1',
  },
  {
    id: 'LS25b.technical-intern-ssw-disambiguation',
    question: '技能实习能换特定技能吗 特定技能区别 特定技能1号 特定技能2号',
    expected_primary_hit: 'technical-intern-training-plan-type-scope',
    expected_secondary_hits: [
      'specified-skilled-worker-1-designated-field-skill-scope',
      'specified-skilled-worker-2-skilled-scope',
    ],
    expected_excluded_hits: ['technical-humanities-international-activity-anchor', 'business-manager-activity-anchor'],
    expected_policy: 'technical_intern_ssw_no_auto_path',
    severity_if_wrong: 'P1',
  },
  {
    id: 'LS26.ssw1-family',
    question: '特定技能1号可以把老婆孩子办家族滞在吗？特定技能1号能带家属吗',
    expected_primary_hit: 'dependent-sponsor-and-family-member-scope',
    expected_secondary_hits: ['specified-skilled-worker-1-designated-field-skill-scope'],
    expected_excluded_hits: ['specified-skilled-worker-2-skilled-scope'],
    expected_policy: 'tokutei_1_family_no_auto_positive',
    severity_if_wrong: 'P0',
  },
  {
    id: 'LS27.cultural-activity-remuneration',
    question: '文化活动签可以卖作品赚钱维持生活吗？文化活動 无收入活动',
    expected_primary_hit: 'cultural-activities-non-remunerated-research-scope',
    expected_excluded_hits: ['business-manager-activity-anchor', 'technical-humanities-international-activity-anchor'],
    expected_policy: 'cultural_activity_non_remunerated_boundary',
    severity_if_wrong: 'P1',
  },
  {
    id: 'LS28.table1-table2-classification',
    question: '活动资格是什么意思？跟永住这种身份签证有什么区别？別表第一 別表第二',
    expected_primary_hit: 'legal-status-table1-activity-skeleton',
    expected_secondary_hits: ['legal-status-table2-status-skeleton'],
    expected_excluded_hits: ['qualification-outside-activity-permission-framework'],
    expected_policy: 'table1_table2_classification_first',
    severity_if_wrong: 'P1',
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

  function predict(question: string, includeDryRunStates: boolean, cycle1Only = false): Prediction[] {
    const states = new Set(
      includeDryRunStates
        ? matcherInternals.DRY_RUN_CANDIDATE_STATES
        : matcherInternals.PRODUCTION_CANDIDATE_STATES,
    )
    const rawMatches = cards
      .filter(card => states.has(card.state as never))
      .filter(card => !cycle1Only || LEGAL_SOURCE_CYCLE1_IDS.has(card.factId))
      .map(card => {
        const raw = matcherInternals.scoreCardAgainst(card as never, question.toLowerCase())
        return raw
          ? {
              card,
              score: raw.score,
              matched_keywords: raw.matchedKeywords,
            }
          : null
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

  check('0a. all Cycle 1 legal-source cards exist on disk', () => {
    const ids = new Set(cards.map(card => card.factId))
    for (const id of LEGAL_SOURCE_CYCLE1_IDS) {
      assert.ok(ids.has(id), `missing ${id}`)
    }
  })

  check('0b. all Cycle 1 legal-source cards are still ai_extracted', () => {
    const byId = new Map(cards.map(card => [card.factId, card]))
    for (const id of LEGAL_SOURCE_CYCLE1_IDS) {
      assert.equal(byId.get(id)?.state, 'ai_extracted', `${id} must stay ai_extracted`)
    }
  })

  check('0c. user-visible card fields do not leak internal terms', () => {
    for (const card of cards.filter(item => LEGAL_SOURCE_CYCLE1_IDS.has(item.factId))) {
      const visibleText = userVisibleText(card)
      for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
        assert.equal(
          pattern.test(visibleText),
          false,
          `${card.factId} user-visible fields leak ${pattern}`,
        )
      }
    }
  })

  for (const fixture of FIXTURES) {
    check(`${fixture.id}. Cycle 1 dry-run top3 hits expected primary`, () => {
      const matches = predict(fixture.question, true, true)
      const ids = matches.map(item => item.fact_id)
      const top3 = ids.slice(0, 3)
      assert.ok(
        top3.includes(fixture.expected_primary_hit),
        `expected primary ${fixture.expected_primary_hit} in top3; got ${top3.join(', ') || '[]'}; policy=${fixture.expected_policy}`,
      )
      for (const expected of fixture.expected_secondary_hits ?? []) {
        assert.ok(ids.includes(expected), `expected secondary ${expected}; got ${ids.join(', ') || '[]'}`)
      }
      for (const excluded of fixture.expected_excluded_hits ?? []) {
        assert.ok(!top3.includes(excluded), `excluded ${excluded} unexpectedly in top3; got ${top3.join(', ')}`)
      }
    })

    check(`${fixture.id}. ai_extracted matches stay drop and out of production`, () => {
      const dryRunMatches = predict(fixture.question, true, true)
      const prodMatches = predict(fixture.question, false)
      const prodIds = prodMatches.map(item => item.fact_id)

      for (const match of dryRunMatches.filter(item => LEGAL_SOURCE_CYCLE1_IDS.has(item.fact_id))) {
        assert.equal(match.state, 'ai_extracted', `${match.fact_id} state drifted`)
        assert.equal(match.decision, 'drop', `${match.fact_id} must not inject before promotion`)
        assert.ok(!prodIds.includes(match.fact_id), `${match.fact_id} surfaced in production prediction`)
      }
    })
  }

  console.log(`\nLegal Source P0 Cycle 1 dry-run fixture matrix: ${passes}/${total} pass`)
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
    ...card.evidencePoints.flatMap(point => [
      point.display_label ?? '',
      point.claim ?? '',
    ]),
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
