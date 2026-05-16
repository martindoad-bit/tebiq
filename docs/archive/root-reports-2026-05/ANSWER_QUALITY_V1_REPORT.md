# Answer Quality v1 Report

## 合入分支
- content/answer-seed-v1: 已合入，100 条 answer seed 保留，新增 aliases / test_queries / first_screen_answer / why_not_simple_answer / expert_handoff。
- answer-timeline-ux-fix-v1: 已合入，保留用户侧 timeline 字段清理、答案页状态视觉和首页文案修复。

## 关键修复
1. contact_email 前台移除：`QuestionIntakeBox` 不再显示「邮箱（可选）」，API 仍兼容旧字段。
2. first_screen_answer 接入：answer seed loader 读取 v1 字段，优先作为 seed answer 的首屏摘要和行动答案输入。
3. why_not_simple_answer / expert_handoff 接入：高风险 seed 会把“为什么不能简单回答”和专家交接点写入 answer sections 与 action formatter。
4. answer view model 改成行动答案：新增 `lib/answer/format-action-answer.ts`，输出 conclusion / what_to_do / where_to_go / how_to_do / documents_needed / deadline_or_timing / consequences / expert_handoff / boundary_note。
5. 用户侧技术字段清理：`/answer/[id]` 不再渲染 `summary / sections / next_steps` 标签；`/api/questions` public response 改为返回 `action_answer`，不再返回 raw sections。

## 10 个问题测试
| 问题 | 返回类型 | 是否有行动答案 | 备注 |
|---|---|---|---|
| 办公室搬迁要做哪些手续？ | matched | 是 | 命中经营管理事務所搬迁，包含法務局、税務署、入管、社保/银行、租赁合同、归档、后果和专家确认点 |
| 公司休眠了要不要交国民年金？ | cannot_determine | 是 | 返回进一步确认路径 |
| 永住者能不能带父母来日本养老？ | matched | 是 | 接入 misconception seed |
| 老板雇了签证不符的人我会不会受影响？ | matched | 是 | 接入 risk-chain seed |
| 特定技能1号能不能转工作签？ | matched | 是 | 命中工作签转换 seed |
| 住民税晚交会影响永住吗？ | matched | 是 | 命中永住纳税 seed |
| 公司没有给我上社保怎么办？ | matched | 是 | 命中社保确认 seed |
| 搬家后在留卡地址要不要改？ | matched | 是 | 命中搬家届出 seed |
| 经营管理资本金不够怎么办？ | matched | 是 | 命中经营管理资本金 seed |
| 留学生能不能转人文签？ | matched | 是 | 命中留学生转技人国 seed |

## 验证
- lint: pass
- tsc: pass
- build: pass
- test: pass
- db:generate: pass, No schema changes
- audit: pass
- test:answer-quality: pass

## 本地 production 抽测
- `/`: 200，首页只显示「整理这个问题」，未显示「邮箱（可选）」。
- `/answer/demo-matched`: 200，显示行动答案区块。
- `/answer/demo-draft`: 200。
- `/answer/demo-cannot-determine`: 200。
- `/timeline`: 200，用户侧 raw JSON / `policy_match` 链接未回退。
- `/photo/sample-result`: 200。
- `/admin/review-lite`: 200。
- `POST /api/questions` with “办公室搬迁要做哪些手续？”: 返回 `action_answer`，未返回 raw `summary / sections / next_steps`。

## 是否建议推 main
是。

原因：
- 所有必跑验证通过。
- 10 个测试问题都有行动答案。
- 首页提问入口不再收邮箱。
- `/answer/[id]` 已从结构化字段展示改为行动答案。
- timeline raw 字段清理未破坏。
- 没有新增 migration，不需要 production DB 写入。
