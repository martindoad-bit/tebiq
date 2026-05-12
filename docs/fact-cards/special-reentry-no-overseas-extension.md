---
fact_id: special-reentry-no-overseas-extension
title: みなし再入国許可 — 海外で有効期間を延長できない
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
citation_label: "みなし再入国の有効期間は海外で延長できない"
citation_summary: "ISA の一般 Q&A は、みなし再入国許可の有効期間について、海外で延長することはできないとしている。1年を超えて再入国する予定がある場合は、出国前に通常の再入国許可を受ける必要がある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-103
  authority_layer: L4 ISA FAQ
  legal_source_type: official_faq
  law_article_ref: "みなし再入国許可"
  source_locator: "Q57"
  claim_type: extension_boundary
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - special_reentry
  exclusion_scope:
    - "普通再入国許可の延長"
  deep_water_candidate: true
applies_when:
  - "用户问人在海外みなし再入国期限能不能延长"
does_not_cover:
  - "普通再入国许可海外延长"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-general-qa
    url: https://www.moj.go.jp/isa/immigration/faq/kanri_qa.html?hl=ja
    title: 入国・在留審査要領等に関する Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - みなし再入国で出国中の外国人
direct_fact_fields:
  - special_reentry_no_overseas_extension
ai_inferred_fields: []
needs_review_flags:
  - id: ordinary_reentry_extension_not_covered
    reason: "普通再入国許可の在外延長と混同しない。"
evidence_points:
  - claim: "ISA Q&A は、みなし再入国許可の有効期間について、海外で延長することはできないとしている。1年を超えて再入国する予定がある場合は、出国前に通常の再入国許可を受ける必要がある。"
    source_title: "入国・在留審査要領等に関する Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "Q57"
    display_label: "みなし再入国：海外で延長不可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# みなし再入国許可 — 海外で有効期間を延長できない

## current_date_logic

Checked against the current ISA Q&A on 2026-05-12.

## current_effective_fact

みなし再入国許可の有効期間は海外で延長できない。1年を超えて再入国する予定がある場合は、出国前に通常の再入国許可を受ける必要がある。

## exceptions_or_transition

- 普通再入国許可の在外延長とは別論点。
- 期限超過後の再入国や新規手続は個別確認が必要。

## common_user_phrases

- みなし再入国 延長 海外
- みなし再入国 期限 延ばす
- 海外から みなし再入国 延長
- 1年以内 戻れない みなし再入国
- みなし再入国 期限切れ 海外
- 在国外 延长 みなし再入国

## must_say

- みなし再入国許可の有効期間は海外で延長できない。
- 1年を超える予定がある場合は出国前に通常再入国許可を検討する。

## must_not_say

- みなし再入国は海外で延長できる。
- 期限が切れても在留カードがあれば戻れる。

## qa_cases

### QA-1

**user**: みなし再入国で出国中ですが、海外で延長できますか？

**must_have**:

- 海外で延長できない
- 出国前の通常再入国許可が必要だった可能性

**must_not_have**:

- 延長できる

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-103 |
