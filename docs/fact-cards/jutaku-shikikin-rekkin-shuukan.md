---
fact_id: jutaku-shikikin-rekkin-shuukan
title: 賃貸 — 敷金/礼金/仲介手数料の慣行
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "敷金礼金慣行"
citation_summary: "日本の賃貸では敷金（家賃1-2か月、退去時清算）、礼金（家賃1-2か月、戻らない）、仲介手数料（家賃0.5-1か月）の慣行あり。初期費用は家賃の4-6か月分が一般的。"
source_display_names:
  - "国土交通省"
applies_when:
  - "敷金 礼金"
  - "賃貸 初期費用"
does_not_cover:
  - "退去時の原状回復ガイドライン"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html
    label: 国交省 — 住宅
    accessed: "2026-05-17"
applies_to:
  - 賃貸入居予定者
direct_fact_fields:
  - 敷金：家賃1-2か月、退去時清算
  - 礼金：家賃1-2か月、戻らない
  - 仲介手数料：家賃0.5-1か月
  - 保証会社：月額家賃の50-100%
  - 初期費用合計：家賃4-6か月分が一般的
  - 都市部は敷金礼金なしも増加
ai_inferred_fields:
  - UR・公社等は礼金なし
needs_review_flags:
  - genjou-kaifuku_guideline_2026
  - regional_difference_practice
  - shorter_term_property_specifics
related_links:
  - title: "国交省 — 住宅"
    url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html"
    organization: "国土交通省"
    display_label: "住宅"
    locator: "敷金礼金"
    relation: "official_reference"
evidence_points:
  - claim: "賃貸の初期費用は敷金（1-2か月）、礼金（1-2か月）、仲介手数料（0.5-1か月）等で家賃4-6か月分が一般的。"
    source_title: "国交省 — 住宅"
    source_url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000056.html"
    source_organization: "国土交通省"
    source_locator: "敷金礼金"
    display_label: "敷金礼金慣行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

賃貸初期費用：家賃4-6か月分が一般。

## must_say

- 敷金1-2か月（戻る）
- 礼金1-2か月（戻らない）
- 初期費用4-6か月

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
