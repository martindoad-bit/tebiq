---
fact_id: resident-card-loss-police-report-number
title: 在留カード紛失・盗難 — 警察届出受理番号
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "在留カード紛失・盗難は警察への届出受理番号が必要"
citation_summary: "ISA は、在留カードの紛失又は盗難の場合、警察へ届出の上、紛失・盗難に係る陳述書に届出受理番号が必要としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-090
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の12"
  source_locator: "申請書・必要書類等"
  claim_type: required_document
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - application
  exclusion_scope:
    - "旅券紛失"
  deep_water_candidate: false
applies_when:
  - "用户问在留卡丢失是否要报警、是否需要受理番号"
does_not_cover:
  - "各警察署具体受理方式"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-loss-reissue
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html
    title: 紛失等による在留カードの再交付申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - resident_card_loss_police_report_number
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "For loss or theft, ISA states that the person should notify the police and that the notification acceptance number is required in the statement."
    source_title: "紛失等による在留カードの再交付申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請書・必要書類等"
    display_label: "紛失・盗難：警察届出受理番号が必要"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード紛失・盗難 — 警察届出受理番号

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留カードの紛失又は盗難の場合、警察へ届出を行った上で、紛失・盗難に係る陳述書に届出受理番号が必要。申請内容によって遺失届出証明書等の提出を求められる場合がある。

## exceptions_or_transition

- り災の場合はり災証明書等が軸になる。
- 遺失届等の対象とならない場合は、その旨を陳述書に記載する。

## common_user_phrases

- 在留カード 紛失 警察
- 在留カード 盗難 届出受理番号
- 在留カード 遺失届出証明書
- 在留卡 丢了 要报警吗
- 在留卡 被偷 警察 受理番号
- 紛失盗難 陳述書 在留カード

## must_say

- 紛失・盗難の場合は警察への届出が前提。
- 届出受理番号が必要。

## must_not_say

- 警察届出なしで必ずそのまま再交付できる。

## qa_cases

### QA-1

**user**: 在留卡丢了要先去警察吗？

**must_have**:

- 警察への届出
- 届出受理番号

**must_not_have**:

- 受理番号不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-090 |
