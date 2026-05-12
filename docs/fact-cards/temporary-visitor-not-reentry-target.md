---
fact_id: temporary-visitor-not-reentry-target
title: 短期滞在 — みなし再入国の対象外
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
citation_label: "短期滞在はみなし再入国対象外"
citation_summary: "ISA は、短期滞在の在留資格はみなし再入国許可の対象外とし、一般 Q&A でも短期滞在者には通常再入国許可も原則許可されないとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-108
  authority_layer: L4 ISA Procedure Page / FAQ
  legal_source_type: official_procedure_page
  law_article_ref: "みなし再入国許可"
  source_locator: "対象外・Q62"
  claim_type: exclusion_scope
  applicable_statuses:
    - "temporary_visitor"
  application_type:
    - special_reentry
    - reentry
  exclusion_scope:
    - "短期滞在"
  deep_water_candidate: false
applies_when:
  - "用户问短期滞在旅游签能不能みなし再入国或再入国许可"
does_not_cover:
  - "免签、多次签证、下一次新入境的可否"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-special-reentry
    url: https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html
    title: みなし再入国許可
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-general-qa
    url: https://www.moj.go.jp/isa/immigration/faq/kanri_qa.html?hl=ja
    title: 入国・在留審査要領等に関する Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 短期滞在の在留資格で在留する外国人
direct_fact_fields:
  - temporary_visitor_not_reentry_target
ai_inferred_fields: []
needs_review_flags:
  - id: next_entry_requires_separate_review
    reason: "次回入国の査証免除や多次査証は別論点。"
evidence_points:
  - claim: "ISA は、短期滞在の在留資格をみなし再入国許可の対象外としている。一般 Q&A でも、短期滞在者には通常再入国許可も原則許可されないとしている。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "対象外"
    display_label: "短期滞在：みなし再入国対象外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 短期滞在 — みなし再入国の対象外

## current_date_logic

Checked against current ISA procedure and Q&A pages on 2026-05-12.

## current_effective_fact

短期滞在の在留資格は、みなし再入国許可の対象外。一般 Q&A でも、短期滞在者には通常再入国許可も原則許可されないとしている。

## exceptions_or_transition

- 次回入国は、査証免除、多次査証、上陸審査など別論点になる。

## common_user_phrases

- 短期滞在 みなし再入国
- 短期滞在 再入国許可
- 観光ビザ 一時出国 戻る
- 短期滞在 出国 また戻る
- tourist visa reentry Japan
- 短期签证 再入国

## must_say

- 短期滞在はみなし再入国の対象外。
- 通常再入国許可も原則許可されないと案内されている。

## must_not_say

- 短期滞在でもみなし再入国が使える。
- 在留カードがなくても同じ制度を使える。

## qa_cases

### QA-1

**user**: 短期滞在で日本にいます。韓国に出て戻る時みなし再入国できますか？

**must_have**:

- 短期滞在は対象外
- 次回入国は別論点

**must_not_have**:

- みなし再入国を使える

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-108 |
