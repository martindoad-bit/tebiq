---
fact_id: j-skip-hsp2-and-pr-one-year-anchor
title: "J-Skip — 高度専門職2号移行と永住1年入口"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 1
citation_label: "J-Skip: 2号・永住1年"
citation_summary: "ISA は、特別高度人材の高度専門職2号について、高度専門職1号で1年以上活動していた人が移行できる在留資格と説明し、永住許可までに要する在留期間は1年となると案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-013
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "J-Skip 高度専門職2号・永住"
  source_locator: "高度専門職2号 / 永住許可までの在留期間"
  claim_type: transition_boundary
  applicable_statuses:
    - "高度専門職"
    - "永住者"
  application_type:
    - status_change
    - permanent_residence
  exclusion_scope:
    - "高度専門職2号への変更許可見込み"
    - "永住許可見込み"
    - "税・年金・素行等の審査判断"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip から高度専門職2号又は永住申請を聞く相談"
direct_fact_fields:
  - j_skip_hsp2_and_pr_one_year_anchor
ai_inferred_fields: []
needs_review_flags:
  - id: j_skip_pr_hsp2_review
    reason: "2号変更と永住許可は別手続であり、個別要件と資料を確認する必要がある。"
evidence_points:
  - claim: "ISA は、特別高度人材の高度専門職2号について、高度専門職1号で1年以上活動していた人が移行できる在留資格と説明し、永住許可までに要する在留期間は1年となると案内している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "高度専門職2号 / 永住許可までの在留期間"
    display_label: "J-Skip: 2号・永住1年"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip — 高度専門職2号移行と永住1年入口

## current_date_logic

Checked against the ISA J-Skip page on 2026-05-12.

## current_effective_fact

ISA は、特別高度人材の高度専門職2号について、高度専門職1号で1年以上活動していた人が移行できる在留資格と説明し、永住許可までに要する在留期間は1年となると案内している。

## exceptions_or_transition

- このカードは、高度専門職2号への変更可否や永住許可見込みを判断しない。

## common_user_phrases

- J-Skip 永住 1年
- 特別高度人材 永住 一年
- J-Skip 高度専門職2号 1年
- J-Skip 2号 移行
- J-Skip 永住 すぐ
- 特別高度人材 高度専門職2号

## must_say

- J-Skip の2号移行と永住1年入口は、別手続として確認する。
- 永住許可には税・年金・素行など他要件もある。

## must_not_say

- J-Skip なら1年で自動的に永住者になる。
- J-Skip なら必ず高度専門職2号へ移行できる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-013 |
