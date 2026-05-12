---
fact_id: permanent-current-status-landing-criteria-fit
title: 永住許可ガイドライン — 現有在留資格の基準適合も見る
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
citation_label: "永住ガイドラインは現有在留資格の基準適合も掲げる"
citation_summary: "ISA の永住許可ガイドラインは、現に有している在留資格について、上陸許可基準等に適合していることを掲げ、注記で上陸基準省令、特定活動告示、定住者告示などを示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-014
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "1(3)エ・注2"
  claim_type: current_status_fit
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "現有資格の個別基準判定"
  deep_water_candidate: true
applies_when:
  - "用户问永住是否只看过去年数、不看现在签证状态"
does_not_cover:
  - "技人国、经管等当前资格是否实际适合"
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
  - permanent_current_status_landing_criteria_fit
ai_inferred_fields: []
needs_review_flags:
  - id: current_status_fit_requires_domain
    reason: "現有資格が基準に適合しているかは資格別に確認が必要。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、現に有している在留資格について、上陸許可基準等に適合していることを掲げ、注記で上陸基準省令、特定活動告示、定住者告示などを示している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1(3)エ・注2"
    display_label: "永住ガイドライン：現有在留資格の基準適合"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 現有在留資格の基準適合も見る

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、現に有している在留資格について、上陸許可基準等に適合していることを掲げ、注記で上陸基準省令、特定活動告示、定住者告示などを示している。

## exceptions_or_transition

- どの基準に適合するかは現在資格ごとに確認する。

## common_user_phrases

- 永住 当前签证 条件
- 永住 现在资格 不符合
- 永住 現有在留資格 基準
- 永住 经管 公司停了
- 永住 技人国 工作内容
- 永住 上陆基准

## must_say

- 現有在留資格の基準適合もガイドライン上の要素。
- 現在資格ごとの基準確認が必要。

## must_not_say

- 永住は過去の年数だけで判断する。
- 現在の在留資格の状態は関係ない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-014 |
