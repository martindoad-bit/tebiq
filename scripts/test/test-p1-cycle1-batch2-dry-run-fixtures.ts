/**
 * Legal Source Engineering — P1 Cycle 1 Batch 2 dry-run fixtures.
 *
 * Scope:
 *   - 特定活動46号 source-layer atoms.
 *   - Graduate job-hunting / job-offer waiting / graduate startup routers.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle1-batch2-dry-run-fixtures.ts
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
  evidencePoints: ReadonlyArray<{ display_label?: string; claim?: string }>
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
  'designated-activities-46-notice-source-anchor',
  'designated-activities-46-education-scope',
  'designated-activities-46-foreign-university-exclusion',
  'designated-activities-46-japanese-ability-n1-bjt480',
  'designated-activities-46-communication-work-boundary',
  'designated-activities-46-learning-outcome-work-boundary',
  'designated-activities-46-gijinkoku-service-manufacturing-boundary',
  'designated-activities-46-prohibited-activities',
  'designated-activities-46-designated-institution-job-change',
  'designated-activities-46-full-time-no-parttime-dispatch',
  'designated-activities-46-equal-remuneration',
  'designated-activities-46-family-spouse-child-route',
  'graduate-job-search-first-year-six-month-renew-once',
  'graduate-job-search-second-year-local-government-support',
  'graduate-job-search-japanese-language-school-overseas-grad',
  'graduate-job-search-qoa-28hour-internship',
  'job-offer-waiting-requirements',
  'graduate-startup-activity-two-route-router',
])

const POSITIVE_FIXTURES: Fixture[] = [
  ['B2-001', '特定活動46号 根拠 告示第46号', 'designated-activities-46-notice-source-anchor'],
  ['B2-002', '特定活動46号 学歴 認定専修学校', 'designated-activities-46-education-scope'],
  ['B2-003', '外国大学 特定活動46号 海外大学', 'designated-activities-46-foreign-university-exclusion'],
  ['B2-004', '特定活動46号 N2 BJT480', 'designated-activities-46-japanese-ability-n1-bjt480'],
  ['B2-005', '特定活動46号 接客 日本語を用いた円滑な意思疎通', 'designated-activities-46-communication-work-boundary'],
  ['B2-006', '46号 単純作業 学修成果', 'designated-activities-46-learning-outcome-work-boundary'],
  ['B2-007', '46号 技人国 違い 製造業', 'designated-activities-46-gijinkoku-service-manufacturing-boundary'],
  ['B2-008', '46号 風俗 禁止業務', 'designated-activities-46-prohibited-activities'],
  ['B2-009', '特定活動46号 転職 指定書', 'designated-activities-46-designated-institution-job-change'],
  ['B2-010', '46号 アルバイト 派遣 フルタイム', 'designated-activities-46-full-time-no-parttime-dispatch'],
  ['B2-011', '46号 給料 日本人同等額', 'designated-activities-46-equal-remuneration'],
  ['B2-012', '特定活動46号 配偶者 子供 帯同', 'designated-activities-46-family-spouse-child-route'],
  ['B2-013', '卒業後 就職活動 6月 更新一回', 'graduate-job-search-first-year-six-month-renew-once'],
  ['B2-014', '卒業後 2年目 地方公共団体 就職支援', 'graduate-job-search-second-year-local-government-support'],
  ['B2-015', '日本語学校 卒業後 就職活動 海外大学卒', 'graduate-job-search-japanese-language-school-overseas-grad'],
  ['B2-016', '就職活動 特定活動 アルバイト 28時間', 'graduate-job-search-qoa-28hour-internship'],
  ['B2-017', '内定後 採用まで 特定活動 卒業後1年6月', 'job-offer-waiting-requirements'],
  ['B2-018', '卒業後 起業活動 特定活動 2ルート', 'graduate-startup-activity-two-route-router'],
].map(([id, question, expected_primary_hit]) => ({ id, question, expected_primary_hit }))

const BROAD_NEGATIVE_FIXTURES = [
  {
    id: 'B2-N001.gijinkoku-job-change',
    question: '技人国を辞めて次の会社に転職します。14日届出は必要ですか。',
    forbidden_hits: [
      'designated-activities-46-designated-institution-job-change',
      'graduate-job-search-first-year-six-month-renew-once',
    ],
  },
  {
    id: 'B2-N002.normal-student-work',
    question: '留学中のアルバイトは週28時間までですか。',
    forbidden_hits: [
      'graduate-job-search-qoa-28hour-internship',
    ],
  },
  {
    id: 'B2-N003.keiei-startup',
    question: '経営管理ビザで会社を作るには資本金が必要ですか。',
    forbidden_hits: [
      'graduate-startup-activity-two-route-router',
    ],
  },
  {
    id: 'B2-N004.service-work-gijinkoku',
    question: '技人国でホテルの通訳と予約管理をします。',
    forbidden_hits: [
      'designated-activities-46-gijinkoku-service-manufacturing-boundary',
    ],
  },
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

function evidencePointValue(value: unknown): ReadonlyArray<{ display_label?: string; claim?: string }> {
  if (!Array.isArray(value)) return []
  return value
    .filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object' && !Array.isArray(item))
    .map(item => ({
      display_label: stringValue(item.display_label),
      claim: stringValue(item.claim),
    }))
}

const cards = loadCards()
const batchCards = cards.filter(card => BATCH2_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH2_IDS.size, 'all P1 Cycle 1 Batch 2 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 1 \/ Batch 2/, `${card.factId} sprint should identify P1 Cycle 1 Batch 2`)
  assert.ok(card.triggerKeywords.length >= 5, `${card.factId} should have matcher phrases`)
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
}

for (const fixture of BROAD_NEGATIVE_FIXTURES) {
  const hitIds = new Set(topPredictions(fixture.question, batchCards).map(prediction => prediction.fact_id))
  for (const forbidden of fixture.forbidden_hits) {
    assert.equal(hitIds.has(forbidden), false, `${fixture.id} must not over-hit ${forbidden}`)
  }
}

console.log(`P1 Cycle 1 Batch 2 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
