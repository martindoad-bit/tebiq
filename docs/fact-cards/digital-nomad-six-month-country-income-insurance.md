---
fact_id: digital-nomad-six-month-country-income-insurance
title: "デジタルノマド — 6月・対象国・年収・保険要件"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "デジタルノマド要件"
citation_summary: "ISA は、デジタルノマドの在留期間を6月・更新不可とし、対象国・地域、申請時個人年収1000万円以上、滞在予定期間をカバーする医療保険加入などを要件として示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-003
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示53号"
  source_locator: "在留期間 / 対象国・地域 / 必要年収 / その他要件"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "対象国リストの最新該当性"
    - "保険補償内容"
    - "再入国後の再申請可否"
  deep_water_candidate: true
official_sources:
  - id: isa-digital-nomad
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html
    title: 在留資格「特定活動」（デジタルノマド及びその配偶者・子）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "デジタルノマドの期間・国籍・年収・保険要件確認"
direct_fact_fields:
  - digital_nomad_country_income_insurance
ai_inferred_fields: []
needs_review_flags:
  - id: digital_nomad_latest_country_pdf
    reason: "対象国・地域一覧は別添PDFの最新確認が必要。"
evidence_points:
  - claim: "ISA は、デジタルノマドの在留期間を6月・更新不可とし、対象国・地域、年収1000万円以上、滞在予定期間をカバーする医療保険加入を要件として示している。"
    source_title: "在留資格「特定活動」（デジタルノマド及びその配偶者・子）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留期間 / 必要年収 / その他要件"
    display_label: "デジタルノマド: 期間・年収・保険"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# デジタルノマド — 6月・対象国・年収・保険要件

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

デジタルノマドの在留期間は6月で更新不可。対象国・地域、申請時の個人年収1000万円以上、医療保険加入などの要件が示されている。

## exceptions_or_transition

- 対象国・地域一覧は別添PDFの最新確認が必要。
- 在留カード交付対象外と説明されている点も別途案内が必要。

## common_user_phrases

- デジタルノマド 年収 1000万円
- デジタルノマド 6ヶ月 更新
- デジタルノマド 保険
- デジタルノマド 対象国
- 数字游民 年收入 1000万

## must_say

- 期間、対象国、年収、保険はセットで確認する。

## must_not_say

- 6月を自由に更新できると言う。
- 国籍や保険を見ずに使えると判断する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-003 |
