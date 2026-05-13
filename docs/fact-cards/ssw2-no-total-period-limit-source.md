---
fact_id: ssw2-no-total-period-limit-source
title: "特定技能2号 — 通算在留期間の上限なし"
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
citation_label: "特定技能2号: 通算上限なし"
citation_summary: "ISA は、特定技能2号について通算在留期間に上限はないと案内している。1号の5年上限を2号にそのまま当てない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-003
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "特定技能2号 通算在留期間"
  source_locator: "通算在留期間 ページ冒頭"
  claim_type: period_boundary
  applicable_statuses:
    - "特定技能2号"
  application_type:
    - current-status
    - renewal
    - status-change
  exclusion_scope:
    - "2号への移行可否"
    - "更新許可見込み"
    - "分野別2号対象可否"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-total-period
    url: https://www.moj.go.jp/isa/10_00233.html
    title: 通算在留期間
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能2号の通算在留期間や更新上限を聞く相談"
direct_fact_fields:
  - ssw2_no_total_period_limit_source
ai_inferred_fields: []
needs_review_flags:
  - id: ssw2_renewal_and_field_review
    reason: "2号対象分野、更新許可、個別分野条件は別途確認する必要がある。"
evidence_points:
  - claim: "ISA の通算在留期間ページは、在留資格「特定技能2号」について通算在留期間に上限はないと案内している。"
    source_title: "通算在留期間"
    source_url: "https://www.moj.go.jp/isa/10_00233.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭"
    display_label: "特定技能2号: 通算上限なし"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の特定技能ページは、特定技能2号の在留期間として3年、2年、1年又は6月を示している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特定技能2号 在留期間"
    display_label: "特定技能2号: 3年・2年・1年・6月"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能2号 — 通算在留期間の上限なし

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

特定技能2号は通算在留期間に上限がないと案内されている。ただし、2号へ移れるか、更新できるか、分野が対象かは別に確認する。

## exceptions_or_transition

- このカードは、2号の許可見込みや分野別要件を判断しない。

## common_user_phrases

- 特定技能2号 上限なし
- 特定技能2号 何年まで
- 特定技能2号 更新 上限
- 特定技能1号 5年 2号
- 特定技能2号 通算
- specified skilled worker 2 no limit

## must_say

- 特定技能2号には通算在留期間の上限がないと確認する。
- ただし2号該当性や更新可否は別確認。

## must_not_say

- 特定技能2号も1号と同じ5年上限である。
- 2号なら必ず何度でも許可される。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-003 |
