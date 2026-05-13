---
fact_id: guard-hsp-domestic-servant-is-special-activity-not-family
title: "高度専門職家事使用人 — 家族滞在や一般雇用ではない"
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
citation_label: "高度専門職家事使用人: 特定活動"
citation_summary: "ISA は高度専門職外国人又は特別高度人材外国人の家事使用人を、家事使用人の特定活動として案内している。家族滞在や一般の家政サービス利用とは分ける。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-004
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 家事使用人"
  source_locator: "高度専門職外国人の家事使用人"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "雇用契約の有効性"
    - "家事使用人各類型の条件充足"
    - "一般家政サービスの紹介"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html
    title: 在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度専門職等の家事使用人を家族滞在や一般雇用と混同している相談"
direct_fact_fields:
  - hsp_domestic_servant_special_activity_not_family
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_domestic_servant_route_review
    reason: "入国帯同型、家庭事情型、金融人材型、特別高度人材型で条件が異なるため。"
evidence_points:
  - claim: "ISA は、高度専門職外国人又は特別高度人材外国人の家事使用人を、在留資格「特定活動」の家事使用人として案内している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ見出し"
    display_label: "高度専門職家事使用人: 特定活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職家事使用人 — 家族滞在や一般雇用ではない

## current_date_logic

Checked against the ISA page on 2026-05-13.

## current_effective_fact

高度専門職外国人又は特別高度人材外国人の家事使用人は、特定活動の家事使用人として確認する。家族滞在、一般の家政サービス、通常の雇用系在留資格と混同しない。

## exceptions_or_transition

- このカードは、家事使用人の類型選択、雇用契約、報酬、世帯年収などの充足判断をしない。

## common_user_phrases

- 高度専門職 家事使用人 家族滞在
- 高度人才 家政 家族滞在
- J-Skip 家事使用人 家族
- 特別高度人材 家事使用人 雇用
- 高度専門職 保姆 签证
- 高度人材 带阿姨

## must_say

- 高度専門職等の家事使用人は、特定活動の家事使用人として別に確認する。
- 一般の家族滞在や家政サービス探しとは違う問題として扱う。

## must_not_say

- 家事使用人は家族滞在で呼べる。
- 高度専門職なら誰でも自由に家事使用人を雇って在留させられる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-004 |
