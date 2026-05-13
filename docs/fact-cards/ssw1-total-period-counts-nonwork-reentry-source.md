---
fact_id: ssw1-total-period-counts-nonwork-reentry-source
title: "特定技能1号 — 非就労期間・再入国出国期間も通算対象"
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
citation_label: "特定技能1号: 通算期間の数え方"
citation_summary: "ISA は、特定技能1号の通算在留期間に、1号で在留中の就労していない期間や再入国許可による出国期間も含まれると案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B1-004
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能1号 通算在留期間"
  source_locator: "通算在留期間"
  claim_type: period_count_boundary
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - current-status
    - renewal
    - status-change
  exclusion_scope:
    - "個別の通算期間計算"
    - "5年超在留の例外該当性"
    - "2号移行可否"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-total-period
    url: https://www.moj.go.jp/isa/10_00233.html
    title: 通算在留期間
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能1号の5年通算に、働いていない期間や一時帰国期間が含まれるかを聞く相談"
direct_fact_fields:
  - ssw1_total_period_counts_nonwork_reentry
ai_inferred_fields: []
needs_review_flags:
  - id: ssw1_total_period_individual_history_review
    reason: "通算期間は在留履歴・出国履歴・例外事情の確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能1号の通算在留期間に、1号で在留中の就労していない期間を含むと案内している。"
    source_title: "通算在留期間"
    source_url: "https://www.moj.go.jp/isa/10_00233.html"
    source_organization: "出入国在留管理庁"
    source_locator: "通算在留期間"
    display_label: "特定技能1号: 非就労期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は、再入国許可又はみなし再入国許可による出国期間も、特定技能1号の通算在留期間に含まれると案内している。"
    source_title: "通算在留期間"
    source_url: "https://www.moj.go.jp/isa/10_00233.html"
    source_organization: "出入国在留管理庁"
    source_locator: "通算在留期間"
    display_label: "特定技能1号: 出国期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 非就労期間・再入国出国期間も通算対象

## current_date_logic

Checked against the ISA total-period page on 2026-05-13.

## current_effective_fact

特定技能1号の通算在留期間には、1号で在留中の就労していない期間や、再入国許可・みなし再入国許可による出国期間も含まれる。

## exceptions_or_transition

- 通算期間は個別の在留履歴・出国履歴で確認する。
- 例外的に通算から除かれる期間は別カードで扱う。

## common_user_phrases

- 特定技能1号 働いてない 期間 5年
- 特定技能1号 一時帰国 5年 含まれる
- 特定技能 再入国 通算期間
- 特定技能1号 無職期間 通算
- 特定技能 みなし再入国 5年
- 特定技能1号 通算 計算

## must_say

- 特定技能1号の通算期間は、働いた日だけで数えるとは限らない。
- 非就労期間や再入国許可による出国期間も通算対象として確認する。

## must_not_say

- 働いていない期間は5年に入らない。
- 一時帰国すれば5年の計算が止まる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 1 extraction | — | ai_extracted | P1C3-B1-004 |
