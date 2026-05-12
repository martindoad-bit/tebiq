---
fact_id: designated-activities-ski-instructor-source
title: "特定活動 — スキーインストラクター"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 5
citation_label: "特定活動: スキー指導"
citation_summary: "ISA は特定活動の一類型として、スキーインストラクターのページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-009
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: スキーインストラクター"
  source_locator: "ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_identification
  exclusion_scope:
    - "資格・経験の判断"
    - "季節雇用の条件"
    - "他スポーツ指導への一般化"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-ski-instructor
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities12.html
    title: 在留資格「特定活動」（スキーインストラクター）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "スキーインストラクターとして特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_ski_instructor_source
ai_inferred_fields: []
needs_review_flags:
  - id: ski_instructor_conditions_needs_review
    reason: "資格・経験、契約先、活動期間は個別確認が必要。"
evidence_points:
  - claim: "ISA は特定活動の一類型として、スキーインストラクターのページを設けている。"
    source_title: "在留資格「特定活動」（スキーインストラクター）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities12.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: スキー指導"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — スキーインストラクター

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は特定活動の一類型として、スキーインストラクターのページを設けている。

## exceptions_or_transition

- このカードは、資格・経験、契約先、活動期間、他スポーツ指導への適用を判断しない。

## common_user_phrases

- スキーインストラクター 特定活動
- スキー 指導 ビザ
- スキー場 インストラクター 外国人
- ski instructor visa Japan
- 冬だけ スキー 仕事 在留資格
- 特定活動 スキー講師

## must_say

- スキーインストラクターは特定活動の個別類型として確認する。
- 他のスポーツ指導にそのまま一般化しない。

## must_not_say

- スポーツ指導ならすべてスキーインストラクター類型でよい。
- スキー場の仕事なら全部この特定活動になる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-009 |
