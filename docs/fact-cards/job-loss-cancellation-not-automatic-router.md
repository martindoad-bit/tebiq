---
fact_id: job-loss-cancellation-not-automatic-router
title: 失業・退職 — 在留資格取消リスクはあるが自動失効ではない
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
citation_label: "失業は取消リスク入口だが自動失効ではない"
citation_summary: "ISA の在留資格取消案内は、別表第一の在留資格者が正当な理由なく在留資格に係る活動を3か月以上行っていない場合を取消事由として示している。失業や退職は日付、届出、求職活動、正当な理由の確認が必要なリスク事実であり、自動失効とは扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-036
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4第1項第6号"
  source_locator: "取消事由(6)"
  claim_type: risk_signal
  applicable_statuses:
    - "table1_work_status_holder"
  application_type:
    - cancellation
  exclusion_scope:
    - "正当な理由の成立判断"
    - "転職活動や変更申請の具体戦略"
  deep_water_candidate: true
applies_when:
  - "用户问工作签失业、辞职、解雇后签证是否取消"
does_not_cover:
  - "求職活動が正当な理由になるかの最终判断"
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
  - 就労系在留資格を持つ外国人
direct_fact_fields:
  - job_loss_cancellation_not_automatic_router
ai_inferred_fields: []
needs_review_flags:
  - id: job_search_justifiable_reason_review
    reason: "求職活動や会社都合解雇等が正当な理由に当たるかは個別確認が必要。"
evidence_points:
  - claim: "ISA は、別表第一の在留資格者が正当な理由なく在留資格に係る活動を3か月以上行っていない場合を取消事由として示している。失業や退職は自動失効ではなく、日付、届出、活動状況、正当な理由を確認する必要がある。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由(6)"
    display_label: "失業・退職：活動不履行リスク"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 失業・退職 — 在留資格取消リスクはあるが自動失効ではない

## current_date_logic

Checked against the ISA cancellation page on 2026-05-12.

## current_effective_fact

ISA は、別表第一の在留資格者が正当な理由なく在留資格に係る活動を3か月以上行っていない場合を取消事由として示している。失業や退職は自動失効ではなく、日付、届出、活動状況、正当な理由を確認する必要がある。

## exceptions_or_transition

- 退職後14日以内の所属機関届出などは既存カードで保護する。
- 求職活動や会社都合解雇などの扱いは個別確認が必要。

## common_user_phrases

- 失業 3ヶ月 在留資格取消
- 会社を辞めた ビザ 取消
- 解雇 ビザ すぐ失効
- 技人国 退職 取消
- 工作签 失业 自动取消
- 求職中 在留資格

## must_say

- 失業や退職は活動不履行リスクの入口になり得る。
- 自動失効ではなく、届出、日付、正当な理由を確認する。

## must_not_say

- 失業3か月で必ず自動取消。
- 在留期限が残っていれば失業していても完全に安全。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-036 |
