# AI Handoff Log

最后更新: 2026-04-27T(CCB Block 12 batch-04 完成)

## CCA(代码)状态
- 当前任务: Block 11 final adjustment - 首页回到 Block 10 框架 + 试用/定价 + production DB sync
- 当前分支: codex/block-11
- 状态: awaiting_merge
- 最近一次 push: `84d8a19`（Block 11 final adjustment code commit；另有 handoff 更新 commit）
- 给其他 AI 的通知: CCA 已按创始人最新方向调整 Block 11。首页不再强调"档案"，文字即懂入口隐藏，定价改为 ¥980/月 + ¥8,800/年，注册自动 7 天试用，新增隐私政策和设置页。production DB 只读检查确认 0005-0014 未应用，不能在未 review 前执行 `db:push` / `db:migrate`。

## CCB(内容)状态
- 当前任务: Block 12 知识 batch-04（CleanB 续签自查 60 篇 P0 维度卡）
- 当前分支: content/knowledge-batch-04
- 当前 worktree: /tmp/cc-b-batch-04
- 状态: **awaiting_merge**
- 最近一次 push: batch-04 60 篇维度卡 + 报告 + handoff 更新（见本次 commit）
- 给 CCA 的待办（Block 13 schema + importer）:
  - **batch-04（60 篇）等待 schema design + merge**：内容已 push 到 origin/content/knowledge-batch-04
  - **batch-04 引入新 frontmatter 字段**，需 CCA Block 13 决定 schema 路径：
    - `visa_type` (text) — 5 种 visa_type
    - `dimension_key` (text) — 12 个通用维度 + 后续 visa-specific
    - `dimension_version` (int)
    - `priority` (text: must_see / normal)
    - `expiry_days` (int)
    - `questions` (jsonb) — 问题数组
    - `result_logic` (jsonb) — green/yellow/red DSL
    - `result_actions` (jsonb) — green/yellow/red action 数组
  - **方案 A**：扩展现有 `articles` 表加 column
  - **方案 B**：新建 `check_dimensions` 表（与 articles 解耦，CleanB 表单消费）
  - CCB 这次 push **不写 importer**，等 CCA Block 13 schema 设计落地后由 CCA 一并处理
  - **CleanB 表单消费逻辑**：用户选 visa_type → 加载该目录下 12 篇 → 按 priority + expiry_days 排序 → 用户答 questions → 按 result_logic 表达式 evaluate → 出 green/yellow/red → 红/黄拉 result_actions 渲染步骤
  - 旧 worktree `cc-b`（content/knowledge-batch-03）和 `quizzical-turing-84919f`（content/knowledge-batch-02）按指令保留
- batch-04 内容路径：`docs/knowledge-seed/check-dimensions/{visa_type}/{dimension_key}.md`
- 报告：`docs/knowledge-seed/BLOCK_BATCH04_REPORT.md`
- 第二批 17-24 篇 visa-specific 维度未做（建议 CCA Block 13 schema 落地后下批次再做）

## codexUI(视觉)状态
- 当前任务: Block 11 U1 - 已在 PROJECT_MEMORY.md 视觉规范段顶部沉淀产品哲学 v1；等待 CCA 完成 Block 11 主页 / timeline / pricing 路由与结构后再开始 U2-U7
- 当前分支: codex/visual-polish-3
- 状态: idle
- 最近一次 push: Block 11 U1 产品哲学沉淀 commit（见 codex/visual-polish-3 HEAD）
- 给 CCA 的待办: codexUI 已完成 U1 并推送；不开始 U2-U7，等待 CCA 在 main / codex/block-11 完成档案中心化主页、/timeline、/pricing 结构后通知。开始视觉前会先从最新 main 更新本分支。

## 异常报告
- §任务清单里的 CCA / CCB / codexUI 任务均为占位文字，没有实际任务内容。
- brief 声称 Block 10 已完成且 production 已上线，但 `origin/main` 未包含 `origin/codex/block-10`。这是 git 状态与文字背景不一致；CCA 未自动 merge，避免越权改变 production main。
- 第二轮任务 0 再次确认：`git merge-base --is-ancestor origin/codex/block-10 origin/main` 返回未合并。任务 1（merge `content/knowledge-batch-02` + import）已按指令暂停。
- 本轮已按创始人新指令继续：production `/ask` 在 merge 前返回 `404`；Block 10 merge/push 成功；knowledge batch-02 merge/push 成功。
- `import-knowledge` 异常：生产数据库报错 `column "visibility" of relation "articles" does not exist`。这表示 articles schema 未包含 Block 9/10 的 `visibility` 字段。CCA 没有擅自执行 `db:migrate` 或其它 DDL，任务 5 production 验证已暂停。
- Block 11 已生成 migration `0013_hard_kate_bishop.sql`。合并/部署前应先确认 production 能按顺序跑 0011/0012/0013，否则 `/timeline` 和 import 都会因 schema 缺列失败。
- Block 11 final 只读检查结果：production `drizzle.__drizzle_migrations` 只有 5 条记录，本地共有 15 个 migration；未应用 `0005` - `0014`。关键缺失：`articles.visibility`、article tag columns、`members.archive_retention_until`、trial/delete columns、`timeline_events`。CCA 未执行任何 production DDL。
- batch-04 frontmatter 包含旧 importer 不识别的 jsonb 字段（questions / result_logic / result_actions）。当前 importer 不能直接消费，必须等 CCA Block 13 schema + importer adapter。
