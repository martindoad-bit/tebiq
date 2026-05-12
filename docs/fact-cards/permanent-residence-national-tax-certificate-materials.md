---
fact_id: permanent-residence-national-tax-certificate-materials
title: 永住許可申請 — 国税の納税証明書その3は5税目が資料対象
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 2
citation_label: "永住申請の国税資料は納税証明書その3"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、源泉所得税、申告所得税、消費税、相続税、贈与税の5税目について納税証明書その3を提出資料として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-020
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "7(2)"
  claim_type: materials_evidence
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "国税滞納の個別評価"
    - "国税庁での具体的な請求操作"
  deep_water_candidate: false
applies_when:
  - "用户问永住国税纳税证明要哪几项"
does_not_cover:
  - "国税未納や延滞の個別評価"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-work-materials
    url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    title: 永住許可申請３
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 就労資格者等向け永住許可申請
direct_fact_fields:
  - permanent_residence_national_tax_certificate_materials
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "就労資格者等向け永住許可申請では、源泉所得税、申告所得税、消費税、相続税、贈与税の5税目について納税証明書その3が提出資料として掲げられている。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "7(2)"
    display_label: "永住申請資料：国税の納税証明書その3"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 国税の納税証明書その3は5税目が資料対象

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

就労資格者等向け永住許可申請では、源泉所得税及び復興特別所得税、申告所得税及び復興特別所得税、消費税及び地方消費税、相続税、贈与税に係る納税証明書その3が提出資料として掲げられている。

## exceptions_or_transition

- 納税証明書その3は、証明日現在に未納がないことを証明するもので、対象期間の指定は不要とされている。

## common_user_phrases

- 永住 国税
- 永住 納税証明書 その3
- 永住 所得税 消費税
- 永住 税務署 書類
- 永住 国税 5税目
- 永住 税金 書類

## must_say

- 国税は納税証明書その3が資料対象。
- 対象税目は5税目として示されている。

## must_not_say

- 住民税の証明だけで税務資料は完了。
- 国税証明があれば永住許可が保証される。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-020 |
