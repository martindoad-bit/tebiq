---
fact_id: kibyou-teate-3day-byouki
title: 傷病手当金 — 病気/けがで4日以上の休業時1年6か月支給
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "傷病手当金"
citation_summary: "健康保険被保険者が業務外の病気・けがで仕事を休んだ場合、連続3日休業後4日目から、標準報酬月額の2/3が最長1年6か月支給される。"
source_display_names:
  - "全国健康保険協会"
applies_when:
  - "傷病手当金"
  - "病気 休業 給付"
does_not_cover:
  - "労災（業務上の傷病）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.kyoukaikenpo.or.jp/benefit/injury_and_sickness_allowance/index.html
    label: 協会けんぽ — 傷病手当金
    accessed: "2026-05-17"
applies_to:
  - 健康保険被保険者
direct_fact_fields:
  - 待機期間：連続3日
  - 支給開始：4日目から
  - 期間：通算1年6か月（2022年法改正で通算化）
  - 給付率：標準報酬月額の2/3
  - 国保加入者は対象外（市町村による任意）
ai_inferred_fields:
  - 退職後継続給付の条件あり
needs_review_flags:
  - tsuusan_1year_6months_specific
  - mental-illness_kakuninsho_procedure
  - kanpu_after_taishoku_specifics
related_links:
  - title: "協会けんぽ — 傷病手当金"
    url: "https://www.kyoukaikenpo.or.jp/benefit/injury_and_sickness_allowance/index.html"
    organization: "全国健康保険協会"
    display_label: "傷病手当金"
    locator: "1年6か月"
    relation: "official_reference"
evidence_points:
  - claim: "傷病手当金は連続3日休業後4日目から、標準報酬月額の2/3が通算1年6か月支給される（2022年法改正で通算化）。"
    source_title: "協会けんぽ — 傷病手当金"
    source_url: "https://www.kyoukaikenpo.or.jp/benefit/injury_and_sickness_allowance/index.html"
    source_organization: "全国健康保険協会"
    source_locator: "1年6か月"
    display_label: "傷病手当金"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

傷病手当金：4日目から1年6か月・2/3。

## must_say

- 3日待機+4日目から
- 通算1年6か月
- 2/3給付

## injection_format

### injection_certain_block

```text
- 傷病手当金は、健康保険の被保険者が業務外の病気やけがで仕事を休み、一定条件を満たす場合に支給される制度。
- 支給開始は連続する3日間の待期後の4日目からで、支給期間や金額は保険者の案内で確認する。
- 出典: 協会けんぽ — 傷病手当金 https://www.kyoukaikenpo.or.jp/benefit/injury_and_sickness_allowance/index.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
