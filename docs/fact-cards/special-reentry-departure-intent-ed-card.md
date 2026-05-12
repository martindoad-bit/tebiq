---
fact_id: special-reentry-departure-intent-ed-card
title: みなし再入国許可 — 出国時に再入国の意思を表示する
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
citation_label: "みなし再入国は出国時の意思表示が必要"
citation_summary: "ISA は、みなし再入国許可で出国する際、有効な旅券と在留カードを所持し、再入国出国記録の該当欄にチェックを入れて入国審査官に提示し、再入国の意思を伝えるよう案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-105
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "みなし再入国許可"
  source_locator: "出国時の手続"
  claim_type: procedure_method
  applicable_statuses:
    - "valid_residence_status_holder"
  application_type:
    - special_reentry
  exclusion_scope:
    - "出国後の事後補正"
  deep_water_candidate: true
applies_when:
  - "用户问机场怎么使用みなし再入国、忘记勾选怎么办"
does_not_cover:
  - "已出国后忘记勾选的补救或入境结果"
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
  - みなし再入国で出国する外国人
direct_fact_fields:
  - special_reentry_departure_intent_ed_card
ai_inferred_fields: []
needs_review_flags:
  - id: missed_intent_after_departure_requires_review
    reason: "出国後に意思表示漏れが判明した場合の扱いは高リスクで個別確認が必要。"
evidence_points:
  - claim: "ISA は、みなし再入国許可で出国する際、有効な旅券と在留カードを所持し、再入国出国記録の該当欄にチェックを入れて入国審査官に提示し、再入国の意思を伝えるよう案内している。"
    source_title: "みなし再入国許可"
    source_url: "https://www.moj.go.jp/isa/immigration/procedures/minashisainyukoku_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "出国時の手続"
    display_label: "みなし再入国：出国時に意思表示"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# みなし再入国許可 — 出国時に再入国の意思を表示する

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

みなし再入国許可で出国する際は、有効な旅券と在留カードを所持し、再入国出国記録の該当欄にチェックを入れて入国審査官に提示し、再入国の意思を伝える。

## exceptions_or_transition

- 出国後に意思表示漏れが分かった場合は高リスクで、安易に「戻れる」と断定しない。

## common_user_phrases

- みなし再入国 チェック欄
- 出国カード みなし再入国 チェック
- 再入国出国記録 チェック
- 机场 みなし再入国 怎么办
- 出国時 再入国 意思表示
- みなし再入国 忘れた

## must_say

- 出国時に再入国の意思を表示する。
- 再入国出国記録の該当欄にチェックし、入国審査官に提示する。

## must_not_say

- みなし再入国は何もしなくても自動的に成立する。
- チェック漏れでも必ず問題ない。

## qa_cases

### QA-1

**user**: みなし再入国は空港で何をすればいいですか？

**must_have**:

- 有効旅券と在留カード
- 再入国出国記録の該当欄
- 入国審査官への提示

**must_not_have**:

- 何もしないでよい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 5 legal-source card | — | ai_extracted | C3-105 |
