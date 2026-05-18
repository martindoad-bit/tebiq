# Practical Fact Layer — Progress Tracker

> **角色**: FACT 实务层事实生产窗口  
> **目标**: 让 TEBIQ 的答案在实务准确度、可信度、材料连接能力上超过 DeepSeek 4 Pro 联网版  
> **批次节奏**: 每20张卡更新一次本文件 + commit + push  
> **last_updated**: 2026-05-18

---

## 全局计数

| 指标 | 当前值 |
|------|--------|
| 已完成卡片数 | 20 |
| DOMAIN 队列总数 | 6 |
| ANSWER_RUNTIME 可注入 | 19 |
| MATERIALS_ONLY | 1 |
| L5_ONLY | 0 |
| NEEDS_REWRITE | 0 |
| 已完成批次 | 1 |

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
- 次バッチ: Batch 2 (practical-021〜040)
- 優先トピック: 高度専門職詳細 / 特定技能詳細 / 永住申請フロー / 在留資格取消手続き / 就労系→永住のブリッジ
- DOMAIN送付済み: pending
- コミット: pending
