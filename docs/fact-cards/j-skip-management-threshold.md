---
fact_id: j-skip-management-threshold
title: "J-Skip — 経営・管理活動の実務経験と年収基準"
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
citation_label: "J-Skip: 経営・管理"
citation_summary: "ISA は J-Skip の高度経営・管理活動について、事業の経営又は管理に係る実務経験5年以上かつ年収4000万円以上を要件として案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-011
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "J-Skip 高度経営・管理活動"
  source_locator: "要件"
  claim_type: eligibility_criterion_anchor
  applicable_statuses:
    - "高度専門職1号ハ"
    - "経営・管理"
  application_type:
    - status_identification
  exclusion_scope:
    - "経営経験の実質判断"
    - "予定年収の算定判断"
    - "経営・管理在留資格との比較判断"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip の経営・管理系条件を聞く相談"
direct_fact_fields:
  - j_skip_management_threshold
ai_inferred_fields: []
needs_review_flags:
  - id: j_skip_management_experience_income_review
    reason: "経営管理経験、予定年収、活動類型の該当性は個別確認が必要。"
evidence_points:
  - claim: "ISA は J-Skip の高度経営・管理活動について、事業の経営又は管理に係る実務経験5年以上かつ年収4000万円以上を要件として案内している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "要件"
    display_label: "J-Skip: 経営・管理"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip — 経営・管理活動の実務経験と年収基準

## current_date_logic

Checked against the ISA J-Skip page on 2026-05-12.

## current_effective_fact

ISA は J-Skip の高度経営・管理活動について、事業の経営又は管理に係る実務経験5年以上かつ年収4000万円以上を要件として案内している。

## exceptions_or_transition

- このカードは、経営経験の実質、予定年収、経営・管理在留資格との関係を判断しない。

## common_user_phrases

- J-Skip 経営管理 年収4000万
- J-Skip 経営経験5年
- 特別高度人材 経営者
- J-Skip 1号ハ 条件
- J-Skip 管理職 年収
- J-Skip 4000万円

## must_say

- 経営・管理系 J-Skip は経営管理経験5年以上と年収4000万円以上を確認する。
- 経営・管理在留資格そのものとは分けて確認する。

## must_not_say

- 会社経営者なら誰でも J-Skip に当たる。
- 資本金要件だけで J-Skip が決まる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-011 |
