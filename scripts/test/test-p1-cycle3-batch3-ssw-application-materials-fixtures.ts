/**
 * Legal Source Engineering — P1 Cycle 3 Batch 3 dry-run fixtures.
 *
 * Scope:
 *   - 特定技能 certificate/change/renewal material-table structure.
 *   - Applicant tax/social-insurance/pension materials and field-table boundaries.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle3-batch3-ssw-application-materials-fixtures.ts
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

const BATCH3_IDS = new Set([
  "ssw-certificate-application-table-structure-source",
  "ssw-change-application-table-structure-source",
  "ssw-renewal-application-table2-not-required-source",
  "ssw-renewal-field-table-three-way-source",
  "ssw1-certificate-change-table1-support-plan-required-source",
  "ssw2-certificate-change-table1-support-plan-not-listed-source",
  "ssw-table1-employment-contract-required-source",
  "ssw-table1-employment-conditions-language-source",
  "ssw-table1-health-check-required-source",
  "ssw-table1-remuneration-explanation-conditional-source",
  "ssw-change-applicant-tax-docs-conditional-source",
  "ssw-renewal-applicant-tax-docs-conditional-source",
  "ssw-applicant-national-health-insurance-conditional-source",
  "ssw-applicant-national-pension-conditional-source",
  "ssw-public-obligation-pledge-arrears-source",
  "ssw-field-docs-council-membership-source",
  "ssw-agriculture-fishery-employment-type-table-source",
  "ssw-submitter-identity-proof-source",
  "ssw-change-renewal-materials-not-permission-guarantee-source"
])

const POSITIVE_FIXTURES: Fixture[] = [
  {
    id: "C3B3-001",
    question: "特定技能 認定 第1表 第2表 第3表",
    expected_primary_hit: "ssw-certificate-application-table-structure-source"
  },
  {
    id: "C3B3-002",
    question: "特定技能 変更 第1表 第2表 第3表",
    expected_primary_hit: "ssw-change-application-table-structure-source"
  },
  {
    id: "C3B3-003",
    question: "特定技能 更新 第2表 不要",
    expected_primary_hit: "ssw-renewal-application-table2-not-required-source"
  },
  {
    id: "C3B3-004",
    question: "特定技能 更新 分野 書類 農業 漁業",
    expected_primary_hit: "ssw-renewal-field-table-three-way-source"
  },
  {
    id: "C3B3-005",
    question: "特定技能1号 支援計画書 認定 変更",
    expected_primary_hit: "ssw1-certificate-change-table1-support-plan-required-source"
  },
  {
    id: "C3B3-006",
    question: "特定技能2号 支援計画書 必要",
    expected_primary_hit: "ssw2-certificate-change-table1-support-plan-not-listed-source"
  },
  {
    id: "C3B3-007",
    question: "特定技能 雇用契約書 写し 必要",
    expected_primary_hit: "ssw-table1-employment-contract-required-source"
  },
  {
    id: "C3B3-008",
    question: "特定技能 雇用条件書 理解できる言語",
    expected_primary_hit: "ssw-table1-employment-conditions-language-source"
  },
  {
    id: "C3B3-009",
    question: "特定技能 健康診断 個人票",
    expected_primary_hit: "ssw-table1-health-check-required-source"
  },
  {
    id: "C3B3-010",
    question: "特定技能 報酬説明書 必要",
    expected_primary_hit: "ssw-table1-remuneration-explanation-conditional-source"
  },
  {
    id: "C3B3-011",
    question: "特定技能 変更 住民税 納税証明書",
    expected_primary_hit: "ssw-change-applicant-tax-docs-conditional-source"
  },
  {
    id: "C3B3-012",
    question: "特定技能 更新 住民税 納税証明書",
    expected_primary_hit: "ssw-renewal-applicant-tax-docs-conditional-source"
  },
  {
    id: "C3B3-013",
    question: "特定技能 更新 国民健康保険 書類",
    expected_primary_hit: "ssw-applicant-national-health-insurance-conditional-source"
  },
  {
    id: "C3B3-014",
    question: "特定技能 更新 国民年金 書類",
    expected_primary_hit: "ssw-applicant-national-pension-conditional-source"
  },
  {
    id: "C3B3-015",
    question: "特定技能 更新 滞納 誓約書",
    expected_primary_hit: "ssw-public-obligation-pledge-arrears-source"
  },
  {
    id: "C3B3-016",
    question: "特定技能 協議会 構成員 証明書",
    expected_primary_hit: "ssw-field-docs-council-membership-source"
  },
  {
    id: "C3B3-017",
    question: "特定技能 農業 直接雇用 派遣 書類",
    expected_primary_hit: "ssw-agriculture-fishery-employment-type-table-source"
  },
  {
    id: "C3B3-018",
    question: "特定技能 本人以外 提出 身分証明",
    expected_primary_hit: "ssw-submitter-identity-proof-source"
  },
  {
    id: "C3B3-019",
    question: "特定技能 書類 全部そろえたら 許可",
    expected_primary_hit: "ssw-change-renewal-materials-not-permission-guarantee-source"
  },
  {
    id: "C3B3-020",
    question: "特定技能 更新 第2表不要 会社 審査",
    expected_primary_hit: "ssw-renewal-application-table2-not-required-source"
  },
  {
    id: "C3B3-021",
    question: "滞納があっても特定技能更新で誓約書を出せば更新できますか",
    expected_primary_hit: "ssw-public-obligation-pledge-arrears-source"
  },
  {
    id: "C3B3-022",
    question: "特定技能 介護 協議会 外食 使える",
    expected_primary_hit: "ssw-field-docs-council-membership-source"
  },
  {
    id: "C3B3-023",
    question: "特定技能 续签 材料齐全 必过",
    expected_primary_hit: "ssw-change-renewal-materials-not-permission-guarantee-source"
  }
]

const BROAD_NEGATIVE_FIXTURES = [
  {
    id: "C3B3-N001.generic-tax",
    question: "住民税の納税証明書はどこで取れますか",
    forbidden_hits: [
      "ssw-change-applicant-tax-docs-conditional-source",
      "ssw-renewal-applicant-tax-docs-conditional-source"
    ]
  },
  {
    id: "C3B3-N002.generic-pension",
    question: "国民年金の支払い方法を知りたい",
    forbidden_hits: [
      "ssw-applicant-national-pension-conditional-source"
    ]
  },
  {
    id: "C3B3-N003.generic-health-insurance",
    question: "国民健康保険に加入するにはどうしますか",
    forbidden_hits: [
      "ssw-applicant-national-health-insurance-conditional-source"
    ]
  },
  {
    id: "C3B3-N004.gijinkoku-renewal",
    question: "技人国 更新 住民税 納税証明書",
    forbidden_hits: [
      "ssw-renewal-applicant-tax-docs-conditional-source",
      "ssw-renewal-application-table2-not-required-source"
    ]
  },
  {
    id: "C3B3-N005.business-manager-contract",
    question: "経営管理 役員報酬 契約書",
    forbidden_hits: [
      "ssw-table1-employment-contract-required-source",
      "ssw-table1-remuneration-explanation-conditional-source"
    ]
  },
  {
    id: "C3B3-N006.dependent-submit",
    question: "家族滞在の申請を配偶者が提出できますか",
    forbidden_hits: [
      "ssw-submitter-identity-proof-source"
    ]
  },
  {
    id: "C3B3-N007.generic-medical",
    question: "健康診断の結果が悪いと会社に言われました",
    forbidden_hits: [
      "ssw-table1-health-check-required-source"
    ]
  },
  {
    id: "C3B3-N008.general-translation",
    question: "雇用契約書を中国語に翻訳したい",
    forbidden_hits: [
      "ssw-table1-employment-conditions-language-source"
    ]
  },
  {
    id: "C3B3-N009.generic-agriculture",
    question: "農業の派遣求人を探しています",
    forbidden_hits: [
      "ssw-agriculture-fishery-employment-type-table-source"
    ]
  },
  {
    id: "C3B3-N010.spouse-application",
    question: "日本人配偶者ビザの在留資格認定証明書の書類",
    forbidden_hits: [
      "ssw-certificate-application-table-structure-source"
    ]
  },
  {
    id: "C3B3-N011.batch1-family",
    question: "特定技能1号 配偶孩子 家族滞在",
    forbidden_hits: [
      "ssw1-certificate-change-table1-support-plan-required-source",
      "ssw2-certificate-change-table1-support-plan-not-listed-source"
    ]
  },
  {
    id: "C3B3-N012.batch2-support",
    question: "特定技能 支援担当者 上司",
    forbidden_hits: [
      "ssw1-certificate-change-table1-support-plan-required-source"
    ]
  },
  {
    id: "C3B3-N013.employee-pension",
    question: "特定技能更新 厚生年金なのに国民年金領収書が必要ですか",
    forbidden_hits: [
      "ssw-applicant-national-pension-conditional-source"
    ]
  },
  {
    id: "C3B3-N014.employee-health-insurance",
    question: "特定技能更新 会社の健康保険証をなくした",
    forbidden_hits: [
      "ssw-applicant-national-health-insurance-conditional-source"
    ]
  },
  {
    id: "C3B3-N015.industry-council-only",
    question: "宿泊業の協議会に入会する方法だけ知りたい",
    forbidden_hits: [
      "ssw-field-docs-council-membership-source"
    ]
  },
  {
    id: "C3B3-N016.coe-guarantee-overreach",
    question: "特定技能 認定証明書 写真 書類だけ出せば絶対通りますか",
    forbidden_hits: [
      "ssw-certificate-application-table-structure-source",
      "ssw-table1-health-check-required-source"
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
const batchCards = cards.filter(card => BATCH3_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH3_IDS.size, 'all P1 Cycle 3 Batch 3 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 3 \/ Batch 3/, `${card.factId} sprint should identify P1 Cycle 3 Batch 3`)
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
    assert.equal(BATCH3_IDS.has(prediction.fact_id), false, `${fixture.id} must not include Batch 3 cards in production predictions`)
  }
}

for (const fixture of BROAD_NEGATIVE_FIXTURES) {
  const hitIds = new Set(topPredictions(fixture.question, batchCards).map(prediction => prediction.fact_id))
  for (const forbidden of fixture.forbidden_hits) {
    assert.equal(hitIds.has(forbidden), false, `${fixture.id} must not over-hit ${forbidden}`)
  }
}

console.log(`P1 Cycle 3 Batch 3 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
