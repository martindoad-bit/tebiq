---
fact_id: ssw-org-notification-not-delegable-to-rso-source
title: "特定技能 — 所属機関の随時届出は登録支援機関へ委託できない"
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
citation_label: "特定技能: 所属機関の届出責任"
citation_summary: "ISA は、特定技能所属機関による随時届出は所属機関の責任で届け出るもので、登録支援機関に届出を委託できないと案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-003
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "特定技能所属機関による随時届出"
  source_locator: "随時届出 / 所属機関の責任"
  claim_type: responsibility_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "登録支援機関の支援業務範囲"
    - "定期届出の取りまとめ"
    - "個別委任契約の効力"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-notifications
    url: https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html
    title: 特定技能所属機関・登録支援機関による届出（提出書類）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関に会社の届出を任せられるかを聞く相談"
direct_fact_fields:
  - ssw_org_notification_not_delegable_to_rso
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_notification_responsibility_review
    reason: "支援委託契約の内容と届出義務の主体を混同しない確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能所属機関による随時届出は所属機関の責任で届け出るものと案内している。"
    source_title: "特定技能所属機関・登録支援機関による届出（提出書類）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "随時届出"
    display_label: "特定技能: 所属機関の届出責任"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は、登録支援機関と委託契約を締結していても、登録支援機関に届出を委託できないと案内している。"
    source_title: "特定技能所属機関・登録支援機関による届出（提出書類）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "随時届出"
    display_label: "特定技能: 届出委託不可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 所属機関の随時届出は登録支援機関へ委託できない

## current_date_logic

Checked against the ISA SSW notification page on 2026-05-13.

## current_effective_fact

特定技能所属機関による随時届出は、所属機関の責任で行う。登録支援機関と支援委託契約を結んでいても、その届出を登録支援機関に委託できない。

## exceptions_or_transition

- 定期届出での支援実施状況の取りまとめとは別の論点。

## common_user_phrases

- 特定技能 届出 登録支援機関に委託
- 特定技能 随時届出 会社 責任
- 登録支援機関 届出 代行できる
- 特定技能 会社 届出 支援機関 任せる
- 特定技能 支援委託 届出義務
- 特定技能 notification delegate support organization

## must_say

- 所属機関の随時届出は、所属機関の責任で行う。

## must_not_say

- 登録支援機関に委託していれば、会社は随時届出をしなくてよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-003 |
