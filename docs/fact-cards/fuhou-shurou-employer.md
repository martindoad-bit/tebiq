---
fact_id: fuhou-shurou-employer
title: 不法就労 — 雇用主側の責任（不法就労助長罪）
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "不法就労助長罪"
citation_summary: "不法就労外国人を雇用した雇用主は不法就労助長罪（3年以下の懲役/300万円以下の罰金）の対象。在留資格の事前確認義務がある。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "外国人 雇用 確認"
  - "不法就労 雇用主"
does_not_cover:
  - "不法就労外国人本人の罰則（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html
    label: ISA — 資格外活動
    accessed: "2026-05-17"
applies_to:
  - 外国人を雇用する全事業主
direct_fact_fields:
  - 罰則：3年以下懲役/300万円以下罰金（入管法第73条の2）
  - 確認義務：在留カード/旅券で在留資格と期限確認
  - 不知でも責任（過失あれば）
  - 派遣・委託でも雇用主と同等の確認義務
ai_inferred_fields:
  - 在留カード偽造の事前検知が困難なため失効情報照会推奨
  - 雇入れ時のコピー保存が証拠
needs_review_flags:
  - shikkou-jouhou-shokai_specific
  - haken-jutsu_responsibility_detail
  - kanshu_to_kaisha_specific_practice
related_links:
  - title: "ISA — 資格外活動"
    url: "https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html"
    organization: "出入国在留管理庁"
    display_label: "資格外活動"
    locator: "雇用主"
    relation: "official_reference"
evidence_points:
  - claim: "不法就労外国人を雇用した雇用主は不法就労助長罪（3年以下懲役/300万円以下罰金、入管法第73条の2）の対象。在留資格の事前確認義務あり。"
    source_title: "ISA — 資格外活動"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "雇用主"
    display_label: "不法就労助長罪"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

不法就労雇用は雇用主に3年/300万円罰則。

## must_say

- 3年/300万円
- 在留カード確認義務
- 派遣・委託も同等責任

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
