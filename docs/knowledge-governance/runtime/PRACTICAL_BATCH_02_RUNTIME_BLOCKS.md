# Practical Batch 02 — Runtime Blocks (practical-051〜practical-100)

> 既存実務カードから抽出した短版 runtime block 集。
> 1 張 = 1 yaml block。short_answer ≤ 80 字、practical_rule ≤ 200 字。
> 生成日: 2026-05-19 / Batch 02 / 母カード参照は `docs/practical-fact-layer/cards/practical-XXX.md`。

---

## practical-051

```yaml
card_id: practical-051
bucket: ANSWER_RUNTIME
title: 永住者の配偶者等：活動制限なし・永住者とは別の在留資格
user_situation: "永住者と結婚した／予定の外国人"
short_answer: "「永住者の配偶者等」資格で就労制限なし。離婚・死別は14日届出義務。"
practical_rule: "永住者と婚姻＝「永住者の配偶者等」で申請可。就労制限なくフルタイム・自営業ともに可能。離婚は14日以内届出、6か月以上活動不従事で取消対象（日本人配偶者等と同じ）。海外配偶者は永住者がスポンサーとして COE 申請。"
official_anchor: "別表第2／入管法22条の2"
conditions:
  - "配偶者が永住者である"
  - "法律婚成立"
risk:
  - "離婚後の届出怠り＋6か月不活動で取消"
should_not_say:
  - "永住者の配偶者は永住者と同じ扱い（実は別の在留資格）"
material_bridge:
  - "永住者のスポンサー書類（在留カード・住民票・課税証明）"
  - "婚姻証明書・戸籍謄本"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00045.html"
```

---

## practical-052

```yaml
card_id: practical-052
bucket: ANSWER_RUNTIME
title: 技人国の大学卒業要件：専門学校・高専・海外大学の扱い
user_situation: "学歴が大卒未満の方（専門学校・高専卒）が技人国を狙う"
short_answer: "大学卒・高専5年課程は可。専門学校は専攻と業務の関連性厳審査。日本語学校のみは不可。"
practical_rule: "①大学・大学院卒（内外問わず）＝原則OK ②高専5年課程＝技術系業務なら可 ③専修学校専門課程（2年制以上）＝条件付き（専攻と業務の関連性厳格） ④日本語学校のみ＝NG。専攻と業務の関連性立証が鍵。"
official_anchor: "上陸基準省令・「技人国」要件"
conditions:
  - "学歴の種類が明確"
risk:
  - "専門学校卒で業務関連性立証できず不許可"
  - "日本語学校のみで申請＝確実に不許可"
should_not_say:
  - "専門学校卒なら全部技人国OK"
material_bridge:
  - "卒業証明書・成績証明書・シラバス"
  - "業務内容説明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-053

```yaml
card_id: practical-053
bucket: ANSWER_RUNTIME
title: 「文化活動」「芸術」「興行」：芸術家・音楽家の資格選択
user_situation: "芸術家・音楽家として日本で活動したい外国人"
short_answer: "報酬・契約形態で資格が分かれる：芸術＝フリー、興行＝プロ契約、技人国＝雇用、文化活動＝無報酬。"
practical_rule: "①芸術＝フリーランスで生計（活動実績証明必須）②興行＝オケ・劇団等とプロ契約③技人国（国際業務）＝音楽教室等の雇用契約④文化活動＝無報酬研究。フリー芸術家の「芸術」申請は実績証明が最重要。"
official_anchor: "別表第1の1・1の3「芸術」「興行」「文化活動」"
conditions:
  - "活動の収益形態が明確"
  - "活動実績がある"
risk:
  - "フリー芸術家で実績証明不足→不許可"
  - "雇用ベースなのに「芸術」で申請→範囲外"
should_not_say:
  - "アーティストならどの資格でも取れる"
material_bridge:
  - "活動実績証明（受賞歴・公演記録・発表歴）"
  - "収入証明（過去の芸術活動収入）"
  - "今後の活動計画書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00028.html"
```

---

## practical-054

```yaml
card_id: practical-054
bucket: ANSWER_RUNTIME
title: 高度専門職ポイント計算の詳細実務
user_situation: "高度専門職を申請するにあたり詳細なポイント計算を確認したい方"
short_answer: "70点で1号・80点で永住特例。学歴・年収・職歴・日本語等を合計。300万円未満は申請不可。"
practical_rule: "①学歴：博士30・修士20・学士10、日本院修了は+10 ②年収：申請先の予定年収（現在ではない）。300万未満は対象外 ③日本語：N1で+15、N2で+10（日本院修了者はN2加算対象外）。70点前後は行政書士確認推奨。"
official_anchor: "高度専門職告示・ポイント計算表"
conditions:
  - "予定年収300万円以上"
  - "ポイント要件が概ね充足"
risk:
  - "現在年収で計算してしまうミス"
  - "日本院修了者がN2加算を誤算入"
should_not_say:
  - "誰でも70点には届く"
material_bridge:
  - "ポイント計算表（ISA公式）"
  - "学位証明書・成績証明書（日本語訳）"
  - "雇用契約書・JLPT合格証"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00168.html"
```

---

## practical-055

```yaml
card_id: practical-055
bucket: ANSWER_RUNTIME
title: 技能実習生の失踪後：不法残留からの救済と特定技能移行
user_situation: "技能実習先から失踪した／不法残留状態の元実習生"
short_answer: "自主出頭で出国命令制度を活用、上陸拒否を5年→1年に短縮可能。"
practical_rule: "失踪＝不法残留。自主的にISA出頭で出国命令制度の対象になり、上陸拒否を1年に短縮できる可能性。帰国後に特定技能試験合格＋COE申請で再来日が正規ルート。不法残留中の在留資格変更（特定技能直接切替等）は受理されない。OTIT多言語窓口・弁護士相談を強く推奨。"
official_anchor: "入管法24条（退去強制）・出国命令制度"
conditions:
  - "技能実習生・現在不法残留状態"
risk:
  - "ブローカー誘導で偽装婚等の二次違反"
  - "5年上陸拒否で再来日不可能化"
should_not_say:
  - "失踪後でも特定技能に直接切替できる"
material_bridge:
  - "自主出頭・出国命令申請書"
  - "パスポート・在留カード"
  - "帰国後の特定技能試験合格証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00130.html"
```

---

## practical-056

```yaml
card_id: practical-056
bucket: ANSWER_RUNTIME
title: 技人国のグレーゾーン業務：単純労働との境界
user_situation: "技人国で就業中だが業務実態が単純労働寄りで不安な方"
short_answer: "単純労働は原則不可。専門職を主、現場補助は付随的なら可（主従の判断）。"
practical_rule: "技人国は専門職資格。製造ライン・倉庫ピッキング等の単純労働は範囲外。専門業務が主・現場が付随的（割合的に少数）であれば認められる場合あり。派遣・出向で実態として単純労働従事は資格外活動扱いリスク。雇用契約書の業務内容欄を確認＋行政書士相談。"
official_anchor: "「技人国」要件・別表第1の2"
conditions:
  - "現在技人国で就業中"
  - "現場業務の割合がある"
risk:
  - "業務実態が単純労働中心＝資格外活動・取消リスク"
should_not_say:
  - "技人国でも工場ライン作業はOK"
material_bridge:
  - "雇用契約書（業務内容明記）"
  - "業務内容説明書（業務割合明示）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-057

```yaml
card_id: practical-057
bucket: ANSWER_RUNTIME
title: 日本生まれの外国人の子どもの60日以内申請
user_situation: "日本で外国人の子どもが生まれた家族"
short_answer: "出生後60日以内に在留資格取得申請が必須。超過で不法残留。"
practical_rule: "日本生まれの外国人乳児は日本国籍を取得しない限り出生後60日以内に最寄りISAで在留資格取得申請が必要。子の資格は親の在留資格に応じる（家族滞在・永住者の配偶者等・日本人の配偶者等等）。60日超過＝不法残留化、即ISA相談を。"
official_anchor: "入管法22条の2（取得）"
conditions:
  - "両親または一方が外国人で在留資格保持"
  - "出生日が起算点"
risk:
  - "60日経過で不法残留→修復は煩雑"
should_not_say:
  - "日本生まれなら自動で在留資格"
material_bridge:
  - "在留資格取得許可申請書"
  - "出生届受理証明書（市区町村）"
  - "母子健康手帳・親の在留カード・住民票"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-6.html"
```

---

## practical-058

```yaml
card_id: practical-058
bucket: ANSWER_RUNTIME
title: 特定技能2号への移行要件：試験・実績・対象分野
user_situation: "特定技能1号で在留中で2号への移行を検討する方"
short_answer: "分野別の2号試験合格必須。上限なし・家族帯同可。対象は11分野（2023年拡大）。"
practical_rule: "2号は分野別技能試験（2号）合格で移行可能。在留期間上限なし（更新制）・家族（配偶者・実子）帯同可能。2023年に対象が11分野に拡大（建設・造船・農業・外食業等）。分野ごとの試験実施頻度・場所が異なる。"
official_anchor: "特定技能告示・基本方針2023改定"
conditions:
  - "特定技能1号在留中"
  - "分野別2号試験が実施されている分野"
risk:
  - "未受験・未整備分野での移行不可"
should_not_say:
  - "1号で長く働けば自動的に2号"
material_bridge:
  - "2号技能試験合格証明書"
  - "在留資格変更許可申請書"
  - "雇用契約書（分野適合の確認）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-059

```yaml
card_id: practical-059
bucket: ANSWER_RUNTIME
title: 「宗教」「報道」：特殊カテゴリの要件
user_situation: "宣教師・特派員等で日本に派遣される外国人"
short_answer: "宗教＝外国宗教団体の派遣／報道＝外国メディアの派遣。所属団体が必須でフリー不可。"
practical_rule: "①宗教：外国の宗教団体から正式派遣されていることが必須。日本側受入団体も必要。②報道：外国メディア（新聞・TV等）の記者・カメラマンに適用。所属報道機関の証明必須。フリーランス芸術家・宗教家には適用不可。活動内容厳格定義・他業種就労不可。"
official_anchor: "別表第1の1「宗教」「報道」"
conditions:
  - "所属機関・団体が外国にある"
  - "正式な派遣関係"
risk:
  - "フリーランス宗教活動者で「宗教」申請＝不許可"
  - "外国メディア未所属で「報道」申請＝不可"
should_not_say:
  - "個人の宗教活動者でも「宗教」資格を取れる"
material_bridge:
  - "「宗教」：派遣元宗教団体証明・日本受入団体証明"
  - "「報道」：所属報道機関の在籍証明・取材計画書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00037.html"
```

---

## practical-060

```yaml
card_id: practical-060
bucket: ANSWER_RUNTIME
title: 就労系資格からの永住申請：在留歴計算と就労歴の扱い
user_situation: "技人国・経営管理等で在留歴10年が近い／到達した方"
short_answer: "通算10年＋うち就労系5年が原則。留学は10年に算入可だが5年要件には不算入。"
practical_rule: "10年連続在留が原則。短期出国は通算可、長期出国は分断リスク。就労系（技人国・経営管理・高度専門職等）5年が必要。留学・家族滞在は10年に算入可だが5年就労要件には不算入。短期滞在は10年にも算入されない。"
official_anchor: "入管法22条／永住ガイドライン"
conditions:
  - "在留歴の内訳と入出国記録が明確"
risk:
  - "短期出国の累積で「連続在留」分断扱い"
  - "5年就労要件の起算ミス"
should_not_say:
  - "技人国10年で永住申請できる"
material_bridge:
  - "全パスポート・全在留カード履歴"
  - "住民票除票（住所履歴）"
  - "課税・納税証明（直近5年）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-061

```yaml
card_id: practical-061
bucket: ANSWER_RUNTIME
title: 難民認定申請の実務：申請から認定まで・申請中の就労
user_situation: "本国で迫害の恐れがあり日本で難民認定を求めたい方"
short_answer: "ISAに申請、特定活動で在留。申請後6か月で資格外活動許可→就労可（週28時間）。"
practical_rule: "申請はISA。申請中は特定活動の在留資格。6か月経過で資格外活動許可申請→週28時間就労可。認定で「定住者」等付与・就労制限解除。不認定は7日以内に異議申立可能。難民支援協会（JAR）・弁護士相談を強く推奨。"
official_anchor: "入管法61条の2（難民認定）"
conditions:
  - "迫害の恐れの客観的根拠"
  - "申請書類を整える"
risk:
  - "6か月待たずに就労＝不法就労"
  - "不認定後7日異議申立期限の見落とし"
should_not_say:
  - "難民申請すれば自由に就労できる"
material_bridge:
  - "難民認定申請書"
  - "迫害証拠・理由書（母国語＋日本語訳）"
  - "申請後6か月で資格外活動許可申請書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri03_00001.html"
```

---

## practical-062

```yaml
card_id: practical-062
bucket: ANSWER_RUNTIME
title: 仮放免制度：退去強制手続中の在留と生活上の制限
user_situation: "退去強制手続中で収容を一時解除（仮放免）された方"
short_answer: "仮放免は就労完全禁止・住居指定・移動制限・定期出頭義務。在留特別許可が唯一の正規復活ルート。"
practical_rule: "仮放免は退去強制手続中の収容一時解除。就労は完全禁止、住居指定、移動制限、定期出頭義務。在留資格回復は在留特別許可の申請が唯一の正規ルート（日本人との婚姻・子の養育・長期在留等の人道事情が要件）。複雑案件のため入管法専門弁護士・支援団体に即相談。"
official_anchor: "入管法54条（仮放免）・50条（在留特別許可）"
conditions:
  - "仮放免許可受領済"
risk:
  - "仮放免中の就労＝即収容・退去強制復活"
  - "報告義務違反で再収容"
should_not_say:
  - "仮放免中でもアルバイトはOK"
material_bridge:
  - "仮放免許可申請書・保証書"
  - "在留特別許可申請書"
  - "長期在留・婚姻・子の養育関係書類"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00159.html"
```

---

## practical-063

```yaml
card_id: practical-063
bucket: ANSWER_RUNTIME
title: 技能実習：3年・5年計算と転籍例外
user_situation: "技能実習中で転籍を考える／2号・3号への移行段階"
short_answer: "1号1年→2号2年→3号2年で最大5年。原則転籍禁止だがやむを得ない事情は例外。"
practical_rule: "実習は1号1年→2号2年→3号2年（最大5年）。2号→3号移行は技能検定合格必須。転籍は原則禁止だが倒産・ハラスメント・賃金未払い等のやむを得ない事情では認められる。2024年からは「育成就労」（2027年頃完全移行予定）で転籍緩和。OTIT相談が重要。"
official_anchor: "技能実習法・育成就労法（2024）"
conditions:
  - "技能実習生として在留"
risk:
  - "ブローカー介在の不適切転籍"
  - "やむを得ない事情の証明不足"
should_not_say:
  - "技能実習はいつでも自由に転籍できる"
material_bridge:
  - "技能実習計画認定証"
  - "技能検定合格証（2号→3号時）"
  - "やむを得ない事情の証明書類"
source_urls:
  - "https://www.otit.go.jp/"
```

---

## practical-064

```yaml
card_id: practical-064
bucket: ANSWER_RUNTIME
title: 経営管理：500万円投資要件の認定実務
user_situation: "経営管理ビザ取得のために投資要件をクリアしたい方"
short_answer: "実態ある500万円投資が必須。借入金・見せ金は算入不可。資本金＋設備等で証明。"
practical_rule: "500万円以上の実態投資が要件。資本金が最もシンプルだが、設備・什器・内装費等も算入可。親族・友人からの借入金は「投資」算入不可。見せ金は虚偽申請＝不許可・取消。銀行残高・登記・領収書等で実態証明。"
official_anchor: "上陸基準省令（経営管理）"
conditions:
  - "法人設立済または設立計画進行中"
risk:
  - "借入金を投資として申告→発覚で取消"
  - "見せ金（一時的な親族資金）が虚偽申請扱い"
should_not_say:
  - "借入金でも500万円要件を満たせる"
material_bridge:
  - "法人登記事項証明書（資本金額）"
  - "法人銀行口座残高証明書"
  - "設備・什器の購入領収書・見積書"
  - "事業計画書・収支計画書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-065

```yaml
card_id: practical-065
bucket: ANSWER_RUNTIME
title: 就労系→配偶者等：日本人と結婚した場合の選択
user_situation: "技人国保持中に日本人と結婚した方"
short_answer: "変更は義務でない。技人国継続も配偶者等変更もOK。離婚リスクと就労制限で比較。"
practical_rule: "技人国保持で日本人と結婚＝「日本人の配偶者等」変更は義務ではない。①技人国継続：就労に限定（雇用継続が条件）②配偶者等変更：就労制限なし（離婚で根拠喪失リスク）。永住申請までの距離（配偶者は3年で短縮）も考慮要素。"
official_anchor: "別表第2／入管法20条"
conditions:
  - "現在技人国保持"
  - "日本人と法律婚成立"
risk:
  - "配偶者等変更後の離婚で在留根拠喪失"
  - "技人国継続で雇用喪失リスク"
should_not_say:
  - "結婚したら配偶者等に変えなければならない"
material_bridge:
  - "在留資格変更許可申請書"
  - "戸籍謄本（婚姻記載）・外国婚姻証明＋翻訳"
  - "日本人配偶者の住民票・課税証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
```

---

## practical-066

```yaml
card_id: practical-066
bucket: ANSWER_RUNTIME
title: 国民健康保険・厚生年金：加入義務と帰国時の脱退一時金
user_situation: "在留期間3か月超の外国人で社会保険加入を確認したい方"
short_answer: "在留3か月超は国民健康保険・国民年金加入義務。会社員は職場の社会保険強制加入。"
practical_rule: "在留3か月超＝健康保険・年金加入義務。会社員は職場の社保強制加入。帰国時は加入期間25年未満なら厚生年金脱退一時金を帰国後2年以内に申請可（最大5年分）。社会保障協定国（独・韓・米等）は二重加入回避手続あり。"
official_anchor: "国民健康保険法／国民年金法／社会保障協定"
conditions:
  - "在留期間3か月超"
risk:
  - "未加入で次回更新審査の不利情報・永住申請却下"
  - "脱退一時金の2年期限見落とし"
should_not_say:
  - "短期間なら社会保険加入は不要"
material_bridge:
  - "国保加入手続：在留カード・パスポート・住民票"
  - "脱退一時金：年金手帳・在外口座情報・帰国後住所証明"
source_urls:
  - "https://www.nenkin.go.jp/"
```

---

## practical-067

```yaml
card_id: practical-067
bucket: ANSWER_RUNTIME
title: 特定技能：転職・離職時の届出と就職活動期間
user_situation: "特定技能保持者で離職した／予定の方"
short_answer: "離職14日以内に届出。3か月超の活動空白は取消リスク。"
practical_rule: "離職時14日以内にISA届出。離職後3か月超の活動空白は取消リスク。就職活動の実績（ハローワーク登録・応募記録）を残すこと。登録支援機関がある場合は次の就職先サポートを依頼。3か月迫る前に行政書士・ISAに相談。"
official_anchor: "入管法19条の16・22条の2"
conditions:
  - "特定技能で在留中"
  - "離職または転職予定"
risk:
  - "離職3か月超で取消対象"
  - "別分野転職には試験＋変更申請必要"
should_not_say:
  - "離職してもしばらくは何もしなくていい"
material_bridge:
  - "離職届出書（ISA）"
  - "ハローワーク登録証・求職活動記録"
  - "新雇用先の雇用契約書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-068

```yaml
card_id: practical-068
bucket: ANSWER_RUNTIME
title: 永住申請の素行善良要件：交通違反・軽犯罪・税滞納
user_situation: "永住申請を控えていて過去の違反歴等が心配な方"
short_answer: "犯罪歴・交通違反複数・税滞納は不利。軽微単発は影響少。完納は必須。"
practical_rule: "①軽微交通違反（反則金のみ）単発は影響少。複数・直近は不利 ②刑事罰（懲役・罰金・執行猶予）：刑確定から3〜5年以上経過が必要 ③税金・社会保険滞納：完納が必須。事前に行政書士確認を推奨。"
official_anchor: "入管法22条／2024年改正"
conditions:
  - "永住申請の在留・素行要件が概ね充足"
risk:
  - "直近1年の滞納で不許可ほぼ確実"
  - "申告漏れの違反歴が発覚"
should_not_say:
  - "軽微な違反なら影響しない"
material_bridge:
  - "課税・納税証明（直近5年）"
  - "年金保険料納付証明・健保納付記録"
  - "犯罪・交通違反の正直な申告"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-069

```yaml
card_id: practical-069
bucket: ANSWER_RUNTIME
title: 帰化申請：書類・審査期間・不許可後の再申請
user_situation: "帰化申請を本格的に準備する／不許可で再申請を考える方"
short_answer: "法務局申請、審査約1〜1.5年。不許可後の再申請に期間制限なし。"
practical_rule: "都道府県の法務局・地方法務局が窓口。申請書・戸籍関係・納税・職歴・動機書等＋国籍別の追加書類。審査約1〜1.5年。不許可理由は通知されないが期間制限なく再申請可。法務局事前相談（無料）と行政書士併用推奨。"
official_anchor: "国籍法5条／帰化要件"
conditions:
  - "在留歴5年・素行善良・生計能力・思想要件等を充足"
risk:
  - "本国書類取寄せ漏れで申請差戻し"
  - "動機書が抽象的で不許可"
should_not_say:
  - "帰化は申請すれば必ず通る"
material_bridge:
  - "帰化許可申請書（法務局配布）"
  - "本国書類一式（出生・戸籍・公証＋翻訳）"
  - "課税・納税証明・勤務先証明"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji78.html"
```

---

## practical-070

```yaml
card_id: practical-070
bucket: ANSWER_RUNTIME
title: 二重国籍の取扱い：日本法における禁止と実態
user_situation: "出生等で二重国籍状態にある／帰化を検討する方"
short_answer: "日本は原則二重国籍禁止。22歳までに選択義務。帰化は原則外国籍離脱。"
practical_rule: "国籍法で二重国籍原則禁止。出生等で二重国籍化した者は22歳までに国籍選択義務（不選択で法務大臣催告の可能性）。帰化は原則外国国籍離脱が条件。日本国籍保有なら入国・在留に在留資格不要。"
official_anchor: "国籍法14条・15条"
conditions:
  - "二重国籍状態または帰化希望"
risk:
  - "22歳選択期限の見落とし"
  - "帰化後の本国国籍離脱手続未了"
should_not_say:
  - "日本でも二重国籍は容認されている"
material_bridge:
  - "国籍選択届（戸籍窓口）"
  - "外国国籍離脱証明書（帰化時）"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji06.html"
```

---

## practical-071

```yaml
card_id: practical-071
bucket: ANSWER_RUNTIME
title: 特別永住者：旧植民地出身者と子孫の特典・手続
user_situation: "韓国・朝鮮籍・台湾系等の特別永住者本人または家族"
short_answer: "戦前在留者と子孫の特別資格。退去強制要件が限定的。証明書更新は市区町村で7年ごと。"
practical_rule: "特別永住者は旧植民地出身者とその子孫の特別資格。就労制限なし、退去強制要件が制限的（一般永住より保障厚い）。証明書更新は市区町村で7年ごと（ISAではない）。子の取得は出生後60日以内に市区町村申請。"
official_anchor: "入管特例法"
conditions:
  - "戦前から日本在留の系譜"
  - "特別永住者証明書保持"
risk:
  - "子の60日申請期限見落とし"
should_not_say:
  - "特別永住者と一般永住者は同じ扱い"
material_bridge:
  - "特別永住者証明書更新：現証明書・写真"
  - "子の申請：出生届受理証明書・親の証明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-13.html"
```

---

## practical-072

```yaml
card_id: practical-072
bucket: ANSWER_RUNTIME
title: 「教授」資格：大学教員の要件と技人国との使い分け
user_situation: "大学・短大・高専で教員職就任予定の外国人"
short_answer: "大学等の専任教員は「教授」。語学学校・専門学校は技人国／教育。"
practical_rule: "①大学・短大・高専の専任（教授・准教授・助教）＝「教授」②語学学校・専門学校＝「技人国（国際業務）」または「教育」③非常勤講師＝活動内容で判断。修士号以上＋採用証明が必要。設置認可校であることが前提。"
official_anchor: "別表第1の1「教授」"
conditions:
  - "勤務先が認可された高等教育機関"
  - "修士号以上または相当実績"
risk:
  - "語学学校で「教授」申請＝不許可"
  - "認可外校で「教授」申請＝不可"
should_not_say:
  - "大学で教える者は全部「教授」"
material_bridge:
  - "大学・機関の採用証明・辞令"
  - "雇用契約書（業務内容・給与・期間）"
  - "修士号・博士号証明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00029.html"
```

---

## practical-073

```yaml
card_id: practical-073
bucket: ANSWER_RUNTIME
title: 技人国で3か月就労空白：無職期間と取消リスク
user_situation: "技人国保持者で離職後3か月近く転職できていない方"
short_answer: "正当な理由なく3か月以上就労なし＝取消リスク。14日内届出＋活動実績残し必須。"
practical_rule: "技人国で3か月以上正当な理由なく就労不従事＝取消対象（22条の2）。離職14日以内届出義務。就職活動中は「正当な理由あり」とみなされるが、ハローワーク登録・求人応募記録等の実績必須。3か月迫る前に行政書士・ISA相談を。"
official_anchor: "入管法22条の2／19条の16"
conditions:
  - "技人国で離職"
  - "次の就労が決まっていない"
risk:
  - "活動実績未記録で「正当理由なし」と判断"
  - "3か月超で取消手続開始"
should_not_say:
  - "技人国は1年無職でも在留期限まで大丈夫"
material_bridge:
  - "離職届出書（ISA）"
  - "ハローワーク登録証・求職活動記録"
  - "次の雇用契約書（転職後）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-074

```yaml
card_id: practical-074
bucket: ANSWER_RUNTIME
title: 経営管理：代表者役員報酬の月額基準
user_situation: "経営管理保持で役員報酬の設定に迷う方"
short_answer: "実務目安は月20万円以上。役員報酬ゼロや10万円未満は生計維持なしと判断されやすい。"
practical_rule: "「日本人同等以上」要件。法令明示基準はないが実務目安は月20万円以上。ゼロや月10万円未満は生計能力なしと判断されやすく更新厳審査。設立初年度赤字でも役員報酬を設定し支払い続けることが重要。税理士＋行政書士の連携相談を推奨。"
official_anchor: "上陸基準省令（経営管理）"
conditions:
  - "経営管理保持・更新申請段階"
risk:
  - "役員報酬ゼロ・極小で生計能力否認"
  - "報酬未払いの実態で生計能力否認"
should_not_say:
  - "赤字なら役員報酬ゼロでよい"
material_bridge:
  - "役員報酬を定めた株主総会議事録"
  - "役員報酬の支払実績（給与明細・振込記録）"
  - "決算書・税務申告書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-075

```yaml
card_id: practical-075
bucket: ANSWER_RUNTIME
title: 国際結婚の手続：日本届出と本国届出
user_situation: "日本人と婚姻予定の外国人カップル"
short_answer: "外国人は本国大使館で婚姻要件具備証明書取得→日本の市区町村に婚姻届。本国届出も別途必要。"
practical_rule: "①外国人が本国大使館・領事館で婚姻要件具備証明書を取得 ②証明書＋必要書類で市区町村に婚姻届（証人2名要）。日本での婚姻成立後、本国への届出が必要な国が多い（韓・中等）。国別手続が異なるため在日大使館に確認。"
official_anchor: "民法740条／戸籍法／各国国際私法"
conditions:
  - "両当事者の独身・婚姻適齢"
risk:
  - "本国届出忘れで本国側で未婚扱い"
  - "婚姻要件具備証明書なしで届出受理されず"
should_not_say:
  - "日本で婚姻届を出せば全部終わり"
material_bridge:
  - "婚姻要件具備証明書（外国人）＋日本語翻訳"
  - "外国人のパスポート・在留カード"
  - "日本人の戸籍謄本"
  - "婚姻届（市区町村窓口）"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji164.html"
```

---

## practical-076

```yaml
card_id: practical-076
bucket: ANSWER_RUNTIME
title: 留学から就労への移行：卒業後の変更／特定活動
user_situation: "日本の大学・大学院を卒業して就職／就活する元留学生"
short_answer: "内定済は技人国等へ変更。未定なら特定活動（就職活動）で最長1年。"
practical_rule: "卒業＝留学資格の活動終了。内定済＝就労系（技人国等）変更申請。未定＝特定活動（就職活動）変更で最長1年（積極的就職活動が条件）。留学資格のままでは更新不可。卒業前後に早期申請を。"
official_anchor: "告示34号（就活）／20条（変更）"
conditions:
  - "日本の大学・専門学校等卒業見込／済"
risk:
  - "卒業後留学のまま放置→更新拒否"
  - "内定許可前に就労開始＝不法就労"
should_not_say:
  - "卒業後すぐに正社員として働ける"
material_bridge:
  - "卒業証明書・成績証明書"
  - "内定通知書・雇用契約書"
  - "就職活動状況の説明書（特活時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00069.html"
```

---

## practical-077

```yaml
card_id: practical-077
bucket: ANSWER_RUNTIME
title: 「法律・会計業務」：外国弁護士・公認会計士の活動
user_situation: "外国の弁護士・会計士資格で日本での業務を考える方"
short_answer: "外国法事務弁護士登録＋日弁連登録で「法律・会計業務」。日本法業務は不可。"
practical_rule: "外国弁護士資格＋日本弁護士連合会の外国法事務弁護士登録で「法律・会計業務」資格。日本法の法律業務は行えない（原産国法・国際法のみ）。弁護士資格なしで外資系専門職勤務は「技人国」が適切な場合あり。"
official_anchor: "別表第1の2「法律・会計業務」"
conditions:
  - "外国弁護士・公認会計士等の資格保持"
  - "日本側登録（日弁連等）完了"
risk:
  - "日本法業務に手を出す→違法・取消"
should_not_say:
  - "外国弁護士でも日本の訴訟代理ができる"
material_bridge:
  - "外国法事務弁護士登録証明（日弁連）"
  - "外国弁護士資格証明＋翻訳"
  - "雇用契約書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00032.html"
```

---

## practical-078

```yaml
card_id: practical-078
bucket: ANSWER_RUNTIME
title: 「研究」資格：大学・研究機関以外での研究者
user_situation: "民間研究所・公的機関等で研究職に就く予定の方"
short_answer: "大学・国立研究機関のポスドク・研究員＝「研究」。民間R&Dは「技人国」。"
practical_rule: "①「研究」：大学・国立研究機関のポスドク・研究員（学術研究主）②「技人国」：民間企業R&D部門（製品開発型）。研究の実態（学術 vs 技術開発）で判断。判断微妙なら行政書士相談。"
official_anchor: "別表第1の2「研究」「技人国」"
conditions:
  - "業務実態が明確に学術研究または技術開発"
risk:
  - "民間製品開発で「研究」申請＝範囲外"
should_not_say:
  - "研究職なら全部「研究」資格"
material_bridge:
  - "採用通知書・雇用契約書（職位・業務内容）"
  - "研究機関概要書"
  - "業績リスト（論文・特許・受賞歴）"
  - "博士号証明書（または同等実績）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00033.html"
```

---

## practical-079

```yaml
card_id: practical-079
bucket: ANSWER_RUNTIME
title: 在留申請の「理由書」作成実務
user_situation: "複雑な変更・更新申請で理由書を作成する方"
short_answer: "法令必須ではないが複雑案件では実質必須。業務内容・学歴関連性・活動計画を具体的に。"
practical_rule: "理由書は法令上必須書類ではないが、複雑案件（経営管理・特殊な業務・転職後等）では実質必須。①現在業務内容（具体的）②学歴と業務の関連性 ③今後の活動計画を日本語で具体的に。行政書士のヒアリングを基にした作成が確実。"
official_anchor: "行政手続法・ISA運用"
conditions:
  - "変更・更新申請で標準書類だけでは説明不足"
risk:
  - "抽象的な理由書は審査官の心証悪化"
  - "事実と矛盾する記載は致命的"
should_not_say:
  - "理由書は形式だけ整えればいい"
material_bridge:
  - "理由書（本人または行政書士作成）"
  - "業務内容説明書（会社作成）"
source_urls:
  - "—"
```

---

## practical-080

```yaml
card_id: practical-080
bucket: ANSWER_RUNTIME
title: 「企業内転勤」：多国籍企業の社内転勤要件
user_situation: "外国本社・グループ会社から日本子会社・支店への転勤予定者"
short_answer: "外国事業所で継続1年以上勤務＋同一企業・グループ内の転勤＋専門業務。"
practical_rule: "要件は①外国事業所で継続1年以上の勤務実績 ②同一企業・グループ内の転勤 ③専門的・技術的業務に従事。日本国内でグループ外に転職する場合は「企業内転勤」→「技人国」の変更申請が必要。"
official_anchor: "別表第1の2「企業内転勤」"
conditions:
  - "外国本社・グループ会社で1年以上在職"
  - "日本側は関連会社・支店"
risk:
  - "1年未満の在職で申請＝不許可"
  - "グループ外転職をそのまま放置＝範囲外活動"
should_not_say:
  - "他社からの中途採用でも「企業内転勤」が使える"
material_bridge:
  - "外国事業所の在職証明書（採用日・職種・期間・給与）＋翻訳"
  - "グループ企業組織図"
  - "日本受入事業所概要・雇用契約書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00035.html"
```

---

## practical-081

```yaml
card_id: practical-081
bucket: ANSWER_RUNTIME
title: 高度専門職→永住特例：1年・3年短縮要件
user_situation: "高度専門職1号でポイント70・80点保持者が永住申請を考える"
short_answer: "ポイント80点で1年・70点で3年で永住申請可能。在留期間中のポイント継続維持証明必須。"
practical_rule: "高度専門職1号（70点以上）3年以上、または80点以上1年以上で通常の10年要件なしに永住申請可能。申請時点のポイント＋在留期間を通じてポイント要件以上を維持していたことの証明が必要。複雑なため行政書士相談推奨。"
official_anchor: "高度専門職告示／永住特例"
conditions:
  - "高度専門職1号で在留"
  - "ポイント要件継続維持"
risk:
  - "途中のポイント低下で「継続維持」否認"
should_not_say:
  - "高度専門職1号なら申請日にポイントあればOK"
material_bridge:
  - "ポイント計算表（申請時）"
  - "在留期間中の雇用契約書・源泉徴収票"
  - "学歴・資格証明書"
  - "課税・納税証明（直近5年）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-082

```yaml
card_id: practical-082
bucket: ANSWER_RUNTIME
title: 育成就労制度：2024年法改正と技能実習からの移行
user_situation: "技能実習中／監理団体・関係者で 2024 年改正の影響を確認したい方"
short_answer: "育成就労が技能実習を段階的に置換（2027年頃完全移行予定）。要件次第で同分野転籍が可能になる。"
practical_rule: "2024年法改正で育成就労制度創設。技能実習は段階的に廃止（2027年頃完全移行予定）。最大の変更は要件充足後の本人意思による同分野内転籍可能化。現在の実習生は経過措置で技能実習継続。詳細は厚労省・ISA最新情報を確認。"
official_anchor: "改正入管法・育成就労法（2024）"
conditions:
  - "技能実習中または受入機関"
risk:
  - "改正情報の取り違えで誤った計画"
should_not_say:
  - "技能実習はもう存在しない"
material_bridge:
  - "—（制度説明）"
source_urls:
  - "https://www.moj.go.jp/isa/policies/policies/03_00021.html"
```

---

## practical-083

```yaml
card_id: practical-083
bucket: ANSWER_RUNTIME
title: 留学中の休学・退学と在留資格への影響
user_situation: "大学・専門学校を休学／退学する留学生"
short_answer: "退学＝留学資格の活動消失で14日届出＋次資格変更が必要。長期休学も取消リスク。"
practical_rule: "退学・転校14日以内にISA届出（所属機関変更）。退学後は「留学」活動実態消失で変更（次の進路）または帰国が必要。休学は在籍維持だが6か月以上の長期休学は取消リスク。早めにISA・行政書士相談。"
official_anchor: "入管法19条の16・22条の2"
conditions:
  - "留学保持・休学／退学した／予定"
risk:
  - "届出未了で取消対象"
  - "長期休学放置で活動実態なしと判断"
should_not_say:
  - "休学・退学しても留学資格はそのまま"
material_bridge:
  - "所属機関変更届出書"
  - "休学証明書・退学証明書（大学発行）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-084

```yaml
card_id: practical-084
bucket: ANSWER_RUNTIME
title: 短期滞在からの在留資格変更：禁止原則と例外
user_situation: "観光・商用ビザで来日中に就職／結婚等で在留したい方"
short_answer: "短期滞在→就労・留学等の変更は原則不可。一旦帰国してCOE申請が正規ルート。"
practical_rule: "短期滞在から就労・留学等の変更は原則認められない。就職・進学が決まった場合は一旦帰国＋本国でCOE申請＋ビザ取得＋再来日が正規。例外：短期滞在中の日本人婚姻等「やむを得ない特別の事情」は変更が認められることがある（婚姻真正性証明が必要）。"
official_anchor: "入管法20条但書／施行規則"
conditions:
  - "現在短期滞在中"
  - "別の在留資格に変えたい"
risk:
  - "原則禁止を知らず変更申請→不許可"
  - "「日本人婚姻」を理由化しても真正性立証不足で不許可"
should_not_say:
  - "観光ビザで来日して就職できる"
material_bridge:
  - "帰国後のCOE申請書類（雇用契約・卒業証明等）"
  - "短期滞在→配偶者等変更：婚姻証明書・住民票等"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
```

---

## practical-085

```yaml
card_id: practical-085
bucket: ANSWER_RUNTIME
title: 配偶者ビザ申請の実態審査：婚姻真正性とISAチェックポイント
user_situation: "日本人配偶者と婚姻して配偶者ビザを申請する方"
short_answer: "婚姻の真正性が中心審査。交際経緯・写真・共通言語・生活実態証拠が決め手。"
practical_rule: "ISAは婚姻の真正性（偽装婚でないか）を中心審査。交際経緯・共通言語・生活実態・写真等の証拠の質が勝負。交際期間短・年齢差大・別居中は審査厳しい。詳細理由書＋充実証拠が特に重要。行政書士相談を推奨。"
official_anchor: "別表第2「日本人の配偶者等」"
conditions:
  - "法律婚成立"
  - "実態のある婚姻関係"
risk:
  - "交際証拠不足で偽装婚疑義"
  - "別居理由の説明不足"
should_not_say:
  - "婚姻届さえ出せば配偶者ビザは自動許可"
material_bridge:
  - "婚姻経緯理由書（出会い・交際・動機）"
  - "交際証拠（写真・旅行・SNS・通話記録）"
  - "日本人配偶者の課税・住民票"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
```

---

## practical-086

```yaml
card_id: practical-086
bucket: ANSWER_RUNTIME
title: 日本でフリーランス（個人事業主）として活動する在留資格
user_situation: "個人事業主・フリーランスとして日本で活動したい外国人"
short_answer: "フリー専用資格はない。継続的業務委託契約で技人国、会社設立なら経営管理が現実的。"
practical_rule: "フリー専用の在留資格はない。①継続的業務委託契約がある場合＝技人国申請可能性（不特定多数の単発のみは難しい）②会社設立＝経営管理（500万円投資・事務所等）。活動内容に応じた最適選択のため行政書士相談を強く推奨。"
official_anchor: "別表第1の2「技人国」「経営管理」"
conditions:
  - "活動形態・契約相手が明確"
risk:
  - "単発案件のみで技人国申請＝不許可"
  - "会社設立せず経営管理＝対象外"
should_not_say:
  - "フリーランスでも自由に活動できる"
material_bridge:
  - "業務委託契約書（継続的・報酬・業務明記）"
  - "ポートフォリオ・業務実績証明"
  - "発注元企業の概要（法人格確認）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-087

```yaml
card_id: practical-087
bucket: ANSWER_RUNTIME
title: 永住者の配偶者等から永住申請：短縮要件
user_situation: "日本人の配偶者等／永住者の配偶者等で永住申請を考える方"
short_answer: "配偶者として継続3年以上＋現在も引き続き1年以上在留で永住申請可能。"
practical_rule: "日本人の配偶者等・永住者の配偶者等は通常の10年要件なしで申請可能：「配偶者継続3年以上＋現在も1年以上引き続き在留中」が要件。素行善良・公的義務完納・婚姻継続等の他要件は同様。行政書士相談を推奨。"
official_anchor: "永住ガイドライン（特例）"
conditions:
  - "日本人配偶者等・永住者配偶者等で3年以上在留"
  - "現在も1年以上引き続き在留"
risk:
  - "離婚後の単身在留期間が長すぎて要件不充足"
should_not_say:
  - "配偶者ビザがあればいつでも永住申請できる"
material_bridge:
  - "在留カード全期間写し"
  - "戸籍謄本・婚姻証明書"
  - "課税・納税証明"
  - "健保・年金加入証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-088

```yaml
card_id: practical-088
bucket: ANSWER_RUNTIME
title: 在留カード不携帯・提示拒否の罰則
user_situation: "外出時に在留カード携帯を忘れがちな外国人"
short_answer: "16歳以上は常時携帯義務。提示拒否は20万円以下罰金。コピー・写真は不可。"
practical_rule: "16歳以上は在留カード原本の常時携帯義務。入管職員・警察官の提示要求に応じる義務。提示拒否は20万円以下の罰金。コピーやスマホ写真は携帯義務を満たさない。外出時の忘れ防止が重要。"
official_anchor: "入管法23条・75条の2"
conditions:
  - "16歳以上の外国人"
risk:
  - "不携帯で職務質問→過料・記録化"
  - "コピーで対応＝携帯義務未達"
should_not_say:
  - "スマホ写真でも携帯したことになる"
material_bridge:
  - "在留カード（原本・常時携帯）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
```

---

## practical-089

```yaml
card_id: practical-089
bucket: ANSWER_RUNTIME
title: 経営管理：外国企業の日本支店・支社設立
user_situation: "外国本社の日本支店・子会社の責任者として来日する方"
short_answer: "支店設立＋経営活動＝経営管理。1年以上の本社在職なら企業内転勤も選択肢。"
practical_rule: "外国企業の日本支店・子会社設立＋経営管理＝「経営管理」資格。外国本社1年以上勤務なら「企業内転勤」も選択肢。500万円投資は支店の設備投資・運転資金（日本口座送金）で充足可。法人設立・在留資格・税務の同時手続が必要で行書・司書・税理士の連携相談を推奨。"
official_anchor: "別表第1の2「経営管理」「企業内転勤」"
conditions:
  - "外国本社が実体ある法人"
  - "日本支店設立予定または完了"
risk:
  - "500万円算入要件を満たさず不許可"
  - "支店登記未了で申請＝書類不足"
should_not_say:
  - "外国本社があれば日本支店だけで経営管理"
material_bridge:
  - "外国本社の登記証明書（英文＋翻訳）"
  - "日本支店登記事項証明書"
  - "日本法人銀行口座残高証明（500万円以上）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-090

```yaml
card_id: practical-090
bucket: ANSWER_RUNTIME
title: 「医療」資格：外国の医師・看護師・歯科医師の活動
user_situation: "外国の医療資格者で日本で医療活動を行いたい方"
short_answer: "外国免許のみでは日本で医療不可。日本国家試験合格＋免許取得→「医療」資格。"
practical_rule: "外国の医師免許のみでは日本で医療行為不可。日本の医師国家試験合格＋医師免許取得→「医療」資格。看護師はEPAルートで来日し国家試験合格後に「医療」または「介護」資格へ変更。厚労省・専門行政書士相談を。"
official_anchor: "医師法・看護師法／別表第1の2「医療」"
conditions:
  - "外国の医療資格保持"
  - "日本の国家試験合格"
risk:
  - "外国免許のみでの医療行為＝違法"
should_not_say:
  - "外国免許で日本でも診療できる"
material_bridge:
  - "日本の医師・看護師等の国家資格証明書"
  - "医療機関の採用証明・雇用契約書"
  - "EPA候補者の場合：送出機関証明・受入施設登録証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00031.html"
```

---

## practical-091

```yaml
card_id: practical-091
bucket: ANSWER_RUNTIME
title: 在留カードの偽造・借用・不正使用と罰則
user_situation: "在留カードの確認方法・不正使用リスクを知りたい雇用主・本人"
short_answer: "他人の在留カード借用・偽造使用は犯罪・退去強制。雇用主の確認不足は不法就労助長罪。"
practical_rule: "他人の在留カード借用・偽造使用は刑事犯罪＋退去強制。雇用主が在留カード適切確認しないと不法就労助長罪（3年以下懲役）。ISAオンラインで番号有効性確認可。雇用時は原本確認＋オンライン確認を併用。"
official_anchor: "入管法73条の2（不法就労助長罪）／刑法（偽造罪）"
conditions:
  - "外国人を雇用する／在留カードを使用する"
risk:
  - "確認怠りで刑事責任発生"
  - "偽造カード使用で本人・関係者全員に罰則"
should_not_say:
  - "在留カードの確認は形式だけ"
material_bridge:
  - "在留カード確認記録（採用時の本人確認記録）"
  - "ISAオンライン確認結果"
source_urls:
  - "https://lapse-immi.moj.go.jp/"
```

---

## practical-092

```yaml
card_id: practical-092
bucket: ANSWER_RUNTIME
title: 技人国の「国際業務」：外国文化背景業務とは
user_situation: "翻訳・通訳・語学教師・外国向け業務に就く外国人"
short_answer: "外国の文化・言語の専門知識を活用する業務。通常大卒＋関連性、3年実務で学歴代替可。"
practical_rule: "「国際業務」は翻訳・通訳・語学教授・国際取引・海外向けマーケ等の外国文化・言語専門知識活用業務。通常大卒＋関連性が要件。翻訳・通訳・語学教授で3年以上の実務経験あれば学歴代替可。業務内容の具体的説明が鍵。"
official_anchor: "別表第1の2「技人国」（国際業務）"
conditions:
  - "業務内容が国際業務に該当"
  - "学歴または3年実務経験"
risk:
  - "業務内容が国内業務中心で「国際業務」否認"
should_not_say:
  - "英語が話せれば国際業務でOK"
material_bridge:
  - "雇用契約書（国際業務であることの明記）"
  - "業務内容説明書"
  - "実務経験証明（前職在職証明・業務証明）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-093

```yaml
card_id: practical-093
bucket: MATERIALS_ONLY
title: 永住申請書類チェックリスト（2024年改定後・就労系）
user_situation: "永住申請の書類セット全体を確認したい方"
short_answer: "申請書・写真・パスポート・在留カード・住民票・収入5年・税納付5年・年金健保納付・身元保証書等。"
practical_rule: "2024年改定後は社会保険・年金の完納証明が特に重視。滞納あれば完納後に申請。書類は申請先ISA窓口で個別差あり、事前確認または行政書士相談を推奨。"
materials_only_reason: "判断ロジック（素行・公的義務・在留歴）は practical-010・practical-021・practical-068 等へ"
material_bridge:
  - "申請書・写真・パスポート・在留カード"
  - "住民票・源泉徴収票5年・住民税課税納税証明5年"
  - "在職証明・年金健保納付証明・身元保証書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-094

```yaml
card_id: practical-094
bucket: ANSWER_RUNTIME
title: 特定技能：受入機関の義務とコンプライアンス
user_situation: "特定技能1号外国人を雇用する企業の責任者"
short_answer: "支援計画作成・実施＋四半期報告＋採用離職時届出が義務。違反で受入停止。"
practical_rule: "受入機関の義務：①支援計画作成・実施（または登録支援機関委託）②四半期報告（ISA）③採用・離職時届出。負担なら登録支援機関委託可（責任は受入機関に残る）。義務不履行＝行政指導・受入停止。"
official_anchor: "特定技能基準省令"
conditions:
  - "特定技能1号外国人を雇用"
risk:
  - "報告漏れで受入停止"
  - "支援計画未実施が発覚で行政処分"
should_not_say:
  - "登録支援機関に委託すれば全責任が移転する"
material_bridge:
  - "特定技能雇用契約書（省令要件充足）"
  - "支援計画書（10項目記載）"
  - "登録支援機関との委託契約書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-095

```yaml
card_id: practical-095
bucket: ANSWER_RUNTIME
title: 「技能」：熟練技能の証明と職種別要件
user_situation: "中華・イタリア料理等のシェフ・調理人として日本で働く方"
short_answer: "外国料理10年以上の調理経験で「技能」。和食は対象外。経験証明書複数職場合算可。"
practical_rule: "中華・イタリア等の外国料理調理師＝「技能」資格。10年以上の調理経験を在職証明書で立証（複数職場合算可）。和食・日本料理は対象外。スポーツ選手・美容師等の職種別要件は別途。行政書士相談推奨。"
official_anchor: "別表第1の2「技能」"
conditions:
  - "外国特有料理または技能職"
  - "10年以上の実務経験"
risk:
  - "経験年数立証書類不足で不許可"
  - "和食料理人で「技能」申請＝不可"
should_not_say:
  - "料理人なら誰でも「技能」資格"
material_bridge:
  - "在職証明書（過去10年分・職種・期間）＋翻訳"
  - "本国の料理師・調理師免許（あれば）"
  - "採用先レストランの業務内容証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00038.html"
```

---

## practical-096

```yaml
card_id: practical-096
bucket: ANSWER_RUNTIME
title: 技人国でのテレワーク・リモートワーク
user_situation: "技人国で在宅勤務・海外リモートワークを考える方"
short_answer: "国内在宅は影響なし。海外3か月以上リモートは実態問題。ノマド型はグレー。"
practical_rule: "日本国内在宅勤務は技人国に影響なし（就労場所が特定事業所に限定されないため）。但し海外3か月以上のリモートは在留の実態問題＋みなし再入国1年制限に注意。外国企業雇用のままリモートする「ノマドワーカー」はグレーゾーン。"
official_anchor: "別表第1の2「技人国」"
conditions:
  - "技人国保持・テレワーク中／予定"
risk:
  - "長期海外滞在で活動実態なし判定"
  - "ノマドワーカー型は範囲外活動リスク"
should_not_say:
  - "技人国でどこからでも働ける"
material_bridge:
  - "雇用契約書（就労場所が「在宅勤務可」と明記）"
source_urls:
  - "—（公式運用は明文化未整備）"
```

---

## practical-097

```yaml
card_id: practical-097
bucket: ANSWER_RUNTIME
title: 在留申請の「事前相談」制度
user_situation: "申請前にISAに問い合わせて確認したい方"
short_answer: "ISA相談窓口は手続・書類確認可能だが、口頭回答に拘束力なし。重要案件は行政書士併用。"
practical_rule: "ISAの相談窓口で一般的な手続方法・必要書類を確認可能。但し口頭回答は正式審査判断ではなく拘束力なし。「問題ない」と言われても申請後不許可になり得る。重要申請は行政書士相談を併用推奨。"
official_anchor: "行政手続法・ISA運用"
conditions:
  - "申請前の段階"
risk:
  - "口頭回答に過信→申請後不許可"
should_not_say:
  - "ISAが大丈夫と言ったから絶対許可される"
material_bridge:
  - "ISA相談メモ（相談日・担当者・回答内容を記録）"
source_urls:
  - "https://www.moj.go.jp/isa/"
```

---

## practical-098

```yaml
card_id: practical-098
bucket: ANSWER_RUNTIME
title: 高度専門職2号：永住に近い特典と申請
user_situation: "高度専門職1号で3年以上在留して2号への移行を検討する方"
short_answer: "就労制限なし・在留期間上限なし・家族も就労制限なし。永住とは別制度。"
practical_rule: "高度専門職2号特典：①就労制限なし（どの職種でも可）②在留期間上限なし（更新制）③家族就労制限なし。2号と永住は別制度（2号取得後も永住申請可）。要件：1号で継続3年以上＋ポイント70点以上の維持。"
official_anchor: "高度専門職告示・別表第1の2"
conditions:
  - "高度専門職1号で3年以上継続在留"
  - "ポイント70点以上維持"
risk:
  - "途中のポイント低下で「維持」否認"
should_not_say:
  - "高度専門職2号は永住と同じ"
material_bridge:
  - "高度専門職1号の在留カード（3年以上証明）"
  - "ポイント計算表（現在70点以上）"
  - "在職証明書・源泉徴収票"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00168.html"
```

---

## practical-099

```yaml
card_id: practical-099
bucket: ANSWER_RUNTIME
title: 「引き続き在留」の計算：出国日数・長期出国の影響
user_situation: "永住・帰化申請で出入国履歴が頻繁な方"
short_answer: "短期帰省・出張は影響なし。3か月以上連続出国は「引き続き在留」中断リスク。"
practical_rule: "永住の「10年引き続き在留」要件は短期帰省・出張・旅行で通常影響なし。但し3か月以上の連続出国は「引き続き在留」中断と判断される可能性。年間合計3か月以上の出国は申請書に出国理由を添付推奨。帰化「5年居住要件」は生活本拠が日本にあることが必要。"
official_anchor: "永住・帰化ガイドライン"
conditions:
  - "永住・帰化申請を検討中"
  - "出入国履歴に長期出国がある"
risk:
  - "3か月以上連続出国の累積で要件分断扱い"
should_not_say:
  - "海外出張なら何日でも問題ない"
material_bridge:
  - "パスポート（全入出国スタンプ）"
  - "出国理由・業務上の必要性の説明書"
  - "住民票（住所継続性）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-100

```yaml
card_id: practical-100
bucket: ANSWER_RUNTIME
title: 在留申請の不許可理由確認と異議申立・再申請
user_situation: "在留資格の更新／変更が不許可になった方"
short_answer: "不許可後は再申請が最も現実的。理由は法令上非通知だがISA窓口で口頭確認可。特例期間（2か月）内に行動。"
practical_rule: "①ISA窓口で不許可理由を口頭確認 ②不許可理由を踏まえた再申請（最も現実的）③審査請求（行政不服申立て）④行政訴訟（費用・時間大）。在留特例期間（2か月程度）内に行動必須。行政書士緊急相談を強く推奨。"
official_anchor: "入管法21条／行政不服審査法"
conditions:
  - "不許可通知書受領済"
  - "在留特例期間内"
risk:
  - "特例期間経過でオーバーステイ化"
  - "再申請で同じ書類のまま提出＝同じく不許可"
should_not_say:
  - "不許可になったら必ず帰国するしかない"
material_bridge:
  - "不許可通知書"
  - "再申請のための追加書類（不許可理由に応じる）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00044.html"
```

---

## 注記

- Batch 02 は practical-051〜100。全 50 張中 ANSWER_RUNTIME=49、MATERIALS_ONLY=1。
- 母カード全文は `docs/practical-fact-layer/cards/practical-XXX.md` 参照。
- 短版 runtime block の利用については Batch 01 と同じ。
