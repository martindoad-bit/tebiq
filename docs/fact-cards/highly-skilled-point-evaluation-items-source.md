---
fact_id: highly-skilled-point-evaluation-items-source
title: "高度人材ポイント制 — 評価項目・配点の確認入口"
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
citation_label: "高度人材ポイント: 評価項目"
citation_summary: "ISA はポイント評価について、学歴・職歴・年収・研究実績などの項目ごとにポイントを設定し、活動類型に対応するポイント計算による評価を実施すると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-003
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "ポイント評価の仕組み"
  source_locator: "ポイント評価の仕組みは？"
  claim_type: scoring_source_anchor
  applicable_statuses:
    - "高度専門職"
  application_type:
    - status_identification
  exclusion_scope:
    - "個別点数の再計算"
    - "証明資料の充足判断"
    - "許可見込み"
  deep_water_candidate: true
official_sources:
  - id: isa-highly-skilled-point-evaluation
    url: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_evaluate_index.html
    title: ポイント評価の仕組みは？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度人材ポイントの評価項目や配点を聞く相談"
direct_fact_fields:
  - highly_skilled_point_evaluation_items_source
ai_inferred_fields: []
needs_review_flags:
  - id: point_table_evidence_review
    reason: "点数計算表と疎明資料を個別に確認する必要がある。"
evidence_points:
  - claim: "ISA は、学歴・職歴・年収・研究実績などの項目ごとにポイントを設定し、活動類型に対応するポイント計算による評価を実施すると説明している。"
    source_title: "ポイント評価の仕組みは？"
    source_url: "https://www.moj.go.jp/isa/applications/resources/newimmiact_3_evaluate_index.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ポイント評価の仕組みは？"
    display_label: "高度人材ポイント: 評価項目"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度人材ポイント制 — 評価項目・配点の確認入口

## current_date_logic

Checked against the ISA resource page on 2026-05-12.

## current_effective_fact

ISA は、学歴・職歴・年収・研究実績などの項目ごとにポイントを設定し、活動類型に対応するポイント計算による評価を実施すると説明している。

## exceptions_or_transition

- このカードは、個別点数を再計算しない。

## common_user_phrases

- 高度人材 ポイント 計算表
- 高度専門職 配点
- 高度人材 学歴 職歴 年収
- 高度人材 研究実績 ポイント
- 高度専門職 点数表
- ポイント評価 高度人材

## must_say

- 評価項目は活動類型に対応して確認する。
- 個別の点数は証明資料と公式計算表で確認する。

## must_not_say

- 年収だけで必ず高度専門職になる。
- 自己申告点だけで許可される。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-003 |
