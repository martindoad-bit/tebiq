/**
 * Legal Source Engineering — P1 Cycle 2 Batch 2 dry-run fixtures.
 *
 * Scope:
 *   - Highly skilled / J-Skip family, procedure, and materials boundaries.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle2-batch2-dry-run-fixtures.ts
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
  "hsp-working-spouse-not-unconditional",
  "hsp-working-spouse-ordinary-activity-scope",
  "jskip-working-spouse-expanded-activity-scope",
  "hsp-working-spouse-cohabitation-remuneration",
  "hsp-working-spouse-separation-risk",
  "hsp-working-spouse-evidence-structure",
  "hsp-parent-purpose-router",
  "hsp-parent-income-cohabitation-condition",
  "hsp-parent-one-side-only-boundary",
  "hsp-parent-change-update-3month-continuity",
  "hsp-parent-evidence-boundary",
  "hsp-domestic-servant-type-router",
  "hsp-domestic-servant-accompanying-type-boundary",
  "hsp-domestic-servant-accompanying-core-conditions",
  "hsp-domestic-servant-household-type-boundary",
  "hsp-domestic-servant-financial-type-boundary",
  "jskip-domestic-servant-special-type-boundary",
  "jskip-recognition-from-existing-hsp1-procedure",
  "jskip-material-structure-activity-plus-special-evidence",
  "jskip-online-foreign-national-paper-attachment"
])

const POSITIVE_FIXTURES: Fixture[] = [
  {
    "id": "C2B2-001",
    "question": "高度人才配偶能工作吗",
    "expected_primary_hit": "hsp-working-spouse-not-unconditional"
  },
  {
    "id": "C2B2-002",
    "question": "高度専門職 配偶者 研究 教育 技人国",
    "expected_primary_hit": "hsp-working-spouse-ordinary-activity-scope"
  },
  {
    "id": "C2B2-003",
    "question": "J-Skip 配偶者 活动范围",
    "expected_primary_hit": "jskip-working-spouse-expanded-activity-scope"
  },
  {
    "id": "C2B2-004",
    "question": "高度専門職 配偶者 同居 報酬",
    "expected_primary_hit": "hsp-working-spouse-cohabitation-remuneration"
  },
  {
    "id": "C2B2-005",
    "question": "高度専門職 配偶者 分居 还能工作",
    "expected_primary_hit": "hsp-working-spouse-separation-risk"
  },
  {
    "id": "C2B2-006",
    "question": "高度専門職 配偶者 就劳 材料",
    "expected_primary_hit": "hsp-working-spouse-evidence-structure"
  },
  {
    "id": "C2B2-007",
    "question": "高度専門職 父母 带孩子",
    "expected_primary_hit": "hsp-parent-purpose-router"
  },
  {
    "id": "C2B2-008",
    "question": "高度専門職 親 800万 同居",
    "expected_primary_hit": "hsp-parent-income-cohabitation-condition"
  },
  {
    "id": "C2B2-009",
    "question": "J-Skip 两边父母 都来",
    "expected_primary_hit": "hsp-parent-one-side-only-boundary"
  },
  {
    "id": "C2B2-010",
    "question": "高度専門職 親 3か月 更新",
    "expected_primary_hit": "hsp-parent-change-update-3month-continuity"
  },
  {
    "id": "C2B2-011",
    "question": "J-Skip 父母 母子健康手帳",
    "expected_primary_hit": "hsp-parent-evidence-boundary"
  },
  {
    "id": "C2B2-012",
    "question": "高度専門職 家事使用人 四类型",
    "expected_primary_hit": "hsp-domestic-servant-type-router"
  },
  {
    "id": "C2B2-013",
    "question": "高度専門職 家事使用人 入国帯同 変更できない",
    "expected_primary_hit": "hsp-domestic-servant-accompanying-type-boundary"
  },
  {
    "id": "C2B2-014",
    "question": "高度専門職 家事使用人 1000万 20万 1年",
    "expected_primary_hit": "hsp-domestic-servant-accompanying-core-conditions"
  },
  {
    "id": "C2B2-015",
    "question": "高度専門職 家事使用人 13歳未満",
    "expected_primary_hit": "hsp-domestic-servant-household-type-boundary"
  },
  {
    "id": "C2B2-016",
    "question": "高度専門職 家事使用人 金融人材型",
    "expected_primary_hit": "hsp-domestic-servant-financial-type-boundary"
  },
  {
    "id": "C2B2-017",
    "question": "J-Skip 家事使用人 特別高度人材型",
    "expected_primary_hit": "jskip-domestic-servant-special-type-boundary"
  },
  {
    "id": "C2B2-018",
    "question": "普通高度専門職1号 转 J-Skip",
    "expected_primary_hit": "jskip-recognition-from-existing-hsp1-procedure"
  },
  {
    "id": "C2B2-019",
    "question": "J-Skip 材料 活动对应资料",
    "expected_primary_hit": "jskip-material-structure-activity-plus-special-evidence"
  },
  {
    "id": "C2B2-020",
    "question": "J-Skip 在线申请 纸申请书",
    "expected_primary_hit": "jskip-online-foreign-national-paper-attachment"
  }
]

const BROAD_NEGATIVE_FIXTURES = [
  {
    "id": "C2B2-N001.dependent-work",
    "question": "家族滞在 配偶者 可以打工吗？",
    "forbidden_hits": [
      "hsp-working-spouse-not-unconditional",
      "hsp-working-spouse-ordinary-activity-scope",
      "jskip-working-spouse-expanded-activity-scope"
    ]
  },
  {
    "id": "C2B2-N002.gijinkoku-family",
    "question": "技人国想把老婆孩子办家族滞在。",
    "forbidden_hits": [
      "hsp-parent-purpose-router",
      "hsp-working-spouse-not-unconditional"
    ]
  },
  {
    "id": "C2B2-N003.japanese-spouse",
    "question": "日本人配偶者签证怎么申请？",
    "forbidden_hits": [
      "hsp-working-spouse-not-unconditional",
      "jskip-working-spouse-expanded-activity-scope"
    ]
  },
  {
    "id": "C2B2-N004.pr-spouse",
    "question": "永住者的配偶者等签证材料。",
    "forbidden_hits": [
      "hsp-working-spouse-evidence-structure",
      "jskip-material-structure-activity-plus-special-evidence"
    ]
  },
  {
    "id": "C2B2-N005.business-manager",
    "question": "经营管理签可以雇员工或家政吗？",
    "forbidden_hits": [
      "hsp-domestic-servant-type-router",
      "jskip-domestic-servant-special-type-boundary"
    ]
  },
  {
    "id": "C2B2-N006.tourist-parent",
    "question": "父母来日本旅游三个月。",
    "forbidden_hits": [
      "hsp-parent-purpose-router",
      "hsp-parent-income-cohabitation-condition"
    ]
  },
  {
    "id": "C2B2-N007.generic-online",
    "question": "在线申请家族滞在怎么提交？",
    "forbidden_hits": [
      "jskip-online-foreign-national-paper-attachment"
    ]
  },
  {
    "id": "C2B2-N008.j-find-family",
    "question": "J-Find 可以带家属吗？",
    "forbidden_hits": [
      "jskip-working-spouse-expanded-activity-scope",
      "jskip-domestic-servant-special-type-boundary"
    ]
  },
  {
    "id": "C2B2-N009.housekeeping-service",
    "question": "家事代行公司怎么找保姆？",
    "forbidden_hits": [
      "hsp-domestic-servant-type-router",
      "hsp-domestic-servant-accompanying-core-conditions"
    ]
  },
  {
    "id": "C2B2-N010.hsp-main-job-change",
    "question": "高度専門職本人转职要不要届出？",
    "forbidden_hits": [
      "hsp-working-spouse-separation-risk",
      "jskip-recognition-from-existing-hsp1-procedure"
    ]
  },
  {
    "id": "C2B2-N011.normal-pr",
    "question": "高度人材永住80点需要住民税几年？",
    "forbidden_hits": [
      "hsp-parent-purpose-router",
      "hsp-domestic-servant-type-router"
    ]
  },
  {
    "id": "C2B2-N012.normal-online-login",
    "question": "オンライン申請のログインパスワードを忘れました。",
    "forbidden_hits": [
      "jskip-online-foreign-national-paper-attachment"
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

function sourceUrlValue(card: DiskCard): string[] {
  const sources = card.frontmatter.official_sources
  if (!Array.isArray(sources)) return []
  return sources
    .filter((item): item is Record<string, unknown> => item !== null && typeof item === 'object' && !Array.isArray(item))
    .map(item => stringValue(item.url))
    .filter(Boolean)
}

const cards = loadCards()
const batchCards = cards.filter(card => BATCH2_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH2_IDS.size, 'all P1 Cycle 2 Batch 2 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 2 \/ Batch 2/, `${card.factId} sprint should identify P1 Cycle 2 Batch 2`)
  assert.ok(card.triggerKeywords.length >= 5, `${card.factId} should have matcher phrases`)
  assert.ok(card.evidencePoints.length > 0 && card.evidencePoints.length <= 4, `${card.factId} should keep evidence points compact`)
  for (const url of sourceUrlValue(card)) {
    assert.match(url, /^https:\/\/www\.moj\.go\.jp\/isa\//, `${card.factId} source URL must be official ISA`)
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
}

for (const fixture of BROAD_NEGATIVE_FIXTURES) {
  const hitIds = new Set(topPredictions(fixture.question, batchCards).map(prediction => prediction.fact_id))
  for (const forbidden of fixture.forbidden_hits) {
    assert.equal(hitIds.has(forbidden), false, `${fixture.id} must not over-hit ${forbidden}`)
  }
}

console.log(`P1 Cycle 2 Batch 2 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
