---
fact_id: qualification-outside-activity-permission-before-work
title: 資格外活動許可 — 現資格外の有償活動は事前許可が前提
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 2
citation_label: "資格外活動はあらかじめ許可を受ける必要"
citation_summary: "ISA の説明は、許可された在留資格に応じた活動以外の収入・報酬活動を行う場合、あらかじめ資格外活動許可を受けなければならないとする。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-024
  authority_layer: L4 ISA Explainer
  legal_source_type: official_explainer
  law_article_ref: "入管法第19条第2項"
  source_locator: "資格外活動の許可（入管法第19条）：本文1"
  claim_type: permission_boundary
  applicable_statuses:
    - "table1"
  application_type:
    - qualification_outside_activity
  exclusion_scope:
    - "事後申請での自動補正"
    - "現在資格内活動"
  deep_water_candidate: true
applies_when:
  - "用户问能否先打工再补资格外活动许可"
  - "用户问副业开始前是否要许可"
does_not_cover:
  - "已经无许可从事活动后的风险处理"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-qoa-law19
    url: https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html
    title: 資格外活動の許可（入管法第19条）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 資格外活動許可申請
direct_fact_fields:
  - permission_must_be_obtained_before_outside_activity
ai_inferred_fields: []
needs_review_flags:
  - id: past_unpermitted_work_consequence
    reason: "Past unpermitted work requires individual review."
evidence_points:
  - claim: "ISA explains that when conducting revenue-business or remunerated activity outside the permitted residence-status activity, qualification outside activity permission must be obtained in advance."
    source_title: "資格外活動の許可（入管法第19条）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "本文1"
    display_label: "資格外活動：事前許可が前提"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 現資格外の有償活動は事前許可が前提

## current_date_logic

Checked against the current ISA explainer on 2026-05-12.

## current_effective_fact

許可された在留資格に応じた活動以外に収入・報酬活動を行おうとする場合は、あらかじめ資格外活動許可を受ける必要がある。

## exceptions_or_transition

- 過去に無許可で活動した場合の影響は個別確認。
- 現在資格の範囲内の活動かどうかは別途判断する。

## common_user_phrases

- 先打工再补资格外活动许可
- 副业开始前 许可
- 资格外活动 事前许可
- 没许可先兼职
- 打工许可 先做后申请
- あらかじめ 資格外活動許可

## must_say

- 現資格外の有償活動は事前許可が前提。
- 先做后补は危険。

## must_not_say

- 先开始打工后面补许可即可。
- 申请中就可以开始打工。

## qa_cases

### QA-1

**user**: 留学生打工许可还没下来，可以先上班吗？

**must_have**:

- 事前许可
- 申请中不等于许可

**must_not_have**:

- 可以先上班

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-024 |
