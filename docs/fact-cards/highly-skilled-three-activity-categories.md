---
fact_id: highly-skilled-three-activity-categories
title: "高度専門職 — 1号イ・ロ・ハの三つの活動類型"
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
citation_label: "高度専門職: 1号イ・ロ・ハ"
citation_summary: "ISA は高度外国人材の活動を、高度学術研究活動、高度専門・技術活動、高度経営・管理活動の三つに分類している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-002
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "高度専門職1号イ・ロ・ハ"
  source_locator: "高度外国人材が行う3つの活動類型"
  claim_type: activity_category_anchor
  applicable_statuses:
    - "高度専門職"
  application_type:
    - status_identification
  exclusion_scope:
    - "個別職務の分類判断"
    - "経営管理との該当性比較"
    - "点数計算"
  deep_water_candidate: true
official_sources:
  - id: isa-highly-skilled-points-system
    url: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_system_index.html
    title: 高度人材ポイント制とは？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職1号イ・ロ・ハの違いを聞く相談"
direct_fact_fields:
  - highly_skilled_three_activity_categories
ai_inferred_fields: []
needs_review_flags:
  - id: category_fit_individual_review
    reason: "職務内容がイ・ロ・ハのどれに該当するかは個別確認が必要。"
evidence_points:
  - claim: "ISA は高度外国人材の活動を、高度学術研究活動、高度専門・技術活動、高度経営・管理活動の三つに分類している。"
    source_title: "高度人材ポイント制とは？"
    source_url: "https://www.moj.go.jp/isa/applications/resources/newimmiact_3_system_index.html"
    source_organization: "出入国在留管理庁"
    source_locator: "高度外国人材が行う3つの活動類型"
    display_label: "高度専門職: 三つの活動類型"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職 — 1号イ・ロ・ハの三つの活動類型

## current_date_logic

Checked against the ISA resource page on 2026-05-12.

## current_effective_fact

ISA は高度外国人材の活動を、高度学術研究活動、高度専門・技術活動、高度経営・管理活動の三つに分類している。

## exceptions_or_transition

- このカードは、ユーザーの職務がどの類型に入るかを判断しない。

## common_user_phrases

- 高度専門職 1号イ
- 高度専門職 1号ロ
- 高度専門職 1号ハ
- 高度学術研究活動
- 高度専門 技術活動
- 高度経営 管理活動

## must_say

- 高度専門職1号はイ・ロ・ハの活動類型を分けて確認する。
- 職務内容と契約先に基づいて該当類型を確認する。

## must_not_say

- 高度専門職は全員同じ活動類型でよい。
- 経営者も技術者も同じ点数表だけ見ればよい。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-002 |
