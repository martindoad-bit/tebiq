---
fact_id: shougai-nenkin-overview
title: 障害年金 — 国民年金障害基礎・厚生年金障害厚生
state: ai_extracted
risk_level: medium
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "障害年金"
citation_summary: "病気・怪我で障害状態になった場合、保険料納付要件を満たせば障害基礎年金（国民年金）・障害厚生年金（厚生年金）を受給可。外国人も加入していれば対象。"
source_display_names:
  - "日本年金機構"
applies_when:
  - "外国人 障害年金"
  - "ケガ 年金"
does_not_cover:
  - "労災給付との関係"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住（年金関連）
    accessed: "2026-05-17"
applies_to:
  - 公的年金加入の外国人
direct_fact_fields:
  - 障害基礎年金（国民年金）：1級/2級
  - 障害厚生年金（厚生年金）：1級/2級/3級
  - 保険料納付要件：初診日前日に2/3以上納付 or 直近1年未納なし
  - 認定：初診日から1年6か月後
  - 外国人も対象（加入していれば）
ai_inferred_fields:
  - 永住者になった後の障害認定はOK
  - 帰国後も継続受給可能（条件あり）
needs_review_flags:
  - kyufu_kingaku_2026_grade
  - kaigai_zaijuu_change_handling
  - shoshin_certificate_specifics
related_links:
  - title: "年金機構（公式整合）"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "日本年金機構"
    display_label: "障害年金"
    locator: "障害年金"
    relation: "official_reference"
evidence_points:
  - claim: "障害基礎年金・障害厚生年金は保険料納付要件と障害認定を満たせば受給可。外国人も加入していれば対象。"
    source_title: "年金機構"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "日本年金機構"
    source_locator: "障害年金"
    display_label: "障害年金"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

障害年金は外国人も対象・保険料納付要件あり。

## must_say

- 国民/厚生年金2本立て
- 納付要件
- 外国人も対象

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
