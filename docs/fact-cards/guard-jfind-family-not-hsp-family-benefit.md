---
fact_id: guard-jfind-family-not-hsp-family-benefit
title: "J-Find家族 — 高度専門職家族特例とは別"
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "J-Find家族: 高度専門職特例とは別"
citation_summary: "ISA の J-Find ページは未来創造人材制度を活用する者の配偶者・子の提出書類を分けている。高度専門職等の配偶者就労、親、家事使用人特例とは同一視しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-007
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動 未来創造人材 / 高度専門職優遇措置"
  source_locator: "J-Find page family materials / J-Skip benefits"
  claim_type: integration_boundary
  applicable_statuses:
    - "特定活動"
    - "高度専門職"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "J-Find家族の就労可否"
    - "配偶者・子以外の家族可否"
    - "J-Find本人の活動範囲判断"
  deep_water_candidate: true
official_sources:
  - id: isa-j-find
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities51.html
    title: 優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "J-Find家族に高度専門職等の家族優遇をそのまま当てている相談"
direct_fact_fields:
  - jfind_family_not_hsp_family_benefit
ai_inferred_fields: []
needs_review_flags:
  - id: jfind_family_scope_review
    reason: "J-Find家族の活動範囲と就労可否は、本人制度と申請類型に沿って確認する必要がある。"
evidence_points:
  - claim: "ISA の J-Find ページは、未来創造人材制度を活用する本人に必要な書類と、同制度を活用する者の配偶者・子に必要な書類を分けている。"
    source_title: "優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities51.html"
    source_organization: "出入国在留管理庁"
    source_locator: "提出書類"
    display_label: "J-Find: 配偶者・子"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の J-Skip ページは、高度専門職の優遇措置として配偶者の就労、親の帯同、家事使用人の雇用を説明している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "優遇措置"
    display_label: "J-Skip: 家族関連の優遇措置"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Find家族 — 高度専門職家族特例とは別

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

J-Find の家族は、未来創造人材制度を活用する者の配偶者・子として確認する。高度専門職等の配偶者就労、親、家事使用人の特例をそのまま当てない。

## exceptions_or_transition

- このカードは、J-Find家族の就労可否、配偶者・子以外の呼び寄せ可否、又は個別資料の十分性を判断しない。

## common_user_phrases

- J-Find 家族 高度専門職
- J-Find 配偶者 J-Skip
- 未来創造人材 家族 特別高度人材
- J-Find 带家属 工作
- J-Find 配偶者 子
- J-Find 父母 家事使用人

## must_say

- J-Find家族と高度専門職等の家族特例は別に確認する。
- J-Findページは配偶者・子の提出書類を分けて案内している。

## must_not_say

- J-Find家族にはJ-Skipの親・家事使用人優遇がそのまま使える。
- J-Find配偶者は高度専門職配偶者就労と同じ扱いでよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-007 |
