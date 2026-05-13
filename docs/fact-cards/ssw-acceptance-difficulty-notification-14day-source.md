---
fact_id: ssw-acceptance-difficulty-notification-14day-source
title: "特定技能 — 継続受入れが困難になった場合は14日以内届出を確認する"
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
citation_label: "特定技能: 受入れ困難届出"
citation_summary: "ISA は、経営上の都合、死亡、病気・怪我、行方不明、帰国等により特定技能外国人の継続受入れが困難となった所属機関を対象に、事由発生日から14日以内の届出を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-008
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の18第1項第4号 / 施行規則第19条の17第6項第1号"
  source_locator: "受入れ困難に係る届出 / 手続対象者 / 届出期間"
  claim_type: notification_requirement
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "受入れ困難に当たるかの個別判断"
    - "退職後の在留資格変更可否"
    - "届出遅延時の処分判断"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-acceptance-difficulty
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00190.html
    title: 特定技能所属機関による受入れ困難に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "会社都合・病気・行方不明・帰国等で特定技能外国人の受入れ継続が難しい相談"
direct_fact_fields:
  - ssw_acceptance_difficulty_notification_14day
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_acceptance_difficulty_trigger_review
    reason: "経緯、原因、契約終了届出との順序により個別確認が必要。"
evidence_points:
  - claim: "ISA は、経営上の都合や特定技能外国人の死亡、病気・怪我、行方不明、帰国等により継続受入れが困難となった特定技能所属機関を受入れ困難届出の対象としている。"
    source_title: "特定技能所属機関による受入れ困難に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00190.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "特定技能: 受入れ困難"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、届出期間を事由発生日から14日以内と案内している。"
    source_title: "特定技能所属機関による受入れ困難に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00190.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出期間"
    display_label: "特定技能: 受入れ困難届出期限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 継続受入れが困難になった場合は14日以内届出を確認する

## current_date_logic

Checked against the ISA acceptance-difficulty notification page on 2026-05-13.

## current_effective_fact

経営上の都合、死亡、病気・怪我、行方不明、帰国等により特定技能外国人の継続受入れが困難となった場合、特定技能所属機関は事由発生日から14日以内の受入れ困難届出を確認する。

## exceptions_or_transition

- 契約終了届出、支援実施困難届出、基準不適合届出との分岐は個別に確認する。

## common_user_phrases

- 特定技能 受入れ困難 届出 14日
- 特定技能 会社 続けて雇えない
- 特定技能 会社都合 受入れ困難
- 特定技能 病気 怪我 受入れ困難
- 特定技能 帰国 受入れ困難 届出
- 特定技能 受入れ困難届出
- 特定技能 受入れ困難 転職 安全
- 特定技能 受入れ困難届出 転職
- 特定技能 acceptance difficulty notification

## must_say

- 継続受入れが困難になった場合は14日以内届出を確認する。

## must_not_say

- 会社が雇えなくなっただけなら入管届出は不要。
- 退職処理だけすれば受入れ困難届出は確認しなくてよい。
- 受入れ困難届出を出せば、本人の在留や転職が自動的に安全になる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-008 |
