---
fact_id: eijuu-kashikuken-bekkyo
title: 永住申請 — 直前の在留資格期間（5年以上推奨）
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住直前在留資格"
citation_summary: "永住の国益適合要件として、現に有する在留資格について「最長の在留期間をもって在留している」ことが望ましい（実務上3年/5年）。直近の在留期間が短い場合は不利。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住 在留期間 3年 5年"
  - "1年ビザ 永住"
does_not_cover:
  - "高度人材・配偶者の例外"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html
    label: ISA — 永住ガイドライン
    accessed: "2026-05-17"
applies_to:
  - 永住申請者
direct_fact_fields:
  - 直近の在留資格：最長の在留期間（5年）が望ましい
  - 実務：3年以上の在留期間が一般的に要求される
  - 1年ビザは不利
  - 経過措置：5年ビザ要件は段階的に運用
ai_inferred_fields:
  - 3年ビザでも実例多数
needs_review_flags:
  - 5year_visa_strict_application_status
  - 3year_visa_acceptable_practice
  - guideline_revision_history
related_links:
  - title: "ISA — 永住ガイドライン"
    url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    organization: "出入国在留管理庁"
    display_label: "永住ガイドライン"
    locator: "在留期間"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請では現在の在留資格について「最長の在留期間（5年）をもって在留している」ことが望ましい。実務上3年以上が一般的。"
    source_title: "ISA — 永住ガイドライン"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html"
    source_organization: "出入国在留管理庁"
    source_locator: "在留期間"
    display_label: "永住直前在留資格"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

永住申請：直近5年/3年ビザ望ましい・1年は不利。

## must_say

- 5年ビザ望ましい
- 3年でも実例多数
- 1年ビザは不利

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
