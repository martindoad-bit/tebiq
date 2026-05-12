---
fact_id: qualification-outside-activity-procedure-scope
title: 資格外活動許可 — 現資格外の収入・報酬活動を行うための許可
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
citation_label: "資格外活動許可は現資格外の収入・報酬活動の許可"
citation_summary: "資格外活動許可申請は、許可された在留資格に応じた活動以外に、収入を伴う事業運営活動または報酬を受ける活動を行おうとする場合の申請。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-022
  authority_layer: L4 ISA Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条第2項"
  source_locator: "資格外活動許可申請ページ：手続概要・手続対象者"
  claim_type: procedure_scope
  applicable_statuses:
    - "table1"
  application_type:
    - qualification_outside_activity
  exclusion_scope:
    - "別表第二身分資格の就労"
    - "在留資格変更"
  deep_water_candidate: false
applies_when:
  - "用户问副业、打工、兼职是否要资格外活动许可"
  - "用户问当前签证外的有偿活动"
does_not_cover:
  - "具体工作是否可被许可"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-qoa-16-8
    url: https://www.moj.go.jp/isa/applications/procedures/16-8.html
    title: 資格外活動許可申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-qoa-explainer
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
    title: 資格外活動許可について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 資格外活動許可申請
direct_fact_fields:
  - qualification_outside_activity_for_revenue_or_remunerated_activity_outside_current_status
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA describes qualification outside activity permission as needed when conducting revenue-business or remunerated activity outside the activity permitted by the current residence status."
    source_title: "資格外活動許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-8.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続概要; 手続対象者"
    display_label: "資格外活動許可：現資格外の収入・報酬活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 資格外活動許可 — 現資格外の収入・報酬活動を行うための許可

## current_date_logic

Checked against current ISA pages on 2026-05-12.

## current_effective_fact

資格外活動許可は、現に有する在留資格に属さない収入を伴う事業運営活動または報酬を受ける活動を行おうとする場合に必要となる許可である。

## exceptions_or_transition

- 現資格の範囲内でできる活動か、在留資格変更が必要かは別途確認する。
- 永住者など別表第二資格は原則として資格外活動許可の対象外。

## common_user_phrases

- 资格外活动许可 副业
- 打工需要资格外活动吗
- 当前签证外 有偿活动
- 报酬活动 资格外
- 副业 兼职 收入
- 現資格外 報酬 活動

## must_say

- 現資格外の収入・報酬活動を行う場合の許可。
- 仕事内容が現資格内か、資格外活動か、変更かを切り分ける。

## must_not_say

- 任何副业都可以随便做。
- 资格外活动许可等于万能工作签。

## qa_cases

### QA-1

**user**: 技人国做副业需要资格外活动许可吗？

**must_have**:

- 先看当前资格范围
- 当前资格外的有偿活动可能涉及资格外活动许可

**must_not_have**:

- 随便做

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 2 legal-source card | — | ai_extracted | C3-022 |
