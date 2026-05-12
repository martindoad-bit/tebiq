---
fact_id: designated-activities-46-gijinkoku-service-manufacturing-boundary
title: "特定活動46号 — 技人国より広いサービス・製造業務の境界"
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
citation_label: "46号と技人国の業務範囲差"
citation_summary: "ISA ガイドラインは、技人国では一般的なサービス業務や製造業務等が主たる活動となるものは認められないが、46号では諸要件を満たせばこれらの活動も可能と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-007
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 / 技人国との区別"
  source_locator: "1 本制度の概要"
  claim_type: disambiguation
  applicable_statuses:
    - "特定活動"
    - "技術・人文知識・国際業務"
  application_type:
    - status_change
  exclusion_scope:
    - "具体的な職務適合"
    - "特定技能との比較"
    - "許可見込み"
  deep_water_candidate: true
applies_when:
  - "ユーザーが技人国では難しい飲食・製造等を46号で検討している"
does_not_cover:
  - "技人国の詳細要件"
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
  - "46号と技人国の比較"
direct_fact_fields:
  - designated_activities_46_gijinkoku_service_manufacturing_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: job_content_fit_not_decided
    reason: "広い業務が可能という説明は、すべてのサービス・製造業務を許す意味ではない。"
evidence_points:
  - claim: "ISA ガイドラインは、技人国では一般的なサービス業務や製造業務等が主たる活動となるものは認められないが、46号では諸要件を満たせばこれらの活動も可能と説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "1 本制度の概要"
    display_label: "46号と技人国の業務範囲差"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動46号 — 技人国より広いサービス・製造業務の境界

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号が要件を満たす場合に一般的サービス業務や製造業務等も可能となる制度であることを、技人国との違いとして説明している。

## exceptions_or_transition

- これは全てのサービス業務・製造業務が認められるという意味ではない。

## common_user_phrases

- 46号 技人国 違い
- 特定活動46号 飲食 技人国
- 特定活動46号 製造業
- 46号 便利店
- 46号 服务业
- 技人国で無理 46号

## must_say

- 46号は技人国より広い業務を扱える場合があるが、46号固有の要件確認が必要。

## must_not_say

- 技人国で無理なら46号なら何でもできる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-007 |

