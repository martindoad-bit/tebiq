---
fact_id: qualification-outside-activity-permission-framework
title: 資格外活動許可 — 当前活动资格范围外收入/报酬活动的许可框架
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 3
citation_label: "入管法第19条（資格外活動許可）"
citation_summary: "別表第一资格持有人从事当前在留资格活动范围外的收入事业或报酬活动时，应进入资格外活动许可框架；別表第二身份系资格不是主要对象。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-066
  authority_layer: L1 Law + L2 Ordinance + L4 ISA Page
  legal_source_type: statute_ordinance_isa_page
  law_article_ref: "入管法第19条第2項 / 入管法施行規則第19条"
  source_locator: "資格外活動許可 framework"
  claim_type: permission_framework
  applicable_statuses:
    - "別表第一の在留資格"
  application_type:
    - current-status
  exclusion_scope:
    - "永住者、日本人の配偶者等、永住者の配偶者等、定住者の通常工作问题"
    - "具体许可概率"
    - "资格变更必要性"
  deep_water_candidate: true
applies_when:
  - "用户询问活动资格之外的副业、兼职、报酬活动"
  - "用户询问技人国、经管、留学、家族滞在等能否做额外工作"
does_not_cover:
  - "身份系资格是否需要资格外活动许可"
  - "具体工作已被许可覆盖"
  - "资格变更或取消风险结论"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 4
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act-article19
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: egov-immigration-regulation-article19
    url: https://laws.e-gov.go.jp/law/356M50000010054
    title: 出入国管理及び難民認定法施行規則
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
  - id: isa-shikakugai-application
    url: https://www.moj.go.jp/isa/applications/procedures/16-8.html
    title: 資格外活動許可申請
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
  - id: isa-shikakugai-general
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
    title: 資格外活動許可
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "資格外活動許可の基本框架"
direct_fact_fields:
  - qualification_outside_activity_permission_framework
ai_inferred_fields: []
needs_review_flags:
  - id: side_business_vs_status_change
    reason: "副业、自营、开公司等可能需要资格外活动许可或资格变更，不能由本框架卡单独判断。"
  - id: table2_exclusion
    reason: "別表第二身份系资格不应机械套资格外活动许可。"
evidence_points:
  - claim: "別表第一の在留資格で範囲外の収入事業又は報酬活動を行う場合は資格外活動許可の枠組みで扱う。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第19条第2項"
    display_label: "入管法第19条"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 当前活动资格范围外收入/报酬活动的许可框架

## current_date_logic

```text
This card reflects e-Gov law/regulation text and ISA qualification-outside-activity pages checked on 2026-05-12.
It is a framework card and does not judge individual permission outcomes.
```

## current_effective_fact

### Qualification-outside-activity permission is for activity-scope mismatch

資格外活動許可の基本问题是：当前在留资格允许的活动范围之外，是否要从事收入事业或报酬活动。这个框架主要接別表第一的活动资格问题，不应机械套到永住者、日配、定住者等別表第二身份系资格。

> "現に有する在留資格に属する活動のほか"
> source: egov-immigration-act-article19

> "収入を伴う事業を運営する活動"
> source: egov-immigration-act-article19

## exceptions_or_transition

- 身份系资格的普通工作问题不要优先命中本卡。
- 副业、自营、开公司、受雇打工是否应走资格外活动许可、资格变更或其他路径，需要结合当前资格和活动内容。

## common_user_phrases

- 资格外活动许可
- 資格外活動許可
- 副业许可
- 打工许可
- 工作签副业
- 技人国副业
- 经管签可以打工吗
- 报酬活动
- 收入事业

## must_say

- 先确认当前在留资格是否属于活動資格。
- 再看拟从事活动是否超出当前资格活动范围。
- 身份系资格不要机械套资格外活动许可。

## must_not_say

- 不要把资格外活动许可套到永住者、日配、定住者的普通工作问题。
- 不要说申请就一定许可。
- 不要说有工作签就能做任何副业。

## qa_cases

### QA-1

**user**: 技人国可以周末做副业吗？

**must_have**:

- 当前资格活动范围外
- 资格外活动许可
- 具体活动需确认

**must_not_have**:

- 随便做
- 身份系资格

### QA-2

**user**: 永住者副业要资格外活动许可吗？

**must_have**:

- 別表第二不是主要对象
- 不机械套资格外活动许可

**must_not_have**:

- 需要资格外活动许可
- 一周28小时

## injection_format

### injection_certain_block

```text

```

### injection_needs_review_addendum

```text

```

## changelog

| Date | Actor | Change | From | To | Notes |
|---|---|---|---|---|---|
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 3; LS-P0C1-066 |
