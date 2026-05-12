---
fact_id: status-acquisition-japan-birth-foreign-parents-nationality
title: 日本出生 — 父母双方为外国籍时不会因出生地自动取得日本国籍
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 2
citation_label: "父母双方外国籍时，日本出生不自动取得日本国籍"
citation_summary: "ISA の在留資格取得ページは、父母双方が外国籍の場合、日本で出生しても子どもは日本国籍を取得できないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-020
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "在留資格取得許可申請ページ 国籍の取得について"
  source_locator: "在留資格取得許可申請ページ：国籍の取得について"
  claim_type: status_boundary
  applicable_statuses:
    - "newborn"
  application_type:
    - status_acquisition
  exclusion_scope:
    - "国籍法の全体判断"
    - "国籍国への届出手続"
  deep_water_candidate: false
applies_when:
  - "用户问外国人父母的小孩在日本出生是不是日本籍"
  - "用户问日本出生是否还要办在留"
does_not_cover:
  - "一方亲为日本人的国籍判断"
  - "国籍国大使馆手续"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-status-acquisition-16-10
    url: https://www.moj.go.jp/isa/applications/procedures/16-10.html
    title: 在留資格取得許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格取得許可申請
direct_fact_fields:
  - child_born_in_japan_to_two_foreign_national_parents_does_not_acquire_japanese_nationality_by_birthplace
ai_inferred_fields: []
needs_review_flags:
  - id: mixed_nationality_parent_case
    reason: "If one parent may be Japanese or nationality is unclear, route to nationality-law review."
evidence_points:
  - claim: "ISA states that when both father and mother are foreign nationals, a child born in Japan cannot acquire Japanese nationality merely from that birth."
    source_title: "在留資格取得許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-10.html"
    source_organization: "出入国在留管理庁"
    source_locator: "国籍の取得について"
    display_label: "日本出生：父母双方外国籍なら日本国籍は自動取得しない"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 日本出生 — 父母双方为外国籍时不会因出生地自动取得日本国籍

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

父母双方都是外国籍的情况下，孩子即使在日本出生，也不会因出生在日本而自动取得日本国籍。

## exceptions_or_transition

- 亲子国籍关系复杂、一方可能为日本籍、认知/收养等情况不由本卡判断。
- 仍需办理本国届出、护照和日本在留相关手续。

## common_user_phrases

- 外国人父母 日本出生 日本国籍
- 在日本生孩子 自动日本籍吗
- 父母都是外国人 宝宝日本国籍
- 日本出生 小孩国籍
- 日本出生 还要办在留吗
- 新生儿不是自动日本国籍

## must_say

- 父母双方为外国籍时，日本出生本身不自动取得日本国籍。
- 需确认本国手续和日本在留資格取得。

## must_not_say

- 在日本出生就自动日本籍。
- 不用办在留手续。

## qa_cases

### QA-1

**user**: 我们夫妻都是中国籍，小孩在日本出生，是日本籍吗？

**must_have**:

- 不因出生地自动取得日本国籍
- 需要办本国和在留相关手续

**must_not_have**:

- 自动日本籍

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-020 |
