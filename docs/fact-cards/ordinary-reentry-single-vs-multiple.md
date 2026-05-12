---
fact_id: ordinary-reentry-single-vs-multiple
title: 通常再入国許可 — 一次有効と数次有効がある
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "通常再入国許可には一次有効・数次有効がある"
citation_summary: "ISA は、通常の再入国許可について、一回限り有効なものと有効期間内に何回でも使用できるものがあるとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-098
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "再入国許可"
  source_locator: "再入国許可の種別"
  claim_type: procedure_option
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - reentry
  exclusion_scope:
    - "みなし再入国"
  deep_water_candidate: false
applies_when:
  - "用户问普通再入国许可一次和多次的区别"
does_not_cover:
  - "个案应该申请一次还是多次"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-reentry-overview
    url: https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html
    title: 再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 通常再入国許可を申請する外国人
direct_fact_fields:
  - ordinary_reentry_single_vs_multiple
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA は、通常の再入国許可には、一回限り有効なものと、有効期間内であれば何回でも使用できるものがあるとしている。"
    source_title: "再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/sainyukoku_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "再入国許可の種別"
    display_label: "通常再入国許可：一次有効・数次有効"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 通常再入国許可 — 一次有効と数次有効がある

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

通常再入国許可には、一回限り有効なものと、有効期間内であれば何回でも使用できるものがある。

## exceptions_or_transition

- どちらを申請すべきかは渡航予定や個別事情による。

## common_user_phrases

- 再入国許可 一次 数次
- 再入国許可 何回使える
- 再入国許可 multiple
- 再入国許可 一回だけ
- 再入国许可 多次
- 何回も海外に行く 再入国許可

## must_say

- 通常再入国許可には一回限り有効なものがある。
- 通常再入国許可には有効期間内に何回でも使用できるものがある。

## must_not_say

- 通常再入国許可は必ず一回しか使えない。
- 通常再入国許可は必ず何度でも使える。

## qa_cases

### QA-1

**user**: 再入国許可は何回も使えますか？

**must_have**:

- 一次有効
- 数次有効

**must_not_have**:

- 全部一回だけ

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-098 |
