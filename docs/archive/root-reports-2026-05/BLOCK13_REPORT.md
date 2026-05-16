# BLOCK13_REPORT.md

日期: 2026-04-29
分支: `codex/block-13`

## 完成情况

### 1. C-lean-B 续签自查入口

- `/check` 改为维度清单首屏，不再先进入问卷。
- `/check/[visa]` 显示对应签证类型的维度清单。
- 顶部保留「完整自查」小入口，进入 `/check/[visa]/quiz`。
- 支持 5 个签证类型：
  - `technical_humanities_international`
  - `management`
  - `spouse`
  - `permanent_resident_preparation`
  - `specified_skilled_worker`
- 旧 slug 仍兼容：`gijinkoku / keiei / haigusha / teijusha / tokutei` 会映射到新类型。

### 2. 维度状态模型

新增 schema + migration：

- `0015_check_runs.sql`
  - `check_runs`
  - `check_dimension_status` enum
  - `check_dimension_event_type` enum
- `0016_check_dimension_results.sql`
  - `check_dimension_results`
- `0017_check_dimension_events.sql`
  - `check_dimension_events`

状态支持：

- `unchecked` → 未查
- `checked` → 已查
- `needs_action` → 需处理
- `recent` → 3月内已查
- `expired` → 已过期

风险标记文案保持克制：

- 建议必看
- 递交前确认
- 档案触发

### 3. 完整问卷回写维度状态

- 完整问卷完成后，`/api/results/save` 会：
  - 保存 `quiz_results`
  - 写 `timeline_events`
  - 创建 `check_runs`
  - upsert 对应 `check_dimension_results`
  - 写 `check_dimension_events`
- 匿名用户的自查维度结果注册后会随 session 迁移到 member。

### 4. 我的提醒整合

- `/timeline` 增加「自查事项」区块。
- 显示 `check_dimension_results.status = needs_action` 的前 5 项。
- 无事项时显示：`暂无自查事项。完整自查完成后会进入这里。`

## 设计取舍

- `docs/research/checklist-vs-quiz.md` 在当前 main/worktree 未找到；本次按 brief 明确要求实现，报告标记为待补输入。
- 维度内容先用本地 stub 定义，后续可由 CCB batch-04/import 后接入知识内容。
- `permanent_resident_preparation` 暂时复用现有 `teijusha` 完整问卷题库作为过渡。
- `management / spouse / specified_skilled_worker` 复用现有对应题库。
- 快速扫描模式、多成员/家庭/HR、经管合规看板未做，按 brief 留后续。

## 验证

- `npx tsc --noEmit` 通过。
- `npm run lint` 通过，无 warning。
- `npm run db:generate` 二次执行返回 `No schema changes`。
- `npm run test` 通过，7/7。
- `npm run build` 通过。

## 待 review

- 研究文档 `docs/research/checklist-vs-quiz.md` 缺失；如果后续补入 γ 报告 4.4，需要对字段名和维度定义再核对一次。
- migration 已按 brief 拆成 0015-0017；Drizzle snapshot 使用最终 `0017_snapshot.json`。
