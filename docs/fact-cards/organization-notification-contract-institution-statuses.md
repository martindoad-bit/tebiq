---
fact_id: organization-notification-contract-institution-statuses
title: 所属機関届出 — 契約機関を届け出る在留資格グループ
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 3
citation_label: "契約機関届出の対象資格"
citation_summary: "ISA Q&A は、技術・人文知識・国際業務、介護、技能、特定技能などを契約機関に関する届出の対象グループとして列挙している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-032
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "所属機関、配偶者に関する届出：B グループ"
  claim_type: procedure_actor_scope
  applicable_statuses:
    - "高度専門職1号イ"
    - "高度専門職1号ロ"
    - "高度専門職2号イ"
    - "高度専門職2号ロ"
    - "研究"
    - "技術・人文知識・国際業務"
    - "介護"
    - "興行"
    - "技能"
    - "特定技能"
  application_type:
    - notification
  exclusion_scope:
    - "活動機関グループ"
    - "配偶者関係届出"
  deep_water_candidate: false
applies_when:
  - "用户问技人国、特定技能、技能、介护等换工作是否届出"
does_not_cover:
  - "新工作是否符合在留资格活动范围"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-organization-notification-qa
    url: https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html
    title: 所属機関等に関する届出・所属機関による届出Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 所属機関に関する届出
direct_fact_fields:
  - contract_institution_notification_status_group
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA lists Highly Skilled Professional categories i/ro, Researcher, Engineer/Specialist in Humanities/International Services, Nursing Care, Entertainer, Skilled Labor, and Specified Skilled Worker in the contract institution notification group."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "B グループ"
    display_label: "契約機関届出：対象資格グループ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 契約機関を届け出る在留資格グループ

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

ISA Q&A は、高度専門職1号イ・ロ、2号イ・ロ、研究、技術・人文知識・国際業務、介護、興行、技能、特定技能を、契約機関に関する届出の対象グループとして整理している。

## exceptions_or_transition

- 技人国などでは、契約の相手方である本社・本店の名称を届け出る説明がある。
- 届出とは別に、新しい活動が現在の在留資格に該当するか確認が必要。

## common_user_phrases

- 技人国 転職 14日 届出
- 技人国 所属機関 届出
- 特定技能 会社変わった 届出
- 介護ビザ 転職 届出
- 技能ビザ 契約機関 届出
- 契約機関 届出 対象資格

## must_say

- 技人国や特定技能などは契約機関届出グループに含まれる。
- 届出と在留資格該当性の確認は別問題。

## must_not_say

- 技人国で転職しても何もしなくてよい。
- 届出だけで新しい仕事が必ず認められる。

## qa_cases

### QA-1

**user**: 技人国で転職したら14日届出が必要ですか？

**must_have**:

- 技人国は契約機関届出グループ
- 新しい仕事内容の在留資格該当性は別途確認

**must_not_have**:

- 届出だけで転職先の審査は不要

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-032 |
