// Deep-Water Professional Handoff Registry
//
// Maps deep-water route_gate matches to a "找谁确认" handoff block so
// the answer page can name the *right* category of professional /
// support window instead of collapsing everything into "找行政書士".
//
// Spec: docs/ops/TEBIQ_0_8_5_DEEP_WATER_ROUTING_PLAN.md
// Source-of-truth boundaries: docs/domain/TEBIQ_0_8_5_RC_DOMAIN_GATE.md §3
//
// This module is DATA-ONLY (no DB, no FACT cards). The 1.0 design
// explicitly keeps category labels here and does NOT carry individual
// contact info. Only "official_locator" is allowed for public windows
// (DV センター, 警察 #110, FRESC, 法テラス) — never private practitioners.
//
// Coverage: 10 DOMAIN §3 families bound by route_gate_id. Multi-family
// hits collapse via `getHandoffForRoutes` (highest-urgency wins; family
// 4 / 9 critical families take precedence).

import type { RouteGateMatch } from './route-gates'

export type ProfessionalKind =
  | 'gyoseishoshi'        // 行政書士
  | 'immigration_lawyer'  // 入管専門弁護士
  | 'dv_center'           // 配偶者暴力相談支援センター
  | 'police'              // 警察 #110 / 相談 #9110
  | 'isa_window'          // 入管窓口 / FRESC
  | 'tax_office'          // 税務署
  | 'tax_accountant'      // 税理士
  | 'pension_office'      // 年金事務所
  | 'social_insurance'    // 社労士
  | 'municipal_office'    // 市区町村役所
  | 'hello_work'          // ハローワーク
  | 'judicial_scrivener'  // 司法書士
  | 'legal_terrace'       // 法テラス

export type HandoffUrgency =
  | 'today'           // same-day action — risk of immediate harm or status loss
  | 'this_week'       // within days — deadlines or compounding risk
  | 'before_deadline' // before a known due date (届出, 期限) — user-supplied date
  | 'general'         // reference / when ready to act

export interface ProfessionalEntry {
  kind: ProfessionalKind
  /** zh label rendered in the UI chip. Short, no honorifics. */
  label: string
  /** Official locator for *public* windows only. Never set for private
   *  professionals. Validated against FACT registry by handoff-audit
   *  scripts (future). */
  official_locator?: string
}

export interface HandoffEntry {
  /** route_gate_ids this entry covers. Source of binding for the
   *  matcher. Order does not imply priority. */
  routeIds: string[]
  /** Ordered list — `kinds[0]` is the primary CTA; rest render as
   *  alternates. UI caps display to top-2 by default. */
  kinds: ProfessionalEntry[]
  /** One-line "why this kind" surfaced under the block. Must read as
   *  the *category's* reason, not legal advice for the user. */
  oneLine: string
  urgency: HandoffUrgency
  /** Short DOMAIN family tag, mirrors §3.x for traceability. */
  familyTag: string
  /** L5 signal ids associated with this family. Populated at runtime by
   *  `getHandoffForRoutes` / `getHandoffForMatches` so the answer page
   *  can render the "为什么是深水 + 你该准备什么 + 不要做什么" block
   *  alongside this handoff. Optional — older callers can ignore it. */
  l5SignalIds?: string[]
}

// -- ProfessionalEntry shortcuts ---------------------------------------
// Centralised so labels stay consistent across families and
// `official_locator` text is single-sourced.

const GYOUSEISHOSHI: ProfessionalEntry = {
  kind: 'gyoseishoshi',
  label: '行政書士',
}

const IMMIGRATION_LAWYER: ProfessionalEntry = {
  kind: 'immigration_lawyer',
  label: '入管専門弁護士',
}

const DV_CENTER: ProfessionalEntry = {
  kind: 'dv_center',
  label: 'DV センター',
  official_locator: '配偶者暴力相談支援センター #8008 / 0570-0-55210',
}

const POLICE: ProfessionalEntry = {
  kind: 'police',
  label: '警察',
  official_locator: '緊急 #110 / 相談 #9110',
}

const ISA_WINDOW: ProfessionalEntry = {
  kind: 'isa_window',
  label: '入管 FRESC',
  official_locator: '外国人在留総合インフォメーションセンター 0570-013904',
}

const TAX_ACCOUNTANT: ProfessionalEntry = {
  kind: 'tax_accountant',
  label: '税理士',
}

const SOCIAL_INSURANCE: ProfessionalEntry = {
  kind: 'social_insurance',
  label: '社労士',
}

const PENSION_OFFICE: ProfessionalEntry = {
  kind: 'pension_office',
  label: '年金事務所',
}

// Reserved for future families (家计・税务 / 自治体福祉) — kept in the
// enum but not bound to any current entry. Removed from this file to
// satisfy `no-unused-vars`; reintroduce when wiring families that need
// them as primary CTAs.
// const TAX_OFFICE: ProfessionalEntry = { kind: 'tax_office', label: '税務署' }
// const MUNICIPAL_OFFICE: ProfessionalEntry = { kind: 'municipal_office', label: '市区町村役所' }

const JUDICIAL_SCRIVENER: ProfessionalEntry = {
  kind: 'judicial_scrivener',
  label: '司法書士',
}

const LEGAL_TERRACE: ProfessionalEntry = {
  kind: 'legal_terrace',
  label: '法テラス',
  official_locator: '法テラス 0570-078374',
}

// -- DEEP WATER HANDOFF REGISTRY ---------------------------------------
//
// Order is significant only for `getHandoffForRoutes` tie-breaks:
// earlier entries win on equal urgency. DV (family 4) and 不许可 (family 9)
// are placed first so multi-family hits don't get drowned out by milder
// families.

export const DEEP_WATER_HANDOFF_REGISTRY: HandoffEntry[] = [
  // --- Family 4: DV 地址安全 (DOMAIN §3.4) ---
  // CRITICAL: must never collapse to a 行政書士-only CTA. Safety windows
  // come first; gyoseishoshi appears only as an alternate for the
  // post-safety in-stay-status arrangement.
  {
    familyTag: 'dv-address-safety-first',
    routeIds: ['dv-address-safety-first'],
    kinds: [DV_CENTER, POLICE, IMMIGRATION_LAWYER, GYOUSEISHOSHI],
    oneLine: '人身安全和在留资格保护需要分别走不同窗口；DV 咨询和警察相谈电话是免费、不会通报对方的优先入口。',
    urgency: 'today',
  },

  // --- Family 9: 不许可 / 補件 / 通知 / 退去強制 (DOMAIN §3.9) ---
  // CRITICAL: 退去強制 / 出頭通知 must never route to 行政書士-only.
  // Plan §3.2 family 9 makes 入管専門弁護士 primary when the notice is
  // 不許可 / 退去強制 / 出頭. We can't distinguish notice type from gate
  // alone here, so we default to 入管専門弁護士 + 行政書士 paired.
  {
    familyTag: 'immigration-notice',
    routeIds: [
      'immigration-notice-taxonomy-first',
      'incomplete-materials-before-expiry-no-safe-bridge',
      'nonpermission-special-period-ended-boundary',
      'nonpermission-no-ordinary-appeal-no-grace',
      'tokubetsu-kyoka-not-normal-route',
      'result-postcard-not-permission',
    ],
    kinds: [IMMIGRATION_LAWYER, GYOUSEISHOSHI, ISA_WINDOW, LEGAL_TERRACE],
    oneLine: '通知书类型决定路径：補正/追加資料偏行政書士，不許可/退去強制偏入管専門弁護士；先按通知书原文确认期限，再决定走哪条。',
    urgency: 'today',
  },

  // --- Family 1: 特例期间结束 / 出国 (DOMAIN §3.1) ---
  {
    familyTag: 'special-period',
    routeIds: [
      'special-period-two-month-boundary',
      'special-period-departure-deepwater',
    ],
    kinds: [GYOUSEISHOSHI, IMMIGRATION_LAWYER, ISA_WINDOW],
    oneLine: '特例期间端点和出国后再入国的判断不能只看みなし再入国规则；如果已出国或收到通知，需要同日联系。',
    urgency: 'today',
  },

  // --- Family 2: Pending change 新工作 / 新活动 (DOMAIN §3.2) ---
  {
    familyTag: 'pending-change',
    routeIds: [
      'pending-status-change-current-activity-only',
      'jfind-employment-transition-no-shikakugai-bridge',
    ],
    kinds: [GYOUSEISHOSHI, IMMIGRATION_LAWYER],
    oneLine: '申请提交不等于已许可；如果已开始新活动，"不法就労"风险需要入管専門弁護士同行政書士一起评估。',
    urgency: 'this_week',
  },

  // --- Family 3: HSP1 机构变更 (DOMAIN §3.3) ---
  {
    familyTag: 'hsp1-institution-change',
    routeIds: [
      'hsp1-institution-change-permission-first',
      'work-qualification-certificate-not-permission',
    ],
    kinds: [GYOUSEISHOSHI, IMMIGRATION_LAWYER],
    oneLine: 'HSP1 的所属机关变更需要事前许可；如果已开工/已领薪，可能涉及不法就労，需要弁護士同步介入。',
    urgency: 'today',
  },

  // --- Family 5: 日配离婚 / 再婚 / 死别 (DOMAIN §3.5) ---
  // No dedicated P0 route gate exists yet; bind to the adjacent
  // `status-cancellation-before-expiry-boundary` gate per plan §2.5.
  {
    familyTag: 'spouse-divorce-remarriage',
    routeIds: ['status-cancellation-before-expiry-boundary'],
    kinds: [GYOUSEISHOSHI, IMMIGRATION_LAWYER, DV_CENTER],
    oneLine: '14 日届出和 6 个月配偶者活动空白要分开看；如果涉及 DV、孩子争议或抚养问题，需要弁護士 + DV センター。',
    urgency: 'this_week',
  },

  // --- Family 6: 経営管理 公司处置 (DOMAIN §3.6) ---
  {
    familyTag: 'business-manager-disposition',
    routeIds: [
      'business-manager-disposition-no-auto-success',
      'business-manager-2025-reform-hard-fact-boundary',
    ],
    kinds: [GYOUSEISHOSHI, TAX_ACCOUNTANT, JUDICIAL_SCRIVENER, IMMIGRATION_LAWYER],
    oneLine: '在留资格、公司法、税务、社保是四个不同专业层；事业处置前同时接触行政書士、税理士、司法書士。',
    urgency: 'before_deadline',
  },

  // --- Family 7: 永住 pending 当前在留 (DOMAIN §3.7) ---
  {
    familyTag: 'pr-pending',
    routeIds: ['pr-pending-current-status-not-auto-protected'],
    kinds: [GYOUSEISHOSHI, ISA_WINDOW],
    oneLine: '永住申请审查不会自动保护当前资格的更新；当前在留期限 30 日内必须主动确认是否需要单独更新。',
    urgency: 'before_deadline',
  },

  // --- Family 8: 税 / 年金 / 社保延迟 (DOMAIN §3.8) ---
  {
    familyTag: 'tax-pension-social-insurance',
    routeIds: [
      'late-payment-remediation-not-erased',
      'pension-exemption-not-arrears-not-free-pass',
      'foreign-worker-social-insurance-not-optional',
      'social-insurance-pension-not-irrelevant',
    ],
    kinds: [TAX_ACCOUNTANT, SOCIAL_INSURANCE, PENSION_OFFICE, GYOUSEISHOSHI],
    oneLine: '税务问题找税理士、社保问题找社労士、年金记录到年金事務所自己查；永住/HSP 申请前再交行政書士整理。',
    urgency: 'this_week',
  },

  // --- Family 10: 技人国工作范围 (DOMAIN §3.10) ---
  {
    familyTag: 'gijinkoku-work-scope',
    routeIds: [
      'gijinkoku-work-scope-not-any-job',
      'gijinkoku-startup-management-change-first',
      'work-status-side-job-scope-boundary',
    ],
    kinds: [GYOUSEISHOSHI, IMMIGRATION_LAWYER],
    oneLine: '工作范围咨询找行政書士；如已做范围外工作或涉嫌虚假申报，弁護士同步评估不法就労风险。',
    urgency: 'this_week',
  },

  // --- L5 WB-G addition: 留学 出席率 / 在学状态 ---
  // Added alongside the WB-G L5 student-attendance-status-change family.
  // Wired here so the same UI surface (`找谁确认`) covers留学 cases the
  // way it covers work and family cases; this is *binding only*, no new
  // safety claim — student in trouble still goes to scrivener / lawyer
  // per DOMAIN. routeIds binds the existing shikakugai 28h gate.
  {
    familyTag: 'student-attendance',
    routeIds: ['student-shikakugai-28h-long-vacation-limit'],
    kinds: [GYOUSEISHOSHI, IMMIGRATION_LAWYER],
    oneLine: '出席率、休学、退学的入管视角和学校视角不同；处理顺序错了会影响后续更新或变更。',
    urgency: 'this_week',
  },
]

// -- Public matcher ----------------------------------------------------

const URGENCY_RANK: Record<HandoffUrgency, number> = {
  today: 0,
  this_week: 1,
  before_deadline: 2,
  general: 3,
}

/**
 * Pick the single handoff entry to render for a set of route_gate
 * matches. Returns null when no deep-water family fired.
 *
 * Strategy:
 *   1. Filter the registry to entries whose `routeIds` overlap with the
 *      input.
 *   2. Sort by (urgency, registry order). The registry orders DV and
 *      不许可 first so they win on equal urgency.
 *   3. Return the first match.
 *
 * The UI is responsible for rendering only this one block. Multi-block
 * fan-out is intentionally out of scope for 0.8.5 (plan §3.4 P1 item).
 */
export function getHandoffForRoutes(routeIds: string[] | null | undefined): HandoffEntry | null {
  if (!routeIds || routeIds.length === 0) return null
  const idSet = new Set(routeIds)

  const candidates: { entry: HandoffEntry; order: number }[] = []
  for (let i = 0; i < DEEP_WATER_HANDOFF_REGISTRY.length; i++) {
    const entry = DEEP_WATER_HANDOFF_REGISTRY[i]
    if (entry.routeIds.some(id => idSet.has(id))) {
      candidates.push({ entry, order: i })
    }
  }

  if (candidates.length === 0) return null

  candidates.sort((a, b) => {
    const urgencyDiff = URGENCY_RANK[a.entry.urgency] - URGENCY_RANK[b.entry.urgency]
    if (urgencyDiff !== 0) return urgencyDiff
    return a.order - b.order
  })

  // Attach L5 signal ids associated with this handoff's routeIds so the
  // UI can render the "为什么是深水 + 准备什么 + 不要做什么" block under
  // the handoff without a second pass. We re-query routeIds against the
  // L5 registry to pick up any signals whose triggerRoutes overlap.
  const winner = candidates[0].entry
  // Lazy-require to avoid an import cycle (handoff is the lower layer;
  // L5 sits above and re-uses ProfessionalKind from here).
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getSignalsForRoutes } = require('@/lib/l5/signal-registry') as
    typeof import('@/lib/l5/signal-registry')
  const l5Signals = getSignalsForRoutes(Array.from(idSet))
  if (l5Signals.length === 0) return winner
  return { ...winner, l5SignalIds: l5Signals.map(s => s.id) }
}

/** Convenience overload: pass `RouteGateMatch[]` directly. */
export function getHandoffForMatches(matches: RouteGateMatch[] | null | undefined): HandoffEntry | null {
  if (!matches || matches.length === 0) return null
  return getHandoffForRoutes(matches.map(m => m.pattern.id))
}

/** All route_gate_ids that map to a deep-water handoff. Used by sync
 *  scripts and tests to assert that DOMAIN §3 families stay bound when
 *  route gate ids are renamed in route-gates.ts. */
export function listBoundRouteIds(): string[] {
  const out = new Set<string>()
  for (const entry of DEEP_WATER_HANDOFF_REGISTRY) {
    for (const id of entry.routeIds) out.add(id)
  }
  return Array.from(out)
}
