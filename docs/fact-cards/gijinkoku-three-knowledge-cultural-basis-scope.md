---
fact_id: gijinkoku-three-knowledge-cultural-basis-scope
title: 技人国 — 自然科学・人文科学・外国文化基盤の三類範囲
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
citation_label: "技人国の三類範囲"
citation_summary: "技人国は自然科学、人文科学、外国文化基盤の思考・感受性を必要とする業務範囲を持つ。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C1-048
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 技術・人文知識・国際業務"
  source_locator: "技術・人文知識・国際業務の項"
  claim_type: activity_scope
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - current-status
  exclusion_scope:
    - "学历、职历、专业关联"
    - "职位名直接判断许可"
  deep_water_candidate: true
applies_when:
  - "用户询问工程师、翻译、销售、市场等是否属于技人国"
does_not_cover:
  - "具体岗位许可可否"
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
  - "技人国の三類活動範囲"
direct_fact_fields:
  - gijinkoku_three_scope
ai_inferred_fields: []
needs_review_flags:
  - id: job_duty_classification
    reason: "销售、翻译、市场、工程师等必须看实际业务内容。"
evidence_points:
  - claim: "技人国 covers natural science, humanities, and foreign-culture-based work categories."
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 技術・人文知識・国際業務"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技人国 — 自然科学・人文科学・外国文化基盤の三類範囲

## current_date_logic

```text
Checked against current e-Gov law text on 2026-05-12.
This card is an activity-scope router, not a job-title answer.
```

## current_effective_fact

技人国は、自然科学、人文科学、外国文化に基盤を有する思考・感受性を必要とする業務という三類範囲で整理される。

## exceptions_or_transition

- 職位名だけで可否は判断しない。
- 学歴、職歴、専攻関連は別カードで扱う。

## common_user_phrases

- 技人国能做销售吗
- 翻译属于人文签吗
- 工程师
- 市场
- 海外业务
- 自然科学
- 人文科学
- 外国文化
- 办公室工作

## must_say

- 要看实际业务是否需要对应知识、技术或外国文化基础能力。
- 职位名不能自动决定。

## must_not_say

- 不要把“办公室工作”一律归入技人国。
- 不要说销售、翻译、工程师这些词本身就足够。

## qa_cases

### QA-1

**user**: 销售岗位能办技人国吗？

**must_have**:

- 实际业务内容
- 专业性/国际性判断

**must_not_have**:

- 销售一定可以

### QA-2

**user**: 工程师一定属于技人国吗？

**must_have**:

- 自然科学知识技术
- 个案确认

**must_not_have**:

- 职位名即可判断

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-048 |
