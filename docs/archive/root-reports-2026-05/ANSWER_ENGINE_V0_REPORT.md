# Answer Engine v0 Report

## 本轮完成
1. 将前台提问从“提交收集”改为“立即整理答案”：`POST /api/questions` 和 `POST /api/answer` 返回结构化回答。
2. 新增 `/answer/[id]` 结果页，展示回答状态、答案等级、摘要、分区、下一步、来源、边界说明和反馈按钮。
3. 新增 `answer_drafts` 存储回答草稿，并让所有提问同时进入 `query_backlog` 和后台复核链路。
4. `/admin/review-lite` 增加 answer draft 列表，可标记 `reviewed / needs_expert / rejected / unreviewed` 并保存 note。
5. `QuestionIntakeBox` 按钮改为“整理这个问题”，提交中显示“正在整理...”，不再只显示“已收到”。
6. 10 个指定测试问题均返回 `matched / draft / cannot_determine` 之一，没有空结果。

## 回答类型
- matched: 命中 Decision Card、QA 高频问答 seed、或 repo 内 check dimension markdown 时返回“已整理”。
- draft: 未命中已整理内容，但可以按一般手续路径拆解时返回“初步整理，尚未人工复核”。
- cannot_determine: 个案事实不足、处分/公司异常/材料不足等高风险场景，返回“这个情况需要进一步确认”并给确认清单。

## 数据来源
- QA: `lib/answer/answer-seeds.ts` 内置第一批高频 QA seed。
- decision cards: `docs/decision-seed-cards/**` 和内置 fallback decision cards。
- check dimensions: `docs/knowledge-seed/check-dimensions/**` 与 `docs/knowledge-seed/dimensions-visa-specific/**`。
- articles: v0 未直接查 DB articles；后续可把已审核 article 纳入轻量 matcher。

## AI 使用
- 是否使用: 本轮没有接实时 AI。
- model: 无。
- 无 env 时 fallback: 规则整理与 cannot_determine 清单可在无 `DATABASE_URL`、无 AI env 时正常返回；DB 写入失败不让前台白屏。

## 后台
- answer draft: 新表 `answer_drafts` 保存问题、回答类型、review 状态、sections、next_steps、sources。
- review-lite: 增加 answer draft 列表和状态更新；Decision Card 原审核表单保留。
- feedback: `/answer/[id]` 底部反馈写入 `answer_feedback.answer_draft_id`；DB 不可用时安全失败。

## Migration
- 新增 migration: `lib/db/migrations/0021_slow_maelstrom.sql`
- 内容: `CREATE TABLE answer_drafts`，`ALTER TABLE answer_feedback ADD COLUMN answer_draft_id`，新增 FK 和索引。
- 破坏性: 无 `DROP TABLE` / `DROP COLUMN` / rename / 数据删除。
- production: 本分支不执行 production migration；集成前需按流程 review 后运行。

## 指定问题验证
| 问题 | 结果 |
|---|---|
| 公司休眠了要不要交国民年金？ | matched / reviewed |
| 办公室搬迁要做哪些手续？ | matched / reviewed |
| 永住者能不能带父母来日本养老？ | matched / reviewed |
| 老板雇了签证不符的人我会不会受影响？ | matched / reviewed |
| 特定技能1号能不能转工作签？ | matched / reviewed |
| 住民税晚交会影响永住吗？ | matched / reviewed |
| 公司没有给我上社保怎么办？ | matched / reviewed |
| 搬家后在留卡地址要不要改？ | matched / reviewed |
| 经营管理资本金不够怎么办？ | matched / reviewed |
| 留学生能不能转人文签？ | matched / reviewed |

## 验证
- lint: pass (`npm run lint`)
- tsc: pass (`npx tsc --noEmit`)
- build: pass (`npm run build`)
- test: pass (`npm run test`)
- db:generate: pass (`npm run db:generate`, second run reports no schema changes)
- local production smoke:
  - `/` 200
  - `/answer/test-missing` 200
  - `/admin/review-lite` 200
  - `/admin/questions` 200
  - `/decision-lab` 200
  - `POST /api/questions` returns `matched / draft / cannot_determine` instead of “已收到”

## 未完成
1. 尚未接实时 AI 起草；v0 用规则整理和 seed/markdown matcher。
2. 尚未把 DB articles 纳入 matcher；后续可只读取 `visibility='public'` 且已审核的 article。
3. 无 DB 本地环境无法生成真实 `/answer/[id]` 记录页，只能验证 inline fallback 和 missing page；production DB 迁移后可保存并跳转。

## 是否建议集成
是。原因：核心路径已经从“只收集问题”改成“立即返回结构化答案”，且 DB 写入、后台复核、反馈都保持非破坏性。集成前需要 review 并执行 `0021_slow_maelstrom.sql`。
