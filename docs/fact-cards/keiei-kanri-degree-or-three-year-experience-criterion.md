---
fact_id: keiei-kanri-degree-or-three-year-experience-criterion
title: 経営・管理 — 学位又は3年以上経験基準
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
citation_label: "経営管理の学位・経験基準"
citation_summary: "経営・管理の改正後基準では、経営管理関連又は事業に必要な分野の博士・修士・専門職学位、または3年以上の経営・管理経験が示される。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-035
  authority_layer: L2 Ordinance + L4 ISA Amendment Page
  legal_source_type: ordinance_current_text_plus_official_amendment_page
  law_article_ref: "上陸基準省令 経営・管理 row 4号"
  source_locator: "経営・管理 row 4号 / ISA 改正ページ Q5"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "経営・管理"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "学位分野の個別該当性"
    - "経験年数の個別算定"
    - "既存保持者更新の過渡措置判断"
  deep_water_candidate: true
applies_when:
  - "用户问经营管理是否需要学历"
  - "用户问没有硕士但有经营经验能不能申请经管"
does_not_cover:
  - "具体学历是否属于相关领域"
  - "具体经历能否算入3年"
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
  - "経営・管理 landing/change applicant capability criterion"
direct_fact_fields:
  - keiei_kanri_degree_or_three_year_experience
ai_inferred_fields: []
needs_review_flags:
  - id: experience_count_boundary
    reason: "This card does not decide whether a concrete career record counts as management/administration experience."
related_fact_cards:
  - keiei-kanri-2025-10
  - keiei-kanri-existing-holder-update
evidence_points:
  - claim: "The amended criterion includes either a relevant doctoral/master/professional degree or at least three years' experience in business management or administration."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "経営・管理 row 4号"
    display_label: "上陸基準省令 経営・管理 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 経営・管理 — 学位又は3年以上経験基準

## current_date_logic

```text
Checked against e-Gov current law text and ISA amendment page on 2026-05-12.
```

## current_effective_fact

経営・管理の改正後基準では、経営管理に関する分野又は申請事業に必要な技術・知識に係る分野の博士、修士、専門職学位、または事業の経営又は管理について三年以上の経験が示されている。

> "博士の学位"
> source: egov-landing-criteria-ordinance

> "三年以上の経験"
> source: egov-landing-criteria-ordinance

ISA の改正ページも、申請者の学歴又は職歴の基準として説明している。

> "学歴又は職歴"
> source: isa-business-manager-2025-amendment

## exceptions_or_transition

- This card does not decide whether a specific degree field is related.
- This card does not decide how a concrete work-history period is counted.
- Existing-holder renewal transition questions should route separately.

## common_user_phrases

- 经管需要硕士吗
- 经营管理需要学历吗
- 经管三年经验
- 经营经验
- 管理经验
- 没有硕士能不能办经管
- 经管 MBA
- 学位或3年经验
- 没有相关学位
- 普通打工经验
- 经营管理经验3年
- 博士
- 修士
- 专门职学位
- 3年以上

## must_say

- 改正后经管有学位或三年以上经营管理经验路线。
- 不是普通工作经验都自动算。
- 既存持有人更新过渡期另看。

## must_not_say

- 不要说没有硕士就绝对不能。
- 不要说任意三年工作经验都可以。
- 不要保证个案经历会被认可。

## qa_cases

### QA-1

**user**: 没有硕士，但是做过三年公司经营，可以办经管吗？

**must_have**:

- 三年以上经营或管理经验路线
- 个案经历需确认

**must_not_have**:

- 没硕士绝对不行

### QA-2

**user**: 普通上班三年算经管经验吗？

**must_have**:

- 经营或管理经验
- 不能直接判断

**must_not_have**:

- 任意工作三年都算

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 2; LS-P0C2-035 |
