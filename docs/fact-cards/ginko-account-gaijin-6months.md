---
fact_id: ginko-account-gaijin-6months
title: 銀行口座 — 外国人の本人確認・滞在期間確認
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "銀行口座6か月"
citation_summary: "外国人の銀行口座開設では、在留カード、住所、在留期間、来日後の滞在期間、勤務先・学校情報などを金融機関が確認する。来日後6か月未満の場合の扱いは金融機関・口座種別により異なる。"
source_display_names:
  - "金融庁"
applies_when:
  - "外国人 銀行口座"
  - "来日後 口座"
does_not_cover:
  - "ネット銀行の対応詳細（個別）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.fsa.go.jp/user/livinginjapan.html
    label: 金融庁 — 外国為替
    accessed: "2026-05-17"
applies_to:
  - 来日6か月未満の外国人
direct_fact_fields:
  - 外国人向け預貯金口座・送金利用時の本人確認資料案内あり
  - 金融機関は在留カード、住所、在留期間、勤務先・学校情報などを確認する
  - 来日後6か月未満の場合の扱いは金融機関・口座種別により異なる
ai_inferred_fields:
  - 雇用主や学校の補足資料で説明しやすくなることがある
needs_review_flags:
  - exact_legal_basis_6months
  - yuucho_specific_practice
  - international_remittance_restriction
related_links:
  - title: "金融庁 — 外国為替"
    url: "https://www.fsa.go.jp/user/livinginjapan.html"
    organization: "金融庁"
    display_label: "金融"
    locator: "本人確認"
    relation: "official_reference"
evidence_points:
  - claim: "外国人の銀行口座開設では、在留カード、住所、在留期間、来日後の滞在期間、勤務先・学校情報などを金融機関が確認する。来日後6か月未満の場合の扱いは金融機関・口座種別により異なる。"
    source_title: "金融庁"
    source_url: "https://www.fsa.go.jp/user/livinginjapan.html"
    source_organization: "金融庁"
    source_locator: "本人確認"
    display_label: "銀行口座6か月"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

外国人の銀行口座開設では、在留カード、住所、在留期間、来日後の滞在期間、勤務先・学校情報などを金融機関が確認する。来日後6か月未満の場合の扱いは金融機関・口座種別により異なる。

## must_say

- 金融機関ごとに確認資料と取扱いが異なる
- 在留カード、住所確認、勤務先・学校情報などを求められることがある
- 「来日6か月未満は絶対に開けない」と断定しない

## must_not_say

- 来日6か月未満は絶対に銀行口座を開けない
- ゆうちょなら必ず開ける
- 友人住所や虚偽住所で申し込めばよい

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
