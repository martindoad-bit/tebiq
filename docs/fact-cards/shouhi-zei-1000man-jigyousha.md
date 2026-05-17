---
fact_id: shouhi-zei-1000man-jigyousha
title: 消費税 — 課税売上1000万円超で課税事業者・インボイス制度
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "消費税1000万円"
citation_summary: "前々年度（基準期間）課税売上1000万円超で消費税課税事業者。2023年10月のインボイス制度開始で、取引先からの要請により売上1000万円以下でも課税事業者を選択するケース増加。"
source_display_names:
  - "国税庁"
applies_when:
  - "消費税 1000万"
  - "インボイス 個人事業"
does_not_cover:
  - "インボイス特例措置詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
    label: 国税庁 — 消費税
    accessed: "2026-05-17"
applies_to:
  - 個人事業者・法人
direct_fact_fields:
  - 基準期間：前々年度
  - 課税売上1000万円超：課税事業者
  - 申告期限：3月31日（個人）
  - インボイス制度：2023年10月開始
  - インボイス登録は任意（取引先要請で実質義務化のケース）
ai_inferred_fields:
  - 経営管理ビザの事業計画書に消費税納付計画を含めるのが実務上有利
needs_review_flags:
  - tokutei-koutei_jigyousha_specifics
  - 2-Year_pre-registration_special_measures
  - kanin_zeigaku_calculation_method
related_links:
  - title: "国税庁 — 消費税"
    url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    organization: "国税庁"
    display_label: "消費税"
    locator: "1000万円"
    relation: "official_reference"
evidence_points:
  - claim: "前々年度（基準期間）課税売上1000万円超で消費税課税事業者。2023年10月インボイス制度開始。"
    source_title: "国税庁 — 消費税"
    source_url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    source_organization: "国税庁"
    source_locator: "消費税"
    display_label: "消費税1000万"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

消費税：基準期間1000万円超で課税事業者・インボイス2023-10〜。

## must_say

- 1000万円基準
- 申告3月31日
- インボイス2023-10〜

## injection_format

### injection_certain_block

```text
- 消費税：基準期間1000万円超で課税事業者・インボイス2023-10〜。
- 1000万円基準
- 申告3月31日
- インボイス2023-10〜
- 出典: 国税庁 — 消費税 https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
