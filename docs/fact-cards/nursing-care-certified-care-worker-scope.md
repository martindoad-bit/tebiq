---
fact_id: nursing-care-certified-care-worker-scope
title: 介護 — 介護福祉士資格を軸とする介護活動
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 1 / Batch 4
citation_label: "介護"
citation_summary: "介護は、日本の機関との契約に基づき介護福祉士資格者が介護又は介護指導を行う活動を軸とする。"
source_display_names:
  - "e-Gov 法令検索"
legal_source:
  candidate_id: LS-P0C1-051
  authority_layer: L1 Law
  legal_source_type: statute_current_text
  law_article_ref: "入管法別表第一二の表 介護"
  source_locator: "介護の項"
  claim_type: activity_scope
  applicable_statuses:
    - "介護"
  application_type:
    - current-status
  exclusion_scope:
    - "EPA、特定技能介护、技能实习介护"
    - "具体岗位变更"
  deep_water_candidate: false
applies_when:
  - "用户混同介護在留资格和特定技能介护"
does_not_cover:
  - "介護福祉士取得路径"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell
  source_count: 1
  self_verification_passed_at:
official_sources:
  - id: egov-immigration-act
    url: https://laws.e-gov.go.jp/law/326CO0000000319
    title: 出入国管理及び難民認定法
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: false
applies_to:
  - "介護の活動範囲"
direct_fact_fields:
  - nursing_care_scope
ai_inferred_fields: []
needs_review_flags:
  - id: care_worker_qualification_path
    reason: "资格取得路径和特定技能介护转换需另行确认。"
evidence_points:
  - claim: "介護在留资格以介護福祉士資格者の介護又は介護指導为核心。"
    source_title: "出入国管理及び難民認定法"
    source_url: "https://laws.e-gov.go.jp/law/326CO0000000319"
    source_organization: "e-Gov 法令検索"
    source_locator: "別表第一二の表 介護"
    display_label: "入管法別表第一二の表"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 介護 — 介護福祉士資格を軸とする介護活動

## current_date_logic

```text
Checked against current e-Gov law text on 2026-05-12.
This is a disambiguation card for care-related statuses.
```

## current_effective_fact

介護在留资格以日本机构契约和介護福祉士资格者从事介护或介护指导为核心，不等同于所有介护现场工作或特定技能介护。

## exceptions_or_transition

- 特定技能介护、技能实习介护、介護福祉士取得路径需另查。

## common_user_phrases

- 介护签
- 介護
- 介護福祉士
- 护理
- 介护指导
- 特定技能介护
- 介护和特定技能一样吗

## must_say

- 介護资格与特定技能介护、技能实习介护不是同一层次。

## must_not_say

- 不要把所有介护工作都说成介護在留资格。

## qa_cases

### QA-1

**user**: 有介护工作就能办介護签吗？

**must_have**:

- 介護福祉士资格
- 机构契约

**must_not_have**:

- 一定可以

### QA-2

**user**: 特定技能介护等于介護签吗？

**must_have**:

- 不同资格

**must_not_have**:

- 一样

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 1 Batch 4; LS-P0C1-051 |
