---
fact_id: skilled-labor-foreign-cuisine-ten-year-route
title: 技能 — 外国料理等の10年以上実務経験ルート
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
citation_label: "技能の外国料理10年経験ルート"
citation_summary: "技能の外国料理等ルートでは、外国で考案され日本で特殊な料理調理又は食品製造に係る技能について、原則10年以上の実務経験が示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-091
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 技能 row 1号イ"
  source_locator: "技能 row 1号イ"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "技能"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "全技能職種への10年条件の外挿"
    - "泰日EPA例外の最終判断"
    - "調理経験の個別算定"
  deep_water_candidate: true
applies_when:
  - "用户问外国料理厨师技能签经验年数"
  - "用户问餐饮经验能否走技能"
does_not_cover:
  - "泰日 EPA 例外最终判断"
  - "具体经历是否能计入10年"
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
  - "技能 foreign cuisine/cook experience route"
direct_fact_fields:
  - skilled_labor_foreign_cuisine_ten_year_experience
ai_inferred_fields: []
needs_review_flags:
  - id: epa_exception_not_decided
    reason: "The Thailand-Japan EPA exception is noted in the row but not productized by this card."
  - id: experience_count_not_decided
    reason: "This card does not decide how a concrete applicant's experience is counted."
related_fact_cards:
  - skilled-labor-occupation-specific-criteria
evidence_points:
  - claim: "The foreign cuisine/food-manufacturing skilled-labor route generally requires at least 10 years' practical experience, including relevant education period."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技能 row 1号イ"
    display_label: "上陸基準省令 技能 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 技能 — 外国料理等の10年以上実務経験ルート

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

技能の外国料理・食品製造に係る技能ルートでは、外国において考案され日本において特殊なものを要する業務について、原則として十年以上の実務経験が示される。この実務経験には、外国の教育機関で当該料理や食品製造に係る科目を専攻した期間を含むとされている。

> "十年以上"
> source: egov-landing-criteria-ordinance

> "教育機関"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card is for the foreign cuisine/food-manufacturing route, not all 技能 occupations.
- Thailand-Japan EPA exception is present in the row but not decided by this card.
- This card does not count an applicant's concrete experience.

## common_user_phrases

- 技能签 厨师 10年经验 外国料理
- 外国料理厨师 技能签
- 厨师办技能签要几年经验
- 做饭经验 技能
- 餐厅打工能办技能吗
- 料理の調理
- 十年以上実務経験
- 外国料理 10年
- 外国料理10年

## must_say

- 外国料理等路线原则上看10年以上实务经验。
- 教育机构相关学习期间可被 row 提及。
- 不要把这条泛化到所有技能职业。

## must_not_say

- 不要说会做菜就行。
- 不要说6年经验一定可以。
- 不要把泰日 EPA 例外泛化。

## qa_cases

### QA-1

**user**: 我做外国料理厨师6年，可以申请技能签证吗？

**must_have**:

- 原则10年以上
- 具体经历需确认

**must_not_have**:

- 6年一定可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-091 |
