---
fact_id: hsp-parent-income-cohabitation-condition
title: "高度専門職等の親 — 世帯年収と同居条件"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "高度専門職の親: 年収と同居"
citation_summary: "ISA は、高度専門職等の親について、本人との同居と世帯年収800万円以上を要件として示し、世帯年収は本人と配偶者の報酬合算だと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-008
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 高度専門職等の親"
  source_locator: "要件"
  claim_type: family_parent_condition
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "収入証明の個別評価"
    - "同居実態の判断"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-parent
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html
    title: 在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職等の親 — 世帯年収と同居条件を聞く相談"
direct_fact_fields:
  - hsp_parent_income_cohabitation_condition
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_parent_income_cohabitation_condition_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、高度専門職等の親について、本人との同居と世帯年収800万円以上を要件として示し、世帯年収は本人と配偶者の報酬合算だと説明している。"
    source_title: "在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "要件"
    display_label: "高度専門職の親: 年収と同居"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職等の親 — 世帯年収と同居条件

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の親の経路では、同居と世帯年収800万円以上が示され、世帯年収は高度専門職等本人と配偶者の報酬を合算する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 親 800万 同居
- HSP 父母 世帯年収
- 高度人材 親 收入 条件
- J-Skip 父母 同居 800万円
- 高度専門職 親 配偶者收入
- 父母签证 800万

## must_say

- 世帯年収の合算対象を確認する。
- 同居条件を確認する。

## must_not_say

- 親本人や他の親族の収入を当然に世帯年収へ入れる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-008 |
