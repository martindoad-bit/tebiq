---
fact_id: long-term-resident-nikkei-third-ancestor-documents
title: "日系3世定住者 — 祖父母・父母関係資料"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 4
citation_label: "日系3世の系譜資料"
citation_summary: "ISA の日系3世定住者ページは、祖父母（日本人）の戸籍謄本又は除籍謄本、祖父母と両親の婚姻届出受理証明書、出生証明書等、祖父母及び父母の実在を証明する公的資料を提出書類として示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B4-005
  authority_layer: L4 ISA Status Page
  legal_source_type: official_status_page
  law_article_ref: "定住者 / 日系3世"
  source_locator: "longtermresident_01 提出書類"
  claim_type: materials_boundary
  applicable_statuses:
    - "定住者"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "日系該当性の最終判断"
    - "外国書類の翻訳"
    - "戸籍・国籍関係の欠落"
  deep_water_candidate: true
official_sources:
  - id: isa-long-term-resident-nikkei-third
    url: https://www.moj.go.jp/isa/applications/status/longtermresident_01.html
    title: 在留資格「定住者」（日系3世）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "日系3世の系譜資料確認"
direct_fact_fields:
  - long_term_resident_nikkei_third_ancestor_documents
ai_inferred_fields: []
needs_review_flags:
  - id: nikkei_lineage_document_gap
    reason: "戸籍、出生、婚姻、死亡などの系譜資料欠落は個別確認が必要。"
evidence_points:
  - claim: "ISA の日系3世定住者ページは、祖父母（日本人）の戸籍・除籍、祖父母と両親の婚姻関係、祖父母及び父母の実在を示す公的資料を提出書類として示している。"
    source_title: "在留資格「定住者」（日系3世）"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident_01.html"
    source_organization: "出入国在留管理庁"
    source_locator: "提出書類"
    display_label: "日系3世: 系譜資料"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 日系3世定住者 — 祖父母・父母関係資料

## current_date_logic

Checked against ISA status page on 2026-05-12.

## current_effective_fact

日系3世定住者ページでは、日本人祖父母から申請人までの系譜を示す戸籍・婚姻・出生・実在確認資料が提出書類として示されている。

## exceptions_or_transition

- 資料が欠ける場合や外国書類の翻訳は個別確認が必要。

## common_user_phrases

- 日系3世 戸籍 祖父母
- 日系三世 定住者 書類
- 日系3世 出生証明 婚姻証明
- 祖父母 日本人 定住者
- 日裔三世 户籍 材料

## must_say

- 日系3世は祖父母・父母・本人の系譜資料を確認する。

## must_not_say

- 日系だと言えば書類なしでよい。
- 祖父母の戸籍だけで全て足りる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 4 extraction | — | ai_extracted | P1C1-B4-005 |
