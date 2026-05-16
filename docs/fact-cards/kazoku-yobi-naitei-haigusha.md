---
fact_id: kazoku-yobi-naitei-haigusha
title: 内定先入社前 — 配偶者・子の家族滞在COE申請タイミング
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "内定前家族COE"
citation_summary: "技人国等で内定済みで来日前の配偶者・子の家族滞在COE申請は、扶養者本人のCOE取得後または入社・在留資格取得後が一般的。同時申請も可だが書類補完要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技人国 家族 同時 来日"
  - "家族 COE タイミング"
does_not_cover:
  - "扶養者の技人国COE申請（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/dependent.html
    label: ISA — 家族滞在
    accessed: "2026-05-17"
applies_to:
  - 内定済みの呼び寄せ予定者
direct_fact_fields:
  - 一般的：扶養者COE取得→上陸→家族COE申請
  - 同時申請：可だが扶養者の在職証明等で補完
  - 入社後の所得証明取得後の方が審査スムーズ（実務）
ai_inferred_fields:
  - 入社待ちの場合は内定通知書等で代替
  - 海外大学卒で来日前のJ-Find等は配偶者特活で対応
needs_review_flags:
  - same_time_filing_specific_documents
  - employer_letter_alternative_value
  - jfind_haigusha_specifics
related_links:
  - title: "ISA — 家族滞在"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在"
    locator: "COE"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在COEは扶養者の在留資格取得後が一般的。同時申請も可だが扶養者の在職証明等で補完が必要（実務）。"
    source_title: "ISA — 家族滞在"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "扶養者"
    display_label: "内定前家族COE"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

家族COE：扶養者COE/上陸後が一般・同時申請も可。

## must_say

- 扶養者COE後が一般
- 同時申請も可
- 在職証明等補完

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
