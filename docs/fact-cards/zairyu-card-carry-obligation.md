---
fact_id: zairyu-card-carry-obligation
title: 在留カード携帯義務 — 不携帯は20万円以下罰金、不提示は1年以下拘禁刑/20万円以下罰金
state: ai_verified   # LOOP2 2026-05-17: source repaired to ISA携帯義務 + official FAQ penalty
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留カード携帯義務"
citation_summary: "16歳以上の中長期在留者は常時在留カードを携帯する義務がある（入管法第23条）。不携帯は20万円以下罰金、提示拒否は1年以下拘禁刑または20万円以下罰金。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留カード 携帯"
  - "在留カード 不携帯 罰金"
does_not_cover:
  - "16歳未満（携帯義務免除）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/ryoken_00001.html
    label: ISA — 旅券等の携帯（入管法第23条）
    accessed: "2026-05-17"
  - url: https://www.moj.go.jp/isa/publications/faq/newimmiact_4_q-and-a_page2.html
    label: ISA — 在留管理制度FAQ（携帯義務罰則）
    accessed: "2026-05-17"
applies_to:
  - 16歳以上の中長期在留者
direct_fact_fields:
  - 携帯義務：常時（16歳以上）
  - 不携帯：20万円以下罰金
  - 不提示：1年以下拘禁刑 or 20万円以下罰金
  - パスポート提示で代替不可（在留カードが正式）
ai_inferred_fields:
  - 警察職務質問時の提示義務あり
  - 入管職員の提示要求にも応じる
needs_review_flags:
  - junior_under_16_passport_required_alternative
  - hostess_at_apartment_situation
  - copy_alternative_legal_status
related_links:
  - title: "ISA — 在留カード"
    url: "https://www.moj.go.jp/isa/applications/procedures/ryoken_00001.html"
    organization: "出入国在留管理庁"
    display_label: "在留カード"
    locator: "携帯義務"
    relation: "official_reference"
evidence_points:
  - claim: "16歳以上は在留カード常時携帯義務、不携帯は20万円以下罰金、不提示は1年以下懲役または20万円以下罰金（入管法）。"
    source_title: "ISA — 在留カード"
    source_url: "https://www.moj.go.jp/isa/publications/faq/newimmiact_4_q-and-a_page2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "携帯義務"
    display_label: "在留カード携帯義務・罰則"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

16歳以上は在留カード常時携帯、不携帯/不提示で罰則。

## must_say

- 常時携帯（16歳以上）
- 不携帯20万円以下
- 不提示は拘禁刑も

## injection_format

### injection_certain_block

```text
- 16歳以上の中長期在留者には、在留カードを常時携帯する義務がある。
- 在留カードを携帯していなかった場合は20万円以下の罰金、提示に応じなかった場合は1年以下の拘禁刑または20万円以下の罰金の対象になることがある。
- パスポートやコピーを持っていても、在留カードそのものの携帯義務がなくなるわけではない。
- 出典: 出入国在留管理庁「旅券等の携帯（入管法第23条）」 https://www.moj.go.jp/isa/applications/procedures/ryoken_00001.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop2 | 携帯義務ソースを修正し、罰則表現を拘禁刑へ更新してruntime昇格。 | ai_extracted | ai_verified | source-repair/promote |
