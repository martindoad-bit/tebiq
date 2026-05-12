---
fact_id: special-period-card-back-online-exception
title: 特例期間 — 在留カード裏面の申請中記載とオンライン申請例外
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 1
citation_label: "在留カード裏面の申請中記載とオンライン申請例外"
citation_summary: "ISA は、更新・変更申請を行った場合、在留カード裏面に申請中であることが記載されるが、オンライン申請の場合は除くと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-015
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法第20条第5項 / 第21条第4項"
  source_locator: "特例期間とは？：本文第2段落"
  claim_type: evidence_boundary
  applicable_statuses:
    - "mid_long_term_resident_card_holder"
  application_type:
    - renewal
    - change
  exclusion_scope:
    - "許可済み証明"
    - "オンライン申請の全運用"
  deep_water_candidate: false
applies_when:
  - "用户问在留卡背面申请中是什么意思"
  - "用户问线上申请为什么没有背面记载"
does_not_cover:
  - "申请受理证明的具体取得方式"
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
  - card_back_pending_notation
  - online_application_exception_to_card_back_pending_notation
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA explains that a pending-application notation is made on the back of the residence card when renewal or change is filed, except for online applications."
    source_title: "特例期間とは？"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/tokureikikan_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "本文第2段落"
    display_label: "在留カード裏面：申請中記載とオンライン申請例外"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特例期間 — 在留カード裏面の申請中記載とオンライン申請例外

## current_date_logic

Checked against the current ISA explainer on 2026-05-12.

## current_effective_fact

更新または変更申請を行った場合、在留カード裏面の更新等許可申請欄に申請中であることが記載される。ただし、オンライン申請の場合は除かれる。

## exceptions_or_transition

- 裏面の申請中記載は申請中であることの表示であり、許可済みの表示ではない。
- オンライン申請時の確認方法は運用ページや受付通知を別途確認する。

## common_user_phrases

- 在留卡背面 申请中
- 申请中贴纸 是许可吗
- online申请 没有在留卡背面记载
- 在留カード裏面 申請中
- 线上申请 特例期间 证明
- 在留卡过期 背面申请中

## must_say

- 在留カード裏面の申請中記載は、申請中であることの表示。
- オンライン申請の場合は裏面記載の例外がある。

## must_not_say

- 背面申请中就代表许可已经下来。
- 线上申请没有背面记载就一定没有特例期间。

## qa_cases

### QA-1

**user**: 在留卡背面写申请中，是不是已经许可了？

**must_have**:

- 表示申请中
- 不是许可済み

**must_not_have**:

- 已经许可

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-015 |
