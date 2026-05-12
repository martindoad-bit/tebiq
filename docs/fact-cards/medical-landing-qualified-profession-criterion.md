---
fact_id: medical-landing-qualified-profession-criterion
title: 医療 — 医療資格業務の上陸基準
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 5
citation_label: "医療の資格基準"
citation_summary: "医療の上陸基準では、医師、歯科医師、薬剤師、看護師など列挙された医療資格業務、報酬、准看護師や一部職種の追加条件が示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-101B
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 医療 row"
  source_locator: "医療 row"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "医療"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "外国医師・看護師資格の日本での执业可否"
    - "医院行政、翻译、护理辅助"
    - "介護・特定技能介護"
  deep_water_candidate: true
applies_when:
  - "用户问医生、护士、药剂师等是否属于医療在留资格"
  - "用户把医院工作或海外医疗资格当作日本医疗执业许可"
does_not_cover:
  - "日本医疗资格取得、执业注册、具体医疗行为许可"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell + Codex normalization
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
  - "医療 landing criteria"
direct_fact_fields:
  - medical_listed_profession_criterion
  - medical_japanese_comparable_pay
  - medical_assistant_or_admin_not_decided
ai_inferred_fields: []
needs_review_flags:
  - id: medical_license_practice_scope
    reason: "日本医疗资格、执业注册、具体医疗行为是否可做需要专业确认。"
related_fact_cards:
  - medical-qualified-profession-scope
  - nursing-care-landing-care-worker-route
evidence_points:
  - claim: "医療 landing criteria list medical professions such as physician, dentist, pharmacist, public health nurse, midwife, nurse and other listed qualified professions, with remuneration at least equivalent to Japanese comparable work."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "医療 row 1号"
    display_label: "上陸基準省令 医療 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 医療 — 医療資格業務の上陸基準

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

医療の上陸基準省令 row は、医師、歯科医師、薬剤師、保健師、助産師、看護師、准看護師、歯科衛生士、診療放射線技師、理学療法士、作業療法士、視能訓練士、臨床工学技士又は義肢装具士としての業務に従事することを示している。報酬は日本人が従事する場合に受ける報酬と同等額以上であることも示される。

> "医師"
> source: egov-landing-criteria-ordinance

> "同等額以上"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide whether a foreign medical license permits practice in Japan.
- It does not cover hospital administration, interpretation, care assistance, cleaning, or reception jobs.
- It does not replace medical license or practice-scope checks.

## common_user_phrases

- 医療 法定资格
- 外国医生 日本医院 医療资格
- 护士 日本 医療签证
- 海外护士 医療 在留资格
- 医院工作 医療签
- 医院前台 医療资格
- 医疗翻译 医療签
- 医師 歯科医師 看護師
- 医療 上陆基准

## must_say

- 医療在留资格与列举的医疗资格业务强相关。
- 医院录用或海外资格本身不等于日本可执业。
- 医院行政、翻译、护理辅助等不能直接归入医療资格。

## must_not_say

- 不要说医院录用即可从事医疗行为。
- 不要把海外医师、护士资格自动视为日本可执业。
- 不要混同医療、介護、特定技能介护。

## qa_cases

### QA-1

**user**: 外国医生在日本医院工作，需要看医療资格吗？

**must_have**:

- 医疗资格
- 日本执业另查

**must_not_have**:

- 海外资格即可执业

### QA-2

**user**: 医院前台能办医疗签吗？

**must_have**:

- 医療是资格业务
- 前台不能直接归入

**must_not_have**:

- 医院工作都可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 5; LS-P0C2-101 split |
