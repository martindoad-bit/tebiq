---
fact_id: resident-card-validity-renewal-window
title: 在留カード有効期間更新 — 申請期間
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "永住者等は満了2か月前から、16歳到達前は6か月前から"
citation_summary: "ISA は、永住者又は高度専門職2号の在留カード有効期間更新申請期間を満了日の2か月前から満了日まで、16歳到達前の対象者は6か月前から満了日までとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-092
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の11"
  source_locator: "申請期間"
  claim_type: deadline_window
  applicable_statuses:
    - "permanent_resident"
    - "highly_skilled_professional_2"
    - "mid_long_term_resident_under_16_card_expiry"
  application_type:
    - application
  exclusion_scope:
    - "在留期間更新許可申請"
  deep_water_candidate: false
applies_when:
  - "用户问永住者在留卡、高度专门职2号或孩子卡面有效期何时更新"
does_not_cover:
  - "已过期后的个别处理"
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
  - 永住者
  - 高度専門職2号
  - 在留カード有効期間満了日が16歳到達時期の中長期在留者
direct_fact_fields:
  - resident_card_validity_renewal_window
ai_inferred_fields: []
needs_review_flags:
  - id: expired_card_handling_requires_review
    reason: "Handling after the card validity date has passed can require case-specific office confirmation."
evidence_points:
  - claim: "ISA states that permanent residents and highly skilled professional no. 2 holders apply from two months before the current card validity expiry until expiry; under-16 card-expiry cases apply from six months before the 16th-birthday expiry window until expiry."
    source_title: "在留カードの有効期間の更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請期間"
    display_label: "申請期間：満了2か月前又は6か月前から"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード有効期間更新 — 申請期間

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

永住者又は高度専門職2号は、現在の在留カード有効期間満了日の2か月前から満了日まで申請する。16歳到達前のカード有効期間更新対象者は、原則として満了日の6か月前から満了日まで申請する。

## exceptions_or_transition

- 2023年11月1日以降に交付されたカードでは、16歳の誕生日の前日が有効期限になる扱いが示されている。
- 長期海外滞在等で期間内申請が困難な場合、期間前申請が認められる場合がある。

## common_user_phrases

- 永住者 在留カード 2か月前
- 在留カード 有効期間 更新 いつから
- 16歳 在留カード 6か月前
- 永住卡 到期 两个月前
- 在留卡有效期 什么时候更新
- 高度専門職2号 カード更新 2か月前
- 在留カード 期限切れ いつ申請

## must_say

- 永住者・高度専門職2号は満了日の2か月前から満了日まで。
- 16歳到達前の対象者は満了日の6か月前から満了日まで。
- 在留期間更新とは別。

## must_not_say

- 永住者の在留資格そのものが更新対象だと言う。
- 普通の就労資格更新の3か月前ルールと混同する。

## qa_cases

### QA-1

**user**: 永住カードはいつから更新できますか？

**must_have**:

- 満了日の2か月前から
- 在留カード有効期間更新

**must_not_have**:

- 在留資格更新

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-092 |
