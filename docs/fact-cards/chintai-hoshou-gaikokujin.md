---
fact_id: chintai-hoshou-gaikokujin
title: 賃貸 — 外国人入居時の保証会社・連帯保証人確認
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "外国人賃貸保証"
citation_summary: "外国人の民間賃貸入居では、本人確認、在留カード、収入確認、保証会社または連帯保証人などを求められることがある。物件・管理会社・保証会社により条件は異なる。"
source_display_names:
  - "国土交通省"
applies_when:
  - "外国人 賃貸 保証人"
  - "保証会社 外国人"
does_not_cover:
  - "敷金・礼金の慣行"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000017.html
    label: 国交省 — 住宅
    accessed: "2026-05-17"
applies_to:
  - 賃貸を希望する外国人
direct_fact_fields:
  - 外国人向け賃貸住宅入居支援情報あり
  - 本人確認、在留カード、収入確認などを求められることがある
  - 保証会社または連帯保証人の要否は物件・管理会社・保証会社により異なる
ai_inferred_fields:
  - 在留期間が短いと審査が厳しくなることがある
  - 母国語対応の相談窓口や保証会社がある場合がある
needs_review_flags:
  - guaranter_company_specifics_for_foreigners
  - low_credit_alternative_routes
  - kuyakusho-jutaku_subsidies
related_links:
  - title: "国交省 — 住宅"
    url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000017.html"
    organization: "国土交通省"
    display_label: "住宅"
    locator: "賃貸"
    relation: "official_reference"
evidence_points:
  - claim: "外国人の民間賃貸入居では、本人確認、在留カード、収入確認、保証会社または連帯保証人などを求められることがある。条件は物件・管理会社・保証会社により異なる。"
    source_title: "国交省 — 住宅"
    source_url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000017.html"
    source_organization: "国土交通省"
    source_locator: "賃貸"
    display_label: "外国人賃貸保証"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

外国人の民間賃貸入居では、本人確認、在留カード、収入確認、保証会社または連帯保証人などを求められることがある。条件は物件・管理会社・保証会社により異なる。

## must_say

- 保証会社や連帯保証人の要否は物件・管理会社・保証会社によって異なる
- 在留カード、住民票、在職・収入資料などを求められることが多い
- 「外国人だから必ず不可」「保証会社が法的に必須」とは言わない

## must_not_say

- 外国人は必ず保証会社が必要
- 保証会社を使えば必ず入居できる
- 外国人は日本人保証人がいないと借りられない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop11 | official_sources と evidence/related URL を同一の国交省賃貸支援ページへ同期。 | ai_extracted | ai_extracted | loop11-source-sync |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
