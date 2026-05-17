---
fact_id: zeimu-shomeisho-3types
title: 国税納税証明書 — その1/その2/その3の違い
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "国税納税証明書3種類"
citation_summary: "国税納税証明書はその1（納付済額）、その2（所得金額）、その3（未納税額がないこと）の3種類。永住申請ではその3（5税目全て）が要求される。"
source_display_names:
  - "国税庁"
applies_when:
  - "納税証明書 種類"
  - "その3 永住"
does_not_cover:
  - "住民税課税/納税証明書（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
    label: 国税庁 — 納税証明書
    accessed: "2026-05-17"
applies_to:
  - 在留申請・各種証明用途
direct_fact_fields:
  - その1：納付済税額・未納税額・申告所得税額等
  - その2：所得金額
  - その3：未納税額がないこと（5税目）
  - 永住申請：その3（源泉所得税、申告所得税、消費税、相続税、贈与税の5税目全て）
  - 取得：税務署窓口、e-Tax、郵送
ai_inferred_fields:
  - 1通400円（窓口・郵送）/370円（e-Tax）
needs_review_flags:
  - fee_2026_exact
  - oversea_application_route
  - electronic_certificate_validity_specifics
related_links:
  - title: "国税庁 — 納税証明書"
    url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    organization: "国税庁"
    display_label: "納税証明書"
    locator: "その3"
    relation: "official_reference"
evidence_points:
  - claim: "国税納税証明書はその1（納付済額）、その2（所得金額）、その3（未納税額なし・5税目）の3種類。永住申請はその3。"
    source_title: "国税庁 — 納税証明書"
    source_url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    source_organization: "国税庁"
    source_locator: "その3"
    display_label: "国税納税証明書3種類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

納税証明書3種類・永住はその3（5税目）。

## must_say

- その1/その2/その3の違い
- 永住はその3（5税目）
- e-Taxでも取得可

## injection_format

### injection_certain_block

```text
- 納税証明書3種類・永住はその3（5税目）。
- その1/その2/その3の違い
- 永住はその3（5税目）
- e-Taxでも取得可
- 出典: 国税庁 — 納税証明書 https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
