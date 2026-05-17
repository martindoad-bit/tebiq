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

/** Some low-risk procedural cards have one or two very distinctive user
 *  phrases. Requiring three matches made plain questions like "我搬家了，在留卡
 *  地址要怎么办" miss the address-change card entirely, even though the
 *  consequence of surfacing that card is procedural and source-backed.
 *  Keep this opt-in per fact_id instead of lowering the global threshold. */
const FACT_ID_MIN_ABSOLUTE_MATCHES: Record<string, number> = {
  'zairyu-address-change': 1,
  'zairyu-card-loss-reissue': 1,
  'rishoku-kenko-hoken': 2,
  'rishoku-kokumin-nenkin-kirikae': 2,
  'juminzei-kazei-shomeisho': 1,
  'gijinkoku-koushin-shorui': 2,
  'eijuu-shinsei-shorui': 2,
  'kitaku-tetsuzuki': 1,
  'jumin-zei-shutsukoku': 2,
  'nenkin-dattai-ichijikin': 2,
  'shinseichu-zairyu-keizoku': 2,
  'kodo-senmon-shoku-points': 2,
  'shuro-shikaku-shomeisho': 1,
}

const FACT_ID_TRIGGER_ALIASES: Record<string, readonly string[]> = {
  'zairyu-card-loss-reissue': ['在留卡找不到', '在留卡找不到了', '找不到了'],
  'rishoku-kenko-hoken': ['退职以后健康保险', '退职以后健康保险和年金', '健康保险和年金'],
  'rishoku-kokumin-nenkin-kirikae': ['退职以后年金', '退职以后健康保险和年金', '健康保险和年金', '年金要怎么切'],
  'juminzei-kazei-shomeisho': ['住民税证明', '税证明', '课税证明', '纳税证明'],
  'gijinkoku-koushin-shorui': ['技人国续签', '技人国续签材料', '技术人文知识国际业务续签'],
  'eijuu-shinsei-shorui': ['永住申请', '永住申请材料', '永住用', '永住要课税证明', '永住要纳税证明'],
  'kitaku-tetsuzuki': ['回国前', '回国前区役所', '回国前手续'],
  'jumin-zei-shutsukoku': ['回国前税务', '回国前住民税', '回国后住民税', '税务', '税金', '住民税'],
  'nenkin-dattai-ichijikin': ['回国前年金', '回国后年金', '年金退还', '年金'],
  'shinseichu-zairyu-keizoku': ['旧在留过期', '结果还没下来', '还没结果'],
  'kodo-senmon-shoku-points': ['高度人才', '点数', '点数够'],
  'shuro-shikaku-shomeisho': ['就労資格証明書', '工作资格证明', '工作资格证明书'],
}

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
  'zairyu-address-change': [
    '搬家', '引越', '地址', '住址', '住居地', '住所', '転入', '転居',
    '转入', '转居', '实际住址', '实际地址',
  ],
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
  'eijuu-zairyu-kikan': [
    '何年', '几年', '年数', '住满', '住滿', '就労', '就劳', '就业',
    '高度', '70点', '80点', '期間', '期间', '在留期間', '在留期间',
    '短縮', '短缩', '积算', '積算',
  ],
  'eijuu-nenkin-risk': [
    '年金', '健康保険', '健康保险', '健保', '社保', '社会保险',
    '住民税', '税金', '纳税', '納税', '未纳', '未納', '晚交',
    '滞納', '迟交', '遅れ', '追纳', '追納', '免除', '猶予', '宽限',
  ],
  'gijinkoku-job-mismatch': [
    '工作内容', '业务内容', '業務内容', '職務', '职务', '岗位',
    '餐饮', '飲食', '现场', '現場', '端菜', '洗杯子', '接待',
    '接客', '翻译', '通訳', '帮忙', '帮手', '単純作業', '简单作业',
    '转岗', '调岗', '换工作', '转职', '転職',
  ],
  'tensyoku-zairyu': [
    '転職', '转职', '换工作', '換工作', '退職', '离职', '離職',
    '辞职', '辞職', '就職', '入社', '内定', '公司', '会社',
    '勤務先', '雇用', '雇佣', '契約機関', '所属機関', '工作',
    '職場', '职场', '新公司', '新工作',
  ],
  'zairyu-expiry-renewal-change': [
    '到期', '过期', '期限', '在留期限', '特例', '什么时候', '何时',
    '几个月', '几个月前', '3个月', '三个月', '処理期間', '处理时间',
  ],
  'kodo-senmon-shoku-eijuu': [
    '永住', 'PR', 'pr', '1年', '一年', '3年', '三年', '短縮', '短缩',
    '高度専門職で永住', '高度人才永住',
  ],
  'jumin-zei-shutsukoku': [
    '帰国', '回国', '出国', '离日', '離日', '离开日本', '離れる',
  ],
  'nenkin-dattai-ichijikin': [
    '帰国', '回国', '出国', '离日', '離日', '离开日本', '離れる',
    '脱退一時金', '脱退一时金',
  ],
  'ryugaku-gijinkoku-henko': [
    '留学', '留学生', '卒業', '毕业', '専門学校', '专门学校', '学校',
    '内定', '就職', '就活',
  ],
}

const FACT_ID_BLOCK_CONTEXT: Record<string, readonly string[]> = {
  'tensyoku-zairyu': [
    '没有换工作', '没换工作', '不是问签证变更', '不是签证变更',
  ],
  'gijinkoku-job-mismatch': [
    '没有换工作', '没换工作', '不是问签证变更', '不是签证变更',
  ],
  'eijuu-shinsei-shorui': [
    '不是永住申请', '不是永住', '不是签证材料',
  ],
  'eijuu-nenkin-risk': [
    '不是永住申请', '不是永住', '不是签证材料',
  ],
  'keiei-kanri-2025-10': [
    '旧经管', '既存', '已有经营管理', '已经拿到经营管理', '已经有经营管理',
    'すでに経営', '既に経営', '保有者', '续签', '更新', '500万', '500万円',
    // DOMAIN 2026-05-17 Q11: 低风险 branding/视觉变更与 2025 改正卡无关，避免误注入
    'logo', 'ロゴ', '商标', 'ウェブサイト', 'website', '官网', '官方网站',
    '颜色', '色', 'カラー', 'デザイン', '设计', '宣传卡片', '宣传片',
    '名片', '横幅', 'banner', '海报', 'visual', 'ビジュアル',
  ],
  // DOMAIN 2026-05-17 Q2: HSP1 机构变更场景应走"事前変更許可"路由，
  // 不应把"点数/永住短縮"卡作为主要事实注入（会稀释許可前不可開工的边界）
  'kodo-senmon-shoku-points': [
    '机构变更', '機構変更', '换公司', '換公司', '换工作', '転職', '转职',
    '新公司', '新会社', '换会社', '换雇主', '機関変更', '机关变更', '换机关',
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
  const triggers = [
    ...((card.triggerKeywords ?? []) as string[]),
    ...(FACT_ID_TRIGGER_ALIASES[card.factId] ?? []),
  ]
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
    matched.length < (FACT_ID_MIN_ABSOLUTE_MATCHES[card.factId] ?? MIN_ABSOLUTE_MATCHES_LOW_MEDIUM)
  ) {
    return null
  }

  return { card, matchedKeywords: matched, score }
}

function passesFactIdContextGuard(factId: string, haystackLower: string): boolean {
  const blockedContext = FACT_ID_BLOCK_CONTEXT[factId]
  if (blockedContext?.some(term => haystackLower.includes(term.toLowerCase()))) return false
  const requiredContext = FACT_ID_REQUIRED_CONTEXT[factId]
  if (!requiredContext) return true
  return requiredContext.some(term => haystackLower.includes(term.toLowerCase()))
}

// ---------------------------------------------------------------------------
// Loader (DB read) — module-scoped cache so every consultation does not
// hammer the Supabase pooler. fact_cards updates land through
// `npm run fact-layer:sync`, which is a manual operator action; a 5-minute
// TTL is well below any realistic sync cadence and removes the
// CONNECTION_CLOSED / ECONNRESET errors seen during RC60 concurrent runs.
// invalidateFactCardCache() lets the sync path purge immediately.
// ---------------------------------------------------------------------------
const FACT_CARD_CACHE_TTL_MS = 5 * 60_000
interface FactCardCacheEntry {
  rows: FactCard[]
  cachedAt: number
  inflight: Promise<FactCard[]> | null
}
const factCardCache: Record<'prod' | 'dryRun', FactCardCacheEntry> = {
  prod: { rows: [], cachedAt: 0, inflight: null },
  dryRun: { rows: [], cachedAt: 0, inflight: null },
}

export function invalidateFactCardCache(): void {
  factCardCache.prod = { rows: [], cachedAt: 0, inflight: null }
  factCardCache.dryRun = { rows: [], cachedAt: 0, inflight: null }
}

async function loadCandidateCards(includeDryRun: boolean): Promise<FactCard[]> {
  const slot = includeDryRun ? 'dryRun' : 'prod'
  const entry = factCardCache[slot]
  const now = Date.now()
  if (entry.cachedAt > 0 && now - entry.cachedAt < FACT_CARD_CACHE_TTL_MS) {
    return entry.rows
  }
  if (entry.inflight) return entry.inflight
  const states = includeDryRun
    ? Array.from(DRY_RUN_CANDIDATE_STATES)
    : Array.from(PRODUCTION_CANDIDATE_STATES)
  const inflight = db
    .select()
    .from(factCards)
    .where(inArray(factCards.state, states))
    .then(rows => {
      factCardCache[slot] = { rows, cachedAt: Date.now(), inflight: null }
      return rows
    })
    .catch(err => {
      // Clear inflight so the next call can retry; do NOT cache an empty
      // result on failure (we'd rather fail fast than serve stale-empty).
      factCardCache[slot] = { rows: entry.rows, cachedAt: entry.cachedAt, inflight: null }
      throw err
    })
  factCardCache[slot] = { ...entry, inflight }
  return inflight
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
  FACT_ID_BLOCK_CONTEXT,
  FACT_ID_TRIGGER_ALIASES,
  SCORE_THRESHOLD_LOW_MEDIUM,
  MIN_ABSOLUTE_MATCHES_LOW_MEDIUM,
  FACT_ID_MIN_ABSOLUTE_MATCHES,
  MAX_INJECTED,
  PRODUCTION_CANDIDATE_STATES,
  DRY_RUN_CANDIDATE_STATES,
}

// Suppress unused-export type warnings from drizzle helpers
void or
void eq
