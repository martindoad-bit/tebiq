---
fact_id: skilled-labor-occupation-specific-criteria
title: 技能 — 職業類型ごとの上陸基準
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
citation_label: "技能の職業類型別基準"
citation_summary: "技能の上陸基準は、外国料理、外国特有建築、製品製造修理、宝石加工など、職業類型ごとに条件が分かれる。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-090
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 技能 row"
  source_locator: "技能 row"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "技能"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "全職業一律経験年数"
    - "特定技能・技能実習との混同"
    - "具体職業類型の個別該当性"
  deep_water_candidate: true
applies_when:
  - "用户问技能签是否只要有技能或经验"
  - "用户问某职业能否走技能"
does_not_cover:
  - "全部技能职业类别逐项拆解"
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
  - "技能 occupation-specific criteria"
direct_fact_fields:
  - skilled_labor_occupation_specific_criteria
ai_inferred_fields: []
needs_review_flags:
  - id: long_tail_occupation_rows_not_exhausted
    reason: "This card is a locator/structure card and does not extract all skilled-labor occupation rows."
related_fact_cards:
  - skilled-labor-activity-anchor
  - skilled-labor-foreign-cuisine-ten-year-route
evidence_points:
  - claim: "技能 has occupation-specific landing criteria and is not a generic category for any skilled or physical work."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技能 row"
    display_label: "上陸基準省令 技能 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 技能 — 職業類型ごとの上陸基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

技能の上陸基準は、料理、外国特有の建築・土木、外国特有の製品製造・修理、宝石・貴金属・毛皮加工など、職業類型ごとに分かれている。したがって、単に「技能がある」「現場経験がある」だけで一律に判断するものではない。

> "次のいずれか"
> source: egov-landing-criteria-ordinance

> "料理"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not extract every occupational row.
- It does not decide whether a concrete job fits a listed occupation.
- It must not be confused with 特定技能 or 技能実習.

## common_user_phrases

- 技能签 职业类别 特殊产业领域
- 技能签 有技能就行吗
- 技能 在留资格
- 现场工作 技能签
- 料理 技能签
- 外国料理
- 技能职业类别
- 技能和特定技能区别
- skilled labor

## must_say

- 技能按职业类别设置不同条件。
- 不是所有有技能、体力或现场工作都能套技能。
- 不要和特定技能、技能实习混同。

## must_not_say

- 不要说有技能就能办技能签。
- 不要把一个职业类别条件套给全部技能。
- 不要把特定技能考试当技能签条件。

## qa_cases

### QA-1

**user**: 我有餐厅工作经验，可以直接办技能签吗？

**must_have**:

- 职业类别
- 不只看有经验

**must_not_have**:

- 有经验就行

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-090 |
