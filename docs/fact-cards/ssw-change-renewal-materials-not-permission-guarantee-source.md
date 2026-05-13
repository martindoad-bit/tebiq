---
fact_id: ssw-change-renewal-materials-not-permission-guarantee-source
title: "特定技能 — 変更・更新の書類一覧は許可保証ではない"
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-13"
reviewer:
approved_at:
approved_by:
sprint: Legal Source Engineering / P1 Cycle 3 / Batch 3
citation_label: "特定技能: 書類一覧と許可判断"
citation_summary: "ISA の変更・更新許可ガイドラインは、相当の理由を総合的に判断し、代表的な考慮要素に適合しても許可されるとは限らないと説明している。特定技能の書類一覧を許可保証として扱わない。"
source_display_names:
  - "出入国在留管理庁"
legal_source:
  candidate_id: P1C3-B3-019
  authority_layer: L4 ISA Guideline
  legal_source_type: official_guideline
  law_article_ref: "入管法第20条 / 第21条"
  source_locator: "在留資格の変更、在留期間の更新許可のガイドライン / 冒頭説明"
  claim_type: permission_boundary
  applicable_statuses:
    - "特定技能1号"
    - "特定技能2号"
  application_type:
    - status-change
    - renewal
  exclusion_scope:
    - "許可確率"
    - "個別不許可理由"
    - "認定証明書交付申請の個別審査"
  deep_water_candidate: true
official_sources:
  - id: isa-change-renewal-guideline
    url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html
    title: 在留資格の変更、在留期間の更新許可のガイドライン
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
  - id: isa-ssw-status
    url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    title: 在留資格「特定技能」
    publisher: 出入国在留管理庁
    last_checked_at: "2026-05-13"
    quoted_in_card: false
applies_to:
  - "特定技能の変更・更新で材料が揃えば許可されるかを聞く相談"
direct_fact_fields:
  - ssw_change_renewal_materials_not_permission_guarantee
ai_inferred_fields: []
needs_review_flags:
  - id: ssw_permission_probability_review
    reason: "材料充足と許可可能性は別であり、個別審査結果は判断しない。"
evidence_points:
  - claim: "ISA の変更・更新許可ガイドラインは、相当の理由があるかを総合的に判断すると説明している。"
    source_title: "在留資格の変更、在留期間の更新許可のガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html"
    source_organization: "出入国在留管理庁"
    source_locator: "冒頭説明"
    display_label: "変更・更新: 総合判断"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "同ガイドラインは、代表的な考慮要素に適合する場合でも許可されるとは限らないと説明している。"
    source_title: "在留資格の変更、在留期間の更新許可のガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00058.html"
    source_organization: "出入国在留管理庁"
    source_locator: "冒頭説明"
    display_label: "変更・更新: 許可保証ではない"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

# 特定技能 — 変更・更新の書類一覧は許可保証ではない

## current_date_logic

Checked against the ISA change/renewal guideline and SSW status page on 2026-05-13.

## current_effective_fact

特定技能の変更・更新で提出書類を確認することと、許可されることは同じではない。変更・更新は相当の理由があるかを総合的に判断する手続であり、代表的な考慮要素に適合しても許可保証にはならない。

## exceptions_or_transition

- このカードは、個別の許可可能性や不許可可能性を判断しない。
- 認定証明書交付申請の個別審査は別途確認が必要。

## common_user_phrases

- 特定技能 書類 全部そろえたら 許可
- 特定技能 更新 材料齐了 一定
- 特定技能 変更 書類 出せば 必ず
- 特定技能 续签 材料齐全 必过
- 特定技能 提出書類 許可保証
- 特定技能 materials approval guarantee

## must_say

- 変更・更新の提出書類一覧は許可保証ではない。
- 変更・更新は相当の理由を総合的に判断する。

## must_not_say

- 書類を全部そろえれば必ず許可される。
- 代表的な考慮要素に合えば必ず許可される。

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
| 2026-05-13 | Codex | Initial P1 Cycle 3 Batch 3 extraction | — | ai_extracted | P1C3-B3-019 |
