> # ⚠ INVALIDATED 2026-05-19 — 不可 ingest 到 answer 系统
>
> 本文件 yaml runtime block 未做事实核查、未对照 DOMAIN/guardrail。
> 已知严重错误：practical-149 写「常勤2名 or 500万 选择要件」直接踩 Loop2M must_not_say。
> practical-123/144 经管要件未对照 2025 改革。
> 详见 `docs/knowledge-governance/PRACTICAL_GOVERNANCE_AUDIT_LOG.md`。

---

# Practical Batch 03 — Runtime Blocks (practical-101〜practical-150) [INVALIDATED]

> 既存実務カードから抽出した短版 runtime block 集。
> 生成日: 2026-05-19 / Batch 03

---

## practical-101

```yaml
card_id: practical-101
bucket: ANSWER_RUNTIME
title: 経営管理：経営者と管理者の違い
user_situation: "事業部長・工場長等の幹部として経営管理ビザを検討する方"
short_answer: "経営者だけでなく管理者も対象。採用・予算等の実質的な管理権限が必要。"
practical_rule: "「経営・管理」は代表取締役等の経営者だけでなく事業部長・工場長等の管理者にも適用。実質的な管理権限（採用・予算決定権）＋相当規模の組織管理が必要。課長・係長等の現場管理職は技人国が適切。職位・権限の証明書類が鍵。"
official_anchor: "別表第1の2「経営管理」"
conditions:
  - "実質的な管理権限がある"
  - "相当規模の組織を管理"
risk:
  - "肩書だけで実質権限なし＝不許可"
should_not_say:
  - "管理職なら誰でも経営管理ビザ"
material_bridge:
  - "職務権限規程"
  - "組織図（位置付け・部下数）"
  - "雇用契約書（職位・権限明記）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-102

```yaml
card_id: practical-102
bucket: ANSWER_RUNTIME
title: 特定活動「ワーキングホリデー」：制度概要と就労制限
user_situation: "ワーホリビザで来日した／予定の方"
short_answer: "就労制限なしだが同一事業主3か月内が目安。風俗業禁止。WH後は変更必要。"
practical_rule: "WH＝特定活動。就労制限なし、ただし同一事業主の連続就労は3か月以内が目安（義務でなく指針）。水商売・風俗業は禁止。WH終了後は就職（技人国）・進学（留学）・婚姻（配偶者等）等への変更が必要。WH は原則一度のみ取得可能。"
official_anchor: "特定活動告示7号"
conditions:
  - "WH協定締結国の若年層"
risk:
  - "風俗業従事＝資格外活動"
  - "WH後の在留資格変更失敗で帰国"
should_not_say:
  - "WH を複数回取得できる"
material_bridge:
  - "WHビザ（特定活動の指定書）"
  - "WH後の変更申請書類"
source_urls:
  - "https://www.mofa.go.jp/mofaj/toko/visa/tanki/whv.html"
```

---

## practical-103

```yaml
card_id: practical-103
bucket: ANSWER_RUNTIME
title: 不動産取得・賃貸・住宅ローン
user_situation: "日本で不動産購入・賃貸を考える外国人"
short_answer: "外国人も不動産購入可。永住者はローン審査有利。賃貸はUR等保証人不要物件も。"
practical_rule: "不動産購入に法律制限なし。住宅ローンは在留資格で審査が異なる：永住者＝日本人に近い、技人国・配偶者等＝対応金融機関あり、短期在留＝困難。賃貸は外国人対応業者またはUR賃貸（保証人不要）を活用。各機関に直接確認推奨。"
official_anchor: "—（民法・各金融機関規定）"
conditions:
  - "在留資格・在留期間が明確"
risk:
  - "在留期間短く住宅ローン否決"
should_not_say:
  - "外国人は不動産を買えない"
material_bridge:
  - "在留カード・パスポート"
  - "印鑑証明書（または署名証明）"
  - "勤務先証明・課税証明（ローン審査）"
source_urls:
  - "—（各金融機関）"
```

---

## practical-104

```yaml
card_id: practical-104
bucket: ANSWER_RUNTIME
title: 技人国の試用期間と本採用不成立リスク
user_situation: "技人国で就労中で試用期間中の方"
short_answer: "試用期間中の就労は技人国OK。本採用不成立＝離職14日届出＋3か月で取消リスク。"
practical_rule: "試用期間中も雇用契約継続なら技人国の活動として問題なし。但し試用後の本採用不成立＝離職扱い。14日以内届出＋3か月以内に新就職先未確定で取消リスク。試用期間終了前から就職活動準備を。"
official_anchor: "入管法19条の16・22条の2"
conditions:
  - "技人国で試用期間中"
risk:
  - "本採用不成立後の3か月で取消"
should_not_say:
  - "試用期間が終われば自動で本採用"
material_bridge:
  - "雇用契約書（試用期間条項明記）"
  - "離職時の所属機関変更届出"
  - "次の就職活動記録"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-105

```yaml
card_id: practical-105
bucket: ANSWER_RUNTIME
title: 内縁関係・同性パートナーと在留資格
user_situation: "日本人パートナーが内縁関係または同性パートナーの外国人"
short_answer: "「日本人の配偶者等」は法律婚のみ。内縁・同性パートナーは対象外。"
practical_rule: "「日本人の配偶者等」は婚姻届受理済の法律婚のみが対象。内縁・事実婚・同性パートナーは対象外（同性婚は日本で法定不可）。代替は就労系資格・特定活動（個別審査）等。長期滞在には別の在留資格根拠が必要。"
official_anchor: "別表第2「日本人の配偶者等」／民法740条"
conditions:
  - "法律婚未成立または同性パートナー"
risk:
  - "内縁関係を「配偶者」と申告→不許可"
should_not_say:
  - "事実婚でも配偶者ビザが取れる"
material_bridge:
  - "代替在留資格の申請書類（技人国・経営管理・特定活動等）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
```

---

## practical-106

```yaml
card_id: practical-106
bucket: ANSWER_RUNTIME
title: 変更申請中（特例期間）の転職
user_situation: "在留資格変更申請中で転職機会が出た方"
short_answer: "特例期間中は現在の資格範囲内で就労継続のみ可。新会社・新業務での就労不可。"
practical_rule: "変更申請中の「特例期間」は現在の在留資格の範囲内での就労継続のみ可。申請対象（新会社・新業務）での就労は許可前は不可。転職の場合は申請を取り下げて新雇用主で再申請が必要。判断微妙なら行政書士相談。"
official_anchor: "入管法20条5項（特例期間）"
conditions:
  - "変更申請中"
  - "特例期間内"
risk:
  - "新会社で許可前就労＝不法就労"
  - "特例期間を誤解して別業務に従事"
should_not_say:
  - "特例期間中なら何でもできる"
material_bridge:
  - "申請取り下げ書（新雇用主で再申請する場合）"
  - "新雇用主との雇用契約書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00044.html"
```

---

## practical-107

```yaml
card_id: practical-107
bucket: ANSWER_RUNTIME
title: 技人国での派遣社員就労
user_situation: "派遣社員として技人国で就労中／予定の方"
short_answer: "派遣でも技人国OK。但し派遣先での業務が技人国範囲内であることが必須。"
practical_rule: "派遣社員でも技人国の就労は可能。派遣元との雇用契約＋派遣先での業務が技人国範囲内（専門職）が条件。派遣先で単純労働に従事＝資格外活動。派遣先変更時は派遣元の雇用は継続するが、新派遣先の業務適合性を確認。"
official_anchor: "別表第1の2「技人国」／労働者派遣法"
conditions:
  - "派遣元との雇用契約あり"
  - "派遣先業務が技人国範囲内"
risk:
  - "派遣先で実態が単純労働＝範囲外"
should_not_say:
  - "派遣社員では技人国を取れない"
material_bridge:
  - "派遣元との雇用契約書"
  - "派遣先での業務内容説明書"
  - "派遣契約書（業務内容明記）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-108

```yaml
card_id: practical-108
bucket: ANSWER_RUNTIME
title: 在留資格の複数保有：二重在留資格は不可
user_situation: "副業・複数勤務で在留資格をどう管理するか不安な方"
short_answer: "二重在留資格は不可。1つの在留資格＋資格外活動許可で複数活動が可能。"
practical_rule: "二重在留資格は制度上存在しない。技人国保持者の副業＝資格外活動許可で対応。家族滞在・留学のアルバイトも資格外活動許可（週28時間）。永住者・定住者等は就労制限なしで複数勤務先で自由。"
official_anchor: "入管法2条の2／19条"
conditions:
  - "現在の在留資格＋副業・複数活動希望"
risk:
  - "資格外活動許可なしの副業＝不法就労"
should_not_say:
  - "複数の在留資格を持てる"
material_bridge:
  - "資格外活動許可申請書（副業開始前）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00027.html"
```

---

## practical-109

```yaml
card_id: practical-109
bucket: ANSWER_RUNTIME
title: 技人国の業務委託契約（雇用なし）
user_situation: "業務委託契約のみで技人国を取得・維持したい方"
short_answer: "理論上可能だが、単一の継続的専属委託先が必要。複数クライアントは経営管理推奨。"
practical_rule: "技人国の要件は「公私の機関との契約」であり、業務委託契約も対象になり得る。但し単一・継続的・専属的な委託先が前提で、複数クライアントのフリーランス形態は審査困難。経営管理ビザへの切替が安定。雇用より審査厳しい。"
official_anchor: "別表第1の2「技人国」"
conditions:
  - "継続的な業務委託契約"
  - "業務が技人国範囲内"
risk:
  - "単発・複数クライアント形態で不許可"
should_not_say:
  - "フリーランスでも技人国を簡単に取れる"
material_bridge:
  - "業務委託契約書（継続期間・業務・報酬明記）"
  - "業務内容詳細説明書"
  - "委託元企業の概要書類・法人謄本"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-110

```yaml
card_id: practical-110
bucket: ANSWER_RUNTIME
title: 特定活動告示番号と在留目的別使い分け
user_situation: "「特定活動」の指定書を確認したい方"
short_answer: "特定活動は告示番号で活動範囲が異なる。指定書で就労可否を必ず確認。"
practical_rule: "特定活動は告示番号で範囲決定。主要：7号（WH）・34号（就活）・46号（本邦大卒の幅広就労）・49/50号（就活）等。就労可否は指定書を確認必須。指定書がない場合はISAに相談。"
official_anchor: "特定活動告示"
conditions:
  - "特定活動を保持"
risk:
  - "指定書を確認せず範囲外就労＝資格外活動"
should_not_say:
  - "特定活動なら何でもできる"
material_bridge:
  - "パスポート（指定書貼付）"
  - "在留カード"
  - "指定書（活動内容・就労制限）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00043.html"
```

---

## practical-111

```yaml
card_id: practical-111
bucket: ANSWER_RUNTIME
title: 永住申請の身元保証人：要件と責任
user_situation: "永住申請の身元保証人を探している方"
short_answer: "身元保証人は日本国籍者または永住者。責任は道義的のみで法的強制力なし。"
practical_rule: "身元保証人は日本国籍者または永住者なら基本可。責任は道義的責任のみで法的拘束力なし（申請者が帰国費用払えない場合でも保証人に強制なし）。見つからない場合は理由書添付で申請可能。"
official_anchor: "永住ガイドライン"
conditions:
  - "永住申請段階"
risk:
  - "保証人責任を誤解して引受拒否"
should_not_say:
  - "身元保証人は連帯保証人と同じ"
material_bridge:
  - "身元保証書（ISA所定書式）"
  - "保証人の住民票・在職証明・源泉徴収票"
  - "保証人の在留カードまたはパスポートコピー"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00040.html"
```

---

## practical-112

```yaml
card_id: practical-112
bucket: ANSWER_RUNTIME
title: 高度専門職1号の指定書と転職・副業
user_situation: "高度専門職1号で転職・副業を考える方"
short_answer: "指定書記載の機関・活動のみ可。転職は変更申請完了まで新会社就労不可。"
practical_rule: "高度専門職1号は指定書記載の特定機関・活動のみ許可。転職時は新勤務先で在留資格変更申請完了まで就労開始不可（一般在留資格より厳格）。指定書外＝資格外活動で深刻リスク。内定後すぐ行政書士相談を。"
official_anchor: "別表第1の2「高度専門職」"
conditions:
  - "高度専門職1号で就労中"
  - "転職または副業希望"
risk:
  - "指定書外活動＝即資格外活動"
  - "転職許可前に新会社就労"
should_not_say:
  - "高度専門職は自由に転職できる"
material_bridge:
  - "パスポート（指定書確認）"
  - "在留資格変更申請書"
  - "新勤務先の雇用契約書・会社概要"
  - "ポイント計算書（再計算）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00168.html"
```

---

## practical-113

```yaml
card_id: practical-113
bucket: ANSWER_RUNTIME
title: 経営管理ビザ：複数会社の経営・役員兼務
user_situation: "経営管理保持で複数会社を経営したい方"
short_answer: "複数会社の役員兼務可。主たる事業機関を届出＋全社で経営実態が必要。"
practical_rule: "経営管理ビザ1つで複数会社の経営・役員兼務可。主たる事業機関（メイン）の届出が必要、全社で実際に経営管理業務を行うこと。更新時に全社の決算書・業務記録の提出を求められる場合あり。"
official_anchor: "別表第1の2「経営管理」"
conditions:
  - "複数会社で経営管理業務"
risk:
  - "メイン以外で実態なし＝名義貸し疑義"
should_not_say:
  - "1社で形だけの役員兼務OK"
material_bridge:
  - "各会社の登記事項証明書（役員記載）"
  - "各会社の決算書・事業計画書"
  - "役員報酬の支払証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-114

```yaml
card_id: practical-114
bucket: ANSWER_RUNTIME
title: 外国免許の日本切替
user_situation: "外国の運転免許を日本免許に切替したい方"
short_answer: "国際運転免許は1年。切替は書類審査＋学科（中国・台湾）。韓国は簡易協定。"
practical_rule: "外国免許は国際運転免許証として来日後1年のみ有効。日本免許への切替は運転免許試験場で書類審査＋場合により学科・実技。中国・台湾免許は学科試験必要。韓国免許は簡易協定。都道府県の運転免許センターで手続き。"
official_anchor: "道路交通法107条の2"
conditions:
  - "外国の有効な運転免許保持"
risk:
  - "1年経過後の国際免許利用＝無免許運転"
should_not_say:
  - "外国免許はそのまま日本で使える"
material_bridge:
  - "外国運転免許証（原本）"
  - "JAF等の公認翻訳"
  - "パスポート・在留カード・写真"
source_urls:
  - "https://www.npa.go.jp/policies/application/license_renewal/index.html"
```

---

## practical-115

```yaml
card_id: practical-115
bucket: ANSWER_RUNTIME
title: 外国人の生活保護受給
user_situation: "失業・困窮で生活保護を検討する外国人"
short_answer: "永住者・定住者・配偶者等・特別永住者のみ準用可。技人国・特定技能等は対象外。"
practical_rule: "外国人は法律上は生活保護対象外。但し永住者・特別永住者・定住者・日本人/永住者の配偶者等は行政運用上準用可。技人国・特定技能・留学・家族滞在は対象外。失業時はまず雇用保険（失業給付）を検討。"
official_anchor: "生活保護法／厚労省運用通知"
conditions:
  - "永住・定住・配偶者等のいずれか"
  - "生計困難"
risk:
  - "技人国等で生活保護申請＝不受理"
should_not_say:
  - "在留資格があれば生活保護を受けられる"
material_bridge:
  - "生活保護申請書（市区町村福祉事務所）"
  - "雇用保険失業給付申請書（代替）"
source_urls:
  - "—（厚生労働省運用）"
```

---

## practical-116

```yaml
card_id: practical-116
bucket: ANSWER_RUNTIME
title: 外国人労働者の本国送金・規制
user_situation: "稼いだ収入を本国に送金したい外国人"
short_answer: "送金は合法・在留影響なし。200万円超送金はマイナンバー告知、100万円超現金持出は申告必要。"
practical_rule: "外国人の本国送金は合法、在留資格に影響なし。銀行送金に金額上限はないが200万円超送金にマイナンバー告知が必要な場合あり。100万円超の現金持出は税関申告必須（未申告は没収・罰金）。北朝鮮等制裁対象国への送金は制限。"
official_anchor: "外為法・犯収法・関税法"
conditions:
  - "合法的に取得した収入"
risk:
  - "100万円超現金未申告＝没収"
  - "制裁国送金で違法"
should_not_say:
  - "送金は無申告でも問題ない"
material_bridge:
  - "在留カード（銀行本人確認）"
  - "マイナンバーカード（200万円超送金）"
  - "税関申告書（100万円超現金）"
source_urls:
  - "https://www.customs.go.jp/"
```

---

## practical-117

```yaml
card_id: practical-117
bucket: ANSWER_RUNTIME
title: 在留申請書類の公証・アポスティーユ
user_situation: "外国の公文書を在留申請に使用する必要がある方"
short_answer: "ハーグ条約加盟国はアポスティーユ・非加盟国は領事認証。中国は2024年11月以降アポスティーユ可。"
practical_rule: "外国の公文書（卒業証明・婚姻証明等）はハーグ条約加盟国＝アポスティーユ、非加盟国＝領事認証。中国は2023年加盟、2024年11月以降発行書類はアポスティーユ可。ベトナム・フィリピン加盟済、ネパール等非加盟。日本語翻訳が必須。"
official_anchor: "ハーグ条約／領事関係条約"
conditions:
  - "在留申請に外国公文書を使用"
risk:
  - "認証手続き未了で書類差戻し"
should_not_say:
  - "原本だけあれば認証は不要"
material_bridge:
  - "外国公文書（卒業証明書・婚姻証明書等）"
  - "アポスティーユまたは領事認証"
  - "日本語翻訳文（翻訳者証明付き）"
source_urls:
  - "https://www.mofa.go.jp/mofaj/toko/page22_000610.html"
```

---

## practical-118

```yaml
card_id: practical-118
bucket: ANSWER_RUNTIME
title: 技人国の社内職種変更
user_situation: "技人国保持で同社内の異動・職種変更があった方"
short_answer: "技人国内の異動（技術／人文知識／国際業務）は追加申請不要。単純作業転換は資格外活動。"
practical_rule: "技人国は「技術・人文知識・国際業務」を一つに統合した在留資格のため、同社内でIT→マーケティング等の異動は追加申請・届出不要。但し単純作業等の専門外への異動は資格外活動扱い。次回更新時に現在業務を正確に申告すること。"
official_anchor: "別表第1の2「技人国」"
conditions:
  - "同社内・技人国範囲内の異動"
risk:
  - "実態が単純作業中心になり範囲外"
should_not_say:
  - "技人国なら社内でどんな業務でもOK"
material_bridge:
  - "業務内容変更経緯説明書（更新時）"
  - "現在の職務内容書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-119

```yaml
card_id: practical-119
bucket: ANSWER_RUNTIME
title: 海外配偶者の呼び寄せCOE申請
user_situation: "海外にいる配偶者を日本に呼び寄せたい方"
short_answer: "日本でCOE申請→現地ビザ申請。通常2〜6か月。婚姻真正性が中心審査。"
practical_rule: "日本側でISAにCOE申請→COE取得後に配偶者が現地日本大使館でビザ申請。申請から来日まで2〜6か月。婚姻真正性（出会い・交際経緯・写真・渡航記録）が中心審査。戸籍謄本・住民票・収入証明・質問書・写真等が必要。"
official_anchor: "入管法7条の2（COE）"
conditions:
  - "法律婚成立"
  - "日本側スポンサーが在留中"
risk:
  - "交際証拠不足で偽装婚疑義"
  - "収入証明不足で扶養能力否認"
should_not_say:
  - "婚姻届さえあれば自動的に呼び寄せできる"
material_bridge:
  - "在留資格認定証明書交付申請書"
  - "戸籍謄本・婚姻証明書＋翻訳"
  - "夫婦の写真・質問書"
  - "在職証明書・源泉徴収票"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-1.html"
```

---

## practical-120

```yaml
card_id: practical-120
bucket: MATERIALS_ONLY
title: 特定活動（介護）→介護資格への変更
user_situation: "EPA介護福祉士候補者で国家試験合格した方"
short_answer: "介護福祉士国家試験合格後、速やかに「介護」変更申請。"
practical_rule: "EPA候補者として在留中に介護福祉士国家試験合格＝「介護」変更申請可能。現在の特定活動の在留期間満了前に申請必須。介護福祉士登録証・雇用先在職証明・労働条件通知書等が要件。"
materials_only_reason: "本カードは「介護」変更時の書類セット整理が主"
material_bridge:
  - "介護福祉士登録証または合格証明書"
  - "在留資格変更許可申請書"
  - "雇用先の在職証明書・労働条件通知書"
  - "雇用先介護事業者の概要書類"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00130.html"
```

---

## practical-121

```yaml
card_id: practical-121
bucket: ANSWER_RUNTIME
title: 「文化活動」：報酬なし要件と生活費証明
user_situation: "茶道・武道等の研究や芸術活動で「文化活動」資格を考える方"
short_answer: "報酬を受けない文化・芸術・学術活動。生活費は本国送金・奨学金・保証人で証明。"
practical_rule: "文化活動は報酬を受けない日本の文化・芸術・学術活動のための資格。正規大学課程在籍は不要。アルバイト等での収入禁止（資格外活動違反）。生活費は本国送金・奨学金・保証人による支弁証明が必要。"
official_anchor: "別表第1の3「文化活動」"
conditions:
  - "活動が文化・芸術・学術"
  - "報酬なし"
  - "生活費の支弁能力あり"
risk:
  - "アルバイトでの収入が発覚＝資格外活動"
should_not_say:
  - "文化活動でも軽い仕事はできる"
material_bridge:
  - "活動受入機関の受入証明書"
  - "生活費支弁能力証明（残高・送金・奨学金）"
  - "身元保証書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00028.html"
```

---

## practical-122

```yaml
card_id: practical-122
bucket: ANSWER_RUNTIME
title: 技人国の継続就労：3か月以内の無職期間と対応
user_situation: "技人国保持で離職後の対応中の方"
short_answer: "離職14日届出＋ハローワーク登録＋活動記録残し必須。3か月以上空白は取消対象。"
practical_rule: "技人国は離職後3か月以上正当な理由なく就労不従事＝取消対象（22条の4）。14日以内届出、ハローワーク登録、就職活動記録（応募メール・面接記録）を残す。3か月迫る場合は行政書士相談を急ぐ。"
official_anchor: "入管法22条の4"
conditions:
  - "技人国で離職中"
  - "就職活動中"
risk:
  - "活動記録未維持で「正当理由なし」と判断"
should_not_say:
  - "離職後しばらくは何もしなくていい"
material_bridge:
  - "ISA所属機関変更届出書"
  - "ハローワーク求職者登録票"
  - "就職活動記録（応募・面接の証拠）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-123

```yaml
card_id: practical-123
bucket: ANSWER_RUNTIME
title: 起業：合同会社 vs 株式会社と在留資格
user_situation: "経営管理ビザのために会社設立する方"
short_answer: "合同・株式会社どちらでも経営管理取得可。会社形態より500万円投資・事務所実態が重視。"
practical_rule: "経営管理は合同会社・株式会社どちらでも取得可能。ISAは会社形態より500万円投資・事務所実態・経営権限を重視。設立コスト：合同会社（10〜15万）vs 株式会社（25〜30万）。外部出資受入や社会的信用重視なら株式会社が有利。"
official_anchor: "別表第1の2「経営管理」"
conditions:
  - "経営管理ビザ取得目的"
risk:
  - "形だけ設立で実態なし＝不許可"
should_not_say:
  - "株式会社でないと経営管理は取れない"
material_bridge:
  - "会社設立登記申請書類"
  - "定款（株式会社は公証役場認証）"
  - "資本金払込証明書"
  - "登記事項証明書"
source_urls:
  - "https://houmukyoku.moj.go.jp/"
```

---

## practical-124

```yaml
card_id: practical-124
bucket: ANSWER_RUNTIME
title: 特定技能の受入機関変更（転職）と空白期間
user_situation: "特定技能で転職を考える方"
short_answer: "同一分野内転職可能。離職14日届出＋変更申請完了まで新会社就労不可。"
practical_rule: "特定技能1号は同一分野内で転職可。離職14日以内届出＋新受入機関での変更申請（または届出）。変更許可前は新会社就労不可。空白3か月超は取消リスク。転職先確定後に退職を推奨。"
official_anchor: "特定技能告示／入管法22条の4"
conditions:
  - "同一分野内の転職"
risk:
  - "許可前就労＝不法就労"
  - "空白3か月超で取消"
should_not_say:
  - "特定技能なら無申請で転職できる"
material_bridge:
  - "ISA所属機関変更届出書"
  - "在留資格変更許可申請書（新受入機関）"
  - "新特定技能雇用契約書"
  - "支援計画書（登録支援機関との契約）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## practical-125

```yaml
card_id: practical-125
bucket: ANSWER_RUNTIME
title: 「投資・経営」廃止と「経営管理」への移行
user_situation: "旧「投資・経営」保有または制度沿革を確認したい方"
short_answer: "「投資・経営」は2015年に「経営管理」へ変更。日本国内資本でも事業可能に。"
practical_rule: "2015年4月に「投資・経営」→「経営管理」へ名称変更。外国からの送金資本だけでなく日本国内資本（貯蓄等）での事業投資も可能になった。旧「投資・経営」保有者は更新時に「経営管理」として在留カードが発行される。"
official_anchor: "改正入管法（2015年）"
conditions:
  - "旧「投資・経営」保有または知りたい"
risk:
  - "—"
should_not_say:
  - "「投資・経営」という資格が現在もある"
material_bridge:
  - "—（情報カード）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-126

```yaml
card_id: practical-126
bucket: ANSWER_RUNTIME
title: 遺産相続・相続税：在留資格と国籍
user_situation: "日本で財産を相続する／相続される予定の外国人"
short_answer: "外国人も相続可（国籍不問）。相続税は居住地基準。日本5年超在留で全世界財産が課税対象。"
practical_rule: "外国人も日本の財産を相続する権利あり。相続税は居住地基準：日本に5年超居住の外国人は全世界の相続財産が日本相続税対象になり得る。在留資格の種類は相続税基準に直接無関係。税理士相談必須。"
official_anchor: "民法（相続）／相続税法"
conditions:
  - "相続発生または見込み"
risk:
  - "5年超居住で予想外の国外財産課税"
should_not_say:
  - "外国人なら相続税は払わない"
material_bridge:
  - "相続税申告書（税理士作成）"
  - "遺産分割協議書（相続人全員合意）"
  - "不動産：法務局での所有権移転登記"
source_urls:
  - "https://www.nta.go.jp/"
```

---

## practical-127

```yaml
card_id: practical-127
bucket: ANSWER_RUNTIME
title: 在留申請の本人申請 vs 代理人申請
user_situation: "在留申請を本人で行うか代行を依頼するか迷う方"
short_answer: "本人申請が原則。申請取次行政書士・認定会社人事担当者・親権者が代行可能。"
practical_rule: "本人申請が原則だが、申請取次行政書士（地方入管局長承認）が代理可。会社人事担当者も「申請取次者」認定で代行可（要届出）。未成年の子は親権者が代理。本人窓口出頭が不要になる。"
official_anchor: "入管法施行規則"
conditions:
  - "申請の代行を検討"
risk:
  - "無資格者の代行依頼＝違法"
should_not_say:
  - "誰でも代行できる"
material_bridge:
  - "委任状（行政書士委任時）"
  - "法定代理人証明書（親権者証明）"
source_urls:
  - "https://www.gyosei.or.jp/"
```

---

## practical-128

```yaml
card_id: practical-128
bucket: ANSWER_RUNTIME
title: 「教育」：ALT・小中高教員の申請要件
user_situation: "公立学校・私立学校・英会話スクールで教える予定の方"
short_answer: "公立小中高ALT＝教育、私立・英会話スクール＝技人国（国際業務）。"
practical_rule: "公立小中高校のALT・語学教師＝「教育」資格、私立学校・英会話スクール＝「技人国（国際業務）」。「教育」要件は大学卒業または日本の教員免許。JETプログラム公立配属＝「教育」ビザ。学校種別と勤務先の認可状況確認が鍵。"
official_anchor: "別表第1の1「教育」"
conditions:
  - "教員職就任予定"
risk:
  - "勤務先種別を誤って資格選択"
should_not_say:
  - "英会話教室の講師も「教育」"
material_bridge:
  - "学校採用証明書（勤務先種類確認）"
  - "大学卒業証明書"
  - "教員免許状（所持時）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00030.html"
```

---

## practical-129

```yaml
card_id: practical-129
bucket: ANSWER_RUNTIME
title: みなし再入国許可：1年以内の出国と帰国時注意
user_situation: "海外出張・一時帰国を1年以内に予定する方"
short_answer: "1年以内の出国はみなし再入国（自動適用）。在留期間内に帰国必須。"
practical_rule: "有効な在留カード保持で1年以内の出国・帰国はみなし再入国が自動適用、追加手続不要（出国カード記載のみ）。但し出国中に在留期間満了＝在留資格失効。1年超の出国予定は事前にISAで正規再入国許可（最長5年）取得。"
official_anchor: "入管法26条の2（みなし再入国）"
conditions:
  - "在留カード有効"
  - "1年以内の出国"
risk:
  - "出国中の在留期間満了で失効"
  - "1年超滞在で在留資格失効"
should_not_say:
  - "何年でも出国できる"
material_bridge:
  - "再入国許可申請書（1年超予定時）"
  - "在留カード（帰国時提示）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-4.html"
```

---

## practical-130

```yaml
card_id: practical-130
bucket: ANSWER_RUNTIME
title: 外国人労働者の労災（在留資格・不法就労でも適用）
user_situation: "労災ケガをした外国人労働者（不法就労含む）"
short_answer: "労災は在留資格不問・不法就労者も対象。労災申請が入管に通報されることはない。"
practical_rule: "労災保険は在留資格の有無・種類を問わず日本国内で働いていた全外国人に適用、不法就労者も対象。労災申請はISAに通報されない制度。労働基準監督署または外国人労働者相談コーナーへ相談。"
official_anchor: "労働者災害補償保険法"
conditions:
  - "業務中の負傷・疾病"
risk:
  - "申請せずに泣き寝入り"
should_not_say:
  - "不法就労なら労災は使えない"
material_bridge:
  - "療養補償給付請求書（労基署書式）"
  - "労働基準監督署の相談窓口"
  - "外国人労働者相談コーナー（都道府県労働局）"
source_urls:
  - "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/rousai/"
```

---

## practical-131

```yaml
card_id: practical-131
bucket: ANSWER_RUNTIME
title: 在留カードの住所と実際の住所の相違リスク
user_situation: "引越し後に住所変更を忘れている／実住所と異なる方"
short_answer: "引越し14日以内に市区町村で転居届。在留カードも更新。違反は過料＋次回審査不利。"
practical_rule: "転居先の市区町村役場に14日以内に転居届。在留カードも役場で住所更新。ISA別途届出不要（住民票変更が自動反映）。実住所と異なる場所への住民票登録は違反。気づき次第早期届出を。"
official_anchor: "住民基本台帳法・入管法19条の9"
conditions:
  - "引越し済または引越予定"
risk:
  - "違反は過料・次回更新で減点"
  - "重要通知が旧住所届きで失念"
should_not_say:
  - "短期間の引越しなら届出不要"
material_bridge:
  - "転居届（市区町村役場）"
  - "在留カード（住所欄更新）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00014.html"
```

---

## practical-132

```yaml
card_id: practical-132
bucket: ANSWER_RUNTIME
title: 留学→技人国変更：卒業後の変更実務
user_situation: "大学卒業直後に技人国へ変更したい方"
short_answer: "卒業証明書取得後に変更申請。許可前は就労不可。4月入社なら1〜2月申請。"
practical_rule: "卒業後（卒業証明書取得後）に技人国変更申請が基本。内定後から準備、卒業直後に申請が理想。許可下りるまで就労不可（申請中の特例期間でも不可）。4月入社内定なら1〜2月申請、許可遅れは入社日延期協議。"
official_anchor: "入管法20条／施行規則"
conditions:
  - "卒業見込／卒業済"
  - "内定取得済"
risk:
  - "許可前就労＝不法就労"
  - "申請遅れで入社日に間に合わず"
should_not_say:
  - "卒業前から就労できる"
material_bridge:
  - "在留資格変更許可申請書"
  - "卒業証明書（または卒業見込み証明書）"
  - "内定通知書・雇用契約書"
  - "会社の登記事項証明書・決算書"
  - "成績証明書・専攻証明"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00069.html"
```

---

## practical-133

```yaml
card_id: practical-133
bucket: ANSWER_RUNTIME
title: 永住者・定住者の就労制限なし
user_situation: "永住者・定住者・配偶者等で就労範囲を確認したい方"
short_answer: "永住・定住・配偶者等は就労制限なし。資格外活動許可不要。風俗業等は別法令。"
practical_rule: "永住者・定住者・日本人/永住者の配偶者等は就労制限なし。業種・雇用形態・労働時間・複数勤務先を問わず自由。資格外活動許可不要。但し医師・弁護士等の国家資格は別途取得必要。風俗業等は風営法等の別法令適用。"
official_anchor: "別表第2"
conditions:
  - "永住・定住・配偶者等のいずれか"
risk:
  - "—"
should_not_say:
  - "永住者でも就労業種に制限がある"
material_bridge:
  - "—（情報カード）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00045.html"
```

---

## practical-134

```yaml
card_id: practical-134
bucket: ANSWER_RUNTIME
title: 技人国の年収基準：300万円・同等以上の意味
user_situation: "技人国保持者で給与水準が要件を満たすか心配な方"
short_answer: "「日本人同等以上」が要件。300万円は実務目安で法的基準ではない。"
practical_rule: "技人国の報酬要件は「日本人と同等以上」。法律上の最低金額はない。実務目安は年収300万円だが法的基準ではない。300万円以下でも同職種の日本人賃金水準と同等を立証できれば許可されるケースあり。比較資料の準備が鍵。"
official_anchor: "上陸基準省令"
conditions:
  - "技人国の申請・更新段階"
risk:
  - "業界平均より著しく低い給与＝水準未達"
should_not_say:
  - "300万円以下なら絶対不許可"
material_bridge:
  - "雇用契約書（報酬額明記）"
  - "給与明細"
  - "同職種の日本人賃金水準比較資料"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-135

```yaml
card_id: practical-135
bucket: ANSWER_RUNTIME
title: 日本国内での離婚：在留資格への影響と手続
user_situation: "日本国内で離婚した／予定の外国人"
short_answer: "「日本人の配偶者等」の離婚は14日届出。次の資格変更を速やかに準備。"
practical_rule: "「日本人の配偶者等」で離婚＝14日以内届出。直ちに在留不可ではないが、根拠消滅で次資格（就労系・定住者等）変更申請を速やかに。日本人の子養育中なら「定住者」変更が選択肢。外国人同士の離婚は互いに影響なし（独立資格保持なら）。"
official_anchor: "入管法19条の16／22条の2"
conditions:
  - "離婚届受理済または成立予定"
risk:
  - "届出怠り＋6か月不活動で取消対象"
should_not_say:
  - "離婚しても今までの資格でずっと残れる"
material_bridge:
  - "所属機関変更届出書（婚姻関係消滅）"
  - "離婚証明書・戸籍謄本"
  - "次の在留資格への変更申請書類"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-136

```yaml
card_id: practical-136
bucket: ANSWER_RUNTIME
title: 「技術」と「技人国」の違い：2015年統合
user_situation: "古い在留カードで「技術」と記載されている方"
short_answer: "「技術」は2015年に廃止。新規取得不可。次回更新で「技人国」になる。"
practical_rule: "「技術」は2015年4月廃止、「技術・人文知識・国際業務（技人国）」に統合。新規取得不可。在留カードに「技術」と記載されていても在留期間内は有効で、次回更新時に「技人国」として更新される。「技能」とは別資格。"
official_anchor: "改正入管法（2015年）"
conditions:
  - "旧「技術」保持または知りたい"
risk:
  - "「技術」と「技能」を混同"
should_not_say:
  - "「技術」は今も新規取得できる"
material_bridge:
  - "—（情報カード）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-137

```yaml
card_id: practical-137
bucket: ANSWER_RUNTIME
title: 不法残留からの出国：自主出頭と強制退去の違い
user_situation: "不法残留状態にある外国人"
short_answer: "自主出頭で出国命令制度＝入国禁止1年。強制退去＝5年以上。即弁護士相談を。"
practical_rule: "不法残留＝自主出頭で出国命令制度活用→入国禁止1年以内。強制退去＝5年以上。但し不法就労歴あると出国命令制度が使えない可能性。出頭前に在留特別許可の可能性検討。弁護士・行政書士の事前相談が極めて重要。"
official_anchor: "入管法24条・55条の2（出国命令）"
conditions:
  - "不法残留状態"
risk:
  - "対応怠りで強制退去・5年以上の入国禁止"
should_not_say:
  - "出頭すれば必ず1年で戻れる"
material_bridge:
  - "（弁護士・行政書士相談を先行させる）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00132.html"
```

---

## practical-138

```yaml
card_id: practical-138
bucket: ANSWER_RUNTIME
title: 技人国の専攻と業務の関連性：文系理系の壁
user_situation: "大学専攻と就職業務の関連性が不明確な方"
short_answer: "「関連性」要件だが直接一致は不要。隣接分野・応用可能性で許可されるケースあり。"
practical_rule: "技人国は専攻と業務の「関連性」要件。直接一致は不要、隣接分野・応用可能性があれば認められ得る。完全無関係の専攻と業務は困難だが、理由書で関連性を丁寧に説明すれば許可されるケースもある。"
official_anchor: "上陸基準省令"
conditions:
  - "技人国申請段階"
  - "専攻と業務の関連性に不安"
risk:
  - "関連性立証不足で不許可"
should_not_say:
  - "専攻と業務が一致しないと絶対不可"
material_bridge:
  - "大学成績証明書・専攻科目一覧"
  - "業務内容説明書"
  - "理由書（関連性を丁寧に説明）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00001.html"
```

---

## practical-139

```yaml
card_id: practical-139
bucket: ANSWER_RUNTIME
title: 外国人のマイナンバーカード取得
user_situation: "マイナンバーカードを取るか迷う外国人"
short_answer: "在留3か月超は番号自動付番。カード取得は任意。銀行・確定申告等で利便性。"
practical_rule: "3か月超在留＝マイナンバー自動付番。カード取得は任意。銀行・確定申告・社会保険等で利便性。市区町村役場で申請（約1か月）。在留カードとマイナンバーカードの一体化が段階的に進行中。"
official_anchor: "マイナンバー法"
conditions:
  - "在留3か月超"
risk:
  - "カードなしで電子申請の利便性なし"
should_not_say:
  - "外国人はマイナンバー対象外"
material_bridge:
  - "マイナンバーカード申請書（市区町村またはアプリ）"
  - "在留カード（受取時の本人確認）"
source_urls:
  - "https://www.kojinbango-card.go.jp/"
```

---

## practical-140

```yaml
card_id: practical-140
bucket: ANSWER_RUNTIME
title: 技能実習廃止と育成就労移行：在留中の実習生
user_situation: "技能実習中で2024年改正の影響を確認したい方"
short_answer: "技能実習は2027年頃まで継続。現実習生は経過措置で在留可。特定技能移行ルートも利用可。"
practical_rule: "技能実習は2024年改正で廃止決定、「育成就労」へ段階的移行（施行2027年頃予定）。現在の実習生は引き続き技能実習で在留可、特定技能1号移行ルートも現在と同様。育成就労は新規入国者から適用予定、経過措置あり。"
official_anchor: "改正入管法・育成就労法（2024）"
conditions:
  - "技能実習中"
risk:
  - "改正情報の取り違えで誤った計画"
should_not_say:
  - "技能実習はすでに使えない"
material_bridge:
  - "特定技能1号変更申請書類"
  - "育成就労制度の詳細は施行後確認"
source_urls:
  - "https://www.moj.go.jp/isa/policies/policies/03_00021.html"
```

---

## practical-141

```yaml
card_id: practical-141
bucket: ANSWER_RUNTIME
title: 技人国・産育休と在留資格への影響
user_situation: "技人国保持で出産・育児休業中の方"
short_answer: "産育休中は雇用契約継続のため技人国OK。3か月ルール対象外。"
practical_rule: "産前産後休業・育児休業中は雇用契約継続のため在留資格の「活動不従事」に該当せず、3か月ルール対象外。育児休業中でも更新申請可能。育児休業中である旨を在職証明書に明記＋復職予定確認書類を添付。"
official_anchor: "入管法22条の4／育児・介護休業法"
conditions:
  - "技人国保持・産育休中"
risk:
  - "育児休業証明不備で「活動なし」と誤認"
should_not_say:
  - "産育休中は技人国が失効する"
material_bridge:
  - "育児休業証明書（開始日・復職予定日記載）"
  - "在職証明書（育児休業中の明記）"
  - "子の在留資格申請書類（出生後60日以内）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html"
```

---

## practical-142

```yaml
card_id: practical-142
bucket: ANSWER_RUNTIME
title: 高度専門職の配偶者の就労許可
user_situation: "高度専門職保持者の配偶者で就労したい方"
short_answer: "高度専門職配偶者は特定活動（就労可）で週28時間制限なし。但し指定書範囲内。"
practical_rule: "高度専門職1号・2号の配偶者は「特定活動（就労可）」で在留。通常の家族滞在と異なり週28時間制限なし、資格外活動許可不要。但し就労業種・条件は指定書記載範囲内。単純労働は制限される場合あり。"
official_anchor: "特定活動告示・高度専門職告示"
conditions:
  - "高度専門職の配偶者"
risk:
  - "指定書範囲外の業務に従事＝資格外活動"
should_not_say:
  - "高度専門職配偶者なら何でも就労できる"
material_bridge:
  - "パスポート（指定書確認）"
  - "高度専門職配偶者の在留資格申請書類"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00168.html"
```

---

## practical-143

```yaml
card_id: practical-143
bucket: ANSWER_RUNTIME
title: 在留期間更新の「在留状況良好」要件
user_situation: "在留期間更新を控えて公的義務の履行状況が心配な方"
short_answer: "住民税・健保滞納は更新期間短縮要因。更新前完納＋納税証明書準備。"
practical_rule: "在留期間更新は「在留状況の良好性」を審査。住民税・国民健康保険料滞納は更新期間短縮要因。更新前完済＋納税証明書準備を強く推奨。住所変更届出違反・交通違反・犯罪歴も影響。社会保険未加入は雇用主に確認。"
official_anchor: "入管法21条"
conditions:
  - "更新申請段階"
risk:
  - "直近滞納で1年更新短縮"
  - "未加入で更新拒否リスク"
should_not_say:
  - "後で払うから今は申請してよい"
material_bridge:
  - "住民税・国民健保納付証明書"
  - "社会保険加入証明（健保証・年金記録）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/procedures/16-3.html"
```

---

## practical-144

```yaml
card_id: practical-144
bucket: ANSWER_RUNTIME
title: 経営管理：管理者（マネージャー）要件
user_situation: "雇用された外国人幹部として経営管理ビザを取りたい方"
short_answer: "代表者以外でもCOO・支店長等の実質的経営管理権限者は対象。肩書ではなく実質権限が鍵。"
practical_rule: "経営管理は代表者だけでなくCOO・支店長・工場長等の実質的経営管理権限者も対象。採用・解雇・予算執行等の実質的管理権限の証明が必要。一般的な課長・部長は技人国。肩書ではなく実質権限が審査基準。"
official_anchor: "別表第1の2「経営管理」"
conditions:
  - "実質的経営管理権限あり"
risk:
  - "肩書だけで実権なし＝不許可"
should_not_say:
  - "管理職なら全部経営管理"
material_bridge:
  - "雇用契約書（役職・権限明記）"
  - "組織図（報告ライン・管理範囲）"
  - "業務内容説明書（管理業務の詳細）"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-145

```yaml
card_id: practical-145
bucket: ANSWER_RUNTIME
title: 帰化の独立生計要件：年収・資産・配偶者収入
user_situation: "帰化申請の独立生計要件をクリアできるか心配な方"
short_answer: "世帯収入で判断（配偶者収入合算可）。法定最低額なしだが目安世帯年収200万円以上。生活保護中は困難。"
practical_rule: "帰化の独立生計要件は申請者本人だけでなく配偶者収入を合算した世帯収入で判断。専業主婦（主夫）でも配偶者収入が安定すれば充足可。法令上の最低額なしだが実務目安は世帯年収200万円以上。生活保護受給中は困難。"
official_anchor: "国籍法5条（独立生計要件）"
conditions:
  - "世帯収入の証明可能"
  - "生活保護受給なし"
risk:
  - "世帯収入の安定性不足"
should_not_say:
  - "本人収入だけで判断される"
material_bridge:
  - "源泉徴収票・確定申告書"
  - "配偶者の源泉徴収票"
  - "預貯金残高証明書"
source_urls:
  - "https://www.moj.go.jp/MINJI/minji78.html"
```

---

## practical-146

```yaml
card_id: practical-146
bucket: ANSWER_RUNTIME
title: 在留申請のオンライン申請：利用と本人確認
user_situation: "オンライン申請を本人または行政書士経由で行いたい方"
short_answer: "マイナンバーカードまたは行政書士経由でオンライン申請可。窓口と審査結果差なし。"
practical_rule: "在留期間更新・変更等の申請をISAオンラインシステムで実施可。本人申請＝マイナンバーカード必須、行政書士経由も可。窓口出頭不要、結果はメール通知。新在留カードは郵便または窓口受取。窓口とオンラインで審査結果に差なし。"
official_anchor: "施行規則改正（2022〜）"
conditions:
  - "更新・変更申請対象"
  - "マイナンバーカードまたは取次依頼"
risk:
  - "システムからの通知見落とし"
should_not_say:
  - "オンライン申請は審査が早い"
material_bridge:
  - "マイナンバーカード（本人申請時）"
  - "ISA在留申請オンラインシステムのアカウント"
source_urls:
  - "https://www.isa.go.jp/"
```

---

## practical-147

```yaml
card_id: practical-147
bucket: ANSWER_RUNTIME
title: 外国人の確定申告：対象者・方法
user_situation: "副業・複数雇用主・フリーランスがある外国人"
short_answer: "1社年末調整のみは不要。副業20万円超・複数雇用主・フリーランスは確定申告必要。"
practical_rule: "日本在住外国人は所得税の「居住者」として確定申告対象。1社の給与のみで年末調整済なら不要。副業収入20万円超・複数雇用主・フリーランスは確定申告必要。e-Tax＋マイナンバーカードでオンライン申告可。税務署外国人相談窓口または税理士相談。"
official_anchor: "所得税法"
conditions:
  - "副業収入・複数雇用主・フリーランスのいずれか"
risk:
  - "申告漏れで加算税・更新審査影響"
should_not_say:
  - "外国人は確定申告不要"
material_bridge:
  - "源泉徴収票（雇用主から）"
  - "副業・フリーランス収入記録"
  - "マイナンバーカード（e-Tax利用時）"
source_urls:
  - "https://www.nta.go.jp/"
```

---

## practical-148

```yaml
card_id: practical-148
bucket: ANSWER_RUNTIME
title: 外国人の雇用保険（失業給付）
user_situation: "技人国・特定技能等で失業して失業給付を希望する方"
short_answer: "雇用保険は在留資格不問。失業給付受給中も在留継続可。3か月超の活動空白は取消リスク。"
practical_rule: "雇用保険（失業給付）は在留資格の種類に関係なく加入条件を満たした外国人労働者に適用。失業後はハローワークで求職者登録・失業給付申請、活動記録残し必須。受給中も在留継続可だが、3か月超の活動空白は取消リスク。"
official_anchor: "雇用保険法／入管法22条の4"
conditions:
  - "雇用保険加入条件を満たす"
  - "離職"
risk:
  - "活動記録未維持で「正当理由なし」判断"
should_not_say:
  - "失業給付を受給すれば在留は安泰"
material_bridge:
  - "ハローワーク求職者登録票・活動記録"
  - "雇用保険被保険者証"
  - "ISA所属機関変更届出書"
source_urls:
  - "https://www.hellowork.mhlw.go.jp/"
```

---

## practical-149

```yaml
card_id: practical-149
bucket: ANSWER_RUNTIME
title: 経営管理：常勤職員2名要件
user_situation: "経営管理ビザでひとり会社・小規模設立を考える方"
short_answer: "「常勤職員2名以上」または「500万円以上投資」の選択要件。ひとり会社でも投資要件で可。"
practical_rule: "経営管理は「常勤職員2名以上」または「500万円以上の事業投資」の選択要件。パート・非常勤は常勤に含まれない。代表者1人会社でも500万円投資要件充足で申請可。投資は資本金・設備・在庫等の実質投資で証明。"
official_anchor: "上陸基準省令（経営管理）"
conditions:
  - "経営管理の新規申請"
risk:
  - "非常勤を常勤と誤認"
  - "見せ金投資が発覚"
should_not_say:
  - "従業員2名がいないと取れない"
material_bridge:
  - "雇用保険・社会保険加入証明（常勤証明）"
  - "銀行通帳（500万円投資証明）"
  - "設備購入領収書・賃貸契約書"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html"
```

---

## practical-150

```yaml
card_id: practical-150
bucket: ANSWER_RUNTIME
title: 特定技能1号5年満了後の選択肢
user_situation: "特定技能1号で5年満了が近づいている方"
short_answer: "1号は通算5年が上限。2号移行・他資格変更で継続可能。5年=強制帰国ではない。"
practical_rule: "特定技能1号は通算5年が上限、同1号での更新不可。但し特定技能2号（対象分野のみ）・技人国・経営管理等への変更で日本継続可能。「5年＝強制帰国」ではない。5年到達の2〜3年前から移行計画開始を推奨。"
official_anchor: "特定技能告示"
conditions:
  - "特定技能1号で在留中"
  - "通算5年が近い"
risk:
  - "計画未準備で5年満了時に帰国一択"
should_not_say:
  - "5年経ったら必ず帰国"
material_bridge:
  - "特定技能2号変更申請書類"
  - "技人国変更申請書類"
source_urls:
  - "https://www.moj.go.jp/isa/applications/guide/nyuukokukanri01_00127.html"
```

---

## 注記

- Batch 03 は practical-101〜150。ANSWER_RUNTIME=49、MATERIALS_ONLY=1（practical-120）。
- 母カード全文は `docs/practical-fact-layer/cards/practical-XXX.md` 参照。
