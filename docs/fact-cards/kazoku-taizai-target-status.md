---
fact_id: kazoku-taizai-target-status
title: 家族滞在 — 対象となる主签证人の在留資格範囲
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "家滞対象資格"
citation_summary: "家族滞在は教授・芸術・宗教・報道・高度専門職・経営管理・法律会計・医療・研究・教育・技人国・企業内転勤・介護・興行・技能・特定技能2号・文化活動・留学の配偶者/子が対象。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "家滞 対象 在留資格"
  - "特定技能1号 家族 連れて来れない"
  - "短期滞在 家族 家滞"
does_not_cover:
  - "日本人/永住者の配偶者（別資格）"
  - "短期滞在の家族（家滞対象外）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/dependent.html
    label: ISA — 家族滞在
    accessed: "2026-05-17"
applies_to:
  - 家族滞在資格を希望する配偶者・子
direct_fact_fields:
  - 対象主签证人：教授、芸術、宗教、報道、高度専門職、経営管理、法律会計、医療、研究、教育、技人国、企業内転勤、介護、興行、技能、特定技能2号、文化活動、留学
  - 対象外：特定技能1号、短期滞在、研修、技能実習
  - 「配偶者・子」が対象（親は対象外）
ai_inferred_fields:
  - 内縁関係は対象外（婚姻届出済みの法的配偶者のみ）
needs_review_flags:
  - common_law_marriage_handling
  - adopted_child_scope
  - dependent_definition_after_age_18
related_links:
  - title: "ISA — 家族滞在"
    url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    organization: "出入国在留管理庁"
    display_label: "家族滞在"
    locator: "対象主签证人"
    relation: "official_reference"
evidence_points:
  - claim: "家族滞在は教授・芸術・宗教・報道・高度専門職・経営管理・法律会計・医療・研究・教育・技人国・企業内転勤・介護・興行・技能・特定技能2号・文化活動・留学の配偶者/子が対象。"
    source_title: "ISA — 家族滞在"
    source_url: "https://www.moj.go.jp/isa/applications/status/dependent.html"
    source_organization: "出入国在留管理庁"
    source_locator: "対象主签证人列挙"
    display_label: "家滞対象範囲"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

家滞対象は配偶者・子のみ。特定技能1号は対象外。

## common_user_phrases

- 家滞 対象
- 特定技能1号 家族
- 親 家滞

## must_say

- 配偶者・子のみ
- 親は対象外
- 特定技能1号も対象外

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
