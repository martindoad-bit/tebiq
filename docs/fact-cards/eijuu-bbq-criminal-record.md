---
fact_id: eijuu-bbq-criminal-record
title: 永住申請 — 軽微な刑事罰でも素行要件で不利
state: ai_extracted
runtime_bucket: NEEDS_REWRITE
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 素行善良"
citation_summary: "永住の素行要件では、罰金以下の軽微な処分（交通違反等）でも審査に影響する場合あり。1年以上の懲役・禁錮は厳格に不可。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 交通違反"
  - "永住 罰金"
does_not_cover:
  - "退去強制の刑罰要件（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: ISA — 永住ガイドライン
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 素行要件：法律遵守＋社会的非難なし
  - 罰金以下：複数あれば不利（実務）
  - 1年以上懲役・禁錮：厳格に不可
  - 軽微な交通違反は数件程度許容（実務）
ai_inferred_fields:
  - 過去5-10年の素行が審査対象
  - 反省状の提出で考慮される場合あり
needs_review_flags:
  - juuyou_keiji_processing_year_lookback
  - hanseijo_effectiveness
  - 5-10year_lookback_specifics
related_links:
  - title: "ISA — 永住ガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住ガイドライン"
    locator: "素行"
    relation: "official_reference"
evidence_points:
  - claim: "永住の素行要件では罰金以下の軽微処分（交通違反等）も審査に影響、1年以上懲役・禁錮は厳格に不可。"
    source_title: "ISA — 永住ガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "素行"
    display_label: "永住 素行善良"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住素行：軽微処分でも不利・1年以上懲役は厳格不可。

## must_say

- 罰金以下でも不利
- 1年以上懲役は不可
- 過去5-10年が対象

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
