---
fact_id: ssw-employment-contract-end-acceptance-difficulty-boundary-source
title: "特定技能 — 契約終了理由によって受入れ困難届出も確認する"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "特定技能: 契約終了と受入れ困難"
citation_summary: "ISA は、特定技能雇用契約の終了理由が雇用契約の終期到来以外で、受入れ困難届出をあらかじめ提出していない場合、併せて提出するよう案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-005
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "特定技能雇用契約に係る届出 / 受入れ困難に係る届出"
  source_locator: "契約終了の事由"
  claim_type: notification_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "個別契約終了の適法性"
    - "退職後の在留資格変更可否"
    - "受入れ困難届出の遅延評価"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-contract-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00187.html
    title: 特定技能所属機関による特定技能雇用契約に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の契約終了・退職・解雇時に受入れ困難届出も必要かを聞く相談"
direct_fact_fields:
  - ssw_employment_contract_end_acceptance_difficulty_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_contract_end_acceptance_difficulty_review
    reason: "契約終了理由、事前届出の有無、本人の在留期限によって個別確認が必要。"
evidence_points:
  - claim: "ISA は、契約終了の事由が雇用契約の終期到来以外で、受入れ困難に係る届出をあらかじめ提出していない場合、併せて提出するよう案内している。"
    source_title: "特定技能所属機関による特定技能雇用契約に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00187.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出事項 / 契約終了"
    display_label: "特定技能: 契約終了と受入れ困難"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 契約終了理由によって受入れ困難届出も確認する

## current_date_logic

Checked against the ISA employment-contract notification page on 2026-05-13.

## current_effective_fact

特定技能雇用契約の終了理由が雇用契約の終期到来以外の場合、受入れ困難届出をあらかじめ提出していなければ、契約終了届出と併せて提出するよう案内されている。

## exceptions_or_transition

- まだ契約を終了していない場合には、受入れ困難届出のみをあらかじめ提出する扱いが案内されている。

## common_user_phrases

- 特定技能 契約終了 受入れ困難 届出
- 特定技能 解雇 受入れ困難
- 特定技能 退職 契約終了 届出
- 特定技能 契約満了以外 終了
- 特定技能 会社都合 退職 届出
- 特定技能 contract end acceptance difficulty

## must_say

- 契約終了理由によって、雇用契約届出だけでなく受入れ困難届出も確認する。

## must_not_say

- 契約終了届出だけ出せば、受入れ困難の確認は不要。
- 契約終了後であれば受入れ困難届出は関係ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-005 |
