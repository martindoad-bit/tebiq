# Legal Source Engineering — P0 Cycle 4 Workpack

**Date**: 2026-05-12
**Parent**: [`LEGAL_SOURCE_STRUCTURE_ENGINEERING.md`](./LEGAL_SOURCE_STRUCTURE_ENGINEERING.md)
**Previous cycle**: [`LEGAL_SOURCE_P0_CYCLE3_WORKPACK.md`](./LEGAL_SOURCE_P0_CYCLE3_WORKPACK.md)
**Scope**: 永住許可 / 在留資格取消 / 身分系在留リスク anchors
**Goal**: permanent-residence and cancellation backbone for high-risk residence questions
**Status**: draft workpack; Batch 1 source extraction active; no production injection

---

## 1. Cycle Goal

P0 Cycle 1 built the status/activity skeleton.
P0 Cycle 2 built the landing-criteria skeleton.
P0 Cycle 3 built the residence-procedure skeleton.

P0 Cycle 4 builds the high-risk status-stability layer:

```text
When the user asks about permanent residence, divorce, job loss, company closure,
unpaid public obligations, or possible cancellation, what official source layer
can the system cite, and where must it stop?
```

This cycle must not become an approval-probability engine. A Cycle 4 card says:

- what the official permanent-residence or cancellation rule/guideline says;
- which authority layer supports the claim;
- what does not automatically follow from that claim;
- when an answer must route to DOMAIN, an existing production card, or a material checklist;
- which high-risk question should be recognized as deep-water rather than overanswered.

Primary failures to eliminate:

- calling 永住許可申請 “永住更新”;
- saying tax / pension / insurance documents guarantee permanent residence;
- deciding 年金免除・猶予 safety from memory;
- saying divorce, unemployment, or business suspension automatically cancels status;
- mixing 在留資格取消, 更新不許可, 変更不許可, and 永住不許可;
- giving exception-year rules without checking the source row and status basis.

---

## 2. Source Registry Draft

| ID | Official Source Title | URL | Authority Layer | Legal Source Type | Latest Effective Date | P0 Scope | Access Notes |
|---|---|---|---|---|---|---|---|
| C4-S1 | 出入国管理及び難民認定法 | https://laws.e-gov.go.jp/law/326CO0000000319 | L1 Law | statute_current_text | `needs_confirm` | 永住許可, 在留資格取消, status loss/cancellation backbone | e-Gov current law page |
| C4-S2 | 出入国管理及び難民認定法施行規則 | https://laws.e-gov.go.jp/law/356M50000010054 | L2 Ordinance | ordinance_current_text | `needs_confirm` | longest period / procedure details where needed | e-Gov current law page |
| C4-S3 | 永住許可に関するガイドライン | https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html | L3 Guideline | official_guideline | `needs_confirm` | permanent-residence guidelines, residence years, public obligations, exceptions | HTML readable; confirm current revision date |
| C4-S4 | 永住許可申請（就労資格者向け） | https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html | L4 ISA Procedure Page | official_procedure_page | `needs_confirm` | operation layer and material anchors | use after separating guideline vs checklist |
| C4-S5 | 在留資格の取消し | `needs_confirm` | L4 ISA Explanation Page | official_explainer | `needs_confirm` | cancellation trigger explanation and procedure | FACT must resolve exact URL |
| C4-S6 | 在留資格「日本人の配偶者等」関連 ISA pages | `needs_confirm` | L4 ISA Status / Procedure Page | official_status_page | `needs_confirm` | spouse-status operation/material anchors and divorce-adjacent routing | cite exact page per final card |
| C4-S7 | 在留資格「永住者」/ 在留カード有効期間更新 pages | existing C3/C4 sources | L4 ISA Procedure Page | official_procedure_page | checked in Cycle 3 | separates permanent residence status from residence-card validity | avoid duplicating Cycle 3 cards |

Source handling rules:

- C4-S1 is the legal backbone for permission/cancellation powers.
- C4-S3 is the permanent-residence guideline layer; do not flatten it into statute.
- C4-S4 is a material/procedure layer; do not treat its checklist as approval probability.
- C4-S5 cancellation pages are recognition/router sources; they do not allow automatic cancellation conclusions.
- If the official source is silent on a practice question, mark `deep_water_candidate: true` or `needs_domain`; do not invent a rule.

---

## 3. Candidate Card List

Target: 50 candidate cards.
Cycle 4 should land in batches; do not create all cards at once.

| ID | Title | Source | Claim Type | Applicable Procedure / Status | Priority |
|---|---|---|---|---|---|
| LS-P0C4-001 | 永住許可 is a separate permission, not residence-period renewal | C4-S1/C4-S4 | disambiguation | permanent residence | P0 |
| LS-P0C4-002 | 永住許可 does not mean residence-card validity renewal | C4-S4 + C3 card | disambiguation | permanent residence / card validity | P0 |
| LS-P0C4-003 | Permanent residence guideline layer differs from statute and material checklist | C4-S1/C4-S3/C4-S4 | authority_boundary | permanent residence | P0 |
| LS-P0C4-004 | Permanent residence is not an approval guarantee even if materials are complete | C4-S3/C4-S4 | permission_boundary | permanent residence | P0 |
| LS-P0C4-010 | Guideline: good conduct requirement | C4-S3 | eligibility_guideline | permanent residence | P0 |
| LS-P0C4-011 | Guideline: independent livelihood requirement | C4-S3 | eligibility_guideline | permanent residence | P0 |
| LS-P0C4-012 | Guideline: national-interest suitability requirement | C4-S3 | eligibility_guideline | permanent residence | P0 |
| LS-P0C4-013 | Guideline: public obligations are evaluated under national-interest suitability | C4-S3 | eligibility_guideline | permanent residence | P0 |
| LS-P0C4-014 | Guideline: current period of stay / longest-period requirement | C4-S3/C4-S2 | eligibility_guideline | permanent residence | P0 |
| LS-P0C4-015 | Guideline: principle residence-year framework | C4-S3 | eligibility_guideline | permanent residence | P0 |
| LS-P0C4-016 | Guideline: spouse/child exception route | C4-S3 | exception_router | permanent residence / spouse-child | P0 |
| LS-P0C4-017 | Guideline: long-term resident exception route | C4-S3 | exception_router | permanent residence / long-term resident | P1 |
| LS-P0C4-018 | Guideline: refugee / complementary protection exception route | C4-S3 | exception_router | permanent residence / protection | P2 |
| LS-P0C4-019 | Guideline: highly skilled professional point exception route | C4-S3 + P1 sources later | exception_router | permanent residence / HSP | P0 |
| LS-P0C4-020 | Tax compliance in permanent residence must not be reduced to one document | C4-S3/C4-S4 | materials_boundary | permanent residence | P0 |
| LS-P0C4-021 | Pension compliance in permanent residence needs cautious routing | C4-S3/C4-S4 | deep_water_signal | permanent residence | P0 |
| LS-P0C4-022 | Public medical insurance compliance in permanent residence needs cautious routing | C4-S3/C4-S4 | deep_water_signal | permanent residence | P0 |
| LS-P0C4-023 | 身元保証書 is a required operation-layer document, not approval guarantee | C4-S4 | materials_boundary | permanent residence | P1 |
| LS-P0C4-024 | 了解書 is operation-layer document tied to post-permission cancellation awareness | C4-S4 + cancellation source | materials_boundary | permanent residence | P1 |
| LS-P0C4-030 | 在留資格取消 is separate from renewal refusal or permanent residence refusal | C4-S1/C4-S5 | disambiguation | cancellation | P0 |
| LS-P0C4-031 | False application / false document trigger for cancellation | C4-S1/C4-S5 | cancellation_trigger | cancellation | P0 |
| LS-P0C4-032 | Not performing authorized activity for a period can be a cancellation trigger | C4-S1/C4-S5 | cancellation_trigger | cancellation | P0 |
| LS-P0C4-033 | Spouse-status holder not performing spouse activity can be a cancellation trigger | C4-S1/C4-S5 | cancellation_trigger | spouse statuses | P0 |
| LS-P0C4-034 | Not notifying residence address can be a cancellation trigger in source-backed cases | C4-S1/C4-S5 + C3 address cards | cancellation_trigger | address notification | P1 |
| LS-P0C4-035 | Cancellation is not automatic: procedure and justifiable reason must be checked | C4-S1/C4-S5 | procedure_boundary | cancellation | P0 |
| LS-P0C4-036 | Job loss does not automatically cancel status, but activity continuity matters | C4-S1/C4-S5 + existing cards | deep_water_signal | work statuses | P0 |
| LS-P0C4-037 | Business closure / no business activity under 経営・管理 needs cancellation/review routing | C4-S1/C4-S5 + existing cards | deep_water_signal | business manager | P0 |
| LS-P0C4-038 | Divorce/death changes status basis and must route to spouse notification/status strategy | C3/C4 sources + existing spouse card | deep_water_signal | spouse statuses | P0 |
| LS-P0C4-039 | Cancellation-risk questions need date/status/activity facts before answer | all C4 sources | answer_boundary | all | P0 |
| LS-P0C4-040 | Existing permanent residence can be cancelled in specified statutory cases; do not imply absolute immunity | C4-S1/C4-S5 | cancellation_trigger | permanent resident | P1 |
| LS-P0C4-041 | Permanent-resident card renewal is not permanent-residence re-screening | C3 card + C4-S1 | disambiguation | permanent resident | P0 |
| LS-P0C4-042 | Permanent residence application while current status is unstable requires caution | C4-S3 + C4-S5 | deep_water_signal | permanent residence | P1 |
| LS-P0C4-043 | Late tax / pension / insurance payment is not the same as免除・猶予 | C4-S3 + P2 sources later | disambiguation | permanent residence | P1 |
| LS-P0C4-044 | 年金免除・猶予 handling remains DOMAIN queue unless official source resolves it | C4-S3 + P2 sources later | source_gap | permanent residence | P0 |
| LS-P0C4-045 | Permanent residence materials depend on current residence status category | C4-S4 | materials_router | permanent residence | P1 |
| LS-P0C4-046 | Permanent residence guideline exceptions must be read by basis, not mixed | C4-S3 | exception_boundary | permanent residence | P0 |
| LS-P0C4-047 | Long absence from Japan can affect continuous residence analysis | C4-S3 + re-entry cards | deep_water_signal | permanent residence | P1 |
| LS-P0C4-048 | Source silence on practice handling should trigger specialist routing | all C4 sources | deep_water_signal | all | P0 |
| LS-P0C4-049 | Cancellation and departure-order/deportation pathways are separate from ordinary consultation | C4-S1/C4-S5 | deep_water_signal | enforcement | P2 |
| LS-P0C4-050 | Permanent residence and naturalization are different systems | C4-S3 + later Nationality Act | disambiguation | permanent residence / naturalization | P2 |

---

## 4. Batch Plan

| Batch | Candidate IDs | Target Count | Purpose |
|---|---|---:|---|
| Batch 1 | LS-P0C4-001 to 019, 030, 035 | 14-18 cards | permanent residence legal/guideline anchors + cancellation system entry |
| Batch 2 | LS-P0C4-020 to 024, 043 to 045 | 10-14 cards | tax / pension / insurance / materials boundary for permanent residence |
| Batch 3 | LS-P0C4-031 to 040 | 12-16 cards | cancellation triggers and status-stability risk signals |
| Batch 4 | LS-P0C4-041 to 050 plus rewrites | 10-14 cards | PR card distinction, exception burn-down, deep-water source gaps |
| Batch 5 | all unresolved + A/B fixtures | 8-12 cards plus rewrites | integration, duplicate merge, promotion queue |

Batch 1 is the next executable unit.

---

## 5. Batch 1 FACT Task Contract

FACT should extract only the Batch 1 scope first.

Required output per candidate:

- official source quote and locator;
- whether the candidate is `ready`, `needs_domain`, `source_gap`, `duplicate_with_existing`, or `hold`;
- authority layer and exact source title/URL;
- direct fact fields vs inferred fields;
- recommended fact id;
- matcher phrases;
- must_say / must_not_say;
- at least two dry-run fixture questions;
- existing-card overlap notes.

Do not:

- infer approval probability;
- infer 年金免除・猶予 safety;
- merge guideline requirements with material checklist documents;
- treat cancellation triggers as automatic cancellation conclusions;
- promote anything above `ai_extracted`.

---

## 6. AQL / QA Gate

Cycle 4 Batch 1 must be evaluated against questions like:

| Question | Expected Direction | Dangerous Direction |
|---|---|---|
| 永住申请是不是更新永住？ | separate 永住許可申請 / card renewal distinction | "永住更新" confusion |
| 永住要满足哪几个大条件？ | guideline-level three anchors, no approval guarantee | checklist or yes/no approval answer |
| 年金免除影响永住吗？ | source-gap / DOMAIN route unless official source resolves | safe/unsafe certainty |
| 税都交了是不是永住一定能下？ | public obligation is one evaluation area, not guarantee | document = approval |
| 我日配离婚了会不会取消签证？ | status-basis risk and notification/status strategy route | automatic cancellation |
| 经营管理公司停了会不会取消在留？ | activity-continuity/cancellation risk route | automatic cancellation or no risk |
| 在留资格取消和更新不许可一样吗？ | separate systems | one-bucket enforcement answer |

Blocking failures:

- any card presents permanent residence as guaranteed by documents;
- any card says cancellation is automatic without procedure/context;
- any card treats a guideline as statute or material checklist as guideline;
- user-visible output leaks internal labels;
- existing production cards become less conservative.

---

## 7. Promotion Rule

Cycle 4 cards start as `ai_extracted` only.

No Cycle 4 card can move to `ai_verified` until:

- C4 source locator is stable;
- duplicate scan against existing fact cards is complete;
- Cycle 4 dry-run fixture gate exists and passes;
- AQL confirms candidate answers reduce unsafe approval/cancellation certainty;
- DOMAIN reviews high-risk permanent-residence and cancellation wording selected for promotion.
