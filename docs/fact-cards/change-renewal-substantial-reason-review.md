---
fact_id: change-renewal-substantial-reason-review
title: 変更・更新 — 相当の理由は総合判断され許可保証ではない
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
citation_label: "変更・更新は相当の理由を総合判断"
citation_summary: "ISA ガイドラインは、在留資格変更・在留期間更新が相当の理由の総合判断であり、代表的考慮要素に該当しても必ず許可されるとは限らないと説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-008
  authority_layer: L4 ISA Guideline
  legal_source_type: official_guideline
  law_article_ref: "入管法第20条 / 第21条"
  source_locator: "在留資格の変更、在留期間の更新許可のガイドライン：冒頭説明"
  claim_type: permission_boundary
  applicable_statuses:
    - "all"
  application_type:
    - change
    - renewal
  exclusion_scope:
    - "許可確率"
    - "個別審査結果"
  deep_water_candidate: true
applies_when:
  - "用户问材料齐了是否一定过"
  - "用户问更新或变更是否保证许可"
does_not_cover:
  - "个案许可概率"
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
  - change_renewal_substantial_reason_holistic_review
  - representative_factors_do_not_guarantee_permission
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "The ISA guideline frames change and renewal permission around a holistic assessment of sufficient reason, and states that matching representative factors does not by itself guarantee permission."
    source_title: "在留資格の変更、在留期間の更新許可のガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html"
    source_organization: "出入国在留管理庁"
    source_locator: "冒頭説明"
    display_label: "変更・更新：相当の理由を総合判断"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 変更・更新 — 相当の理由は総合判断され許可保証ではない

## current_date_logic

Checked against the current ISA guideline on 2026-05-12.

## current_effective_fact

在留資格変更・在留期間更新は、相当の理由があるかを在留状況、活動、在留の必要性などから総合的に判断する手続であり、代表的な考慮要素を満たすことだけで許可が保証されるわけではない。

## exceptions_or_transition

- 具体的な不許可可能性や補強資料は個別判断。
- このカードは「条件を満たしても絶対不可」とも言わない。

## common_user_phrases

- 材料齐了是不是一定续签
- 更新一定过吗
- 变更一定许可吗
- 相当の理由 总合判断
- 续签许可保证
- 换签材料齐全 必过

## must_say

- 変更・更新は総合判断。
- 代表的要素を満たしても許可保証ではない。

## must_not_say

- 材料齐就一定过。
- 条件有一个不满足就必定不许可。
- 本卡能预测许可概率。

## qa_cases

### QA-1

**user**: 材料都齐了，续签是不是一定下来？

**must_have**:

- 不是许可保证
- 还会综合看在留状况等

**must_not_have**:

- 一定获批

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-008 |
