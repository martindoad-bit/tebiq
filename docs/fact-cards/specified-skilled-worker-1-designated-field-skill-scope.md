---
fact_id: specified-skilled-worker-1-designated-field-skill-scope
title: 特定技能1号 — 指定分野と相当程度の知識又は経験
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
citation_label: "特定技能1号"
citation_summary: "特定技能1号は、指定された特定産業分野で相当程度の知識又は経験を要する技能業務に従事する活動である。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-054
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 特定技能1号"
  source_locator: "特定技能一号の項"
  claim_type: activity_scope
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - current-status
  exclusion_scope:
    - "分野、考试、支援计划、家属带同"
    - "普通雇佣工作"
  deep_water_candidate: true
applies_when:
  - "用户混同特定技能1号、技能、技能実習、技人国"
does_not_cover:
  - "具体分野和考试"
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
  - "特定技能1号の活動範囲"
direct_fact_fields:
  - specified_skilled_worker_1_scope
ai_inferred_fields: []
needs_review_flags:
  - id: family_accompaniment
    reason: "特定技能1号/2号家属带同需独立 DOMAIN wording。"
evidence_points:
  - claim: "特定技能1号は指定産業分野の相当程度の知識又は経験を要する技能業務を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 特定技能1号"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定技能1号 — 指定分野と相当程度の知識又は経験

## current_date_logic

```text
Checked against current e-Gov and ISA status list on 2026-05-12.
This card separates 特定技能1号 from 技能 and 技能実習.
```

## current_effective_fact

特定技能1号は、指定された特定産業分野で相当程度の知識又は経験を要する技能業務に従事する活動であり、普通の雇用資格や技能実習と同じではない。

## exceptions_or_transition

- 家属带同、分野、考试、支援计划は本カードで判断しない。

## common_user_phrases

- 特定技能1号
- 特定产业分野
- 相当程度
- 14分野
- 技能考试
- 特定技能1号可以做文员吗
- 特定技能1号能带家属吗

## must_say

- 特定技能1号必须回到指定领域和技能业务。

## must_not_say

- 不要说特定技能1号能做任何蓝领工作。
- 不要把特定技能1号和技能实习/技能签混同。

## qa_cases

### QA-1

**user**: 特定技能1号能做办公室文员吗？

**must_have**:

- 指定领域
- 技能业务

**must_not_have**:

- 任何工作都可以

### QA-2

**user**: 特定技能1号能带家族滞在吗？

**must_have**:

- 家族滞在范围另查
- 不能混同2号

**must_not_have**:

- 当然可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-054 |
