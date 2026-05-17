---
fact_id: eijuu-after-kika-card
title: 帰化後 — 在留カード返納と名義変更手続
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
last_verified_at: '2026-05-17'
sprint: fact-window-bulk-1
citation_label: 帰化後の手続
citation_summary: 帰化許可後は在留カード返納14日以内、住民票の国籍変更、本籍地での戸籍編製、運転免許等の名義変更、銀行・保険等の国籍更新が必要。
source_display_names:
  - 法務省/出入国在留管理庁
applies_when:
  - 帰化後 手続
  - 帰化 在留カード
does_not_cover:
  - 帰化申請自体（別カード）
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: >-
      https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    label: ISA — 在留カード返納
    accessed: '2026-05-17'
applies_to:
  - 帰化許可者
direct_fact_fields:
  - 帰化後、在留カードは14日以内に返納する
  - その他の名義・登録変更は在留カード返納とは別に確認する
ai_inferred_fields:
  - 原国籍喪失手続は本国大使館
needs_review_flags:
  - genkokuseki_shokitsu_practice_by_country
  - drivers_license_update_timing
  - bank_account_name_change_specifics
related_links:
  - title: ISA — 在留カード返納
    url: >-
      https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    organization: 出入国在留管理庁
    display_label: 返納
    locator: 帰化後
    relation: official_reference
evidence_points:
  - claim: 帰化後は在留カードを14日以内に返納する必要がある。その他の名義・登録変更は在留カード返納とは別に確認する。
    source_title: ISA — 在留カード返納
    source_url: >-
      https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00020.html
    source_organization: 出入国在留管理庁
    source_locator: 返納
    display_label: 帰化後の手続
    support_level: direct
    user_visible: true
    needs_domain_review: false
reviewer: Loop8 FACT/DOMAIN intersect
controlled_alpha_eligible: false
---

## current_effective_fact

帰化後：在留カード返納14日・国籍変更登録・戸籍編製・パスポート申請。

## must_say

- 14日以内返納
- 戸籍編製
- 原国籍喪失手続

## injection_format

### injection_certain_block

```text
【帰化後 手続／{{TODAY_ISO}} 公式】
・帰化後、在留カードは14日以内に返納する。
・戸籍、住民票、免許、銀行等の名義変更は、在留カード返納とは別手続きとして確認する。
・帰化後も自動で全ての名義が切り替わるとは説明しない。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
