---
fact_id: jumin-zei-jan1-criterion
title: 住民税 — 1月1日基準・前年所得課税・出国時の特別徴収
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "住民税 1月1日基準"
citation_summary: "住民税は前年1月1日〜12月31日の所得に対し、当該年1月1日時点の住所地市区町村が課税。出国予定者でも1月1日に日本に住所があれば翌年6月以降に発生する税額の納付義務あり。"
source_display_names:
  - "総務省・各市区町村"
applies_when:
  - "出国前 住民税"
  - "住民税 いつから"
does_not_cover:
  - "住民税の具体額計算（市区町村別）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住（住民税）
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者
direct_fact_fields:
  - 課税基準日：1月1日
  - 課税対象：前年1〜12月の所得
  - 出国時：未払い分の特別徴収または納税管理人の選任が必要
  - 普通徴収：6月以降4期分割または一括
ai_inferred_fields:
  - 1月2日以降に出国する場合、その年の住民税は翌年課税対象
  - 納税管理人なしの出国は未納扱い
needs_review_flags:
  - shutsukoku_pre_one_time_payment
  - nozeikanrijin_specifics
  - kuyakusho_specific_procedure
related_links:
  - title: "ISA — 永住（住民税）"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "住民税"
    locator: "1月1日"
    relation: "official_reference"
evidence_points:
  - claim: "住民税は1月1日基準で前年所得課税。出国時は特別徴収または納税管理人の選任が必要。"
    source_title: "ISA — 永住"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "住民税"
    display_label: "住民税1月1日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

住民税：1月1日基準・前年所得課税・出国時要対応。

## must_say

- 1月1日基準
- 前年所得課税
- 出国時は納税管理人

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
