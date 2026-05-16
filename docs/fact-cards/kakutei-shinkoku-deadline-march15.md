---
fact_id: kakutei-shinkoku-deadline-march15
title: 確定申告 — 申告期限3月15日・延滞税と無申告加算税
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "確定申告 3月15日"
citation_summary: "所得税の確定申告期限は原則翌年3月15日（休日なら直後の平日）。期限後申告は無申告加算税、納付遅れは延滞税が課される。e-Tax利用可。"
source_display_names:
  - "国税庁"
applies_when:
  - "確定申告 期限"
  - "確定申告 忘れた"
  - "外国人 確定申告"
does_not_cover:
  - "贈与税申告期限（別）"
  - "消費税申告期限（3月31日）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
    label: 国税庁 — 確定申告
    accessed: "2026-05-17"
  - url: https://www.nta.go.jp/taxes/shiraberu/shinkoku/tokushu/index.htm
    label: 国税庁 — 確定申告特集
    accessed: "2026-05-17"
applies_to:
  - 給与所得2000万円超、副業20万円超、不動産所得等のある者
direct_fact_fields:
  - 申告期限：翌年3月15日
  - 納付期限：3月15日
  - e-Tax可
  - マイナンバーカード認証可
  - 期限後：無申告加算税
  - 納付遅延：延滞税
ai_inferred_fields:
  - 還付申告は5年遡及可
  - 外国人居住者は国内外全所得が課税対象
needs_review_flags:
  - kanpu_5year_lookback_specifics
  - mukoshinkoku_kasanzei_rate
  - entaizei_rate_current
related_links:
  - title: "国税庁 — 確定申告"
    url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    organization: "国税庁"
    display_label: "確定申告"
    locator: "3月15日"
    relation: "official_reference"
evidence_points:
  - claim: "確定申告期限は翌年3月15日。e-Tax可、マイナンバーカード認証可。期限後は無申告加算税、納付遅延は延滞税。"
    source_title: "国税庁 — 確定申告"
    source_url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    source_organization: "国税庁"
    source_locator: "3月15日"
    display_label: "確定申告期限3月15日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

確定申告は3月15日締切・遅延でペナルティ。

## common_user_phrases

- 確定申告 3月15日
- 確定申告 期限
- 副業 20万円 確定申告

## must_say

- 3月15日締切
- 無申告加算税・延滞税
- e-Tax可

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
