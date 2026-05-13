---
fact_id: guard-hsp1-institution-change-not-14day-only
title: "高度専門職1号転職 — 14日届出だけで終わらせない"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "高度専門職1号転職: 変更申請注意"
citation_summary: "ISA の所属機関Q&Aは、高度専門職1号では所属機関が指定されるため、転職して所属機関が変わる場合は在留資格変更許可申請が必要と説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-012
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "所属機関等に関する届出 / 高度専門職1号"
  source_locator: "所属機関等Q&A Q27"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職1号"
  application_type:
    - notification
    - status-change
  exclusion_scope:
    - "転職先で働ける時期"
    - "在留資格変更許可の見込み"
    - "届出提出要否の個別判断"
  deep_water_candidate: true
official_sources:
  - id: isa-organization-notification-qa
    url: https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html
    title: 所属機関等に関する届出・所属機関による届出Q&A
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-hsp-status
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html
    title: 在留資格「高度専門職」（高度人材ポイント制）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度専門職1号の転職を普通の14日届出だけで説明している相談"
direct_fact_fields:
  - hsp1_institution_change_not_14day_only
ai_inferred_fields: []
needs_review_flags:
  - id: hsp1_job_change_review
    reason: "所属機関変更、活動内容、届出、変更申請の順序と就労開始時期は個別確認が必要。"
evidence_points:
  - claim: "ISA の所属機関Q&Aは、高度専門職1号では所属機関が法務大臣によって指定されるため、転職して所属機関が変わる場合は在留資格変更許可申請が必要と説明している。"
    source_title: "所属機関等に関する届出・所属機関による届出Q&A"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/shozokunikansuru_00001.html"
    source_organization: "出入国在留管理庁"
    source_locator: "Q27"
    display_label: "高度専門職1号転職: 変更申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の高度専門職ページも、高度専門職1号で在留中の人が所属機関変更を含め活動内容を変更する場合、在留資格変更許可申請が必要であると注意している。"
    source_title: "在留資格「高度専門職」（高度人材ポイント制）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留資格変更許可申請"
    display_label: "高度専門職1号: 所属機関変更"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職1号転職 — 14日届出だけで終わらせない

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

高度専門職1号で転職して所属機関が変わる場合は、普通の14日届出だけで終わらせず、在留資格変更許可申請の要否を確認する。

## exceptions_or_transition

- このカードは、転職先でいつ働けるか、届出と変更申請の順序、又は許可見込みを判断しない。

## common_user_phrases

- 高度専門職 転職 14日届出
- 高度人材 转职 14天
- 高度専門職 所属機関 変更 届出だけ
- HSP1 job change notification
- 高度専門職1号 転職 在留資格変更
- J-Skip 転職 14日

## must_say

- 高度専門職1号は所属機関が指定されるため、転職時は変更申請の要否を確認する。
- 普通の14日届出だけで足りると断定しない。

## must_not_say

- 高度専門職1号の転職は14日届出だけで必ずよい。
- 届出を出せば新しい所属機関で当然に活動できる。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-012 |
