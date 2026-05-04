# TEBIQ Agent Workflow — GM / ENGINE / QA / DOMAIN 协作方式

> 正式试运行版本（2026-05-04 产品负责人批准）。

---

## 总体流程

```
CEO / 用户 ─── 产品裁决（是否做、优先级）
     │
     ▼
GPT 产品负责人 ── 定义 P0/P1/P2 目标、验收标准
     │
     ▼
GM ──────────── 创建 Engineering Work Packet + GitHub Issue
     │            GM 是 ENGINE / QA 的唯一正式任务出口
     │
     ├──► ENGINE ── 执行 Work Packet，提 PR，自测
     │                │
     │                ▼
     ├──► QA ──── 执行 QA Work Packet，四层审计
     │                │
     │                ▼
     └──► DOMAIN ─ 语义复核（内容归产品负责人裁决）
              │
              ▼
         GM 汇总反馈 → 压缩状态包 → 产品负责人
              │
              ▼
         产品负责人 / CEO 批准 → merge
```

---

## 组织规则（正式试运行）

1. **产品负责人不直接给 ENGINE / QA 下正式任务** — 产品裁决经 GM 转化为 Work Packet 后执行
2. **GM 是 ENGINE / QA 的唯一正式任务出口** — 无 Work Packet / Issue 不得开工
3. **ENGINE / QA 收到非 GM 任务** — 应要求 GM 重新生成 Work Packet，不得直接执行
4. **所有反馈先回 GM** — GM 压缩汇总后交给产品负责人，不绕过 GM
5. **DOMAIN-CC 内容归产品负责人裁决** — GM 协调 DOMAIN 的 PR / Issue / 状态，不裁决语义结论
6. **所有窗口开工前必须读 AGENTS.md 并输出 Context Stamp**
7. **发现事实冲突 → 停止并报告**；收到多个上游指令 → 以 GM Work Packet 为工程执行依据，产品方向回产品负责人裁决

---

## GM 职责

**GM 负责协调，不做产品决策。** GM 工作信条见 `docs/ops/TEBIQ_GM_OPERATING_PRINCIPLES.md`。

| GM 能做 | GM 不能做 |
|---------|----------|
| 创建 Issue + Work Packet，明确 scope / AC | 决定产品战略方向 |
| 安排 ENGINE / QA / DOMAIN 执行顺序 | 决定是否上线 |
| 维护 CURRENT_STATE.md | 发明政策事实 |
| 汇总 ENGINE / QA / DOMAIN 反馈 | 直接改生产代码 |
| 报告冲突 / 阻塞 | 替代产品负责人做 P0/P1/P2 裁决 |
| 记录工程流程相关 Decision Log 条目 | 裁决 DOMAIN 语义结论 |
| 协调 DOMAIN PR / Issue / 状态 | 把 DOMAIN 草稿升级为 production-ready |

---

## GM Work Packet 格式

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

---

## GM 反馈汇总格式

GM 收到 ENGINE / QA / DOMAIN 反馈后压缩为以下格式，交给产品负责人：

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

## 产品裁决 → Work Packet → Issue

**触发条件**：产品负责人或 CEO 给出明确工程任务指令。

**GM 必须做：**
1. 确认 scope（in / out）
2. 输出 Work Packet（见上方格式）
3. 用 `.github/ISSUE_TEMPLATE/engineering_task.md` 创建 Issue
4. 在 Issue 中明确 Acceptance Criteria 和 QA Plan
5. 指派 branch 名

**GM 不能做：**
- 在产品裁决前安排 ENGINE 动工
- 自行扩展产品功能范围

---

## GM → ENGINE

ENGINE 开工前必须拿到：

- [ ] GM Work Packet（含产品裁决来源）
- [ ] GitHub Issue 链接
- [ ] 明确的 branch 名
- [ ] Acceptance Criteria（至少 3 条可验证）
- [ ] QA Plan（由谁、检查什么、用哪套 Layer）
- [ ] Context Impact 评估

ENGINE 完成后回报给 GM（格式见 Work Packet 中 `完成后回报格式`）：
- PR body 填写 `.github/PULL_REQUEST_TEMPLATE.md`
- 如改动 `docs/product/`，同步更新 `TEBIQ_CURRENT_STATE.md`
- 如涉及在留 / 政策事实，必须先有 DOMAIN-CC 标注或产品负责人确认

---

## GM → QA

**重要：自动 QA PASS ≠ 产品可上线。**

任何影响用户端回答的 PR，QA 必须覆盖四层：
- **Technical QA**：API / sidecar / 内部字段
- **Semantic QA**：方向、资格混淆、期限、高风险断言（见 `TEBIQ_QA_GATES.md §3`）
- **Domain QA**：must_have / must_not_have / should_handoff
- **UX Trust QA**：是否包坏 DeepSeek 输出

QA 完成后回报给 GM：
- 输出标准格式 QA Report（见 `TEBIQ_QA_GATES.md §8`）
- 明确 Ship gate decision: PASS / BLOCK

---

## DOMAIN-CC 参与时机

| 情况 | DOMAIN 任务 |
|------|-------------|
| Eval Lab 标注 | 按 `TEBIQ_DOMAIN_REVIEW_GUIDE.md` 执行，输出结构化标注 |
| 新 golden case 候选 | 填写 `docs/domain/TEBIQ_GOLDEN_CASES_SEED.md` |
| 新 Prompt 规则草稿 | 验证 must_have / must_not_have 是否符合在留实际 |
| QA 报告中出现语义 P1/P0 | 给出领域判断 |
| ENGINE 涉及政策事实改动 | 提供标注 / 裁决，ENGINE 不得自己发明事实 |

**DOMAIN-CC 的所有输出默认 `draft / needs human review`。**
**DOMAIN 语义结论归产品负责人裁决，不归 GM 裁决。**

---

## Lightweight Task Exception（轻量任务例外）

以下任务可以走**轻量流程**（不必等完整 Work Packet + 产品负责人裁决）：

- typo / 注释 / 文档小修
- tests-only（不改功能代码）
- 纯截图 / artifact 更新
- 不触及产品原则、不触及 answer path、不触及 Eval schema 的小改动

**轻量流程仍然必须：**

- 执行 Bootstrap（git fetch + 读核心文档）
- 在 PR body 填写 `User-facing answer path changed: no`
- 如果 check-context-impact.ts 警告触发了敏感路径，则不算轻量任务，必须走完整流程

---

## ENGINE 何时可以直接开工

**可以不等 GM 单独批准（Work Packet 已到位时）：**
- Issue 已创建，scope 清晰，Acceptance Criteria 已列
- 任务不触碰产品定位、用户端主体验、QA Gates 标准
- 纯技术 bug 修复（P0 bug / test 修复 / 类型错误）

**必须先停下来向 GM 确认：**
- 实现过程中发现原 Issue scope 不够清晰
- 需要新增未讨论的功能
- 发现技术方案有根本性问题
- 改动触碰 `lib/answer/` / `app/answer/` / `lib/eval-lab/` 但未进行 Comparison Gate

---

## PR merge 前必须有什么

| 条件 | 说明 |
|------|------|
| GM Work Packet / Issue 存在 | 无 Work Packet 的任务不得 merge |
| PR body 填写完整 | 用 PR Template，Context Impact 已评估 |
| QA Report 输出，Ship gate = PASS | 见 `TEBIQ_QA_GATES.md §6` |
| 影响答案路径时：Comparison Gate 已跑 | 见 `TEBIQ_QA_GATES.md §5` |
| 影响答案路径时：DOMAIN 至少 10 题人工抽查 | — |
| 产品负责人 / CEO 批准 | 或明确授权 GM 批准 |

**不影响用户端回答的 PR**（纯 Eval Lab 内部 / 纯 docs / 纯脚本）可降级，但必须在 PR body 声明 "no user-facing answer path change"。

---

## QA 汇总格式

GM 向产品负责人汇总时使用：

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

## 文档更新责任

| 事件 | 必须更新 | 由谁 |
|------|----------|------|
| PR merge 到 main | `TEBIQ_CURRENT_STATE.md` | GM |
| 产品战略变化 | `TEBIQ_CONTEXT_PACK.md` | 产品负责人裁决，GM 执行 |
| 重大决策 | `TEBIQ_DECISION_LOG.md` | GM |
| QA Gates 变化 | `TEBIQ_QA_GATES.md` | QA 提议，产品负责人裁决 |
| Domain 内容更新 | `docs/domain/` | DOMAIN-CC 提议，用户确认 |
