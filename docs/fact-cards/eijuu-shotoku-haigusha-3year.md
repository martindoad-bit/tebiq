---
fact_id: eijuu-shotoku-haigusha-3year
title: 永住申請 — 配偶者ルートでは住民税3年分（5年分と異なる）
state: ai_verified   # LOOP3 2026-05-17: spouse-route material years source repaired
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "配偶者永住 3年所得"
citation_summary: "日本人/永住者配偶者経由の永住申請では住民税3年分（通常永住の5年分と異なる）。ただしISA公式ページの記載は別ページ（zairyu_eijyu01.html）を確認要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "配偶者 永住 所得 何年"
does_not_cover:
  - "高度人材の3年（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu01.html
    label: ISA — 永住許可申請（日本人・永住者・特別永住者の配偶者等）
    accessed: "2026-05-17"
applies_to:
  - 日本人/永住者の配偶者
direct_fact_fields:
  - 配偶者ルート：住民税課税（非課税）証明書・納税証明書は直近3年分
  - 実子等ルート：直近1年分
  - 国税その3等の別資料は別途確認
  - 年金・健康保険資料は別欄で確認
ai_inferred_fields:
  - 就労資格ルートの5年分とは必要年数が異なる
needs_review_flags:
  - haigusha_3year_official_page_link
  - calc_starting_date_practice
  - simultaneous_filing_documents_specifics
related_links:
  - title: "ISA — 永住許可申請（配偶者等）"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu01.html"
    organization: "出入国在留管理庁"
    display_label: "永住"
    locator: "配偶者"
    relation: "official_reference"
evidence_points:
  - claim: "日本人・永住者・特別永住者の配偶者等ルートの永住申請では、住民税課税（非課税）証明書及び納税証明書について、配偶者は直近3年分、実子等は直近1年分が示されている。"
    source_title: "ISA — 永住許可申請（配偶者等）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu01.html"
    source_organization: "出入国在留管理庁"
    source_locator: "所得証明"
    display_label: "配偶者永住3年分税証明"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

配偶者等ルートの永住では税証明の年数がルート別に異なる。

## must_say

- 配偶者は住民税証明3年分
- 実子等は住民税証明1年分
- 就労ルートと混同しない

## injection_format

### injection_certain_block

```text
- 日本人・永住者・特別永住者の配偶者等ルートの永住申請では、住民税課税（非課税）証明書および納税証明書の提出年数がルートで異なる。
- 配偶者の場合は直近3年分、実子等の場合は直近1年分が公式ページで示されている。
- これは提出資料の年数の話であり、永住許可を保証する条件ではない。年金・健康保険・国税その3など他資料は別途確認する。
- 出典: 出入国在留管理庁「永住許可申請（日本人・永住者・特別永住者の配偶者等）」 https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu01.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | 配偶者等ルートの税証明年数に限定しruntime昇格。 | ai_extracted | ai_verified | source-repair/promote |
