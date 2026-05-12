---
fact_id: entertainer-amendment-sensitive-router
title: 興行 — 改正影響を受けやすい活動類型
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
citation_label: "興行の改正敏感ルーター"
citation_summary: "興行は演劇、演芸、演奏、スポーツ等の活動を含むが、上陸基準省令等が令和5年8月1日に改正されており、具体活動ごとに最新の興行基準・申請類型を確認する必要がある。"
source_display_names:
  - "e-Gov 法令検索"
  - "出入国在留管理庁"
legal_source:
  candidate_id: LS-P0C2-121
  authority_layer: L2 Ordinance + L4 ISA Amendment Page
  legal_source_type: ordinance_amendment_status_page
  law_article_ref: "上陸基準省令 興行 row / ISA 興行改正ページ"
  source_locator: "興行 row / 令和5年8月1日改正概要"
  claim_type: routing_boundary
  applicable_statuses:
    - "興行"
  application_type:
    - landing
    - change
  exclusion_scope:
    - "夜間娱乐・接待・直播・模特等具体合规判断"
    - "契約、施設、報酬、主催者要件の全詳細"
    - "短期滞在との境界"
  deep_water_candidate: true
applies_when:
  - "用户问演出、艺人、歌手、模特、体育选手等来日活动"
  - "用户问兴行签证是否按旧规则或简单材料判断"
does_not_cover:
  - "具体演出、经纪、夜间娱乐、直播、接待活动可否"
ai_pipeline:
  collector_run_at: 2026-05-12
  extractor_model: FACT subagent Russell + Codex normalization
  source_count: 3
  self_verification_passed_at:
official_sources:
  - id: egov-landing-criteria-ordinance
    url: https://laws.e-gov.go.jp/law/402M50000010016
    title: 出入国管理及び難民認定法第七条第一項第二号の基準を定める省令
    publisher: e-Gov 法令検索
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-entertainer-status
    url: https://www.moj.go.jp/isa/applications/status/entertainer
    title: 在留資格「興行」
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
  - id: isa-entertainer-amendment
    url: https://www.moj.go.jp/isa/applications/resources/10_00150.html
    title: 在留資格「興行」に係る上陸基準省令等の改正について
    publisher: 出入国在留管理庁
    last_checked_at: 2026-05-12
    quoted_in_card: true
applies_to:
  - "興行 routing"
direct_fact_fields:
  - entertainer_amendment_sensitive
  - entertainer_activity_specific_criteria_router
ai_inferred_fields: []
needs_review_flags:
  - id: entertainment_specific_activity
    reason: "具体演出、模特、直播、夜间娱乐、体育、经纪契约等需要按最新兴行来源和专业判断确认。"
related_fact_cards: []
evidence_points:
  - claim: "ISA explains that Entertainment status covers theatre, entertainment, performance, sports and other entertainment activities."
    source_title: "在留資格「興行」"
    source_url: "https://www.moj.go.jp/isa/applications/status/entertainer"
    source_organization: "出入国在留管理庁"
    source_locator: "この在留資格に該当する活動"
    display_label: "ISA 在留資格「興行」"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA states that the Entertainment-related landing-criteria ordinance and enforcement regulation were amended and enforced on August 1, 2023."
    source_title: "在留資格「興行」に係る上陸基準省令等の改正について"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00150.html"
    source_organization: "出入国在留管理庁"
    source_locator: "改正の概要"
    display_label: "ISA 興行改正ページ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 興行 — 改正影響を受けやすい活動類型

## current_date_logic

```text
Checked against e-Gov current law text and ISA status/amendment pages on 2026-05-12.
```

## current_effective_fact

興行は、演劇、演芸、演奏、スポーツ等の興行に係る活動又はその他の芸能活動を対象にする在留資格である。ISAは、興行に係る上陸基準省令等が令和5年8月1日に改正されたことも示している。

> "演劇"
> source: isa-entertainer-status

> "令和５年８月１日"
> source: isa-entertainer-amendment

## exceptions_or_transition

- This is a sensitivity/router card.
- It does not decide concrete entertainment, model, livestream, night-work, reception, sports, or agency-contract cases.
- It must not present old rules as current rules.

## common_user_phrases

- 興行 上陆基准 改正
- 兴行签证 规则 经常改
- 演出艺人 兴行 最新改正
- 歌手 舞者 演奏 体育 兴行
- 模特 直播 兴行签
- 夜间娱乐 兴行
- 演艺活动 来日本签证
- 興行 amendment
- 令和5年 兴行 改正

## must_say

- 興行是高误答风险领域，要先定位具体活动类型和最新来源。
- 令和5年8月1日已有相关上陆基准省令等改正。
- 本卡只做敏感路由，不给具体活动可否结论。

## must_not_say

- 不要笼统说演艺活动办興行即可。
- 不要把线上娱乐、社媒、陪同、接待、夜职、直播等简单归入興行。
- 不要用旧规则或材料清单给最终结论。

## qa_cases

### QA-1

**user**: 演出艺人来日本办兴行，需要看最新改正吗？

**must_have**:

- 改正敏感
- 具体活动另查

**must_not_have**:

- 直接可以

### QA-2

**user**: 直播模特能不能办兴行签证？

**must_have**:

- 具体活动敏感
- 不给最终结论

**must_not_have**:

- 当然可以

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
| 2026-05-12 | FACT/Codex | Initial legal-source draft | — | ai_extracted | P0 Cycle 2 Batch 5; LS-P0C2-121 |
