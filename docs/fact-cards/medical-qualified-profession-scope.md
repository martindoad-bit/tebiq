---
fact_id: medical-qualified-profession-scope
title: 医療 — 法律上資格者による医療業務
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
citation_label: "医療"
citation_summary: "医療は、医師・歯科医師等の法律上資格者が医療に係る業務を行う活動資格である。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C1-053
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 医療"
  source_locator: "医療の項"
  claim_type: activity_scope
  applicable_statuses:
    - "医療"
  application_type:
    - current-status
  exclusion_scope:
    - "外国医师资格换证"
    - "医院行政、翻译、护理辅助"
  deep_water_candidate: true
applies_when:
  - "用户询问医生、护士、医疗相关行业是否属于医疗在留资格"
does_not_cover:
  - "具体日本医疗资格取得"
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
  - "医療の活動範囲"
direct_fact_fields:
  - medical_profession_scope
ai_inferred_fields: []
needs_review_flags:
  - id: medical_license_scope
    reason: "日本医疗资格与具体执业范围需要 DOMAIN review。"
evidence_points:
  - claim: "医療は法律上資格者が医療に係る業務を行う活動資格である。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 医療"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 医療 — 法律上資格者による医療業務

## current_date_logic

```text
Checked against current e-Gov law text on 2026-05-12.
This is a medical professional boundary card.
```

## current_effective_fact

医療在留資格は、医師、歯科医師等の法律上資格者が医療に係る業務を行う活動を対象とする。

## exceptions_or_transition

- 医院で働くすべての職種が医療在留資格になるわけではない。

## common_user_phrases

- 医疗签证
- 医生签证
- 护士
- 医師
- 歯科医師
- 医療
- 医院前台
- 医疗翻译
- 按摩整体

## must_say

- 医疗活动资格以法律上资格为核心。

## must_not_say

- 不要把医院行政、翻译、护理辅助直接归入医療资格。
- 不要把健康行业都说成医疗。

## qa_cases

### QA-1

**user**: 医院前台能办医疗签吗？

**must_have**:

- 医疗资格业务范围需确认

**must_not_have**:

- 医院工作都属于医疗

### QA-2

**user**: 外国医生能直接用医疗签执业吗？

**must_have**:

- 法律上资格需确认

**must_not_have**:

- 直接可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-053 |
