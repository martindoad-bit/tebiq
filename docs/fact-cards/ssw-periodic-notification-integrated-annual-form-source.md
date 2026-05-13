---
fact_id: ssw-periodic-notification-integrated-annual-form-source
title: "特定技能 — 定期届出は年1回の受入れ・活動・支援実施状況で確認する"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 4
citation_label: "特定技能: 年1回定期届出"
citation_summary: "ISA は、2025年4月1日以降の運用変更として、定期届出の頻度を四半期ごとから年1回に変更し、受入れ・活動・支援実施状況に係る届出書へ一体化したと案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-014
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "特定技能定期届出の運用変更"
  source_locator: "定期届出における注意点・変更点"
  claim_type: transition_rule
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "旧四半期届出の個別対象期間"
    - "定期届出添付資料の全列挙"
    - "電子届出の省略要件判断"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-operation-improvement
    url: https://www.moj.go.jp/isa/10_00225.html
    title: 特定技能制度における運用改善
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-ssw-notifications
    url: https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html
    title: 特定技能所属機関・登録支援機関による届出（提出書類）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の定期届出が四半期か年1回かを聞く相談"
direct_fact_fields:
  - ssw_periodic_notification_integrated_annual_form
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_periodic_notification_transition_review
    reason: "2025年第1四半期、2026年初回提出、旧様式の扱いは期間確認が必要。"
evidence_points:
  - claim: "ISA は、定期届出の提出頻度が四半期ごとから年1回に変更され、対象年4月1日から翌年3月31日までの受入れ・活動・支援実施状況を翌年4月1日から5月31日までに提出する必要があると案内している。"
    source_title: "特定技能制度における運用改善"
    source_url: "https://www.moj.go.jp/isa/10_00225.html"
    source_organization: "出入国在留管理庁"
    source_locator: "定期届出における注意点・変更点"
    display_label: "特定技能: 定期届出の年1回化"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "同ページは、受入れ・活動状況に係る届出書と支援実施状況に係る届出書が一体化され、受入れ・活動・支援実施状況に係る届出書へ変更されたと案内している。"
    source_title: "特定技能制度における運用改善"
    source_url: "https://www.moj.go.jp/isa/10_00225.html"
    source_organization: "出入国在留管理庁"
    source_locator: "受入れ・活動・支援実施状況に係る届出"
    display_label: "特定技能: 定期届出の一体化"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 定期届出は年1回の受入れ・活動・支援実施状況で確認する

## current_date_logic

Checked against the ISA operation-improvement and SSW notification pages on 2026-05-13.

## current_effective_fact

特定技能の定期届出は、四半期ごとではなく年1回の受入れ・活動・支援実施状況に係る届出として確認する。対象年4月1日から翌年3月31日までの内容を、翌年4月1日から5月31日までに提出する扱いが案内されている。

## exceptions_or_transition

- 2025年1月から3月までを対象期間とした旧四半期届出は別途期限が案内されている。

## common_user_phrases

- 特定技能 定期届出 年1回
- 特定技能 定期届出 四半期 変更
- 特定技能 受入れ 活動 支援実施状況
- 特定技能 定期届出 5月31日
- 特定技能 旧様式 定期届出
- 特定技能现在还是季度报告吗
- 特定技能 annual periodic notification

## must_say

- 定期届出は年1回の受入れ・活動・支援実施状況で確認する。

## must_not_say

- いまも特定技能の定期届出はすべて四半期ごとでよい。
- 支援実施状況は定期届出と別に必ず旧様式で出す。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-014 |
