---
fact_id: permanent-residence-materials-vs-eligibility-boundary
title: 永住申請 — 提出書類と許可要件を混同しない
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 5
citation_label: "永住申請の書類と要件の区別"
citation_summary: "ISA の永住許可申請ページは提出書類を案内し、永住許可ガイドラインは素行、独立生計、国益適合などの判断枠組みを示している。書類がそろうことを許可要件充足と同一視しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-066
  authority_layer: L4 ISA Procedure Page / L4 Guideline
  legal_source_type: official_procedure_guideline
  law_article_ref: "永住許可申請 / 永住許可に関するガイドライン"
  source_locator: "提出書類一覧 / 法律上の要件"
  claim_type: materials_boundary
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "許可可能性の判断"
    - "個別事情の評価"
  deep_water_candidate: true
applies_when:
  - "用户问永住材料齐了是不是就能通过"
does_not_cover:
  - "具体永住申请能否获批"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-application-employed
    url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    title: 永住許可申請（就労関係の在留資格）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請者
direct_fact_fields:
  - permanent_residence_materials_vs_eligibility_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: permanent_residence_merits_review_required
    reason: "書類の有無と許可要件充足は別であり、個別事実の評価が必要。"
evidence_points:
  - claim: "ISA の永住許可申請ページは提出書類を案内し、永住許可ガイドラインは素行、独立生計、国益適合などの判断枠組みを示している。書類がそろうことを許可要件充足と同一視しない。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "法律上の要件"
    display_label: "永住申請：書類と要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住申請 — 提出書類と許可要件を混同しない

## current_date_logic

Checked against the ISA permanent-residence application page and guideline on 2026-05-12.

## current_effective_fact

ISA の永住許可申請ページは提出書類を案内し、永住許可ガイドラインは素行、独立生計、国益適合などの判断枠組みを示している。書類がそろうことを許可要件充足と同一視しない。

## exceptions_or_transition

- 追加資料、個別事情、過去の在留状況は別途評価され得る。

## common_user_phrases

- 永住 材料齐了 一定能过
- 永住 書類 全部ある 許可
- 永住申请 材料清单 满足条件
- 永住 提出書類 要件 違い
- 永住 材料齐 还会被拒吗
- 永住 チェックシート 全部 许可

## must_say

- 提出書類と許可要件は別。
- 書類がそろうことは許可の保証ではない。

## must_not_say

- 材料が全部あれば必ず許可。
- 提出書類一覧だけで永住要件を判断できる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 5 integration card | — | ai_extracted | C4-066 |
