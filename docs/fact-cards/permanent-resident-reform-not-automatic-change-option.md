---
fact_id: permanent-resident-reform-not-automatic-change-option
title: 永住者制度適正化 — 新設取消事由でも取消か職権変更かを慎重に判断
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
citation_label: "永住者制度適正化は取消と職権変更を分けて判断"
citation_summary: "ISA の永住許可制度 Q&A は、新設取消事由に該当する場合でも、事実等を踏まえて永住者の在留資格を取り消すか、永住者以外の在留資格に変更するかを慎重に判断すると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-044
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "永住許可制度の適正化Q&A"
  source_locator: "Q12及びQ15"
  claim_type: procedure_boundary
  applicable_statuses:
    - "permanent_resident"
  application_type:
    - cancellation
    - status_change
  exclusion_scope:
    - "改正条文の施行日確定"
    - "個別にどの在留資格へ変更されるか"
  deep_water_candidate: true
applies_when:
  - "用户问永住者触发新取消事由后是否一定失去在留"
does_not_cover:
  - "具体处理会取消还是职权变更"
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
  - permanent_resident_reform_not_automatic_change_option
ai_inferred_fields:
  - reform_effective_date_needs_confirm
needs_review_flags:
  - id: reform_procedure_and_status_change_review
    reason: "改正後制度の施行日と個別処分・職権変更の扱いは確認が必要。"
evidence_points:
  - claim: "ISA の Q&A は、新設取消事由に該当する場合でも、事実等を踏まえて永住者の在留資格を取り消すか、永住者以外の在留資格に変更するかを慎重に判断すると説明している。"
    source_title: "永住許可制度の適正化Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q12及びQ15"
    display_label: "永住者制度適正化：取消又は職権変更の慎重判断"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者制度適正化 — 新設取消事由でも取消か職権変更かを慎重に判断

## current_date_logic

Checked against the ISA permanent-residence-system Q&A on 2026-05-12. The effective-date handling for the amended cancellation ground still requires confirmation before promotion.

## current_effective_fact

ISA の Q&A は、新設取消事由に該当する場合でも、事実等を踏まえて永住者の在留資格を取り消すか、永住者以外の在留資格に変更するかを慎重に判断すると説明している。

## exceptions_or_transition

- 改正後条文の施行日や個別の在留資格変更先は本カードでは断定しない。

## common_user_phrases

- 永住 取消 必ず
- 永住者 在留資格変更 職権
- 永住 取り消し 定住者
- 永住者 新制度 取消
- 永住者 税金 取消 変更
- 永住 取消されたら 何ビザ

## must_say

- 新設取消事由でも、必ず取消と断定しない。
- 取消か職権変更かは事実を踏まえ慎重に判断されるとされている。

## must_not_say

- 新制度では該当すれば必ず永住取消。
- 必ず定住者に変えられる。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-044 |
