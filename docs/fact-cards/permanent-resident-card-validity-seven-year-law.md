---
fact_id: permanent-resident-card-validity-seven-year-law
title: 永住者在留カード — 16歳以上は交付日から7年
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
citation_label: "永住者在留カードの7年有効期間"
citation_summary: "入管法第19条の5は、永住者又は高度専門職2号の在留カード有効期間を、在留カード交付日から起算して7年を経過する日までとしている。これは在留カードの有効期間であり、永住者の在留資格そのものの期間ではない。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: C4-052
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法第19条の5第1項第1号"
  source_locator: "在留カードの有効期間"
  claim_type: card_validity
  applicable_statuses:
    - "permanent_resident"
    - "highly_skilled_professional_2"
  application_type:
    - resident_card_validity_renewal
  exclusion_scope:
    - "在留資格そのものの有効期間"
    - "特別永住者証明書"
  deep_water_candidate: false
applies_when:
  - "用户问永住者在留卡几年、是不是7年、是不是永住本体更新"
does_not_cover:
  - "在留カード期限切れ后的个别处理"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住者
  - 高度専門職2号
direct_fact_fields:
  - permanent_resident_card_validity_seven_year_law
ai_inferred_fields: []
needs_review_flags:
  - id: expired_card_handling_not_covered
    reason: "期限切れ後の対応、罰則、実務上の支障は別カードで確認する。"
evidence_points:
  - claim: "入管法第19条の5は、永住者又は高度専門職2号の在留カード有効期間を、在留カード交付日から起算して7年を経過する日までとしている。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第19条の5第1項第1号"
    display_label: "永住者在留カード：16歳以上は7年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住者在留カード — 16歳以上は交付日から7年

## current_date_logic

Checked against current law text on 2026-05-12.

## current_effective_fact

入管法第19条の5は、永住者又は高度専門職2号の在留カード有効期間を、在留カード交付日から起算して7年を経過する日までとしている。これは在留カードの有効期間であり、永住者の在留資格そのものの期間ではない。

## exceptions_or_transition

- 16歳未満の永住者は別規則。
- 特別永住者証明書は別制度。

## common_user_phrases

- 永住者 在留カード 7年
- 永住カード 有効期限
- 永住 在留カード 何年
- permanent resident card Japan 7 years
- 永住卡几年更新
- 高度専門職2号 在留カード 7年

## must_say

- 16歳以上の永住者の在留カード有効期間は7年。
- これはカードの期限であり、永住資格本体の在留期間ではない。

## must_not_say

- 永住資格が7年で切れる。
- 永住者は在留カード更新が不要。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-052 |
