---
fact_id: ssw-organization-activity-document-retention-source
title: "特定技能所属機関 — 活動内容文書を契約終了後1年以上保存"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 2
citation_label: "特定技能所属機関: 活動内容文書"
citation_summary: "省令は、特定技能雇用契約に係る外国人の活動内容に関する文書を作成し、活動させる事業所に契約終了日から1年以上備えて置くことを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-022
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第2条第1項第5号"
  source_locator: "第2条第1項第5号"
  claim_type: receiving_organization_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - current-status
    - renewal
  exclusion_scope:
    - "文書様式の詳細"
    - "保存方法"
    - "行政調査対応"
  deep_water_candidate: false
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能所属機関が活動内容文書を保存する必要を聞く相談"
direct_fact_fields:
  - ssw_organization_activity_document_retention_source
ai_inferred_fields: []
needs_review_flags:
  - id: activity_document_detail_review
    reason: "文書の具体様式、保存方法、調査対応は運用要領で確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第2条第1項第5号は、特定技能雇用契約に係る外国人の活動内容に関する文書を作成し、事業所に契約終了日から1年以上備えて置くことを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第2条第1項第5号"
    display_label: "特定技能所属機関: 活動内容文書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能所属機関 — 活動内容文書を契約終了後1年以上保存

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能所属機関は、外国人の活動内容に関する文書を作成し、事業所に契約終了日から1年以上備えて置くことを確認する。

## exceptions_or_transition

- 具体的な様式や保存方法は運用要領で確認する。

## common_user_phrases

- 特定技能 活動内容 文書
- 特定技能 書類 保存 1年
- 特定技能 契約終了後 保存
- 特定技能 事業所 備置
- 特定技能 活動内容 保存
- 特定技能 document retention

## must_say

- 活動内容文書を作成し、契約終了後1年以上備えて置く確認がある。

## must_not_say

- 契約終了後は活動内容文書をすぐ捨ててよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-022 |
