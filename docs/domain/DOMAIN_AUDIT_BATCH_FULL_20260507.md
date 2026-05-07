# DOMAIN Audit Report — Full Batch (Post Batch 1 + Batch 2)

**Audit date**: 2026-05-07  
**Auditor**: DOMAIN-CC (claude-sonnet-4-6)  
**Sprint**: 0.6 / Workstream C  
**Protocol**: DOMAIN_AUDIT_PROTOCOL_v1.md  
**Branch**: domain/audit-full-20260507  
**Cards audited**: 8 (3 critical, 5 high)

---

## Summary Table

| fact_id | risk | state_before | verdict | state_after | controlled_alpha_eligible recommendation |
|---|---|---|---|---|---|
| keiei-kanri-2025-10 | critical | ai_verified | **APPROVE** | human_reviewed | ✅ YES — already PL-set; confirm after human_reviewed |
| eijuu-nenkin-risk | critical | ai_verified | **HOLD** | ai_verified (no change) | ❌ NO — sourcing gap unresolved |
| spouse-divorce-separation | critical | human_reviewed | **CONFIRMED** | human_reviewed (no change) | ✅ YES — recommend PL signoff |
| gijinkoku-job-mismatch | high | ai_verified | **REQUEST_EDIT** | ai_verified (pending FACT fix) | N/A (high; not required) |
| shikakugai-fukugyou | high | ai_verified | **APPROVE** | human_reviewed | N/A (high; not required) |
| zairyu-expiry-renewal-change | high | ai_verified | **APPROVE** | human_reviewed | N/A (high; not required) |
| keiei-kanri-existing-holder-update | high | ai_verified | **APPROVE** | human_reviewed | N/A (high; not required) |
| startup-visa-keiei-transition | high | ai_extracted | **NOT UPGRADED** | ai_extracted (no change) | ❌ NO — METI page unresolved |

---

## §2 Detailed Audit Results

---

### Card 1: keiei-kanri-2025-10

**Verdict: APPROVE → human_reviewed**  
**controlled_alpha_eligible recommendation: CONFIRM (already PL-set true)**

**§2 Checklist:**

| Section | Result | Notes |
|---|---|---|
| §2.1 Source verification | ✅ PASS | moj-isa-10-00237 quoted in body; 2 PDFs marked needs_human_fetch — appropriate |
| §2.2 direct_fact_fields | ✅ PASS | 8 fields, all with body quote + source citation |
| §2.3 ai_inferred_fields | ✅ PASS | 0 fields (all inference moved to needs_review or derived from direct) |
| §2.4 needs_review_flags | ✅ PASS | 3 flags: jigyou_keikakusho_expert_check, jlpt_alternatives_completeness, jimusho_menseki_kijun — all PDF-dependent, correctly isolated |
| §2.5 must_say coverage | ✅ PASS | 8 must_say items, all core facts covered |
| §2.6 must_not_say | ✅ PASS | 旧500万円, 旧基準, 断定 all blocked |
| §2.7 qa_cases | ✅ PASS | 5 cases including startup visa edge case |
| §2.8 injection_certain_block | ✅ PASS | Contains only direct_fact_fields; needs_review properly excluded |
| §2.9 needs_review_addendum | ✅ PASS | Correctly labeled NOT injected; scoped to PDF-dependent items only |
| §2.10 risk/confidence/source_quality | ✅ PASS | critical / high / official — all justified |

**Findings:**
- All 5 core 2025-10-16 改正 requirements (3,000万円・常勤1名・学歴/経験・N2・事務所兼用不可) are sourced from moj-isa-10-00237 with direct quotes in body.
- 3 needs_review_flags correctly defer PDF-dependent details (ガイドライン PDF moj-isa-001448070).
- injection_certain_block does not contain any needs_review items.
- controlled_alpha_eligible: true was set by PL (§7+§11). DOMAIN confirms the certain_block is safe for Alpha injection.

**Action**: Set state: human_reviewed, reviewer: DOMAIN-CC, approved_at: 2026-05-07.

---

### Card 2: eijuu-nenkin-risk

**Verdict: HOLD**  
**controlled_alpha_eligible recommendation: ❌ NO**

**§2 Checklist:**

| Section | Result | Notes |
|---|---|---|
| §2.1 Source verification | ⚠️ PARTIAL | moj-isa-nyuukoku07-00133 (高度人材 page) confirmed, but is NOT the general applicant page |
| §2.2 direct_fact_fields | ⚠️ PARTIAL | 2年/3年 lookback periods in direct_fact_fields are sourced from 高度人材 page only |
| §2.3 ai_inferred_fields | ✅ PASS | ai_inferred items labeled correctly |
| §2.4 needs_review_flags | ✅ PASS | general_applicant_lookback_verification correctly flagged |
| §2.5–§2.9 | ✅ PASS | must_say/not_say, QA, injection blocks structurally correct |
| §2.10 risk/confidence/source_quality | ⚠️ ADJUSTED | confidence was downgraded to medium in Batch 1 audit (PR #77) — DOMAIN confirms this is correct |

**Findings:**
- Core issue: The 2年/3年 social insurance lookback periods cited are sourced from the 高度人材ポイント制優遇措置 page (nyuukoku07-00133), which applies to 高度人材 applicants. General applicant (普通の永住申請者) periods have not been confirmed from a general-applicant official source.
- DOMAIN checked: No new source provided in this audit cycle. The sourcing gap remains open.
- confidence: medium remains correct. controlled_alpha_eligible: NO — critical card with medium confidence cannot be recommended for Alpha injection.
- State remains ai_verified. No frontmatter change.

**Pending action for FACT**: Provide moj-isa page specifically covering 一般永住申請者 (nyuukoku07-00132 or equivalent) to confirm the lookback periods apply to general applicants. Once provided, DOMAIN can re-audit and potentially approve → human_reviewed.

---

### Card 3: spouse-divorce-separation

**Verdict: CONFIRMED (already human_reviewed)**  
**controlled_alpha_eligible recommendation: ✅ YES — recommend PL signoff**

**§2 Checklist:**

| Section | Result | Notes |
|---|---|---|
| §2.1 Source verification | ✅ PASS | moj-isa-haigu-rikon + moj-isa-haiguu-30day — both official MOJ-ISA |
| §2.2 direct_fact_fields | ✅ PASS | 4 fields: 6か月ルール, 14日届出, 30日猶予, 意見聴取 — all sourced with body quotes |
| §2.3–§2.9 | ✅ PASS | Structurally sound. 3 needs_review_flags appropriately isolated |
| §2.10 risk/confidence/source_quality | ✅ PASS | critical / high / official |

**Findings:**
- Card was promoted to human_reviewed in Batch 1 audit (PR #77). State confirmed correct.
- 4 core facts are critical life-impact information (6か月 status loss rule, 14日 mandatory notification, 30日 grace period, 意見聴取 right) — all backed by official sources.
- DOMAIN recommendation: This card is safe for controlled Alpha injection. PL signoff on controlled_alpha_eligible: true is warranted.

**Action**: No state change. PL decision on controlled_alpha_eligible.

---

### Card 4: gijinkoku-job-mismatch

**Verdict: REQUEST_EDIT**  
**controlled_alpha_eligible recommendation: N/A (high risk; ai_verified ships without this flag)**

**§2 Checklist:**

| Section | Result | Notes |
|---|---|---|
| §2.1 Source verification | ✅ PASS | 3 official sources, all moj.go.jp/isa |
| §2.2 direct_fact_fields | ❌ FAIL | Phantom field detected (see below) |
| §2.3–§2.9 | ✅ PASS | Core content solid |
| §2.10 | ✅ PASS | high / high / official |

**Findings — Phantom Field:**

`direct_fact_fields` declares `kaijo_jitsurei_rule_6months_haiguusha`. However:

1. There is **no corresponding section in the card body** explaining this field with a source citation.
2. The 6か月 rule for 配偶者 visa cancellation (入管法22条の4第7号) applies to **配偶者等** visa holders, NOT 技術・人文知識・国際業務 holders.
3. Including this in a 技人国 card without explanation could mislead readers into thinking there is a 6か月 grace period within 技人国 for abandoning the visa-corresponding activity.

**Required edit (FACT action):**
Option A — Remove `kaijo_jitsurei_rule_6months_haiguusha` from `direct_fact_fields`. The 3か月ルール (kaijo_jitsurei_rule_3months) already covers the 技人国 cancellation trigger.  
Option B — Add a body section that: (a) explains this is the 配偶者 visa rule, (b) clarifies it does NOT apply to 技人国, (c) cites the relevant法令 article, and moves the field to `ai_inferred_fields` as a cross-reference note.

DOMAIN recommendation: **Option A** (simpler; eliminates confusion; the 配偶者 rule is covered by the spouse-divorce-separation card).

**No state change** (stays ai_verified). No re-audit needed after edit if FACT implements Option A.

---

### Card 5: shikakugai-fukugyou

**Verdict: APPROVE → human_reviewed**  
**controlled_alpha_eligible recommendation: N/A (high risk)**

**§2 Checklist:**

| Section | Result | Notes |
|---|---|---|
| §2.1 Source verification | ✅ PASS | moj-isa-shikakugai + moj-isa-bessho2 — both official MOJ-ISA |
| §2.2 direct_fact_fields | ✅ PASS | 6 fields, all sourced with body quotes |
| §2.3 ai_inferred_fields | ✅ PASS | Labeled appropriately |
| §2.4 needs_review_flags | ✅ PASS | Appropriately scoped |
| §2.5 must_say | ✅ PASS | 週28時間/1日8時間 dual rule for 留学生 clearly covered |
| §2.6 must_not_say | ✅ PASS | Critical errors blocked: 40時間誤り, 別表第2 holders restriction error |
| §2.7 qa_cases | ✅ PASS | フリーランス edge case included |
| §2.8 injection_certain_block | ✅ PASS | Only direct facts |
| §2.9 needs_review_addendum | ✅ PASS | Correctly separated |
| §2.10 | ✅ PASS | high / high / official |

**Findings:**
- All 6 direct_fact_fields are backed by official source quotes in the body.
- Critical distinction for 留学生: 週28時間 (通常期) vs 1日8時間 (長期休業中) correctly captured.
- 別表第2 holders (永住者・特別永住者等) correctly noted as having NO 資格外活動 restrictions.
- must_not_say correctly blocks the common error of stating 週40時間 without the long vacation exception.
- No phantom fields, no mislabeled items.

**Action**: Set state: human_reviewed, reviewer: DOMAIN-CC, approved_at: 2026-05-07.

---

### Card 6: zairyu-expiry-renewal-change

**Verdict: APPROVE → human_reviewed**  
**controlled_alpha_eligible recommendation: N/A (high risk)**

**§2 Checklist:**

| Section | Result | Notes |
|---|---|---|
| §2.1 Source verification | ✅ PASS | moj-isa-tokureikikan + moj-isa-16-3 — both official MOJ-ISA |
| §2.2 direct_fact_fields | ✅ PASS | 5 fields, all sourced |
| §2.3 ai_inferred_fields | ✅ PASS | fukyoka_no_case + late_application correctly labeled as ai_inference |
| §2.4 needs_review_flags | ✅ PASS | 3 flags (fukyoka_departure_timeline, kigen_ato_shinsei, henkou_vs_koshin) properly isolated |
| §2.5 must_say | ✅ PASS | 6 items including critical "満了後申請は特例期間の対象外" |
| §2.6 must_not_say | ✅ PASS | 5 critical errors blocked including "何か月でも" and "不許可でも居られる" |
| §2.7 qa_cases | ✅ PASS | 3 cases covering: 審査中に期限到来, 申請タイミング, 不許可後 |
| §2.8 injection_certain_block | ✅ PASS | Correctly formatted with limits explicitly stated |
| §2.9 needs_review_addendum | ✅ PASS | Isolated items not in injection block |
| §2.10 | ✅ PASS | high / high / official |

**Findings:**
- 特例期間 definition, maximum duration (2か月), and permitted activities (従前の活動継続) all backed by direct MOJ-ISA quotes.
- Both limiting cases correctly documented: (a) 処分が下りた時点で終了, (b) 最長2か月.
- ai_inferred fields (不許可後, 期限後申請) correctly isolated in needs_review_flags.
- injection_certain_block includes the key constraints inline ("最長2か月を超えることはない", "不許可の通知を受けた時点で特例期間終了").

**Action**: Set state: human_reviewed, reviewer: DOMAIN-CC, approved_at: 2026-05-07.

---

### Card 7: keiei-kanri-existing-holder-update

**Verdict: APPROVE → human_reviewed**  
**controlled_alpha_eligible recommendation: N/A (high risk)**

**§2 Checklist:**

| Section | Result | Notes |
|---|---|---|
| §2.1 Source verification | ✅ PASS | moj-isa-10-00237 (same as keiei-kanri-2025-10 main source), quoted in body |
| §2.2 direct_fact_fields | ✅ PASS | 5 fields, all with body quotes |
| §2.3 ai_inferred_fields | ✅ PASS | 1 field (early consultation recommendation) appropriately labeled |
| §2.4 needs_review_flags | ✅ PASS | 1 flag (kaizen_mikomi_unyou_kijun) — correctly identifies the PDF-dependent ambiguity |
| §2.5 must_say | ✅ PASS | 6 items; 2028-10-15 end date + 2028-10-16 full compliance trigger clearly stated |
| §2.6 must_not_say | ✅ PASS | Blocks "即座に3,000万円必須", "何でも許可", "2028年以降も従来通り" |
| §2.7 qa_cases | ✅ PASS | 4 cases including 2028年以降 concern and 施行日前申請 |
| §2.8 injection_certain_block | ✅ PASS | date_logic guards (TODAY >= 2025-10-16 AND TODAY <= 2028-10-15) correctly framed |
| §2.9 needs_review_addendum | ✅ PASS | Isolated to ガイドライン PDF item |
| §2.10 | ✅ PASS | high / high / official |

**Findings:**
- Over transition measures sourced from same official page as new-standard card (moj-isa-10-00237) with direct quotes.
- The 3-year window (〜2028-10-15) and "総合考量" standard correctly documented.
- date_logic section correctly handles the two temporal states (within window / after window).
- Cross-reference to keiei-kanri-2025-10 for new-standard details is correct.

**Action**: Set state: human_reviewed, reviewer: DOMAIN-CC, approved_at: 2026-05-07.

---

### Card 8: startup-visa-keiei-transition

**Verdict: NOT UPGRADED (ai_extracted maintained)**  
**controlled_alpha_eligible recommendation: ❌ NO**

**§2 Checklist:**

| Section | Result | Notes |
|---|---|---|
| §2.1 Source verification | ⚠️ INCOMPLETE | METI page (meti.go.jp) timed out in FACT pipeline; needs_human_fetch: true |
| §2.2 direct_fact_fields | ⚠️ PARTIAL | 最長2年 and 変更申請 requirement sourced; but 認定機関 details and 起業完了 definition require METI page |
| §2.4 needs_review_flags | ✅ PASS | 4 flags appropriately identified |
| §2.10 | ✅ PASS | high / medium / official — correctly reflects incomplete sourcing |

**DOMAIN Professional Resolution — transition_conditions_post_2025_10:**

This needs_review_flag can be partially resolved through professional knowledge:

The card's `needs_review_flags.transition_conditions_post_2025_10` asks whether startup visa → keiei-kanri transitions are subject to the new 2025-10 standards or to the 既存保持者 過渡措置.

**DOMAIN determination**: The 既存保持者 過渡措置 applies ONLY to 在留期間更新許可申請 by current 経営・管理 holders. Startup visa (特定活動) → 経営・管理 is a **在留資格変更許可申請** — a NEW application for a new status. This is explicitly addressed in `applies_to` of keiei-kanri-2025-10 (which includes 在留資格変更許可申請 among its targets). Therefore:

> **The 2025-10-16 new standards (3,000万円, 常勤1名, N2, 学歴/経験, 事務所) apply in FULL to startup visa → keiei-kanri change applications filed on or after 2025-10-16. The 既存保持者 過渡措置 does NOT apply.**

This determination moves `transition_conditions_post_2025_10` from "unknown" to "resolved via professional analysis". However, since this resolution is DOMAIN inference (not direct MOJ-ISA quote), it should be added to `ai_inferred_fields`, not `direct_fact_fields`, and the card body should be updated accordingly.

**Why NOT upgrading to ai_verified:**
- `meti_page_source_gap` remains open: 認定機関リスト and 起業完了 definition cannot be confirmed without METI page
- `kigyou_kanryo_definition` remains open
- Per FACT README.md 13-item self-promotion criteria: "すべての direct_fact_fields に公式ソース引用あり" — METI items cannot be verified
- confidence: medium correctly reflects this gap

**Pending action for DOMAIN/Human**: Manually fetch https://www.meti.go.jp/policy/newbusiness/startupvisa/index.html. Retrieve: (1) 認定機関リスト/申請手続き詳細, (2) 起業活動完了の定義, (3) 移行フロー全体図. After retrieval, DOMAIN can upgrade to ai_verified.

**Action**: Add DOMAIN note to changelog. No state change. transition_conditions_post_2025_10 flag to be updated in body to reflect DOMAIN determination.

---

## PL Decision Items

| Item | Recommendation | Priority |
|---|---|---|
| spouse-divorce-separation: controlled_alpha_eligible: true | ✅ RECOMMEND PL APPROVE | P1 — critical card, human_reviewed, high confidence |
| keiei-kanri-2025-10: controlled_alpha_eligible: true (already set) | ✅ CONFIRM after human_reviewed | P1 — confirm existing flag now that state is human_reviewed |
| eijuu-nenkin-risk: controlled_alpha_eligible: false | ❌ DO NOT SET | Until sourcing gap resolved |
| startup-visa-keiei-transition: controlled_alpha_eligible: false | ❌ DO NOT SET | Until METI page fetched + ai_verified |

---

## FACT Action Items

| Priority | Card | Required Action |
|---|---|---|
| P1 | eijuu-nenkin-risk | Provide moj-isa general applicant page (nyuukoku07-00132 or equivalent) for 2年/3年 lookback verification |
| P1 | gijinkoku-job-mismatch | Remove `kaijo_jitsurei_rule_6months_haiguusha` from direct_fact_fields (Option A), or add body section explaining 配偶者 visa distinction (Option B) |
| P2 | startup-visa-keiei-transition | Human fetch of METI スタートアップビザ page; retrieve 認定機関リスト + 起業完了定義 + 移行フロー |
| P2 | startup-visa-keiei-transition | Update body to reflect DOMAIN determination: transition_conditions_post_2025_10 resolved → new standards apply in full; move to ai_inferred_fields |

---

## Frontmatter Changes Applied in This PR

| Card | Field | From | To |
|---|---|---|---|
| keiei-kanri-2025-10 | state | ai_verified | human_reviewed |
| keiei-kanri-2025-10 | reviewer | ai_self_verified | DOMAIN-CC |
| keiei-kanri-2025-10 | approved_at | — | 2026-05-07 |
| keiei-kanri-2025-10 | approved_by | — | DOMAIN-CC (claude-sonnet-4-6, audit-full-20260507) |
| shikakugai-fukugyou | state | ai_verified | human_reviewed |
| shikakugai-fukugyou | reviewer | ai_self_verified | DOMAIN-CC |
| shikakugai-fukugyou | approved_at | — | 2026-05-07 |
| shikakugai-fukugyou | approved_by | — | DOMAIN-CC (claude-sonnet-4-6, audit-full-20260507) |
| zairyu-expiry-renewal-change | state | ai_verified | human_reviewed |
| zairyu-expiry-renewal-change | reviewer | ai_self_verified | DOMAIN-CC |
| zairyu-expiry-renewal-change | approved_at | — | 2026-05-07 |
| zairyu-expiry-renewal-change | approved_by | — | DOMAIN-CC (claude-sonnet-4-6, audit-full-20260507) |
| keiei-kanri-existing-holder-update | state | ai_verified | human_reviewed |
| keiei-kanri-existing-holder-update | reviewer | ai_self_verified | DOMAIN-CC |
| keiei-kanri-existing-holder-update | approved_at | — | 2026-05-07 |
| keiei-kanri-existing-holder-update | approved_by | — | DOMAIN-CC (claude-sonnet-4-6, audit-full-20260507) |

Changelog entries also added to gijinkoku-job-mismatch (REQUEST_EDIT) and startup-visa-keiei-transition (DOMAIN note).

---

*Generated by DOMAIN-CC under DOMAIN_AUDIT_PROTOCOL_v1.md §3.*
