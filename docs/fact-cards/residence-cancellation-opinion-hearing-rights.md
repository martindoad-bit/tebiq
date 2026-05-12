---
fact_id: residence-cancellation-opinion-hearing-rights
title: 在留資格取消 — 意見聴取で意見・証拠提出の機会がある
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
citation_label: "在留資格取消には意見聴取手続がある"
citation_summary: "ISA の在留資格取消案内は、取消しをしようとする場合には意見聴取が行われ、対象者は意見を述べ、証拠を提出し、資料閲覧を求めることができると示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-041
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4"
  source_locator: "取消の手続"
  claim_type: procedure_guardrail
  applicable_statuses:
    - "all_residence_statuses"
  application_type:
    - cancellation
  exclusion_scope:
    - "意見聴取への具体的対応方針"
    - "不服申立て又は訴訟対応"
  deep_water_candidate: true
applies_when:
  - "用户收到取消通知、出头通知、意見聴取相关文件"
does_not_cover:
  - "取消程序中的具体辩护策略"
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
  - residence_cancellation_opinion_hearing_rights
ai_inferred_fields: []
needs_review_flags:
  - id: cancellation_procedure_response_requires_specialist
    reason: "意見聴取通知への具体的対応は弁護士又は専門家確認が必要。"
evidence_points:
  - claim: "取消しをしようとする場合には意見聴取が行われ、対象者は意見を述べ、証拠を提出し、資料閲覧を求めることができると ISA は示している。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消の手続"
    display_label: "在留資格取消：意見聴取"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 意見聴取で意見・証拠提出の機会がある

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

取消しをしようとする場合には意見聴取が行われ、対象者は意見を述べ、証拠を提出し、資料閲覧を求めることができると ISA は示している。

## exceptions_or_transition

- 実際に通知を受けた場合は期限と手続対応が重要であり、専門確認が必要。

## common_user_phrases

- 在留資格取消 通知
- 意見聴取 入管
- 取消 手続 出頭
- 入管 取消 呼び出し
- 收到取消通知
- 取消 听证 怎么办

## must_say

- 取消には意見聴取などの手続がある。
- 通知を受けた場合は期限と証拠整理が重要。

## must_not_say

- 通知を無視してよい。
- 聴取で何を言えばよいかを一般論で断定する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-041 |
