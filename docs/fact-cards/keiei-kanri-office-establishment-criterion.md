---
fact_id: keiei-kanri-office-establishment-criterion
title: 経営・管理 — 事業所確保基準
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
citation_label: "経営管理の事業所基準"
citation_summary: "経営・管理の基準では、事業を営むための事業所が日本に存在すること、または未開始事業では事業所として使う施設が日本に確保されていることが示される。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-033
  authority_layer: L2 Ordinance + L4 ISA Amendment Page
  legal_source_type: ordinance_current_text_plus_official_amendment_page
  law_article_ref: "上陸基準省令 経営・管理 row 1号"
  source_locator: "経営・管理 row 1号 / ISA 改正ページ Q8"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "経営・管理"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "事業所面積の個別判断"
    - "自宅兼用の例外判断"
    - "既存保持者更新の過渡措置判断"
  deep_water_candidate: true
applies_when:
  - "用户问经营管理是否必须有办公室"
  - "用户问自宅兼办公室能不能申请经管"
does_not_cover:
  - "具体办公室面积是否足够"
  - "住宅兼用是否在个案中被认可"
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
  - "経営・管理 office / business establishment criterion"
direct_fact_fields:
  - keiei_kanri_business_office_in_japan
  - keiei_kanri_unstarted_business_facility_secured
ai_inferred_fields: []
needs_review_flags:
  - id: home_office_exception_boundary
    reason: "ISA page says home-office use is generally not accepted, but this card does not decide individual office adequacy."
related_fact_cards:
  - keiei-kanri-2025-10
  - keiei-kanri-existing-holder-update
evidence_points:
  - claim: "The criterion requires a business office in Japan, or for an unstarted business, a facility secured in Japan for use as the business office."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "経営・管理 row 1号"
    display_label: "上陸基準省令 経営・管理 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 経営・管理 — 事業所確保基準

## current_date_logic

```text
Checked against e-Gov current law text and ISA amendment page on 2026-05-12.
```

## current_effective_fact

経営・管理の基準では、申請に係る事業を営むための事業所が日本に存在することが示されている。事業がまだ開始されていない場合は、その事業を営むための事業所として使用する施設が日本に確保されていることが示されている。

> "事業所が本邦に存在"
> source: egov-landing-criteria-ordinance

> "施設が本邦に確保"
> source: egov-landing-criteria-ordinance

ISA の改正ページは、自宅を事業所と兼ねることは原則として認められないと説明している。

> "自宅を事業所"
> source: isa-business-manager-2025-amendment

## exceptions_or_transition

- This card does not decide a concrete office's adequacy.
- It does not provide a fixed area rule.
- Existing-holder renewal transition questions should route to `keiei-kanri-existing-holder-update`.

## common_user_phrases

- 经管需要办公室吗
- 经营管理办公室
- 事业所
- 事务所
- 自宅办公
- 自宅兼办公室
- 家里当办公室
- office
- 事業所

## must_say

- 经营管理基准要求在日本有事业所，或未开业时已经确保作为事业所使用的设施。
- 自宅兼用属于需要谨慎确认的点。
- 不能把本卡当成固定面积判断。

## must_not_say

- 不要说没有办公室也没关系。
- 不要给固定面积门槛。
- 不要说所有自宅兼用都一定可或一定不可。

## qa_cases

### QA-1

**user**: 经管签可以用家里当办公室吗？

**must_have**:

- 事业所
- 自宅兼用需谨慎确认

**must_not_have**:

- 一定可以

### QA-2

**user**: 经营管理办公室要多少平米？

**must_have**:

- 不能用本卡给固定面积

**must_not_have**:

- 固定平米数

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 2; LS-P0C2-033 |
