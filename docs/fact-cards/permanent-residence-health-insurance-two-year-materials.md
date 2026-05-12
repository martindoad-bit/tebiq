---
fact_id: permanent-residence-health-insurance-two-year-materials
title: 永住許可申請 — 公的医療保険は過去2年間の加入制度に応じた資料対象
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
citation_label: "永住申請の医療保険資料は過去2年間の加入制度に応じる"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、過去2年間に加入した公的医療保険制度に応じた納付状況資料を提出する扱いを示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-022
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "8(2)"
  claim_type: materials_evidence
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "医療保険未加入期間の個別評価"
    - "転職時空白期間の許可可否判断"
  deep_water_candidate: true
applies_when:
  - "用户问永住申请医保、国保、健康保险材料"
does_not_cover:
  - "医保空白期或未纳期对永住的最终影响"
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
  - permanent_residence_health_insurance_two_year_materials
ai_inferred_fields: []
needs_review_flags:
  - id: health_insurance_gap_review
    reason: "転職時や切替時の空白期間評価は本カードだけでは判断しない。"
evidence_points:
  - claim: "就労資格者等向け永住許可申請では、過去2年間に加入した公的医療保険制度に応じ、該当する保険料納付状況資料を提出する扱いが示されている。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "8(2)"
    display_label: "永住申請資料：公的医療保険は過去2年間の資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 公的医療保険は過去2年間の加入制度に応じた資料対象

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

就労資格者等向け永住許可申請では、過去2年間に加入した公的医療保険制度に応じ、健康保険、国民健康保険、国民健康保険料納付証明書、領収証書写しなどの資料が提出対象として示されている。

## exceptions_or_transition

- 国民健康保険に加入していた期間がある場合は、その期間分の納付証明書や領収証書が問題になる。
- 転職や転居で保険者が変わった場合の個別評価は、このカードでは判断しない。

## common_user_phrases

- 永住 健康保険 2年
- 永住 国民健康保険
- 永住 国保 未納
- 永住 医保 材料
- 永住 健保 空白
- 永住 保険料 領収書

## must_say

- 公的医療保険も過去2年間の加入制度に応じた資料が必要になる。
- 国保加入期間は納付証明書や領収証書が問題になる。

## must_not_say

- 健康保険証があれば過去2年分の確認は不要。
- 保険の空白があれば必ず永住不可。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-022 |
