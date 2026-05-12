---
fact_id: ssw1-japanese-ability-criterion
title: 特定技能1号 — 日本語能力証明基準
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
citation_label: "特定技能1号の日本語能力基準"
citation_summary: "特定技能1号では、日本での生活に必要な日本語能力及び従事業務に必要な日本語能力が、試験その他の評価方法で証明されることが示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-071
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 特定技能1号 row 1号ニ"
  source_locator: "特定技能1号 row 1号ニ"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "具体日本語試験名"
    - "特定技能2号への外挿"
    - "技能・雇用契約・支援計画"
  deep_water_candidate: true
applies_when:
  - "用户问特定技能1号日语要求"
  - "用户把日语合格当作唯一条件"
does_not_cover:
  - "具体测试名或级别是否足够"
  - "特定技能2号日语问题"
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
  - "特定技能1号 Japanese ability criterion"
direct_fact_fields:
  - ssw1_japanese_ability_evaluation_required
ai_inferred_fields: []
needs_review_flags:
  - id: test_names_not_listed
    reason: "This card does not list JFT/JLPT or field-specific Japanese test names."
related_fact_cards:
  - ssw1-skill-evaluation-criterion
  - ssw2-landing-criteria-differs-from-ssw1
evidence_points:
  - claim: "特定技能1号 requires Japanese ability for life in Japan and for the intended work to be proven by examination or other evaluation methods."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "特定技能1号 row 1号ニ"
    display_label: "上陸基準省令 特定技能1号 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 日本語能力証明基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

特定技能1号では、本邦での生活に必要な日本語能力及び従事しようとする業務に必要な日本語能力を有していることが、試験その他の評価方法により証明されていることが示される。

> "日本語能力"
> source: egov-landing-criteria-ordinance

> "試験その他"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not state specific test names or levels.
- It must not be applied mechanically to 特定技能2号.
- Japanese ability is not the only 特定技能1号 criterion.

## common_user_phrases

- 特定技能1号 日本语能力 基准
- 特定技能1号 日语过了
- 日语过了能拿特定技能吗
- 1号 日语能力
- 生活日语
- 业务日语
- 日本語能力
- JFT JLPT 能不能
- 特定技能日语

## must_say

- 特定技能1号有日语能力证明基准。
- 日语合格不是全部条件。
- 不写具体测试名，分野细则另查。

## must_not_say

- 不要说日语过了就能拿1号。
- 不要把1号日语要求套到2号。
- 不要编具体测试名或级别。

## qa_cases

### QA-1

**user**: 我日语过了，是不是就能申请特定技能1号？

**must_have**:

- 日语只是条件之一
- 还要看技能等

**must_not_have**:

- 日语过了就可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-071 |
