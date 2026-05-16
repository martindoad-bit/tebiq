---
fact_id: shibo-todoke-7days
title: 死亡届 — 7日以内に市区町村提出（戸籍法）・在留カード返納14日
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "死亡届7日"
citation_summary: "死亡を知った日から7日以内（国外の場合3か月以内）に市区町村に死亡届を提出する義務（戸籍法第86条）。在留カードは死亡から14日以内に親族等が返納。"
source_display_names:
  - "法務省/出入国在留管理庁"
applies_when:
  - "外国人 死亡 手続"
  - "死亡届 期限"
does_not_cover:
  - "相続手続詳細（国際相続）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html
    label: ISA — 在留カード返納
    accessed: "2026-05-17"
applies_to:
  - 在留外国人の親族
direct_fact_fields:
  - 死亡届：死亡を知った日から7日以内（国外は3か月）
  - 届出場所：死亡地・本籍地・届出人住所地市区町村
  - 在留カード返納：14日以内（親族・同居者）
  - 火葬許可：死亡届提出時に申請
ai_inferred_fields:
  - 国際相続は本国法と日本法の併用
  - 死亡時の年金・健保資格喪失届も必要
needs_review_flags:
  - international_inheritance_procedure
  - hokenshou-shikkaku-todoke_timeline
  - bank_account_freeze_procedure
related_links:
  - title: "ISA — 在留カード返納"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html"
    organization: "出入国在留管理庁"
    display_label: "在留カード返納"
    locator: "14日"
    relation: "official_reference"
evidence_points:
  - claim: "死亡届は死亡を知った日から7日以内（国外は3か月）。在留カードは死亡から14日以内に親族等が返納。"
    source_title: "ISA — 在留カード返納"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html"
    source_organization: "出入国在留管理庁"
    source_locator: "14日"
    display_label: "死亡届と在留カード"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

死亡届7日（国外3か月）・在留カード返納14日。

## must_say

- 死亡届7日（国外3か月）
- 在留カード返納14日
- 親族・同居者責任

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
