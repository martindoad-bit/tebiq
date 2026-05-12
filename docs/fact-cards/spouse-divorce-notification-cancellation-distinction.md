---
fact_id: spouse-divorce-notification-cancellation-distinction
title: 配偶者離婚・死別 — 届出義務と在留資格取消は別の論点
state: ai_extracted
risk_level: critical
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P0 Cycle 4 / Batch 3
citation_label: "離婚届出と取消制度は分けて扱う"
citation_summary: "ISA の取消案内は、配偶者としての活動を6か月以上行っていない場合を取消事由として示している。一方、離婚・死別後の配偶者届出は通知義務であり、届出そのものを在留資格変更や取消決定として扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: C4-038
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_explainer
  law_article_ref: "入管法第22条の4第1項第7号"
  source_locator: "取消事由(7)"
  claim_type: disambiguation
  applicable_statuses:
    - "spouse_or_child_of_japanese_spouse"
    - "spouse_or_child_of_permanent_resident_spouse"
  application_type:
    - cancellation
    - notification
  exclusion_scope:
    - "離婚後の在留資格変更戦略"
    - "届出遅延の個別評価"
  deep_water_candidate: true
applies_when:
  - "用户问离婚后届出、取消、变更之间的关系"
does_not_cover:
  - "离婚后可变更到哪些在留资格"
ai_pipeline:
  collector_run_at: "2026-05-12"
  extractor_model: Codex normalization from official source
  source_count: 2
  self_verification_passed_at:
official_sources:
  - id: moj-isa-cancel-status
    url: https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html
    title: 在留資格の取消し（入管法第22条の4）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: true
  - id: moj-isa-spouse-notification
    url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html
    title: 配偶者に関する届出
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - 配偶者として在留する外国人
direct_fact_fields:
  - spouse_divorce_notification_cancellation_distinction
ai_inferred_fields:
  - spouse_notification_is_not_status_change_or_cancellation_decision
needs_review_flags:
  - id: post_divorce_status_strategy_requires_review
    reason: "離婚後の変更申請、正当な理由、届出遅延の扱いは個別確認が必要。"
evidence_points:
  - claim: "ISA の取消案内は、配偶者としての活動を6か月以上行っていない場合を取消事由として示している。離婚・死別後の配偶者届出は、取消や在留資格変更そのものとは分けて扱う必要がある。"
    source_title: "在留資格の取消し（入管法第22条の4）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "取消事由(7)"
    display_label: "配偶者離婚：届出と取消制度の区別"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 配偶者離婚・死別 — 届出義務と在留資格取消は別の論点

## current_date_logic

Checked against the ISA cancellation page and spouse-notification page on 2026-05-12.

## current_effective_fact

ISA の取消案内は、配偶者としての活動を6か月以上行っていない場合を取消事由として示している。離婚・死別後の配偶者届出は、取消や在留資格変更そのものとは分けて扱う必要がある。

## exceptions_or_transition

- 離婚後の資格変更や定住者ルートは個別確認が必要。

## common_user_phrases

- 日配 離婚 届出 取消
- 永配 離婚 在留資格変更
- 配偶者届出 したら 取消
- 离婚通知入管 签证失效
- 配偶者ビザ 離婚 14日
- 离婚后签证怎么办

## must_say

- 離婚・死別届出と取消制度は別の論点。
- 届出は在留資格変更や取消決定の代わりではない。

## must_not_say

- 離婚届出を出したらその場で資格が消える。
- 届出を出せば在留資格変更も済む。

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
| 2026-05-12 | Codex | Initial Cycle 4 Batch 3 legal-source card | — | ai_extracted | C4-038 |
