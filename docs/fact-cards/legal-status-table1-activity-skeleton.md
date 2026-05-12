---
fact_id: legal-status-table1-activity-skeleton
title: 入管法別表第一 — 活動資格の骨格
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 1
citation_label: "入管法別表第一（活動資格）"
citation_summary: "入管法別表第一の在留資格は、各資格ごとに日本で行うことができる活動を定める活動資格の骨格であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法第二条の二第2項 / 別表第一"
  source_locator: "別表第一の上欄・下欄"
  claim_type: qualification_distinction
  applicable_statuses:
    - "別表第一全体"
  application_type:
    - all
  exclusion_scope:
    - "各資格の具体的な上陸基準"
    - "個別申請の許可可能性"
    - "別表第一資格が自由就労できるという判断"
  deep_water_candidate: false
applies_when:
  - "ユーザーが在留資格で何ができるかを質問している"
  - "活動資格と身分資格の切り分けが必要"
does_not_cover:
  - "各資格の具体的な活動範囲の詳細"
  - "上陸基準省令の具体条件"
  - "在留期間や許可可能性"
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
  - "別表第一の活動資格"
direct_fact_fields:
  - table1_activity_skeleton
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "入管法別表第一は、上欄の在留資格に対応して下欄の活動を定める活動資格の骨格である。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "第二条の二第2項・別表第一"
    display_label: "入管法別表第一"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 入管法別表第一 — 活動資格の骨格

## current_date_logic

```text
This card reflects the e-Gov current law text and ISA status list checked on 2026-05-12.
The exact latest effective date remains tracked at source-registry level.
```

## current_effective_fact

入管法別表第一に掲げられる在留資格は、各資格ごとに日本で行うことができる活動を定める活動資格の骨格である。

> "別表第一の上欄"
> source: egov-immigration-act

> "下欄に掲げる活動"
> source: egov-immigration-act

ISA 在留資格一覧表でも、別表第一側は「活動資格」として整理されている。

> "活動資格"
> source: isa-status-list

## exceptions_or_transition

- This card does not state specific landing criteria.
- This card does not imply that all 別表第一 statuses allow free work.

## common_user_phrases

- 活动资格是什么意思
- 工作签能做什么
- 签证活动范围
- 这个在留资格能做哪些工作
- 別表第一
- 活動資格

## must_say

- 別表第一的核心是活动范围。
- 回答前应确认用户当前在留资格属于活动资格还是身份资格。

## must_not_say

- 不要说別表第一资格没有活动限制。
- 不要把材料清单或在留期间当作活动范围。
- 不要判断个案是否能获批。

## qa_cases

### QA-1

**user**: 技人国能不能开店经营？

**must_have**:

- 別表第一
- 活动范围
- 需要看是否属于该资格活动

**must_not_have**:

- 只要有在留卡就可以
- 一定可以

### QA-2

**user**: 工作签是不是想换什么工作都行？

**must_have**:

- 活动资格
- 对应活动范围

**must_not_have**:

- 没有限制
- 等同永住

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 1 |

