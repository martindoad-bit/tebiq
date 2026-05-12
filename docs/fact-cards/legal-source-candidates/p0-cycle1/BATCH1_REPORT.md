# Legal Source P0 Cycle 1 — Batch 1 Report

**Date**: 2026-05-12  
**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE1_WORKPACK.md)
**FACT operator**: Russell / Current Fact Layer Operator  
**Codex status**: normalized candidate report; no production fact cards yet  

---

## 1. Scope

Batch 1 covers only:

- LS-P0C1-001 to LS-P0C1-008
- 入管法別表第一・第二 skeleton
- ISA 在留資格一覧表 category scaffolding
- no 上陸基準省令 details
- no permission probability judgement

Sources used by FACT:

- S1: <https://laws.e-gov.go.jp/law/326CO0000000319>
- S2: <https://www.moj.go.jp/isa/applications/status/qaq5.html>

S3/S5 were not used as body evidence in this batch.

---

## 2. Normalized Candidate Summary

| Candidate | Proposed Fact ID | Title | Claim Type | Risk | State Mapping | Codex Normalization |
|---|---|---|---|---|---|---|
| LS-P0C1-001 | `legal-status-table1-activity-skeleton` | 別表第一是活动资格骨架 | `qualification_distinction` | medium | `ai_extracted` | parent skeleton for all 別表第一 activity-scope cards |
| LS-P0C1-002 | `legal-status-table2-status-skeleton` | 別表第二是身份/地位资格骨架 | `qualification_distinction` | medium | `ai_extracted` | parent skeleton for 永住者/日配/永配/定住者 |
| LS-P0C1-003 | `legal-status-activity-vs-status-work-restriction` | 活动资格与身份资格的工作限制差异 | `status_vs_activity` | high | `needs_review` | routing/guardrail card; should not be a standalone final-answer source before review |
| LS-P0C1-004 | `legal-status-table1-section1-work-activity` | 別表第一一の表：就劳资格 | `category_scope` | low | `ai_extracted` | category card; connects to 外交/公用/教授/芸術/宗教/報道 |
| LS-P0C1-005 | `legal-status-table1-section2-work-landing-criteria` | 別表第一二の表：就劳资格且有上陆基准 | `category_scope` | medium | `ai_extracted` | category/routing card; Cycle 2 owns actual landing criteria |
| LS-P0C1-006 | `legal-status-table1-sections3-4-nonwork-activity` | 別表第一三・四の表：非就劳资格 | `category_scope` | medium | `ai_extracted` | category/routing card; must connect to 資格外活動 cards |
| LS-P0C1-007 | `legal-status-designated-activities-individual-designation` | 特定活動是个别指定活动 | `special_designation_scope` | medium | `ai_extracted` | guardrail against generic 特定活動 answers |
| LS-P0C1-008 | `legal-status-period-field-is-not-permission-probability` | 在留期间字段只定位期间，不判断许可 | `duration_locator` | high | `needs_review` | duration/probability guardrail; requires cautious wording |

---

## 3. Candidate Details

### LS-P0C1-001 — 別表第一是活动资格骨架

- `proposed_fact_id`: `legal-status-table1-activity-skeleton`
- `authority_layer`: L1 Law
- `legal_source_type`: `statute_current_text`
- `applicable_statuses`: 別表第一全体
- `application_type`: all
- `source_quotes`:
  - S1 入管法 第二条の二 第2項: "別表第一の上欄"
  - S1 入管法 第二条の二 第2項: "下欄に掲げる活動"
  - S2 ISA 在留資格一覧表: "活動資格"
- `atomic_claim`: 入管法別表第一に掲げられる在留資格は、各資格ごとに本邦で行うことができる活動を定める活動資格の骨架である。
- `exclusion_scope`: no landing criteria, no permission probability, no free-work conclusion.
- `matcher_phrases`: 活动资格, 就劳资格, 能做什么, 签证活动范围, 工作签范围, 活動資格, 別表第一.
- `must_say`: 別表第一的核心是活动范围；回答前确认当前资格属于活动资格还是身份资格。
- `must_not_say`: 不要说別表第一资格没有活动限制；不要把材料清单或在留期间当活动范围。

### LS-P0C1-002 — 別表第二是身份/地位资格骨架

- `proposed_fact_id`: `legal-status-table2-status-skeleton`
- `authority_layer`: L1 Law
- `legal_source_type`: `statute_current_text`
- `applicable_statuses`: 永住者, 日本人の配偶者等, 永住者の配偶者等, 定住者
- `application_type`: current-status
- `source_quotes`:
  - S1 入管法 第二条の二 第2項: "別表第二の上欄"
  - S1 入管法 第二条の二 第2項: "身分若しくは地位"
  - S2 ISA 在留資格一覧表: "居住資格"
- `atomic_claim`: 入管法別表第二に掲げられる在留資格は、身份或地位为基础，而不是按別表第一那样列举具体活动范围。
- `exclusion_scope`: no identity authenticity judgement, no permission probability, no divorce/separation risk judgement.
- `matcher_phrases`: 身份签, 居住资格, 永住能工作吗, 日配能打工吗, 定住者工作, 別表第二.
- `must_say`: 別表第二资格的核心是身份或地位；不能机械套用家族滞在/留学等活动资格限制。
- `must_not_say`: 不要说身份系资格需要资格外活动许可才能工作；不要忽略身份基础变化风险。
- `needs_domain_flags`: identity-basis changes need separate review/card.

### LS-P0C1-003 — 活动资格与身份资格的工作限制差异

- `proposed_fact_id`: `legal-status-activity-vs-status-work-restriction`
- `authority_layer`: L1 Law
- `legal_source_type`: `statute_current_text`
- `applicable_statuses`: 別表第一全体, 別表第二全体
- `application_type`: permission-question
- `source_quotes`:
  - S1 入管法 第十九条: "活動の範囲"
  - S1 入管法 第十九条 第1項: "許可を受けて行う場合を除き"
  - S1 入管法 第二条の二 第2項: "身分若しくは地位"
- `atomic_claim`: 別表第一资格以活动范围为核心，并存在资格外活动许可框架；別表第二资格以身份或地位为核心，不能把別表第一的活动限制直接套到別表第二。
- `recommended_state_mapping`: `needs_review`
- `risk_level`: high
- `exclusion_scope`: no unlimited-action conclusion for status qualifications, no tax/labor/cancellation judgement, no substitute for specific qualification-outside-activity or change-status analysis.
- `matcher_phrases`: 能打工吗, 能换工作吗, 资格外活动, 活动资格, 身份资格, 永住工作, 家族滞在工作.
- `must_say`: first distinguish 別表第一/別表第二; activity-status questions go to activity scope and qualification-outside-activity; status-basis questions split work restriction and identity risk.
- `must_not_say`: never tell 永住者/日配/定住者 to obtain qualification-outside-activity permission; never say 技人国/经管/留学/家族滞在 can work freely.
- `needs_domain_flags`: user-facing wording around "通常无就劳活动限制"; identity-basis change/cancellation risk.

### LS-P0C1-004 — 別表第一一の表：就劳资格

- `proposed_fact_id`: `legal-status-table1-section1-work-activity`
- `authority_layer`: L4 ISA Page
- `legal_source_type`: `official_status_list_html`
- `applicable_statuses`: 外交, 公用, 教授, 芸術, 宗教, 報道
- `application_type`: all
- `source_quotes`:
  - S2 ISA 在留資格一覧表: "一の表"
  - S2 ISA 在留資格一覧表: "就労資格"
- `atomic_claim`: ISA 在留資格一覧表将別表第一一の表作为就劳资格类别展示，包含外交、公用、教授、芸術、宗教、報道。
- `exclusion_scope`: no landing criteria/materials, no role-specific qualification judgement, no coverage of common table-two work statuses such as 技人国/経営・管理.
- `matcher_phrases`: 就劳资格, 教授签, 艺术签, 宗教签, 报道签, 外交公用, 一の表.

### LS-P0C1-005 — 別表第一二の表：就劳资格且有上陆基准

- `proposed_fact_id`: `legal-status-table1-section2-work-landing-criteria`
- `authority_layer`: L1 Law + L4 ISA Page
- `legal_source_type`: `statute_current_text_with_official_status_list`
- `applicable_statuses`: 高度専門職, 経営・管理, 法律・会計業務, 医療, 研究, 教育, 技術・人文知識・国際業務, 企業内転勤, 介護, 興行, 技能, 特定技能, 技能実習
- `application_type`: all
- `source_quotes`:
  - S2 ISA 在留資格一覧表: "二の表"
  - S2 ISA 在留資格一覧表: "上陸許可基準"
  - S1 入管法 第七条 第1項第2号: "法務省令で定める基準"
- `atomic_claim`: 別表第一二の表包含多种就劳活动资格；这些资格除活动范围外，还连接上陆许可基准层，但本卡不展开具体基准。
- `exclusion_scope`: no concrete landing criteria, no 技人国 education/experience, no 経営・管理 capital, no 特定技能 field criteria, no claim that current-status renewal always uses the same landing criteria.
- `needs_domain_flags`: concrete landing criteria belong to Cycle 2.

### LS-P0C1-006 — 別表第一三・四の表：非就劳资格

- `proposed_fact_id`: `legal-status-table1-sections3-4-nonwork-activity`
- `authority_layer`: L1 Law + L4 ISA Page
- `legal_source_type`: `statute_current_text_with_official_status_list`
- `applicable_statuses`: 文化活動, 短期滞在, 留学, 研修, 家族滞在
- `application_type`: all
- `source_quotes`:
  - S2 ISA 在留資格一覧表: "三の表"
  - S2 ISA 在留資格一覧表: "非就労資格"
  - S2 ISA 在留資格一覧表: "四の表"
- `atomic_claim`: ISA 在留資格一覧表将別表第一三の表和四の表作为非就劳资格类别展示；三の表包括文化活動、短期滞在，四の表包括留学、研修、家族滞在。
- `exclusion_scope`: not an absolute prohibition of every paid activity; does not describe 留学/家族滞在 qualification-outside-activity conditions; does not judge short-stay remote work.
- `matcher_phrases`: 非就劳资格, 留学能打工吗, 家族滞在工作, 短期滞在工作, 文化活動.
- `needs_domain_flags`: short-stay remote work, post-graduation student work, and related edge cases require separate cards.

### LS-P0C1-007 — 特定活動是个别指定活动

- `proposed_fact_id`: `legal-status-designated-activities-individual-designation`
- `authority_layer`: L1 Law
- `legal_source_type`: `statute_current_text`
- `applicable_statuses`: 特定活動
- `application_type`: current-status
- `source_quotes`:
  - S1 入管法 別表第一 五の表 特定活動: "特に指定する活動"
  - S2 ISA 在留資格一覧表: "特定活動"
- `atomic_claim`: 特定活動的活动内容不是单一固定类型，而是由法务大臣就个别外国人特别指定的活动。
- `exclusion_scope`: no list of all designated activity types, no work/family/renewal conclusion, no answer based only on the label "特定活動".
- `matcher_phrases`: 特定活动, 特定活動, 告示, 指定书, 个别指定, 活动内容.
- `needs_domain_flags`: concrete 特定活動 types require notice/designation-level cards.

### LS-P0C1-008 — 在留期间字段只定位期间，不判断许可

- `proposed_fact_id`: `legal-status-period-field-is-not-permission-probability`
- `authority_layer`: L1 Law + L4 ISA Page
- `legal_source_type`: `statute_current_text_with_official_status_list`
- `applicable_statuses`: 全在留資格
- `application_type`: permission-question
- `source_quotes`:
  - S1 入管法 第二条の二 第3項: "在留期間"
  - S1 入管法 第二条の二 第3項: "法務省令で定める"
  - S2 ISA 在留資格一覧表: "在留期間"
- `atomic_claim`: 在留資格一覧表中的在留期间字段用于定位该资格可设定的期间类别或上限信息；它不等于个案会被许可的年数、更新结果或获批概率。
- `recommended_state_mapping`: `needs_review`
- `risk_level`: high
- `exclusion_scope`: no prediction of 1/3/5-year grant, no renewal success probability, no eligibility/material judgement.
- `matcher_phrases`: 能拿几年, 5年签, 在留期间, 签证年数, 续签几年, 获批几年.
- `needs_domain_flags`: user-facing "能拿几年" wording; 永住/定住/経営・管理 period judgement.

---

## 4. Codex Duplicate / Conflict Scan

Existing related cards:

- `shikakugai-fukugyou` already covers qualification-outside-activity permission and has a direct fact field for 別表第二 holders being outside the permission target.
- `kazoku-taizai-yoken` covers family-stay requirements and should not be replaced by this skeleton.
- `gijinkoku-job-mismatch` and `haken-zairyu` cover specific 技人国 risk paths; Batch 1 only supplies parent scope.
- `eijuu-haigusha-visa`, `nihonjin-haigusha-visa`, and spouse-related cards cover status-specific issues; Batch 1 only supplies parent status skeleton.

No direct conflict detected, but:

- LS-P0C1-003 overlaps conceptually with `shikakugai-fukugyou`; it should become a routing/guardrail card, not duplicate qualification-outside-activity detail.
- LS-P0C1-008 overlaps with `eijuu-zairyu-kikan`; it should become a general duration/probability guardrail and not answer permanent-residence period conditions.

---

## 5. Batch 1 Gate Decision

| Candidate | Decision | Reason |
|---|---|---|
| LS-P0C1-001 | proceed to draft card | parent skeleton, medium risk |
| LS-P0C1-002 | proceed to draft card | parent skeleton, medium risk, identity-change caveat retained |
| LS-P0C1-003 | hold for AQL/QA before draft injection | high-risk routing claim overlaps work permission |
| LS-P0C1-004 | proceed to draft card | low-risk category card |
| LS-P0C1-005 | proceed to draft card | medium-risk category card; Cycle 2 caveat retained |
| LS-P0C1-006 | proceed to draft card | medium-risk category card; qualification-outside-activity caveat retained |
| LS-P0C1-007 | proceed to draft card | medium-risk guardrail against 特定活動 overgeneralization |
| LS-P0C1-008 | hold for AQL/QA before draft injection | high-risk duration/probability guardrail |

Next step:

1. Send this report to AQL and QA.
2. Ask AQL to evaluate LS-P0C1-001 to 008 against the 26-question set.
3. Ask QA to identify whether LS-P0C1-003 or 008 should stay `needs_review` or become non-injecting guardrails.
4. Only after AQL/QA, convert approved candidates into formal draft card files.

---

## 6. AQL Validation Result

**Verdict**: Batch 1 improves answer direction, but only as structure/routing guardrail.

Coverage:

- Sufficient for direction correction: Q1 永住换工作, Q2 日配打工, Q3 永配开公司, Q4 定住者夜班, Q25 经管是不是工作签.
- Partial only: 家族滞在工作, 技人国/经管 activity scope, 留学/短期滞在 work, 特定技能, 换公司, 资格外活动许可.
- Not sufficient: 特定技能家属, 日配离婚后工作, 永住/定住父母, 永住申请中换工作/开公司.

Candidate decisions:

| Candidate | AQL Decision | Notes |
|---|---|---|
| LS-P0C1-001 | pass | parent skeleton, not standalone specific activity answer |
| LS-P0C1-002 | pass | corrects status qualification work-limit confusion |
| LS-P0C1-003 | hold | routing guardrail only; not standalone final-answer fact |
| LS-P0C1-004 | pass | low-risk category card |
| LS-P0C1-005 | pass | category/routing card; specific criteria require Cycle 2 |
| LS-P0C1-006 | pass | category/routing card; must connect to qualification-outside-activity |
| LS-P0C1-007 | pass | prevents generic 特定活動 overgeneralization |
| LS-P0C1-008 | hold / rewrite | duration/probability guardrail only |

---

## 7. QA Validation Result

**Verdict**: No current P0 because nothing is injected. **BLOCK for production injection**.

P0 conditional blockers:

- If LS-P0C1-003 or LS-P0C1-008 is injected as standalone answer source, block as P0.

P1 issues:

- Each formal card needs at least two fixed dry-run fixtures.
- LS-P0C1-005 must include independent matcher/must_say/must_not_say in formal draft.
- LS-P0C1-004 wording must not call 技人国/経営・管理 "table-two"; they are 別表第一二の表, not 別表第二.
- LS-P0C1-006 must route 留学/家族滞在 work questions to qualification-outside-activity cards, not answer them standalone.
- A/B answers have not run yet.

Required minimum fixtures:

| Card | Required Fixture Pair |
|---|---|
| LS-P0C1-001 | "活動資格是什么意思？" hits 001; "永住者能换工作吗？" excludes 001 primary and routes to 002 |
| LS-P0C1-002 | "永住者副业要资格外活动许可吗？" hits 002/excludes qualification-outside-activity requirement; "技人国能做什么工作？" excludes 002 |
| LS-P0C1-003 | "日配能打工吗？" guardrail/routing only; "家族滞在可以全职吗？" routes to qualification-outside-activity/change, not 003 final |
| LS-P0C1-004 | "教授签属于哪类？" hits 004; "技人国是不是一の表？" excludes 004 |
| LS-P0C1-005 | "经营管理属于哪类资格？" hits 005; "经管资本金要多少？" excludes 005 standalone and routes to Cycle 2/specific card |
| LS-P0C1-006 | "留学属于非就劳资格吗？" hits 006; "留学生每周能打工多久？" excludes 006 final and routes to qualification-outside-activity |
| LS-P0C1-007 | "特定活動是不是都一样？" hits 007; "特定活動46号能做什么？" routes to specific designated-activity source |
| LS-P0C1-008 | "列表写5年是不是一定给5年？" guardrail only; "经管续签能拿几年？" guardrail plus route specific, no probability answer |

---

## 8. Batch 1 Normalization Decision

Proceed:

- Convert LS-P0C1-001, 002, 004, 005, 006, 007 into formal `state: ai_extracted` draft cards.

Hold:

- LS-P0C1-003 remains candidate guardrail until DOMAIN wording review / matcher design.
- LS-P0C1-008 remains candidate guardrail until duration/probability design.

Do not:

- Do not set any Batch 1 card to `ai_verified`.
- Do not sync/inject into production.
- Do not use these cards to answer specific 技人国/経営管理/留学/家族滞在/特定技能 criteria.
