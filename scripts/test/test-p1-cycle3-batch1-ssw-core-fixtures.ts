/**
 * Legal Source Engineering — P1 Cycle 3 Batch 1 dry-run fixtures.
 *
 * Scope:
 *   - 特定技能1号/2号 core boundaries.
 *   - Total-period, family-stay, field, material-structure, procedure, and status-mix protection.
 *   - Production isolation for ai_extracted cards.
 *
 * Usage: npx tsx scripts/test/test-p1-cycle3-batch1-ssw-core-fixtures.ts
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

const BATCH1_IDS = new Set([
  "ssw1-ssw2-status-skill-period-boundary",
  "ssw1-total-period-five-year-source",
  "ssw2-no-total-period-limit-source",
  "ssw1-total-period-counts-nonwork-reentry-source",
  "ssw1-total-period-exception-periods-source",
  "ssw1-prep-activity-counts-to-five-year-source",
  "ssw-field-work-scope-annex-required-source",
  "ssw-material-table-field-structure-source",
  "ssw1-family-stay-not-sponsor-source",
  "ssw2-family-stay-sponsor-dependent-scope-source",
  "ssw-skill-japanese-not-only-requirements-source",
  "ssw-change-application-activity-change-prompt-source",
  "ssw-organization-change-requires-status-change-source",
  "ssw-vs-technical-intern-training-status-boundary-source",
  "ssw-vs-skilled-labor-status-boundary-source",
  "ssw-vs-gijinkoku-work-scope-boundary-source",
  "ssw-vs-qoa-part-time-boundary-source",
  "ssw2-field-availability-not-all-ssw1-fields-source"
])

const POSITIVE_FIXTURES: Fixture[] = [
  {
    "id": "C3B1-001",
    "question": "特定技能1号 2号 違い",
    "expected_primary_hit": "ssw1-ssw2-status-skill-period-boundary"
  },
  {
    "id": "C3B1-002",
    "question": "特定技能1号 5年",
    "expected_primary_hit": "ssw1-total-period-five-year-source"
  },
  {
    "id": "C3B1-003",
    "question": "特定技能2号 上限なし",
    "expected_primary_hit": "ssw2-no-total-period-limit-source"
  },
  {
    "id": "C3B1-004",
    "question": "特定技能1号 一時帰国 5年 含まれる",
    "expected_primary_hit": "ssw1-total-period-counts-nonwork-reentry-source"
  },
  {
    "id": "C3B1-005",
    "question": "特定技能1号 産休 5年",
    "expected_primary_hit": "ssw1-total-period-exception-periods-source"
  },
  {
    "id": "C3B1-006",
    "question": "特定技能1号準備 6か月 5年",
    "expected_primary_hit": "ssw1-prep-activity-counts-to-five-year-source"
  },
  {
    "id": "C3B1-007",
    "question": "特定技能 業務範囲",
    "expected_primary_hit": "ssw-field-work-scope-annex-required-source"
  },
  {
    "id": "C3B1-008",
    "question": "特定技能 提出書類 第1表",
    "expected_primary_hit": "ssw-material-table-field-structure-source"
  },
  {
    "id": "C3B1-009",
    "question": "特定技能1号 家族滞在",
    "expected_primary_hit": "ssw1-family-stay-not-sponsor-source"
  },
  {
    "id": "C3B1-010",
    "question": "特定技能2号 家族滞在",
    "expected_primary_hit": "ssw2-family-stay-sponsor-dependent-scope-source"
  },
  {
    "id": "C3B1-011",
    "question": "特定技能 試験 受かれば 取れる",
    "expected_primary_hit": "ssw-skill-japanese-not-only-requirements-source"
  },
  {
    "id": "C3B1-012",
    "question": "留学から特定技能 変更",
    "expected_primary_hit": "ssw-change-application-activity-change-prompt-source"
  },
  {
    "id": "C3B1-013",
    "question": "特定技能 転職 14日届出",
    "expected_primary_hit": "ssw-organization-change-requires-status-change-source"
  },
  {
    "id": "C3B1-014",
    "question": "技能実習 特定技能 同じ",
    "expected_primary_hit": "ssw-vs-technical-intern-training-status-boundary-source"
  },
  {
    "id": "C3B1-015",
    "question": "技能 特定技能 違い",
    "expected_primary_hit": "ssw-vs-skilled-labor-status-boundary-source"
  },
  {
    "id": "C3B1-016",
    "question": "特定技能 事務職",
    "expected_primary_hit": "ssw-vs-gijinkoku-work-scope-boundary-source"
  },
  {
    "id": "C3B1-017",
    "question": "特定技能 アルバイト 28時間",
    "expected_primary_hit": "ssw-vs-qoa-part-time-boundary-source"
  },
  {
    "id": "C3B1-018",
    "question": "特定技能2号 分野",
    "expected_primary_hit": "ssw2-field-availability-not-all-ssw1-fields-source"
  },
  {
    "id": "C3B1-019.natural-five-year",
    "question": "特定技能1号 4年半 续多久",
    "expected_primary_hit": "ssw1-total-period-five-year-source"
  },
  {
    "id": "C3B1-020.natural-family",
    "question": "特定技能1号 配偶孩子 家族滞在",
    "expected_primary_hit": "ssw1-family-stay-not-sponsor-source"
  },
  {
    "id": "C3B1-021.natural-test-only",
    "question": "特定技能考试过了是不是一定拿到",
    "expected_primary_hit": "ssw-skill-japanese-not-only-requirements-source"
  },
  {
    "id": "C3B1-022.natural-job-change",
    "question": "特定技能 换公司 只要14天届出",
    "expected_primary_hit": "ssw-organization-change-requires-status-change-source"
  },
  {
    "id": "C3B1-023.natural-office-work",
    "question": "外食 特定技能 事务职",
    "expected_primary_hit": "ssw-vs-gijinkoku-work-scope-boundary-source"
  },
  {
    "id": "C3B1-024.natural-field-scope",
    "question": "外食特定技能 能不能去做便利店",
    "expected_primary_hit": "ssw-field-work-scope-annex-required-source"
  }
]

const BROAD_NEGATIVE_FIXTURES = [
  {
    "id": "C3B1-N001.ordinary-dependent-work",
    "question": "家族滞在 配偶者 28時間 打工许可",
    "forbidden_hits": [
      "ssw1-family-stay-not-sponsor-source",
      "ssw2-family-stay-sponsor-dependent-scope-source",
      "ssw-vs-qoa-part-time-boundary-source"
    ]
  },
  {
    "id": "C3B1-N002.gijinkoku-office-only",
    "question": "技人国 事務職 転職できますか",
    "forbidden_hits": [
      "ssw-vs-gijinkoku-work-scope-boundary-source"
    ]
  },
  {
    "id": "C3B1-N003.titp-only",
    "question": "技能実習2号 良好修了 監理団体",
    "forbidden_hits": [
      "ssw-vs-technical-intern-training-status-boundary-source"
    ]
  },
  {
    "id": "C3B1-N004.skilled-labor-only",
    "question": "技能签证 厨师 10年经验",
    "forbidden_hits": [
      "ssw-vs-skilled-labor-status-boundary-source"
    ]
  },
  {
    "id": "C3B1-N005.generic-renewal-fee",
    "question": "在留期間更新 手数料 収入印紙",
    "forbidden_hits": [
      "ssw1-total-period-five-year-source",
      "ssw2-no-total-period-limit-source",
      "ssw-material-table-field-structure-source"
    ]
  },
  {
    "id": "C3B1-N006.hsp-jskip",
    "question": "J-Skip 高度専門職 家族 特例",
    "forbidden_hits": [
      "ssw1-family-stay-not-sponsor-source",
      "ssw2-family-stay-sponsor-dependent-scope-source"
    ]
  },
  {
    "id": "C3B1-N007.jfind",
    "question": "J-Find 就職活動 最長2年",
    "forbidden_hits": [
      "ssw-change-application-activity-change-prompt-source",
      "ssw-vs-qoa-part-time-boundary-source"
    ]
  },
  {
    "id": "C3B1-N008.business-manager",
    "question": "经营管理 3000万 常勤职员 2025改正",
    "forbidden_hits": [
      "ssw-skill-japanese-not-only-requirements-source"
    ]
  },
  {
    "id": "C3B1-N009.generic-online",
    "question": "在线申请 在留期間更新 怎么提交",
    "forbidden_hits": [
      "ssw-material-table-field-structure-source"
    ]
  },
  {
    "id": "C3B1-N010.field-only-construction",
    "question": "建設キャリアアップシステム 登録 方法",
    "forbidden_hits": [
      "ssw-field-work-scope-annex-required-source",
      "ssw2-field-availability-not-all-ssw1-fields-source"
    ]
  },
  {
    "id": "C3B1-N011.field-only-food",
    "question": "外食業 技能測定試験 日程",
    "forbidden_hits": [
      "ssw-field-work-scope-annex-required-source",
      "ssw2-field-availability-not-all-ssw1-fields-source"
    ]
  },
  {
    "id": "C3B1-N012.pr-question",
    "question": "永住申請 年金 直近2年",
    "forbidden_hits": [
      "ssw1-total-period-five-year-source",
      "ssw2-no-total-period-limit-source"
    ]
  },
  {
    "id": "C3B1-N013.family-stay-materials-only",
    "question": "家族滞在 更新 必要書類 扶養者",
    "forbidden_hits": [
      "ssw1-family-stay-not-sponsor-source",
      "ssw2-family-stay-sponsor-dependent-scope-source"
    ]
  },
  {
    "id": "C3B1-N014.generic-job-change",
    "question": "転職したら14日以内に所属機関届出",
    "forbidden_hits": [
      "ssw-organization-change-requires-status-change-source"
    ]
  },
  {
    "id": "C3B1-N015.qoa-only",
    "question": "留学生 資格外活動 28時間 バイト",
    "forbidden_hits": [
      "ssw-vs-qoa-part-time-boundary-source"
    ]
  },
  {
    "id": "C3B1-N016.student-to-work-general",
    "question": "留学生 卒業後 就職 技人国",
    "forbidden_hits": [
      "ssw-change-application-activity-change-prompt-source",
      "ssw-vs-gijinkoku-work-scope-boundary-source"
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
const batchCards = cards.filter(card => BATCH1_IDS.has(card.factId))

assert.equal(batchCards.length, BATCH1_IDS.size, 'all P1 Cycle 3 Batch 1 cards should exist')

for (const card of batchCards) {
  assert.equal(card.state, 'ai_extracted', `${card.factId} must remain ai_extracted`)
  assert.equal(gateDecision(card), 'drop', `${card.factId} must be dropped by production gate`)
  assert.equal(card.injectionCertainBlock, '', `${card.factId} injection block must stay empty`)
  assert.equal(card.injectionNeedsReviewAddendum ?? '', '', `${card.factId} review addendum must stay empty`)
  assert.match(card.sprint, /P1 Cycle 3 \/ Batch 1/, `${card.factId} sprint should identify P1 Cycle 3 Batch 1`)
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
    assert.equal(BATCH1_IDS.has(prediction.fact_id), false, `${fixture.id} must not include Batch 1 cards in production predictions`)
  }
}

for (const fixture of BROAD_NEGATIVE_FIXTURES) {
  const hitIds = new Set(topPredictions(fixture.question, batchCards).map(prediction => prediction.fact_id))
  for (const forbidden of fixture.forbidden_hits) {
    assert.equal(hitIds.has(forbidden), false, `${fixture.id} must not over-hit ${forbidden}`)
  }
}

console.log(`P1 Cycle 3 Batch 1 dry-run fixtures passed: ${POSITIVE_FIXTURES.length + BROAD_NEGATIVE_FIXTURES.length} fixtures, ${batchCards.length} cards`)
