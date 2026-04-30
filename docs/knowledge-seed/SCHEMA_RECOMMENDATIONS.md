# Schema 建议（SCHEMA_RECOMMENDATIONS）

**生成时间**：2026-04-29
**分支**：`content/index-and-review-registry`
**目标读者**：CCA（Block 14+ schema 设计 + importer）

---

## 全局

CCB 已交付 4 类内容资产，结构完全不同 — 建议 **4 个独立表 + 1 个统一 importer 路由**：

| 表 | batch | 用途 | schema 状态 |
|---|---|---|---|
| `articles`（已有） | batch-01 / 02 / 03 | 一般知识库文章 | 已有 |
| `check_dimensions` | batch-04 / 05 | CleanB 续签自查表单维度 | batch-04 已实施，batch-05 复用 |
| `documents` | batch-06 | 拍照识别工具语义层 | **建议新建** |
| `scenarios` | batch-07 | 决策清单工具 | **建议新建** |

各表共享的「公共字段」（建议提取到所有表）：

```sql
slug                text         primary key
title               text
category            text
body_markdown       text         全文（含 frontmatter 后的正文）
requires_review     boolean      ⚠️ 复核标志（默认 false，⚠️ blockquote 存在 → true）
review_notes        text         复核备注（可空）
source_urls         text[]       从正文抽取的 markdown 链接
created_at          timestamptz
updated_at          timestamptz
published_at        timestamptz  上线时间（控制可见性）
```

`requires_review` 由 importer 自动判定：扫 markdown 是否含 `⚠️` → true。
上线后行政書士复核完毕 → 更新为 false + 填 `review_notes`。

---

## 1. `articles` 表（已有，仅扩字段）

batch-01 / 02 / 03 共 240 篇。建议保留现有 schema，仅按需补字段（已由 Block 13 / 14 完成）。

---

## 2. `check_dimensions` 表（batch-04 / 05 共 85 条）

### batch-04 已实施字段（沿用）

```sql
slug                       text     primary key   -- check-{visa_type_key}-{dimension_key}
title                      text
visa_type                  text                   -- 5 种
dimension_key              text                   -- 12 通用 + 5×5 visa-specific
dimension_version          int
priority                   text                   -- must_see | normal
expiry_days                int
estimated_read_time_minutes int
scenario_tags              text[]
applies_to                 text[]
urgency_level              text                   -- low | medium | high
questions                  jsonb                  -- 问题数组 [{id, text, type, show_if?}]
result_logic               jsonb                  -- {green, yellow, red} DSL 表达式
result_actions             jsonb                  -- {red[], yellow[]} action 数组
last_verified_at           date
sources_count              int

-- 公共字段
body_markdown              text
requires_review            boolean
review_notes               text
source_urls                text[]
created_at                 timestamptz
updated_at                 timestamptz
published_at               timestamptz
```

### CleanB 表单消费 SQL 例

```sql
-- 用户选 visa_type 后加载所有维度
SELECT * FROM check_dimensions
WHERE visa_type = $1
  AND published_at IS NOT NULL
ORDER BY priority DESC, expiry_days ASC;
```

### 与 documents / scenarios 的关联

`result_actions.red` / `yellow` 数组里的步骤可后续指向 documents / scenarios（按 dimension_key 关键词匹配）— 不需要外键，松耦合。

---

## 3. `documents` 表（batch-06 共 50 条）— **建议新建**

### 建议字段

```sql
slug                        text     primary key   -- doc-{document_name_jp_kebab}
title                       text
category                    text                    -- 税务 | 社保 | 在留 | 教育 | 育児 | 生活
document_type               text                    -- 滞納督促 | 申請結果通知 | 出頭通知 | 罰金通知 | 等
document_name_jp            text                    -- 日文原名（信封上的字）
document_number             text                    -- "01"-"50"
sender_type                 text                    -- 国税庁 | 市役所 | 入管 | 教育委員会 | NHK | 等
issuer                      text                    -- 实际発行者名（公司名 / 自治体名）
envelope_keywords           text[]                  -- 拍照识别用关键词数组（OCR 匹配）
has_payment                 boolean                 -- 是否含金額（决定是否走支払い flow）
has_deadline                boolean                 -- 是否有期限
typical_amount              text                    -- 「¥0」/ 「¥3,000-¥150,000」
typical_amount_range        text                    -- 同上（兼容）
typical_deadline            text                    -- 「30 日内」/「翌月末」/「期限なし」
action_window_days          int                     -- 处理窗口天数
priority                    text                    -- must_see | normal
estimated_read_time_minutes int
scenario_tags               text[]
applies_to                  text[]
urgency_level               text
related_to_visa             boolean                 -- 与续签 / 永住 / 経営・管理 直接关联
related_to_tax              boolean                 -- 与税务关联
related_to_childcare        boolean                 -- 与育児・教育关联
last_verified_at            date
sources_count               int

-- 公共字段
body_markdown               text
requires_review             boolean
review_notes                text
source_urls                 text[]
created_at                  timestamptz
updated_at                  timestamptz
published_at                timestamptz
```

### 拍照识别消费 SQL 例

```sql
-- OCR 提取关键词后的匹配查询
SELECT * FROM documents
WHERE published_at IS NOT NULL
  AND envelope_keywords && $1::text[]   -- 数组重叠
ORDER BY array_length(envelope_keywords & $1::text[], 1) DESC
LIMIT 3;
```

### Body Markdown 内容（importer 不解析，UI 直渲染）

每篇含 8 段 H2：信封长什么样 / 这是什么 / 为什么收到 / 必看的关键栏 / 不处理的后果 / 该怎么处理 / 续签关系 / 信息来源。

---

## 4. `scenarios` 表（batch-07 共 20 条）— **建议新建**

### 建议字段

```sql
slug                        text     primary key   -- scenario-{scenario_key}
title                       text
category                    text                    -- 生活 | 家庭 | 工作住房 | 重大里程碑
scenario_key                text                    -- 一致用 kebab-case
scenario_type               text                    -- state_change | milestone | preparation | emergency
life_event                  text                    -- "結婚" | "離婚" | "出産" | "離職" | "退職" | "引越" | 等
triggered_by                text[]                  -- 触发事件数组
priority                    text
estimated_read_time_minutes int
scenario_tags               text[]
applies_to                  text[]
urgency_level               text
timeline_stages             text[]                  -- "第 1 日" | "12 月前" | "6 月前" | 等
timeline_steps              jsonb                   -- 时间线详细 [{stage, must_do[], optional[]}]（可选，UI 渲染由 markdown 也可）
required_documents          text[]                  -- 关联 documents.slug 列表
required_actions            jsonb                   -- 必办事项 [{name, where, materials[], consequence}]
deadline_days               jsonb                   -- 各阶段 deadline_days
responsible_office          text[]                  -- 「市役所」「入管」「年金事務所」等
pitfalls                    jsonb                   -- 容易遗漏的坑 [{title, why, how_to_avoid}]
last_verified_at            date
sources_count               int

-- 公共字段
body_markdown               text
requires_review             boolean
review_notes                text
source_urls                 text[]
created_at                  timestamptz
updated_at                  timestamptz
published_at                timestamptz
```

### 决策清单消费 SQL 例

```sql
-- 用户选场景
SELECT * FROM scenarios WHERE scenario_key = $1 AND published_at IS NOT NULL;

-- 与 documents 关联（UI 渲染必办事项时）
SELECT * FROM documents
WHERE slug = ANY((SELECT required_documents FROM scenarios WHERE scenario_key = $1));
```

### Body Markdown 内容（importer 不解析，UI 直渲染）

每篇含 5 段 H2：适用场景 / 时间线 / 必办事项 / 容易遗漏的事 / 信息来源。

---

## 5. Importer 路由建议

新建 `npm run import-knowledge` 统一脚本，路由如下：

```typescript
// docs/knowledge-seed/{path} → table

const importRoutes = [
  // batch-01/02/03 (existing)
  { glob: 'docs/knowledge-seed/*.md',                        table: 'articles',          schema: articleSchema },
  // batch-04
  { glob: 'docs/knowledge-seed/check-dimensions/*/*.md',     table: 'check_dimensions',  schema: dimensionSchema },
  // batch-05
  { glob: 'docs/knowledge-seed/dimensions-visa-specific/*.md', table: 'check_dimensions', schema: dimensionSchema },
  // batch-06
  { glob: 'docs/knowledge-seed/documents/*.md',              table: 'documents',         schema: documentSchema },
  // batch-07
  { glob: 'docs/knowledge-seed/scenarios/*.md',              table: 'scenarios',         schema: scenarioSchema },
];

for (const { glob, table, schema } of importRoutes) {
  const files = globby.sync(glob);
  for (const f of files) {
    const { data: frontmatter, content: body } = matter.read(f);
    const requires_review = body.includes('⚠️');
    const source_urls = extractMarkdownLinks(body);
    await db.insertOnConflictDoUpdate(table, {
      ...schema.parse(frontmatter),
      body_markdown: body,
      requires_review,
      source_urls,
      updated_at: new Date(),
      published_at: now() // 或留待手动激活
    });
  }
}
```

---

## 6. requires_review 自动化

importer 实现统一规则：

```typescript
const requires_review = body.includes('⚠️') || frontmatter.requires_review === true;
```

上线策略：**`requires_review = true` 不阻断 published_at**。⚠️ 在 markdown body 顶部以 blockquote 形式可见 — UI 渲染时可单独展示「这部分内容含数据待书士复核」徽章。

---

## 7. Migration 顺序建议

```
0015_create_documents_table.sql
0016_create_scenarios_table.sql
0017_add_review_columns_to_existing_tables.sql  -- requires_review / review_notes / source_urls 三列
```

`source_urls` 也可以 lazy-add — 每次 import 重新计算即可。

---

## 8. 全局 review 后台 UI 建议

CCA 实现 admin 复核界面（在 settings / admin 区）：

1. 显示所有 `requires_review = true` 的条目
2. 按 `category` / `last_verified_at` / `批次` 过滤
3. 行政書士点开 → 看 markdown body + 关联 ⚠️ blockquote → 编辑 → 提交
4. 提交后自动：
   - `requires_review` → false
   - `review_notes` → 填入复核者名 + 注册号 + 备注
   - 移除 markdown body 顶部的 ⚠️ blockquote（可选，或保留作历史）

---

## 9. CCB 与 CCA 的边界确认

CCB 不写 importer。CCB 只交付：
- markdown 文件（`docs/knowledge-seed/{path}/...`）
- frontmatter 字段定义（如本文）
- 配套报告 / 索引 / registry

CCA 负责：
- schema migration
- importer 实现
- UI 渲染层（CleanB 表单 / 拍照识别 / 决策清单 / 复核后台）

---

🤖 by tebiq-knowledge-base skill / index-and-review-registry
