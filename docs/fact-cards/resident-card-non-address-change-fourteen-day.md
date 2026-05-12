---
fact_id: resident-card-non-address-change-fourteen-day
title: 在留カード記載事項変更 — 変更日から14日以内
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
citation_label: "在留カード記載事項変更は変更日から14日以内"
citation_summary: "ISA は、住居地以外の在留カード記載事項に変更が生じた日から14日以内に届出を行うとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-082
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の10"
  source_locator: "届出時期"
  claim_type: deadline_window
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - notification
  exclusion_scope:
    - "住居地変更届出"
  deep_water_candidate: false
applies_when:
  - "用户问姓名、国籍等在留卡项目改了多久内办理"
does_not_cover:
  - "逾期后的处罚或审查影响判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-non-address-change
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html
    title: 住居地以外の在留カード記載事項の変更届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - resident_card_non_address_change_14_day_deadline
ai_inferred_fields: []
needs_review_flags:
  - id: late_non_address_change_consequence_requires_review
    reason: "Late filing consequences and review impact are case-specific."
evidence_points:
  - claim: "ISA states that this notification is due within 14 days from the date the relevant card item changed."
    source_title: "住居地以外の在留カード記載事項の変更届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出時期"
    display_label: "記載事項変更：変更日から14日以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード記載事項変更 — 変更日から14日以内

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

氏名、生年月日、性別、国籍・地域など住居地以外の在留カード記載事項に変更が生じた場合、変更が生じた日から14日以内に届出を行う。

## exceptions_or_transition

- 期限を超えた場合は理由等を記載した書類が別途必要になる。
- 遅れた場合の個別審査影響はこのカードでは判断しない。

## common_user_phrases

- 在留カード 氏名変更 14日
- 在留カード 国籍変更 14日以内
- 在留卡 姓名改了 14天
- 在留卡 国籍改了 多久内
- 在留カード 記載事項変更 期限
- 名前変えた 在留カード 14日

## must_say

- 変更が生じた日から14日以内。
- 期限超過時は理由書類が追加で必要になり得る。

## must_not_say

- 期限を過ぎたら届出不要。
- 期限超過だけで結果を断定する。

## qa_cases

### QA-1

**user**: 国籍が変わったら在留カードはいつまでに変えますか？

**must_have**:

- 変更日から14日以内
- 国籍・地域変更は対象

**must_not_have**:

- 次の更新まで待てばよい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-082 |
