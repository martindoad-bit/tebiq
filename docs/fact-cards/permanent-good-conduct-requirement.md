---
fact_id: permanent-good-conduct-requirement
title: 永住許可ガイドライン — 素行善良要件
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
citation_label: "永住ガイドラインの素行善良要件"
citation_summary: "ISA の永住許可ガイドラインは、素行善良について、法律を遵守し、日常生活でも住民として社会的に非難されることのない生活を営んでいることとして説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-003
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "1(1)"
  claim_type: eligibility_guideline
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "個別の違反歴評価"
  deep_water_candidate: false
applies_when:
  - "用户问永住素行善良、违法记录是否影响"
does_not_cover:
  - "具体违法记录对永住审查的影响"
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
  - permanent_good_conduct_requirement
ai_inferred_fields: []
needs_review_flags:
  - id: individual_conduct_review_required
    reason: "具体的な違反歴の評価は個別確認が必要。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、素行善良について、法律を遵守し、日常生活でも住民として社会的に非難されることのない生活を営んでいることとして説明している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1(1)"
    display_label: "永住ガイドライン：素行善良"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 素行善良要件

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、素行善良について、法律を遵守し、日常生活でも住民として社会的に非難されることのない生活を営んでいることとして説明している。

## exceptions_or_transition

- 個別の違反歴や処分歴がどう評価されるかは断定しない。

## common_user_phrases

- 永住 素行善良
- 永住 交通違反
- 永住 違反歴 影響
- 永住 犯罪歴
- 永住 违法记录
- 永住 品行

## must_say

- 素行善良は永住ガイドライン上の要件。
- 個別の違反歴評価は断定しない。

## must_not_say

- 軽微な違反なら絶対に影響しない。
- 違反が一つでもあれば必ず不許可。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-003 |
