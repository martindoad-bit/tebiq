---
fact_id: ssw1-ssw2-status-skill-period-boundary
title: "特定技能1号・2号 — 技能水準と在留期間を分ける"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 1
citation_label: "特定技能1号・2号: 基本区別"
citation_summary: "ISA は特定技能1号を相当程度の知識又は経験を必要とする技能、2号を熟練した技能として分け、在留期間も別に示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-001
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "在留資格「特定技能」"
  source_locator: "該当する活動・在留期間"
  claim_type: status_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - current-status
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "個別分野の該当性"
    - "技能試験の合否"
    - "家族帯同"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能1号と2号の基本的な違いを聞く相談"
direct_fact_fields:
  - ssw1_ssw2_status_skill_period_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_field_and_family_review
    reason: "分野、試験、家族帯同は別ソースで確認する必要がある。"
evidence_points:
  - claim: "ISA は特定技能1号を、特定産業分野で相当程度の知識又は経験を必要とする技能を要する業務に従事する活動として示している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特定技能1号"
    display_label: "特定技能1号: 相当程度の技能"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は特定技能2号を、特定産業分野で熟練した技能を要する業務に従事する活動として示している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特定技能2号"
    display_label: "特定技能2号: 熟練した技能"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号・2号 — 技能水準と在留期間を分ける

## current_date_logic

Checked against the ISA status page on 2026-05-13.

## current_effective_fact

特定技能1号と2号は、技能水準と在留期間の扱いを分けて確認する。1号の説明を2号に、2号の説明を1号にそのまま当てない。

## exceptions_or_transition

- このカードは、分野別要件、試験、家族帯同、2号への移行可否を判断しない。

## common_user_phrases

- 特定技能1号 2号 違い
- 特定技能一号 二号 区别
- 特定技能1号 熟練 相当程度
- 特定技能2号 1号 同じ
- specified skilled worker 1 2 difference
- 特定技能 1号 2号 在留期間

## must_say

- 特定技能1号と2号は技能水準と在留期間を分けて確認する。

## must_not_say

- 特定技能1号と2号は同じ制度だから同じ扱いでよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-001 |
