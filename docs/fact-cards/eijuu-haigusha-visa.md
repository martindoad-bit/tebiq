---
fact_id: eijuu-haigusha-visa
title: 永住者の配偶者等ビザの申請要件と注意点
state: ai_extracted   # 2026-05-17: WB-B safety debt downgrade — confidence=medium + DOMAIN §2.4/§4.4 deep-water; 3 unresolved flags (no_work_restriction_source, marital_substance_review, eijuu_vs_nihonjin_spouse_diff).
runtime_bucket: MATERIALS_ONLY
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-07"
reviewer: FACT-OPS (Batch 8)
sprint: "0.6"
citation_label: "永住者の配偶者等ビザ（申請要件・在留期間）"
citation_summary: "永住者・特別永住者の配偶者または子に与えられる在留資格「永住者の配偶者等」の申請要件・在留期間を確認するカード。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "永住者または特別永住者の配偶者として在留資格を取得・更新したい"
  - "永住者の配偶者等ビザの申請要件・在留期間を確認したい"
  - "永住者の配偶者等ビザから永住申請への要件・在留期間を確認したい"
does_not_cover:
  - "離婚・別居後の在留資格リスク（spouse-divorce-separation 参照）"
  - "日本人の配偶者等ビザ（nihonjin-haigusha-visa 参照 — スポンサーが日本人の場合）"
  - "永住者の配偶者等ビザ保険料・年金などの手続き（別カード参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/status/spouseorchildofpermanentresident.html
    label: 出入国在留管理庁 — 永住者の配偶者等（在留資格）
    accessed: "2026-05-07"
applies_to:
  - 永住者または特別永住者と婚姻している外国人配偶者
  - 永住者または特別永住者の子として日本で生まれ引き続き在留する者
  - 永住者の配偶者等ビザの更新・変更を検討する者
direct_fact_fields:
  - 対象者：「永住者または特別永住者の配偶者、または日本で生まれ引き続き在留している永住者・特別永住者の子」
  - 在留期間の種類：「5年、3年、1年または6か月」の4種類
  - 主な申請必要書類：婚姻証明書（本国発行）、財力証明（課税証明・銀行残高）、永住者配偶者の身元保証書、世帯全員の住民票、写真・質問書
ai_inferred_fields: []
needs_review_flags:
  - no_work_restriction_source: 永住者の配偶者等の就労範囲・活動範囲について、入管法別表第2等の直接根拠確認要。
  - marital_substance_review: 更新時の婚姻実態審査基準の公式ガイドライン確認要（nihonjin-haigusha-visaカードと同様の論点）。
  - eijuu_vs_nihonjin_spouse_diff: 永住者配偶者等と日本人配偶者等の審査実務上の差異の確認要（スポンサーが外国籍永住者の場合の実務的違い）。
related_links:
  - title: "出入国在留管理庁 — 永住者の配偶者等（在留資格）"
    url: "https://www.moj.go.jp/isa/applications/status/spouseorchildofpermanentresident.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 永住者の配偶者等（在留資格）"
    locator: "ページ内で「永住者の配偶者等（在留資格）」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "対象者：「永住者または特別永住者の配偶者、または日本で生まれ引き続き在留している永住者・特別永住者の子」。在留期間の種類：「5年、3年、1年または6か月」。主な申請必要書類：婚姻証明書・財力証明・永住者配偶者の身元保証書・世帯全員の住民票等。"
    source_title: "出入国在留管理庁：永住者の配偶者等（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/spouseorchildofpermanentresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「対象者」「在留期間」「提出書類」の記述を確認"
    display_label: "対象：永住者の配偶者・日本生まれの子。在留5年/3年/1年/6か月"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "就労範囲、更新時の婚姻実態審査、永住者スポンサーの死亡・離婚時の扱いは、このカードでは判定しない。対象者・在留期間・公式ページ記載の主な申請資料のみを材料として扱う。"
    source_title: "出入国在留管理庁：永住者の配偶者等（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/spouseorchildofpermanentresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「活動内容」「就労」「更新」の記述を確認"
    display_label: "就労範囲・更新時婚姻実態・スポンサー死亡/離婚時の取扱いは本カード対象外"
    support_level: "indirect"
    user_visible: false
    needs_domain_review: true
  - claim: "永住者の配偶者等から永住申請への移行可否・時期は、このカードでは扱わない。永住許可の要件は別カードまたは公式ガイドラインで確認する。"
    source_title: "出入国在留管理庁：永住者の配偶者等（在留資格）"
    source_url: "https://www.moj.go.jp/isa/applications/status/spouseorchildofpermanentresident.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「永住者の配偶者等」の在留資格概要と、永住許可ガイドライン（nyukan_nyukan50）の配偶者特例要件（3年以上婚姻+1年以上在留）から推論"
    display_label: "永住申請への移行は本カード対象外"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点での規則に基づく。本カードは `nihonjin-haigusha-visa` カードと類似するが、スポンサーが「日本人」ではなく「永住者（外国籍）」である点が異なる。離婚後の問題は `spouse-divorce-separation` カード参照。

## current_effective_fact

このカードは、出入国在留管理庁ページに直接記載された「永住者の配偶者等」の対象者・在留期間・申請資料を材料として提供する。就労範囲、婚姻実態審査、スポンサー死亡・離婚後の変更可否、永住申請時期は扱わない。

**主要事実（{{TODAY_ISO}} 現在）：**
- 対象：永住者・特別永住者の配偶者、および日本生まれで継続在留中の永住者・特別永住者の子
- 在留期間：5年・3年・1年・6か月（審査結果による）
- 主な申請必要書類：婚姻証明書、財力証明、身元保証書、世帯全員の住民票等（公式ページ記載に基づく）

## exceptions_or_transition

- **スポンサー死亡・離婚後**: このカードでは変更可否やルートを判定しない。
- **永住申請への移行**: このカードでは扱わない。
- **日本で生まれた子の対象**: 公式対象者は「日本で生まれ引き続き在留している」永住者・特別永住者の子。

## common_user_phrases

- 永住者の夫（妻）と結婚しました、どのビザを取ればいいですか
- 永住者の配偶者ビザで働けますか
- 永住者の旦那と別居しています、ビザは大丈夫ですか
- 永住者の配偶者ビザと日本人配偶者ビザの違いは何ですか
- 永住者の子供として日本で生まれましたが、在留資格はどうなりますか
- 永住者の配偶者等ビザから永住申請はいつできますか
- 永住者の夫が亡くなりました。ビザはどうなりますか

技術キーワード（マッチャ用）：

- 永住者 配偶者 / 永住者の配偶者等 / 永住 結婚 ビザ
- 永住者 妻 ビザ / 永住者 夫 ビザ / 永住者と結婚
- 永住者 配偶者 就労 / 働ける 永住者配偶者
- 永住者 配偶者 更新 / 婚姻実態 永住者
- 永住者の子 日本生まれ / 永住者 子供 在留
- 永住者 配偶者 離婚 / 永住 スポンサー死亡

## must_say

- 対象者は永住者・特別永住者の配偶者、および日本で生まれ引き続き在留している永住者・特別永住者の子
- 在留期間は5年・3年・1年・6か月
- 公式ページ記載の主な申請資料を材料として案内できる
- このカードは MATERIALS_ONLY。就労可否、更新見込み、死亡・離婚後のルートは断定しない

## must_not_say

- 「日本人の配偶者等ビザと全く同じ」（スポンサーが外国籍永住者である点で書類・実務が異なる）
- 「永住者の夫がいれば在留は自動的に保証される」（更新審査・実態確認がある）
- 「永住者のスポンサーが死亡しても大丈夫」（根拠が消滅するため変更が必要）

## qa_cases

**Q1: 永住者の夫と結婚しました。永住者の配偶者等ビザで働けますか？**
A: このカードでは就労可否を判定しません。扱える事実は、対象者・在留期間・公式ページ記載の主な申請資料に限ります。

**Q2: 永住者の配偶者等ビザと日本人の配偶者等ビザは何が違いますか？**
A: このカードでは審査実務上の差異や就労の扱いを比較しません。永住者の配偶者等は、スポンサーが永住者または特別永住者である点と、対象となる子が「日本で生まれ引き続き在留している」子である点を材料として扱います。

**Q3: 永住者の夫が突然亡くなりました。日本在留を続けられますか？**
A: このカードではスポンサー死亡後の在留資格変更可否や候補資格を判定しません。死亡・離婚後の在留は個別事情の確認が必要な領域です。

## injection_format

### injection_certain_block

```
【永住者の配偶者等ビザ 材料ファクト / {{TODAY_ISO}} 確認済み】

・対象：永住者・特別永住者の配偶者、および日本生まれで継続在留中の永住者の子
・在留期間：5年・3年・1年・6か月（審査で決定）
・主な申請書類：婚姻証明・財力証明・身元保証書・住民票等

回答時の注意：
- このカードは MATERIALS_ONLY。就労可否、更新許可見込み、婚姻実態審査、スポンサー死亡・離婚後のルートは断定しない
```

### injection_needs_review_addendum

```
※ 本回答に関連して、以下は確認待ち情報のため断定的に回答しないこと：
・就労範囲・活動範囲の直接根拠（`no_work_restriction_source`確認要）
・婚姻実態審査の具体的基準・必要書類
・日本人配偶者等との審査実務上の差異
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-07 | FACT-OPS (Batch 8) | 新規作成。永住者の配偶者等の対象・在留期間は公式ソース確認済み。就労制限なし・更新実態審査はai_inferred。nihonjin-haigusha-visaとの棲み分け明記（スポンサーが永住者である点を中心に）。 | — | ai_verified | new |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 5) | Cycle 2メタデータ追加パッチ。citation_label・citation_summary・source_display_names・applies_when・does_not_coverフィールドを追加。事実内容・state変更なし。 | ai_verified | ai_verified | patch |
