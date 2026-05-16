---
fact_id: gaikokujin-soudan-center
title: 外国人在留総合インフォメーションセンター — 0570-013904
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "外国人相談センター"
citation_summary: "出入国在留管理庁の外国人在留総合インフォメーションセンター（0570-013904）は平日8:30-17:15対応。多言語対応（英語、中国語、韓国語等）あり。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "入管 相談 電話"
  - "外国人相談"
does_not_cover:
  - "在留特別許可の相談（弁護士推奨）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html
    label: ISA — 案内
    accessed: "2026-05-17"
applies_to:
  - 全ての在留外国人
direct_fact_fields:
  - 電話：0570-013904
  - 平日8:30-17:15
  - 多言語：英語、中国語、韓国語等
  - 相談内容：在留手続全般
  - メール相談も可
ai_inferred_fields:
  - 個別事案の具体判断は窓口面談推奨
needs_review_flags:
  - language_support_complete_list
  - mail_response_speed_2026
  - foreign_country_dial_specifics
related_links:
  - title: "ISA — 案内"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    organization: "出入国在留管理庁"
    display_label: "案内"
    locator: "0570-013904"
    relation: "official_reference"
evidence_points:
  - claim: "外国人在留総合インフォメーションセンター（0570-013904）は平日8:30-17:15、多言語対応で在留手続全般を相談可。"
    source_title: "ISA — 案内"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    source_organization: "出入国在留管理庁"
    source_locator: "0570-013904"
    display_label: "相談センター"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

入管相談センター：0570-013904・多言語対応。

## must_say

- 0570-013904
- 平日8:30-17:15
- 多言語対応

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
