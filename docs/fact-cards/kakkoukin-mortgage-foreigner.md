---
fact_id: kakkoukin-mortgage-foreigner
title: 住宅ローン — 外国人申請の壁（永住者条件が多い）
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "外国人住宅ローン"
citation_summary: "日本の住宅ローンは多くの金融機関が永住者を条件としている。永住権なしの場合は配偶者が日本人・年収条件強化・自己資金多めなどの条件が課されることが多い（実務）。"
source_display_names:
  - "国土交通省"
applies_when:
  - "外国人 住宅ローン"
  - "永住者じゃない マイホーム"
does_not_cover:
  - "個別金融機関の審査基準"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html
    label: 国交省 — 住宅
    accessed: "2026-05-17"
applies_to:
  - 住宅購入を検討する外国人
direct_fact_fields:
  - 多くの金融機関は永住者条件
  - 永住権なしは日本人配偶者・年収高・自己資金多めの条件
  - 在留期間が短いと審査不利
  - フラット35は外国人でも条件付きで利用可
ai_inferred_fields:
  - SMBCプレスティア、PRESTIA等は外国人向け商品あり
  - 在日韓国・中国系の銀行も外国人向け
needs_review_flags:
  - flat35_specific_foreigner_requirements
  - shitei_chukai_practice
  - shokishikin_target_amount
related_links:
  - title: "国交省 — 住宅"
    url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html"
    organization: "国土交通省"
    display_label: "住宅"
    locator: "住宅ローン"
    relation: "official_reference"
evidence_points:
  - claim: "日本の住宅ローンは多くの金融機関が永住者を条件とする。フラット35は外国人でも条件付きで利用可。"
    source_title: "国交省 — 住宅"
    source_url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html"
    source_organization: "国土交通省"
    source_locator: "住宅ローン"
    display_label: "外国人住宅ローン"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

外国人住宅ローン：永住者条件が一般的・フラット35は条件付き可。

## must_say

- 永住者条件多い
- フラット35は条件付き可
- 自己資金多めが有利

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
