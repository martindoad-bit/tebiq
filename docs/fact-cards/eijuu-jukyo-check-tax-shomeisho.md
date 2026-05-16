---
fact_id: eijuu-jukyo-check-tax-shomeisho
title: 永住申請 — 引越歴ある場合は前住所地でも納税証明取得必要
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "引越前住所納税証明"
citation_summary: "永住申請に必要な住民税納税証明書5年分のうち、過去に引越歴がある場合は前住所地の市区町村でも納税証明書を取得する必要がある。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 引越 住民税"
  - "5年分 異なる住所"
does_not_cover:
  - "海外居住期間の取扱"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 引越歴ある永住申請者
direct_fact_fields:
  - 5年分の課税/納税証明書
  - 引越歴ある場合：前住所地の市区町村でも取得必要
  - 取得方法：郵送も可（過去住所地）
  - 1月1日基準で課税地が決まる
ai_inferred_fields:
  - 海外居住期間がある場合は別途説明書類
needs_review_flags:
  - oversea_period_proof_alternative
  - mainakado_lookup_for_multiple_jutsucho
  - kuyakusho_inquiry_method
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "5年分"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請の住民税納税証明書5年分は、引越歴ある場合は前住所地でも取得必要。1月1日基準で課税地が決まる。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "5年分"
    display_label: "前住所納税証明"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住申請：引越歴ある場合は前住所地納税証明も必要。

## must_say

- 前住所地でも取得必要
- 郵送可
- 1月1日基準で課税地

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
