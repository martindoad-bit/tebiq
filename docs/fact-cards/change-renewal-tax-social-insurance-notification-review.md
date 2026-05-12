---
fact_id: change-renewal-tax-social-insurance-notification-review
title: 変更・更新 — 税・社会保険・届出義務は審査上の考慮要素
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
citation_label: "税・社会保険・届出義務は変更・更新の考慮要素"
citation_summary: "ISA ガイドラインは、納税義務、法令上納付する保険料、入管法上の届出等の義務履行を変更・更新審査の考慮要素として説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-010
  authority_layer: L4 ISA Guideline
  legal_source_type: official_guideline
  law_article_ref: "入管法第20条 / 第21条 / 第19条の7-16"
  source_locator: "在留資格の変更、在留期間の更新許可のガイドライン：7・8"
  claim_type: review_factor
  applicable_statuses:
    - "all"
  application_type:
    - change
    - renewal
  exclusion_scope:
    - "不許可断定"
    - "税額・保険料の個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问税金、社保、届出漏れ会不会影响续签"
  - "用户问14天届出没做是否必然不许可"
does_not_cover:
  - "具体欠税、欠缴、迟报的结果判断"
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
  - tax_obligation_review_factor
  - social_insurance_payment_review_factor
  - immigration_notification_obligation_review_factor
ai_inferred_fields: []
needs_review_flags:
  - id: individual_nonpayment_or_late_notification_consequence
    reason: "The card only captures review-factor status; individual consequence requires DOMAIN review."
evidence_points:
  - claim: "The ISA guideline lists tax obligations, legally required insurance payments, and Immigration Act notification duties as matters considered in change and renewal review."
    source_title: "在留資格の変更、在留期間の更新許可のガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html"
    source_organization: "出入国在留管理庁"
    source_locator: "7 納税義務等; 8 入管法に定める届出等の義務"
    display_label: "変更・更新：税・保険料・届出義務の履行を考慮"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 変更・更新 — 税・社会保険・届出義務は審査上の考慮要素

## current_date_logic

Checked against the current ISA guideline on 2026-05-12.

## current_effective_fact

在留資格変更・在留期間更新では、納税義務、法令上納付する保険料、入管法上の届出等の義務の履行が審査上の考慮要素として扱われる。

## exceptions_or_transition

- 滞納や届出漏れがあれば必ず不許可、とは書かない。
- 高額・長期・悪質性などの評価は個別確認が必要。

## common_user_phrases

- 住民税未纳会影响续签吗
- 社会保险没交会影响更新吗
- 14天届出忘了 续签
- 税金 社保 届出 变更审查
- 纳税义务 续签影响
- 入管届出义务 更新

## must_say

- 税、保険料、入管届出義務の履行は変更・更新で見られる要素。
- 個別にどの程度影響するかは、金額、期間、理由、修正状況で確認が必要。

## must_not_say

- 一次迟交就必定不许可。
- 税社保和届出完全不影响签证。

## qa_cases

### QA-1

**user**: 住民税晚交了，续签是不是完了？

**must_have**:

- 税务履行是考量因素
- 不直接断定必然不许可

**must_not_have**:

- 必定拒签

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 1 legal-source card | — | ai_extracted | C3-010 |
