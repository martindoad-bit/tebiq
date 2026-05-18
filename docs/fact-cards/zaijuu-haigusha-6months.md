---
fact_id: zaijuu-haigusha-6months
title: 配偶者ビザ — 6か月不活動で取消事由⑦
state: ai_extracted
runtime_bucket: L5_ONLY
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "配偶者6か月取消"
citation_summary: "日本人/永住者の配偶者等資格者が配偶者としての活動継続を6か月以上行っていない場合、在留資格取消事由⑦に該当しうる。離婚係争中・DV避難等は要個別判断。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "別居 6ヶ月 ビザ"
  - "離婚協議中 配偶者ビザ"
does_not_cover:
  - "離婚後の定住者変更（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    label: ISA — 在留資格取消
    accessed: "2026-05-17"
applies_to:
  - 日本人/永住者の配偶者等資格保持者
direct_fact_fields:
  - 取消事由⑦：配偶者としての活動継続を6か月以上不実施
  - 正当な理由（DV避難・離婚協議等）は対象外
  - 取消前に意見聴取必須
ai_inferred_fields:
  - 別居だけでは即取消とはならず実質判断
needs_review_flags:
  - dv_protection_official_route
  - separation_justification_evidence
  - chained_renewal_consequence
related_links:
  - title: "ISA — 取消制度"
    url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    organization: "出入国在留管理庁"
    display_label: "取消制度"
    locator: "6か月"
    relation: "official_reference"
evidence_points:
  - claim: "配偶者としての活動継続6か月不実施は取消事由⑦に該当。正当な理由で対象外。"
    source_title: "ISA — 取消制度"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "6か月"
    display_label: "配偶者6か月取消"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

配偶者活動6か月不実施で事由⑦。正当理由で対象外。

## must_say

- 6か月で事由⑦
- DV避難等は正当理由
- 個別判断

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
