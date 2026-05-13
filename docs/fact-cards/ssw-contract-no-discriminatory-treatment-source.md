---
fact_id: ssw-contract-no-discriminatory-treatment-source
title: "特定技能雇用契約 — 外国人であることを理由に差別的取扱いをしない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 2
citation_label: "特定技能雇用契約: 差別的取扱い"
citation_summary: "特定技能雇用契約の基準省令は、外国人であることを理由として、報酬、教育訓練、福利厚生施設の利用その他の待遇について差別的取扱いをしていないことを求めている。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: P1C3-B2-005
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "平成31年法務省令第5号 第1条第1項第4号"
  source_locator: "第1条第1項第4号"
  claim_type: treatment_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "個別待遇差の違法性判断"
    - "社内制度の適用範囲"
    - "労働紛争の処理"
  deep_water_candidate: true
official_sources:
  - id: egov-ssw-contract-support-ordinance
    url: https://laws.e-gov.go.jp/law/431M60000010005
    title: 特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の待遇差や福利厚生を聞く相談"
direct_fact_fields:
  - ssw_contract_no_discriminatory_treatment_source
ai_inferred_fields: []
needs_review_flags:
  - id: discriminatory_treatment_detail_review
    reason: "具体的な待遇差が差別的取扱いに当たるかは個別確認が必要。"
evidence_points:
  - claim: "平成31年法務省令第5号第1条第1項第4号は、外国人であることを理由として、報酬、教育訓練、福利厚生施設の利用その他の待遇について差別的取扱いをしていないことを求めている。"
    source_title: "特定技能雇用契約及び一号特定技能外国人支援計画の基準等を定める省令"
    source_url: "https://laws.e-gov.go.jp/law/431M60000010005"
    source_organization: "e-Gov 法令検索"
    source_locator: "第1条第1項第4号"
    display_label: "特定技能雇用契約: 待遇"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能雇用契約 — 外国人であることを理由に差別的取扱いをしない

## current_date_logic

Checked against e-Gov current law text on 2026-05-13.

## current_effective_fact

特定技能雇用契約では、外国人であることを理由に、報酬、教育訓練、福利厚生施設の利用などで差別的に扱わないことを確認する。

## exceptions_or_transition

- 個別の待遇差が許されるかは具体事情で確認する。

## common_user_phrases

- 特定技能 福利厚生 差別
- 特定技能 外国人だから 研修なし
- 特定技能 待遇 日本人 違う
- 特定技能 報酬 差別
- 特定技能 教育訓練
- 特定技能 外国人扱い

## must_say

- 外国人であることを理由に待遇を差別しないことを確認する。

## must_not_say

- 外国人だから福利厚生や研修を省いてよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 2 extraction | — | ai_extracted | P1C3-B2-005 |
