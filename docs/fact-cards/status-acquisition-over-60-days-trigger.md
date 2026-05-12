---
fact_id: status-acquisition-over-60-days-trigger
title: 在留資格取得 — 事由発生日から60日超在留する場合が対象
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 2
citation_label: "在留資格取得は60日超在留する場合が対象"
citation_summary: "在留資格取得許可申請の対象者は、出生・国籍離脱等の事由発生日から60日を超えて日本に滞在しようとする人。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-018
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第22条の2 / 第22条の3"
  source_locator: "在留資格取得許可申請ページ：手続概要・手続対象者"
  claim_type: deadline_trigger
  applicable_statuses:
    - "all"
  application_type:
    - status_acquisition
  exclusion_scope:
    - "60日以内に出国する場合の個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问日本出生孩子是否要申请在留"
  - "用户问60天规则"
does_not_cover:
  - "超过期限后的补救"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-status-acquisition-16-10
    url: https://www.moj.go.jp/isa/applications/procedures/16-10.html
    title: 在留資格取得許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格取得許可申請
direct_fact_fields:
  - status_acquisition_required_when_staying_over_60_days_after_event
ai_inferred_fields: []
needs_review_flags:
  - id: after_60_days_case
    reason: "If the user is already past the relevant deadline, route to DOMAIN or local immigration office."
evidence_points:
  - claim: "ISA identifies status acquisition applicants as those who intend to stay in Japan for more than 60 days after the event such as birth or nationality loss."
    source_title: "在留資格取得許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-10.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続概要; 手続対象者"
    display_label: "在留資格取得：事由発生日から60日超在留する場合"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取得 — 事由発生日から60日超在留する場合が対象

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

出生や日本国籍離脱などの事由が発生した日から60日を超えて日本に滞在しようとする場合、在留資格取得許可申請の対象になる。

## exceptions_or_transition

- 60日以内に出国する場合や、すでに60日を超えている場合は個別確認が必要。

## common_user_phrases

- 出生后60天 在留资格取得
- 小孩出生 60日 超える
- 日本出生宝宝 60天
- 国籍离脱后60天
- 在留資格取得 60日以内
- 新生儿多久内办在留

## must_say

- 60日を超えて日本に滞在しようとする場合が対象。
- 期限が絡むため具体日付を確認する。

## must_not_say

- 出生后什么时候办都一样。
- 60天是从申请日算。

## qa_cases

### QA-1

**user**: 宝宝出生后两个月内就要办在留吗？

**must_have**:

- 60日超在留する場合
- 30日申請期限も確認

**must_not_have**:

- 可以无限拖

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-018 |
