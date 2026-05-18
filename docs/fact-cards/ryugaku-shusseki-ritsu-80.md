---
fact_id: ryugaku-shusseki-ritsu-80
title: 留学生 — 出席状況・成績は更新審査の重要要素
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "留学 出席率80%"
citation_summary: "留学の更新では、在籍状況、出席状況、成績、経費支弁能力などが確認される。具体的な数値基準は学校種別・資料・入管判断で異なるため、固定の合否ラインとして扱わない。"
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
  - 具体的な数値基準は学校種別・資料・入管判断で異なる
ai_inferred_fields:
  - 病気等の欠席理由は学校資料や説明書で確認されることがある
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
  - claim: "留学資格は教育を受ける活動が要件。更新時に在籍状況、出席状況、成績、経費支弁能力などが確認される。"
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

留学の更新では、在籍状況、出席状況、成績、経費支弁能力などが確認される。具体的な数値は固定の合否ラインとして扱わない。

## must_say

- 出席状況と成績は更新審査の重要資料
- 病気など理由がある欠席は学校資料や説明書を確認する
- 「出席率○%なら必ず許可／必ず不許可」と断定しない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
