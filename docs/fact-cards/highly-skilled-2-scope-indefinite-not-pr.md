---
fact_id: highly-skilled-2-scope-indefinite-not-pr
title: "高度専門職2号 — 無期限在留と永住の混同防止"
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
citation_label: "高度専門職2号: 無期限"
citation_summary: "ISA は高度専門職2号について、在留期限が無期限となり、就労資格で認められるほぼ全ての活動を行うことができると説明しているが、これは永住許可そのものとは別に確認する必要がある。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-005
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "高度専門職2号"
  source_locator: "高度専門職2号の説明"
  claim_type: status_boundary
  applicable_statuses:
    - "高度専門職2号"
    - "永住者"
  application_type:
    - current-status
  exclusion_scope:
    - "永住許可取得判断"
    - "高度専門職2号への変更許可見込み"
    - "無期限在留の取消・届出リスク"
  deep_water_candidate: true
official_sources:
  - id: isa-highly-skilled-status-page
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html?hl=ja
    title: 在留資格「高度専門職」（高度人材ポイント制）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
  - id: isa-highly-skilled-preferential
    url: https://www.moj.go.jp/isa/applications/resources/newimmiact_3_preferential_index.html
    title: どのような優遇措置が受けられる？
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職2号と永住の違いを聞く相談"
direct_fact_fields:
  - highly_skilled_2_scope_indefinite_not_pr
ai_inferred_fields: []
needs_review_flags:
  - id: hsp2_not_pr_review
    reason: "無期限在留と永住許可の制度差、届出・取消リスクは専門確認が必要。"
evidence_points:
  - claim: "ISA は高度専門職2号について、在留期限が無期限となり、就労資格で認められるほぼ全ての活動を行うことができると説明している。"
    source_title: "在留資格「高度専門職」（高度人材ポイント制）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "高度専門職2号の説明"
    display_label: "高度専門職2号: 無期限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職2号 — 無期限在留と永住の混同防止

## current_date_logic

Checked against ISA status/resource pages on 2026-05-12.

## current_effective_fact

ISA は高度専門職2号について、在留期限が無期限となり、就労資格で認められるほぼ全ての活動を行うことができると説明している。

## exceptions_or_transition

- このカードは、高度専門職2号への変更可否や永住許可との制度差の最終判断をしない。

## common_user_phrases

- 高度専門職2号 永住 違い
- 高度専門職2号 無期限
- 高度専門職2号 ほぼ全ての就労
- 高度2号 永住者と同じ
- 高度専門職2号 在留期限
- 高度専門職2号 活動制限

## must_say

- 高度専門職2号は在留期限無期限と活動緩和があるが、永住許可そのものとは分けて確認する。
- 2号への変更要件と永住許可要件は別に確認する。

## must_not_say

- 高度専門職2号は永住者と同じ。
- 高度専門職2号なら在留資格取消や届出リスクがなくなる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-005 |
