---
fact_id: kobun-jutaku-jutsu-kushu
title: 公的住宅 — UR・公営住宅・公社住宅（外国人も入居可）
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "公的住宅外国人"
citation_summary: "UR都市機構・公営住宅・公社住宅は中長期在留者も入居可。保証人不要のものもあり、敷金礼金が低く外国人世帯に有利な選択肢。"
source_display_names:
  - "国土交通省"
applies_when:
  - "UR 外国人"
  - "公営住宅 外国人"
does_not_cover:
  - "個別自治体の公営住宅入居要件"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html
    label: 国交省 — 住宅
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者
direct_fact_fields:
  - UR都市機構：保証人不要、礼金なし、家賃3-4か月分前払
  - 公営住宅：所得制限あり、世帯人数要件
  - 公社住宅：UR類似
  - 中長期在留者全般対象
ai_inferred_fields:
  - 公営住宅は競争率高い
  - UR独自基準（家賃4倍以上の月収等）
needs_review_flags:
  - UR_kasei_kijun_specific
  - public_housing_application_period
  - foreign_language_support_status
related_links:
  - title: "国交省 — 住宅"
    url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html"
    organization: "国土交通省"
    display_label: "住宅"
    locator: "公的住宅"
    relation: "official_reference"
evidence_points:
  - claim: "UR・公営住宅・公社住宅は中長期在留者も入居可。保証人不要・礼金不要の選択肢あり。"
    source_title: "国交省 — 住宅"
    source_url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html"
    source_organization: "国土交通省"
    source_locator: "公的住宅"
    display_label: "公的住宅外国人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

UR・公営・公社住宅は外国人入居可・保証人不要選択肢あり。

## must_say

- UR保証人不要
- 公営住宅所得制限
- 中長期在留者対象

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
