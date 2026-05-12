---
fact_id: long-term-resident-nikkei-third-japanese-language-b1
title: "日系3世定住者 — 日本語能力資料"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "日系3世の日本語能力資料"
citation_summary: "ISA の日系3世定住者ページは、一定の日本語能力を証明する資料として、告示で定める日本語教育機関で6月以上の日本語教育を受けた文書又は日本語教育の参照枠B1相当以上を証明する文書などを示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-006
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者 / 日系3世"
  source_locator: "一定の日本語能力があることを証明する資料"
  claim_type: materials_and_eligibility_boundary
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "証明資料の有効性"
    - "未成年者の扱い"
    - "5年希望時の追加資料"
  deep_water_candidate: true
official_sources:
  - id: isa-long-term-resident-nikkei-third
    url: https://www.moj.go.jp/isa/applications/status/longtermresident_01.html
    title: 在留資格「定住者」（日系3世）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系3世定住者の日本語能力資料確認"
direct_fact_fields:
  - long_term_resident_nikkei_third_japanese_language_b1
ai_inferred_fields: []
needs_review_flags:
  - id: nikkei_third_language_material_equivalence
    reason: "N2、N3得点、BJT、日本語教育機関などの証明資料は個別確認が必要。"
evidence_points:
  - claim: "ISA の日系3世定住者ページは、日本語教育機関で6月以上学んだ文書やB1相当以上の日本語能力を証明する文書を、日本語能力資料として示している。"
    source_title: "在留資格「定住者」（日系3世）"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident_01.html"
    source_organization: "出入国在留管理庁"
    source_locator: "一定の日本語能力があることを証明する資料"
    display_label: "日系3世: 日本語能力資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 日系3世定住者 — 日本語能力資料

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

日系3世定住者ページは、一定の日本語能力を証明する資料として、日本語教育機関で6月以上学んだ文書又はB1相当以上を示す文書などを掲げている。

## exceptions_or_transition

- 証明資料の種類と申請区分は個別確認する。

## common_user_phrases

- 日系3世 日本語能力
- 日系三世 N2 N3 BJT
- 日系3世 B1 日本語
- 日系3世 日本語学校 6ヶ月
- 日裔三世 日语要求

## must_say

- 日系3世は日本語能力資料も確認対象になる。

## must_not_say

- 日系3世なら日本語資料は不要だと言う。
- N3だけで必ず足りると断定する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-006 |
