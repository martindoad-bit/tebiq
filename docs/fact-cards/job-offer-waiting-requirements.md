---
fact_id: job-offer-waiting-requirements
title: "内定後採用待機 — 内定後1年以内かつ卒業後1年6月以内の採用"
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
citation_label: "内定後採用待機の要件"
citation_summary: "ISA は、大学又は専門学校の在学中・卒業後に内定し採用まで滞在する特定活動について、本邦教育機関卒業、内定後1年以内かつ卒業後1年6月以内の採用、在留状況に問題がないこと、企業の連絡・取消連絡誓約などを要件として説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-017
  authority_layer: L4 ISA Guidance
  legal_source_type: official_guidance_page
  law_article_ref: "内定者のための特定活動"
  source_locator: "対象となる内定者 / 要件"
  claim_type: eligibility_guidance
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_change
  exclusion_scope:
    - "内定の個別十分性"
    - "就労資格への変更資料"
    - "資格外活動"
  deep_water_candidate: true
applies_when:
  - "ユーザーが内定後、入社まで日本に滞在したい"
does_not_cover:
  - "卒業後就職活動一般"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: isa-job-offer-waiting
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html
    title: 大学又は専門学校の在学中又は卒業後に就職先が内定し採用までの滞在をご希望のみなさまへ
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "内定後採用待機の特定活動相談"
direct_fact_fields:
  - job_offer_waiting_requirements
ai_inferred_fields: []
needs_review_flags:
  - id: hiring_timing_detail_review
    reason: "採用予定日や内定書類の個別確認が必要。"
evidence_points:
  - claim: "ISA は、内定後採用待機の特定活動について、本邦教育機関卒業、内定後1年以内かつ卒業後1年6月以内の採用、在留状況に問題がないこと、企業の連絡・取消連絡誓約などを要件として説明している。"
    source_title: "大学又は専門学校の在学中又は卒業後に就職先が内定し採用までの滞在をご希望のみなさまへ"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html"
    source_organization: "出入国在留管理庁"
    source_locator: "対象となる内定者について / 要件"
    display_label: "内定後採用待機: 期限と企業誓約"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 内定後採用待機 — 内定後1年以内かつ卒業後1年6月以内の採用

## current_date_logic

Checked against ISA guidance page on 2026-05-12.

## current_effective_fact

ISA は、内定後採用待機の特定活動について、内定後1年以内かつ卒業後1年6月以内の採用などの要件を説明している。

## exceptions_or_transition

- 卒業後就職活動中と内定後採用待機を分ける。
- 就労資格への変更資料も別途必要になる。

## common_user_phrases

- 内定後 採用まで 特定活動
- 入社まで 滞在 特定活動
- 内定後1年以内 卒業後1年6月
- 内定待機 ビザ
- 拿到内定 入职前 签证

## must_say

- 内定後採用待機は採用時期と企業誓約を確認する。

## must_not_say

- 内定があれば何年でも日本で待てる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-017 |

