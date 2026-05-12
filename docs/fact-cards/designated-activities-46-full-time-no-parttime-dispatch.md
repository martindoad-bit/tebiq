---
fact_id: designated-activities-46-full-time-no-parttime-dispatch
title: "特定活動46号 — 常勤フルタイムに限り、短時間・アルバイト・派遣は対象外"
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
citation_label: "46号の契約形態"
citation_summary: "ISA ガイドラインは、46号が活動先機関の常勤職員として行う業務に限られ、短時間のパートタイムやアルバイトは対象外で、派遣社員として派遣先で就労することはできないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-010
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 契約形態"
  source_locator: "6 契約形態等"
  claim_type: employment_form_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "個別契約の労働時間判断"
    - "業務委託"
    - "副業可否"
  deep_water_candidate: true
applies_when:
  - "ユーザーが46号でアルバイト・派遣・短時間勤務を考えている"
does_not_cover:
  - "副業や資格外活動"
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
  - "46号の雇用形態確認"
direct_fact_fields:
  - designated_activities_46_full_time_no_parttime_dispatch
ai_inferred_fields: []
needs_review_flags:
  - id: side_job_boundary_pending
    reason: "副業や資格外活動は別カードで扱う。"
evidence_points:
  - claim: "ISA ガイドラインは、46号が活動先機関の常勤職員として行う業務に限られ、短時間のパートタイムやアルバイトは対象外で、派遣社員として派遣先で就労することはできないと説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "6 契約形態等 (3)(4)"
    display_label: "46号: 常勤フルタイム・派遣不可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動46号 — 常勤フルタイムに限り、短時間・アルバイト・派遣は対象外

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号が常勤職員として行う業務に限られ、短時間のパートタイムやアルバイト、派遣先での就労活動は対象外と説明している。

## exceptions_or_transition

- 副業や資格外活動の可否はこのカードで判断しない。

## common_user_phrases

- 46号 アルバイト
- 特定活動46号 パート
- 46号 フルタイム
- 46号 派遣
- 46号 常勤
- 特定活动46号 派遣

## must_say

- 46号は常勤フルタイムと派遣不可を確認する。

## must_not_say

- アルバイトでも46号になれる。
- 派遣先で46号就労できる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-010 |

