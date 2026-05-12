---
fact_id: permanent-residence-understanding-letter-required
title: 永住許可申請 — 了解書は2021年10月1日から提出資料
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 2
citation_label: "永住申請では了解書が提出資料"
citation_summary: "ISA の就労資格者等向け永住許可申請ページは、2021年10月1日から永住許可申請に了解書の提出が必要になったと示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-024
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "永住許可申請（就労資格者等向け）"
  source_locator: "15"
  claim_type: materials_boundary
  applicable_statuses:
    - "permanent_residence_applicant"
  application_type:
    - permanent_residence
  exclusion_scope:
    - "了解書本文の法的効果の個別解釈"
    - "了解書提出による許可保証"
  deep_water_candidate: false
applies_when:
  - "用户问永住了解书是什么、是否需要提交"
does_not_cover:
  - "了解書本文の解釈や永住許可後の取消制度の詳細"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: moj-isa-pr-work-materials
    url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    title: 永住許可申請３
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - 就労資格者等向け永住許可申請
direct_fact_fields:
  - permanent_residence_understanding_letter_required
ai_inferred_fields: []
needs_review_flags:
  - id: understanding_letter_content_not_parsed
    reason: "本カードは提出要否を扱い、了解書本文の法的効果は扱わない。"
evidence_points:
  - claim: "ISA は、2021年10月1日から永住許可申請に了解書の提出が必要になったと示している。"
    source_title: "永住許可申請３"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "15"
    display_label: "永住申請資料：了解書"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 永住許可申請 — 了解書は2021年10月1日から提出資料

## current_date_logic

Checked against the ISA permanent residence application page for work-status applicants on 2026-05-12.

## current_effective_fact

ISA は、2021年10月1日から永住許可申請に了解書の提出が必要になったと示している。就労資格者等向けページでは、日本語、やさしい日本語、英語、中国語簡体字、中国語繁体字など複数言語版のリンクが示されている。

## exceptions_or_transition

- このカードは了解書の提出要否を扱い、了解書本文の法的効果や永住許可後の取消制度の詳細は扱わない。

## common_user_phrases

- 永住 了解書
- 永住 了解书
- 永住 了解書 中国語
- 永住 2021 了解書
- 永住 了解書 必要
- 永住 了解書 是什么

## must_say

- 了解書は2021年10月1日から提出資料として示されている。
- 了解書の提出は許可保証ではない。

## must_not_say

- 了解書を出せば永住後の義務問題はなくなる。
- 了解書は任意資料だと断定する。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 2 legal-source card | — | ai_extracted | C4-024 |
