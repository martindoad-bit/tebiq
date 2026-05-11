#!/usr/bin/env tsx
/**
 * 0.6 Sprint Workstream C — Fact Layer sync (ENGINE Pack 2.1).
 *
 * Reads `docs/fact-cards/*.md`, parses YAML frontmatter + body, derives
 * `trigger_keywords` from the body's `## common_user_phrases` section,
 * computes a content_hash, and upserts into the `fact_cards` table.
 *
 * Hard fails (exit 1) if:
 *   - Card lists `state: human_reviewed` but is missing required fields
 *   - Any source/evidence/related URL is outside the source whitelist
 *   - Card has `state ∈ (ai_verified, human_reviewed)` but
 *     `injection_certain_block` (markdown body section) is empty
 *   - Injectable high/critical cards have no user-visible direct evidence
 *
 * Usage:
 *   npx tsx scripts/fact-layer-sync.ts                # production env
 *   npx tsx --env-file=.env.local scripts/fact-layer-sync.ts  # local dev
 *   npm run fact-layer:sync                           # alias
 *
 * NOT wired into `npm run build` — Vercel build doesn't have DB access in
 * the standard plan, and coupling sync to build creates a chicken-and-egg
 * with migrations. GM/PL run sync manually after `npm run db:migrate`.
 *
 * Pack §3 source-of-truth: docs/engineering/0.6-fact-layer-design.md
 *                          §"Sync pipeline".
 */
import { createHash } from 'node:crypto'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import matter from 'gray-matter'
import { sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { factCards, type NewFactCard } from '@/lib/db/schema'

// ----------------------------------------------------------------------------
// Source whitelist (from docs/fact-cards/README.md §"Source whitelist").
// Hardcoded here so sync can hard-fail without round-tripping through the
// README. Keep in lockstep with that README; mismatches are a deploy bug.
// ----------------------------------------------------------------------------
const SOURCE_WHITELIST_DOMAINS: ReadonlyArray<string> = [
  'isa.go.jp',
  'moj.go.jp',
  'elaws.e-gov.go.jp',
  'laws.e-gov.go.jp',
  'mhlw.go.jp',
  'nta.go.jp',
  'soumu.go.jp',         // 総務省 — 住民税 / 地方税
  'meti.go.jp',          // 経済産業省 — startup visa, etc
  'nenkin.go.jp',        // 日本年金機構
  'digital.go.jp',       // デジタル庁 — マイナンバー / マイナ保険証
  'kyoukaikenpo.or.jp',  // 全国健康保険協会 — 任意継続
  'mlit.go.jp',          // 国土交通省 — 住まい / 賃貸
  'fsa.go.jp',           // 金融庁 — 銀行口座
  'cfa.go.jp',           // こども家庭庁 — 児童手当など
  'mext.go.jp',          // 文部科学省 — 学校 / 教育
  'npa.go.jp',           // 警察庁 — 運転免許
  'mofa.go.jp',          // 外務省 — 査証免除 / 入国
  'lg.jp',               // 自治体公式 — 住民税 / 国保などの手続
  // 各市町村区役所 — wildcard not enforced; reviewer handles per-card
]

const KNOWN_STATES = new Set([
  'draft', 'ai_extracted', 'ai_verified', 'human_reviewed',
  'needs_review', 'conflict', 'disabled',
])
const KNOWN_RISK = new Set(['low', 'medium', 'high', 'critical'])
const KNOWN_CONFIDENCE = new Set(['low', 'medium', 'high'])
const KNOWN_SOURCE_QUALITY = new Set(['official', 'quasi_official', 'secondary'])

// States that REQUIRE a non-empty injection_certain_block (because they
// can ever inject). Other states never inject so empty body is OK.
const STATES_REQUIRING_INJECTABLE_BLOCK = new Set(['ai_verified', 'human_reviewed'])

// ----------------------------------------------------------------------------
// Body section extraction.
//
// The cards use a markdown convention with these named sections:
//   ## common_user_phrases    → bullets become trigger_keywords
//   ## injection_format       → contains ### injection_certain_block fenced
//                                code AND ### injection_needs_review_addendum
//
// We parse the body once and extract these by section heading. No regex
// gymnastics — split by `^## ` heading lines.
// ----------------------------------------------------------------------------

interface CardSections {
  commonUserPhraseBullets: string[]
  certainBlock: string | null
  needsReviewAddendum: string | null
}

function extractSections(body: string): CardSections {
  const lines = body.split('\n')
  const sections: Record<string, string[]> = {}
  let currentH2: string | null = null
  let currentH3: string | null = null
  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)\s*$/)
    if (h2) {
      currentH2 = h2[1].trim()
      currentH3 = null
      continue
    }
    const h3 = line.match(/^###\s+(.+?)\s*$/)
    if (h3) {
      currentH3 = h3[1].trim()
      continue
    }
    const key = currentH3
      ? `${currentH2}::${currentH3}`
      : currentH2
    if (!key) continue
    if (!sections[key]) sections[key] = []
    sections[key].push(line)
  }

  // Common user phrases — collect all `- bullet` lines from the section
  // INCLUDING any sub-anchors (技術キーワード / 主要トリガー / etc).
  const phraseLines = sections['common_user_phrases'] ?? []
  const commonUserPhraseBullets: string[] = []
  for (const line of phraseLines) {
    const m = line.match(/^-\s+(.+?)\s*$/)
    if (m && m[1].length > 0 && !m[1].startsWith('❌')) {
      commonUserPhraseBullets.push(m[1])
    }
  }

  // Injection blocks — pull text inside fenced ```text … ``` blocks
  // under the appropriate H3 section.
  const certainBlock = extractFencedText(
    sections['injection_format (for ENGINE C6)::injection_certain_block']
      ?? sections['injection_format::injection_certain_block']
      ?? [],
  )
  const needsReviewAddendum = extractFencedText(
    sections['injection_format (for ENGINE C6)::injection_needs_review_addendum (NOT injected as facts; hint-only)']
      ?? sections['injection_format::injection_needs_review_addendum (NOT injected as facts; hint-only)']
      ?? sections['injection_format::injection_needs_review_addendum']
      ?? sections['injection_format (for ENGINE C6)::injection_needs_review_addendum']
      ?? [],
  )

  return { commonUserPhraseBullets, certainBlock, needsReviewAddendum }
}

function extractFencedText(lines: string[]): string | null {
  let inFence = false
  const collected: string[] = []
  for (const line of lines) {
    if (line.startsWith('```')) {
      // Toggle on/off; treat first ``` as opening even when language tag
      if (inFence) break
      inFence = true
      continue
    }
    if (inFence) collected.push(line)
  }
  if (collected.length === 0) return null
  return collected.join('\n').trim()
}

// ----------------------------------------------------------------------------
// Trigger keyword derivation.
//
// Strategy: the union of all common_user_phrases bullets, deduped + trimmed
// to non-empty strings. Cards with a `技術キーワード（マッチャ用）` sub-anchor
// already have its bullets included since extractSections() collapses
// sub-anchor bullets into the parent section.
//
// We split bullets containing `/` into multiple keywords (e.g.
// "経営管理 / 经营管理 / 经管 / 經管" → 4 entries) so substring scan
// works cleanly. Lower-cased forms are NOT pre-stored — the matcher
// lower-cases haystack + needle at scan time (mirrors Pack 1).
// ----------------------------------------------------------------------------
function deriveTriggerKeywords(bullets: string[]): string[] {
  const out = new Set<string>()
  for (const bullet of bullets) {
    // Split on slash separators commonly used in 技術キーワード bullets
    const parts = bullet.split(/\s*[/／]\s*/)
    for (const part of parts) {
      const cleaned = part.trim()
        // Strip trailing parenthetical comment FIRST (before either
        // bracket gets consumed), then any leftover edge cases:
        // "投資経営 (旧名称、誤用検出用)" → "投資経営"
        // "(some thing)" → "some thing"
        // "key#comment" → "key"
        // "「foo」" → "foo"
        .replace(/\s*[（(].*?[)）]\s*$/, '')
        .replace(/^[（(]\s*|\s*[)）]$/g, '')
        .replace(/\s*#.*$/, '')
        .replace(/^[「『]|[」』]$/g, '')
        .trim()
      if (cleaned.length === 0) continue
      out.add(cleaned)
    }
  }
  // Use Array.from for TS lib target compatibility (no spread on Set)
  const arr: string[] = []
  out.forEach(v => arr.push(v))
  return arr
}

// ----------------------------------------------------------------------------
// Validation.
// ----------------------------------------------------------------------------
class SyncError extends Error {
  constructor(public readonly factId: string, msg: string) {
    super(`[${factId}] ${msg}`)
  }
}

interface CardFrontmatter {
  fact_id?: unknown
  title?: unknown
  state?: unknown
  risk_level?: unknown
  confidence?: unknown
  source_quality?: unknown
  controlled_alpha_eligible?: unknown
  applies_to?: unknown
  official_sources?: unknown
  evidence_points?: unknown
  related_links?: unknown
  needs_review_flags?: unknown
  reviewer?: unknown
  last_verified_at?: unknown
  approved_at?: unknown
  approved_by?: unknown
}

function asNonEmptyString(value: unknown, label: string, factId: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new SyncError(factId, `${label} must be a non-empty string`)
  }
  return value.trim()
}

function asStringArray(value: unknown, label: string, factId: string): string[] {
  if (!Array.isArray(value)) {
    throw new SyncError(factId, `${label} must be an array`)
  }
  return value.map((v, i) => {
    if (typeof v !== 'string' || v.trim().length === 0) {
      throw new SyncError(factId, `${label}[${i}] must be a non-empty string`)
    }
    return v.trim()
  })
}

interface OfficialSourceEntry {
  url: string
  title?: string
  label?: string
  publisher?: string
}

interface EvidencePointEntry {
  claim: string
  source_title: string
  source_url: string
  source_organization?: string
  source_locator?: string
  display_label?: string
  support_level: 'direct' | 'indirect' | 'background'
  user_visible: boolean
  needs_domain_review: boolean
}

interface RelatedLinkEntry {
  title: string
  url: string
  organization?: string
  display_label?: string
  locator?: string
  relation?: string
}

function extractOfficialSources(value: unknown, factId: string): OfficialSourceEntry[] {
  if (!Array.isArray(value)) {
    throw new SyncError(factId, 'official_sources must be an array')
  }
  const sources: OfficialSourceEntry[] = []
  for (let i = 0; i < value.length; i++) {
    const entry = value[i]
    if (typeof entry === 'string') {
      sources.push({ url: entry })
      continue
    }
    if (entry && typeof entry === 'object' && 'url' in entry) {
      const src = entry as {
        url: unknown
        title?: unknown
        label?: unknown
        publisher?: unknown
      }
      const url = src.url
      if (typeof url === 'string' && url.length > 0) {
        sources.push({
          url,
          title: typeof src.title === 'string' ? src.title.trim() : undefined,
          label: typeof src.label === 'string' ? src.label.trim() : undefined,
          publisher: typeof src.publisher === 'string' ? src.publisher.trim() : undefined,
        })
        continue
      }
    }
    throw new SyncError(factId, `official_sources[${i}] is missing a string .url`)
  }
  return sources
}

function normalizeEvidencePoints(value: unknown, factId: string): EvidencePointEntry[] {
  if (value == null) return []
  if (!Array.isArray(value)) {
    throw new SyncError(factId, 'evidence_points must be an array when present')
  }
  return value.map((entry, i) => {
    if (!entry || typeof entry !== 'object') {
      throw new SyncError(factId, `evidence_points[${i}] must be an object`)
    }
    const e = entry as Record<string, unknown>
    const support = typeof e.support_level === 'string' ? e.support_level : 'background'
    if (!['direct', 'indirect', 'background'].includes(support)) {
      throw new SyncError(factId, `evidence_points[${i}].support_level must be direct|indirect|background`)
    }
    return {
      claim: asNonEmptyString(e.claim, `evidence_points[${i}].claim`, factId),
      source_title: asNonEmptyString(e.source_title, `evidence_points[${i}].source_title`, factId),
      source_url: asNonEmptyString(e.source_url, `evidence_points[${i}].source_url`, factId),
      source_organization: typeof e.source_organization === 'string' ? e.source_organization.trim() : undefined,
      source_locator: typeof e.source_locator === 'string' ? e.source_locator.trim() : undefined,
      display_label: typeof e.display_label === 'string' ? e.display_label.trim() : undefined,
      support_level: support as EvidencePointEntry['support_level'],
      user_visible: e.user_visible !== false,
      needs_domain_review: e.needs_domain_review === true,
    }
  })
}

function normalizeRelatedLinks(
  value: unknown,
  officialSources: ReadonlyArray<OfficialSourceEntry>,
  factId: string,
): RelatedLinkEntry[] {
  if (value == null) {
    return officialSources.map(source => ({
      title: source.title || source.label || sourceLabelForUrl(source.url),
      url: source.url,
      organization: source.publisher || organizationForUrl(source.url),
      display_label: source.label || source.title || sourceLabelForUrl(source.url),
      relation: 'official_reference',
    }))
  }
  if (!Array.isArray(value)) {
    throw new SyncError(factId, 'related_links must be an array when present')
  }
  return value.map((entry, i) => {
    if (!entry || typeof entry !== 'object') {
      throw new SyncError(factId, `related_links[${i}] must be an object`)
    }
    const e = entry as Record<string, unknown>
    return {
      title: asNonEmptyString(e.title, `related_links[${i}].title`, factId),
      url: asNonEmptyString(e.url, `related_links[${i}].url`, factId),
      organization: typeof e.organization === 'string' ? e.organization.trim() : undefined,
      display_label: typeof e.display_label === 'string' ? e.display_label.trim() : undefined,
      locator: typeof e.locator === 'string' ? e.locator.trim() : undefined,
      relation: typeof e.relation === 'string' ? e.relation.trim() : undefined,
    }
  })
}

function sourceLabelForUrl(url: string): string {
  const org = organizationForUrl(url)
  return org === '官方资料' ? hostnameOf(url) : `${org}：相关资料`
}

function organizationForUrl(url: string): string {
  const host = hostnameOf(url)
  if (/moj\.go\.jp$/i.test(host) || /isa\.go\.jp$/i.test(host)) return '出入国在留管理庁'
  if (/mhlw\.go\.jp$/i.test(host)) return '厚生労働省'
  if (/nenkin\.go\.jp$/i.test(host)) return '日本年金機構'
  if (/soumu\.go\.jp$/i.test(host)) return '総務省'
  if (/nta\.go\.jp$/i.test(host)) return '国税庁'
  if (/digital\.go\.jp$/i.test(host)) return 'デジタル庁'
  if (/kyoukaikenpo\.or\.jp$/i.test(host)) return '全国健康保険協会'
  if (/mlit\.go\.jp$/i.test(host)) return '国土交通省'
  if (/fsa\.go\.jp$/i.test(host)) return '金融庁'
  if (/cfa\.go\.jp$/i.test(host)) return 'こども家庭庁'
  if (/mext\.go\.jp$/i.test(host)) return '文部科学省'
  if (/npa\.go\.jp$/i.test(host)) return '警察庁'
  if (/mofa\.go\.jp$/i.test(host)) return '外務省'
  if (/laws\.e-gov\.go\.jp$/i.test(host) || /elaws\.e-gov\.go\.jp$/i.test(host)) return 'e-Gov法令検索'
  if (/\.lg\.jp$/i.test(host)) return '自治体'
  if (/\.go\.jp$/i.test(host)) return '日本政府'
  return '官方资料'
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.slice(0, 32)
  }
}

function uniqueStrings(values: ReadonlyArray<string>): string[] {
  const out: string[] = []
  const seen = new Set<string>()
  for (const value of values) {
    const cleaned = value.trim()
    if (!cleaned || seen.has(cleaned)) continue
    seen.add(cleaned)
    out.push(cleaned)
  }
  return out
}

function extractNeedsReviewFlagIds(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  const ids: string[] = []
  for (const entry of value) {
    if (typeof entry === 'string') {
      ids.push(entry)
      continue
    }
    if (entry && typeof entry === 'object' && 'id' in entry) {
      const id = (entry as { id: unknown }).id
      if (typeof id === 'string') ids.push(id)
      continue
    }
    // FACT cards commonly use YAML mapping syntax:
    //   - flag_id: human-readable reason
    // Preserve the mapping key as the audit flag id.
    if (entry && typeof entry === 'object') {
      const keys = Object.keys(entry)
      if (keys.length === 1 && typeof keys[0] === 'string' && keys[0].length > 0) {
        ids.push(keys[0])
      }
    }
  }
  return ids
}

function validateUrlAgainstWhitelist(url: string): boolean {
  let host: string
  try {
    host = new URL(url).hostname.toLowerCase()
  } catch {
    return false
  }
  return SOURCE_WHITELIST_DOMAINS.some(domain =>
    host === domain || host.endsWith(`.${domain}`),
  )
}

// ----------------------------------------------------------------------------
// Per-card normalize.
// ----------------------------------------------------------------------------
interface NormalizedCard extends NewFactCard {
  factId: string
}

function normalize(filePath: string, raw: string): NormalizedCard {
  const parsed = matter(raw)
  const fm = parsed.data as CardFrontmatter
  const factId = asNonEmptyString(fm.fact_id, 'fact_id', String(fm.fact_id ?? '<unknown>'))
  const title = asNonEmptyString(fm.title, 'title', factId)

  const state = asNonEmptyString(fm.state, 'state', factId)
  if (!KNOWN_STATES.has(state)) {
    throw new SyncError(factId, `unknown state "${state}"; allowed: ${Array.from(KNOWN_STATES).join('|')}`)
  }
  const riskLevel = asNonEmptyString(fm.risk_level, 'risk_level', factId)
  if (!KNOWN_RISK.has(riskLevel)) {
    throw new SyncError(factId, `unknown risk_level "${riskLevel}"`)
  }
  const confidence = asNonEmptyString(fm.confidence, 'confidence', factId)
  if (!KNOWN_CONFIDENCE.has(confidence)) {
    throw new SyncError(factId, `unknown confidence "${confidence}"`)
  }
  const sourceQuality = asNonEmptyString(fm.source_quality, 'source_quality', factId)
  if (!KNOWN_SOURCE_QUALITY.has(sourceQuality)) {
    throw new SyncError(factId, `unknown source_quality "${sourceQuality}"`)
  }

  const controlledAlphaEligible = fm.controlled_alpha_eligible === true
  const appliesTo = asStringArray(fm.applies_to, 'applies_to', factId)
  const officialSources = extractOfficialSources(fm.official_sources, factId)
  const evidencePoints = normalizeEvidencePoints(fm.evidence_points, factId)
  const relatedLinks = normalizeRelatedLinks(fm.related_links, officialSources, factId)
  const sourceUrls = uniqueStrings([
    ...officialSources.map(s => s.url),
    ...evidencePoints.map(e => e.source_url),
    ...relatedLinks.map(l => l.url),
  ])
  const needsReviewFlags = extractNeedsReviewFlagIds(fm.needs_review_flags)

  if (state === 'ai_verified' && riskLevel === 'critical' && controlledAlphaEligible && confidence !== 'high') {
    throw new SyncError(
      factId,
      'critical ai_verified cards may set controlled_alpha_eligible=true only when confidence=high',
    )
  }

  // Hard-fail: any source URL outside the whitelist
  for (const url of sourceUrls) {
    if (!validateUrlAgainstWhitelist(url)) {
      throw new SyncError(factId, `source URL "${url}" is outside the source whitelist`)
    }
  }

  // Body sections
  const sections = extractSections(parsed.content)
  const triggerKeywords = deriveTriggerKeywords(sections.commonUserPhraseBullets)
  if (triggerKeywords.length === 0) {
    throw new SyncError(
      factId,
      'no trigger_keywords could be derived from `## common_user_phrases` section (matcher would never fire)',
    )
  }

  // Hard-fail: ai_verified / human_reviewed without injection_certain_block
  const certainBlock = sections.certainBlock
  if (STATES_REQUIRING_INJECTABLE_BLOCK.has(state)) {
    if (!certainBlock || certainBlock.length === 0) {
      throw new SyncError(
        factId,
        `state="${state}" but body's \`### injection_certain_block\` fenced text is empty`,
      )
    }

    if ((riskLevel === 'high' || riskLevel === 'critical')) {
      const directEvidence = evidencePoints.filter(point =>
        point.user_visible && point.support_level === 'direct' && !point.needs_domain_review,
      )
      if (directEvidence.length === 0) {
        throw new SyncError(
          factId,
          'injectable high/critical cards must include at least one user-visible direct evidence point',
        )
      }
    }
  }

  // Last verified — accept ISO date or ISO datetime
  const lastVerifiedRaw = fm.last_verified_at
  let lastVerifiedAt: Date
  if (lastVerifiedRaw instanceof Date) {
    lastVerifiedAt = lastVerifiedRaw
  } else if (typeof lastVerifiedRaw === 'string') {
    const d = new Date(lastVerifiedRaw)
    if (Number.isNaN(d.getTime())) {
      throw new SyncError(factId, `last_verified_at "${lastVerifiedRaw}" is not a valid date`)
    }
    lastVerifiedAt = d
  } else {
    throw new SyncError(factId, 'last_verified_at is required')
  }

  let approvedAt: Date | null = null
  if (fm.approved_at) {
    const d = new Date(fm.approved_at as string | number | Date)
    if (!Number.isNaN(d.getTime())) approvedAt = d
  }

  // Repo-relative path for permalink generation
  const filesystemPath = filePath.includes('docs/fact-cards/')
    ? filePath.slice(filePath.indexOf('docs/fact-cards/'))
    : filePath

  // sha256 of (frontmatter + body) — drift detection
  const contentHash = createHash('sha256').update(raw).digest('hex')

  return {
    factId,
    title,
    state,
    riskLevel,
    confidence,
    sourceQuality,
    controlledAlphaEligible,
    appliesTo,
    triggerKeywords,
    injectionCertainBlock: certainBlock ?? '',
    injectionNeedsReviewAddendum: sections.needsReviewAddendum,
    needsReviewFlags,
    sourceUrls,
    evidencePoints,
    relatedLinks,
    reviewer: typeof fm.reviewer === 'string' ? fm.reviewer : null,
    lastVerifiedAt,
    approvedAt,
    approvedBy: typeof fm.approved_by === 'string' ? fm.approved_by : null,
    filesystemPath,
    contentHash,
  }
}

// ----------------------------------------------------------------------------
// Filesystem walk.
// ----------------------------------------------------------------------------
const FACT_CARDS_DIR = join(process.cwd(), 'docs/fact-cards')
const EXCLUDED_FILES = new Set(['README.md', 'FACT_OPS_WINDOW_TASK_PACK.md'])

interface SyncResult {
  scanned: number
  upserted: number
  errors: SyncError[]
  cards: NormalizedCard[]
}

export async function runSync(opts: { dryRun?: boolean } = {}): Promise<SyncResult> {
  const result: SyncResult = { scanned: 0, upserted: 0, errors: [], cards: [] }
  const files = readdirSync(FACT_CARDS_DIR).filter(f =>
    f.endsWith('.md') && !EXCLUDED_FILES.has(f),
  )

  for (const file of files) {
    result.scanned += 1
    const path = join(FACT_CARDS_DIR, file)
    try {
      const raw = readFileSync(path, 'utf8')
      const card = normalize(path, raw)
      result.cards.push(card)
    } catch (err) {
      if (err instanceof SyncError) {
        result.errors.push(err)
      } else {
        result.errors.push(new SyncError(file, (err as Error).message))
      }
    }
  }

  if (result.errors.length > 0) return result

  if (opts.dryRun) return result

  for (const card of result.cards) {
    await db
      .insert(factCards)
      .values(card)
      .onConflictDoUpdate({
        target: factCards.factId,
        set: {
          title: card.title,
          state: card.state,
          riskLevel: card.riskLevel,
          confidence: card.confidence,
          sourceQuality: card.sourceQuality,
          controlledAlphaEligible: card.controlledAlphaEligible,
          appliesTo: card.appliesTo,
          triggerKeywords: card.triggerKeywords,
          injectionCertainBlock: card.injectionCertainBlock,
          injectionNeedsReviewAddendum: card.injectionNeedsReviewAddendum ?? null,
          needsReviewFlags: card.needsReviewFlags,
          sourceUrls: card.sourceUrls,
          evidencePoints: card.evidencePoints,
          relatedLinks: card.relatedLinks,
          reviewer: card.reviewer ?? null,
          lastVerifiedAt: card.lastVerifiedAt,
          approvedAt: card.approvedAt ?? null,
          approvedBy: card.approvedBy ?? null,
          filesystemPath: card.filesystemPath,
          contentHash: card.contentHash,
          updatedAt: sql`now()`,
        },
      })
    result.upserted += 1
  }

  return result
}

// ----------------------------------------------------------------------------
// Internal helpers exposed for unit tests (NOT importable for runtime use)
// ----------------------------------------------------------------------------
export const _internals = {
  extractSections,
  deriveTriggerKeywords,
  validateUrlAgainstWhitelist,
  normalize,
}

// ----------------------------------------------------------------------------
// CLI entry. Skipped when imported as a module (e.g. by tests).
// ----------------------------------------------------------------------------
const isMain = import.meta.url === `file://${process.argv[1]}`
if (isMain) {
  const dryRun = process.argv.includes('--dry-run')
  void runSync({ dryRun })
    .then(r => {
      console.log(`fact-layer-sync: scanned=${r.scanned} upserted=${r.upserted} errors=${r.errors.length}`)
      if (r.errors.length > 0) {
        for (const e of r.errors) console.error(`  ✗ ${e.message}`)
        process.exit(1)
      }
      if (dryRun) {
        console.log('--dry-run: no DB writes performed')
        for (const card of r.cards) {
          console.log(
            `  ✓ ${card.factId} state=${card.state} risk=${card.riskLevel} ` +
              `triggers=${card.triggerKeywords.length} hash=${card.contentHash.slice(0, 12)}…`,
          )
        }
      }
    })
    .catch(err => {
      console.error('fact-layer-sync fatal:', err)
      process.exit(1)
    })
}
