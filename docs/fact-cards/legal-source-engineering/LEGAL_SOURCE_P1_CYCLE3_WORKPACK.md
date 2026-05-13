# Legal Source Engineering — P1 Cycle 3 Workpack

**Date**: 2026-05-13
**Parent**: [`LEGAL_SOURCE_STRUCTURE_ENGINEERING.md`](./LEGAL_SOURCE_STRUCTURE_ENGINEERING.md)
**Previous cycle**: [`LEGAL_SOURCE_P1_CYCLE2_WORKPACK.md`](./LEGAL_SOURCE_P1_CYCLE2_WORKPACK.md)
**Scope**: 特定技能 / Specified Skilled Worker
**Goal**: turn the 特定技能 layer from broad summary cards into source-backed atoms for status distinction, period limits, field-specific criteria, contracts, support plans, receiving organizations, notifications, and false-positive burn-down.

## Cycle Goal

P1 Cycle 3 builds the 特定技能 legal-source layer:

```text
When the user asks about 特定技能,
the system must first identify 1号 vs 2号, field, procedure stage, employer/support context,
then route to field-specific criteria, contract/support-plan requirements, period limits,
family-stay boundaries, or receiving-organization change / notification boundaries.
```

Primary failures to eliminate:

- treating 特定技能1号 and 特定技能2号 as the same status;
- saying 特定技能1号 can sponsor ordinary 家族滞在 without checking source-backed scope;
- saying 技能試験 + 日本語 alone is enough, ignoring employment contract, receiving organization, and support-plan requirements;
- treating one field's exam, work scope, or council requirement as valid for every field;
- treating 特定技能 job change as ordinary free転職 or ordinary 14-day notification only;
- confusing 特定技能 with 技能実習, 技能, 技人国, J-Find, 経営管理, or 特定活動 preparation routes;
- using old summary cards that contain `ai_inferred` fields as if they were fully sourced conclusions.

## Official Source Map

| ID | Official Source Title | URL | Authority Layer | Cycle 3 Use | Notes |
|---|---|---|---|---|---|
| P1C3-S1 | 出入国管理及び難民認定法 | https://laws.e-gov.go.jp/law/326CO0000000319 | L1 Law | 特定技能1号/2号 activity scope; family-stay sponsor boundary | Use current e-Gov text for status rows and legal hierarchy. |
| P1C3-S1b | 出入国管理及び難民認定法施行規則 | https://laws.e-gov.go.jp/law/356M50000010054 | L2 Ordinance | application/procedure details where statutory procedure precision is needed | FACT source map addition; use only after targeted extraction. |
| P1C3-S2 | 上陸基準省令 | https://laws.e-gov.go.jp/law/402M50000010016 | L2 Ordinance | landing criteria, skill/Japanese/contract/support-plan framework | Existing cards use this but need finer atomization. |
| P1C3-S2b | 特定技能雇用契約・支援計画基準省令 | https://laws.e-gov.go.jp/law/431M60000010005 | L2 Ordinance | employment contract, support plan, receiving organization criteria | FACT source map addition; target Batch 2/3. |
| P1C3-S2c | 特定産業分野関係省令 | https://laws.e-gov.go.jp/law/431M60000010006 | L2 Ordinance | field source anchors and field availability | FACT source map addition; target Batch 2/5. |
| P1C3-S3 | 特定技能制度 index | https://www.moj.go.jp/isa/applications/ssw/ | L4 ISA Hub | source hub, update tracker, menu of procedures/materials/field info | Current official hub; updates are frequent. |
| P1C3-S4 | 在留資格「特定技能」 | https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html | L4 ISA Status Page | user-facing distinction between 1号/2号, fields, period, examples | Existing production cards depend on this page. Re-check before extraction. |
| P1C3-S5 | 特定技能制度運用要領 | https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri07_00201.html | L4 ISA Operation Page | operation manual entry, support manual, field annexes | Do not ingest entire PDFs blindly; extract source-backed atoms. |
| P1C3-S6 | 特定技能外国人受入れに関する運用要領 PDF | https://www.moj.go.jp/isa/content/930004944.pdf | L4 ISA PDF | receiving organization, contract, support, period, notification details | Large PDF; use targeted extraction and page/section locators. |
| P1C3-S7 | 1号特定技能外国人支援に関する運用要領 PDF | Source linked from P1C3-S5 | L4 ISA PDF | support-plan duties and support implementation | Needs PDF URL confirmation in Batch 2. |
| P1C3-S8 | 特定の分野に係る要領別冊（全体版） | Source linked from P1C3-S5 | L4 ISA PDF | field-specific criteria and no-cross-field guard | Large; likely better as field routers first. |
| P1C3-S9 | 分野別情報 | https://www.moj.go.jp/isa/policies/ssw/sswfield.html | L4 ISA Field Hub | field pages for care, construction, manufacturing, food service, agriculture, etc. | Used in Batch 5 and for false-positive burn-down. |
| P1C3-S10 | 特定技能関係手続 | https://www.moj.go.jp/isa/applications/procedures/ssw.html | L4 ISA Procedure Hub | registration/support/receiving-organization notifications | Useful for employer-side and registered support organization procedures. |
| P1C3-S11 | 特定技能に係る在留諸申請（提出書類） | Linked from P1C3-S3 | L4 ISA Procedure/Page/PDF | certificate/change/renewal material structures | Confirm exact URLs before material cards. |
| P1C3-S12 | 通算在留期間 | Linked from P1C3-S3 | L4 ISA Resource | 1号 total period counting, non-reset risks | Frequent updates; must verify current page at extraction time. |
| P1C3-S13 | 特定技能関係の特定活動 | https://www.moj.go.jp/isa/applications/ssw/10_00025.html | L4 ISA Resource | SSW1 preparation, SSW2 preparation, transition support activities | Existing P1 Cycle1 cards cover part; add integration only if needed. |
| P1C3-S14 | 特定技能関係の申請・届出様式一覧 | Linked from P1C3-S3 | L4 ISA Procedure Page | form/source locator; no approval guarantee | Use only after URL confirmation. |
| P1C3-S15 | 登録支援機関登録・更新申請 / 登録支援機関登録簿 | Linked from P1C3-S3/S10 | L4 ISA Procedure Page | registered support organization scope and boundaries | Batch 2/4. |

## Existing Card Debt

Existing cards are useful but not enough as promotion-grade source atoms:

| Existing Card | Current Problem | Cycle 3 Treatment |
|---|---|---|
| `tokuteiginou-ichigou-youken` | Contains useful summary but also `ai_inferred` fields around Japanese tests, family accompaniment, exam exemptions, and 2号 family. | Do not delete. Add source-backed atoms and future replacement path. |
| `tokutei-ginou-koushin` | Updates and fees are useful, but 1号 total period and 2号 no limit are partly inferred. | Add period-source cards and keep renewal procedure separate. |
| `ssw1-contract-support-plan-router` | Correct router, but not enough detail for contract/support plan. | Expand into contract, receiving organization, support-plan atoms. |
| `ssw-field-specific-criteria-source-router` | Correct field-specific warning, but not enough for high-frequency fields. | Keep as router; Batch 5 adds field hub and field-specific source anchors. |
| `specified-skilled-worker-1-designated-field-skill-scope` / `specified-skilled-worker-2-skilled-scope` | Strong activity skeleton, but do not settle periods, family, exams, or field requirements. | Keep as P0 skeleton; Cycle 3 adds detail cards. |

## Batch Plan

| Batch | Target Count | Purpose |
|---|---:|---|
| Batch 1 | 18 cards | 1号/2号 core distinction, total period, family-stay boundary, activity vs field criteria, status disambiguation |
| Batch 2 | 24 cards | 特定技能雇用契約, receiving organization, equal treatment, full-time/direct/dispatched boundary, support-plan framework |
| Batch 3 | 19 cards | certificate/change/renewal material-table structure, applicant-side tax/social-insurance/pension materials, field-table boundaries, permission-boundary guard |
| Batch 4 | 16-22 cards | receiving-organization change, employer/support organization notifications, acceptance difficulty, periodic reports, registered support organization |
| Batch 5 | 20-30 cards | field-specific source anchors and A/B false-positive burn-down against 技能実習, 技能, 技人国, 家族滞在, J-Find, 経営管理, generic job-change questions |

All cards remain `ai_extracted` until review and promotion.

## Batch 1 Candidate Atoms

| Candidate ID | Proposed fact_id | Claim Type | Core Claim |
|---|---|---|---|
| P1C3-B1-001 | `ssw1-ssw2-status-skill-period-boundary` | integration_boundary | 特定技能1号 and 2号 are separate rows with different skill level concepts. |
| P1C3-B1-002 | `ssw1-total-period-five-year-source` | period_boundary | 特定技能1号 total period must be source-backed and not guessed from renewal pages alone. |
| P1C3-B1-003 | `ssw2-no-total-period-limit-source` | period_boundary | 2号 period treatment must not be inferred from 1号's total-period limit. |
| P1C3-B1-004 | `ssw1-total-period-counts-nonwork-reentry-source` | period_count_boundary | 特定技能1号 total period includes non-working periods and re-entry-permit departure periods. |
| P1C3-B1-005 | `ssw1-total-period-exception-periods-source` | period_exception_boundary | Certain unavoidable periods are not included in 1号 total period and require careful evidence review. |
| P1C3-B1-006 | `ssw1-prep-activity-counts-to-five-year-source` | period_count_boundary | 特定技能1号 preparation 特定活動 counts toward the 1号 total period. |
| P1C3-B1-007 | `ssw-field-work-scope-annex-required-source` | field_boundary | Work scope must be checked in field-specific annexes. |
| P1C3-B1-008 | `ssw-material-table-field-structure-source` | material_structure_boundary | SSW materials are split by applicant, accepting organization, and field. |
| P1C3-B1-009 | `ssw1-family-stay-not-sponsor-source` | family_boundary | 家族滞在 sponsor row includes 2号 but not 1号. |
| P1C3-B1-010 | `ssw2-family-stay-sponsor-dependent-scope-source` | family_boundary | 2号 family questions route through 家族滞在 sponsor/family-member scope and application review. |
| P1C3-B1-011 | `ssw-skill-japanese-not-only-requirements-source` | criteria_boundary | Skill/Japanese tests alone do not settle contract, organization, and field requirements. |
| P1C3-B1-012 | `ssw-change-application-activity-change-prompt-source` | procedure_boundary | Switching from another status to SSW activity requires change-application handling. |
| P1C3-B1-013 | `ssw-organization-change-requires-status-change-source` | job_change_boundary | Changing the accepting organization under SSW requires status-change permission handling. |
| P1C3-B1-014 | `ssw-vs-technical-intern-training-status-boundary-source` | integration_boundary | 技能実習 and 特定技能 are separate systems even when transition routes exist. |
| P1C3-B1-015 | `ssw-vs-skilled-labor-status-boundary-source` | integration_boundary | 技能 and 特定技能 are separate statuses despite similar naming. |
| P1C3-B1-016 | `ssw-vs-gijinkoku-work-scope-boundary-source` | integration_boundary | Office/white-collar roles should not be pushed into 特定技能 without field/work-scope source. |
| P1C3-B1-017 | `ssw-vs-qoa-part-time-boundary-source` | integration_boundary | 特定技能 is not qualification-outside-activity part-time permission. |
| P1C3-B1-018 | `ssw2-field-availability-not-all-ssw1-fields-source` | field_boundary | 2号 target fields and work categories must be checked separately from 1号. |

Batch 1 can add extra atoms if FACT identifies direct current source text for total period, family treatment, or field count.

## Batch 1 Test Gate

Positive fixtures should include:

- 特定技能1号と2号の違い
- 特定技能1号は何年まで
- 特定技能2号は1号の5年に含まれるか
- 特定技能1号で家族滞在を呼べるか
- 特定技能2号で配偶者・子を呼べるか
- 外食試験で建設に行けるか
- 技能実習から特定技能は同じ制度か
- 技能ビザと特定技能は同じか
- 特定技能で事務職・通訳職をできるか
- 特定技能でアルバイトできるか

Negative fixtures should protect:

- ordinary 家族滞在 questions without 特定技能 context;
- 技人国 office-work questions;
- 技能実習-only questions;
- 技能 status questions;
- generic renewal fee questions;
- generic job-change 14-day notification questions;
- J-Find / HSP / 経営管理 questions;
- field-only pages such as construction or care when the question does not mention 特定技能.

## Promotion Gate

No Cycle 3 card can move beyond `ai_extracted` until:

- official source URL and section locator are stable;
- source text is checked against current ISA/e-Gov pages;
- a dedicated Cycle 3 dry-run fixture gate exists and passes;
- production prediction keeps all Cycle 3 cards out unless explicitly promoted;
- DOMAIN reviews family accompaniment, total period, field-specific requirements, contract/support-plan conditions, and job-change handling.
