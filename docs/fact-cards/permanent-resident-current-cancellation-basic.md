---
fact_id: permanent-resident-current-cancellation-basic
title: 永住者 — 現行制度でも在留資格取消や退去強制の対象となる場合がある
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 3
citation_label: "永住者も在留管理の対象"
citation_summary: "ISA の永住許可制度 Q&A は、永住者は在留期間更新を受けない一方、在留資格取消制度や退去強制制度等の入管法上の在留管理対象であり、現行法上も住所届出違反、虚偽住所、不正取得などで取消されることがあると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-042
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "永住許可制度の適正化Q&A"
  source_locator: "Q1及びQ3"
  claim_type: cancellation_boundary
  applicable_statuses:
    - "permanent_resident"
  application_type:
    - cancellation
  exclusion_scope:
    - "令和6年改正後の新取消事由の施行判断"
    - "個別取消の可能性判断"
  deep_water_candidate: true
applies_when:
  - "用户问永住者是否绝对不会取消"
does_not_cover:
  - "具体永住者是否会被取消"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-system-qa
    url: https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html
    title: 永住許可制度の適正化Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住者
direct_fact_fields:
  - permanent_resident_current_cancellation_basic
ai_inferred_fields: []
needs_review_flags:
  - id: permanent_resident_individual_cancellation_review
    reason: "具体的な取消該当性や退去強制該当性は個別確認が必要。"
evidence_points:
  - claim: "ISA の Q&A は、永住者は在留期間更新を受けない一方、在留資格取消制度や退去強制制度等の在留管理対象であり、住所届出違反、虚偽住所、不正取得などで取消されることがあると説明している。"
    source_title: "永住許可制度の適正化Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q1及びQ3"
    display_label: "永住者：在留管理の対象"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住者 — 現行制度でも在留資格取消や退去強制の対象となる場合がある

## current_date_logic

Checked against the ISA permanent-residence-system Q&A on 2026-05-12.

## current_effective_fact

ISA の Q&A は、永住者は在留期間更新を受けない一方、在留資格取消制度や退去強制制度等の在留管理対象であり、住所届出違反、虚偽住所、不正取得などで取消されることがあると説明している。

## exceptions_or_transition

- 永住者には活動・在留期間制限がないが、入管法上の義務から完全に自由になるわけではない。

## common_user_phrases

- 永住者 取消
- 永住 绝对安全吗
- 永住者 在留資格取消
- 永住 不会取消吗
- 永住者 退去強制
- 永住 地址 取消

## must_say

- 永住者も在留管理の対象。
- 永住は在留期間更新がないが、取消制度や退去強制制度と無関係ではない。

## must_not_say

- 永住者は絶対に取消されない。
- 永住者は入管法上の義務を気にしなくてよい。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-042 |
