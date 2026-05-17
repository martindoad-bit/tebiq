---
fact_id: kogaku-iryo-foreigner-resident
title: 高額療養費 — 外国人居住者も対象（住所地で算定）
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "高額療養費外国人"
citation_summary: "外国人健康保険被保険者も高額療養費の対象。所得区分は前年所得（住民税）ベースで判定。来日1年目は最低区分の場合が多い。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "外国人 高額療養費"
does_not_cover:
  - "短期滞在者の医療費（旅行保険）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html
    label: 厚労省 — 高額療養費
    accessed: "2026-05-17"
applies_to:
  - 外国人健康保険被保険者
direct_fact_fields:
  - 対象：日本の健康保険被保険者全て
  - 所得区分：前年所得（住民税）ベース
  - 来日1年目：最低区分（実務）
  - マイナ保険証連携で認定証不要
ai_inferred_fields:
  - 海外居住中の家族の医療費は対象外
needs_review_flags:
  - first_year_shotoku_kubun_specifics
  - kaigai_kazoku_iryou_handling
  - kazoku_goki_kasan_calculation
related_links:
  - title: "厚労省 — 高額療養費"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html"
    organization: "厚生労働省"
    display_label: "高額療養費"
    locator: "対象"
    relation: "official_reference"
evidence_points:
  - claim: "外国人健康保険被保険者も高額療養費の対象。所得区分は前年所得（住民税）ベース、来日1年目は最低区分の場合が多い。"
    source_title: "厚労省 — 高額療養費"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html"
    source_organization: "厚生労働省"
    source_locator: "所得区分"
    display_label: "高額療養費外国人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

高額療養費は外国人も対象・前年所得ベース。

## must_say

- 外国人も対象
- 前年所得ベース区分
- 来日1年目は最低区分多

## injection_format

### injection_certain_block

```text
- 高額療養費は外国人も対象・前年所得ベース。
- 外国人も対象
- 前年所得ベース区分
- 来日1年目は最低区分多
- 出典: 厚労省 — 高額療養費 https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
