---
fact_id: keiei-kanri-capital-asset-3000man-criterion
title: 経営・管理 — 3000万円以上の財産規模基準
state: ai_extracted
runtime_bucket: L5_ONLY
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
production_disposition: guardrail_only
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 2
citation_label: "経営管理の3000万円基準"
citation_summary: "経営・管理の改正後基準では、申請に係る事業に用いられる財産の総額が、資本金や出資総額を含めて3000万円以上であることが示される。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-032
  authority_layer: L2 Ordinance + L4 ISA Amendment Page
  legal_source_type: ordinance_current_text_plus_official_amendment_page
  law_article_ref: "上陸基準省令 経営・管理 row 2号ロ"
  source_locator: "経営・管理 row 2号ロ / ISA 改正ページ Q4"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "経営・管理"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "財産評価の個別算定"
    - "既存保持者更新の過渡措置判断"
    - "許可保証"
  deep_water_candidate: true
applies_when:
  - "用户问经营管理现在是否还是500万"
  - "用户问3000万资本金或事业资产要求"
does_not_cover:
  - "具体资产能否计入3000万"
  - "既存持有人过渡期内是否已经必须完全满足"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-business-manager-2025-amendment
    url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    title: 在留資格「経営・管理」に係る上陸基準省令等の改正について
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "経営・管理 landing/change business scale criterion"
direct_fact_fields:
  - keiei_kanri_3000man_business_asset_scale
ai_inferred_fields: []
needs_review_flags:
  - id: asset_calculation_scope
    reason: "This card does not calculate which concrete assets may be counted toward the 3000万円 threshold."
related_fact_cards:
  - keiei-kanri-2025-10
  - keiei-kanri-existing-holder-update
evidence_points:
  - claim: "The amended business scale criterion includes total property used for the business, including capital and total investment, of at least 3000万円."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "経営・管理 row 2号ロ"
    display_label: "上陸基準省令 経営・管理 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## Guardrail-Only Notice — 2026-05-15

This card may be used only to block the outdated claim that ordinary post-2025-10-16 business-manager applications can rely on "500万円 is enough."

It must not be used alone as a positive eligibility answer. FACT audit found that the 3,000万円 criterion must be presented together with the full 2025 reform context, including at least:

- 1名以上常勤職員;
- Japanese ability requirement;
- business/education background requirement;
- expert-reviewed business plan;
- existing-holder and startup-designated-activity transition rules where applicable.

For corporate entities, the 3,000万円 calculation must not be overgeneralized as including wages, office maintenance costs, capital reserves, or retained earnings without source-specific confirmation.

# 経営・管理 — 3000万円以上の財産規模基準

## current_date_logic

```text
Checked against e-Gov current law text and ISA amendment page on 2026-05-12.
```

## current_effective_fact

経営・管理の改正後基準では、申請に係る事業の用に供される財産の総額が、資本金の額及び出資の総額を含めて三千万円以上であることが示されている。

> "三千万円以上"
> source: egov-landing-criteria-ordinance

ISA の改正ページも、3000万円以上の資本金等が必要になると説明している。

> "３，０００万円以上"
> source: isa-business-manager-2025-amendment

## exceptions_or_transition

- This card is for amended landing/change criteria.
- Existing holders' renewal transition questions should route to `keiei-kanri-existing-holder-update`.
- This card does not calculate whether a concrete asset can be counted.

## common_user_phrases

- 经管还是 500 万吗
- 经营管理 3000 万
- 经营管理 3000万
- 经管 3000万
- 资本金 3000 万
- 资本金3000万
- 出资 3000 万
- 事业资产
- 公司资产
- 3000万円
- 500万円
- 经管资本金
- 500万还能新申请
- 新申请还是500万吗
- 3000 万满足了
- 经管材料清单和上陆基准
- 经管 上陆基准 3000万

## must_say

- 改正后经营管理基准包含 3000 万日元以上的事业财产规模。
- 这里不是许可保证，也不是具体资产计算。
- 既存持有人更新要另看过渡措置。

## must_not_say

- 不要说新申请仍只要 500 万即可。
- 不要说有 3000 万就一定许可。
- 不要把过渡期内的既存更新简单说成马上必须凑齐。

## qa_cases

### QA-1

**user**: 现在经营管理还是 500 万就能办吗？

**must_have**:

- 3000 万
- 改正后基准

**must_not_have**:

- 500 万即可

### QA-2

**user**: 我有 3000 万是不是就一定下经管？

**must_have**:

- 不是许可保证
- 还有其他条件

**must_not_have**:

- 一定下签

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 2; LS-P0C2-032 |
