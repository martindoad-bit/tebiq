# AI Handoff Log

最后更新: 2026-04-29T00:00:00Z

## CCA(代码)状态
- 当前任务: Block 11 final adjustment - 首页回到 Block 10 框架 + 试用/定价 + production DB sync
- 当前分支: codex/block-11
- 状态: awaiting_merge
- 最近一次 push: `84d8a19`（Block 11 final adjustment code commit；另有 handoff 更新 commit）
- 给其他 AI 的通知: CCA 已按创始人最新方向调整 Block 11。首页不再强调“档案”，文字即懂入口隐藏，定价改为 ¥980/月 + ¥8,800/年，注册自动 7 天试用，新增隐私政策和设置页。production DB 只读检查确认 0005-0014 未应用，不能在未 review 前执行 `db:push` / `db:migrate`。

## CCB(内容)状态
- 当前任务: Block 11 知识 batch-03（30 篇 P1 内容）
- 当前分支: content/knowledge-batch-03
- 当前 worktree: /Users/martin/Documents/tebiq/.claude/worktrees/cc-b
- 状态: awaiting_merge
- 最近一次 push: batch-03 30 篇 P1 内容已完成并 push
- 给 CCA 的待办: batch-03 30 篇 P1 内容已完成，awaiting_merge；merge 后等 production DB schema 补齐再跑 `npm run import-knowledge`。

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
