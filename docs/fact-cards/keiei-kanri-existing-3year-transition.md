---
fact_id: keiei-kanri-existing-3year-transition
title: 経営・管理 — 既存保持者の3年間過渡期措置（2025-10-16〜2028-10-16）
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "経営管理 過渡期"
citation_summary: "2025年10月16日施行の経営管理改正で、既存保持者は施行日から3年間（令和10年10月16日まで）の更新申請で柔軟判断される。3年経過後は新基準完全適用。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "経営管理 既存 過渡期"
  - "経営管理 5年ビザ 更新"
does_not_cover:
  - "新規申請（過渡期対象外）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/10_00237.html
    label: ISA — 経営管理改正
    accessed: "2026-05-17"
applies_to:
  - 2025年10月16日時点で経営管理保持中の者
direct_fact_fields:
  - 過渡期：2025-10-16〜2028-10-16（3年間）
  - 対象：既存保持者の更新申請のみ
  - 取扱：経営状況・新基準適合見込みを踏まえて柔軟判断
  - 新規申請は施行日以降直ちに新基準
ai_inferred_fields:
  - 3年内に新基準充足の現実的計画提示が実務必須
needs_review_flags:
  - kashitsu_handan_specific_criteria
  - extension_after_3years_clarity
  - status_change_during_transition
related_links:
  - title: "ISA — 経営管理改正"
    url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    organization: "出入国在留管理庁"
    display_label: "経営管理改正"
    locator: "過渡期"
    relation: "official_reference"
evidence_points:
  - claim: "既存保持者は施行日から令和10年10月16日まで（3年間）の更新申請で柔軟判断。3年経過後は新基準完全適用。"
    source_title: "ISA — 経営管理改正"
    source_url: "https://www.moj.go.jp/isa/applications/resources/10_00237.html"
    source_organization: "出入国在留管理庁"
    source_locator: "過渡期"
    display_label: "経営管理過渡期"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

経営管理：既存保持者は3年過渡期（〜2028-10-16）柔軟判断。

## must_say

- 過渡期3年
- 既存保持者更新のみ
- 3年後は新基準完全適用

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
