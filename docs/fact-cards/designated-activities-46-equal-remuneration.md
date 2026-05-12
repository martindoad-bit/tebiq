---
fact_id: designated-activities-46-equal-remuneration
title: "特定活動46号 — 日本人と同等額以上の報酬"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 2
citation_label: "46号の報酬要件"
citation_summary: "ISA ガイドラインは、46号について、日本人が従事する場合に受ける報酬と同等額以上の報酬を受けることを説明し、一律額ではなく地域や企業の賃金体系等を基礎に判断すると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-011
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 報酬"
  source_locator: "7 日本人が従事する場合に受ける報酬と同等額以上"
  claim_type: remuneration_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "個別給与水準の妥当性"
    - "最低賃金だけでの判断"
  deep_water_candidate: false
applies_when:
  - "ユーザーが46号の給与条件を聞いている"
does_not_cover:
  - "個別給与額で足りるか"
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
  - "46号の報酬確認"
direct_fact_fields:
  - designated_activities_46_equal_remuneration
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA ガイドラインは、46号について、日本人が従事する場合に受ける報酬と同等額以上の報酬を受けることを説明し、一律額ではなく地域や企業の賃金体系等を基礎に判断すると説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "7 日本人が従事する場合に受ける報酬と同等額以上"
    display_label: "46号: 日本人同等額以上の報酬"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動46号 — 日本人と同等額以上の報酬

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号について日本人が従事する場合に受ける報酬と同等額以上の報酬を受けることを説明している。

## exceptions_or_transition

- 個別給与額が足りるかは賃金体系や職務内容により確認する。

## common_user_phrases

- 46号 給料
- 特定活動46号 報酬
- 日本人同等額 46号
- 46号 年収
- 特定活动46号 工资

## must_say

- 46号では日本人同等額以上の報酬を確認する。

## must_not_say

- 最低賃金を超えていれば必ず足りる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-011 |

