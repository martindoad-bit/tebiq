---
fact_id: permanent-resident-card-renewal-window-procedure
title: 永住者在留カード更新 — 原則は満了2か月前から満了日まで
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 4
citation_label: "永住者カード更新申請期間"
citation_summary: "ISA は、永住者又は高度専門職2号の在留カード有効期間更新について、現に有する在留カードの有効期間満了日の2か月前から満了日までを申請期間としている。これはカード有効期間の更新であり、在留期間更新許可申請ではない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-054
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の11"
  source_locator: "申請期間 1"
  claim_type: procedure_window
  applicable_statuses:
    - "permanent_resident"
    - "highly_skilled_professional_2"
  application_type:
    - resident_card_validity_renewal
  exclusion_scope:
    - "在留期間更新許可申請"
    - "永住許可申請"
  deep_water_candidate: false
applies_when:
  - "用户问永住卡什么时候更新、可以提前多久申请"
does_not_cover:
  - "期限後の处理"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
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
direct_fact_fields:
  - permanent_resident_card_renewal_window_procedure
ai_inferred_fields: []
needs_review_flags:
  - id: after_expiry_handling_review
    reason: "カード期限後の申請、罰則、実務上の影響は別途確認。"
evidence_points:
  - claim: "ISA は、永住者又は高度専門職2号の在留カード有効期間更新について、現に有する在留カードの有効期間満了日の2か月前から満了日までを申請期間としている。"
    source_title: "在留カードの有効期間の更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請期間 1"
    display_label: "永住者カード更新：満了2か月前から満了日まで"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住者在留カード更新 — 原則は満了2か月前から満了日まで

## current_date_logic

Checked against the ISA procedure page on 2026-05-12.

## current_effective_fact

ISA は、永住者又は高度専門職2号の在留カード有効期間更新について、現に有する在留カードの有効期間満了日の2か月前から満了日までを申請期間としている。これはカード有効期間の更新であり、在留期間更新許可申請ではない。

## exceptions_or_transition

- 16歳未満の場合は6か月前ルール。
- 申請期間内の申請が困難と予想される場合は、早期申請の例外がある。

## common_user_phrases

- 永住カード 更新 2ヶ月前
- 永住者 在留カード 更新 いつから
- 永住 在留カード 満了日
- 永住卡提前多久更新
- 高度専門職2号 カード更新
- 在留カード 有効期間 更新

## must_say

- 原則は満了日の2か月前から満了日まで。
- 在留期間更新ではなくカード有効期間更新。

## must_not_say

- 永住の在留資格更新と表現する。
- 永住カード更新に永住許可申請書類が必要と混同する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-054 |
