---
fact_id: permanent-residence-national-pension-receipts-materials
title: 永住許可申請 — 国民年金加入期間は領収証書写しも資料対象
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 2
citation_label: "永住申請では国民年金領収証書が資料対象になる"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、直近2年間に国民年金に加入していた期間がある場合、その期間分の国民年金保険料領収証書の写しを提出資料として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-021
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "8(1)ウ"
  claim_type: materials_evidence
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "領収証書不足時の最終評価"
    - "免除・猶予期間の評価"
  deep_water_candidate: true
applies_when:
  - "用户问国民年金领收书、收据、补缴情形和永住"
does_not_cover:
  - "国民年金領収証書を出せない場合の最終判断"
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
  - permanent_residence_national_pension_receipts_materials
ai_inferred_fields: []
needs_review_flags:
  - id: receipt_missing_reason_review
    reason: "提出困難な場合の理由書の扱いは個別確認が必要。"
evidence_points:
  - claim: "直近2年間に国民年金に加入していた期間がある場合、その期間分の国民年金保険料領収証書の写しを提出する扱いが示されている。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "8(1)ウ"
    display_label: "永住申請資料：国民年金領収証書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 国民年金加入期間は領収証書写しも資料対象

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

直近2年間に国民年金に加入していた期間がある場合、その期間分の国民年金保険料領収証書の写しを提出する扱いが示されている。提出が困難な場合は、その理由を記載した理由書を提出する扱いも示されている。

## exceptions_or_transition

- 直近2年間の全期間について国民年金領収証書を提出できる場合は、被保険者記録照会回答票等を提出する必要はないとされている。
- 領収証書不足の理由書がどの程度受け入れられるかは、このカードでは判断しない。

## common_user_phrases

- 永住 国民年金 領収書
- 永住 年金 收据
- 永住 年金 領収証書 ない
- 永住 国民年金 24ヶ月
- 永住 年金 払込票
- 永住 年金 理由書

## must_say

- 国民年金加入期間は領収証書写しが資料対象になる。
- 提出困難な場合の理由書は、許可可否の結論ではない。

## must_not_say

- 領収書がないなら永住は絶対不可。
- 何か理由書を書けば必ず足りる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-021 |
