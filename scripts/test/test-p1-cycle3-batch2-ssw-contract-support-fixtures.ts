/**
 * Legal Source Engineering — P1 Cycle 3 Batch 2 dry-run fixtures.
 *
 * Scope:
 *   - 特定技能雇用契約, accepting organization, dispatch, remuneration, and 1号 support-plan boundaries.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle3-batch2-ssw-contract-support-fixtures.ts
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

const BATCH2_IDS = new Set([
  "ssw-contract-labor-law-compliance-source",
  "ssw-contract-field-work-scope-source",
  "ssw-contract-working-hours-equal-source",
  "ssw-contract-remuneration-japanese-equal-source",
  "ssw-contract-no-discriminatory-treatment-source",
  "ssw-contract-temporary-return-paid-leave-source",
  "ssw-contract-dispatch-destination-period-source",
  "ssw-contract-return-travel-support-source",
  "ssw-org-labor-social-tax-compliance-source",
  "ssw-org-no-recent-same-work-layoff-source",
  "ssw-org-no-missing-foreigner-source",
  "ssw-no-deposit-penalty-contract-source",
  "ssw1-support-cost-not-borne-by-foreigner-source",
  "ssw-dispatch-organization-criteria-source",
  "ssw-wage-payment-bank-verifiable-source",
  "ssw1-support-plan-ten-supports-source",
  "ssw1-support-plan-language-copy-source",
  "ssw1-support-plan-registered-support-org-delegation-source",
  "ssw1-support-plan-partial-delegation-scope-source",
  "ssw1-support-neutral-regular-interview-source",
  "ssw-contract-health-life-status-monitoring-source",
  "ssw-organization-activity-document-retention-source",
  "ssw-organization-workers-comp-insurance-source",
  "ssw1-support-plan-key-support-understandable-language-source"
])

const POSITIVE_FIXTURES: Fixture[] = [
  {
    "id": "C3B2-001",
    "question": "特定技能 雇用契約 労働法",
    "expected_primary_hit": "ssw-contract-labor-law-compliance-source"
  },
  {
    "id": "C3B2-002",
    "question": "特定技能 契約 業務範囲",
    "expected_primary_hit": "ssw-contract-field-work-scope-source"
  },
  {
    "id": "C3B2-003",
    "question": "特定技能 パート 勤務",
    "expected_primary_hit": "ssw-contract-working-hours-equal-source"
  },
  {
    "id": "C3B2-004",
    "question": "特定技能 給料 日本人 同等",
    "expected_primary_hit": "ssw-contract-remuneration-japanese-equal-source"
  },
  {
    "id": "C3B2-005",
    "question": "特定技能 福利厚生 差別",
    "expected_primary_hit": "ssw-contract-no-discriminatory-treatment-source"
  },
  {
    "id": "C3B2-006",
    "question": "特定技能 一時帰国 有給",
    "expected_primary_hit": "ssw-contract-temporary-return-paid-leave-source"
  },
  {
    "id": "C3B2-007",
    "question": "特定技能 派遣先 期間",
    "expected_primary_hit": "ssw-contract-dispatch-destination-period-source"
  },
  {
    "id": "C3B2-008",
    "question": "特定技能 帰国費用 会社",
    "expected_primary_hit": "ssw-contract-return-travel-support-source"
  },
  {
    "id": "C3B2-009",
    "question": "特定技能 会社 社会保険",
    "expected_primary_hit": "ssw-org-labor-social-tax-compliance-source"
  },
  {
    "id": "C3B2-010",
    "question": "特定技能 日本人 辞めさせる",
    "expected_primary_hit": "ssw-org-no-recent-same-work-layoff-source"
  },
  {
    "id": "C3B2-011",
    "question": "特定技能 失踪者 出した 会社",
    "expected_primary_hit": "ssw-org-no-missing-foreigner-source"
  },
  {
    "id": "C3B2-012",
    "question": "特定技能 保証金",
    "expected_primary_hit": "ssw-no-deposit-penalty-contract-source"
  },
  {
    "id": "C3B2-013",
    "question": "特定技能 支援費用 本人負担",
    "expected_primary_hit": "ssw1-support-cost-not-borne-by-foreigner-source"
  },
  {
    "id": "C3B2-014",
    "question": "特定技能 派遣会社 条件",
    "expected_primary_hit": "ssw-dispatch-organization-criteria-source"
  },
  {
    "id": "C3B2-015",
    "question": "特定技能 給料 現金払い",
    "expected_primary_hit": "ssw-wage-payment-bank-verifiable-source"
  },
  {
    "id": "C3B2-016",
    "question": "特定技能1号 支援計画 内容",
    "expected_primary_hit": "ssw1-support-plan-ten-supports-source"
  },
  {
    "id": "C3B2-017",
    "question": "特定技能 支援計画 母国語",
    "expected_primary_hit": "ssw1-support-plan-language-copy-source"
  },
  {
    "id": "C3B2-018",
    "question": "特定技能 登録支援機関 全部委託",
    "expected_primary_hit": "ssw1-support-plan-registered-support-org-delegation-source"
  },
  {
    "id": "C3B2-019",
    "question": "特定技能 支援 一部委託",
    "expected_primary_hit": "ssw1-support-plan-partial-delegation-scope-source"
  },
  {
    "id": "C3B2-020",
    "question": "特定技能 支援担当者 上司",
    "expected_primary_hit": "ssw1-support-neutral-regular-interview-source"
  },
  {
    "id": "C3B2-021",
    "question": "特定技能 健康状況 把握",
    "expected_primary_hit": "ssw-contract-health-life-status-monitoring-source"
  },
  {
    "id": "C3B2-022",
    "question": "特定技能 活動内容 文書",
    "expected_primary_hit": "ssw-organization-activity-document-retention-source"
  },
  {
    "id": "C3B2-023",
    "question": "特定技能 労災保険",
    "expected_primary_hit": "ssw-organization-workers-comp-insurance-source"
  },
  {
    "id": "C3B2-024",
    "question": "特定技能 支援 日本語だけ",
    "expected_primary_hit": "ssw1-support-plan-key-support-understandable-language-source"
  },
  {
    "id": "C3B2-025.natural-dispatch-field",
    "question": "特定技能 介護 外食 派遣",
    "expected_primary_hit": "ssw-dispatch-organization-criteria-source"
  },
  {
    "id": "C3B2-026.natural-support-delegation",
    "question": "登録支援機関 全部委託 会社 何もしない",
    "expected_primary_hit": "ssw1-support-plan-registered-support-org-delegation-source"
  }
]

const BROAD_NEGATIVE_FIXTURES = [
  {
    "id": "C3B2-N001.generic-labor",
    "question": "普通の会社で残業代が未払いです",
    "forbidden_hits": [
      "ssw-contract-labor-law-compliance-source",
      "ssw-contract-remuneration-japanese-equal-source",
      "ssw-wage-payment-bank-verifiable-source"
    ]
  },
  {
    "id": "C3B2-N002.generic-social-tax",
    "question": "社会保険と住民税の支払い方法を知りたい",
    "forbidden_hits": [
      "ssw-org-labor-social-tax-compliance-source"
    ]
  },
  {
    "id": "C3B2-N003.ordinary-paid-leave",
    "question": "有給休暇を何日取れるか一般的に知りたい",
    "forbidden_hits": [
      "ssw-contract-temporary-return-paid-leave-source"
    ]
  },
  {
    "id": "C3B2-N004.gijinkoku-dispatch",
    "question": "技人国 派遣会社で働けますか",
    "forbidden_hits": [
      "ssw-contract-dispatch-destination-period-source",
      "ssw-dispatch-organization-criteria-source"
    ]
  },
  {
    "id": "C3B2-N005.generic-dependent-support",
    "question": "家族滞在 扶養者の収入証明が必要ですか",
    "forbidden_hits": [
      "ssw1-support-cost-not-borne-by-foreigner-source",
      "ssw1-support-plan-ten-supports-source"
    ]
  },
  {
    "id": "C3B2-N006.hsp-support",
    "question": "高度専門職 家族 特例 支援",
    "forbidden_hits": [
      "ssw1-support-plan-registered-support-org-delegation-source",
      "ssw1-support-neutral-regular-interview-source"
    ]
  },
  {
    "id": "C3B2-N007.jfind",
    "question": "J-Find 就職活動 起業準備",
    "forbidden_hits": [
      "ssw-contract-field-work-scope-source",
      "ssw-contract-working-hours-equal-source"
    ]
  },
  {
    "id": "C3B2-N008.business-manager",
    "question": "経営管理 3000万円 常勤職員",
    "forbidden_hits": [
      "ssw-org-labor-social-tax-compliance-source",
      "ssw-org-no-recent-same-work-layoff-source"
    ]
  },
  {
    "id": "C3B2-N009.batch1-period",
    "question": "特定技能1号 4年半 续多久",
    "forbidden_hits": [
      "ssw-contract-working-hours-equal-source",
      "ssw1-support-plan-ten-supports-source"
    ]
  },
  {
    "id": "C3B2-N010.batch1-family",
    "question": "特定技能1号 配偶孩子 家族滞在",
    "forbidden_hits": [
      "ssw1-support-cost-not-borne-by-foreigner-source",
      "ssw1-support-plan-language-copy-source"
    ]
  },
  {
    "id": "C3B2-N011.generic-bank-account",
    "question": "外国人が銀行口座を作る方法",
    "forbidden_hits": [
      "ssw-wage-payment-bank-verifiable-source"
    ]
  },
  {
    "id": "C3B2-N012.general-contract-penalty",
    "question": "賃貸契約の違約金について知りたい",
    "forbidden_hits": [
      "ssw-no-deposit-penalty-contract-source"
    ]
  },
  {
    "id": "C3B2-N013.online-application",
    "question": "オンライン申請 在留期間更新 使い方",
    "forbidden_hits": [
      "ssw1-support-plan-registered-support-org-delegation-source"
    ]
  },
  {
    "id": "C3B2-N014.technical-intern-training",
    "question": "技能実習 監理団体 支援計画",
    "forbidden_hits": [
      "ssw1-support-plan-ten-supports-source",
      "ssw1-support-neutral-regular-interview-source"
    ]
  },
  {
    "id": "C3B2-N015.student-work",
    "question": "留学生 週28時間 アルバイト",
    "forbidden_hits": [
      "ssw-contract-working-hours-equal-source"
    ]
  },
  {
    "id": "C3B2-N016.generic-salary",
    "question": "日本の最低賃金はいくらですか",
    "forbidden_hits": [
      "ssw-contract-remuneration-japanese-equal-source",
      "ssw-wage-payment-bank-verifiable-source"
    ]
  },
  {
    "id": "C3B2-N017.generic-health",
    "question": "健康保険証をなくしたときの再発行",
    "forbidden_hits": [
      "ssw-contract-health-life-status-monitoring-source"
    ]
  },
  {
    "id": "C3B2-N018.generic-workers-comp",
    "question": "労災保険の給付申請をしたい",
    "forbidden_hits": [
      "ssw-organization-workers-comp-insurance-source"
    ]
  },
  {
    "id": "C3B2-N019.generic-japanese-study",
    "question": "日本語学校で会話練習したい",
    "forbidden_hits": [
      "ssw1-support-plan-key-support-understandable-language-source"
    ]
  },
  {
    "id": "C3B2-N020.generic-document-retention",
    "question": "会社の領収書は何年保存しますか",
    "forbidden_hits": [
      "ssw-organization-activity-document-retention-source"
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
const batchCards = cards.filter(card => BATCH2_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH2_IDS.size, 'all P1 Cycle 3 Batch 2 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 3 \/ Batch 2/, `${card.factId} sprint should identify P1 Cycle 3 Batch 2`)
  assert.ok(card.triggerKeywords.length >= 5, `${card.factId} should have matcher phrases`)
  assert.ok(card.evidencePoints.length > 0 && card.evidencePoints.length <= 4, `${card.factId} should keep evidence points compact`)
  for (const url of sourceUrlValue(card)) {
    assert.match(url, /^https:\/\/(www\.moj\.go\.jp\/isa\/|laws\.e-gov\.go\.jp\/law\/)/, `${card.factId} source URL must be official`)
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
    assert.equal(BATCH2_IDS.has(prediction.fact_id), false, `${fixture.id} must not include Batch 2 cards in production predictions`)
  }
}

for (const fixture of BROAD_NEGATIVE_FIXTURES) {
  const hitIds = new Set(topPredictions(fixture.question, batchCards).map(prediction => prediction.fact_id))
  for (const forbidden of fixture.forbidden_hits) {
    assert.equal(hitIds.has(forbidden), false, `${fixture.id} must not over-hit ${forbidden}`)
  }
}

console.log(`P1 Cycle 3 Batch 2 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
