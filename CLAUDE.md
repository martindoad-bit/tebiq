# TEBIQ — AI 开工入口（Claude Code）

> Claude Code 入口。详细规范见 `AGENTS.md`。
> 所有 AI 窗口开始任何任务前必须先读此文件，然后读 `AGENTS.md`。
> 如无法读取此文件，必须停止，不得凭记忆执行任务。

## TEBIQ 是什么

**面向在日外国人的在留风险管理服务系统。**

TEBIQ 不是 AI 签证问答 App、不是签证知识库、不是行政书士官网。
核心逻辑：发现用户没有问、但会影响结果的在留风险，并推进到下一步行动。

## 必读顺序

| 步骤 | 文件 | 场景 |
|------|------|------|
| 1 | 本文件（CLAUDE.md） | 所有窗口 |
| 2 | `docs/ops/TEBIQ_CURRENT_STATE.md` | 所有窗口（当前工程快照）|
| 3 | `docs/product/TEBIQ_CONTEXT_PACK.md` | 所有窗口（长期产品原则）|
| 4 | `docs/product/TEBIQ_QA_GATES.md` | QA / PR 审计 |
| 5 | `docs/product/TEBIQ_COPY_SOURCE.md` | 文案相关任务 |
| 6 | `docs/ops/TEBIQ_ROLES.md` | 不确定自己任务边界时 |

## 事实源优先级

当不同来源存在冲突时，按以下顺序判断哪个是真相：

1. **用户/CEO 本轮明确给出的最新事实**
2. **GitHub remote 状态**（`gh pr list`、`git log origin/main --oneline -5`）
3. **Vercel build-info / deployment 状态**
4. **`docs/ops/TEBIQ_CURRENT_STATE.md`**（repo 内短期状态快照）
5. 当前本地 worktree 内容

**如果发现冲突：停止，报告冲突，等待裁决。不得继续基于冲突状态执行任务。**

## Freshness Check（开工前必做）

```bash
git fetch origin
git log origin/main --oneline -5
gh pr list
```

然后打开 `docs/ops/TEBIQ_CURRENT_STATE.md`，对比：

- main HEAD 是否与文件记录一致？
- 有无新合并的 PR 未反映在文件中？
- CURRENT_STATE `last_verified` 日期是否超过 3 天？

差异或超龄 → 标注 stale，报告 GM，再继续任务。

完整协议见 `docs/ops/TEBIQ_FRESHNESS_PROTOCOL.md`。

## STOP 条件

遇到以下任何情况必须停止并报告，不得继续：

- 无法读取 `docs/product/TEBIQ_CONTEXT_PACK.md`
- 无法读取 `docs/ops/TEBIQ_CURRENT_STATE.md`
- 发现事实源冲突（如文档说 PR 已 merge，但 remote 显示未 merge）
- 任务要求修改产品定位或在留/签证专业结论
- 任务要求执行超出本角色边界的操作

## 角色边界摘要

开工前确认你是哪个角色：

| 角色 | 边界摘要 |
|------|----------|
| CEO / 用户 | 最终业务裁决、在留业务专家 |
| GPT 产品负责人 | 产品战略、阶段目标、路线 |
| GM | AI 协作流程、上下文管理、PR 顺序、文档制度 |
| ENGINE | 具体代码实现 |
| QA | 测试与审计 |
| DOMAIN-CC | 在留语义复核 |

详细边界见 `docs/ops/TEBIQ_ROLES.md`。
