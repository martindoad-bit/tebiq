---
fact_id: student-activity-anchor
title: 留学 — 日本の教育機関で教育を受ける活動
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
citation_label: "入管法別表第一四の表（留学）"
citation_summary: "留学は、日本の教育機関で教育を受ける活動を対象とする別表第一四の表の活動資格であることを確認するカード。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C1-037
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一四の表"
  source_locator: "留学の項"
  claim_type: activity_scope
  applicable_statuses:
    - "留学"
  application_type:
    - current-status
  exclusion_scope:
    - "出席率、学校类别、经费材料"
    - "毕业后求职或就业转换"
    - "打工上限和资格外活动许可细则"
  deep_water_candidate: true
applies_when:
  - "用户询问留学资格的基本活动范围"
  - "用户把在留卡有效期与毕业后工作可否混同"
does_not_cover:
  - "资格外活动许可"
  - "28小时规则"
  - "毕业、退学、求职、就职转换"
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
  - "留学の活動範囲"
direct_fact_fields:
  - student_activity_scope
ai_inferred_fields: []
needs_review_flags:
  - id: student_work_permission_required
    reason: "留学工作问题必须连接资格外活动许可来源，不能由本活动锚点单独回答。"
  - id: post_graduation_activity_change
    reason: "毕业、退学、求职、就职转换需独立卡处理。"
evidence_points:
  - claim: "留学は、日本の教育機関で教育を受ける活動を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一四の表 留学"
    display_label: "入管法別表第一四の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 留学 — 日本の教育機関で教育を受ける活動

## current_date_logic

```text
This card reflects the e-Gov current law text and ISA status list checked on 2026-05-12.
It is a routing/activity-scope skeleton only.
```

## current_effective_fact

### 留学 is an activity qualification

留学は入管法別表第一四の表に置かれる活動資格であり、日本の大学、学校、専修学校、各種学校等で教育を受ける活動を対象とする。

> "教育を受ける活動"
> source: egov-immigration-act

## exceptions_or_transition

- 打工问题要连接资格外活动许可，不由本卡单独回答。
- 毕业、退学、求职、就职转换是活动基础变化问题，需要独立判断。

## common_user_phrases

- 留学
- 留学签证
- 学生签
- 留学生
- 日本语学校
- 大学留学
- 留学签可以工作吗
- 毕业后还能打工吗
- 留学生打工

## must_say

- 留学的核心活动是受教育。
- 打工、毕业后求职、就业要另看资格外活动或资格变更。
- 在留卡未过期不等于活动基础没有变化。

## must_not_say

- 不要说留学签没过期就可以自由工作。
- 不要说留学生可以自由全职。
- 不要用本卡判断28小时、出席率或续签材料。

## qa_cases

### QA-1

**user**: 留学签是什么活动？

**must_have**:

- 受教育
- 別表第一四の表

**must_not_have**:

- 身份资格
- 自由就业

### QA-2

**user**: 留学生毕业后还能继续打工吗？

**must_have**:

- 毕业后活动基础变化
- 需确认对应资格或许可

**must_not_have**:

- 只要签证没过期就可以
- 自由打工

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 2; canonical LS-P0C1-037 |
