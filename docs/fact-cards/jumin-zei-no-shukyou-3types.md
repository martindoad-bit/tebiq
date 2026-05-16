---
fact_id: jumin-zei-no-shukyou-3types
title: 住民税証明書 — 課税証明書/納税証明書/所得証明書の区別
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "住民税証明書"
citation_summary: "住民税関連証明書は課税証明書（課税状況）、納税証明書（納税状況）、所得証明書（所得金額）の3種類。永住申請では課税・納税両方が5年分必要。"
source_display_names:
  - "総務省/各市区町村"
applies_when:
  - "住民税 証明書 種類"
does_not_cover:
  - "国税納税証明書（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住申請
    accessed: "2026-05-17"
applies_to:
  - 在留申請・各種証明用途
direct_fact_fields:
  - 課税証明書：課税の有無・年税額
  - 納税証明書：実際の納税状況
  - 所得証明書：所得金額のみ
  - 永住申請：課税+納税の5年分
  - 取得：区役所、コンビニ（マイナカード）、郵送
ai_inferred_fields:
  - 1月1日基準・6月以降発行
  - 1通200〜400円（自治体による）
needs_review_flags:
  - kuyakusho_fee_variance
  - electronic_zumin_payment_certificate
  - oversea_application_for_japan_resident
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "住民税"
    relation: "official_reference"
evidence_points:
  - claim: "住民税関連は課税証明書・納税証明書・所得証明書の3種類。永住申請では課税+納税の5年分必要。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "住民税"
    display_label: "住民税証明書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

住民税：課税/納税/所得の3種類・永住は課税+納税5年分。

## must_say

- 3種類区別
- 永住は課税+納税5年
- 1月1日基準

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
