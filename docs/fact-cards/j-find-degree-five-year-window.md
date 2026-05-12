---
fact_id: j-find-degree-five-year-window
title: "J-Find — 学位授与日から5年以内"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "J-Find 卒業後5年"
citation_summary: "ISA は、J-Find の卒業等後の年数について、対象大学を卒業又は大学院課程を修了して学位又は専門職学位を授与された日から5年以内の方と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-007
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 未来創造人材"
  source_locator: "2 卒業等後の年数"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "学位授与日の証明"
    - "対象大学該当性"
    - "5年を超える場合"
  deep_water_candidate: true
official_sources:
  - id: isa-j-find
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities51.html
    title: 優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "J-Findの卒業後年数確認"
direct_fact_fields:
  - j_find_degree_five_year_window
ai_inferred_fields: []
needs_review_flags:
  - id: j_find_degree_date_evidence
    reason: "卒業日と学位授与日の確認資料は個別確認が必要。"
evidence_points:
  - claim: "ISA は、J-Find の対象者について、対象大学を卒業又は大学院課程を修了し、学位等を授与された日から5年以内の方と説明している。"
    source_title: "優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities51.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2 卒業等後の年数"
    display_label: "J-Find: 学位授与日から5年以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Find — 学位授与日から5年以内

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

J-Find では、対象大学卒業又は大学院修了により学位等を授与された日から5年以内であることが示されている。

## exceptions_or_transition

- 卒業日、修了日、学位授与日は証明書で確認する。

## common_user_phrases

- J-Find 卒業後 5年
- J-Find 5年以内
- 未来創造人材 卒業 年数
- 海外大学 卒業 5年 J-Find
- J-Find 学位 授与日

## must_say

- 5年の起算点は学位等を授与された日として確認する。

## must_not_say

- 卒業から何年経っても対象だと言う。
- 対象大学だけ見ればよいとする。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-007 |
