---
fact_id: designated-activities-graduate-school-waiting-source
title: "特定活動 — 大学院進学までの滞在"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 5
citation_label: "特定活動: 大学院進学待機"
citation_summary: "ISA は、大学を卒業した留学生等が大学院入学までの滞在を希望する場合のページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-011
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 大学院入学までの滞在"
  source_locator: "ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
    - "留学"
  application_type:
    - status_identification
  exclusion_scope:
    - "進学予定の確実性判断"
    - "就職活動との区別"
    - "留学更新との区別"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-grad-school-waiting
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities52.html
    title: 大学を卒業した留学生等が大学院入学までの滞在を希望する場合
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "大学卒業後から大学院入学までの滞在として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_graduate_school_waiting_source
ai_inferred_fields: []
needs_review_flags:
  - id: graduate_school_waiting_needs_review
    reason: "入学予定、期間、就職活動との違い、留学更新との関係は個別確認が必要。"
evidence_points:
  - claim: "ISA は、大学を卒業した留学生等が大学院入学までの滞在を希望する場合のページを設けている。"
    source_title: "大学を卒業した留学生等が大学院入学までの滞在を希望する場合"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities52.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: 大学院進学待機"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — 大学院進学までの滞在

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は、大学を卒業した留学生等が大学院入学までの滞在を希望する場合のページを設けている。

## exceptions_or_transition

- このカードは、進学予定の確実性、期間、就職活動特定活動や留学更新との違いを判断しない。

## common_user_phrases

- 大学院 入学まで 特定活動
- 大学卒業 大学院まで 滞在
- 大学院進学 待機 ビザ
- 留学生 卒業後 大学院 入学前
- 大学院 合格 入学まで 在留資格
- graduate school waiting visa Japan

## must_say

- 大学院入学までの滞在は、卒業後就職活動や通常の留学更新と分けて確認する。
- 入学予定と期間を確認する必要がある。

## must_not_say

- 卒業後なら誰でも大学院待機の特定活動を使える。
- 大学院待機と就職活動特定活動は同じ。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-011 |
