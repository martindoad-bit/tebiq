# Practical Batch 04 — Runtime Blocks (practical-151〜practical-200)

> 生成日: 2026-05-19 / Batch 04 / 母カード参照は `docs/practical-fact-layer/cards/practical-XXX.md`

---

## practical-151

```yaml
card_id: practical-151
bucket: ANSWER_RUNTIME
title: 外国人の養子縁組と在留資格
user_situation: "日本人が外国人を養子にする／海外から養子を呼び寄せる方"
short_answer: "養子は自動的に日本国籍取得不可。在留は定住者または特定活動。国際養子は弁護士相談必須。"
practical_rule: "日本人が外国人を養子にしても自動で日本国籍は取得されない（帰化申請が別途必要）。養子の日本在留は「定住者」または「特定活動」での申請。国際養子は法律複雑で弁護士相談必須。"
official_anchor: "国籍法・民法・別表第2「定住者」"
conditions:
  - "養子縁組成立または計画"
risk:
  - "自動国籍取得を誤認"
  - "在留資格の事前確保未了"
should_not_say:
  - "養子にすれば自動で日本国籍が取れる"
material_bridge:
  - "養子縁組証明書（国内または外国）"
  - "裁判所の審判書（特別養子縁組時）"
  - "戸籍謄本（養親子関係記載）"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji78.html"
```

---

## practical-152

```yaml
card_id: practical-152
bucket: ANSWER_RUNTIME
title: 技能実習→特定技能：試験免除条件
user_situation: "技能実習2号修了で特定技能1号への移行を考える方"
short_answer: "2号修了＋同一職種なら技能試験免除。日本語試験は原則必要。"
practical_rule: "技能実習2号良好修了者は同一職種・作業の特定技能分野への移行で技能試験免除。日本語試験は原則必要。新受入機関との特定技能雇用契約＋変更申請が必要。職種対応関係は法務省対応表で確認。"
official_anchor: "特定技能告示"
conditions:
  - "技能実習2号良好修了"
  - "同一職種への移行"
risk:
  - "別職種への移行で試験必要"
should_not_say:
  - "実習修了すれば特定技能どの分野でもOK"
material_bridge:
  - "技能実習修了証明書"
  - "特定技能雇用契約書"
  - "日本語能力試験合格証明書"
  - "在留資格変更許可申請書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-153

```yaml
card_id: practical-153
bucket: ANSWER_RUNTIME
title: 永住の10年在留歴計算
user_situation: "永住申請の在留歴 10 年が近い方"
short_answer: "短期滞在を除く在留資格での継続在留期間の合計。就労系5年以上が原則必要。"
practical_rule: "永住申請の「10年」は短期滞在を除く在留資格での継続在留の合計。留学・就労・家族滞在は算入。短期滞在（観光・商用）は不算入。10年のうち就労系5年以上が原則。留学のみの10年では不可。"
official_anchor: "永住ガイドライン／入管法22条"
conditions:
  - "在留歴10年に近い"
risk:
  - "留学のみでカウントして要件不充足"
  - "短期出国で「連続」分断扱い"
should_not_say:
  - "10年いれば自動で永住が取れる"
material_bridge:
  - "パスポート（入出国スタンプ・在留資格記録）"
  - "在留カード履歴"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-154

```yaml
card_id: practical-154
bucket: ANSWER_RUNTIME
title: 技人国の長期出張・海外赴任
user_situation: "技人国保持者で海外出張・赴任予定の方"
short_answer: "1年以内ならみなし再入国で在留資格維持。在留期間切れに注意。"
practical_rule: "技人国で海外出張・赴任は1年以内ならみなし再入国で資格維持。出国前に在留カードの有効期間確認必須。1年超予定は事前に正規再入国許可（最長5年）取得。出国中の在留期間満了で失効リスク。"
official_anchor: "入管法26条／26条の2"
conditions:
  - "海外出張・赴任予定"
  - "現在の在留期間に余裕"
risk:
  - "出国中の在留期間満了で失効"
  - "1年超滞在で資格失効"
should_not_say:
  - "海外赴任しても日本のビザは関係ない"
material_bridge:
  - "再入国許可申請書（1年超予定時）"
  - "在留カード（帰国時提示）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-4.html"
```

---

## practical-155

```yaml
card_id: practical-155
bucket: ANSWER_RUNTIME
title: 日系人（2世・3世）の定住者ビザ
user_situation: "日系2世・3世として定住者ビザを取得したい方"
short_answer: "日系3世まで告示定住者（要件明示）。日系4世は特定活動の別告示。"
practical_rule: "日系人定住者は日本人の子（2世）・孫（3世）まで告示定住者の対象。系譜証明（日本人の祖父母・父母の戸籍）が必要。日系4世は「特定活動」の別告示で要件異なる（年齢・日本語能力等）。"
official_anchor: "定住者告示（日系人）"
conditions:
  - "日本人の子孫であることが証明可"
risk:
  - "日系4世を「定住者」と誤認"
should_not_say:
  - "日系であれば自動的に定住者"
material_bridge:
  - "日本人祖父母・父母の戸籍謄本"
  - "申請者の出生証明書・親の出生証明書（本国）"
  - "翻訳文（認定翻訳者）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00045.html"
```

---

## practical-156

```yaml
card_id: practical-156
bucket: ANSWER_RUNTIME
title: 老齢・障害・遺族年金の在留資格別取扱
user_situation: "国民年金・厚生年金加入歴のある外国人の受給権"
short_answer: "在留資格に関係なく加入歴があれば受給権あり。社会保障協定国は通算可。"
practical_rule: "国民年金・厚生年金は在留資格・国籍に関係なく加入条件と納付期間で受給権発生。社会保障協定締結国（独・米・韓等）は加入期間通算可。帰国後の脱退一時金は2年以内に請求。海外居住者は在外公館で現況届。"
official_anchor: "国民年金法・厚生年金保険法／社会保障協定"
conditions:
  - "年金加入実績がある"
risk:
  - "脱退一時金の2年期限見落とし"
  - "海外居住で現況届出未了"
should_not_say:
  - "外国人は年金受給できない"
material_bridge:
  - "年金手帳・基礎年金番号通知書"
  - "ねんきんネット（加入記録確認）"
  - "在外公館での現況届"
source_urls:
  - "https://www.nenkin.go.jp/"
```

---

## practical-157

```yaml
card_id: practical-157
bucket: ANSWER_RUNTIME
title: 経営管理更新：赤字・実績なしと1年許可
user_situation: "経営管理で赤字・売上低迷が続く方"
short_answer: "赤字でも「事業継続意思と実態」あれば更新可。但し1年短縮が多い。2〜3期連続赤字は不許可リスク。"
practical_rule: "赤字でも事業継続意思＋実態を立証できれば更新可。但し在留期間1年に短縮されることが多い。事業計画書・売上実績・役員報酬の実態を示す書類が重要。2〜3期連続赤字で改善兆しなし＝不許可リスク高。"
official_anchor: "上陸基準省令（経営管理）"
conditions:
  - "経営管理で更新申請段階"
  - "赤字または売上低迷"
risk:
  - "理由書が抽象的で不許可"
  - "役員報酬未払で生計能力否認"
should_not_say:
  - "赤字でも問題なく更新できる"
material_bridge:
  - "事業計画書（具体的改善計画）"
  - "決算書・税務申告書"
  - "顧客・取引先の契約書・見積書"
  - "役員報酬支払証明"
  - "税理士意見書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-158

```yaml
card_id: practical-158
bucket: ANSWER_RUNTIME
title: 技人国の「実務経験10年」学歴代替
user_situation: "大卒未満で10年以上の専門経験がある方"
short_answer: "本国等での専門業務10年以上が対象。日本での就労期間は原則学歴代替不可。"
practical_rule: "技人国の「実務経験10年」学歴代替は本国等での専門業務10年以上の経験が対象。日本で積んだ経験（アルバイト・留学中の非正規就労等）は学歴代替に原則使えない。本国での在職証明書等で経験を立証。"
official_anchor: "上陸基準省令（技人国）"
conditions:
  - "大卒未満"
  - "本国等で10年以上専門業務"
risk:
  - "日本での経験で代替しようとして不許可"
should_not_say:
  - "日本での経験10年で技人国が取れる"
material_bridge:
  - "本国の在職証明書（10年分）"
  - "業務内容の詳細説明書"
  - "給与明細・社会保険加入記録"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-159

```yaml
card_id: practical-159
bucket: ANSWER_RUNTIME
title: 帰化申請の日本語能力要件
user_situation: "帰化申請を考えるが日本語能力に不安な方"
short_answer: "JLPT等の試験提出は不要。法務局面接で日本語会話力確認。N3相当が目安。"
practical_rule: "帰化申請にJLPT提出は必須でない。法務局の面接で日本語会話能力を確認。実務目安は小学校3〜4年生程度（JLPT N3相当）。通訳なしで氏名・住所・申請動機等に答えられること。N3以上の合格証は参考書類として提出可能。"
official_anchor: "国籍法5条"
conditions:
  - "帰化申請段階"
risk:
  - "面接で対応できないと不許可"
should_not_say:
  - "日本語ができなくても帰化できる"
material_bridge:
  - "JLPT等の合格証明書（任意・参考書類）"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji78.html"
```

---

## practical-160

```yaml
card_id: practical-160
bucket: ANSWER_RUNTIME
title: 特定技能2号の対象分野と試験
user_situation: "特定技能2号への移行を検討する方"
short_answer: "2023年改正で介護を除く11分野が対象。在留上限なし・家族帯同可。介護は対象外。"
practical_rule: "特定技能2号は2023年改正で介護を除く11分野に拡大。在留期間更新上限なし・家族帯同可。永住申請も可能。介護分野は2号対象外（「介護」資格への変更等を検討）。2号試験は難易度高く、指導・監督レベルの技能証明が必要。"
official_anchor: "特定技能告示／基本方針2023改定"
conditions:
  - "特定技能1号で在留中"
  - "介護以外の分野"
risk:
  - "介護分野で2号を期待"
should_not_say:
  - "全分野で2号がある"
material_bridge:
  - "2号技能評価試験の申込書類"
  - "在留資格変更許可申請書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-161

```yaml
card_id: practical-161
bucket: ANSWER_RUNTIME
title: 「興行」：エンターテイナー・アーティストの就労
user_situation: "外国人ミュージシャン・ダンサー等で日本公演を行う方"
short_answer: "有償公演には「興行」必須。受入機関の適格性・実績証明が厳格審査。"
practical_rule: "外国人ミュージシャン・ダンサー等の有償公演には「興行」資格必須。審査厳格、受入機関の適格性・公演実績証明が要件。飲食店・水商売系は2005年以降実質取得不可。専門の行政書士相談を強く推奨。"
official_anchor: "別表第1の2「興行」"
conditions:
  - "有償公演予定"
  - "受入機関との契約"
risk:
  - "飲食店系で「興行」申請＝不許可"
should_not_say:
  - "アーティストなら誰でも「興行」を取れる"
material_bridge:
  - "出演・公演契約書"
  - "外国人芸術家の実績証明（公演・受賞歴）"
  - "受入機関の事業概要・適格性証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00037.html"
```

---

## practical-162

```yaml
card_id: practical-162
bucket: ANSWER_RUNTIME
title: 外国人の住宅賃貸
user_situation: "賃貸住宅を借りようとして断られた外国人"
short_answer: "賃貸拒否は推奨されないが現実に発生。外国人対応保証会社・公営住宅活用を。"
practical_rule: "外国人への賃貸拒否は法的に推奨されないが実際には発生。賃貸審査は在留資格安定性・収入証明・保証会社利用が重要。外国人対応保証会社（全保連・LICC・Casa等）を活用。公営住宅は永住者・定住者等の安定資格保持者が中心。"
official_anchor: "—（民法・各社規定）"
conditions:
  - "賃貸住宅を探している"
risk:
  - "差別的扱いに対する対応"
should_not_say:
  - "外国人は賃貸を借りられない"
material_bridge:
  - "在留カード（在留資格・期間確認）"
  - "在職証明書・源泉徴収票"
  - "保証会社の申込書"
source_urls:
  - "—（各保証会社）"
```

---

## practical-163

```yaml
card_id: practical-163
bucket: ANSWER_RUNTIME
title: 不許可後の異議申立・再申請の現実
user_situation: "在留資格申請が不許可になった方"
short_answer: "行政不服申立は実務上成功率極低。再申請が最も有効。窓口で不許可理由確認＋早期行動。"
practical_rule: "不許可後の行政不服申立て（異議申出）は法的には可能だが実務成功率極低。実務上最も有効なのは入管窓口で不許可理由確認＋改善後の再申請。在留期間残りに余裕がない場合は即時行政書士相談。"
official_anchor: "入管法21条／行政不服審査法"
conditions:
  - "不許可通知受領済"
risk:
  - "対応遅延でオーバーステイ化"
should_not_say:
  - "不服申立てで簡単に覆る"
material_bridge:
  - "不許可通知書"
  - "窓口で確認した不許可理由のメモ"
  - "改善した書類・状況証明（再申請用）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00044.html"
```

---

## practical-164

```yaml
card_id: practical-164
bucket: ANSWER_RUNTIME
title: 外国人の国民健康保険加入義務
user_situation: "3か月超在留の外国人で国保加入を確認したい方"
short_answer: "3か月超在留＝国保加入義務（職場健保非加入の場合）。未加入は更新審査で不利。"
practical_rule: "3か月超の在留資格（技人国・留学・家族滞在等）保持者は職場健保非加入なら国保加入義務。住民登録時に手続。未加入は在留更新・永住申請審査で不利。留学生は所得少なく保険料軽減制度あり。"
official_anchor: "国民健康保険法"
conditions:
  - "在留期間3か月超"
risk:
  - "未加入で次回更新審査の減点"
should_not_say:
  - "外国人は国保不要"
material_bridge:
  - "在留カード（住所・資格確認）"
  - "国民健康保険加入申請書（市区町村窓口）"
  - "職場健保の資格喪失証明書（切替時）"
source_urls:
  - "https://www.kokuho.or.jp/"
```

---

## practical-165

```yaml
card_id: practical-165
bucket: ANSWER_RUNTIME
title: 「研究」資格：民間企業での研究活動
user_situation: "民間企業の研究開発部門で就職予定の方"
short_answer: "「研究」は民間企業R&Dでも可。但し活動は研究に限定。製造・営業等は技人国を選択。"
practical_rule: "「研究」は大学・国立研究機関だけでなく民間企業のR&D部門でも取得可。但し活動は研究（実験・分析・論文等）に限定、通常業務（製造・営業）は対象外。民間の専門職は技人国でも申請可能、業務内容で選択。"
official_anchor: "別表第1の2「研究」"
conditions:
  - "業務が学術研究主"
risk:
  - "営業・製造活動を含む業務で「研究」申請＝範囲外"
should_not_say:
  - "民間R&Dは全部「研究」"
material_bridge:
  - "雇用・研究委託契約書"
  - "研究活動の内容説明書（職務内容・研究テーマ）"
  - "研究者の学歴・業績証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00033.html"
```

---

## practical-166

```yaml
card_id: practical-166
bucket: ANSWER_RUNTIME
title: 配偶者ビザ更新：夫婦の実態確認・偽装婚審査
user_situation: "配偶者ビザの更新で別居や交流不足が心配な方"
short_answer: "婚姻実態（同居・交流・経済的結合）が厳格審査。別居でも正当理由があれば更新可。"
practical_rule: "「日本人の配偶者等」更新は婚姻実態を厳格審査。別居中でも正当理由（単身赴任・医療等）と理由証明書類があれば更新可。夫婦の写真・住民票・交流記録を準備。偽装婚判断＝不許可・取消リスク。"
official_anchor: "別表第2「日本人の配偶者等」"
conditions:
  - "「日本人の配偶者等」で更新申請段階"
risk:
  - "交流証拠不足で偽装婚疑義"
should_not_say:
  - "別居中でも何も必要ない"
material_bridge:
  - "戸籍謄本（婚姻事実確認）"
  - "住民票（同居確認）"
  - "夫婦の写真（複数・直近）"
  - "別居中なら別居理由証明書（辞令・診断書等）"
  - "配偶者の課税証明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
```

---

## practical-167

```yaml
card_id: practical-167
bucket: ANSWER_RUNTIME
title: 特定技能受入機関の支援計画・定期報告義務
user_situation: "特定技能外国人を雇用する企業の担当者"
short_answer: "10項目の支援計画＋4か月ごとの定期報告が義務。怠ると改善命令・受入停止。"
practical_rule: "特定技能受入機関は10項目の支援計画作成・実施＋4か月ごとの定期報告が義務。支援業務は登録支援機関（RSO）への委託可能（責任は受入機関に残る）。報告怠ると改善命令・受入資格取消の対象。"
official_anchor: "特定技能基準省令"
conditions:
  - "特定技能受入機関"
risk:
  - "報告漏れで受入停止"
should_not_say:
  - "登録支援機関に委託すれば全て免責される"
material_bridge:
  - "特定技能外国人支援計画書"
  - "支援実施記録（面談記録・支援内容証明）"
  - "定期報告書（所定様式）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-168

```yaml
card_id: practical-168
bucket: ANSWER_RUNTIME
title: 帰化 vs 永住：選択の判断
user_situation: "帰化と永住のどちらを選ぶか迷う長期在留者"
short_answer: "帰化＝日本国籍取得＋外国籍放棄。永住＝外国籍維持で在留制限解除。"
practical_rule: "帰化は日本国籍取得・外国籍放棄（パスポート・選挙権取得）。永住は外国籍維持しつつ在留制限緩和（就労制限なし・在留資格継続）。日本は原則二重国籍不可、帰化＝原国籍放棄。選択は元国との関係・就職・生活計画次第。"
official_anchor: "国籍法／永住ガイドライン"
conditions:
  - "永住・帰化どちらも要件充足"
risk:
  - "二重国籍を期待して帰化"
should_not_say:
  - "帰化と永住はほぼ同じ"
material_bridge:
  - "帰化申請書類（法務局）"
  - "永住申請書類（出入国在留管理庁）"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji78.html"
```

---

## practical-169

```yaml
card_id: practical-169
bucket: ANSWER_RUNTIME
title: 技人国の副業・兼業の可否
user_situation: "技人国で副業（フリー・アルバイト）を考える方"
short_answer: "副業には資格外活動許可必須。無許可副業は取消リスク。受動収入は許可不要。"
practical_rule: "技人国で副業（フリー・アルバイト）は資格外活動許可取得が必要。無許可副業＝取消・不許可リスク。株式投資・不動産収入等の受動的収入は就労に当たらず許可不要。事前に行政書士相談を強く推奨。"
official_anchor: "入管法19条（資格外活動）"
conditions:
  - "技人国で本業継続中"
  - "副業内容明確"
risk:
  - "無許可副業＝不法就労"
should_not_say:
  - "技人国なら副業は自由"
material_bridge:
  - "資格外活動許可申請書"
  - "副業の業務内容・報酬説明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00027.html"
```

---

## practical-170

```yaml
card_id: practical-170
bucket: ANSWER_RUNTIME
title: 在留カード紛失・盗難の対応
user_situation: "在留カードを紛失・盗難した方"
short_answer: "警察届出→14日以内に ISA で再交付申請。盗難の悪用リスク高。"
practical_rule: "在留カードを紛失・盗難した場合、まず警察に届出（紛失届/被害届）→14日以内に出入国在留管理局で再交付申請。14日違反は罰則対象。盗難の場合は悪用リスクのため警察被害届が特に重要。"
official_anchor: "入管法19条の12"
conditions:
  - "在留カードの紛失・盗難"
risk:
  - "14日違反で過料"
  - "盗難カードの悪用リスク"
should_not_say:
  - "再発行は急ぐ必要ない"
material_bridge:
  - "警察の紛失届・被害届受理証明書"
  - "在留カード再交付申請書"
  - "パスポート・証明写真"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
```

---

## practical-171

```yaml
card_id: practical-171
bucket: ANSWER_RUNTIME
title: 経営管理500万円：借入金・現物出資・共同出資の扱い
user_situation: "経営管理ビザの500万円要件を多様な形で満たしたい方"
short_answer: "借入金・共同出資・現物出資も可。但し「事業に実投入」立証と評価証明が必要。"
practical_rule: "経営管理の500万円出資は銀行融資・共同出資も認められうる。但し「事業に実際投入された資金」の立証必須、残高証明だけでは不十分なケースあり。現物出資（設備・機械等）は市場価値の評価証明が必要。共同出資は申請者の実質経営参与の証明が審査。"
official_anchor: "上陸基準省令（経営管理）"
conditions:
  - "経営管理の新規申請"
risk:
  - "見せ金疑義で不許可"
  - "現物出資の評価過大計上で不許可"
should_not_say:
  - "借入金は500万円要件に絶対認められない"
material_bridge:
  - "銀行残高証明書"
  - "法人登記事項証明書（資本金額）"
  - "現物出資の場合：評価書・購入領収書"
  - "事業計画書（資金使途・事業規模）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-172

```yaml
card_id: practical-172
bucket: ANSWER_RUNTIME
title: 外国人の厚生年金脱退一時金
user_situation: "帰国予定で日本の年金を一時金で受け取りたい方"
short_answer: "帰国後2年以内に請求。源泉徴収20.42%。社会保障協定国は通算選択可。"
practical_rule: "厚生年金・国民年金加入の外国人は帰国後2年以内に脱退一時金請求可（過ぎると時効消滅）。源泉徴収（20.42%）が適用、租税条約適用国は除く。社会保障協定国は本国年金との通算・選択を検討。"
official_anchor: "厚生年金保険法・国民年金法"
conditions:
  - "日本の年金加入実績"
  - "帰国予定または帰国済"
risk:
  - "2年期限見落としで時効消滅"
should_not_say:
  - "帰国後いつでも請求できる"
material_bridge:
  - "脱退一時金請求書"
  - "基礎年金番号・マイナンバー"
  - "出入国スタンプ（帰国証明）"
  - "海外銀行口座情報"
source_urls:
  - "https://www.nenkin.go.jp/"
```

---

## practical-173

```yaml
card_id: practical-173
bucket: ANSWER_RUNTIME
title: 「技能」資格の調理師・10年実務経験の証明
user_situation: "外国料理の調理師として就職予定の方"
short_answer: "「技能」は外国料理10年経験必須。雇用証明書で立証。和食は対象外。"
practical_rule: "「技能」資格は外国料理の調理師に10年以上の実務経験（調理直接従事期間）が必要。雇用証明書（過去の雇用主から）で立証。調理師学校での学習・管理職期間は経験不算入。和食は対象外（技人国等で対応）。"
official_anchor: "別表第1の2「技能」"
conditions:
  - "外国料理調理師職"
  - "10年以上の調理実務"
risk:
  - "経験年数立証不足"
  - "和食料理人で「技能」申請"
should_not_say:
  - "料理人なら誰でも「技能」"
material_bridge:
  - "在職証明書（過去勤務先の雇用証明）"
  - "給与明細・社会保険証明書"
  - "受入機関のメニュー・営業実態証明"
  - "外国文書はアポスティーユ・公証"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00038.html"
```

---

## practical-174

```yaml
card_id: practical-174
bucket: ANSWER_RUNTIME
title: 不法就労雇用主の罰則と入管調査
user_situation: "外国人雇用時の確認義務に不安な企業"
short_answer: "知って雇用＝不法就労助長罪（3年以下懲役）。在留カード確認＋ハローワーク届出。"
practical_rule: "不法就労と知って雇用＝不法就労助長罪（3年以下懲役・300万円以下罰金）対象。雇用前に在留カードで就労資格（資格・期間・制限）を確認・記録。外国人の雇用・離職時はハローワーク届出義務（30万円以下罰金）。"
official_anchor: "入管法73条の2／雇用対策法"
conditions:
  - "外国人を雇用または検討中"
risk:
  - "確認怠りで刑事責任"
should_not_say:
  - "在留カード確認は形式だけ"
material_bridge:
  - "在留カードのコピー（雇用時取得・保管）"
  - "外国人雇用状況届（ハローワーク）"
  - "雇用契約書"
source_urls:
  - "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/"
```

---

## practical-175

```yaml
card_id: practical-175
bucket: ANSWER_RUNTIME
title: 日本での婚姻手続：方式・書類・在留資格への影響
user_situation: "日本人と結婚する外国人"
short_answer: "市区町村に婚姻届。外国人は婚姻要件具備証明書必要。婚姻届と在留資格変更は別手続。"
practical_rule: "日本での婚姻は市区町村に婚姻届提出（日本方式）。外国人は本国大使館発行の婚姻要件具備証明書が必要（国により取得期間異なる）。婚姻届受理後に「日本人の配偶者等」変更申請（審査1〜3か月）。婚姻届と在留資格変更は別手続で自動変更されない。"
official_anchor: "民法740条／戸籍法"
conditions:
  - "日本人との結婚"
risk:
  - "婚姻届のみで在留資格が自動変更されると誤認"
should_not_say:
  - "結婚すれば自動で配偶者ビザ"
material_bridge:
  - "婚姻届（市区町村所定様式）"
  - "婚姻要件具備証明書（在日大使館発行）"
  - "外国文書の日本語翻訳"
  - "在留資格変更許可申請書"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji164.html"
```

---

## practical-176

```yaml
card_id: practical-176
bucket: ANSWER_RUNTIME
title: 特定活動46号：本邦大卒＋N1の就労範囲
user_situation: "日本の大学・大学院卒で日本語N1相当の方"
short_answer: "日本の大卒＋N1で日本語活用業務に就労。専攻と業務の関連性不問。"
practical_rule: "特定活動46号は日本の大学・大学院卒業＋JLPT N1相当の日本語能力を持つ外国人が日本語を活かした業務に就くための資格。技人国と異なり専攻と業務の関連性は不問。日本の大卒が必須（外国大卒は対象外）。在留期間は1年更新。"
official_anchor: "特定活動告示46号"
conditions:
  - "日本の大学・大学院卒業"
  - "JLPT N1等の日本語能力"
risk:
  - "外国大学卒で申請＝対象外"
should_not_say:
  - "外国大卒でも46号OK"
material_bridge:
  - "日本の大学・大学院卒業証明書・学位証明書"
  - "JLPT N1等の合格証明書"
  - "雇用契約書（業務内容詳細）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00216.html"
```

---

## practical-177

```yaml
card_id: practical-177
bucket: ANSWER_RUNTIME
title: 留学生の在籍管理：大学報告と出席率
user_situation: "出席率に不安がある留学生／休学検討中の方"
short_answer: "大学は定期的に在籍報告。出席率70%未満は更新不許可リスク。休学は正当理由必要。"
practical_rule: "大学・日本語学校は留学生の在籍・出席状況を入管に定期報告。出席率70%未満は在留更新不許可リスク。休学中は更新困難で正当理由証明が必要。中退時は在留資格変更（就活なら特定活動）を検討。"
official_anchor: "入管法施行規則／留学生関連通知"
conditions:
  - "留学生として在留中"
risk:
  - "出席率70%未満で更新不許可"
should_not_say:
  - "出席率は気にしなくていい"
material_bridge:
  - "在学証明書・成績証明書"
  - "休学証明書・理由証明書（休学時）"
  - "中退後の就職活動関連書類"
source_urls:
  - "https://www.studyinjapan.go.jp/"
```

---

## practical-178

```yaml
card_id: practical-178
bucket: ANSWER_RUNTIME
title: 経営管理ビザ申請のタイミング：設立前後
user_situation: "起業のためのビザ取得計画段階の方"
short_answer: "会社設立（法人登記）後の変更申請が原則。短期滞在からの変更は実質不可。許可前の営業活動は資格外活動。"
practical_rule: "経営管理は会社設立後の変更申請が原則。短期滞在（観光ビザ）からの変更は原則認められず実務もほぼ不許可。海外から来日ならCOE申請が確実。経営管理ビザ許可前の実際の営業活動は資格外活動。"
official_anchor: "入管法20条／別表第1の2"
conditions:
  - "経営管理ビザ取得目的"
risk:
  - "短期滞在で会社設立→変更不可"
  - "許可前の営業で資格外活動"
should_not_say:
  - "観光ビザで来日して経営管理に変更できる"
material_bridge:
  - "法人登記事項証明書"
  - "事務所の賃貸借契約書"
  - "資本金払込証明書"
  - "事業計画書"
  - "在留資格変更（または認定証明書）申請書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-179

```yaml
card_id: practical-179
bucket: ANSWER_RUNTIME
title: 永住者の離婚と在留資格への影響
user_situation: "永住者で離婚予定の方"
short_answer: "永住者の在留資格は離婚で取消されない。但し偽装婚で永住取得が発覚すれば取消リスク。"
practical_rule: "永住者の在留資格は離婚しても原則取消されない（婚姻継続は永住者の在留条件でない）。但し偽装婚を利用して永住申請した事実が発覚すると取消リスク。「日本人の配偶者等」（永住でない）は離婚で根拠喪失、別途手続必要。離婚後は住所変更・姓変更手続も忘れず。"
official_anchor: "入管法22条（永住）／22条の2（取消）"
conditions:
  - "永住者で離婚予定"
risk:
  - "偽装婚利用での永住取得が発覚→取消"
should_not_say:
  - "永住者は離婚で必ず資格喪失"
material_bridge:
  - "離婚届の受理証明書"
  - "住所変更届（市区町村）"
  - "在留カードの記載事項変更届出（姓変更時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-180

```yaml
card_id: practical-180
bucket: ANSWER_RUNTIME
title: 日本生まれの外国人の子の在留資格
user_situation: "日本で外国人の子が生まれた家族"
short_answer: "14日以内に出生届・60日（30日推奨）以内に在留資格取得申請。血統主義のため自動国籍取得なし。"
practical_rule: "日本で外国人の子が生まれた場合、出生後14日以内に市区町村で出生届、60日以内（30日推奨）に入管で在留資格取得許可申請。子の資格は親の資格に応じる（家族滞在等）。日本は血統主義のため日本生まれでも自動国籍取得なし。"
official_anchor: "入管法22条の2（取得）／戸籍法"
conditions:
  - "両親または一方が外国人"
risk:
  - "60日経過で不法残留化"
should_not_say:
  - "日本生まれなら日本国籍を取得できる"
material_bridge:
  - "出生届受理証明書"
  - "在留資格取得許可申請書"
  - "親の在留カード・パスポート"
  - "子の出生証明書・パスポート（本国発行後）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-6.html"
```

---

## practical-181

```yaml
card_id: practical-181
bucket: ANSWER_RUNTIME
title: 外国人の遺言書作成：方式・準拠法
user_situation: "日本で財産を持つ外国人で遺言書作成を検討する方"
short_answer: "日本方式（自筆・公正証書）で有効。外国語可だが相続時に翻訳必要。両国財産なら弁護士相談。"
practical_rule: "外国人が日本で遺言書作成は日本方式（自筆・公正証書等）で有効。外国語遺言書も方式を満たせば有効だが相続手続で翻訳必要。日本と本国の両方に財産がある場合は専門弁護士・司法書士相談が強く推奨。"
official_anchor: "民法960条以下／法の適用に関する通則法"
conditions:
  - "日本国内に財産を持つ"
risk:
  - "方式不備で無効"
  - "国際相続の準拠法問題"
should_not_say:
  - "外国人は日本で遺言を書けない"
material_bridge:
  - "遺言書（自筆証書または公正証書）"
  - "公正証書遺言は公証役場で作成"
  - "家庭裁判所の検認申請書（自筆証書時）"
source_urls:
  - "https://www.koshonin.gr.jp/"
```

---

## practical-182

```yaml
card_id: practical-182
bucket: ANSWER_RUNTIME
title: 「企業内転勤」：転勤元要件・活動範囲・家族
user_situation: "海外本社から日本子会社・支店への転勤予定者"
short_answer: "外国本社で継続1年以上＋同一企業・グループ＋専門業務。家族は家族滞在で帯同可。"
practical_rule: "企業内転勤は外国本社で継続1年以上の勤務実績＋同一企業・グループ内転勤＋専門的・技術的業務（技人国と同等）。日本で現地採用へ切替なら技人国変更が必要。家族は「家族滞在」で帯同可能。"
official_anchor: "別表第1の2「企業内転勤」"
conditions:
  - "外国本社で1年以上の勤務実績"
  - "同一企業・グループ内"
risk:
  - "1年未満で申請＝不許可"
should_not_say:
  - "他社からの中途採用でもOK"
material_bridge:
  - "転勤元の雇用証明書・在職証明書"
  - "日本配属先の証明・業務内容説明書"
  - "会社資本関係証明（グループ会社時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00035.html"
```

---

## practical-183

```yaml
card_id: practical-183
bucket: ANSWER_RUNTIME
title: 自己破産と在留資格への影響
user_situation: "債務超過で自己破産を検討する外国人"
short_answer: "自己破産は直接的な在留資格取消事由ではない。経営管理は事業実態喪失で影響可能性。"
practical_rule: "自己破産は直接的な在留資格取消事由ではない。但し「経営管理」保持者は会社倒産・事業実態喪失で更新困難の可能性。帰化申請中なら独立生計要件に影響可能性。破産手続は弁護士、在留影響は行政書士相談。"
official_anchor: "破産法／入管法21条・22条"
conditions:
  - "債務超過状態"
risk:
  - "経営管理保持での事業実態喪失"
  - "帰化申請中の独立生計要件失敗"
should_not_say:
  - "破産すれば即在留資格喪失"
material_bridge:
  - "破産申立書・免責決定書"
  - "在留資格変更・更新の関連書類"
source_urls:
  - "https://www.courts.go.jp/"
```

---

## practical-184

```yaml
card_id: practical-184
bucket: ANSWER_RUNTIME
title: 「特定活動」告示外（非告示）：人道的配慮等
user_situation: "通常の在留資格に該当せず特殊事情がある方"
short_answer: "告示外特定活動は人道的配慮・重病治療・婚約中等の特殊事情で個別許可。"
practical_rule: "「特定活動（非告示・個別許可）」は告示で類型化された活動以外の特殊事情（人道的配慮・重病治療継続・婚約中等）で使われる。就労可否・在留期間は個別許可内容で異なる。詳細申立書・事情証明書類が必要、行政書士・弁護士相談を強く推奨。"
official_anchor: "別表第1の5「特定活動」"
conditions:
  - "通常資格に該当しない特殊事情"
risk:
  - "申立て根拠不足で不許可"
should_not_say:
  - "特殊事情があれば誰でも特定活動が取れる"
material_bridge:
  - "特殊事情の詳細な申立書"
  - "事情証明書類（診断書・婚約証明・本国情勢報告等）"
  - "在留資格変更申請書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00043.html"
```

---

## practical-185

```yaml
card_id: practical-185
bucket: ANSWER_RUNTIME
title: 専門学校卒業：日本・外国の専門学校の扱い
user_situation: "日本または外国の専門学校卒で技人国を狙う方"
short_answer: "日本の専門学校（2年制以上）は学歴要件OK。外国の職業訓練校は原則対象外。"
practical_rule: "日本の専門学校（専修学校専門課程・2年制以上）卒業は技人国の学歴要件として認められる。専攻と業務の関連性証明が必要。外国の職業訓練校は原則学歴要件不算入、10年以上の実務経験での代替を検討。"
official_anchor: "上陸基準省令（技人国）"
conditions:
  - "日本の専門学校卒"
  - "業務関連性立証可"
risk:
  - "外国職業訓練校で日本専門学校と同等扱いを期待"
should_not_say:
  - "どの専門学校でも技人国OK"
material_bridge:
  - "専門学校の卒業証明書・成績証明書"
  - "業務内容説明書（専攻と業務の関連性）"
  - "実務経験代替時は在職証明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-186

```yaml
card_id: practical-186
bucket: ANSWER_RUNTIME
title: 外国人の生命保険・養老保険加入
user_situation: "保険加入を検討する外国人"
short_answer: "法的禁止なし。各社引受基準で在留期間・資格次第。永住・長期在留は通りやすい。"
practical_rule: "外国人の生命保険・養老保険加入を禁止する法律はない。各社の引受基準で在留期間が短い場合や特定資格では加入を断られることあり。永住者・長期在留の技人国等は多くの保険に加入可。外国人対応に積極的な会社の選定を。"
official_anchor: "—（各社規定）"
conditions:
  - "保険加入希望"
risk:
  - "在留期間短く加入拒否"
should_not_say:
  - "外国人は保険加入できない"
material_bridge:
  - "在留カード（資格・期間確認）"
  - "各社の申込書類"
source_urls:
  - "—（各保険会社）"
```

---

## practical-187

```yaml
card_id: practical-187
bucket: ANSWER_RUNTIME
title: 在留資格「更新」と「変更」の違い
user_situation: "申請区分の選択に迷う方"
short_answer: "同種資格の期間延長＝更新。資格種類の変更＝変更。転職で資格が同じなら原則更新。"
practical_rule: "在留期間更新は同じ資格で期間延長、在留資格変更は資格種類変更（技人国→経営管理等）。転職でも同種資格（技人国→技人国）なら原則更新で対応。在留目的・活動内容の根本変更時は変更申請が必要。"
official_anchor: "入管法20条・21条"
conditions:
  - "申請区分が不明確"
risk:
  - "誤区分で書類差戻し"
should_not_say:
  - "更新と変更は同じ手続"
material_bridge:
  - "在留期間更新許可申請書（更新時）"
  - "在留資格変更許可申請書（変更時）"
  - "就労資格証明書（事前確認時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
```

---

## practical-188

```yaml
card_id: practical-188
bucket: ANSWER_RUNTIME
title: クレジットカード・消費者ローン審査
user_situation: "クレジットカード・ローンを申し込みたい外国人"
short_answer: "法的禁止なし。在留期間・資格・収入・信用実績で各社審査。流通系から信用構築を。"
practical_rule: "外国人のクレジットカード・ローンを禁止する法律はない。各社の審査基準で在留期間・在留資格・収入・信用実績を評価。永住者・長期在留者は通りやすく、短期在留は厳しい。流通系カードから信用実績を作り段階的にグレードアップが有効。"
official_anchor: "—（割賦販売法・各社規定）"
conditions:
  - "在留資格・在留期間あり"
risk:
  - "在留期間短く審査落ち"
should_not_say:
  - "外国人はクレジットカード作れない"
material_bridge:
  - "在留カード"
  - "源泉徴収票・給与明細"
  - "銀行口座情報"
source_urls:
  - "—（各カード会社）"
```

---

## practical-189

```yaml
card_id: practical-189
bucket: ANSWER_RUNTIME
title: 在留資格の「指定書」の役割と確認
user_situation: "「特定活動」「高度専門職」保持で指定書の意味を確認したい方"
short_answer: "指定書記載の活動のみ可。指定書外活動は資格外活動。転職は指定書変更が必要。"
practical_rule: "指定書は高度専門職・特定活動等で交付され、許可された活動の具体内容・機関・条件を記載。指定書記載と異なる活動＝資格外活動で取消リスク。転職・活動変更時は指定書の変更手続（在留資格変更申請等）が必要。"
official_anchor: "別表第1／施行規則"
conditions:
  - "指定書付き在留資格保持"
risk:
  - "指定書外活動で資格外活動"
should_not_say:
  - "在留資格があれば指定書は気にしなくていい"
material_bridge:
  - "指定書（交付時の書類を保管）"
  - "在留資格変更許可申請書（指定書変更時）"
  - "指定書再交付申請書（紛失時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00043.html"
```

---

## practical-190

```yaml
card_id: practical-190
bucket: ANSWER_RUNTIME
title: 帰化申請の犯罪歴：軽微違反・執行猶予・本国前科
user_situation: "犯罪歴・交通違反がある方で帰化申請を検討する方"
short_answer: "軽微違反は影響少。執行猶予中は不可。本国前科も審査対象。虚偽申告は帰化取消リスク。"
practical_rule: "帰化「素行善良要件」で犯罪歴・前科を審査。執行猶予中は帰化不可、満了後数年の待機が実務目安。軽微交通違反（反則金のみ）は一般的に大きく影響しないが飲酒・無免許は問題。本国前科も審査対象。虚偽申告は帰化取消リスク。"
official_anchor: "国籍法5条（素行善良要件）"
conditions:
  - "帰化申請段階"
  - "犯罪歴・違反歴がある"
risk:
  - "虚偽申告発覚で帰化取消"
should_not_say:
  - "軽微違反は申告しなくていい"
material_bridge:
  - "本国の犯罪経歴証明書（警察証明書・アポスティーユ）"
  - "帰化申請書（正確な犯罪歴記載）"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji78.html"
```

---

## practical-191

```yaml
card_id: practical-191
bucket: ANSWER_RUNTIME
title: 取次 vs 代理：行政書士・弁護士・人事担当者
user_situation: "在留申請を誰に依頼するか検討する方"
short_answer: "取次は書類提出代行（行書・弁護士・認定取次者）。代理は法律行為で弁護士。"
practical_rule: "「取次」は申請書類の提出を代わりに行う制度、申請人出頭が不要になる場合あり。取次可能は届出行政書士・弁護士・地方入管局認定取次者（会社人事担当者等）。「代理」は法律行為の代行で弁護士が行う。通常申請は行政書士、不服申立て・訴訟は弁護士。"
official_anchor: "入管法施行規則"
conditions:
  - "申請の代行を依頼する段階"
risk:
  - "無資格者の代行依頼＝違法"
should_not_say:
  - "取次と代理は同じ"
material_bridge:
  - "取次者の委任状"
  - "申請取次行政書士の証明書"
source_urls:
  - "https://www.gyosei.or.jp/"
```

---

## practical-192

```yaml
card_id: practical-192
bucket: ANSWER_RUNTIME
title: 外国人の日本での失業：雇用保険から在留資格まで
user_situation: "技人国等の就労資格で失業した方"
short_answer: "雇用保険は在留資格不問。3か月超就労なしは取消リスク。14日以内届出＋活動記録。"
practical_rule: "外国人失業時、雇用保険は在留資格不問で受給可（加入条件充足時）。技人国等就労系は3か月超の就労なしで取消リスク。離職後14日以内に出入国在留管理庁届出。3か月以内に積極的就職活動、行政書士相談を強く推奨。"
official_anchor: "雇用保険法／入管法22条の4"
conditions:
  - "就労系在留資格で失業"
risk:
  - "活動記録未維持で取消"
should_not_say:
  - "失業給付があれば在留は安泰"
material_bridge:
  - "離職票"
  - "雇用保険被保険者証"
  - "所属機関変更届（出入国在留管理庁）"
  - "就職活動記録（応募・面接記録）"
source_urls:
  - "https://www.hellowork.mhlw.go.jp/"
```

---

## practical-193

```yaml
card_id: practical-193
bucket: ANSWER_RUNTIME
title: 自動車・不動産購入の制限と書類
user_situation: "日本で自動車・不動産を買おうとする外国人"
short_answer: "法的禁止なし。住宅ローンは銀行基準。重要施設周辺の土地は2022年規制法で制限。"
practical_rule: "外国人の自動車・不動産取得を一般的に禁止する法律はない（資格不問）。住宅ローンは銀行独自基準で資格・期間を審査、永住者は通りやすい。重要施設周辺の土地取得は2022年以降の土地利用規制法による規制あり。"
official_anchor: "民法／土地利用規制法（2022）"
conditions:
  - "在留カード・在留資格あり"
risk:
  - "重要施設周辺土地で規制違反"
should_not_say:
  - "外国人は不動産・自動車を買えない"
material_bridge:
  - "在留カード・パスポート"
  - "印鑑証明書"
  - "住民票"
  - "収入証明書（ローン時）"
source_urls:
  - "https://www.cao.go.jp/tochi-kisei/"
```

---

## practical-194

```yaml
card_id: practical-194
bucket: MATERIALS_ONLY
title: 技人国申請の業務内容証明：在職証明・業務説明書
user_situation: "技人国申請で業務関連書類の書き方が分からない方"
short_answer: "業務内容を具体的に記載（単純労働の記載は避け、専門性を明確化）。"
practical_rule: "技人国申請では在職証明書（雇用主発行）と業務内容説明書が重要。業務内容は「何をするか」を具体的に記載（使用技術・専門スキル等）、単純労働・肉体労働の記載は避ける。学歴（専攻）と業務の関連性を明確に説明することが審査の鍵。"
materials_only_reason: "書類の書き方ガイド。実務判断ロジックは practical-035, practical-138 等へ"
material_bridge:
  - "在職証明書（雇用主作成・職印捺印）"
  - "業務内容説明書"
  - "雇用契約書"
  - "会社概要書・パンフレット"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/index.html"
```

---

## practical-195

```yaml
card_id: practical-195
bucket: ANSWER_RUNTIME
title: 高度専門職の研究実績ポイント
user_situation: "高度専門職ポイント加算に研究実績を使いたい方"
short_answer: "査読論文3本以上で20点・特許で20点・外部資金3件で20点・国際受賞で25点等。"
practical_rule: "高度専門職の研究実績加点：査読付き論文3本以上（20点）・特許発明者（20点）・外部資金調達3件以上（20点）・国際的受賞（25点）等。論文は査読付き学術誌・会議論文集のコピーで証明、特許は登録証で立証。複数実績の組み合わせ可能。"
official_anchor: "高度専門職告示・ポイント計算表"
conditions:
  - "研究実績を有する"
risk:
  - "査読なし論文は加点対象外"
should_not_say:
  - "どんな論文でも加点される"
material_bridge:
  - "学術論文のコピー（査読確認資料含む）"
  - "特許登録証・特許公報"
  - "外部資金調達の採択通知書"
  - "受賞証明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00168.html"
```

---

## practical-196

```yaml
card_id: practical-196
bucket: ANSWER_RUNTIME
title: 国際離婚と子の問題：準拠法・ハーグ条約
user_situation: "日本で国際離婚を検討する／子の本国連れ去り問題"
short_answer: "離婚は協議・調停・裁判の3方式。準拠法問題あり。子の無断連れ去りはハーグ条約案件。"
practical_rule: "日本での国際離婚は協議離婚・調停離婚・裁判離婚の方式。外国人当事者は準拠法（どの国の法律適用）の問題あり。子の無断本国連れ去りはハーグ条約（日本2014年加盟）の問題。複雑な法的問題で弁護士相談必須。"
official_anchor: "通則法27条／ハーグ条約"
conditions:
  - "国際離婚を検討中"
  - "子がいる場合は特に重要"
risk:
  - "子の無断連れ去りは国際的な刑事問題化"
should_not_say:
  - "国際離婚も普通の離婚と同じ"
material_bridge:
  - "離婚届（市区町村）"
  - "本国への離婚届出（本国大使館）"
  - "ハーグ条約案件は弁護士・外務省相談"
source_urls:
  - "https://www.mofa.go.jp/mofaj/fp/hr_ha/page22_000843.html"
```

---

## practical-197

```yaml
card_id: practical-197
bucket: ANSWER_RUNTIME
title: 外国人の選挙権・参政権
user_situation: "永住者で選挙参加可否を確認したい方"
short_answer: "国政・地方選挙の選挙権・被選挙権なし。住民投票は自治体条例次第。"
practical_rule: "現行制度では外国人（永住者含む）は国政・地方選挙の選挙権・被選挙権なし。住民投票は自治体条例で外国人参加を認める場合あり（自治体確認必要）。帰化すれば日本国民として選挙権・被選挙権取得。"
official_anchor: "公職選挙法・憲法15条"
conditions:
  - "外国籍保持"
risk:
  - "選挙関与で違反"
should_not_say:
  - "永住者は選挙権がある"
material_bridge:
  - "帰化申請書類（選挙権取得目的で帰化検討時）"
  - "居住自治体の住民投票条例の確認"
source_urls:
  - "https://www.soumu.go.jp/senkyo/"
```

---

## practical-198

```yaml
card_id: practical-198
bucket: ANSWER_RUNTIME
title: 在留カードの「就労不可」と「就労制限なし」
user_situation: "在留カードの就労区分を確認したい方"
short_answer: "「就労制限なし」は永住・定住等。「就労不可」でも資格外活動許可で週28時間可。技人国は専門業務のみ。"
practical_rule: "在留カード表面の「就労制限の有無」欄で就労可否を確認。「就労不可」（留学・家族滞在等）でもカード裏面に「資格外活動許可（週28時間以内）」があればアルバイト可。「就労制限なし」（永住・定住等）はどんな職種でも可。「在留資格に基づく就労活動のみ可」（技人国等）は専門業務限定。"
official_anchor: "入管法19条／在留カード制度"
conditions:
  - "在留カード保持"
risk:
  - "区分を誤認して資格外活動"
should_not_say:
  - "「就労不可」は完全に働けない"
material_bridge:
  - "在留カード（表面・裏面）"
  - "指定書（高度専門職・特定活動の場合）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
```

---

## practical-199

```yaml
card_id: practical-199
bucket: ANSWER_RUNTIME
title: 外国人DV被害者：在留資格を守りながら支援を受ける
user_situation: "日本人配偶者からDV被害を受けている外国人"
short_answer: "DVによる別居は資格取消理由にならない。まず安全に避難→相談支援センター・警察。"
practical_rule: "外国人DV被害者はビザを失う心配せずまず安全に避難が最優先。DV被害による別居・逃避は在留資格取消理由にならない（法務省配慮）。配偶者暴力相談支援センター・警察・女性相談センターに相談。支援機関からの情報が入管に通知されることはない（守秘義務）。"
official_anchor: "DV防止法／入管法22条の2（運用配慮）"
conditions:
  - "DV被害を受けている"
risk:
  - "我慢して逃げず深刻化"
should_not_say:
  - "DVから逃げたら在留資格を失う"
material_bridge:
  - "DV被害の証拠（診断書・写真・メッセージ）"
  - "配偶者暴力相談支援センターの相談記録"
  - "在留資格変更申請書（定住者等への変更時）"
source_urls:
  - "https://www.gender.go.jp/policy/no_violence/e-vaw/"
```

---

## practical-200

```yaml
card_id: practical-200
bucket: ANSWER_RUNTIME
title: 永住申請の「安定した生活」要件：資産・技能
user_situation: "永住申請の独立生計要件を確認したい方"
short_answer: "実務目安は単身年収300万円以上。世帯収入で判断・配偶者収入合算可。資産は補完的評価。"
practical_rule: "永住の独立生計要件は法令明示なしだが実務目安は単身年収300万円以上（世帯構成で増加）。配偶者収入合算で世帯収入判断。相当の貯蓄・資産は補完評価、継続的な収入安定性が主基準。源泉徴収票・課税証明・銀行残高証明を準備。"
official_anchor: "入管法22条／永住ガイドライン"
conditions:
  - "永住申請段階"
risk:
  - "年収不安定で要件未充足"
should_not_say:
  - "貯蓄さえあれば永住OK"
material_bridge:
  - "源泉徴収票（直近1〜3年）"
  - "課税・納税証明書"
  - "預貯金残高証明書"
  - "配偶者収入証明書（合算時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## 注記

- Batch 04 は practical-151〜200。ANSWER_RUNTIME=49、MATERIALS_ONLY=1（practical-194）。
- 母カード全文は `docs/practical-fact-layer/cards/practical-XXX.md` 参照。
