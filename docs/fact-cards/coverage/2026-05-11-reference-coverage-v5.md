# TEBIQ Fact Card Coverage Report — Cycle 2 Session 4 (55-card milestone)
## 生成日：2026-05-11 | ブランチ：feat/cycle2-batch2-coverage

---

## サマリー

| 項目 | 数値 |
|------|------|
| 総カード数 | **55** |
| v4→v5 新規作成（このセッション） | **5枚** |
| risk=critical | 2 |
| risk=high | 47 |
| risk=medium | 4 |
| risk=low | 2 |
| state=ai_verified | 53 |
| state=ai_extracted | 1（startup-visa-keiei-transition） |
| state=human_reviewed | 2（keiei-kanri-2025-10・keiei-kanri-existing-holder-update） |

---

## 全カード一覧（55枚）

### 在留資格・入管手続き系（ISA / moj.go.jp）

| fact_id | title | risk | state | v5新規 |
|---------|-------|------|-------|--------|
| zairyu-expiry-renewal-change | 在留期限間近の更新・変更申請 | high | ai_verified | |
| zairyu-card-loss-reissue | 在留カード紛失・再交付 | high | ai_verified | |
| zairyu-address-change | 住居地変更届出（14日以内） | medium | ai_verified | |
| zairyu-shikaku-torikeshi | 在留資格取消（3か月・6か月・90日） | **critical** | ai_verified | |
| minashi-sainyuukoku | みなし再入国許可（1年ルール） | high | ai_verified | |
| overstay-taisho | オーバーステイ対処法 | **critical** | ai_verified | |
| mynumber-gaikokujin | マイナンバー外国人（住民票・カード有効期限） | low | ai_verified | |
| tankizai-henko | 短期在留→他の在留資格変更 | high | ai_verified | |
| shitsugyo-zairyu-risk | 失業・退職と在留資格リスク（14日届出・3か月ルール） | high | ai_verified | |
| zairyu-card-keitai-gimu | 在留カード常時携帯義務（20万円罰金・提示拒否は1年懲役） | high | ai_verified | |
| zairyu-nintei-shomeisho | 在留資格認定証明書（COE）— 申請フロー・処理1〜3か月・電子メール送付可 | high | ai_verified | |
| tensyoku-zairyu | 転職時の在留資格手続き（14日届出・入管法第19条の16・資格変更要否） | high | ai_verified | ✅ Batch 21 |
| kitaku-tetsuzuki | 帰国・永住出国時の手続き（在留カード返納・国外転出届・国保自動喪失） | high | ai_verified | |
| kodomo-zairyu-shinsei | 日本生まれの外国人の子の在留資格取得申請（出生後30日以内） | high | ai_verified | |

### 就労ビザ（技人国・高度専門職・特定技能・育成就労・派遣）

| fact_id | title | risk | state | v5新規 |
|---------|-------|------|-------|--------|
| gijinkoku-koushin-shorui | 技人国更新申請書類（CEFR要件） | high | ai_verified | |
| gijinkoku-job-mismatch | 技人国業務内容不一致リスク | high | ai_verified | |
| ryugaku-gijinkoku-henko | 留学→技人国 在留資格変更 | high | ai_verified | |
| shikakugai-fukugyou | 資格外活動・副業許可 | high | ai_verified | |
| shuro-shikaku-shomeisho | 就労資格証明書 | medium | ai_verified | |
| kodo-senmon-shoku-eijuu | 高度専門職ポイント制（永住短縮） | high | ai_verified | |
| tokuteiginou-ichigou-youken | 特定技能1号（16業種・5年上限） | high | ai_verified | |
| tokuteiginou-nigou-youken | 特定技能2号（11分野・上限なし） | high | ai_verified | |
| tokutei-ginou-koushin | 特定技能 在留期間更新申請 | high | ai_verified | |
| ikusei-shuroh-seido | 育成就労制度（2027年4月施行・技能実習廃止後継） | high | ai_verified | |
| zairyu-shinsei-category | 在留資格申請カテゴリー1〜4（技人国・2026年4月新要件） | high | ai_verified | |
| haken-zairyu | 派遣就労と技人国（派遣先確定必須・2026年3月新ガイドライン） | high | ai_verified | |
| tokutei-katsudo-46go | 特定活動（告示第46号）本邦大学卒業・JLPT N1・飲食/製造/介護可 | high | ai_verified | |
| ikuji-sangyo-kyugyo-zairyu | 育休・産休と在留資格（外国人適用・給付金67%・3か月ルール関係） | high | ai_verified | |
| gaikokujin-koyo-todokede | 外国人雇用状況の届出（全事業主義務・ハローワーク・30万円罰金） | high | ai_verified | ✅ Batch 21 |

### 配偶者・家族ビザ

| fact_id | title | risk | state | v5新規 |
|---------|-------|------|-------|--------|
| nihonjin-haigusha-visa | 日本人配偶者等ビザ | high | ai_verified | |
| eijuu-haigusha-visa | 永住者の配偶者等ビザ | high | ai_verified | |
| spouse-divorce-separation | 配偶者ビザ・離婚後リスク | high | ai_verified | |
| kazoku-taizai-yoken | 家族滞在ビザ要件 | high | ai_verified | |
| kazoku-taizai-henko | 家族滞在→就労ビザ変更 | high | ai_verified | |

### 永住・定住・国籍取得

| fact_id | title | risk | state | v5新規 |
|---------|-------|------|-------|--------|
| eijuu-zairyu-kikan | 永住申請（在留期間・就労積算要件） | high | ai_verified | |
| eijuu-nenkin-risk | 永住申請（年金・税・健保未納リスク） | high | ai_verified | |
| eijuu-card-koushin | 永住者の在留カード更新 | high | ai_verified | |
| eijuu-shinsei-shorui | 永住許可申請の必要書類（就労資格者等） | high | ai_verified | |
| teijusha-visa | 定住者ビザ（日系人・離婚後・難民）| high | ai_verified | |
| keiei-kanri-2025-10 | 経営管理ビザ（2025年10月新基準） | high | **human_reviewed** | |
| keiei-kanri-existing-holder-update | 経営管理ビザ既存保有者更新 | high | **human_reviewed** | |
| startup-visa-keiei-transition | スタートアップビザ→経営管理変更 | high | **ai_extracted** | |
| kika-shinsei | 帰化申請（国籍法5条・5年要件・二重国籍不可・法務局・無料） | high | ai_verified | |

### 健康保険・医療

| fact_id | title | risk | state | v5新規 |
|---------|-------|------|-------|--------|
| rishoku-kenko-hoken | 退職後の健康保険（任意継続・国保） | medium | ai_verified | |
| kokumin-kenko-hoken-kanyu | 国民健康保険加入手続き | medium | ai_verified | |
| shakai-hoken-kanyu | 社会保険加入義務（3/4ルール・週20h）| high | ai_verified | |
| kogaku-ryoyo-hi | 高額療養費制度 | medium | ai_verified | |
| mainaroka-kenkou-hoken | マイナ保険証移行（2024年12月2日廃止・資格確認書） | high | ai_verified | |

### 年金

| fact_id | title | risk | state | v5新規 |
|---------|-------|------|-------|--------|
| rishoku-kokumin-nenkin-kirikae | 退職後の国民年金第1号切換 | medium | ai_verified | |
| nenkin-dattai-ichijikin | 脱退一時金（帰国外国人） | low | ai_verified | |

### 雇用保険・労働

| fact_id | title | risk | state | v5新規 |
|---------|-------|------|-------|--------|
| koyo-hoken-kyufu | 雇用保険基本手当（失業給付） | medium | ai_verified | |

### 税務

| fact_id | title | risk | state | v5新規 |
|---------|-------|------|-------|--------|
| kakutei-shinkoku-gijmu | 確定申告義務（副業20万・期限3月15日） | medium | ai_verified | |
| kyojusha-kubun-kazei | 課税区分（居住者・非永住者・非居住者） | medium | ai_verified | |
| jumin-zei-gaiyo | 住民税（10%・均等割・前年所得基準） | medium | ai_verified | |
| juminzei-kazei-shomeisho | 住民税課税証明書 | low | ai_verified | |

---

## DOMAIN 必審クリアリスト（更新）

| fact_id | flags | DOMAIN優先度 |
|---------|-------|------------|
| zairyu-shikaku-torikeshi | justifiable_reason_scope（第5・6・7号の「正当な理由」） | **P1** |
| gijinkoku-koushin-shorui | cefr_b2_category_scope（2026年4月CEFR B2の適用範囲） | **P1** |
| startup-visa-keiei-transition | kigyou_kanryo_definition・transition_conditions_post_2025_10 | **P1** |
| shitsugyo-zairyu-risk | seito_na_riyu_shugyo_katsudo（就職活動=正当な理由の公式確認） | **P1** |
| ikuji-sangyo-kyugyo-zairyu | ikukyu_seito_na_riyu_shonin（育休=正当な理由の公式確認） | **P1** |
| tensyoku-zairyu | tensyoku_misdelivery_penalty（届出不履行罰則条文）・zairyu_henko_youhi_criterion（業務範囲内判断基準） | **P1** |
| overstay-taisho | reentry_ban_period_source（出国命令5年・強制退去10年） | P2 |
| tokuteiginou-nigou-youken | tokutei2_family_source（家族帯同可の法令引用） | P2 |
| kogaku-ryoyo-hi | income_bracket_amounts_source（PDF形式の限度額） | P2 |
| ikusei-shuroh-seido | ikusei_tenseki_period_by_field（転籍制限期間分野別値） | P2 |
| tokutei-katsudo-46go | certified_senshu_school_list（認定専修学校リスト） | P2 |
| haken-zairyu | hakenchi_henkou_notification（派遣先変更の届出義務） | P2 |
| gaikokujin-koyo-todokede | todokede_houreijoubun（条文番号公式確認）・jisseki_touroku_gaijin_haken（派遣社員届出義務者） | P2 |

---

## 速查 Tab（Speed Tab）候補トピック（更新）

1. `zairyu-address-change` — 14日以内の住居地変更届
2. `zairyu-card-loss-reissue` — 在留カード紛失・再交付
3. `zairyu-card-keitai-gimu` — 在留カード常時携帯義務（不携帯20万円・提示拒否1年懲役）
4. `rishoku-kokumin-nenkin-kirikae` — 退職後の国民年金14日切換
5. `kokumin-kenko-hoken-kanyu` — 国保加入14日以内
6. `shakai-hoken-kanyu` — 社会保険加入義務（国籍不問）
7. `kakutei-shinkoku-gijmu` — 確定申告期限3月15日
8. `jumin-zei-gaiyo` — 住民税10%前年所得基準
9. `mynumber-gaikokujin` — マイナンバー外国人（住民票で付番）
10. `shitsugyo-zairyu-risk` — 退職後14日以内届出義務
11. `mainaroka-kenkou-hoken` — 健康保険証2024年12月2日廃止・資格確認書無申請交付
12. `tensyoku-zairyu` — 転職時14日届出義務（入管法第19条の16）
13. `gaikokujin-koyo-todokede` — 外国人雇用届出・30万円罰金・翌月10日

---

## 次バッチ候補トピック（Batch 22+）

| トピック | 候補 fact_id | ソース | 優先度 |
|---------|------------|--------|--------|
| 外国人の住民票取得方法（コンビニ交付・マイナカード） | jumin-hyo-shutoku | 総務省 | 中 |
| 在留カードの記載事項変更（結婚・改名・国籍変更等） | zairyu-card-kisai-henko | ISA | 高 |
| 外国人の失業給付（雇用保険・受給資格・帰国一時金） | koyo-hoken-taishoku-gaikokujin | MHLW | 高 |
| 外国人の不動産賃貸（在留カード確認義務） | gaikokujin-fudosan-chintai | 国土交通省等 | 低 |
| 高度専門職の家族（就労制限なし特例） | kodo-senmon-kazoku | ISA | 高 |
| 外国人の起業・会社設立（経営管理ビザ取得前の注意） | gaijin-kigyou-setsuritsu | ISA/法務省 | 中 |
| 在留カードの有効期間更新（永住者・16歳誕生日） | eijuu-card-koushin-16sai | ISA | 中 |
| 特定技能の支援計画・登録支援機関 | tokutei-shien-keikaku | ISA | 高 |
| 外国人の労災保険（国籍問わず適用） | rousai-hoken-gaikokujin | MHLW/労働基準法 | 中 |
| 配偶者ビザの活動制限と就労（日本人配偶者等は就労制限なし） | haigusha-visa-shuro | ISA | 高 |

---

## Changelog

| 日付 | 担当 | 変更内容 |
|------|------|----------|
| 2026-05-11 | FACT-OPS (Cycle 2 Session 4) | v5作成。55カード milestone。Batch 18（kodomo-zairyu-shinsei）・Batch 19（kitaku-tetsuzuki）・Batch 20（zairyu-nintei-shomeisho）・Batch 21（tensyoku-zairyu・gaikokujin-koyo-todokede）の5枚を反映。DOMAIN P1にtensyoku追加。Speed Tab13件に更新。 |
| 2026-05-11 | FACT-OPS (Cycle 2 Session 3) | v4作成。50カード milestone。 |
| 2026-05-11 | FACT-OPS (Cycle 2 Session 2) | v3作成。45カード。 |
| 2026-05-11 | FACT-OPS (Cycle 2 Session Final) | v2作成。40カード全棚卸し。 |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 3) | v1作成。31カード棚卸し。 |
