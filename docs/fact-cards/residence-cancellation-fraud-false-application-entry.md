---
fact_id: residence-cancellation-fraud-false-application-entry
title: 在留資格取消 — 虚偽・不正取得は取消入口になり得る
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "虚偽・不正取得は在留資格取消の入口"
citation_summary: "入管法第22条の4と ISA の取消案内は、虚偽その他不正の手段により上陸許可や在留許可等を受けた場合などを、在留資格取消の事由として示している。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-016
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_current_text
  law_article_ref: "入管法第22条の4"
  source_locator: "取消事由"
  claim_type: cancellation_trigger
  applicable_statuses:
    - "all_residence_statuses"
  application_type:
    - cancellation
  exclusion_scope:
    - "取消処分の自動発生"
  deep_water_candidate: true
applies_when:
  - "用户问资料虚假、不正申请是否会导致在留资格取消"
does_not_cover:
  - "个案是否实际构成虚假或不正"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格を持つ外国人
direct_fact_fields:
  - residence_cancellation_fraud_false_application_entry
ai_inferred_fields: []
needs_review_flags:
  - id: factual_fraud_determination_required
    reason: "虚偽・不正に該当するかは個別確認が必要。"
evidence_points:
  - claim: "入管法第22条の4と ISA の取消案内は、虚偽その他不正の手段により上陸許可や在留許可等を受けた場合などを、在留資格取消の事由として示している。"
    source_title: "在留資格の取消し"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由"
    display_label: "在留資格取消：虚偽・不正取得"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 虚偽・不正取得は取消入口になり得る

## current_date_logic

Checked against current law text and ISA cancellation page on 2026-05-12.

## current_effective_fact

虚偽その他不正の手段により上陸許可や在留許可等を受けた場合などは、在留資格取消の事由として示されている。

## exceptions_or_transition

- 取消事由に触れる可能性があることと、実際に取消処分がされることは別。

## common_user_phrases

- 在留資格取消 虚偽申請
- 在留資格取消 不正
- 假材料 签证取消
- 虚假资料 在留资格
- 入管 发现 材料不实
- 在留資格 取消 うそ

## must_say

- 虚偽・不正取得は在留資格取消の入口になり得る。
- 実際の取消は個別事実と手続を確認する。

## must_not_say

- 虚偽の疑いがあれば自動的に即日失効する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-016 |
