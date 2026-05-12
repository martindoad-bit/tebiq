/**
 * Legal Source Engineering — P1 Cycle 1 Batch 4 dry-run fixtures.
 *
 * Scope:
 *   - Long-term resident notice atoms.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle1-batch4-dry-run-fixtures.ts
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

const BATCH4_IDS = new Set([
  'long-term-resident-main-status-examples',
  'long-term-resident-minor-child-entry-before-eighteen',
  'long-term-resident-dependent-minor-sponsor-statuses',
  'long-term-resident-adopted-under-six-sponsor-statuses',
  'long-term-resident-nikkei-third-ancestor-documents',
  'long-term-resident-nikkei-third-japanese-language-b1',
  'long-term-resident-nikkei-third-guarantor-japan-resident',
  'long-term-resident-nikkei-second-spouse-route',
  'long-term-resident-nikkei-third-spouse-main-route',
  'long-term-resident-spouse-change-cases-source',
  'long-term-resident-spouse-change-approved-child-custody-income',
  'long-term-resident-spouse-change-approved-dv-death-business',
  'long-term-resident-spouse-change-denied-not-guaranteed',
  'long-term-resident-spouse-notification-separate-from-status-change',
])

const POSITIVE_FIXTURES: Fixture[] = [
  ['B4-001', '定住者 該当例', 'long-term-resident-main-status-examples'],
  ['B4-002', '定住者 未成年 未婚 実子 18歳', 'long-term-resident-minor-child-entry-before-eighteen'],
  ['B4-003', '定住者 子供 扶養 未成年', 'long-term-resident-dependent-minor-sponsor-statuses'],
  ['B4-004', '定住者 6歳未満 養子', 'long-term-resident-adopted-under-six-sponsor-statuses'],
  ['B4-005', '日系3世 戸籍 祖父母', 'long-term-resident-nikkei-third-ancestor-documents'],
  ['B4-006', '日系3世 日本語能力', 'long-term-resident-nikkei-third-japanese-language-b1'],
  ['B4-007', '日系3世 身元保証人', 'long-term-resident-nikkei-third-guarantor-japan-resident'],
  ['B4-008', '日系2世 配偶者 定住者', 'long-term-resident-nikkei-second-spouse-route'],
  ['B4-009', '日系3世 配偶者 定住者', 'long-term-resident-nikkei-third-spouse-main-route'],
  ['B4-010', '日配 離婚 定住者 事例', 'long-term-resident-spouse-change-cases-source'],
  ['B4-011', '離婚 日本人 子供 定住者', 'long-term-resident-spouse-change-approved-child-custody-income'],
  ['B4-012', 'DV 離婚 定住者', 'long-term-resident-spouse-change-approved-dv-death-business'],
  ['B4-013', '離婚したら 定住者 必ず', 'long-term-resident-spouse-change-denied-not-guaranteed'],
  ['B4-014', '離婚 14日 届出 定住者', 'long-term-resident-spouse-notification-separate-from-status-change'],
].map(([id, question, expected_primary_hit]) => ({ id, question, expected_primary_hit }))

const BROAD_NEGATIVE_FIXTURES = [
  {
    id: 'B4-N001.generic-divorce',
    question: '日本で離婚調停をしたいです。慰謝料はどうなりますか。',
    forbidden_hits: ['long-term-resident-spouse-change-cases-source'],
  },
  {
    id: 'B4-N002.normal-child-school',
    question: '18歳の子供が日本の大学に入りたいです。',
    forbidden_hits: ['long-term-resident-minor-child-entry-before-eighteen'],
  },
  {
    id: 'B4-N003.nikkei-company',
    question: '日系企業に就職したいです。',
    forbidden_hits: ['long-term-resident-nikkei-third-ancestor-documents'],
  },
  {
    id: 'B4-N004.spouse-renewal-normal',
    question: '日本人配偶者ビザの更新書類を知りたいです。',
    forbidden_hits: ['long-term-resident-spouse-change-cases-source'],
  },
  {
    id: 'B4-N005.adoption-family-law',
    question: '日本で養子縁組の家庭裁判所手続きを知りたいです。',
    forbidden_hits: ['long-term-resident-adopted-under-six-sponsor-statuses'],
  },
  {
    id: 'B4-N006.japanese-language-test',
    question: 'JLPT N3の申し込み方法を教えてください。',
    forbidden_hits: ['long-term-resident-nikkei-third-japanese-language-b1'],
  },
  {
    id: 'B4-N007.rental-guarantor',
    question: '賃貸の保証人がいません。',
    forbidden_hits: ['long-term-resident-nikkei-third-guarantor-japan-resident'],
  },
  {
    id: 'B4-N008.family-stay',
    question: '技人国で家族滞在の妻と子供を呼びたいです。',
    forbidden_hits: ['long-term-resident-dependent-minor-sponsor-statuses'],
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
const batchCards = cards.filter(card => BATCH4_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH4_IDS.size, 'all P1 Cycle 1 Batch 4 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 1 \/ Batch 4/, `${card.factId} sprint should identify P1 Cycle 1 Batch 4`)
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

console.log(`P1 Cycle 1 Batch 4 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
