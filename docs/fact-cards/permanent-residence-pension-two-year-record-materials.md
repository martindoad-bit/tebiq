---
fact_id: permanent-residence-pension-two-year-record-materials
title: 永住許可申請 — 公的年金は過去2年間の加入制度に応じた資料対象
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
citation_label: "永住申請の年金資料は過去2年間の加入制度に応じる"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、過去2年間に加入した公的年金制度に応じた納付状況資料を提出する扱いを示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-021
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "8(1)"
  claim_type: materials_evidence
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "年金免除・猶予の評価"
    - "年金記録からの許可可否判断"
  deep_water_candidate: true
applies_when:
  - "用户问永住申请年金记录要准备什么"
does_not_cover:
  - "年金免除・猶予が永住審査でどう扱われるか"
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
  - permanent_residence_pension_two_year_record_materials
ai_inferred_fields: []
needs_review_flags:
  - id: pension_exemption_deferment_not_resolved
    reason: "過去2年間の資料提出範囲は直接確認できるが、免除・猶予の評価は本ページだけでは判断しない。"
evidence_points:
  - claim: "就労資格者等向け永住許可申請では、過去2年間に加入した公的年金制度に応じ、該当する納付状況資料を提出する扱いが示されている。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "8(1)"
    display_label: "永住申請資料：公的年金は過去2年間の資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 公的年金は過去2年間の加入制度に応じた資料対象

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

就労資格者等向け永住許可申請では、過去2年間に加入した公的年金制度に応じ、被保険者記録照会回答票、ねんきん定期便、ねんきんネットの各月の年金記録などの資料が提出対象として示されている。

## exceptions_or_transition

- 国民年金に加入していた期間がある場合は、国民年金の各月の納付状況の資料も問題になる。
- 年金免除・猶予の評価はこのカードでは断定しない。

## common_user_phrases

- 永住 年金 2年
- 永住 年金記録
- 永住 ねんきんネット
- 永住 被保険者記録照会
- 永住 年金 何を出す
- 永住 国民年金 厚生年金

## must_say

- 資料範囲は過去2年間に加入した制度に応じて変わる。
- 年金資料は審査資料であって、提出だけで許可を保証しない。

## must_not_say

- ねんきんネットだけで全員足りる。
- 年金免除・猶予は必ず安全又は必ず不許可。

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
