---
fact_id: online-application-not-from-abroad
title: 在留申請オンライン — 海外からの申請はできない
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "在留申請オンラインは海外から申請できない"
citation_summary: "ISA のオンライン申請 Q&A は、再入国許可又はみなし再入国許可で出国中の者はオンライン申請できず、海外からのアクセスを制限しているとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-109
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "在留申請オンラインシステム"
  source_locator: "Q4-17・Q4-36"
  claim_type: online_scope
  applicable_statuses:
    - "online_application_user"
  application_type:
    - renewal
    - change
    - status_acquisition
  exclusion_scope:
    - "再入国許可又はみなし再入国許可で出国中"
    - "海外からのアクセス"
  deep_water_candidate: true
applies_when:
  - "用户问人在国外能不能线上更新、变更或申请在留"
does_not_cover:
  - "在外公馆签证或 COE 路线"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-online-qa
    url: https://www.moj.go.jp/isa/applications/online/online-QA.html?hl=ja
    title: 在留申請オンラインシステム Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留申請オンラインシステムの利用を検討する外国人
direct_fact_fields:
  - online_application_not_from_abroad
ai_inferred_fields: []
needs_review_flags:
  - id: overseas_case_requires_route_review
    reason: "海外滞在中の再入国期限、在留期限、査証又は上陸申請は別途確認が必要。"
evidence_points:
  - claim: "ISA のオンライン申請 Q&A は、再入国許可又はみなし再入国許可で出国中の者はオンライン申請できず、海外からのアクセスを制限しているとしている。"
    source_title: "在留申請オンラインシステム Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/online/online-QA.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "Q4-17・Q4-36"
    display_label: "オンライン申請：海外からは不可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留申請オンライン — 海外からの申請はできない

## current_date_logic

Checked against current ISA online application Q&A on 2026-05-12.

## current_effective_fact

再入国許可又はみなし再入国許可で出国中の者は、在留申請オンラインシステムで申請できない。海外からのアクセスは制限されている。

## exceptions_or_transition

- 海外滞在中の再入国期限、在留期限、査証又は上陸申請は別途確認が必要。

## common_user_phrases

- 海外から オンライン 更新申請
- 外国から 在留期間更新 オンライン
- みなし再入国中 オンライン申請
- 再入国許可 出国中 オンライン申請
- 人在国外 网上更新 在留资格
- overseas online zairyu application

## must_say

- 再入国許可又はみなし再入国許可で出国中の者はオンライン申請できない。
- 海外からのアクセスは制限されている。

## must_not_say

- オンラインなら海外から在留更新できる。
- 海外からでも VPN 等で申請すればよい。

## qa_cases

### QA-1

**user**: 今中国にいます。オンラインで在留期間更新できますか？

**must_have**:

- 出国中はオンライン申請できない
- 海外からのアクセス制限

**must_not_have**:

- 海外から更新できる

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-109 |
