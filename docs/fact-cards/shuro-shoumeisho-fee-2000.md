---
fact_id: shuro-shoumeisho-fee-2000
title: 就労資格証明書 — 手数料2000円（オンライン1600円）・転職時に推奨
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "就労資格証明書手数料"
citation_summary: "就労資格証明書は申請者の在留資格範囲で行える就労を証明する書類。手数料2000円（オンライン1600円）、即日（雇用変更時は1〜3か月）。転職時の在留期限まで時間がある場合に取得推奨。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "技人国で転職した"
  - "新職場で在留資格が通用するか確認したい"
does_not_cover:
  - "在留資格変更が必要なケース（業務範囲外）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html
    label: ISA — 就労資格証明書
    accessed: "2026-05-17"
applies_to:
  - 就労可能な在留資格保持者で転職した者
direct_fact_fields:
  - 手数料：2000円（オンライン1600円）
  - 旧手数料（〜2025-03-31）：1200円
  - 処理：即日（雇用変更ありなら1〜3か月）
  - 新雇用先の活動内容を明示する書類が必要
  - 申請場所：管轄地方入管 / オンライン
  - 受付時間：平日9-12時、13-16時
ai_inferred_fields:
  - 転職後の在留期間更新時の許否予測になる（実務）
needs_review_flags:
  - sokujitsu_employment_change_definition
  - online_payment_method_specifics
related_links:
  - title: "ISA — 就労資格証明書"
    url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html"
    organization: "出入国在留管理庁"
    display_label: "就労資格証明書"
    locator: "2000円・1600円"
    relation: "official_reference"
evidence_points:
  - claim: "就労資格証明書は手数料2000円（オンライン1600円）、即日（雇用変更ありなら1〜3か月）。新雇用先の活動内容書類が必要。"
    source_title: "ISA — 就労資格証明書"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html"
    source_organization: "出入国在留管理庁"
    source_locator: "2000円・即日"
    display_label: "就労資格証明書 手数料・期間"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

就労資格証明書 2000円（オンライン1600円）、即日（雇用変更時は1-3か月）。

## common_user_phrases

- 就労資格証明書
- 転職 在留資格 証明
- 就労資格 手数料

## must_say

- 2000円（オンライン1600円）
- 雇用変更時は1〜3か月
- 転職時取得推奨

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
