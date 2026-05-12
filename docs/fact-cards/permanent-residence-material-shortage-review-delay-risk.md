---
fact_id: permanent-residence-material-shortage-review-delay-risk
title: 永住許可申請 — 資料不足は審査遅延や不利益処分につながり得る
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
citation_label: "永住申請では資料不足に注意"
citation_summary: "ISA の永住許可申請ページは、提出書類が揃っていない申請では審査が大幅に遅れる、又は不利益処分となり得る可能性があると注意している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-045
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "申請に当たっての留意事項"
  claim_type: materials_boundary
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "不足資料がある場合の最終処分予測"
    - "追加資料が必ず認められるという判断"
  deep_water_candidate: false
applies_when:
  - "用户问材料不齐能不能先递交永住"
does_not_cover:
  - "不足資料がある個別申請の見込み判断"
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
  - 永住許可申請
direct_fact_fields:
  - permanent_residence_material_shortage_review_delay_risk
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "提出書類が揃っていない永住許可申請では、審査が大幅に遅れる、又は不利益処分となり得る可能性があると ISA は注意している。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請に当たっての留意事項"
    display_label: "永住申請資料：不足時の審査遅延リスク"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 資料不足は審査遅延や不利益処分につながり得る

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

ISA は、提出書類が揃っていない申請の場合、審査が大幅に遅れる、又は不利益処分となり得る可能性があるとして注意している。また、審査過程でページ記載外の資料を求める場合があるとも示している。

## exceptions_or_transition

- 追加資料を求められる場合があることは、必ず補正で通るという意味ではない。

## common_user_phrases

- 永住 材料 不足
- 永住 書類 足りない
- 永住 先に出す
- 永住 追加資料
- 永住 書類 不利益
- 永住 審査 遅れる

## must_say

- 資料不足は審査遅延や不利益処分につながり得る。
- 申請後にページ記載外の資料を求められる場合もある。

## must_not_say

- 不足しても後から出せば必ず問題ない。
- 書類が揃っていない申請でも審査スピードは変わらない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-045 |
