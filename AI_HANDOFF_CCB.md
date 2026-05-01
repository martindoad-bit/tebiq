# AI Handoff - CCB

最后更新: 2026-05-01（CCB content/material-lists-v1 完成）

## CCB(内容)状态

- 当前任务: 官方材料清单 v1（暂停扩写答案，转「官方材料清单 + 高频模板」整理）
- 当前分支: `content/material-lists-v1`（基于 `origin/main`）
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**

## 本次交付

按创始人 brief：用户不需要在材料清单里再做复杂检查；材料清单贴近入管局公开资料 + 按身份 / 会社类别清楚分组。不写长解释 / 不做检查题 / 输出结构化清单。

### 新建文件

| 文件 | 用途 |
|---|---|
| `docs/material-lists/OFFICIAL_MATERIAL_LISTS_V1.md` | 6 类签证 + 10 类常见材料清单 |
| `docs/material-lists/MATERIAL_LISTS_REPORT.md` | 报告（schema 建议 + 接入路径）|

### 6 类签证清单（每类 6 字段）

适用对象 / 官方材料 / 常见补充材料 / 哪里取得 / 注意事项 / 不要提交·容易误解

1. 技人国（技術・人文知識・国際業務）— 在留期間更新
2. 経営・管理 — 在留期間更新 / 新規申請
3. 家族滞在 — 在留期間更新 / 新規申請
4. 永住者 — 永住許可申請
5. 定住者 — 在留資格変更 / 新規申請
6. 日本人配偶者等 / 永住者の配偶者等 — 在留資格変更 / 新規申請

### 10 类常见材料

1. 年金 納付状況
2. 住民税
3. 健康保険
4. 住民票
5. 課税証明書
6. 納税証明書
7. 在職証明書
8. 雇用契約書
9. 公司 法定調書 / 法人税申告書
10. 决算書

### 主要机关（CCA 路径索引）

出入国在留管理庁 / 居住地市区町村役所 / 法務局 / 税務署 / 都道府県税事務所 / 年金事務所 + ねんきんネット / 健保組合 + 協会けんぽ / 中国户籍所在地 + 公証 + 駐日大使馆 / 公証役場（日本）+ 翻訳業者 / DV センター + 警察 / ハローワーク / 顧問税理士

## 给 CCA 的待办

### 新 schema：`material_lists` 表

```sql
list_id PRIMARY KEY
category text          -- visa | common
visa_type / common_type
applies_to / official_documents[] / supplementary[]
where_to_get jsonb     -- {document, location} 数组
notes[] / do_not_submit[]
last_verified_at / requires_review / updated_at
```

### Importer 路由

`docs/material-lists/OFFICIAL_MATERIAL_LISTS_V1.md` → 用 `### N. xxx` heading 切分 → `material_lists` 表

### 前端渲染

- 用户选签证类型 → 加载对应 visa 6 字段
- 单材料查询 → 命中 common（哪里取得 + 注意事项）
- 「不要提交」→ misconception 提示框
- 复制材料清单按钮（≤200 字模板）

### 与既有数据关系

| 数据层 | 命中场景 |
|---|---|
| material_lists（本次新增）| 用户问「办 X 要带什么」|
| answer-gold-standard | benchmark 命中 |
| answer-seed v1 | 100 条 fallback |
| articles 知识库 | 文章 fallback |

material_lists 与 answer 类内容互补 — answer 重「下一步动作」，material_lists 重「材料清单本体」。

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
- **content/material-lists-v1：6 类签证清单 + 10 类常见材料**
