---
fact_id: shoukibo-jigyou-zei
title: 個人事業税 — 法定業種で年290万円超の所得に課税
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "個人事業税"
citation_summary: "個人事業者は所得から事業主控除290万円を超える部分に対し、業種別税率3〜5%の個人事業税が課される。法定70業種が対象（一部は対象外）。"
source_display_names:
  - "総務省/都道府県税"
applies_when:
  - "個人事業 税金"
  - "フリーランス 290万"
does_not_cover:
  - "所得税の青色申告（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/individual-jigyozei.html
    label: 総務省 — 個人事業税
    accessed: "2026-05-17"
applies_to:
  - 個人事業を営む者
direct_fact_fields:
  - 事業主控除：年290万円
  - 税率：業種別3〜5%（5%が主流）
  - 法定70業種が対象
  - 課税主体：都道府県
  - 第3種事業（一部医療等）は3〜5%
ai_inferred_fields:
  - 文筆業・芸術業は対象外（実務）
  - 開業届・廃業届は税務署と都道府県両方
needs_review_flags:
  - bungei_geijutsu_exemption_official
  - foreigner_freelance_specific_rules
  - 290man_calculation_method
related_links:
  - title: "総務省 — 個人事業税"
    url: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/individual-jigyozei.html"
    organization: "総務省"
    display_label: "個人事業税"
    locator: "290万円・3-5%"
    relation: "official_reference"
evidence_points:
  - claim: "個人事業税は事業主控除290万円超の所得に業種別3〜5%課税。法定70業種が対象、都道府県課税。"
    source_title: "総務省 — 個人事業税"
    source_url: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/individual-jigyozei.html"
    source_organization: "総務省"
    source_locator: "290万円・3-5%"
    display_label: "個人事業税"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

個人事業税：290万円超部分に3-5%・70業種。

## must_say

- 290万円控除
- 業種別3-5%
- 都道府県課税

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
