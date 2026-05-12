---
fact_id: j-skip-research-technical-thresholds
title: "J-Skip — 学術研究・専門技術活動の学歴/職歴と年収基準"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 1
citation_label: "J-Skip: 研究・技術"
citation_summary: "ISA は J-Skip の高度学術研究活動・高度専門技術活動について、修士号以上かつ年収2000万円以上、又は関連実務経験10年以上かつ年収2000万円以上のいずれかを要件として案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B1-010
  authority_layer: L4 ISA Resource Page
  legal_source_type: official_resource_page
  law_article_ref: "J-Skip 高度学術研究活動・高度専門技術活動"
  source_locator: "要件"
  claim_type: eligibility_criterion_anchor
  applicable_statuses:
    - "高度専門職1号イ"
    - "高度専門職1号ロ"
  application_type:
    - status_identification
  exclusion_scope:
    - "学位・職歴証明の充足判断"
    - "予定年収の算定判断"
    - "活動類型の該当性"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip の研究・技術系条件を聞く相談"
direct_fact_fields:
  - j_skip_research_technical_thresholds
ai_inferred_fields: []
needs_review_flags:
  - id: j_skip_income_degree_experience_review
    reason: "学位、関連実務経験、予定年収、活動類型の該当性は個別確認が必要。"
evidence_points:
  - claim: "ISA は J-Skip の高度学術研究活動・高度専門技術活動について、修士号以上かつ年収2000万円以上、又は関連実務経験10年以上かつ年収2000万円以上のいずれかを要件として案内している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "要件"
    display_label: "J-Skip: 研究・技術"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip — 学術研究・専門技術活動の学歴/職歴と年収基準

## current_date_logic

Checked against the ISA J-Skip page on 2026-05-12.

## current_effective_fact

ISA は J-Skip の高度学術研究活動・高度専門技術活動について、修士号以上かつ年収2000万円以上、又は関連実務経験10年以上かつ年収2000万円以上のいずれかを要件として案内している。

## exceptions_or_transition

- このカードは、学位・職歴証明、予定年収、活動類型の該当性を判断しない。

## common_user_phrases

- J-Skip 修士 年収2000万
- J-Skip 職歴10年 年収2000万
- J-Skip 技術者 条件
- J-Skip 研究者 条件
- 特別高度人材 修士
- 特別高度人材 2000万円

## must_say

- 研究・技術系 J-Skip は学歴又は職歴と年収を組み合わせて確認する。
- 活動類型が1号イ又はロに当たるかを確認する。

## must_not_say

- 年収2000万円だけで J-Skip になる。
- 学士でも年収だけで研究・技術系 J-Skip に当たる。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 1 extraction | — | ai_extracted | P1C2-B1-010 |
