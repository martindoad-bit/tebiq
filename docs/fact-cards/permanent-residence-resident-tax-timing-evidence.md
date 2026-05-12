---
fact_id: permanent-residence-resident-tax-timing-evidence
title: 永住許可申請 — 住民税の期限内納付を示す資料
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
citation_label: "永住申請では住民税の期限内納付資料が求められる場合がある"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、直近5年間に住民税が特別徴収されていない期間がある場合、適正な時期に納めていることを証明する資料を掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-020
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "7(1)イ"
  claim_type: materials_evidence
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "遅延納付の個別評価"
    - "住民税以外の公的義務評価"
  deep_water_candidate: true
applies_when:
  - "用户问住民税补缴、普通徴収、特別徴収和永住材料"
does_not_cover:
  - "迟缴后一定不许可或一定没问题"
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
  - permanent_residence_resident_tax_timing_evidence
ai_inferred_fields: []
needs_review_flags:
  - id: late_payment_outcome_not_determined
    reason: "期限後納付の事実が個別申請でどう評価されるかは本カードだけでは判断しない。"
evidence_points:
  - claim: "直近5年間に住民税が給与天引きされていない期間がある場合、その期間分について適正な時期に納めていることを証明する資料が提出対象となる。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "7(1)イ"
    display_label: "永住申請資料：住民税の期限内納付資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 住民税の期限内納付を示す資料

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

直近5年間に住民税が特別徴収されていない期間がある場合、その期間分について適正な時期に納めていることを証明する資料が提出対象となる。ISA は通帳の写し、領収証書等を例示している。

## exceptions_or_transition

- 直近5年間の全期間が給与天引きの場合、この期限内納付資料は不要とされ、課税・納税証明書側の資料だけを提出する扱いが示されている。
- Web通帳の画面写し等も、加工できない状態で印刷されたものに限り差し支えないとされている。

## common_user_phrases

- 永住 住民税 普通徴収
- 永住 住民税 特別徴収
- 永住 税金 遅れ
- 永住 住民税 領収書
- 永住 通帳 コピー 税
- 永住 税金 補交

## must_say

- 特別徴収でない期間がある場合は、その期間分の期限内納付を示す資料が問題になる。
- 期限内納付資料は材料であり、許可保証ではない。

## must_not_say

- 給与天引きでない期間があるだけで永住は不可。
- 申請前に払えば遅延は常に消える。

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
