/**
 * Legal Source Engineering — P1 Cycle 1 Batch 1 dry-run fixtures.
 *
 * Scope:
 *   - Notice-layer router cards for 定住者告示 / 特定活動告示.
 *   - Production isolation for ai_extracted cards.
 *   - Positive and broad-negative matching fixtures.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle1-batch1-dry-run-fixtures.ts
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
  sprint: string
  triggerKeywords: ReadonlyArray<string>
  injectionCertainBlock: string
  injectionNeedsReviewAddendum: string | null
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
}

const BATCH1_IDS = new Set([
  'long-term-resident-notice-source-anchor',
  'long-term-resident-special-reason-status-scope',
  'long-term-resident-minor-child-age-eighteen',
  'long-term-resident-nikkei-third-generation-router',
  'long-term-resident-nikkei-spouse-router',
  'long-term-resident-dependent-minor-child-router',
  'long-term-resident-under-six-adopted-child-router',
  'long-term-resident-spouse-divorce-case-router',
  'designated-activities-notice-source-anchor',
  'designated-activities-isa-type-list-router',
  'designated-activities-job-offer-before-start-router',
  'designated-activities-graduate-job-hunting-router',
  'designated-activities-graduate-startup-router',
  'designated-activities-j-find-router',
  'designated-activities-digital-nomad-router',
  'designated-activities-nikkei-fourth-generation-router',
  'designated-activities-ssw-transition-prep-router',
])

const POSITIVE_FIXTURES: Fixture[] = [
  {
    id: 'P1C1-B1-001.long-term-notice',
    question: '定住者告示 第132号 官方依据',
    expected_primary_hit: 'long-term-resident-notice-source-anchor',
  },
  {
    id: 'P1C1-B1-002.long-term-scope',
    question: '定住者とは どんな資格 特別な理由',
    expected_primary_hit: 'long-term-resident-special-reason-status-scope',
  },
  {
    id: 'P1C1-B1-003.minor-child',
    question: '永住者の子 定住者 18歳 未成年 未婚 実子',
    expected_primary_hit: 'long-term-resident-minor-child-age-eighteen',
  },
  {
    id: 'P1C1-B1-004.nikkei-third',
    question: '日系3世 定住者 日本に住みたい',
    expected_primary_hit: 'long-term-resident-nikkei-third-generation-router',
  },
  {
    id: 'P1C1-B1-005.nikkei-spouse',
    question: '日系2世の配偶者 定住ビザ',
    expected_primary_hit: 'long-term-resident-nikkei-spouse-router',
  },
  {
    id: 'P1C1-B1-006.dependent-child',
    question: '定住者の子供 呼び寄せ 扶養 未成年 未婚',
    expected_primary_hit: 'long-term-resident-dependent-minor-child-router',
  },
  {
    id: 'P1C1-B1-007.adopted-child',
    question: '6歳未満 養子 定住者',
    expected_primary_hit: 'long-term-resident-under-six-adopted-child-router',
  },
  {
    id: 'P1C1-B1-008.spouse-divorce',
    question: '日本人配偶者 離婚後 定住者 変更 有孩子',
    expected_primary_hit: 'long-term-resident-spouse-divorce-case-router',
  },
  {
    id: 'P1C1-B1-009.designated-notice',
    question: '特定活動告示 第131号 公式根拠',
    expected_primary_hit: 'designated-activities-notice-source-anchor',
  },
  {
    id: 'P1C1-B1-010.designated-type',
    question: '特定活動 種類 何号 指定書',
    expected_primary_hit: 'designated-activities-isa-type-list-router',
  },
  {
    id: 'P1C1-B1-011.job-offer',
    question: '内定 入社日まで 特定活動 採用までの滞在',
    expected_primary_hit: 'designated-activities-job-offer-before-start-router',
  },
  {
    id: 'P1C1-B1-012.job-hunting',
    question: '留学生 卒業後 就職活動 特定活動',
    expected_primary_hit: 'designated-activities-graduate-job-hunting-router',
  },
  {
    id: 'P1C1-B1-013.graduate-startup',
    question: '留学生 卒業後 起業準備 特定活動',
    expected_primary_hit: 'designated-activities-graduate-startup-router',
  },
  {
    id: 'P1C1-B1-014.j-find',
    question: 'J-Find 未来創造人材 海外大学 日本で就職活動',
    expected_primary_hit: 'designated-activities-j-find-router',
  },
  {
    id: 'P1C1-B1-015.digital-nomad',
    question: 'digital nomad Japan visa 特定活動 53号',
    expected_primary_hit: 'designated-activities-digital-nomad-router',
  },
  {
    id: 'P1C1-B1-016.nikkei-fourth',
    question: '日系4世 定住者 特定活動 日本滞在',
    expected_primary_hit: 'designated-activities-nikkei-fourth-generation-router',
  },
  {
    id: 'P1C1-B1-017.ssw-transition',
    question: '特定技能1号 書類 間に合わない 特定活動 6月 就労可',
    expected_primary_hit: 'designated-activities-ssw-transition-prep-router',
  },
]

const BROAD_NEGATIVE_FIXTURES: Array<{ id: string; question: string; forbidden_hits: string[] }> = [
  {
    id: 'P1C1-B1-N001.normal-renewal',
    question: '技人国の在留期間更新に必要な住民税証明を知りたいです。',
    forbidden_hits: [
      'designated-activities-graduate-job-hunting-router',
      'designated-activities-ssw-transition-prep-router',
      'long-term-resident-spouse-divorce-case-router',
    ],
  },
  {
    id: 'P1C1-B1-N002.general-divorce',
    question: '離婚届は市役所でどう出しますか。在留資格の話ではありません。',
    forbidden_hits: [
      'long-term-resident-spouse-divorce-case-router',
    ],
  },
  {
    id: 'P1C1-B1-N003.job-search-work-status',
    question: '技人国を辞めて次の技人国の仕事を探しています。',
    forbidden_hits: [
      'designated-activities-graduate-job-hunting-router',
      'designated-activities-job-offer-before-start-router',
    ],
  },
  {
    id: 'P1C1-B1-N004.remote-work-normal',
    question: '日本企業で在宅勤務できますか。普通の雇用契約です。',
    forbidden_hits: [
      'designated-activities-digital-nomad-router',
    ],
  },
  {
    id: 'P1C1-B1-N005.child-tax',
    question: '子供の扶養控除と住民税について教えてください。',
    forbidden_hits: [
      'long-term-resident-dependent-minor-child-router',
      'long-term-resident-minor-child-age-eighteen',
    ],
  },
]

const UNSAFE_PATTERNS = [
  /必ず許可/,
  /必ず.*定住者/,
  /誰でも.*J-Find/,
  /誰でも.*デジタルノマド/,
  /特定活動.*全部同じ/,
  /日系4世.*同じ定住者/,
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
        riskLevel: String(fm.risk_level ?? ''),
        sprint: String(fm.sprint ?? ''),
        triggerKeywords: deriveKeywords(parsed.content),
        injectionCertainBlock: extractFenced(extractSection(parsed.content, 'injection_format', 'injection_certain_block')),
        injectionNeedsReviewAddendum: extractFenced(extractSection(parsed.content, 'injection_format', 'injection_needs_review_addendum')),
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

function scoreCard(question: string, card: DiskCard): Prediction {
  const q = question.toLowerCase()
  const matched = card.triggerKeywords.filter(keyword => q.includes(keyword.toLowerCase()))
  const score = matched.reduce((sum, keyword) => sum + Math.max(1, Math.min(10, keyword.length)), 0)
  return {
    fact_id: card.factId,
    state: card.state,
    decision: gateDecision(card),
    score,
    matched_keywords: matched,
  }
}

function topPredictions(question: string, cards: DiskCard[]): Prediction[] {
  return cards
    .map(card => scoreCard(question, card))
    .filter(prediction => prediction.score > 0)
    .sort((a, b) => b.score - a.score || a.fact_id.localeCompare(b.fact_id))
}

const cards = loadCards()
const batchCards = cards.filter(card => BATCH1_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH1_IDS.size, 'all P1 Cycle 1 Batch 1 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 1 \/ Batch 1/, `${card.factId} sprint should identify P1 Cycle 1 Batch 1`)
  assert.ok(card.triggerKeywords.length >= 5, `${card.factId} should have matcher phrases`)
  for (const pattern of UNSAFE_PATTERNS) {
    assert.doesNotMatch(`${card.title}\n${card.triggerKeywords.join('\n')}`, pattern, `${card.factId} unsafe deterministic wording`)
  }
}

for (const fixture of POSITIVE_FIXTURES) {
  const predictions = topPredictions(fixture.question, batchCards)
  const top = predictions[0]
  assert.ok(top, `${fixture.id} should produce at least one hit`)
  assert.equal(top.fact_id, fixture.expected_primary_hit, `${fixture.id} expected top hit ${fixture.expected_primary_hit}`)
  assert.equal(top.decision, 'drop', `${fixture.id} expected production drop for ai_extracted card`)
}

for (const fixture of BROAD_NEGATIVE_FIXTURES) {
  const predictions = topPredictions(fixture.question, batchCards)
  const hitIds = new Set(predictions.map(prediction => prediction.fact_id))
  for (const forbidden of fixture.forbidden_hits) {
    assert.equal(hitIds.has(forbidden), false, `${fixture.id} must not over-hit ${forbidden}`)
  }
}

console.log(`P1 Cycle 1 Batch 1 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
