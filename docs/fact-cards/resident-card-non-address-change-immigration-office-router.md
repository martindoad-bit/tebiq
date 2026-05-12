---
fact_id: resident-card-non-address-change-immigration-office-router
title: 在留カード記載事項変更 — 届出先は地方出入国在留管理官署
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "住所以外の在留カード記載事項変更は地方入管へ"
citation_summary: "ISA は、住居地以外の在留カード記載事項変更届出の届出先を、住居地を管轄する地方出入国在留管理官署としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-083
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の10"
  source_locator: "届出先"
  claim_type: procedure_router
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - notification
  exclusion_scope:
    - "住居地変更届出"
  deep_water_candidate: false
applies_when:
  - "用户问在留卡姓名、国籍等变更去哪里办"
does_not_cover:
  - "住所变更去市区町村窗口的手续"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-non-address-change
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html
    title: 住居地以外の在留カード記載事項の変更届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - resident_card_non_address_change_immigration_office
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA lists the destination as the regional immigration services bureau with jurisdiction over the residence."
    source_title: "住居地以外の在留カード記載事項の変更届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出先"
    display_label: "届出先：住居地を管轄する地方入管"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード記載事項変更 — 届出先は地方出入国在留管理官署

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

住居地以外の在留カード記載事項変更届出の届出先は、住居地を管轄する地方出入国在留管理官署。

## exceptions_or_transition

- 住居地変更は市区町村の担当窓口が届出先。
- 手数料はかからない。

## common_user_phrases

- 在留カード 氏名変更 どこで
- 在留カード 国籍変更 入管
- 在留カード 記載事項変更 入管
- 在留卡 姓名变更 去哪里
- 在留卡 国籍变更 入管
- 住所以外 在留カード 変更 入管

## must_say

- 届出先は住居地を管轄する地方入管。
- 住所変更とは窓口が違う。

## must_not_say

- 氏名や国籍変更も市区町村だけで完了すると案内する。

## qa_cases

### QA-1

**user**: 在留カードの名前変更は区役所ですか？

**must_have**:

- 住所以外の記載事項変更は地方入管
- 住所変更とは別

**must_not_have**:

- 区役所だけで完了

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-083 |
