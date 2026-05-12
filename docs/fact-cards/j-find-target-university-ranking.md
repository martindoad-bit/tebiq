---
fact_id: j-find-target-university-ranking
title: "J-Find — 対象大学ランキング要件"
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
citation_label: "J-Find 対象大学"
citation_summary: "ISA は、J-Find の対象大学について、3つの世界大学ランキングのうち2つ以上で100位以内にランクインしている大学を卒業又は大学院課程を修了していることを要件として示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-006
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 未来創造人材"
  source_locator: "1 対象大学"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
  exclusion_scope:
    - "最新ランキング確認"
    - "対象大学一覧PDF"
    - "学位該当性"
  deep_water_candidate: true
official_sources:
  - id: isa-j-find
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities51.html
    title: 優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "J-Find対象大学確認"
direct_fact_fields:
  - j_find_target_university_ranking
ai_inferred_fields: []
needs_review_flags:
  - id: j_find_latest_ranking_pdf
    reason: "対象大学一覧は令和8年1月時点PDFが参照され、申請時は最新ランキング確認が必要。"
evidence_points:
  - claim: "ISA は、J-Find の対象大学を、3つの世界大学ランキングのうち2つ以上で100位以内にランクインしている大学として説明している。"
    source_title: "優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities51.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1 対象大学"
    display_label: "J-Find: 対象大学ランキング"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Find — 対象大学ランキング要件

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

J-Find の対象大学は、QS、THE、ARWU の3ランキングのうち2つ以上で100位以内に入る大学として説明されている。

## exceptions_or_transition

- 対象大学一覧はランキング時点で変わるため、申請時の最新確認が必要。

## common_user_phrases

- J-Find 対象大学
- J-Find 大学ランキング
- 未来創造人材 対象大学
- QS THE ARWU J-Find
- 海外大学 ランキング 日本 ビザ

## must_say

- 対象大学は複数ランキングと最新一覧で確認する。

## must_not_say

- 有名大学なら対象だと判断する。
- 1つのランキングだけで足りると言う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-006 |
