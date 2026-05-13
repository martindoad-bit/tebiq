---
fact_id: ssw-rso-suspend-abolish-restart-notification-source
title: "登録支援機関 — 支援業務の休止・廃止・再開は届出時期を分けて確認する"
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
citation_label: "登録支援機関: 休廃止・再開"
citation_summary: "ISA は、支援業務を休止又は廃止した登録支援機関と、休止した支援業務を再開しようとする登録支援機関を対象に、休廃止は日から14日以内、再開は再開前の届出を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-017
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の29第1項 / 施行規則第19条の23"
  source_locator: "支援業務の休廃止又は再開に係る届出 / 手続対象者 / 届出期間"
  claim_type: notification_requirement
  applicable_statuses:
    - "登録支援機関"
  application_type:
    - notification
  exclusion_scope:
    - "既存受託案件の処理"
    - "部分的な事務所変更"
    - "登録更新との関係"
  deep_water_candidate: true
official_sources:
  - id: isa-rso-suspend-abolish-restart
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00185.html
    title: 登録支援機関による支援業務の休廃止又は再開に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関が支援業務を休止・廃止・再開する相談"
direct_fact_fields:
  - ssw_rso_suspend_abolish_restart_notification
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_rso_suspend_abolish_restart_review
    reason: "全部休止か一部事務所か、既存受託案件の扱いは個別確認が必要。"
evidence_points:
  - claim: "ISA は、支援業務を休止又は廃止した登録支援機関と、休止した支援業務を再開しようとする登録支援機関を届出対象としている。"
    source_title: "登録支援機関による支援業務の休廃止又は再開に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00185.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "登録支援機関: 休廃止・再開"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、休止又は廃止はその日から14日以内、再開は再開前の届出を案内している。"
    source_title: "登録支援機関による支援業務の休廃止又は再開に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00185.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出期間"
    display_label: "登録支援機関: 休廃止・再開届出時期"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 登録支援機関 — 支援業務の休止・廃止・再開は届出時期を分けて確認する

## current_date_logic

Checked against the ISA registered-support-organization suspend/abolish/restart notification page on 2026-05-13.

## current_effective_fact

登録支援機関が支援業務を休止又は廃止した場合はその日から14日以内、休止した支援業務を再開しようとする場合は再開前の届出を確認する。

## exceptions_or_transition

- 一部事務所の休止や新事務所での開始は、登録事項変更届出との分岐を確認する。

## common_user_phrases

- 登録支援機関 支援業務 休止 届出
- 登録支援機関 支援業務 廃止 14日
- 登録支援機関 支援業務 再開 前
- 登録支援機関 休廃止 再開
- 支援機関 業務停止 入管
- registered support organization suspend restart notification

## must_say

- 支援業務の休止・廃止・再開は届出時期を分けて確認する。

## must_not_say

- 支援業務を休止しても入管届出は不要。
- 再開は再開後14日以内に出せば常に足りる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-017 |
