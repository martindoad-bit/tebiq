---
fact_id: zairyu-kikan-5years-default
title: 在留期間 — 5/3/1年/3月の選択肢（資格別個別指定）
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留期間選択肢"
citation_summary: "技人国・経営管理・教育等の就労資格の在留期間は5年/3年/1年/3か月のいずれか。法務大臣が個別に指定。初回は1年が多く、安定すれば3年/5年に伸びる。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "在留期間 何年もらえる"
  - "5年ビザ"
does_not_cover:
  - "永住者（在留期間なし）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    label: ISA — 技人国
    accessed: "2026-05-17"
applies_to:
  - 就労資格保持者
direct_fact_fields:
  - 選択肢：5/3/1年/3か月
  - 法務大臣個別指定
  - 初回1年が多い（実務）
  - 安定すれば3年→5年に伸びる
  - 3か月は問題ありの場合
ai_inferred_fields:
  - 5年は長期安定した在留者向け
  - 3か月の通知は要警戒
needs_review_flags:
  - 3month_specific_reasons
  - 5year_typical_career_stage
  - decision_factors_official
related_links:
  - title: "ISA — 技人国"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "技人国"
    locator: "在留期間"
    relation: "official_reference"
evidence_points:
  - claim: "技人国等の在留期間は5年/3年/1年/3か月のいずれか、法務大臣個別指定。初回1年が多く、安定すれば3年→5年。"
    source_title: "ISA — 技人国"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留期間"
    display_label: "在留期間選択肢"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

在留期間：5/3/1年/3か月・初回1年多。

## must_say

- 5/3/1年/3か月
- 個別指定
- 3か月は要警戒

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
