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
 *   - Any `official_sources[].url` is outside the source whitelist
 *   - Card has `state ∈ (ai_verified, human_reviewed)` but
 *     `injection_certain_block` (markdown body section) is empty
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
  'mhlw.go.jp',
  'nta.go.jp',
  'meti.go.jp',          // 経済産業省 — startup visa, etc
  'nenkin.go.jp',        // 日本年金機構
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

function extractSourceUrls(value: unknown, factId: string): string[] {
  if (!Array.isArray(value)) {
    throw new SyncError(factId, 'official_sources must be an array')
  }
  const urls: string[] = []
  for (let i = 0; i < value.length; i++) {
    const entry = value[i]
    if (typeof entry === 'string') {
      urls.push(entry)
      continue
    }
    if (entry && typeof entry === 'object' && 'url' in entry) {
      const url = (entry as { url: unknown }).url
      if (typeof url === 'string' && url.length > 0) {
        urls.push(url)
        continue
      }
    }
    throw new SyncError(factId, `official_sources[${i}] is missing a string .url`)
  }
  return urls
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
  const sourceUrls = extractSourceUrls(fm.official_sources, factId)
  const needsReviewFlags = extractNeedsReviewFlagIds(fm.needs_review_flags)

  // Hard-fail: any source URL outside the whitelist
  for (const url of sourceUrls) {
    if (!validateUrlAgainstWhitelist(url)) {
      throw new SyncError(factId, `official_sources URL "${url}" is outside the source whitelist`)
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
