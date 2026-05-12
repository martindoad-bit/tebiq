---
fact_id: highly-skilled-one-activity-institution-change-application
title: "高度専門職1号 — 活動内容・所属機関変更時の変更申請注意"
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
citation_label: "高度専門職1号: 変更申請"
citation_summary: "ISA は、高度専門職1号で在留中の人が活動内容を変更する場合、所属機関の変更を含め、在留資格変更許可申請が必要であると注意している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-006
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "高度専門職1号 在留資格変更許可申請"
  source_locator: "在留資格変更許可申請（高度専門職1号）"
  claim_type: procedure_boundary
  applicable_statuses:
    - "高度専門職1号"
  application_type:
    - status_change
  exclusion_scope:
    - "転職先で開始できる時期"
    - "所属機関変更後の許可見込み"
    - "届出との関係の最終判断"
  deep_water_candidate: true
official_sources:
  - id: isa-highly-skilled-status-page
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html?hl=ja
    title: 在留資格「高度専門職」（高度人材ポイント制）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "高度専門職1号で転職・所属機関変更・活動内容変更を聞く相談"
direct_fact_fields:
  - highly_skilled_one_activity_institution_change_application
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_change_timing_needs_review
    reason: "変更申請と届出、就労開始時期は個別事案で確認が必要。"
evidence_points:
  - claim: "ISA は、高度専門職1号で在留中の人が活動内容を変更する場合、所属機関の変更を含め、在留資格変更許可申請が必要であると注意している。"
    source_title: "在留資格「高度専門職」（高度人材ポイント制）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00004.html?hl=ja"
    source_organization: "出入国在留管理庁"
    source_locator: "在留資格変更許可申請（高度専門職1号）"
    display_label: "高度専門職1号: 変更申請"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職1号 — 活動内容・所属機関変更時の変更申請注意

## current_date_logic

Checked against the ISA status page on 2026-05-12.

## current_effective_fact

ISA は、高度専門職1号で在留中の人が活動内容を変更する場合、所属機関の変更を含め、在留資格変更許可申請が必要であると注意している。

## exceptions_or_transition

- このカードは、転職先で働ける時期、届出との関係、許可見込みを判断しない。

## common_user_phrases

- 高度専門職 転職 変更申請
- 高度専門職 所属機関 変更
- 高度専門職1号 会社変わる
- 高度人材 転職 ビザ
- 高度専門職 活動内容 変更
- 高度専門職 届出だけ

## must_say

- 高度専門職1号の所属機関変更や活動内容変更は、通常の転職届だけで足りるかを慎重に確認する。
- ISA は変更申請が必要と注意している。

## must_not_say

- 高度専門職1号は転職しても届出だけで必ずよい。
- 新しい会社で許可前に当然働ける。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-006 |
