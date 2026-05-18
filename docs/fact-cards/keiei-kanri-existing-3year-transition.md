---
fact_id: keiei-kanri-existing-3year-transition
title: 経営・管理 — 既存保持者の3年間過渡期措置（2025-10-16〜2028-10-16）
state: ai_verified
runtime_bucket: ANSWER_RUNTIME
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

## injection_format

### injection_certain_block

```text
【経営・管理 既存保持者過渡期ファクト / {{TODAY_ISO}} 公式】
・2025年10月16日施行の経営管理改正では、既存の経営・管理在留資格保持者について、施行日から3年間（令和10年10月16日まで）の更新申請で経営状況及び新基準適合見込み等を踏まえて柔軟に判断すると説明されている。
・3年経過後は改正後の基準に適合する必要があるとされている。
・これは既存保持者の更新に関する過渡期であり、新規申請や変更申請の許可保証ではない。
```

### injection_needs_review_addendum

```text
※ 既存保持者が他資格へ変更する場合、会社処置、更新時期、補足資料の出し方は個別確認が必要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex Loop19 | 既存保持者更新の3年過渡期を ANSWER_RUNTIME に昇格。 | ai_extracted | ai_verified | loop19-promote |
