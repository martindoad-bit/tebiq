---
fact_id: intra-company-transferee-foreign-office-to-japan-office
title: 企業内転勤 — 外国事業所から日本事業所への期間付き転勤
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 4
citation_label: "企業内転勤"
citation_summary: "企業内転勤は、外国事業所の職員が日本事業所へ期間を定めて転勤し、技人国相当活動を行う資格である。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C1-050
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 企業内転勤"
  source_locator: "企業内転勤の項"
  claim_type: activity_scope
  applicable_statuses:
    - "企業内転勤"
  application_type:
    - current-status
  exclusion_scope:
    - "集团关系、转勤年限、具体契约"
    - "日本国内普通转职"
  deep_water_candidate: false
applies_when:
  - "用户询问海外公司调日本分公司是否是企业内转勤"
does_not_cover:
  - "企业关系和期间要件"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "企業内転勤の活動範囲"
direct_fact_fields:
  - intra_company_transfer_scope
ai_inferred_fields: []
needs_review_flags:
  - id: corporate_relationship
    reason: "关联公司关系和转勤期间需后续来源确认。"
evidence_points:
  - claim: "企業内転勤は外国事業所から日本事業所への期間付き転勤を軸とする。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 企業内転勤"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 企業内転勤 — 外国事業所から日本事業所への期間付き転勤

## current_date_logic

```text
Checked against current e-Gov law text on 2026-05-12.
This card separates 企業内転勤 from ordinary local hiring.
```

## current_effective_fact

企業内転勤は、外国にある事業所の職員が日本の事業所へ期間を定めて転勤し、技人国相当活動を行う資格である。

## exceptions_or_transition

- 日本国内で普通に転職するだけでは企業内転勤とは限らない。

## common_user_phrases

- 企业内转勤
- 海外调职
- 日本支店
- 海外公司调日本
- 企業内転勤
- 外国にある事業所
- 日本本地换公司

## must_say

- 核心是海外事业所到日本事业所的期限付き转勤。

## must_not_say

- 不要混同普通技人国雇佣。
- 不要把日本国内普通换公司说成企业内转勤。

## qa_cases

### QA-1

**user**: 海外分公司调到日本总部是什么资格？

**must_have**:

- 企业内转勤
- 海外事业所到日本事业所

**must_not_have**:

- 普通永住/身份签

### QA-2

**user**: 在日本新入职能用企业内转勤吗？

**must_have**:

- 转勤结构需确认

**must_not_have**:

- 都可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-050 |
