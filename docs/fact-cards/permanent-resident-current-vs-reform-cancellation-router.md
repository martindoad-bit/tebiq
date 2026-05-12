---
fact_id: permanent-resident-current-vs-reform-cancellation-router
title: 永住者取消 — 現行の取消入口と制度適正化Q&Aを分ける
state: ai_extracted
risk_level: critical
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 5
citation_label: "現行取消と制度適正化説明の区別"
citation_summary: "ISA は現行制度でも永住者が取消制度や退去強制制度等の在留管理対象であると説明し、別途、永住許可制度の適正化 Q&A で改正後の取消事由や職権変更を説明している。現行入口と改正説明を混同しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-068
  authority_layer: L4 ISA FAQ / L4 ISA Procedure Page
  legal_source_type: official_faq_procedure_page
  law_article_ref: "永住許可制度の適正化Q&A / 入管法第22条の4"
  source_locator: "Q1・Q3・Q12・Q15 / 在留資格取消"
  claim_type: cancellation_boundary
  applicable_statuses:
    - "permanent_resident"
  application_type:
    - cancellation
    - status_change
  exclusion_scope:
    - "改正後条文の施行日確定"
    - "個別取消や職権変更の可能性判断"
  deep_water_candidate: true
applies_when:
  - "用户问永住会不会因新制度、欠税、犯罪、义务违反被取消"
does_not_cover:
  - "改正后具体生效和个案处理"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-system-qa
    url: https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html
    title: 永住許可制度の適正化Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し（入管法第22条の4）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 永住者
direct_fact_fields:
  - permanent_resident_current_vs_reform_cancellation_router
ai_inferred_fields:
  - reform_effective_date_needs_confirm
needs_review_flags:
  - id: reform_effective_date_and_scope_review
    reason: "永住許可制度適正化の改正後条文・施行日・個別運用はDOMAIN確認が必要。"
evidence_points:
  - claim: "ISA は現行制度でも永住者が取消制度や退去強制制度等の在留管理対象であると説明し、別途、永住許可制度の適正化 Q&A で改正後の取消事由や職権変更を説明している。現行入口と改正説明を混同しない。"
    source_title: "永住許可制度の適正化Q&A"
    source_url: "https://www.moj.go.jp/isa/immigration/faq/kanri_qa_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q1・Q3・Q12・Q15"
    display_label: "永住者取消：現行入口と制度適正化説明"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者取消 — 現行の取消入口と制度適正化Q&Aを分ける

## current_date_logic

Checked against ISA cancellation guidance and permanent-residence-system Q&A on 2026-05-12. Effective-date handling still requires review before promotion.

## current_effective_fact

ISA は現行制度でも永住者が取消制度や退去強制制度等の在留管理対象であると説明し、別途、永住許可制度の適正化 Q&A で改正後の取消事由や職権変更を説明している。現行入口と改正説明を混同しない。

## exceptions_or_transition

- 改正後制度の施行日と個別運用は確認が必要。
- 欠税、犯罪、義務違反を一律の取消結論にしない。

## common_user_phrases

- 永住 现行 取消 新制度 区别
- 永住者取消 改正後 現行
- 永住 欠税 取消 新制度
- 永住 職権変更 定住者 新制度
- 永住制度適正化 取消 現行
- 永住者 取消 现行法

## must_say

- 現行の取消入口と制度適正化Q&Aの説明を分ける。
- 改正後の取消や職権変更は個別確認が必要。

## must_not_say

- 新制度の説明をすべて現時点の確定処理として断定する。
- 欠税や義務違反なら必ず永住取消。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 5 integration card | — | ai_extracted | C4-068 |
