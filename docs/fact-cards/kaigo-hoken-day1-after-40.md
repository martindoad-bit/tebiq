---
fact_id: kaigo-hoken-day1-after-40
title: 介護保険料 — 40歳到達月の翌月給与から控除
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "介護料 40歳到達"
citation_summary: "厚生年金加入者の場合、40歳になった月の保険料から介護保険料が加算される（実務上は翌月給与から控除）。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "介護保険料 始まる"
  - "40歳 給料 減る"
does_not_cover:
  - "国民健康保険加入者の介護保険料計算"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html
    label: 厚労省 — 介護保険
    accessed: "2026-05-17"
applies_to:
  - 40歳到達の被保険者
direct_fact_fields:
  - 起算月：40歳到達月（誕生日前日に到達と扱い）
  - 控除：翌月給与から
  - 料率：協会けんぽ全国平均約1.6%（労使折半）
  - 1日生まれは前月扱い
ai_inferred_fields:
  - 65歳到達月で第1号への切替
needs_review_flags:
  - 1day_birthday_calc_specifics
  - latest_kaigo_rate_2026
  - jigyounushi_burden_share
related_links:
  - title: "厚労省 — 介護保険"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html"
    organization: "厚生労働省"
    display_label: "介護保険"
    locator: "40歳"
    relation: "official_reference"
evidence_points:
  - claim: "厚生年金加入者の介護保険料は40歳到達月から加算（翌月給与控除）、料率は協会けんぽ全国平均約1.6%（労使折半）。"
    source_title: "厚労省 — 介護保険"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html"
    source_organization: "厚生労働省"
    source_locator: "40歳到達"
    display_label: "介護料40歳到達"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

介護料は40歳到達月から加算。

## must_say

- 40歳到達月から
- 1日生まれは前月扱い
- 料率約1.6%（労使折半）

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
