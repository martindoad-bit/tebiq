---
fact_id: ssw-rso-registration-scope-and-period-source
title: "登録支援機関 — 全部支援を受託する機関は登録申請と5年有効期間を確認する"
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
citation_label: "登録支援機関: 登録申請"
citation_summary: "ISA は、特定技能所属機関から委託を受けて適合1号特定技能外国人支援計画の全部の実施業務を行う者を登録申請の対象とし、審査はおおむね2か月、登録有効期間は5年と案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-019
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "登録支援機関の登録申請"
  source_locator: "登録支援機関の登録申請 / 対象者 / 申請時期及び審査期間 / 審査結果の通知"
  claim_type: registration_requirement
  applicable_statuses:
    - "登録支援機関"
    - "特定技能1号"
  application_type:
    - registration
  exclusion_scope:
    - "登録拒否事由の該当性"
    - "部分委託や自社支援の可否"
    - "個別審査期間の保証"
  deep_water_candidate: true
official_sources:
  - id: isa-rso-registration-application
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00183.html
    title: 登録支援機関の登録申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関になるための対象・審査期間・有効期間を聞く相談"
direct_fact_fields:
  - ssw_rso_registration_scope_and_period
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_rso_registration_scope_review
    reason: "全部支援の受託範囲、登録拒否事由、登録後の業務範囲は個別確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能所属機関から契約により委託を受けて適合1号特定技能外国人支援計画の全部の実施業務を行う者を登録申請の対象としている。"
    source_title: "登録支援機関の登録申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00183.html"
    source_organization: "出入国在留管理庁"
    source_locator: "対象者"
    display_label: "登録支援機関: 登録対象"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、登録申請の審査がおおむね2か月を要し、登録の有効期間は5年間と案内している。"
    source_title: "登録支援機関の登録申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00183.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請時期及び審査期間 / 審査結果の通知"
    display_label: "登録支援機関: 審査期間と有効期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 登録支援機関 — 全部支援を受託する機関は登録申請と5年有効期間を確認する

## current_date_logic

Checked against the ISA registered-support-organization registration application page on 2026-05-13.

## current_effective_fact

登録支援機関の登録申請は、特定技能所属機関から委託を受け、適合1号支援計画の全部の実施業務を行う者について確認する。審査はおおむね2か月、登録有効期間は5年と案内されている。

## exceptions_or_transition

- 登録拒否事由、全部委託の範囲、個別審査期間は別途確認する。

## common_user_phrases

- 登録支援機関 登録申請 対象
- 登録支援機関 審査 2か月
- 登録支援機関 有効期間 5年
- 登録支援機関 1号 支援 全部委託
- 登録支援機関 なるには
- registered support organization registration validity

## must_say

- 全部支援を受託する機関は登録申請と5年有効期間を確認する。

## must_not_say

- 1号支援を全部受託するだけなら登録支援機関の登録は関係ない。
- 登録支援機関の登録に有効期間はない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-019 |
