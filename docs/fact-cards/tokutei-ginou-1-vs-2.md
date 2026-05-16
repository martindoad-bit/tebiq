---
fact_id: tokutei-ginou-1-vs-2
title: 特定技能1号 vs 2号 — 滞在期間/家族同伴/技能水準の違い
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特技1号2号比較"
citation_summary: "特定技能1号は最長5年・家族同伴不可・相当程度の知識経験。2号は3/2/1/6か月の更新で在留期間制限なし・家族同伴可・熟練技能。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特定技能 1号 2号 違い"
  - "特技 家族 連れて来れる"
does_not_cover:
  - "14分野別要件（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    label: ISA — 特定技能
    accessed: "2026-05-17"
applies_to:
  - 特定技能保持者・希望者
direct_fact_fields:
  - 1号：通算5年上限、家族同伴不可、相当程度の知識経験
  - 2号：3/2/1/6か月更新（在留期間制限なし）、家族同伴可（配偶者・子）、熟練技能
  - 1号→2号 試験合格で移行可
  - 14分野指定
ai_inferred_fields:
  - 2号は永住申請の在留年数カウント対象（実務）
needs_review_flags:
  - 2go_eijuu_count_official
  - field_specific_2go_availability_2026
  - 1go_to_2go_transition_documents
related_links:
  - title: "ISA — 特定技能"
    url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    organization: "出入国在留管理庁"
    display_label: "特定技能"
    locator: "1号/2号"
    relation: "official_reference"
evidence_points:
  - claim: "1号は通算5年上限・家族同伴不可、2号は在留期間制限なし・家族同伴可。"
    source_title: "ISA — 特定技能"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1号5年・2号無制限"
    display_label: "特技1号2号比較"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

1号5年家族不可・2号無制限家族可。

## must_say

- 1号5年・家族不可
- 2号無制限・家族可
- 14分野

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
