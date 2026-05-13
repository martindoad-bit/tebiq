---
fact_id: guard-hsp-working-spouse-not-28hour-qoa
title: "高度専門職配偶者就労 — 28時間の資格外活動とは別"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "高度専門職配偶者: 28時間とは別"
citation_summary: "ISA は高度専門職等の就労する配偶者について、特定活動として許可された就労活動を前提に説明している。家族滞在の資格外活動28時間枠とは分けて扱う。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-002
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示別表第33号・第5号の2 / 資格外活動許可"
  source_locator: "高度専門職外国人の就労する配偶者・別居時注意"
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
    - "資格外活動許可の個別判断"
    - "就労開始可否"
    - "罰則・退去強制該当性の判断"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度専門職等の配偶者就労を資格外活動28時間で説明しようとする相談"
direct_fact_fields:
  - hsp_working_spouse_not_28hour_qoa
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_spouse_qoa_confusion_review
    reason: "現在の資格外活動許可の有無と、特定活動への変更要否は個別確認が必要。"
evidence_points:
  - claim: "ISA は、高度専門職等の就労する配偶者について、所定要件を満たした上で就労活動を認める特定活動として案内している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度説明"
    display_label: "高度専門職配偶者: 特定活動としての就労"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、在留中に高度専門職外国人又は特別高度人材外国人と別居した場合は許可された就労活動を行うことが認められず、就労した場合は資格外活動となる可能性があると注意している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "別居時注意"
    display_label: "高度専門職配偶者: 別居時の就労注意"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職配偶者就労 — 28時間の資格外活動とは別

## current_date_logic

Checked against the ISA page on 2026-05-13.

## current_effective_fact

高度専門職等の就労する配偶者は、特定活動として許可された就労活動の枠で確認する。普通の家族滞在の資格外活動28時間枠と同じ答えにしない。

## exceptions_or_transition

- このカードは、現在の資格外活動許可の有無、就労できる職務、就労開始時期を判断しない。

## common_user_phrases

- 高度専門職 配偶者 28時間
- 高度人才 配偶 资格外活动
- J-Skip 配偶者 28時間
- 特別高度人材 配偶者 資格外活動
- 高度専門職 配偶者 フルタイム
- 高度人材 配偶者 打工 28小时

## must_say

- 高度専門職等の配偶者就労は、普通の家族滞在の28時間枠とは別に確認する。
- 別居などで前提が崩れると、許可された就労活動を行えない可能性がある。

## must_not_say

- 高度専門職の配偶者は資格外活動許可だけでフルタイム就労できる。
- 28時間以内なら高度専門職配偶者就労の条件は見なくてよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-002 |
