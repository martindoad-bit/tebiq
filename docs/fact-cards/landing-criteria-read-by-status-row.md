---
fact_id: landing-criteria-read-by-status-row
title: 上陸基準省令 — 資格ごとの行で読む
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 1
citation_label: "上陸基準省令の表"
citation_summary: "上陸基準省令の基準は、表の上欄に掲げる活動に応じて下欄を読む構造である。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-004
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令の表"
  source_locator: "表の上欄・下欄"
  claim_type: source_locator
  applicable_statuses:
    - "上陸基準省令に行がある在留資格"
  application_type:
    - landing
  exclusion_scope:
    - "他資格基準の流用"
    - "材料清单"
    - "許可概率"
  deep_water_candidate: false
applies_when:
  - "用户把经管、技人国、留学、家族滞在等基准互相套用"
does_not_cover:
  - "具体 row 的所有条件"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "row-based reading of landing criteria"
direct_fact_fields:
  - landing_criteria_row_based_reading
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "The ordinance table is read by corresponding activity/status row."
    source_title: "出入国管理及び難民認定法第七条第一項第二号の基準を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "表"
    display_label: "上陸基準省令の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 上陸基準省令 — 資格ごとの行で読む

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

上陸基準省令は、表の上欄に掲げる活動に応じて、それぞれ下欄の基準を読む構造である。ある在留資格の基準を、別の在留資格にそのまま流用して判断してはならない。

> "次の表の上欄に掲げる活動に応じ"
> source: egov-landing-criteria-ordinance

> "それぞれ同表の下欄"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This is a source-locator card only.
- It does not restate each row's requirements.

## common_user_phrases

- 哪一行
- 资格对应基准
- row
- 活动对应
- 经管基准能套到技人国吗
- 留学材料能判断家族滞在吗

## must_say

- 省令基准必须按对应资格或活动 row 阅读。
- 不同资格的基准不能随意互相套用。

## must_not_say

- 不要把经管、留学、技人国基准互相套用。
- 不要用材料清单替代 row-based criteria。

## qa_cases

### QA-1

**user**: 经管基准能套到技人国吗？

**must_have**:

- 按资格 row 读取

**must_not_have**:

- 可以直接套用

### QA-2

**user**: 留学材料能判断家族滞在吗？

**must_have**:

- 不同资格不同基准

**must_not_have**:

- 一样处理

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-004 |

