---
fact_id: residence-change-excludes-permanent-residence
title: 在留資格変更 — 永住者への変更希望は通常の変更ページ対象外
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 1
citation_label: "永住者への変更希望は通常の在留資格変更ページ対象外"
citation_summary: "ISA の在留資格変更許可申請ページは、対象者から永住者の在留資格への変更を希望する場合を除いている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-007
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第20条 / 永住許可手続は別系統"
  source_locator: "在留資格変更許可申請ページ：手続対象者"
  claim_type: routing_boundary
  applicable_statuses:
    - "permanent_residence"
  application_type:
    - change
    - permanent_residence
  exclusion_scope:
    - "永住許可の実体要件"
  deep_water_candidate: false
applies_when:
  - "用户把永住说成换签"
  - "用户问永住是不是在留資格変更"
does_not_cover:
  - "永住许可条件"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-change-16-2
    url: https://www.moj.go.jp/isa/applications/procedures/16-2.html
    title: 在留資格変更許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格変更許可申請
  - 永住許可申請 routing
direct_fact_fields:
  - permanent_residence_excluded_from_general_change_page_target
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "The ISA status-change procedure page excludes people who want to change to permanent resident status from the listed status-change target group."
    source_title: "在留資格変更許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "永住者への変更希望は通常の変更ページ対象外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格変更 — 永住者への変更希望は通常の変更ページ対象外

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

ISA の在留資格変更許可申請ページは、永住者の在留資格への変更を希望する場合を手続対象者から除いている。永住は永住許可申請として別に扱う。

## exceptions_or_transition

- 本カードは永住許可の要件や必要書類を判断しない。

## common_user_phrases

- 永住 换签 在留資格変更
- 永住申请是变更吗
- 永住许可和变更区别
- 永住者へ変更
- 普通换签能不能换永住
- 永住不是16-2变更

## must_say

- 永住は通常の在留資格変更ページからは外されている。
- 永住許可申請として別ルートで確認する。

## must_not_say

- 永住就是普通变更申请。
- 永住条件可以在本卡判断。

## qa_cases

### QA-1

**user**: 永住是不是换签的一种？

**must_have**:

- 通常の在留資格変更ページ対象外
- 永住許可申請として別ルート

**must_not_have**:

- 普通变更就可以

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-007 |
