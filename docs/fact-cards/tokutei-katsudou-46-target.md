---
fact_id: tokutei-katsudou-46-target
title: 特定活動46号 — 本邦大学卒+N1で接客等含む幅広い活動可
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "特活46号要件"
citation_summary: "本邦大学/大学院卒業＋N1相当の日本語能力を持つ者が対象の特定活動46号。技人国では認められない接客や定型業務を含む幅広い活動が可能。配偶者は特活47号。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "日本の大学卒業 接客業"
  - "N1 特活 46号"
does_not_cover:
  - "技人国との切り替え判断（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/tokutei46.html
    label: ISA — 特活46号
    accessed: "2026-05-17"
applies_to:
  - 本邦大学/大学院卒の外国人
direct_fact_fields:
  - 学歴：本邦の大学/大学院を卒業/修了（短大・専門学校・海外大学は対象外）
  - 日本語：N1または同等
  - 活動範囲：接客、店長業務、定型作業含む幅広い業務
  - 配偶者の特定活動：47号
ai_inferred_fields:
  - 業務に日本語使用が必須（単純労働だけは不可）
  - 海外大学卒は技人国ルートか別ビザ
needs_review_flags:
  - n1_equivalent_proof_methods
  - bk_law_high_school_eligibility
  - 47go_application_specifics
related_links:
  - title: "ISA — 特活46号"
    url: "https://www.moj.go.jp/isa/applications/status/tokutei46.html"
    organization: "出入国在留管理庁"
    display_label: "特活46号"
    locator: "本邦大学卒+N1"
    relation: "official_reference"
evidence_points:
  - claim: "特活46号は本邦大学/大学院卒+N1相当が必要。接客等含む幅広い活動可。配偶者は47号。"
    source_title: "ISA — 特活46号"
    source_url: "https://www.moj.go.jp/isa/applications/status/tokutei46.html"
    source_organization: "出入国在留管理庁"
    source_locator: "本邦大学卒+N1"
    display_label: "特活46号要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

特活46号：本邦大学卒+N1+幅広業務可。

## must_say

- 本邦大学/大学院卒
- N1相当
- 接客含む幅広業務可

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
