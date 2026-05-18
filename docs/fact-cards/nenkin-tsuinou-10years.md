---
fact_id: nenkin-tsuinou-10years
title: 国民年金 — 免除等期間の追納は承認月の前10年以内
state: ai_verified   # Loop12 2026-05-18: narrowed to pension procedure; removed permanent-residence strategy framing.
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "国民年金 追納10年"
citation_summary: "国民年金保険料の免除・納付猶予・学生納付特例を受けた期間は、本人の申出により、追納が承認された月の前10年以内の免除等期間について追納できる。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "国民年金 追納"
  - "免除 猶予 追納"
does_not_cover:
  - "脱退一時金との関係（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nenkin.go.jp/service/kokunen/menjo/20150331.html
    label: 日本年金機構 — 国民年金保険料の追納制度
    accessed: "2026-05-17"
applies_to:
  - 国民年金被保険者
direct_fact_fields:
  - 追納可能期間：承認された月の前10年以内の免除等期間
  - 加算金あり：経過年数に応じて
  - 追納した期間は老齢基礎年金額の計算に反映される
  - 申請は年金事務所
ai_inferred_fields:
  - 永住申請前の評価への影響は別途確認が必要
needs_review_flags:
  - kasanjikin_rate_2026
  - eijuu_2year_proof_post_payment_timing
  - menjo_vs_mino_in_2year_proof
related_links:
  - title: "日本年金機構 — 国民年金保険料の追納制度"
    url: "https://www.nenkin.go.jp/service/kokunen/menjo/20150331.html"
    organization: "日本年金機構"
    display_label: "国民年金追納"
    locator: "前10年以内"
    relation: "official_reference"
evidence_points:
  - claim: "国民年金保険料の免除・納付猶予・学生納付特例を受けた期間は、承認された月の前10年以内の免除等期間について追納できる。"
    source_title: "日本年金機構 — 国民年金保険料の追納制度"
    source_url: "https://www.nenkin.go.jp/service/kokunen/menjo/20150331.html"
    source_organization: "日本年金機構"
    source_locator: "前10年以内"
    display_label: "国民年金追納10年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

国民年金保険料の免除、納付猶予、学生納付特例を受けた期間は、本人の申出により、追納が承認された月の前10年以内の免除等期間について追納できる。追納には期間に応じた加算額が付くことがある。これは年金制度上の追納手続きであり、永住・在留審査での評価を保証するものではない。

## common_user_phrases

- 国民年金 追納
- 年金 未納 補缴
- 免除 追納
- 猶予 追納
- 学生納付特例 追納
- 永住 年金 追納
- 年金补缴

## must_say

- 免除・猶予・学生納付特例の期間は、追納が承認された月の前10年以内の免除等期間なら追納できる
- 加算金あり
- 永住・在留審査での評価は別確認

## must_not_say

- 追納すれば永住への影響は消える
- 未納も10年内なら必ず追納できる
- 追納すべきかどうかをAIだけで決めてよい

## injection_format

### injection_certain_block

```text
国民年金保険料の免除、納付猶予、学生納付特例を受けた期間は、本人の申出により、追納が承認された月の前10年以内の免除等期間について追納できます。追納には期間に応じた加算額が付くことがあります。ただし、これは年金制度上の追納手続きであり、永住・在留審査での評価を保証するものではありません。
```

### injection_needs_review_addendum

```text
未納と免除・猶予の違い、追納タイミング、永住申請への評価は行政書士・年金事務所確認へ回す。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop12 | 永住対策という表現を削除し、年金制度上の追納手続きに限定してruntime化。 | ai_extracted | ai_verified | loop12-promote |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
