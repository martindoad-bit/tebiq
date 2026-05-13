---
fact_id: ssw-acceptance-difficulty-missing-person-source
title: "特定技能 — 行方不明が判明した場合は受入れ困難届出を確認する"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "特定技能: 行方不明"
citation_summary: "ISA は、行方不明により継続受入れが困難となった場合を受入れ困難届出の対象に含め、行方不明が判明した際の状況説明書を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-010
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の18第1項第4号"
  source_locator: "受入れ困難に係る届出 / 行方不明"
  claim_type: notification_trigger
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "行方不明の認定"
    - "警察・労務対応"
    - "本人の在留資格取消し等の個別判断"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-acceptance-difficulty
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00190.html
    title: 特定技能所属機関による受入れ困難に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能外国人と連絡が取れない・行方不明が判明した場合の相談"
direct_fact_fields:
  - ssw_acceptance_difficulty_missing_person
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_missing_person_review
    reason: "行方不明が判明した時点、会社の確認履歴、労務対応は個別確認が必要。"
evidence_points:
  - claim: "ISA は、行方不明により継続受入れが困難となった場合を受入れ困難届出の対象に含めている。"
    source_title: "特定技能所属機関による受入れ困難に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00190.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "特定技能: 行方不明と受入れ困難"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、行方不明となった場合に行方不明が判明した際の状況説明書を案内している。"
    source_title: "特定技能所属機関による受入れ困難に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00190.html"
    source_organization: "出入国在留管理庁"
    source_locator: "必要書類等"
    display_label: "特定技能: 行方不明の状況説明"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 行方不明が判明した場合は受入れ困難届出を確認する

## current_date_logic

Checked against the ISA acceptance-difficulty notification page on 2026-05-13.

## current_effective_fact

特定技能外国人が行方不明となった場合は、受入れ困難届出を確認する。ISA は行方不明が判明した際の状況説明書を案内している。

## exceptions_or_transition

- 行方不明の判明時点、会社の探索・連絡履歴、他機関への連絡は個別確認が必要。

## common_user_phrases

- 特定技能 行方不明 届出
- 特定技能 連絡取れない 入管
- 特定技能 失踪 受入れ困難
- 特定技能 いなくなった 会社 届出
- 特定技能 行方不明 状況説明書
- 特定技能员工失踪
- 特定技能 missing person notification

## must_say

- 行方不明が判明した場合は受入れ困難届出を確認する。

## must_not_say

- 連絡が取れない場合でも入管への届出確認は不要。
- 行方不明は本人だけの問題で会社側の手続はない。
- 連絡が取れないだけで直ちに行方不明届出と断定できる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-010 |
