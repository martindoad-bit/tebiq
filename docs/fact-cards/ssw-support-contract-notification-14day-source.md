---
fact_id: ssw-support-contract-notification-14day-source
title: "特定技能 — 支援委託契約の締結・変更・終了は14日以内届出を確認する"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "特定技能: 支援委託契約届出"
citation_summary: "ISA は、支援委託契約を新たに締結、変更又は終了した特定技能所属機関を対象に、事由が生じた日から14日以内の届出を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-007
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の18第1項第3号"
  source_locator: "支援委託契約に係る届出"
  claim_type: notification_requirement
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - notification
  exclusion_scope:
    - "支援委託契約の有効性"
    - "支援計画変更届出との重複要否"
    - "登録支援機関の登録適格性"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-support-contract-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00189.html
    title: 特定技能所属機関による支援委託契約に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関との支援委託契約を結ぶ・変える・終了する場合の届出相談"
direct_fact_fields:
  - ssw_support_contract_notification_14day
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_support_contract_notification_review
    reason: "支援委託契約変更と支援計画変更届出の関係は個別確認が必要。"
evidence_points:
  - claim: "ISA は、支援委託契約を新たに締結、変更又は終了した特定技能所属機関を対象に、事由が生じた日から14日以内の届出を案内している。"
    source_title: "特定技能所属機関による支援委託契約に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00189.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者 / 届出期間"
    display_label: "特定技能: 支援委託契約届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 支援委託契約の締結・変更・終了は14日以内届出を確認する

## current_date_logic

Checked against the ISA support-contract notification page on 2026-05-13.

## current_effective_fact

支援委託契約を新たに締結、変更又は終了した特定技能所属機関は、事由発生日から14日以内の届出を確認する。

## exceptions_or_transition

- 支援計画変更届出も必要になるかは、変更内容で別途確認する。

## common_user_phrases

- 特定技能 支援委託契約 届出 14日
- 特定技能 登録支援機関 契約 変更
- 特定技能 支援委託契約 終了
- 特定技能 支援機関 変える 届出
- 特定技能 自社支援に切り替え 届出
- 特定技能 support outsourcing contract notification

## must_say

- 支援委託契約の締結・変更・終了は14日以内届出を確認する。

## must_not_say

- 支援委託契約が変わっても届出は不要。
- 登録支援機関との契約を変えれば、入管への届出は自動で終わる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-007 |
