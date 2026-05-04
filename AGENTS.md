# TEBIQ AGENTS — 所有 AI 窗口统一入口

> 所有 AI coding agents（Claude Code / Codex / QA / DOMAIN / GM）开始任何任务前必须先读此文件。
> 如无法读取此文件，必须停止，不得凭记忆执行任务。

---

## TEBIQ 是什么（不可绕过）

**面向在日外国人的在留风险管理服务系统。**

TEBIQ 不是：AI 签证问答 App / 签证知识库 / 行政书士官网 / 拍照翻译工具 / 传统咨询导流页。

核心逻辑：**不是回答，而是推进。** 发现用户没有问、但会影响结果的在留风险，并推进到下一步行动。

当前阶段策略：**Eval-driven 数据闭环。** 当前不继续盲修用户端回答页。详见 `docs/product/TEBIQ_CONTEXT_PACK.md §2`。

---

## 必读顺序

| 步骤 | 文件 | 场景 |
|------|------|------|
| 1 | `AGENTS.md`（本文件） | 所有窗口 |
| 2 | `docs/ops/TEBIQ_CONTEXT_BOOTSTRAP.md` | 所有窗口（开工流程 + Context Stamp）|
| 3 | `docs/product/TEBIQ_CURRENT_STATE.md` | 所有窗口（当前工程快照）|
| 4 | `docs/product/TEBIQ_CONTEXT_PACK.md` | 所有窗口（长期产品宪法）|
| 5 | `docs/product/TEBIQ_QA_GATES.md` | QA / PR 审计 |
| 6 | `docs/product/TEBIQ_COPY_SOURCE.md` | 文案 / 用户端表达任务 |
| 7 | `docs/ops/TEBIQ_AGENT_WORKFLOW.md` | 不确定协作流程时 |

**Hard-required files — 不存在时必须停止：**
- `AGENTS.md`（本文件）
- `docs/product/TEBIQ_CONTEXT_PACK.md`
- `docs/product/TEBIQ_CURRENT_STATE.md`

**Task-specific files — 不存在时报告，不一定停止：**
- `TEBIQ_COPY_SOURCE.md` — 文案任务找不到时停止；其他任务报告即可
- `TEBIQ_QA_GATES.md` — QA 任务找不到时停止；其他任务报告即可
- `docs/domain/*` — DOMAIN 任务找不到时报告，使用 `domain_task.md` 模板，不得假装已有规则
- `docs/ops/TEBIQ_AGENT_WORKFLOW.md` — 不存在时报告，不停止

---

## Freshness Protocol（开工前必做）

```bash
git fetch origin --prune
git log origin/main --oneline -5
gh pr list --state open
```

如果 `gh` 不可用，降级为：

```bash
git fetch origin --prune
git log origin/main --oneline -5
# 手动打开 GitHub PR 页面确认 open PR 状态
```

然后打开 `docs/product/TEBIQ_CURRENT_STATE.md`，对比：

| 检查项 | 行动 |
|--------|------|
| `main_head` 与 `git log origin/main` 不一致 | 停止，向 GM 报告，等 CURRENT_STATE 更新 |
| 有未记录的 OPEN PR | 标注在 Context Stamp `local-only-observations` |
| `last_verified` 超过 3 天 | 标注为 stale，向 GM 报告 |
| `last_verified` 超过 7 天 | 停止，不得继续 |
| 用户本轮事实与 repo 冲突 | 停止，报告冲突 |

完整协议见 `docs/ops/TEBIQ_CONTEXT_BOOTSTRAP.md`。

---

## Context Stamp（每次开工必须输出）

开始执行任务前，在工作输出开头输出以下 Context Stamp：

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

---

## 事实源优先级

当不同来源存在冲突时，按以下顺序确定真相：

1. **用户/CEO 本轮明确给出的最新事实**
2. **GitHub remote 状态**（`gh pr list`、`git log origin/main`）
3. **Vercel build-info / deployment 状态**
4. **`docs/product/TEBIQ_CURRENT_STATE.md`**
5. 当前本地 worktree 内容

**不信本地 worktree 的单方面说法。本地 worktree 可能是陈旧的、局部的或分叉的。**

**如果发现冲突：停止，输出 CONFLICT REPORT，等待裁决。**

---

## 角色边界

| 角色 | 职责 | 当前 Track 目标 | 不做什么 |
|------|------|----------------|----------|
| **用户 / CEO** | 业务专家、最终裁决 | 验收 M1/M4/M7 里程碑 | — |
| **GPT 产品负责人** | 战略、阶段目标、P0/P1/P2、路线 | 定义各里程碑验收标准 | 不写代码、不发明事实 |
| **GM（工程总经理）** | AI 协作流程、上下文一致性、Issue/PR/QA 协调、文档制度（见 `docs/ops/TEBIQ_GM_OPERATING_PRINCIPLES.md`）| Track F 主导；Track A/B/C/E 工作包分配与阻塞管理 | 不做产品战略裁决、不判断签证专业结论、不决定上线 |
| **ENGINE** | 实现代码 | Track B（Issue #19 Internal Console）→ Track C（Issue #18 Routing）→ Track D | 不做产品定位裁决、不发明政策事实、不擅自扩冻结范围 |
| **QA** | Technical / Semantic / Domain / UX-Trust 四层审计 | Track A 回归测试；Track C routing regression gate | 不做产品定位裁决 |
| **DOMAIN-CC** | 在留语义复核 / 行政书士助理型审查；golden cases / must_have / must_not_have / handoff_trigger / fact_card_candidates | Track E：100Q 风险图谱 + 在留 pattern 梳理（不等 FULL_COMPARABLE）| 不做最终法律判断；所有输出默认 `draft / needs human review` |
| **VOICE** | 暂不常驻；仅在给出完整 Task Card 时被调用 | Track D 用户端文案（M4 后）| 不能一次写完整 6 屏；没有 Task Card 时停止 |

---

## 禁止事项（所有角色通用）

- **不凭旧 worktree / 旧 PR / 聊天记忆判断当前状态** — 必须执行 Freshness Check
- **不擅自扩展功能范围** — 未经产品裁决不得新增用户端功能
- **不把 Context Pack 写成流水账** — PR / commit / preview 写 CURRENT_STATE
- **不在没有产品裁决时改用户端主体验**
- **不决定在留/签证专业结论** — 必须有 DOMAIN 标注或用户确认
- **不凭猜测回填决策** — 文件或决策不存在时停止并报告
- **不把 DeepSeek 的好答案包坏** — TEBIQ 输出比裸答更差是 P0
- **不在没有 Eval 数据支撑的情况下调 Prompt**
- **不做 autonomous agent** — 当前采用受控 workflow

---

## 项目运行规则 v0.2（2026-05-05 生效）

### GM 工程自主权

GM 拥有工程推进自主权，以下事项不需要向产品负责人请求裁决：

- ENGINE / QA / DOMAIN 工作包分配
- Eval、Routing、DeepSeek 等单线阻塞的工程方案选择
- PR merge（docs / scripts / internal-only 改动）
- 阶段内的技术方案迭代
- CURRENT_STATE 维护

**向产品负责人请求裁决的条件（仅限以下）**：

| 触发条件 | 例子 |
|---------|------|
| 产品定位变化 | TEBIQ 是什么 / 不是什么改了 |
| 用户端 production 风险 | 影响用户可见回答的 Prompt / 路由改动 |
| scope 扩大 | 新增用户端功能、新增服务类型 |
| high-risk rule 固化 | must_not_have / handoff_trigger 写入 Prompt |
| human review gate 固化 | 新增 DOMAIN 审核节点 |
| 阶段进入 / 暂停 / 结束 | 开始 DOMAIN 正式标注、暂停 Eval Round |
| CEO 可见版本验收 | Production 部署、用户端更新 |

### 多线并行原则

单线阻塞（DeepSeek API / Routing 修复 / Eval 生成）不得自动阻塞整个项目。  
各 track 独立推进，GM 维护并行 track 状态。

**6 平行 Track（2026-05-05 生效）**：

| Track | 名称 | 当前状态 | 阻塞条件 |
|-------|------|---------|---------|
| **A** | Answer Quality / Eval Round 1A | 🔴 Blocked | DeepSeek API + Routing fix |
| **B** | Internal Console / 100 問可視化 | 🟡 Active | なし — 最優先可見交付 |
| **C** | Routing Safety Gate (R01–R05) | 🟡 Active | ENGINE Issue #18 |
| **D** | User Preview / Matter Draft | ⏸ Standby | M1 完成後啟動 |
| **E** | DOMAIN Assets / 100Q Risk Map | 🟡 Active | DeepSeek/FULL_COMPARABLE 不阻塞 |
| **F** | Ops / Release Readiness | 🟡 Active | 按里程碑推進 |

**最重要的当前可见交付**：CEO 能打开 Internal Console，看见 100 问和每题状态（Track B, Issue #19）。

### 里程碑（M0–M7 概览）

| 里程碑 | 名称 | 状态 |
|--------|------|------|
| M0 | 项目规则重置 + 并行模式启动 | ✅ 完成 |
| M1 | Internal Console Alpha | ⏳ ENGINE |
| M2 | Routing Safety Gate（7/7 回归通过）| ⏳ ENGINE |
| M3 | Answer Quality Baseline（Eval 正式数据 ≥24 FULL_COMPARABLE）| ⏳ 等待 |
| M4 | User Preview Alpha（CEO 可操作）| ⏳ M1 后 |
| M5 | Matter v0（风险评估 + 下一步行动路径）| ⏳ M3 后 |
| M6 | Private Beta Readiness | ⏳ M2+M4 |
| M7 | Public Soft Launch | ⏳ M5+M6 |

详见 `docs/ops/TEBIQ_PROJECT_MILESTONES.md`。

### 状态汇报格式 v0.2

每次向产品负责人汇报必须包含 4 字段：

```
哪条 track 在动：
哪条 track blocked：
CEO 当前能看到什么：
下一步谁自主推进：
```

### 同步节奏

- 日常：异步短状态（本格式）
- 每周：项目 review（track 整体进展）
- 阶段 gate：产品负责人裁决（进入/暂停/结束）

---

## 任务出口规则（v0.2 更新）

**GM 是 ENGINE / QA 的唯一正式任务出口。**

| 规则 | 说明 |
|------|------|
| 产品负责人不直接给 ENGINE / QA 下正式任务 | 产品负责人裁决 → GM 转化为 Work Packet → ENGINE / QA |
| ENGINE / QA 收到非 GM 任务 | 应要求 GM 重新生成 Work Packet，不得直接执行 |
| 所有任务必须有 Issue 或 Work Packet | 无 Issue / Work Packet 的任务不得开工 |
| 所有反馈先回 GM | GM 压缩汇总后交给产品负责人，不直接绕过 GM |
| DOMAIN-CC 内容归产品负责人裁决 | GM 协调 DOMAIN 的 PR / Issue / 状态，不裁决语义结论 |
| DOMAIN 拥有语义草稿和标注推进自主权 | 所有 DOMAIN 输出默认 draft / needs human review |

### GM Work Packet 格式

GM 给 ENGINE / QA / DOMAIN 的任务包必须使用以下结构：

```md
## Work Packet

对象：ENGINE / QA / DOMAIN
任务标题：
背景：
产品裁决来源：
必须读取：
要做什么：
不能做什么：
验收标准：
完成后回报格式：
需要产品负责人裁决的问题：
```

### GM 反馈汇总格式

GM 收到 ENGINE / QA / DOMAIN 反馈后压缩为：

```md
当前事实：
冲突：
P0 / P1 / P2：
已完成：
阻塞：
GM 建议：
需要产品负责人裁决：
下一步：
```

---

## STOP 条件

遇到以下任何情况必须停止并报告：

- 无法读取 `docs/product/TEBIQ_CONTEXT_PACK.md`
- 无法读取 `docs/product/TEBIQ_CURRENT_STATE.md`
- 发现事实源冲突
- 任务要求修改产品定位或在留/签证专业结论
- 任务要求执行超出本角色边界的操作
- `CURRENT_STATE.md` 超过 7 天未更新
