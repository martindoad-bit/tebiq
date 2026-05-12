---
fact_id: graduate-job-search-qoa-28hour-internship
title: "卒業後就職活動 — 資格外活動28時間とインターンシップ例外"
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
citation_label: "就職活動特定活動の資格外活動"
citation_summary: "ISA は、卒業後就職活動の特定活動について、一定要件を満たせば資格外活動許可を受けて週28時間以内の資格外活動が可能で、就職活動の一環として行うインターンシップでは28時間を超える資格外活動許可を受けられる場合があると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-016
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guidance_page
  law_article_ref: "卒業後就職活動 資格外活動"
  source_locator: "4 資格外活動許可について"
  claim_type: qoa_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - qualification_outside_activity
  exclusion_scope:
    - "個別の資格外活動許可の有無"
    - "就職支援事業インターンシップの細部"
    - "留学資格の28時間ルール"
  deep_water_candidate: true
applies_when:
  - "ユーザーが卒業後就職活動特定活動中にアルバイトやインターンをしたい"
does_not_cover:
  - "留学生の在学中アルバイト"
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
  - "卒業後就職活動の資格外活動"
direct_fact_fields:
  - graduate_job_search_qoa_28hour_internship
ai_inferred_fields: []
needs_review_flags:
  - id: qoa_permission_required
    reason: "実際に資格外活動許可を受けているかは個別確認が必要。"
evidence_points:
  - claim: "ISA は、卒業後就職活動の特定活動について、一定要件を満たせば資格外活動許可を受けて週28時間以内の資格外活動が可能で、就職活動の一環として行うインターンシップでは28時間を超える資格外活動許可を受けられる場合があると説明している。"
    source_title: "大学等を卒業後就職活動のための滞在をご希望のみなさまへ"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan84.html"
    source_organization: "出入国在留管理庁"
    source_locator: "4 資格外活動許可について"
    display_label: "卒業後就職活動: 資格外活動とインターンシップ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 卒業後就職活動 — 資格外活動28時間とインターンシップ例外

## current_date_logic

Checked against ISA guidance page on 2026-05-12.

## current_effective_fact

ISA は、卒業後就職活動の特定活動について、一定要件下で資格外活動許可を受けて週28時間以内の活動が可能で、就職活動の一環のインターンシップでは28時間を超える許可を受けられる場合があると説明している。

## exceptions_or_transition

- 資格外活動許可の有無を必ず分ける。
- 留学在学中のアルバイトとは別に扱う。

## common_user_phrases

- 就職活動 特定活動 アルバイト
- 卒業後 就活 28時間
- 就職活動 インターン 28時間超
- 特定活動 就活 資格外活動
- 毕业后 找工作 打工 28小时

## must_say

- 就職活動特定活動中のアルバイトは資格外活動許可と条件を確認する。

## must_not_say

- 留学生と同じく当然28時間働ける。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-016 |

