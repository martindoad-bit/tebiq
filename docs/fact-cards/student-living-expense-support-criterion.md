---
fact_id: student-living-expense-support-criterion
title: 留学 — 生活費用支弁手段の基準
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
citation_label: "留学の生活費支弁基準"
citation_summary: "留学の上陸基準には、日本在留中の生活費を支弁する十分な資産、奨学金その他の手段が含まれる。本人以外が支弁する場合は別扱いとなる。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-051
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 留学 row 2号"
  source_locator: "留学 row 2号"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "留学"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "固定金額・固定收入阈值"
    - "本人资产是否足够的个案判断"
    - "许可保证"
  deep_water_candidate: true
applies_when:
  - "用户问留学是否一定要本人银行余额"
  - "用户问父母或他人支付留学费用是否可行"
does_not_cover:
  - "具体金额是否足够"
  - "经费支弁材料清单"
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
  - "留学 living expense support criterion"
direct_fact_fields:
  - student_living_expense_support_means
  - student_third_party_support_exception
ai_inferred_fields: []
needs_review_flags:
  - id: amount_not_calculated
    reason: "This card does not calculate whether a concrete balance or sponsor income is sufficient."
related_fact_cards:
  - student-landing-education-institution-category
evidence_points:
  - claim: "The 留学 criterion includes sufficient means such as assets, scholarship, or other means to cover living expenses during stay in Japan."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "留学 row 2号"
    display_label: "上陸基準省令 留学 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 留学 — 生活費用支弁手段の基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

留学の上陸基準では、日本に在留する期間中の生活に要する費用を支弁する十分な資産、奨学金その他の手段を有することが示されている。ただし、申請人以外の者が生活費用を支弁する場合は、この限りでないとされている。

> "生活に要する費用"
> source: egov-landing-criteria-ordinance

> "奨学金その他"
> source: egov-landing-criteria-ordinance

> "申請人以外"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not provide a fixed required balance or income threshold.
- It does not decide whether a concrete parent/sponsor's documents are sufficient.
- It does not replace material-checklist guidance.

## common_user_phrases

- 留学 生活费支弁 上陆基准
- 留学 经费支付能力
- 留学资金证明
- 本人银行余额
- 父母收入可以吗
- 父母资助留学
- 奖学金可以吗
- 留学存款多少
- 支弁者
- 生活費用

## must_say

- 留学要看在日期间生活费支弁手段。
- 本人资产、奖学金、其他手段和他人支弁需要区分。
- 本卡不支持固定金额保证。

## must_not_say

- 不要说本人余额达到某金额就一定许可。
- 不要说他人支弁等于本人资产。
- 不要创造固定存款或收入阈值。

## qa_cases

### QA-1

**user**: 申请留学一定要本人银行余额吗？

**must_have**:

- 生活费支弁
- 本人以外支弁的可能性

**must_not_have**:

- 一定要本人余额

### QA-2

**user**: 我本人账户有 300 万日元，是不是一定够？

**must_have**:

- 不给固定金额保证

**must_not_have**:

- 一定够

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 3; LS-P0C2-051 |
