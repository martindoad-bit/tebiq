---
fact_id: yukyu-kyuka-rokei
title: 年次有給休暇 — 雇入れ6か月+8割出勤で10日付与
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "有給休暇"
citation_summary: "雇入れから6か月継続勤務+全労働日の8割以上出勤で10日の年次有給休暇付与（労基法第39条）。勤続年数で最大20日。年5日の取得義務（2019年〜）。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "有給 何日"
  - "外国人 年休"
does_not_cover:
  - "計画的付与の手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html
    label: 厚労省 — 労働基準
    accessed: "2026-05-17"
applies_to:
  - 全労働者（外国人含む）
direct_fact_fields:
  - 付与要件：雇入れ6か月+全労働日8割以上出勤
  - 初回付与：10日
  - 勤続年数で最大20日
  - 年5日取得義務（2019年4月〜・違反は30万円罰金）
  - 時効：2年
ai_inferred_fields:
  - 退職時の有給消化は労使協議
needs_review_flags:
  - taishoku-jiki_yukyu_handling
  - part-timer_specific_calculation
  - keikakuteki_fuyo_procedure
related_links:
  - title: "厚労省 — 労働基準"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html"
    organization: "厚生労働省"
    display_label: "労働基準"
    locator: "年次有給休暇"
    relation: "official_reference"
evidence_points:
  - claim: "労基法第39条により雇入れ6か月+8割出勤で10日の年次有給休暇付与、最大20日。2019年4月から年5日取得義務（違反は30万円罰金）。"
    source_title: "厚労省 — 労働基準"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html"
    source_organization: "厚生労働省"
    source_locator: "39条"
    display_label: "年次有給休暇"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

年休：6か月+8割出勤で10日・最大20日・年5日義務。

## must_say

- 6か月+8割で10日
- 最大20日
- 年5日取得義務

## injection_format

### injection_certain_block

```text
- 年休：6か月+8割出勤で10日・最大20日・年5日義務。
- 6か月+8割で10日
- 最大20日
- 年5日取得義務
- 出典: 厚労省 — 労働基準 https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
