---
fact_id: hsp-parent-change-update-3month-continuity
title: "高度専門職等の親 — 変更・更新時の3か月継続予定"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "高度専門職の親: 変更・更新"
citation_summary: "ISA は、変更や更新では7歳未満の子の養育又は妊娠中の支援を3か月以上継続する予定などを示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-010
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "特定活動: 高度専門職等の親"
  source_locator: "在留資格変更許可申請・在留期間更新許可申請"
  claim_type: procedure_condition
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "在留状況良好の個別判断"
    - "更新許可見込み"
  deep_water_candidate: true
official_sources:
  - id: isa-hsp-parent
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html
    title: 在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職等の親 — 変更・更新時の3か月継続予定を聞く相談"
direct_fact_fields:
  - hsp_parent_change_update_3month_continuity
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_parent_change_update_3month_continuity_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、変更や更新では7歳未満の子の養育又は妊娠中の支援を3か月以上継続する予定などを示している。"
    source_title: "在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留資格変更許可申請・在留期間更新許可申請"
    display_label: "高度専門職の親: 変更・更新"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職等の親 — 変更・更新時の3か月継続予定

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

高度専門職等の親について、境内での変更や更新では、養育又は妊娠中の支援を3か月以上継続する予定などを確認する。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- 高度専門職 親 3か月 更新
- HSP parent renewal three months
- 高度人材 父母 续签 三个月
- 高度専門職 親 在留資格変更 3か月
- J-Skip 父母 更新 条件
- 父母 特定活動 更新 3か月

## must_say

- 入国時、変更時、更新時の条件を分ける。

## must_not_say

- 入国時の説明だけで更新可否を断定する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-010 |
