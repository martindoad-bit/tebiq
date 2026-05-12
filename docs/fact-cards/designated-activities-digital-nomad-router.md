---
fact_id: designated-activities-digital-nomad-router
title: "特定活動 — デジタルノマド及び配偶者・子"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 1
citation_label: "デジタルノマド特定活動"
citation_summary: "ISA のデジタルノマドページは、特定活動告示53号のデジタルノマドと告示54号の配偶者・子を区分して掲載している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-015
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示53号 / 54号"
  source_locator: "デジタルノマド及び配偶者・子"
  claim_type: subtype_router
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_acquisition
  exclusion_scope:
    - "対象国・地域該当性"
    - "収入・保険等の要件"
    - "在留カード交付対象性の個別説明"
  deep_water_candidate: true
applies_when:
  - "ユーザーがデジタルノマドとして日本滞在を相談している"
does_not_cover:
  - "日本企業で働く就労資格"
  - "経営・管理"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: isa-designated-activities-status
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities.html
    title: 在留資格「特定活動」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-digital-nomad
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html
    title: 在留資格「特定活動」（デジタルノマド及びその配偶者・子）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "デジタルノマド特定活動の相談"
direct_fact_fields:
  - designated_activities_digital_nomad_router
ai_inferred_fields: []
needs_review_flags:
  - id: digital_nomad_latest_country_list
    reason: "対象国・地域一覧は別添PDFで最新確認が必要。"
evidence_points:
  - claim: "ISA のデジタルノマドページは、特定活動告示53号のデジタルノマドと告示54号の配偶者・子を区分して掲載している。"
    source_title: "在留資格「特定活動」（デジタルノマド及びその配偶者・子）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities10_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "活動表"
    display_label: "特定活動: デジタルノマド"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動 — デジタルノマド及び配偶者・子

## current_date_logic

Checked against ISA status pages on 2026-05-12.

## current_effective_fact

ISA は、デジタルノマド及びその配偶者・子に関する特定活動ページを設け、告示53号と54号を区分している。

## exceptions_or_transition

- 対象国・地域、収入、保険などの要件は詳細確認が必要。
- 日本企業で働く就労資格や経営・管理とは分ける。

## common_user_phrases

- デジタルノマド 日本 特定活動
- デジタルノマド
- リモートワーク 日本 ビザ
- digital nomad Japan visa
- digital nomad
- 特定活動 53号
- 特定活動 54号
- 数字游民 日本 签证

## must_say

- デジタルノマドは専用の特定活動類型として確認する。

## must_not_say

- リモートワークなら誰でもデジタルノマド特定活動に該当する。
- 日本企業で普通に働く就労資格と同じだと扱う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-015 |
