---
fact_id: special-reentry-eligibility-valid-passport-card
title: みなし再入国許可 — 有効旅券と在留カードを持つ短期再入国予定者が中心
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
citation_label: "みなし再入国は有効旅券・在留カード・1年内再入国予定が基本"
citation_summary: "ISA は、みなし再入国許可について、有効な旅券を所持し、在留期間3か月以下又は短期滞在ではない者が1年以内に再入国する場合、通常の再入国許可を原則不要とする制度としている。中長期在留者は有効な旅券と在留カードの所持が必要。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-101
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "みなし再入国許可"
  source_locator: "制度概要・対象者"
  claim_type: procedure_scope
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - special_reentry
  exclusion_scope:
    - "在留期間3か月以下"
    - "短期滞在"
    - "在留カード不所持"
  deep_water_candidate: false
applies_when:
  - "用户问短期回国是不是不用普通再入国许可"
does_not_cover:
  - "取消手续中等排除对象"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-special-reentry
    url: https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html
    title: みなし再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 有効な在留資格を持ち一時出国する外国人
direct_fact_fields:
  - special_reentry_eligibility_valid_passport_card
ai_inferred_fields: []
needs_review_flags:
  - id: excluded_cases_separate_card
    reason: "取消手続中等の対象外事由は別カードで扱う。"
evidence_points:
  - claim: "ISA は、みなし再入国許可を、有効な旅券を所持し、在留期間3か月以下又は短期滞在ではない者が1年以内に再入国する場合、通常の再入国許可を原則不要とする制度としている。中長期在留者は有効な旅券と在留カードの所持が必要。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度概要・対象者"
    display_label: "みなし再入国許可：有効旅券・在留カード・1年内再入国予定"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# みなし再入国許可 — 有効旅券と在留カードを持つ短期再入国予定者が中心

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

みなし再入国許可は、有効な旅券を所持し、在留期間3か月以下又は短期滞在ではない者が1年以内に再入国する場合、通常の再入国許可を原則不要とする制度。中長期在留者は有効な旅券と在留カードを所持している必要がある。

## exceptions_or_transition

- 在留期間3か月以下と短期滞在は対象外。
- 取消手続中など、別途対象外となる場合がある。

## common_user_phrases

- みなし再入国 対象
- みなし再入国 有効な旅券 在留カード
- 短期帰国 再入国許可 不要
- 一時帰国 在留カード 持っている
- 再入国许可 不要 情况
- 在留カード 持って 回国 1年以内

## must_say

- 有効な旅券が必要。
- 中長期在留者は在留カードも必要。
- 在留期間3か月以下と短期滞在は対象外。

## must_not_say

- 在留カードがなくてもみなし再入国を使える。
- 短期滞在でもみなし再入国を使える。

## qa_cases

### QA-1

**user**: 在留カードを持って2週間帰国します。再入国許可は必要ですか？

**must_have**:

- 有効旅券
- 在留カード
- 1年以内再入国予定
- 対象外資格の確認

**must_not_have**:

- 誰でも不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-101 |
