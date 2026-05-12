---
fact_id: technical-intern-training-plan-type-scope
title: 技能実習 — 技能実習計画類型を持つ制度
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 4
citation_label: "技能実習"
citation_summary: "技能実習は技能実習計画の類型に基づく制度であり、技能や特定技能とは別の在留資格群である。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C1-056
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 技能実習"
  source_locator: "技能実習の各項"
  claim_type: activity_scope
  applicable_statuses:
    - "技能実習"
  application_type:
    - current-status
  exclusion_scope:
    - "技能実習から特定技能への转换"
    - "育成就労等制度改正"
  deep_water_candidate: true
applies_when:
  - "用户混同技能、技能実習、特定技能"
does_not_cover:
  - "转换路径或制度改正"
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
  - "技能実習の制度区分"
direct_fact_fields:
  - technical_intern_training_scope
ai_inferred_fields: []
needs_review_flags:
  - id: status_change_path
    reason: "技能実習结束后转特定技能等路径需后续卡。"
evidence_points:
  - claim: "技能実習は技能実習計画類型に基づく資格群である。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 技能実習"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技能実習 — 技能実習計画類型を持つ制度

## current_date_logic

```text
Checked against current e-Gov law text on 2026-05-12.
This card separates 技能実習 from 技能 and 特定技能.
```

## current_effective_fact

技能実習は技能実習計画類型を持つ制度であり、技能資格や特定技能資格と同じものではない。

## exceptions_or_transition

- 技能実習から特定技能への変更、育成就労制度等は別カードで扱う。

## common_user_phrases

- 技能实习
- 技能実習
- 企业单独型
- 团体监理型
- 特定技能区别
- 技能和技能实习一样吗
- 技能实习能换特定技能吗

## must_say

- 技能実習和特定技能、技能资格不是同一制度。

## must_not_say

- 不要把技能实习说成特定技能。
- 不要说合同续了就自动能继续普通工作。

## qa_cases

### QA-1

**user**: 技能实习是不是技能签证？

**must_have**:

- 不同资格
- 技能実習计划

**must_not_have**:

- 一样

### QA-2

**user**: 技能实习能不能换特定技能？

**must_have**:

- 不同制度
- 需另查转换路径

**must_not_have**:

- 自动转换

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-056 |
