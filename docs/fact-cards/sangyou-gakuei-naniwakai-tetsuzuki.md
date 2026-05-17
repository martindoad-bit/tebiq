---
fact_id: sangyou-gakuei-naniwakai-tetsuzuki
title: 産後パパ育休 — 出生時育児休業（2022年10月〜）
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "産後パパ育休"
citation_summary: "2022年10月施行の出生時育児休業（産後パパ育休）。子の出生後8週間以内に4週間まで、2回に分割取得可。給付は67%。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "産後パパ育休"
  - "男性 育休"
does_not_cover:
  - "通常の育児休業（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/koyoukintou/ryouritsu/ikuji/childcare/
    label: 厚労省 — 育児休業
    accessed: "2026-05-17"
applies_to:
  - 雇用保険被保険者の男性労働者
direct_fact_fields:
  - 施行：2022年10月
  - 期間：子出生後8週間以内に最大4週間
  - 分割：2回まで可
  - 給付率：67%
  - 通常の育休（1歳まで）と併用可
ai_inferred_fields:
  - 男性育休取得率は2025年向上中
needs_review_flags:
  - tsuusan_with_normal_ikuji_specifics
  - oversea_kazoku_eligibility
  - certain_company_size_obligation
related_links:
  - title: "厚労省 — 育児休業"
    url: "https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/koyoukintou/ryouritsu/ikuji/childcare/"
    organization: "厚生労働省"
    display_label: "育児休業"
    locator: "産後パパ育休"
    relation: "official_reference"
evidence_points:
  - claim: "産後パパ育休は2022年10月施行。子出生後8週間以内に最大4週間、2回分割可、給付率67%。"
    source_title: "厚労省 — 育児休業"
    source_url: "https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/koyoukintou/ryouritsu/ikuji/childcare/"
    source_organization: "厚生労働省"
    source_locator: "産後パパ育休"
    display_label: "産後パパ育休"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

産後パパ育休：8週間以内に最大4週・2回分割可。

## must_say

- 8週間以内に4週間
- 2回分割可
- 給付67%

## injection_format

### injection_certain_block

```text
- 出生時育児休業（産後パパ育休）は、子の出生後8週間以内に4週間まで取得でき、2回に分割して取得できる制度。
- 給付や対象可否は雇用保険・勤務状況・会社手続により確認する。
- 出典: 厚生労働省 — 育児・介護休業法について https://www.mhlw.go.jp/seisakunitsuite/bunya/koyou_roudou/koyoukintou/ryouritsu/ikuji/childcare/
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
