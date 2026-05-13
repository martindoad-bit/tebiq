---
fact_id: guard-hsp2-activity-scope-not-pr-freedom
title: "高度専門職2号の活動範囲 — 永住者の自由とは別"
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
citation_label: "高度専門職2号: 活動範囲の混同防止"
citation_summary: "ISA は高度専門職2号について、高度専門職1号の活動と併せてほぼ全ての就労資格の活動を行えると説明している。永住者の地位や活動自由と同一視しない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-018
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "高度専門職2号 / 永住者"
  source_locator: "高度専門職2号の優遇措置"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職2号"
    - "永住者"
  application_type:
    - current-status
    - status-change
    - permanent_residence
  exclusion_scope:
    - "個別活動の該当性"
    - "永住者への変更可否"
    - "資格外活動や身分系資格との比較"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-highly-skilled-preferential
    url: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html
    title: どのような優遇措置が受けられる？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-pr-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    title: 永住許可に関するガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度専門職2号の活動範囲を永住者の活動自由と同一視している相談"
direct_fact_fields:
  - hsp2_activity_scope_not_pr_freedom
ai_inferred_fields: []
needs_review_flags:
  - id: hsp2_activity_scope_review
    reason: "高度専門職2号で行える活動と永住者の地位は別制度として確認する必要がある。"
evidence_points:
  - claim: "ISA は高度専門職2号について、高度専門職1号の活動と併せてほぼ全ての就労資格の活動を行うことができると説明している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "高度専門職2号の優遇措置"
    display_label: "高度専門職2号: ほぼ全ての就労資格活動"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は永住許可を別のガイドラインで案内している。"
    source_title: "永住許可に関するガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ガイドライン"
    display_label: "永住許可: 別制度"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職2号の活動範囲 — 永住者の自由とは別

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

高度専門職2号は、ほぼ全ての就労資格の活動を行えると説明されているが、永住者の地位や永住者の活動自由と同一視しない。

## exceptions_or_transition

- このカードは、個別の副業、経営、資格外活動、身分系活動、又は永住許可への移行可否を判断しない。

## common_user_phrases

- 高度専門職2号 何でもできる
- HSP2 activities permanent resident
- 高度専門職2号 永住者 自由
- 高度専門職2号 活動範囲
- J-Skip 2号 何でも働ける
- 高度人材2号 永住 活動自由

## must_say

- 高度専門職2号の広い活動範囲と永住者の地位は分ける。
- 活動範囲は高度専門職2号として確認する。

## must_not_say

- 高度専門職2号なら永住者と同じように何でもできる。
- 在留期間が無期限なので在留資格の活動範囲を見なくてよい。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-018 |
