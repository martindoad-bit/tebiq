---
fact_id: jskip-material-structure-activity-plus-special-evidence
title: "J-Skip材料 — 活動資料と疎明資料"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-12"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 2 / Batch 2
citation_label: "J-Skip: 資料構造"
citation_summary: "ISA は、J-Skipの申請資料として、行う活動に応じた在留資格の資料と、活動区分に応じた特別高度人材基準の疎明資料を示している。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B2-019
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "J-Skip 申請書類"
  source_locator: "申請書類等について"
  claim_type: materials_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - current-status
    - status-change
    - renewal
  exclusion_scope:
    - "活動別の完全資料表"
    - "年収証明の十分性評価"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-12"
    quoted_in_card: false
applies_to:
  - "J-Skip材料 — 活動資料と疎明資料を聞く相談"
direct_fact_fields:
  - jskip_material_structure_activity_plus_special_evidence
ai_inferred_fields: []
needs_review_flags:
  - id: jskip_material_structure_activity_plus_special_evidence_review
    reason: "個別事情と申請類型により必要な確認が変わるため。"
evidence_points:
  - claim: "ISA は、J-Skipの申請資料として、行う活動に応じた在留資格の資料と、活動区分に応じた特別高度人材基準の疎明資料を示している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請書類等について"
    display_label: "J-Skip: 資料構造"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# J-Skip材料 — 活動資料と疎明資料

## current_date_logic

Checked against the ISA page on 2026-05-12.

## current_effective_fact

J-Skipの資料は、活動に応じた在留資格資料に加え、学歴・職歴・年収など特別高度人材基準の疎明資料を確認する構造になっている。

## exceptions_or_transition

- このカードは、個別事情に基づく許可可否や資料の十分性を判断しない。

## common_user_phrases

- J-Skip 材料 活动对应资料
- 特別高度人材 疎明資料 年収
- J-Skip 年収 過去年収 予定年収
- J-Skip 学歴 職歴 証明
- J-Skip 申請書類 活動区分
- J-Skip 材料 不是只看年收

## must_say

- 活動対応資料とJ-Skip基準資料を分けて見る。
- 年収は本件活動で受ける予定年収として確認する。

## must_not_say

- J-Skipは学歴と年収だけ出せばよい。

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
| 2026-05-12 | Codex | Initial P1 Cycle 2 Batch 2 extraction | — | ai_extracted | P1C2-B2-019 |
