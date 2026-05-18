---
fact_id: zairyu-period-3months-warning
title: 在留期間3か月の通知 — 入管からの「警告」サイン
state: disabled
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "3か月ビザ警告"
citation_summary: "在留期間更新で3か月の在留期間が指定された場合、入管が次回審査で慎重に判断する意図を示す警告サイン。納税・年金・素行等の改善が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "3ヶ月 在留 警告"
  - "在留期間 短い"
does_not_cover:
  - "通常の3か月在留（教育等）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    label: ISA — 技人国
    accessed: "2026-05-17"
applies_to:
  - 在留更新で3か月指定の者
direct_fact_fields:
  - 3か月指定：入管の慎重判断意図
  - 想定要因：納税滞納、活動継続疑義、素行問題等
  - 次回更新：通常通り3か月前から申請可
  - 改善実績の証明が重要
ai_inferred_fields:
  - 専門家相談で原因特定と対策必須
needs_review_flags:
  - 3month_specific_factors_official_source
  - reverse_check_method_from_admin
  - professional_help_typical_route
related_links:
  - title: "ISA — 技人国"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "技人国"
    locator: "3か月"
    relation: "official_reference"
evidence_points:
  - claim: "在留期間更新で3か月の指定は入管の慎重判断意図を示す。納税・年金・素行等の改善必要。"
    source_title: "ISA — 技人国"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留期間"
    display_label: "3か月警告"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

3か月在留指定は警告サイン・改善必要。

## must_say

- 3か月は警告
- 原因特定+改善実績
- 専門家相談

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop14 | 「3か月指定=警告サイン」という実務推定を公式事実として扱えないため無効化。期間候補の一般論は `zairyu-kikan-5years-default` に寄せる。 | ai_extracted | disabled | loop14-reject |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
