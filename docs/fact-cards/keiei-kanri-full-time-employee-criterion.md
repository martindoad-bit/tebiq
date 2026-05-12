---
fact_id: keiei-kanri-full-time-employee-criterion
title: 経営・管理 — 常勤職員の事業規模基準
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
citation_label: "経営管理の常勤職員基準"
citation_summary: "経営・管理の改正後基準では、経営又は管理に従事する者以外に、日本に居住する常勤職員が事業に従事していることが事業規模基準に含まれる。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-031
  authority_layer: L2 Ordinance + L4 ISA Amendment Page
  legal_source_type: ordinance_current_text_plus_official_amendment_page
  law_article_ref: "上陸基準省令 経営・管理 row 2号イ"
  source_locator: "経営・管理 row 2号イ / ISA 改正ページ Q2"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "経営・管理"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "既存保持者更新の過渡措置判断"
    - "常勤職員に該当する個別雇用形態判断"
    - "日語能力基準の主体判断"
    - "許可保証"
  deep_water_candidate: true
applies_when:
  - "用户问经营管理是否需要雇员工"
  - "用户问员工身份能不能算经管常勤职员"
does_not_cover:
  - "既存经营管理持有人过渡期内是否必须立即满足"
  - "具体员工是否属于常勤"
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
  - "経営・管理 landing/change business scale criterion"
direct_fact_fields:
  - keiei_kanri_full_time_employee_business_scale
  - table1_statuses_excluded_from_employee_count
ai_inferred_fields: []
needs_review_flags:
  - id: full_time_employee_individual_status
    reason: "This card does not decide whether a concrete worker's employment pattern qualifies as full-time."
related_fact_cards:
  - keiei-kanri-2025-10
  - keiei-kanri-existing-holder-update
evidence_points:
  - claim: "The amended business scale criterion includes full-time staff in Japan other than persons engaged in management or administration."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "経営・管理 row 2号イ"
    display_label: "上陸基準省令 経営・管理 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 経営・管理 — 常勤職員の事業規模基準

## current_date_logic

```text
Checked against e-Gov current law text and ISA amendment page on 2026-05-12.
```

## current_effective_fact

経営・管理の改正後基準では、申請に係る事業の規模について、経営又は管理に従事する者以外に、本邦に居住する常勤職員が事業に従事して営まれることが示されている。

> "常勤の職員"
> source: egov-landing-criteria-ordinance

上陸基準省令上、この常勤職員からは法別表第一の在留資格で在留する者が除かれる。

> "法別表第一"
> source: egov-landing-criteria-ordinance

ISA の改正ページも、原則として一人以上の常勤職員の雇用が必要になると説明している。

> "１人以上"
> source: isa-business-manager-2025-amendment

## exceptions_or_transition

- This card is for the amended landing/change criterion.
- Existing 経営・管理 holders' renewal transition questions should route to `keiei-kanri-existing-holder-update`.
- This card does not decide whether a concrete employment pattern is full-time.
- This card does not decide the separate Japanese-language criterion.

## common_user_phrases

- 经管需要雇员工吗
- 经管 需要雇员工
- 经营管理要几个员工
- 经管常勤职员
- 经管 常勤职员
- 全职员工
- 留学生员工能算吗
- 留学生能不能算常勤
- 留学生员工算经管常勤
- 技人国员工能算吗
- 经管雇一个人
- 经管雇员工
- 常勤职员 范围
- 常勤職員
- １人以上

## must_say

- 改正后经营管理的事业规模基准包含常勤职员要求。
- 该人数基准与日语能力基准里的主体问题不能混为一谈。
- 既存持有人更新过渡期问题要另看过渡卡。

## must_not_say

- 不要说现在只要 500 万，不需要员工。
- 不要把既存持有人过渡期直接说成也必须马上满足。
- 不要把具体员工是否常勤当作本卡可直接判断。

## qa_cases

### QA-1

**user**: 现在经管签还需要雇员工吗？

**must_have**:

- 常勤职员
- 改正后基准

**must_not_have**:

- 只要 500 万

### QA-2

**user**: 我已经有经管签了，明年更新也要马上雇一个人吗？

**must_have**:

- 进入既存持有人过渡期
- 不直接套新申请基准

**must_not_have**:

- 马上一定必须

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 2; LS-P0C2-031 |
