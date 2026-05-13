/**
 * Legal Source Engineering — P1 Cycle 2 Batch 3 dry-run fixtures.
 *
 * Scope:
 *   - HSP / J-Skip integration boundaries.
 *   - Misrouting protection against ordinary dependent, J-Find, PR,
 *     business-manager, organization notification, and online-application answers.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle2-batch3-hsp-jskip-integration-guardrails.ts
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
  "guard-hsp-working-spouse-is-special-activity-not-dependent",
  "guard-hsp-working-spouse-not-28hour-qoa",
  "guard-hsp-parent-is-special-activity-not-dependent-parent",
  "guard-hsp-domestic-servant-is-special-activity-not-family",
  "guard-hsp-family-benefits-require-main-hsp-jskip",
  "guard-hsp-jskip-family-benefits-not-automatic-package",
  "guard-jskip-vs-jfind-separate-programs",
  "guard-jfind-family-not-hsp-family-benefit",
  "guard-hsp2-not-permanent-residence",
  "guard-hsp2-activity-scope-not-pr-freedom",
  "guard-hsp-pr-shortening-not-automatic-pr",
  "guard-jskip-manager-not-business-manager-3000man",
  "guard-business-manager-hsp1ha-criteria-link",
  "guard-hsp1-institution-change-not-14day-only",
  "guard-shozoku-notification-does-not-replace-status-change",
  "guard-online-jskip-jfind-input-caveat-specific",
  "guard-online-availability-not-substantive-eligibility",
  "guard-hsp-materials-not-approval-guarantee"
])

const POSITIVE_FIXTURES: Fixture[] = [
  {
    "id": "C2B3-001",
    "question": "高度専門職 配偶者 家族滞在",
    "expected_primary_hit": "guard-hsp-working-spouse-is-special-activity-not-dependent"
  },
  {
    "id": "C2B3-002",
    "question": "高度専門職 配偶者 28時間",
    "expected_primary_hit": "guard-hsp-working-spouse-not-28hour-qoa"
  },
  {
    "id": "C2B3-003",
    "question": "高度専門職 親 家族滞在",
    "expected_primary_hit": "guard-hsp-parent-is-special-activity-not-dependent-parent"
  },
  {
    "id": "C2B3-004",
    "question": "高度専門職 家事使用人 家族滞在",
    "expected_primary_hit": "guard-hsp-domestic-servant-is-special-activity-not-family"
  },
  {
    "id": "C2B3-005",
    "question": "高度専門職 家族 特例 主申请人",
    "expected_primary_hit": "guard-hsp-family-benefits-require-main-hsp-jskip"
  },
  {
    "id": "C2B3-006",
    "question": "J-Skip 家族 全部 自動",
    "expected_primary_hit": "guard-hsp-jskip-family-benefits-not-automatic-package"
  },
  {
    "id": "C2B3-007",
    "question": "J-Skip J-Find 区别",
    "expected_primary_hit": "guard-jskip-vs-jfind-separate-programs"
  },
  {
    "id": "C2B3-008",
    "question": "J-Find 家族 高度専門職",
    "expected_primary_hit": "guard-jfind-family-not-hsp-family-benefit"
  },
  {
    "id": "C2B3-009",
    "question": "高度専門職2号 永住",
    "expected_primary_hit": "guard-hsp2-not-permanent-residence"
  },
  {
    "id": "C2B3-010",
    "question": "高度専門職2号 何でもできる",
    "expected_primary_hit": "guard-hsp2-activity-scope-not-pr-freedom"
  },
  {
    "id": "C2B3-011",
    "question": "80点 一年 永住 自動",
    "expected_primary_hit": "guard-hsp-pr-shortening-not-automatic-pr"
  },
  {
    "id": "C2B3-012",
    "question": "J-Skip 4000万 3000万",
    "expected_primary_hit": "guard-jskip-manager-not-business-manager-3000man"
  },
  {
    "id": "C2B3-013",
    "question": "高度専門職1号ハ 経営管理 基準",
    "expected_primary_hit": "guard-business-manager-hsp1ha-criteria-link"
  },
  {
    "id": "C2B3-014",
    "question": "高度専門職 転職 14日届出",
    "expected_primary_hit": "guard-hsp1-institution-change-not-14day-only"
  },
  {
    "id": "C2B3-015",
    "question": "所属機関届出 在留資格変更 代わり",
    "expected_primary_hit": "guard-shozoku-notification-does-not-replace-status-change"
  },
  {
    "id": "C2B3-016",
    "question": "J-Skip 在线申请 输入方法",
    "expected_primary_hit": "guard-online-jskip-jfind-input-caveat-specific"
  },
  {
    "id": "C2B3-017",
    "question": "在线申请 条件 放宽",
    "expected_primary_hit": "guard-online-availability-not-substantive-eligibility"
  },
  {
    "id": "C2B3-018",
    "question": "高度専門職 材料 揃えば 許可",
    "expected_primary_hit": "guard-hsp-materials-not-approval-guarantee"
  }
]

const BROAD_NEGATIVE_FIXTURES = [
  {
    "id": "C2B3-N001.ordinary-dependent-work",
    "question": "家族滞在 配偶者 可以打工吗？",
    "forbidden_hits": [
      "guard-hsp-working-spouse-is-special-activity-not-dependent",
      "guard-hsp-working-spouse-not-28hour-qoa"
    ]
  },
  {
    "id": "C2B3-N002.gijinkoku-family",
    "question": "技人国想把老婆孩子办家族滞在。",
    "forbidden_hits": [
      "guard-hsp-parent-is-special-activity-not-dependent-parent",
      "guard-hsp-family-benefits-require-main-hsp-jskip",
      "guard-hsp-jskip-family-benefits-not-automatic-package"
    ]
  },
  {
    "id": "C2B3-N003.tourist-parent",
    "question": "父母来日本旅游三个月。",
    "forbidden_hits": [
      "guard-hsp-parent-is-special-activity-not-dependent-parent",
      "guard-hsp-family-benefits-require-main-hsp-jskip",
      "guard-hsp-jskip-family-benefits-not-automatic-package"
    ]
  },
  {
    "id": "C2B3-N004.housekeeping-service",
    "question": "家事代行公司怎么找保姆？",
    "forbidden_hits": [
      "guard-hsp-domestic-servant-is-special-activity-not-family"
    ]
  },
  {
    "id": "C2B3-N005.j-find-basic",
    "question": "J-Find 就职活动 最长两年",
    "forbidden_hits": [
      "guard-jskip-vs-jfind-separate-programs",
      "guard-hsp-family-benefits-require-main-hsp-jskip",
      "guard-hsp-jskip-family-benefits-not-automatic-package"
    ]
  },
  {
    "id": "C2B3-N006.business-manager-only",
    "question": "经营管理签资本金3000万要件",
    "forbidden_hits": [
      "guard-jskip-manager-not-business-manager-3000man",
      "guard-business-manager-hsp1ha-criteria-link"
    ]
  },
  {
    "id": "C2B3-N007.gijinkoku-job-change",
    "question": "技人国 换工作 14日届出",
    "forbidden_hits": [
      "guard-hsp1-institution-change-not-14day-only"
    ]
  },
  {
    "id": "C2B3-N008.generic-online-dependent",
    "question": "在线申请家族滞在怎么提交？",
    "forbidden_hits": [
      "guard-online-jskip-jfind-input-caveat-specific"
    ]
  },
  {
    "id": "C2B3-N009.pr-card-renewal",
    "question": "永住在留卡7年更新",
    "forbidden_hits": [
      "guard-hsp2-not-permanent-residence",
      "guard-hsp2-activity-scope-not-pr-freedom",
      "guard-hsp-pr-shortening-not-automatic-pr"
    ]
  },
  {
    "id": "C2B3-N010.hsp-material-download-only",
    "question": "高度専門職ポイント計算表怎么下载？",
    "forbidden_hits": [
      "guard-hsp-materials-not-approval-guarantee"
    ]
  },
  {
    "id": "C2B3-N011.ordinary-dependent-qoa",
    "question": "家族滞在 配偶者 28時間 打工许可",
    "forbidden_hits": [
      "guard-hsp-working-spouse-is-special-activity-not-dependent",
      "guard-hsp-working-spouse-not-28hour-qoa"
    ]
  },
  {
    "id": "C2B3-N012.j-find-conditions-only",
    "question": "J-Find 就職活動 条件 2年 起業準備",
    "forbidden_hits": [
      "guard-jskip-vs-jfind-separate-programs",
      "guard-jfind-family-not-hsp-family-benefit"
    ]
  },
  {
    "id": "C2B3-N013.ordinary-pr-years",
    "question": "永住申請 住满10年 需要几年",
    "forbidden_hits": [
      "guard-hsp2-not-permanent-residence",
      "guard-hsp2-activity-scope-not-pr-freedom",
      "guard-hsp-pr-shortening-not-automatic-pr"
    ]
  },
  {
    "id": "C2B3-N014.gijinkoku-organization-notification",
    "question": "技人国 换公司 所属機関届出 14日",
    "forbidden_hits": [
      "guard-hsp1-institution-change-not-14day-only"
    ]
  },
  {
    "id": "C2B3-N015.generic-online-renewal",
    "question": "在线申请 在留期間更新 怎么提交",
    "forbidden_hits": [
      "guard-online-jskip-jfind-input-caveat-specific",
      "guard-online-availability-not-substantive-eligibility"
    ]
  },
  {
    "id": "C2B3-N016.business-manager-2025-only",
    "question": "经营管理 2025改正 3000万 常勤职员",
    "forbidden_hits": [
      "guard-jskip-manager-not-business-manager-3000man",
      "guard-business-manager-hsp1ha-criteria-link"
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
const batchCards = cards.filter(card => BATCH3_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH3_IDS.size, 'all P1 Cycle 2 Batch 3 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 2 \/ Batch 3/, `${card.factId} sprint should identify P1 Cycle 2 Batch 3`)
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

console.log(`P1 Cycle 2 Batch 3 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
