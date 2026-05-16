---
fact_id: ryugaku-shusseki-ritsu-80
title: 留学生 — 出席率80%基準・更新審査の重要要素
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "留学 出席率80%"
citation_summary: "留学ビザの更新審査では学校出席率が重要な判断要素となる。一般的に80%以上が望ましいとされ、70%以下は不許可リスクが高い（実務）。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "留学生 出席率 更新"
  - "日本語学校 出席率"
does_not_cover:
  - "退学処分の効果"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/student.html
    label: ISA — 留学
    accessed: "2026-05-17"
applies_to:
  - 留学資格保持者
direct_fact_fields:
  - 留学資格活動：教育を受ける活動
  - 在留期間：4年3か月以内で個別指定
  - 更新時：在籍・出席状況・成績の確認あり
  - 出席率80%以上が実務目安
  - 70%以下は不許可リスク
ai_inferred_fields:
  - 病気等の正当な理由ある欠席は説明書添付で考慮
  - 大学・大学院は専門学校・日本語学校より緩い傾向
needs_review_flags:
  - 80percent_official_or_practice
  - eligibility_for_low_grade_seishin
  - graduate_school_specific_threshold
related_links:
  - title: "ISA — 留学"
    url: "https://www.moj.go.jp/isa/applications/status/student.html"
    organization: "出入国在留管理庁"
    display_label: "留学"
    locator: "出席率"
    relation: "official_reference"
evidence_points:
  - claim: "留学資格は教育を受ける活動が要件。更新時に在籍・出席状況が審査される。実務では80%以上が目安。"
    source_title: "ISA — 留学"
    source_url: "https://www.moj.go.jp/isa/applications/status/student.html"
    source_organization: "出入国在留管理庁"
    source_locator: "教育を受ける"
    display_label: "留学 出席率"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

留学：出席率80%目安・70%以下は不許可リスク。

## must_say

- 80%以上目安
- 70%以下は不許可リスク
- 病気等は説明書

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
