---
fact_id: saiteichingin-2026
title: 最低賃金 — 都道府県別・2025年10月改定（全国加重平均1055円）
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "最低賃金2025"
citation_summary: "最低賃金は都道府県別に設定され、毎年10月頃改定。2025年10月改定で全国加重平均1055円（東京1163円、地方は900円台）。外国人労働者も適用。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "最低賃金 外国人"
  - "アルバイト 時給 最低"
does_not_cover:
  - "特定産業別最低賃金（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/minimumichiran/
    label: 厚労省 — 最低賃金
    accessed: "2026-05-17"
applies_to:
  - 全ての労働者（外国人含む）
direct_fact_fields:
  - 都道府県別設定
  - 2025年10月改定：全国加重平均1055円
  - 東京：1163円
  - 国籍/在留資格問わず適用
  - 違反：賃金差額遡及+罰金
ai_inferred_fields:
  - 技人国の「日本人同等以上」要件は最低賃金より高い水準
needs_review_flags:
  - 2026_specific_revision_amount
  - 23ku_specific_practice
  - sangyou-betsu_minimum_list
related_links:
  - title: "厚労省 — 最低賃金"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/minimumichiran/"
    organization: "厚生労働省"
    display_label: "最低賃金"
    locator: "都道府県別"
    relation: "official_reference"
evidence_points:
  - claim: "最低賃金は都道府県別・毎年10月改定。2025年10月改定で全国加重平均1055円、東京1163円。外国人労働者も適用。"
    source_title: "厚労省 — 最低賃金"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/minimumichiran/"
    source_organization: "厚生労働省"
    source_locator: "都道府県別"
    display_label: "最低賃金2025"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

最賃2025-10改定：全国加重平均1055円・東京1163円。

## must_say

- 都道府県別
- 毎年10月改定
- 外国人も適用

## injection_format

### injection_certain_block

```text
- 最賃2025-10改定：全国加重平均1055円・東京1163円。
- 都道府県別
- 毎年10月改定
- 外国人も適用
- 出典: 厚労省 — 最低賃金 https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/minimumichiran/
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
