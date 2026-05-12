---
fact_id: organization-notification-activity-institution-statuses
title: 所属機関届出 — 活動機関を届け出る在留資格グループ
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
citation_label: "活動機関届出の対象資格"
citation_summary: "ISA Q&A は、教授、経営・管理、企業内転勤、留学などを活動機関に関する届出の対象グループとして列挙している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-031
  authority_layer: L4 ISA Q&A
  legal_source_type: official_qa
  law_article_ref: "入管法第19条の16"
  source_locator: "所属機関、配偶者に関する届出：A グループ"
  claim_type: procedure_actor_scope
  applicable_statuses:
    - "教授"
    - "高度専門職1号ハ"
    - "高度専門職2号ハ"
    - "経営・管理"
    - "法律・会計業務"
    - "医療"
    - "教育"
    - "企業内転勤"
    - "技能実習"
    - "留学"
    - "研修"
  application_type:
    - notification
  exclusion_scope:
    - "契約機関グループ"
    - "配偶者関係届出"
  deep_water_candidate: false
applies_when:
  - "用户问经管、留学、教育、企业内转勤等是否有所属机构届出"
does_not_cover:
  - "届出是否足以维持在留资格"
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
  - activity_institution_notification_status_group
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA lists Professor, Highly Skilled Professional categories ha, Business Manager, Legal/Accounting Services, Medical Services, Instructor, Intra-company Transferee, Technical Intern Training, Student, and Trainee in the activity institution notification group."
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "A グループ"
    display_label: "活動機関届出：対象資格グループ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 所属機関届出 — 活動機関を届け出る在留資格グループ

## current_date_logic

Checked against the current ISA Q&A page on 2026-05-12.

## current_effective_fact

ISA Q&A は、教授、高度専門職1号ハ・2号ハ、経営・管理、法律・会計業務、医療、教育、企業内転勤、技能実習、留学、研修を、活動機関に関する届出の対象グループとして整理している。

## exceptions_or_transition

- 同じ「所属機関」でも、在留資格によって活動機関グループ、契約機関グループ、配偶者関係グループに分かれる。
- 届出対象かどうかは、現在の在留資格を確認して判断する。

## common_user_phrases

- 経営管理 所属機関 届出
- 留学 所属機関 届出
- 教育ビザ 所属機関 14日
- 企業内転勤 所属機関変更 届出
- 技能実習 実習先 離脱 届出
- 活動機関 届出 対象資格

## must_say

- 活動機関届出の対象となる資格グループがある。
- 自分の在留資格がどのグループかを先に確認する。

## must_not_say

- 全ての外国人が同じ所属機関届出をする。
- 届出を出せば在留資格の問題がすべて解決する。

## qa_cases

### QA-1

**user**: 経営管理で会社が変わったら14日届出の対象ですか？

**must_have**:

- 経営・管理は活動機関届出グループ
- 具体的な変更内容も確認

**must_not_have**:

- どの変更でも同じ手続だけで足りる

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 3 legal-source card | — | ai_extracted | C3-031 |
