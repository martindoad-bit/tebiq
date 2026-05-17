---
fact_id: jumin-zei-jan1-criterion
title: 住民税 — 1月1日基準・前年所得課税・出国時の特別徴収
state: ai_verified   # LOOP3 2026-05-17: official local-tax source repaired; stable Jan-1 criterion
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "住民税 1月1日基準"
citation_summary: "住民税は前年1月1日〜12月31日の所得に対し、当該年1月1日時点の住所地市区町村が課税。出国予定者でも1月1日に日本に住所があれば翌年6月以降に発生する税額の納付義務あり。"
source_display_names:
  - "東京都主税局"
applies_when:
  - "出国前 住民税"
  - "住民税 いつから"
does_not_cover:
  - "住民税の具体額計算（市区町村別）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.tax.metro.tokyo.lg.jp/kazei/life/kojin_ju
    label: 東京都主税局 — 個人住民税
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者
direct_fact_fields:
  - 課税基準日：1月1日
  - 所得割：前年1〜12月の所得に対して課税
  - 均等割：1月1日現在の住所地で課税判断
  - 納付方法：給与からの特別徴収または普通徴収等
ai_inferred_fields:
  - 出国時は納税管理人や一括納付が必要になることがある
needs_review_flags:
  - shutsukoku_pre_one_time_payment
  - nozeikanrijin_specifics
  - kuyakusho_specific_procedure
related_links:
  - title: "東京都主税局 — 個人住民税"
    url: "https://www.tax.metro.tokyo.lg.jp/kazei/life/kojin_ju"
    organization: "東京都主税局"
    display_label: "個人住民税"
    locator: "1月1日"
    relation: "official_reference"
evidence_points:
  - claim: "個人住民税の所得割は前年所得に対して課税され、均等割は1月1日現在の住所地で判断される。"
    source_title: "東京都主税局 — 個人住民税"
    source_url: "https://www.tax.metro.tokyo.lg.jp/kazei/life/kojin_ju"
    source_organization: "東京都主税局"
    source_locator: "住民税"
    display_label: "住民税1月1日基準"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

住民税：1月1日住所地基準・前年所得課税。

## must_say

- 1月1日基準
- 前年所得課税
- 引越し後も1月1日の住所地を確認

## injection_format

### injection_certain_block

```text
- 個人住民税は、原則として1月1日時点の住所地を基準に課税される。
- 所得割は前年1月から12月までの所得に対して課税されるため、引越し後でも「いつ・どこに住民登録があったか」を確認する必要がある。
- 給与天引き（特別徴収）か自分で納める普通徴収かで実際の支払い方は変わる。通知書や会社給与担当、市区町村の税務窓口で確認する。
- 出典: 東京都主税局「個人住民税」 https://www.tax.metro.tokyo.lg.jp/kazei/life/kojin_ju
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | 1月1日基準の公式sourceを修正しruntime昇格。 | ai_extracted | ai_verified | source-repair/promote |
