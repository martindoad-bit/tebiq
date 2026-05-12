---
fact_id: designated-activities-46-japanese-ability-n1-bjt480
title: "特定活動46号 — JLPT N1 又は BJT 480点以上"
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
citation_label: "46号の日本語能力"
citation_summary: "ISA ガイドラインは、46号の日本語能力について日本語能力試験N1又はBJTビジネス日本語能力テスト480点以上を対象と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-004
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 日本語能力"
  source_locator: "2 対象者 / 日本語能力について"
  claim_type: eligibility_guidance
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "日本語専攻による取扱い"
    - "勤務内容の適合"
    - "認定専修学校の該当性"
  deep_water_candidate: false
applies_when:
  - "ユーザーが46号の日本語要件を聞いている"
does_not_cover:
  - "JLPT N2で可能か以外の別資格"
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
  - "特定活動46号の日本語能力確認"
direct_fact_fields:
  - designated_activities_46_japanese_ability_n1_bjt480
ai_inferred_fields: []
needs_review_flags:
  - id: japanese_major_equivalent_separate
    reason: "日本語専攻による取扱いは別カード化する。"
evidence_points:
  - claim: "ISA ガイドラインは、46号の日本語能力について日本語能力試験N1又はBJTビジネス日本語能力テスト480点以上を対象と説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "2 対象者 (2) 日本語能力について"
    display_label: "46号: N1又はBJT480点以上"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動46号 — JLPT N1 又は BJT 480点以上

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号の日本語能力について日本語能力試験N1又はBJT480点以上を対象としている。

## exceptions_or_transition

- 日本語専攻による取扱いは別途確認する。
- N1/BJTだけで勤務内容の適合は決まらない。

## common_user_phrases

- 特定活動46号 N1
- 特定活動46号 N2
- 46号 BJT480
- JLPT N1 46号
- N2で46号
- 特定活动46号 日语要求

## must_say

- 46号の日本語能力はN1又はBJT480点以上を確認する。

## must_not_say

- N2でも46号でよい。
- N1さえあれば46号で就労できる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-004 |

