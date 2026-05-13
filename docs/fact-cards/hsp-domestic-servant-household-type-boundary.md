---
fact_id: hsp-domestic-servant-household-type-boundary
title: "高度専門職家事使用人 — 家庭事情型の条件"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "家事使用人: 家庭事情型"
citation_summary: "ISA は、家庭事情型について、13歳未満の子又は病気等で日常家事ができない配偶者の存在を条件とし、その事情が消滅すると更新に影響すると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-015
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動告示2号"
  source_locator: "家庭事情型・説明と要件"
  claim_type: domestic_servant_condition
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "病気等の証明十分性"
    - "更新許可見込み"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-domestic-servant
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html
    title: 在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職家事使用人 — 家庭事情型の条件を聞く相談"
direct_fact_fields:
  - hsp_domestic_servant_household_type_boundary
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_domestic_servant_household_type_boundary_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、家庭事情型について、13歳未満の子又は病気等で日常家事ができない配偶者の存在を条件とし、その事情が消滅すると更新に影響すると説明している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の家事使用人・特別高度人材外国人の家事使用人）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities01_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "家庭事情型・説明と要件"
    display_label: "家事使用人: 家庭事情型"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職家事使用人 — 家庭事情型の条件

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

家庭事情型の家事使用人は、13歳未満の子又は日常家事ができない配偶者という家庭事情を中心に確認し、その事情の消滅は更新時のリスクになる。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 家事使用人 13歳未満
- HSP 家政 家庭事情型
- 高度人材 保姆 配偶者 病気
- 家事使用人 子供 13岁 更新
- 家庭事情型 雇主変更
- 高度専門職 家事使用人 更新できない

## must_say

- 家庭事情型は家庭事情の継続を確認する。

## must_not_say

- 家庭事情型なら事情がなくなっても必ず更新できる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-015 |
