---
fact_id: nikkei-fourth-activity-paid-work-boundary
title: "日系四世 — 日本文化理解活動と必要範囲の報酬活動"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 3
citation_label: "日系四世活動範囲"
citation_summary: "ISA は、日系四世制度で行える活動として、日本文化・生活様式の理解を目的とする活動と、その活動に必要な資金を補うため必要な範囲内の報酬活動を掲げ、風営法関係業務はできないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B3-011
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "日系四世の更なる受入制度"
  source_locator: "日系四世の方が日本で行える活動"
  claim_type: activity_scope
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - period_renewal
  exclusion_scope:
    - "通常就労資格"
    - "風営法関係業務"
    - "報酬活動の必要範囲"
  deep_water_candidate: true
official_sources:
  - id: isa-nikkei-fourth
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00166.html
    title: 日系四世の更なる受入制度
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系四世制度で働ける範囲の相談"
direct_fact_fields:
  - nikkei_fourth_activity_paid_work_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: nikkei_fourth_paid_activity_scope
    reason: "報酬活動が必要な範囲内かは活動実態の確認が必要。"
evidence_points:
  - claim: "ISA は、日系四世の活動として文化・生活様式理解活動と必要範囲の報酬活動を掲げ、風営法関係業務はできないとしている。"
    source_title: "日系四世の更なる受入制度"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00166.html"
    source_organization: "出入国在留管理庁"
    source_locator: "日系四世の方が日本で行える活動"
    display_label: "日系四世: 活動範囲"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 日系四世 — 日本文化理解活動と必要範囲の報酬活動

## current_date_logic

Checked against ISA resource page on 2026-05-12.

## current_effective_fact

日系四世制度で行える活動は、日本文化・生活様式の理解を目的とする活動と、そのために必要な資金を補う必要範囲の報酬活動として説明されている。

## exceptions_or_transition

- 通常の就労資格ではない。
- 風営法関係業務は不可とされている。

## common_user_phrases

- 日系四世 働ける
- 日系4世 アルバイト
- 日系四世 報酬 活動
- 日系4世 風俗 パチンコ
- 日裔四世 可以工作吗

## must_say

- 報酬活動は制度趣旨と必要範囲の中で確認する。

## must_not_say

- 日系四世なら何の仕事でもできる。
- 文化活動と関係なく普通就労資格として扱う。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 3 extraction | — | ai_extracted | P1C1-B3-011 |
