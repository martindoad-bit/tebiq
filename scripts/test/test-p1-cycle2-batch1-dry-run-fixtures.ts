/**
 * Legal Source Engineering — P1 Cycle 2 Batch 1 dry-run fixtures.
 *
 * Scope:
 *   - Highly skilled professional / J-Skip source anchors.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle2-batch1-dry-run-fixtures.ts
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

const BATCH1_IDS = new Set([
  'highly-skilled-points-70-system-purpose',
  'highly-skilled-three-activity-categories',
  'highly-skilled-point-evaluation-items-source',
  'highly-skilled-preferential-measures-source',
  'highly-skilled-2-scope-indefinite-not-pr',
  'highly-skilled-one-activity-institution-change-application',
  'highly-skilled-one-under70-not-immediate-loss',
  'highly-skilled-permanent-residence-70-80-year-router',
  'j-skip-separate-from-points-system',
  'j-skip-research-technical-thresholds',
  'j-skip-management-threshold',
  'j-skip-expanded-benefits-certificate',
  'j-skip-hsp2-and-pr-one-year-anchor',
  'j-skip-online-points-screen-caveat',
])

const POSITIVE_FIXTURES: Fixture[] = [
  ['C2B1-001', '高度人材ポイント制 70点', 'highly-skilled-points-70-system-purpose'],
  ['C2B1-002', '高度専門職 1号ロ', 'highly-skilled-three-activity-categories'],
  ['C2B1-003', '高度人材 ポイント 計算表', 'highly-skilled-point-evaluation-items-source'],
  ['C2B1-004', '高度専門職 優遇措置', 'highly-skilled-preferential-measures-source'],
  ['C2B1-005', '高度専門職2号 永住 違い', 'highly-skilled-2-scope-indefinite-not-pr'],
  ['C2B1-006', '高度専門職 転職 変更申請', 'highly-skilled-one-activity-institution-change-application'],
  ['C2B1-007', '高度専門職 70点 未満', 'highly-skilled-one-under70-not-immediate-loss'],
  ['C2B1-008', '高度人材 永住 80点 1年', 'highly-skilled-permanent-residence-70-80-year-router'],
  ['C2B1-009', 'J-Skip ポイント 不要', 'j-skip-separate-from-points-system'],
  ['C2B1-010', 'J-Skip 修士 年収2000万', 'j-skip-research-technical-thresholds'],
  ['C2B1-011', 'J-Skip 経営管理 年収4000万', 'j-skip-management-threshold'],
  ['C2B1-012', 'J-Skip 証明書', 'j-skip-expanded-benefits-certificate'],
  ['C2B1-013', 'J-Skip 永住 1年', 'j-skip-hsp2-and-pr-one-year-anchor'],
  ['C2B1-014', 'J-Skip オンライン ポイント計算表', 'j-skip-online-points-screen-caveat'],
].map(([id, question, expected_primary_hit]) => ({ id, question, expected_primary_hit }))

const BROAD_NEGATIVE_FIXTURES = [
  {
    id: 'C2B1-N001.normal-pr',
    question: '永住申請には住民税が何年分必要ですか。',
    forbidden_hits: ['highly-skilled-permanent-residence-70-80-year-router'],
  },
  {
    id: 'C2B1-N002.normal-job-change',
    question: '技人国で転職したら14日届出は必要ですか。',
    forbidden_hits: ['highly-skilled-one-activity-institution-change-application'],
  },
  {
    id: 'C2B1-N003.normal-business-manager',
    question: '経営管理ビザの資本金3000万円要件を知りたいです。',
    forbidden_hits: ['j-skip-management-threshold'],
  },
  {
    id: 'C2B1-N004.normal-family-stay',
    question: '家族滞在の妻がアルバイトするには資格外活動が必要ですか。',
    forbidden_hits: ['highly-skilled-preferential-measures-source'],
  },
  {
    id: 'C2B1-N005.generic-online',
    question: 'オンライン申請のログイン方法がわかりません。',
    forbidden_hits: ['j-skip-online-points-screen-caveat'],
  },
  {
    id: 'C2B1-N006.normal-masters',
    question: '日本の大学院で修士課程に入学します。',
    forbidden_hits: ['j-skip-research-technical-thresholds'],
  },
  {
    id: 'C2B1-N007.salary-tax',
    question: '年収2000万円の場合の所得税はいくらですか。',
    forbidden_hits: ['j-skip-research-technical-thresholds'],
  },
  {
    id: 'C2B1-N008.card-certificate',
    question: '在留カードを紛失したので再発行したいです。',
    forbidden_hits: ['j-skip-expanded-benefits-certificate'],
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
const batchCards = cards.filter(card => BATCH1_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH1_IDS.size, 'all P1 Cycle 2 Batch 1 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 2 \/ Batch 1/, `${card.factId} sprint should identify P1 Cycle 2 Batch 1`)
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

console.log(`P1 Cycle 2 Batch 1 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
