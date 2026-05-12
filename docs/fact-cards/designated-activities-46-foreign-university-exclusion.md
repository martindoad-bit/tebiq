---
fact_id: designated-activities-46-foreign-university-exclusion
title: "特定活動46号 — 外国大学卒業者は対象外と明示"
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
citation_label: "46号の外国大学除外"
citation_summary: "ISA ガイドラインは、外国大学卒業者及び大学院修了者、認定専修学校専門課程ではない専修学校専門課程や専攻科の修了者は46号の対象とならないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-003
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 対象外"
  source_locator: "2 対象者 / 学歴について"
  claim_type: exclusion_scope
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - landing
  exclusion_scope:
    - "技人国など別資格の可否"
    - "J-Findの可否"
    - "外国大学で日本語専攻した場合の日本語能力扱い"
  deep_water_candidate: false
applies_when:
  - "ユーザーが外国大学卒で46号を検討している"
does_not_cover:
  - "外国大学卒の他資格"
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
  - "外国大学卒業者の46号相談"
direct_fact_fields:
  - designated_activities_46_foreign_university_exclusion
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA ガイドラインは、外国大学卒業者及び大学院修了者、認定専修学校専門課程ではない専修学校専門課程や専攻科の修了者は対象とならないと説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "2 対象者 (1) 学歴について"
    display_label: "46号: 外国大学卒業者は対象外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動46号 — 外国大学卒業者は対象外と明示

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、外国大学卒業者及び大学院修了者を46号の対象外として説明している。

## exceptions_or_transition

- 外国大学卒業者の技人国、J-Find、高度専門職などは別資格として確認する。

## common_user_phrases

- 外国大学 特定活動46号
- 海外大学 46号
- 外国大学卒 46号 対象外
- overseas university 46
- 海外大学毕业 特定活动46号

## must_say

- 外国大学卒だけでは46号の対象にならない。

## must_not_say

- 外国大学卒でもN1があれば46号でよい。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-003 |

