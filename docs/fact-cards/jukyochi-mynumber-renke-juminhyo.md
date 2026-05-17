---
fact_id: jukyochi-mynumber-renke-juminhyo
title: 中長期在留者 — 住民票発行・マイナンバー紐付け
state: ai_verified
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "住民票・マイナンバー連携"
citation_summary: "中長期在留者は住民基本台帳法の対象となり、区役所で住民票が交付される。マイナンバーも自動付番。住民登録は在留カードの住居地届出と一体運用。"
source_display_names:
  - "総務省・出入国在留管理庁"
applies_when:
  - "在留カード 住民票"
  - "マイナンバー 外国人"
does_not_cover:
  - "マイナンバーカード発行手続詳細（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html
    label: ISA — 住居地届出
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者
direct_fact_fields:
  - 住民票交付対象（住民基本台帳法）
  - マイナンバー自動付番
  - 在留カード住居地届出と住民登録は一体運用
  - 区役所で住民登録すれば在留カードの住居地届出みなし
ai_inferred_fields:
  - 短期滞在は住民票対象外
needs_review_flags:
  - tanki_taizai_exclusion_clear_source
  - tokubetsu_eijuusha_handling
  - mynumber_card_issuance_period
related_links:
  - title: "ISA — 住居地届出"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    organization: "出入国在留管理庁"
    display_label: "住居地届出"
    locator: "住民基本台帳"
    relation: "official_reference"
evidence_points:
  - claim: "中長期在留者は住民票交付対象、マイナンバー自動付番。区役所住民登録で在留カードの住居地届出みなし。"
    source_title: "ISA — 住居地届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    source_organization: "出入国在留管理庁"
    source_locator: "住民基本台帳"
    display_label: "住民票・マイナンバー"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

中長期在留者は住民票交付・マイナンバー自動付番。

## must_say

- 住民票対象
- マイナンバー自動付番
- 区役所登録で在留カード住居地届出みなし

## injection_format

### injection_certain_block

```text
- 中長期在留者は住民票交付・マイナンバー自動付番。
- 住民票対象
- マイナンバー自動付番
- 区役所登録で在留カード住居地届出みなし
- 出典: ISA — 住居地届出 https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html
```
## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop5 | 公式source再確認後、低/中リスクの確定事実としてruntime昇格。 | ai_extracted | ai_verified | promote |
