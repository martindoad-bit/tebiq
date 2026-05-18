---
fact_id: nihonjin-haigusha-visa
title: 日本人の配偶者等ビザの申請要件と更新上の注意点
state: ai_extracted   # 2026-05-17: WB-B safety debt downgrade — confidence=medium + DOMAIN §2.4 deep-water; separation/DV/定住者/再婚 route guidance unresolved.
runtime_bucket: MATERIALS_ONLY
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-07"
reviewer: FACT-OPS (Batch 7)
sprint: "0.6"
citation_label: "日本人の配偶者等ビザ（申請要件・婚姻実態審査）"
citation_summary: "日本人の配偶者・子・特別養子に与えられる在留資格「日本人の配偶者等」の申請要件・在留期間・更新時の婚姻実態確認を確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "日本人と婚姻して在留資格「日本人の配偶者等」を取得・更新したい"
  - "日本人の配偶者等ビザの就労制限・活動範囲を確認したい"
  - "日本人の配偶者等ビザの対象者・在留期間を確認したい"
does_not_cover:
  - "離婚・別居後の在留資格リスク（spouse-divorce-separation 参照）"
  - "配偶者の国際結婚手続き・婚姻届の提出方法"
  - "永住者の配偶者等ビザ（eijuu-haigusha-visa 参照 — スポンサーが外国籍永住者の場合）"
  - "就労制限の有無"
  - "更新時の婚姻実態審査・必要書類"
  - "短期滞在からの変更可否"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese.html
    label: 出入国在留管理庁 — 日本人の配偶者等（在留資格）
    accessed: "2026-05-07"
applies_to:
  - 日本人と婚姻している外国人配偶者
  - 日本人の子として出生した外国人（日本人の子）
  - 日本人の特別養子となった外国人
  - 日本人配偶者等ビザの更新・変更を検討する者
direct_fact_fields:
  - 対象者：「日本人の配偶者若しくは特別養子又は日本人の子として出生した者」
  - 在留期間の種類：「５年、３年、１年又は６月」の4種類
ai_inferred_fields: []
needs_review_flags:
  - marital_substance_review_criteria: 婚姻実態確認の審査基準（どのような同居・交流証拠が有効か）は公式ガイドラインの直接引用が未取得。審査実務の確認要。
  - article_22_4_activity_absence: 入管法22条の4第7号の条文テキスト照合要。
  - income_requirement_absence: 日本人配偶者の収入要件不存在の公式確認要（実務では収入証明書提出を求められる場合あり）。
  - activity_scope_no_work_restriction: 日本人の配偶者等の就労範囲・活動範囲については法令または公式資料の直接根拠確認要。
related_links:
  - title: "出入国在留管理庁 — 日本人の配偶者等（在留資格）"
    url: "https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 日本人の配偶者等（在留資格）"
    locator: "ページ内で「日本人の配偶者等（在留資格）」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "対象者：「日本人の配偶者若しくは特別養子又は日本人の子として出生した者」。在留期間の種類：「５年、３年、１年又は６月」の4種類。"
    source_title: "出入国在留管理庁：日本人の配偶者等（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「対象者」「在留期間」「日本人の配偶者若しくは特別養子又は日本人の子」の記述を確認"
    display_label: "対象：日本人の配偶者・特別養子・日本人の子。在留5年/3年/1年/6か月"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "就労範囲、更新時の婚姻実態審査、別居・活動不実施の取消しリスクは、このカードでは判定しない。対象者と在留期間のみを材料として扱う。"
    source_title: "出入国在留管理庁：日本人の配偶者等（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「活動内容」「就労」「更新」の記述を確認"
    display_label: "就労範囲・婚姻実態審査は本カード対象外"
    support_level: "indirect"
    user_visible: false
    needs_domain_review: true
  - claim: "日本人の配偶者等から永住申請への移行可否・時期は、このカードでは扱わない。永住許可の要件は別カードまたは公式ガイドラインで確認する。"
    source_title: "出入国在留管理庁：日本人の配偶者等（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/spouseorchildofjapanese.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「日本人の配偶者等」の在留資格概要と永住許可ガイドライン（nyukan_nyukan50）の配偶者特例要件（3年以上婚姻+1年以上在留）から推論"
    display_label: "永住申請への移行は本カード対象外"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点での規則に基づく。在留資格取消に関する入管法22条の4（活動不実施）はspouse-divorce-separationカードと重複するが、本カードは離婚前の「更新リスク」にフォーカス。離婚後の在留問題は `spouse-divorce-separation` カードを参照。

## current_effective_fact

このカードは、出入国在留管理庁ページに直接記載された「日本人の配偶者等」の対象者と在留期間を材料として提供する。就労範囲、婚姻実態審査、別居・離婚・DV・再婚時の在留判断は扱わない。

**主要事実（{{TODAY_ISO}} 現在）：**
- 対象：日本人の配偶者、日本人の子（実子）、日本人の特別養子
- 在留期間：5年・3年・1年・6か月（審査結果によって決定）
- 就労範囲・活動制限の扱いはこのカードでは注入しない

## exceptions_or_transition

- **日本人の子・特別養子**: 公式対象者に含まれる。
- **別居・離婚・活動不実施**: このカードでは判定しない。別カードまたは専門家確認に回す。
- **永住申請への移行**: このカードでは扱わない。
- **短期滞在からの変更**: このカードでは扱わない。

## common_user_phrases

- 日本人と結婚したのですが、配偶者ビザの申請方法を教えてください
- 日本人配偶者ビザで就労することはできますか
- 配偶者ビザの更新の際に何を提出する必要がありますか
- 夫（妻）と別居中ですが、配偶者ビザは更新できますか
- 配偶者ビザは何年ごとに更新しますか
- 日本に住む日本人の子供ですが、在留資格はどうなりますか
- 収入がない（専業主婦）ですが、配偶者ビザを維持できますか
- 日本人と離婚した後、在留資格はどうなりますか

技術キーワード（マッチャ用）：

- 日本人配偶者 / 配偶者ビザ / 日本人の配偶者等
- 日本人 結婚 ビザ / 結婚 在留資格 / 嫁签证
- 配偶者 就労 / 配偶者ビザ 働ける / 活動範囲
- 配偶者ビザ 更新 / 更新 審査 / 婚姻実態
- 別居 配偶者ビザ / 同居 ビザ / 別居 更新
- 日本人の子 / 日本人の子供 / 実子 在留資格

## must_say

- 対象者は日本人の配偶者、日本人の子、日本人の特別養子
- 在留期間は5年・3年・1年・6か月
- このカードは MATERIALS_ONLY。就労可否、更新見込み、別居・離婚時の判断は断定しない

## must_not_say

- 「日本人と婚姻届を出すだけでビザが自動的に取れる」（在留資格変更・取得の申請が必要）
- 「別居でも問題ない」（このカードでは別居時の影響を判定しない）
- 「配偶者ビザなら永住申請は関係ない」（永住申請は別カードで確認する）
- 「離婚しても当面は配偶者ビザのままでいい」（離婚後のリスクが発生する；spouse-divorce-separationカード参照）

## qa_cases

**Q1: 日本人の夫と結婚しました。現在は観光ビザ（短期滞在）で日本にいます。日本国内で配偶者ビザに変更できますか？**
A: このカードでは、短期滞在から「日本人の配偶者等」への変更可否を判定しません。扱える事実は、対象者と在留期間に限ります。

**Q2: 配偶者ビザで専業主婦をしています。更新に夫の収入証明が必要ですか？**
A: このカードでは収入要件や更新書類の実務判断を扱いません。公式ページで直接確認できる対象者・在留期間のみを材料として使います。

**Q3: 夫婦喧嘩で3か月間別居しています。配偶者ビザの更新に影響しますか？**
A: このカードでは別居が更新や取消しに与える影響を判定しません。別居・離婚・活動不実施は個別事情の確認が必要な領域です。

## injection_format

### injection_certain_block

```
【日本人の配偶者等ビザ 材料ファクト / {{TODAY_ISO}} 確認済み】

・対象：日本人の配偶者、日本人の子（実子）、日本人の特別養子
・在留期間：5年・3年・1年・6か月（審査で決定）
回答時の注意：
- このカードは MATERIALS_ONLY。就労可否、更新許可見込み、婚姻実態審査、別居・離婚・DV・再婚時のルートは断定しない
```

### injection_needs_review_addendum

```
※ 本回答に関連して、以下は確認待ち情報のため断定的に回答しないこと：
・婚姻実態確認の具体的審査基準・必要書類
・就労範囲・活動範囲に関する直接根拠
・入管法22条の4第7号の条文テキスト
・収入要件の不存在・課税証明提出実務の詳細
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-07 | FACT-OPS (Batch 7) | 新規作成。日本人配偶者等ビザの対象・在留期間は公式ソース確認済み。婚姻実態審査・活動不実施取消はai_inferred + needs_review_flag。spouse-divorce-separationカードとの棲み分け明記（本カードは更新リスクフォーカス、離婚後は別カード）。 | — | ai_verified | new |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 5) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_verified | ai_verified | patch |
