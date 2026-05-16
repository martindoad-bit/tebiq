---
fact_id: teijusha-koshikai-vs-koshigai
title: 定住者 — 告示定住者と告示外定住者の区別
state: ai_extracted
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "定住者（告示/告示外）"
citation_summary: "定住者は法務大臣が告示で類型化した「告示定住者」（第三国定住難民、日系3世、中国残留邦人等）と、個別事情で変更許可される「告示外定住者」（離婚定住、日系2世・3世の配偶者等）に大別される。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户问定住者签证种类"
  - "用户离婚后被告知可以申请定住者"
  - "用户问日系3世配偶能否拿定住"
does_not_cover:
  - "離婚定住の具体的要件（別カード参照）"
  - "難民認定手続"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/longtermresident.html
    label: ISA — 定住者
    accessed: "2026-05-17"
applies_to:
  - 定住者資格を保有または希望する外国人
direct_fact_fields:
  - 在留期間：5年、3年、1年、6月、または個別指定期間（5年以内）
  - 告示定住例：第三国定住難民、日系3世、中国残留邦人等
  - 告示外定住例：日系2世/3世の配偶者、扶養を受ける未成年未婚実子、日本人等扶養6歳未満養子
  - 2022年4月変更：「未成年」が20歳未満から18歳未満に引下げ
ai_inferred_fields:
  - 告示外定住は新規認定（COE）でなく変更許可で取得が原則
  - 離婚定住は告示外定住の典型例（実務）
needs_review_flags:
  - rikon_teiju_requirements
  - 2022_amendment_existing_holders
  - third_country_refugee_quota
related_links:
  - title: "ISA — 定住者"
    url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 定住者"
    locator: "ページ内「告示」"
    relation: "official_reference"
evidence_points:
  - claim: "定住者は告示定住者（第三国定住難民、日系3世、中国残留邦人等）と告示外定住者（日系2世・3世の配偶者、扶養を受ける未成年未婚実子、6歳未満養子等）に分類される。2022年4月から未成年定義が18歳未満に引下げ。"
    source_title: "ISA — 定住者"
    source_url: "https://www.moj.go.jp/isa/applications/status/longtermresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「告示」「2022年4月」"
    display_label: "告示／告示外定住"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報に基づく定住者類型。

## current_effective_fact

定住者は告示と告示外に大別。離婚定住は告示外の典型例で、変更許可申請で取得する。

## exceptions_or_transition

- 2022年4月から未成年定義変更（20歳→18歳）

## common_user_phrases

- 定住者 種類
- 告示定住 違い
- 離婚 定住者 変更
- 日系3世 配偶者 定住

## must_say

- 告示定住と告示外定住に大別
- 告示外定住は変更許可で取得
- 2022年4月から未成年は18歳未満

## must_not_say

- 「離婚すれば自動的に定住者になる」（誤り、個別審査）

## qa_cases

**Q: 定住者にはどういう種類がありますか？**
A: 法務大臣の告示で類型化された「告示定住者」（第三国定住難民、日系3世、中国残留邦人等）と、個別事情で変更許可される「告示外定住者」（離婚定住、日系2世・3世の配偶者等）に大別されます。

## injection_format

### injection_certain_block

```
【定住者類型／ {{TODAY_ISO}} 公式】
・告示定住：第三国定住難民、日系3世、中国残留邦人等
・告示外定住：日系2世/3世の配偶者、離婚定住等（変更許可）
・在留期間：5/3/1/0.5年または個別指定
・2022年4月：未成年定義 → 18歳未満
```

### injection_needs_review_addendum

```
※ 離婚定住の具体要件は個別判断要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成（ai_extracted）。 | — | ai_extracted | new |
