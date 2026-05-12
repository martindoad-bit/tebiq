---
fact_id: status-acquisition-30-day-application-window
title: 在留資格取得 — 申請期間は取得事由発生日から30日以内
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
citation_label: "在留資格取得の申請期間は30日以内"
citation_summary: "在留資格取得許可申請の申請期間は、資格取得の事由が生じた日から30日以内。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-019
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第22条の2 / 第22条の3"
  source_locator: "在留資格取得許可申請ページ：申請期間"
  claim_type: deadline_window
  applicable_statuses:
    - "all"
  application_type:
    - status_acquisition
  exclusion_scope:
    - "期限後申請の救済"
  deep_water_candidate: true
applies_when:
  - "用户问孩子出生后多久内申请在留"
  - "用户问在留資格取得的30天期限"
does_not_cover:
  - "已过30天后的处理"
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
  - status_acquisition_application_within_30_days_after_event
ai_inferred_fields: []
needs_review_flags:
  - id: missed_30_day_deadline
    reason: "Late handling is not determined by this card."
evidence_points:
  - claim: "ISA states the application period for status acquisition as within 30 days from the date when the acquisition reason arose."
    source_title: "在留資格取得許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-10.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請期間"
    display_label: "在留資格取得：取得事由発生日から30日以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取得 — 申請期間は取得事由発生日から30日以内

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留資格取得許可申請の申請期間は、資格取得の事由が生じた日から30日以内である。

## exceptions_or_transition

- 期限後の扱いは、このカードだけで断定しない。
- 出生日、国籍離脱日など起算日を具体的に確認する。

## common_user_phrases

- 在留資格取得 30日以内
- 出生后30天内申请
- 小孩出生 一个月内 入管
- 新生儿在留 30天
- 国籍离脱 30日以内
- 取得事由发生日 30日

## must_say

- 申請期間は取得事由発生日から30日以内。
- 60日超在留するかどうかとあわせて確認する。

## must_not_say

- 30天从护照办好开始算。
- 过了30天也完全一样。

## qa_cases

### QA-1

**user**: 宝宝出生后护照还没办好，30天怎么办？

**must_have**:

- 取得事由发生日起30日以内
- 期限问题需向入管确认

**must_not_have**:

- 等护照好了再说一定没问题

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-019 |
