---
fact_id: eijuu-haigusha-3years-route
title: 永住申請 — 日本人/永住者配偶者の3年短縮ルート
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住 配偶者3年ルート"
citation_summary: "日本人/永住者/特別永住者の配偶者は、実体を伴う婚姻3年以上＋日本在留1年以上で永住申請可。所得証明は直近3年分（通常永住の5年分と異なる）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "日本人配偶 永住 早く"
  - "永住者配偶 何年で永住"
  - "永住申請 婚姻3年"
does_not_cover:
  - "通常永住の10年要件（別カード）"
  - "高度人材の1年/3年ルート（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住許可申請
    accessed: "2026-05-17"
applies_to:
  - 日本人/永住者/特別永住者の配偶者
direct_fact_fields:
  - 婚姻継続：3年以上（実体ある婚姻）
  - 日本在留：1年以上
  - 所得証明：直近3年分（通常5年分と異なる）
  - 年金・健保：直近2年分
  - 子の場合：1年以上の在留で申請可
ai_inferred_fields:
  - 別居/偽装婚姻は実体なしと判断され不許可
  - 3年は連続継続が原則
needs_review_flags:
  - bekkyou_during_marriage_handling
  - calculation_starting_point_marriage
  - resident_card_chronology_evidence
related_links:
  - title: "ISA — 永住"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住申請"
    locator: "3年"
    relation: "official_reference"
evidence_points:
  - claim: "日本人/永住者配偶者の永住申請は婚姻3年＋在留1年（子は在留1年）。所得証明3年分・年金健保2年分。"
    source_title: "ISA — 永住申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "婚姻3年・在留1年"
    display_label: "配偶者3年永住ルート"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

配偶者は婚姻3年＋在留1年で永住申請可。所得3年分。

## common_user_phrases

- 配偶者 永住 3年
- 日本人配偶 永住
- 永住者の配偶者 永住

## must_say

- 婚姻3年＋在留1年
- 所得3年分
- 実体ある婚姻必須

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
