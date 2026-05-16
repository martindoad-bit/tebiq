---
fact_id: hometown-tax-furusato
title: ふるさと納税 — 外国人居住者も対象・住民税前年所得ベース
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "ふるさと納税外国人"
citation_summary: "ふるさと納税は日本に住所を有し住民税課税対象者が利用可。外国人居住者も対象。2026年10月からポータルサイトポイント禁止予定。"
source_display_names:
  - "総務省"
applies_when:
  - "ふるさと納税 外国人"
  - "ふるさと納税 上限"
does_not_cover:
  - "個別自治体の返礼品"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/about/index.html
    label: 総務省 — ふるさと納税
    accessed: "2026-05-17"
applies_to:
  - 日本住所地住民税課税対象者
direct_fact_fields:
  - 外国人居住者も対象
  - 上限：所得・家族構成により異なる
  - 自己負担：2000円
  - ワンストップ特例：給与所得者で5自治体以下
  - 2026年10月：ポータルサイトポイント禁止予定
ai_inferred_fields:
  - 来日1年目は住民税ゼロのため対象外
needs_review_flags:
  - first_year_specific_handling
  - portal_point_kinshi_date_clarity
  - wanstop_overseas_status
related_links:
  - title: "総務省 — ふるさと納税"
    url: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/about/index.html"
    organization: "総務省"
    display_label: "ふるさと納税"
    locator: "外国人"
    relation: "official_reference"
evidence_points:
  - claim: "ふるさと納税は外国人居住者も対象。自己負担2000円、ワンストップ特例で給与所得者5自治体以下対応。2026年10月ポータルポイント禁止予定。"
    source_title: "総務省 — ふるさと納税"
    source_url: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/about/index.html"
    source_organization: "総務省"
    source_locator: "ふるさと納税"
    display_label: "ふるさと納税外国人"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

ふるさと納税：外国人も対象・2026-10ポイント禁止予定。

## must_say

- 外国人も対象
- 自己負担2000円
- 2026-10ポイント禁止予定

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
