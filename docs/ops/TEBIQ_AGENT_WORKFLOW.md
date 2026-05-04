# TEBIQ Agent Workflow — GM / ENGINE / QA / DOMAIN 协作方式

> **workflow draft / pending product-owner approval**
> 本文件描述当前设计的协作流程。如有部分尚未验证，标注 `[draft]`。

---

## 总体流程

```
CEO / 用户 ─── 产品裁决（是否做、优先级）
     │
     ▼
GPT 产品负责人 ── 定义 P0/P1/P2 目标、验收标准
     │
     ▼
GM ──────────── 创建 GitHub Issue（用 engineering_task 模板）
     │            分配给 ENGINE / QA / DOMAIN
     │
     ├──► ENGINE ── 实现，提 PR，自测，打 Context Impact 标记
     │                │
     │                ▼
     ├──► QA ──── 按 QA_GATES 四层审计 PR
     │                │
     │                ▼
     └──► DOMAIN ─ 语义复核（如涉及在留答案内容）
              │
              ▼
         GM 汇总 QA + DOMAIN 结果 → 报告产品负责人
              │
              ▼
         产品负责人 / CEO 批准 → merge
```

---

## GM 职责

**GM 负责协调，不做产品决策。** GM 工作信条见 `docs/ops/TEBIQ_GM_OPERATING_PRINCIPLES.md`。

| GM 能做 | GM 不能做 |
|---------|----------|
| 创建 Issue，明确 scope / acceptance criteria | 决定产品战略方向 |
| 安排 ENGINE / QA / DOMAIN 执行顺序 | 决定是否上线 |
| 维护 CURRENT_STATE.md | 发明政策事实 |
| 汇总 QA 报告给产品负责人 | 直接改代码 |
| 报告冲突 / 阻塞 | 替代产品负责人做 P0/P1/P2 裁决 |

---

## 产品裁决 → GitHub Issue

**触发条件**：产品负责人或 CEO 给出明确工程任务指令。

**GM 必须做：**
1. 确认 scope（in / out）
2. 用 `.github/ISSUE_TEMPLATE/engineering_task.md` 创建 Issue
3. 在 Issue 中明确 Acceptance Criteria 和 QA Plan
4. 指派 branch 名

**GM 不能做：**
- 在产品裁决前安排 ENGINE 动工
- 自行扩展产品功能范围

---

## GM → ENGINE

ENGINE 开工前必须拿到：

- [ ] GitHub Issue 链接
- [ ] 明确的 branch 名
- [ ] Acceptance Criteria（至少 3 条可验证）
- [ ] QA Plan（由谁、检查什么、用哪套 Layer）
- [ ] Context Impact 评估

ENGINE 完成后：
- PR body 必须填写 `.github/PULL_REQUEST_TEMPLATE.md`
- 如改动 `docs/product/`，必须同步更新 `TEBIQ_CURRENT_STATE.md`
- 如涉及在留/政策事实，必须先有 DOMAIN-CC 标注或产品负责人确认

---

## GM → QA

**重要：自动 QA PASS ≠ 产品可上线。**

任何影响用户端回答的 PR，QA 必须覆盖四层：
- **Technical QA**：API / sidecar / 内部字段
- **Semantic QA**：方向、资格混淆、期限、高风险断言（见 `TEBIQ_QA_GATES.md §3`）
- **Domain QA**：must_have / must_not_have / should_handoff
- **UX Trust QA**：是否包坏 DeepSeek 输出

QA 完成后：
- 输出标准格式 QA Report（见 `TEBIQ_QA_GATES.md §8`）
- 明确 Ship gate decision: PASS / BLOCK
- 报告给 GM

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

---

## Lightweight Task Exception（轻量任务例外）

以下任务可以走**轻量流程**（不必等 GM 完整批准 + 产品负责人裁决）：

- typo / 注释 / 文档小修
- tests-only（不改功能代码）
- 纯截图 / artifact 更新
- 不触及产品原则、不触及 answer path、不触及 Eval schema 的小改动

**轻量流程仍然必须：**

- 执行 Bootstrap（git fetch + 读核心文档）
- 在 PR body 填写 Context Impact（`User-facing answer path changed: no`）
- 明确声明 "no user-facing answer path change"
- 如果 check-context-impact.ts 警告触发了敏感路径，则不算轻量任务，必须走完整流程

目的：避免所有任务都被重流程拖慢；同时防止轻量例外被滥用绕过 QA。

---

## ENGINE 何时可以直接开工

**可以不等 GM 单独批准：**
- Issue 已创建，scope 清晰，Acceptance Criteria 已列
- 任务不触碰产品定位、用户端主体验、QA Gates 标准
- 纯技术 bug 修复（P0 bug / test 修复 / 类型错误）

**必须先停下来确认：**
- 实现过程中发现原 Issue scope 不够清晰
- 需要新增未讨论的功能
- 发现技术方案有根本性问题
- 改动触碰 `lib/answer/` / `app/answer/` / `lib/eval-lab/` 但未进行 Comparison Gate

---

## PR merge 前必须有什么

| 条件 | 说明 |
|------|------|
| PR body 填写完整 | 用 PR Template，Context Impact 已评估 |
| QA Report 输出，Ship gate = PASS | 见 `TEBIQ_QA_GATES.md §6` |
| 影响答案路径时：Comparison Gate 已跑 | 见 `TEBIQ_QA_GATES.md §5` |
| 影响答案路径时：DOMAIN 至少 10 题人工抽查 | — |
| 产品负责人 / CEO 批准 | 或明确授权 GM 批准 |

**不影响用户端回答的 PR**（纯 docs / 纯 Eval Lab 内部 / 纯脚本）可降级，但必须在 PR body 声明 "no user-facing answer path change"。

---

## QA 汇总格式

GM 向产品负责人汇总时使用：

```md
## QA 汇总 — PR #X [标题]

- 执行者：<窗口名>
- Ship gate：PASS / BLOCK
- Technical P0：<数量>
- Semantic P0：<数量>
- Comparison Gate：是否触发 / 有无倒退
- DOMAIN 参与：是 / 否
- 主要发现：<1-3 条>
- 建议：merge / 修复后 merge / 不 merge + 原因
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
