---
fact_id: specified-skilled-worker-2-skilled-scope
title: 特定技能2号 — 指定分野の熟練技能
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
citation_label: "特定技能2号"
citation_summary: "特定技能2号は、指定された特定産業分野で熟練技能を要する業務に従事する活動である。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-055
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 特定技能2号"
  source_locator: "特定技能二号の項"
  claim_type: activity_scope
  applicable_statuses:
    - "特定技能2号"
  application_type:
    - current-status
  exclusion_scope:
    - "可转2号领域、考试、家属申请"
  deep_water_candidate: true
applies_when:
  - "用户询问特定技能1号和2号差别"
does_not_cover:
  - "2号可获批或家属可获批"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "特定技能2号の活動範囲"
direct_fact_fields:
  - specified_skilled_worker_2_scope
ai_inferred_fields: []
needs_review_flags:
  - id: dependent_application
    reason: "家属申请和1号/2号具体带同差异需 DOMAIN review。"
evidence_points:
  - claim: "特定技能2号は指定産業分野の熟練技能を要する業務を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 特定技能2号"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定技能2号 — 指定分野の熟練技能

## current_date_logic

```text
Checked against current e-Gov and ISA status list on 2026-05-12.
This card separates 特定技能2号 from 特定技能1号.
```

## current_effective_fact

特定技能2号は、指定された特定産業分野で熟練技能を要する業務に従事する活動である。1号の「相当程度の知識又は経験」と混同しない。

## exceptions_or_transition

- 家族滞在、分野、考试、转2号可否は別カードで扱う。

## common_user_phrases

- 特定技能2号
- 熟练技能
- 特定技能一号区别
- 特定技能2号家属
- 2号和1号一样吗

## must_say

- 2号核心是熟练技能，和1号不同。

## must_not_say

- 不要把1号和2号家属、期间、范围混同。

## qa_cases

### QA-1

**user**: 特定技能2号是不是和1号一样？

**must_have**:

- 熟练技能
- 与1号不同

**must_not_have**:

- 完全一样

### QA-2

**user**: 特定技能2号能带家属吗？

**must_have**:

- 需连接家族滞在 sponsor 卡

**must_not_have**:

- 本卡直接保证

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-055 |
