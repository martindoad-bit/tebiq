---
fact_id: ssw-rso-notification-nonperformance-cancellation-risk-source
title: "登録支援機関 — 届出不履行や虚偽届出は登録取消しリスクとして確認する"
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
citation_label: "登録支援機関: 届出不履行"
citation_summary: "ISA は、登録支援機関の届出不履行や虚偽届出について、登録取消しの対象になると案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-022
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "登録支援機関による届出"
  source_locator: "登録支援機関による届出 / 届出不履行・虚偽届出"
  claim_type: risk_signal
  applicable_statuses:
    - "登録支援機関"
  application_type:
    - notification
  exclusion_scope:
    - "登録取消しの個別判断"
    - "不履行の故意過失評価"
    - "是正可能性"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-notifications
    url: https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html
    title: 特定技能所属機関・登録支援機関による届出（提出書類）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関が届出を出さなかった・虚偽届出をした場合の相談"
direct_fact_fields:
  - ssw_rso_notification_nonperformance_cancellation_risk
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_rso_notification_cancellation_risk_review
    reason: "登録取消しの実際の適用は個別判断が必要。"
evidence_points:
  - claim: "ISA は、登録支援機関の届出不履行や虚偽届出について、登録取消しの対象になると案内している。"
    source_title: "特定技能所属機関・登録支援機関による届出（提出書類）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "登録支援機関による届出"
    display_label: "登録支援機関: 届出不履行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 登録支援機関 — 届出不履行や虚偽届出は登録取消しリスクとして確認する

## current_date_logic

Checked against the ISA SSW notification page on 2026-05-13.

## current_effective_fact

登録支援機関の届出不履行や虚偽届出は、登録取消しの対象になるリスクとして確認する。

## exceptions_or_transition

- 実際に登録取消しになるかは個別判断。

## common_user_phrases

- 登録支援機関 届出 不履行 取消
- 登録支援機関 虚偽届出
- 登録支援機関 届出 忘れた
- 支援機関 届出 出さない リスク
- 登録支援機関 取消し 届出
- registered support organization notification cancellation risk

## must_say

- 届出不履行や虚偽届出は登録取消しリスクとして確認する。

## must_not_say

- 登録支援機関の届出不履行は登録に影響しない。
- 虚偽届出でも後で直せば登録取消しリスクはない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-022 |
