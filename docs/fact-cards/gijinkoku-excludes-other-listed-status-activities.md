---
fact_id: gijinkoku-excludes-other-listed-status-activities
title: 技人国 — 他の明示資格活動との排除境界
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 4
citation_label: "技人国の排除境界"
citation_summary: "技人国は、経営・管理、教育、企業内転勤、興行など他の明示資格活動を無制限に覆盖しない。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C1-049
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 技術・人文知識・国際業務"
  source_locator: "技術・人文知識・国際業務の除外列挙"
  claim_type: exclusion_scope
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - current-status
  exclusion_scope:
    - "用户是否应变更其他资格"
    - "副业许可"
  deep_water_candidate: true
applies_when:
  - "用户用技人国覆盖经营、教育、医疗、介护、技能、特定技能等活动"
does_not_cover:
  - "具体变更路径"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "技人国と他資格活動の排除"
direct_fact_fields:
  - gijinkoku_excludes_other_status_activities
ai_inferred_fields: []
needs_review_flags:
  - id: status_change_boundary
    reason: "实际活动是否应转其他资格需另行确认。"
evidence_points:
  - claim: "技人国条文 includes exclusions for other listed status activities."
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 技術・人文知識・国際業務"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技人国 — 他の明示資格活動との排除境界

## current_date_logic

```text
Checked against current e-Gov law text on 2026-05-12.
This card prevents overbroad 技人国 matching.
```

## current_effective_fact

技人国は「何でもできる白领签」ではない。実際の活動が経営・管理、教育、医療、介護、技能、特定技能等の別資格に近い場合は，その境界を確認する必要がある。

## exceptions_or_transition

- 本卡不判断是否一定需要变更资格。
- 本卡不处理资格外活动许可。

## common_user_phrases

- 技人国开公司
- 技人国当老师
- 技人国演出
- 技人国经营
- 技人国做医生
- 技人国做介护
- 技人国做厨师
- 除外活動

## must_say

- 如果实际活动更接近其他明确资格，需要转入相应资格范围确认。

## must_not_say

- 不要说技人国覆盖所有白领、经营、教育、医疗或技能活动。

## qa_cases

### QA-1

**user**: 技人国能直接经营公司吗？

**must_have**:

- 经营管理活动需另行确认

**must_not_have**:

- 可以直接经营

### QA-2

**user**: 技人国能做学校老师吗？

**must_have**:

- 教育资格活动需区分

**must_not_have**:

- 技人国都可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-049 |
