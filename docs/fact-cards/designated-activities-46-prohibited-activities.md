---
fact_id: designated-activities-46-prohibited-activities
title: "特定活動46号 — 風俗関係業務と業務独占資格業務は除外"
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
citation_label: "46号の除外業務"
citation_summary: "ISA ガイドラインは、46号で法律上資格を有する方が行うこととされている業務及び風俗関係業務に従事することは認められないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-008
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 除外業務"
  source_locator: "1 本制度の概要 / 6 契約形態等"
  claim_type: exclusion_scope
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "個別業務が業務独占資格に該当するか"
    - "風俗営業法上の具体的該当性"
  deep_water_candidate: true
applies_when:
  - "ユーザーが46号で禁止業務に近い活動を聞いている"
does_not_cover:
  - "風俗営業法の詳細判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: isa-tokutei46-guideline-pdf
    url: https://www.moj.go.jp/isa/content/001413711.pdf
    title: 留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "46号の除外活動"
direct_fact_fields:
  - designated_activities_46_prohibited_activities
ai_inferred_fields: []
needs_review_flags:
  - id: regulated_work_detail_review
    reason: "具体的な業務該当性は専門確認が必要。"
evidence_points:
  - claim: "ISA ガイドラインは、46号で法律上資格を有する方が行うこととされている業務及び風俗関係業務に従事することは認められないと説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "1 本制度の概要"
    display_label: "46号: 除外業務"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動46号 — 風俗関係業務と業務独占資格業務は除外

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号で風俗関係業務及び法律上資格を有する方が行うこととされている業務に従事することは認められないと説明している。

## exceptions_or_transition

- 具体的な業務が除外対象に当たるかは専門確認が必要。

## common_user_phrases

- 46号 風俗
- 特定活動46号 禁止業務
- 46号 資格業務
- 業務独占資格 46号
- 46号 不可以做什么

## must_say

- 46号にも除外業務がある。

## must_not_say

- 46号ならどんな業務でも可能。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-008 |

