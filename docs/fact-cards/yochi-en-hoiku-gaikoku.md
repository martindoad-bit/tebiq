---
fact_id: yochi-en-hoiku-gaikoku
title: 幼児教育・保育の無償化 — 3-5歳児・住民登録あれば対象
state: ai_verified
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "幼保無償化"
citation_summary: "3-5歳の幼稚園・認可保育所・認定こども園等の利用料が無償化（2019年10月〜）。住民登録ある外国人世帯も対象。0-2歳は住民税非課税世帯のみ無償。"
source_display_names:
  - "こども家庭庁"
applies_when:
  - "保育園 無料 外国人"
  - "幼稚園 費用"
does_not_cover:
  - "認可外保育施設の補助詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.cfa.go.jp/policies/kokoseido/mushouka/gaiyou
    label: こども家庭庁
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者の3-5歳児世帯
direct_fact_fields:
  - 3-5歳：認可施設利用料無償
  - 0-2歳：住民税非課税世帯のみ無償
  - 給食費・行事費は別途自己負担
  - 認可外保育施設も月3.7万円上限で補助
  - 外国人世帯も住民登録あれば対象
ai_inferred_fields:
  - 申請は市区町村
needs_review_flags:
  - kuyakusho_individual_application
  - 0-2years_borderline_household
  - authorized_unauthorized_specifics
related_links:
  - title: "こども家庭庁"
    url: "https://www.cfa.go.jp/policies/kokoseido/mushouka/gaiyou"
    organization: "こども家庭庁"
    display_label: "保育"
    locator: "幼保無償化"
    relation: "official_reference"
evidence_points:
  - claim: "3-5歳の幼稚園・認可保育所・認定こども園の利用料が無償化（2019年10月〜）。住民登録ある外国人世帯も対象。"
    source_title: "こども家庭庁"
    source_url: "https://www.cfa.go.jp/policies/kokoseido/mushouka/gaiyou"
    source_organization: "こども家庭庁"
    source_locator: "幼保無償化"
    display_label: "幼保無償化"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

幼保無償化：3-5歳・外国人対象・0-2は非課税世帯のみ。

## must_say

- 3-5歳無償
- 外国人世帯も対象
- 給食費等は別途

## injection_format

### injection_certain_block

```text
【幼児教育・保育の無償化／{{TODAY_ISO}} 公式】
幼児教育・保育の無償化では、3歳から5歳までの幼稚園・保育所・認定こども園等の利用料が無償化の対象になる。
0歳から2歳までは、住民税非課税世帯など一定の条件に該当する場合に対象になる。
給食費、行事費、通園費などは無償化の対象外になることがあるため、市区町村や園の案内で確認する。
```

### injection_needs_review_addendum

```text
※ 認可外保育施設、上限額、申請方法、外国人世帯の住民登録確認は市区町村で確認。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
