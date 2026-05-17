---
fact_id: nenkin-tsuinou-10years
title: 国民年金 — 追納は過去10年以内（永住申請前の追納対策）
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "国民年金 追納10年"
citation_summary: "国民年金保険料の免除・納付猶予・学生納付特例を受けた期間は、本人の申出により、承認された月の前10年以内の免除等期間について追納できる。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "国民年金 追納"
  - "永住 年金未納 対処"
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
  - 免除/猶予分は10年内追納で全額老齢年金反映
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
    needs_domain_review: true
---

## current_effective_fact

国民年金の免除等期間は前10年以内の範囲で追納できる。

## must_say

- 過去10年内追納可
- 加算金あり
- 永住評価は別確認

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
