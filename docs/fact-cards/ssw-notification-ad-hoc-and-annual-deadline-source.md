---
fact_id: ssw-notification-ad-hoc-and-annual-deadline-source
title: "特定技能 — 随時届出は14日以内、定期届出は年1回期限で見る"
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
citation_label: "特定技能: 届出期限"
citation_summary: "ISA は、特定技能所属機関による届出を随時届出と定期届出に分け、随時届出は事由発生日から14日以内、定期届出は対象年の翌年5月31日までと案内している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B4-001
  authority_layer: L4 ISA Procedure Page
  legal_source_type: official_procedure_page
  law_article_ref: "特定技能所属機関による届出"
  source_locator: "特定技能所属機関による届出 / 随時届出・定期届出"
  claim_type: notification_deadline_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - notification
  exclusion_scope:
    - "個別届出の要否"
    - "遅延届出の処分判断"
    - "届出書類の全列挙"
  deep_water_candidate: true
official_sources:
  - id: isa-ssw-notifications
    url: https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html
    title: 特定技能所属機関・登録支援機関による届出（提出書類）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の届出期限を聞く相談"
direct_fact_fields:
  - ssw_notification_ad_hoc_and_annual_deadline
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_notification_deadline_review
    reason: "個別の届出事由、遅延時の対応、旧四半期届出との関係は確認が必要。"
evidence_points:
  - claim: "ISA は、特定技能所属機関による届出を随時届出と定期届出に分け、随時届出は事由発生日から14日以内、定期届出は対象年の4月1日から翌年3月31日までのものを翌年5月31日までに提出すると案内している。"
    source_title: "特定技能所属機関・登録支援機関による届出（提出書類）"
    source_url: "https://www.moj.go.jp/isa/applications/ssw/nyuukokukanri10_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "特定技能所属機関による届出"
    display_label: "特定技能: 届出期限"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 特定技能 — 随時届出は14日以内、定期届出は年1回期限で見る

## current_date_logic

Checked against the ISA SSW notification page on 2026-05-13.

## current_effective_fact

特定技能所属機関の届出は、随時届出と定期届出に分かれる。随時届出は事由発生日から14日以内、定期届出は対象年の翌年5月31日までに提出する。

## exceptions_or_transition

- 令和7年1月1日から3月31日までを対象期間とした旧四半期届出には別の提出期限が案内されている。
- 個別の届出事由と添付書類は別途確認する。

## common_user_phrases

- 特定技能 随時届出 14日以内
- 特定技能 定期届出 5月31日
- 特定技能 届出 期限
- 特定技能 年1回 定期届出
- 特定技能 年1回 定期届出 随時届出 不要
- 特定技能 会社 届出 いつまで
- 特定技能 notification deadline

## must_say

- 随時届出は14日以内、定期届出は年1回期限で見る。

## must_not_say

- 特定技能の届出はすべて四半期ごとでよい。
- 随時届出も年1回まとめて出せばよい。
- 年1回の定期届出になったので随時届出は不要。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 4 extraction | — | ai_extracted | P1C3-B4-001 |
