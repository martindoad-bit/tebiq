# AI Handoff Log

最后更新: 2026-04-28T13:06:00Z

## CCA(代码)状态
- 当前任务: Block 11 final adjustment - 首页回到 Block 10 框架 + 试用/定价 + production DB sync
- 当前分支: codex/block-11
- 状态: awaiting_merge
- 最近一次 push: `84d8a19`（Block 11 final adjustment code commit；另有 handoff 更新 commit）
- 给其他 AI 的通知: CCA 已按创始人最新方向调整 Block 11。首页不再强调“档案”，文字即懂入口隐藏，定价改为 ¥980/月 + ¥8,800/年，注册自动 7 天试用，新增隐私政策和设置页。production DB 只读检查确认 0005-0014 未应用，不能在未 review 前执行 `db:push` / `db:migrate`。

## CCB(内容)状态
- 当前任务: knowledge batch-02
- 当前分支: content/knowledge-batch-02
- 状态: idle
- 最近一次 push: `7f67896391d45bb0f7e8047565e6e99081cc04f1`
- 给 CCA 的待办: batch-02 已 merge 到 main；import 未成功，等待 DB schema 迁移后重跑。

## codexUI(视觉)状态
- 当前任务: 未从本 brief 获得具体 codexUI 任务
- 当前分支: codex/visual-polish-N
- 状态: idle
- 最近一次 push: 无
- 给 CCA 的待办: 等 CCA merge `codex/block-11` 后再从最新 main 开工 visual-polish-3；也可先查看 `docs/visual-report/screenshots/block-11-timeline/`。

## 异常报告
- §任务清单里的 CCA / CCB / codexUI 任务均为占位文字，没有实际任务内容。
- brief 声称 Block 10 已完成且 production 已上线，但 `origin/main` 未包含 `origin/codex/block-10`。这是 git 状态与文字背景不一致；CCA 未自动 merge，避免越权改变 production main。
- 第二轮任务 0 再次确认：`git merge-base --is-ancestor origin/codex/block-10 origin/main` 返回未合并。任务 1（merge `content/knowledge-batch-02` + import）已按指令暂停。
- 本轮已按创始人新指令继续：production `/ask` 在 merge 前返回 `404`；Block 10 merge/push 成功；knowledge batch-02 merge/push 成功。
- `import-knowledge` 异常：生产数据库报错 `column "visibility" of relation "articles" does not exist`。这表示 articles schema 未包含 Block 9/10 的 `visibility` 字段。CCA 没有擅自执行 `db:migrate` 或其它 DDL，任务 5 production 验证已暂停。
- Block 11 已生成 migration `0013_hard_kate_bishop.sql`。合并/部署前应先确认 production 能按顺序跑 0011/0012/0013，否则 `/timeline` 和 import 都会因 schema 缺列失败。
- Block 11 final 只读检查结果：production `drizzle.__drizzle_migrations` 只有 5 条记录，本地共有 15 个 migration；未应用 `0005` - `0014`。关键缺失：`articles.visibility`、article tag columns、`members.archive_retention_until`、trial/delete columns、`timeline_events`。CCA 未执行任何 production DDL。
