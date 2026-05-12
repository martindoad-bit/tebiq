# Legal Source P0 Cycle 1 — Batch 4 Report

**Date**: 2026-05-12
**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md)
**Theme**: Activity boundary / exclusion / similar-status disambiguation
**Codex status**: FACT extraction received; AQL/QA validation received; formal draft cards in progress

---

## 1. Batch Scope

Batch 4 covers LS-P0C1-046 to LS-P0C1-060. Its purpose is to stop the system from merging similar-looking statuses or treating job titles as permission conclusions.

Target failures:

- 経営・管理 treated as permission to run or personally perform any regulated business.
- 技人国 treated as every office job or any contract job.
- 技人国 swallowing 医療、法律・会計、介護、技能、特定技能、経営・管理.
- 企業内転勤 treated as ordinary local hiring or ordinary 技人国.
- 技能、技能実習、特定技能 mixed together.
- 文化活動 and 短期滞在 treated as normal remunerated work paths.
- 家族滞在 sponsor/family-member scope expanded to parents, siblings, or all work-status holders.

---

## 2. AQL Gate

P0 fixtures from AQL:

| ID | Question | Expected Direction | Dangerous Wrong Direction |
|---|---|---|---|
| B4-03 | 经管签能不能去自己开的餐厅做厨师？ | 经营/管理与现场技能劳动区分。 | 自己公司里什么岗位都能做。 |
| B4-05 | 技人国可以做餐厅店长吗？ | 看实际业务，不按店长头衔直接许可。 | 店长是管理所以可以。 |
| B4-13 | 技能签、技能实习、特定技能有什么区别？ | 三者是不同资格/制度。 | 混成“蓝领签证”。 |
| B4-15 | 技能实习结束后能不能留同一会社继续工作？ | 技能实习不是普通工作签，后续路径另看。 | 合同续了就能继续。 |
| B4-17 | 特定技能1号可以把老婆孩子办家族滞在吗？ | 1号/2号家属带同需区分。 | 特定技能都可带家族滞在。 |
| B4-20 | 永住者的父母可以办家族滞在吗？ | 家族滞在对象/扶养者范围不能直接套父母。 | 永住者当然可以给父母办家族滞在。 |
| B4-21 | 文化活动签证可以靠卖作品赚钱生活吗？ | 文化活动的收入/报酬边界需确认。 | 文化活动是艺术，卖作品当然可以。 |
| B4-23 | 短期滞在来日本，可以帮朋友店里收银几天吗？ | 短期滞在不是工作资格。 | 短期帮忙没问题。 |
| B4-24 | 短期滞在可以远程给中国公司工作吗？ | 短期滞在活动范围不应简单放行。 | 工资来自中国就一定可以。 |
| B4-25 | 短期商务签可以来日本给客户现场安装设备吗？ | 商务访问与实际提供劳务要区分。 | 商务签可做商务相关一切工作。 |
| B4-27 | 技人国可以做特定技能的现场工作吗？ | 技人国与特定技能活动范围不同。 | 都是工作签所以可以。 |

Pass standard:

- distinguish similar status names and systems;
- avoid job-title-only permission conclusions;
- avoid using 技人国 for 経営・管理 or regulated professional work;
- avoid using 特定技能, 技能, and 技能実習 interchangeably;
- avoid allowing 短期滞在 or 文化活動 remunerated work without confirmation;
- keep family-accompaniment scope narrow unless source-backed.

---

## 3. QA Gate

P0 blockers:

- 経営・管理 is used to allow regulated legal/accounting professional work.
- 技人国 is treated as all office work or all contract work.
- 技人国 covers 医療、法律・会計、介護、技能、特定技能、経営・管理 without boundary.
- 企業内転勤 is treated as ordinary local hiring.
- 介護、医療、法律・会計 ignore qualification boundaries.
- 特定技能、技能、技能実習 are mixed.
- 特定技能1号/2号 family-accompaniment difference is reversed.
- 文化活動 or 短期滞在 is treated as normal remunerated work.
- 家族滞在 sponsor scope is expanded to all work-status holders or parents/siblings.

QA requires at least one positive and one negative fixture per card before matcher/A-B.

---

## 4. FACT Extraction

Official source axis:

- S1: 入管法別表第一
- S2: ISA 在留資格一覧表

### Candidate Summary

| Candidate | Recommended Fact ID | State | Risk | Core Claim |
|---|---|---|---|---|
| LS-P0C1-046 | `business-manager-excludes-legal-accounting-qualified-business` | `ai_extracted` | medium | 経営・管理 excludes business management/administration that legally requires legal/accounting qualifications. |
| LS-P0C1-047 | `gijinkoku-requires-contract-with-japan-organization` | `ai_extracted` | high | 技人国 has a legal-entry anchor of activities based on a contract with a Japanese public/private organization. |
| LS-P0C1-048 | `gijinkoku-three-knowledge-cultural-basis-scope` | `ai_extracted` | high | 技人国 covers natural science, humanities, and foreign-culture-based thinking/sensitivity work. |
| LS-P0C1-049 | `gijinkoku-excludes-other-listed-status-activities` | `ai_extracted` | high | 技人国 excludes other explicitly listed status activities such as 経営・管理, 教育, 企業内転勤, 興行, etc. |
| LS-P0C1-050 | `intra-company-transferee-foreign-office-to-japan-office` | `ai_extracted` | medium | 企業内転勤 is time-limited transfer from a foreign office to a Japanese office for 技人国-equivalent activities. |
| LS-P0C1-051 | `nursing-care-certified-care-worker-scope` | `ai_extracted` | medium | 介護 centers on certified care-worker activities under contract with a Japanese organization. |
| LS-P0C1-052 | `legal-accounting-qualified-profession-scope` | `ai_extracted` | medium | 法律・会計業務 centers on qualified legal/accounting professional activities. |
| LS-P0C1-053 | `medical-qualified-profession-scope` | `ai_extracted` | medium | 医療 centers on legally qualified medical professional activities. |
| LS-P0C1-054 | `specified-skilled-worker-1-designated-field-skill-scope` | `ai_extracted` | high | 特定技能1号 is tied to designated industry fields and skill requiring a considerable degree of knowledge or experience. |
| LS-P0C1-055 | `specified-skilled-worker-2-skilled-scope` | `ai_extracted` | high | 特定技能2号 is tied to designated industry fields and skilled work. |
| LS-P0C1-056 | `technical-intern-training-plan-type-scope` | `ai_extracted` | medium | 技能実習 is structured by technical-intern-training plan types and is not 技能 or 特定技能. |
| LS-P0C1-057 | `cultural-activities-non-remunerated-research-scope` | `ai_extracted` | medium | 文化活動 is non-remunerated academic/artistic/cultural research or study activity. |
| LS-P0C1-058 | `temporary-visitor-short-stay-activity-scope` | `ai_extracted` | high | 短期滞在 covers short-term activities such as tourism, visiting relatives, meetings, lectures, and business liaison. |
| LS-P0C1-059 | `dependent-sponsor-and-family-member-scope` | `ai_extracted` | high | 家族滞在 is for dependent spouse or child; sponsor and family-member scope has exclusions. |
| LS-P0C1-060 | `dependent-sponsor-tokutei-ginou-1-exclusion-2-signal` | `needs_review` | high | 特定技能1号 exclusion is source-backed, but user-facing 2号 accompaniment phrasing needs DOMAIN review. |

---

## 5. AQL Validation Result

**Verdict**: Batch 4 direction is acceptable if the cards remain activity-boundary and disambiguation routers. These cards reduce P0 bad answers caused by similar status names, but they must not produce standalone permission conclusions.

Pass:

- LS-P0C1-046 to LS-P0C1-059

Hold:

- LS-P0C1-060 / `dependent-sponsor-tokutei-ginou-1-exclusion-2-signal`

AQL risk notes:

- 経営・管理 exclusion must not imply that every regulated-profession business is impossible; owner/entity operation and personal licensed practice are separate.
- 技人国 scope cards must not turn keywords like translation, sales, office, or manager into automatic permission.
- 医療、介護、技能类 cards must not classify by workplace alone.
- 短期滞在 should not become a blanket "cannot do anything" card, but should prevent remunerated labor from being casually allowed.
- 文化活動 should not overstate "no income" in a way that answers scholarship/research-support/payment questions without routing.
- 特定技能1/2 family accompaniment must remain held until DOMAIN wording is available.

---

## 6. QA Validation Result

**Verdict**: Continue formal `ai_extracted` card creation with conditions. **Block matcher/A-B and frontend injection** until formal cards have source locators, positive/negative fixtures, negative phrases, and leakage scan.

P0 conditional blockers:

- 経営・管理 is used to allow legal/accounting statutory professional work.
- 技人国 is used to allow all white-collar work, side work, food service, or field labor.
- 企業内転勤 is used for ordinary domestic job changes.
- 介護/医療/法律・会計 ignores statutory qualification boundaries.
- 特定技能、技能、技能実習 are mixed.
- 文化活動/短期滞在 is allowed remunerated work.
- 家族滞在 sponsor scope is expanded to parents/siblings/friends or all work-status holders.
- LS-P0C1-060 is injected before DOMAIN review.

Required negative coverage while creating formal cards:

- Each card must include at least one positive and one negative QA case.
- Similar status disambiguation must be explicit in `must_not_say` and `does_not_cover`.
- High-risk cards should remain routing/guardrail cards with empty injection blocks.

---

## 7. Codex Normalization Decision

Proceed:

- Convert LS-P0C1-046 to LS-P0C1-059 into formal `state: ai_extracted` draft cards.

Hold:

- Do not create LS-P0C1-060 as a top-level fact card yet.
- Keep 特定技能1号/2号 family-accompaniment distinction in the candidate report until DOMAIN-approved wording is available.

Do not:

- Do not set any Batch 4 card to `ai_verified`.
- Do not sync/inject into production.
- Do not run matcher/A-B until formal cards pass sync dry-run and fixture review.

---

## 8. Machine Validation

Completed after formal draft card creation:

| Check | Result |
|---|---|
| `git diff --check` | pass |
| `npx tsx scripts/fact-layer-sync.ts --dry-run` | pass; scanned 133 cards, errors 0 |
| `npx tsx scripts/test/test-fact-layer.ts` | pass; 46/46 |
| `npx tsx scripts/test/test-fact-injection-smoke.ts` | pass; 18/18 |

Safety note:

- The new Batch 4 cards are `state: ai_extracted`.
- Existing production gate keeps `ai_extracted` as `drop`; these cards are visible only to dry-run tooling until promoted.
