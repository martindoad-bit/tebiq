---
fact_id: kogaku-ryoyo-hi-self-pay
title: 高額療養費 — 自己負担上限を超えた医療費の還付
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "高額療養費"
citation_summary: "医療費の月額自己負担額が所得に応じた上限を超えた場合、超過分が後日還付される制度。事前に「限度額適用認定証」取得で窓口で上限額のみ支払い可。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "高額医療 還付"
  - "限度額適用認定証"
does_not_cover:
  - "出産育児一時金（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html
    label: 厚労省 — 高額療養費
    accessed: "2026-05-17"
applies_to:
  - 健康保険被保険者
direct_fact_fields:
  - 月単位の上限：所得区分により異なる
  - 還付：3か月以上後（被保険者口座へ）
  - 限度額適用認定証：事前取得で窓口上限額のみ支払い可
  - マイナ保険証連携で認定証不要
  - 多数該当：年4回目以降は上限引下げ
ai_inferred_fields:
  - 高額療養費は永住申請の経済要件にも有利材料となりえる
needs_review_flags:
  - 2025_upper_limit_by_income_bracket
  - maina_hoken_show_2026_status
  - jido_seinenshukyou_calculation
related_links:
  - title: "厚労省 — 高額療養費"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html"
    organization: "厚生労働省"
    display_label: "高額療養費"
    locator: "上限"
    relation: "official_reference"
evidence_points:
  - claim: "高額療養費は月額自己負担上限超過分を後日還付。限度額適用認定証または マイナ保険証連携で窓口上限額のみ支払い可。"
    source_title: "厚労省 — 高額療養費"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html"
    source_organization: "厚生労働省"
    source_locator: "高額療養費"
    display_label: "高額療養費"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

高額療養費：自己負担上限超過分還付・認定証/マイナ保険証で窓口対応可。

## must_say

- 自己負担上限超過分還付
- 限度額認定証取得推奨
- マイナ保険証連携で代替

## injection_format

### injection_certain_block

```text
- 高額療養費：自己負担上限超過分還付・認定証/マイナ保険証で窓口対応可。
- 自己負担上限超過分還付
- 限度額認定証取得推奨
- マイナ保険証連携で代替
- 出典: 厚労省 — 高額療養費 https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/juuyou/kougakuiryou/index.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
