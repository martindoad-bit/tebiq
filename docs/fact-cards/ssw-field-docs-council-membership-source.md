---
fact_id: ssw-field-docs-council-membership-source
title: "特定技能 — 分野書類では協議会構成員証明を確認する場面が多い"
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 3
citation_label: "特定技能: 分野書類と協議会"
citation_summary: "特定技能の更新用第3表は、複数分野で協議会の構成員であることの証明書を分野書類として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-016
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 更新用第3表"
  source_locator: "更新用第3表の1"
  claim_type: field_material_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - renewal
  exclusion_scope:
    - "全分野の協議会要件列挙"
    - "協議会加入可否"
    - "各分野の有効期限・省略可否"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-renew-all-fields
    url: https://www.moj.go.jp/isa/content/001446608.xlsx
    title: 分野に関する必要書類（農業分野及び漁業分野を除く）（特定技能1号・在留期間更新許可申請）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の分野別書類や協議会書類を聞く相談"
direct_fact_fields:
  - ssw_field_docs_council_membership
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_field_council_scope_review
    reason: "分野ごとに協議会証明、誓約書、許可証、省略可否が異なる。"
evidence_points:
  - claim: "特定技能1号の更新用第3表の1は、介護、ビルクリーニング、造船・舶用工業、自動車整備、航空、宿泊など複数分野で、協議会の構成員であることの証明書を分野書類として掲げている。"
    source_title: "分野に関する必要書類（農業分野及び漁業分野を除く）（特定技能1号・在留期間更新許可申請）"
    source_url: "https://www.moj.go.jp/isa/content/001446608.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第3表の1"
    display_label: "特定技能: 分野別書類"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 分野書類では協議会構成員証明を確認する場面が多い

## current_date_logic

Checked against ISA SSW renewal field table on 2026-05-13.

## current_effective_fact

特定技能の分野書類では、複数分野で協議会の構成員であることの証明書が必要書類として出ている。

## exceptions_or_transition

- 協議会書類の要否、証明書の種類、省略可否は分野ごとに異なる。
- 農業と漁業は別表で確認する。

## common_user_phrases

- 特定技能 協議会 構成員 証明書
- 特定技能 分野 書類 協議会
- 特定技能 更新 協議会 証明
- 特定技能 介護 協議会 書類
- 特定技能 宿泊 協議会 書類
- 特定技能 介護 協議会 外食 使える
- 特定技能 council membership document

## must_say

- 分野書類では協議会構成員証明を確認する場面が多い。

## must_not_say

- 協議会関係の書類はどの分野でも不要。
- すべての分野で協議会書類は同じ形式で足りる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-016 |
