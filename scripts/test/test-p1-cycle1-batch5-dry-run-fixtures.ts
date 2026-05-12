/**
 * Legal Source Engineering — P1 Cycle 1 Batch 5 dry-run fixtures.
 *
 * Scope:
 *   - Designated-activities remaining subtype source anchors.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle1-batch5-dry-run-fixtures.ts
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

const BATCH5_IDS = new Set([
  'designated-activities-amateur-sports-family-source',
  'designated-activities-epa-nurse-care-worker-family-source',
  'designated-activities-medical-stay-companion-source',
  'designated-activities-internship-summer-cultural-source',
  'designated-activities-domestic-servant-source',
  'designated-activities-hsp-domestic-servant-source',
  'designated-activities-long-stay-tourism-spouse-source',
  'designated-activities-hsp-spouse-parent-source',
  'designated-activities-ski-instructor-source',
  'designated-activities-research-it-family-source',
  'designated-activities-graduate-school-waiting-source',
  'designated-activities-foreign-entrepreneur-startup-source',
  'designated-activities-titp-transfer-measure-source',
])

const POSITIVE_FIXTURES: Fixture[] = [
  ['B5-001', 'アマチュアスポーツ 特定活動', 'designated-activities-amateur-sports-family-source'],
  ['B5-002', 'EPA 看護師 特定活動', 'designated-activities-epa-nurse-care-worker-family-source'],
  ['B5-003', '医療滞在 特定活動', 'designated-activities-medical-stay-companion-source'],
  ['B5-004', 'インターンシップ 特定活動', 'designated-activities-internship-summer-cultural-source'],
  ['B5-005', '家事使用人 特定活動', 'designated-activities-domestic-servant-source'],
  ['B5-006', '高度専門職 家事使用人', 'designated-activities-hsp-domestic-servant-source'],
  ['B5-007', '長期滞在 観光 特定活動', 'designated-activities-long-stay-tourism-spouse-source'],
  ['B5-008', '高度専門職 配偶者 働く', 'designated-activities-hsp-spouse-parent-source'],
  ['B5-009', 'スキーインストラクター 特定活動', 'designated-activities-ski-instructor-source'],
  ['B5-010', '特定情報処理活動', 'designated-activities-research-it-family-source'],
  ['B5-011', '大学院 入学まで 特定活動', 'designated-activities-graduate-school-waiting-source'],
  ['B5-012', '外国人起業家 特定活動', 'designated-activities-foreign-entrepreneur-startup-source'],
  ['B5-013', '技能実習 転籍 特定活動', 'designated-activities-titp-transfer-measure-source'],
].map(([id, question, expected_primary_hit]) => ({ id, question, expected_primary_hit }))

const BROAD_NEGATIVE_FIXTURES = [
  {
    id: 'B5-N001.sports-gym',
    question: 'スポーツジムでアルバイトしたいです。',
    forbidden_hits: ['designated-activities-amateur-sports-family-source'],
  },
  {
    id: 'B5-N002.normal-nurse',
    question: '日本で看護師として働くにはどうすればいいですか。',
    forbidden_hits: ['designated-activities-epa-nurse-care-worker-family-source'],
  },
  {
    id: 'B5-N003.hospital-visit',
    question: '旅行中に病院へ行きたいです。',
    forbidden_hits: ['designated-activities-medical-stay-companion-source'],
  },
  {
    id: 'B5-N004.normal-intern',
    question: '日本企業で普通に就職活動したいです。',
    forbidden_hits: ['designated-activities-internship-summer-cultural-source'],
  },
  {
    id: 'B5-N005.housekeeping-company',
    question: '家事代行会社に就職したいです。',
    forbidden_hits: ['designated-activities-domestic-servant-source'],
  },
  {
    id: 'B5-N006.hsp-pr',
    question: '高度専門職から永住申請したいです。',
    forbidden_hits: ['designated-activities-hsp-spouse-parent-source'],
  },
  {
    id: 'B5-N007.short-tourism',
    question: '短期滞在で日本旅行に行きたいです。',
    forbidden_hits: ['designated-activities-long-stay-tourism-spouse-source'],
  },
  {
    id: 'B5-N008.ski-trip',
    question: '日本へスキー旅行に行きたいです。',
    forbidden_hits: ['designated-activities-ski-instructor-source'],
  },
  {
    id: 'B5-N009.gijinkoku-it',
    question: 'ITエンジニアとして技人国を更新したいです。',
    forbidden_hits: ['designated-activities-research-it-family-source'],
  },
  {
    id: 'B5-N010.student-renewal',
    question: '大学院生として留学ビザを更新したいです。',
    forbidden_hits: ['designated-activities-graduate-school-waiting-source'],
  },
  {
    id: 'B5-N011.business-manager',
    question: '経営管理ビザの資本金要件を知りたいです。',
    forbidden_hits: ['designated-activities-foreign-entrepreneur-startup-source'],
  },
  {
    id: 'B5-N012.ssw-change',
    question: '特定技能で会社を変えたいです。',
    forbidden_hits: ['designated-activities-titp-transfer-measure-source'],
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
const batchCards = cards.filter(card => BATCH5_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH5_IDS.size, 'all P1 Cycle 1 Batch 5 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 1 \/ Batch 5/, `${card.factId} sprint should identify P1 Cycle 1 Batch 5`)
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

console.log(`P1 Cycle 1 Batch 5 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
