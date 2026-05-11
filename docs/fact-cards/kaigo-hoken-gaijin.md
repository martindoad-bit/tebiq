---
fact_id: kaigo-hoken-gaijin
title: 介護保険 — 外国人も40歳から強制加入・保険料・給付
state: ai_verified
risk_level: medium
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 15)
sprint: "cycle2-new-batch15"
citation_label: "介護保険（外国人・40歳以上強制加入・第1号被保険者・第2号被保険者・保険料・給付対象）"
citation_summary: "外国人も40歳以上で医療保険加入者は介護保険に強制加入することを確認するカード。第1号（65歳以上）・第2号（40〜64歳）被保険者の区分・保険料・介護サービス給付の概要。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "外国人も介護保険に加入する必要があるか確認したい"
  - "40歳になった外国人の介護保険加入手続きを確認したい"
  - "介護保険料の金額・支払い方法を確認したい"
  - "介護保険の給付（要介護認定・介護サービス）を確認したい"
does_not_cover:
  - "介護保険の要介護認定申請の詳細手続き"
  - "特別養護老人ホーム等の介護施設入居手続き"
  - "国民健康保険の加入手続き（kenpo-kanyu-gaikokujin 参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html
    label: 厚生労働省 — 介護保険制度の概要
    accessed: "2026-05-11"
applies_to:
  - 40歳以上の医療保険加入者（外国人を含む）
  - 日本在留中の外国人で介護保険加入・給付を確認したい者
direct_fact_fields:
  - 介護保険の強制加入：40歳以上で医療保険（健康保険・国民健康保険）に加入している者は全員（外国人含む）強制加入
  - 第1号被保険者：65歳以上（市区町村が保険者・保険料は年金天引きまたは普通徴収）
  - 第2号被保険者：40〜64歳の医療保険加入者（健康保険料と合算して徴収）
  - 給付の要件：要介護認定（要支援1〜2・要介護1〜5）を受けた場合に介護サービスの給付対象
  - 在日外国人も日本在住であれば介護保険の適用対象
ai_inferred_fields:
  - 短期滞在者（3か月以内）は介護保険の適用外（ai推定）
  - 介護保険料の金額：市区町村によって異なる（第1号被保険者は市区町村が決定）（ai推定）
  - 要介護認定は市区町村（介護保険担当窓口）に申請（ai推定）
  - 特定技能・技能実習等の在留資格でも40歳以上は加入義務あり（ai推定）
needs_review_flags:
  - tanki_taizai_exception: 短期滞在（観光等）で40歳以上の場合の介護保険加入義務の詳細はMHLW確認要。
  - hokenryo_hikaku: 第1号被保険者の保険料の市区町村別の差異幅はDOMAIN確認要。
related_links:
  - title: "厚生労働省 — 介護保険制度の概要"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html"
    organization: "厚生労働省"
    display_label: "厚生労働省 — 介護保険制度の概要"
    locator: "ページ内で「被保険者」「外国人」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "介護保険：40歳以上で医療保険加入者は全員（外国人含む）強制加入。第1号被保険者（65歳以上）・第2号被保険者（40〜64歳）。給付対象：要介護認定（要支援1〜2・要介護1〜5）を受けた場合。日本在住の外国人も適用対象。"
    source_title: "厚生労働省：介護保険制度の概要"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html"
    source_organization: "厚生労働省"
    source_locator: "ページ内「被保険者の要件（40歳以上の医療保険加入者）」「外国人を含む在日者への適用」「第1号・第2号被保険者の区分」の記述を確認"
    display_label: "介護保険：40歳以上の医療保険加入者は外国人含め強制加入・要介護認定後に給付"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "第2号被保険者（40〜64歳）が介護保険の給付を受けられる特定疾病：老化に起因する16の疾病に限定される（初老期の認知症・脳血管疾患・筋萎縮性側索硬化症・末期がん等）。加齢以外の原因による疾患は給付対象外。"
    source_title: "厚生労働省：介護保険制度の概要"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html"
    source_organization: "厚生労働省"
    source_locator: "ページ内「第2号被保険者の特定疾病（16疾病）」「老化に起因する疾病のみ給付対象」の記述を確認"
    display_label: "第2号被保険者（40〜64歳）：給付は特定疾病16種（老化起因）に限定"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "第1号被保険者（65歳以上）の介護保険料：市区町村ごとに決定（3年ごとに改定）。年金月額が1万5千円以上の場合は年金から天引き（特別徴収）。1万5千円未満または年金受給なしの場合は普通徴収（納付書または口座振替）。"
    source_title: "厚生労働省：介護保険制度の概要"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/gaiyo/index.html"
    source_organization: "厚生労働省"
    source_locator: "ページ内「第1号被保険者の保険料（市区町村が決定・3年ごと改定）」「特別徴収（年金天引き）」「普通徴収」の記述を確認"
    display_label: "第1号被保険者の保険料：市区町村ごと・3年ごと改定・年金1.5万円以上は天引き"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点での介護保険法に基づく。介護保険料の具体的な金額は市区町村によって異なり、3年ごとに改定される。

## current_effective_fact

外国人を含む40歳以上の医療保険加入者は、日本の介護保険に強制加入となる。介護サービスを受けるには市区町村に要介護認定を申請する必要がある。

**被保険者の区分（{{TODAY_ISO}} 現在）：**

| 区分 | 年齢 | 保険料の徴収方法 |
|------|------|----------------|
| 第1号被保険者 | **65歳以上** | 年金天引き（月額1万5千円以上の場合）または普通徴収 |
| 第2号被保険者 | **40〜64歳** | 健康保険料と合算して徴収 |

**介護保険の給付を受けるには：**
1. 市区町村の介護保険担当窓口に要介護認定を申請
2. 認定調査・主治医意見書をもとに審査
3. 要支援1〜2または要介護1〜5の認定を受ける
4. ケアプランを作成して介護サービスを利用（1〜3割の自己負担）

## exceptions_or_transition

- **短期滞在者**：90日以内の短期滞在（観光等）は介護保険の適用外（ai推定）
- **医療保険未加入者**：医療保険に加入していない場合は介護保険にも加入しない（ただし未加入は別途問題）
- **介護給付の自己負担**：所得に応じて1〜3割（一定以上の所得者は3割）

## common_user_phrases

- 外国人も介護保険に入らないといけませんか
- 40歳になりましたが介護保険はどうすればいいですか
- 介護保険料はいくらですか
- 介護保険の給付を受けるにはどうすればいいですか
- 日本に来て何年かたちますが、介護保険に入っていますか

技術キーワード（マッチャ用）：

- 介護保険 外国人 / 外国人 介護保険 加入 / 介護保険 40歳 外国人
- 介護保険料 外国人 / 介護保険 被保険者 外国人 / 介護保険 在留資格
- 要介護認定 外国人 / 介護保険 第2号被保険者

## must_say

- 40歳以上で医療保険加入者は外国人含め強制加入
- 第1号（65歳以上）・第2号（40〜64歳）の区分がある
- 給付には要介護認定の申請が必要

## must_not_say

- 「外国人は介護保険に入らなくていい」（40歳以上の医療保険加入者は強制加入）
- 「介護保険料は全国一律」（市区町村によって異なる）

## qa_cases

**Q1: 外国人も介護保険に加入しなければなりませんか？**
A: はい。40歳以上で健康保険または国民健康保険に加入している方は、国籍に関わらず介護保険に強制加入となります。40〜64歳の方（第2号被保険者）は健康保険料と合算して介護保険料が徴収されます。

**Q2: 介護サービスを利用するにはどうすればいいですか？**
A: 市区町村の介護保険担当窓口に「要介護認定」を申請してください。認定を受けた後、ケアプランを作成してサービスを利用できます（自己負担1〜3割）。

## injection_format

### injection_certain_block

```
【介護保険（外国人） ファクト / {{TODAY_ISO}} 確認済み】

・40歳以上の医療保険加入者は外国人含め強制加入
・第1号被保険者：65歳以上（年金天引きまたは普通徴収）
・第2号被保険者：40〜64歳（健康保険料と合算徴収）
・介護給付：要介護認定（市区町村に申請）後に利用可能
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 15) | 新規作成。外国人の介護保険加入。厚生労働省公式で40歳以上強制加入・第1号/第2号区分・要介護認定の仕組みを確認。保険料金額・短期滞在の扱いはai推定。 | — | ai_verified | new |
