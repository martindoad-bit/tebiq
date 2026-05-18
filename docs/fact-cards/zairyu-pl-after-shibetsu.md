---
fact_id: zairyu-pl-after-shibetsu
title: 配偶者死別後 — 死別配偶者の在留資格の取扱
state: ai_extracted
runtime_bucket: L5_ONLY
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "死別後配偶者ビザ"
citation_summary: "日本人/永住者と死別した配偶者は14日以内届出義務。在留継続には定住者への変更検討。子養育中等の場合は告示外定住として認容されやすい。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "配偶者 死別 ビザ"
  - "夫死亡 在留"
does_not_cover:
  - "離婚後の取扱（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html
    label: ISA — 配偶者届出
    accessed: "2026-05-17"
applies_to:
  - 日本人/永住者の配偶者で死別者
direct_fact_fields:
  - 14日以内届出義務
  - 在留期限内は現資格で継続可
  - 定住者変更：告示外定住として
  - 6か月不活動で取消事由⑦
  - 子養育中は変更認容されやすい（実務）
ai_inferred_fields:
  - 残余在留期間内は現資格で安定
  - 死別証明書（戸籍）必要
needs_review_flags:
  - kazoku-saiko_specific_definition_post_death
  - shibetsu_proof_documents_specifics
  - jouin_jukyu_status_potential_change
related_links:
  - title: "ISA — 配偶者届出"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    organization: "出入国在留管理庁"
    display_label: "配偶者届出"
    locator: "死別"
    relation: "official_reference"
evidence_points:
  - claim: "日本人/永住者と死別した配偶者は14日以内届出義務。在留継続には定住者（告示外）への変更検討、子養育中等は認容されやすい。"
    source_title: "ISA — 配偶者届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    source_organization: "出入国在留管理庁"
    source_locator: "死別"
    display_label: "死別後配偶者ビザ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

配偶者死別：14日届出・定住者変更検討。

## must_say

- 14日届出
- 定住者変更検討
- 子養育で認容されやすい

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
