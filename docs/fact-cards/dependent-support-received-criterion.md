---
fact_id: dependent-support-received-criterion
title: 家族滞在 — 扶養を受けて在留する基準
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 3
citation_label: "家族滞在の被扶養基準"
citation_summary: "家族滞在の上陸基準は、対象者が扶養者の扶養を受けて在留することを示す。固定収入額や健康保険扶養の基準をそのまま置き換えるものではない。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-061
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 家族滞在 row"
  source_locator: "家族滞在 row"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "家族滞在"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "固定收入阈值"
    - "健康保险扶养标准"
    - "具体扶养能力审查"
  deep_water_candidate: true
applies_when:
  - "用户问家族滞在收入要多少"
  - "用户问被扶养人能否经济独立"
does_not_cover:
  - "具体收入是否足够"
  - "所需材料清单"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "家族滞在 support-received criterion"
direct_fact_fields:
  - dependent_support_received
ai_inferred_fields: []
needs_review_flags:
  - id: no_fixed_income_threshold
    reason: "This card does not provide a public fixed income threshold."
related_fact_cards:
  - dependent-spouse-child-landing-relationship
  - kazoku-taizai-yoken
evidence_points:
  - claim: "The 家族滞在 criterion requires the applicant to stay while receiving support from the qualifying sponsor."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "家族滞在 row"
    display_label: "上陸基準省令 家族滞在 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 家族滞在 — 扶養を受けて在留する基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

家族滞在の上陸基準は、申請人が対象となる在留資格者等の扶養を受けて在留することを示している。これは固定の月収・年収額を公開基準として示すものではなく、健康保険の扶養基準をそのまま置き換えるものでもない。

> "扶養を受けて"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not provide a fixed income amount.
- It does not decide concrete maintenance ability.
- It does not answer health-insurance dependent questions.

## common_user_phrases

- 家族滞在 扶养を受けて 生活费支弁
- 家族滞在收入多少
- 家族滞在年收要求
- 月收入20万可以吗
- 扶养能力
- 被扶养
- 家属签收入
- 健康保险扶养一样吗
- 固定收入门槛

## must_say

- 家族滞在要求被扶养状态。
- 不能从本卡给出固定收入数字。
- 健康保险扶养和在留资格的扶养不能直接混同。

## must_not_say

- 不要创造月收入或年收入固定阈值。
- 不要说只要 sponsor 有收入就必然符合。
- 不要把被扶养人解释成主要经济独立者。

## qa_cases

### QA-1

**user**: 办家族滞在是不是月收入 20 万日元以上就一定可以？

**must_have**:

- 不支持固定阈值
- 被扶养状态

**must_not_have**:

- 20 万一定可以

### QA-2

**user**: 家族滞在的扶养和健康保险扶养一样吗？

**must_have**:

- 不能直接混同

**must_not_have**:

- 完全一样

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 3; LS-P0C2-061 |
