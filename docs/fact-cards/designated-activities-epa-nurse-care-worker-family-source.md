---
fact_id: designated-activities-epa-nurse-care-worker-family-source
title: "特定活動 — EPA 看護師・介護福祉士及び家族"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 5
citation_label: "特定活動: EPA 看護・介護"
citation_summary: "ISA は特定活動の一類型として、EPA 看護師・介護福祉士及び候補者、並びにその家族のページを設けている。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-002
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: EPA 看護師・介護福祉士及び家族"
  source_locator: "2つの EPA 関連ページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "特定活動"
  application_type:
    - status_identification
  exclusion_scope:
    - "EPA 対象国の判断"
    - "資格取得状況の判断"
    - "家族範囲の判断"
  deep_water_candidate: true
official_sources:
  - id: isa-designated-epa-main
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities04.html
    title: 在留資格「特定活動」（EPA看護師、EPA介護福祉士及びそれらの候補者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
  - id: isa-designated-epa-family
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities05.html
    title: 在留資格「特定活動」（EPA看護師・EPA介護福祉士の家族）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "EPA 看護師・介護福祉士又は候補者、家族として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_epa_nurse_care_worker_family_source
ai_inferred_fields: []
needs_review_flags:
  - id: epa_status_needs_review
    reason: "EPA 協定、候補者、資格取得後、家族の範囲は個別確認が必要。"
evidence_points:
  - claim: "ISA は EPA 看護師・介護福祉士及び候補者と、その家族について、別々の特定活動ページを設けている。"
    source_title: "EPA 看護師・介護福祉士関連の特定活動ページ"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities04.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: EPA 看護・介護"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — EPA 看護師・介護福祉士及び家族

## current_date_logic

Checked against the ISA status pages on 2026-05-12.

## current_effective_fact

ISA は EPA 看護師・介護福祉士及び候補者と、その家族について、特定活動の個別ページを設けている。

## exceptions_or_transition

- このカードは、EPA 対象国、資格取得状況、候補者期間、家族範囲を判断しない。

## common_user_phrases

- EPA 看護師 特定活動
- EPA 介護福祉士 特定活動
- EPA 候補者 ビザ
- EPA 家族 特定活動
- 看護師 候補者 家族 ビザ
- 介護福祉士 候補者 在留資格

## must_say

- EPA 看護・介護関係は、通常の介護ビザや一般の特定活動と分けて確認する。
- 家族は EPA 本人の類型と別に確認する。

## must_not_say

- EPA 関係者はすべて同じ条件で滞在できる。
- 介護の仕事なら一律に EPA 特定活動になる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-002 |
