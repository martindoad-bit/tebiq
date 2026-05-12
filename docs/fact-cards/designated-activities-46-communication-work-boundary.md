---
fact_id: designated-activities-46-communication-work-boundary
title: "特定活動46号 — 双方向の日本語コミュニケーションを要する業務"
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
citation_label: "46号の日本語コミュニケーション業務"
citation_summary: "ISA ガイドラインは、日本語を用いた円滑な意思疎通を要する業務について、作業指示を理解するだけの受動的業務では足りず、翻訳・通訳要素や第三者への働きかけを伴う双方向コミュニケーションを要すると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-005
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 業務要件"
  source_locator: "3 日本語を用いた円滑な意思疎通を要する業務"
  claim_type: activity_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "個別職務の適合判断"
    - "単純作業のみの可否"
    - "業務割合の実務評価"
  deep_water_candidate: true
applies_when:
  - "ユーザーが46号で接客・飲食・製造・介護などをしたいと相談している"
does_not_cover:
  - "具体的職務が該当するかの最終判断"
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
  - "46号の活動内容判断"
direct_fact_fields:
  - designated_activities_46_communication_work_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: individual_job_fit_domain_review
    reason: "具体的な職務内容への当てはめはDOMAINレビュー対象。"
evidence_points:
  - claim: "ISA ガイドラインは、日本語を用いた円滑な意思疎通を要する業務について、作業指示を理解するだけの受動的業務では足りず、翻訳・通訳要素や第三者への働きかけを伴う双方向コミュニケーションを要すると説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "3 日本語を用いた円滑な意思疎通を要する業務について"
    display_label: "46号: 双方向コミュニケーション要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動46号 — 双方向の日本語コミュニケーションを要する業務

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号の日本語業務について、単に作業指示を理解する受動的業務では足りず、他者との双方向コミュニケーションを要すると説明している。

## exceptions_or_transition

- 具体的な接客、製造、介護などの職務適合は個別確認が必要。

## common_user_phrases

- 特定活動46号 接客
- 46号 飲食店 接客
- 46号 製造 ライン
- 46号 介護 コミュニケーション
- 日本語を用いた円滑な意思疎通
- 46号 只做现场工作可以吗

## must_say

- 46号では双方向の日本語コミュニケーションを要する業務か確認する。

## must_not_say

- 日本語で指示を聞ければ46号の業務要件を満たす。
- 飲食や製造なら何でも46号でよい。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-005 |

