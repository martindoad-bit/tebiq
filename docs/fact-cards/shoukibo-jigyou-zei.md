---
fact_id: shoukibo-jigyou-zei
title: 個人事業税 — 法定業種で年290万円超の所得に課税
state: ai_verified
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "個人事業税"
citation_summary: "個人事業者は所得から事業主控除290万円を超える部分に対し、業種別税率3〜5%の個人事業税が課される。法定70業種が対象（一部は対象外）。"
source_display_names:
  - "東京都主税局"
applies_when:
  - "個人事業 税金"
  - "フリーランス 290万"
does_not_cover:
  - "所得税の青色申告（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.tax.metro.tokyo.lg.jp/kazei/work/kojin_ji
    label: 東京都主税局 — 個人事業税
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
  - title: "東京都主税局 — 個人事業税"
    url: "https://www.tax.metro.tokyo.lg.jp/kazei/work/kojin_ji"
    organization: "東京都主税局"
    display_label: "個人事業税"
    locator: "290万円・3-5%"
    relation: "official_reference"
evidence_points:
  - claim: "個人事業税は事業主控除290万円超の所得に業種別3〜5%課税。法定70業種が対象、都道府県課税。"
    source_title: "東京都主税局 — 個人事業税"
    source_url: "https://www.tax.metro.tokyo.lg.jp/kazei/work/kojin_ji"
    source_organization: "東京都主税局"
    source_locator: "290万円・3-5%"
    display_label: "個人事業税"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

個人事業税：290万円超部分に3-5%・70業種。

## must_say

- 290万円控除
- 業種別3-5%
- 都道府県課税

## injection_format

### injection_certain_block

```text
【個人事業税／{{TODAY_ISO}} 公式】
個人事業税は、地方税として都道府県が課税する税金。
法定業種に該当する個人事業について、事業主控除290万円を超える所得部分に、業種別の税率で課税される。
自分の仕事が課税対象業種か、税率が何％かは、事業所所在地の都道府県税事務所で確認する。
```

### injection_needs_review_addendum

```text
※ 文筆・芸術・IT等の業種判定、開廃業届、経営管理更新への影響は個別確認。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
