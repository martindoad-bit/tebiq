---
fact_id: kakkoukin-mortgage-foreigner
title: 住宅ローン — 外国籍申請者の審査項目（要再取材）
state: ai_extracted
risk_level: medium
confidence: low
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "外国人住宅ローン"
citation_summary: "外国籍申請者の住宅ローン審査項目は金融機関・商品ごとに異なるため、このカードは runtime には使わず、国交省住宅政策ページを背景源として再取材対象に留める。"
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
    label: 国土交通省 — 住宅政策
    accessed: "2026-05-17"
applies_to:
  - 住宅購入を検討する外国人
direct_fact_fields:
  - 住宅取得・融資制度は制度・金融機関・商品ごとに確認が必要
ai_inferred_fields:
  - 金融機関によって外国籍申請者向けの確認資料が異なる
  - 在留資格、在留期間、永住者・特別永住者該当性、収入、信用情報、自己資金などを確認されることがある
needs_review_flags:
  - flat35_source_not_whitelisted
  - foreigner_mortgage_official_source_gap
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
  - claim: "住宅取得・融資制度は制度・金融機関・商品ごとに確認が必要。外国籍申請者の具体審査項目はこのカードだけで確定しない。"
    source_title: "国土交通省 — 住宅政策"
    source_url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html"
    source_organization: "国土交通省"
    source_locator: "住宅政策"
    display_label: "外国人住宅ローン"
    support_level: "background"
    user_visible: false
    needs_domain_review: true
---

## current_effective_fact

住宅取得・融資制度は制度・金融機関・商品ごとに確認が必要。外国籍申請者の具体審査項目は、このカードだけでは確定しない。

## must_say

- 金融機関・商品ごとに条件が異なる
- このカードは runtime では使わない
- 非永住でも必ず不可、永住なら必ず可とは言わない

## must_not_say

- 非永住者は絶対に住宅ローンが組めない
- 永住者なら必ず住宅ローンが通る
- 一つの銀行の条件を日本全体のルールとして言う

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop11 | Flat35 URL が fact-layer whitelist 外のため、白名单外断言を撤回。国交省背景源のみの再取材カードへ降温。 | ai_extracted | ai_extracted | loop11-source-safety |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
