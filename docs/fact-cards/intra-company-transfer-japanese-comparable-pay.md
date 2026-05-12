---
fact_id: intra-company-transfer-japanese-comparable-pay
title: 企業内転勤 — 日本人同等額以上の報酬
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 4
citation_label: "企業内転勤の報酬基準"
citation_summary: "企業内転勤では、日本人が同等業務に従事する場合に受ける報酬と同等額以上であることが示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-082
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 企業内転勤 row 2号"
  source_locator: "企業内転勤 row 2号"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "企業内転勤"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "具体報酬額の算定"
    - "海外給与体系だけでの判断"
  deep_water_candidate: true
applies_when:
  - "用户问企业内转勤能否按海外工资发薪"
  - "用户问企业内转勤报酬是否要看日本人同等"
does_not_cover:
  - "具体金额是否足够"
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
  - "企業内転勤 remuneration criterion"
direct_fact_fields:
  - intra_company_transfer_japanese_comparable_pay
ai_inferred_fields: []
needs_review_flags:
  - id: comparable_pay_not_calculated
    reason: "This card does not calculate comparable remuneration for a concrete transfer role."
related_fact_cards:
  - intra-company-transfer-gijinkoku-equivalent-work
evidence_points:
  - claim: "企業内転勤 requires remuneration at least equivalent to what a Japanese person receives for comparable work."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "企業内転勤 row 2号"
    display_label: "上陸基準省令 企業内転勤 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 企業内転勤 — 日本人同等額以上の報酬

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

企業内転勤では、日本人が従事する場合に受ける報酬と同等額以上の報酬を受けることが示される。海外側の給与体系や母国水準だけで判断するものではない。

> "同等額以上"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not calculate a concrete salary amount.
- It does not replace work-content or transfer-relationship checks.

## common_user_phrases

- 企业内转勤 报酬 日本人同等
- 海外工资 企业内转勤
- 原国家工资发薪
- 日本人同等报酬
- 企业内转勤工资
- 同等额以上
- 转勤 薪资
- 企業内転勤 報酬

## must_say

- 企业内转勤也有日本人同等额以上报酬基准。
- 不能只按海外工资标准判断。
- 本卡不给具体金额。

## must_not_say

- 不要说报酬无关。
- 不要用母国工资水准替代日本同等报酬。
- 不要创造固定薪资阈值。

## qa_cases

### QA-1

**user**: 公司说按我原国家工资发薪，可以办企业内转勤吗？

**must_have**:

- 日本人同等报酬
- 不只看海外工资

**must_not_have**:

- 海外工资即可

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-082 |
