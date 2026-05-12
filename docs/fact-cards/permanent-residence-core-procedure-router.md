---
fact_id: permanent-residence-core-procedure-router
title: 永住関連手続 — 永住許可・在留カード更新・在留期間更新を分ける
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 5
citation_label: "永住関連手続の区別"
citation_summary: "ISA の永住許可申請ページ、在留カード有効期間更新ページ、入管法上の在留期間更新制度は、それぞれ永住許可、カード有効期間更新、現在の在留期間更新という別の入口である。"
source_display_names:
  - "出入国在留管理庁"
  - "e-Gov 法令検索"
legal_source:
  candidate_id: C4-065
  authority_layer: L1 Law / L4 ISA Procedure Page
  legal_source_type: statute_isa_pages
  law_article_ref: "入管法第21条 / 第19条の11 / 第22条"
  source_locator: "永住許可申請 / 在留カード有効期間更新 / 在留期間更新"
  claim_type: disambiguation
  applicable_statuses:
    - "permanent_resident"
    - "current_residence_status_holder"
  application_type:
    - permanent_residence
    - resident_card_validity_renewal
    - period_renewal
  exclusion_scope:
    - "具体的な申請可否"
    - "永住審査結果の予測"
  deep_water_candidate: true
applies_when:
  - "用户把永住申请、永住卡更新、当前签证续签混在一起问"
does_not_cover:
  - "个案该优先办哪个手续"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 3
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-application-employed
    url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    title: 永住許可申請（就労関係の在留資格）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-card-validity-renewal
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
    title: 在留カードの有効期間の更新申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住許可申請者
  - 永住者
  - 在留期間更新対象者
direct_fact_fields:
  - permanent_residence_core_procedure_router
ai_inferred_fields: []
needs_review_flags:
  - id: procedure_priority_requires_review
    reason: "複数手続が同時に関係する場合の優先順位や期限管理は個別確認が必要。"
evidence_points:
  - claim: "永住許可申請、在留カードの有効期間更新、現在の在留期間更新は、それぞれ別の手続入口として扱う。"
    source_title: "永住許可申請（就労関係の在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "手続名及び申請書類案内"
    display_label: "永住関連手続：別入口"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住関連手続 — 永住許可・在留カード更新・在留期間更新を分ける

## current_date_logic

Checked against ISA procedure pages and current law text on 2026-05-12.

## current_effective_fact

ISA の永住許可申請ページ、在留カード有効期間更新ページ、入管法上の在留期間更新制度は、それぞれ永住許可、カード有効期間更新、現在の在留期間更新という別の入口である。

## exceptions_or_transition

- 永住申請中でも現在の在留資格の期限管理は別に必要。
- 永住者の在留カード更新は、永住許可申請のやり直しではない。

## common_user_phrases

- 永住申請 在留カード更新 在留期間更新 違い
- 永住申请 续签 永住卡更新 区别
- 永住申請中 现在签证快到期
- 永住カード更新 永住申請 違う
- 永住 更新 どの手続
- 永住许可 在留期间更新 在留卡更新

## must_say

- 永住許可、在留カード更新、在留期間更新を分ける。
- 永住申請は現在の在留期限管理を自動で置き換えない。

## must_not_say

- 永住申請を出せば現在の更新は不要。
- 永住カード更新は永住許可の再審査。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 5 integration card | — | ai_extracted | C4-065 |
