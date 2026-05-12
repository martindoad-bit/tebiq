---
fact_id: designated-activities-46-designated-institution-job-change
title: "特定活動46号 — 活動先機関が指定書に記載され、転職時は変更申請"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 2
citation_label: "46号の指定書と転職"
citation_summary: "ISA ガイドラインは、46号では活動先機関が指定書として旅券に貼付され、転職等で契約相手方が変わる場合は新たな機関指定のため在留資格変更許可申請が必要と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-009
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 指定書 / 転職"
  source_locator: "6 契約形態等"
  claim_type: procedure_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
  exclusion_scope:
    - "転職後いつから働けるか"
    - "同一法人内異動の個別判断"
    - "14日届出の要否"
  deep_water_candidate: true
applies_when:
  - "ユーザーが46号で転職したいと相談している"
does_not_cover:
  - "転職先職務の46号適合判断"
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
  - "46号の転職相談"
direct_fact_fields:
  - designated_activities_46_designated_institution_job_change
ai_inferred_fields: []
needs_review_flags:
  - id: work_start_timing_domain_review
    reason: "変更申請前後の就労開始可否や同一法人内異動は専門確認が必要。"
evidence_points:
  - claim: "ISA ガイドラインは、46号では活動先機関が指定書として旅券に貼付され、転職等で契約相手方が変わる場合は新たな機関指定のため在留資格変更許可申請が必要と説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "6 契約形態等 (1)(2)"
    display_label: "46号: 指定書と転職時変更申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動46号 — 活動先機関が指定書に記載され、転職時は変更申請

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号では活動先機関が指定書として旅券に貼付され、転職等で契約相手方が変わる場合は在留資格変更許可申請が必要と説明している。

## exceptions_or_transition

- 同一法人内異動や就労開始時点は個別確認が必要。

## common_user_phrases

- 特定活動46号 転職
- 46号 転職 変更申請
- 46号 指定書
- 46号 会社変わる
- 特定活动46号 换工作

## must_say

- 46号の転職は指定活動が変わるため変更申請が問題になる。

## must_not_say

- 46号の転職は14日届出だけで足りる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-009 |

