---
fact_id: reentry-permit-document-lost-passport-card-abroad
title: 再入国・みなし再入国中の証明 — 海外で旅券や在留カードを失くした場合の期限証明
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
citation_label: "出国中に旅券・在留カードを失くした場合の再入国期限証明"
citation_summary: "ISA は、再入国許可又はみなし再入国許可で出国中に旅券・在留カードを紛失した場合、日本にいる親族や勤務先職員等を通じて再入国許可期限証明願を行う方法を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-114
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "再入国許可申請"
  source_locator: "海外で旅券又は在留カードを紛失した場合"
  claim_type: procedure_router
  applicable_statuses:
    - "valid_reentry_departure"
  application_type:
    - reentry
  exclusion_scope:
    - "みなし再入国の期限延長"
    - "紛失による再入国保証"
  deep_water_candidate: true
applies_when:
  - "用户问出国中护照或在留卡丢失后怎么办"
does_not_cover:
  - "护照补发、航空公司登机、入境审查结果"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-reentry-application
    url: https://www.moj.go.jp/isa/immigration/procedures/16-5.html
    title: 再入国許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 再入国許可又はみなし再入国許可で出国中に旅券又は在留カードを紛失した外国人
direct_fact_fields:
  - reentry_permit_document_lost_passport_card_abroad
ai_inferred_fields: []
needs_review_flags:
  - id: not_an_extension_or_permission
    reason: "期限証明は期限を延長する手続や再入国を保証する手続ではない。"
evidence_points:
  - claim: "ISA は、再入国許可又はみなし再入国許可で出国中に旅券・在留カードを紛失した場合、日本にいる親族や勤務先職員等を通じて再入国許可期限証明願を行う方法を案内している。"
    source_title: "再入国許可申請"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/16-5.html"
    source_organization: "出入国在留管理庁"
    source_locator: "海外で旅券又は在留カードを紛失した場合"
    display_label: "出国中の紛失：再入国許可期限証明願"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 再入国・みなし再入国中の証明 — 海外で旅券や在留カードを失くした場合の期限証明

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

再入国許可又はみなし再入国許可で出国中に旅券・在留カードを紛失した場合、日本にいる親族や勤務先職員等を通じて再入国許可期限証明願を行う方法が案内されている。

## exceptions_or_transition

- 期限証明は、みなし再入国の期限延長ではない。
- 旅券再発行、航空会社、入国可否は別途確認が必要。

## common_user_phrases

- 海外 在留カード 紛失 再入国
- 出国中 在留カード なくした
- 海外 パスポート 在留カード 紛失 日本 戻る
- 再入国許可 期限証明
- みなし再入国 在留カード 失くした
- 国外 在留卡 丢了 回日本

## must_say

- 日本にいる親族や勤務先職員等を通じて再入国許可期限証明願を行う方法がある。
- 期限証明は期限延長ではない。

## must_not_say

- 期限証明があれば必ず入国できる。
- 紛失しても何もしなくてよい。

## qa_cases

### QA-1

**user**: みなし再入国で中国にいます。在留カードをなくしました。

**must_have**:

- 再入国許可期限証明願
- 日本にいる親族や勤務先職員等を通じる方法
- 期限延長ではない

**must_not_have**:

- そのまま必ず戻れる

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-114 |
