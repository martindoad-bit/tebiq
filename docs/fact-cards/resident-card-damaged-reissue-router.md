---
fact_id: resident-card-damaged-reissue-router
title: 在留カード汚損等再交付 — 汚損・毀損・IC記録毀損
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "在留カード汚損等再交付は紛失再交付とは別入口"
citation_summary: "ISA は、在留カードが著しく毀損・汚損し、又はIC記録が毀損した中長期在留者を、汚損等による在留カード再交付申請の対象としている。期間の定めはないが、再交付申請命令を受けた場合は命令日から14日以内としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-099
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の13第1項前段及び第3項"
  source_locator: "手続対象者・申請期間"
  claim_type: procedure_router
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - application
  exclusion_scope:
    - "紛失等による在留カード再交付"
    - "交換希望による在留カード再交付"
  deep_water_candidate: false
applies_when:
  - "用户问在留卡破损、污损、IC读不出时怎么办"
does_not_cover:
  - "在留卡单纯想换新、想换照片的交换希望"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-damaged-reissue
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00012.html
    title: 汚損等による在留カードの再交付申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - resident_card_damaged_reissue_scope
  - resident_card_damaged_reissue_order_14_days
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA identifies mid- to long-term residents whose residence card is seriously damaged, soiled, or whose IC record is damaged as targets of this application. There is no fixed application period, except that an application order must be followed within 14 days."
    source_title: "汚損等による在留カードの再交付申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00012.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続対象者・申請期間"
    display_label: "汚損等再交付：命令時は14日以内"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 在留カード汚損等再交付 — 汚損・毀損・IC記録毀損

## current_date_logic

Checked against the current ISA procedure page on 2026-05-12.

## current_effective_fact

在留カードが著しく毀損・汚損し、又はIC記録が毀損した中長期在留者は、汚損等による在留カード再交付申請の対象。申請期間の定めはないが、再交付申請命令を受けた場合は命令を受けた日から14日以内。

## exceptions_or_transition

- 紛失・盗難による再交付とは別入口。
- 単なる交換希望による再交付とも別入口。

## common_user_phrases

- 在留カード 汚損 再交付
- 在留カード 破損 再交付
- 在留カード IC 読めない
- 在留カード 毀損 14日
- 在留卡 损坏 补办
- 在留卡 IC坏了
- 在留カード 再交付申請命令 14日

## must_say

- 著しい毀損・汚損・IC記録毀損は汚損等再交付の入口。
- 再交付申請命令を受けた場合は命令日から14日以内。

## must_not_say

- 汚損でも紛失扱いとして警察届出が必須と言う。
- 単なる交換希望と同じと断定する。

## qa_cases

### QA-1

**user**: 在留カードのICが読めません。紛失扱いですか？

**must_have**:

- 汚損等再交付
- 紛失再交付とは別入口

**must_not_have**:

- 警察届出が必須

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-099 |
