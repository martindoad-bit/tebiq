/**
 * Legal Source Engineering — P1 Cycle 3 Batch 4 dry-run fixtures.
 *
 * Scope:
 *   - 特定技能 notifications, acceptance difficulty, support-difficulty, periodic reports.
 *   - Registered support organization registration/change/renewal/suspension boundaries.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle3-batch4-ssw-notifications-fixtures.ts
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
  sprint: string
  triggerKeywords: ReadonlyArray<string>
  injectionCertainBlock: string
  injectionNeedsReviewAddendum: string | null
  evidencePoints: ReadonlyArray<{ display_label?: string; claim?: string; source_url?: string }>
  frontmatter: Record<string, unknown>
}

interface Prediction {
  fact_id: string
  decision: Decision
  score: number
}

interface Fixture {
  id: string
  question: string
  expected_primary_hit: string
}

interface NegativeFixture {
  id: string
  question: string
  forbidden_hits?: string[]
  forbid_any_batch4?: boolean
}

const BATCH4_IDS = new Set([
  "ssw-notification-ad-hoc-and-annual-deadline-source",
  "ssw-notification-noncompliance-penalty-risk-source",
  "ssw-org-notification-not-delegable-to-rso-source",
  "ssw-employment-contract-notification-14day-source",
  "ssw-employment-contract-end-acceptance-difficulty-boundary-source",
  "ssw-support-plan-change-notification-14day-source",
  "ssw-support-contract-notification-14day-source",
  "ssw-acceptance-difficulty-notification-14day-source",
  "ssw-acceptance-difficulty-one-month-inactivity-source",
  "ssw-acceptance-difficulty-missing-person-source",
  "ssw-standard-nonconformity-notification-14day-source",
  "ssw-support-implementation-difficulty-notification-source",
  "ssw-support-implementation-difficulty-attachments-source",
  "ssw-periodic-notification-integrated-annual-form-source",
  "ssw-outsourced-support-periodic-report-via-host-source",
  "ssw-rso-registration-change-14day-source",
  "ssw-rso-suspend-abolish-restart-notification-source",
  "ssw-rso-office-change-vs-suspension-boundary-source",
  "ssw-rso-registration-scope-and-period-source",
  "ssw-rso-renewal-window-source",
  "ssw-rso-renewal-lapse-no-support-source",
  "ssw-rso-notification-nonperformance-cancellation-risk-source"
])

const POSITIVE_FIXTURES: Fixture[] = [
  {
    id: "C3B4-001",
    question: "特定技能 随時届出 14日以内",
    expected_primary_hit: "ssw-notification-ad-hoc-and-annual-deadline-source"
  },
  {
    id: "C3B4-002",
    question: "特定技能 届出 出さない 罰則",
    expected_primary_hit: "ssw-notification-noncompliance-penalty-risk-source"
  },
  {
    id: "C3B4-003",
    question: "特定技能 届出 登録支援機関に委託",
    expected_primary_hit: "ssw-org-notification-not-delegable-to-rso-source"
  },
  {
    id: "C3B4-004",
    question: "特定技能 雇用契約 変更 届出 14日",
    expected_primary_hit: "ssw-employment-contract-notification-14day-source"
  },
  {
    id: "C3B4-005",
    question: "特定技能 契約終了 受入れ困難 届出",
    expected_primary_hit: "ssw-employment-contract-end-acceptance-difficulty-boundary-source"
  },
  {
    id: "C3B4-006",
    question: "特定技能 支援計画 変更 届出 14日",
    expected_primary_hit: "ssw-support-plan-change-notification-14day-source"
  },
  {
    id: "C3B4-007",
    question: "特定技能 支援委託契約 届出 14日",
    expected_primary_hit: "ssw-support-contract-notification-14day-source"
  },
  {
    id: "C3B4-008",
    question: "特定技能 受入れ困難 届出 14日",
    expected_primary_hit: "ssw-acceptance-difficulty-notification-14day-source"
  },
  {
    id: "C3B4-009",
    question: "特定技能 1か月以上 活動できない 届出",
    expected_primary_hit: "ssw-acceptance-difficulty-one-month-inactivity-source"
  },
  {
    id: "C3B4-010",
    question: "特定技能 行方不明 届出",
    expected_primary_hit: "ssw-acceptance-difficulty-missing-person-source"
  },
  {
    id: "C3B4-011",
    question: "特定技能 基準不適合 届出 14日",
    expected_primary_hit: "ssw-standard-nonconformity-notification-14day-source"
  },
  {
    id: "C3B4-012",
    question: "特定技能 支援 実施困難 届出",
    expected_primary_hit: "ssw-support-implementation-difficulty-notification-source"
  },
  {
    id: "C3B4-013",
    question: "特定技能 支援実施困難 添付資料",
    expected_primary_hit: "ssw-support-implementation-difficulty-attachments-source"
  },
  {
    id: "C3B4-014",
    question: "特定技能 定期届出 年1回",
    expected_primary_hit: "ssw-periodic-notification-integrated-annual-form-source"
  },
  {
    id: "C3B4-015",
    question: "特定技能 支援 全部委託 定期届出",
    expected_primary_hit: "ssw-outsourced-support-periodic-report-via-host-source"
  },
  {
    id: "C3B4-016",
    question: "登録支援機関 登録事項 変更 14日",
    expected_primary_hit: "ssw-rso-registration-change-14day-source"
  },
  {
    id: "C3B4-017",
    question: "登録支援機関 支援業務 休止 届出",
    expected_primary_hit: "ssw-rso-suspend-abolish-restart-notification-source"
  },
  {
    id: "C3B4-018",
    question: "登録支援機関 一部 事務所 休止",
    expected_primary_hit: "ssw-rso-office-change-vs-suspension-boundary-source"
  },
  {
    id: "C3B4-019",
    question: "登録支援機関 登録申請 対象",
    expected_primary_hit: "ssw-rso-registration-scope-and-period-source"
  },
  {
    id: "C3B4-020",
    question: "登録支援機関 更新 6か月前 4か月前",
    expected_primary_hit: "ssw-rso-renewal-window-source"
  },
  {
    id: "C3B4-021",
    question: "登録支援機関 更新 間に合わない 支援できる",
    expected_primary_hit: "ssw-rso-renewal-lapse-no-support-source"
  },
  {
    id: "C3B4-022",
    question: "登録支援機関 届出 不履行 取消",
    expected_primary_hit: "ssw-rso-notification-nonperformance-cancellation-risk-source"
  },
  {
    id: "C3B4-023",
    question: "特定技能 休業 1ヶ月 入管",
    expected_primary_hit: "ssw-acceptance-difficulty-one-month-inactivity-source"
  },
  {
    id: "C3B4-024",
    question: "特定技能 失踪 受入れ困難",
    expected_primary_hit: "ssw-acceptance-difficulty-missing-person-source"
  },
  {
    id: "C3B4-025",
    question: "特定技能 支援できない 相談記録",
    expected_primary_hit: "ssw-support-implementation-difficulty-attachments-source"
  },
  {
    id: "C3B4-026",
    question: "特定技能 定期届出 四半期 変更",
    expected_primary_hit: "ssw-periodic-notification-integrated-annual-form-source"
  },
  {
    id: "C3B4-027",
    question: "登録支援機関 有効期限 切れ 支援業務",
    expected_primary_hit: "ssw-rso-renewal-lapse-no-support-source"
  },
  {
    id: "C3B4-028",
    question: "特定技能 年1回 定期届出になったなら随時届出はいらないですか",
    expected_primary_hit: "ssw-notification-ad-hoc-and-annual-deadline-source"
  },
  {
    id: "C3B4-029",
    question: "特定技能 受入れ困難届出を出せば本人はそのまま日本で転職できますか",
    expected_primary_hit: "ssw-acceptance-difficulty-notification-14day-source"
  },
  {
    id: "C3B4-030",
    question: "特定技能 支援計画を変更すれば支援実施困難届出はいりませんか",
    expected_primary_hit: "ssw-support-implementation-difficulty-notification-source"
  },
  {
    id: "C3B4-031",
    question: "特定技能员工失踪，公司要不要通知入管？",
    expected_primary_hit: "ssw-acceptance-difficulty-missing-person-source"
  },
  {
    id: "C3B4-032",
    question: "特定技能员工休业一个月以上怎么办？",
    expected_primary_hit: "ssw-acceptance-difficulty-one-month-inactivity-source"
  },
  {
    id: "C3B4-033",
    question: "支援全委托给注册支援机构，定期届出谁交？",
    expected_primary_hit: "ssw-outsourced-support-periodic-report-via-host-source"
  },
  {
    id: "C3B4-034",
    question: "注册支援机构更新没赶上，还能继续支援吗？",
    expected_primary_hit: "ssw-rso-renewal-lapse-no-support-source"
  },
  {
    id: "C3B4-035",
    question: "特定技能现在还是季度报告吗？",
    expected_primary_hit: "ssw-periodic-notification-integrated-annual-form-source"
  }
]

const BROAD_NEGATIVE_FIXTURES: NegativeFixture[] = [
  {
    id: "C3B4-N001.generic-labor-contract",
    question: "雇用契約書の作り方を教えてください",
    forbid_any_batch4: true,
    forbidden_hits: [
      "ssw-employment-contract-notification-14day-source",
      "ssw-employment-contract-end-acceptance-difficulty-boundary-source"
    ]
  },
  {
    id: "C3B4-N002.gijinkoku-job-change",
    question: "技人国 転職 14日 届出",
    forbidden_hits: [
      "ssw-employment-contract-notification-14day-source",
      "ssw-org-notification-not-delegable-to-rso-source"
    ]
  },
  {
    id: "C3B4-N003.generic-support-plan",
    question: "介護事業所の支援計画を作りたい",
    forbidden_hits: [
      "ssw-support-plan-change-notification-14day-source",
      "ssw-support-implementation-difficulty-notification-source"
    ]
  },
  {
    id: "C3B4-N004.generic-sick-leave",
    question: "病気で1か月会社を休むと傷病手当は出ますか",
    forbid_any_batch4: true,
    forbidden_hits: [
      "ssw-acceptance-difficulty-one-month-inactivity-source",
      "ssw-acceptance-difficulty-notification-14day-source"
    ]
  },
  {
    id: "C3B4-N005.generic-missing-person",
    question: "家族が行方不明になったときの警察相談",
    forbid_any_batch4: true,
    forbidden_hits: [
      "ssw-acceptance-difficulty-missing-person-source"
    ]
  },
  {
    id: "C3B4-N006.generic-rso",
    question: "NPO法人の代表者変更登記をしたい",
    forbid_any_batch4: true,
    forbidden_hits: [
      "ssw-rso-registration-change-14day-source"
    ]
  },
  {
    id: "C3B4-N007.business-manager",
    question: "経営管理 会社を休業したら更新できますか",
    forbidden_hits: [
      "ssw-acceptance-difficulty-notification-14day-source",
      "ssw-acceptance-difficulty-one-month-inactivity-source"
    ]
  },
  {
    id: "C3B4-N008.generic-annual-report",
    question: "会社の年次報告書はいつ提出しますか",
    forbid_any_batch4: true,
    forbidden_hits: [
      "ssw-periodic-notification-integrated-annual-form-source"
    ]
  },
  {
    id: "C3B4-N009.generic-penalty",
    question: "届出を忘れたら罰則はありますか",
    forbid_any_batch4: true,
    forbidden_hits: [
      "ssw-notification-noncompliance-penalty-risk-source",
      "ssw-rso-notification-nonperformance-cancellation-risk-source"
    ]
  },
  {
    id: "C3B4-N010.batch1-family",
    question: "特定技能1号 配偶孩子 家族滞在",
    forbidden_hits: [
      "ssw-periodic-notification-integrated-annual-form-source",
      "ssw-support-plan-change-notification-14day-source"
    ]
  },
  {
    id: "C3B4-N011.batch2-wage",
    question: "特定技能 給料 日本人 同等 直接払い",
    forbidden_hits: [
      "ssw-standard-nonconformity-notification-14day-source",
      "ssw-notification-noncompliance-penalty-risk-source"
    ]
  },
  {
    id: "C3B4-N012.batch3-materials",
    question: "特定技能 更新 国民年金 書類",
    forbidden_hits: [
      "ssw-periodic-notification-integrated-annual-form-source",
      "ssw-rso-registration-change-14day-source"
    ]
  },
  {
    id: "C3B4-N013.hsp",
    question: "高度専門職の所属機関変更はどうしますか",
    forbidden_hits: [
      "ssw-employment-contract-notification-14day-source",
      "ssw-acceptance-difficulty-notification-14day-source"
    ]
  },
  {
    id: "C3B4-N014.generic-registration-renewal",
    question: "建設業許可の更新は何か月前からできますか",
    forbid_any_batch4: true,
    forbidden_hits: [
      "ssw-rso-renewal-window-source",
      "ssw-rso-renewal-lapse-no-support-source"
    ]
  }
]

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
  /source-anchor/i,
  /integration guardrail/i,
  /\bguardrail\b/i,
  /\bdeep_water_candidate\b/i,
  /\bpermission_boundary\b/i,
  /\brouting_boundary\b/i,
  /\beligibility_criterion\b/i,
  /\brisk_signal\b/i,
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
]

const ROOT = process.cwd()
const FACT_DIR = join(ROOT, 'docs', 'fact-cards')

function extractSection(body: string, h2: string, h3?: string): string {
  const lines = body.split('\n')
  const out: string[] = []
  let inH2 = false
  let inH3 = h3 ? false : true
  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+?)\s*$/)
    if (h2Match) {
      if (inH2) break
      inH2 = h2Match[1].trim() === h2
      inH3 = h3 ? false : true
      continue
    }
    if (!inH2) continue
    const h3Match = line.match(/^###\s+(.+?)\s*$/)
    if (h3Match) {
      if (h3 && inH3) break
      inH3 = h3 ? h3Match[1].trim() === h3 : true
      continue
    }
    if (inH3) out.push(line)
  }
  return out.join('\n').trim()
}

function extractFenced(section: string): string {
  const match = section.match(/```(?:text)?\n([\s\S]*?)\n```/)
  return match ? match[1].trim() : ''
}

function deriveKeywords(body: string): string[] {
  const section = extractSection(body, 'common_user_phrases')
  const out = new Set<string>()
  for (const line of section.split('\n')) {
    const match = line.match(/^-\s+(.+?)\s*$/)
    if (!match) continue
    for (const part of match[1].split(/\s*[/／]\s*/)) {
      const cleaned = part
        .replace(/\s*[（(].*?[)）]\s*$/, '')
        .replace(/^[「『]|[」』]$/g, '')
        .trim()
      if (cleaned.length > 0) out.add(cleaned)
    }
  }
  return Array.from(out)
}

function loadCards(): DiskCard[] {
  return readdirSync(FACT_DIR)
    .filter(name => name.endsWith('.md'))
    .map(file => {
      const raw = readFileSync(join(FACT_DIR, file), 'utf8')
      const parsed = matter(raw)
      const fm = parsed.data as Record<string, unknown>
      return {
        factId: String(fm.fact_id ?? ''),
        title: String(fm.title ?? ''),
        state: String(fm.state ?? ''),
        sprint: String(fm.sprint ?? ''),
        triggerKeywords: deriveKeywords(parsed.content),
        injectionCertainBlock: extractFenced(extractSection(parsed.content, 'injection_format', 'injection_certain_block')),
        injectionNeedsReviewAddendum: extractFenced(extractSection(parsed.content, 'injection_format', 'injection_needs_review_addendum')),
        evidencePoints: evidencePointValue(fm.evidence_points),
        frontmatter: fm,
      }
    })
}

function gateDecision(card: DiskCard): Decision {
  if (card.state === 'ai_verified' || card.state === 'human_reviewed') {
    return card.injectionCertainBlock.trim().length > 0 ? 'inject' : 'hint_only'
  }
  return 'drop'
}

function topPredictions(question: string, cards: DiskCard[]): Prediction[] {
  const q = question.toLowerCase()
  return cards
    .map(card => {
      const matched = card.triggerKeywords.filter(keyword => q.includes(keyword.toLowerCase()))
      const score = matched.reduce((sum, keyword) => sum + Math.max(1, Math.min(10, keyword.length)), 0)
      return { fact_id: card.factId, decision: gateDecision(card), score }
    })
    .filter(prediction => prediction.score > 0)
    .sort((a, b) => b.score - a.score || a.fact_id.localeCompare(b.fact_id))
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

function evidencePointValue(value: unknown): ReadonlyArray<{ display_label?: string; claim?: string; source_url?: string }> {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object' && !Array.isArray(item))
    .map(item => ({
      display_label: stringValue(item.display_label),
      claim: stringValue(item.claim),
      source_url: stringValue(item.source_url),
    }))
}

function sourceUrlValue(card: DiskCard): string[] {
  const sources = card.frontmatter.official_sources
  const officialSourceUrls = Array.isArray(sources) ? sources
    .filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object' && !Array.isArray(item))
    .map(item => stringValue(item.url))
    .filter(Boolean) : []
  const evidenceSourceUrls = card.evidencePoints
    .map(point => point.source_url ?? '')
    .filter(Boolean)
  return [...officialSourceUrls, ...evidenceSourceUrls]
}

const cards = loadCards()
const batchCards = cards.filter(card => BATCH4_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH4_IDS.size, 'all P1 Cycle 3 Batch 4 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 3 \/ Batch 4/, `${card.factId} sprint should identify P1 Cycle 3 Batch 4`)
  assert.equal(card.frontmatter.last_verified_at, '2026-05-13', `${card.factId} last_verified_at should match Batch 4 source check date`)
  assert.ok(card.triggerKeywords.length >= 5, `${card.factId} should have matcher phrases`)
  assert.ok(card.evidencePoints.length > 0 && card.evidencePoints.length <= 4, `${card.factId} should keep evidence points compact`)
  for (const url of sourceUrlValue(card)) {
    assert.match(url, /^https:\/\/(www\.moj\.go\.jp\/isa\/|www\.moj\.go\.jp\/isa\/|laws\.e-gov\.go\.jp\/law\/)/, `${card.factId} source URL must be official`)
  }
  const visibleText = userVisibleText(card)
  for (const pattern of USER_VISIBLE_LEAK_PATTERNS) {
    assert.equal(pattern.test(visibleText), false, `${card.factId} user-visible fields leak ${pattern}`)
  }
}

for (const fixture of POSITIVE_FIXTURES) {
  const top = topPredictions(fixture.question, batchCards)[0]
  assert.ok(top, `${fixture.id} should produce at least one hit`)
  assert.equal(top.fact_id, fixture.expected_primary_hit, `${fixture.id} expected top hit ${fixture.expected_primary_hit}`)
  assert.equal(top.decision, 'drop', `${fixture.id} expected production drop for ai_extracted card`)

  const productionHits = topPredictions(fixture.question, cards)
    .filter(prediction => prediction.decision !== 'drop')
  for (const prediction of productionHits) {
    assert.equal(BATCH4_IDS.has(prediction.fact_id), false, `${fixture.id} must not include Batch 4 cards in production predictions`)
  }
}

for (const fixture of BROAD_NEGATIVE_FIXTURES) {
  const hitIds = new Set(topPredictions(fixture.question, batchCards).map(prediction => prediction.fact_id))
  if (fixture.forbid_any_batch4) {
    assert.equal(hitIds.size, 0, `${fixture.id} must not hit any Batch 4 card`)
  }
  for (const forbidden of fixture.forbidden_hits ?? []) {
    assert.equal(hitIds.has(forbidden), false, `${fixture.id} must not over-hit ${forbidden}`)
  }
}

console.log(`P1 Cycle 3 Batch 4 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
