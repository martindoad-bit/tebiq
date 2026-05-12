---
fact_id: online-pr-card-procedures-excluded
title: 在留申請オンライン — 永住許可申請・在留カード手続は対象外
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 5
citation_label: "永住許可申請・在留カード手続はオンライン対象外"
citation_summary: "ISA のオンライン申請 Q&A は、永住許可申請と、在留カードの住居地以外の記載事項変更・有効期間更新などの在留カード手続はオンライン申請できないとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-111
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "在留申請オンラインシステム"
  source_locator: "Q1-5"
  claim_type: online_scope
  applicable_statuses:
    - "online_application_user"
  application_type:
    - permanent_residence
    - resident_card
  exclusion_scope:
    - "永住許可申請"
    - "在留カード手続"
  deep_water_candidate: false
applies_when:
  - "用户问永住申请、在留卡地址以外变更、有效期更新能不能在线办"
does_not_cover:
  - "在留期间更新或资格变更的在线申请"
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
  - 永住許可申請又は在留カード手続を検討する外国人
direct_fact_fields:
  - online_pr_card_procedures_excluded
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA のオンライン申請 Q&A は、永住許可申請と、在留カードの住居地以外の記載事項変更・有効期間更新などの在留カード手続はオンライン申請できないとしている。"
    source_title: "在留申請オンラインシステム Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/online/online-QA.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "Q1-5"
    display_label: "オンライン対象外：永住許可申請・在留カード手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留申請オンライン — 永住許可申請・在留カード手続は対象外

## current_date_logic

Checked against current ISA online application Q&A on 2026-05-12.

## current_effective_fact

永住許可申請と、在留カードの住居地以外の記載事項変更・有効期間更新などの在留カード手続は、在留申請オンラインシステムでは申請できない。

## exceptions_or_transition

- 在留期間更新や在留資格変更など、別のオンライン対象手続と混同しない。

## common_user_phrases

- 永住申請 オンライン できる
- 永住許可申請 ネット申請
- 在留カード 有効期間更新 オンライン
- 在留カード 記載事項変更 オンライン
- 永住 网上申请
- 在留卡 更新 网上办

## must_say

- 永住許可申請はオンライン対象外。
- 在留カード手続もオンライン対象外。

## must_not_say

- 永住申請はオンラインでできる。
- 在留カードの有効期間更新はオンラインで完結する。

## qa_cases

### QA-1

**user**: 永住申請はオンラインで出せますか？

**must_have**:

- 永住許可申請はオンライン対象外

**must_not_have**:

- オンラインで出せる

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-111 |
