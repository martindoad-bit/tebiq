---
fact_id: institution-side-foreign-employment-notification-exclusion-router
title: 所属機関による届出 — 外国人雇用状況届出義務のある機関は除外される
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "機関側届出と外国人雇用状況届出の関係"
citation_summary: "ISA 手続ページは、労働施策総合推進法に基づく外国人雇用状況届出が義務付けられている機関を、就労資格等の機関側届出の対象から除くと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-050
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の17"
  source_locator: "所属機関による届出手続：就労資格を有する中長期在留者等に関する届出手続"
  claim_type: routing_boundary
  applicable_statuses:
    - "institution_notification_target_statuses"
  application_type:
    - notification
  exclusion_scope:
    - "外国人雇用状況届出の義務範囲判断"
    - "厚生労働省側手続の詳細"
  deep_water_candidate: true
applies_when:
  - "公司问已经做外国人雇用状况届出，是否还要向入管做机构侧届出"
does_not_cover:
  - "MHLW外国人雇用状况届出的具体义务范围"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-institution-notification-page
    url: https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html
    title: 所属機関による届出手続
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 所属機関による届出
direct_fact_fields:
  - foreign_employment_status_notification_exclusion
ai_inferred_fields: []
needs_review_flags:
  - id: mhlw_notification_scope_needed
    reason: "This card only captures the ISA exclusion; MHLW source is needed to decide whether a given employer is obligated under the foreign employment status notification system."
evidence_points:
  - claim: "ISA explains that institutions obligated to file foreign employment status notifications under the labor policy law are excluded from the accepting-organization notification for specified working statuses and Trainee status."
    source_title: "所属機関による届出手続"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokutodokede_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1 就労資格を有する中長期在留者等に関する届出手続"
    display_label: "機関側届出：外国人雇用状況届出義務機関は除外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関による届出 — 外国人雇用状況届出義務のある機関は除外される

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

対象就労資格等の機関側届出について、労働施策総合推進法に基づく外国人雇用状況届出が義務付けられている機関は除外されると説明されている。

## exceptions_or_transition

- どの雇用主が外国人雇用状況届出義務の対象かは、厚生労働省側の手続確認が必要。
- これは機関側届出の除外であり、外国人本人の所属機関届出とは別。

## common_user_phrases

- 外国人雇用状況届出 入管 届出
- ハローワーク 届出 入管 届出 不要
- 会社側 入管届出 雇用状況届出
- 外国人社員 採用 ハローワーク 入管
- 雇用状況届出 していれば 所属機関による届出
- 会社が外国人雇用状況届出を出した 入管も必要

## must_say

- ISA は外国人雇用状況届出義務機関を機関側届出から除外している。
- 本人側の届出とは別。
- 雇用状況届出の対象範囲は別ソースで確認する。

## must_not_say

- ハローワークへ出せば本人側の届出も不要。
- すべての会社が入管への機関側届出を免れる。
- MHLW側の義務範囲までこのカードだけで断定する。

## qa_cases

### QA-1

**user**: 会社がハローワークに外国人雇用状況届出を出していれば、入管にも会社側届出が必要ですか？

**must_have**:

- ISA は雇用状況届出義務機関を除外
- 本人側届出とは別
- MHLW義務範囲は別確認

**must_not_have**:

- 本人も何もしなくてよい

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-050 |
