---
fact_id: eijuu-application-fee-10000
title: 永住許可申請 — 手数料10000円（許可時支払）・処理4〜6か月
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "永住手数料1万円"
citation_summary: "永住許可申請の手数料は2025年4月以降10000円（収入印紙、許可時支払）。旧手数料は8000円。処理期間は4〜6か月。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住申請 費用"
  - "永住 何ヶ月かかる"
does_not_cover:
  - "更新・変更の手数料（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html
    label: ISA — 永住許可申請
    accessed: "2026-05-17"
applies_to:
  - 永住許可申請者
direct_fact_fields:
  - 手数料：10000円（収入印紙・許可時支払）
  - 旧手数料（〜2025-03-31）：8000円
  - 処理期間：4〜6か月
  - 不許可時：支払不要
ai_inferred_fields:
  - 書類不足は審査大幅遅延または不利益処分
needs_review_flags:
  - online_application_fee_for_eijuu
  - waiver_for_low_income_applicants
related_links:
  - title: "ISA — 永住申請"
    url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    organization: "出入国在留管理庁"
    display_label: "永住申請"
    locator: "10000円・4〜6か月"
    relation: "official_reference"
evidence_points:
  - claim: "永住申請の手数料は10000円（許可時支払）、処理期間4〜6か月。"
    source_title: "ISA — 永住申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/zairyu_eijyu03.html"
    source_organization: "出入国在留管理庁"
    source_locator: "10000円・4〜6か月"
    display_label: "永住手数料・期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

永住申請手数料1万円・処理4-6か月。

## common_user_phrases

- 永住 費用
- 永住 何ヶ月
- 永住 1万円

## must_say

- 10000円（許可時支払）
- 4〜6か月
- 不許可なら支払不要

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
