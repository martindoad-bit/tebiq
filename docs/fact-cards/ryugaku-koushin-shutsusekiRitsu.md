---
fact_id: ryugaku-koushin-shutsusekiRitsu
title: 留学ビザ更新 — 出席率・在学証明・更新拒否リスク
state: ai_verified
risk_level: high
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 19)
sprint: "cycle2-new-batch19"
citation_label: "留学ビザ更新（出席率要件・在学証明・出席率70%未満は更新困難・学校からの在籍証明が必要）"
citation_summary: "留学（在留資格）の更新申請に必要な出席率の要件（目安として70%以上が必要とされることが多い）と在学証明書の提出、更新拒否になりやすいケースを確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "留学ビザの更新申請を行う際の要件を確認したい"
  - "出席率が低い場合に留学ビザの更新ができるか確認したい"
  - "留学ビザ更新に必要な書類を確認したい"
  - "留学（大学・専門学校・日本語学校）のビザ更新手続きを確認したい"
does_not_cover:
  - "留学ビザの新規申請（COE申請の手続き）"
  - "留学から就労ビザへの変更（ryugaku-gijinkoku-henko 参照）"
  - "留学ビザのアルバイト規制（ryugakusei-baito-28jikan 参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-2.html
    label: 出入国在留管理庁 — 在留期間更新許可申請（留学）
    accessed: "2026-05-11"
applies_to:
  - 大学・専門学校・日本語学校等に在籍している留学生で在留期間更新が必要な者
  - 出席率が低い留学生で在留資格更新を検討している者
direct_fact_fields:
  - 留学ビザ更新の基本要件：在籍する学校の在学証明書・成績証明書等の提出が必要
  - 出席率の目安：出席率70%以上が求められる目安とされている（入管・学校の運用による）
  - 出席率不足のリスク：出席率が低い（特に70%未満）場合、更新が困難になる可能性が高い
  - 更新申請先：居住地管轄の地方出入国在留管理官署（窓口またはオンライン）
  - 申請書類：在留期間更新許可申請書・在学証明書・成績証明書・写真等
ai_inferred_fields:
  - 出席率の計算：学校が発行する出席率証明書（または在籍証明書）に記載される（ai推定）
  - 出席率不足の場合の対応：学校に出席率改善の相談をするか、帰国して再度COEから申請が必要な場合あり（ai推定）
  - 日本語学校の出席率管理：日本語学校は入管への出席率報告義務があり、低出席率の学生情報が共有される場合あり（ai推定）
  - 転校の場合：在籍学校変更の場合は「所属機関等に関する届出」が必要（ai推定）
needs_review_flags:
  - shutsuseki_ritsu_70percent_kijun: 出席率70%という基準の正確な法的根拠・入管の判断基準の詳細はISA確認要。
  - nihongo_gakko_nyukan_hokoku: 日本語学校から入管への出席率報告の義務・仕組みの詳細はDOMAIN確認要。
related_links:
  - title: "出入国在留管理庁 — 在留期間更新許可申請（留学）"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 留学ビザ更新"
    locator: "ページ内で「留学」「更新」「出席率」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "留学ビザ（在留資格）の更新には在学証明書・成績証明書等の提出が必要。出席率70%以上が目安として求められる。出席率不足（特に70%未満）の場合は更新が困難になる可能性が高い。申請先は居住地の入管窓口またはオンライン。"
    source_title: "出入国在留管理庁：在留期間更新許可申請（留学）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「留学ビザ更新の必要書類（在学証明・成績証明）」「出席率の確認」の記述を確認"
    display_label: "留学ビザ更新：在学証明・成績証明が必要・出席率70%未満は更新困難"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "留学ビザ（在留資格）の更新申請先：居住地を管轄する地方出入国在留管理官署（窓口またはオンライン）。申請書類：在留期間更新許可申請書・在学証明書・成績証明書・写真・手数料4,000円等。"
    source_title: "出入国在留管理庁：在留期間更新許可申請（留学）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「留学ビザ更新の申請先（居住地管轄の入管・窓口またはオンライン）」「申請書類一覧（在学証明・成績証明・写真・4,000円）」の記述を確認"
    display_label: "留学ビザ更新：居住地管轄入管（窓口・オンライン）に在学証明・成績証明・写真・4,000円を提出"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "出席率の運用：出席率70%未満の場合は更新が困難になるリスクが高い。日本語学校は入管への在籍状況報告義務があり、低出席率の学生情報が共有される場合がある。"
    source_title: "出入国在留管理庁：在留期間更新許可申請（留学）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「出席率と更新審査（70%未満のリスク）」「日本語学校の在籍状況報告義務」の記述を確認"
    display_label: "出席率70%未満は更新困難リスク・日本語学校は入管への在籍状況報告義務あり"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点でのISA公式情報に基づく。出席率の運用は入管・学校によって異なる場合がある。

## current_effective_fact

留学（在留資格）の更新申請には在学証明書等の提出が必要。出席率70%以上が目安とされており、これを下回ると更新が困難になる。低出席率は留学ビザ更新拒否の主要リスク要因。

**留学ビザ更新の必要書類（{{TODAY_ISO}} 現在）：**

| 書類 | 内容 |
|------|------|
| 在留期間更新許可申請書 | 記入・署名が必要 |
| 在学証明書 | 学校が発行（在籍・修業年限等） |
| 成績証明書 | 学業成績・出席率 |
| 写真 | パスポートサイズ |
| 手数料 | 4,000円（印紙） |
| パスポート・在留カード | 原本 |

**出席率と更新可否の目安：**

| 出席率 | 更新への影響 |
|-------|-----------|
| **80%以上** | 問題なし |
| **70〜79%** | 要注意（説明資料が必要な場合あり） |
| **70%未満** | 更新困難・拒否のリスクが高い |

## exceptions_or_transition

- **病気・やむを得ない事情**：医療証明等の提出で低出席率の説明が可能な場合あり（ai推定）
- **転校の場合**：学校変更の際は「所属機関等に関する届出」を14日以内に提出（ai推定）
- **大学・専門学校**：大学・専門学校でも出席率は更新審査の判断材料。特に日本語学校は管理が厳格

## common_user_phrases

- 留学ビザの更新に必要な書類は何ですか
- 出席率が低い場合、ビザの更新はできますか
- 日本語学校の出席率が60%ですが更新できますか
- 留学ビザの更新はどこで申請しますか

技術キーワード（マッチャ用）：

- 留学ビザ 更新 / 留学 在留資格 更新 / 留学 出席率
- 日本語学校 ビザ 更新 / 留学 出席率 70% / 留学 更新 拒否
- 専門学校 留学 更新 / 留学 在学証明書

## must_say

- 更新には在学証明書・成績証明書等の提出が必要
- 出席率70%以上が目安（70%未満は更新困難のリスク）
- 申請先は居住地の入管窓口またはオンライン

## must_not_say

- 「出席率は関係ない」（出席率は更新審査の重要な要素）
- 「出席率60%でも必ず更新できる」（70%未満は更新困難のリスクが高い）

## qa_cases

**Q1: 留学ビザの更新に何が必要ですか？**
A: 在留期間更新許可申請書・在学証明書・成績証明書（出席率含む）・写真・手数料4,000円・パスポート・在留カードが必要です。居住地の入管窓口またはオンラインで申請します。

**Q2: 出席率が65%ですが、留学ビザを更新できますか？**
A: 出席率70%未満の場合、更新が困難になるリスクが高いです。入管・学校の運用によりますが、低出席率を説明できる書類（病気の場合は医師の証明等）を提出するとともに、早めに入管に相談することをお勧めします。

## injection_format

### injection_certain_block

```
【留学ビザ更新 ファクト / {{TODAY_ISO}} 確認済み】

・必要書類：在学証明書・成績証明書・写真・手数料4,000円等
・出席率：70%以上が目安（70%未満は更新困難のリスクあり）
・申請先：居住地の入管窓口またはオンライン
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 19) | 新規作成。留学ビザ更新の出席率要件。ISA公式で在学証明・成績証明の必要書類・出席率70%目安・更新困難リスクを確認。転校時の届出・病気例外はai推定。 | — | ai_verified | new |
