# Answer Full Release Report

## 基线
- branch: `launch/answer-full-release`
- base main: `c0d52f8`
- started at: `2026-04-30T19:04:27+09:00`

## 合入分支
| 分支 | 是否合入 | 说明 |
|---|---|---|
| `content/answer-seed-v0` | 是 | 100 条 answer seed + `ANSWER_SEED_V0_REPORT.md` |
| `codex/answer-engine-v0` | 是 | `/api/questions` / `/api/answer`、`/answer/[id]`、`answer_drafts`、migration `0021` |
| `codex/answer-result-ui-v0` | 是 | `/answer/[id]` 三状态视觉、review-lite answer draft UI；冲突中保留 engine API/DB 逻辑 |
| `codex/question-intake-ui-v2` | 是 | 首页情况入口、提问 UI、admin UI；冲突中保留 answer engine 提交流程 |
| `codex/login-email-ux-polish` | 未合入 | 已检查。该分支基于较早代码，整支 merge 会删除 answer engine / seed / UI 文件；本轮不引入该风险 |

## 关键结果
1. 用户提问是否返回答案: 是。`QuestionIntakeBox` 调 `/api/questions`，成功后有 `answer_id` 则跳 `/answer/[id]`，无 DB 时 inline 显示整理结果。
2. `/answer/[id]`: 是。支持 `matched / draft / cannot_determine`，并保留 `demo-matched / demo-draft / demo-cannot-determine`。
3. answer seed 是否读取: 是。新增 parser 支持 `docs/answer-seed/*.md` 内多个 `## Q001` block，解析 aliases / summary / sections / next_steps / source_hint。
4. 后台复核: 是。`/admin/review-lite` 显示 answer draft，可标记 `reviewed / needs_expert / rejected / unreviewed`。
5. timeline/raw JSON 是否清理: 是。用户侧提醒详情不再显示原始 JSON、`source: document`、`policy_match`；改为“记录内容 / 文书识别 / 政策更新”等可读表达。

## Migration
- 0021: `lib/db/migrations/0021_slow_maelstrom.sql`
- 是否非破坏性: 是。仅 `CREATE TABLE answer_drafts`、`ALTER TABLE answer_feedback ADD COLUMN answer_draft_id`、FK、索引。
- production 是否执行: 本地 release 分支未执行；合入 main 后执行 production migration。
- 表确认: 本地 schema 包含 `answer_drafts`，`answer_feedback.answer_draft_id`。

## 验证
- npm run lint: pass
- npx tsc: pass
- npm run build: pass
- npm run test: pass
- npm run db:generate: pass, no schema changes
- audit: pass (`npm run audit:launch-copy`)
- smoke: pass (`BASE_URL=http://localhost:3000 npm run smoke:launch`)

## 10 个测试问题
| 问题 | 返回类型 | 结果 |
|---|---|---|
| 公司休眠了要不要交国民年金？ | matched | 公司休眠后，新工作入职前，要不要切国民年金 |
| 办公室搬迁要做哪些手续？ | matched | 经营管理签办公室搬迁 |
| 永住者能不能带父母来日本养老？ | matched | 永住者带父母来日本长期养老 |
| 老板雇了签证不符的人我会不会受影响？ | matched | 老板雇错签证的人，员工或亲属会不会被牵连 |
| 特定技能1号能不能转工作签？ | matched | 特定技能 1 号转工作签前先确认什么 |
| 住民税晚交会影响永住吗？ | matched | 住民税晚交和永住准备 |
| 公司没有给我上社保怎么办？ | matched | 公司没有给我上社保时先确认什么 |
| 搬家后在留卡地址要不要改？ | matched | 搬家后在留卡地址要不要改 |
| 经营管理资本金不够怎么办？ | matched | 经营管理资本金不足时先看什么 |
| 留学生能不能转人文签？ | matched | 留学生转技人国前先确认什么 |

## production 抽测
| 路径 | 结果 |
|---|---|
| `/` | 本地 production 200 |
| `/answer/demo-matched` | 本地 production 200 |
| `/answer/demo-draft` | 本地 production 200 |
| `/answer/demo-cannot-determine` | 本地 production 200 |
| `/admin/review-lite` | 本地 production 200 |
| `/admin/questions` | 本地 production 200 |
| `/admin/questions/import` | 本地 production 200 |
| `/decision-lab` | 本地 production 200 |
| `/timeline` | 本地 production 200 |
| `/photo/sample-result` | 本地 production 200 |
| `/check` | 本地 production 200 |
| `/login` | 本地 production 200 |

## 是否可以推 main
是。核心条件已满足：提问不再只显示“已收到”；`/answer/[id]` 可访问；100 条 seed 可读取；timeline 用户侧 raw JSON 已清理；migration 0021 非破坏性。
