---
fact_id: intra-company-transfer-gijinkoku-equivalent-work
title: 企業内転勤 — 技人国相当業務に限られる活動範囲
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 4
citation_label: "企業内転勤の活動範囲"
citation_summary: "企業内転勤の上陸基準は、転勤前後の業務が技術・人文知識・国際業務に相当する業務であることを前提にしており、社内転勤なら任意の職務が対象になるわけではない。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-081
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 企業内転勤 row 1号"
  source_locator: "企業内転勤 row 1号"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "企業内転勤"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "現場単純労務"
    - "任意の社内職務"
    - "技人国該当性の個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问集团派到日本做任何工作是否能企业内转勤"
  - "用户问企业内转勤能否做工厂/现场作业"
does_not_cover:
  - "具体岗位是否属于技人国相当业务"
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
  - "企業内転勤 activity scope criterion"
direct_fact_fields:
  - intra_company_transfer_gijinkoku_equivalent_work
ai_inferred_fields: []
needs_review_flags:
  - id: concrete_work_content_not_decided
    reason: "This card does not decide whether a concrete job falls under 技術・人文知識・国際業務."
related_fact_cards:
  - technical-humanities-international-activity-anchor
  - gijinkoku-background-relevance-required
evidence_points:
  - claim: "企業内転勤 is tied to work under the 技術・人文知識・国際業務 activity scope, not arbitrary internal transfer work."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "企業内転勤 row 1号"
    display_label: "上陸基準省令 企業内転勤 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 企業内転勤 — 技人国相当業務に限られる活動範囲

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

企業内転勤の基準は、外国の事業所で技術・人文知識・国際業務の項の下欄に掲げる業務に従事していることを示している。したがって、社内転勤であっても、日本側で任意の現場作業や単純労務を行えるという意味ではない。

> "技術・人文知識・国際業務"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide a concrete job's activity classification.
- It does not replace 技人国 work-content analysis.
- It does not approve arbitrary factory/site work because the transfer is internal.

## common_user_phrases

- 企业内转勤 活动范围 技人国相当
- 企业内转勤 工厂作业
- 集团派到日本生产线
- 社内转勤 任何职位
- 企业内转勤 现场劳动
- 技人国相当业务
- 内部调动 做销售门店
- 企業内転勤 業務内容

## must_say

- 企业内转勤活动范围与技人国项下业务相连。
- 不是集团内部调动就能做任何工作。
- 具体岗位是否符合仍需看工作内容。

## must_not_say

- 不要说社内转勤可覆盖任意职位。
- 不要把单纯现场劳务直接纳入。
- 不要忽略技人国相当业务边界。

## qa_cases

### QA-1

**user**: 我被集团派到日本工厂做生产线作业，可以办企业内转勤吗？

**must_have**:

- 技人国相当业务
- 不能任意职位

**must_not_have**:

- 因为集团转勤就可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-081 |
