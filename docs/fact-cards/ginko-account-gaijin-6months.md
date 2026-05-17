---
fact_id: ginko-account-gaijin-6months
title: 銀行口座 — 上陸後6か月未満は普通口座開設制限
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "銀行口座6か月"
citation_summary: "金融機関の本人確認規制（犯収法・FSA通達）により、上陸後6か月未満の外国人は普通口座開設が原則制限される（外貨預金等は別）。"
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
  - 6か月未満：普通口座開設制限（実務）
  - 必要書類：在留カード、住民票、印鑑、勤務先証明
  - ゆうちょ銀行は比較的開設可能
  - ネット銀行は審査異なる
ai_inferred_fields:
  - 雇用主からの紹介状で開設しやすくなる
  - キャッシュレス決済（PayPay等）は口座より緩い
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
  - claim: "金融機関の本人確認規制により、上陸後6か月未満の外国人は普通口座開設が制限される（実務）。ゆうちょ銀行は比較的緩い。"
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

来日6か月未満は銀行口座開設制限・ゆうちょは緩い。

## must_say

- 6か月制限（実務）
- ゆうちょは比較的開設可
- 在留カード+勤務先証明

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
