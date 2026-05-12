/**
 * Legal Source Engineering — P1 Cycle 1 Batch 3 dry-run fixtures.
 *
 * Scope:
 *   - Digital Nomad / J-Find / 日系四世 / 特定技能関係特定活動.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle1-batch3-dry-run-fixtures.ts
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

const BATCH3_IDS = new Set([
  'digital-nomad-notice53-activity-scope',
  'digital-nomad-domestic-employment-qoa-exclusion',
  'digital-nomad-six-month-country-income-insurance',
  'digital-nomad-family-notice54-boundary',
  'j-find-two-year-job-startup-scope',
  'j-find-target-university-ranking',
  'j-find-degree-five-year-window',
  'j-find-savings-200-thousand-requirement',
  'j-find-family-notice52-router',
  'nikkei-fourth-purpose-five-year-framework',
  'nikkei-fourth-activity-paid-work-boundary',
  'nikkei-fourth-age-conduct-language-requirements',
  'nikkei-fourth-supporter-three-year-requirement',
  'ssw1-prep-six-month-work-possible',
  'ssw1-prep-receiving-institution-change-and-renewal-limit',
  'ssw1-prep-five-year-count-boundary',
  'ssw2-prep-six-month-skill-exam-required',
  'ssw-employment-continuity-support-unavoidable-router',
  'ssw-automobile-transport-prep-license-training',
])

const POSITIVE_FIXTURES: Fixture[] = [
  ['B3-001', 'デジタルノマド 特定活動 告示53号', 'digital-nomad-notice53-activity-scope'],
  ['B3-002', 'デジタルノマド 日本企業 就職', 'digital-nomad-domestic-employment-qoa-exclusion'],
  ['B3-003', 'デジタルノマド 年収 1000万円', 'digital-nomad-six-month-country-income-insurance'],
  ['B3-004', 'デジタルノマド 配偶者 子供', 'digital-nomad-family-notice54-boundary'],
  ['B3-005', 'J-Find 就職活動 起業準備', 'j-find-two-year-job-startup-scope'],
  ['B3-006', 'J-Find 大学ランキング', 'j-find-target-university-ranking'],
  ['B3-007', 'J-Find 卒業後 5年', 'j-find-degree-five-year-window'],
  ['B3-008', 'J-Find 20万円', 'j-find-savings-200-thousand-requirement'],
  ['B3-009', 'J-Find 配偶者 子供', 'j-find-family-notice52-router'],
  ['B3-010', '日系四世 最長5年', 'nikkei-fourth-purpose-five-year-framework'],
  ['B3-011', '日系四世 働ける', 'nikkei-fourth-activity-paid-work-boundary'],
  ['B3-012', '日系4世 日本語 N4', 'nikkei-fourth-age-conduct-language-requirements'],
  ['B3-013', '日系四世 サポーター', 'nikkei-fourth-supporter-three-year-requirement'],
  ['B3-014', '特定技能1号 準備 特定活動 6月', 'ssw1-prep-six-month-work-possible'],
  ['B3-015', '特定技能準備 受入機関 変更', 'ssw1-prep-receiving-institution-change-and-renewal-limit'],
  ['B3-016', '特定技能準備 通算5年', 'ssw1-prep-five-year-count-boundary'],
  ['B3-017', '特定技能2号 準備 特定活動', 'ssw2-prep-six-month-skill-exam-required'],
  ['B3-018', '就労継続支援 特定活動', 'ssw-employment-continuity-support-unavoidable-router'],
  ['B3-019', '自動車運送業 特定技能 準備', 'ssw-automobile-transport-prep-license-training'],
].map(([id, question, expected_primary_hit]) => ({ id, question, expected_primary_hit }))

const BROAD_NEGATIVE_FIXTURES = [
  {
    id: 'B3-N001.normal-remote-work',
    question: '日本に旅行中、会社のSlackを少し確認してもいいですか。',
    forbidden_hits: ['digital-nomad-notice53-activity-scope'],
  },
  {
    id: 'B3-N002.japanese-university-job-hunt',
    question: '日本の大学を卒業後、まだ就職先がありません。',
    forbidden_hits: ['j-find-two-year-job-startup-scope'],
  },
  {
    id: 'B3-N003.nikkei-third-generation',
    question: '日系3世として定住者ビザを申請したいです。',
    forbidden_hits: ['nikkei-fourth-purpose-five-year-framework'],
  },
  {
    id: 'B3-N004.normal-ssw-renewal',
    question: '特定技能1号の更新書類を知りたいです。',
    forbidden_hits: ['ssw1-prep-six-month-work-possible'],
  },
  {
    id: 'B3-N005.gijinkoku-job-change',
    question: '技人国で転職します。14日届出は必要ですか。',
    forbidden_hits: [
      'ssw-employment-continuity-support-unavoidable-router',
      'ssw1-prep-receiving-institution-change-and-renewal-limit',
    ],
  },
  {
    id: 'B3-N006.business-manager-startup',
    question: '日本で会社を作って経営管理ビザを取りたいです。',
    forbidden_hits: ['j-find-two-year-job-startup-scope'],
  },
  {
    id: 'B3-N007.driver-license-normal',
    question: '日本の運転免許を外国免許から切り替えたいです。',
    forbidden_hits: ['ssw-automobile-transport-prep-license-training'],
  },
  {
    id: 'B3-N008.n1-exam-normal',
    question: 'JLPT N4の申し込み方法を教えてください。',
    forbidden_hits: ['nikkei-fourth-age-conduct-language-requirements'],
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
const batchCards = cards.filter(card => BATCH3_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH3_IDS.size, 'all P1 Cycle 1 Batch 3 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 1 \/ Batch 3/, `${card.factId} sprint should identify P1 Cycle 1 Batch 3`)
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

console.log(`P1 Cycle 1 Batch 3 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
