---
fact_id: gijinkoku-ten-year-experience-route
title: 技人国 — 十年以上の実務経験ルート
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 1
citation_label: "技人国の実務経験ルート"
citation_summary: "技人国の自然科学・人文科学系ルートには、十年以上の実務経験による代替ルートがある。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-012
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 技術・人文知識・国際業務 row 1号ハ"
  source_locator: "技人国 row 1号ハ"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "経験内容の証明方法"
    - "五年経験等の短縮判断"
    - "許可保証"
  deep_water_candidate: true
applies_when:
  - "用户没有大学学历但询问多年经验是否可以"
does_not_cover:
  - "经验如何证明"
  - "具体年数不足时的可能性"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "技人国 practical experience route"
direct_fact_fields:
  - gijinkoku_ten_year_experience_route
ai_inferred_fields: []
needs_review_flags:
  - id: experience_proof_not_covered
    reason: "How to prove practical experience is outside this card."
evidence_points:
  - claim: "The 技人国 natural/humanities route includes a 10-year practical-experience path."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技人国 row 1号ハ"
    display_label: "上陸基準省令 技人国 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 技人国 — 十年以上の実務経験ルート

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

技人国の自然科学・人文科学系ルートには、十年以上の実務経験による代替ルートがある。関連する科目を専攻した期間を含む扱いが示されている。

> "十年以上の実務経験"
> source: egov-landing-criteria-ordinance

> "関連する科目を専攻した期間を含む"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide whether five years or another shorter period is enough.
- It does not describe how to prove experience.

## common_user_phrases

- 没有学历
- 10年经验
- 十年经验
- 实务经验
- 技人国经验
- 没大学做人文签
- 工作经验替代学历

## must_say

- 无学历路线可看十年以上相关实务经验路径。
- 具体证明和关联性仍需确认。

## must_not_say

- 不要说没有大学就一定不能。
- 不要说任意经验都算。

## qa_cases

### QA-1

**user**: 没有大学学历但有经验可以做人文签吗？

**must_have**:

- 十年以上实务经验路径

**must_not_have**:

- 一定不能

### QA-2

**user**: 5年经验够不够？

**must_have**:

- 本卡只确认十年路径

**must_not_have**:

- 5年一定够

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-012 |

