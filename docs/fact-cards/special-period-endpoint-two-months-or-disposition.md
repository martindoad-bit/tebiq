---
fact_id: special-period-endpoint-two-months-or-disposition
title: 特例期間 — 終了点は処分時または満了日から2か月経過時の早い方
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
citation_label: "特例期間の終了点：処分時または満了日から2か月"
citation_summary: "ISA は、特例期間の終了点を、申請への処分時または在留期間満了日から2か月経過時の早い方として説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-013
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法第20条第5項 / 第21条第4項"
  source_locator: "特例期間とは？：本文第1段落"
  claim_type: deadline_boundary
  applicable_statuses:
    - "mid_long_term_resident_card_holder"
  application_type:
    - renewal
    - change
  exclusion_scope:
    - "不許可後の具体対応"
    - "期限計算の個別保証"
  deep_water_candidate: true
applies_when:
  - "用户问特例期间可以持续多久"
  - "用户问在留期限后两个月是什么意思"
does_not_cover:
  - "具体日期计算错误的责任判断"
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
  - special_period_ends_at_disposition_or_two_months_after_expiry_whichever_earlier
ai_inferred_fields: []
needs_review_flags:
  - id: exact_date_counting
    reason: "Exact day counting should be confirmed for user-specific deadline advice."
evidence_points:
  - claim: "ISA explains the special-period endpoint as the earlier of the application disposition or the end of the day two months after the period-of-stay expiry."
    source_title: "特例期間とは？"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "本文第1段落"
    display_label: "特例期間：処分時または満了日から2か月の早い方"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特例期間 — 終了点は処分時または満了日から2か月経過時の早い方

## current_date_logic

Checked against the current ISA explainer on 2026-05-12.

## current_effective_fact

特例期間は、申請に対する処分がされる時、または在留期間満了日から2か月が経過する日の終了時の、いずれか早い時までである。

## exceptions_or_transition

- 正確な日付計算は、満了日、申請日、処分日を確認して行う。
- 不許可後の対応は別論点。

## common_user_phrases

- 特例期间 两个月
- 期限后2个月还能待吗
- 申请中可以等多久
- 在留期限过了两个月
- 特例期間 終了 処分の日
- 满了日から2か月

## must_say

- 特例期間は処分時または満了日から2か月経過時の早い方まで。
- 無期限ではない。

## must_not_say

- 申请中就一直合法。
- 两个月一定从申请日算。

## qa_cases

### QA-1

**user**: 申请中特例期间是不是一定有两个月？

**must_have**:

- 处理结果先出来则到处理时
- 或满了日后2个月，取早的

**must_not_have**:

- 一定完整两个月

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-013 |
