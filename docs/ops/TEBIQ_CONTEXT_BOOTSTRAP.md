# TEBIQ Context Bootstrap — 所有窗口开工流程

> 每个 AI 窗口开始任何任务前必须执行此流程。
> 不执行 bootstrap 就开始工作，产出无效。

---

> GM 窗口额外必读：`docs/ops/TEBIQ_GM_OPERATING_PRINCIPLES.md`（工作信条 + 总监级自检）

## 步骤

### Step 1 — 同步 remote 状态

```bash
git fetch origin --prune
git log origin/main --oneline -5
```

记下 `origin/main` HEAD 的 commit SHA 和标题。

**如果 `gh` 可用：**
```bash
gh pr list --state open
```

**如果 `gh` 不可用（降级）：**
```
手动打开 GitHub repo → Pull Requests → Open
记录所有 OPEN PR 的编号、标题、分支
```

**绝对不信本地 worktree 的单方面说法。** 本地 worktree 可能是陈旧的、局部的或从旧 commit 分叉出来的。

### Step 2 — 读取必读文档

按顺序读取：

1. `AGENTS.md`（角色边界、STOP 条件、事实源优先级）
2. `docs/product/TEBIQ_CONTEXT_PACK.md`（长期产品宪法）
3. `docs/product/TEBIQ_CURRENT_STATE.md`（当前工程快照）
4. `docs/product/TEBIQ_DECISION_LOG.md`（最近 2 条决策条目）
5. 本任务相关文档（QA 任务读 `TEBIQ_QA_GATES.md`；文案任务读 `TEBIQ_COPY_SOURCE.md`；协作流程读 `docs/ops/TEBIQ_AGENT_WORKFLOW.md`）

**Hard-required files — 不存在时必须停止：**
- `AGENTS.md`、`docs/product/TEBIQ_CONTEXT_PACK.md`、`docs/product/TEBIQ_CURRENT_STATE.md`

**Task-specific files — 不存在时报告，不一定停止：**
- QA 任务找不到 `TEBIQ_QA_GATES.md` → 停止
- 文案任务找不到 `TEBIQ_COPY_SOURCE.md` → 停止
- 其他任务找不到非 hard-required 文件 → 报告给 GM，说明影响，然后视任务性质决定是否继续

### Step 3 — 对比一致性

| 检查项 | 行动 |
|--------|------|
| `CURRENT_STATE.main_head` ≠ `git log origin/main` HEAD | **停止**，向 GM 报告；等 CURRENT_STATE 更新后再继续 |
| 有 OPEN PR 未记录在 `CURRENT_STATE` | 标注在 Context Stamp `local-only-observations` |
| `CURRENT_STATE.last_verified` ≤ 3 天，main_head 一致 | fresh，继续 |
| `CURRENT_STATE.last_verified` ≤ 3 天，main_head 已变 | partial stale，标注差异，小心继续 |
| `CURRENT_STATE.last_verified` > 3 天 | stale，向 GM 报告 |
| `CURRENT_STATE.last_verified` > 7 天 | **停止**，不得继续 |
| 用户本轮事实与 repo / CURRENT_STATE 冲突 | **停止**，输出 CONFLICT REPORT，等待裁决 |

### Step 4 — 输出 Context Stamp

开始执行任务前，在工作输出（或会话开头）输出以下 Context Stamp：

```md
## Context Stamp

- origin/main: <SHA> <标题>
- local-branch: <当前 worktree 分支>
- relevant-pr: <PR 编号 + 标题，无则写 none>
- current-state-last-verified: <CURRENT_STATE.md 中的 last_verified 日期>
- decision-log-latest: <最新 DL-XXX 标题>
- files-read: <已读文件列表>
- confirmed-facts: <从 remote + 文档确认的事实>
- local-only-observations: <仅在本 worktree 存在、未被 remote 确认的内容>
- conflicts: <发现的冲突，无则写 none>
- confidence: high / medium / low（依据说明）
```

### Step 5 — 冲突处理

如果 Step 3 发现冲突，**不得继续任务**。输出：

```
CONFLICT REPORT
Source A: <来源 + 内容>
Source B: <来源 + 内容>
Type: main_head_mismatch / pr_not_in_current_state / user_fact_vs_repo / stale_context
Waiting for: GM / 产品负责人 / CEO 裁决
```

---

## 快速参考：Freshness 判断

| 条件 | 状态 | 行动 |
|------|------|------|
| last_verified ≤ 3 天，main_head 一致 | fresh | 继续 |
| last_verified ≤ 3 天，main_head 变化 | partial stale | 标注差异，小心继续 |
| last_verified 3–7 天 | stale | 向 GM 报告，等确认 |
| last_verified > 7 天 | critically stale | **停止** |

---

## 谁负责更新 CURRENT_STATE

| 事件 | 行动 |
|------|------|
| PR merge 到 main | GM 必须更新 `last_verified` + `main_head` + active PR 列表 |
| 新 PR 开启 | GM 在下次更新时加入 |
| 主线方向变化 | GM 更新 `当前主线` 节 |
| 超过 3 天未更新 | 任何窗口可以 flag，GM 优先处理 |

---

## 什么情况可以跳过 Bootstrap

以下情况可以跳过 Step 1，但 Step 2–4 永远不可跳过：

- 正在执行「更新 CURRENT_STATE」本身的 GM 任务
- 同一个会话中已在 30 分钟内完成过 Bootstrap 且 main_head 无变化
