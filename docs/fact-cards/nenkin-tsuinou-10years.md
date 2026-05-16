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
citation_summary: "国民年金保険料は免除・猶予・未納から10年以内であれば追納可能。永住申請前に2年分以上の納付実績を作るための実務手段。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "国民年金 追納"
  - "永住 年金未納 対処"
does_not_cover:
  - "脱退一時金との関係（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住（年金）
    accessed: "2026-05-17"
applies_to:
  - 国民年金被保険者
direct_fact_fields:
  - 追納可能期間：過去10年以内
  - 加算金あり：経過年数に応じて
  - 免除/猶予分は10年内追納で全額老齢年金反映
  - 申請は年金事務所
ai_inferred_fields:
  - 永住申請前に2年分以上の納付実績を作る実務手段
needs_review_flags:
  - kasanjikin_rate_2026
  - eijuu_2year_proof_post_payment_timing
  - menjo_vs_mino_in_2year_proof
related_links:
  - title: "ISA — 永住（年金）"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住・年金"
    locator: "2年分"
    relation: "official_reference"
evidence_points:
  - claim: "国民年金保険料は過去10年以内であれば追納可能。永住申請の2年分納付要件への対策手段となる。"
    source_title: "日本年金機構（公式記述に整合）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "日本年金機構/ISA"
    source_locator: "追納10年"
    display_label: "国民年金追納10年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

国民年金追納可能期間10年。

## must_say

- 過去10年内追納可
- 加算金あり
- 永住申請前の対策

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
