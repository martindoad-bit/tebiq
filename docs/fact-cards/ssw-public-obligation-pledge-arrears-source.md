---
fact_id: ssw-public-obligation-pledge-arrears-source
title: "特定技能 — 滞納がある場合は公的義務履行の誓約書を確認する"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 3
citation_label: "特定技能: 公的義務履行の誓約書"
citation_summary: "特定技能の更新用第1表は、税・保険・年金関係の一部書類に滞納がある場合、公的義務履行に関する誓約書を条件付き書類として掲げている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-015
  authority_layer: L4 ISA XLSX
  legal_source_type: official_material_table
  law_article_ref: "特定技能 更新用第1表 公的義務履行"
  source_locator: "更新用第1表 項番13から14"
  claim_type: risk_signal
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - renewal
  exclusion_scope:
    - "滞納がある場合の許可可否"
    - "誓約履行状況の評価"
    - "納税緩和措置の評価"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw1-renew-table1
    url: https://www.moj.go.jp/isa/content/001459973.xlsx
    title: 「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能更新で滞納や誓約書がある相談"
direct_fact_fields:
  - ssw_public_obligation_pledge_arrears
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_public_obligation_risk_review
    reason: "滞納、猶予、前回誓約の履行状況は許可可否に関わる可能性があり専門確認が必要。"
evidence_points:
  - claim: "特定技能1号の更新用第1表は、特定の税・保険・年金関係書類に滞納がある場合、公的義務履行に関する誓約書を条件付き書類として掲げている。"
    source_title: "「特定技能1号」に係る提出書類一覧表（在留期間更新許可申請用）"
    source_url: "https://www.moj.go.jp/isa/content/001459973.xlsx"
    source_organization: "出入国在留管理庁"
    source_locator: "第1表 項番13から14"
    display_label: "特定技能: 公的義務履行の誓約書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 滞納がある場合は公的義務履行の誓約書を確認する

## current_date_logic

Checked against ISA SSW1 renewal material table revised 2026-04-01.

## current_effective_fact

特定技能の更新用第1表では、税・保険・年金関係の一部書類に滞納がある場合、公的義務履行に関する誓約書が条件付き書類として出ている。

## exceptions_or_transition

- 滞納がある場合に許可されるかどうかは、この書類だけでは判断できない。
- 前回申請時に公的義務の履行を誓約していた場合は、前回履行すべきだった義務に係る書類も確認する。

## common_user_phrases

- 特定技能 更新 滞納 誓約書
- 滞納があっても特定技能更新で誓約書を出せば更新できますか
- 特定技能 公的義務履行 誓約書
- 特定技能 税金 年金 滞納 更新
- 特定技能 国保 滞納 誓約
- 特定技能 前回 誓約 書類
- 特定技能 public obligation pledge

## must_say

- 滞納がある場合は、公的義務履行に関する誓約書や前回義務書類を確認する。

## must_not_say

- 誓約書を出せば滞納は必ず問題にならない。
- 滞納があっても更新書類上は何も追加確認がない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-015 |
