---
fact_id: cultural-activities-non-remunerated-research-scope
title: 文化活動 — 無報酬の研究・修得活動
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
citation_label: "文化活動"
citation_summary: "文化活動は、収入を伴わない学術・芸術活動又は日本特有文化・技芸の研究・修得活動である。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C1-057
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一三の表 文化活動"
  source_locator: "文化活動の項"
  claim_type: activity_scope
  applicable_statuses:
    - "文化活動"
  application_type:
    - current-status
  exclusion_scope:
    - "资格外活动许可可能性"
    - "奖学金、研究资助、谢礼、报酬边界"
  deep_water_candidate: true
applies_when:
  - "用户询问文化活动能否卖作品、收费教学、打工"
does_not_cover:
  - "收入/谢礼/资助的具体判断"
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
  - "文化活動の活動範囲"
direct_fact_fields:
  - cultural_activities_scope
ai_inferred_fields: []
needs_review_flags:
  - id: remuneration_boundary
    reason: "卖作品、授课、谢礼、奖学金/资助与报酬边界需确认。"
evidence_points:
  - claim: "文化活動は収入を伴わない学術・芸術活動等を対象とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一三の表 文化活動"
    display_label: "入管法別表第一三の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 文化活動 — 無報酬の研究・修得活動

## current_date_logic

```text
Checked against current e-Gov law text on 2026-05-12.
This is a non-remunerated activity boundary card.
```

## current_effective_fact

文化活動は、収入を伴わない学術・芸術活動又は日本特有文化・技芸の研究・修得活動を対象とする。

## exceptions_or_transition

- 売上、謝礼、授業料、研究資金、奨学金等は別途確認が必要。

## common_user_phrases

- 文化活动
- 无收入
- 茶道
- 武道
- 艺术研究
- 文化活動
- 文化活动能打工吗
- 收费教课
- 卖作品赚钱

## must_say

- 文化活動的核心是不伴随收入。
- 报酬活动需要另行确认。

## must_not_say

- 不要说文化活動可以自由收费授课。
- 不要直接判断卖作品收入一定可或不可。

## qa_cases

### QA-1

**user**: 文化活动签可以收费教课吗？

**must_have**:

- 无收入活动
- 报酬需另行确认

**must_not_have**:

- 自由收费

### QA-2

**user**: 学日本传统文化是什么签？

**must_have**:

- 文化活動
- 日本特有文化技艺

**must_not_have**:

- 留学一定适用

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-057 |
