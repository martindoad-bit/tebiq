---
fact_id: kazoku-shanzaihon-imin
title: 家族滞在 — 親を呼び寄せはできない（特定活動「老親扶養」は厳格）
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "親呼び寄せ不可"
citation_summary: "家族滞在は配偶者・子のみが対象。親（実親・義親）は家族滞在の対象外。「特定活動（老親扶養）」は本国に身寄りがない高齢親に限定され極めて厳格な要件。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "親 呼び寄せ"
  - "老親 ビザ"
does_not_cover:
  - "短期滞在での親招聘"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/dependent.html
    label: ISA — 家族滞在
    accessed: "2026-05-17"
applies_to:
  - 親を呼び寄せ検討中の在留者
direct_fact_fields:
  - 家族滞在対象：配偶者・子のみ
  - 親：家族滞在対象外
  - 特定活動「老親扶養」：本国に身寄りがない高齢親に限定（極めて厳格）
  - 一般的には短期滞在で訪問
ai_inferred_fields:
  - 70歳以上が実務上の目安
  - 本国の他兄弟姉妹の存否も審査要素
needs_review_flags:
  - rouchin-fuyou_age_threshold_official
  - honguku_kazoku_existence_proof
  - kyokyo_practice_2026
related_links:
  - title: "ISA — 家族滞在"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在"
    locator: "対象"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在は配偶者・子のみ対象。親は対象外で、特定活動「老親扶養」は本国身寄りなし高齢親に限定された極めて厳格な要件。"
    source_title: "ISA — 家族滞在"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "対象"
    display_label: "親呼び寄せ不可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

親は家族滞在対象外・老親扶養特活は厳格。

## must_say

- 親は家滞対象外
- 老親扶養特活は厳格
- 短期滞在で訪問が一般的

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
