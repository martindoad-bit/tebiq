---
fact_id: gaimen-kirikae-process
title: 外免切替 — 適性/知識/技能試験（一部国家免除）
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "外免切替"
citation_summary: "外国免許から日本免許への切替には適性試験・知識試験・技能試験が課される（一部国家は試験免除）。住所地管轄の運転免許試験場で申請。"
source_display_names:
  - "警察庁"
applies_when:
  - "外免切替"
  - "中国免許 日本"
does_not_cover:
  - "国際免許の使用（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.npa.go.jp/policies/application/license_renewal/index.html
    label: 警察庁 — 運転免許
    accessed: "2026-05-17"
applies_to:
  - 外国免許保有者
direct_fact_fields:
  - 適性試験：視力等
  - 知識試験：日本の交通ルール
  - 技能試験：実技
  - 免除国家あり（スイス、ドイツ等）
  - 必要書類：外国免許、翻訳文（JAF等）、滞在証明、住民票、写真
  - 申請場所：住所地管轄試験場
ai_inferred_fields:
  - 試験回数制限なしだが落ちる人多い
needs_review_flags:
  - exemption_country_complete_list_2026
  - chinese_license_specific_documents
  - jaf_translation_authority
related_links:
  - title: "警察庁 — 運転免許"
    url: "https://www.npa.go.jp/policies/application/license_renewal/index.html"
    organization: "警察庁"
    display_label: "運転免許"
    locator: "外免切替"
    relation: "official_reference"
evidence_points:
  - claim: "外免切替には適性・知識・技能試験が必要。一部国家は試験免除。"
    source_title: "警察庁 — 運転免許"
    source_url: "https://www.npa.go.jp/policies/application/license_renewal/index.html"
    source_organization: "警察庁"
    source_locator: "外免切替"
    display_label: "外免切替手続"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

外免切替：適性・知識・技能試験必要。

## must_say

- 3試験必要
- 免除国家あり
- JAF等の翻訳必要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
