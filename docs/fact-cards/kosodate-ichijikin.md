---
fact_id: kosodate-ichijikin
title: 出産育児一時金 — 健康保険から50万円支給（外国人も対象）
state: ai_verified
risk_level: low
confidence: high
source_quality: official
controlled_alpha_eligible: false
last_verified_at: "2026-05-11"
reviewer: FACT-OPS (Cycle 2 New Batch 12)
sprint: "cycle2-new-batch12"
citation_label: "出産育児一時金（健康保険・国民健康保険から50万円・直接支払制度・外国人も対象）"
citation_summary: "出産時に健康保険または国民健康保険から支給される出産育児一時金（50万円）の支給対象・金額（2023年4月改正）・直接支払制度による受取方法を確認するカード。外国人も健康保険等に加入していれば対象。"
source_display_names:
  - "厚生労働省"
applies_when:
  - "日本で出産を予定している外国人が一時金を受け取れるか確認したい"
  - "出産育児一時金の金額・申請方法を確認したい"
  - "2023年4月以降の50万円への引き上げを確認したい"
  - "国民健康保険でも出産育児一時金をもらえるか確認したい"
does_not_cover:
  - "出産手当金（産前産後の休業中の給付 — 健康保険から支給・ikuji-sangyo-kyugyo-zairyu 参照）"
  - "育児休業給付金（ikuji-sangyo-kyugyo-zairyu 参照）"
  - "児童手当（jidou-teate-gaikokujin 参照）"
ai_pipeline: WebFetch → FACT-OPS review
official_sources:
  - url: https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussanteate_00001.html
    label: 厚生労働省 — 出産育児一時金
    accessed: "2026-05-11"
applies_to:
  - 健康保険（協会けんぽ・組合健保）または国民健康保険の被保険者・被扶養者
  - 妊娠12週（85日）以上で出産した者（死産・流産含む）
  - 日本国内で出産した外国人（健康保険等加入が前提）
direct_fact_fields:
  - 支給金額：50万円（2023年4月1日以降。旧：42万円＋産科医療補償制度加算1.6万円）
  - 支給対象：妊娠12週（85日）以上で出産した場合（死産・流産含む）
  - 対象保険：健康保険（被保険者・被扶養者）および国民健康保険
  - 直接支払制度：出産する医療機関が代わりに一時金を受け取り、超過分のみ本人が支払う仕組み
ai_inferred_fields:
  - 外国人も健康保険または国民健康保険に加入していれば支給対象（在留資格不問）（ai推定）
  - 産科医療補償制度の加算：2023年4月以降は50万円に一本化（以前は42万円＋1.6万円）（ai推定）
  - 出産費用が50万円を下回る場合：差額が保険から支給される（直接支払制度利用時）（ai推定）
  - 国民健康保険の場合は市区町村が保険者（申請先は市区町村窓口）（ai推定）
needs_review_flags:
  - sangyo_no_ichijikin: 出産手当金と出産育児一時金の違い（会社員vs自営業・国保）の詳細はDOMAIN確認要。
  - kaigai_shussan_tekiyo: 海外での出産に出産育児一時金が適用されるかの条件はMHLW確認要。
related_links:
  - title: "厚生労働省 — 出産育児一時金"
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussanteate_00001.html"
    organization: "厚生労働省"
    display_label: "厚生労働省 — 出産育児一時金"
    locator: "ページ内で「出産育児一時金」を検索"
    relation: "official_reference"
evidence_points:
  - claim: "出産育児一時金：健康保険または国民健康保険の被保険者・被扶養者が妊娠12週（85日）以上で出産した場合に支給。支給金額：50万円（2023年4月1日以降。旧：42万円）。直接支払制度：出産医療機関が代理受取りし、超過分のみ本人が支払う。健康保険（協会けんぽ・組合健保）および国民健康保険が対象。"
    source_title: "厚生労働省：出産育児一時金"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussanteate_00001.html"
    source_organization: "厚生労働省"
    source_locator: "ページ内「50万円（2023年4月1日〜）」「妊娠12週以上」「直接支払制度」「健康保険・国民健康保険」の記述を確認"
    display_label: "出産育児一時金：50万円（2023年4月〜）・妊娠12週以上・直接支払制度・健保・国保対象"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "出産育児一時金の支給金額：50万円（2023年4月1日以降。産科医療補償制度の対象分娩の場合。旧：42万円＋産科医療補償制度加算）。"
    source_title: "厚生労働省：出産育児一時金"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussanteate_00001.html"
    source_organization: "厚生労働省"
    source_locator: "ページ内「50万円（2023年4月1日以降）」「産科医療補償制度対象分娩の場合」に関する記述を確認"
    display_label: "出産育児一時金：50万円（2023年4月〜・産科医療補償制度対象分娩）"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
  - claim: "直接支払制度：出産費用を医療機関が出産育児一時金から直接受け取る制度。窓口での立替が不要。出産費用が50万円を下回る場合は差額が被保険者に支給され、超過する場合は本人が差額を支払う。"
    source_title: "厚生労働省：出産育児一時金"
    source_url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/shussanteate_00001.html"
    source_organization: "厚生労働省"
    source_locator: "ページ内「直接支払制度（医療機関が代理受取）」「差額支給（費用が50万円未満の場合）」「超過分は本人負担」に関する記述を確認"
    display_label: "直接支払制度：医療機関が代理受取・窓口立替不要・差額は本人に支給または請求"
    support_level: "direct"
    user_visible: true
    needs_domain_review: false
---

## current_date_logic

本カードの内容は {{TODAY_ISO}} 時点での制度に基づく。2023年4月1日以降の出産は50万円（旧42万円から引き上げ）。

## current_effective_fact

出産育児一時金は、健康保険または国民健康保険に加入している人が出産した場合に支給される一時金。外国人も健康保険等に加入していれば国籍・在留資格に関わらず受給対象。

**出産育児一時金の概要（{{TODAY_ISO}} 現在）：**

| 項目 | 内容 |
|------|------|
| 支給金額 | **50万円**（2023年4月1日以降） |
| 支給対象 | 妊娠12週（85日）以上での出産（死産・流産含む） |
| 対象保険 | 健康保険（被保険者・被扶養者）/ 国民健康保険 |
| 受取方法 | 直接支払制度（医療機関が代理受取）が主流 |

**直接支払制度の流れ：**
1. 出産する病院・産院に「直接支払制度の利用」を伝える
2. 医療機関が保険者（協会けんぽ等）から一時金を直接受け取る
3. 出産費用が50万円以上の場合：超過分のみを本人が支払う
4. 出産費用が50万円未満の場合：差額が後から保険から振り込まれる

## exceptions_or_transition

- **2023年4月改正**：42万円（産科医療補償制度対象外分）から50万円に引き上げ（一本化）
- **国民健康保険の場合**：申請先は市区町村（医療機関での直接支払制度を利用しない場合）
- **海外での出産（ai推定）**：要件を満たす場合でも支給対象になるかはMHLW確認要

## common_user_phrases

- 日本で出産します、外国人でも一時金はもらえますか
- 出産育児一時金はいくらですか
- 直接支払制度とは何ですか
- 国民健康保険でも出産育児一時金はもらえますか
- 出産育児一時金の申請はどこでしますか

技術キーワード（マッチャ用）：

- 出産育児一時金 / 出産 一時金 外国人 / 出産 健康保険 給付
- 出産 50万円 / 直接支払制度 / 出産 手当
- 国民健康保険 出産 / 出産一時金 申請 / 出産 お金

## must_say

- 支給金額は50万円（2023年4月以降）
- 妊娠12週（85日）以上の出産が対象（死産・流産含む）
- 健康保険・国民健康保険どちらも対象
- 外国人も健康保険等に加入していれば対象

## must_not_say

- 「外国人は対象外」（健康保険等に加入していれば対象）
- 「まだ42万円」（2023年4月以降は50万円）
- 「国民健康保険では対象外」（国民健康保険も対象）

## qa_cases

**Q1: 外国人ですが、日本で出産します。お金の補助はもらえますか？**
A: 健康保険（会社員の場合）または国民健康保険（自営業・無職等の場合）に加入していれば、出産育児一時金として**50万円**が支給されます。在留資格の種類にかかわらず、保険に加入していれば対象です。

**Q2: 直接支払制度とは何ですか？**
A: 出産育児一時金（50万円）を医療機関が代わりに受け取る制度です。出産費用が50万円以上の場合は超過分のみを本人が支払い、50万円未満の場合は差額が後から振り込まれます。出産する病院・産院に「直接支払制度を利用したい」と伝えてください。

**Q3: 国民健康保険でも出産育児一時金はもらえますか？**
A: はい。国民健康保険に加入している場合も出産育児一時金（50万円）の対象です。申請先は居住する市区町村の窓口になります。

## injection_format

### injection_certain_block

```
【出産育児一時金 ファクト / {{TODAY_ISO}} 確認済み】

以下は厚生労働省の公式情報に基づく現行制度。

・支給金額：50万円（2023年4月1日以降・旧42万円から引き上げ）
・支給対象：妊娠12週（85日）以上での出産（死産・流産含む）
・対象保険：健康保険（被保険者・被扶養者）/ 国民健康保険
・直接支払制度：医療機関が代理受取→超過分のみ本人が支払い
・外国人：健康保険等に加入していれば対象

回答時の注意：
- 「42万円」ではなく「50万円」（2023年4月改正済み）
- 国民健康保険も対象であることを伝える
```

## changelog

| 日付 | 担当 | 変更内容 | state_before | state_after | タグ |
|------|------|----------|--------------|-------------|------|
| 2026-05-11 | FACT-OPS (Cycle 2 New Batch 12) | 新規作成。出産育児一時金（50万円・2023年4月改正）。MHLW公式で50万円・妊娠12週以上・直接支払制度・健保/国保対象を確認。外国人の適用・海外出産の扱いはai推定。 | — | ai_verified | new |
