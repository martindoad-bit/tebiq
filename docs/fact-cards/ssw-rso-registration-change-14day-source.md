---
fact_id: ssw-rso-registration-change-14day-source
title: "登録支援機関 — 登録事項変更は14日以内届出を確認する"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "登録支援機関: 登録事項変更"
citation_summary: "ISA は、登録事項に変更が生じた登録支援機関を対象に、事由発生日から14日以内の登録事項変更届出を案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-016
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の27第1項"
  source_locator: "登録事項変更に関する届出 / 手続対象者 / 届出期間"
  claim_type: notification_requirement
  applicable_statuses:
    - "登録支援機関"
  application_type:
    - notification
  exclusion_scope:
    - "変更事項ごとの添付資料判断"
    - "休廃止又は再開届出との分岐"
    - "登録取消しの個別判断"
  deep_water_candidate: true
official_sources:
  - id: isa-rso-registration-change
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00184.html
    title: 登録支援機関による登録事項変更に関する届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関の住所・代表者・登録事項が変わった場合の相談"
direct_fact_fields:
  - ssw_rso_registration_change_14day
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_rso_registration_change_review
    reason: "何が登録事項変更に当たるか、提出資料は変更内容により確認が必要。"
evidence_points:
  - claim: "ISA は、登録事項に変更が生じた登録支援機関を届出対象としている。"
    source_title: "登録支援機関による登録事項変更に関する届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00184.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者"
    display_label: "登録支援機関: 登録事項変更"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、届出期間を事由発生日から14日以内と案内している。"
    source_title: "登録支援機関による登録事項変更に関する届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00184.html"
    source_organization: "出入国在留管理庁"
    source_locator: "届出期間"
    display_label: "登録支援機関: 登録事項変更届出期限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 登録支援機関 — 登録事項変更は14日以内届出を確認する

## current_date_logic

Checked against the ISA registered-support-organization registration-change notification page on 2026-05-13.

## current_effective_fact

登録事項に変更が生じた登録支援機関は、事由発生日から14日以内の登録事項変更届出を確認する。

## exceptions_or_transition

- 一部事務所の支援業務休止や新事務所での開始は、休廃止又は再開届出ではなく登録事項変更届出として案内されている。

## common_user_phrases

- 登録支援機関 登録事項 変更 14日
- 登録支援機関 住所変更 届出
- 登録支援機関 代表者 変更 届出
- 登録支援機関 変更内容 証明資料
- 支援機関 登録事項 変わった
- registered support organization change notification

## must_say

- 登録事項変更は14日以内届出を確認する。

## must_not_say

- 登録支援機関の住所や代表者が変わっても届出確認は不要。
- 登録事項変更は次回更新時にまとめればよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-016 |
