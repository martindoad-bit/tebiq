---
fact_id: zairyu-card-carry-obligation
title: 在留カード携帯義務 — 不携帯は20万円以下罰金、不提示は1年以下懲役/20万円以下罰金
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留カード携帯義務"
citation_summary: "16歳以上の中長期在留者は常時在留カードを携帯する義務がある（入管法第23条）。不携帯は20万円以下罰金、警察官等への不提示は1年以下懲役または20万円以下罰金。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留カード 携帯"
  - "在留カード 不携帯 罰金"
does_not_cover:
  - "16歳未満（携帯義務免除）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html
    label: ISA — 在留カード
    accessed: "2026-05-17"
applies_to:
  - 16歳以上の中長期在留者
direct_fact_fields:
  - 携帯義務：常時（16歳以上）
  - 不携帯：20万円以下罰金
  - 不提示：1年以下懲役 or 20万円以下罰金
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
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    organization: "出入国在留管理庁"
    display_label: "在留カード"
    locator: "携帯義務"
    relation: "official_reference"
evidence_points:
  - claim: "16歳以上は在留カード常時携帯義務、不携帯は20万円以下罰金、不提示は1年以下懲役または20万円以下罰金（入管法）。"
    source_title: "ISA — 在留カード"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    source_organization: "出入国在留管理庁"
    source_locator: "携帯義務"
    display_label: "在留カード携帯義務"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

16歳以上は在留カード常時携帯、不携帯/不提示で罰則。

## must_say

- 常時携帯（16歳以上）
- 不携帯20万円以下
- 不提示は懲役も

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
