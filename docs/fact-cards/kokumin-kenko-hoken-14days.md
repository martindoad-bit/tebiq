---
fact_id: kokumin-kenko-hoken-14days
title: 国民健康保険 — 加入・脱退は14日以内に市区町村窓口へ
state: ai_verified   # LOOP2 2026-05-17: source repaired to MHLW direct Kokuho 14-day page
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "国保14日加入"
citation_summary: "国民健康保険の被保険者となったとき、脱退するときなどは、14日以内に住所地の市区町村の国民健康保険窓口へ関係書類を提出する必要がある。"
source_display_names:
  - "厚生労働省/市区町村"
applies_when:
  - "退職後 国保"
  - "転入 国保"
does_not_cover:
  - "任意継続（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/newpage_21539.html
    label: 厚労省 — 国民健康保険の加入・脱退
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者で職域保険未加入の者
direct_fact_fields:
  - 手続期限：被保険者となったとき・脱退するときなどから14日以内
  - 手続先：住所地の市区町村の国民健康保険窓口
  - 対象外：他の医療保険加入者、被扶養者、生活保護、後期高齢者医療、短期滞在在留外国人など
  - 必要書類・申請方法：市区町村や国民健康保険組合の案内を確認
ai_inferred_fields:
  - 退職日翌日から保険料が遡って発生する場合がある
  - 滞納は永住申請審査に影響する可能性
needs_review_flags:
  - shotoku_calc_for_first_year
  - menjo_kijun_for_low_income
  - mainakado_alternative_methods
related_links:
  - title: "厚労省 — 国民健康保険の加入・脱退"
    url: "https://www.mhlw.go.jp/stf/newpage_21539.html"
    organization: "厚生労働省"
    display_label: "国民健康保険"
    locator: "14日以内"
    relation: "official_reference"
evidence_points:
  - claim: "国民健康保険の被保険者となったとき、脱退するときなどは14日以内に住所地の市区町村の国民健康保険窓口へ関係書類を提出する必要がある。"
    source_title: "厚労省 — 国民健康保険の加入・脱退"
    source_url: "https://www.mhlw.go.jp/stf/newpage_21539.html"
    source_organization: "厚生労働省"
    source_locator: "14日以内"
    display_label: "国保加入・脱退14日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

国保：加入・脱退は14日以内に市区町村窓口へ。

## must_say

- 14日以内
- 市区町村窓口
- 退職後の健康保険空白に注意

## injection_format

### injection_certain_block

```text
- 退職などで会社の健康保険から外れ、他の健康保険に入らない場合は、国民健康保険の加入手続を確認する。
- 国民健康保険の被保険者となったとき、脱退するときなどは、14日以内に住所地の市区町村の国民健康保険窓口へ関係書類を提出する必要がある。
- 必要書類や申請方法は市区町村ごとに異なるため、住所地の自治体ページや窓口で確認する。
- 出典: 厚生労働省「国民健康保険の加入・脱退について」 https://www.mhlw.go.jp/stf/newpage_21539.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop2 | 厚労省14日ページへsource repairし、遡及断定を外してruntime昇格。 | ai_extracted | ai_verified | source-repair/promote |
