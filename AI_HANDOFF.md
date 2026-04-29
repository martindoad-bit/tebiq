# AI Handoff Index

最后更新: 2026-04-29T05:26:06Z

## 分文件状态

- CCA(代码): 见 `AI_HANDOFF_CCA.md`
- CCB(内容): 见 `AI_HANDOFF_CCB.md`
- codexUI(视觉): 见 `AI_HANDOFF_UI.md`

## 协作规则

- 每个 AI 只更新自己的 handoff 文件。
- `AI_HANDOFF.md` 只保留索引和异常报告。
- 如果发生跨界冲突或产品哲学冲突，在本文件追加异常报告。

## 异常报告

- §任务清单里的 CCA / CCB / codexUI 任务均为占位文字，没有实际任务内容。
- brief 声称 Block 10 已完成且 production 已上线，但 `origin/main` 未包含 `origin/codex/block-10`。这是 git 状态与文字背景不一致；CCA 未自动 merge，避免越权改变 production main。
- 第二轮任务 0 再次确认：`git merge-base --is-ancestor origin/codex/block-10 origin/main` 返回未合并。任务 1（merge `content/knowledge-batch-02` + import）已按指令暂停。
- 本轮已按创始人新指令继续：production `/ask` 在 merge 前返回 `404`；Block 10 merge/push 成功；knowledge batch-02 merge/push 成功。
- `import-knowledge` 异常：生产数据库报错 `column "visibility" of relation "articles" does not exist`。这表示 articles schema 未包含 Block 9/10 的 `visibility` 字段。CCA 没有擅自执行 `db:migrate` 或其它 DDL，任务 5 production 验证已暂停。
- Block 11 已生成 migration `0013_hard_kate_bishop.sql`。合并/部署前应先确认 production 能按顺序跑 0011/0012/0013，否则 `/timeline` 和 import 都会因 schema 缺列失败。
- Block 11 final 只读检查结果：production `drizzle.__drizzle_migrations` 只有 5 条记录，本地共有 15 个 migration；未应用 `0005` - `0014`。关键缺失：`articles.visibility`、article tag columns、`members.archive_retention_until`、trial/delete columns、`timeline_events`。CCA 未执行任何 production DDL。
