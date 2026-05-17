---
fact_id: iryouhi-kojo-200000
title: 医療費控除 — 年10万円超で所得控除（最大200万円）
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "医療費控除"
citation_summary: "1月〜12月の医療費が年10万円（または所得の5%）を超えた場合、確定申告で所得控除可（最大200万円）。家族分も合算可。"
source_display_names:
  - "国税庁"
applies_when:
  - "医療費 控除"
  - "セルフメディケーション"
does_not_cover:
  - "セルフメディケーション税制詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
    label: 国税庁 — 医療費控除
    accessed: "2026-05-17"
applies_to:
  - 給与/事業所得者
direct_fact_fields:
  - 控除対象：年10万円超（または所得5%超）
  - 上限：200万円
  - 家族分合算可
  - 通院交通費（公共交通機関）も対象
  - セルフメディケーション税制（OTC薬1.2万円超）と選択
ai_inferred_fields:
  - レシート保存5年義務
  - マイナポータル連携で簡素化
needs_review_flags:
  - oversea_iryou_eligibility
  - dental_orthodontic_practice
  - mainaported_linking_specifics
related_links:
  - title: "国税庁 — 医療費控除"
    url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    organization: "国税庁"
    display_label: "医療費控除"
    locator: "10万円"
    relation: "official_reference"
evidence_points:
  - claim: "医療費控除は年10万円（または所得5%）超で確定申告所得控除可。上限200万円、家族分合算可。"
    source_title: "国税庁 — 医療費控除"
    source_url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    source_organization: "国税庁"
    source_locator: "医療費控除"
    display_label: "医療費控除"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

医療費控除：年10万円超・最大200万円・家族合算可。

## must_say

- 年10万円基準
- 最大200万円
- 家族合算可

## injection_format

### injection_certain_block

```text
- 医療費控除：年10万円超・最大200万円・家族合算可。
- 年10万円基準
- 最大200万円
- 家族合算可
- 出典: 国税庁 — 医療費控除 https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
