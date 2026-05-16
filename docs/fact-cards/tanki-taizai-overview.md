---
fact_id: tanki-taizai-overview
title: 短期滞在ビザ — 90日上限・就労不可・原則更新不可
state: ai_extracted
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "短期滞在ビザ"
citation_summary: "短期滞在は観光・親族訪問・業務連絡等のための在留資格で、15/30/90日のいずれか。就労不可、原則更新不可、人道上の理由がある場合のみ例外的に更新可能。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户用短期访问签证来日本想留长"
  - "亲属持短期来访能否变更签证"
  - "短期访问能否打工"
does_not_cover:
  - "短期から就労資格への変更（原則不可、特例ルートのみ）"
  - "ビザ免除国家リスト（外務省所管）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/temporaryvisitor.html
    label: ISA — 短期滞在
    accessed: "2026-05-17"
applies_to:
  - 短期滞在で来日中の外国人
  - 短期で家族を呼ぶ予定の在留者
direct_fact_fields:
  - 在留期間：15/30/90日のいずれか
  - 活動範囲：観光、保養、スポーツ、親族訪問、見学、講習、会合、業務連絡等
  - 就労不可
  - 更新：原則不可、人道的理由（病気治療等）のみ例外
  - 中長期在留者ではない（在留カード交付なし）
ai_inferred_fields:
  - 90日上限を超えての連続滞在は不法残留
  - 短期から技人国等への変更は原則不可（一部特例ルートあり）
needs_review_flags:
  - exceptional_change_routes
  - humanitarian_renewal_scope
  - visa_exemption_country_list_link
related_links:
  - title: "ISA — 短期滞在"
    url: "https://www.moj.go.jp/isa/applications/status/temporaryvisitor.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 短期滞在"
    locator: "ページ内「90日」「30日」「15日」"
    relation: "official_reference"
evidence_points:
  - claim: "短期滞在は15/30/90日のいずれかで、観光・親族訪問・業務連絡等が対象。就労不可、原則更新不可。人道上やむを得ない事情がある場合のみ例外的に更新申請可能。"
    source_title: "ISA — 短期滞在"
    source_url: "https://www.moj.go.jp/isa/applications/status/temporaryvisitor.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「90日若しくは30日又は15日」「更新は原則として」"
    display_label: "短期滞在 90日上限・就労不可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報。

## current_effective_fact

短期滞在は最長90日、就労不可、原則更新不可。

## common_user_phrases

- 短期滞在 90日 延長
- 観光ビザ 働ける
- 短期滞在 変更
- 親族訪問ビザ

## must_say

- 90日上限
- 就労不可
- 原則更新不可

## must_not_say

- 「短期滞在でアルバイトできる」（誤り）
- 「90日経ったらまた90日入ればいい」（実質不法残留）

## qa_cases

**Q: 短期滞在で来た親が長く滞在したい。**
A: 短期滞在は原則更新不可です。人道的理由（病気治療等）以外は90日以内に出国が必要。長期滞在には別の在留資格（家族滞在等）への変更または認定証明書取得が必要となります。

## injection_format

### injection_certain_block

```
【短期滞在／ {{TODAY_ISO}} 公式】
・期間：15/30/90日
・活動：観光/親族訪問/業務連絡等
・就労：不可
・更新：原則不可（人道的理由のみ例外）
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成。 | — | ai_extracted | new |
