---
fact_id: tokutei-katsudou-17go
title: 特定活動17号 — 採用までの在留（内定者向け・要重写）
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特活17号"
citation_summary: "大学・専門学校等に在学中又は卒業後、企業から内定を受け、採用まで引き続き在留する場合の特定活動。卒業後の単なる就職活動継続とは別に扱う必要がある。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特活17号"
  - "内定 採用まで 特定活動"
does_not_cover:
  - "特活46号（接客等含む）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html
    label: ISA — 特定活動
    accessed: "2026-05-17"
applies_to:
  - 採用内定を受けた留学生等
direct_fact_fields:
  - 対象：大学・専門学校等に在学中又は卒業後で、企業から採用内定を受けた者
  - 趣旨：採用まで引き続き在留するための特定活動
ai_inferred_fields:
  - 在留期間、必要書類、就労可否は個別ページ・指定書で確認が必要
needs_review_flags:
  - shokusho_recommendation_format
  - extension_post_1year_routes
  - specific_documents_for_renewal
related_links:
  - title: "ISA — 特活"
    url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html"
    organization: "出入国在留管理庁"
    display_label: "特活"
    locator: "17号"
    relation: "official_reference"
evidence_points:
  - claim: "大学・専門学校等に在学中又は卒業後、企業から採用内定を受けた者が、採用まで引き続き在留するための特定活動がある。"
    source_title: "ISA — 特活"
    source_url: "https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00013.html"
    source_organization: "出入国在留管理庁"
    source_locator: "17号"
    display_label: "特活17号"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

特活17号：採用内定後、採用までの在留。卒業後の単なる就職活動継続とは分ける。

## must_say

- 採用内定後の在留
- 単なる就職活動継続とは別
- 就労可否・必要書類は指定書と入管で確認

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
