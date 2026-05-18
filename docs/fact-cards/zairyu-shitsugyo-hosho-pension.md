---
fact_id: zairyu-shitsugyo-hosho-pension
title: 失業時の年金 — 保険料免除/猶予申請（経済理由）
state: ai_verified   # Loop12 2026-05-18: public pension procedure fact; immigration evaluation withheld.
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "失業 年金免除"
citation_summary: "失業等の経済理由で国民年金保険料の納付が困難な場合、申請により全額・3/4・半額・1/4の免除または納付猶予が認められる。失業特例制度あり。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "失業 年金 払えない"
  - "国民年金 免除"
does_not_cover:
  - "厚生年金加入中の取扱"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nenkin.go.jp/service/kokunen/menjo/20150428.html
    label: 日本年金機構 — 国民年金保険料の免除制度・納付猶予制度
    accessed: "2026-05-17"
applies_to:
  - 失業中の国民年金被保険者
direct_fact_fields:
  - 免除種別：全額/3/4/半額/1/4
  - 失業特例：離職票等添付で所得に算入せず判定
  - 申請：区役所国民年金窓口
  - 受給時の影響：免除分は1/2（国庫負担分）老齢年金反映
  - 追納：10年内可
ai_inferred_fields:
  - 永住申請で免除・猶予がどう評価されるかは別途確認が必要
needs_review_flags:
  - eijuu_kanen_menjyo_treatment
  - 50for1_kokuyo_negotiation_official
  - shitsugyo_tokurei_specific_paper
related_links:
  - title: "日本年金機構 — 国民年金保険料の免除制度・納付猶予制度"
    url: "https://www.nenkin.go.jp/service/kokunen/menjo/20150428.html"
    organization: "日本年金機構"
    display_label: "年金免除"
    locator: "失業特例"
    relation: "official_reference"
evidence_points:
  - claim: "失業等の経済理由で国民年金保険料免除/猶予申請可。失業特例制度で離職票添付により所得に算入せず判定。"
    source_title: "日本年金機構 — 国民年金保険料の免除制度・納付猶予制度"
    source_url: "https://www.nenkin.go.jp/service/kokunen/menjo/20150428.html"
    source_organization: "日本年金機構"
    source_locator: "失業特例"
    display_label: "失業年金免除"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

失業などで国民年金保険料の納付が難しい場合、申請により全額免除、4分の3免除、半額免除、4分の1免除、または納付猶予が認められることがある。失業特例では、離職票などを添付して審査を受ける。これは年金手続きの事実であり、永住・在留審査でどう評価されるかは別問題。

## common_user_phrases

- 失業 年金 払えない
- 国民年金 免除
- 年金 猶予
- 离职 年金 怎么办
- 失業特例
- 退職後 年金 免除

## must_say

- 国民年金には免除・納付猶予制度がある
- 失業特例では離職票などを添付して審査を受ける
- 永住・在留審査での評価はここでは判断しない

## must_not_say

- 免除なら永住に影響しない
- 猶予を申請すれば在留審査で問題にならない
- 失業中は年金を放置してよい

## injection_format

### injection_certain_block

```text
失業などで国民年金保険料の納付が難しい場合、申請により全額免除、4分の3免除、半額免除、4分の1免除、または納付猶予が認められることがあります。失業特例では離職票などを添付して審査を受けます。ただし、これは年金手続きの事実であり、永住・在留審査でどう評価されるかは別問題として扱います。
```

### injection_needs_review_addendum

```text
免除・猶予期間の永住評価、追納すべきかどうか、申請直前の補正はDOMAIN/行政書士確認へ回す。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop12 | 年金免除・失業特例の手続き事実に限定し、永住評価を明示的に除外してruntime化。 | ai_extracted | ai_verified | loop12-promote |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
