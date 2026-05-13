---
fact_id: ssw-notification-noncompliance-penalty-risk-source
title: "特定技能 — 届出不履行や虚偽届出はリスクになる"
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
citation_label: "特定技能: 届出不履行"
citation_summary: "ISA は、特定技能所属機関の届出不履行や虚偽届出は罰則の対象、登録支援機関の届出不履行や虚偽届出は登録取消しの対象になると案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-002
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "特定技能所属機関・登録支援機関による届出"
  source_locator: "届出不履行・虚偽届出の注意"
  claim_type: risk_signal
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "処分の有無"
    - "罰則の具体的判断"
    - "登録取消しの個別判断"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-notifications
    url: https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html
    title: 特定技能所属機関・登録支援機関による届出（提出書類）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能届出を出さなかった場合のリスクを聞く相談"
direct_fact_fields:
  - ssw_notification_noncompliance_penalty_risk
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_notification_penalty_review
    reason: "罰則や登録取消しの具体的適用は個別判断が必要。"
evidence_points:
  - claim: "ISA は、特定技能所属機関の届出不履行や虚偽届出について罰則の対象と案内している。"
    source_title: "特定技能所属機関・登録支援機関による届出（提出書類）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特定技能所属機関による届出"
    display_label: "特定技能: 届出不履行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は、登録支援機関の届出不履行や虚偽届出について登録取消しの対象と案内している。"
    source_title: "特定技能所属機関・登録支援機関による届出（提出書類）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "登録支援機関による届出"
    display_label: "登録支援機関: 届出不履行"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 届出不履行や虚偽届出はリスクになる

## current_date_logic

Checked against the ISA SSW notification page on 2026-05-13.

## current_effective_fact

特定技能所属機関の届出不履行や虚偽届出は罰則の対象と案内されている。登録支援機関の届出不履行や虚偽届出は登録取消しの対象と案内されている。

## exceptions_or_transition

- 実際に罰則や登録取消しとなるかは個別判断。

## common_user_phrases

- 特定技能 届出 出さない 罰則
- 特定技能 虚偽届出 リスク
- 特定技能 会社 届出 忘れた
- 特定技能 登録支援機関 届出 不履行 取消
- 特定技能 届出 遅れた 処分
- 特定技能 notification penalty

## must_say

- 届出不履行や虚偽届出は重大なリスクになる。

## must_not_say

- 届出を出さなくても実務上は問題にならない。
- 虚偽届出でもあとで直せば必ず問題ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-002 |
