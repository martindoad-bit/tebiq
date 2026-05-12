---
fact_id: special-period-renewal-change-applies
title: 特例期間 — 更新・変更申請が満了日までに処分されない場合に問題となる
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 1
citation_label: "特例期間は更新・変更申請中の在留継続ルール"
citation_summary: "在留カード所持者が更新または変更申請を行い、在留期間満了日までに処分されない場合、一定期間は従前資格で在留できる。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-012
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法第20条第5項 / 第21条第4項"
  source_locator: "特例期間とは？：本文第1段落"
  claim_type: procedure_effect
  applicable_statuses:
    - "mid_long_term_resident_card_holder"
  application_type:
    - renewal
    - change
  exclusion_scope:
    - "期限後未申請"
    - "新活動許可"
  deep_water_candidate: true
applies_when:
  - "用户问申请中在留期限到了还能不能待"
  - "用户问特例期间是什么"
does_not_cover:
  - "未在期限内提出申请的情况"
  - "不许可后的出国期限"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-special-period
    url: https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html
    title: 特例期間とは？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留期間更新許可申請中
  - 在留資格変更許可申請中
direct_fact_fields:
  - special_period_for_renewal_or_change_pending_at_expiry
ai_inferred_fields: []
needs_review_flags:
  - id: deadline_specific_case
    reason: "Exact date handling and late application cases require careful review."
evidence_points:
  - claim: "ISA explains that when a residence-card holder has filed a renewal or change application and the disposition is not made by the period-of-stay expiry, the special-period rule can allow continued stay under the previous status for the specified period."
    source_title: "特例期間とは？"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "本文第1段落"
    display_label: "特例期間：更新・変更申請中の在留継続ルール"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特例期間 — 更新・変更申請が満了日までに処分されない場合に問題となる

## current_date_logic

Checked against the current ISA explainer on 2026-05-12.

## current_effective_fact

在留カードを所持する人が在留期間更新許可申請または在留資格変更許可申請を行い、その申請の処分が在留期間満了日までになされない場合、特例期間の問題になる。

## exceptions_or_transition

- 申請していない場合、期限後に初めて申請する場合、不許可後の扱いはこのカードだけで断定しない。
- 特例期間は新しい活動への許可ではない。

## common_user_phrases

- 特例期间 是什么
- 更新申请中 期限到了
- 变更申请中 在留期限到了
- 在留卡过期 申请中还能待吗
- 申请中特例期间 更新变更
- 在留期限内申请 审查没结果

## must_say

- 特例期間は、更新・変更申請中に満了日まで処分がない場合の在留継続ルール。
- 新しい活動を開始できる許可ではない。

## must_not_say

- 申请中就等于许可。
- 申请后无限期合法停留。

## qa_cases

### QA-1

**user**: 更新申请已经交了，期限到了还没结果，算黑了吗？

**must_have**:

- 期限内申请且未处理时有特例期间
- 要看结束点和活动范围

**must_not_have**:

- 一直没问题

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-012 |
