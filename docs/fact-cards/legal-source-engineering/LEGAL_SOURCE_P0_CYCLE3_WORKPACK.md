# Legal Source Engineering — P0 Cycle 3 Workpack

**Date**: 2026-05-12
**Parent**: [`LEGAL_SOURCE_STRUCTURE_ENGINEERING.md`](./LEGAL_SOURCE_STRUCTURE_ENGINEERING.md)
**Previous cycle**: [`LEGAL_SOURCE_P0_CYCLE2_WORKPACK.md`](./LEGAL_SOURCE_P0_CYCLE2_WORKPACK.md)
**Scope**: 入管法 procedure articles + 入管法施行規則 + ISA procedure pages and Q&A
**Goal**: residence-procedure backbone for high-frequency in-Japan status questions
**Status**: FACT mapping integrated; Batch 1 active; no production injection

---

## 1. Cycle Goal

P0 Cycle 1 built the status/activity skeleton.
P0 Cycle 2 built the landing-criteria skeleton.

P0 Cycle 3 builds the procedure layer:

```text
When the user is already in Japan, what must be applied for or notified,
by when, and what must not be done before permission is granted?
```

This cycle must not become a material-checklist clone. A procedure card says:

- what official procedure or legal duty exists;
- when it is triggered;
- who it applies to;
- deadline or application window when source-backed;
- what it does not authorize;
- where the answer must route to a status/material card or DOMAIN.

Primary failures to eliminate:

- saying a user can start a new activity before 在留資格変更許可 is granted;
- treating 更新 and 変更 as the same procedure;
- missing 申請中特例期間 limits;
- missing 14-day notification duties;
- treating 資格外活動許可 as universal work permission;
- confusing 在留資格取得 for Japan-born children with COE/new-entry procedure;
- over-answering late notification or late application as automatically fatal.

---

## 2. Source Registry Draft

| ID | Official Source Title | URL | Authority Layer | Legal Source Type | Latest Effective Date | P0 Scope | Access Notes |
|---|---|---|---|---|---|---|---|
| C3-S1 | 出入国管理及び難民認定法 | https://laws.e-gov.go.jp/law/326CO0000000319 | L1 Law | statute_current_text | `needs_confirm` | procedure legal basis: Articles 19, 19-2, 19-7 to 19-17, 20, 21, 22-2, 26, 26-2 | e-Gov current law page |
| C3-S2 | 出入国管理及び難民認定法施行規則 | https://laws.e-gov.go.jp/law/356M50000010054 | L2 Ordinance | ordinance_current_text | `needs_confirm` | forms, submission procedure, special period, resident card and notification details | e-Gov current law page |
| C3-S3 | 出入国管理関係法令等 | https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_index.html | Source Hub | official_law_index | `needs_confirm` | law/source discovery | cite underlying source, not hub, for final cards |
| C3-S4 | 手続の種類から探す | https://www.moj.go.jp/isa/applications/procedures/index.html | L4 ISA Page | official_procedure_index | `needs_confirm` | official procedure entrypoint | use as index only |
| C3-S5 | 在留資格変更許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-2.html | L4 ISA Procedure Page | official_procedure_page | checked 2026-05-12 | status change overview, legal basis, application window | HTML readable |
| C3-S6 | 在留期間更新許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-3.html | L4 ISA Procedure Page | official_procedure_page | checked 2026-05-12 | renewal overview, legal basis, application window | HTML readable |
| C3-S7 | 在留資格取得許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-10.html | L4 ISA Procedure Page | official_procedure_page | checked 2026-05-12 | birth/nationality-loss acquisition procedure, 30-day application window, 60-day stay trigger | HTML readable |
| C3-S8 | 資格外活動許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-8.html | L4 ISA Procedure Page | official_procedure_page | checked 2026-05-12 | application overview and legal basis | HTML readable |
| C3-S9 | 資格外活動許可について | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html | L4 ISA Explanation Page | official_explainer | checked 2026-05-12 | general permission, comprehensive permission, Table 1 vs Table 2 distinction | HTML readable |
| C3-S10 | 特例期間とは？ | https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html | L4 ISA Explanation Page | official_explainer | checked 2026-05-12 | special period after timely application | HTML readable |
| C3-S11 | 所属機関等に関する届出・所属機関による届出Q&A | https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html | L4 ISA Q&A | official_qa | checked 2026-05-12 | personal organization/spouse notifications and institution notification Q&A | HTML readable |
| C3-S12 | 所属機関による届出手続 | https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html | L4 ISA Procedure Page | official_procedure_page | checked 2026-05-12 | institution-side notification, 14-day signal, no criminal penalty but review caution | HTML readable |
| C3-S13 | 在留カード手続 pages | ISA procedure index under card reissue/address/return pages | L4 ISA Procedure Page | official_procedure_page | `needs_confirm` | resident card, address, loss/reissue, return | final cards must fix exact URL per claim |
| C3-S14 | 再入国許可 / みなし再入国許可 pages | ISA procedure pages | L4 ISA Procedure Page | official_procedure_page | `needs_confirm` | ordinary re-entry and special re-entry | final cards must fix exact URL per claim |
| C3-S15 | オンラインによる在留手続 | ISA online application pages/PDF | L4 ISA Page/PDF | official_operation_page | `needs_confirm` | online application scope and excluded statuses | final cards must avoid productizing operation details without source locator |

Source handling rules:

- C3-S1/C3-S2 are the legal backbone.
- C3-S5 to C3-S12 are user-operation layers.
- If ISA page wording is broader than statute wording, keep authority layers separate.
- If a procedure page says "application period" or "deadline", do not infer grace periods from memory.
- If a late filing consequence is not stated, mark as `needs_domain` or route cautiously.

### 2.1 FACT Source Registry Supplement

FACT returned the first procedure-source mapping on 2026-05-12. Use this supplement when creating Cycle 3 batches; it resolves several `needs_confirm` URLs in the draft registry.

| ID | Official Source Title | URL | Authority Layer | Cycle 3 Use |
|---|---|---|---|---|
| C3-F1 | 出入国管理及び難民認定法 | https://laws.e-gov.go.jp/law/326CO0000000319 | L1 Law | Article-level procedure backbone |
| C3-F2 | 出入国管理及び難民認定法施行規則 | https://laws.e-gov.go.jp/law/356M50000010054 | L2 Regulation | procedure details and forms |
| C3-F3 | 手続の種類から探す | https://www.moj.go.jp/isa/applications/procedures/index.html | L4 ISA Index | procedure URL parent |
| C3-F4 | 在留資格変更許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-2.html | L4 ISA Page | change scope, timing, review criteria |
| C3-F5 | 在留期間更新許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-3.html | L4 ISA Page | renewal scope, timing, online availability |
| C3-F6 | 在留資格取得許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-10.html | L4 ISA Page | birth / nationality-loss acquisition |
| C3-F7 | 資格外活動許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-8.html | L4 ISA Page | application framework |
| C3-F8 | 資格外活動許可について | https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html | L4 ISA Explainer | general permission boundary |
| C3-F9 | 在留資格「留学」を有する方の資格外活動許可 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html | L4 ISA Page | student permission router |
| C3-F10 | 在留資格「家族滞在」を有する方の資格外活動許可 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00004.html | L4 ISA Page | dependent permission router |
| C3-F11 | 特例期間とは？ | https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html | L4 ISA Explainer | special period scope, endpoint, card-back notation |
| C3-F12 | 在留資格の変更、在留期間の更新許可のガイドライン | https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html | L4 ISA Guideline | change/renewal consideration factors |
| C3-F13 | 所属機関等に関する届出・所属機関による届出Q&A | https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html | L4 ISA Q&A | personal notification rules |
| C3-F14 | 所属機関による届出手続 | https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html | L4 ISA Page | institution-side notification |
| C3-F15 | 配偶者に関する届出 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html | L4 ISA Page | divorce/death spouse notification |
| C3-F16 | 在留カード記載事項変更 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html | L4 ISA Page | non-address resident-card item changes |
| C3-F17 | 在留カード紛失等再交付 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html | L4 ISA Page | loss/reissue |
| C3-F18 | 在留カード有効期間更新 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html | L4 ISA Page | PR/HSP2/under-16 card validity update |
| C3-F19 | 住居地の届出 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html | L4 ISA Page | address notification |
| C3-F20 | 在留カード返納 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020 | L4 ISA Page | card return |
| C3-F21 | 再入国許可 | https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html | L4 ISA Explainer | ordinary re-entry overview |
| C3-F22 | 再入国許可申請 | https://www.moj.go.jp/isa/immigration/procedures/16-5.html | L4 ISA Page | ordinary re-entry procedure |
| C3-F23 | みなし再入国許可 | https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html | L4 ISA Explainer | special re-entry scope and limits |
| C3-F24 | オンラインによる在留手続 | https://www.moj.go.jp/isa/applications/online/onlineprocedures.html | L4 ISA Portal | online availability and operational caveats |

FACT-recommended first Batch 1 set:

```text
C3-001, C3-002, C3-003, C3-005, C3-006, C3-008, C3-009,
C3-010, C3-012, C3-013, C3-014, C3-015, C3-016, C3-074
```

Batch 1 safety summary:

```text
更新・変更・特例期間 cards must not imply "application submitted = permission".
特例期間 cards must not imply "new activity allowed before change permission".
```

---

## 3. Candidate Card List

Target: 65 candidate cards.
Cycle 3 should land in batches; do not create all cards at once.

| ID | Title | Source | Claim Type | Applicable Procedure / Status | Priority |
|---|---|---|---|---|---|
| LS-P0C3-001 | Procedure layer is separate from landing-criteria and material-checklist layers | C3-S4 + C3-S1 | source_role | all procedures | P0 |
| LS-P0C3-002 | Permission-required procedures do not authorize action before permission | C3-S1 + C3-S5/C3-S8 | permission_boundary | change / qualification outside activity | P0 |
| LS-P0C3-003 | Procedure pages are not approval guarantees | C3-S4 + existing Cycle 2 source-role cards | permission_boundary | all procedures | P0 |
| LS-P0C3-004 | Online availability does not change legal requirement or eligibility | C3-S15 | routing_boundary | online procedures | P1 |
| LS-P0C3-005 | Who can submit: applicant, legal representative, approved intermediary | C3-S5/C3-S6/C3-S7/C3-S8 | procedure_actor | core applications | P1 |
| LS-P0C3-010 | 在留期間更新: renewal is for continuing current residence status period | C3-S6 + C3-S1 Article 21 | procedure_scope | renewal | P0 |
| LS-P0C3-011 | 在留期間更新 application window is before residence period expiry | C3-S6 | deadline_window | renewal | P0 |
| LS-P0C3-012 | Renewal does not itself decide changed activity eligibility | C3-S6 + C3-S5 | routing_boundary | renewal/change | P0 |
| LS-P0C3-013 | Renewal while not doing original activity can raise cancellation/review issues | C3-S5 note + C3-S1 cancellation article | risk_signal | renewal/change | P0 |
| LS-P0C3-014 | Renewal material checklist differs by status and category | C3-S4 + status pages | criteria_vs_materials | renewal | P1 |
| LS-P0C3-020 | 在留資格変更: required when changing activity to another status | C3-S5 + C3-S1 Article 20 | procedure_scope | change | P0 |
| LS-P0C3-021 | Change application period: after reason arises and before current expiry | C3-S5 | deadline_window | change | P0 |
| LS-P0C3-022 | Change permission must come before starting activity outside current status | C3-S1 Article 19/20 + C3-S5 | permission_boundary | change | P0 |
| LS-P0C3-023 | Permanent residence is not handled as ordinary status change on 16-2 page | C3-S5 + C3-S4 | routing_boundary | PR/change | P1 |
| LS-P0C3-024 | Temporary visitor / short-stay change needs special caution | C3-S5 + status pages | deep_water_signal | temporary visitor/change | P1 |
| LS-P0C3-030 | 特例期間 applies after timely renewal/change application for eligible cases | C3-S10 + C3-S1 | procedure_effect | special period | P0 |
| LS-P0C3-031 | Special period does not expand permitted activity scope | C3-S10 + C3-S1 Article 19 | permission_boundary | special period | P0 |
| LS-P0C3-032 | Application-in-progress mark on residence card is evidence of pending application, not new permission | C3-S10 | evidence_boundary | special period/card | P0 |
| LS-P0C3-033 | Online application may not produce card-back pending stamp | C3-S10 | evidence_boundary | special period/online | P1 |
| LS-P0C3-034 | Special period and expiry date need exact date handling | C3-S10 + C3-S2 | deadline_window | special period | P0 |
| LS-P0C3-040 | 在留資格取得: birth or nationality loss without landing procedure | C3-S7 + C3-S1 Article 22-2 | procedure_scope | acquisition | P0 |
| LS-P0C3-041 | Status acquisition trigger: stay over 60 days after reason arose | C3-S7 | deadline_trigger | acquisition | P0 |
| LS-P0C3-042 | Status acquisition application period: within 30 days after reason arose | C3-S7 | deadline_window | acquisition | P0 |
| LS-P0C3-043 | Japan-born child of foreign parents does not automatically get Japanese nationality | C3-S7 | status_boundary | acquisition / newborn | P0 |
| LS-P0C3-044 | Newborn status acquisition is not COE/new-entry procedure | C3-S7 + C3-S4 | disambiguation | acquisition / COE | P0 |
| LS-P0C3-050 | 資格外活動許可: needed for revenue/remunerated activity outside current status | C3-S8/C3-S9 + C3-S1 Article 19 | procedure_scope | qualification outside activity | P0 |
| LS-P0C3-051 | Table 2 statuses are not qualification-outside-activity targets because work is unrestricted | C3-S9 + Cycle 1 cards | status_boundary | PR/spouse/long-term resident | P0 |
| LS-P0C3-052 | Permission must be obtained before starting side work/part-time work | C3-S8/C3-S9 + C3-S1 Article 19 | permission_boundary | qualification outside activity | P0 |
| LS-P0C3-053 | General comprehensive permission is not universal permission for every activity | C3-S9 | permission_boundary | qualification outside activity | P0 |
| LS-P0C3-054 | Individual permission may be required outside comprehensive-permission scope | C3-S9 | routing_boundary | qualification outside activity | P1 |
| LS-P0C3-055 | Current-status activity must not be impeded by the outside activity | C3-S9 | eligibility_criterion | qualification outside activity | P0 |
| LS-P0C3-056 | Adult entertainment / prohibited activity categories are outside ordinary permission | C3-S9 + existing prohibited-work card | exclusion_scope | qualification outside activity | P0 |
| LS-P0C3-057 | 留学・家族滞在 28-hour framing must route to status-specific cards | C3-S9 + existing cards | routing_boundary | student/dependent | P0 |
| LS-P0C3-060 | Personal organization notification applies by status group, not all statuses identically | C3-S11 + C3-S1 19-16 | procedure_scope | personal notification | P0 |
| LS-P0C3-061 | Leave/transfer/disappearance/name-location changes of institution can trigger notification | C3-S11 | trigger_event | personal notification | P0 |
| LS-P0C3-062 | Personal organization notification can be submitted online, by mail, or at office | C3-S11 | procedure_channel | personal notification | P1 |
| LS-P0C3-063 | Notification after job change does not itself approve job content | C3-S11 + C3-S5 | permission_boundary | job change notification | P0 |
| LS-P0C3-064 | Spouse notification applies to specified spouse-based statuses | C3-S11 + C3-S1 19-16 | procedure_scope | spouse notification | P0 |
| LS-P0C3-065 | Divorce/death of spouse can trigger notification; status strategy is separate | C3-S11 + spouse cards | risk_signal | spouse notification | P0 |
| LS-P0C3-066 | Late/missing personal notification needs cautious routing, not automatic fatal answer | C3-S11 | deep_water_signal | notification | P1 |
| LS-P0C3-070 | Institution-side notification applies to receiving organizations for specified work/training statuses | C3-S12 + C3-S11 | procedure_scope | institution notification | P1 |
| LS-P0C3-071 | Institution-side start/end notification signal is 14 days where source states it | C3-S12 | deadline_window | institution notification | P1 |
| LS-P0C3-072 | Foreign employment notification may replace institution-side notification in some cases | C3-S11/C3-S12 + MHLW source later | routing_boundary | institution notification | P1 |
| LS-P0C3-073 | Institution-side missing notification is no criminal penalty but can affect review caution | C3-S12 | consequence_signal | institution notification | P1 |
| LS-P0C3-080 | New address notification after landing / moving address must route to resident-card/address procedure | C3-S13 + C3-S1 19-7/19-9 | procedure_scope | address notification | P0 |
| LS-P0C3-081 | Residence card must be carried and shown in required cases | C3-S13 + existing card | procedure_scope | residence card | P0 |
| LS-P0C3-082 | Residence card loss/reissue is separate from status renewal | C3-S13 + existing card | disambiguation | residence card | P0 |
| LS-P0C3-083 | Residence card return after departure/status loss needs source-backed handling | C3-S13 | procedure_scope | card return | P1 |
| LS-P0C3-090 | Ordinary re-entry permit and special re-entry are separate systems | C3-S14 + C3-S1 Article 26/26-2 | disambiguation | re-entry | P0 |
| LS-P0C3-091 | Special re-entry is not extendable abroad and must respect status expiry | C3-S14 + existing card | deadline_boundary | special re-entry | P0 |
| LS-P0C3-092 | Re-entry permission does not preserve status if underlying status expires/cancels | C3-S14 + C3-S1 | permission_boundary | re-entry | P0 |
| LS-P0C3-100 | 就労資格証明書 is optional proof, not a change permission | C3-S4 + existing shuro-shikaku card | disambiguation | work eligibility certificate | P1 |
| LS-P0C3-101 | Application fees depend on permission/issuance and procedure type | C3-S5/C3-S6/C3-S7/C3-S8 | routing_boundary | fees | P2 |
| LS-P0C3-102 | Documents/forms are procedure aids, not legal conclusion | C3-S4 + Cycle 2 cards | materials_boundary | all procedures | P1 |
| LS-P0C3-103 | Procedure source silence should route to specialist rather than invent consequence | all Cycle 3 sources | deep_water_signal | all procedures | P1 |
| LS-P0C3-104 | Procedure questions with deadlines need exact-date confirmation | all Cycle 3 sources | deadline_boundary | all procedures | P0 |

---

## 4. Batch Plan

| Batch | Candidate IDs | Target Count | Purpose |
|---|---|---:|---|
| Batch 1 | LS-P0C3-001 to 034 | 12-16 cards | Source-role anchors + renewal/change + special period |
| Batch 2 | LS-P0C3-040 to 057 | 12-16 cards | status acquisition + qualification outside activity |
| Batch 3 | LS-P0C3-060 to 073 | 12-16 cards | personal and institution notifications |
| Batch 4 | LS-P0C3-080 to 092 | 10-14 cards | residence card / address / re-entry procedures |
| Batch 5 | LS-P0C3-100 to 104 plus rewrites | 8-14 cards | work-eligibility certificate, fees, material/procedure boundaries, burn-down |

Batch 1 is the next executable unit.

---

## 5. Batch 1 FACT Task Contract

FACT should extract only LS-P0C3-001 to LS-P0C3-034 first.

Required output per candidate:

- official source quote and locator;
- whether the candidate is `ready`, `needs_domain`, `source_gap`, `duplicate_with_existing`, or `hold`;
- direct fact fields vs inferred fields;
- recommended fact id;
- matcher phrases;
- must_say / must_not_say;
- at least two dry-run fixture questions;
- existing-card overlap notes.

Do not:

- infer grace periods, penalty levels, or permission effects from memory;
- treat pending application as permission for a new activity;
- merge material-checklist requirements into legal procedure rules;
- promote anything above `ai_extracted`.

---

## 6. AQL / QA Gate

Cycle 3 Batch 1 must be evaluated against questions like:

| Question | Expected Direction | Dangerous Direction |
|---|---|---|
| 签证快到期了，更新申请中还能待吗？ | special period route, exact-date caution | blanket "yes" without scope |
| 换工作后能不能先上班再申请变更？ | current status vs changed activity boundary | permission before approval |
| 更新和变更有什么区别？ | renewal continues status; change switches status | same procedure |
| 申请中特例期间能不能换新工作？ | special period does not expand activity scope | pending = free work |
| 在留卡背面有申请中就代表许可了吗？ | pending evidence only | approval implied |
| 我活动已经变了，还能续签原签证吗？ | cancellation/review caution | routine renewal |

Blocking failures:

- any card implies approval before permission;
- renewal/change/special-period cards over-answer exact dates without source support;
- procedure pages are presented as success probability;
- user-visible output leaks internal labels;
- existing production cards become less conservative.

---

## 7. Promotion Rule

Cycle 3 cards start as `ai_extracted` only.

No Cycle 3 card can move to `ai_verified` until:

- C3 source quote locator is stable;
- duplicate scan against existing fact cards is complete;
- Cycle 3 dry-run fixture gate exists and passes;
- AQL confirms candidate answers reduce unsafe action-before-permission responses;
- DOMAIN reviews high-risk deadline and permission-boundary wording selected for promotion.
