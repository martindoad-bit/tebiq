---
fact_id: designated-activities-notice-source-anchor
title: "特定活動告示 — 告示型特定活動の法源"
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
citation_label: "特定活動告示"
citation_summary: "ISA の関係法令ページは、特定活動告示を『入管法別表第一の五の表の下欄に掲げる活動を定める件』として掲載している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-009
  authority_layer: L3 Notice
  legal_source_type: official_notice_page
  law_article_ref: "平成2年法務省告示第131号"
  source_locator: "特定活動告示ページ"
  claim_type: authority_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "個別の特定活動類型"
    - "指定書の内容"
    - "就労可否・更新可否"
  deep_water_candidate: true
applies_when:
  - "ユーザーが特定活動の公式根拠や告示を聞いている"
does_not_cover:
  - "特定活動46号など各類型の要件"
  - "告示外特定活動"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: isa-legal-index
    url: https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_index.html?hl=ja
    title: 出入国管理関係法令等
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-designated-activities-notice
    url: https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_h02.html
    title: 出入国管理及び難民認定法第七条第一項第二号の規定に基づき同法別表第一の五の表の下欄に掲げる活動を定める件
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "特定活動告示の法源確認"
direct_fact_fields:
  - designated_activities_notice_source_anchor
ai_inferred_fields: []
needs_review_flags:
  - id: subtype_detail_requires_separate_cards
    reason: "告示本文の各号は別カードで正規化する。"
evidence_points:
  - claim: "ISA の関係法令ページは特定活動告示を掲載し、入管法別表第一の五の表の下欄に掲げる活動を定める件として示している。"
    source_title: "出入国管理関係法令等"
    source_url: "https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_index.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "特定活動告示リンク"
    display_label: "特定活動告示の公式掲載"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動告示 — 告示型特定活動の法源

## current_date_logic

Checked against ISA legal-index and notice pages on 2026-05-12.

## current_effective_fact

特定活動告示は、入管法別表第一の五の表の下欄に掲げる活動を定める L3 告示ソースである。

## exceptions_or_transition

- 特定活動という名称だけでは、就労可否、期間、更新、家族帯同は判断できない。
- 指定書、告示号数、個別制度ページを確認する必要がある。

## common_user_phrases

- 特定活動告示とは
- 特定活動告示
- 第131号
- 特定活動の公式根拠
- 特定活動 根拠
- 特定活動 法務省告示
- 特定活動 第131号
- 特定活动 官方依据

## must_say

- 特定活動は類型別に確認する。

## must_not_say

- 特定活動なら全部同じ扱い。
- 特定活動告示を見るだけで個別の許可可否が分かる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 extraction | — | ai_extracted | P1C1-009 |
