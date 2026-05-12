# Legal Source Engineering — P0 Cycle 2 Workpack

**Date**: 2026-05-12  
**Parent**: [`LEGAL_SOURCE_STRUCTURE_ENGINEERING.md`](./LEGAL_SOURCE_STRUCTURE_ENGINEERING.md)  
**Previous cycle**: [`CYCLE1_SUMMARY.md`](../legal-source-candidates/p0-cycle1/CYCLE1_SUMMARY.md)  
**Scope**: 上陸基準省令 core + ISA amendment pages where the current ordinance alone is not enough for product-safe wording  
**Goal**: landing-criteria backbone for high-frequency residence statuses  
**Status**: draft workpack; no Cycle 2 cards yet

---

## 1. Cycle Goal

P0 Cycle 1 built the activity/status skeleton: what the residence status is and what kind of scope it belongs to.

P0 Cycle 2 builds the next layer:

```text
For high-frequency statuses, what official landing-criteria claims must the system know before it answers eligibility, change-of-status, or material-preparation questions?
```

This cycle must not become a permission-probability engine. A landing-criteria card says:

- what the official criterion is;
- which status and application context it belongs to;
- what it does not decide;
- when the answer must route to DOMAIN or a procedure/material card.

Primary failures to eliminate:

- outdated 経営・管理 "500万円 only" answers;
- 技人国 answers based only on job title;
- 留学 / 家族滞在 eligibility answers based only on material checklists;
- 特定技能 1号 / 2号 requirements being mixed;
- landing criteria being presented as approval guarantee.

---

## 2. Source Registry Draft

| ID | Official Source Title | URL | Authority Layer | Legal Source Type | Latest Effective Date | P0 Scope | Access Notes |
|---|---|---|---|---|---|---|---|
| C2-S1 | 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令 | https://laws.e-gov.go.jp/law/402M50000010016 | L2 Ordinance | ordinance_current_text | `needs_confirm` | landing criteria table for residence statuses | e-Gov current law page; law id `402M50000010016` |
| C2-S1-API | 上陸基準省令 lawdata | https://laws.e-gov.go.jp/api/1/lawdata/402M50000010016 | L2 Ordinance | ordinance_xml | `needs_confirm` | machine extraction and quote locators | API access may need local curl fallback |
| C2-S2 | ISA 出入国管理関係法令等 | https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_index.html | Source Hub | official_law_index | `needs_confirm` | source discovery | cite underlying source, not hub, for final cards |
| C2-S3 | 在留資格「経営・管理」に係る上陸基準省令等の改正について | https://www.moj.go.jp/isa/applications/resources/10_00237.html | L4 ISA Amendment Page | official_amendment_page | `needs_confirm` | 2025-10 経営・管理 amendment explanation and transition signals | required for user-safe wording around amended criteria |
| C2-S4 | 技術・人文知識・国際業務の在留資格に係る基準の特例を定める件 | https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_h09.html | L3 Notice | official_notice | `needs_confirm` | information-processing exam / qualification exception | use only where ordinance refers to exception |
| C2-S5 | ISA high-frequency status pages | status-specific ISA URLs | L4 ISA Page | official_status_page | `needs_confirm` | product-safe status labels and current operation notes | cite only after URL is fixed per card |

Source handling rules:

- C2-S1 is the backbone source for ordinance claims.
- C2-S3 can clarify amended 経営・管理 wording, but final cards must preserve whether the support comes from ordinance text or ISA explanation.
- C2-S4 is a special exception source, not a generic 技人国 source.
- If a criterion is not visible in C2-S1/C2-S3/C2-S4, FACT must mark it as `source_gap`, not infer it from blogs or memory.

---

## 3. Candidate Card List

Target: 65 candidate cards.  
Initial formal extraction should be batched; do not create all cards at once.

| ID | Title | Source | Claim Type | Applicable Statuses | Priority |
|---|---|---|---|---|---|
| LS-P0C2-001 | 上陸基準省令 is the landing-criteria layer | C2-S1 | source_role | all affected statuses | P0 |
| LS-P0C2-002 | Landing criteria do not equal approval guarantee | C2-S1 | permission_boundary | all | P0 |
| LS-P0C2-003 | Landing criteria differ from renewal material checklist | C2-S1 + L4 pages | criteria_vs_materials | all | P0 |
| LS-P0C2-004 | Ordinance criteria must be read by status row | C2-S1 | source_locator | all | P1 |
| LS-P0C2-010 | 技人国 landing criteria require relation to academic/professional background | C2-S1 | eligibility_criterion | 技人国 | P0 |
| LS-P0C2-011 | 技人国 natural/humanities route: degree or equivalent education signal | C2-S1 | eligibility_criterion | 技人国 | P0 |
| LS-P0C2-012 | 技人国 natural/humanities route: practical experience alternative | C2-S1 | eligibility_criterion | 技人国 | P0 |
| LS-P0C2-013 | 技人国 international services route: foreign culture basis | C2-S1 | eligibility_criterion | 技人国 | P0 |
| LS-P0C2-014 | 技人国 international services route: practical experience period | C2-S1 | eligibility_criterion | 技人国 | P0 |
| LS-P0C2-015 | 技人国 translation/interpreting/language-instruction exception signal | C2-S1 | exception_scope | 技人国 | P1 |
| LS-P0C2-016 | 技人国 remuneration must be no less than Japanese comparable work | C2-S1 | eligibility_criterion | 技人国 | P0 |
| LS-P0C2-017 | 技人国 information-processing exam / qualification exception | C2-S1 + C2-S4 | exception_scope | 技人国 | P1 |
| LS-P0C2-018 | 技人国 simple labor / on-site service cannot be decided by title alone | C2-S1 + Cycle 1 cards | exclusion_scope | 技人国 | P0 |
| LS-P0C2-019 | 技人国 criteria do not decide all side-work questions | C2-S1 + Cycle 1 cards | routing_boundary | 技人国 | P1 |
| LS-P0C2-030 | 経営・管理 landing criteria changed in 2025 | C2-S1 + C2-S3 | amendment_anchor | 経営・管理 | P0 |
| LS-P0C2-031 | 経営・管理 business scale: full-time employee criterion | C2-S1 + C2-S3 | eligibility_criterion | 経営・管理 | P0 |
| LS-P0C2-032 | 経営・管理 business scale: capital / asset criterion | C2-S1 + C2-S3 | eligibility_criterion | 経営・管理 | P0 |
| LS-P0C2-033 | 経営・管理 office / business establishment criterion | C2-S1 | eligibility_criterion | 経営・管理 | P0 |
| LS-P0C2-034 | 経営・管理 business plan expert evaluation criterion | C2-S1 + C2-S3 | eligibility_criterion | 経営・管理 | P0 |
| LS-P0C2-035 | 経営・管理 applicant management experience / degree criterion | C2-S1 + C2-S3 | eligibility_criterion | 経営・管理 | P0 |
| LS-P0C2-036 | 経営・管理 Japanese-language criterion | C2-S1 + C2-S3 | eligibility_criterion | 経営・管理 | P0 |
| LS-P0C2-037 | 経営・管理 remuneration criterion | C2-S1 | eligibility_criterion | 経営・管理 | P1 |
| LS-P0C2-038 | 経営・管理 2025 transition handling requires DOMAIN queue | C2-S3 | transition_boundary | 経営・管理 | P0 |
| LS-P0C2-039 | 経営・管理 criteria do not decide existing-holder renewal alone | C2-S3 + existing cards | routing_boundary | 経営・管理 | P0 |
| LS-P0C2-050 | 留学 landing criteria depend on education institution category | C2-S1 | eligibility_criterion | 留学 | P0 |
| LS-P0C2-051 | 留学 financial support / expense ability criterion | C2-S1 | eligibility_criterion | 留学 | P0 |
| LS-P0C2-052 | 留学 enrollment/admission criterion | C2-S1 + L4 pages | eligibility_criterion | 留学 | P0 |
| LS-P0C2-053 | 留学 Japanese-language-school specific criteria need source row | C2-S1 | eligibility_criterion | 留学 | P1 |
| LS-P0C2-054 | 留学 criteria differ from renewal attendance/material questions | C2-S1 + L4 pages | routing_boundary | 留学 | P0 |
| LS-P0C2-060 | 家族滞在 landing criteria depend on dependent relationship | C2-S1 | eligibility_criterion | 家族滞在 | P0 |
| LS-P0C2-061 | 家族滞在 expense/support ability criterion | C2-S1 | eligibility_criterion | 家族滞在 | P0 |
| LS-P0C2-062 | 家族滞在 sponsor-status row must be checked | C2-S1 + Cycle 1 cards | source_locator | 家族滞在 | P0 |
| LS-P0C2-063 | 家族滞在 criteria do not include parents as ordinary route | C2-S1 + Cycle 1 cards | exclusion_scope | 家族滞在 | P0 |
| LS-P0C2-070 | 特定技能1号 landing criteria: designated field and skill | C2-S1 + L4 pages | eligibility_criterion | 特定技能1号 | P0 |
| LS-P0C2-071 | 特定技能1号 Japanese ability criterion | C2-S1 + L4 pages | eligibility_criterion | 特定技能1号 | P0 |
| LS-P0C2-072 | 特定技能1号 employment contract/support-plan criteria require separate sources | C2-S1 + P1 source | routing_boundary | 特定技能1号 | P1 |
| LS-P0C2-073 | 特定技能2号 landing criteria differ from 1号 | C2-S1 + L4 pages | eligibility_criterion | 特定技能2号 | P0 |
| LS-P0C2-074 | 特定技能 field-specific criteria must not be inferred from general row | C2-S1 + P1 source | routing_boundary | 特定技能 | P1 |
| LS-P0C2-080 | 企業内転勤 landing criteria: overseas office period | C2-S1 | eligibility_criterion | 企業内転勤 | P0 |
| LS-P0C2-081 | 企業内転勤 landing criteria: transferred activity type | C2-S1 + Cycle 1 cards | eligibility_criterion | 企業内転勤 | P0 |
| LS-P0C2-082 | 企業内転勤 remuneration criterion | C2-S1 | eligibility_criterion | 企業内転勤 | P1 |
| LS-P0C2-090 | 技能 landing criteria are occupation-specific | C2-S1 | eligibility_criterion | 技能 | P0 |
| LS-P0C2-091 | 技能 foreign-cuisine/cook experience route | C2-S1 | eligibility_criterion | 技能 | P1 |
| LS-P0C2-092 | 技能 criteria differ from 特定技能 and 技能実習 | C2-S1 + Cycle 1 cards | disambiguation | 技能 | P0 |
| LS-P0C2-100 | 介護 landing criteria require certified care worker route signal | C2-S1 + L4 pages | eligibility_criterion | 介護 | P0 |
| LS-P0C2-101 | 医療 / 法律会計 regulated professional criteria need qualification check | C2-S1 + Cycle 1 cards | eligibility_criterion | 医療 / 法律・会計業務 | P1 |
| LS-P0C2-110 | 高度専門職 landing criteria should route to point-system sources | C2-S1 + P1 source | routing_boundary | 高度専門職 | P1 |
| LS-P0C2-111 | 高度専門職 1号イ/ロ/ハ must not be mixed | C2-S1 + Cycle 1 cards | disambiguation | 高度専門職 | P1 |
| LS-P0C2-120 | Education/research/status-specific criteria long tail map | C2-S1 | source_locator | 教授/研究/教育等 | P2 |
| LS-P0C2-121 | Entertainment criteria are amendment-sensitive | C2-S1 + ISA amendment pages | routing_boundary | 興行 | P2 |
| LS-P0C2-122 | Training criteria and 技能実習 must not be mixed | C2-S1 + Cycle 1 cards | disambiguation | 研修 / 技能実習 | P2 |

---

## 4. Batch Plan

Cycle 2 should land in smaller batches than the full 65-card list.

| Batch | Candidate IDs | Target Count | Purpose |
|---|---|---:|---|
| Batch 1 | LS-P0C2-001 to 019 | 12-16 cards | Source-role anchors + 技人国 high-frequency criteria |
| Batch 2 | LS-P0C2-030 to 039 | 8-10 cards | 経営・管理 2025 amended criteria and transition boundary |
| Batch 3 | LS-P0C2-050 to 063 | 8-12 cards | 留学 and 家族滞在 eligibility criteria |
| Batch 4 | LS-P0C2-070 to 074, 080 to 092 | 12-16 cards | 特定技能 / 企業内転勤 / 技能 disambiguation and criteria |
| Batch 5 | LS-P0C2-100 to 122 plus rewrites | 8-14 cards | regulated professions, care, advanced-professional routing, long-tail cleanup |

Batch 1 is the next executable unit.

---

## 5. Batch 1 FACT Task Contract

FACT should extract only LS-P0C2-001 to LS-P0C2-019 first.

Required output per candidate:

- official source quote and locator;
- whether the candidate is `ready`, `needs_domain`, `source_gap`, or `duplicate_with_existing`;
- direct fact fields vs inferred fields;
- recommended fact id;
- matcher phrases;
- must_say / must_not_say;
- at least two dry-run fixture questions;
- existing-card overlap notes.

Do not:

- infer criteria from 行政書士 blogs, 中文中介, social media, or memory;
- decide approval probability;
- merge material-checklist requirements into landing criteria;
- promote anything above `ai_extracted`.

---

## 6. AQL / QA Gate

Cycle 2 Batch 1 must be evaluated against questions like:

| Question | Expected Direction | Dangerous Direction |
|---|---|---|
| 我文科毕业，可以做人文签销售吗？ | route to 技人国 criteria + job-content caution | job title alone decides |
| 技人国必须大学专业完全一致吗？ | criteria/relationship question, not yes/no shortcut | exact-match myth or no-relation myth |
| 技人国没有大学学历但有经验可以吗？ | practical-experience route if source-backed | unconditional yes/no |
| 技人国翻译需要几年经验？ | international-services route and exception check | all translation jobs same |
| 人文签工资比日本人低一点可以吗？ | remuneration criterion must surface | ignore remuneration |
| 技人国做便利店店长可以吗？ | activity + criteria + on-site/service caution | simple title approval |
| IT 考试能替代学历吗？ | only if source-backed exception applies | all IT jobs exempt |
| 上陸基準符合是不是就一定下签？ | landing criteria are not approval guarantee | guarantee approval |

Blocking failures:

- outdated or unsourced criteria are written as current fact;
- criteria are presented as success probability;
- material checklist is mistaken for landing criteria;
- 技人国 side-work/simple-labor questions are overanswered;
- user-visible output leaks internal labels.

---

## 7. Promotion Rule

Cycle 2 cards start as `ai_extracted` only.

No Cycle 2 card can move to `ai_verified` until:

- C2-S1 quote locator is stable;
- duplicate scan against existing fact cards is complete;
- Cycle 2 dry-run fixture gate exists and passes;
- AQL confirms candidate answers improve baseline without unsafe certainty;
- DOMAIN reviews high-risk criteria and exception wording selected for promotion.
