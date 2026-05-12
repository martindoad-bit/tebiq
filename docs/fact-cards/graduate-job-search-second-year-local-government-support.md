---
fact_id: graduate-job-search-second-year-local-government-support
title: "卒業後就職活動 — 地方公共団体支援事業による2年目ルート"
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
citation_label: "卒業後2年目の就職活動"
citation_summary: "ISA は、卒業後1年目の就職活動特定活動中の留学生等が、要件に適合する地方公共団体の就職支援事業対象者として証明を受ける場合、卒業後2年目の就職活動のため特定活動6月への変更と1回更新が認められ、更に1年間滞在可能と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-014
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guidance_page
  law_article_ref: "卒業後就職活動 地方公共団体支援"
  source_locator: "2 卒業後2年目の就職活動について"
  claim_type: exception_router
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
    - period_renewal
  exclusion_scope:
    - "対象事業の適合性"
    - "証明書の十分性"
    - "個別更新可否"
  deep_water_candidate: true
applies_when:
  - "ユーザーが卒業後2年目も就職活動したい"
does_not_cover:
  - "1年目の通常就職活動特定活動"
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
  - "卒業後2年目就職活動の特定活動相談"
direct_fact_fields:
  - graduate_job_search_second_year_local_government_support
ai_inferred_fields: []
needs_review_flags:
  - id: local_program_eligibility_pending
    reason: "地方公共団体の支援事業が当局要件に適合するかは個別確認が必要。"
evidence_points:
  - claim: "ISA は、卒業後1年目の就職活動特定活動中の留学生等が、要件に適合する地方公共団体の就職支援事業対象者として証明を受ける場合、卒業後2年目の就職活動のため特定活動6月への変更と1回更新が認められ、更に1年間滞在可能と説明している。"
    source_title: "大学等を卒業後就職活動のための滞在をご希望のみなさまへ"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan84.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2 卒業後2年目の就職活動について"
    display_label: "卒業後就職活動: 2年目地方公共団体支援ルート"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 卒業後就職活動 — 地方公共団体支援事業による2年目ルート

## current_date_logic

Checked against ISA guidance page on 2026-05-12.

## current_effective_fact

ISA は、地方公共団体の就職支援事業に参加する場合の卒業後2年目の就職活動ルートを説明している。

## exceptions_or_transition

- 地方公共団体の支援事業対象者であること等の確認が必要。

## common_user_phrases

- 卒業後 2年目 就職活動
- 卒業後 2年目 地方公共団体 就職支援
- 地方公共団体 就職支援 特定活動
- 就職活動 特定活動 2年
- 既卒留学生 就職支援事業
- 毕业后 第二年 找工作 特定活动

## must_say

- 2年目ルートは地方公共団体支援事業など条件付きで確認する。

## must_not_say

- 卒業後就職活動は誰でも2年できる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-014 |
