---
fact_id: highly-skilled-points-70-system-purpose
title: "高度人材ポイント制 — 70点基準の制度入口"
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
citation_label: "高度人材ポイント制: 70点"
citation_summary: "ISA は、高度人材ポイント制について、学歴・職歴・年収などの項目ごとの合計が一定点数である70点に達した場合に優遇措置を与える制度として説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-001
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "高度人材ポイント制とは？"
  source_locator: "高度人材ポイント制とは？"
  claim_type: system_source_anchor
  applicable_statuses:
    - "高度専門職"
  application_type:
    - status_identification
  exclusion_scope:
    - "個別ポイント計算"
    - "高度専門職許可見込み"
    - "J-Skip 該当性"
  deep_water_candidate: true
official_sources:
  - id: isa-highly-skilled-points-system
    url: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_system_index.html
    title: 高度人材ポイント制とは？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度人材ポイント制の基本構造を聞く相談"
direct_fact_fields:
  - highly_skilled_points_70_system_purpose
ai_inferred_fields: []
needs_review_flags:
  - id: point_total_individual_calculation
    reason: "点数計算は証明資料と活動区分ごとに確認する必要がある。"
evidence_points:
  - claim: "ISA は高度人材ポイント制を、学歴・職歴・年収などの項目ごとの合計が70点に達した場合に優遇措置を与える制度として説明している。"
    source_title: "高度人材ポイント制とは？"
    source_url: "https://www.moj.go.jp/isa/applications/resources/newimmiact_3_system_index.html"
    source_organization: "出入国在留管理庁"
    source_locator: "高度人材ポイント制とは？"
    display_label: "高度人材ポイント制: 70点"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度人材ポイント制 — 70点基準の制度入口

## current_date_logic

Checked against the ISA resource page on 2026-05-12.

## current_effective_fact

ISA は高度人材ポイント制を、学歴・職歴・年収などの項目ごとの合計が70点に達した場合に優遇措置を与える制度として説明している。

## exceptions_or_transition

- このカードは、個別の点数計算や許可見込みを判断しない。
- J-Skip は別制度として確認する。

## common_user_phrases

- 高度人材ポイント制 70点
- 高度専門職 70点
- 高度人才 70分
- 高度人材 ポイント 何点
- 高度専門職 ポイント制
- 高度人材 点数 足りる

## must_say

- 高度人材ポイント制は70点基準の制度入口として確認する。
- 個別の点数計算は活動区分と証明資料ごとに確認する。

## must_not_say

- 70点なら必ず高度専門職が許可される。
- J-Skip も70点計算で判断する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-001 |
