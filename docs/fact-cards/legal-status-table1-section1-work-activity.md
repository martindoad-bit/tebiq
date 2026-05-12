---
fact_id: legal-status-table1-section1-work-activity
title: 別表第一一の表 — 就労資格カテゴリ
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 1
citation_label: "別表第一一の表（就労資格）"
citation_summary: "ISA 在留資格一覧表における別表第一一の表の就労資格カテゴリを確認するカード。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  authority_layer: L4 ISA Page
  legal_source_type: official_status_list_html
  law_article_ref: "入管法別表第一一の表"
  source_locator: "ISA 在留資格一覧表 一の表"
  claim_type: category_scope
  applicable_statuses:
    - "外交"
    - "公用"
    - "教授"
    - "芸術"
    - "宗教"
    - "報道"
  application_type:
    - all
  exclusion_scope:
    - "個別職務が各資格に該当するかの判断"
    - "上陸基準や提出書類"
  deep_water_candidate: false
applies_when:
  - "ユーザーが教授・芸術・宗教・報道などの資格カテゴリを尋ねている"
does_not_cover:
  - "技人国や経営管理など別表第一二の表の資格"
  - "個別活動の該当性判断"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "別表第一一の表の就労資格カテゴリ"
direct_fact_fields:
  - table1_section1_work_category
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA 在留資格一覧表は、外交・公用・教授・芸術・宗教・報道を一の表の就労資格として整理している。"
    source_title: "出入国在留管理庁：在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留資格一覧表 一の表"
    display_label: "一の表の就労資格"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 別表第一一の表 — 就労資格カテゴリ

## current_date_logic

```text
This card reflects the ISA status list checked on 2026-05-12.
```

## current_effective_fact

ISA 在留資格一覧表は、別表第一一の表を就労資格カテゴリとして整理している。

> "一の表"
> source: isa-status-list

> "就労資格"
> source: isa-status-list

## exceptions_or_transition

- This card does not decide whether a specific job fits 教授, 芸術, 宗教, or 報道.

## common_user_phrases

- 教授签属于哪类
- 艺术签能工作吗
- 宗教签是什么
- 报道签证
- 一の表
- 就労資格

## must_say

- 一の表是別表第一下的就劳资格类别之一。
- 具体能做什么仍要看对应资格下栏活动。

## must_not_say

- 不要把一の表等同全部工作签。
- 不要把一の表资格与身份系资格混同。

## qa_cases

### QA-1

**user**: 教授签属于工作签吗？

**must_have**:

- 一の表
- 就劳资格
- 活动范围

**must_not_have**:

- 別表第二
- 身份资格

### QA-2

**user**: 技人国是不是一の表？

**must_have**:

- 技人国不属于一の表
- 需要看二の表

**must_not_have**:

- 一の表
- 身份资格

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

