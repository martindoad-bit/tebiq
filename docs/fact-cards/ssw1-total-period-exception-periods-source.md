---
fact_id: ssw1-total-period-exception-periods-source
title: "特定技能1号 — 通算期間に含まれない例外期間"
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
citation_label: "特定技能1号: 通算対象外の例外"
citation_summary: "ISA は、一定のやむを得ない再入国不能期間、産前産後休業・育児休業、病気・怪我による休業期間などは通算在留期間に含まれないと案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-005
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能1号 通算在留期間"
  source_locator: "通算在留期間 例外"
  claim_type: period_exception_boundary
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - current-status
    - renewal
    - status-change
  exclusion_scope:
    - "個別例外該当性"
    - "証明資料の十分性"
    - "5年超在留の相当理由"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-total-period
    url: https://www.moj.go.jp/isa/10_00233.html
    title: 通算在留期間
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能1号の産休・育休・病気休業・再入国不能期間が5年上限に入るかを聞く相談"
direct_fact_fields:
  - ssw1_total_period_exception_periods_source
ai_inferred_fields: []
needs_review_flags:
  - id: ssw1_exception_evidence_review
    reason: "例外期間の該当性と証明資料は個別確認が必要。"
evidence_points:
  - claim: "ISA は、一定のやむを得ない再入国不能期間、産前産後休業・育児休業、病気・怪我による休業期間は、特定技能1号の通算在留期間に含まれないと案内している。"
    source_title: "通算在留期間"
    source_url: "https://www.moj.go.jp/isa/10_00233.html"
    source_organization: "出入国在留管理庁"
    source_locator: "通算在留期間"
    display_label: "特定技能1号: 例外期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 通算期間に含まれない例外期間

## current_date_logic

Checked against the ISA total-period page on 2026-05-13.

## current_effective_fact

ISA は、一定のやむを得ない再入国不能期間、産前産後休業・育児休業、病気・怪我による休業期間などを、特定技能1号の通算在留期間に含めない期間として案内している。

## exceptions_or_transition

- 実際に例外期間として扱えるかは、事情と証明資料の確認が必要。
- このカードは5年超在留や2号移行の可否を判断しない。

## common_user_phrases

- 特定技能1号 産休 5年
- 特定技能 育休 通算期間
- 特定技能1号 病気 休業 5年
- 特定技能 再入国 できなかった 通算
- 特定技能1号 例外期間
- 特定技能 5年 超える 理由

## must_say

- 例外的に通算期間に含まれない期間がある。
- ただし、個別事情と証明資料の確認が必要。

## must_not_say

- 産休・育休・病気なら自動的に5年を超えられる。
- 例外に当たるかを質問文だけで断定する。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-005 |
