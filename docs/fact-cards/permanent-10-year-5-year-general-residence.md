---
fact_id: permanent-10-year-5-year-general-residence
title: 永住許可ガイドライン — 原則10年在留・うち就労又は居住資格5年以上
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
citation_label: "永住ガイドラインの原則在留年数"
citation_summary: "ISA の永住許可ガイドラインは、原則として引き続き10年以上日本に在留し、そのうち就労資格又は居住資格をもって引き続き5年以上在留していることを掲げている。技能実習及び特定技能1号はこの5年に含まれない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-006
  authority_layer: L3 Official Guideline
  legal_source_type: official_guideline
  law_article_ref: "永住許可に関するガイドライン"
  source_locator: "1(3)ア"
  claim_type: residence_period_rule
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "配偶者等例外"
    - "高度人材例外"
    - "定住者例外"
  deep_water_candidate: false
applies_when:
  - "用户问永住原则上要住几年、工作几年"
does_not_cover:
  - "例外路由是否适用当前个案"
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
  - 一般の永住許可申請を検討する外国人
direct_fact_fields:
  - permanent_10_year_5_year_general_residence
ai_inferred_fields: []
needs_review_flags:
  - id: exception_routes_separate
    reason: "配偶者・定住者・高度人材等の例外は別カードへルートする。"
evidence_points:
  - claim: "ISA の永住許可ガイドラインは、原則として引き続き10年以上日本に在留し、そのうち就労資格又は居住資格をもって引き続き5年以上在留していることを掲げている。技能実習及び特定技能1号はこの5年に含まれない。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1(3)ア"
    display_label: "永住ガイドライン：原則10年・うち就労又は居住資格5年以上"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可ガイドライン — 原則10年在留・うち就労又は居住資格5年以上

## current_date_logic

Checked against the ISA permanent residence guideline page on 2026-05-12.

## current_effective_fact

永住許可ガイドラインは、原則として引き続き10年以上日本に在留し、そのうち就労資格又は居住資格をもって引き続き5年以上在留していることを掲げている。技能実習及び特定技能1号はこの5年に含まれない。

## exceptions_or_transition

- 配偶者、定住者、高度人材などの例外路由は別に確認する。
- 年数を満たすだけで許可が保証されるわけではない。

## common_user_phrases

- 永住 10年 5年
- 永住 住满10年
- 永住 就労資格 5年以上
- 永住 特定技能1号 5年 含まれる
- 永住 技能実習 5年 含まれる
- 永住 原则 年数

## must_say

- 原則は引き続き10年以上在留。
- そのうち就労資格又は居住資格で引き続き5年以上。
- 技能実習及び特定技能1号はこの5年に含まれない。

## must_not_say

- 10年いれば必ず永住できる。
- 特定技能1号の期間も常に就労5年に含まれる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-006 |
