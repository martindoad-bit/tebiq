---
fact_id: jutaku-shikikin-rekkin-shuukan
title: 賃貸 — 敷金/礼金/仲介手数料の慣行
state: ai_verified   # Loop12 2026-05-18: low-risk rental-cost checklist; no nationwide fee standard.
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "敷金礼金慣行"
citation_summary: "日本の賃貸では敷金、礼金、仲介手数料、保証料、前家賃などの初期費用や、退去時の原状回復精算を確認する。金額や有無は地域、物件、契約条件により異なる。"
source_display_names:
  - "国土交通省"
applies_when:
  - "敷金 礼金"
  - "賃貸 初期費用"
does_not_cover:
  - "退去時の原状回復ガイドライン"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000026.html
    label: 国交省 — 住宅
    accessed: "2026-05-17"
applies_to:
  - 賃貸入居予定者
direct_fact_fields:
  - 敷金、礼金、仲介手数料、保証料、前家賃などの初期費用が発生することがある
  - 退去時の原状回復や敷金精算を契約前に確認する
  - 金額や有無は地域、物件、契約条件により異なる
ai_inferred_fields:
  - UR・公社等は礼金なしの場合がある
needs_review_flags:
  - genjou-kaifuku_guideline_2026
  - regional_difference_practice
  - shorter_term_property_specifics
related_links:
  - title: "国交省 — 住宅"
    url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000026.html"
    organization: "国土交通省"
    display_label: "住宅"
    locator: "敷金礼金"
    relation: "official_reference"
evidence_points:
  - claim: "賃貸契約では敷金、礼金、仲介手数料、保証料、前家賃などの初期費用や、退去時の原状回復精算を確認する。金額や有無は地域、物件、契約条件により異なる。"
    source_title: "国交省 — 住宅"
    source_url: "https://www.mlit.go.jp/jutakukentiku/house/jutakukentiku_house_tk3_000026.html"
    source_organization: "国土交通省"
    source_locator: "敷金礼金"
    display_label: "敷金礼金慣行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

賃貸契約では敷金、礼金、仲介手数料、保証料、前家賃などの初期費用や、退去時の原状回復精算を確認する。金額や有無は地域、物件、契約条件により異なる。

## common_user_phrases

- 敷金 礼金
- 賃貸 初期費用
- 租房 初期费用
- 礼金 一定要交吗
- 原状回復
- 退去 敷金

## must_say

- 敷金、礼金、仲介手数料などは物件ごとに異なる
- 契約前に初期費用の内訳と退去時精算を確認する
- 全国一律の月数や金額として断定しない

## must_not_say

- 敷金礼金は全国一律で何か月分
- 外国人は必ず高い初期費用を取られる
- 敷金は必ず全額戻る

## injection_format

### injection_certain_block

```text
賃貸契約では、敷金、礼金、仲介手数料、保証料、前家賃などの初期費用や、退去時の原状回復・敷金精算を契約前に確認します。金額や有無は地域、物件、契約条件によって異なるため、全国一律の月数や金額として断定できません。
```

### injection_needs_review_addendum

```text
個別契約の妥当性、原状回復トラブル、返金請求は不動産相談窓口・法律相談へ回す。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop12 | 全国一律の金額判断を禁止し、契約前チェックリストとしてruntime化。 | ai_extracted | ai_verified | loop12-promote |
| 2026-05-18 | Codex Loop11 | official_sources と evidence/related URL を同一の国交省賃貸契約関連ページへ同期。 | ai_extracted | ai_extracted | loop11-source-sync |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
