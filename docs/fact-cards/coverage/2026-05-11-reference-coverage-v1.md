---
report_id: reference-coverage-v1
title: TEBIQ Fact Layer — 来源覆盖报告 v1
created_at: "2026-05-11"
created_by: FACT-OPS (Cycle 2 / Coverage Sprint)
scope: 15优先主题（用户高频 × 官方来源可确认 × 速查页展示需求）
card_inventory_date: "2026-05-11"
total_existing_cards: 31
---

# TEBIQ 来源覆盖报告 v1 — 2026-05-11

> 本报告覆盖 15 个优先主题，评估现有 fact card 覆盖情况、事实缺口、官方来源可用性，并给出推荐动作。
> 用于指导 Part 2 第一批 8 张高确定性卡的选题。

---

## 现有卡清单（截至 2026-05-11）

| fact_id | state | risk | confidence | 来源部门 |
|---------|-------|------|------------|---------|
| keiei-kanri-2025-10 | ai_verified | critical | high | ISA/MOJ |
| keiei-kanri-existing-holder-update | ai_verified | high | high | ISA/MOJ |
| eijuu-nenkin-risk | ai_verified | critical | medium | ISA/nenkin.go.jp |
| eijuu-zairyu-kikan | ai_verified | high | high | ISA |
| eijuu-tsujou-route | ai_verified | high | medium | ISA |
| eijuu-card-koushin | ai_verified | high | medium | ISA（URL要確認） |
| eijuu-haigusha-visa | ai_verified | high | medium | ISA |
| gijinkoku-job-mismatch | ai_verified | high | high | ISA |
| gijinkoku-job-change-notification | ai_verified | high | high | ISA |
| ryugaku-gijinkoku-henko | ai_verified | high | medium | ISA |
| ryugaku-shikakugai-katsudo | ai_verified | high | high | ISA |
| zairyu-nintei-shomeisho | ai_verified | high | medium | ISA |
| zairyu-address-change | ai_verified | low | high | ISA |
| zairyu-card-loss-reissue | ai_verified | high | high | ISA |
| zairyu-expiry-renewal-change | human_reviewed | high | high | ISA |
| kazoku-taizai-yoken | ai_verified | high | high | ISA |
| spouse-divorce-separation | human_reviewed | critical | high | ISA |
| nihonjin-haigusha-visa | ai_verified | high | medium | ISA |
| shikakugai-fukugyou | human_reviewed | high | high | ISA |
| tankizai-henko | ai_verified | high | medium | ISA |
| minashi-sainyuukoku | ai_verified | critical | medium | ISA |
| overstay-taisho | ai_verified | critical | medium | ISA |
| startup-visa-keiei-transition | ai_extracted | high | medium | ISA |
| kodo-senmon-shoku-eijuu | ai_verified | high | high | ISA |
| tokuteiginou-ichigou-youken | ai_verified | high | medium | ISA |
| teijusha-visa | ai_verified | high | medium | ISA |
| nenkin-dattai-ichijikin | ai_verified | low | high | 日本年金機構 |
| rishoku-kokumin-nenkin-kirikae | ai_verified | medium | high | 日本年金機構 |
| juminzei-kazei-shomeisho | ai_verified | medium | medium | 総務省・国税庁 |
| shuro-shikaku-shomeisho | ai_verified | low | high | ISA |
| nyukan-notice-response | needs_review | high | low | （source未確認） |

---

## 15 優先主題 別 覆盖評価

---

### Topic 1: 技人国続签 / 更新 (gijinkoku renewal)

**用户常见问法:**
- 技人国のビザ更新は何ヶ月前から申請できますか
- 技術・人文知識・国際業務の更新に必要な書類は何ですか
- 転職後すぐに更新申請してもいいですか
- 更新申請中に在留期限が切れたらどうなりますか
- 技人国の更新が通りやすい条件は何ですか
- 課税証明書・納税証明書は更新に必要ですか
- 在職証明書と業務内容説明書の書き方は

**既存カード:**
- `zairyu-expiry-renewal-change` — 申請時期（3ヶ月前〜）・特例期間 ✅（human_reviewed）
- `gijinkoku-job-mismatch` — 業務内容不一致リスク ✅

**不足している事実:**
- 技人国更新の標準提出書類一覧（在職証明書・業務内容説明書・課税証明書等）
- 更新申請での「直近課税証明書・納税証明書」の具体的な要件
- 転職後6ヶ月以内での更新に関する追加書類（業務継続性確認）

**官方来源 URL:**
- https://www.moj.go.jp/isa/applications/procedures/16-3.html（在留期間更新許可申請）
- https://www.moj.go.jp/isa/applications/status/gijinkoku.html（技人国在留資格）

**来源部门:** ISA / MOJ

**direct_facts（推定・要WebFetch確認）:**
- 標準処理期間：2週間〜1ヶ月程度
- 主な提出書類：更新許可申請書、写真、パスポート、在留カード、在職証明書、業務内容説明書、課税証明書等
- 申請開始可能時期：在留期限の3ヶ月前から

**needs_review（灰区）:**
- 転職後短期間での更新時の追加書類・審査強化（ISA運用上の判断）
- 業務内容の説明書の記載レベル（ISA審査基準は非公開部分あり）

**推荐动作:** `new_card` — `gijinkoku-koushin-shorui`（源自 ISA 16-3.html）

---

### Topic 2: 技人国転職後届出

**用户常见问法:**
- 転職したら入管に届出が必要ですか
- 転職届出の期限は何日以内ですか
- 届出の様式番号は何ですか
- オンラインで届出できますか
- 転職届出を忘れたらどうなりますか

**既存カード:**
- `gijinkoku-job-change-notification` ✅（ai_verified / high / high）— 14日以内・様式1-4/1-5/1-7・オンライン対応

**不足している事実:** なし（主要事実は覆盖）

**推荐动作:** `patch_existing` — Cycle 2メタデータ追加のみ（citation_label等）

---

### Topic 3: 経営管理続签 / 更新

**用户常见问法:**
- 経営管理ビザの更新は何を準備すればいいですか
- 法人決算書は更新に毎回必要ですか
- 売上がゼロでも更新できますか
- 役員変更したら届出が必要ですか
- 2025年10月以降の更新基準は何が変わりましたか

**既存カード:**
- `keiei-kanri-2025-10` ✅（新基準5要件・critical / high）
- `keiei-kanri-existing-holder-update` ✅（既存持有人更新の過渡措置）

**不足している事実:**
- 経営管理更新の標準提出書類一覧（ISA 16-3.html + 経営管理専用手続きページ）

**官方来源 URL:**
- https://www.moj.go.jp/isa/applications/procedures/16-3.html
- https://www.moj.go.jp/isa/applications/status/manager.html

**推荐动作:** `patch_existing`（keiei-kanri-2025-10にCycle 2メタデータ追加）／ または別途 `keiei-kanri-koushin-shorui` カード

---

### Topic 4: 永住基礎条件

**用户常见问法:**
- 永住申請に必要な年数は何年ですか
- 年金・健康保険の支払い漏れがあると永住に影響しますか
- 住民税の滞納があっても永住申請できますか
- 高度専門職は何年で永住できますか
- 直近の健康保険の加入証明は何年分必要ですか

**既存カード:**
- `eijuu-nenkin-risk` ✅（年金・税記録リスク / critical）
- `eijuu-zairyu-kikan` ✅（在留期間・就労期間要件 / high）
- `eijuu-tsujou-route` ✅（通常ルート概要 / high）

**不足している事実:**
- 永住申請の健康保険（健康保険証・保険料納付記録）の具体的要件
- 「健康保険の保険料の支払に係る書類」の内容（出典：ISA永住ガイドライン）

**官方来源 URL:**
- https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-04.html（年金記録）
- https://www.moj.go.jp/isa/applications/resources/nyukan_nyukan50.html（永住ガイドライン）

**来源部门:** ISA / 日本年金機構

**needs_review（灰区）:**
- 健保の具体的な確認年数（一般就労系2年 vs 高度人材1年 — needs_review_flag）

**推荐动作:** `patch_existing`（eijuu-nenkin-risk または eijuu-tsujou-route に健保要件補足）

---

### Topic 5: 家族滞在転工作签

**用户常见问法:**
- 家族滞在ビザで働けますか
- 家族滞在から就労ビザに変更できますか
- 家族滞在でアルバイトするには許可が必要ですか
- 家族滞在から技人国に変更するにはどうすればいいですか
- 夫が帰国したら私の家族滞在ビザはどうなりますか

**既存カード:**
- `kazoku-taizai-yoken` ✅（家族滞在要件・活動範囲 / high）
- `shikakugai-fukugyou` ✅（資格外活動リスク / human_reviewed）

**不足している事実:**
- 家族滞在→技人国・特定技能等の就労ビザへの変更手続き（申請先・必要書類）
- 扶養主の帰国・離婚・離婚時の在留リスク（spouse-divorce-separationは配偶者ビザが主対象）

**官方来源 URL:**
- https://www.moj.go.jp/isa/applications/status/dependent.html（家族滞在）
- https://www.moj.go.jp/isa/applications/procedures/16-2.html（在留資格変更）

**来源部门:** ISA

**推荐动作:** `new_card`（`kazoku-taizai-henko`）— 中リスク・中頻度。今バッチに入れるか次バッチへ延期可

---

### Topic 6: 離職後の入管届出 + 年金 + 健保

**用户常见问法:**
- 会社を辞めたら何の手続きが必要ですか
- 退職後の年金はどうすればいいですか
- 退職後の健康保険はどうすればいいですか
- 健保の任意継続と国保どちらがお得ですか
- 退職後の届出期限はいつまでですか
- 離職後すぐに次の会社に就職する場合は手続きが必要ですか

**既存カード:**
- `gijinkoku-job-change-notification` ✅（届出14日以内）
- `rishoku-kokumin-nenkin-kirikae` ✅（国民年金切換14日以内）
- **健康保険切換: NOT COVERED** ❌

**不足している事実（健保）:**
- 退職後の健康保険：任意継続（退職後20日以内・協会けんぽ）vs 国民健康保険（14日以内・市区町村）
- 任意継続の保険料（2年間・退職時の保険料の約2倍）
- 国保への加入は退職証明書 or 健保の喪失証明書が必要

**官方来源 URL:**
- https://www.kyoukaikenpo.or.jp/g3/cat315/sb3160/r151/ （協会けんぽ：任意継続）
- https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/iryouhoken/任意継続.html（厚労省）

**来源部门:** 協会けんぽ / 厚労省 / 市区町村

**推荐动作:** `new_card` — `rishoku-kenko-hoken`（退職後健保切換）⭐ **Part 2 最優先**

---

### Topic 7: 搬家後の住址/在留卡手续

**用户常见问法:**
- 引っ越したら在留カードの住所変更は必要ですか
- 住所変更の届出はどこでしますか
- 住所変更の期限は何日以内ですか
- 住民票の転入届と在留カードの届出は同じ窓口でできますか

**既存カード:**
- `zairyu-address-change` ✅（ai_verified / low / high）— 14日以内・市区町村

**不足している事実:** 主要事実は覆盖済。Cycle 2メタデータが未追加。

**推荐动作:** `patch_existing` — Cycle 2メタデータ追加（citation_label・applies_when等）

---

### Topic 8: 在留卡丢失/再交付

**用户常见问法:**
- 在留カードをなくしました。どうすればいいですか
- 在留カードを盗まれたときの手続きは
- 在留カード再交付の期限は何日以内ですか
- 届出受理番号とは何ですか
- 在留カード再交付はどこで申請しますか

**既存カード:**
- `zairyu-card-loss-reissue` ✅（ai_verified / high / high）— 14日以内・入管・警察届出

**不足している事実:** 覆盖済。Cycle 2メタデータ追加済（Batch 1 patch）。

**推荐动作:** no action required

---

### Topic 9: 住民税/課税証明/納税証明

**用户常见问法:**
- 住民税を払っていないと更新に影響しますか
- 課税証明書はどこで取得できますか
- 外国人も住民税を払わなければいけませんか
- 住民税の前年課税とはどういう意味ですか

**既存カード:**
- `juminzei-kazei-shomeisho` ✅（ai_verified / medium / medium）— Batch 2新規

**不足している事実:** 覆盖済。在留申請年数要件はneeds_reviewで適切に処理済。

**推荐动作:** no action required

---

### Topic 10: 脱退一時金

**用户常见问法:**
- 帰国前に年金を受け取れますか
- 脱退一時金の申請期限はいつまでですか
- 脱退一時金の上限月数は何ヶ月ですか
- 年金を6ヶ月しか払っていませんが申請できますか

**既存カード:**
- `nenkin-dattai-ichijikin` ✅（ai_verified / low / high）— Batch 2新規

**推荐动作:** no action required

---

### Topic 11: 国民年金切換（退職後）

**用户常见问法:**
- 退職後の年金手続きはどうすればいいですか
- 国民年金への切換期限は何日以内ですか
- 退職後に国民年金に入らないとどうなりますか

**既存カード:**
- `rishoku-kokumin-nenkin-kirikae` ✅（ai_verified / medium / high）— Batch 2新規

**推荐动作:** no action required

---

### Topic 12: 留学資格外活動（アルバイト）

**用户常见问法:**
- 留学生はアルバイトできますか
- 週何時間まで働けますか
- 夏休み中は週28時間を超えて働けますか
- 就職活動中のアルバイトは問題ありませんか

**既存カード:**
- `ryugaku-shikakugai-katsudo` ✅（ai_verified / high / high）— Batch 1新規

**推荐动作:** `patch_existing` — Cycle 2メタデータ追加

---

### Topic 13: 不許可/補材料/入管通知

**用户常见问法:**
- 在留資格更新の不許可通知が届きました。どうすればいいですか
- 入管から資料提出通知が届きました。何を準備すればいいですか
- 不許可後の審査請求の期限はいつまでですか
- 補正通知の14日以内という期限は変更できますか
- 不許可になった場合、そのまま在留できますか

**既存カード:**
- `nyukan-notice-response` ⚠️（needs_review / high / **low** confidence）— source未確認のため非注入

**不足している事実:**
- 不許可通知の審査請求期間（3ヶ月以内 — ISA規則要確認）
- 資料提出通知の14日以内という期限の根拠（ISA official page）
- 不許可後の在留可否（特例期間 or 即時出国要件 — source: zairyu-expiry-renewal-change参照）

**官方来源 URL:**
- https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html（在留資格取消の解説）
- ISA の不許可関連ページ（URL未確認・要WebSearch）

**来源部门:** ISA

**source_gap:** 補正通知・不許可通知の具体的対応手続き（ISA公式に専用ページが見当たらない）

**推荐动作:** `no_card_yet` — source gap が大きい。`nyukan-notice-response` はneeds_reviewのままとし、HANDOFF_TRIGGERS（行政書士への即時相談）で対処。次バッチで再チャレンジ。

---

### Topic 14: 配偶離婚後の届出と変更

**用户常见问法:**
- 離婚したら配偶者ビザはいつまで使えますか
- 離婚後6ヶ月以内に届出が必要と聞きましたが本当ですか
- 離婚後に在留資格を定住者に変更できますか
- 別居中でも配偶者ビザは維持できますか
- 離婚後の在留資格取消はいつ発動しますか

**既存カード:**
- `spouse-divorce-separation` ✅（human_reviewed / critical / high）— 6ヶ月届出・取消リスク・定住者転換

**推荐动作:** `patch_existing` — Cycle 2メタデータ追加（citation_label・applies_when等）

---

### Topic 15: 短期出国/みなし再入国

**用户常见问法:**
- 短期帰国する場合に再入国許可は必要ですか
- みなし再入国許可は何日まで有効ですか
- 1年以上海外にいると在留資格が失われますか
- 特別永住者のみなし再入国は何年まで有効ですか
- 在留期限が6ヶ月未満で出国する場合の注意点は

**既存カード:**
- `minashi-sainyuukoku` ✅（ai_verified / critical / medium — controlled_alpha_eligible:true）

**推荐动作:** `patch_existing` — Cycle 2メタデータ追加

---

## 覆盖サマリー

| 判定 | トピック数 | 主なトピック |
|------|---------|------------|
| ✅ 覆盖済（sync可） | 10 | 2・7・8・9・10・11・12・14・15 + 3一部 |
| ⚠️ 部分覆盖（事実補足必要） | 3 | 1（技人国更新書類）・4（健保記録）・6（健保切換） |
| ❌ 未覆盖 or needs_review | 2 | 5（家族滞在→就労変更）・13（不許可/補材料） |

### 主要 source gap

| 主題 | gap内容 | 最有力来源 |
|------|---------|----------|
| 退職後の健康保険 | 任意継続20日・国保14日の公式引用なし | 協会けんぽ / mhlw.go.jp |
| 技人国更新書類 | 標準提出書類一覧がカード化されていない | ISA 16-3.html |
| 永住申請の健保記録 | 健保の確認年数・書類種別 | ISA永住ガイドライン |
| 不許可後の対処 | ISA公式専用ページ見当たらない | — |

---

## Part 2 推荐カードリスト（8枚）

| # | slug | 種別 | risk | 選定理由 |
|---|------|------|------|---------|
| 1 | `rishoku-kenko-hoken` | NEW | medium | Topic 6の最大gap。健保任意継続20日以内・国保14日以内。協会けんぽ/mhlw確認要 |
| 2 | `gijinkoku-koushin-shorui` | NEW | high | Topic 1の書類gap。ISA 16-3.html直接確認可 |
| 3 | `kokumin-kenko-hoken-kanyu` | NEW | low | 国保加入手続き（退職・新来日時）。市区町村/mhlw source安定 |
| 4 | `zairyu-expiry-renewal-change` | PATCH | — | Cycle 2メタデータ追加。already human_reviewed |
| 5 | `kazoku-taizai-yoken` | PATCH | — | Cycle 2メタデータ追加。applies_when・does_not_cover |
| 6 | `shikakugai-fukugyou` | PATCH | — | Cycle 2メタデータ追加。already human_reviewed |
| 7 | `eijuu-zairyu-kikan` | PATCH | — | Cycle 2メタデータ追加 |
| 8 | `spouse-divorce-separation` | PATCH | — | Cycle 2メタデータ追加。already human_reviewed |

> 速查Tab直接使用可能トピック（ai_verified以上・source安定）:
> 2・4・5・6・7・8・9・10・11・12・14・15（12/15主題）

---

## 次バッチ候補（今回対象外）

| slug候補 | 理由 |
|---------|------|
| `kazoku-taizai-henko` | 家族滞在→就労ビザ変更。ISA source確認後 |
| `eijuu-kenko-hoken-kiroku` | 永住申請健保記録。ISAガイドラインのJSレンダリング問題 |
| `nyukan-fukyoka-taisho` | 不許可対処。ISA公式専用ページ不明 |
| `tokutei-ginou-koushin` | 特定技能更新。source確認後 |
| `kodo-senmon-shoku-metadata` | 高度専門職カードCycle 2メタデータ |

---

*generated by FACT-OPS (Cycle 2 / Coverage Sprint) — 2026-05-11*
