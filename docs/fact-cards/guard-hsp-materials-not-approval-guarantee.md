---
fact_id: guard-hsp-materials-not-approval-guarantee
title: "高度専門職等の提出資料 — 許可保証ではない"
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
citation_label: "高度専門職等資料: 許可保証ではない"
citation_summary: "ISA の高度専門職等の関連ページは、審査過程で掲載外の資料を求める場合があると注意している。資料を揃えたことを許可保証として扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C2-B3-016
  authority_layer: L4 ISA Status/Resource Page
  legal_source_type: official_status_page
  law_article_ref: "高度専門職・特定活動 提出書類"
  source_locator: "申請にあたっての留意事項"
  claim_type: integration_boundary
  applicable_statuses:
    - "高度専門職"
    - "特定活動"
  application_type:
    - certificate
    - status-change
    - renewal
  exclusion_scope:
    - "資料十分性"
    - "許可見込み"
    - "追加資料の個別判断"
  deep_water_candidate: true
official_sources:
  - id: isa-j-skip
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html
    title: 特別高度人材制度（J-Skip）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-hsp-working-spouse
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html
    title: 在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-hsp-parent
    url: https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html
    title: 在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "高度専門職等の材料一覧を揃えれば許可されると誤解している相談"
direct_fact_fields:
  - hsp_materials_not_approval_guarantee
ai_inferred_fields: []
needs_review_flags:
  - id: hsp_material_sufficiency_review
    reason: "提出資料の十分性と許可可否は、申請内容と審査過程で変わるため。"
evidence_points:
  - claim: "ISA の J-Skip ページは、申請後の審査過程で掲載外の資料を求める場合があると注意している。"
    source_title: "特別高度人材制度（J-Skip）"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri01_00009.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請書類等について"
    display_label: "J-Skip資料: 追加資料の可能性"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の高度専門職等の就労する配偶者ページは、審査過程で掲載外の資料を求める場合があると注意している。"
    source_title: "在留資格「特定活動」（高度専門職外国人の就労する配偶者・特別高度人材外国人の就労する配偶者）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00003.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請にあたっての留意事項"
    display_label: "配偶者就労資料: 追加資料の可能性"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
  - claim: "ISA の高度専門職等の親ページは、審査過程で掲載外の資料を求める場合があると注意している。"
    source_title: "在留資格「特定活動」（高度専門職外国人又はその配偶者の親・特別高度人材外国人又はその配偶者の親）"
    source_url: "https://www.moj.go.jp/isa/applications/status/designatedactivities02_00002.html"
    source_organization: "出入国在留管理庁"
    source_locator: "申請にあたっての留意事項"
    display_label: "親の資料: 追加資料の可能性"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

# 高度専門職等の提出資料 — 許可保証ではない

## current_date_logic

Checked against the ISA pages on 2026-05-13.

## current_effective_fact

高度専門職、J-Skip、関連する特定活動の提出資料は、審査過程で追加資料を求められる場合がある。材料がそろったことを許可保証として扱わない。

## exceptions_or_transition

- このカードは、個別資料が十分か、追加資料が求められるか、又は許可されるかを判断しない。

## common_user_phrases

- 高度専門職 材料 揃えば 許可
- J-Skip 書類 出せば 必ず
- 特別高度人材 材料 不許可
- 高度人材 資料 追加
- 高度専門職 提出書類 許可保証
- J-Skip materials approval guarantee

## must_say

- 提出資料の一覧は許可保証ではない。
- 審査過程で追加資料を求められる可能性がある。

## must_not_say

- 公式材料をそろえれば必ず許可される。
- 追加資料は求められない。

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
| 2026-05-13 | Codex | Initial P1 Cycle 2 Batch 3 extraction | — | ai_extracted | P1C2-B3-016 |
