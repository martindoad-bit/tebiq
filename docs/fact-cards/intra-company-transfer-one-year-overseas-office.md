---
fact_id: intra-company-transfer-one-year-overseas-office
title: 企業内転勤 — 海外事業所での1年以上継続業務
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 4
citation_label: "企業内転勤の海外事業所1年基準"
citation_summary: "企業内転勤では、転勤直前に外国の本店・支店その他の事業所で、技人国相当業務に継続して1年以上従事していることが示される。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C2-080
  authority_layer: L2 Ordinance
  legal_source_type: ordinance_current_text
  law_article_ref: "上陸基準省令 企業内転勤 row 1号"
  source_locator: "企業内転勤 row 1号"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "企業内転勤"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "普通転職"
    - "海外経験一般"
    - "同一企業等の個別該当性"
  deep_water_candidate: true
applies_when:
  - "用户问海外工作一年能不能办企业内转勤"
  - "用户把日本国内跳槽当企业内转勤"
does_not_cover:
  - "具体集团关系或事业所关系是否成立"
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
  - "企業内転勤 overseas-office period criterion"
direct_fact_fields:
  - intra_company_transfer_one_year_overseas_office
ai_inferred_fields: []
needs_review_flags:
  - id: organization_relationship_not_decided
    reason: "This card does not decide whether the overseas and Japan offices qualify as the same public/private institution network."
related_fact_cards:
  - intra-company-transferee-foreign-office-to-japan-office
  - intra-company-transfer-gijinkoku-equivalent-work
evidence_points:
  - claim: "企業内転勤 requires immediately prior work at a foreign head office, branch, or other office for at least one continuous year in the relevant work type."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "企業内転勤 row 1号"
    display_label: "上陸基準省令 企業内転勤 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 企業内転勤 — 海外事業所での1年以上継続業務

## current_date_logic

```text
Checked against e-Gov current law text on 2026-05-12.
```

## current_effective_fact

企業内転勤では、申請に係る転勤の直前に、外国にある本店、支店その他の事業所で、技術・人文知識・国際業務の項の下欄に掲げる業務に従事しており、その期間が継続して一年以上あることが示される。

> "外国にある本店"
> source: egov-landing-criteria-ordinance

> "継続して一年以上"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide whether a concrete corporate relationship qualifies.
- It does not cover ordinary job change from one company to another.
- General overseas work experience alone is not enough from this card.

## common_user_phrases

- 企业内转勤 海外事业所 1年以上
- 海外公司工作一年
- 海外经验 企业内转勤
- 普通跳槽 企业内转勤
- 日本公司跳槽能不能企业内转勤
- 海外公司辞职 日本新公司
- 海外公司辞职
- 日本新公司上班
- 企业内转勤 不是普通跳槽
- 集团公司转日本
- 海外本店支店
- 企業内転勤 一年以上

## must_say

- 企业内转勤需要海外事业所到日本事业所的转勤关系。
- 需要转勤前海外事业所连续1年以上相关业务。
- 普通跳槽或一般海外经验不能直接等同。

## must_not_say

- 不要说海外工作一年就一定可以。
- 不要说日本国内换公司可以办企业内转勤。
- 不要忽略海外事业所和转勤关系。

## qa_cases

### QA-1

**user**: 我在海外 A 公司工作一年，现在想跳槽到日本 B 公司，可以办企业内转勤吗？

**must_have**:

- 不是普通跳槽
- 海外事业所到日本事业所

**must_not_have**:

- 可以按企业内转勤

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 4; LS-P0C2-080 |
