---
fact_id: kekkon-todoke-procedure
title: 婚姻届 — 国際結婚は婚姻要件具備証明書必要
state: ai_verified   # LOOP3 2026-05-17: MOJ marriage notification + international marriage Q&A source
risk_level: medium
confidence: high
source_quality: official
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "国際結婚婚姻届"
citation_summary: "婚姻届は届出人の本籍地または所在地の市区町村へ提出する。国際結婚では国籍ごとに必要書類が異なり、婚姻要件具備証明書等を求められることがある。"
source_display_names:
  - "法務省"
applies_when:
  - "国際結婚 手続"
  - "婚姻要件具備証明書"
does_not_cover:
  - "婚姻後の日本人配偶者ビザ申請（別カード）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-2.html
    label: 法務省 — 婚姻届
    accessed: "2026-05-17"
  - url: https://www.moj.go.jp/MINJI/minji15.html
    label: 法務省 — 国際結婚、海外での出生等に関する戸籍Q&A
    accessed: "2026-05-17"
applies_to:
  - 国際結婚をする外国人/日本人
direct_fact_fields:
  - 提出先：届出人の本籍地または所在地の市区町村
  - 成年証人2名の署名が必要
  - 国際結婚では国籍ごとに必要書類が異なる
  - 婚姻要件具備証明書等を求められる場合がある
ai_inferred_fields:
  - 外国語書類には翻訳を求められることがある
needs_review_flags:
  - country_specific_substitute_documents
  - same_sex_partnership_japan_status
  - translation_official_requirements
related_links:
  - title: "法務省 — 婚姻届"
    url: "https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-2.html"
    organization: "法務省民事局"
    display_label: "戸籍"
    locator: "婚姻届"
    relation: "official_reference"
evidence_points:
  - claim: "婚姻届は届出人の本籍地または所在地の市区町村へ提出し、国際結婚では国籍ごとに必要書類が異なるため婚姻要件具備証明書等を求められることがある。"
    source_title: "法務省 — 婚姻届 / 国際結婚Q&A"
    source_url: "https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-2.html"
    source_organization: "法務省民事局"
    source_locator: "婚姻届"
    display_label: "国際結婚婚姻届"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_effective_fact

婚姻届：市区町村提出。国際結婚は国籍ごとに必要書類確認。

## must_say

- 本籍地または所在地の市区町村
- 国際結婚は国籍ごとの必要書類確認
- 婚姻成立と在留資格は別手続

## injection_format

### injection_certain_block

```text
- 婚姻届は、届出人の本籍地または所在地の市区町村へ提出する。
- 国際結婚では、外国人側の国籍によって必要書類が変わり、婚姻要件具備証明書等を求められることがある。
- 婚姻届が受理されることと、日本人配偶者等の在留資格が許可されることは別。配偶者系在留資格は入管で別途審査される。
- 出典: 法務省「婚姻届」 https://www.moj.go.jp/ONLINE/FAMILYREGISTER/5-2.html
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
| 2026-05-17 | Codex Loop3 | 国際結婚Q&A前提で婚姻届手続に限定しruntime昇格。 | ai_extracted | ai_verified | rewrite/promote |
