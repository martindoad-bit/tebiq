---
fact_id: keiei-kanri-japanese-language-criterion
title: 経営・管理 — 日本語能力基準
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 2
citation_label: "経営管理の日本語能力基準"
citation_summary: "経営・管理の改正後基準では、申請人又は事業に従事する非常勤以外の者のうち一人が、高度に自立して日本語を理解し使用できる水準以上であることが示される。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-036
  authority_layer: L2 Ordinance + L4 ISA Amendment Page
  legal_source_type: ordinance_current_text_plus_official_amendment_page
  law_article_ref: "上陸基準省令 経営・管理 row 3号"
  source_locator: "経営・管理 row 3号 / ISA 改正ページ Q9-Q10"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "経営・管理"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "B2相当証明資料の個別適格性"
    - "常勤職員の事業規模基準"
    - "既存保持者更新の過渡措置判断"
  deep_water_candidate: true
applies_when:
  - "用户问经管是否需要日语N2"
  - "用户问员工有日语能力能不能满足经管日语要求"
does_not_cover:
  - "具体证书是否等同B2"
  - "该人员是否同时满足常勤人数基准"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-business-manager-2025-amendment
    url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    title: 在留資格「経営・管理」に係る上陸基準省令等の改正について
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "経営・管理 Japanese language criterion"
direct_fact_fields:
  - keiei_kanri_japanese_language_b2_signal
  - applicant_or_non_part_time_business_worker
ai_inferred_fields: []
needs_review_flags:
  - id: japanese_evidence_paths_completeness
    reason: "This card does not exhaustively decide all acceptable proof paths for B2-equivalent Japanese ability."
related_fact_cards:
  - keiei-kanri-2025-10
  - keiei-kanri-existing-holder-update
evidence_points:
  - claim: "The amended criterion requires either the applicant or a non-part-time person engaged in the business to have Japanese ability at or above a highly independent level."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "経営・管理 row 3号"
    display_label: "上陸基準省令 経営・管理 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 経営・管理 — 日本語能力基準

## current_date_logic

```text
Checked against e-Gov current law text and ISA amendment page on 2026-05-12.
```

## current_effective_fact

経営・管理の改正後基準では、申請人又は申請に係る事業に従事する者のうち非常勤でない者のいずれかが、高度に自立して日本語を理解し、使用することができる水準以上の能力を有することが示されている。

> "日本語を理解"
> source: egov-landing-criteria-ordinance

> "非常勤の者を除く"
> source: egov-landing-criteria-ordinance

ISA の改正ページは、B2 相当以上の日本語能力として JLPT N2 以上などを例示している。

> "Ｂ２相当以上"
> source: isa-business-manager-2025-amendment

## exceptions_or_transition

- This card does not decide all acceptable proof documents.
- This card is separate from the full-time employee count criterion.
- Existing-holder renewal transition questions should route separately.

## common_user_phrases

- 经管需要日语吗
- 经管要 N2 吗
- 经管 N2
- JLPT N2
- BJT 400
- B2相当
- 员工有 N2 可以吗
- 员工有 N2
- 本人没有 N2
- 申请人或常勤职员
- 我不会日语能办经管吗
- 日语能力证明
- 日本語能力

## must_say

- 改正后经管有日语能力基准。
- 主体可以是申请人，或相关业务中的非非常勤人员之一。
- 它和常勤人数基准不是同一个问题。

## must_not_say

- 不要说申请人本人一定必须 N2。
- 不要说任何员工有 N2 都一定满足。
- 不要把日语能力证明路径说成已全部列举。

## qa_cases

### QA-1

**user**: 我本人没有 N2，但公司员工有 N2，可以办经管吗？

**must_have**:

- 申请人或相关非非常勤人员之一
- 个案仍需确认

**must_not_have**:

- 本人必须 N2

### QA-2

**user**: 员工有 N2，是不是就满足经管的雇员要求？

**must_have**:

- 日语能力基准和常勤职员人数基准不同

**must_not_have**:

- 混为一谈

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 2; LS-P0C2-036 |
