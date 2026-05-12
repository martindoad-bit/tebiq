---
fact_id: designated-activities-isa-type-list-router
title: "特定活動 — ISA の類型一覧で先に分岐する"
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
citation_label: "特定活動の類型一覧"
citation_summary: "ISA の特定活動ページは、ワーキングホリデー、医療滞在、就職活動、起業活動、J-Find、デジタルノマド等の多数の個別ページを一覧している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-010
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "在留資格『特定活動』"
  source_locator: "特定活動の個別ページ一覧"
  claim_type: subtype_router
  applicable_statuses:
    - "特定活動"
  application_type:
    - current-status
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "各類型の要件"
    - "指定書の内容"
    - "就労可否の結論"
  deep_water_candidate: false
applies_when:
  - "ユーザーが特定活動だけを指定して相談している"
does_not_cover:
  - "個別類型の詳細要件"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: isa-designated-activities-status
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities.html
    title: 在留資格「特定活動」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "特定活動の類型判定"
direct_fact_fields:
  - designated_activities_isa_type_list_router
ai_inferred_fields: []
needs_review_flags:
  - id: designation_document_required
    reason: "在留カード上の資格名だけでは指定活動内容を確定できない。"
evidence_points:
  - claim: "ISA の特定活動ページは、多数の特定活動類型への個別ページリンクを一覧している。"
    source_title: "在留資格「特定活動」"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities.html"
    source_organization: "出入国在留管理庁"
    source_locator: "個別類型リンク一覧"
    display_label: "特定活動の類型一覧"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動 — ISA の類型一覧で先に分岐する

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA の特定活動ページには、複数の特定活動類型への個別ページが一覧されている。

## exceptions_or_transition

- 「特定活動」とだけ聞かれた場合、まず類型や指定内容を確認する。
- 就労可否、期間、更新可否は類型ごとに違う。

## common_user_phrases

- 特定活動 種類
- 特定活動 何号
- 特定活動 指定書
- 特定活動 就労できるか
- 特定活動 更新できるか
- 特定活动 可以工作吗

## must_say

- 特定活動は類型を特定してから答える。

## must_not_say

- 特定活動は全部同じ。
- 特定活動なら一律に就労できる。
- 特定活動なら一律に就労できない。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-010 |
