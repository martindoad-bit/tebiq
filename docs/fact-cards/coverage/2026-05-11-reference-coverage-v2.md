# TEBIQ Fact Card Coverage Report — Cycle 2 Session Final
## 生成日：2026-05-11 | ブランチ：feat/cycle2-batch2-coverage

---

## サマリー

| 項目 | 数値 |
|------|------|
| 総カード数 | **40** |
| 新規作成（このセッション） | **14枚** |
| メタデータパッチ（Cycle 2） | **21枚** |
| risk=critical | 2 |
| risk=high | 26 |
| risk=medium | 9 |
| risk=low | 3 |
| state=ai_verified | 38 |
| state=ai_extracted | 1（startup-visa-keiei-transition） |
| state=human_reviewed | 2（keiei-kanri-2025-10・keiei-kanri-existing-holder-update） |

---

## 全カード一覧（40枚）

### 在留資格・入管手続き系（ISA / moj.go.jp）

| fact_id | title | risk | state | Cycle2 patch | 新規（このセッション） |
|---------|-------|------|-------|-------------|-------------------|
| zairyu-expiry-renewal-change | 在留期限間近の更新・変更申請 | high | ai_verified | ✅ | |
| zairyu-card-loss-reissue | 在留カード紛失・再交付 | high | ai_verified | ✅ | |
| zairyu-address-change | 住居地変更届出（14日以内） | medium | ai_verified | ✅ | |
| zairyu-shikaku-torikeshi | 在留資格取消（3か月・6か月・90日） | **critical** | ai_verified | | ✅ |
| minashi-sainyuukoku | みなし再入国許可（1年ルール） | high | ai_verified | ✅ | |
| overstay-taisho | オーバーステイ対処法 | **critical** | ai_verified | ✅ | |
| mynumber-gaikokujin | マイナンバー外国人（住民票・カード有効期限） | low | ai_verified | | ✅ |

### 就労ビザ（技人国・高度専門職・特定技能）

| fact_id | title | risk | state | Cycle2 patch | 新規（このセッション） |
|---------|-------|------|-------|-------------|-------------------|
| gijinkoku-koushin-shorui | 技人国更新申請書類（CEFR要件） | high | ai_verified | | ✅（Batch 3） |
| gijinkoku-job-mismatch | 技人国業務内容不一致リスク | high | ai_verified | ✅ | |
| ryugaku-gijinkoku-henko | 留学→技人国 在留資格変更 | high | ai_verified | ✅ | |
| shikakugai-fukugyou | 資格外活動・副業許可 | high | ai_verified | ✅ | |
| shuro-shikaku-shomeisho | 就労資格証明書 | medium | ai_verified | | |
| kodo-senmon-shoku-eijuu | 高度専門職ポイント制（永住短縮） | high | ai_verified | ✅ | |
| tokuteiginou-ichigou-youken | 特定技能1号（16業種・5年上限） | high | ai_verified | ✅ | |
| tokuteiginou-nigou-youken | 特定技能2号（11分野・上限なし） | high | ai_verified | | ✅ |
| tokutei-ginou-koushin | 特定技能 在留期間更新申請 | high | ai_verified | | ✅ |

### 配偶者・家族ビザ

| fact_id | title | risk | state | Cycle2 patch | 新規（このセッション） |
|---------|-------|------|-------|-------------|-------------------|
| nihonjin-haigusha-visa | 日本人配偶者等ビザ | high | ai_verified | ✅ | |
| eijuu-haigusha-visa | 永住者の配偶者等ビザ | high | ai_verified | ✅ | |
| spouse-divorce-separation | 配偶者ビザ・離婚後リスク | high | ai_verified | ✅ | |
| kazoku-taizai-yoken | 家族滞在ビザ要件 | high | ai_verified | ✅ | |
| kazoku-taizai-henko | 家族滞在→就労ビザ変更 | high | ai_verified | | ✅ |

### 永住・定住・特定カテゴリー

| fact_id | title | risk | state | Cycle2 patch | 新規（このセッション） |
|---------|-------|------|-------|-------------|-------------------|
| eijuu-zairyu-kikan | 永住申請（在留期間・就労積算要件） | high | ai_verified | ✅ | |
| eijuu-nenkin-risk | 永住申請（年金・税・健保未納リスク） | high | ai_verified | ✅ | |
| eijuu-card-koushin | 永住者の在留カード更新 | high | ai_verified | ✅ | |
| teijusha-visa | 定住者ビザ（日系人・離婚後・難民）| high | ai_verified | ✅ | |
| keiei-kanri-2025-10 | 経営管理ビザ（2025年10月新基準） | high | **human_reviewed** | ✅ | |
| keiei-kanri-existing-holder-update | 経営管理ビザ既存保有者更新 | high | **human_reviewed** | ✅ | |
| startup-visa-keiei-transition | スタートアップビザ→経営管理変更 | high | **ai_extracted** | ✅ | |

### 健康保険・医療

| fact_id | title | risk | state | Cycle2 patch | 新規（このセッション） |
|---------|-------|------|-------|-------------|-------------------|
| rishoku-kenko-hoken | 退職後の健康保険（任意継続・国保） | medium | ai_verified | | ✅（Batch 3） |
| kokumin-kenko-hoken-kanyu | 国民健康保険加入手続き | medium | ai_verified | | ✅（Batch 4） |
| shakai-hoken-kanyu | 社会保険加入義務（3/4ルール・週20h）| high | ai_verified | | ✅ |
| kogaku-ryoyo-hi | 高額療養費制度 | medium | ai_verified | | ✅ |

### 年金

| fact_id | title | risk | state | Cycle2 patch | 新規（このセッション） |
|---------|-------|------|-------|-------------|-------------------|
| rishoku-kokumin-nenkin-kirikae | 退職後の国民年金第1号切換 | medium | ai_verified | | |
| nenkin-dattai-ichijikin | 脱退一時金（帰国外国人） | low | ai_verified | | |

### 雇用保険・労働

| fact_id | title | risk | state | Cycle2 patch | 新規（このセッション） |
|---------|-------|------|-------|-------------|-------------------|
| koyo-hoken-kyufu | 雇用保険基本手当（失業給付） | medium | ai_verified | | ✅ |

### 税務

| fact_id | title | risk | state | Cycle2 patch | 新規（このセッション） |
|---------|-------|------|-------|-------------|-------------------|
| kakutei-shinkoku-gijmu | 確定申告義務（副業20万・期限3月15日） | medium | ai_verified | | ✅ |
| kyojusha-kubun-kazei | 課税区分（居住者・非永住者・非居住者） | medium | ai_verified | | ✅ |
| jumin-zei-gaiyo | 住民税（10%・均等割・前年所得基準） | medium | ai_verified | | ✅ |
| juminzei-kazei-shomeisho | 住民税課税証明書 | low | ai_verified | | |

### その他

| fact_id | title | risk | state | Cycle2 patch | 新規（このセッション） |
|---------|-------|------|-------|-------------|-------------------|
| tankizai-henko | 短期在留→他の在留資格変更 | high | ai_verified | | |

---

## DOMAIN 必審クリアリスト（優先度順）

| fact_id | flags | DOMAIN優先度 |
|---------|-------|------------|
| zairyu-shikaku-torikeshi | justifiable_reason_scope（第5・6・7号の「正当な理由」） | P1 |
| gijinkoku-koushin-shorui | cefr_b2_category_scope（2026年4月CEFR B2の適用範囲） | P1 |
| startup-visa-keiei-transition | kigyou_kanryo_definition・transition_conditions_post_2025_10 | P1 |
| overstay-taisho | reentry_ban_period_source（出国命令5年・強制退去10年） | P2 |
| tokuteiginou-nigou-youken | tokutei2_family_source（家族帯同可の法令引用） | P2 |
| kogaku-ryoyo-hi | income_bracket_amounts_source（PDF形式の限度額） | P2 |
| mynumber-gaikokujin | mainaroka_kenkou_hoken（2025年12月マイナ保険証移行） | P2 |

---

## 速查 Tab（Speed Tab）候補トピック

以下は直接ファクトのみで完結する高信頼度カード（confidence=high かつ needs_review=なし or 少）：

1. `zairyu-address-change` — 14日以内の住居地変更届
2. `zairyu-card-loss-reissue` — 在留カード紛失・再交付
3. `rishoku-kokumin-nenkin-kirikae` — 退職後の国民年金14日切換
4. `kokumin-kenko-hoken-kanyu` — 国保加入14日以内
5. `shakai-hoken-kanyu` — 社会保険加入義務（国籍不問）
6. `kakutei-shinkoku-gijmu` — 確定申告期限3月15日
7. `jumin-zei-gaiyo` — 住民税10%前年所得基準
8. `mynumber-gaikokujin` — マイナンバー外国人（住民票で付番）

---

## 次バッチ候補トピック（Batch 11+）

| トピック | 候補 fact_id | ソース | 優先度 |
|---------|------------|--------|--------|
| 永住申請の必要書類（一般・高度専門職） | eijuu-shinsei-shorui | ISA 永住申請ページ | 高 |
| マイナ保険証（健保廃止・2025年12月） | mainaroka-kenkou-hoken | MHLW/デジタル庁 | 高 |
| 育成就労制度（2024年法整備・2027年施行） | ikusei-shuroh-seido | ISA | 中 |
| 在留資格申請カテゴリー1〜4（書類差異） | zairyu-shinsei-category | ISA 16-3.html詳細 | 中 |
| 外国人の不動産賃貸（在留カード確認義務） | gaikokujin-fudosan-chintai | 国土交通省等 | 低 |

---

## Changelog

| 日付 | 担当 | 変更内容 |
|------|------|----------|
| 2026-05-11 | FACT-OPS (Cycle 2 Session Final) | v2作成。40カード全棚卸し。Batch 3-10の新規・パッチを反映。DOMAIN必審・Speed Tab・次バッチ候補を整理。 |
| 2026-05-11 | FACT-OPS (Cycle 2 Batch 3) | v1作成。31カード棚卸し。Cycle 2必須フィールド15件の欠落を記録。 |
