---
fact_id: ssw1-contract-support-plan-router
title: 特定技能1号 — 雇用契約・受入機関・支援計画は別枠確認
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 4
citation_label: "特定技能1号の契約・支援計画確認"
citation_summary: "特定技能1号では、技能・日本語能力だけでなく、特定技能雇用契約、受入機関、一号特定技能外国人支援計画の適合も別枠で確認される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-072
  authority_layer: L1 Law + L2 Ordinance
  legal_source_type: statute_ordinance_current_text
  law_article_ref: "上陸基準省令 特定技能1号 row opening / 入管法第2条の5"
  source_locator: "特定技能1号 row opening / 入管法第2条の5"
  claim_type: routing_boundary
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "契約・受入機関・支援計画の詳細条件"
    - "登録支援機関の個別判断"
    - "特定技能2号への外挿"
  deep_water_candidate: true
applies_when:
  - "用户问特定技能1号是不是只要技能和日语"
  - "用户问合同、受入机关、支援计划是否还要看"
does_not_cover:
  - "合同条款、支援计划、注册支援机构细则"
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
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "特定技能1号 contract/support-plan routing"
direct_fact_fields:
  - ssw1_contract_accepting_organization_support_plan_route
ai_inferred_fields: []
needs_review_flags:
  - id: article2_5_detail_not_extracted
    reason: "This router does not extract the full Article 2-5 contract/support-plan requirements."
related_fact_cards:
  - ssw1-skill-evaluation-criterion
  - ssw1-japanese-ability-criterion
evidence_points:
  - claim: "特定技能1号 requires separate checks for the specified skilled worker contract, accepting organization, and 1号 support plan framework."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "特定技能1号 row opening"
    display_label: "上陸基準省令 特定技能1号 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 雇用契約・受入機関・支援計画は別枠確認

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

特定技能1号の上陸基準省令 row は、申請人本人の技能・日本語能力等だけでなく、特定技能雇用契約、受入機関、一号特定技能外国人支援計画が入管法第2条の5の枠組みに適合することを別枠で示している。

> "特定技能雇用契約"
> source: egov-landing-criteria-ordinance

> "支援計画"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This is a router card.
- It does not list all contract/support-plan conditions.
- It must not be used to invent support-plan details.

## common_user_phrases

- 特定技能1号 雇用契约 支援计划 路由
- 特定技能只要日语和技能吗
- 受入机关
- 受入機関
- 注册支援机构
- 1号支援计划
- 特定技能合同
- 技能和日语就够吗
- 支援計画

## must_say

- 特定技能1号不只看技能和日语。
- 雇用契约、受入机关、1号支援计划要另查。
- 本卡只路由，不列全部细则。

## must_not_say

- 不要说技能和日语通过即可。
- 不要编造合同、工资、支援人数等细项。
- 不要把1号支援计划要求泛化到所有特定技能类别。

## qa_cases

### QA-1

**user**: 特定技能1号只要日语和技能过了就能拿吗？

**must_have**:

- 合同
- 受入机关
- 支援计划

**must_not_have**:

- 只要日语技能

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-072 |
