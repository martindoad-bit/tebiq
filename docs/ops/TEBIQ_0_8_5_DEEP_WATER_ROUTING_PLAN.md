---
status: draft / Program 4 planning / not implementation
role: Routing/Safety specialist (tebiq-windows-agent)
date: 2026-05-16
program: Program 4 — Deep-Water Routing And Professional Boundary
scope: Audit current runtime coverage of DOMAIN gate §3 deep-water families and propose 1.0 routing/handoff plan
no-runtime-changes: true
---

# TEBIQ 0.8.5 Deep-Water Routing And Professional Handoff Plan

## 0. Purpose

`docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md` §6 (Program 4) defines the
goal as: "Make TEBIQ reliably know when not to hard-answer." DOMAIN gate
§3 (`docs/domain/TEBIQ_0_8_5_RC_DOMAIN_GATE.md`) enumerates 10 deep-water
families and per-family safe positive routes / must-not-say lists.

This plan does three things:

1. Audits current runtime coverage of those 10 families across
   `lib/consultation/route-gates.ts`, `lib/consultation/guardrail-validator.ts`,
   `lib/consultation/deep-water.ts`, the consultation stream prompt, and
   the user-facing answer surface.
2. Proposes a minimal "professional handoff registry" data model so
   answers can name the right destination per family without making
   ENGINE invent contact info.
3. Sequences the engineering deltas, dependencies (FACT/DOMAIN/Copy),
   and remaining unsafe scenarios under the plan, with P0/P1 ordering
   for the 1.0 release.

**Not in scope:** runtime code changes, new cards, contact-info / business
relationships with specific 行政書士事務所, scrivener pricing strategy.

---

## 1. Current Runtime Architecture (As-Is)

Three layers fire today on consultation stream
(`app/api/consultation/stream/route.ts`):

| Layer | File | What it does | What surfaces to user |
|---|---|---|---|
| Route gate match | `lib/consultation/route-gates.ts` | 49 patterns, P0/P1 severity, each with `mustAskOrCheck` / `mustSay` / `mustNotSay` lists. Injected into prompt via `routeGatesToPromptContext`. | None directly. Prompt only. `route_gate_ids` persists to `ai_consultations` and renders only inside `/internal/eval-lab` ("风险门" row). |
| Validator | `lib/consultation/guardrail-validator.ts` | ~60 post-answer regex rules that flag overconfident claims; `selectTerminalGuardrailFindings` triggers retry/incomplete. | None directly. Findings persist; render only in Eval Lab. |
| Deep-water scaffold | `lib/consultation/deep-water.ts` | 5 patterns with `layerSplit` / `safeFrame` / `confirmationPath`. **Not imported by stream route.** Held pre-scrivener per `docs/product/TEBIQ_DEEP_WATER_REGISTRY.md` §3. | None. Dead code from production POV. |

User-facing answer (`app/answer/[id]/AnswerResultView.tsx`,
`lib/answer/core/projector.ts`) renders DeepSeek output as 3 unlabelled
paragraphs + `consult_trigger` (a single sentence). The DeepSeek prompt
(`lib/answer/core/deepseek-prompt.ts:75`) only declares one professional
type:

```
"consult_trigger": "什么情况下要找行政書士确认（一句话；或留空字符串）"
```

The single Scrivener entry (`/scrivener` page, `app/scrivener/page.tsx`)
is the only handoff destination wired into the navigation and answer
flow. No code path references DV センター, 入管専門弁護士, 税理士, 社労士,
司法書士, 市区町村, or 入管 directly — even though
`docs/domain/TEBIQ_HANDOFF_TRIGGERS.md` already specifies all of them
with per-trigger mappings.

**Net effect:** TEBIQ today knows how to *not give a wrong answer* in
deep water (gates + validators clamp the prompt and reject overconfident
output), but does not know how to *give the right next-step destination*.
Every handoff collapses into "找行政書士" via `/scrivener`.

---

## 2. Per-Family Audit (DOMAIN Gate §3 ↔ Runtime)

Legend:
- **Gate** — has a `route-gates.ts` pattern that fires on the family's keywords
- **Val** — has at least one `guardrail-validator.ts` rule covering the must-not-say list
- **Useful action** — gate's `mustSay` block contains a concrete next step beyond "咨询专业人士"
- **Distinct handoff** — current pipeline distinguishes 行政書士 vs 弁護士 vs DV センター vs 税理士 vs 社労士 vs 入管 vs 市区町村
- **DW pattern** — has a `lib/consultation/deep-water.ts` entry (not wired to runtime today)

### 2.1 特例期间结束 / 特例期间出国 (DOMAIN §3.1)

| Check | Status |
|---|---|
| Gate | ✓ `special-period-two-month-boundary` (P0), `special-period-departure-deepwater` (P0) |
| Val | ✓ `answer-says-special-period-indefinite` (P0), `answer-special-period-departure-overconfidence` (P0) |
| Useful action | partial — gate says "联系入管窗口或专业人士确认", but no specific 行政書士+入管 split, no "出国前 vs 已出国" branching |
| Distinct handoff | ✗ collapses to `/scrivener` (行政書士 only) |
| DW pattern | ✗ |

**Gap:** When user is *already abroad* and got 通知, the answer needs to say
"行政書士 + 入管専門弁護士, 当日" per DOMAIN §3.1 handoff. Current pipeline
can only say "找行政書士".

### 2.2 Pending Change 新工作 / 新活动开始 (DOMAIN §3.2)

| Check | Status |
|---|---|
| Gate | ✓ `pending-status-change-current-activity-only` (P0), `jfind-employment-transition-no-shikakugai-bridge` (P0) |
| Val | ✓ `answer-pending-change-expands-work-permission` (P0), `answer-jfind-shikakugai-employment-bridge` (P0) |
| Useful action | partial — mustSay is conceptual ("申请提交不等于已许可"); does not name "向入管担当者电话确认" or "通过雇主向公司顾问行政書士请求停工通知" |
| Distinct handoff | ✗ |
| DW pattern | ✓ `pending-application-status-vs-work-scope` (P1, scaffold-only) |

**Gap:** "已开始新活动 → 不法就労疑虑" branch needs both 行政書士 and 弁護士
per DOMAIN §3.2. Validator catches the wrong claim; nothing routes to the
弁護士 path.

### 2.3 HSP1 机构变更 (DOMAIN §3.3)

| Check | Status |
|---|---|
| Gate | ✓ `hsp1-institution-change-permission-first` (P0) — strong, includes 5 mustSay clauses; `work-qualification-certificate-not-permission` (P0) |
| Val | ✓ `answer-hsp1-notification-equals-permission` (P0), `answer-hsp1-certificate-as-alternate-route` (P1), `answer-hsp1-alternate-workaround-before-permission` (P1) |
| Useful action | ✓ — gate explicitly lists "延后入社日 / 签署以许可生效为条件的合同" as the only safe variant |
| Distinct handoff | ✗ |
| DW pattern | ✗ |

**Gap:** Best-covered family of the 10. Only handoff layer is missing —
"已开工/领薪/培训则当日" needs 行政書士 (HSP-experienced) and, when 不法就労
is suspected, 弁護士.

### 2.4 DV 地址安全 (DOMAIN §3.4)

| Check | Status |
|---|---|
| Gate | ✓ `dv-address-safety-first` (P0) — includes "应优先联系 DV 咨询、自治体支援措施、入管咨询和专业人士" in mustSay |
| Val | ✓ `answer-dv-contact-abuser-or-guarantee` (P0) |
| Useful action | partial — mustSay names "DV 咨询 / 自治体 / 入管", but no concrete window names (配偶者暴力相談支援センター / 警察 #9110 / よりそいホットライン) |
| Distinct handoff | ✗ — no DV-specific UI; `/scrivener` is wrong destination for an immediate-safety case |
| DW pattern | ✗ |

**Gap:** DV is the family where wrong handoff is *most* dangerous. Today
the answer can only point to "找书士", which violates the DOMAIN gate's
"先安全/警察/支援窗口，再整理在留事实" priority.

### 2.5 日配离婚 / 再婚 / 死别 (DOMAIN §3.5)

| Check | Status |
|---|---|
| Gate | ✗ no dedicated gate; `status-cancellation-before-expiry-boundary` (P1) catches some signals |
| Val | partial — `answer-period-remaining-means-no-cancellation` (P1) |
| Useful action | partial — falls back to generic 14日届出 / 6个月 framing in DOMAIN doc, not in runtime |
| Distinct handoff | ✗ |
| DW pattern | ✓ `haigusha-divorce-remarriage-procedure-vs-review` (P0, scaffold-only) |

**Gap:** No P0 gate for spouse divorce/death/remarriage even though DOMAIN
§3.5 marks several P0 must-not-say items ("离婚当天签证自动失效",
"再婚后原签证自动接到新配偶者"). Validator coverage is thin. Handoff
needs to fork: pure procedural → 行政書士; DV/孩子争议 → 弁護士 +
DV センター + 行政書士.

### 2.6 経営管理公司处置 (DOMAIN §3.6)

| Check | Status |
|---|---|
| Gate | ✓ `business-manager-disposition-no-auto-success` (P1), `business-manager-2025-reform-hard-fact-boundary` (P0) |
| Val | ✓ `answer-business-manager-disposition-auto-success` (P1), `answer-business-manager-2025-reform-mixed-hard-facts` (P0) |
| Useful action | ✓ — gate says "应交给行政书士/税务/公司法专业人士确认" and lists the layered fact-pack |
| Distinct handoff | ✗ — but mustSay text already names 3 distinct destinations (行政書士, 税理士, 公司法/司法書士). UI cannot route them. |
| DW pattern | ✓ `keiei-kanri-business-change-procedure-vs-review` (P1, scaffold-only) |

**Gap:** Handoff text names destinations correctly inside the prompt, but
user-facing rendering collapses to a single 行政書士 CTA. Worst impact:
税务/社保/債務 cases get sent to a 行政書士 who must then re-route.

### 2.7 永住 pending 当前在留 (DOMAIN §3.7)

| Check | Status |
|---|---|
| Gate | ✓ `pr-pending-current-status-not-auto-protected` (P1) |
| Val | ✓ `answer-pr-pending-replaces-current-renewal` (P1), `answer-nonpermission-special-period-continues` (P1) |
| Useful action | ✓ — explicitly says "应主动联系入管或专业人士确认当前资格更新" |
| Distinct handoff | ✗ |
| DW pattern | ✗ |

**Gap:** Severity feels low (P1) but the failure mode is silent: user
waits passively for PR result while current status expires. Need a louder
"当前期限 30 日内" UI hint and an 入管 vs 行政書士 split.

### 2.8 税 / 年金 / 社保延迟 (DOMAIN §3.8)

| Check | Status |
|---|---|
| Gate | ✓ `late-payment-remediation-not-erased` (P1), `pension-exemption-not-arrears-not-free-pass` (P1), `foreign-worker-social-insurance-not-optional` (P1), `social-insurance-pension-not-irrelevant` (P1) |
| Val | ✓ multiple (`answer-late-payment-remediation-erases-history`, `answer-pension-exemption-equals-arrears-or-free-pass`, etc.) |
| Useful action | ✓ — gate says "取得実际证明: 課税証明、納税証明、年金记录、健保记录" |
| Distinct handoff | ✗ — but mustSay text already names 行政書士 / 社労士 / 税理士 |
| DW pattern | ✗ |

**Gap:** Same as 2.6 — three professions are named in prompt text,
collapse to one destination in UI. 社労士 is currently un-bookable;
税理士 is currently un-bookable.

### 2.9 不许可 / 补件 / 通知 (DOMAIN §3.9)

| Check | Status |
|---|---|
| Gate | ✓ `immigration-notice-taxonomy-first` (P0), `incomplete-materials-before-expiry-no-safe-bridge` (P0), `result-postcard-not-permission` (P1), `nonpermission-special-period-ended-boundary` (P1), `nonpermission-no-ordinary-appeal-no-grace` (P1), `tokubetsu-kyoka-not-normal-route` (P0) |
| Val | ✓ multiple |
| Useful action | ✓ — first step is correctly framed as "提取通知书标题、受领日、期限、申请类型" (extraction-first) |
| Distinct handoff | ✗ — DOMAIN §3.9 calls for "当日行政書士 + 入管专业弁護士" |
| DW pattern | ✓ `notice-supplement-refusal-reapply-review-request` (P0, scaffold-only) |

**Gap:** Best-covered for *staying safe*, but the answer cannot escalate
to 入管専門弁護士 even for 不许可 / 退去強制 / 出頭 通知 — exactly the
cases where 行政書士 alone is the wrong destination per
`TEBIQ_HANDOFF_TRIGGERS.md` 类别1.

### 2.10 技人国工作范围 (DOMAIN §3.10)

| Check | Status |
|---|---|
| Gate | ✓ `gijinkoku-work-scope-not-any-job` (P1), `gijinkoku-startup-management-change-first` (P1), `work-status-side-job-scope-boundary` (P1) |
| Val | ✓ `answer-gijinkoku-any-job-or-manual-work-safe` (P1), `answer-gijinkoku-startup-management-safe-without-change` (P1), `answer-work-status-side-job-unrestricted` (P1) |
| Useful action | ✓ — gate explicitly forbids pivoting to "饮食料品制造业" as a fake-safe alternative |
| Distinct handoff | ✗ — but mustSay correctly says "疑似不法就労或虚假申报时加弁護士" |
| DW pattern | ✓ `gijinkoku-job-change-notification-vs-status-review` (P0, scaffold-only) |

**Gap:** P0/P1 confidence floor is fine. Handoff fork (行政書士-only vs
+弁護士) still missing.

### 2.11 Audit Summary Matrix

| # | Family | Gate | Val | Useful action | Distinct handoff | DW scaffold |
|---|---|---|---|---|---|---|
| 1 | 特例期间出国 | ✓ | ✓ | partial | ✗ | ✗ |
| 2 | Pending change 新工作 | ✓ | ✓ | partial | ✗ | ✓ unwired |
| 3 | HSP1 机构变更 | ✓ | ✓ | ✓ | ✗ | ✗ |
| 4 | DV 地址安全 | ✓ | ✓ | partial | ✗ (critical) | ✗ |
| 5 | 日配离婚再婚 | ✗ | partial | ✗ | ✗ | ✓ unwired |
| 6 | 経管公司处置 | ✓ | ✓ | ✓ | ✗ (text only) | ✓ unwired |
| 7 | 永住 pending | ✓ | ✓ | ✓ | ✗ | ✗ |
| 8 | 税/年金/社保 | ✓ | ✓ | ✓ | ✗ (text only) | ✗ |
| 9 | 不许可/补件/通知 | ✓ | ✓ | ✓ | ✗ (critical) | ✓ unwired |
| 10 | 技人国工作范围 | ✓ | ✓ | ✓ | ✗ | ✓ unwired |

**Two systemic gaps:**

1. **No user-facing distinct handoff.** The runtime knows the right
   profession (mustSay text says so), but the UI surface cannot render it.
   All paths funnel to `/scrivener` (行政書士).
2. **DV (3.4), 不许可 (3.9), 日配离婚 (3.5)** are the families where this
   collapse is *actively dangerous*, not just suboptimal.

---

## 3. Proposed Plan

### 3.1 Professional Handoff Registry — Data Model

A flat, declarative TS module so answers can name the right destination
without ENGINE inventing contact info, and so QA / Eval Lab can audit
"did this answer route to the right window."

Proposed location: `lib/consultation/professional-handoff-registry.ts`
(new file; planning only).

```ts
export type ProfessionalKind =
  | 'gyousei_shoshi'         // 行政書士
  | 'immigration_lawyer'     // 入管専門弁護士
  | 'general_lawyer'         // 一般弁護士（民事/刑事）
  | 'shihou_shoshi'          // 司法書士
  | 'shakai_hoken_roumushi'  // 社労士
  | 'zeirishi'               // 税理士
  | 'dv_support_center'      // 配偶者暴力相談支援センター
  | 'police_emergency'       // 警察 #9110 / 110
  | 'immigration_window'     // 入管窓口 / Foreign Residents Support Center
  | 'municipal_window'       // 市区町村役所
  | 'pension_office'         // 年金事務所
  | 'tax_office'             // 税務署
  | 'hello_work'             // ハローワーク

export interface ProfessionalHandoff {
  kind: ProfessionalKind
  display_label_zh: string   // "入管専門弁護士"
  display_label_ja?: string  // "入管専門の弁護士"
  why_this_one: string       // one sentence visible to user
  urgency: 'same_day' | 'within_days' | 'before_action' | 'reference'
  /** When kind has a self-serve official window (役所, 入管, etc.),
   *  the canonical entry-point URL or window name. Validated at sync
   *  time against FACT registry. Empty for private professionals. */
  official_locator?: string
}

export interface DeepWaterFamilyHandoff {
  family_id: string                  // matches DOMAIN gate §3 sub-id
  family_label_zh: string            // "特例期间出国"
  /** Conditions that fork the handoff. Evaluated against the user
   *  signal extracted by the route gate / extraction prompt. */
  branches: ReadonlyArray<{
    when: string                     // human-readable condition
    /** Symbolic condition the answer prompt can probe — keep short
     *  and matched to the route gate's mustAskOrCheck items. */
    condition_key?: string
    /** Ordered list — primary first. UI may render only the first
     *  one as the CTA and list the rest under "也可能需要". */
    handoffs: ReadonlyArray<ProfessionalHandoff>
  }>
  /** Default handoff when no branch condition matched but family fired. */
  default_handoffs: ReadonlyArray<ProfessionalHandoff>
  /** route_gate_ids that should map to this family. Used by the matcher
   *  to convert gate hits → handoff suggestions. */
  bound_route_gate_ids: ReadonlyArray<string>
}

export const DEEP_WATER_HANDOFF_REGISTRY: ReadonlyArray<DeepWaterFamilyHandoff> = [
  // 10 entries, one per DOMAIN §3 family, populated from
  // docs/domain/TEBIQ_HANDOFF_TRIGGERS.md and DOMAIN §3 handoff lines.
]
```

**Why this shape:**

- Symbolic (`kind`), not free-text. Validators / Eval Lab can assert
  "DV-family answer must reference `dv_support_center` before
  `gyousei_shoshi`."
- Branching is shallow (1 level, no decision tree). Anything deeper
  belongs in DOMAIN, not in the registry.
- `bound_route_gate_ids` makes the link explicit — sync script can fail
  when a gate id moves without updating the registry.
- `official_locator` lives here only for *official* windows (入管, 役所,
  税務署). Private professionals never carry contact info — TEBIQ does
  not endorse individual scriveners.

### 3.2 Engineering Deltas (per family + cross-cutting)

Cross-cutting:

| Delta | Owner | Scope |
|---|---|---|
| New file `lib/consultation/professional-handoff-registry.ts` per §3.1 | ENGINE | New module, no existing-file edits |
| New `lib/consultation/handoff-matcher.ts` that takes `RouteGateMatch[]` + extracted answer signals → `ProfessionalHandoff[]` | ENGINE | Pure function |
| Stream route persists `professional_handoff_suggestions` jsonb on `ai_consultations` (alongside `route_gate_ids`, `guardrail_findings`) | ENGINE | DB migration + persistence |
| Stream route prompt: replace single `consult_trigger` field with a structured `handoff: { who, why, urgency, alternates[] }` block when a deep-water gate fires | ENGINE | Prompt + parsing |
| Validator: new rule family `answer-handoff-mismatch-{family}` that flags when answer text names 行政書士 only but registry says DV / 弁護士 / 入管 is primary | ENGINE | Net-add rules |
| `AnswerResultView`: when `handoff_kind !== 'gyousei_shoshi'` or kind list has >1 entry, render a "找谁" block above the existing scrivener CTA, not inside it | CODEXUI | New UI block — SAFE because it does not mutate existing copy when handoff is plain 行政書士 |
| Eval Lab: add `professional_handoff` column showing primary kind + alternates for each row | ENGINE | EvalLabClient extension |
| `lib/consultation/deep-water.ts` decision: either retire (since route-gates now cover all 10 families) or rebrand as the registry binder. Recommendation: retire matcher; keep `layerSplit` / `safeFrame` text by merging into route-gate `mustSay` extension fields | ENGINE | Cleanup |

Per family:

| # | Family | New gate? | New validator? | Registry branches | Notes |
|---|---|---|---|---|---|
| 1 | 特例期间出国 | no | no | (a) 在国内 / 出国前 → 行政書士 same_day; (b) 已出国 + 收到通知 → 行政書士 + 入管専門弁護士 same_day; (c) 不许可下达 → 同 b | Branch on `condition_key=user_overseas` |
| 2 | Pending change | no | no | (a) 未开始 → 行政書士 within_days; (b) 已开始/雇主催 → 行政書士 + 弁護士 same_day | Branch on `condition_key=already_started` |
| 3 | HSP1 机构变更 | no | no | always 行政書士 same_day; if 已开工 add 弁護士 within_days | |
| 4 | DV 地址安全 | no | extend `answer-dv-contact-abuser-or-guarantee` to also flag "答案在 DV 信号下未提及 dv_support_center" | (a) 即时危险 → police_emergency + dv_support_center; (b) 安全后 → 弁護士 + dv_support_center + 行政書士 | **Critical**: UI must NOT route to /scrivener as the only CTA |
| 5 | 日配离婚再婚 | **YES** — propose new gate `spouse-divorce-remarriage-procedure-vs-review-boundary` (P0); merges DOMAIN §3.5 must-not-say + scaffold pattern | **YES** — add `answer-divorce-auto-status-loss-or-auto-transfer` (P0) | (a) 纯程序 → 行政書士 within_days; (b) DV / 孩子争议 → reuse §4 branches; (c) 已迟 14 日届出 → 行政書士 same_day | Highest gap — currently relies on adjacent gates only |
| 6 | 経管公司处置 | no | no | (a) 处置前咨询 → 行政書士 + 税理士 + 司法書士 before_action; (b) 已停业/已解雇员工 → +弁護士 same_day; (c) 转技人国/HSP → 行政書士 within_days | mustSay text already names them; just thread to UI |
| 7 | 永住 pending | no | extend `answer-pr-pending-replaces-current-renewal` to also flag "答案未提示当前期限 30 日内 → 入管/行政書士" | (a) 当前期限 >30日 → 行政書士 reference; (b) ≤30日 → 入管 + 行政書士 same_day; (c) PR 不许可 → 行政書士 + 入管専門弁護士 same_day | |
| 8 | 税/年金/社保 | no | no | (a) 税务问题主导 → 税理士 within_days; (b) 公司社保问题 → 社労士 within_days; (c) 永住/HSP shortcut 临近 → 行政書士 + 税理士 OR 社労士 before_action | Three-way fork; needs DOMAIN signal extraction |
| 9 | 不许可/补件/通知 | no | extend `immigration-notice-taxonomy-first` validator to flag "通知书 type=不許可/退去強制/出頭 但答案未提及入管専門弁護士" | (a) 補正/追加資料 within deadline → 行政書士 same_day; (b) 不許可 → 行政書士 + 入管専門弁護士 same_day; (c) 退去強制/出頭 → 入管専門弁護士 same_day (mandatory, not "+") | **Critical**: 退去強制 must NEVER route to 行政書士-only |
| 10 | 技人国工作范围 | no | no | (a) 工作范围咨询 → 行政書士 within_days; (b) 已做范围外 → 行政書士 + 弁護士 same_day | |

### 3.3 Stream-Protocol Surface (read-only audit)

`ConsultationEvent` (`lib/consultation/stream-protocol.ts`) is a stable
contract. The plan adds **no new SSE event type**. Handoff suggestions
ride on the `completed` event's persisted row (read by `/answer/[id]`)
and on the existing `fact_cards_injected` channel pattern when needed.
No SSE break for clients.

### 3.4 UI Surface (read-only audit, plan only)

`AnswerResultView.tsx` today renders `consult_trigger` as a one-line
bullet under "需要确认的情况". Plan:

- When `viewModel.public.professional_handoff` exists (new optional
  field on `PublicAnswer`), render a new section **找谁确认**:
  - Primary: profession name + one-sentence why + urgency badge.
  - Alternates: chip row, no contact info.
  - For DV/police kinds: prepend a short safety line and a non-clickable
    reference to 配偶者暴力相談支援センター + #9110, NOT a CTA to /scrivener.
- When `professional_handoff.kind === 'gyousei_shoshi'` AND alternates
  is empty, the existing `/scrivener` CTA renders unchanged — zero
  regression for the 80%+ ordinary case.

This is the smallest UI delta that can express the routing without
relabeling the whole answer surface.

---

## 4. Dependencies

### 4.1 FACT (source-only locators)

Required before runtime wire:

- Official locators for:
  - 配偶者暴力相談支援センター 全国共通短縮ダイヤル (#8008 / 0570-0-55210)
  - 警察相談専用電話 #9110
  - 入管 Foreign Residents Support Center (FRESC)
  - 年金事務所 / 全国社会保険労務士会連合会 検索 URL
  - 税理士会 検索 URL
  - 法テラス (legal aid) URL — for users who cannot afford 弁護士

FACT is *only* the source-of-truth locator (URL or canonical phone
number). FACT does **not** provide individual practitioner contact info.
Required source quality: `tier_1_official` per existing FACT card schema.

### 4.2 DOMAIN (boundary text)

- DOMAIN sign-off on the per-family branch conditions in §3.2 (esp.
  family 5 new gate, family 7 30-日 threshold, family 9 退去強制 mandatory
  弁護士 rule).
- DOMAIN review of the proposed registry branch labels — text user sees
  must not imply legal advice.
- DOMAIN to confirm whether 司法書士 should be in the registry at MVP
  (registry currently lists per `TEBIQ_HANDOFF_TRIGGERS.md` 类别2 経営管理).

### 4.3 Product Copy

- Microcopy for new "找谁确认" block: heading, urgency badges (今天 /
  几天内 / 申请前 / 参考), the "为什么是这个" one-liners (one per
  `kind`).
- DV-specific safety line — must NOT use the generic 速查 / 整理 voice.
  Suggest a separate Voice asset under `docs/voice/`.
- The answer paragraph instructions in `deepseek-prompt.ts` must be
  updated to write the new structured handoff JSON. ENGINE-owned, but
  copy-reviewed.

### 4.4 No-Op Dependencies

- No FACT cards required for the routing itself — registry is logic, not
  knowledge.
- No new sync/import scripts required at MVP.
- No business agreements with non-行政書士 practitioners required —
  registry only names *categories*, not individuals.

---

## 5. Risk Register — What Stays Unsafe Under This Plan

| Risk | Why it persists | Mitigation in plan |
|---|---|---|
| User dismisses "找谁" block and reads only the answer paragraph | Reading behavior, not engineering | Keep the safety-critical text inside the answer paragraph (existing gate `mustSay` already does this); the new block is *additive* |
| Registry says "弁護士" but user can't afford one | Outside engineering scope | Include 法テラス reference in `general_lawyer` and `immigration_lawyer` kinds' `why_this_one` text |
| DV signal mis-detected (false positive) routes ordinary 离婚 to police | Keyword overmatch | DV gate already requires explicit DV/虐待/avoid-contact terms; do not loosen. Keep the `dv-address-safety-first` `allOf` requirement |
| 退去強制 case never reaches the user-facing surface because gate doesn't fire on user wording | Gate keyword set | Audit `immigration-notice-taxonomy-first` for 退去強制 / 退去强制 / 出頭通知書 coverage; add gate-level test |
| Multi-family answer (e.g. DV + 不许可 + 永住 pending) generates 3 handoff blocks | UI clutter | Plan: cap UI to top-2 by `urgency` rank; rest go into "也可能涉及" details disclosure |
| Eval Lab can audit handoff but no end-user feedback loop | Out of scope for Program 4 | Program 5 Eval Lab Quality Flywheel adds reviewer-noted handoff correctness |
| Registry stale after DOMAIN updates | Same drift problem as fact cards | Add `registry-audit` script in Program 5 to verify every gate id binds and every kind has FACT-backed locator |
| `deep-water.ts` scaffold remains in tree as dead code | Maintenance debt | Plan recommends retiring `deep-water.ts` matcher after registry lands; preserve text in route gates' `mustSay` extension |
| Scrivener page becomes wrong destination for ~30% of answers | Today's funnel assumption breaks | Plan keeps `/scrivener` as default for `gyousei_shoshi` kind; add small redirect-aware rendering when kind mismatches |
| Family 5 (日配离婚) new gate could overmatch onto ordinary 配偶 questions | New keyword gate | Use existing `status-cancellation-before-expiry-boundary` as a model — require BOTH spouse-status terms AND life-event terms (离婚/死別/再婚) before firing |

**Hardest residual unsafe scenario:** user has 不许可 from PR application
+ current status expired during the審查 + lives with abusive spouse + has
unpaid 国民年金. This compounds families 4 + 5 + 7 + 8 + 9. Even with the
plan, the registry will produce a 4-block handoff that the user cannot
realistically act on in a single visit. Acceptable for 1.0 if validator
catches "答案给单一确定结论"; not acceptable to silently collapse to one
CTA. UI cap should be top-2 by `urgency=same_day` first.

---

## 6. P0 / P1 Ordering For 1.0

### P0 (block 1.0 release)

1. **Registry data model and binding to all 10 families** — 5-7 day
   ENGINE task once DOMAIN signs off on branches. No DB migration if we
   piggyback on `ai_consultations` jsonb columns.
2. **DV (family 4) UI surface fix** — must not render `/scrivener` as
   the only CTA when `dv-address-safety-first` fires. This is the single
   most user-harm-relevant gap.
3. **不许可/退去強制 (family 9) escalation** — `immigration-notice-taxonomy-first`
   gate validator extension to require 入管専門弁護士 reference when
   notice type is 不許可 / 退去強制 / 出頭. Also: ensure gate keywords
   cover 退去強制令書, 出頭通知書, 在留資格取消通知書.
4. **Family 5 new gate** `spouse-divorce-remarriage-procedure-vs-review-boundary`
   (P0). Today's coverage relies on adjacent gates and misses the four
   DOMAIN-marked must-not-say items.
5. **Validator rule `answer-handoff-mismatch-{family}`** — minimal
   version: flag when DV/不许可/退去強制 family fired but answer text
   does not name DV センター / 弁護士. Soft-warn at first.

### P1 (1.0 acceptable, schedule for 1.0.1)

6. UI rendering of multi-handoff (top-2 cap, alternates chip).
7. Family 7 (永住 pending) 30-日 threshold validator.
8. Family 8 (税/年金/社保) three-way professional fork — text already
   names them; UI delivery is P1.
9. Eval Lab "professional_handoff" column.
10. Retire `lib/consultation/deep-water.ts` matcher; merge text into
    route-gate `mustSay` extension fields.
11. Family 2 (Pending change) "已开始 → +弁護士" branch.
12. FACT locators for 法テラス / 全国社労士会 / 税理士会.

### P2 (post-1.0)

13. Self-serve handoff-correctness feedback loop (extends Program 5).
14. Per-region (都道府県) routing for 入管支局 / DV センター.
15. 司法書士 routing for 商業登記 cases.
16. Multi-language handoff labels (current scope is zh-only, mirroring
    answer surface).

---

## 7. Acceptance Criteria For Program 4 Done

Tied to Program 4 acceptance lines in
`TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md` §6:

- ✓ "P0 deep-water cases do not produce confident legal / permission
  conclusions." — already true; preserved by not weakening any existing
  gate or validator.
- ✓ "Answers still give a useful safe next action." — registry
  guarantees an action target by family.
- ✓ "Professional routing distinguishes 行政书士, 入管, 弁護士, 市区町村,
  税务署, 年金事务所 where relevant." — registry's `ProfessionalKind`
  enum mirrors this list 1:1.
- ✓ "Deep-water routes are covered by tests and Eval Lab samples." —
  Program 1 RC matrix already covers 10 families; this plan adds the
  handoff-mismatch validator so RC samples can fail on wrong handoff.

Program 4 is **done** when:

1. Registry exists and all 10 DOMAIN §3 families bind to ≥1 branch.
2. RC matrix re-run shows zero P0 handoff-mismatch findings.
3. DV / 不许可 / 退去強制 cases render the correct CTA (verified in
   Eval Lab + manual QA per family).
4. `/scrivener` page is no longer the only handoff destination in
   user-facing answers when any of families 4 / 5 / 9 fires.
5. DOMAIN signs off the branch text + new family-5 gate.

---

## 8. Open Questions Requiring Founder / DOMAIN / FACT Input

These are the blockers that cannot be unilaterally resolved by ENGINE:

1. **Founder:** Is TEBIQ comfortable surfacing 弁護士 / DV センター /
   税理士 / 社労士 by *category* in the answer surface, given the
   product positioning is "在留风险管理" not "全方位法律产品"? If yes,
   under what voice/disclaimer constraint?
2. **Founder:** Should `/scrivener` page evolve into a multi-profession
   landing, or stay 行政書士-only with non-行政書士 references rendered
   inline in the answer (no dedicated booking)?
3. **DOMAIN:** Confirm or revise the per-family branch conditions in
   §3.2 (esp. family 5 new P0 gate and family 7 30-day threshold).
4. **DOMAIN:** Confirm whether 退去強制 / 在留資格取消 cases should
   force 弁護士 as *primary* (not "+", not alternate). Plan assumes yes
   per `TEBIQ_HANDOFF_TRIGGERS.md` 类别1.
5. **DOMAIN:** Confirm `司法書士` is in MVP registry (経管公司処置
   登记 cases) or post-1.0.
6. **FACT:** Provide tier-1 official locators for the 7 official-window
   kinds in `ProfessionalKind` (DV センター, 警察 #9110, 入管 FRESC,
   年金事務所 lookup, 税務署 lookup, 法テラス, ハローワーク). Without
   these, registry can still render labels, but `official_locator` will
   be empty and Eval Lab cannot verify "answer pointed to a real window."
7. **Product Copy:** Microcopy for "找谁确认" block + 4 urgency badge
   labels + 13 "why this kind" one-liners (one per `ProfessionalKind`).
8. **Product Copy:** DV-specific safety line voice — current copy canon
   is product/material-tone; DV needs a softer human-safety register.
9. **Founder + DOMAIN:** Does 1.0 ship with `dv-address-safety-first`
   actually capable of suppressing the standard answer body and
   replacing it with the safety routing block, or only capable of
   *prepending* the routing block? Plan currently assumes prepend (less
   risky); suppression is a stronger guarantee but riskier UX.

---

## 9. Out Of Scope For This Plan

- Specific scrivener / 弁護士 / 税理士 partnerships or commercial terms.
- Changes to FACT card content or runtime fact-card matcher.
- Changes to the materials (`/quick-reference`) tab routing.
- Multi-turn handoff carry-over (follow-up turns inheriting handoff from
  parent turn).
- Re-architecting `consult_trigger` away from a per-answer string into a
  per-conversation rolling state.

---

## 10. References

- `docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md` §6
- `docs/domain/TEBIQ_0_8_5_RC_DOMAIN_GATE.md` §3 + §4
- `docs/domain/TEBIQ_HANDOFF_TRIGGERS.md`
- `docs/product/TEBIQ_DEEP_WATER_REGISTRY.md`
- `lib/consultation/route-gates.ts`
- `lib/consultation/guardrail-validator.ts`
- `lib/consultation/deep-water.ts`
- `lib/consultation/stream-protocol.ts`
- `app/api/consultation/stream/route.ts`
- `app/answer/[id]/AnswerResultView.tsx`
- `lib/answer/core/deepseek-prompt.ts`
- `app/scrivener/page.tsx`
