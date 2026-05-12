---
fact_id: legal-status-table1-sections3-4-nonwork-activity
title: 別表第一三・四の表 — 非就労資格カテゴリ
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
citation_label: "別表第一三・四の表（非就労資格）"
citation_summary: "文化活動・短期滞在・留学・研修・家族滞在などが非就労資格カテゴリとして整理されることを確認するカード。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  authority_layer: L1 Law + L4 ISA Page
  legal_source_type: statute_current_text_with_official_status_list
  law_article_ref: "入管法別表第一三の表・四の表"
  source_locator: "在留資格一覧表 三の表・四の表"
  claim_type: category_scope
  applicable_statuses:
    - "文化活動"
    - "短期滞在"
    - "留学"
    - "研修"
    - "家族滞在"
  application_type:
    - all
  exclusion_scope:
    - "資格外活動許可の具体条件"
    - "短期滞在の遠隔業務などの境界事例"
    - "留学・家族滞在の個別就労可否"
  deep_water_candidate: false
applies_when:
  - "ユーザーが留学・家族滞在・短期滞在などの就労可否を質問している"
does_not_cover:
  - "資格外活動許可の時間制限"
  - "卒業後や扶養関係変更後の在留リスク"
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
  - "別表第一三の表・四の表の非就労資格カテゴリ"
direct_fact_fields:
  - table1_sections3_4_nonwork_category
ai_inferred_fields: []
needs_review_flags:
  - id: shikakugai_conditions_out_of_scope
    reason: "留学・家族滞在などの就労可否は資格外活動許可カードへ接続する必要がある。"
evidence_points:
  - claim: "ISA 在留資格一覧表は、文化活動・短期滞在・留学・研修・家族滞在を非就労資格カテゴリとして整理している。"
    source_title: "出入国在留管理庁：在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留資格一覧表 三の表・四の表"
    display_label: "三・四の表の非就労資格"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 別表第一三・四の表 — 非就労資格カテゴリ

## current_date_logic

```text
This card reflects the ISA status list checked on 2026-05-12.
Qualification-outside-activity conditions are intentionally out of scope.
```

## current_effective_fact

ISA 在留資格一覧表は、別表第一三の表と四の表を非就労資格カテゴリとして整理している。三の表には文化活動・短期滞在、四の表には留学・研修・家族滞在が含まれる。

> "三の表"
> source: isa-status-list

> "非就労資格"
> source: isa-status-list

> "四の表"
> source: isa-status-list

## exceptions_or_transition

- This card does not mean every paid activity is absolutely impossible.
- Work questions for 留学 and 家族滞在 must route to qualification-outside-activity cards.

## common_user_phrases

- 留学能打工吗
- 家族滞在可以工作吗
- 短期滞在可以远程工作吗
- 非就劳资格
- 三の表
- 四の表

## must_say

- 三・四の表属于別表第一的非就劳资格类别。
- 涉及收入或报酬活动时，应进一步看资格外活动或其他许可框架。

## must_not_say

- 不要说留学/家族滞在可以自由全职工作。
- 不要说“非就劳”就能直接断定所有副业都违法。

## qa_cases

### QA-1

**user**: 留学签可以全职上班吗？

**must_have**:

- 非就劳资格
- 资格外活动
- 不能直接自由全职

**must_not_have**:

- 身份资格
- 自由工作

### QA-2

**user**: 留学生每周能打工多久？

**must_have**:

- 本卡只定位非就劳类别
- 需要转资格外活动许可规则

**must_not_have**:

- 本卡直接回答小时数
- 全职可以

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

