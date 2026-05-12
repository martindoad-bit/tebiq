---
fact_id: skilled-labor-activity-anchor
title: 技能 — 産業上の特殊な分野に属する熟練技能活動
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 2
citation_label: "入管法別表第一二の表（技能）"
citation_summary: "技能は、産業上の特殊な分野に属する熟練技能を要する業務に従事する活動資格であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-028
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表"
  source_locator: "技能の項"
  claim_type: activity_scope
  applicable_statuses:
    - "技能"
  application_type:
    - current-status
  exclusion_scope:
    - "具体职业、经验年数、行业基准"
    - "技能実習、特定技能との制度转换"
    - "许可概率"
  deep_water_candidate: false
applies_when:
  - "用户询问技能签证的基本活动范围"
  - "用户混同技能、技能実習、特定技能时"
does_not_cover:
  - "厨师、飞行员等具体职业基准"
  - "技能実習或特定技能制度"
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
    quoted_in_card: true
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "技能の活動範囲"
direct_fact_fields:
  - skilled_labor_activity_scope
ai_inferred_fields: []
needs_review_flags:
  - id: skilled_labor_occupation_criteria
    reason: "具体职业是否满足技能签证基准需要后续 L2/L4 source。"
  - id: confusion_with_tokutei_ginou_or_ginou_jisshu
    reason: "技能、技能実習、特定技能必须保持分离。"
evidence_points:
  - claim: "技能は、産業上の特殊な分野に属する熟練技能を要する業務を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 技能"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技能 — 産業上の特殊な分野に属する熟練技能活動

## current_date_logic

```text
This card reflects the e-Gov current law text and ISA status list checked on 2026-05-12.
It separates 技能 from 技能実習 and 特定技能, but does not judge concrete occupation criteria.
```

## current_effective_fact

### 技能 is an activity qualification

技能は入管法別表第一二の表に置かれる活動資格であり、特殊な産業分野に属する熟練技能を要する業務を対象とする。

> "産業上の特殊な分野"
> source: egov-immigration-act

> "熟練した技能を要する業務"
> source: egov-immigration-act

## exceptions_or_transition

- 技能は技能実習や特定技能とは別の在留資格である。
- 厨師など具体職種の要件は上陸基準省令や ISA ページ等の後続カードで扱う。

## common_user_phrases

- 技能
- 技能签证
- 厨师签证
- 熟练技能
- 外国料理厨师
- 技能和特定技能
- 技能实习区别
- 技能実習
- 特定技能

## must_say

- 技能是別表第一二の表の活動資格。
- 技能、技能実習、特定技能是不同资格。
- 具体职业是否符合，需要另看职业基准。

## must_not_say

- 不要把技能签证说成技能实习。
- 不要把技能和特定技能互换使用。
- 不要只凭职业名判断一定符合。

## qa_cases

### QA-1

**user**: 技能签证和特定技能一样吗？

**must_have**:

- 不同在留资格
- 活动范围不同

**must_not_have**:

- 一样
- 可以互换

### QA-2

**user**: 我是厨师一定能办技能签吗？

**must_have**:

- 熟练技能
- 具体基准需另查

**must_not_have**:

- 一定能办
- 只看厨师职位

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 2; canonical LS-P0C1-028 |
