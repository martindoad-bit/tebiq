---
fact_id: zairyu-touriku-after-zaijuu
title: 新規上陸後 — 14日以内に区役所で住民登録（必須）
state: ai_verified
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "新規上陸住民登録"
citation_summary: "中長期在留資格で新規上陸した者は、住居地を定めた日から14日以内に区役所で住民登録（住民基本台帳届出+在留カード住居地届出）を行う義務。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "新規来日 区役所"
  - "上陸後 住民票"
does_not_cover:
  - "短期滞在者（住民登録対象外）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html
    label: ISA — 住居地届出
    accessed: "2026-05-17"
applies_to:
  - 新規上陸の中長期在留者
direct_fact_fields:
  - 期限：14日以内
  - 必要：在留カード、パスポート、転入届
  - 効果：住民票交付、マイナンバー自動付番
  - 在留カードの住居地届出も同時完了（みなし届出）
ai_inferred_fields:
  - 90日未届出で取消事由⑧
needs_review_flags:
  - 14day_practice_strict_check
  - hotel_address_temporary_handling
  - co-living_arrangement_specifics
related_links:
  - title: "ISA — 住居地届出"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html"
    organization: "出入国在留管理庁"
    display_label: "住居地届出"
    locator: "14日以内"
    relation: "official_reference"
evidence_points:
  - claim: "新規上陸の中長期在留者は住居地を定めた日から14日以内に区役所で住民登録（住民基本台帳届出+在留カード住居地届出）が必要。"
    source_title: "ISA — 住居地届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html"
    source_organization: "出入国在留管理庁"
    source_locator: "14日以内"
    display_label: "新規上陸住民登録"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

新規上陸後14日以内に区役所で住民登録。

## must_say

- 14日以内
- 住民票交付＋マイナンバー
- カード住居地届出みなし

## injection_format

### injection_certain_block

```text
【新規上陸後の住居地届出／{{TODAY_ISO}} 公式】
新規上陸した中長期在留者は、住居地を定めた日から14日以内に、市区町村窓口で住居地を届け出る必要がある。
市区町村窓口で在留カードを提示して転入届等を行うと、入管法上の住居地届出も行ったものとみなされる。
短期滞在者やまだ住居地を定めていない場合の扱いはこのカードだけで断定しない。
```

### injection_needs_review_addendum

```text
※ ホテル・一時滞在先・シェアハウス等を住居地として扱えるかは市区町村窓口で確認。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
