---
fact_id: henkou-shinsei-fee-6000
title: 在留資格変更許可申請 — 手数料6000円（オンライン5500円）
state: ai_extracted
risk_level: low
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "在留変更申請 手数料"
citation_summary: "在留資格変更許可申請の手数料は2025年4月以降6000円（オンライン5500円）、処理期間1〜2か月。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户问变更签证要多少钱"
  - "用户问变更要等多久"
does_not_cover:
  - "永住への変更（手数料1万円・別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-1.html
    label: ISA — 在留資格変更
    accessed: "2026-05-17"
applies_to:
  - 在留資格変更申請者
direct_fact_fields:
  - 手数料：6000円（収入印紙）
  - オンライン申請：5500円
  - 旧手数料（〜2025-03-31受付）：4000円
  - 処理期間：1〜2か月
  - 申請時期：変更事由発生〜現在の在留期間満了前
  - 申請場所：住居地管轄地方入管 / オンライン
  - 受付時間：平日9-12時、13-16時
ai_inferred_fields:
  - 手数料は許可時支払（不許可時は支払不要）
needs_review_flags:
  - permission_payment_timing_specifics
  - online_payment_method
related_links:
  - title: "ISA — 在留資格変更"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    organization: "出入国在留管理庁"
    display_label: "在留資格変更"
    locator: "6000円"
    relation: "official_reference"
evidence_points:
  - claim: "在留資格変更許可申請の手数料は2025年4月以降6000円（オンライン5500円）、旧手数料は4000円。処理1〜2か月。"
    source_title: "ISA — 在留資格変更"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
    source_organization: "出入国在留管理庁"
    source_locator: "6000円・5500円・4000円"
    display_label: "変更手数料6000円"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

変更申請手数料 6000円（オンライン5500円）・処理1-2か月。

## common_user_phrases

- 在留資格変更 手数料
- ビザ変更 6000円
- 在留変更 処理期間

## must_say

- 6000円（オンライン5500円）
- 1〜2か月処理

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
