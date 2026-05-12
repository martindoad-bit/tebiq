---
fact_id: permanent-resident-card-renewal-early-application-exception
title: 永住者在留カード更新 — 長期海外滞在等で期間前申請できる場合
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 4
citation_label: "カード更新の期間前申請例外"
citation_summary: "ISA は、出張や留学のため長期間本邦外で生活し申請期間内に再入国できないなど、やむを得ない理由により申請期間内の申請が困難と認められる場合は、申請期間前でも在留カード有効期間更新を申請できるとしている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-055
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "入管法第19条の11第2項"
  source_locator: "申請期間 3"
  claim_type: exception_boundary
  applicable_statuses:
    - "permanent_resident"
    - "highly_skilled_professional_2"
    - "mid_long_term_resident_under_16"
  application_type:
    - resident_card_validity_renewal
    - reentry
  exclusion_scope:
    - "長期出国の再入国許可要否"
    - "期間前申請が認められるかの個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问永住卡更新期间在海外、能不能提前办"
does_not_cover:
  - "長期出国時の再入国許可の要否"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-card-validity-renewal
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html
    title: 在留カードの有効期間の更新申請
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 在留カード有効期間更新対象者
direct_fact_fields:
  - permanent_resident_card_renewal_early_application_exception
ai_inferred_fields: []
needs_review_flags:
  - id: unavoidable_reason_requires_review
    reason: "申請期間前の申請が認められるかは事情資料と入管確認が必要。"
evidence_points:
  - claim: "ISA は、出張や留学のため長期間本邦外で生活し申請期間内に再入国できないなど、やむを得ない理由により申請期間内の申請が困難と認められる場合は、申請期間前でも在留カード有効期間更新を申請できるとしている。"
    source_title: "在留カードの有効期間の更新申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請期間 3"
    display_label: "カード更新：やむを得ない場合の期間前申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 永住者在留カード更新 — 長期海外滞在等で期間前申請できる場合

## current_date_logic

Checked against the ISA procedure page on 2026-05-12.

## current_effective_fact

ISA は、出張や留学のため長期間本邦外で生活し申請期間内に再入国できないなど、やむを得ない理由により申請期間内の申請が困難と認められる場合は、申請期間前でも在留カード有効期間更新を申請できるとしている。

## exceptions_or_transition

- 早期申請の可否は、理由と資料を確認する。
- 長期出国そのものには再入国許可・みなし再入国の期限確認が必要。

## common_user_phrases

- 永住カード 更新 海外 出張
- 在留カード更新 期間前 申請
- 長期出国 永住カード 更新
- 留学中 在留カード 期限
- 永住卡到期时人在海外
- 2ヶ月前より早く 更新
- 永住カード 更新 早め 長期海外出張

## must_say

- やむを得ない理由がある場合は、申請期間前でも申請できる場合がある。
- 長期出国では再入国許可の期限も別に確認する。

## must_not_say

- いつでも自由に前倒し更新できる。
- カード更新だけで長期出国の在留資格リスクが解決する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 4 legal-source card | — | ai_extracted | C4-055 |
