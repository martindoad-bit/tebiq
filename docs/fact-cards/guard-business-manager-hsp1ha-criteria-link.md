---
fact_id: guard-business-manager-hsp1ha-criteria-link
title: "経営管理と高度専門職1号ハ — 関連はあるが同一ではない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "経営管理/HSP1ハ: 関連と区別"
citation_summary: "ISA の経営管理改正ページは、経営管理活動を前提とする高度専門職1号ハ等にも経営管理の許可基準が前提になると説明している。J-Skip全体や他類型へ一律に広げない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-011
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "経営・管理上陸基準省令等改正 / 高度専門職1号ハ"
  source_locator: "経営・管理活動を前提とする高度専門職"
  claim_type: integration_boundary
  applicable_statuses:
    - "経営・管理"
    - "高度専門職1号ハ"
    - "高度専門職2号"
  application_type:
    - certificate
    - status-change
    - renewal
    - permanent_residence
  exclusion_scope:
    - "高度専門職1号イ・ロへの適用"
    - "J-Skip全体への一律適用"
    - "経営管理基準の個別充足判断"
  deep_water_candidate: true
official_sources:
  - id: isa-business-manager-2025
    url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    title: 在留資格「経営・管理」に係る上陸基準省令等の改正について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "経営管理改正を高度専門職1号ハやJ-Skip全体へ誤って広げている相談"
direct_fact_fields:
  - business_manager_hsp1ha_criteria_link
ai_inferred_fields: []
needs_review_flags:
  - id: business_manager_hsp1ha_review
    reason: "経営管理活動を前提とする高度専門職かどうか、更新・永住・変更のどの場面かで判断が変わるため。"
evidence_points:
  - claim: "ISA の経営管理改正ページは、経営管理活動を前提とする高度専門職1号ハ又は高度専門職2号についても、経営管理の許可基準を満たすことが前提になると説明している。"
    source_title: "在留資格「経営・管理」に係る上陸基準省令等の改正について"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    source_organization: "出入国在留管理庁"
    source_locator: "経営管理と高度専門職の扱い"
    display_label: "経営管理: 高度専門職1号ハとの関係"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の J-Skip ページは、高度専門職の対象活動を高度学術研究、高度専門・技術、高度経営・管理の3類型として説明している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "対象活動の3類型"
    display_label: "J-Skip: 3つの活動類型"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 経営管理と高度専門職1号ハ — 関連はあるが同一ではない

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

経営管理活動を前提とする高度専門職1号ハ等は、経営管理の許可基準との関係を確認する。一方で、その説明をJ-Skip全体や高度専門職1号イ・ロに一律に広げない。

## exceptions_or_transition

- このカードは、経営管理改正基準が個別申請にどう適用されるか、又は過渡措置の該当性を判断しない。

## common_user_phrases

- 高度専門職1号ハ 経営管理 基準
- HSP1ハ 経営管理 3000万
- J-Skip 全部 経営管理 基準
- 高度経営管理 経営管理 改正
- 高度専門職2号 経営管理 永住
- 特別高度人材 経営管理 活動

## must_say

- 経営管理活動を前提とする高度専門職は、経営管理基準との関係を確認する。
- ただし、J-Skipや高度専門職の全類型に一律に広げない。

## must_not_say

- J-Skipは全員経営管理3000万円基準を見る。
- 高度専門職1号ハと経営管理は完全に同じ制度である。

## injection_format

### injection_certain_block

```text

```

### injection_needs_review_addendum

```text

```

## changelog

| Date | Actor | Change | From | To | Notes |
|---|---|---|---|---|---|
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-011 |
