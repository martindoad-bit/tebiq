// 0.6 Sprint Workstream C — Fact Layer matcher (ENGINE Pack 2.1).
//
// Loads candidate cards from `fact_cards` table, runs substring keyword
// scan, applies state × risk_level gate, returns top matches with full
// gate decisions.
//
// Pure DB read + in-memory scan. No LLM. No embedding. No filesystem
// access (production reads from `fact_cards` table; the filesystem is
// only the source-of-truth that sync ETLs from).
//
// Pack §4 source-of-truth: docs/engineering/0.6-fact-layer-design.md
//                          §"Matcher" + §"State machine".

import { eq, inArray, or } from 'drizzle-orm'
import { db } from '@/lib/db'
import { factCards, type FactCard } from '@/lib/db/schema'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type GateDecision = 'inject' | 'hint_only' | 'drop'

export interface FactCardMatch {
  fact_id: string
  title: string
  matched_keywords: string[]
  score: number
  state: string
  risk_level: string
  confidence: string
  source_quality: string
  controlled_alpha_eligible: boolean
  decision: GateDecision
  /** Source URLs verbatim from the card (for audit/Learning Console). */
  official_sources: string[]
  /** Claim-level evidence points for user-visible source cards. */
  evidence_points: FactCard['evidencePoints']
  /** Card-level related links. May be broader than exact claim evidence. */
  related_links: FactCard['relatedLinks']
  /** Field IDs the card declared as withheld; passed through to audit. */
  needs_review_flags: string[]
  /** Card body content (resolve {{TODAY_ISO}} at injection time, not here). */
  injection_certain_block: string
  injection_needs_review_addendum: string | null
}

export interface MatchOptions {
  /** When true, includes `ai_extracted` cards in candidate set. Used by
   *  the internal dry-run endpoint to preview cards before promotion. */
  include_dry_run_states?: boolean
  /** Today's date used for {{TODAY_ISO}} substitution downstream. The
   *  matcher itself does NOT substitute — it returns the raw block so
   *  callers can decide on substitution policy. Provided here so the
   *  matcher signature remains stable across that future change. */
  today?: Date
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** Minimum matched/total ratio for a low/medium card to enter the result
 *  set. high/critical cards bypass this threshold (any keyword match
 *  fires) per Pack §4 / design doc §"Matcher" v0.6. */
const SCORE_THRESHOLD_LOW_MEDIUM = 0.15

/** A second gate for expanded fact cards. As cards accumulate Chinese and
 *  Japanese trigger variants, ratio-only scoring makes useful low/medium
 *  cards harder to hit. Three distinct keyword hits is enough evidence for
 *  procedural cards (年金/健保/税 etc.) even when the ratio is diluted. */
const MIN_ABSOLUTE_MATCHES_LOW_MEDIUM = 3

/** Maximum cards to surface to the prompt budget (Pack §4 / design
 *  §"Matcher" cap). Cards beyond this are dropped silently — they don't
 *  count toward audit. */
const MAX_INJECTED = 2

/** Risk-level numeric rank for sorting. Higher = surfaced first. */
const RISK_RANK: Record<string, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

const FACT_ID_REQUIRED_CONTEXT: Record<string, readonly string[]> = {
  'spouse-divorce-separation': [
    '離婚', '离婚', '別居', '分居', '配偶', '配偶者', '老公', '老婆',
    '丈夫', '妻子', '夫婦', '家暴', 'dv',
  ],
  'kazoku-taizai-yoken': [
    '家族滞在', '家族ビザ', '家族签证', '扶養ビザ', '家族帯同', '帯同',
    '呼び寄せ', '家族来日', '家人', '家属', '妻を呼ぶ', '夫を呼ぶ',
    '子どもを連れてくる', '配偶者を日本に連れてくる',
    '老婆来日本', '老公来日本', '孩子来日本',
  ],
  'keiei-kanri-2025-10': [
    '経営管理', '经营管理', '經營管理', '经管', '經管', '経営・管理',
    '经营・管理', '经营签', '管理签', '开公司', '開業', '起業', '创业',
    '创办公司',
  ],
  'keiei-kanri-existing-holder-update': [
    '経営管理', '经营管理', '經營管理', '经管', '經管', '経営・管理',
    '经营・管理', '经营签', '管理签', '开公司', '開業', '起業', '创业',
    '创办公司',
  ],
  'ryugaku-gijinkoku-henko': [
    '留学', '留学生', '卒業', '毕业', '専門学校', '专门学校', '学校',
    '内定', '就職', '就活',
  ],
}

/** States allowed in the candidate set per matcher policy. dry-run mode
 *  expands this set to include `ai_extracted`. */
const PRODUCTION_CANDIDATE_STATES = ['ai_verified', 'human_reviewed', 'needs_review'] as const
const DRY_RUN_CANDIDATE_STATES = [
  'ai_verified', 'human_reviewed', 'needs_review', 'ai_extracted',
] as const

const UNCERTAIN_INJECTION_LINE =
  /(ai推定|AI推定|確認要|要確認|確認中|法令照合|DOMAIN確認|審査基準要確認|未確認)/

// ---------------------------------------------------------------------------
// State × risk gate (per docs/fact-cards/README.md state machine)
// ---------------------------------------------------------------------------
function gateDecision(card: FactCard): GateDecision {
  // Terminal-block states — no facts, period.
  if (card.state === 'draft' || card.state === 'conflict' || card.state === 'disabled') {
    return 'drop'
  }
  // Pre-approved AI extraction stage — never injects in prod (the
  // dry-run path may surface these but the gate still says "drop"
  // because the gate's job is "is this safe to inject"; the dry-run
  // endpoint reports its own would_inject flag separately).
  if (card.state === 'ai_extracted') {
    return 'drop'
  }
  // needs_review (whole-card) — never inject facts; matcher emits a
  // generic conservative hint via decision='hint_only'.
  if (card.state === 'needs_review') {
    return 'hint_only'
  }
  // human_reviewed — always injects if matched at all (the human is
  // the final gate by definition).
  if (card.state === 'human_reviewed') {
    return 'inject'
  }
  // ai_verified — risk-gated.
  if (card.state === 'ai_verified') {
    if (card.riskLevel === 'low' || card.riskLevel === 'medium' || card.riskLevel === 'high') {
      return 'inject'
    }
    if (card.riskLevel === 'critical') {
      // Critical AI-verified cards inject ONLY when the card explicitly
      // marks `controlled_alpha_eligible: true` (PL §7+§11). Otherwise
      // we surface a hint marker but withhold the facts.
      return card.controlledAlphaEligible ? 'inject' : 'hint_only'
    }
  }
  // Unknown state combination — fail closed (no fact injection).
  return 'hint_only'
}

// ---------------------------------------------------------------------------
// Substring scoring
// ---------------------------------------------------------------------------
interface RawMatch {
  card: FactCard
  matchedKeywords: string[]
  score: number
}

function scoreCardAgainst(card: FactCard, haystackLower: string): RawMatch | null {
  const triggers = (card.triggerKeywords ?? []) as string[]
  if (triggers.length === 0) return null
  const matched: string[] = []
  const seen = new Set<string>()
  for (const kw of triggers) {
    const kwLower = kw.toLowerCase()
    if (seen.has(kwLower)) continue
    if (haystackLower.includes(kwLower)) {
      matched.push(kw)
      seen.add(kwLower)
    }
  }
  if (matched.length === 0) return null
  if (!passesFactIdContextGuard(card.factId, haystackLower)) return null

  const uniqueTotal = new Set(triggers.map(t => t.toLowerCase())).size
  const score = Math.min(1, matched.length / Math.max(1, uniqueTotal))

  // Threshold gate. high/critical cards bypass per Pack §4.
  const isHighRisk = card.riskLevel === 'high' || card.riskLevel === 'critical'
  if (
    !isHighRisk &&
    score < SCORE_THRESHOLD_LOW_MEDIUM &&
    matched.length < MIN_ABSOLUTE_MATCHES_LOW_MEDIUM
  ) {
    return null
  }

  return { card, matchedKeywords: matched, score }
}

function passesFactIdContextGuard(factId: string, haystackLower: string): boolean {
  const requiredContext = FACT_ID_REQUIRED_CONTEXT[factId]
  if (!requiredContext) return true
  return requiredContext.some(term => haystackLower.includes(term.toLowerCase()))
}

// ---------------------------------------------------------------------------
// Loader (DB read)
// ---------------------------------------------------------------------------
async function loadCandidateCards(includeDryRun: boolean): Promise<FactCard[]> {
  const states = includeDryRun
    ? Array.from(DRY_RUN_CANDIDATE_STATES)
    : Array.from(PRODUCTION_CANDIDATE_STATES)
  return db.select().from(factCards).where(inArray(factCards.state, states))
}

// ---------------------------------------------------------------------------
// Public matcher
// ---------------------------------------------------------------------------
export async function matchFactCards(
  question: string,
  options: MatchOptions = {},
): Promise<FactCardMatch[]> {
  if (!question || !question.trim()) return []
  const haystackLower = question.toLowerCase()

  const candidates = await loadCandidateCards(options.include_dry_run_states ?? false)
  const raws: RawMatch[] = []
  for (const card of candidates) {
    const r = scoreCardAgainst(card, haystackLower)
    if (r) raws.push(r)
  }

  // Sort by (risk_level rank desc, score desc, fact_id asc) so the
  // top of the list is the most-impactful match, and the order is
  // stable across runs.
  raws.sort((a, b) => {
    const dr = (RISK_RANK[b.card.riskLevel] ?? 0) - (RISK_RANK[a.card.riskLevel] ?? 0)
    if (dr !== 0) return dr
    if (b.score !== a.score) return b.score - a.score
    return a.card.factId.localeCompare(b.card.factId)
  })

  // Apply MAX_INJECTED cap on the post-sort top — but ONLY counting
  // cards that would actually inject (decision='inject'). hint_only and
  // drop don't consume prompt budget. We surface up to MAX_INJECTED
  // inject cards plus all hint_only matches so the audit trail is
  // complete.
  const out: FactCardMatch[] = []
  let injectsSeen = 0
  for (const r of raws) {
    const decision = gateDecision(r.card)
    if (decision === 'drop') continue
    if (decision === 'inject') {
      if (injectsSeen >= MAX_INJECTED) continue
      injectsSeen += 1
    }
    out.push({
      fact_id: r.card.factId,
      title: r.card.title,
      matched_keywords: r.matchedKeywords,
      score: r.score,
      state: r.card.state,
      risk_level: r.card.riskLevel,
      confidence: r.card.confidence,
      source_quality: r.card.sourceQuality,
      controlled_alpha_eligible: r.card.controlledAlphaEligible,
      decision,
      official_sources: (r.card.sourceUrls ?? []) as string[],
      evidence_points: r.card.evidencePoints ?? [],
      related_links: r.card.relatedLinks ?? [],
      needs_review_flags: (r.card.needsReviewFlags ?? []) as string[],
      injection_certain_block: sanitizeInjectionCertainBlock(r.card.injectionCertainBlock),
      injection_needs_review_addendum: r.card.injectionNeedsReviewAddendum ?? null,
    })
  }

  return out
}

function sanitizeInjectionCertainBlock(block: string): string {
  return block
    .split('\n')
    .filter(line => !UNCERTAIN_INJECTION_LINE.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ---------------------------------------------------------------------------
// Pure helpers exposed for unit tests (DB-free)
// ---------------------------------------------------------------------------
export const _matcherInternals = {
  sanitizeInjectionCertainBlock,
  gateDecision,
  scoreCardAgainst,
  RISK_RANK,
  FACT_ID_REQUIRED_CONTEXT,
  SCORE_THRESHOLD_LOW_MEDIUM,
  MIN_ABSOLUTE_MATCHES_LOW_MEDIUM,
  MAX_INJECTED,
  PRODUCTION_CANDIDATE_STATES,
  DRY_RUN_CANDIDATE_STATES,
}

// Suppress unused-export type warnings from drizzle helpers
void or
void eq
