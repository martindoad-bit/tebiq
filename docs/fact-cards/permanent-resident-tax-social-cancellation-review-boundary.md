---
fact_id: permanent-resident-tax-social-cancellation-review-boundary
title: 永住者制度適正化 — 税・社会保険料不払の取消論点は施行時点と個別事情を分ける
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
citation_label: "永住者の公租公課不払は慎重確認"
citation_summary: "ISA の永住許可制度 Q&A は、改正後の公租公課不払について、故意性、支払能力、病気・失業などの事情、督促等への対応状況を踏まえて判断すると説明している。現在の個別案件では、施行時点、通知の有無、支払状況、生活状況を分けて確認する。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-050
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "永住許可制度の適正化Q&A"
  source_locator: "Q9, Q10, Q15, Q17"
  claim_type: review_boundary
  applicable_statuses:
    - "permanent_resident"
  application_type:
    - cancellation
  exclusion_scope:
    - "改正条文の施行日確定"
    - "個別の故意性・支払能力判断"
    - "現在進行中の滞納相談への対応"
  deep_water_candidate: true
applies_when:
  - "用户问永住者欠税、欠年金、欠社保是否马上取消"
does_not_cover:
  - "个案是否已经构成改正后取消事由"
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
  - permanent_resident_tax_social_cancellation_review_boundary
ai_inferred_fields:
  - reform_effective_date_needs_confirm
needs_review_flags:
  - id: permanent_resident_tax_social_cancellation_requires_review
    reason: "施行時点、故意性、支払能力、病気・失業等の事情、督促等への対応状況を確認する必要がある。"
evidence_points:
  - claim: "ISA の永住許可制度 Q&A は、改正後の公租公課不払について、故意性、支払能力、病気・失業などの事情、督促等への対応状況を踏まえて判断すると説明している。"
    source_title: "永住許可制度の適正化Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q9, Q10, Q15, Q17"
    display_label: "永住者制度適正化：税・社会保険料不払"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者制度適正化 — 税・社会保険料不払の取消論点は施行時点と個別事情を分ける

## current_date_logic

Checked against the ISA permanent-residence-system Q&A on 2026-05-12. The effective-date handling for the amended cancellation ground still requires confirmation before promotion.

## current_effective_fact

ISA の永住許可制度 Q&A は、改正後の公租公課不払について、故意性、支払能力、病気・失業などの事情、督促等への対応状況を踏まえて判断すると説明している。現在の個別案件では、施行時点、通知の有無、支払状況、生活状況を分けて確認する。

## exceptions_or_transition

- 税・社会保険料の不払を、直ちに自動取消と断定しない。
- 病気や失業など本人に帰責性が認めがたい事情は分けて確認する。
- 施行時点と個別事情は専門確認が必要。

## common_user_phrases

- 永住 税金 未払い 取消
- 永住者 社会保険料 滞納
- 永住 年金 未納 取り消し
- 永住 欠税 入管 通報
- 永住者 住民税 払えない
- 永住 税金 一回遅れた

## must_say

- 公租公課不払は、故意性、支払能力、事情、対応状況を分けて確認する。
- 自動取消と断定しない。

## must_not_say

- 永住者は税や社会保険料を一度滞納したら必ず取消。
- 病気や失業で支払えない場合も常に取消対象。

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
| 2026-05-12 | FACT/Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-050 |
