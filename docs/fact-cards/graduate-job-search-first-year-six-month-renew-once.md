---
fact_id: graduate-job-search-first-year-six-month-renew-once
title: "卒業後就職活動 — 特定活動6月への変更と1回更新"
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
citation_label: "卒業後1年目の就職活動"
citation_summary: "ISA は、大学等を卒業後も継続して就職活動を希望する留学生等について、在留状況に問題がなく教育機関の推薦があるなどの場合、特定活動6月への変更が認められ、さらに1回更新が認められるため1年間滞在可能と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-013
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guidance_page
  law_article_ref: "卒業後就職活動 特定活動"
  source_locator: "1 卒業後1年目の就職活動について"
  claim_type: procedure_router
  applicable_statuses:
    - "留学"
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "技人国保持者の転職活動"
    - "推薦状や在留状況の個別判断"
    - "内定後採用待機"
  deep_water_candidate: true
applies_when:
  - "ユーザーが卒業後も日本で就職活動を続けたい"
does_not_cover:
  - "就労資格者の退職後就職活動"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: isa-graduate-job-search
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan84.html
    title: 大学等を卒業後就職活動のための滞在をご希望のみなさまへ
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "卒業後就職活動の特定活動相談"
direct_fact_fields:
  - graduate_job_search_first_year_six_month_renew_once
ai_inferred_fields: []
needs_review_flags:
  - id: school_recommendation_review
    reason: "推薦状や在留状況の評価は個別確認が必要。"
evidence_points:
  - claim: "ISA は、大学等を卒業後も継続して就職活動を希望する留学生等について、在留状況に問題がなく教育機関の推薦があるなどの場合、特定活動6月への変更が認められ、さらに1回更新が認められるため1年間滞在可能と説明している。"
    source_title: "大学等を卒業後就職活動のための滞在をご希望のみなさまへ"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan84.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1 卒業後1年目の就職活動について"
    display_label: "卒業後就職活動: 6月変更と1回更新"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 卒業後就職活動 — 特定活動6月への変更と1回更新

## current_date_logic

Checked against ISA guidance page on 2026-05-12.

## current_effective_fact

ISA は、一定条件のもとで卒業後1年目の就職活動のため特定活動6月への変更と1回更新を説明している。

## exceptions_or_transition

- これは就労資格者の退職後転職活動ではない。
- 教育機関推薦や在留状況の確認が必要。

## common_user_phrases

- 卒業後 就職活動 6月
- 就職活動 特定活動 更新一回
- 留学生 卒業後 1年 就活
- 推薦状 就職活動 特定活動
- 毕业后 找工作 6个月

## must_say

- 卒業後就職活動は留学生等の専用場面として扱う。

## must_not_say

- 卒業すれば自動で1年滞在できる。
- 技人国を辞めた人にも同じ制度が当然使える。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-013 |

