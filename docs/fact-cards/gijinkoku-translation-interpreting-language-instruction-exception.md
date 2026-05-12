---
fact_id: gijinkoku-translation-interpreting-language-instruction-exception
title: 技人国 — 翻訳・通訳・語学指導の三年経験例外
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
citation_label: "国際業務の三年経験例外"
citation_summary: "大学卒業者が翻訳、通訳又は語学の指導に従事する場合、三年以上実務経験要件の例外が示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-015
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 技術・人文知識・国際業務 row 2号ロただし書"
  source_locator: "技人国 row 2号ロただし書"
  claim_type: exception_scope
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "全ての国際業務への例外拡張"
    - "大学卒業要件の省略"
    - "許可保証"
  deep_water_candidate: false
applies_when:
  - "用户问大学毕业做翻译/通译/语学指导是否需要三年经验"
does_not_cover:
  - "其他国际业务是否可免三年经验"
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
  - "技人国 translation/interpreting/language-instruction exception"
direct_fact_fields:
  - gijinkoku_translation_interpreting_language_instruction_exception
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "University graduates doing translation, interpreting, or language instruction are excepted from the three-year practical-experience requirement."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技人国 row 2号ロただし書"
    display_label: "上陸基準省令 技人国 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技人国 — 翻訳・通訳・語学指導の三年経験例外

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

大学を卒業した者が翻訳、通訳又は語学の指導に係る業務に従事する場合、国際業務の三年以上実務経験要件の例外が示されている。

> "大学を卒業した者"
> source: egov-landing-criteria-ordinance

> "翻訳、通訳又は語学の指導"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This exception must not be expanded to all international-services work.
- This card does not decide approval.

## common_user_phrases

- 翻译需要经验吗
- 通译
- 语学指导
- 大学毕业例外
- 翻译3年经验
- 口译经验
- 语言老师经验

## must_say

- 大学毕业者做翻译、通译或语学指导时，有三年经验要求的例外。
- 例外范围不能扩到所有国际业务。

## must_not_say

- 不要说所有国际业务都免三年经验。
- 不要省略大学毕业条件。

## qa_cases

### QA-1

**user**: 大学毕业做翻译要3年经验吗？

**must_have**:

- 大学毕业例外
- 翻译/通译/语学指导

**must_not_have**:

- 所有岗位都免

### QA-2

**user**: 广报也免3年经验吗？

**must_have**:

- 例外限翻译通译语学指导

**must_not_have**:

- 广报也当然免

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-015 |
