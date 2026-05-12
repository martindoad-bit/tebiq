---
fact_id: dependent-work-restriction-router
title: 家族滞在 — 工作问题应接资格外活动许可或资格变更
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
citation_label: "資格外活動許可（家族滞在）"
citation_summary: "家族滞在で收入事业或报酬活动时，应进入资格外活动许可框架；全职、正社员、资格变更不能由28小时逻辑单独回答。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-064
  authority_layer: L1 Law + L2 Ordinance + L4 ISA Page
  legal_source_type: statute_ordinance_isa_page
  law_article_ref: "入管法第19条 / 入管法施行規則第19条 / ISA 家族滞在資格外活動許可"
  source_locator: "入管法第19条、施行規則第19条5項1号、家族滞在資格外活動許可ページ"
  claim_type: work_restriction_router
  applicable_statuses:
    - "家族滞在"
  application_type:
    - current-status
  exclusion_scope:
    - "正社员、全职、个体经营是否可行"
    - "资格变更是否必要"
    - "扶养关系、收入、续签可否"
  deep_water_candidate: true
applies_when:
  - "用户询问家族滞在能否打工、兼职、正社员、全职"
  - "用户把家族滞在误当自由工作资格"
does_not_cover:
  - "具体工作是否已被许可"
  - "家族滞在能否续签"
  - "收入超过扶养的影响"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 3
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
    quoted_in_card: true
  - id: isa-dependent-shikakugai
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00004.html
    title: 家族滞在の資格外活動許可
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "家族滞在の工作限制路由"
direct_fact_fields:
  - dependent_work_restriction_router
ai_inferred_fields: []
needs_review_flags:
  - id: fulltime_under_dependent
    reason: "全职、正社员方向需要资格变更/许可范围/扶养关系综合确认。"
  - id: income_above_dependent_support
    reason: "收入超过扶养关系的影响不由本卡判断。"
evidence_points:
  - claim: "家族滞在从事收入事业或报酬活动时，应接资格外活动许可框架。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第19条"
    display_label: "入管法第19条"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 家族滞在 — 工作问题应接资格外活动许可或资格变更

## current_date_logic

```text
This card reflects e-Gov law/regulation text and ISA qualification-outside-activity pages checked on 2026-05-12.
It is a routing/guardrail card, not a standalone work-permission conclusion.
```

## current_effective_fact

### 家族滞在 work questions route to qualification-outside-activity

家族滞在は別表第一四の表の活動資格であり，工作、兼职、报酬活动问题不能用“身份系自由工作”回答。需要连接资格外活动许可框架；全职、正社员或以工作为主的场景，还可能涉及资格变更。

> "報酬を受ける活動"
> source: egov-immigration-act-article19

> "一週について二十八時間以内"
> source: egov-immigration-regulation-article19

## exceptions_or_transition

- 本卡不判断某份工作是否已被包括许可或个别许可覆盖。
- 本卡不判断正社员、全职、自营、收入超过扶养后的续签结果。

## common_user_phrases

- 家族滞在打工
- 家族滞在可以打工吗
- 家属签工作
- 家族签副业
- 家族滞在正社员
- 家族滞在全职
- 家族滞在收入超过扶养
- 家族滞在资格外活动许可

## must_say

- 家族滞在工作问题要先接资格外活动许可。
- 全职或正社员方向不能只按28小时回答，可能涉及资格变更。
- 许可范围、工作内容、扶养关系需要分开看。

## must_not_say

- 不要说家族滞在可以自由工作。
- 不要说有资格外活动许可就一定能做正社员。
- 不要把日配/定住等身份系资格误套到家族滞在。

## qa_cases

### QA-1

**user**: 家族滞在可以打工吗？

**must_have**:

- 资格外活动许可
- 许可范围
- 家族滞在不是身份系自由工作资格

**must_not_have**:

- 自由工作
- 身份系资格

### QA-2

**user**: 家族滞在可以全职正社员吗？

**must_have**:

- 资格外活动和资格变更要区分
- 全职/正社员需要进一步确认

**must_not_have**:

- 拿到许可就可以全职
- 28小时内就一定没问题

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 3; LS-P0C1-064 |
