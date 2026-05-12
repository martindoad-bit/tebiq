---
fact_id: dependent-activity-anchor
title: 家族滞在 — 扶養を受ける配偶者又は子として行う日常的活動
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 2
citation_label: "入管法別表第一四の表（家族滞在）"
citation_summary: "家族滞在は、扶養を受ける配偶者又は子として行う日常的活動を対象とする別表第一四の表の活動資格であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-039
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一四の表"
  source_locator: "家族滞在の項"
  claim_type: activity_scope
  applicable_statuses:
    - "家族滞在"
  application_type:
    - current-status
  exclusion_scope:
    - "父母、兄弟姉妹等を当然に含むか"
    - "資格外活動許可、全职、正社员、打工上限"
    - "扶养者资格范围细则"
  deep_water_candidate: true
applies_when:
  - "用户询问家族滞在的基本活动范围"
  - "用户把家族滞在误当身份系资格或自由工作资格"
does_not_cover:
  - "资格外活动许可"
  - "父母或兄弟姐妹是否可走家族滞在"
  - "特定技能家属带同"
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
    quoted_in_card: true
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "家族滞在の活動範囲"
direct_fact_fields:
  - dependent_activity_scope
ai_inferred_fields: []
needs_review_flags:
  - id: dependent_work_permission_required
    reason: "家族滞在工作问题必须连接资格外活动许可或变更来源。"
  - id: parent_or_non_child_dependent
    reason: "父母、兄弟姐妹等不由本活动锚点直接判断。"
evidence_points:
  - claim: "家族滞在は、扶養を受ける配偶者又は子として行う日常的活動を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一四の表 家族滞在"
    display_label: "入管法別表第一四の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 家族滞在 — 扶養を受ける配偶者又は子として行う日常的活動

## current_date_logic

```text
This card reflects the e-Gov current law text and ISA status list checked on 2026-05-12.
It is a routing/activity-scope skeleton only.
```

## current_effective_fact

### 家族滞在 is an activity qualification

家族滞在は入管法別表第一四の表に置かれる活動資格であり、扶養を受ける配偶者又は子として行う日常的活動を対象とする。

> "扶養を受ける配偶者又は子"
> source: egov-immigration-act

> "日常的な活動"
> source: egov-immigration-act

## exceptions_or_transition

- 工作问题必须转到资格外活动许可或资格变更判断。
- 父母、兄弟姐妹、特定技能家属带同等对象范围，需要后续来源卡。

## common_user_phrases

- 家族滞在
- 家属签
- 家族签
- 扶养
- 配偶者孩子
- 配偶者或子
- 家族滞在可以打工吗
- 家族滞在正社员
- 父母家族滞在

## must_say

- 家族滞在的核心是被扶养配偶者或子女的日常活动。
- 它是別表第一四の表的活动资格，不是別表第二身份资格。
- 工作问题必须连接资格外活动许可或资格变更。

## must_not_say

- 不要说家族滞在是身份系资格。
- 不要说家族滞在可以自由全职工作。
- 不要说父母当然可以办家族滞在。

## qa_cases

### QA-1

**user**: 家族滞在是什么资格？

**must_have**:

- 別表第一四の表
- 被扶养
- 配偶者或子

**must_not_have**:

- 別表第二
- 身份签

### QA-2

**user**: 永住者父母能办家族滞在吗？

**must_have**:

- 对象范围需核对
- 不当然包含父母

**must_not_have**:

- 可以直接办
- 家人都可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 2; canonical LS-P0C1-039 |
