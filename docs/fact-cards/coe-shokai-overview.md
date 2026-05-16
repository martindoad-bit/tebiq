---
fact_id: coe-shokai-overview
title: 在留資格認定証明書（COE）— 1〜3か月処理・無料・3か月有効
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "COE認定証明書"
citation_summary: "海外から新規入国する外国人向けの事前審査制度。処理1〜3か月、手数料無料、有効期限3か月以内に査証取得・上陸が必要。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户海外亲属/雇员要来日工作或长期居住"
  - "COE是什么"
  - "认定证明书办下来后多久要来日"
does_not_cover:
  - "短期滞在ビザ（査証）"
  - "永住者の家族呼び寄せ"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-3.html
    label: ISA — 在留資格認定証明書
    accessed: "2026-05-17"
applies_to:
  - 海外から新規入国する外国人
  - 受入機関の代理申請者
direct_fact_fields:
  - 処理期間：1〜3か月
  - 手数料：無料
  - 申請方法：本人/雇用主スタッフ/弁護士/行政書士、または海外居住者は代理申請
  - 受領方法：郵送 or 電子メール（2023年3月17日〜）
  - 在留期間：原則窓口持参（郵送不可）
  - 有効期間：原則発行から3か月以内（査証取得・上陸要）
ai_inferred_fields:
  - COE単独では入国不可、現地大使館で査証取得が別途必要
  - COVID等で有効期間延長措置がとられたこともある
needs_review_flags:
  - electronic_coe_visa_submission_procedure
  - validity_extension_history
  - reapplication_after_expiry
related_links:
  - title: "ISA — COE"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — COE"
    locator: "1〜3か月"
    relation: "official_reference"
evidence_points:
  - claim: "在留資格認定証明書の処理期間は1〜3か月、手数料無料、有効期限3か月以内に査証取得・上陸が必要。2023年3月17日から電子メール受領可。"
    source_title: "ISA — COE"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "1〜3か月・無料・3か月"
    display_label: "COE基本情報"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

COEは無料・1〜3か月処理・3か月有効。

## common_user_phrases

- COE 在留資格認定証明書
- COE 期限 3ヶ月
- COE 手数料

## must_say

- 手数料無料
- 処理1〜3か月
- 有効3か月

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
