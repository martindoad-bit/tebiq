---
fact_id: jukyochi-todokede-14days
title: 住居地届出 — 新規/変更とも14日以内・区役所で完結
state: disabled   # DOMAIN 2026-05-17 REJECT: source URL 指向 nyuukokukanri10_00016 (配偶者届出页) 与 claim 错配；需重抓正确住居地届出官方源后再启用
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "住居地届出14日"
citation_summary: "中長期在留者は住居地を定めた日／変更した日から14日以内に市区町村窓口で届出義務。区役所での住民登録時に在留カード提示すれば届出済みとみなされる。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "引越し 14日 入管"
  - "新規入国 住所登録"
  - "区役所 在留カード 住所変更"
does_not_cover:
  - "在留資格別の所属機関届出（別カード）"
  - "国民健康保険・年金の住所変更（別手続）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html
    label: ISA — 住居地届出（新規）
    accessed: "2026-05-17"
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00022.html
    label: ISA — 住居地変更届出
    accessed: "2026-05-17"
applies_to:
  - 全ての中長期在留者
direct_fact_fields:
  - 新規届出：住居地を定めた日から14日以内
  - 変更届出：新住居地に移転した日から14日以内
  - 手数料：無料
  - 必要書類：住居地届出書、在留カード
  - 届出先：住居地の市区町村窓口
  - 区役所での住民基本台帳届出時は別途届出不要（みなし届出）
  - 90日以内未届で取消事由⑧⑨に該当（10事由）
ai_inferred_fields:
  - 海外旅行中の手続不可、帰国後14日内に届出
needs_review_flags:
  - representative_filing_specifics
  - delay_just_cause_scope
  - jumin_kihon_daichoh_special_perm_diff
related_links:
  - title: "ISA — 住居地届出（新規）"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    organization: "出入国在留管理庁"
    display_label: "住居地届出"
    locator: "14日以内"
    relation: "official_reference"
evidence_points:
  - claim: "新規/変更とも14日以内に市区町村窓口で届出。区役所で住民基本台帳届出時に在留カード提示すればみなし届出となる。"
    source_title: "ISA — 住居地届出"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html"
    source_organization: "出入国在留管理庁"
    source_locator: "14日以内・みなし届出"
    display_label: "住居地届出14日"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

新規/変更とも14日以内。区役所住民登録でみなし届出。

## common_user_phrases

- 引っ越し 14日 在留
- 住所変更 在留カード
- 区役所 在留カード 住所

## must_say

- 14日以内
- 区役所住民登録で完結
- 90日未届で取消事由

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
