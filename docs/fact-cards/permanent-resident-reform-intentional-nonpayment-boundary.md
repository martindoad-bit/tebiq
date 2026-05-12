---
fact_id: permanent-resident-reform-intentional-nonpayment-boundary
title: 永住者制度適正化 — 故意の公租公課不払は支払能力や事情を分けて扱う
state: ai_extracted
risk_level: critical
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 3
citation_label: "永住者の公租公課不払は故意性と事情が重要"
citation_summary: "ISA の永住許可制度 Q&A は、改正後の故意の公租公課不払について、支払義務を認識し支払能力があるにもかかわらずあえて支払わない場合などを想定し、病気や失業などでやむを得ず支払えない場合は取消対象外と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-043
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "永住許可制度の適正化Q&A"
  source_locator: "Q9"
  claim_type: cancellation_boundary
  applicable_statuses:
    - "permanent_resident"
  application_type:
    - cancellation
  exclusion_scope:
    - "改正条文の施行日確定"
    - "個別の故意性判断"
  deep_water_candidate: true
applies_when:
  - "用户问永住者欠税、欠年金、欠社保是否会取消永住"
does_not_cover:
  - "具体欠缴情形是否构成改正后取消事由"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-system-qa
    url: https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html
    title: 永住許可制度の適正化Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住者
direct_fact_fields:
  - permanent_resident_reform_intentional_nonpayment_boundary
ai_inferred_fields:
  - reform_effective_date_needs_confirm
needs_review_flags:
  - id: reform_effective_date_and_individual_intent_review
    reason: "改正後条文の施行日と個別の故意性・支払能力判断は確認が必要。"
evidence_points:
  - claim: "ISA の Q&A は、改正後の故意の公租公課不払について、支払義務を認識し支払能力があるにもかかわらずあえて支払わない場合などを想定し、病気や失業などでやむを得ず支払えない場合は取消対象外と説明している。"
    source_title: "永住許可制度の適正化Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q9"
    display_label: "永住者制度適正化：故意の公租公課不払"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者制度適正化 — 故意の公租公課不払は支払能力や事情を分けて扱う

## current_date_logic

Checked against the ISA permanent-residence-system Q&A on 2026-05-12. The effective-date handling for the amended cancellation ground still requires confirmation before promotion.

## current_effective_fact

ISA の Q&A は、改正後の故意の公租公課不払について、支払義務を認識し支払能力があるにもかかわらずあえて支払わない場合などを想定し、病気や失業などでやむを得ず支払えない場合は取消対象外と説明している。

## exceptions_or_transition

- 施行日と個別の故意性判断は確認が必要。
- 単なる相談、分納、困窮状況を直ちに取消対象と断定しない。

## common_user_phrases

- 永住 税金 未払い 取消
- 永住者 年金 未納 取消
- 永住者 社会保険料 不払い
- 公租公課 故意 不払い
- 永住 欠税 取消
- 永住者 失業 払えない

## must_say

- 故意性、支払能力、やむを得ない事情を分ける。
- 改正後条文の施行日と個別評価は確認する。

## must_not_say

- 永住者が一度滞納したら必ず取消。
- 病気や失業で払えない場合も常に取消対象。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-043 |
