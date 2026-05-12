---
fact_id: permanent-resident-deportation-separate-from-cancellation
title: 永住者 — 在留資格取消と退去強制は同じ手続ではない
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 4
citation_label: "永住者の取消と退去強制は別論点"
citation_summary: "ISA の永住許可制度 Q&A は、永住者も在留資格取消制度や退去強制制度等の在留管理対象であり、現行法上の取消例と退去強制例を分けて説明している。取消と退去強制を同じ結論として扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-063
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "永住許可制度の適正化Q&A"
  source_locator: "Q1及びQ3"
  claim_type: procedure_boundary
  applicable_statuses:
    - "permanent_resident"
  application_type:
    - cancellation
    - deportation
  exclusion_scope:
    - "具体的な退去強制該当性"
    - "個別の取消処分該当性"
  deep_water_candidate: true
applies_when:
  - "用户把永住取消、退去强制、遣返混成一个问题"
does_not_cover:
  - "犯罪、刑期、薬物事犯など個別退去強制事由の判断"
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
  - permanent_resident_deportation_separate_from_cancellation
ai_inferred_fields: []
needs_review_flags:
  - id: permanent_resident_deportation_individual_review
    reason: "退去強制事由の該当性は犯罪歴、処分内容、在留状況などの個別確認が必要。"
evidence_points:
  - claim: "ISA の Q&A は、永住者も在留資格取消制度や退去強制制度等の在留管理対象であり、現行法上の取消例と退去強制例を分けて説明している。"
    source_title: "永住許可制度の適正化Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q1及びQ3"
    display_label: "永住者：取消と退去強制の区別"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住者 — 在留資格取消と退去強制は同じ手続ではない

## current_date_logic

Checked against the ISA permanent-residence-system Q&A on 2026-05-12.

## current_effective_fact

ISA の永住許可制度 Q&A は、永住者も在留資格取消制度や退去強制制度等の在留管理対象であり、現行法上の取消例と退去強制例を分けて説明している。

## exceptions_or_transition

- 永住資格が取消対象になる場合と、退去強制事由に該当する場合は、根拠と手続を分けて確認する。
- 具体的な退去強制該当性は個別確認が必要。

## common_user_phrases

- 永住 取消 退去強制
- 永住者 取消 すぐ遣返
- 永住者 犯罪 退去強制
- 永住 被取消 会不会遣返
- 永住者 取消 和 强制送还
- 永住 退去強制 条件

## must_say

- 永住者も取消制度や退去強制制度の対象になり得る。
- ただし、在留資格取消と退去強制は同じ手続・同じ結論として扱わない。

## must_not_say

- 永住取消なら必ず退去強制。
- 永住者は退去強制の対象にならない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-063 |
