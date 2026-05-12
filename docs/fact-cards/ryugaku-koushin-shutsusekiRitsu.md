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
citation_label: "留学ビザ更新（在学証明・成績証明・出席状況確認）"
citation_summary: "留学（在留資格）の更新申請に必要な在学証明書・成績証明書等と、出席状況が審査上確認される点を整理するカード。出席率の具体的な基準値は学校・入管運用確認が必要。"
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
  - url: https://www.moj.go.jp/isa/applications/procedures/16-3.html
    label: 出入国在留管理庁 — 在留期間更新許可申請（留学）
    accessed: "2026-05-11"
applies_to:
  - 大学・専門学校・日本語学校等に在籍している留学生で在留期間更新が必要な者
  - 出席率が低い留学生で在留資格更新を検討している者
direct_fact_fields:
  - 留学ビザ更新の基本要件：在籍する学校の在学証明書・成績証明書等の提出が必要
  - 出席状況：成績証明書・在学証明書等で確認される場合があり、低出席率は説明資料が必要になることがある（具体基準は確認要）
  - 更新申請先：居住地管轄の地方出入国在留管理官署（窓口またはオンライン）
  - 申請書類：在留期間更新許可申請書・在学証明書・成績証明書・写真等
  - 手数料：2025年4月1日以降受理分は窓口6,000円・オンライン5,500円
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
    url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 留学ビザ更新"
    locator: "ページ内で「留学」「更新」「出席率」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "留学ビザ（在留資格）の更新には在留期間更新許可申請書、写真、パスポート・在留カード、在学証明書や成績証明書等の提出が必要。申請先は居住地を管轄する地方出入国在留管理官署またはオンライン。"
    source_title: "出入国在留管理庁：在留期間更新許可申請（留学）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「在留期間更新許可申請」「必要書類」「申請先」の記述を確認"
    display_label: "留学ビザ更新：在学証明・成績証明等を準備"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "留学ビザ（在留資格）の更新手数料は、2025年4月1日以降受理分について窓口申請6,000円、オンライン申請5,500円。"
    source_title: "出入国在留管理庁：在留期間更新許可申請（留学）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「手数料」「2025年4月1日以降に受理された申請」の記述を確認"
    display_label: "留学ビザ更新：手数料は窓口6,000円・オンライン5,500円"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "出席状況の運用：低出席率の場合は更新審査で説明が必要になることがある。具体的な基準値・学校から入管への報告運用は確認要。"
    source_title: "出入国在留管理庁：在留期間更新許可申請（留学）"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
    source_organization: "出入国在留管理庁"
    source_locator: "出席率の具体基準はこのページで直接確認できないため、学校・入管窓口で確認"
    display_label: "出席状況の具体基準は学校・入管で確認"
    support_level: "indirect"
    user_visible: false
    needs_domain_review: true
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点でのISA公式情報に基づく。出席率の運用は入管・学校によって異なる場合がある。

## current_effective_fact

留学（在留資格）の更新申請には在学証明書・成績証明書等の提出が必要。出席状況は審査上確認されることがあり、低出席率の場合は理由説明や学校側資料が重要になる。具体的な基準値は学校・入管運用の確認が必要。

**留学ビザ更新の必要書類（{{TODAY_ISO}} 現在）：**

| 書類 | 内容 |
|------|------|
| 在留期間更新許可申請書 | 記入・署名が必要 |
| 在学証明書 | 学校が発行（在籍・修業年限等） |
| 成績証明書 | 学業成績・出席率 |
| 写真 | パスポートサイズ |
| 手数料 | 窓口6,000円・オンライン5,500円（2025年4月1日以降受理分） |
| パスポート・在留カード | 原本 |

**出席状況と更新可否：**

出席状況は成績証明書等を通じて確認されることがある。低出席率の場合は、欠席理由・改善状況・学校側説明資料を整理し、具体的な判断基準は学校または入管窓口で確認する。

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
- 出席状況は更新審査で確認されることがあるため、低出席率の場合は理由と改善状況を整理する
- 申請先は居住地の入管窓口またはオンライン

## must_not_say

- 「出席率は関係ない」（出席率は更新審査の重要な要素）
- 「出席率が低くても必ず更新できる」（低出席率は説明資料が必要になる場合がある）

## qa_cases

**Q1: 留学ビザの更新に何が必要ですか？**
A: 在留期間更新許可申請書・在学証明書・成績証明書（出席状況を含む場合あり）・写真・パスポート・在留カードが必要です。2025年4月1日以降受理分の手数料は窓口6,000円、オンライン5,500円です。居住地の入管窓口またはオンラインで申請します。

**Q2: 出席率が65%ですが、留学ビザを更新できますか？**
A: 低出席率は更新審査で説明が必要になる場合があります。具体的な基準値は学校・入管運用によるため、欠席理由を説明できる書類（病気の場合は医師の証明等）と改善状況を整理し、早めに学校または入管窓口で確認してください。

## injection_format

### injection_certain_block

```
【留学ビザ更新 ファクト / {{TODAY_ISO}} 確認済み】

・必要書類：在学証明書・成績証明書・写真等
・手数料：窓口6,000円、オンライン5,500円（2025年4月1日以降受理分）
・出席状況：成績証明書等で確認される場合があり、低出席率の場合は理由説明や学校側資料を整理する
・申請先：居住地の入管窓口またはオンライン
```

### injection_needs_review_addendum

```
※ 以下は学校・入管運用の確認が必要なため、断定的に回答しないこと：
・出席率70%という具体基準値の法的根拠・審査運用
・日本語学校から入管への在籍状況報告の具体的な仕組み
・低出席率時にどの程度の説明資料で足りるか
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 19) | 新規作成。留学ビザ更新の出席率要件。ISA公式で在学証明・成績証明の必要書類・出席率70%目安・更新困難リスクを確認。転校時の届出・病気例外はai推定。 | — | ai_verified | new |
| 2026-05-12 | Codex prelaunch polish | 更新手続の公式URLを16-3に修正。旧手数料を窓口6,000円・オンライン5,500円に更新。出席率70%基準は直接根拠未確認のためuser_visible=falseのneeds_review情報へ隔離。 | ai_verified | ai_verified | evidence-fix |
