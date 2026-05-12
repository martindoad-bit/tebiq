---
fact_id: dependent-sponsor-and-family-member-scope
title: 家族滞在 — 扶养者资格范围与配偶者・子女对象范围
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 4
citation_label: "家族滞在の扶養者・家族範囲"
citation_summary: "家族滞在は特定资格持有人或留学生扶养的配偶者或子为对象；父母、兄弟姐妹和所有工作签家属不能当然纳入。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-059
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一四の表 家族滞在"
  source_locator: "家族滞在の項"
  claim_type: status_dependency_scope
  applicable_statuses:
    - "家族滞在"
  application_type:
    - current-status
  exclusion_scope:
    - "父母、兄弟姐妹、朋友"
    - "扶养能力、材料、许可概率"
    - "特定技能1号/2号带同最终表达"
  deep_water_candidate: true
applies_when:
  - "用户询问谁可以带家族滞在、父母能不能办家族滞在"
does_not_cover:
  - "父母长期居留其他路径"
  - "特定技能2号家属可否获批"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "家族滞在の扶養者・家族対象範囲"
direct_fact_fields:
  - dependent_sponsor_and_family_member_scope
ai_inferred_fields: []
needs_review_flags:
  - id: parent_route
    reason: "父母长期居留不由家族滞在范围自动支持。"
  - id: sponsor_exclusion
    reason: "具体扶养者资格范围需配合后续 sponsor matrix。"
evidence_points:
  - claim: "家族滞在 is for dependent spouse or child, with sponsor-scope exclusions."
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一四の表 家族滞在"
    display_label: "入管法別表第一四の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 家族滞在 — 扶养者资格范围与配偶者・子女对象范围

## current_date_logic

```text
Checked against current e-Gov and ISA status list on 2026-05-12.
This card is a sponsor/family-member routing card.
```

## current_effective_fact

家族滞在は、特定の在留資格者又は留学生の扶養を受ける配偶者又は子としての日常活動を対象とする。父母、兄弟姐妹、朋友，不能当然套入家族滞在对象范围。

## exceptions_or_transition

- 特定技能1号/2号家属带同需 DOMAIN-approved wording。
- 父母长期居留属于高风险另议题。

## common_user_phrases

- 家族滞在
- 家属签
- 扶养
- 配偶者
- 子
- 父母家族滞在
- 特定技能家属
- 什么签证可以带老婆孩子
- 所有工作签都能带家属吗

## must_say

- 家族滞在对象是被扶养配偶者或子。
- sponsor 资格范围有排除项，不能泛化为所有在留资格都能带家属。

## must_not_say

- 不要说永住者/定住者的父母可以直接办家族滞在。
- 不要说所有工作签都能带家族滞在。

## qa_cases

### QA-1

**user**: 永住者能给父母办家族滞在吗？

**must_have**:

- 配偶者或子
- 父母不当然属于范围

**must_not_have**:

- 可以直接办

### QA-2

**user**: 技能实习能带家族滞在吗？

**must_have**:

- 技能実習被排除或需确认

**must_not_have**:

- 所有工作签都可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-059 |
