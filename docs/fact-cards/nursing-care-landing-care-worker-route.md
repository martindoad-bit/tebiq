---
fact_id: nursing-care-landing-care-worker-route
title: 介護 — 介護福祉士ルートと上陸基準の確認
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: 2026-05-12
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 2 / Batch 5
citation_label: "介護の上陸基準"
citation_summary: "介護の在留資格は介護福祉士資格者による介護又は介護指導を軸とし、上陸基準では一部ルートの技能移転努力や日本人同等額以上の報酬も示される。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-100
  authority_layer: L1 Law + L2 Ordinance + L4 ISA Page
  legal_source_type: statute_ordinance_status_page
  law_article_ref: "入管法別表第一二の表 介護 / 上陸基準省令 介護 row"
  source_locator: "介護 row / ISA 在留資格「介護」"
  claim_type: eligibility_criterion
  applicable_statuses:
    - "介護"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "特定技能介護"
    - "技能実習介護"
    - "介護福祉士資格取得ルートの個別判断"
  deep_water_candidate: true
applies_when:
  - "用户问养老院或护理岗位是否就是介護在留资格"
  - "用户问介護签证是否需要介護福祉士"
does_not_cover:
  - "介護福祉士考试、养成设施、EPA、特定技能介护的完整路径"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-nursingcare-status
    url: https://www.moj.go.jp/isa/applications/status/nursingcare.html
    title: 在留資格「介護」
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "介護 landing criteria"
direct_fact_fields:
  - nursing_care_worker_status_activity
  - nursing_care_landing_remuneration_japanese_comparable
  - nursing_care_worker_route_not_any_care_work
ai_inferred_fields: []
needs_review_flags:
  - id: care_worker_route_details
    reason: "介護福祉士取得ルート、EPA、特定技能介護、技能実習介護との個別路径は別途確認が必要。"
related_fact_cards:
  - nursing-care-certified-care-worker-scope
evidence_points:
  - claim: "介護 status centers on a certified care worker performing nursing care or care guidance under contract with a Japanese organization."
    source_title: "在留資格「介護」"
    source_url: "https://www.moj.go.jp/isa/applications/status/nursingcare.html"
    source_organization: "出入国在留管理庁"
    source_locator: "この在留資格に該当する活動"
    display_label: "ISA 在留資格「介護」"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "The landing-criteria ordinance includes remuneration at least equivalent to Japanese comparable work for nursing-care status."
    source_title: "上陸基準省令"
    source_url: "https://laws.e-gov.go.jp/law/402M50000010016"
    source_organization: "e-Gov 法令検索"
    source_locator: "介護 row 2号"
    display_label: "上陸基準省令 介護 row"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 介護 — 介護福祉士ルートと上陸基準の確認

## current_date_logic

```text
Checked against e-Gov current law text and ISA status page on 2026-05-12.
```

## current_effective_fact

介護の在留資格は、日本の公私の機関との契約に基づき、介護福祉士資格者が介護又は介護の指導を行う活動を軸とする。上陸基準省令では、日本人が従事する場合に受ける報酬と同等額以上の報酬も示される。

> "介護福祉士"
> source: isa-nursingcare-status

> "同等額以上"
> source: egov-landing-criteria-ordinance

## exceptions_or_transition

- This card does not decide the applicant's care-worker qualification route.
- It does not cover 特定技能介護, 技能実習介護, EPA, or nursing-care training routes.
- It does not say that any nursing-home job is automatically 介護 status.

## common_user_phrases

- 介護 上陆基准 介护福祉士
- 介護签证需要介护福祉士吗
- 养老院工作 介護在留资格
- 介护工作就能申请介護吗
- 介護 资格路线
- 介護福祉士 在留资格
- 介護 报酬 日本人同等
- 特定技能介护 介護签区别
- 护理工作 介護签

## must_say

- 介護在留资格以介護福祉士资格者的介护或介护指导为核心。
- 不是所有护理、看护、养老院工作都自动属于介護在留资格。
- 特定技能介护、技能实习介护、EPA等路径需另查。

## must_not_say

- 不要说养老院雇用即可办介護。
- 不要把无资格护理工作泛化为介護在留。
- 不要把介護与特定技能介护、技能实习介护混为一谈。

## qa_cases

### QA-1

**user**: 在养老院做介护工作，是不是就能申请介護在留资格？

**must_have**:

- 介護福祉士
- 不是所有介护工作

**must_not_have**:

- 养老院工作即可

### QA-2

**user**: 特定技能介护等于介護签吗？

**must_have**:

- 不同资格
- 介護福祉士路线

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 5; LS-P0C2-100 |
