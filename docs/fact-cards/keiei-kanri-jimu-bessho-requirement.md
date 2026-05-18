---
fact_id: keiei-kanri-jimu-bessho-requirement
title: 経営・管理 — 独立した事業所の確保要件
state: ai_extracted
runtime_bucket: NEEDS_REWRITE
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "経営管理 事務所"
citation_summary: "経営・管理では事業を継続的に営むための事業所確保が重要な確認点。バーチャルオフィス、シェアオフィス、住居兼用などの可否は契約内容・使用実態・業種により個別確認が必要で、このカードでは一律可否を断定しない。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "経営管理 事務所"
  - "バーチャルオフィス 経営管理"
does_not_cover:
  - "経営管理の他要件（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    label: ISA — 経営管理改正
    accessed: "2026-05-17"
applies_to:
  - 経営・管理ビザ申請者
direct_fact_fields:
  - 経営・管理では事業を営むための事業所確保が重要な確認点
  - 事業所の契約内容・使用実態・事業継続性は確認対象になり得る
  - バーチャルオフィス、シェアオフィス、住居兼用は個別確認が必要
ai_inferred_fields:
  - バーチャルオフィスは一律不可
  - 住居兼用は一律不可または一律可
  - シェアオフィスは個別判断
  - 業種により要件柔軟性異なる
needs_review_flags:
  - share_office_practice_2026
  - virtual_office_partial_acceptance
  - photo_required_specifics
related_links:
  - title: "ISA — 経営管理改正"
    url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    organization: "出入国在留管理庁"
    display_label: "経営管理改正"
    locator: "事務所"
    relation: "official_reference"
evidence_points:
  - claim: "経営・管理では事業を継続的に営むための事業所確保が重要な確認点。バーチャルオフィス、シェアオフィス、住居兼用などの可否は契約内容・使用実態・業種により個別確認が必要で、一律可否を断定しない。"
    source_title: "ISA — 経営管理改正"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    source_organization: "出入国在留管理庁"
    source_locator: "事務所"
    display_label: "経営管理 事務所"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

経営・管理では事業を継続的に営むための事業所確保が重要な確認点。バーチャルオフィス、シェアオフィス、住居兼用は一律可否ではなく、契約内容・使用実態・業種などの個別確認が必要。

## must_say

- 事業所確保は経営・管理の重要確認点
- バーチャル/シェア/住居兼用は一律に可否を断定しない
- 契約内容・使用実態・業種を確認する

## must_not_say

- バーチャルオフィスなら必ず不許可
- 自宅住所なら必ず経営管理で使える
- シェアオフィスなら問題ない
- 事務所の写真と契約書があれば許可される

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop17 | バーチャル/住居兼用の一律可否を削除し、事業所確保と使用実態の個別確認カードへ降温。 | ai_extracted | ai_extracted | loop17-rewrite |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
