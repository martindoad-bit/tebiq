---
fact_id: ssw-submitter-identity-proof-source
title: "特定技能 — 本人以外が提出する場合は提出者の身分確認も見る"
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 3
citation_label: "特定技能: 本人以外の提出"
citation_summary: "ISA の特定技能ページは、申請人本人以外が申請書類を提出する場合、提出できる方かどうかを確認するため、身分を証する文書の提示が必要と案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-018
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定技能 申請書類提出者"
  source_locator: "認定・変更・更新の提出書類一覧表後の注意"
  claim_type: submitter_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "申請取次資格の判断"
    - "代理提出者の個別適格性"
    - "提出書類本体の充足性"
  deep_water_candidate: false
official_sources:
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "本人以外が特定技能の申請書類を提出できるかを聞く相談"
direct_fact_fields:
  - ssw_submitter_identity_proof
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_submitter_scope_review
    reason: "誰が提出できるかは申請取次制度や個別関係の確認が必要。"
evidence_points:
  - claim: "ISA は、申請人本人以外が申請書類を提出する場合、提出できる方かどうかを確認するため、提出する方の身分を証明する文書の提示が必要と案内している。"
    source_title: "在留資格「特定技能」"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "提出書類一覧表後の注意"
    display_label: "特定技能: 本人以外の提出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定技能 — 本人以外が提出する場合は提出者の身分確認も見る

## current_date_logic

Checked against the ISA SSW status page on 2026-05-13.

## current_effective_fact

特定技能の申請書類を申請人本人以外が提出する場合、提出できる方かどうかを確認するため、提出者の身分を証する文書の提示が必要と案内されている。

## exceptions_or_transition

- 誰が提出できるかは、申請取次制度や個別関係を確認する。

## common_user_phrases

- 特定技能 本人以外 提出 身分証明
- 特定技能 会社が申請書類 提出
- 特定技能 代理 提出 戸籍謄本
- 特定技能 申請取次者証明書
- 特定技能 提出者 身分確認
- 特定技能 submitter identity document

## must_say

- 本人以外が提出する場合は、提出者の身分を証する文書も確認する。

## must_not_say

- 誰でも本人の代わりに提出でき、身分確認は不要。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-018 |
