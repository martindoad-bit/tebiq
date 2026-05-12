---
fact_id: temporary-visitor-short-stay-activity-scope
title: 短期滞在 — 観光・親族訪問・会議等の短期活動
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
citation_label: "短期滞在"
citation_summary: "短期滞在は観光、親族訪問、会議参加、業務連絡等の短期活動を対象とし、普通の就労資格ではない。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-058
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一三の表 短期滞在"
  source_locator: "短期滞在の項"
  claim_type: activity_scope
  applicable_statuses:
    - "短期滞在"
  application_type:
    - current-status
  exclusion_scope:
    - "远程办公、报酬、现场作业"
    - "资格外活动许可可否"
  deep_water_candidate: true
applies_when:
  - "用户询问短期滞在能否工作、远程办公、帮朋友店、现场安装"
does_not_cover:
  - "远程工作和报酬边界"
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
  - "短期滞在の活動範囲"
direct_fact_fields:
  - temporary_visitor_scope
ai_inferred_fields: []
needs_review_flags:
  - id: remote_work_boundary
    reason: "远程工作、海外报酬、现场劳务需 DOMAIN review。"
evidence_points:
  - claim: "短期滞在は観光、親族訪問、会議参加、業務連絡等の短期活動を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一三の表 短期滞在"
    display_label: "入管法別表第一三の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 短期滞在 — 観光・親族訪問・会議等の短期活動

## current_date_logic

```text
Checked against current e-Gov and ISA status list on 2026-05-12.
This is a short-stay boundary card, not a remote-work opinion.
```

## current_effective_fact

短期滞在は観光、親族訪問、見学、講習、会議参加、業務連絡等の短期活動を対象とする。普通の就労資格ではない。

## exceptions_or_transition

- 遠隔勤務、報酬、現場作業、短期商用の境界は本カードで結論しない。

## common_user_phrases

- 短期滞在
- 旅游签
- 探亲
- 商务会议
- 远程办公
- 短期商务
- 短期滞在可以远程办公吗
- 帮朋友店里收钱
- 现场安装设备

## must_say

- 短期滞在是短期活动资格，不是就劳资格。
- 报酬劳动、现场作业、远程工作需谨慎确认。

## must_not_say

- 不要把短期滞在和资格外活动许可混为一谈。
- 不要说短期帮忙收钱没问题。

## qa_cases

### QA-1

**user**: 短期滞在可以打工吗？

**must_have**:

- 短期活动
- 非就劳
- 需谨慎确认

**must_not_have**:

- 申请资格外就行

### QA-2

**user**: 旅游签可以参加会议吗？

**must_have**:

- 会议参加/业务联络在短期活动例示中

**must_not_have**:

- 任何商务都可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-058 |
