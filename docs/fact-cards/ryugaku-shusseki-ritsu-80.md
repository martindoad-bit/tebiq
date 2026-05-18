---
fact_id: ryugaku-shusseki-ritsu-80
title: 留学 — 出席状況等の管理体制を申請書で確認
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-18"
sprint: "fact-window-bulk-1"
citation_label: "留学 出席状況"
citation_summary: "ISAの留学ページは、留学の活動を教育機関で教育を受ける活動とし、在留期間を4年3月を超えない範囲で個別指定としている。留学の申請書様式には、教育機関側の項目として留学生の出席状況、入管法19条1項の遵守状況、学習状況等の管理体制の有無がある。公式ページ上の要件説明は固定の出席率ラインを示していない。"
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
  - url: https://www.moj.go.jp/isa/content/930004106.pdf
    label: ISA — 在留期間更新許可申請書（留学）
    accessed: "2026-05-18"
applies_to:
  - 留学資格保持者
direct_fact_fields:
  - 留学資格活動：教育を受ける活動
  - 在留期間：4年3か月以内で個別指定
  - 在留期間更新許可申請書（留学）には、教育機関側の項目として留学生の出席状況、入管法19条1項の遵守状況、学習状況等の管理体制の有無がある
  - 公式ページ上の要件説明は固定の出席率ラインを示していない
ai_inferred_fields:
  - 個別の欠席理由、成績資料、学校種別ごとの運用は申請資料・学校資料で確認する
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
  - title: "ISA — 在留期間更新許可申請書（留学）"
    url: "https://www.moj.go.jp/isa/content/930004106.pdf"
    organization: "出入国在留管理庁"
    display_label: "留学更新申請書"
    locator: "留学生の出席状況"
    relation: "official_reference"
evidence_points:
  - claim: "在留期間更新許可申請書（留学）には、教育機関側の項目として留学生の出席状況、入管法19条1項の遵守状況、学習状況等の管理体制の有無がある。"
    source_title: "ISA — 在留期間更新許可申請書（留学）"
    source_url: "https://www.moj.go.jp/isa/content/930004106.pdf"
    source_organization: "出入国在留管理庁"
    source_locator: "留学生の出席状況"
    display_label: "留学 出席状況"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

在留期間更新許可申請書（留学）には、教育機関側の項目として留学生の出席状況、入管法19条1項の遵守状況、学習状況等の管理体制の有無がある。公式ページ上の要件説明は固定の出席率ラインを示していない。

## must_say

- 留学は教育機関で教育を受ける活動
- 留学更新申請書には出席状況・遵守状況・学習状況等の管理体制の有無の項目がある
- 個別の欠席理由、成績資料、学校種別ごとの運用は申請資料・学校資料で確認する
- 「出席率○%なら必ず許可／必ず不許可」と断定しない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-18 | Codex FACT rewrite | 80%ライン・成績評価の断定を外し、留学更新申請書の出席状況等管理体制欄に限定。 | ai_extracted | ai_extracted | rewrite |
