---
fact_id: ssw-org-no-missing-foreigner-source
title: "特定技能所属機関 — 責めに帰すべき行方不明者を発生させていないこと"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 2
citation_label: "特定技能所属機関: 行方不明者"
citation_summary: "省令は、契約日前1年以内又は契約日以後に、特定技能所属機関の責めに帰すべき事由で外国人の行方不明者を発生させていないことを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-011
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第2条第1項第3号"
  source_locator: "第2条第1項第3号"
  claim_type: receiving_organization_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "行方不明発生原因の判断"
    - "会社責任の有無"
    - "受入停止等の行政判断"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "過去に外国人が失踪した会社が特定技能を受け入れられるかを聞く相談"
direct_fact_fields:
  - ssw_org_no_missing_foreigner_source
ai_inferred_fields: []
needs_review_flags:
  - id: missing_foreigner_responsibility_review
    reason: "行方不明の原因と所属機関の責任は個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第2条第1項第3号は、契約日前1年以内又は契約日以後に、特定技能所属機関の責めに帰すべき事由により外国人の行方不明者を発生させていないことを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第2条第1項第3号"
    display_label: "特定技能所属機関: 行方不明者"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能所属機関 — 責めに帰すべき行方不明者を発生させていないこと

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能所属機関について、契約日前1年以内又は契約日以後に、機関側の責めに帰すべき事由で外国人の行方不明者を発生させていないことを確認する。

## exceptions_or_transition

- 行方不明の原因、会社側の責任、行政上の扱いは個別確認が必要。

## common_user_phrases

- 特定技能 失踪者 出した 会社
- 特定技能 行方不明者 受入機関
- 特定技能 外国人 失踪 会社責任
- 特定技能 会社 過去 失踪
- 特定技能 受入停止 失踪
- 特定技能 missing worker employer

## must_say

- 会社側の責めで行方不明者を発生させていないかは確認点になる。

## must_not_say

- 過去の外国人行方不明は特定技能受入に関係ない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-011 |
