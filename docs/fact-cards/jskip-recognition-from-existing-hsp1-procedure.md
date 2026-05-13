---
fact_id: jskip-recognition-from-existing-hsp1-procedure
title: "J-Skip認定 — 既存高度専門職1号からの手続"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "J-Skip: 既存高度専門職1号"
citation_summary: "ISA は、ポイント制で高度専門職1号として在留中の人が特別高度人材の優遇措置を希望する場合、期限がおおむね3か月以内なら更新時の申出、それ以外は就労資格証明書交付申請で認定すると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-018
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "J-Skip 申請手続"
  source_locator: "申請手続の流れ"
  claim_type: procedure_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "就労資格証明書の個別審査"
    - "期限計算の個別判断"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip認定 — 既存高度専門職1号からの手続を聞く相談"
direct_fact_fields:
  - jskip_recognition_from_existing_hsp1_procedure
ai_inferred_fields: []
needs_review_flags:
  - id: jskip_recognition_from_existing_hsp1_procedure_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、ポイント制で高度専門職1号として在留中の人が特別高度人材の優遇措置を希望する場合、期限がおおむね3か月以内なら更新時の申出、それ以外は就労資格証明書交付申請で認定すると説明している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請手続の流れ"
    display_label: "J-Skip: 既存高度専門職1号"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip認定 — 既存高度専門職1号からの手続

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

既にポイント制の高度専門職1号で在留している人がJ-Skipの優遇措置を希望する場合、在留期限までの期間によって更新時の申出又は就労資格証明書交付申請を確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 普通高度専門職1号 转 J-Skip
- 高度専門職1号 特別高度人材 認定
- J-Skip 就労資格証明書
- J-Skip 在留期限 3か月以内
- ポイント制 高度専門職 J-Skip 優遇
- HSP1 to J-Skip procedure

## must_say

- 既存の高度専門職1号からの認定手続を、変更申請や14日届出と混同しない。

## must_not_say

- 普通の14日届出だけでJ-Skip認定になる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-018 |
