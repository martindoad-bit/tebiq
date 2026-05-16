---
fact_id: tax-treaty-source-of-truth
title: 租税条約 — 国別軽減税率（届出書必須）
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "租税条約軽減"
citation_summary: "日本が締結している租税条約により、特定国出身者は源泉徴収税率の軽減・免除が可能。届出書を税務署に事前提出する必要がある。"
source_display_names:
  - "国税庁"
applies_when:
  - "租税条約 軽減"
  - "外国人 源泉 軽減"
does_not_cover:
  - "個別国の租税条約詳細"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm
    label: 国税庁 — 租税条約
    accessed: "2026-05-17"
applies_to:
  - 租税条約締結国出身の在留者
direct_fact_fields:
  - 締約国：80カ国以上（米国・中国・韓国・英国等）
  - 軽減：給与・配当・利子・使用料等
  - 届出書：税務署に事前提出
  - 留学生：日中租税条約等で給与所得免税の特例あり
ai_inferred_fields:
  - 中国留学生は中国本国に住所がある期間限定で給与免税
needs_review_flags:
  - chinese_student_specific_rule
  - latest_treaty_list_2026
  - touki-shukugen-sho_application_form
related_links:
  - title: "国税庁 — 租税条約"
    url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    organization: "国税庁"
    display_label: "租税条約"
    locator: "条約一覧"
    relation: "official_reference"
evidence_points:
  - claim: "日本は80カ国以上と租税条約を締結、軽減税率適用には届出書事前提出が必要。留学生向け給与所得免税の特例（日中条約等）あり。"
    source_title: "国税庁 — 租税条約"
    source_url: "https://www.nta.go.jp/taxes/shiraberu/shinkoku/kakutei.htm"
    source_organization: "国税庁"
    source_locator: "租税条約"
    display_label: "租税条約軽減"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

租税条約：80カ国以上・届出書必要。

## must_say

- 80カ国以上締約
- 届出書事前提出
- 留学生特例あり

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
