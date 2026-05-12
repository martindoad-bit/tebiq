---
fact_id: permanent-independent-livelihood-requirement
title: 永住許可ガイドライン — 独立生計要件
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "永住ガイドラインの独立生計要件"
citation_summary: "ISA の永住許可ガイドラインは、独立生計について、日常生活で公共の負担にならず、資産又は技能等から見て将来も安定した生活が見込まれることとして説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-004
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "1(2)"
  claim_type: eligibility_guideline
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "年収単独での許可判断"
  deep_water_candidate: false
applies_when:
  - "用户问永住收入、生活稳定、低收入是否影响"
does_not_cover:
  - "具体年收线或家庭资产是否足够"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請を検討する外国人
direct_fact_fields:
  - permanent_independent_livelihood_requirement
ai_inferred_fields: []
needs_review_flags:
  - id: income_threshold_not_declared
    reason: "このカードは具体的な年収ラインを示さない。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、独立生計について、日常生活で公共の負担にならず、資産又は技能等から見て将来も安定した生活が見込まれることとして説明している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1(2)"
    display_label: "永住ガイドライン：独立生計"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 独立生計要件

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、独立生計について、日常生活で公共の負担にならず、資産又は技能等から見て将来も安定した生活が見込まれることとして説明している。

## exceptions_or_transition

- 具体的な年収ラインや資産評価は個別確認が必要。

## common_user_phrases

- 永住 独立生計
- 永住 年収 低い
- 永住 生活保護
- 永住 収入 安定
- 永住 收入 要求
- 永住 生计稳定

## must_say

- 独立生計は永住ガイドライン上の要件。
- 公共の負担にならず、将来安定した生活が見込まれるかを見る。

## must_not_say

- 年収だけで永住の可否が決まる。
- 年収が一定額なら必ず許可される。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-004 |
