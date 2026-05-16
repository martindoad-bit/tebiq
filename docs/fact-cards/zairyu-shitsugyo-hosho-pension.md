---
fact_id: zairyu-shitsugyo-hosho-pension
title: 失業時の年金 — 保険料免除/猶予申請（経済理由）
state: ai_extracted
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
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住（年金関連）
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
  - 永住申請の2年分要件には免除も「納付実績」として扱われる
needs_review_flags:
  - eijuu_kanen_menjyo_treatment
  - 50for1_kokuyo_negotiation_official
  - shitsugyo_tokurei_specific_paper
related_links:
  - title: "年金機構"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "日本年金機構"
    display_label: "年金免除"
    locator: "失業特例"
    relation: "official_reference"
evidence_points:
  - claim: "失業等の経済理由で国民年金保険料免除/猶予申請可。失業特例制度で離職票添付により所得に算入せず判定。"
    source_title: "年金機構"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "日本年金機構"
    source_locator: "失業特例"
    display_label: "失業年金免除"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

失業時年金は免除/猶予申請可・失業特例で判定。

## must_say

- 4段階免除
- 失業特例あり
- 追納10年可

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
