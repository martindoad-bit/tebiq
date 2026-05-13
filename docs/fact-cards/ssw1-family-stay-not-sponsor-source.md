---
fact_id: ssw1-family-stay-not-sponsor-source
title: "特定技能1号 — 家族滞在の扶養者欄に載っていない"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 1
citation_label: "特定技能1号: 家族滞在の確認点"
citation_summary: "ISA の在留資格一覧表では、家族滞在の扶養者となる在留資格の列挙に特定技能2号は含まれる一方、特定技能1号は含まれていない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-009
  authority_layer: L4 ISA Status List
  legal_source_type: official_status_page
  law_article_ref: "家族滞在 対象在留資格"
  source_locator: "在留資格一覧表 家族滞在 row"
  claim_type: family_boundary
  applicable_statuses:
    - "特定技能1号"
    - "家族滞在"
  application_type:
    - current-status
    - status-change
    - certificate
  exclusion_scope:
    - "例外的な特定活動"
    - "家族本人の個別在留資格"
    - "許可可否"
  deep_water_candidate: true
official_sources:
  - id: isa-status-list
    url: https://www.moj.go.jp/isa/applications/status/qaq5.html
    title: 在留資格一覧表
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能1号で配偶者や子を家族滞在で呼べるかを聞く相談"
direct_fact_fields:
  - ssw1_family_stay_not_sponsor_source
ai_inferred_fields: []
needs_review_flags:
  - id: ssw1_family_route_review
    reason: "例外的な特定活動や家族本人の資格は別途確認が必要。"
evidence_points:
  - claim: "ISA の在留資格一覧表では、家族滞在の扶養者となる在留資格の列挙に特定技能2号は含まれるが、特定技能1号は含まれていない。"
    source_title: "在留資格一覧表"
    source_url: "https://www.moj.go.jp/isa/applications/status/qaq5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "家族滞在 row"
    display_label: "家族滞在: 特定技能2号は列挙"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 家族滞在の扶養者欄に載っていない

## current_date_logic

Checked against the ISA status list on 2026-05-13.

## current_effective_fact

ISA の在留資格一覧表では、家族滞在の扶養者となる在留資格の列挙に特定技能2号は含まれるが、特定技能1号は含まれていない。特定技能1号の家族帯同を、通常の家族滞在として即答しない。

## exceptions_or_transition

- 例外的な特定活動や家族本人の別資格は、このカードでは判断しない。

## common_user_phrases

- 特定技能1号 家族滞在
- 特定技能1号 配偶者 呼ぶ
- 特定技能1号 子供 呼べる
- 特定技能 家族帯同 1号
- 特定技能1号 家族 ビザ
- ssw1 dependent spouse child
- 特定技能1号 配偶孩子 家族滞在

## must_say

- 家族滞在の列挙では特定技能2号が示され、1号は同じ扱いで即答しない。

## must_not_say

- 特定技能1号なら普通に家族滞在で配偶者・子を呼べる。
- 1号と2号の家族帯同は同じ。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-009 |
