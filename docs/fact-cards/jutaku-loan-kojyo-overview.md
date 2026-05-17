---
fact_id: jutaku-loan-kojyo-overview
title: 住宅ローン控除 — 年末残高の0.7%を最大13年所得控除
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "住宅ローン控除"
citation_summary: "新築住宅取得+住宅ローン利用で、年末ローン残高の0.7%を最大13年所得控除可能。外国人居住者も対象（住所要件あり）。初年度は確定申告必須。"
source_display_names:
  - "国税庁"
applies_when:
  - "住宅ローン控除"
  - "外国人 マイホーム 控除"
does_not_cover:
  - "中古住宅・リフォームの控除詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
    label: 国税庁 — 住宅ローン控除
    accessed: "2026-05-17"
applies_to:
  - 住宅ローン利用の所得税納税者
direct_fact_fields:
  - 控除率：年末残高の0.7%
  - 期間：最大13年（新築）
  - 上限：住宅種別・入居年で異なる
  - 初年度：確定申告必須
  - 2年目以降：年末調整可
  - 外国人居住者対象（住所要件）
ai_inferred_fields:
  - 永住者・配偶者ビザはローン審査も通りやすい
needs_review_flags:
  - ueru_amounts_2026
  - ZEH_specific_added_rate
  - oversea_buyers_specific_limit
related_links:
  - title: "国税庁 — 住宅ローン控除"
    url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    organization: "国税庁"
    display_label: "住宅ローン控除"
    locator: "0.7%・13年"
    relation: "official_reference"
evidence_points:
  - claim: "住宅ローン控除は年末残高の0.7%を最大13年所得控除可。外国人居住者も対象、初年度確定申告必須。"
    source_title: "国税庁 — 住宅ローン控除"
    source_url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    source_organization: "国税庁"
    source_locator: "0.7%・13年"
    display_label: "住宅ローン控除"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

住宅ローン控除：0.7%×13年・外国人対象。

## must_say

- 0.7%控除率
- 最大13年
- 初年度確定申告

## injection_format

### injection_certain_block

```text
- 住宅ローン控除：0.7%×13年・外国人対象。
- 0.7%控除率
- 最大13年
- 初年度確定申告
- 出典: 国税庁 — 住宅ローン控除 https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
