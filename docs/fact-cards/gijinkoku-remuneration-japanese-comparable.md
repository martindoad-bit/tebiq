---
fact_id: gijinkoku-remuneration-japanese-comparable
title: 技人国 — 日本人同等額以上の報酬
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 1
citation_label: "技人国の報酬基準"
citation_summary: "技人国では、日本人が同類の業務に従事する場合に受ける報酬と同等額以上であることが基準として示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-016
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 技術・人文知識・国際業務 row 3号"
  source_locator: "技人国 row 3号"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "具体金額の算定"
    - "同類業務比較の個別判断"
    - "許可保証"
  deep_water_candidate: true
applies_when:
  - "用户问技人国工资是否可以低于日本人、低工资是否影响"
does_not_cover:
  - "具体工资金额是否足够"
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
  - "技人国 remuneration criterion"
direct_fact_fields:
  - gijinkoku_remuneration_japanese_comparable
ai_inferred_fields: []
needs_review_flags:
  - id: comparable_amount_not_calculated
    reason: "This card does not calculate comparable remuneration for a concrete job."
evidence_points:
  - claim: "Remuneration must be at least equivalent to what a Japanese person receives for comparable work."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技人国 row 3号"
    display_label: "上陸基準省令 技人国 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 技人国 — 日本人同等額以上の報酬

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

技人国では、日本人が同類の業務に従事する場合に受ける報酬と同等額以上の報酬を受けることが基準として示されている。

> "日本人が従事する場合に受ける報酬と同等額以上"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not calculate a salary threshold.
- It does not compare a specific job's wage table.

## common_user_phrases

- 工资
- 薪资
- 比日本人低
- 报酬
- 同等额以上
- 技人国低工资
- 人文签工资
- 日本人同等

## must_say

- 技人国有日本人同类业务报酬同等额以上的基准。
- 不能只看学历或职位而忽略报酬。

## must_not_say

- 不要说工资多少都无所谓。
- 不要给具体金额保证。

## qa_cases

### QA-1

**user**: 人文签工资比日本人低一点可以吗？

**must_have**:

- 同等额以上

**must_not_have**:

- 没关系

### QA-2

**user**: 技人国只要专业符合就行吗？

**must_have**:

- 报酬条件

**must_not_have**:

- 只要专业

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-016 |

