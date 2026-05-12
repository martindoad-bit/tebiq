---
fact_id: designated-activities-titp-transfer-measure-source
title: "特定活動 — 技能実習生の転籍手続中措置"
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 5
citation_label: "特定活動: 技能実習転籍中"
citation_summary: "ISA は、転籍手続中の技能実習生に対する在留管理制度上の措置について、特定活動一覧から案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B5-013
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "転籍手続中の技能実習生に対する措置"
  source_locator: "特定活動一覧からリンクされるページタイトル"
  claim_type: subtype_source_anchor
  applicable_statuses:
    - "技能実習"
    - "特定活動"
  application_type:
    - status_identification
  exclusion_scope:
    - "転籍理由の判断"
    - "就労継続可否"
    - "監理団体・実習実施者の手続判断"
  deep_water_candidate: true
official_sources:
  - id: isa-titp-transfer-measure
    url: https://www.moj.go.jp/isa/applications/titp/10_00216.html
    title: 転籍手続中の技能実習生に対する在留管理制度上の措置について
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "技能実習の転籍手続中の滞在や活動として特定活動を聞く相談"
direct_fact_fields:
  - designated_activities_titp_transfer_measure_source
ai_inferred_fields: []
needs_review_flags:
  - id: titp_transfer_measure_needs_review
    reason: "転籍理由、監理団体、実習実施者、就労継続、期限は個別確認が必要。"
evidence_points:
  - claim: "ISA は転籍手続中の技能実習生に対する在留管理制度上の措置について、特定活動一覧から案内している。"
    source_title: "転籍手続中の技能実習生に対する在留管理制度上の措置について"
    source_url: "https://www.moj.go.jp/isa/applications/titp/10_00216.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページタイトル"
    display_label: "特定活動: 技能実習転籍中"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定活動 — 技能実習生の転籍手続中措置

## current_date_logic

Checked against the ISA resource page on 2026-05-12.

## current_effective_fact

ISA は、転籍手続中の技能実習生に対する在留管理制度上の措置について、特定活動一覧から案内している。

## exceptions_or_transition

- このカードは、転籍理由、就労継続可否、監理団体・実習実施者の対応、期限を判断しない。

## common_user_phrases

- 技能実習 転籍 特定活動
- 実習先 変える 手続中 ビザ
- 技能実習生 転職 特定活動
- 転籍手続中 在留資格
- 実習先なくなった 特定活動
- TITP transfer special activity

## must_say

- 技能実習の転籍手続中措置は、通常の転職や特定技能移行準備と分けて確認する。
- 転籍理由、期限、実習関係者の手続を確認する必要がある。

## must_not_say

- 技能実習生は自由に転職できる。
- 転籍手続中なら常に働き続けられる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 5 extraction | — | ai_extracted | P1C1-B5-013 |
