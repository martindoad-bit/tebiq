---
fact_id: ssw-rso-renewal-window-source
title: "登録支援機関 — 更新申請は有効期間満了月の6か月前初日から4か月前月末で確認する"
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
citation_label: "登録支援機関: 更新申請時期"
citation_summary: "ISA は、登録支援機関の更新申請について、登録有効期限が到来する月の6か月前の初日から4か月前の月末までに申請するよう案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-020
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "登録支援機関の登録更新申請"
  source_locator: "登録支援機関の登録更新申請 / 申請時期及び審査期間"
  claim_type: renewal_deadline
  applicable_statuses:
    - "登録支援機関"
  application_type:
    - registration-renewal
  exclusion_scope:
    - "個別期限計算の代行"
    - "期限後申請の結果判断"
    - "災害等特例の適用判断"
  deep_water_candidate: true
official_sources:
  - id: isa-rso-registration-renewal
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00198.html
    title: 登録支援機関の登録更新申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "登録支援機関の登録更新申請時期を聞く相談"
direct_fact_fields:
  - ssw_rso_renewal_window
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_rso_renewal_window_review
    reason: "個別の満了日、申請時期、期限後申請の扱いは日付確認が必要。"
evidence_points:
  - claim: "ISA は、登録有効期限が到来する月の6か月前の初日から4か月前の月末までに登録支援機関の更新申請を行うよう案内している。"
    source_title: "登録支援機関の登録更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00198.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請時期及び審査期間"
    display_label: "登録支援機関: 更新申請時期"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 登録支援機関 — 更新申請は有効期間満了月の6か月前初日から4か月前月末で確認する

## current_date_logic

Checked against the ISA registered-support-organization renewal application page on 2026-05-13.

## current_effective_fact

登録支援機関の更新申請は、登録有効期限が到来する月の6か月前の初日から4か月前の月末までに申請するよう案内されている。

## exceptions_or_transition

- 具体的な期限計算、期限後申請、新規申請推奨の扱いは個別の日付で確認する。

## common_user_phrases

- 登録支援機関 更新 いつから
- 登録支援機関 更新 6か月前 4か月前
- 登録支援機関 有効期限 更新申請
- 登録支援機関 登録更新 期限
- 支援機関 更新申請 時期
- registered support organization renewal window

## must_say

- 更新申請は有効期間満了月の6か月前初日から4か月前月末で確認する。

## must_not_say

- 登録支援機関の更新は有効期限当月に出せば通常十分。
- 更新申請の時期は特に決まっていない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-020 |
