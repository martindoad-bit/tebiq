---
fact_id: designated-activities-46-education-scope
title: "特定活動46号 — 本邦大学等卒業者の学歴範囲"
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
citation_label: "46号の学歴範囲"
citation_summary: "ISA ガイドラインは、46号の対象を本邦大学・大学院、一定の短大・高専、認定専修学校専門課程等の本邦大学等卒業者として説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-002
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 対象者"
  source_locator: "2 対象者 / 学歴について"
  claim_type: eligibility_guidance
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "個別学校の認定確認"
    - "勤務内容の適合"
    - "日本語能力"
  deep_water_candidate: true
applies_when:
  - "ユーザーが46号の学歴要件を聞いている"
does_not_cover:
  - "認定専修学校の最新リスト"
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
  - "特定活動46号の学歴確認"
direct_fact_fields:
  - designated_activities_46_education_scope
ai_inferred_fields: []
needs_review_flags:
  - id: certified_senshu_school_latest_list
    reason: "認定専修学校専門課程の最新確認はMEXT側ソースが必要。"
evidence_points:
  - claim: "ISA ガイドラインは、46号の対象を本邦大学・大学院、一定の短大・高専、認定専修学校専門課程等の本邦大学等卒業者として説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "2 対象者 (1) 学歴について"
    display_label: "46号: 本邦大学等卒業者"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動46号 — 本邦大学等卒業者の学歴範囲

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号の対象を本邦大学等卒業者として説明し、その中に本邦大学・大学院、一定の短大・高専、認定専修学校専門課程等を含めている。

## exceptions_or_transition

- 認定専修学校専門課程の最新該当性は別途確認する。
- 学歴だけで46号の適合は決まらない。

## common_user_phrases

- 特定活動46号 学歴
- 46号 大学卒業
- 46号 専門学校
- 本邦大学等卒業者
- 認定専修学校 46号
- 特定活动46号 学历

## must_say

- 46号は本邦大学等卒業者の範囲を確認する必要がある。

## must_not_say

- 日本の学校なら全部対象。
- 学歴があれば46号は通る。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-002 |

