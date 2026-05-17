---
fact_id: hi-kyojusha-tax-20-42
title: 非居住者の源泉徴収 — 国内源泉所得20.42%課税
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "非居住者20.42%"
citation_summary: "非居住者は日本国内源泉所得についてのみ課税対象。給与等は原則20.42%（所得税20%＋復興特別所得税0.42%）で源泉徴収される。"
source_display_names:
  - "国税庁"
applies_when:
  - "出国 後 給与"
  - "非居住者 税金"
does_not_cover:
  - "居住者の所得計算（kyojusha-kubun-kazei 参照）"
  - "租税条約による軽減（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nta.go.jp/publication/pamph/koho/kurashi/html/02_3.htm
    label: 国税庁 — 非居住者と居住者
    accessed: "2026-05-17"
applies_to:
  - 非居住者として取り扱われる外国人
direct_fact_fields:
  - 課税範囲：日本国内源泉所得のみ
  - 源泉徴収税率：20.42%（所得税20%+復興特別0.42%）
  - 居住者証明取得時は租税条約軽減可
ai_inferred_fields:
  - 出国後の日本源泉給与・賞与に課税
  - 海外送金は本人口座でも課税対象（実体ベース）
needs_review_flags:
  - tax_treaty_country_application
  - resident_certificate_post_exit_procedure
  - unrealized_capital_gain_at_exit
related_links:
  - title: "国税庁 — 非居住者"
    url: "https://www.nta.go.jp/publication/pamph/koho/kurashi/html/02_3.htm"
    organization: "国税庁"
    display_label: "非居住者"
    locator: "20.42%"
    relation: "official_reference"
evidence_points:
  - claim: "非居住者は日本源泉所得のみ20.42%で源泉徴収。"
    source_title: "国税庁 — 非居住者"
    source_url: "https://www.nta.go.jp/publication/pamph/koho/kurashi/html/02_3.htm"
    source_organization: "国税庁"
    source_locator: "20.42%"
    display_label: "非居住者20.42%"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

非居住者は日本源泉所得20.42%源泉徴収。

## common_user_phrases

- 非居住者 税金
- 出国後 給与 課税
- 20.42%

## must_say

- 国内源泉のみ
- 20.42%源泉徴収
- 租税条約で軽減可

## injection_format

### injection_certain_block

```text
- 非居住者は日本源泉所得20.42%源泉徴収。
- 国内源泉のみ
- 20.42%源泉徴収
- 租税条約で軽減可
- 出典: 国税庁 — 非居住者と居住者 https://www.nta.go.jp/publication/pamph/koho/kurashi/html/02_3.htm
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
