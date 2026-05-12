---
fact_id: j-skip-expanded-benefits-certificate
title: "J-Skip — 拡充優遇措置と証明書・在留カード記載"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 1
citation_label: "J-Skip: 拡充優遇"
citation_summary: "ISA は、特別高度人材として認められた場合、特別高度人材証明書が交付され、在留カード裏面欄外に特別高度人材と記載されると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-012
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "J-Skip 優遇措置"
  source_locator: "出入国在留管理上の優遇措置の内容"
  claim_type: benefit_source_anchor
  applicable_statuses:
    - "高度専門職"
  application_type:
    - current-status
  exclusion_scope:
    - "個別優遇措置の利用条件"
    - "証明書の取得手続判断"
    - "家族・家事使用人の個別申請判断"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip の優遇措置や証明書を聞く相談"
direct_fact_fields:
  - j_skip_expanded_benefits_certificate
ai_inferred_fields: []
needs_review_flags:
  - id: j_skip_benefit_condition_review
    reason: "個別優遇措置の利用条件、家族・家事使用人の申請は別途確認が必要。"
evidence_points:
  - claim: "ISA は、特別高度人材として認められた場合、特別高度人材証明書が交付され、在留カード裏面欄外に特別高度人材と記載されると説明している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "出入国在留管理上の優遇措置の内容"
    display_label: "J-Skip: 拡充優遇"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip — 拡充優遇措置と証明書・在留カード記載

## current_date_logic

Checked against the ISA J-Skip page on 2026-05-12.

## current_effective_fact

ISA は、特別高度人材として認められた場合、特別高度人材証明書が交付され、在留カード裏面欄外に特別高度人材と記載されると説明している。

## exceptions_or_transition

- このカードは、個別優遇措置の利用条件や家族・家事使用人の申請可否を判断しない。

## common_user_phrases

- J-Skip 証明書
- 特別高度人材証明書
- 在留カード 特別高度人材
- J-Skip 優遇措置
- 特別高度人材 メリット
- J-Skip 配偶者 家事使用人

## must_say

- 特別高度人材として認められた場合の証明書と在留カード記載を確認する。
- 個別優遇措置は条件を分けて確認する。

## must_not_say

- J-Skip なら家族・家事使用人の申請が必ず通る。
- 証明書があれば全ての就労や家族滞在が自由になる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-012 |
