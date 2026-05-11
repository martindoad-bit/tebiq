---
fact_id: furusato-nozei
title: ふるさと納税 — 外国人も住民税を納める居住者なら利用可
state: ai_verified
risk_level: low
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 13)
sprint: "cycle2-new-batch13"
citation_label: "ふるさと納税（外国人も対象・住民税控除・確定申告またはワンストップ特例・2,000円自己負担）"
citation_summary: "日本に住民登録があり住民税を納める外国人もふるさと納税を利用できることと、控除の仕組み（所得税還付・住民税控除）・2,000円の自己負担・ワンストップ特例制度を確認するカード。"
source_display_names:
  - "総務省"
applies_when:
  - "外国人もふるさと納税ができるか確認したい"
  - "ふるさと納税の仕組み・控除の受け方を確認したい"
  - "ワンストップ特例と確定申告の違いを確認したい"
  - "自己負担2,000円の意味を確認したい"
does_not_cover:
  - "確定申告の手続き詳細（kakutei-shinkoku-gijmu 参照）"
  - "住民税の計算方法（jumin-zei-gaiyo 参照）"
  - "ふるさと納税の返礼品の内容・選び方"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/mechanism/index.html
    label: 総務省 — ふるさと納税のしくみ
    accessed: "2026-05-11"
applies_to:
  - 日本に住民登録があり住民税を納める外国人（在留資格不問）
  - 所得税・住民税の納税義務がある外国人
direct_fact_fields:
  - ふるさと納税の仕組み：「居住する都道府県・市区町村以外の地方団体に対して、寄附を行った場合に、原則2,000円を超える部分について、所得税及び住民税から全額控除（一定の上限あり）」
  - 自己負担額：2,000円（寄附金額から控除される額は寄附金から2,000円を差し引いた全額）
  - 控除の方法①：確定申告（確定申告書に寄附の内容を記載）
  - 控除の方法②：ワンストップ特例（確定申告不要の会社員等向け。寄附先が5自治体以内の場合）
  - ワンストップ特例の条件：「確定申告不要の給与所得者等で、ふるさと納税先の自治体数が5以内の場合」
ai_inferred_fields:
  - 外国人も日本の住民登録があり住民税を納める者であれば利用可能（ai推定）
  - 控除限度額は所得（住民税の約20%が目安）によって異なるため、各ポータルサイトの控除限度額シミュレーターで確認可能（ai推定）
  - 返礼品：寄附先の自治体の特産品等を受け取ることができる（ai推定）
needs_review_flags:
  - gaikokujin_furusato_jissai: 外国人が実際にふるさと納税を利用する際の手続き（マイナンバー活用・本人確認方法）の詳細はai推定。
  - hizuminzei_fujyou: 住民税を納めていない外国人（前年に日本に住んでいなかった初年度等）はふるさと納税の恩恵が少ない可能性あり（jumin-zei-gaiyo 参照）。
related_links:
  - title: "総務省 — ふるさと納税のしくみ"
    url: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/mechanism/index.html"
    organization: "総務省"
    display_label: "総務省 — ふるさと納税のしくみ"
    locator: "ページ内で「ふるさと納税のしくみ」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "ふるさと納税の仕組み：居住地以外の地方団体への寄附について「原則2,000円を超える部分について、所得税及び住民税から全額控除（一定の上限あり）」。控除方法：①確定申告 または ②ワンストップ特例（確定申告不要の会社員等・5自治体以内の場合）。自己負担：2,000円。"
    source_title: "総務省：ふるさと納税のしくみ"
    source_url: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/mechanism/index.html"
    source_organization: "総務省"
    source_locator: "ページ内「2,000円を超える部分を全額控除」「ワンストップ特例（5自治体以内・確定申告不要の会社員等）」「自己負担2,000円」の記述を確認"
    display_label: "ふるさと納税：2,000円超の寄附を全額控除・ワンストップ特例（5自治体以内）・自己負担2,000円"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "ワンストップ特例制度の利用要件：①確定申告が不要の給与所得者等であること ②寄附先の自治体数が5か所以内であること ③各寄附先自治体に「寄附金税額控除に係る申告特例申請書」を寄附の翌年1月10日までに提出すること。"
    source_title: "総務省：ふるさと納税のしくみ"
    source_url: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/mechanism/index.html"
    source_organization: "総務省"
    source_locator: "ページ内「ワンストップ特例制度の要件」「確定申告不要の給与所得者等」「5自治体以内」「申請書を翌年1月10日までに提出」の記述を確認"
    display_label: "ワンストップ特例：給与所得者・5自治体以内・翌年1/10までに申請書提出の3要件"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "ふるさと納税の控除計算：（寄附金額 − 2,000円）×（1 − 所得税の限界税率 − 住民税率10%）が所得税・住民税から控除される。実質的な自己負担は2,000円のみ（控除上限額内の場合）。"
    source_title: "総務省：ふるさと納税のしくみ"
    source_url: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/mechanism/index.html"
    source_organization: "総務省"
    source_locator: "ページ内「2,000円を超える部分を所得税・住民税から全額控除」「控除額の計算方法」の記述を確認"
    display_label: "ふるさと納税の控除計算：寄附額−2,000円を全額控除・実質負担は2,000円のみ"
    support_level: "direct"
    user_visible: true
    needs_domain_review: true
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点での総務省の情報に基づく。ふるさと納税の制度は変更が少ないが、返礼品の基準（返礼率30%以下等）は定期的に見直しがある。

## current_effective_fact

ふるさと納税は、居住地以外の自治体に寄附することで、所得税・住民税の控除が受けられる制度。外国人も日本に住民登録があり住民税を納めていれば利用できる。実質2,000円の自己負担で、特産品（返礼品）を受け取ることができる。

**ふるさと納税のしくみ：**
1. 応援したい自治体にネットで寄附（ポータルサイト等を利用）
2. 自治体から返礼品を受け取る
3. 控除手続き（確定申告 または ワンストップ特例）
4. 所得税・住民税から控除される（自己負担2,000円）

**控除の方法：**

| 方法 | 対象者 | 条件 |
|------|--------|------|
| **ワンストップ特例** | 確定申告不要の会社員等 | 寄附先が**5自治体以内** |
| **確定申告** | 全員 | 寄附先の数にかかわらず申請可能 |

## exceptions_or_transition

- **住民税が少ない場合**：住民税額が少ないと控除の恩恵が限られる。初年度に日本に来た外国人は前年所得がないため住民税が少なく、ふるさと納税の控除が少ない可能性がある（jumin-zei-gaiyo 参照）
- **控除限度額**：寄附できる上限額は年収・家族構成によって異なる。目安はポータルサイトのシミュレーターで確認（ai推定）

## common_user_phrases

- 外国人でもふるさと納税はできますか
- ふるさと納税の仕組みを教えてください
- ワンストップ特例とは何ですか
- ふるさと納税の自己負担は2,000円と聞きましたが本当ですか
- 確定申告をしないとふるさと納税の控除は受けられませんか

技術キーワード（マッチャ用）：

- ふるさと納税 外国人 / ふるさと納税 在留資格 / ふるさと納税 外国籍
- ふるさと納税 確定申告 / ワンストップ特例 / ふるさと納税 控除
- ふるさと納税 2000円 / ふるさと納税 仕組み

## must_say

- 外国人も住民登録があり住民税を納めていれば対象
- 自己負担は2,000円（それ以上の寄附額は全額控除される）
- 会社員等で5自治体以内の場合はワンストップ特例で確定申告不要
- 控除は住民税・所得税から

## must_not_say

- 「外国人はふるさと納税ができない」（住民税を納める居住者であれば対象）
- 「自己負担なし」（2,000円の自己負担がある）

## qa_cases

**Q1: 外国人でもふるさと納税はできますか？**
A: はい。日本に住民登録があり、住民税を納める外国人であれば利用できます。在留資格の種類は問いません。ふるさと納税ポータルサイトを通じて好きな自治体に寄附でき、自己負担2,000円を超える部分が所得税・住民税から控除されます。

**Q2: 確定申告をしない会社員ですが、ふるさと納税の控除を受けられますか？**
A: はい。ワンストップ特例制度を使えば、確定申告なしで住民税から控除できます。寄附先の自治体が5か所以内であれば、各自治体に「寄附金税額控除に係る申告特例申請書」を送付することで対応できます。

## injection_format

### injection_certain_block

```
【ふるさと納税 ファクト / {{TODAY_ISO}} 確認済み】

以下は総務省の公式情報に基づく現行制度。

・対象：住民登録があり住民税を納める者（外国人も対象）
・仕組み：居住地以外の自治体に寄附 → 自己負担2,000円を超える額を所得税・住民税から控除
・控除方法①：確定申告（全員利用可）
・控除方法②：ワンストップ特例（確定申告不要の会社員等・5自治体以内）

回答時の注意：
- 「外国人は対象外」とは言わない
- 住民税が少ない場合（来日初年度等）は控除額も少ないことを案内
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 13) | 新規作成。ふるさと納税（外国人も対象）。総務省公式で仕組み・自己負担2,000円・ワンストップ特例（5自治体・確定申告不要）を確認。控除限度額の計算・外国人手続きの詳細はai推定。 | — | ai_verified | new |
