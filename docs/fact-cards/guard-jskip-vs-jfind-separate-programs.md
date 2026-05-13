---
fact_id: guard-jskip-vs-jfind-separate-programs
title: "J-Skip と J-Find — 別制度として分ける"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 3
citation_label: "J-Skip/J-Find: 別制度"
citation_summary: "ISA は J-Skip を高度専門職の特別高度人材制度として、J-Find を優秀な海外大学等卒業者の就職活動又は起業準備の特定活動として説明している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-006
  authority_layer: L4 ISA Resource/Status Page
  legal_source_type: official_resource_page
  law_article_ref: "特別高度人材制度 / 未来創造人材制度"
  source_locator: "J-Skip overview / J-Find overview"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "個別の制度該当性"
    - "学歴・職歴・年収要件の充足判断"
    - "就職活動又は起業準備の活動範囲判断"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-j-find
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities51.html
    title: 優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "J-Skip と J-Find を同じ制度として扱っている相談"
direct_fact_fields:
  - jskip_jfind_separate_programs
ai_inferred_fields: []
needs_review_flags:
  - id: jskip_jfind_disambiguation_review
    reason: "ユーザーの学歴、職歴、年収、活動目的により制度の入口が変わるため。"
evidence_points:
  - claim: "ISA は J-Skip について、これまでの高度人材ポイント制とは別に、学歴又は職歴と年収が一定水準以上であれば高度専門職を付与する制度として説明している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度概要"
    display_label: "J-Skip: 高度専門職"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA は J-Find について、優秀な海外大学等卒業者が日本で就職活動又は起業準備活動を行う場合の特定活動として説明している。"
    source_title: "優秀な海外大学等を卒業した者が起業活動・就職活動を行う場合（J-Find）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities51.html"
    source_organization: "出入国在留管理庁"
    source_locator: "制度概要"
    display_label: "J-Find: 就職活動又は起業準備"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip と J-Find — 別制度として分ける

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

J-Skip は高度専門職の特別高度人材制度、J-Find は優秀な海外大学等卒業者の就職活動又は起業準備を扱う特定活動として分ける。

## exceptions_or_transition

- このカードは、J-Skip又はJ-Findの個別該当性、ランキング大学該当性、年収要件、活動内容の許可可否を判断しない。

## common_user_phrases

- J-Skip J-Find 区别
- 特別高度人材 未来創造人材 違い
- J-Skip 海外大学 J-Find
- J-Find 高度専門職
- J-Skip 找工作
- J-Find J-Skip difference

## must_say

- J-Skip と J-Find は別制度として分ける。
- J-Skip は高度専門職、J-Find は就職活動又は起業準備の特定活動として入口を確認する。

## must_not_say

- J-Skip は J-Find の上位版。
- J-Find は高度専門職の在留資格である。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-006 |
