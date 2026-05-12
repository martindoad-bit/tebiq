---
fact_id: permanent-resident-reform-criminal-violation-boundary
title: 永住者制度適正化 — 重大な刑罰法令違反の対象は限定して読む
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
citation_label: "永住者の刑罰法令違反は限定して読む"
citation_summary: "ISA の永住許可制度 Q&A は、改正後の重大な刑罰法令違反について、窃盗、詐欺、恐喝、殺人、危険運転致死傷などを例示し、過失運転致死傷罪や道路交通法違反で罰金刑に処せられた場合は対象に含まれないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-046
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "永住許可制度の適正化Q&A"
  source_locator: "Q11"
  claim_type: cancellation_boundary
  applicable_statuses:
    - "permanent_resident"
  application_type:
    - cancellation
  exclusion_scope:
    - "改正条文の施行日確定"
    - "個別刑事事件の評価"
  deep_water_candidate: true
applies_when:
  - "用户问永住者交通罚款、犯罪、刑事处罚是否会取消"
does_not_cover:
  - "具体刑事处罚是否属于对象"
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
  - permanent_resident_reform_criminal_violation_boundary
ai_inferred_fields:
  - reform_effective_date_needs_confirm
needs_review_flags:
  - id: criminal_case_and_reform_effective_date_review
    reason: "改正後条文の施行日と個別刑事事件の評価は専門確認が必要。"
evidence_points:
  - claim: "ISA の Q&A は、改正後の重大な刑罰法令違反について、窃盗、詐欺、恐喝、殺人、危険運転致死傷などを例示し、過失運転致死傷罪や道路交通法違反で罰金刑に処せられた場合は対象に含まれないと説明している。"
    source_title: "永住許可制度の適正化Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q11"
    display_label: "永住者制度適正化：刑罰法令違反"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者制度適正化 — 重大な刑罰法令違反の対象は限定して読む

## current_date_logic

Checked against the ISA permanent-residence-system Q&A on 2026-05-12. The effective-date handling for the amended cancellation ground still requires confirmation before promotion.

## current_effective_fact

ISA の Q&A は、改正後の重大な刑罰法令違反について、窃盗、詐欺、恐喝、殺人、危険運転致死傷などを例示し、過失運転致死傷罪や道路交通法違反で罰金刑に処せられた場合は対象に含まれないと説明している。

## exceptions_or_transition

- 個別刑事事件が対象に含まれるかは専門確認が必要。
- 施行日と改正後の運用は確認が必要。

## common_user_phrases

- 永住者 犯罪 取消
- 永住 交通違反 取消
- 永住者 罰金 取消
- 永住 危険運転
- 永住 窃盗 詐欺
- 永住 道路交通法 違反

## must_say

- 刑罰法令違反の対象は限定して読む。
- 交通事故や道路交通法違反を一律に対象としない。

## must_not_say

- 永住者はどんな罰金でも取消対象。
- 犯罪があっても永住には一切影響しない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-046 |
