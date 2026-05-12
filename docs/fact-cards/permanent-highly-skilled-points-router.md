---
fact_id: permanent-highly-skilled-points-router
title: 永住許可ガイドライン — 高度人材ポイントの年数例外ルート
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "高度人材ポイントの永住年数例外ルート"
citation_summary: "ISA の永住許可ガイドラインは、高度人材ポイント70点以上の3年ルート、80点以上の1年ルート、特別高度人材に関する1年ルートを示している。これは例外ルートであり、個別の点数計算や許可保証ではない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-009
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "2(6)〜2(8)"
  claim_type: exception_router
  applicable_statuses:
    - "highly_skilled_professional"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "個別のポイント計算"
    - "J-Skip/J-Find 詳細"
  deep_water_candidate: false
applies_when:
  - "用户问高度人才70分、80分永住几年"
does_not_cover:
  - "具体点数计算或高度人才资格取得"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 高度人材ポイントを用いた永住許可申請を検討する外国人
direct_fact_fields:
  - permanent_highly_skilled_points_router
ai_inferred_fields: []
needs_review_flags:
  - id: point_calculation_out_of_scope
    reason: "このカードは点数計算を行わない。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、高度人材ポイント70点以上の3年ルート、80点以上の1年ルート、特別高度人材に関する1年ルートを示している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2(6)〜2(8)"
    display_label: "永住ガイドライン：高度人材ポイント例外ルート"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 高度人材ポイントの年数例外ルート

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、高度人材ポイント70点以上の3年ルート、80点以上の1年ルート、特別高度人材に関する1年ルートを示している。これは例外ルートであり、個別の点数計算や許可保証ではない。

## exceptions_or_transition

- 点数計算、現在資格、対象期間、証明資料は別途確認する。

## common_user_phrases

- 高度人才 70点 永住 3年
- 高度人才 80点 永住 1年
- 高度専門職 永住 1年
- 高度人材 永住 何年
- 永住 ポイント 80
- 特別高度人材 永住

## must_say

- 70点以上の3年ルート、80点以上の1年ルートがある。
- これは例外ルートであり、許可保証ではない。

## must_not_say

- 80点なら自動的に永住できる。
- 本カードだけで点数計算できる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-009 |
