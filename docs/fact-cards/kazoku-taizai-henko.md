---
fact_id: kazoku-taizai-henko
title: 家族滞在から就労ビザへの在留資格変更（手続き・条件・在留資格取消リスク）
state: ai_extracted   # 2026-05-17: WB-B safety debt downgrade — 4 unresolved flags (illegal_work_impact, permission_before_work_start, etc.) in DOMAIN must-ask range; should not be ai_verified positively injected.
runtime_bucket: MATERIALS_ONLY
risk_level: high
confidence: medium
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 Batch 6)
sprint: "cycle2-batch6"
citation_label: "家族滞在→就労ビザ 在留資格変更（手続き・処理期間・取消リスク）"
citation_summary: "家族滞在在留資格から就労ビザ（技人国等）への在留資格変更許可申請の手続き・処理期間・費用・在留資格取消リスクを確認するカード。具体的な就労資格要件は申請先ビザのカードを参照。"
source_display_names:
  - "出入国在留管理庁"
applies_when:
  - "家族滞在ビザから就労ビザ（技人国・特定技能等）への変更手続きを確認したい"
  - "家族滞在中に就職が決まり在留資格変更を申請したい"
  - "家族滞在中の就労活動が在留資格取消につながるリスクを確認したい"
does_not_cover:
  - "技人国の審査基準・必要書類（gijinkoku-koushin-shorui 参照）"
  - "留学ビザから技人国への変更（ryugaku-gijinkoku-henko 参照）"
  - "資格外活動許可の詳細（shikakugai-fukugyou 参照）"
  - "家族滞在ビザの発給・更新手続き（kazoku-taizai-yoken 参照）"
  - "変更申請中の特例期間の具体的扱い"
  - "変更許可前の就労可否"
  - "無許可就労歴の審査影響"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.moj.go.jp/isa/applications/procedures/16-2.html
    label: 出入国在留管理庁 — 在留資格変更許可申請
    accessed: "2026-05-11"
applies_to:
  - 家族滞在ビザで在留中の外国人で就労を予定している者
  - 家族滞在から技術・人文知識・国際業務（技人国）等の就労ビザへの変更を検討している者
  - 家族滞在ビザ保持者の配偶者・子で独立就労を希望する者
direct_fact_fields:
  - 申請時期：「変更の理由となった事由が生じた日から、在留期間の満了する日以前」（ISA 16-2.html）
  - 処理期間：1か月〜2か月（ISA 16-2.html）
  - 申請費用（窓口）：6,000円（収入印紙）（ISA 16-2.html）
  - 申請費用（オンライン）：5,500円（ISA 16-2.html）
  - 申請先：住所地の地方出入国在留管理局（ISA 16-2.html）
  - 在留資格取消警告：「本来の在留資格に基づく活動を行っていない場合には、在留資格を取り消される場合があります」（ISA 16-2.html）
  - 申請可能者：本人・法定代理人・雇用機関・弁護士・行政書士・親権者等（ISA 16-2.html）
ai_inferred_fields: []
needs_review_flags:
  - illegal_work_impact_on_henko: 家族滞在中に資格外活動許可なしで就労した実績がある場合の変更申請への影響（不許可事由）については公式ガイドラインの直接引用要。
  - kazoku_taizai_to_specific_requirements: 家族滞在から特定の就労ビザへの変更に固有の追加要件（あれば）はISAの各在留資格の要件ページで確認要。
  - permission_before_work_start: 変更許可前に就労できるかどうかの個別判断（現在の資格外活動許可・変更先活動・申請状況）についてはDOMAIN確認要。
  - tokurei_kikan_confirmation: 変更申請中の特例期間（在留期間満了後も適法在留継続）の根拠条文（出入国管理特例法第20条等）の直接引用要。
related_links:
  - title: "出入国在留管理庁 — 在留資格変更許可申請"
    url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    organization: "出入国在留管理庁"
    display_label: "出入国在留管理庁 — 在留資格変更許可申請"
    locator: "ページ内で「在留資格変更許可申請」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "在留資格変更許可申請の申請時期：「変更の理由となった事由が生じた日から、在留期間の満了する日以前」。処理期間：1か月〜2か月。申請費用（窓口）：6,000円（収入印紙）。申請費用（オンライン）：5,500円。申請先：住所地の地方出入国在留管理局。"
    source_title: "出入国在留管理庁：在留資格変更許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「申請時期」「処理期間」「手数料」「申請先」の記述を確認"
    display_label: "在留資格変更：処理1〜2か月・窓口6,000円・申請は事由生じた日〜満了日前"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "在留資格取消警告（公式）：「本来の在留資格に基づく活動を行っていない場合には、在留資格を取り消される場合があります」。変更許可前の就労可否、無許可就労歴の影響、特例期間の扱いはこのカードでは判定しない。"
    source_title: "出入国在留管理庁：在留資格変更許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「在留資格取消」「活動不実施」の記述を確認"
    display_label: "在留資格変更：取消警告あり・就労可否と特例期間は本カード対象外"
    support_level: "indirect"
    user_visible: true
    needs_domain_review: true
  - claim: "在留資格変更許可申請の申請可能者：本人・法定代理人・雇用機関の職員・弁護士・行政書士・親権者等が申請できる（ISA 16-2.html）。申請先は住所地の地方出入国在留管理局。"
    source_title: "出入国在留管理庁：在留資格変更許可申請"
    source_url: "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
    source_organization: "出入国在留管理庁"
    source_locator: "ページ内「申請できる方」「本人」「弁護士」「行政書士」「親権者」の記述を確認"
    display_label: "在留資格変更：本人・雇用機関・弁護士・行政書士・親権者等が申請可"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点での出入国在留管理庁の在留資格変更許可申請手続き（ISA 16-2.html）に基づく。家族滞在から就労ビザへの変更に固有の追加要件については、変更先の在留資格ページ（技人国等）の条件を別途確認すること。

## current_effective_fact

このカードは、在留資格変更許可申請の共通手続き情報を材料として提供する。家族滞在から特定の就労資格へ変更できるか、変更許可前に就労できるか、過去の就労歴が審査にどう影響するかは判定しない。

**家族滞在→就労ビザ 在留資格変更申請基本情報（{{TODAY_ISO}} 現在）：**

| 項目 | 内容 |
|------|------|
| 申請時期 | 変更事由が生じた日〜在留期間満了日前 |
| 申請先 | 住所地の地方出入国在留管理局 |
| 処理期間 | 1〜2か月 |
| 費用（窓口） | 6,000円（収入印紙） |
| 費用（オンライン） | 5,500円 |

### 在留資格取消リスク（公式確認）

> 「本来の在留資格に基づく活動を行っていない場合には、在留資格を取り消される場合があります」（ISA 16-2.html）

家族滞在の活動内容、資格外活動許可、変更先の要件は別カードまたは公式資料で確認する。

## exceptions_or_transition

- **変更申請中の就労**：このカードでは可否を判定しない。
- **変更申請中の特例期間**：このカードでは根拠条文確認前のため注入しない。
- **資格外活動許可の有無**：過去の就労歴の審査影響はこのカードでは判定しない。

## common_user_phrases

- 家族滞在ビザから就労ビザに変更したい
- 家族滞在で就職が決まりました。手続きはどうすればいいですか
- 家族滞在中に働けますか
- 家族滞在から技人国への変更はどうすればいいですか
- 家族滞在ビザの変更申請の処理期間はどのくらいですか
- 家族滞在から特定技能に変更できますか

技術キーワード（マッチャ用）：

- 家族滞在 就労 / 家族滞在 就職 / 家族滞在 変更
- 家族滞在 在留資格変更 / 家族滞在 技人国 / 家族滞在 特定技能
- 家族滞在 働ける / 家族滞在 仕事 / 家族滞在 在留資格
- 家族滞在 変更申請 / 家族滞在から就労ビザ

## must_say

- このカードは手続き材料のみで、就労開始可否は判定しない
- 申請先は**住所地の地方出入国在留管理局**
- 処理期間は1〜2か月。余裕をもって申請することを推奨
- 変更先ビザ（技人国等）の要件は別カードまたは公式資料で確認する
- 無許可就労歴の審査影響はこのカードでは断定しない

## must_not_say

- 「変更申請を出せば即日就労できる」（就労開始可否は個別確認が必要）
- 「家族滞在から就労ビザへの変更は必ず許可される」（就労資格の要件を満たす必要がある）
- 「無許可で少し働いていても変更申請に影響しない」（このカードでは影響を判定しない）
- 変更先ビザの具体的な要件をこのカードで断言する（各ビザの要件カードを参照）

## qa_cases

**Q1: 家族滞在ビザで就職が決まりました。どうすればいいですか？**
A: 在留資格変更許可申請の共通手続きとして、申請先は住所地の地方出入国在留管理局、申請時期は変更の理由となった事由が生じた日から在留期間満了日前まで、処理期間は1〜2か月です。変更先資格の要件と就労開始可否はこのカードでは判定しません。

**Q2: 家族滞在中に少し働いていました。変更申請に影響しますか？**
A: このカードでは、過去の就労歴が在留資格変更申請に与える具体的影響を判定しません。事実関係を整理して専門家または入管へ確認する領域です。

**Q3: 家族滞在の在留期間が満了間近です。変更申請は間に合いますか？**
A: 公式手続き上の申請時期は「変更の理由となった事由が生じた日から、在留期間の満了する日以前」です。特例期間の具体的扱いはこのカードでは注入しません。

## injection_format

### injection_certain_block

```
【在留資格変更許可申請 手続き材料 / {{TODAY_ISO}} 確認済み】

以下は出入国在留管理庁の公式情報に基づく現行手続き。

・申請時期：変更事由が生じた日〜在留期間満了日前
・申請先：住所地の地方出入国在留管理局
・処理期間：1〜2か月
・費用：窓口6,000円（収入印紙）/ オンライン5,500円
・在留資格取消警告（公式）：「本来の在留資格に基づく活動を行っていない場合には、在留資格を取り消される場合があります」

回答時の注意：
- このカードは MATERIALS_ONLY。変更先資格の許可見込み、変更許可前の就労可否、無許可就労歴の審査影響は断定しない
- 変更先ビザ（技人国等）の要件は別途確認が必要であることを伝える
```

### injection_needs_review_addendum

```
※ 以下はai推定または確認待ち情報のため、断定的に回答しないこと：
・家族滞在中に無許可就労があった場合の変更申請への具体的影響（`illegal_work_impact_on_henko`）
・変更先ビザ固有の追加要件（`kazoku_taizai_to_specific_requirements`）
・変更許可前に就労できるかどうかの個別判断（`permission_before_work_start`）
・特例期間の根拠条文（`tokurei_kikan_confirmation`）
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 6) | 新規作成。家族滞在→就労ビザ 在留資格変更。申請時期・費用・処理期間・取消警告はISA 16-2.html直接確認済み。家族滞在固有の要件・特例期間・無許可就労影響はai_inferred + needs_review_flag。confidence=medium（家族滞在固有情報はai推定）。 | — | ai_verified | new |
