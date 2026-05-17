---
fact_id: shussan-teate-3day-deno
title: 出産手当金 — 健康保険被保険者の産前産後98日支給
state: ai_verified   # Knowledge Runtime Loop 6 promote: FACT source checked + DOMAIN narrow runtime scope.
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "出産手当金"
citation_summary: "健康保険被保険者本人の出産時、産前42日（多胎98日）・産後56日の休業期間中、標準報酬月額の2/3が出産手当金として支給される。被扶養者は対象外。"
source_display_names:
  - "全国健康保険協会"
applies_when:
  - "出産手当金"
  - "産休 給付"
does_not_cover:
  - "出産育児一時金（別カード・出産費用）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.kyoukaikenpo.or.jp/benefit/childbirth/001/index.html
    label: 協会けんぽ — 出産手当金
    accessed: "2026-05-17"
applies_to:
  - 健康保険被保険者本人の出産
direct_fact_fields:
  - 期間：産前42日（多胎98日）・産後56日
  - 給付率：標準報酬月額の2/3
  - 被扶養者は対象外
  - 国保加入者は基本的に対象外
  - 退職後継続給付の条件あり
ai_inferred_fields:
  - 育児休業給付（67%/50%）は連続して受給
needs_review_flags:
  - taishoku-keizoku-kyufu_specifics
  - kokuho_specific_municipality_practice
  - shussan-yotei-bi_vs_jissai_handling
related_links:
  - title: "協会けんぽ — 出産手当金"
    url: "https://www.kyoukaikenpo.or.jp/benefit/childbirth/001/index.html"
    organization: "全国健康保険協会"
    display_label: "出産手当金"
    locator: "98日・2/3"
    relation: "official_reference"
evidence_points:
  - claim: "出産手当金は健康保険被保険者本人の出産時、産前42日（多胎98日）・産後56日の休業期間中、標準報酬月額の2/3支給。"
    source_title: "協会けんぽ — 出産手当金"
    source_url: "https://www.kyoukaikenpo.or.jp/benefit/childbirth/001/index.html"
    source_organization: "全国健康保険協会"
    source_locator: "98日・2/3"
    display_label: "出産手当金"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

出産手当金：産前42日・産後56日・2/3支給。

## must_say

- 産前42日・産後56日
- 標準報酬月額の2/3
- 被扶養者は対象外

## injection_format

### injection_certain_block

```text
- 出産手当金は、健康保険の被保険者本人が出産のため会社を休み、給与を受けられない場合などに支給される制度。
- 被扶養者や国民健康保険加入者が同じ扱いになるわけではないため、加入中の保険者で確認する。
- 出典: 協会けんぽ — 出産手当金 https://www.kyoukaikenpo.or.jp/benefit/childbirth/001/index.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop6 | 公式sourceとDOMAIN境界を確認し、狭い確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
