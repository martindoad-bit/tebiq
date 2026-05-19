> # ⚠ INVALIDATED 2026-05-19 — 不可 ingest 到 answer 系统
>
> **本文件的 yaml runtime block 不可被 Codex 主工程读取或注入 answer 系统。**
> 未做事实核查、未对照 DOMAIN/guardrail。
> 已知严重错误：practical-005/031 把「資本金 500 万円」当作经管现行核心事实，
> 与 2025-10-16 经管改革后的真相（3000 万円基准）冲突。
> 详见 `docs/knowledge-governance/PRACTICAL_GOVERNANCE_AUDIT_LOG.md`。

---

# Practical Batch 01 — Runtime Blocks (practical-001〜practical-050) [INVALIDATED]

> 既存実務カードから抽出した短版 runtime block 集。答案ランタイムへ直接注入する場合の source-of-truth。
> 1 張 = 1 yaml block。short_answer ≤ 80 字、practical_rule ≤ 200 字、全体 ≤ 500 字。
> 生成日: 2026-05-19 / Batch 01 / 母カード参照は `docs/practical-fact-layer/cards/practical-XXX.md`。

---

## practical-001

```yaml
card_id: practical-001
bucket: ANSWER_RUNTIME
title: 配偶者等：離婚後14日届出義務と取消リスク
user_situation: "「日本人の配偶者等」ビザ保持者が日本人と離婚した／予定"
short_answer: "離婚成立から14日以内に入管へ届出義務（入管法19条の16）。届出怠ると次回更新で不利情報。"
practical_rule: "離婚後14日以内に「配偶者に関する届出」を提出。在留資格そのものは即失効しないが、正当理由なく6か月以上婚姻関係に基づく活動を行わないと取消可（22条の2）。引き続き在留したい場合は早期に在留資格変更（定住者・就労系・永住）を検討。DV・調停中・子の扶養は「正当理由」として保護される可能性あり。"
official_anchor: "入管法19条の16（届出義務）／22条の2（取消）"
conditions:
  - "在留資格「日本人の配偶者等」保持者"
  - "離婚届受理日が起点"
risk:
  - "届出未了で次回更新審査時に不利情報として記録される"
  - "6か月の起算は離婚届提出日ではなく「活動を行わなくなった日」"
should_not_say:
  - "離婚したら即時に在留資格が取り消される"
  - "正当理由があれば届出は不要"
material_bridge:
  - "配偶者に関する届出書"
  - "離婚届受理証明書"
  - "DV保護命令申請書控え（該当時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
domain_queue: pdom-001
```

---

## practical-002

```yaml
card_id: practical-002
bucket: ANSWER_RUNTIME
title: 配偶者等：離婚後の在留継続と定住者・就労系への変更
user_situation: "日本人と離婚済み・離婚予定で在留継続を希望する外国人"
short_answer: "「日本人の配偶者等」の根拠は離婚で失われる。在留期限内に定住者・就労系への変更申請が必要。"
practical_rule: "離婚後の主な変更先は①定住者（離婚後・在留歴と生計能力で裁量審査）、②定住者（日本人実子養育・親権必須）、③技人国（就労先確保）、④永住（10年要件充足）。実子の親権がある場合は告示定住者で許可率高い。離婚から早期申請が安全。期限直前は審査中に特例期間頼みになる。"
official_anchor: "入管法22条（変更）／22条の2（取消）／告示定住者要件"
conditions:
  - "離婚届受理済または成立予定"
  - "現在の在留期間が有効"
risk:
  - "在留期限ギリギリの申請で特例期間切れリスク"
  - "親権なし＝告示定住者の対象外、別ルート要"
should_not_say:
  - "子どもがいれば自動的に定住者になれる"
  - "10年いれば永住に変えられる"
material_bridge:
  - "在留資格変更許可申請書"
  - "離婚届受理証明書"
  - "理由書（離婚経緯・日本に残る理由）"
  - "在職証明・課税証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00045.html"
domain_queue: pdom-002
```

---

## practical-003

```yaml
card_id: practical-003
bucket: ANSWER_RUNTIME
title: 配偶者等：配偶者死亡後の在留資格と次ステップ
user_situation: "日本人配偶者が死亡・死別した外国人（配偶者等ビザ保持）"
short_answer: "死亡から14日以内に入管へ届出。在留期限まで有効だが6か月以内に変更準備が必要。"
practical_rule: "「配偶者に関する届出」を死亡後14日以内に提出。死別の場合は本人帰責性なしで定住者許可率が比較的高い。在日歴・就労歴・遺産・配偶者家族との関係も生活基盤として考慮される。日本人実子の養育中なら告示定住者ルート。早期に行政書士相談を推奨。"
official_anchor: "入管法19条の16・22条の2・22条"
conditions:
  - "「日本人の配偶者等」在留資格保持"
  - "死亡診断書または戸籍謄本（死亡記載）取得可"
risk:
  - "在留期限満了までに変更未申請のまま放置→次回更新不許可"
  - "再婚予定があると審査でマイナス材料化することも"
should_not_say:
  - "配偶者が死んだら即帰国しなければならない"
should_not_say:
  - "死別だから自動で定住者がもらえる"
material_bridge:
  - "配偶者に関する届出書"
  - "死亡診断書または戸籍謄本"
  - "在留資格変更申請書（定住者）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-004

```yaml
card_id: practical-004
bucket: ANSWER_RUNTIME
title: 配偶者等：再婚後の在留資格維持と新配偶者への切替
user_situation: "離婚後に別の日本人と再婚した／再婚予定の外国人"
short_answer: "離婚・再婚それぞれ14日以内届出。在留資格名は同じだが、更新時に新配偶者との実態審査。"
practical_rule: "離婚届14日以内届出 → 再婚届14日以内届出 → 在留期限前に更新申請。在留資格名「日本人の配偶者等」は変わらないが、審査実質は新配偶者との実態審査になる。離婚から短期間（3か月以内など）の再婚は偽装婚疑義で交際経緯・写真・LINE等の追加証明を求められる傾向。"
official_anchor: "入管法19条の16・21条／別表第2"
conditions:
  - "現在「日本人の配偶者等」保持"
  - "新配偶者が日本人（外国人なら別ルート）"
risk:
  - "短期間再婚は偽装婚疑義リスク"
  - "新配偶者が外国人＝在留資格変更必要（永住者の配偶者等／他）"
should_not_say:
  - "再婚しても在留資格は自動更新される"
material_bridge:
  - "新配偶者の戸籍謄本（婚姻記載）・住民票"
  - "新配偶者の在職・収入証明"
  - "婚姻関係実態確認書類（写真・SNS）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-005

```yaml
card_id: practical-005
bucket: ANSWER_RUNTIME
title: 経営管理：事務所要件（バーチャルオフィス問題）
user_situation: "日本で会社を作って経営管理ビザを取りたい起業家"
short_answer: "バーチャルオフィスは原則不可。実際に業務を行う事務所＋資本金500万円が必要。"
practical_rule: "経営管理は「日本国内に所定の場所を設けて事業を営む」が要件。バーチャルオフィス（住所貸しのみ）はISA審査で実態なしと判断され不許可。レンタルオフィスは固定席＋契約書＋内部写真があれば可。コワーキングは固定席なしだとグレー。資本金500万円以上または同等の売上見込みが目安。"
official_anchor: "上陸許可基準省令（H21法務省令34号）・施行規則別表第2"
conditions:
  - "経営管理の新規申請または変更申請"
  - "法人設立済または設立中"
risk:
  - "バーチャルオフィス契約のまま申請→不許可ほぼ確実"
  - "ドロップイン型コワーキング＝審査官裁量で不許可リスク"
should_not_say:
  - "登記住所さえあれば経営管理ビザは取れる"
  - "資本金300万でも経営管理は問題ない"
material_bridge:
  - "事務所の賃貸契約書"
  - "事務所内部・外観写真"
  - "登記事項証明書・資本金証明（通帳）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
domain_queue: pdom-003
```

---

## practical-006

```yaml
card_id: practical-006
bucket: ANSWER_RUNTIME
title: 経営管理：赤字継続・休眠会社の更新審査
user_situation: "売上低迷・赤字・休眠状態の経営者で更新時期が来た方"
short_answer: "赤字でも即不許可ではないが、事業継続意思と見通しの書面証明が必須。"
practical_rule: "ISA が見るのは①事業実態（取引・契約・商談記録）②経営活動実態③赤字の合理的説明④事業見通し（LOI・見積書・契約書）⑤生計確保。連続赤字は通常3年→1年更新に短縮。休眠（売上ゼロ・取引ゼロ）は不許可リスク大。月25万円役員報酬は実務上の目安だが公式基準ではない。"
official_anchor: "施行規則別表第2／入管法22条の2"
conditions:
  - "経営管理保持・更新申請段階"
  - "決算書で赤字または売上低迷が確認できる"
risk:
  - "休眠1年以上は不許可リスク著しく高い"
  - "理由書が抽象的（「がんばる」のみ）だと不許可"
should_not_say:
  - "赤字でも経営管理は更新できる"
  - "売上ゼロでも問題ない"
material_bridge:
  - "法人税申告書（直近2〜3期）"
  - "理由書＋事業計画書"
  - "LOI・見積書・商談記録"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
domain_queue: pdom-004
```

---

## practical-007

```yaml
card_id: practical-007
bucket: ANSWER_RUNTIME
title: 技人国：転職時の14日届出義務と就労継続可否
user_situation: "技人国保持者で転職した／予定（同一在留資格内）"
short_answer: "前職退職・新職就職それぞれ14日以内に届出。在留資格は失効せず即就労可。"
practical_rule: "技人国は会社に紐付かないため転職自体で在留資格は失効しない。但し業務内容が技人国の範囲内（事務系専門職）であることが前提。経営者・現場作業者・教師等は範囲外で変更申請必要。無職6か月以上は取消対象。届出はオンラインまたは窓口で簡単。"
official_anchor: "入管法19条の16（届出義務）・22条の2（取消）"
conditions:
  - "現在の在留期間有効"
  - "転職先業務が技人国範囲内"
risk:
  - "業務範囲外への転職をそのまま続けると不法就労扱い"
  - "無職6か月超は取消リスク"
should_not_say:
  - "転職したら在留資格が自動的に切れる"
material_bridge:
  - "所属機関変更届"
  - "前職離職票／退職証明"
  - "新職雇用契約書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-008

```yaml
card_id: practical-008
bucket: ANSWER_RUNTIME
title: 技人国：転職後の「変更 vs 更新」選択基準
user_situation: "技人国保持者で転職、次の在留期限時に何を申請すべきか"
short_answer: "業務が技人国範囲内なら更新申請、範囲外なら変更申請が必要。"
practical_rule: "転職先業務が現在の在留資格範囲内＝更新申請（変更不要）。但し更新時に新会社情報・業務内容説明書を必ず添付。技人国→経営者／教師／現場作業者は範囲外で変更必須。判断微妙なケースは就労資格証明書を事前取得すると次回更新で安全。"
official_anchor: "入管法21条（更新）・20条（変更）"
conditions:
  - "転職済"
  - "次回在留期限まで時間がある"
risk:
  - "範囲外業務に従事＝不法就労（次回更新不許可）"
  - "業務内容説明書の不備で更新が1年短縮になることが多い"
should_not_say:
  - "技人国なら何でも仕事できる"
material_bridge:
  - "転職先雇用契約書"
  - "転職先登記事項証明書・財務書類"
  - "業務内容説明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-009

```yaml
card_id: practical-009
bucket: ANSWER_RUNTIME
title: 技人国：副業・兼業の可否と資格外活動許可
user_situation: "技人国保持者で副業・フリーランス・YouTube収益化等を考える方"
short_answer: "副業には資格外活動許可が必要。許可後も週28時間以内が上限。"
practical_rule: "技人国の本来活動以外の収益活動は資格外活動許可なしだと不法就労。許可取得後は週28時間上限。業務委託・クラウドソーシング・YouTube／ブログ収益化も「就労」として扱われ得る。本業の就業規則の副業規定も別途確認。許可申請は更新申請と同時または別途行う。"
official_anchor: "入管法19条（資格外活動）"
conditions:
  - "技人国の本業を継続中"
  - "副業の内容が明確"
risk:
  - "資格外活動無許可の副業＝不法就労・次回更新影響"
  - "週28時間超は同様に違反"
should_not_say:
  - "技人国なら副業は自由"
  - "業務委託・フリーランスは就労ではない"
material_bridge:
  - "資格外活動許可申請書"
  - "副業先の雇用契約書／業務委託契約書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00027.html"
```

---

## practical-010

```yaml
card_id: practical-010
bucket: ANSWER_RUNTIME
title: 永住：公的義務（住民税・社会保険・年金）の完納要件
user_situation: "永住申請を検討中で過去に滞納・未納がある方"
short_answer: "住民税・国民年金・健康保険の完納が実質要件（2024年改正で明文化）。"
practical_rule: "永住申請前に全期間の住民税・社会保険・年金を完納すること。年金未納は最大2年遡及納付可能、5年以上前の未納は救済不可。住民税は直近5年分の課税・納税証明が必要。会社が社会保険未加入なら年金事務所での遡及加入手続きを検討。期限切れだけでなく「払い忘れ」も審査でアウト。"
official_anchor: "入管法22条／2024年改正（永住要件明文化）"
conditions:
  - "通算10年以上の在留歴がある"
  - "うち就労系または居住系5年以上"
risk:
  - "申請前1年に滞納があると不許可ほぼ確実"
  - "国民年金免除申請も「未納」扱いになる場合あり"
should_not_say:
  - "後から払えば永住申請に問題ない"
material_bridge:
  - "住民税課税証明書・納税証明書（直近5年）"
  - "ねんきん定期便／年金記録照会結果"
  - "健康保険証・社会保険料領収書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
domain_queue: pdom-005
```

---

## practical-011

```yaml
card_id: practical-011
bucket: ANSWER_RUNTIME
title: 永住：申請後の在留カード有効期限と特例期間
user_situation: "永住申請を提出済または直前で在留期限が迫っている方"
short_answer: "在留期限前に申請すれば特例期間で在留・就労継続可（20条5項）。"
practical_rule: "永住申請の審査は4か月〜1年超かかる。在留期限前に申請＝特例期間が適用され、期限切れでも現在の在留資格のまま在留・就労を継続できる。受領証は就職先・銀行への申請中証明として使える。但し在留カード自体の有効期限管理は別途必要で、切れる場合は別途更新申請も必要。"
official_anchor: "入管法20条5項（特例期間）"
conditions:
  - "永住申請を在留期限前に提出済"
risk:
  - "在留期限経過後の提出は特例期間なし＝オーバーステイ"
  - "在留カード期限切れに気づかず特例期間中に出国＝再入国不可"
should_not_say:
  - "永住申請中は在留期限を気にしなくてよい"
material_bridge:
  - "永住申請受領証"
  - "在留期間更新許可申請書（カード期限切れ時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-012

```yaml
card_id: practical-012
bucket: ANSWER_RUNTIME
title: 留学：卒業後の「就職活動」特定活動への切替
user_situation: "日本の大学／専門学校を卒業したが就職先未定の元留学生"
short_answer: "卒業直後に特定活動（就職活動）へ変更。最初6か月＋更新1回で最長1年。"
practical_rule: "卒業＝留学資格の活動消失。次の在留期間更新は認められない。卒業直後に「特定活動（就職活動）」へ変更申請（最長1年）。内定後は技人国等への変更申請が必要、許可前に就労開始不可。専門学校卒は46号特定活動の対象外（大学・大学院・短大卒のみ）。"
official_anchor: "告示7号・34号（就職活動）"
conditions:
  - "日本の大学・専門学校等を卒業見込／卒業済"
  - "留学の在留期間が残っている／満了直前"
risk:
  - "留学期間内に変更申請しないと更新不可で帰国必要"
  - "内定後に技人国の許可前に就労開始＝不法就労"
should_not_say:
  - "卒業しても在留期限まではアルバイト無制限で続けられる"
material_bridge:
  - "在留資格変更許可申請書（特定活動）"
  - "卒業証明書"
  - "就職活動状況の説明書（応募リスト等）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00043.html"
```

---

## practical-013

```yaml
card_id: practical-013
bucket: ANSWER_RUNTIME
title: 留学：アルバイト週28時間超過の影響と更新リスク
user_situation: "留学生でアルバイト時間が週28時間を超えそう／既に超過した方"
short_answer: "資格外活動許可は週28時間上限（複数掛け持ち合計）。超過は不法就労扱い。"
practical_rule: "留学の資格外活動許可は週28時間以内。長期休暇中は1日8時間以内（事実上週56時間）に緩和されるが通常時は厳格。掛け持ちは合算。超過は不法就労として次回更新拒否・取消リスク。給与明細・タイムシートで時間管理を。すでに超過は次回更新で影響可能性大で行政書士相談を。"
official_anchor: "入管法19条（資格外活動）／施行規則19条"
conditions:
  - "留学の資格外活動許可保持"
  - "アルバイト中"
risk:
  - "週28時間超過は不許可・取消リスク"
  - "雇用主側にも罰則（不法就労助長罪）"
should_not_say:
  - "夏休み中なら週28時間を超えてOK"
material_bridge:
  - "資格外活動許可（在留カード裏面）"
  - "雇用契約書・給与明細・タイムシート"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00027.html"
```

---

## practical-014

```yaml
card_id: practical-014
bucket: ANSWER_RUNTIME
title: 家族滞在：資格外活動許可（週28時間）と就労制限
user_situation: "家族滞在の在留資格でアルバイトしたい／フルタイム就職したい方"
short_answer: "アルバイトは資格外活動許可で週28時間まで。フルタイムは就労資格への変更が必要。"
practical_rule: "家族滞在の資格外活動は週28時間上限・長期休暇緩和なし。フルタイム正社員には技人国等への変更申請が必須で、許可前の就労開始は不可。学歴・職歴が技人国の要件を満たすかが鍵。週28時間超過は更新拒否リスク。"
official_anchor: "入管法19条（資格外活動）"
conditions:
  - "家族滞在保持・本体者が在留中"
risk:
  - "本体者の在留資格喪失で家族滞在も連動失効リスク"
  - "週28時間超過＝不法就労"
should_not_say:
  - "家族滞在でも正社員になれる"
material_bridge:
  - "資格外活動許可申請書"
  - "在留資格変更許可申請書（フルタイム就職時）"
  - "雇用契約書／学歴証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00027.html"
```

---

## practical-015

```yaml
card_id: practical-015
bucket: ANSWER_RUNTIME
title: 家族滞在：本体者の喪失・離日・変更時の対応
user_situation: "本体者が帰国・在留資格喪失で家族滞在の継続を心配する方"
short_answer: "本体者が在留資格を失うと家族滞在は次回更新不可。期限内に独立資格へ変更を。"
practical_rule: "家族滞在は本体者の在留に従属。本体者帰国・資格喪失で家族滞在の更新は認められない（在留期限まではそのまま在留可）。独立した就労系・定住者等への変更申請が必要。就学中の子の進路や本人就職先確保が変更ルートの鍵。"
official_anchor: "入管法21条／別表第2"
conditions:
  - "現在家族滞在保持"
  - "本体者の在留状況に変化"
risk:
  - "本体者離日後に放置すると更新拒否→出国"
  - "就職先未定での変更申請は不許可リスク"
should_not_say:
  - "本体者が帰国しても家族滞在で残り続けられる"
material_bridge:
  - "在留資格変更許可申請書"
  - "独立資格に応じた書類（就労契約／在学証明）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00050.html"
```

---

## practical-016

```yaml
card_id: practical-016
bucket: ANSWER_RUNTIME
title: 不許可・特例期間：在留更新不許可後の就労継続と再申請
user_situation: "在留期間更新／変更が不許可になり対応方針を悩んでいる方"
short_answer: "不許可通知受領から最大2か月／在留期限のいずれか遅い方まで在留可。即専門家相談を。"
practical_rule: "不許可後は①口頭審理請求（3日以内）で理由確認、②不許可理由を解消して再申請、③別在留資格への変更、④出国、のいずれか。時間的余裕がほとんどないため即日相談が必要。特例期間中の就労継続の法的根拠はグレー、リスク有。"
official_anchor: "入管法21条／20条5項（特例期間）"
conditions:
  - "在留更新・変更が不許可"
  - "不許可通知書を受領済"
risk:
  - "対応せず放置するとオーバーステイ→退去強制"
  - "口頭審理の3日期限を逃すと理由開示請求できない"
should_not_say:
  - "不許可でも自然に救済される"
material_bridge:
  - "不許可通知書"
  - "口頭審理請求書（3日以内）"
  - "弁護士・行政書士への即相談"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00044.html"
domain_queue: pdom-006
```

---

## practical-017

```yaml
card_id: practical-017
bucket: ANSWER_RUNTIME
title: 住所届出：転居14日届出義務と在留カード記載住所
user_situation: "引越し（転居）した外国人で住所届出が未了の方"
short_answer: "引越し後14日以内に市区町村窓口で転入届。在留カードも同時更新。"
practical_rule: "市区町村の転入届で在留カード裏面の住所も更新（ISA別途届出は原則不要）。14日違反は20万円以下の過料＋在留管理上の不利情報。重要な入管書類が旧住所に届くと受領できず、更新通知・不許可通知見落としリスク。"
official_anchor: "住民基本台帳法・入管法19条の9"
conditions:
  - "引越し済または引越予定"
risk:
  - "届出を怠ると過料＋更新審査での減点"
  - "旧住所に通知が届き続け重要書類見落とし"
should_not_say:
  - "短期間の引越しなら届出不要"
material_bridge:
  - "在留カード"
  - "パスポート"
  - "転出証明書（市区町村間移動時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00014.html"
```

---

## practical-018

```yaml
card_id: practical-018
bucket: MATERIALS_ONLY
title: 材料層：技人国・経営管理の更新時標準添付書類チェックリスト
user_situation: "技人国・経営管理の更新申請で書類リストを確認したい方"
short_answer: "雇用先カテゴリ1〜4で必要書類が異なる。カテゴリ3＝中小はフルセットが要る。"
practical_rule: "ISA公式書類リストを基準に、カテゴリ別に追加書類を準備。中小（カテゴリ3）は雇用契約書・源泉徴収票・登記事項証明書・決算書・業務内容説明書が標準。転職直後・赤字等の個別事情で追加書類が要る。"
materials_only_reason: "本カードは材料リストの提示が主。実務判断ロジックは practical-008・practical-006 等へ"
material_bridge:
  - "ISA書類ダウンロードページ"
  - "在留期間更新許可申請書（様式）"
  - "雇用契約書・源泉徴収票・登記事項証明書・決算書・業務内容説明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/index.html"
```

---

## practical-019

```yaml
card_id: practical-019
bucket: ANSWER_RUNTIME
title: 高度専門職：ポイント計算の頻出誤解
user_situation: "高度専門職ポイント計算を自分で行って70点を目指す方"
short_answer: "学歴は最高学歴のみ・年収はボーナス込み総額。N1は加点。40歳以上の年齢点は0。"
practical_rule: "誤解の典型は①学歴の合算（不可・最高学歴のみ）②年収にボーナス含まない（含む）③年齢40歳以上で諦める（他で70点到達可能）④日本語能力を申告し忘れる（N1で加点）⑤2号への自動昇格を期待（別途変更申請必要）。"
official_anchor: "施行規則告示／ISAポイント計算表"
conditions:
  - "高度専門職1号の申請を検討中"
risk:
  - "自己計算のミスで申請後にポイント不足が判明"
  - "学歴・職歴の年数算定ミス"
should_not_say:
  - "学部＋修士で学歴ポイントを合算できる"
material_bridge:
  - "ISA公式ポイント計算表"
  - "学歴証明書・成績証明書"
  - "職歴証明書・業務内容説明書"
  - "年収証明・JLPT合格証"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00168.html"
```

---

## practical-020

```yaml
card_id: practical-020
bucket: ANSWER_RUNTIME
title: 特定技能1号：5年満了後の3択と落とし穴
user_situation: "特定技能1号で在留中・5年満了が近づいている方"
short_answer: "1号は通算5年が上限。①2号移行（試験合格必須）②別資格変更③帰国の3択。"
practical_rule: "1号→2号は自動昇格でなく分野別2号試験合格＋雇用主推薦が必要。技人国への変更は実質的に困難（現場業務との要件不一致）。永住要件を満たす長期者は別途検討可。1〜2年前から計画開始を推奨。家族帯同は2号で可能、1号は不可。"
official_anchor: "施行規則別表第2／特定技能告示"
conditions:
  - "特定技能1号で在留中"
  - "通算在留期間がカウント可能"
risk:
  - "試験対策不足で5年満了時に帰国一択になる"
  - "同分野以外への転職で在留資格変更必要"
should_not_say:
  - "5年経てば自動的に2号になれる"
material_bridge:
  - "特定技能2号評価試験（分野別実施機関）"
  - "雇用主推薦書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-021

```yaml
card_id: practical-021
bucket: ANSWER_RUNTIME
title: 永住：在留歴10年計算と「5年就労・居住要件」の落とし穴
user_situation: "永住申請を検討中で在留歴が10年に到達したか自信がない方"
short_answer: "通算10年＋うち就労系または居住系5年以上が必須。留学のみの10年は不可。"
practical_rule: "10年は連続在留が原則（短期出国は通算可、長期出国は分断リスク）。就労系（技人国・経営管理等）＋居住系（配偶者・定住者・永住者の配偶者等）の合計5年が要件。留学・家族滞在のみの10年では5年要件未充足。高度専門職1号は3年・80点保持者は1年に短縮特例あり。"
official_anchor: "入管法22条／ガイドライン"
conditions:
  - "在留歴10年に近い／到達"
  - "在留歴の内訳が確認可能"
risk:
  - "短期出国の累積が「連続在留」を分断扱いされる"
  - "5年就労要件の起算ミス"
should_not_say:
  - "10年いれば永住が取れる"
material_bridge:
  - "全パスポート・在留カード履歴"
  - "住民票除票（過去住所履歴）"
  - "出入国記録"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-022

```yaml
card_id: practical-022
bucket: ANSWER_RUNTIME
title: 再入国許可：みなし再入国（1年）と正規再入国の選択
user_situation: "海外出張・一時帰国を予定している在留資格保持者"
short_answer: "1年以内ならみなし再入国（自動）。1年超は出国前に正規再入国（最大5年）取得。"
practical_rule: "在留カード携帯＋出国カード「みなし再入国」欄チェックで1年以内は手続不要。1年超または期限不確実な場合は正規再入国を事前取得。永住者がみなし1年超で帰国＝永住失効リスク。期間内に戻れないと在留資格喪失なので余裕を持って正規許可を取る。"
official_anchor: "入管法26条／26条の2（みなし再入国）"
conditions:
  - "出国予定がある／検討中"
  - "在留カード保持"
risk:
  - "1年経過直前で災害・病気で戻れず資格失効"
  - "永住者の1年超出国で資格自動失効"
should_not_say:
  - "永住者なら何年でも海外にいて大丈夫"
material_bridge:
  - "再入国許可申請書"
  - "在留カード・パスポート"
  - "収入印紙（単回3,000円／数次6,000円）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-4.html"
```

---

## practical-023

```yaml
card_id: practical-023
bucket: ANSWER_RUNTIME
title: 帰化：永住との違いと帰化申請フロー
user_situation: "永住と帰化のどちらを選ぶべきか迷っている長期在留者"
short_answer: "永住＝外国籍のまま無期限在留。帰化＝日本国籍取得（原則原国籍喪失）。"
practical_rule: "帰化は法務局申請、審査1〜1.5年、申請費用無料（書類取得・翻訳費は別）。原国籍離脱の手続きは国によって異なる（中国は離脱許可必要等）。選挙権・公務員就任を要するなら帰化、文化的・心理的に外国籍維持を望むなら永住。"
official_anchor: "国籍法／永住=入管法22条"
conditions:
  - "永住・帰化の要件双方を検討段階"
risk:
  - "二重国籍が母国制度上認められないと帰化で原国籍失う"
  - "帰化後の戸籍編製・氏名表記で混乱"
should_not_say:
  - "永住と帰化はほぼ同じ"
material_bridge:
  - "帰化許可申請書・履歴書"
  - "本国戸籍・身分証明書（翻訳付き）"
  - "住民票・課税証明書・源泉徴収票"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji78.html"
```

---

## practical-024

```yaml
card_id: practical-024
bucket: ANSWER_RUNTIME
title: 技能実習→特定技能への移行：要件・手続き・落とし穴
user_situation: "技能実習2号良好修了予定で特定技能1号への移行を考える方"
short_answer: "実習2号良好修了＝技能・日本語試験免除。職種が特定技能分野と対応すること。"
practical_rule: "技能実習の職種と特定技能分野の対応表を確認。在留資格変更許可申請を在留期限前に提出。特定技能では同分野転職が原則自由（14日届出必要）で実習と大きく異なる。育成就労制度（2024〜）への移行スキームも別途確認。"
official_anchor: "施行規則別表第2／特定技能基準省令"
conditions:
  - "技能実習2号で在留中"
  - "良好修了の見込み"
risk:
  - "職種未対応で移行不可、別途試験合格が必要"
  - "在留期限切れで変更申請できなくなる"
should_not_say:
  - "実習を終えればどの分野の特定技能にも変えられる"
material_bridge:
  - "技能実習修了証明書"
  - "新雇用主との雇用契約書"
  - "特定技能所属機関の登録証明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-025

```yaml
card_id: practical-025
bucket: ANSWER_RUNTIME
title: 在留カード：紛失・盗難・破損時の再交付手続き
user_situation: "在留カードを紛失・盗難・破損した外国人"
short_answer: "14日以内にISA再交付申請。紛失盗難は事前に警察届出が必要。手数料無料。"
practical_rule: "①警察に遺失・盗難届→受理番号取得 ②14日以内にISA再交付申請（パスポート・写真持参）③再交付までは「申請中証明書」携帯で対応。き損（ひび・文字消失）も同様に申請可。常時携帯義務は維持される。"
official_anchor: "入管法19条の12（在留カード）"
conditions:
  - "在留カードを紛失・盗難・破損"
risk:
  - "14日違反で過料＋次回更新時不利情報"
  - "警察届出なしで再交付申請＝受理されない"
should_not_say:
  - "紛失したら帰国するしかない"
material_bridge:
  - "在留カード再交付申請書"
  - "警察の届出受理番号"
  - "写真（4×3cm）・パスポート"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-9.html"
```

---

## practical-026

```yaml
card_id: practical-026
bucket: ANSWER_RUNTIME
title: 「研究」と「技術・人文知識・国際業務」の違いと選択
user_situation: "研究職または企業R&Dへの就職／転職で資格選択に迷う方"
short_answer: "大学・研究機関の学術研究＝研究。民間R&D・エンジニアリング＝技人国。"
practical_rule: "勤務先の性質（学術機関 vs 民間）と業務内容（基礎研究 vs 製品開発）で判定。研究→技人国（または逆）の転職は変更申請。判断微妙なら就労資格証明書を取得して次回更新で安全化。"
official_anchor: "別表第1の2「研究」「技人国」"
conditions:
  - "現在の業務内容と転職先業務が明確"
risk:
  - "民間で「研究」資格のまま製品開発業務＝範囲外活動"
should_not_say:
  - "研究職なら全部「研究」資格"
material_bridge:
  - "雇用契約書（業務内容詳細）"
  - "在留資格変更申請書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00033.html"
```

---

## practical-027

```yaml
card_id: practical-027
bucket: ANSWER_RUNTIME
title: 在留期間の長さ（1年・3年・5年）を決める要因
user_situation: "毎回1年更新で長期化したい方／更新期間に疑問がある方"
short_answer: "期間はISAが個別に決定。申請者が指定不可。安定実態の積み重ねで段階的に伸びる。"
practical_rule: "1年更新になりやすい場面：転職直後・設立間もない会社・低収入・滞納あり・初回更新。同じ会社で安定在籍＋収入向上＋公的義務完納で次第に3年・5年へ昇格。理由は原則開示されない。「5年申請」という申請区分は存在しない。"
official_anchor: "入管法21条／施行規則別表第2"
conditions:
  - "更新申請段階"
risk:
  - "毎年1年更新が続いても改善要素を提示する以外打つ手なし"
should_not_say:
  - "10年いれば自動で5年更新になる"
material_bridge:
  - "更新申請書"
  - "収入・在職証明・納税証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
```

---

## practical-028

```yaml
card_id: practical-028
bucket: ANSWER_RUNTIME
title: 外国人雇用：雇用主側の届出義務とリスク
user_situation: "外国人を新規雇用または離職させる雇用主側"
short_answer: "ハローワーク届出（翌月末まで）。違反30万円以下罰金。不法就労助長は刑事罰。"
practical_rule: "雇用対策法上、外国人雇用は開始・終了時にハローワーク届出が翌月末まで必要。採用前に在留カード・パスポートで在留資格・期限・資格外活動許可有無を確認。確認怠ると不法就労助長罪（3年以下懲役・300万円以下罰金）。"
official_anchor: "雇用対策法28条／入管法73条の2（不法就労助長罪）"
conditions:
  - "外国人を雇用または雇用予定"
risk:
  - "在留資格確認なしで採用＝刑事責任リスク"
  - "ハローワーク届出漏れ＝過料"
should_not_say:
  - "雇用主は在留カードを見なくてもよい"
material_bridge:
  - "外国人雇用状況届出書"
  - "在留カード写し（社内保管）"
  - "ISA在留カード読み取りアプリ"
source_urls:
  - "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/index.html"
```

---

## practical-029

```yaml
card_id: practical-029
bucket: ANSWER_RUNTIME
title: 特定活動46号（就職活動・本邦大卒）の実務
user_situation: "日本の大学・大学院卒業者で接客・販売等の幅広い職種就労を望む方"
short_answer: "日本の大学・大学院卒＋N1相当で接客・販売・翻訳等の幅広い就労が可能。"
practical_rule: "日本の大学・大学院卒業＋日本語N1相当が要件。技人国では認められにくい接客・販売・現場業務も従事可能。専門学校卒は対象外。報酬は日本人同等以上が必要。学位種別（学士・修士・博士）は問わない。"
official_anchor: "告示46号"
conditions:
  - "日本の大学・大学院卒業済"
  - "JLPT N1相当の日本語能力"
risk:
  - "日本語要件未充足で不許可"
  - "業務内容説明書の不備で技人国との境界曖昧化"
should_not_say:
  - "外国の大学卒でも46号は使える"
material_bridge:
  - "在留資格変更・更新申請書（46号）"
  - "日本の大学・大学院卒業証明書"
  - "JLPT N1合格証等"
  - "雇用契約書・業務内容説明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00216.html"
```

---

## practical-030

```yaml
card_id: practical-030
bucket: ANSWER_RUNTIME
title: 在留資格取消：類型・手続きと取消後の対応
user_situation: "ISAから意見聴取通知が来た方／取消の可能性がある方"
short_answer: "取消は虚偽申請・活動不従事6か月・偽装結婚等。意見聴取が最後の対応機会。"
practical_rule: "ISAは取消前に意見聴取を実施。聴取段階で弁護士・行政書士を立てて事実関係を整理することが最も重要。取消後は退去強制手続きへ進み5年上陸拒否のリスク。取消通知受領後の対応は時間制約厳しい。"
official_anchor: "入管法22条の2"
conditions:
  - "取消事由となる事実関係がある／疑われている"
risk:
  - "意見聴取放置で取消確定＝退去強制＋5年上陸拒否"
should_not_say:
  - "取消通知が来ても放っておけば自然に消える"
material_bridge:
  - "取消通知書"
  - "意見陳述書"
  - "弁護士・行政書士への相談記録"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00149.html"
```

---

## practical-031

```yaml
card_id: practical-031
bucket: ANSWER_RUNTIME
title: 技人国→経営管理：転職して代表取締役になる場合
user_situation: "技人国で就労中・自分の会社を立ち上げて代表取締役になる方"
short_answer: "代表取締役・経営者になる＝技人国→経営管理の変更申請が必須。"
practical_rule: "技人国のまま代表取締役活動＝範囲外。会社設立と並行して経営管理への変更申請を準備。事務所（バーチャル不可）・資本金500万円（または相当の売上）・事業計画書が必須。設立完了前は変更申請に進めないため、設立・申請のタイミング設計が重要。"
official_anchor: "入管法20条／別表第2「経営管理」"
conditions:
  - "技人国保持・法人設立済または進行中"
risk:
  - "設立後に技人国のまま経営活動継続＝範囲外活動・不法就労扱い"
  - "資本金・事務所要件未充足で不許可"
should_not_say:
  - "代表取締役でも技人国のままで大丈夫"
material_bridge:
  - "登記事項証明書・定款"
  - "事務所賃貸契約書・内部写真"
  - "資本金証明・事業計画書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-032

```yaml
card_id: practical-032
bucket: ANSWER_RUNTIME
title: 在留申請オンラインシステムの実務
user_situation: "更新・変更申請をオンラインで行いたい本人または代理人"
short_answer: "本人申請にはマイナンバーカード必須。審査期間は窓口と同じ（1〜3か月）。"
practical_rule: "ISAオンラインシステムで更新・変更が可能。本人申請＝マイナンバーカード＋ICリーダー／NFCスマホ。マイナンバーなしは行政書士・弁護士の代理申請を選択。窓口と同じ審査期間。申請後は追加書類要求への即応が必要。"
official_anchor: "入管法施行規則改正（2022〜）"
conditions:
  - "更新・変更申請対象者"
  - "マイナンバーカード保持（本人申請の場合）"
risk:
  - "システムからの追加書類通知を見落とすと申請取下げ扱い"
should_not_say:
  - "オンライン申請なら審査が早い"
material_bridge:
  - "マイナンバーカード"
  - "ICリーダーまたはNFC対応スマホ"
source_urls:
  - "https://www.isa.go.jp/"
```

---

## practical-033

```yaml
card_id: practical-033
bucket: ANSWER_RUNTIME
title: 定住者：「日本人の実子を養育する外国人親」の要件
user_situation: "日本人実子を養育する外国人（離別・死別・未婚）で定住者を目指す方"
short_answer: "親権＋同居養育＋自立した生計の3要件で告示定住者（告示5号）。"
practical_rule: "親権を持ち、子と同居して実際に養育（保育園・学校送迎等）、自分の収入で生計維持が必要。親権なし（監護のみ）は告示定住者の対象外で個別審査。子の戸籍謄本・住民票・養育実態書類が必須。"
official_anchor: "告示5号（日本人実子養育）"
conditions:
  - "実子が日本国籍"
  - "親権者である"
  - "実子と同居養育中"
risk:
  - "親権なしで申請＝告示対象外"
  - "養育実態書類不足で許可率低下"
should_not_say:
  - "日本人の子がいれば自動で定住者"
material_bridge:
  - "在留資格変更許可申請書（定住者）"
  - "子の戸籍謄本（親権確認）"
  - "住民票（同居確認）"
  - "保育所・学校在籍証明・写真"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00045.html"
```

---

## practical-034

```yaml
card_id: practical-034
bucket: MATERIALS_ONLY
title: 配偶者等：申請書類と審査実態
user_situation: "「日本人の配偶者等」を新規申請または更新する方"
short_answer: "戸籍・住民票・収入証明＋婚姻実態書類（写真・SNS・交際経緯）が必須。"
practical_rule: "ISAは婚姻実態（偽装婚かどうか）を中心に審査。出会いから婚姻までの経緯・同居状況・コミュニケーションを具体的に説明できる書類セットを準備。書類は形式より「実態証明」の質が問われる。"
materials_only_reason: "本カードは標準書類リストの整理。婚姻実態の解釈論は practical-004・practical-001 へ"
material_bridge:
  - "ISA公式書類リスト"
  - "戸籍謄本（市区町村取得）"
  - "住民票（世帯全員）"
  - "課税証明書・納税証明書"
  - "交際写真・SNS履歴・LINE記録"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
```

---

## practical-035

```yaml
card_id: practical-035
bucket: ANSWER_RUNTIME
title: 技人国の業務適合性：「文系大卒」が「理系業務」に就く場合
user_situation: "文系大卒で IT エンジニア等の理系業務に就職を希望する方"
short_answer: "理系業務には理系専攻または10年以上の実務経験が原則必要。"
practical_rule: "技人国は学歴・実務経験と業務内容の関連性が要件。理系業務（IT エンジニア等）に文系卒で就く場合は10年以上の実務経験が代替要件。経理・マーケ等の人文系業務は文系卒で可。判断微妙な場合は業務内容説明書の質が決め手。"
official_anchor: "別表第1の2「技人国」上陸基準省令"
conditions:
  - "技人国の新規申請または変更申請"
  - "学歴と業務の整合性に不安"
risk:
  - "10年未満の実務経験で文系→理系業務＝不許可"
  - "業務内容説明書が抽象的で関連性立証失敗"
should_not_say:
  - "文系大卒でも IT 業務に普通に就ける"
material_bridge:
  - "卒業証明書・成績証明書・シラバス"
  - "職歴証明書（10年要件時）"
  - "業務内容説明書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-036

```yaml
card_id: practical-036
bucket: ANSWER_RUNTIME
title: 在留資格「介護」：申請要件と他制度との違い
user_situation: "介護業務を行う外国人で「介護」資格と特定技能・EPAの違いを知りたい方"
short_answer: "「介護」は介護福祉士国家資格必須・在留期間上限なし・訪問介護可。"
practical_rule: "①介護：国家資格必須・上限なし・訪問介護可 ②特定技能1号介護：技能試験合格・5年上限・訪問介護不可 ③特定技能2号介護：当面整備未了 ④EPA：特定国（フィリピン・インドネシア・ベトナム）出身者の候補生制度。国家資格取得済なら「介護」が最も安定。"
official_anchor: "別表第1の2「介護」／特定技能告示"
conditions:
  - "介護業務に従事中または予定"
risk:
  - "国家試験不合格でEPAから帰国"
  - "特定技能介護で訪問介護に従事＝範囲外"
should_not_say:
  - "介護福祉士なしでも訪問介護に行ける"
material_bridge:
  - "介護福祉士資格証明書"
  - "在留資格変更許可申請書（「介護」/特定技能）"
  - "雇用契約書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00130.html"
```

---

## practical-037

```yaml
card_id: practical-037
bucket: ANSWER_RUNTIME
title: 在留申請の「補正」：追加書類要求への対応と期限
user_situation: "ISAから追加書類提出通知が届いた申請者"
short_answer: "通知の期限内に補正書類を提出。期限超過＝不許可または取下げ。"
practical_rule: "補正通知は不許可の予兆ではなく書類不足の補完要求。期限内に提出すれば審査続行。期限延長は事前にISAへ連絡し相談可。期限超過で不許可になると再申請が必要。複雑な補正は行政書士相談を推奨。"
official_anchor: "入管法21条・行政手続法"
conditions:
  - "申請中に補正通知を受領"
risk:
  - "期限内未提出で取下げ扱い→再申請必要"
should_not_say:
  - "補正通知が来た時点で不許可確定"
material_bridge:
  - "補正通知書"
  - "追加書類（要求内容に応じる）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/index.html"
```

---

## practical-038

```yaml
card_id: practical-038
bucket: ANSWER_RUNTIME
title: 在留資格「特定活動」の指定書と主要告示番号
user_situation: "「特定活動」保持者で就労可否・活動範囲を確認したい方"
short_answer: "「特定活動」の活動範囲はパスポート貼付の指定書を確認する。"
practical_rule: "在留カードには「特定活動」とのみ記載され、活動詳細は指定書（パスポート貼付）にある。主要告示：7号（ワーキングホリデー）／34号（就職活動）／46号（本邦大卒の幅広就労）。指定書を就職先に提示することで活動範囲を立証できる。"
official_anchor: "別表第1の5「特定活動」／各告示"
conditions:
  - "特定活動を保持中"
risk:
  - "指定書を確認せず範囲外業務に従事＝資格外活動"
should_not_say:
  - "特定活動なら何でもできる"
material_bridge:
  - "パスポート指定書"
  - "在留カード"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00043.html"
```

---

## practical-039

```yaml
card_id: practical-039
bucket: ANSWER_RUNTIME
title: 在留資格「技能」：料理人・美容師等の要件
user_situation: "外国料理シェフ・美容師・タイ式マッサージ師等を希望する外国人"
short_answer: "外国特有料理・技術で10年以上の実務経験＋日本人同等以上の報酬が原則。"
practical_rule: "「技能」は外国特有の料理（中華・インド・タイ等）や技術に10年以上の実務経験が必要。日本料理（和食）は対象外。スポーツ選手・美容師・パイロット等の職種別要件も別途規定。在籍証明・給与明細・修業証明等で経験年数を立証。"
official_anchor: "別表第1の2「技能」"
conditions:
  - "外国特有の技能職に就職予定"
  - "10年以上の実務経験を有する"
risk:
  - "経験年数立証書類不足で不許可"
  - "和食料理人は対象外"
should_not_say:
  - "和食調理人でも「技能」資格が取れる"
material_bridge:
  - "在留資格変更／更新申請書（「技能」）"
  - "実務経験証明書（在籍証明・源泉徴収票）"
  - "雇用契約書（報酬額記載）"
  - "料理学校卒業証明（該当時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00038.html"
```

---

## practical-040

```yaml
card_id: practical-040
bucket: ANSWER_RUNTIME
title: 在留申請の行政書士活用：費用相場と依頼タイミング
user_situation: "行政書士に依頼するか自分で申請するか迷う方"
short_answer: "更新3〜8万・経営管理新規15〜30万・永住10〜20万円が相場。"
practical_rule: "本人申請は可能だが複雑案件（転職直後・経営管理・永住・不許可後再申請）は申請取次行政書士への依頼推奨。資格のない代行業者は違法。日本行政書士会連合会の会員検索で確認可。費用は地域・難易度で変動。"
official_anchor: "行政書士法／申請取次制度"
conditions:
  - "申請を検討中"
  - "案件の複雑度・自身の余力で判断"
risk:
  - "無資格業者への依頼で違法な代行・トラブル"
should_not_say:
  - "高い料金を払えば確実に許可される"
material_bridge:
  - "日本行政書士会連合会会員検索"
  - "ISA在留申請オンラインシステム（本人申請）"
source_urls:
  - "https://www.gyosei.or.jp/"
```

---

## practical-041

```yaml
card_id: practical-041
bucket: ANSWER_RUNTIME
title: COEから入国まで：海外在住者の在留資格取得フロー
user_situation: "海外内定の外国人が日本就労に向けて手続を始める段階"
short_answer: "①日本でCOE申請（1〜3か月）→②在外公館でビザ申請→③入国・在留カード受領。通算3〜5か月。"
practical_rule: "在留資格認定証明書（COE）の申請は採用会社（スポンサー）がISAに行う。COE受領後に在外日本大使館・総領事館でビザ申請（1〜2週間）。入国時に空港で在留カード交付。内定から入社まで3〜5か月見ておく必要あり。"
official_anchor: "入管法7条の2（COE）"
conditions:
  - "内定受領済"
  - "申請書類が揃う"
risk:
  - "COE申請から審査長期化で入社日に間に合わない"
  - "ビザ申請の在外公館段階で書類不備による遅延"
should_not_say:
  - "COE受領後すぐに入国できる"
material_bridge:
  - "在留資格認定証明書交付申請書"
  - "学歴・職歴証明書（翻訳含む）"
  - "雇用契約書・会社概要・登記事項証明書・決算書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
```

---

## practical-042

```yaml
card_id: practical-042
bucket: ANSWER_RUNTIME
title: 外国人の子どもの在留資格：日本生まれと外国生まれの区別
user_situation: "外国人夫婦に子どもが生まれた／呼び寄せたい方"
short_answer: "日本生まれ＝30日以内に在留資格取得申請。外国生まれ＝家族滞在COE申請で呼び寄せ。"
practical_rule: "日本で生まれた外国人乳児は30日以内にISA窓口で在留資格取得申請が必要。外国にいる子は親が日本でCOE申請＋現地ビザ申請で呼び寄せ。家族滞在は年齢制限なしだが成人後は扶養実態が要件。子の就職は別途就労資格への変更が必要。"
official_anchor: "入管法22条の2（取得）／7条の2"
conditions:
  - "外国人の親が在留資格保持"
  - "子の出生または呼寄せ計画"
risk:
  - "30日経過で取得申請の単純手続が複雑化"
should_not_say:
  - "日本生まれの外国人乳児は自動的に在留資格を持つ"
material_bridge:
  - "在留資格取得申請書"
  - "出産証明書"
  - "両親のパスポート・在留カード"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-6.html"
```

---

## practical-043

```yaml
card_id: practical-043
bucket: ANSWER_RUNTIME
title: 就労系在留資格と会社都合退職・リストラの影響
user_situation: "会社倒産・リストラで失業した就労系資格保持者"
short_answer: "在留資格は即失効しないが、無職6か月超で取消対象。14日以内に届出。"
practical_rule: "在留期間は満了まで有効。但し6か月以上活動不従事で取消対象。14日以内にISA離職届出＋ハローワーク失業給付申請・求職登録。期限が近ければ転職先未定でも更新申請を提出して特例期間を確保。応募・面接記録は今後の申請で証拠化。"
official_anchor: "入管法22条の2／19条の16"
conditions:
  - "就労系（技人国・経営管理等）保持"
  - "失業状態"
risk:
  - "無職6か月超で取消対象"
  - "更新未申請で在留期限切れ→オーバーステイ"
should_not_say:
  - "失業しても在留期限まで何もしなくていい"
material_bridge:
  - "離職票"
  - "所属機関離脱届出書"
  - "ハローワーク求職活動記録"
  - "健康保険切替書類"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-044

```yaml
card_id: practical-044
bucket: ANSWER_RUNTIME
title: 永住者の義務：在留カード7年更新・住所届出・再入国許可
user_situation: "永住者で「無期限だから何もしなくていい」と誤解しがちな方"
short_answer: "在留資格は無期限だが在留カードは7年更新。住所届出・再入国許可は通常通り。"
practical_rule: "永住者の主な継続義務：①在留カード7年ごとに更新（カード自体の有効期限）②住所変更14日以内に届出③1年超の出国は正規再入国許可が必要。1年超のみなし再入国不在で永住資格自動失効。"
official_anchor: "入管法19条の10（在留カード）・26条"
conditions:
  - "永住者の在留資格を保持"
risk:
  - "1年超出国＋みなし再入国のままで資格失効"
  - "在留カード期限切れで「カードなし」状態"
should_not_say:
  - "永住者は何の手続きも要らない"
material_bridge:
  - "在留カード更新申請書"
  - "正規再入国許可申請書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-2.html"
```

---

## practical-045

```yaml
card_id: practical-045
bucket: ANSWER_RUNTIME
title: 技人国の「月額報酬」基準：日本人と同等以上の要件
user_situation: "技人国の新規申請・更新で給与水準が要件を満たすか心配な方"
short_answer: "日本人同職同等以上。実務目安は新卒月20〜25万円以上。試用期間は契約書で対応。"
practical_rule: "ISAは「日本人が同等業務に従事する場合の水準と同等以上」を要件としている。公式金額は非公表だが実務上は月額20〜25万円以上（新卒・初職）が目安。試用期間は雇用契約書に試用後の給与を明記。同僚日本人より著しく低い給与は不許可リスク。"
official_anchor: "上陸基準省令・施行規則"
conditions:
  - "技人国の申請・更新段階"
risk:
  - "試用期間中の給与だけで申請＝水準未達と判断"
  - "業務との関連性不明確で報酬合理性立証失敗"
should_not_say:
  - "最低賃金以上なら何でも問題ない"
material_bridge:
  - "雇用契約書（試用後給与を含めて明記）"
  - "給与比較書（社内日本人との比較）"
  - "業界平均給与資料"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-046

```yaml
card_id: practical-046
bucket: ANSWER_RUNTIME
title: 特定技能：登録支援機関の役割と1号の「支援計画」義務
user_situation: "特定技能1号で外国人を雇用する企業／登録支援機関を検討中の方"
short_answer: "1号は支援計画策定・実施が義務。自社実施か登録支援機関への委託が必要。"
practical_rule: "支援計画には住居確保・生活オリエンテーション・日本語学習機会・相談対応等が含まれる。自社実施か登録支援機関に委託（月1〜5万円/人が相場）。初めて外国人雇用の企業は実質的に委託が必要。2号には支援義務なし。委託契約・実施記録は定期報告対象。"
official_anchor: "特定技能基準省令・支援要件告示"
conditions:
  - "特定技能1号雇用予定／中"
risk:
  - "支援計画未実施で報告義務違反→受入停止"
should_not_say:
  - "特定技能でも支援計画は不要"
material_bridge:
  - "支援計画書（ISA様式）"
  - "登録支援機関との委託契約書"
  - "支援実施記録（定期報告）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-047

```yaml
card_id: practical-047
bucket: ANSWER_RUNTIME
title: 特定技能1号の転職：同分野内のみ・分野変更は試験必須
user_situation: "特定技能1号で別会社への転職を考える方"
short_answer: "同分野内転職は自由（14日届出）。分野変更は新分野の試験合格＋変更申請。"
practical_rule: "同一産業分野（例：建設→建設）は転職自由で14日以内届出。分野変更（例：建設→農業）は新分野の技能評価試験合格＋在留資格変更申請が必要。分野対応の確認が先。"
official_anchor: "特定技能告示・施行規則"
conditions:
  - "特定技能1号保持・転職検討中"
risk:
  - "別分野転職で試験未受験＝変更申請不可"
should_not_say:
  - "特定技能はどの分野にも自由に転職できる"
material_bridge:
  - "所属機関変更届（同一分野内）"
  - "在留資格変更許可申請書（分野変更時）"
  - "新分野の技能評価試験合格証"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-048

```yaml
card_id: practical-048
bucket: ANSWER_RUNTIME
title: 在留資格「教育」：小中高教員の申請要件と技人国との区別
user_situation: "小中高校教員・ALT に就職予定の外国人"
short_answer: "公立・私立の小中高校教員は「教育」。大学は「教授」。語学スクールは技人国。"
practical_rule: "勤務先で資格が分かれる：①小中高（認可校）＝「教育」 ②大学・短大・高専＝「教授」 ③英会話スクール・語学学校（認可外）＝「技人国・国際業務」 ④JET経由 ALT＝特定活動の場合あり。学校の設置認可状況の確認が必要。"
official_anchor: "別表第1の1「教育」"
conditions:
  - "教員職への就職予定"
risk:
  - "認可外を「教育」で申請＝不許可"
should_not_say:
  - "教員ならどんな勤務先でも「教育」資格"
material_bridge:
  - "在留資格変更／更新申請書（「教育」）"
  - "雇用契約書（学校名・勤務内容）"
  - "学校設置認可証"
  - "教員免許証（取得済時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00030.html"
```

---

## practical-049

```yaml
card_id: practical-049
bucket: ANSWER_RUNTIME
title: 「定住者」の告示類型（日系人・中国帰国者・離婚後等）
user_situation: "定住者の対象に該当するか確認したい方"
short_answer: "告示定住者（日系3世・中国帰国者等）と非告示定住者（離婚後等）の2系統。"
practical_rule: "告示定住者：①日系3世まで（要件明示）②中国帰国者及び家族③日本人実子養育（告示5号）④定住者の配偶者・子等。非告示は離婚後等の裁量判断。日系4世は「特定活動」で別告示。就労制限なし。具体要件は出身・状況で大きく異なる。"
official_anchor: "別表第2「定住者」・定住者告示"
conditions:
  - "定住者対象に該当する可能性"
risk:
  - "日系4世を「定住者」と誤認"
  - "親権なし状態で告示5号を申請"
should_not_say:
  - "日系であれば自動で定住者"
material_bridge:
  - "定住者変更申請書"
  - "戸籍謄本・出生証明書（系譜証明）"
  - "翻訳文（認定翻訳者）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00045.html"
```

---

## practical-050

```yaml
card_id: practical-050
bucket: ANSWER_RUNTIME
title: 外国人の銀行口座・携帯電話・クレジットカード開設
user_situation: "来日直後／在留期間が短い外国人で生活基盤を作りたい方"
short_answer: "法令上の制限なし。各機関の審査基準で対応が分かれる。在留1年以上で開設しやすい。"
practical_rule: "銀行口座・携帯契約に法令制限はないが、各社が在留期間・身元確認等で個別審査。在留1年以上で開設容易。在留期間短い段階はゆうちょ銀行・ネット銀行が現実的。特例期間中はISA受領証で対応可能な銀行もある。各機関に直接確認を。"
official_anchor: "犯収法（本人確認）／各機関の社内規定"
conditions:
  - "在留資格と現住所が明確"
risk:
  - "在留期間が短いと審査落ちで開設不可"
should_not_say:
  - "外国人は銀行口座を作れない"
material_bridge:
  - "在留カード"
  - "パスポート"
  - "ISA受領証（特例期間中）"
  - "勤務先証明・給与明細（クレジット審査時）"
source_urls:
  - "—（各金融機関・通信会社の規定に依拠）"
```

---

## 注記

- 本ファイルは Batch 01 の runtime block 集。全 50 張中、ANSWER_RUNTIME=48・MATERIALS_ONLY=2。
- 母カード全文は `docs/practical-fact-layer/cards/practical-XXX.md` を参照。
- DOMAIN 复核問題（pdom-001〜006）はバッチ報告書を参照。
- 短版 runtime block は答案システムへの直接注入用テンプレ。長文化禁止。
