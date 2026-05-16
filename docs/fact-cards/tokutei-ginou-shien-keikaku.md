---
fact_id: tokutei-ginou-shien-keikaku
title: 特定技能 — 受入機関の支援計画義務（10項目）
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特技 支援計画"
citation_summary: "特定技能1号の受入機関は10項目の支援を提供する義務がある。自社または登録支援機関に委託可。違反は受入機関側の処分対象。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "特定技能 支援"
  - "登録支援機関"
does_not_cover:
  - "登録支援機関の登録要件（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html
    label: ISA — 特定技能
    accessed: "2026-05-17"
applies_to:
  - 特定技能受入機関
direct_fact_fields:
  - 支援10項目（事前ガイダンス、出入国送迎、住居確保、生活オリエンテーション、公的手続同行、日本語学習機会、相談苦情、日本人交流、転職支援、定期面談等）
  - 委託先：登録支援機関
  - 違反：改善命令、5年内受入停止等
ai_inferred_fields:
  - 中小事業者は委託が一般的
needs_review_flags:
  - 10items_each_specific_text
  - kaizenmeirei_specific_examples
  - 2go_no_shien_obligation
related_links:
  - title: "ISA — 特定技能"
    url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    organization: "出入国在留管理庁"
    display_label: "特技"
    locator: "支援"
    relation: "official_reference"
evidence_points:
  - claim: "特技1号受入機関は10項目の支援義務、自社or登録支援機関委託。違反は改善命令対象。"
    source_title: "ISA — 特定技能"
    source_url: "https://www.moj.go.jp/isa/applications/status/specifiedskilledworker.html"
    source_organization: "出入国在留管理庁"
    source_locator: "支援10項目"
    display_label: "特技支援計画"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

特技1号は受入機関に10項目支援義務。

## must_say

- 10項目支援義務
- 登録支援機関に委託可
- 違反は改善命令

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
