---
fact_id: designated-activities-46-learning-outcome-work-boundary
title: "特定活動46号 — 学修成果等を活用する業務を含むこと"
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
citation_label: "46号の学修成果等活用"
citation_summary: "ISA ガイドラインは、46号について、従事しようとする業務内容に技人国対象となる学術上の素養等を背景とする一定水準以上の業務が含まれること又は今後従事見込みがあることを意味すると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-006
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guideline_pdf
  law_article_ref: "特定活動46号 学修成果等"
  source_locator: "4 学修の成果等を活用するもの"
  claim_type: activity_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "個別職務の水準判断"
    - "技人国該当性の最終判断"
    - "単純作業のみの扱い"
  deep_water_candidate: true
applies_when:
  - "ユーザーが46号で現場業務をする予定がある"
does_not_cover:
  - "職務割合や将来配置の実務判断"
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
  - designated_activities_46_learning_outcome_work_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: work_level_domain_review
    reason: "具体的な業務水準はDOMAINレビュー対象。"
evidence_points:
  - claim: "ISA ガイドラインは、46号について、業務内容に技人国対象となる学術上の素養等を背景とする一定水準以上の業務が含まれること又は今後従事見込みがあることを意味すると説明している。"
    source_title: "留学生の就職支援に係る「特定活動」（本邦大学等卒業者）についてのガイドライン"
    source_url: "https://www.moj.go.jp/isa/content/001413711.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "4 学修の成果等を活用するものと認められること"
    display_label: "46号: 学修成果等の活用"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動46号 — 学修成果等を活用する業務を含むこと

## current_date_logic

Checked against ISA guideline PDF on 2026-05-12.

## current_effective_fact

ISA ガイドラインは、46号の業務について、学術上の素養等を背景とする一定水準以上の業務が含まれること又は今後従事見込みがあることを説明している。

## exceptions_or_transition

- 職務内容がこの水準を満たすかは個別確認が必要。

## common_user_phrases

- 46号 学修成果
- 46号 学んだこと 活かす
- 46号 単純作業
- 46号 现场作业
- 46号 商品企画 管理業務
- 特定活動46号 業務水準

## must_say

- 46号では学修成果等を活用する一定水準以上の業務を含むか確認する。

## must_not_say

- 現場作業だけでも46号で問題ない。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-006 |

