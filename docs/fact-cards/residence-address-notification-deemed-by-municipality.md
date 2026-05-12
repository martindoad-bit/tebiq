---
fact_id: residence-address-notification-deemed-by-municipality
title: 住居地届出 — 市区町村での届出によるみなし届出
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 3 / Batch 4
citation_label: "在留カードを持って市区町村で届出すれば住居地届出とみなされる"
citation_summary: "ISA は、在留カードを市区町村の窓口に持参して住民基本台帳法上の届出を行った場合、住居地届出をしたものとみなされ、住居地届出書の提出は不要としている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C3-088
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の8・第19条の9"
  source_locator: "ページ冒頭のみなし届出注記"
  claim_type: procedure_method
  applicable_statuses:
    - "mid_long_term_resident"
  application_type:
    - notification
  exclusion_scope:
    - "住居地以外の在留カード記載事項変更"
  deep_water_candidate: false
applies_when:
  - "用户问区役所改地址后是否还要另去入管提交住居地届出书"
does_not_cover:
  - "氏名、国籍、性别、出生日期等非地址项目变更"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official ISA source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-address-change-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html
    title: 住居地の変更届出（中長期在留者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-new-address-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html
    title: 在留資格変更等に伴う住居地の届出（中長期在留者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 中長期在留者
direct_fact_fields:
  - municipality_deemed_residence_notification
ai_inferred_fields: []
needs_review_flags: []
evidence_points:
  - claim: "ISA states that bringing the residence card to the municipal office and making the relevant Basic Resident Register notification is deemed to be the residence notification, so the separate residence notification form is not required."
    source_title: "住居地の変更届出（中長期在留者）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ冒頭のみなし届出注記"
    display_label: "市区町村での届出は住居地届出とみなされる"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 住居地届出 — 市区町村での届出によるみなし届出

## current_date_logic

Checked against the current ISA procedure pages on 2026-05-12.

## current_effective_fact

在留カードを市区町村の窓口に持参して住民基本台帳法上の届出を行った場合、入管法上の住居地届出を行ったものとみなされ、住居地届出書の提出は不要。

## exceptions_or_transition

- 住居地以外の在留カード記載事項変更には使えない。
- 在留カードを持参することが前提。

## common_user_phrases

- 区役所で住所変更したら入管も必要
- 市役所で住所変更 入管 不要
- 在留カード 市区町村 みなし届出
- 住居地届出書 提出不要
- 搬家后 区役所 改地址 还要去入管吗
- 转入届 自动通知入管
- 在留カード 持参 市区町村 住所変更

## must_say

- 在留カードを市区町村窓口に持参して所定の届出をすれば、住居地届出をしたものとみなされる。
- その場合、別途の住居地届出書は不要。

## must_not_say

- 在留カードなしでもみなし届出になる。
- 氏名や国籍変更まで市区町村だけで完了する。

## qa_cases

### QA-1

**user**: 区役所で住所変更したら入管にも出しますか？

**must_have**:

- 在留カードを持って市区町村で届出
- 住居地届出とみなされる
- 住居地届出書は不要

**must_not_have**:

- 必ず別途入管へ住居地届出書

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
| 2026-05-12 | Codex | Initial Cycle 3 Batch 4 legal-source card | — | ai_extracted | C3-088 |
