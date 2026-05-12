---
fact_id: highly-skilled-one-under70-not-immediate-loss
title: "高度専門職1号 — 入国後に70点未満でも直ちに失効とは限らない"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 1
citation_label: "高度専門職1号: 70点未満"
citation_summary: "ISA は、高度専門職1号で在留中にポイント合計が70点未満になった時点で、直ちに高度専門職1号で在留できなくなるわけではないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-007
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "高度専門職1号 在留期間更新"
  source_locator: "在留期間更新許可申請（高度専門職1号）"
  claim_type: transition_boundary
  applicable_statuses:
    - "高度専門職1号"
  application_type:
    - status_renewal
  exclusion_scope:
    - "次回更新可否"
    - "活動変更・退職時の取消リスク"
    - "J-Skip 基準不充足時の扱い"
  deep_water_candidate: true
official_sources:
  - id: isa-highly-skilled-status-page
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html?hl=ja
    title: 在留資格「高度専門職」（高度人材ポイント制）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職1号で点数が下がった場合の在留継続を聞く相談"
direct_fact_fields:
  - highly_skilled_one_under70_not_immediate_loss
ai_inferred_fields: []
needs_review_flags:
  - id: renewal_and_cancellation_review
    reason: "更新可否や取消リスクは在留状況と活動内容を合わせて確認する必要がある。"
evidence_points:
  - claim: "ISA は、高度専門職1号で在留中にポイント合計が70点未満になった時点で、直ちに高度専門職1号で在留できなくなるわけではないと説明している。"
    source_title: "在留資格「高度専門職」（高度人材ポイント制）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "在留期間更新許可申請（高度専門職1号）"
    display_label: "高度専門職1号: 70点未満"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職1号 — 入国後に70点未満でも直ちに失効とは限らない

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は、高度専門職1号で在留中にポイント合計が70点未満になった時点で、直ちに高度専門職1号で在留できなくなるわけではないと説明している。

## exceptions_or_transition

- このカードは、次回更新可否、取消リスク、J-Skip 基準不充足時の扱いを判断しない。

## common_user_phrases

- 高度専門職 70点 未満
- 高度人材 点数 下がった
- 高度専門職 年収 下がった
- 高度専門職 更新 点数不足
- 高度人材 70点切った
- 高度専門職 失効

## must_say

- 70点未満になった時点で直ちに失効とは限らない。
- 更新時や活動状況は別に確認する。

## must_not_say

- 70点を切ったらその日に不法滞在になる。
- 70点未満でも更新は必ずできる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-007 |
