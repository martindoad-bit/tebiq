---
fact_id: designated-activities-46-notice-source-anchor
title: "特定活動46号 — 告示第46号と別表十一の source anchor"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 1 / Batch 2
citation_label: "特定活動46号 source anchor"
citation_summary: "ISA の概要PDFは、特定活動46号を平成2年法務省告示第131号の第46号及び別表十一に基づく活動として示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C1-B2-001
  authority_layer: L3 Notice / L4 ISA Guidance
  legal_source_type: official_guidance_pdf
  law_article_ref: "平成2年法務省告示第131号 第46号 / 別表十一"
  source_locator: "特定活動（告示第46号）概要"
  claim_type: authority_boundary
  applicable_statuses:
    - "特定活動"
  application_type:
    - landing
    - status_change
    - period_renewal
  exclusion_scope:
    - "個別の該当性判断"
    - "就労開始可否"
    - "許可見込み"
  deep_water_candidate: true
applies_when:
  - "ユーザーが特定活動46号の根拠や制度名を聞いている"
does_not_cover:
  - "具体的な勤務内容が46号に合うか"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: isa-tokutei46-guideline-page
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00038.html
    title: 留学生の就職支援に係る「特定活動」(本邦大学等卒業者)についてのガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: isa-tokutei46-overview-pdf
    url: https://www.moj.go.jp/isa/content/001369972.pdf
    title: 在留資格「特定活動（告示46号）」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
applies_to:
  - "特定活動46号"
direct_fact_fields:
  - designated_activities_46_notice_source_anchor
ai_inferred_fields: []
needs_review_flags:
  - id: detailed_notice_rows_separate
    reason: "別表十一の各要件は別カードで扱う。"
evidence_points:
  - claim: "ISA の概要PDFは、特定活動46号を平成2年法務省告示第131号の第46号及び別表十一に基づく活動として示している。"
    source_title: "在留資格「特定活動（告示46号）」"
    source_url: "https://www.moj.go.jp/isa/content/001369972.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "第46号 / 別表十一"
    display_label: "特定活動46号の告示根拠"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定活動46号 — 告示第46号と別表十一の source anchor

## current_date_logic

Checked against ISA guideline page and PDF on 2026-05-12.

## current_effective_fact

特定活動46号は、平成2年法務省告示第131号の第46号及び別表十一に基づく特定活動類型として示されている。

## exceptions_or_transition

- 告示根拠は個別勤務内容の適合や許可可能性を意味しない。

## common_user_phrases

- 特定活動46号 根拠
- 告示第46号
- 特定活動 第46号
- 別表十一 特定活動
- 特定活动46号 官方依据

## must_say

- 46号は特定活動の一類型であり、別表十一の要件を確認する。

## must_not_say

- 46号は通常の技人国と同じ。
- 46号の名前だけで勤務内容の適合を判断する。

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
| 2026-05-12 | Codex | Initial P1 Cycle 1 Batch 2 extraction | — | ai_extracted | P1C1-B2-001 |

