---
fact_id: gijinkoku-category-1-2-3-4
title: 技人国 — 受入機関カテゴリー1〜4 / 書類量と審査負担
state: ai_extracted
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-17"
sprint: "fact-window-bulk-1"
citation_label: "技人国 受入機関カテゴリー"
citation_summary: "技人国の申請では、雇用先企業を4カテゴリーに分類する。カテゴリー1（上場・公的機関等）・2（年間源泉徴収1000万円以上等）は提出書類が簡略化され、3・4は詳細な書類が必要となる。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "用户问技人国申请要准备多少材料"
  - "用户问雇主类别会影响审查吗"
  - "上市公司 vs スタートアップ的差异"
does_not_cover:
  - "具体每个类别书类清单（个别官署資料）"
  - "経営管理のカテゴリー（別制度）"
ai_pipeline: WebFetch → FACT-OPS extract
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/gijinkoku.html
    label: ISA — 技術・人文知識・国際業務
    accessed: "2026-05-17"
applies_to:
  - 技人国を申請する外国人
  - 技人国受入企業
direct_fact_fields:
  - カテゴリー1：上場企業、保険業相互会社、国・地方公共団体、イノベーション促進企業等
  - カテゴリー2：前年分の給与所得の源泉徴収票等の法定調書合計表中、給与所得の源泉徴収合計額が1000万円以上の団体・個人 / 在留申請オンラインシステム利用者
  - カテゴリー3：前年分の給与所得の源泉徴収票等の法定調書合計表の提出があり、カテゴリー2に該当しない団体・個人
  - カテゴリー4：上記いずれにも該当しない団体・個人
  - カテゴリー1-2：簡略化された書類で申請可能
  - カテゴリー3-4：詳細な書類（事業計画、職務内容説明書等）必要
ai_inferred_fields:
  - スタートアップは多くの場合カテゴリー3または4
  - 新設企業は実績がないためカテゴリー4が多い
needs_review_flags:
  - innovation_company_definition
  - newly_established_company_documents
  - online_system_eligibility_for_cat2
related_links:
  - title: "ISA — 技人国"
    url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    organization: "出入国在留管理庁"
    display_label: "ISA — 技人国"
    locator: "ページ内「カテゴリー」"
    relation: "official_reference"
evidence_points:
  - claim: "技人国の受入機関は4カテゴリーに分類。1（上場・公的・イノベーション企業）、2（源泉徴収1000万円以上 or オンラインシステム利用者）、3（前年法定調書あり）、4（その他）。カテゴリー1-2は書類簡略化、3-4は詳細書類必要。"
    source_title: "ISA — 技人国"
    source_url: "https://www.moj.go.jp/isa/applications/status/gijinkoku.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内4カテゴリー定義"
    display_label: "技人国 4カテゴリー区分"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

{{TODAY_ISO}} 時点ISA公式情報。

## current_effective_fact

技人国の受入機関は4カテゴリー分類。カテゴリーが低いほど（1に近いほど）審査書類が簡略化される。

## common_user_phrases

- 技人国 カテゴリー
- 技人国 書類 量
- スタートアップ 技人国 申請
- 受入企業 カテゴリー4 不利

## must_say

- カテゴリー1-2は書類簡略
- カテゴリー3-4は詳細書類必要
- 源泉徴収1000万円基準

## must_not_say

- 「カテゴリー4は許可されない」（誤り、書類量の違い）

## qa_cases

**Q: 雇用先がスタートアップで設立2年目です。技人国は通りますか？**
A: 受入機関カテゴリーは多くの場合3または4となり、事業計画や職務内容説明書など詳細書類が必要です。書類の充実度が審査の鍵となります。

## injection_format

### injection_certain_block

```
【技人国 カテゴリー／ {{TODAY_ISO}} 公式】
1：上場・公的・イノベーション
2：源泉徴収1000万円以上 / オンライン利用
3：前年法定調書あり
4：その他
1-2は書類簡略・3-4は詳細書類必要。
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-17 | FACT-OPS bulk-1 | 新規作成（ai_extracted）。 | — | ai_extracted | new |
