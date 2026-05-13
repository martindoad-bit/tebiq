---
fact_id: ssw-support-plan-change-notification-14day-source
title: "特定技能1号 — 支援計画変更は14日以内届出を確認する"
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
citation_label: "特定技能1号: 支援計画変更届出"
citation_summary: "ISA は、1号特定技能外国人支援計画に変更が生じた特定技能所属機関を対象に、事由が生じた日から14日以内の届出を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-006
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の18第1項第2号"
  source_locator: "支援計画変更に係る届出"
  claim_type: notification_requirement
  applicable_statuses:
    - "特定技能1号"
  application_type:
    - notification
  exclusion_scope:
    - "支援計画変更の実体適合性"
    - "登録支援機関の変更手続全体"
    - "2号の支援計画範囲"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-support-plan-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00188.html
    title: 特定技能所属機関による支援計画変更に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能1号の支援計画を変更した場合の届出相談"
direct_fact_fields:
  - ssw_support_plan_change_notification_14day
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_support_plan_change_scope_review
    reason: "何が支援計画変更に当たるか、登録支援機関変更との関係は個別確認が必要。"
evidence_points:
  - claim: "ISA は、1号特定技能外国人支援計画に変更が生じた特定技能所属機関を対象に、事由が生じた日から14日以内の届出を案内している。"
    source_title: "特定技能所属機関による支援計画変更に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00188.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者 / 届出期間"
    display_label: "特定技能1号: 支援計画変更届出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能1号 — 支援計画変更は14日以内届出を確認する

## current_date_logic

Checked against the ISA support-plan change notification page on 2026-05-13.

## current_effective_fact

1号特定技能外国人支援計画に変更が生じた特定技能所属機関は、事由発生日から14日以内の支援計画変更届出を確認する。

## exceptions_or_transition

- 変更内容によって、変更内容を証明する資料や追加の疎明資料が問題になる。

## common_user_phrases

- 特定技能 支援計画 変更 届出 14日
- 特定技能1号 支援計画 変更
- 特定技能 登録支援機関 変更 支援計画
- 特定技能 支援担当者 変更 届出
- 特定技能 支援計画書 変わった
- 特定技能 support plan change notification

## must_say

- 1号の支援計画変更は14日以内届出を確認する。

## must_not_say

- 支援計画が変わっても届出は不要。
- 登録支援機関が変わっても所属機関側の支援計画変更は確認不要。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-006 |
