---
fact_id: kika-6-conditions
title: 帰化6要件 — 住所5年/能力18歳以上/素行/生計/重国籍防止/憲法遵守
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "帰化6要件"
citation_summary: "帰化許可申請の6要件：(1)継続5年以上日本居住、(2)18歳以上で本国法でも成人、(3)素行善良、(4)生計安定、(5)原国籍喪失（または無国籍）、(6)憲法遵守。"
source_display_names:
  - "法務省民事局"
applies_when:
  - "帰化 条件"
  - "帰化 何年住むと"
  - "帰化 二重国籍"
does_not_cover:
  - "永住との違い（別カード）"
  - "簡易帰化（日本人配偶者・日本生まれ）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/MINJI/minji78.html
    label: 法務省民事局 — 帰化Q&A
    accessed: "2026-05-17"
applies_to:
  - 帰化希望者
direct_fact_fields:
  - 住所要件：継続5年以上日本居住＋適法な在留資格
  - 能力要件：18歳以上＋本国法で成人
  - 素行要件：犯罪歴・納税状況・社会迷惑の総合判断
  - 生計要件：安定した生活基盤（配偶者・親族の資産も可）
  - 重国籍防止：無国籍 or 原国籍喪失（一定例外あり）
  - 憲法遵守要件：政府転覆企図者は不許可
  - 申請先：住所地管轄法務局/地方法務局
ai_inferred_fields:
  - 簡易帰化（日本人配偶者婚3年/日本人実子等）は条件緩和
needs_review_flags:
  - kani_kika_specific_conditions
  - dual_nationality_exception_scope
  - processing_period_specifics
related_links:
  - title: "法務省 — 帰化Q&A"
    url: "https://www.moj.go.jp/MINJI/minji78.html"
    organization: "法務省民事局"
    display_label: "帰化Q&A"
    locator: "6条件"
    relation: "official_reference"
evidence_points:
  - claim: "帰化は住所5年・18歳以上・素行・生計・重国籍防止・憲法遵守の6要件。住所地管轄法務局に申請。"
    source_title: "法務省 — 帰化Q&A"
    source_url: "https://www.moj.go.jp/MINJI/minji78.html"
    source_organization: "法務省民事局"
    source_locator: "6条件列挙"
    display_label: "帰化6要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

帰化6要件：住所5年・18歳・素行・生計・重国籍防止・憲法遵守。

## common_user_phrases

- 帰化 5年
- 帰化 二重国籍
- 帰化 条件

## must_say

- 6要件
- 住所5年要件
- 原国籍喪失要件（重国籍防止）

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
