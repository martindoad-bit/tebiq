---
fact_id: ssw-rso-office-change-vs-suspension-boundary-source
title: "登録支援機関 — 一部事務所の休止や新事務所開始は登録事項変更で確認する"
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
citation_label: "登録支援機関: 事務所変更"
citation_summary: "ISA は、支援を行う事務所の一部で支援業務を休止する場合や、新たな事務所で支援業務を開始する場合は、支援業務の休廃止・再開届出ではなく登録事項変更届出を行うよう案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-018
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "登録支援機関による支援業務の休廃止又は再開に係る届出"
  source_locator: "支援業務の休廃止又は再開に係る届出 / 注記"
  claim_type: notification_boundary
  applicable_statuses:
    - "登録支援機関"
  application_type:
    - notification
  exclusion_scope:
    - "一部事務所か全体休止かの個別判断"
    - "支援事務所の登録事項内容"
    - "既存委託契約への影響"
  deep_water_candidate: true
official_sources:
  - id: isa-rso-suspend-abolish-restart
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00185.html
    title: 登録支援機関による支援業務の休廃止又は再開に係る届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-rso-registration-change
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00184.html
    title: 登録支援機関による登録事項変更に関する届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関の一部事務所休止や新事務所開始の届出分岐相談"
direct_fact_fields:
  - ssw_rso_office_change_vs_suspension_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_rso_office_change_boundary_review
    reason: "一部事務所の休止、新事務所開始、全体休止の区別を確認する必要がある。"
evidence_points:
  - claim: "ISA は、支援を行う事務所のうち一部の事務所で支援業務を休止する場合や、新たな事務所で支援業務を開始する場合は、登録事項変更届出を行うよう案内している。"
    source_title: "登録支援機関による支援業務の休廃止又は再開に係る届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00185.html"
    source_organization: "出入国在留管理庁"
    source_locator: "注記"
    display_label: "登録支援機関: 一部事務所と登録事項変更"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 登録支援機関 — 一部事務所の休止や新事務所開始は登録事項変更で確認する

## current_date_logic

Checked against the ISA registered-support-organization suspend/abolish/restart and registration-change notification pages on 2026-05-13.

## current_effective_fact

一部事務所で支援業務を休止する場合や、新たな事務所で支援業務を開始する場合は、休廃止・再開届出ではなく登録事項変更届出を確認する。

## exceptions_or_transition

- 支援業務全体の休止・廃止・再開とは分けて確認する。

## common_user_phrases

- 登録支援機関 一部 事務所 休止
- 登録支援機関 新しい事務所 支援開始
- 登録支援機関 支店 休止 届出
- 登録支援機関 休廃止 登録事項変更 違い
- 支援機関 事務所 追加 届出
- registered support organization office change boundary

## must_say

- 一部事務所の休止や新事務所開始は登録事項変更で確認する。

## must_not_say

- 一部事務所の休止は必ず支援業務の休止届出だけで処理する。
- 新事務所で支援を始める場合も登録事項変更は関係ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-018 |
