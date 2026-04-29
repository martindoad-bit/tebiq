# AI Handoff - CCB

最后更新: 2026-04-29（CCB Block 13+ batch-06 完成）

## CCB(内容)状态

- 当前任务: Block 13+ 知识 batch-06（50 篇高频文书逐封解读）
- 当前分支: content/knowledge-batch-06
- 当前 worktree: /tmp/cc-b-batch-04（共用，分支切换）
- 状态: **awaiting_merge**
- 最近一次 push: batch-06 50 篇文书 + 报告（见本次 commit）

## 给 CCA 的待办（batch-06 schema + importer）

### 引入新 frontmatter 字段（document 类专用）

batch-06 frontmatter **不能直接复用 articles / check_dimensions schema**，建议 CCA 新建 `documents` 表：

```
document_type: text
document_name_jp: text
document_number: text
sender_type: text
envelope_keywords: text[] / jsonb  (拍照识别用)
has_payment: boolean
has_deadline: boolean
typical_amount_range: text
action_window_days: int
priority: text (must_see / normal)
estimated_read_time_minutes: int
scenario_tags: text[]
applies_to: text[]
urgency_level: text
last_verified_at: date
sources_count: int
```

### 拍照识别消费逻辑

batch-06 = TEBIQ「拍照识别」工具的语义层：
1. 用户拍照 → OCR / vision model → 提取信封关键词
2. 匹配 `envelope_keywords` 或 `document_name_jp` → 找到对应 document
3. 渲染 8 段（信封长什么样 / 是什么 / 为什么收到 / 关键栏 / 后果 / 处理路径 / 续签影响 / 信息来源）
4. 归档到 user 时间线（产品哲学 v1：档案中心化）

### Importer 改造

- 新增 `documents` 表 schema migration
- 改造 import 脚本支持 `docs/knowledge-seed/documents/*.md` 路径
- 新建 `getDocumentByEnvelopeMatch(keywords[])` 查询函数

### Merge 顺序建议

1. 确认 batch-04 / batch-05 merge 状态
2. 决策 documents 表新建 vs articles 扩展
3. merge batch-06（content/knowledge-batch-06）
4. 跑 importer

### batch-06 内容统计

- 50 篇 .md 文件，5 分类（税务 / 社保 / 在留 / 教育育児 / 生活）
- 总字符 332,267，平均每篇 6,650 字符
- 政府来源 ≥1/篇（国税庁 / 厚労省 / 入管 / NHK / 経産省 / 文科省 / こども家庭庁 等）
- 39 篇含 ⚠️ 复核块（具体复核点见 BLOCK_BATCH06_REPORT.md）

### 文件路径

`docs/knowledge-seed/documents/{number}_{document_name_jp}.md`

## CCB 后续 batch（按 brief）

- **batch-07**：20-30 篇场景化决策清单（scenario 类）— 立即启动（不等 CCA review batch-06）
  - 文件路径：`docs/knowledge-seed/scenarios/{scenario_key}.md`
  - 可能需要新 schema：scenario_key / timeline_stages / required_actions / pitfalls 等

## 历史交付

- batch-01：初始化基础知识种子
- batch-02：50 篇旧结构 P0 内容
- batch-03：30 篇 P1 档案中心化内容（已 merge）
- batch-04：60 篇 CleanB 续签自查 P0 通用维度卡（已 merge）
- batch-05：25 篇 visa-specific 维度卡（awaiting_merge，schema 与 batch-04 同）
- **batch-06：50 篇高频文书逐封解读（awaiting_merge，需新 schema）**
- batch-07：20-30 篇场景化决策清单（开始）
