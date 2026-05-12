---
fact_id: permanent-national-interest-framework
title: 永住許可ガイドライン — 国益適合は複数要素の総合枠
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "永住ガイドラインの国益適合は総合枠"
citation_summary: "ISA の永住許可ガイドラインは、日本国の利益に合することの中に、継続在留、公的義務、現有在留期間、現資格の基準適合、公衆衛生上の観点など複数の要素を置いている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-005
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "1(3)"
  claim_type: eligibility_guideline
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "単一要素だけでの許可判断"
  deep_water_candidate: false
applies_when:
  - "用户问永住是否只看年数、税年金是否只是材料"
does_not_cover:
  - "个案是否符合国益适合"
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
  - permanent_national_interest_framework
ai_inferred_fields: []
needs_review_flags:
  - id: aggregate_review_not_calculated
    reason: "国益適合の総合評価は本カードでは計算しない。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、日本国の利益に合することの中に、継続在留、公的義務、現有在留期間、現資格の基準適合、公衆衛生上の観点など複数の要素を置いている。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1(3)"
    display_label: "永住ガイドライン：国益適合の複数要素"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 国益適合は複数要素の総合枠

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、日本国の利益に合することの中に、継続在留、公的義務、現有在留期間、現資格の基準適合、公衆衛生上の観点など複数の要素を置いている。

## exceptions_or_transition

- 年数、税、年金、保険、現在資格のどれか一つだけで許可を断定しない。

## common_user_phrases

- 永住 国益適合
- 永住 日本国の利益
- 永住 10年 税金 年金
- 永住 条件 総合
- 永住 只看年数
- 永住 公的義務 現在資格

## must_say

- 国益適合は複数要素を含む。
- 年数や公的義務だけで許可を保証しない。

## must_not_say

- 住んだ年数だけで永住が決まる。
- 税・年金・保険がそろえば必ず許可される。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-005 |
