---
fact_id: koukou-mukyo-shogakukin
title: 高校就学支援金 — 外国人世帯の対象確認
state: ai_extracted
runtime_bucket: NEEDS_REWRITE
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "高校就学支援金"
citation_summary: "高等学校等就学支援金は、学校種別、世帯状況、所得、在住・在学状況などにより対象確認が必要。外国籍世帯でも対象となる場合があるが、学校・自治体・制度年度で必要書類や扱いが異なる。"
source_display_names:
  - "文部科学省"
applies_when:
  - "高校 学費 外国人"
  - "就学支援金"
does_not_cover:
  - "大学奨学金（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mext.go.jp/a_menu/shotou/mushouka/
    label: 文科省 — 就学支援
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者の高校生世帯
direct_fact_fields:
  - 高等学校等就学支援金制度あり
  - 学校種別、世帯状況、所得、在住・在学状況などにより対象確認が必要
  - 外国籍世帯でも対象となる場合があるが、必要書類や扱いは学校・自治体・制度年度で異なる
ai_inferred_fields:
  - 申請は学校経由で案内されることが多い
needs_review_flags:
  - 2026_specific_revision_status
  - tokutei_taikoku_assistance_overlap
  - mainakado_application_simplification
related_links:
  - title: "文科省 — 就学支援"
    url: "https://www.mext.go.jp/a_menu/shotou/mushouka/"
    organization: "文部科学省"
    display_label: "就学支援"
    locator: "高等学校等就学支援金"
    relation: "official_reference"
evidence_points:
  - claim: "高等学校等就学支援金は、学校種別、世帯状況、所得、在住・在学状況などにより対象確認が必要。外国籍世帯でも対象となる場合があるが、学校・自治体・制度年度で必要書類や扱いが異なる。"
    source_title: "文科省 — 就学支援"
    source_url: "https://www.mext.go.jp/a_menu/shotou/mushouka/"
    source_organization: "文部科学省"
    source_locator: "高等学校等就学支援金"
    display_label: "高校就学支援金"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

高等学校等就学支援金は、学校種別、世帯状況、所得、在住・在学状況などにより対象確認が必要。外国籍世帯でも対象となる場合があるが、学校・自治体・制度年度で必要書類や扱いが異なる。

## must_say

- 学校を通じて制度対象と必要書類を確認する
- 所得・世帯状況・学校種別で扱いが変わる
- 外国籍世帯が全員対象／全員対象外とは言わない

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-18 | Codex Loop11 | 旧 clarinet URL と旧所得目安 locator を撤回し、official_sources と同じ文科省就学支援金ページへ同期。runtime/材料索引からは外す。 | ai_extracted | ai_extracted | loop11-source-sync |
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
