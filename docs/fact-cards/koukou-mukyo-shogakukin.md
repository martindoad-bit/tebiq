---
fact_id: koukou-mukyo-shogakukin
title: 高校就学支援金 — 外国人世帯も対象（所得910万円目安）
state: ai_extracted
risk_level: low
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "高校就学支援金"
citation_summary: "公立高校は実質無償、私立高校も世帯年収910万円未満で最大39.6万円の就学支援金。中長期在留者の世帯も対象。2026年度から所得制限撤廃予定。"
source_display_names:
  - "文部科学省"
applies_when:
  - "高校 学費 外国人"
  - "就学支援金"
does_not_cover:
  - "大学奨学金（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mext.go.jp/a_menu/shotou/clarinet/002.htm
    label: 文科省 — 就学支援
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者の高校生世帯
direct_fact_fields:
  - 公立：実質無償（年11.88万円相当）
  - 私立：世帯年収910万円未満で最大39.6万円
  - 中長期在留者世帯も対象
  - 2026年度予定：所得制限撤廃
  - 在留外国人の子も対象
ai_inferred_fields:
  - 申請は学校経由
needs_review_flags:
  - 2026_specific_revision_status
  - tokutei_taikoku_assistance_overlap
  - mainakado_application_simplification
related_links:
  - title: "文科省 — 就学支援"
    url: "https://www.mext.go.jp/a_menu/shotou/clarinet/002.htm"
    organization: "文部科学省"
    display_label: "就学支援"
    locator: "910万円"
    relation: "official_reference"
evidence_points:
  - claim: "公立高校は実質無償、私立高校も世帯年収910万円未満で最大39.6万円の就学支援金。中長期在留者の世帯も対象。2026年度から所得制限撤廃予定。"
    source_title: "文科省 — 就学支援"
    source_url: "https://www.mext.go.jp/a_menu/shotou/clarinet/002.htm"
    source_organization: "文部科学省"
    source_locator: "910万円・39.6万円"
    display_label: "高校就学支援金"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

高校就学支援金：外国人も対象・2026予定で所得制限撤廃。

## must_say

- 公立実質無償
- 私立最大39.6万円
- 2026予定で所得制限撤廃

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
