# 材料清单报告（MATERIAL_LISTS_REPORT）

**生成**：2026-05-01
**分支**：`content/material-lists-v1`（基于 `origin/main`）
**任务性质**：从扩写答案转为「官方材料清单」整理 — 贴近入管局公开资料 / 不写长解释 / 不做检查题 / 输出结构化清单。

---

## 完成情况

### 6 类签证 / 在留資格

| # | 类型 | 状态 |
|---|---|---|
| 1 | 技人国（技術・人文知識・国際業務）| ✓ |
| 2 | 経営・管理 | ✓ |
| 3 | 家族滞在 | ✓ |
| 4 | 永住者（永住許可申請） | ✓ |
| 5 | 定住者 | ✓ |
| 6 | 日本人配偶者等 / 永住者の配偶者等 | ✓ |

### 10 类常见材料

| # | 材料 | 状态 |
|---|---|---|
| 1 | 年金 納付状況 | ✓ |
| 2 | 住民税 | ✓ |
| 3 | 健康保険 | ✓ |
| 4 | 住民票 | ✓ |
| 5 | 課税証明書 | ✓ |
| 6 | 納税証明書 | ✓ |
| 7 | 在職証明書 | ✓ |
| 8 | 雇用契約書 | ✓ |
| 9 | 公司 法定調書 / 法人税申告書 | ✓ |
| 10 | 决算書 | ✓ |

---

## 每类清单 6 字段结构

每类签证 / 身份按 brief 6 字段结构：

```
1. 适用对象
2. 官方材料
3. 常见补充材料
4. 哪里取得（含表格）
5. 注意事项
6. 不要提交 / 容易误解
```

10 类常见材料按简化 2 字段：
- 哪里取得
- 注意事项

---

## 哪里取得（汇总）

主要机关清单（CCA 可作为路径索引）：

| 机关 | 提供材料 |
|---|---|
| 出入国在留管理庁 | 申請書様式 |
| 居住地市区町村 役所 課税課 | 課税証明書 |
| 居住地市区町村 役所 納税課 | 納税証明書 / 完納証明書 |
| 居住地市区町村 役所 戸籍住民課 | 住民票 / 戸籍関連 |
| 居住地市区町村 役所 国保年金課 | 国保完納証明 / 国民年金 |
| 法務局 | 法人登記事項証明書 / 戸籍 |
| 税務署 | 国税 納税証明書 / 法人税申告書写し |
| 都道府県税事務所 | 法人事業税 / 都道府県民税 |
| 年金事務所 + ねんきんネット | 年金 納付状況 |
| 健保組合 / 協会けんぽ | 健保 完納証明書 |
| 中国户籍所在地 公安局 | 戸口簿 / 結婚証 |
| 中国公証役場 | 公証 |
| 中国驻日大使馆 | 認証 |
| 公証役場（日本）+ 翻訳業者 | 日本語翻訳 |
| DV センター（#8008）+ 警察（#9110）| DV 関連書類 |
| ハローワーク | 雇用保険 関連 |
| 顧問税理士 / 法人内 経理 | 決算書 / 法人税申告書 |

---

## 不要提交 / 容易误解（共通）

按签证类型 提取共通误解：

### 通用误解
- ✗ 仅 LINE / WeChat / SNS 聊天记录 → 不构成婚姻 / 抚养立证
- ✗ 仅照片（不限张数）→ 不构成主要立证
- ✗ 中国侧 結婚証 / 戸口簿 仅翻訳 + 无公証 + 无 認証 → 不接受
- ✗ 旅行記録 / 訪問日记 → 写在経緯書即可，不需要详细文档

### 経営・管理 误解
- ✗ 個人 銀行残高証明書（法人看資本金 ≠ 個人預金）
- ✗ 役員 学歴証明書（无要件，2025 改正后修士可加分）
- ✗ 取引先 仅口头承诺（必须有書面契約 + 振込記録）

### 永住 误解
- ✗ 母国 戸口簿 / 父母関連書類（永住 看个人）
- ✗ 帰化 用書類（永住 ≠ 帰化）
- ✗ 銀行外貨送金記録（仅推荐，非要件）

### 家族滞在 / 配偶者 误解
- ✗ 父母 / 兄弟姐妹 関連書類（不在対象）
- ✗ 配偶者 個人 銀行残高証明書（看课税年収）

### 定住者 误解
- ✗ 親族関係 立证（看本人 + 在日实态）
- ✗ 永住 / 帰化 用書類（要件不同）

---

## 给 CCA 的接入建议

### 1. 新建 `material_lists` 表

```sql
CREATE TABLE material_lists (
    list_id              text PRIMARY KEY,
    category             text,           -- visa | common
    visa_type            text,           -- 6 类签证之一
    common_type          text,           -- 10 类常见材料之一
    applies_to           text,           -- 适用对象
    official_documents   text[],         -- 官方材料
    supplementary        text[],         -- 常见补充材料
    where_to_get         jsonb,          -- {document, location} 数组
    notes                text[],         -- 注意事项
    do_not_submit        text[],         -- 不要提交 / 容易误解
    last_verified_at     date,
    requires_review      boolean,
    updated_at           timestamptz
);
```

### 2. Importer 路由

`docs/material-lists/OFFICIAL_MATERIAL_LISTS_V1.md` → 用 `### N. xxx` heading 切分 → `material_lists` 表

### 3. 前端渲染

- 用户选签证类型 → 加载对应 visa 类清单（6 字段展开）
- 单材料查询 → 命中 common 类（哪里取得 + 注意事项）
- 「不要提交」→ misconception 提示框（红色或弱化色）
- 「常见补充材料」→ 折叠展示

### 4. 与既有数据关系

| 数据层 | 文件 | 命中场景 |
|---|---|---|
| **material_lists**（本次新增）| `docs/material-lists/OFFICIAL_MATERIAL_LISTS_V1.md` | 用户问「我办 X 要带什么」 |
| answer-gold-standard | `docs/answer-gold-standard/BENCHMARK_ANSWER_GOLD_V1.md` | benchmark 命中 |
| answer-seed v1 | `docs/answer-seed/answer_seed_*.md` | 100 条 fallback |
| 知识库 articles | `docs/knowledge-seed/*.md` | 文章 fallback |

material_lists 与 answer 类内容 互补 — answer 重「下一步动作」，material_lists 重「材料清单本体」。

### 5. 复制给客户场景

每类清单底部可加「复制材料清单」按钮，文案模板：

```
[签证类型] 材料清单：
官方材料：[列 5-8 项]
常见补充：[列 3-5 项]
取得地：[去哪办主要 2-3 个]
不要提交：[列 1-2 项 容易误解]
```

不超过 200 字，可直接复制粘贴到客户聊天。

---

## 边界

- ✗ 不写长解释 / 不做检查题 / 不写文章
- ✗ 不替用户做行政决定
- ✓ 贴近入管局公开资料（出入国在留管理庁 / 法務省 / 国税庁 / 厚生労働省 / 日本年金機構）
- ✓ 中日混合术语保留（在留資格 / 在留期間更新 / 経営・管理 / 永住 / 配偶者 等）
- ✓ 不写「保证 / 一定 / 拒签概率」
- ✓ 不出现「这个问题不能简单回答」

---

## 历次交付

- batch-01-04：已 merge to main
- batch-05/06/07：awaiting_merge
- content/index-and-review-registry：4 治理文件
- content/real-question-data-v1：152 个 Q + TOP 20 + 5 seed YAML
- content/answer-seed-v0：100 条 answer seed
- content/answer-seed-v1：v0 强化（aliases 837 / test_queries 350 / TOP30 / 26 高风险）
- content/answer-copy-rewrite-v1：TOP 50 action_answer + Q032 重点
- content/product-copy-v1：BIBLE + HOMEPAGE 3 版 + customer_facing_answer
- content/answer-copy-qa-v2：10 个 BM benchmark + must_match 规则
- content/app-copy-final-v2：APP_COPY_FINAL + 删冗词 77 处
- content/answer-gold-standard-v1：10 个 GOLD 金标准答案
- **content/material-lists-v1：6 类签证清单 + 10 类常见材料 + report**

---

🤖 by tebiq-knowledge-base skill / material-lists-v1
