---
fact_id: hsp-working-spouse-separation-risk
title: "高度専門職配偶者就労 — 別居時の就労リスク"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "高度専門職配偶者: 別居時の注意"
citation_summary: "ISA は、在留中に高度専門職等本人と別居した場合、許可された就労活動は認められず、資格外活動となり得ると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-005
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "高度専門職等の就労する配偶者"
  source_locator: "ページ説明・在留中の同居継続"
  claim_type: risk_signal
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "別居理由の正当性評価"
    - "処分可能性の個別判断"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職配偶者就労 — 別居時の就労リスクを聞く相談"
direct_fact_fields:
  - hsp_working_spouse_separation_risk
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_working_spouse_separation_risk_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、在留中に高度専門職等本人と別居した場合、許可された就労活動は認められず、資格外活動となり得ると説明している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ説明・在留中の同居継続"
    display_label: "高度専門職配偶者: 別居時の注意"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職配偶者就労 — 別居時の就労リスク

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の就労配偶者は、在留中も同居継続が必要とされ、別居後の就労には資格外活動などのリスクが示されている。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 配偶者 分居 还能工作
- HSP 配偶者 別居 就労
- 高度人材 配偶者 分居 上班
- J-Skip 配偶者 別居 工作
- 配偶者 分居 資格外活動
- 高度専門職 配偶者 離婚前 別居

## must_say

- 別居後の就労継続は慎重に扱う。
- 資格外活動リスクを確認する。

## must_not_say

- 在留カードが残っていれば別居後も同じ就労を続けられる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-005 |
