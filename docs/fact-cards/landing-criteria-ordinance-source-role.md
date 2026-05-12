---
fact_id: landing-criteria-ordinance-source-role
title: 上陸基準省令 — 上陸基準レイヤーの位置づけ
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 1
citation_label: "上陸基準省令"
citation_summary: "上陸基準省令は、入管法第7条第1項第2号の基準を定める法源レイヤーである。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-001
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "出入国管理及び難民認定法第七条第一項第二号の基準を定める省令"
  source_locator: "本則・表"
  claim_type: source_role
  applicable_statuses:
    - "上陸基準省令に行がある在留資格"
  application_type:
    - landing
  exclusion_scope:
    - "提出資料チェックリスト"
    - "更新許可の個別判断"
    - "許可確率"
  deep_water_candidate: false
applies_when:
  - "用户询问上陆基准、省令基准、申请资格基准是什么意思"
does_not_cover:
  - "具体在留资格的全部材料"
  - "个案是否会获批"
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
  - "landing criteria source role"
direct_fact_fields:
  - landing_criteria_ordinance_source_role
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "上陸基準省令 is the ordinance layer setting criteria under 入管法第7条第1項第2号."
    source_title: "出入国管理及び難民認定法第七条第一項第二号の基準を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "本則"
    display_label: "上陸基準省令"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 上陸基準省令 — 上陸基準レイヤーの位置づけ

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

上陸基準省令は、入管法第7条第1項第2号に関する基準を定める法源レイヤーである。

> "法第七条第一項第二号の基準"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card only identifies the source layer.
- It does not provide a material checklist or approval prediction.

## common_user_phrases

- 上陆基准
- 上陸基準省令
- landing criteria
- 基准省令
- 第7条1项2号
- 申请资格基准

## must_say

- 上陆基准省令是基准层，不是材料清单。
- 具体要按对应在留资格的 row 阅读。

## must_not_say

- 不要说它等于提交材料清单。
- 不要说符合它就一定获批。

## qa_cases

### QA-1

**user**: 上陆基准是什么？

**must_have**:

- 第7条1项2号
- 基准层

**must_not_have**:

- 材料清单
- 一定获批

### QA-2

**user**: 上陆基准和材料清单是一个东西吗？

**must_have**:

- 不是材料清单
- 法源基准

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-001 |

