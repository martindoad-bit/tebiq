# TEBIQ Evidence Layer v1 — 来源升级报告
## 生成日：2026-05-11 | 分支：feat/cycle2-batch2-coverage

---

## 执行摘要

| 指标 | 数值 |
|------|------|
| 总处理卡片 | **55 张** |
| 精版卡（evidence_points） | **10 张 / 28 条 evidence_points** |
| 初版卡（related_links） | **45 张 / 73 条 related_links** |
| needs_domain_review: true | **1 条**（spouse-divorce-separation） |
| source_locator 缺失 | **0 条**（全部填写） |
| 组织名称修正 | 8 张卡（MHLW/nenkin.go.jp 被错误识别为 ISA，已修复） |

---

## 精版卡 evidence_points 完成情况（10 张）

| fact_id | evidence_points 数 | 来源机构 | needs_domain_review |
|---|---|---|---|
| zairyu-address-change | 3 | 出入国在留管理庁 | false |
| tensyoku-zairyu | 3 | 出入国在留管理庁 | false |
| rishoku-kokumin-nenkin-kirikae | 2 | 日本年金機構 | false |
| rishoku-kenko-hoken | 2 | 協会けんぽ / 厚生労働省 | false |
| zairyu-card-loss-reissue | 3 | 出入国在留管理庁 | false |
| zairyu-card-keitai-gimu | 3 | 出入国在留管理庁 | false |
| gaikokujin-koyo-todokede | 3 | 厚生労働省 | false |
| shikakugai-fukugyou | 4 | 出入国在留管理庁（2 URL） | false |
| spouse-divorce-separation | 3 | 出入国在留管理庁（2 URL） | **1 条 true** |
| minashi-sainyuukoku | 2 | 出入国在留管理庁 | false |

**needs_domain_review: true の詳細：**

| カード | claim | 理由 |
|---|---|---|
| spouse-divorce-separation | 取消し前の意見聴取・30日出国猶予 | critical 卡の取消し手続き詳細。official ソースで確認済みだが critical リスクのため DOMAIN 二重確認推奨 |

---

## 初版卡 related_links 完成情況（45 张）

全 45 张均已添加至少 1 条 related_links（最多 3 条）。来源均为各卡原 `official_sources` 字段中的官方 URL。

**按来源机构分布：**

| 机构 | 卡片数 |
|---|---|
| 出入国在留管理庁 | 29 |
| 厚生労働省 | 8 |
| 日本年金機構 | 3 |
| 国税庁 | 3 |
| 全国健康保険協会（協会けんぽ） | 1 |
| デジタル庁等 | 1 |

---

## needs_domain_review: true 一覧

| fact_id | evidence_point claim | review 理由 |
|---|---|---|
| spouse-divorce-separation | 取消し前の意見聴取・最大30日の出国猶予 | risk_level=critical のため DOMAIN による二重確認推奨。ISA 公式ページで確認済みだが、「最大30日」の正確な法令根拠（第22条の4何項か）の明示が必要 |

---

## source_locator 欠缺列表

**0 件** — 全 28 条 evidence_points に source_locator を記載済み。

---

## 点击错位リスクが最も高いカード

以下のカードは URL → 実際のコンテンツ位置が離れており、ユーザーが目的の情報にたどり着けない可能性がある。

| fact_id | リスク内容 | 推奨対応 |
|---|---|---|
| zairyu-card-keitai-gimu | `zairyu_01.html` は「各種届出」の総合ページで常時携帯義務の記述が見つかりにくい。入管法条文（第23条・第75条）は e-gov ページの方が直接的 | e-gov 法令ページ（`https://elaws.e-gov.go.jp/document?lawid=326CO0000000319`）を evidence_points に追加することを推奨 |
| minashi-sainyuukoku | `16-5.html` は再入国許可申請ページで、みなし再入国の1年ルールは埋もれている可能性。URL が ISA 内の新 URL 体系（`isa/immigration/` 配下）に変わっており 404 リスクあり | URL 生存確認・アンカー確認を DOMAIN 抽検時に実施推奨 |
| zairyu-card-loss-reissue | FAQ ページ（`newimmiact_4_port-city.html`）は汎用ページで再交付申請の記述が深い階層にある | `nyuukokukanri10_00010.html`（再交付申請専用ページ）の方が直接的 → evidence_points には専用ページ優先で記載済み |
| kogaku-ryoyo-hi | 高額療養費の限度額は毎年 PDF でのみ公開されており、HTML ページからリンクが変わる頻度が高い | DOMAIN P2 フラグ（`income_bracket_amounts_source`）あり。UI 側で「最新値は MHLW 公式を参照」を明示推奨 |
| startup-visa-keiei-transition | state=ai_extracted。related_links はあるが evidence_points なし。ページ URL が古い可能性あり | sync 対象外カード。UI 配信前に DOMAIN 全審査必須 |
| ikusei-shuroh-seido | 育成就労制度は 2027年4月施行前。関連ページ URL が整備途中の可能性 | 施行前後で URL 構成が変わるリスク。2027年4月以降の再確認スケジュールを DOMAIN が管理推奨 |

---

## Codex 答案ページ優先展示推奨ソース（15 件）

以下は UI 展示した場合にユーザーへの付加価値が最も高く、URL 安定性も高いソース。

| 優先度 | fact_id | display_label | URL | 根拠 |
|---|---|---|---|---|
| ★★★ | zairyu-address-change | 住居地変更届出（14日以内） | `https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00023.html` | 最頻出問い合わせ。URL 安定・内容直接的 |
| ★★★ | tensyoku-zairyu | 転職時14日届出義務 | `https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00015.html` | 就労者全般に関係。手続きが具体的 |
| ★★★ | zairyu-card-loss-reissue | 在留カード再交付（14日以内） | `https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00010.html` | 緊急対応が必要なユーザーに即有用 |
| ★★★ | gaikokujin-koyo-todokede | 外国人雇用届出義務 | `https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/gaikokujin/todokede/index.html` | 雇用主側の義務を直接確認できる |
| ★★★ | rishoku-kenko-hoken | 任意継続（20日以内） | `https://www.kyoukaikenpo.or.jp/benefit/voluntary_continuation/` | 退職直後の行動を即案内できる |
| ★★★ | rishoku-kokumin-nenkin-kirikae | 退職後14日以内の年金切換 | `https://www.nenkin.go.jp/service/kokunen/kanyu/20140710-03.html` | 期限明確・URL 安定 |
| ★★ | spouse-divorce-separation | 離婚後14日以内の届出義務 | `https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00016.html` | 離婚という高ストレス場面で即引用できる |
| ★★ | spouse-divorce-separation | 配偶者活動6か月不実施→取消 | `https://www.moj.go.jp/isa/applications/procedures/torikeshi_00002.html` | critical リスクの根拠を直接示せる |
| ★★ | shikakugai-fukugyou | 資格外活動許可の原則 | `https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html` | 副業に関する最多問い合わせの根拠 |
| ★★ | shikakugai-fukugyou | 留学生28時間ルール | `https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html` | 留学生からの最頻問い合わせ |
| ★★ | minashi-sainyuukoku | みなし再入国許可（1年ルール） | `https://www.moj.go.jp/isa/immigration/procedures/16-5.html` | 一時帰国前の必須確認 |
| ★★ | zairyu-card-keitai-gimu | 在留カード常時携帯義務・罰則 | `https://www.moj.go.jp/isa/applications/procedures/zairyu_01.html` | 全外国人に関係する基本義務 |
| ★ | rishoku-kenko-hoken | 国保加入（14日以内） | `https://www.mhlw.go.jp/stf/newpage_21539.html` | 国保加入資格の公式確認 |
| ★ | gaikokujin-koyo-todokede | 届出期限（被保険者/非被保険者別） | 上記と同 URL | 雇用主が最も迷う期限の区分 |
| ★ | tensyoku-zairyu | 電子届出（24時間・資料不要） | 上記と同 URL | オンライン完結できることを伝えれば UX 向上 |

---

## UI 配信判断（Codex 向け）

### 即座に UI 展示可能
- 10張精版卡の全 evidence_points（ただし `spouse-divorce-separation` の1条は DOMAIN 確認推奨）
- 45張初版卡の related_links（`startup-visa-keiei-transition` を除く）

### UI 配信前に DOMAIN 確認推奨
- `spouse-divorce-separation` の `needs_domain_review: true` 条（意見聴取・30日猶予の法令根拠）
- `zairyu-card-keitai-gimu` の evidence_points（e-gov 法令 URL 追加を推奨）
- `minashi-sainyuukoku` の evidence_points（URL 生存確認）

### UI 配信対象外
- `startup-visa-keiei-transition`（state=ai_extracted、related_links はあるが evidence_points なし）

---

## 技術メモ（Codex 向け schema 設計）

精版 `evidence_points` フィールド構造：
```yaml
evidence_points:
  - claim: string           # この来源支撑的具体事実
    source_title: string    # ページタイトル
    source_url: string      # 公式 URL
    source_organization: string  # 発行機関
    source_locator: string  # ページ内検索ガイド
    display_label: string   # 前台短标题
    support_level: direct|indirect|background
    user_visible: boolean
    needs_domain_review: boolean
```

初版 `related_links` フィールド構造：
```yaml
related_links:
  - title: string
    url: string
    organization: string
    display_label: string
    locator: string
    relation: official_reference|supplementary|background
```

---

## Changelog

| 日付 | 担当 | 変更内容 |
|---|---|---|
| 2026-05-11 | FACT-OPS (Evidence Layer v1) | 55張全カードに evidence_points（精版10張・28条）または related_links（初版45張・73条）を追加。組織名8件修正。needs_domain_review 1件。source_locator 欠落0件。 |
