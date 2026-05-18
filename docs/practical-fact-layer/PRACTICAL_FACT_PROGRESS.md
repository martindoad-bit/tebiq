# Practical Fact Layer — Progress Tracker

> **角色**: FACT 实务层事实生产窗口  
> **目标**: 让 TEBIQ 的答案在实务准确度、可信度、材料连接能力上超过 DeepSeek 4 Pro 联网版  
> **批次节奏**: 每20张卡更新一次本文件 + commit + push  
> **last_updated**: 2026-05-19

---

## 全局计数

| 指标 | 当前值 |
|------|--------|
| 已完成卡片数 | 260 |
| DOMAIN 队列总数 | 9 |
| ANSWER_RUNTIME 可注入 | 253 |
| MATERIALS_ONLY | 7 |
| L5_ONLY | 0 |
| NEEDS_REWRITE | 0 |
| 已完成批次 | 13 |

---

## Batch 1 状态（目标: 20张）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-001 | 配偶者等：離婚後14日届出と取消リスク | ✅ | ANSWER_RUNTIME | P0 |
| practical-002 | 配偶者等：離婚後の在留継続（正当理由・6か月経過後申請） | ✅ | ANSWER_RUNTIME | P0 |
| practical-003 | 配偶者等：配偶者死亡後の在留と次ステップ | ✅ | ANSWER_RUNTIME | P1 |
| practical-004 | 配偶者等：再婚後の在留資格維持と新規申請 | ✅ | ANSWER_RUNTIME | P1 |
| practical-005 | 経営管理：申請時の事務所要件の実務（バーチャルオフィス問題） | ✅ | ANSWER_RUNTIME | P0 |
| practical-006 | 経営管理：赤字継続・休眠会社の更新実務 | ✅ | ANSWER_RUNTIME | P0 |
| practical-007 | 技人国：転職時の14日届出と就労継続可否 | ✅ | ANSWER_RUNTIME | P0 |
| practical-008 | 技人国：転職後の在留資格変更 vs 更新の選択 | ✅ | ANSWER_RUNTIME | P1 |
| practical-009 | 技人国：副業・兼業の可否と資格外活動 | ✅ | ANSWER_RUNTIME | P1 |
| practical-010 | 永住：公的義務（住民税・社会保険）の審査実務 | ✅ | ANSWER_RUNTIME | P0 |
| practical-011 | 永住：申請後の在留カード有効期限と特例期間 | ✅ | ANSWER_RUNTIME | P1 |
| practical-012 | 留学：卒業後の在留期間と「就職活動」特定活動への切替 | ✅ | ANSWER_RUNTIME | P1 |
| practical-013 | 留学：アルバイト時間超過（週28時間）の影響と更新リスク | ✅ | ANSWER_RUNTIME | P0 |
| practical-014 | 家族滞在：資格外活動許可（週28時間）と就労制限実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-015 | 家族滞在：本体者（主在留者）の喪失時の対応 | ✅ | ANSWER_RUNTIME | P0 |
| practical-016 | 不許可・特例期間：不許可後の就労継続と再申請 | ✅ | ANSWER_RUNTIME | P0 |
| practical-017 | 住所届出：転居14日届出義務と在留カード記載住所の実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-018 | 材料層：就労系在留資格更新時の標準添付書類チェックリスト | ✅ | MATERIALS_ONLY | P1 |
| practical-019 | 高度専門職：ポイント計算の頻出誤解（学歴・年収・ボーナス算入） | ✅ | ANSWER_RUNTIME | P1 |
| practical-020 | 特定技能1号：5年満了後の3択と実務上の落とし穴 | ✅ | ANSWER_RUNTIME | P1 |

---

## DOMAIN 高リスク送付待ち

| card_id | DOMAIN問題 | priority |
|---------|-----------|----------|
| practical-001 | 「正当な理由」の現場認定基準（ISA窓口の裁量範囲） | P0 |
| practical-002 | 離婚後定住者申請の実際の審査基準（離婚理由・在留実態の評価） | P0 |
| practical-005 | バーチャルオフィス不可の根拠と実際の合否事例 | P0 |
| practical-006 | 赤字・休眠法人の更新で「事業継続意思」を示す書面の公式要件 | P0 |
| practical-010 | 永住申請で「直近5年」の社会保険完納要件の具体的確認方法 | P0 |
| practical-016 | 不許可後の在留特例期間の起算点と就労継続の法的根拠 | P0 |
| practical-055 | 出国命令制度の「不法就労があっても適用される場合の基準」（ISA裁量範囲） | P0 |
| practical-105 | 同性パートナー向け特定活動（人道的配慮）の具体的要件・申請実績（2023年以降） | P1 |
| practical-205 | 子なし離婚後の定住者（告示外）申請における在留実績の具体的な審査基準 | P0 |

---

## Source Log — Batch 1

| ref | source | URL | checked_at |
|-----|--------|-----|-----------|
| isa-haigusha | ISA「日本人の配偶者等」ページ | https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00126.html | 2026-05-18 |
| isa-tokutei-katsudo | ISA 特定活動告示リスト | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html | 2026-05-18 |
| isa-keiei-kanri | ISA「経営・管理」ページ | https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00036.html | 2026-05-18 |
| isa-gijinkoku | ISA「技術・人文知識・国際業務」ページ | https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00037.html | 2026-05-18 |
| isa-eijuu | ISA「永住者」ページ | https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00123.html | 2026-05-18 |
| isa-ryugaku | ISA「留学」ページ | https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00038.html | 2026-05-18 |
| isa-kazoku-taizai | ISA「家族滞在」ページ | https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00039.html | 2026-05-18 |
| isa-tokurei-kikan | ISA「在留資格の特例期間」説明 | https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00109.html | 2026-05-18 |
| isa-koshin | ISA「在留期間の更新」 | https://www.moj.go.jp/isa/applications/procedures/16-3.html | 2026-05-18 |
| nyukan-ho-22-2 | 入管法第22条の2（活動不従事による取消） | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-18 |
| nyukan-ho-19 | 入管法第19条（資格外活動の禁止・許可） | https://laws.e-gov.go.jp/law/326AC0000000319 | 2026-05-18 |
| isa-tsuuchi | ISA「所属機関等に関する届出」 | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html | 2026-05-18 |
| isa-tokuten | ISA「高度専門職ポイント計算表」 | https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00168.html | 2026-05-18 |
| isa-tokutei-gino | ISA「特定技能」ページ | https://www.moj.go.jp/isa/applications/guide/nyuukokukanri07_00216.html | 2026-05-18 |

---

## Batch 1 Handoff Note

- 完成日: 2026-05-18
- 担当: FACT Operator (Claude)
- コミット: 7d0af42
- DOMAIN送付済み: pending

---

## Batch 2 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-021 | 永住：在留歴10年の計算と5年就労・居住要件 | ✅ | ANSWER_RUNTIME | P0 |
| practical-022 | 再入国許可：みなし1年と正規5年の選択 | ✅ | ANSWER_RUNTIME | P1 |
| practical-023 | 帰化：永住との違い・帰化フロー | ✅ | ANSWER_RUNTIME | P1 |
| practical-024 | 技能実習→特定技能への移行要件 | ✅ | ANSWER_RUNTIME | P1 |
| practical-025 | 在留カード紛失・盗難・破損時の対応 | ✅ | ANSWER_RUNTIME | P1 |
| practical-026 | 「研究」と「技人国」の違い（大学研究員vs企業R&D） | ✅ | ANSWER_RUNTIME | P1 |
| practical-027 | 在留期間の長さ（1年・3年・5年）の決定要因 | ✅ | ANSWER_RUNTIME | P1 |
| practical-028 | 雇用主の外国人雇用届出義務と不法就労助長罪 | ✅ | ANSWER_RUNTIME | P1 |
| practical-029 | 特定活動46号（日本の大卒+高度日本語）の実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-030 | 在留資格取消：類型・手続き・取消後の対応 | ✅ | ANSWER_RUNTIME | P0 |
| practical-031 | 技人国→経営管理：代表取締役就任時の変更 | ✅ | ANSWER_RUNTIME | P1 |
| practical-032 | 在留申請オンラインシステムの実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-033 | 定住者：日本人の実子を養育する外国人親 | ✅ | ANSWER_RUNTIME | P1 |
| practical-034 | 配偶者等：申請書類と審査のポイント | ✅ | MATERIALS_ONLY | P1 |
| practical-035 | 技人国の業務適合性：文系卒が理系業務に就く場合 | ✅ | ANSWER_RUNTIME | P1 |
| practical-036 | 在留資格「介護」：4ルート比較と国家資格要件 | ✅ | ANSWER_RUNTIME | P1 |
| practical-037 | 在留申請の補正（追加書類要求）への対応 | ✅ | ANSWER_RUNTIME | P1 |
| practical-038 | 特定活動の指定書と主要告示番号 | ✅ | ANSWER_RUNTIME | P1 |
| practical-039 | 在留資格「技能」：料理人・スポーツ選手等 | ✅ | ANSWER_RUNTIME | P1 |
| practical-040 | 行政書士活用：費用相場・依頼すべきケース | ✅ | ANSWER_RUNTIME | P1 |

## Batch 2 Handoff Note

- 完成日: 2026-05-18
- 担当: FACT Operator (Claude)
- コミット: bcfd554

---

## Batch 3 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-041 | COEから入国まで：海外在住者の呼び寄せ入国フロー | ✅ | ANSWER_RUNTIME | P1 |
| practical-042 | 外国人の子どもの在留資格（来日帯同・日本生まれ以外） | ✅ | ANSWER_RUNTIME | P1 |
| practical-043 | 就労系在留資格とリストラ・会社倒産の影響 | ✅ | ANSWER_RUNTIME | P0 |
| practical-044 | 永住者の義務：在留カード7年更新・住所届出等 | ✅ | ANSWER_RUNTIME | P1 |
| practical-045 | 技人国の月額報酬基準：日本人同等以上要件の実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-046 | 特定技能：登録支援機関と支援計画義務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-047 | 特定技能1号の転職制限：同分野内のみ | ✅ | ANSWER_RUNTIME | P1 |
| practical-048 | 在留資格「教育」：学校教員の要件と認定 | ✅ | ANSWER_RUNTIME | P1 |
| practical-049 | 定住者の告示類型：日系人・中国帰国者・離婚後等 | ✅ | ANSWER_RUNTIME | P1 |
| practical-050 | 外国人の銀行口座・携帯電話・クレジットカード開設 | ✅ | ANSWER_RUNTIME | P1 |
| practical-051 | 永住者の配偶者等：活動制限なし・離婚後の取扱い | ✅ | ANSWER_RUNTIME | P1 |
| practical-052 | 技人国の学歴要件：専門学校・高専・海外大学の扱い | ✅ | ANSWER_RUNTIME | P1 |
| practical-053 | 在留資格「芸術」「文化活動」：芸術家・音楽家の申請実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-054 | 高度専門職ポイント計算の実務（学歴・年収・資格の詳細） | ✅ | ANSWER_RUNTIME | P1 |
| practical-055 | 技能実習生の失踪後：不法残留・在留資格回復・特定技能移行の実態 | ✅ | ANSWER_RUNTIME | P0 |
| practical-056 | 技人国のグレーゾーン業務：現場作業・単純労働との境界 | ✅ | ANSWER_RUNTIME | P0 |
| practical-057 | 日本で生まれた外国人の子ども：出生後60日以内の在留資格申請 | ✅ | ANSWER_RUNTIME | P0 |
| practical-058 | 特定技能2号への移行要件：試験・実績・対象分野の実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-059 | 在留資格「宗教」「報道」：特殊カテゴリの要件と実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-060 | 技人国・就労系在留資格からの永住申請：在留歴計算と就労歴の扱い | ✅ | ANSWER_RUNTIME | P1 |

## Batch 3 Handoff Note

- 完成日: 2026-05-18
- 担当: FACT Operator (Claude)
- コミット: fc4cdd5

---

## Batch 4 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-061 | 難民認定申請の実務：申請中の在留と就労 | ✅ | ANSWER_RUNTIME | P0 |
| practical-062 | 仮放免制度：退去強制手続中の在留実態と制限 | ✅ | ANSWER_RUNTIME | P0 |
| practical-063 | 技能実習の3年・5年計算と転籍の例外 | ✅ | ANSWER_RUNTIME | P1 |
| practical-064 | 経営管理：500万円投資要件の認定実務 | ✅ | ANSWER_RUNTIME | P0 |
| practical-065 | 就労系→配偶者等への在留資格変更（日本人と結婚） | ✅ | ANSWER_RUNTIME | P1 |
| practical-066 | 外国人の国民健康保険・厚生年金加入義務と脱退一時金 | ✅ | ANSWER_RUNTIME | P1 |
| practical-067 | 特定技能の転職・離職時の届出と就職活動期間中の在留 | ✅ | ANSWER_RUNTIME | P0 |
| practical-068 | 永住申請の「素行善良」要件：交通違反・税滞納の影響 | ✅ | ANSWER_RUNTIME | P1 |
| practical-069 | 帰化申請の実務書類と審査期間・不許可後の再申請 | ✅ | ANSWER_RUNTIME | P1 |
| practical-070 | 二重国籍の取扱い：日本法における禁止と実態 | ✅ | ANSWER_RUNTIME | P1 |
| practical-071 | 特別永住者：コリアン・中国系の在留特典と手続き | ✅ | ANSWER_RUNTIME | P1 |
| practical-072 | 在留資格「教授」：大学教員の申請要件と技人国との使い分け | ✅ | ANSWER_RUNTIME | P1 |
| practical-073 | 技人国で3か月就労空白：無職期間と在留資格への影響 | ✅ | ANSWER_RUNTIME | P0 |
| practical-074 | 経営管理の代表者給与：役員報酬の月額基準と実務審査 | ✅ | ANSWER_RUNTIME | P0 |
| practical-075 | 国際結婚の手続き：日本での婚姻届と本国への届出 | ✅ | ANSWER_RUNTIME | P1 |
| practical-076 | 留学から就労への移行：卒業後の在留資格変更 | ✅ | ANSWER_RUNTIME | P1 |
| practical-077 | 在留資格「法律・会計業務」：外国弁護士・公認会計士 | ✅ | ANSWER_RUNTIME | P1 |
| practical-078 | 在留資格「研究」：企業研究者と大学研究員の使い分け | ✅ | ANSWER_RUNTIME | P1 |
| practical-079 | 在留申請時の「理由書」作成の実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-080 | 在留資格「企業内転勤」：多国籍企業の社内転勤と実務要件 | ✅ | ANSWER_RUNTIME | P1 |

## Batch 4 Handoff Note

- 完成日: 2026-05-18
- 担当: FACT Operator (Claude)
- コミット: 13c3ffb

---

## Batch 5 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-081 | 高度専門職→永住特例：1年・3年短縮要件の詳細実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-082 | 育成就労制度：2024年法改正の内容と移行スケジュール | ✅ | ANSWER_RUNTIME | P1 |
| practical-083 | 留学中の休学・退学と在留資格への影響 | ✅ | ANSWER_RUNTIME | P0 |
| practical-084 | 短期滞在からの在留資格変更：禁止原則と例外 | ✅ | ANSWER_RUNTIME | P0 |
| practical-085 | 配偶者ビザ申請の実態審査：婚姻真正性とチェックポイント | ✅ | ANSWER_RUNTIME | P1 |
| practical-086 | 外国人が日本でフリーランス（個人事業主）として活動する在留資格 | ✅ | ANSWER_RUNTIME | P1 |
| practical-087 | 永住者の配偶者等から永住申請：短縮要件と必要書類 | ✅ | ANSWER_RUNTIME | P1 |
| practical-088 | 在留カード不携帯・提示拒否の罰則と実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-089 | 経営管理：外国企業の日本支店・支社設立と在留資格 | ✅ | ANSWER_RUNTIME | P1 |
| practical-090 | 在留資格「医療」：外国の医師・看護師の日本での活動 | ✅ | ANSWER_RUNTIME | P1 |
| practical-091 | 在留カードの偽造・借用・不正使用：罰則と関係者の責任 | ✅ | ANSWER_RUNTIME | P0 |
| practical-092 | 技人国の「国際業務」：外国文化に基盤を置く活動の範囲 | ✅ | ANSWER_RUNTIME | P1 |
| practical-093 | 永住申請書類チェックリスト（2024年改定後・就労系） | ✅ | MATERIALS_ONLY | P1 |
| practical-094 | 特定技能受入機関の義務：支援計画・定期報告・届出 | ✅ | ANSWER_RUNTIME | P1 |
| practical-095 | 在留資格「技能」：熟練した技能の証明と職種別要件（詳細） | ✅ | ANSWER_RUNTIME | P1 |
| practical-096 | 技人国でのテレワーク・リモートワーク：在留資格への影響 | ✅ | ANSWER_RUNTIME | P1 |
| practical-097 | 在留申請の「事前相談」制度：ISAへの問い合わせの使い方 | ✅ | ANSWER_RUNTIME | P1 |
| practical-098 | 高度専門職2号の特典と申請：永住に近い在留資格の実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-099 | 「引き続き在留」の計算：出国日数が在留要件に与える影響 | ✅ | ANSWER_RUNTIME | P1 |
| practical-100 | 在留申請の不許可後の対応：審査請求・再申請の実務 | ✅ | ANSWER_RUNTIME | P0 |

## Batch 5 Handoff Note

- 完成日: 2026-05-18
- 担当: FACT Operator (Claude)
- コミット: e0fdd58
- DOMAIN送付済み: pending（pdom-001〜007）

---

## Batch 6 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-101 | 経営管理の「経営者・管理者」要件：実質的権限と組織規模 | ✅ | ANSWER_RUNTIME | P1 |
| practical-102 | ワーキングホリデービザの実務：同一雇用主制限と一度限りルール | ✅ | ANSWER_RUNTIME | P1 |
| practical-103 | 外国人の不動産取得・住宅ローン・賃貸契約の実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-104 | 技人国の試用期間中の在留資格と本採用不成立のリスク | ✅ | ANSWER_RUNTIME | P0 |
| practical-105 | 配偶者が内縁関係・同性パートナーの場合の在留資格 | ✅ | ANSWER_RUNTIME | P1 |
| practical-106 | 在留資格変更申請中（特例期間）の転職：取下げ・再申請 | ✅ | ANSWER_RUNTIME | P0 |
| practical-107 | 技人国での派遣社員就労：所属機関と業務適合性 | ✅ | ANSWER_RUNTIME | P0 |
| practical-108 | 在留資格の複数保有不可：単一在留資格原則と複数活動の管理 | ✅ | ANSWER_RUNTIME | P1 |
| practical-109 | 技人国での業務委託契約（雇用なし）の可否 | ✅ | ANSWER_RUNTIME | P1 |
| practical-110 | 特定活動告示番号（主要）と在留目的別の使い分け | ✅ | ANSWER_RUNTIME | P1 |
| practical-111 | 永住申請の身元保証人：要件・責任・保証人が見つからない場合 | ✅ | ANSWER_RUNTIME | P1 |
| practical-112 | 高度専門職1号の「指定書」：転職・副業への影響と手続き | ✅ | ANSWER_RUNTIME | P0 |
| practical-113 | 経営管理ビザで複数会社を掛け持ちする経営者の在留管理 | ✅ | ANSWER_RUNTIME | P1 |
| practical-114 | 外国人の運転免許：外国免許の日本切替と学科試験 | ✅ | ANSWER_RUNTIME | P1 |
| practical-115 | 外国人の生活保護受給：在留資格別の受給資格と実務運用 | ✅ | ANSWER_RUNTIME | P1 |
| practical-116 | 外国人労働者の本国送金：外為規制・送金制限・マイナンバー | ✅ | ANSWER_RUNTIME | P1 |
| practical-117 | 在留申請書類の公証・アポスティーユ：必要な場面と手続き | ✅ | ANSWER_RUNTIME | P1 |
| practical-118 | 技人国での社内「職種変更」：業務が変わった場合の在留管理 | ✅ | ANSWER_RUNTIME | P1 |
| practical-119 | 海外配偶者の呼び寄せCOE申請：必要書類と審査のポイント | ✅ | ANSWER_RUNTIME | P1 |
| practical-120 | 特定活動（EPA介護）から「介護」への在留資格変更要件 | ✅ | MATERIALS_ONLY | P1 |

## Batch 6 Handoff Note

- 完成日: 2026-05-19
- 担当: FACT Operator (Claude)
- コミット: a3cb417
- 新規DOMAIN: pdom-008（同性パートナー向け特定活動の要件実態）
- DOMAIN送付済み: pending（pdom-001〜008）

---

## Batch 7 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-121 | 在留資格「文化活動」：報酬なし要件と留学との違い | ✅ | ANSWER_RUNTIME | P1 |
| practical-122 | 技人国の「継続的就労」：無職期間3か月ルールの詳細と就職活動記録 | ✅ | ANSWER_RUNTIME | P0 |
| practical-123 | 日本での起業：合同会社vs株式会社と経営管理ビザの関係 | ✅ | ANSWER_RUNTIME | P1 |
| practical-124 | 特定技能：受入機関変更（転職）手続きと空白期間 | ✅ | ANSWER_RUNTIME | P0 |
| practical-125 | 「投資・経営」廃止と「経営管理」への移行：歴史的経緯 | ✅ | ANSWER_RUNTIME | P1 |
| practical-126 | 外国人の日本での遺産相続・相続税 | ✅ | ANSWER_RUNTIME | P1 |
| practical-127 | 在留申請の「申請人本人申請」vs「代理人申請」 | ✅ | ANSWER_RUNTIME | P1 |
| practical-128 | 在留資格「教育」：外国語指導助手（ALT）と学校教員 | ✅ | ANSWER_RUNTIME | P1 |
| practical-129 | 「みなし再入国許可」：1年以内の出国と失効リスク | ✅ | ANSWER_RUNTIME | P1 |
| practical-130 | 外国人労働者の労働災害（労災）：在留資格不問で適用 | ✅ | ANSWER_RUNTIME | P1 |
| practical-131 | 在留カードの住所と実際の住所が異なる場合のリスク | ✅ | ANSWER_RUNTIME | P0 |
| practical-132 | 留学ビザから技人国への変更：卒業後の在留資格切替実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-133 | 永住者・定住者の就労制限なし：範囲と別法規制の関係 | ✅ | ANSWER_RUNTIME | P1 |
| practical-134 | 技人国の「年収基準」：300万円目安の実務的解釈 | ✅ | ANSWER_RUNTIME | P1 |
| practical-135 | 外国人の日本での離婚：在留資格への影響と後続手続き | ✅ | ANSWER_RUNTIME | P0 |
| practical-136 | 在留資格「技術」と「技人国」の違い：2015年統合後の整理 | ✅ | ANSWER_RUNTIME | P1 |
| practical-137 | 不法残留（オーバーステイ）からの出国・正規化の選択肢 | ✅ | ANSWER_RUNTIME | P0 |
| practical-138 | 技人国の「大学の専攻と業務の関連性」：許容範囲と実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-139 | 外国人のマイナンバーカード取得：義務・メリット・方法 | ✅ | ANSWER_RUNTIME | P1 |
| practical-140 | 技能実習制度廃止と育成就労制度への移行：在留中実習生の扱い | ✅ | ANSWER_RUNTIME | P1 |

## Batch 7 Handoff Note

- 完成日: 2026-05-19
- 担当: FACT Operator (Claude)
- コミット: 17f4ad7
- DOMAIN送付済み: pending（pdom-001〜008）

---

## Batch 8 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-141 | 技人国・在留中の出産・育児休業：在留資格への影響と届出 | ✅ | ANSWER_RUNTIME | P1 |
| practical-142 | 高度専門職の配偶者の就労許可：特定活動（就労可）の範囲 | ✅ | ANSWER_RUNTIME | P1 |
| practical-143 | 在留期間更新の「在留状況良好」要件：税金・保険・行政義務の実態 | ✅ | ANSWER_RUNTIME | P1 |
| practical-144 | 経営管理ビザの「管理者（マネージャー）」要件：雇用された外国人幹部 | ✅ | ANSWER_RUNTIME | P1 |
| practical-145 | 帰化申請の「独立生計要件」：年収基準・配偶者収入の合算 | ✅ | ANSWER_RUNTIME | P1 |
| practical-146 | 在留申請のオンライン申請：利用できる申請種類と本人確認方法 | ✅ | ANSWER_RUNTIME | P1 |
| practical-147 | 外国人の日本での確定申告：対象者・申告方法・在留資格との関係 | ✅ | ANSWER_RUNTIME | P1 |
| practical-148 | 外国人の雇用保険（失業給付）：受給資格と在留期間の関係 | ✅ | ANSWER_RUNTIME | P1 |
| practical-149 | 経営管理の「常勤職員2名」要件：非常勤・パートの扱い | ✅ | ANSWER_RUNTIME | P0 |
| practical-150 | 特定技能1号の在留期間上限5年到達後の選択肢 | ✅ | ANSWER_RUNTIME | P0 |
| practical-151 | 外国人の養子縁組と在留資格：日本での養子・海外からの養子 | ✅ | ANSWER_RUNTIME | P1 |
| practical-152 | 技能実習から特定技能への移行：試験免除の条件と必要書類 | ✅ | ANSWER_RUNTIME | P1 |
| practical-153 | 永住申請の「10年在留歴」計算：短期滞在・出国期間の扱い | ✅ | ANSWER_RUNTIME | P1 |
| practical-154 | 技人国での「長期出張・海外赴任」：在留資格への影響 | ✅ | ANSWER_RUNTIME | P1 |
| practical-155 | 日系人（2世・3世）の定住者ビザと日系4世制度 | ✅ | ANSWER_RUNTIME | P1 |
| practical-156 | 外国人の老齢・障害・遺族年金：在留資格・国籍と年金受給権 | ✅ | ANSWER_RUNTIME | P1 |
| practical-157 | 経営管理ビザ更新時の「赤字・実績なし」対応：1年許可の実態 | ✅ | ANSWER_RUNTIME | P0 |
| practical-158 | 技人国の「学歴代替：実務経験10年」：来日後就労経験は使えない | ✅ | ANSWER_RUNTIME | P1 |
| practical-159 | 帰化申請の「日本語能力」要件：試験・基準・実際の審査 | ✅ | ANSWER_RUNTIME | P1 |
| practical-160 | 特定技能2号の現在の対象分野と試験：2024年11分野拡大後 | ✅ | ANSWER_RUNTIME | P1 |

## Batch 8 Handoff Note

- 完成日: 2026-05-19
- 担当: FACT Operator (Claude)
- コミット: 4299995
- 新規DOMAIN: なし
- DOMAIN送付済み: pending（pdom-001〜008）

---

## Batch 9 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-161 | 在留資格「興行」：外国人エンターテイナー・アーティストの就労要件 | ✅ | ANSWER_RUNTIME | P1 |
| practical-162 | 外国人の住宅賃貸：保証人・外国人お断り・公営住宅の実態 | ✅ | ANSWER_RUNTIME | P1 |
| practical-163 | 在留不許可後の「異議申出」・「再申請」：手続きと現実的選択肢 | ✅ | ANSWER_RUNTIME | P0 |
| practical-164 | 外国人の国民健康保険：加入義務・在留資格別の扱い・未加入リスク | ✅ | ANSWER_RUNTIME | P1 |
| practical-165 | 在留資格「研究」：大学・研究機関以外での研究活動と要件 | ✅ | ANSWER_RUNTIME | P1 |
| practical-166 | 外国人配偶者ビザ更新：夫婦の実態確認（偽装婚対策）審査のポイント | ✅ | ANSWER_RUNTIME | P0 |
| practical-167 | 特定技能受入機関の支援計画・定期報告義務：怠慢による制裁 | ✅ | ANSWER_RUNTIME | P1 |
| practical-168 | 「帰化」vs「永住」の違いと選択：国籍・パスポート・制限の比較 | ✅ | ANSWER_RUNTIME | P1 |
| practical-169 | 技人国での副業・兼業：許可の可否・資格外活動許可・在留リスク | ✅ | ANSWER_RUNTIME | P1 |
| practical-170 | 在留カード紛失・盗難：再交付手続き・罰則・悪用リスク | ✅ | ANSWER_RUNTIME | P1 |
| practical-171 | 経営管理ビザの「500万円出資」要件の詳細：現物出資・借入金・合名義の扱い | ✅ | ANSWER_RUNTIME | P0 |
| practical-172 | 外国人の厚生年金脱退一時金：請求要件・金額・申請期限 | ✅ | ANSWER_RUNTIME | P1 |
| practical-173 | 在留資格「技能」（調理師・伝統工芸）：10年実務経験の証明方法 | ✅ | ANSWER_RUNTIME | P1 |
| practical-174 | 不法就労（資格外活動）で雇用した企業側への罰則と入管調査 | ✅ | ANSWER_RUNTIME | P1 |
| practical-175 | 外国人の日本での婚姻手続き：方式・必要書類・在留資格への影響 | ✅ | ANSWER_RUNTIME | P1 |
| practical-176 | 「特定活動46号」：日本語能力試験N1等保有者の就労特定活動 | ✅ | ANSWER_RUNTIME | P1 |
| practical-177 | 留学生の在籍管理報告：大学の義務と留学生の在留への影響 | ✅ | ANSWER_RUNTIME | P1 |
| practical-178 | 外国人の会社設立後の経営管理ビザ申請タイミング：設立前後の注意点 | ✅ | ANSWER_RUNTIME | P0 |
| practical-179 | 永住者が離婚した場合の在留資格への影響：永住取消のリスク | ✅ | ANSWER_RUNTIME | P1 |
| practical-180 | 外国人の子どもの在留資格：出生後の手続きと就学・就労の制限 | ✅ | ANSWER_RUNTIME | P1 |

## Batch 9 Handoff Note

- 完成日: 2026-05-19
- 担当: FACT Operator (Claude)
- コミット: 9c4c7bb
- 新規DOMAIN: なし
- DOMAIN送付済み: pending（pdom-001〜008）

---

## Batch 10 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-181 | 外国人の日本での遺言書作成：法的有効性・方式・準拠法 | ✅ | ANSWER_RUNTIME | P1 |
| practical-182 | 在留資格「企業内転勤」の詳細：転勤元要件・活動範囲・家族の扱い | ✅ | ANSWER_RUNTIME | P1 |
| practical-183 | 外国人の日本での自己破産：在留資格への影響と手続き | ✅ | ANSWER_RUNTIME | P1 |
| practical-184 | 在留資格「特定活動」の告示外（非告示）特定活動：どんな場合に使われるか | ✅ | ANSWER_RUNTIME | P1 |
| practical-185 | 技人国の「専門学校」卒業：日本の専門学校・外国の職業訓練校の扱い | ✅ | ANSWER_RUNTIME | P1 |
| practical-186 | 外国人の「養老保険」・生命保険加入：保険会社の外国人対応実態 | ✅ | ANSWER_RUNTIME | P1 |
| practical-187 | 在留資格の「更新」と「変更」の違い：どちらを申請すべきか | ✅ | ANSWER_RUNTIME | P1 |
| practical-188 | 外国人の日本での消費者ローン・クレジットカード審査：在留資格別の実態 | ✅ | ANSWER_RUNTIME | P1 |
| practical-189 | 在留資格の「指定書」：特定活動・高度専門職等の指定書の役割と確認方法 | ✅ | ANSWER_RUNTIME | P1 |
| practical-190 | 外国人の帰化申請の「犯罪歴」要件：軽微な違反・執行猶予・本国での前科 | ✅ | ANSWER_RUNTIME | P1 |
| practical-191 | 在留資格の「取次」と「代理」：行政書士・弁護士・本人申請の違い | ✅ | ANSWER_RUNTIME | P1 |
| practical-192 | 外国人の日本での失業：雇用保険から在留資格の問題までの総合対応 | ✅ | ANSWER_RUNTIME | P0 |
| practical-193 | 外国人の日本での自動車・不動産購入：制限・必要書類・ローンの実態 | ✅ | ANSWER_RUNTIME | P1 |
| practical-194 | 技人国申請での「業務内容証明」：在職証明書・業務説明書の書き方 | ✅ | MATERIALS_ONLY | P1 |
| practical-195 | 高度専門職の「研究実績」ポイント：論文・特許・受賞歴の証明方法 | ✅ | ANSWER_RUNTIME | P1 |
| practical-196 | 外国人の日本での離婚手続き：離婚届・準拠法・親権の国際的問題 | ✅ | ANSWER_RUNTIME | P1 |
| practical-197 | 外国人の日本での選挙権・参政権：現状と地方参政権議論 | ✅ | ANSWER_RUNTIME | P1 |
| practical-198 | 在留カードの「就労不可」と「就労制限なし」の区別：見方と確認方法 | ✅ | ANSWER_RUNTIME | P1 |
| practical-199 | 外国人のDV（家庭内暴力）被害：在留資格を失わずに支援を受ける方法 | ✅ | ANSWER_RUNTIME | P0 |
| practical-200 | 永住申請の「安定した生活を営むことができる資産・技能」要件の実務 | ✅ | ANSWER_RUNTIME | P1 |

## Batch 10 Handoff Note

- 完成日: 2026-05-19
- 担当: FACT Operator (Claude)
- コミット: 31f49ff
- 新規DOMAIN: なし
- DOMAIN送付済み: pending（pdom-001〜008）

---

## Batch 11 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-201 | 内職・在宅ワークと在留資格：報酬を得る活動は就労に当たるか | ✅ | ANSWER_RUNTIME | P1 |
| practical-202 | 外国人の住民票と在留カード：住民登録の仕組みと生活への影響 | ✅ | ANSWER_RUNTIME | P1 |
| practical-203 | 外国人の介護在留資格4ルート詳細：介護・EPA・特定技能・育成就労 | ✅ | ANSWER_RUNTIME | P1 |
| practical-204 | 技人国の試用期間・契約→正社員転換：在留資格変更は必要か | ✅ | ANSWER_RUNTIME | P1 |
| practical-205 | 定住者（非告示）申請・離婚後：日本人の子の親の在留実務 | ✅ | ANSWER_RUNTIME | P0 |
| practical-206 | 外国人の印鑑登録：実印・認印・外国人が使う場面 | ✅ | ANSWER_RUNTIME | P1 |
| practical-207 | 技人国からフリーランスへの移行リスク：資格外活動と経営管理の壁 | ✅ | ANSWER_RUNTIME | P0 |
| practical-208 | 高度専門職の優遇措置一覧：永住短縮・配偶者就労・親帯同 | ✅ | ANSWER_RUNTIME | P1 |
| practical-209 | 外国人のマイナンバー：付与義務・カード取得・在留申請への活用 | ✅ | ANSWER_RUNTIME | P1 |
| practical-210 | 外国人「永住者」在留カードの更新：7年更新制度と更新忘れの罰則 | ✅ | ANSWER_RUNTIME | P1 |
| practical-211 | 外国人の「特別養護老人ホーム」入居：在留資格・費用・日本語要件 | ✅ | ANSWER_RUNTIME | P1 |
| practical-212 | 在留資格「技術」「人文知識」「国際業務」の活動区分：何が違うのか | ✅ | ANSWER_RUNTIME | P1 |
| practical-213 | 外国人の「就労ビザ→別の就労ビザ」の変更：カテゴリ間変更の実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-214 | 外国人が日本で子どもを学校に通わせる：就学義務・費用・手続き | ✅ | ANSWER_RUNTIME | P1 |
| practical-215 | 技人国申請のカテゴリ制度（カテゴリ1〜4）：会社規模で必要書類が変わる | ✅ | ANSWER_RUNTIME | P1 |
| practical-216 | 外国人の年金と脱退一時金：帰国時に年金保険料を取り戻せるか | ✅ | ANSWER_RUNTIME | P1 |
| practical-217 | 卒業後の就職活動ビザ（特定活動）：留学生が卒業後に就職活動を続ける方法 | ✅ | ANSWER_RUNTIME | P1 |
| practical-218 | 帰化申請の流れと審査期間：日本国籍を取得するプロセス | ✅ | ANSWER_RUNTIME | P1 |
| practical-219 | 外国人の日本での運転免許：外国免許の切り替えと新規取得 | ✅ | ANSWER_RUNTIME | P1 |
| practical-220 | 技能実習から特定技能1号への移行：試験免除・手続き・注意点 | ✅ | ANSWER_RUNTIME | P1 |

## Batch 11 Handoff Note

- 完成日: 2026-05-19
- 担当: FACT Operator (Claude)
- コミット: a6cc7a3
- 新規DOMAIN: pdom-009（子なし離婚後の定住者（告示外）申請における在留実績の具体的な審査基準）
- DOMAIN送付済み: pending（pdom-001〜009）

---

## Batch 12 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-221 | 外国人の日本での起業：在留資格なし・就労不可の外国人が起業できるか | ✅ | ANSWER_RUNTIME | P0 |
| practical-222 | 外国人の「特定技能」試験：職種別の試験名・実施機関・申し込み方法 | ✅ | ANSWER_RUNTIME | P1 |
| practical-223 | 外国人の「在留資格の取消」手続きと不服申立て：取消通知から退去まで | ✅ | ANSWER_RUNTIME | P0 |
| practical-224 | 外国人の「配偶者ビザ更新拒否（不許可）」後の対応 | ✅ | ANSWER_RUNTIME | P0 |
| practical-225 | 外国人が日本で不動産を購入・相続する場合の手続きと在留資格 | ✅ | ANSWER_RUNTIME | P1 |
| practical-226 | 技人国の「同一雇用主での業務変更」：職種が変わったら在留資格を変更すべきか | ✅ | ANSWER_RUNTIME | P1 |
| practical-227 | 外国人の「永住申請の不許可」後の対応：再申請のタイミングと理由分析 | ✅ | ANSWER_RUNTIME | P0 |
| practical-228 | 外国人の「会社員→業務委託（フリーランス）」移行と在留資格 | ✅ | ANSWER_RUNTIME | P0 |
| practical-229 | 在留資格「特定活動（介護）」EPA介護福祉士候補者：制度概要と実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-230 | 外国人の「在留カード」とパスポートの関係：どちらが必要な場面か | ✅ | ANSWER_RUNTIME | P1 |
| practical-231 | 外国人が日本で「養子縁組」をする場合：日本法の要件と国際的影響 | ✅ | ANSWER_RUNTIME | P1 |
| practical-232 | 外国人の「技人国での育児休業・産前産後休業」：在留資格は失効しないか | ✅ | ANSWER_RUNTIME | P1 |
| practical-233 | 外国人の「住民基本台帳」へのアクセス：住民票の取得・使途・制限 | ✅ | ANSWER_RUNTIME | P1 |
| practical-234 | 技人国・就労ビザ保持者の「副業」と雇用保険・社会保険の二重加入問題 | ✅ | ANSWER_RUNTIME | P1 |
| practical-235 | 外国人の「在留特別許可」：強制退去対象者が日本に残るための最後の手段 | ✅ | ANSWER_RUNTIME | P0 |
| practical-236 | 外国人の「日本での株式投資・FX・仮想通貨」：在留資格と税務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-237 | 外国人の「在留期間」と「在留期限」の違い：どちらが重要でどう管理するか | ✅ | ANSWER_RUNTIME | P1 |
| practical-238 | 外国人の「日本国内での本国大使館への手続き」：パスポート更新・婚姻届等 | ✅ | ANSWER_RUNTIME | P1 |
| practical-239 | 技人国の「年収が下がった場合」の在留への影響：降給・ボーナスカット・減収 | ✅ | ANSWER_RUNTIME | P1 |
| practical-240 | 外国人の「日本での出産」と子どもの在留資格・国籍 | ✅ | ANSWER_RUNTIME | P1 |

## Batch 12 Handoff Note

- 完成日: 2026-05-19
- 担当: FACT Operator (Claude)
- コミット: 95d5bdf
- 新規DOMAIN: なし
- DOMAIN送付済み: pending（pdom-001〜009）

---

## Batch 13 状態（目標: 20張）

| card_id | topic | status | runtime_bucket | risk |
|---------|-------|--------|---------------|------|
| practical-241 | 就労系ビザから家族滞在への変更：日本人・永住者と結婚した場合の切替 | ✅ | ANSWER_RUNTIME | P1 |
| practical-242 | 外国人の日本での遺産相続：被相続人が外国人の場合の準拠法と手続き | ✅ | ANSWER_RUNTIME | P1 |
| practical-243 | 日本語能力試験（JLPT）と在留資格・帰化：N1/N2が有利になる場面 | ✅ | ANSWER_RUNTIME | P1 |
| practical-244 | 経営管理ビザの「常勤職員2名以上」要件：雇用の実態・非常勤・家族の扱い | ✅ | ANSWER_RUNTIME | P0 |
| practical-245 | 外国人が刑事手続きを受けた場合の在留資格への影響：逮捕・起訴・有罪判決 | ✅ | ANSWER_RUNTIME | P0 |
| practical-246 | 留学→技人国以外のルート：専門学校卒・在職社会人入学・大学院修了後の実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-247 | 在留申請の優先処理制度：高度専門職・J-Skip・J-Find等の審査短縮制度 | ✅ | ANSWER_RUNTIME | P1 |
| practical-248 | 外国人の雇用保険：加入義務・失業給付の受給・帰国時の特例 | ✅ | ANSWER_RUNTIME | P1 |
| practical-249 | 日本語学校を卒業・中退した場合の在留資格：次のステップと許可要件 | ✅ | ANSWER_RUNTIME | P1 |
| practical-250 | 外国人への日本の労働基準法の適用：在留資格に関係なく保護される権利 | ✅ | ANSWER_RUNTIME | P1 |
| practical-251 | 在留申請時の写真要件：サイズ・背景・服装・提出のルール | ✅ | MATERIALS_ONLY | P1 |
| practical-252 | 外国人が日本の学校の先生になる在留資格：公立・私立・外国語指導 | ✅ | ANSWER_RUNTIME | P1 |
| practical-253 | 国民健康保険vs健康保険（社会保険）の違いと切り替え：外国人が知るべき実務 | ✅ | ANSWER_RUNTIME | P1 |
| practical-254 | 特定技能2号：永住申請への道と要件・2024年拡大後の現状 | ✅ | ANSWER_RUNTIME | P1 |
| practical-255 | 外国人のローン・クレジットカード審査：在留資格・在留期間・信用情報の実態 | ✅ | ANSWER_RUNTIME | P1 |
| practical-256 | 永住者が日本国外で長期在住する場合の在留管理：再入国許可・失効リスク | ✅ | ANSWER_RUNTIME | P1 |
| practical-257 | 在留資格「技能」（スポーツ選手・職人等）：料理人以外の多様な職種と要件 | ✅ | ANSWER_RUNTIME | P1 |
| practical-258 | ビザなし渡航（ノービザ）から日本への移住：在留資格取得の正規の流れ | ✅ | ANSWER_RUNTIME | P1 |
| practical-259 | 外国人の「日本での確定申告」：必要なケースと手続き・在留資格への影響 | ✅ | ANSWER_RUNTIME | P1 |
| practical-260 | 外国人の「日本での起業・経営管理ビザ」：投資家・創業者が知るべき全体像 | ✅ | ANSWER_RUNTIME | P0 |

## Batch 13 Handoff Note

- 完成日: 2026-05-19
- 担当: FACT Operator (Claude)
- コミット: pending
- 新規DOMAIN: なし
- DOMAIN送付済み: pending（pdom-001〜009）
