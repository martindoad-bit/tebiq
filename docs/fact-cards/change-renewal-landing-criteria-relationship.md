---
fact_id: change-renewal-landing-criteria-relationship
title: 変更・更新 — 一部資格では上陸許可基準も原則確認される
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 1
citation_label: "変更・更新と上陸許可基準の関係"
citation_summary: "ISA ガイドラインは、入管法別表第一の二の表または四の表の資格について、変更・更新でも原則として上陸許可基準への適合が求められると説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-009
  authority_layer: L4 ISA Guideline
  legal_source_type: official_guideline
  law_article_ref: "入管法第20条 / 第21条 / 上陸基準省令"
  source_locator: "在留資格の変更、在留期間の更新許可のガイドライン：2 法務省令で定める上陸許可基準等"
  claim_type: criteria_relationship
  applicable_statuses:
    - "table1_2"
    - "table1_4"
  application_type:
    - change
    - renewal
  exclusion_scope:
    - "全資格への一律適用"
    - "個別許可保証"
  deep_water_candidate: true
applies_when:
  - "用户问续签还看不看上陆基准"
  - "用户问入境时的条件是否更新时也相关"
does_not_cover:
  - "具体资格的上陆基准细目"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-change-renewal-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html
    title: 在留資格の変更、在留期間の更新許可のガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留資格変更許可申請
  - 在留期間更新許可申請
direct_fact_fields:
  - landing_criteria_principally_checked_for_table1_2_and_4_on_change_renewal
ai_inferred_fields: []
needs_review_flags:
  - id: status_specific_landing_criteria_router
    reason: "Specific landing-criteria details must route to status-specific cards."
evidence_points:
  - claim: "The ISA guideline states that for statuses in Table 1 sections 2 and 4, change and renewal generally require conformity with the landing criteria prescribed by Ministry of Justice ordinance."
    source_title: "在留資格の変更、在留期間の更新許可のガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2 法務省令で定める上陸許可基準等に適合していること"
    display_label: "変更・更新でも一部資格は上陸基準適合を原則確認"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 変更・更新 — 一部資格では上陸許可基準も原則確認される

## current_date_logic

Checked against the current ISA guideline on 2026-05-12.

## current_effective_fact

入管法別表第一の二の表または四の表に掲げる在留資格については、在留資格変更および在留期間更新でも、原則として上陸許可基準への適合が求められる。

## exceptions_or_transition

- すべての在留資格に同じ形で適用されるとは書かない。
- 具体的な資格ごとの基準は Cycle 2 の上陸基準カードにルーティングする。

## common_user_phrases

- 续签还看上陆基准吗
- 变更也要符合上陆基准吗
- 更新 技人国 上陆基准
- 换签 经管 新基准
- 入境条件 续签也要看吗
- 上陆许可基准 更新变更

## must_say

- 一部資格では変更・更新でも上陸基準適合が原則求められる。
- 具体的基準は資格別カードで確認する。

## must_not_say

- 上陆基准只在第一次入境时看。
- 所有资格都完全同样处理。

## qa_cases

### QA-1

**user**: 经管续签还看新的上陆基准吗？

**must_have**:

- 更新也可能看上陆基准
- 需转到经营管理具体卡和过渡规则

**must_not_have**:

- 续签完全不看基准

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-009 |
