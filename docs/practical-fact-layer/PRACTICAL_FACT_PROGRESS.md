# Practical Fact Layer — Progress Tracker

> **角色**: FACT 实务层事实生产窗口  
> **目标**: 让 TEBIQ 的答案在实务准确度、可信度、材料连接能力上超过 DeepSeek 4 Pro 联网版  
> **批次节奏**: 每20张卡更新一次本文件 + commit + push  
> **last_updated**: 2026-05-18

---

## 全局计数

| 指标 | 当前值 |
|------|--------|
| 已完成卡片数 | 60 |
| DOMAIN 队列总数 | 7 |
| ANSWER_RUNTIME 可注入 | 57 |
| MATERIALS_ONLY | 3 |
| L5_ONLY | 0 |
| NEEDS_REWRITE | 0 |
| 已完成批次 | 3 |

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
| practical-005 | バーチャルオフィス不可の根拠と実際の合否事例 | P0 |
| practical-006 | 赤字・休眠法人の更新で「事業継続意思」を示す書面の公式要件 | P0 |
| practical-010 | 永住申請で「直近5年」の社会保険完納要件の具体的確認方法 | P0 |
| practical-016 | 不許可後の在留特例期間の起算点と就労継続の法的根拠 | P0 |
| practical-055 | 出国命令制度の「不法就労があっても適用される場合の基準」（ISA裁量範囲） | P0 |

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
- 次バッチ: Batch 4 (practical-061〜080)
- 優先トピック: 難民認定・無国籍者 / 経営管理の追加実務 / 技能実習3年5年の計算 / 日本語学校→専門学校ルート / 仮放免制度等
- DOMAIN送付済み: pending（pdom-007を含む計7件）
- コミット: pending
