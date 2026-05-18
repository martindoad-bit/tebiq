---
fact_id: nihonjin-haigusha-divorce-teijusha
title: 日本人の配偶者等 — 離婚後の定住者変更ルート
state: ai_extracted
runtime_bucket: L5_ONLY
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "日本人配偶者離婚定住変更"
citation_summary: "日本人の配偶者等資格者が離婚・死別後、子を養育中・3年以上の婚姻継続歴・生計維持能力等を満たせば定住者への変更が認められうる（告示外定住）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "日本人配偶离婚但想留日"
  - "日本人配偶死別后養育子供"
  - "离婚后多久要离开日本"
does_not_cover:
  - "永住申請ルート（日本人配偶者→永住）"
  - "DV避難時の特例（別カード参照）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese.html
    label: ISA — 日本人の配偶者等
    accessed: "2026-05-17"
  - url: https://www.moj.go.jp/isa/applications/status/longtermresident.html
    label: ISA — 定住者
    accessed: "2026-05-17"
applies_to:
  - 日本人の配偶者等資格保持者
direct_fact_fields:
  - 離婚・死別時：14日以内届出義務
  - 活動継続6か月不実施：取消事由⑦
  - 定住者変更の実務考慮要素：子養育の有無、3年程度の婚姻継続歴、生計維持能力、素行
ai_inferred_fields:
  - 「告示外定住」として個別審査
  - DV被害者は配偶者活動不実施でも特例考慮あり
needs_review_flags:
  - rikon_teiju_3years_threshold_official
  - child_support_role_weight
  - dv_specific_protection_official
related_links:
  - title: "ISA — 定住者"
    url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 定住者"
    locator: "告示外定住"
    relation: "official_reference"
evidence_points:
  - claim: "日本人の配偶者等資格者の離婚後の在留継続には、定住者への変更（告示外定住）が一般的ルート。子養育、婚姻継続歴、生計維持等が考慮要素。"
    source_title: "ISA — 定住者"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "告示外定住記述"
    display_label: "離婚定住ルート"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

離婚後は告示外定住（離婚定住）への変更検討。子養育・婚姻歴・生計が考慮要素。

## common_user_phrases

- 日本人配偶 離婚 ビザ
- 離婚定住 申請
- 死別 配偶者ビザ

## must_say

- 14日届出
- 定住者変更ルートあり
- 個別審査（一律保証なし）

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
