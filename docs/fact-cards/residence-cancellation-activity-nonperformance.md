---
fact_id: residence-cancellation-activity-nonperformance
title: 在留資格取消 — 本来活動を継続していない場合の取消入口
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 1
citation_label: "本来活動をしていない場合の在留資格取消入口"
citation_summary: "入管法第22条の4と ISA の取消案内は、別表第一の活動資格者が本来の活動を行わず他の活動を行う又は行おうとしている場合、又は正当な理由なく継続して3か月以上本来活動を行っていない場合を取消事由として示している。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-017
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_current_text
  law_article_ref: "入管法第22条の4"
  source_locator: "活動不履行の取消事由"
  claim_type: cancellation_trigger
  applicable_statuses:
    - "table1_activity_status_holder"
  application_type:
    - cancellation
  exclusion_scope:
    - "別表第二の身分系資格"
    - "正当な理由がある場合"
  deep_water_candidate: true
applies_when:
  - "用户问失业、停业、没有做原活动是否会取消在留资格"
does_not_cover:
  - "正当理由是否成立"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 別表第一の活動資格を持つ外国人
direct_fact_fields:
  - residence_cancellation_activity_nonperformance
ai_inferred_fields: []
needs_review_flags:
  - id: justifiable_reason_requires_review
    reason: "正当な理由の有無は個別確認が必要。"
evidence_points:
  - claim: "入管法第22条の4と ISA の取消案内は、別表第一の活動資格者が本来の活動を行わず他の活動を行う又は行おうとしている場合、又は正当な理由なく継続して3か月以上本来活動を行っていない場合を取消事由として示している。"
    source_title: "在留資格の取消し"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由"
    display_label: "在留資格取消：本来活動の不履行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留資格取消 — 本来活動を継続していない場合の取消入口

## current_date_logic

Checked against current law text and ISA cancellation page on 2026-05-12.

## current_effective_fact

別表第一の活動資格者が本来の活動を行わず他の活動を行う又は行おうとしている場合、又は正当な理由なく継続して3か月以上本来活動を行っていない場合は、在留資格取消の事由として示されている。

## exceptions_or_transition

- 正当な理由の有無を確認する。
- 失業や休業だけで自動取消と断定しない。

## common_user_phrases

- 失業 3ヶ月 在留資格取消
- 仕事辞めた 在留資格 取消
- 経営管理 会社 停止 取消
- 技人国 仕事してない 取消
- 工作签 失业 三个月
- 签证 活动没做 会取消吗

## must_say

- 本来活動を継続していない場合は取消入口になり得る。
- 正当な理由と個別状況を確認する。

## must_not_say

- 失業3か月で必ず自動取消。
- 期限内なら活動していなくても完全に問題ない。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 1 legal-source card | — | ai_extracted | C4-017 |
