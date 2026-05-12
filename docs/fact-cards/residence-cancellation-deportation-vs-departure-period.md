---
fact_id: residence-cancellation-deportation-vs-departure-period
title: 在留資格取消 — 取消後の扱いは事由により退去強制又は出国期間指定に分かれる
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 3
citation_label: "取消後の扱いは事由により異なる"
citation_summary: "ISA の在留資格取消案内は、取消後の扱いについて、事由により直ちに退去強制対象となる場合と、30日を上限として出国のための期間が指定される場合があると示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-035
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4"
  source_locator: "取消後の扱い"
  claim_type: procedure_boundary
  applicable_statuses:
    - "all_residence_statuses"
  application_type:
    - cancellation
  exclusion_scope:
    - "退去強制手続の詳細"
    - "個別の出国期間判断"
  deep_water_candidate: true
applies_when:
  - "用户问取消后是否马上强制送还或多久必须出国"
does_not_cover:
  - "具体案件的退去强制、出国命令、刑事处罚判断"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し（入管法第22条の4）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格取消手続の対象となる外国人
direct_fact_fields:
  - residence_cancellation_deportation_vs_departure_period
ai_inferred_fields: []
needs_review_flags:
  - id: enforcement_path_requires_specialist
    reason: "退去強制や出国期間指定の具体的扱いは弁護士又は専門家確認が必要。"
evidence_points:
  - claim: "ISA は、取消後の扱いについて、事由により直ちに退去強制対象となる場合と、30日を上限として出国のための期間が指定される場合があると示している。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消後の扱い"
    display_label: "在留資格取消：取消後の扱い"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 取消後の扱いは事由により退去強制又は出国期間指定に分かれる

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

ISA は、取消後の扱いについて、事由により直ちに退去強制対象となる場合と、30日を上限として出国のための期間が指定される場合があると示している。

## exceptions_or_transition

- 指定期間内に出国しない場合の扱いも高リスクで個別確認が必要。

## common_user_phrases

- 在留資格取消 強制送還
- 取消後 30日
- 取消されたら いつ出国
- 签证取消 马上回国
- 退去強制 取消
- 出国期間 指定

## must_say

- 取消後の扱いは取消事由により分かれる。
- 退去強制や出国期間指定は専門確認が必要。

## must_not_say

- 取消なら全員が即日出国。
- 取消でも必ず30日あると断定する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-035 |
