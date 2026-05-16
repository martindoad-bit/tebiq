---
fact_id: kokumin-kenko-hoken-14days
title: 国民健康保険 — 退職/転入から14日以内に加入・遡及課金
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "国保14日加入"
citation_summary: "退職・転入後14日以内に区役所で国民健康保険加入手続が必要。遅れても加入義務発生日（資格喪失日翌日）まで遡及して保険料が課される。"
source_display_names:
  - "厚生労働省/市区町村"
applies_when:
  - "退職後 国保"
  - "転入 国保"
does_not_cover:
  - "任意継続（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken07/index.html
    label: 厚労省 — 国民健康保険
    accessed: "2026-05-17"
applies_to:
  - 中長期在留者で職域保険未加入の者
direct_fact_fields:
  - 加入期限：14日以内（区役所）
  - 遡及課金：資格喪失日翌日まで
  - 必要書類：在留カード、健康保険資格喪失証明書、マイナンバー
  - 保険料：前年所得ベース
ai_inferred_fields:
  - 留学生・家族滞在も対象（職域保険なしの場合）
  - 滞納は永住申請審査に影響
needs_review_flags:
  - shotoku_calc_for_first_year
  - menjo_kijun_for_low_income
  - mainakado_alternative_methods
related_links:
  - title: "厚労省 — 国民健康保険"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken07/index.html"
    organization: "厚生労働省"
    display_label: "国民健康保険"
    locator: "14日"
    relation: "official_reference"
evidence_points:
  - claim: "国保は退職/転入後14日以内に区役所で加入手続必要。遅れても資格喪失日翌日まで遡及課金。"
    source_title: "厚労省 — 国民健康保険"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/iryouhoken07/index.html"
    source_organization: "厚生労働省"
    source_locator: "14日・遡及"
    display_label: "国保14日加入"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_effective_fact

国保：14日以内加入・遡及課金。

## must_say

- 14日以内
- 遡及課金
- 永住申請に影響

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
