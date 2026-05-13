---
fact_id: guard-hsp-working-spouse-is-special-activity-not-dependent
title: "高度専門職配偶者就労 — 家族滞在とは別の特定活動"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "高度専門職配偶者: 特定活動"
citation_summary: "ISA は高度専門職外国人又は特別高度人材外国人の就労する配偶者を在留資格「特定活動」として案内している。普通の家族滞在とは別に確認する。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-001
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示別表第33号・第5号の2"
  source_locator: "高度専門職外国人の就労する配偶者"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
    - "家族滞在"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "就労内容の該当性判断"
    - "配偶者本人の許可可否"
    - "家族滞在の資格外活動許可判断"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-dependent
    url: https://www.moj.go.jp/isa/applications/status/dependent.html
    title: 在留資格「家族滞在」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度専門職又はJ-Skipの配偶者就労を普通の家族滞在と混同している相談"
direct_fact_fields:
  - hsp_working_spouse_special_activity_not_dependent
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_spouse_work_route_review
    reason: "配偶者の現在資格、同居、報酬、職務内容により申請類型が変わるため。"
evidence_points:
  - claim: "ISA は、高度専門職外国人又は特別高度人材外国人の就労する配偶者を在留資格「特定活動」として案内している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ見出し"
    display_label: "高度専門職配偶者: 特定活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は家族滞在を、扶養を受ける配偶者又は子として行う日常的な活動として案内している。"
    source_title: "在留資格「家族滞在」"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ見出し・対象説明"
    display_label: "家族滞在: 配偶者又は子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職配偶者就労 — 家族滞在とは別の特定活動

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

高度専門職外国人又は特別高度人材外国人の就労する配偶者は、ISA が在留資格「特定活動」のページで案内している。普通の家族滞在の配偶者と同じ扱いにしない。

## exceptions_or_transition

- このカードは、配偶者がどの活動で許可されるか、又は現在の家族滞在から変更できるかを判断しない。

## common_user_phrases

- 高度専門職 配偶者 家族滞在
- 高度人才 配偶 工作 家族滞在
- J-Skip 配偶者 家族滞在
- 高度専門職 spouse dependent
- 高度人材 配偶者 特定活動
- 特別高度人材 配偶者 工作

## must_say

- 高度専門職又はJ-Skipの配偶者就労は、普通の家族滞在とは別に確認する。
- ISA はこの配偶者就労を特定活動のページで案内している。

## must_not_say

- 高度専門職の配偶者就労は普通の家族滞在と同じ。
- 家族滞在のまま無条件でフルタイム就労できる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-001 |
