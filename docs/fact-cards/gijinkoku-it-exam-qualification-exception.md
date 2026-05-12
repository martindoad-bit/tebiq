---
fact_id: gijinkoku-it-exam-qualification-exception
title: 技人国 — 情報処理試験・資格の例外
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 1
citation_label: "情報処理試験等の例外"
citation_summary: "技人国の技術知識ルートでは、法務大臣告示で定める情報処理技術に関する試験又は資格が例外として参照される。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-017
  authority_layer: L2 Ordinance + L3 Notice
  legal_source_type: ordinance_notice
  law_article_ref: "上陸基準省令 技人国 row 1号ただし書 / 平成25年法務省告示437号"
  source_locator: "技人国 row 1号ただし書 / ISA 告示ページ"
  claim_type: exception_scope
  applicable_statuses:
    - "技術・人文知識・国際業務"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "全てのIT証明書"
    - "試験カタログ全件"
    - "許可保証"
  deep_water_candidate: false
applies_when:
  - "用户问基本情报、信息处理考试、IT证书是否能替代学历/经验"
does_not_cover:
  - "完整考试/资格清单"
  - "某一证书是否正好列入告示"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-gijinkoku-it-exam-notice
    url: https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_h09.html
    title: 技術・人文知識・国際業務の在留資格に係る基準の特例を定める件
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "技人国 information-processing exception"
direct_fact_fields:
  - gijinkoku_it_exam_or_qualification_exception_exists
ai_inferred_fields:
  - full_exam_catalog_not_extracted
needs_review_flags:
  - id: full_exam_catalog_not_extracted
    reason: "The full list of tests/qualifications is not extracted into this card."
evidence_points:
  - claim: "The ordinance refers to information-processing tests/qualifications designated by the Minister of Justice."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "技人国 row 1号ただし書"
    display_label: "上陸基準省令 技人国 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "The ISA notice page identifies the designated test/qualification notice."
    source_title: "技術・人文知識・国際業務の在留資格に係る基準の特例を定める件"
    source_url: "https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_h09.html"
    source_organization: "出入国在留管理庁"
    source_locator: "告示ページ"
    display_label: "ISA 告示ページ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 技人国 — 情報処理試験・資格の例外

## current_date_logic

```text
Checked against e-Gov and ISA notice page on 2026-05-12.
```

## current_effective_fact

技人国の技術知識ルートでは、法務大臣告示で定める情報処理技術に関する試験又は資格について、通常の学歴・経験ルートとは別の例外が参照されている。

> "情報処理技術に関する試験"
> source: egov-landing-criteria-ordinance

> "試験は次の第一号から第十号…資格は第十一号及び第十二号"
> source: isa-gijinkoku-it-exam-notice

## exceptions_or_transition

- This card does not list the full exam catalog.
- It must not be read as "any IT certificate works."

## common_user_phrases

- IT考试
- 基本情报
- 応用情報
- 信息处理
- 替代学历
- IT证书
- 情報処理技術者試験
- 技人国IT

## must_say

- 信息处理考试/资格例外存在。
- 需要核对是否属于告示列举的考试或资格。

## must_not_say

- 不要说所有 IT 证书都能替代学历/经验。
- 不要直接判断某个证书一定适用。

## qa_cases

### QA-1

**user**: 基本情报能替代学历吗？

**must_have**:

- 需核对告示列举考试

**must_not_have**:

- 一定可以

### QA-2

**user**: 随便一个IT证书都可以吗？

**must_have**:

- 不是所有证书

**must_not_have**:

- 都可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 1; LS-P0C2-017 |

