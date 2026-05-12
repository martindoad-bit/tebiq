---
fact_id: designated-activities-46-family-spouse-child-route
title: "特定活動46号 — 本邦大学等卒業者の配偶者・子"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 2
citation_label: "46号の配偶者・子"
citation_summary: "ISA ガイドラインは、46号活動を指定された者の扶養を受ける配偶者又は子について、『特定活動』（本邦大学等卒業者の配偶者等）で日常的な活動が認められると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-012
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 配偶者等"
  source_locator: "8 その他 (2) 家族の滞在"
  claim_type: family_route
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "家族滞在との違いの詳細"
    - "扶養能力"
    - "家族の就労可否"
  deep_water_candidate: true
applies_when:
  - "ユーザーが46号で配偶者・子を帯同できるか聞いている"
does_not_cover:
  - "家族の資格外活動"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: isa-tokutei46-guideline-pdf
    url: https://www.moj.go.jp/isa/content/001413711.pdf
    title: 留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-tokutei46-materials-pdf
    url: https://www.moj.go.jp/isa/content/001413914.pdf
    title: 別紙（提出資料）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "46号の配偶者・子の相談"
direct_fact_fields:
  - designated_activities_46_family_spouse_child_route
ai_inferred_fields: []
needs_review_flags:
  - id: family_qoa_boundary_pending
    reason: "配偶者・子の就労可否や資格外活動は別確認が必要。"
evidence_points:
  - claim: "ISA ガイドラインは、46号活動を指定された者の扶養を受ける配偶者又は子について、『特定活動』（本邦大学等卒業者の配偶者等）で日常的な活動が認められると説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "8 その他 (2) 家族の滞在"
    display_label: "46号: 配偶者・子の特定活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動46号 — 本邦大学等卒業者の配偶者・子

## current_date_logic

Checked against ISA guideline and materials PDFs on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号活動を指定された者の扶養を受ける配偶者又は子について、特定活動で日常的な活動が認められると説明している。

## exceptions_or_transition

- 家族滞在と同一視しない。
- 家族側の就労可否はこのカードで判断しない。

## common_user_phrases

- 46号 家族
- 特定活動46号 配偶者
- 46号 子供 帯同
- 本邦大学等卒業者 配偶者等
- 特定活动46号 家属

## must_say

- 46号本人の配偶者・子は専用の特定活動路径として確認する。

## must_not_say

- 46号の家族は通常の家族滞在と同じ。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-012 |

