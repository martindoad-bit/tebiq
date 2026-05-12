---
fact_id: resident-card-validity-vs-residence-period-boundary
title: 在留カード有効期間と在留期間の区別
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "在留カード有効期間更新と在留期間更新は別手続き"
citation_summary: "ISA は、在留カードの有効期間更新申請を、永住者・高度専門職2号・16歳到達前の対象者向けのカード手続として掲載しており、通常の在留期間更新許可申請とは別手続きとして扱われる。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-098
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の11"
  source_locator: "在留カードの有効期間の更新申請"
  claim_type: procedure_boundary
  applicable_statuses:
    - "permanent_resident"
    - "highly_skilled_professional_2"
    - "mid_long_term_resident"
  application_type:
    - application
  exclusion_scope:
    - "在留期間更新許可申請"
  deep_water_candidate: true
applies_when:
  - "用户把在留卡有效期限、在留期限、永住卡更新混在一起问"
does_not_cover:
  - "卡面期限已过后的个别处理"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-validity-renewal
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
    title: 在留カードの有効期間の更新申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - resident_card_validity_vs_residence_period_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: expired_card_vs_status_period_requires_review
    reason: "Card validity, residence period, and special period interactions require careful routing."
evidence_points:
  - claim: "ISA lists residence-card validity renewal as a separate card procedure for permanent residents, highly skilled professional no. 2 holders, and under-16 expiry cases; it should not be treated as the ordinary residence period renewal permission procedure."
    source_title: "在留カードの有効期間の更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者・申請期間"
    display_label: "カード有効期間更新と在留期間更新は別手続き"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 在留カード有効期間と在留期間の区別

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留カード有効期間更新申請は、永住者、高度専門職2号、16歳到達前の対象者などに関するカード手続。通常の在留期間更新許可申請とは別手続きとして扱う。

## exceptions_or_transition

- カード有効期間が過ぎた場合の個別処理は別途確認が必要。
- 申請中特例期間や在留期限との関係は、カード手続だけで断定しない。

## common_user_phrases

- 在留カード 期限 在留期限 違い
- 在留カード 有効期間 在留期間 違う
- 永住カード 更新 永住更新
- 在留卡有效期 签证期限 区别
- 在留カード 期限切れ 不法滞在
- カード有効期間 更新 在留期間更新

## must_say

- 在留カード有効期間更新と在留期間更新許可申請は別。
- カード期限と在留資格の期限を混同しない。

## must_not_say

- 在留カード期限切れだけで在留資格が必ず失効すると言う。
- 永住者の在留資格そのものを期間更新すると表現する。

## qa_cases

### QA-1

**user**: 在留カードの期限が切れそうです。签证更新ですか？

**must_have**:

- カード有効期間と在留期間は別
- どの期限か確認

**must_not_have**:

- すぐ不法滞在と断定

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-098 |
