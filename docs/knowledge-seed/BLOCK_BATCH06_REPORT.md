# BLOCK 13+ 知识库 batch-06 完成报告（CCB）

**生成时间**：2026-04-29
**分支**：`content/knowledge-batch-06`（基于 origin/main HEAD `4d2a325`）
**状态**：push 完成，**未 merge**（CCA 决策 schema migration 是否需要 + importer 改造）

---

## 完成情况

### 50 封高频文书逐封解读

按 brief 5 分类：

| 分类 | 范围 | 篇数 | 寄件人方向 |
|---|---|---|---|
| **税务类** | 01-10 | 10 | 国税庁 / 市役所 / 税務署 / 都道府県 |
| **社会保障类** | 11-20 | 10 | 厚労省 / 日本年金機構 / 健保組合 / 福祉事務所 / ハローワーク |
| **在留類** | 21-30 | 10 | 出入国在留管理庁 / 簡易裁判所 / 検察庁 |
| **教育・育児類** | 31-40 | 10 | 市役所 / 教育委員会 / 学校 / JASSO |
| **生活类** | 41-50 | 10 | 電力 / ガス / 水道 / NHK / 不動産 / 町内会 |

### 总字符数

- 50 篇文件总字符：**332,267**
- 平均每篇约 6,650 字符（含 frontmatter / 中日混合 / markdown 链接）

### 政府来源引用

每篇 ≥1 个真实 .go.jp / .moj.go.jp / .nta.go.jp / .mhlw.go.jp 等政府公式 markdown 链接 + 取得日 2026-04-29。
50 篇覆盖：国税庁 / 総務省 / 厚生労働省 / 出入国在留管理庁 / 法務省 / 日本年金機構 / 協会けんぽ / こども家庭庁 / 文部科学省 / 経済産業省 / 国土交通省 / 環境省 / NHK / e-Gov 法令 / JASSO 等。

### ⚠️ 复核标记

50 篇中 **39 篇含 ⚠️ blockquote 复核块**（在 frontmatter 之后、正文 H1 之前）。
分布：税务 10/10 / 社会保障 3/10 / 在留 10/10 / 教育育児 5/10 / 生活 10+/10（部分多个 ⚠️）。

主要复核点（汇总）：
- 税务：督促状手数料 / 延滞金利率 / 国保上限額 / 国民年金月額 / 加算税税率 / インボイス経過措置
- 社保：介護保険料滞納在永住評価权重 / 児童手当 2024 拡充各自治体差异 / 生活保護 在留外国人受給資格
- 在留：不許可後 異議申立 期限 / 永住「引き続き」出国日数运用 / 2024 永住法 改正后取消事由 / 罰金後 永住申請 待機期间
- 教育・育児：保育料滞纳 vs 国保 同等量级 / 就学援助 vs 永住独立生計 / 海外修学旅行 みなし再入国 整合
- 生活：NHK 海外転出時解約手続 现行运用 / 共益費滞納 / 駐車場契約 / 電気・ガス・水道 供給停止 时间梯度

---

## 50 篇清单

### 税务类 01-10

| # | 文件 | 主题 |
|---|---|---|
| 01 | `01_juuminzei-nouzeitsuuchi.md` | 住民税 納税通知書 |
| 02 | `02_kokumin-kenkouhokenryou-nouzeitsuuchi.md` | 国民健康保険料 納税通知書 |
| 03 | `03_kokumin-nenkin-nouzeitsuuchi.md` | 国民年金 納付書 |
| 04 | `04_koteisisanzei-nouzeitsuuchi.md` | 固定資産税 納税通知書 |
| 05 | `05_jidousha-zei-nouzeitsuuchi.md` | 自動車税種別割 納税通知書 |
| 06 | `06_shotokuzei-shinkokunoufu.md` | 所得税 確定申告書 / 納付書 |
| 07 | `07_shouhi-zei-shinkokunoufu.md` | 消費税 申告納付書 |
| 08 | `08_shi-ken-minzei-tokubetsu.md` | 市県民税 特別徴収 通知書 |
| 09 | `09_fukko-tokubetsu-shotokuzei.md` | 復興特別所得税 通知 |
| 10 | `10_tokuso-kakutei-shinkoku-an.md` | 確定申告 案内ハガキ |

### 社会保障类 11-20

| # | 文件 | 主题 |
|---|---|---|
| 11 | `11_kaigo-hokenryou-nouzeitsuuchi.md` | 介護保険料 納付通知書 |
| 12 | `12_koyou-hoken-jukyu-shikaku-shouni-tsuuchi.md` | 雇用保険 受給資格者証 |
| 13 | `13_nenkin-menjo-shinsei-kekka.md` | 国民年金 免除申請 結果通知 |
| 14 | `14_jidou-teate-genkyou-todoke.md` | 児童手当 現況届 |
| 15 | `15_jidou-fuyou-teate-shinsei.md` | 児童扶養手当 認定通知 |
| 16 | `16_kenkou-hoken-kyuuhu-tsuuchi.md` | 健康保険 給付決定通知書 |
| 17 | `17_seikatsu-hogo-shinsei-kekka.md` | 生活保護 申請結果通知 |
| 18 | `18_shoubyoutewate-shoumeisho.md` | 傷病手当金 支給決定通知 |
| 19 | `19_shussantewate-shoumeisho.md` | 出産手当金 支給決定通知 |
| 20 | `20_kougakuiryouhi-shikyukettei.md` | 高額療養費 支給決定通知 |

### 在留類 21-30

| # | 文件 | 主题 |
|---|---|---|
| 21 | `21_zairyu-koushin-shinsei-kekka.md` | 在留期間更新 申請 結果通知 |
| 22 | `22_zairyu-shikaku-henkou-kekka.md` | 在留資格変更 申請 結果通知 |
| 23 | `23_sai-nyuukoku-kyokasho.md` | 再入国許可書（みなし含む） |
| 24 | `24_eijuu-shinsei-kekka.md` | 永住許可申請 結果通知 |
| 25 | `25_shuurou-shikaku-shoumeisho.md` | 就労資格証明書 |
| 26 | `26_nyuukan-fugou-tsuuchi.md` | 入管 不許可通知書（理由付） |
| 27 | `27_tsuika-shiryou-teishutsu-irai.md` | 追加資料提出依頼 / 補正通知 |
| 28 | `28_tokurei-kikan-setsumeisho.md` | 特例期間 説明書 / 通知 |
| 29 | `29_shutsutou-tsuuchi.md` | 出頭通知書 / 召喚状 |
| 30 | `30_bakkin-tsuuchi.md` | 罰金通知 / 略式命令書 |

### 教育・育児類 31-40

| # | 文件 | 主题 |
|---|---|---|
| 31 | `31_hoikuen-nyuuen-tsuuchi.md` | 保育園 入園決定通知書 |
| 32 | `32_hoikuryou-kettei-tsuuchi.md` | 保育料 決定通知書 |
| 33 | `33_shuugaku-tsuuchi.md` | 就学通知書（小・中入学） |
| 34 | `34_shuugaku-enjo-tsuuchi.md` | 就学援助 認定通知書 |
| 35 | `35_kyuushokuhi-shoumeisho.md` | 給食費 納付書 |
| 36 | `36_pta-kaihi-noufu.md` | PTA 会費 納付案内 |
| 37 | `37_shuugakuryokouhi-noufu.md` | 修学旅行費 積立 / 納付書 |
| 38 | `38_shougakukin-tsuuchi.md` | 奨学金 採用 / 振込通知書 |
| 39 | `39_jidou-nyuugaku-junbi.md` | 児童 入学準備 案内 |
| 40 | `40_sotsugyou-kanren-tsuuchi.md` | 卒業関連 通知 |

### 生活类 41-50

| # | 文件 | 主题 |
|---|---|---|
| 41 | `41_denki-tainou-tsuuchi.md` | 電気料金 滞納督促 |
| 42 | `42_gas-tainou-tsuuchi.md` | ガス料金 滞納督促 |
| 43 | `43_suidou-tainou-tsuuchi.md` | 水道料金 滞納督促 |
| 44 | `44_nhk-jushinryou-tsuuchi.md` | NHK 受信料 督促 / 訴訟予告 |
| 45 | `45_juutaku-keiyaku-koushin.md` | 住宅 賃貸契約 更新通知 |
| 46 | `46_chuusha-jou-keiyaku.md` | 駐車場 契約 / 契約更新 |
| 47 | `47_kyouekihi-tainou.md` | 共益費 / 管理費 滞納督促 |
| 48 | `48_sodaigomi-kashuu.md` | 粗大ゴミ 回収申込確認 |
| 49 | `49_chounaikai-kaihi.md` | 町内会 / 自治会 会費 案内 |
| 50 | `50_gomi-ihan-tsuuchi.md` | ゴミ違反通知 / 警告 |

---

## Frontmatter 新 schema 字段（CCA Block 14+）

batch-06 引入 **新 frontmatter 字段（document 类专用）**，articles / dimensions 表 schema 无法直接消费，建议新建 `documents` 表：

```yaml
slug: doc-{document_name_jp_kebab}
title: ...
document_type: 税务通知 | 社保通知 | 在留通知 | 教育通知 | 生活通知 | 滞納督促 | 申請結果通知 | 出頭通知 | 罰金通知
document_name_jp: <日文原名>
document_number: "01"-"50"
sender_type: 国税庁 | 市役所 | 区役所 | 都道府県 | 税務署 | 日本年金機構 | 健康保険組合 | 協会けんぽ |
             ハローワーク | 福祉事務所 | こども家庭庁 | 出入国在留管理庁 | 簡易裁判所 | 検察庁 |
             教育委員会 | 学校 | JASSO | 電力会社 | ガス会社 | 水道局 | NHK | 不動産会社 |
             大家 | 管理組合 | 町内会 | PTA
envelope_keywords: ["...", "..."]   # 拍照识别用关键词数组
has_payment: bool
has_deadline: bool
typical_amount_range: "<¥0-¥XXX,XXX>"
action_window_days: int
priority: must_see | normal
estimated_read_time_minutes: int
scenario_tags: [...]
applies_to: [...]
urgency_level: low | medium | high
last_verified_at: "2026-04-29"
sources_count: int

# 兼容旧字段
requires_shoshi_review: null
last_reviewed_by_name: null
last_reviewed_by_registration: null
review_notes: null
```

---

## 给 CCA 的待办（Block 14+）

### 方案选择

- **方案 A**：扩展 `articles` 表加 column（document_type / sender_type / envelope_keywords / has_payment 等）
  - 优点：单表 简单
  - 缺点：articles 字段越来越胖，dimension / scenario / document 不同结构混杂
- **方案 B（推荐）**：新建 `documents` 表（与 articles / check_dimensions 解耦）
  - 优点：拍照识别后跳转单表 / envelope_keywords 单独索引
  - 缺点：多表 + importer 多份

### 拍照识别消费逻辑

batch-06 是 TEBIQ「拍照识别」工具的语义层：
1. 用户拍照 → OCR / vision model → 提取关键字
2. 匹配 `envelope_keywords` 或 `document_name_jp` → 找到对应 document
3. 渲染 8 段（信封长什么样 / 这是什么 / 为什么收到 / 必看的关键栏 / 不处理的后果 / 该怎么处理 / 续签影响 / 信息来源）
4. 把识别结果归档到 user 时间线（按 product-philosophy v1）

importer 改造点：
- 新增 documents 表 schema migration
- 改造 import 脚本支持 `docs/knowledge-seed/documents/*.md` 路径
- 新建 `getDocumentByEnvelopeMatch(keywords[])` 查询函数

### Schema 兼容字段保留

`requires_shoshi_review` / `last_reviewed_by_*` / `review_notes` 全部 null（schema 兼容历史 articles 表）。

---

## 哲学 + 结构合规

### Voice 铁律（每篇都自查通过）

- ✓ 工具感 voice：「已归档 / 已识别 / 督促状已寄达 / 期限冲突」
- ✓ 不撒娇 / 不温情 / 不戏剧化 / 不 emoji
- ✓ 「行政書士」/「弁護士」三个字仅在「该怎么处理 → 路径 C」末尾或与续签关系段唯一引流句出现
  - 部分文档（PTA 会費 / 給食費）因不需要法律服务而省略引流句
- ✓ 中日混合：术语全保留日文原文（住民税 / 確定申告 / 督促状 / 差押 / 在留期間更新 / 介護保険 / 雇用保険 / 健康保険 / 児童手当 / 生活保護 / 保育園 / 給食費 / 奨学金 / 受信料 / 賃貸契約 / 共益費 / 粗大ゴミ / 等）

### 结构 8 段（每篇都有）

1. `## 信封长什么样`（寄件人 / 封面印字 / 颜色 / 同梱物）
2. `## 这是什么`
3. `## 为什么收到`
4. `## 必看的关键栏`
5. `## 不处理的后果（時間梯度）`
6. `## 该怎么处理（3 种典型路径）`
7. `## 这封信和续签 / 永住 / 経営・管理 的关系`
8. `## 信息来源`

### 法定 vs 实务区分

每篇严格区分「法定数字（法令明文）」vs「实务通说（書士实操）」，模糊数字标 ⚠️。

### 特殊处理

- **NHK**：引用最高裁 2017/12/6 判決，写制度 + 路径，不写「该不该交」
- **生活保護**：写制度 + 受給后在留影响，不评价是否申请
- **DV 議題**（spouse 维度，batch-05 已处理）+ 特殊配偶ビザ 文书未在 batch-06 内
- **入管 不許可**：异议申立 vs 行政訴訟 区分写

---

## batch-07 预告

按 brief 三批节奏：
- **batch-07**：20-30 篇场景化决策清单（scenario 类）— 立即启动
  - 文件路径：`docs/knowledge-seed/scenarios/{scenario_key}.md`
  - 新 schema：scenario_key / timeline_stages / required_actions / pitfalls 等
  - 涵盖：刚来日本 / 婚姻变动 / 离职 / 公司倒闭 / 孩子出生 / 搬家 / 怀孕 / 退休 / 永住前 / 帰化前 / 高額療養 / 雇用保険 / 回国清算 / 父母探亲 / 转学 / 房屋更新 / 工作签证更新 / 国保社保切换 / 灾害救助 等

---

## 文件位置

- 50 篇 markdown：`docs/knowledge-seed/documents/{number}_{document_name_jp}.md`
- 本报告：`docs/knowledge-seed/BLOCK_BATCH06_REPORT.md`

🤖 by tebiq-knowledge-base skill (Block 13+ batch-06 / product-philosophy v1)
