---
fact_id: permanent-resident-card-renewal-no-fee-materials-boundary
title: 永住者在留カード更新 — 手数料なし、永住許可申請書類とは別
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
citation_label: "永住カード更新はカード手続"
citation_summary: "ISA の在留カード有効期間更新ページは、手数料はかからないとし、必要書類として在留カード有効期間更新申請書、写真、旅券提示、現に有する在留カード提示などを案内している。永住許可申請の税・年金・保証人書類とは別手続として扱う。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-056
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留カードの有効期間の更新申請"
  source_locator: "手数料 / 申請書・必要書類等"
  claim_type: materials_boundary
  applicable_statuses:
    - "permanent_resident"
    - "highly_skilled_professional_2"
  application_type:
    - resident_card_validity_renewal
  exclusion_scope:
    - "永住許可申請"
    - "在留期間更新許可申請"
  deep_water_candidate: false
applies_when:
  - "用户问永住卡更新是否要税、年金、保证人、手续费"
does_not_cover:
  - "在留カード期限切れ後の追加資料"
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
  - 永住者の在留カード有効期間更新
direct_fact_fields:
  - permanent_resident_card_renewal_no_fee_materials_boundary
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA の在留カード有効期間更新ページは、手数料はかからないとし、必要書類として在留カード有効期間更新申請書、写真、旅券提示、現に有する在留カード提示などを案内している。永住許可申請の税・年金・保証人書類とは別手続として扱う。"
    source_title: "在留カードの有効期間の更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手数料 / 申請書・必要書類等"
    display_label: "永住カード更新：手数料なし、永住申請とは別"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住者在留カード更新 — 手数料なし、永住許可申請書類とは別

## current_date_logic

Checked against the ISA procedure page on 2026-05-12.

## current_effective_fact

ISA の在留カード有効期間更新ページは、手数料はかからないとし、必要書類として在留カード有効期間更新申請書、写真、旅券提示、現に有する在留カード提示などを案内している。永住許可申請の税・年金・保証人書類とは別手続として扱う。

## exceptions_or_transition

- 代理人・取次者が関わる場合は追加の本人確認・関係疎明資料がある。
- 期限切れ後や旅券を提示できない場合は追加確認が必要。

## common_user_phrases

- 永住カード 更新 手数料
- 永住カード 更新 いくら
- 永住 在留カード 更新 税金 年金
- 永住カード 更新 保証人
- 永住卡更新需要保证人吗
- 永住卡更新需要交钱吗
- 永住者 在留カード更新 手数料

## must_say

- 在留カード更新は永住許可申請とは別。
- 手数料はかからない。

## must_not_say

- 永住カード更新に永住申請と同じ税・年金・保証人書類が必ず必要。
- 永住カード更新は永住再審査そのもの。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-056 |
