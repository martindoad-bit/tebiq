---
fact_id: coe-email-receipt-2023
title: COE電子メール受領（2023年3月17日〜）— スマホ提示で査証申請可
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "COE電子メール受領"
citation_summary: "2023年3月17日からCOEは電子メール受領が可能。海外申請者はスマホでメール提示するか印刷物で査証申請・上陸できる。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户问海外亲属COE能否电子化"
  - "COE快递成本能否省"
does_not_cover:
  - "オンライン申請の利用者登録手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/10_00136.html
    label: ISA — COE電子化
    accessed: "2026-05-17"
applies_to:
  - COE申請者および受入機関
direct_fact_fields:
  - 開始日：2023年3月17日
  - 対象：オンライン申請でメール受領選択者 / 窓口申請で事前利用者登録者
  - フロー：メール受領→URLから受領登録→査証/上陸申請時にスマホ提示or印刷
  - サポート：在留申請オンラインシステムヘルプデスク 0570-3786-3053（平日9-17時）
ai_inferred_fields:
  - 紙COEと電子COEは法的に同等効力
needs_review_flags:
  - paper_vs_electronic_legal_equivalence
  - moshikomi_form_specific_name
related_links:
  - title: "ISA — COE電子化"
    url: "https://www.moj.go.jp/isa/applications/procedures/10_00136.html"
    organization: "出入国在留管理庁"
    display_label: "COE電子化"
    locator: "2023年3月17日"
    relation: "official_reference"
evidence_points:
  - claim: "2023年3月17日からCOE電子メール受領サービス開始。オンライン申請者と窓口で事前利用者登録した者が対象。"
    source_title: "ISA — COE電子化"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/10_00136.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2023年3月17日"
    display_label: "COE電子化開始"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

2023-03-17からCOEは電子メール受領可。

## common_user_phrases

- COE 電子メール
- COE デジタル化
- COE スマホ 提示

## must_say

- 2023-03-17開始
- オンライン or 窓口事前登録が対象

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
