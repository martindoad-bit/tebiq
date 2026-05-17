---
fact_id: eijuu-after-kika-card
title: 帰化後 — 在留カード返納14日・日本人としての登録
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "帰化後の手続"
citation_summary: "帰化許可後は在留カード返納14日以内、住民票の国籍変更、本籍地での戸籍編製、運転免許等の名義変更、銀行・保険等の国籍更新が必要。"
source_display_names:
  - "法務省/出入国在留管理庁"
applies_when:
  - "帰化後 手続"
  - "帰化 在留カード"
does_not_cover:
  - "帰化申請自体（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    label: ISA — 在留カード返納
    accessed: "2026-05-17"
applies_to:
  - 帰化許可者
direct_fact_fields:
  - 在留カード返納：14日以内
  - 住民票：国籍変更
  - 戸籍：本籍地で新戸籍編製
  - 運転免許：名義変更
  - 銀行・保険等：国籍更新
  - 日本パスポート：本籍地市区町村で申請
ai_inferred_fields:
  - 原国籍喪失手続は本国大使館
needs_review_flags:
  - genkokuseki_shokitsu_practice_by_country
  - drivers_license_update_timing
  - bank_account_name_change_specifics
related_links:
  - title: "ISA — 在留カード返納"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    organization: "出入国在留管理庁"
    display_label: "返納"
    locator: "帰化後"
    relation: "official_reference"
evidence_points:
  - claim: "帰化後は在留カード返納14日以内、住民票国籍変更、戸籍編製、運転免許等の名義変更、原国籍喪失手続（本国大使館）が必要。"
    source_title: "ISA — 在留カード返納"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html"
    source_organization: "出入国在留管理庁"
    source_locator: "返納"
    display_label: "帰化後の手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

帰化後：在留カード返納14日・国籍変更登録・戸籍編製・パスポート申請。

## must_say

- 14日以内返納
- 戸籍編製
- 原国籍喪失手続

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
