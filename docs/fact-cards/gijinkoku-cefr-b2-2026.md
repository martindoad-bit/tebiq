---
fact_id: gijinkoku-cefr-b2-2026
title: 技人国 — 2026年4月15日からカテゴリー3/4対人業務にCEFR B2必須
state: ai_verified
risk_level: high
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "技人国B2要件2026"
citation_summary: "2026年4月15日から、技人国カテゴリー3/4で対人業務を含む場合、申請者本人にCEFR B2相当（JLPT N2 / BJT 400+ / 日本の高校卒業等）の日本語能力が必須となる。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户问技人国新規申请要N2"
  - "用户问通訳・翻訳職的日语要件"
  - "中小企業就職の技人国"
does_not_cover:
  - "カテゴリー1/2は本要件対象外"
  - "技人国の専攻一致原則（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    label: ISA — 技人国
    accessed: "2026-05-17"
applies_to:
  - 技人国カテゴリー3/4の申請者で対人業務を行う者
direct_fact_fields:
  - 施行日：2026年4月15日
  - 対象：カテゴリー3/4で対人業務含む申請
  - 要件：CEFR B2相当以上
  - 証明方法：JLPT N2以上 / BJT 400点以上 / 日本の高校卒業 等
  - カテゴリー1/2は本要件対象外
ai_inferred_fields:
  - 「対人業務」の具体的範囲は職務内容説明書で判断
  - 既存保持者の更新時の取扱は別途確認要
needs_review_flags:
  - taijin_gyomu_scope
  - existing_holder_renewal_b2_obligation
  - cefr_b2_alternative_proofs_full_list
related_links:
  - title: "ISA — 技人国"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "技人国"
    locator: "CEFR B2"
    relation: "official_reference"
evidence_points:
  - claim: "2026年4月15日からカテゴリー3/4で対人業務を含む技人国申請にCEFR B2相当（JLPT N2 / BJT 400+ / 日本の高校卒業等）が必須。"
    source_title: "ISA — 技人国"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "CEFR B2・2026-04-15"
    display_label: "技人国B2要件2026"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

2026-04-15からカテ3/4対人業務はB2必須。

## common_user_phrases

- 技人国 N2 必須
- 技人国 日本語 要件
- CEFR B2 技人国

## must_say

- 2026-04-15施行
- カテ3/4対人業務のみ対象
- N2/BJT400/高校卒業等で証明

## injection_format

### injection_certain_block

```
【技人国・日本語能力要件／ 2026-05-17 公式】
・2026年4月15日以降、カテゴリー3/4で主に言語能力を用いる対人業務を行う場合、日本語能力証明が問題になる
・JLPT N2、BJT 400点、日本の高校卒業等が証明例として扱われる
・カテゴリー、業務内容、更新/変更/新規の別は個別に確認する
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
