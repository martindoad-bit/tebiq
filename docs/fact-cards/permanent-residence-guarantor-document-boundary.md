---
fact_id: permanent-residence-guarantor-document-boundary
title: 永住許可申請 — 身元保証書は提出資料であり許可保証ではない
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
citation_label: "永住申請では身元保証書と保証人本人確認資料が必要"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、身元保証書1通と身元保証人の身分事項を明らかにする書類を提出資料として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-023
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "12"
  claim_type: materials_boundary
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "保証人の具体的適格性判断"
    - "身元保証人がいれば許可されるという判断"
  deep_water_candidate: false
applies_when:
  - "用户问永住保证人、身元保証書、保证人资料"
does_not_cover:
  - "身元保証人の個別適格性や審査上の評価"
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
  - permanent_residence_guarantor_document_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: guarantor_eligibility_not_resolved
    reason: "保証人の適格性や実務上の評価は別途確認する。"
evidence_points:
  - claim: "就労資格者等向け永住許可申請では、身元保証書1通と身元保証人の身分事項を明らかにする書類が提出資料として掲げられている。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "12"
    display_label: "永住申請資料：身元保証書と保証人資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 身元保証書は提出資料であり許可保証ではない

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

就労資格者等向け永住許可申請では、身元保証書1通と身元保証人の身分事項を明らかにする書類が提出資料として掲げられている。

## exceptions_or_transition

- このカードは、身元保証人の具体的な適格性や審査上の評価を判断しない。

## common_user_phrases

- 永住 身元保証人
- 永住 保证人
- 永住 身元保証書
- 永住 保証人 書類
- 永住 保证人 是不是必须
- 永住 保证人 有了能过吗

## must_say

- 身元保証書と保証人の本人確認資料は提出資料として示されている。
- 保証人がいることは許可の保証ではない。

## must_not_say

- 保証人がいれば永住は通る。
- 保証人が日本人であれば他の要件は見られない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-023 |
