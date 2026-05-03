# TEBIQ QA Gates

## 0. 用途

本文件是 Codex / QA 审计的测试门禁基准。

使用规则：

- Codex / QA 在审计 PR、页面、文案、API 时必须读取本文件
- 目标是防止用户侧出现错误内容、内部枚举、禁用词、串域问题
- 本文件不替代 `TEBIQ_CONTEXT_PACK.md`，两者必须同时读取

---

## 1. P0 / P1 / P2 定义

### P0 — 阻塞 merge / canary

以下任一情况必须阻塞，不得进入 canary 或 merge：

- 用户侧出现错误领域串接（例：Q1 配偶签问题返回经管签内容）
- 用户侧出现内部枚举（如 `domain`, `intent`, `safety_gate`, `cross_domain` 字段名）
- `fallback_reason` 或 `safety_gate_replaced` 暴露在页面正文
- `unknown` / `null` / `undefined` 出现在用户可见文案
- Q1/Q5 串域（配偶签 ↔ 经管签 ↔ 就労签 ↔ 永住 跨类型混淆）
- 页面出现禁用词（见下方禁用词扫描表）
- sidecar JSON 暴露在页面（用户可通过正常操作看到原始 JSON）
- safety gate 没有覆盖 `understood_question`
- 用户读到明显错误手续判断

### P1 — 建议 merge 前修，或由总控判断

以下情况总控可决定是否阻塞：

- true_focus 缺失（回答页没有自然指出真正重点）
- risk_assessment 没有明确 projection path
- 用户看完不知道下一步
- 文案像 AI 产品腔（出现推荐句式之外的表达）
- 事实来源不清晰（手续名、期限、条件未注明来源）
- 页面有占位符痕迹（如 `[TBD]`、`TODO`、`___`）

### P2 — 可 post-merge

以下情况可在合并后处理：

- badge 文案不够好
- heading 风格不统一
- 按钮文案不够自然
- list view 尚未完善
- 内部注释缺失

---

## 2. 禁用词扫描

每次 QA 必须全文扫描以下词句，出现在用户可见文案中即为 P0：

| 禁用词 / 字段 | 类型 |
|---------------|------|
| 别担心 | 情绪 AI 腔 |
| 我懂你 | 情绪 AI 腔 |
| 我可以帮你 | 情绪 AI 腔 |
| 重要风险提醒 | 官腔标题 |
| 你没问，但要注意 | 揭穿内部逻辑 |
| AI 智能分析 | 功能噪音 |
| 一键开启专业守护 | 营销腔 |
| 严重违规 | 过度惊吓 |
| 立即预约专家 | 导流腔 |
| fallback_reason | 内部字段泄漏 |
| safety_gate_replaced | 内部字段泄漏 |
| no_source_matched | 内部字段泄漏 |
| out_of_scope | 内部字段泄漏 |
| low_confidence | 内部字段泄漏 |
| unknown | 未处理状态泄漏 |
| null | 未处理状态泄漏 |
| undefined | 未处理状态泄漏 |
| __answer_run_v1__ | 内部字段泄漏 |

---

## 3. Answer Core V1 Regression Gate（原 PR #5 live QA 10 问）

PR #5 已于 2026-05-03 merge（commit `cbe1d43`）。  
以下 10 问从"上线前必须通过"转为 **Answer Core V1 回归测试基线**，用于：

- `feat/l0-l2-risk-mvp` 开发过程中的回归验证
- 任何触碰 answer 路径的 PR 的 QA 前置检查
- Canary 监控期的基线断言

每题必须逐项检查以下 9 个维度：

| # | 检查项 | 说明 |
|---|--------|------|
| 1 | API 返回 view_model | response 中包含 `view_model` 字段 |
| 2 | engine_version 存在 | response 中包含 `engine_version` |
| 3 | safety 为 structured object | `safety` 不是字符串或 null |
| 4 | 存在 answer_id | response 中有可用 `answer_id` |
| 5 | `/answer/{id}` 可打开 | 直链可访问，不 404 |
| 6 | reload 后 sidecar 不可见 | 刷新页面后用户不见 JSON sidecar |
| 7 | 页面 visible text 无禁用词 | 见第 2 节禁用词表 |
| 8 | 不串域 | 返回领域与问题领域一致 |
| 9 | P0/P1/P2 判断 | 填写判断结论 |

### 10 问题目

1. 配偶签离婚后想转定住
2. 厚生年金截止日期是什么时候？
3. 家族滞在想转工作签
4. 我是经管签，想转人文签
5. 人文签转经管签怎么办
6. 经管续签材料有哪些
7. 代表取締役换人要通知入管吗
8. 入管让补材料，期限赶不上怎么办
9. 不许可通知书怎么办
10. 永住申请年金没交怎么办

---

## 4. Canary / Merge 判断

PR 进入 canary 或 merge 的最低条件（全部必须满足）：

- [ ] P0 = 0（无任何 P0 问题）
- [ ] 10 问 live QA 全部通过
- [ ] 页面无内部枚举
- [ ] 页面无禁用词
- [ ] Q1/Q5 不串域
- [ ] sidecar 不可见
- [ ] rollback runbook 存在且可执行
- [ ] 总控批准

以上任一未满足，禁止 merge。

---

## 5. Founder 50 题结构

完整题库由总控维护；当前定义结构，供 QA 窗口按 block 执行。

| Block | 主题 | 题数 |
|-------|------|------|
| Block 1 | Redline regressions | 10 题 |
| Block 2 | Domain × intent matrix | 20 题 |
| Block 3 | OOS / clarification boundary | 7 题 |
| Block 4 | Adversarial / injection | 7 题 |
| Block 5 | Known bad cases regression | 6 题 |

题库填充需等总控逐 block 确认后方可写入本文件。

---

## 6. QA Layer 定义

**两种 QA 任务使用不同的 Layer 定义，不可混用。**

### PR live QA layers
适用：PR #5 / Answer Core / API / sidecar 审计。**如果任务类型不确定，默认使用本套。**

| Layer | 检查内容 |
|-------|----------|
| Layer A | API JSON / response contract（view_model、engine_version、safety、answer_id 等字段） |
| Layer B | DB sidecar round-trip / `/answer/{id}` reload（sidecar 可见性、持久化） |
| Layer C | Page visible text / rendered surface（禁用词、串域、内部字段泄漏） |

### Page / copy QA layers
适用：页面 smoke、文案审计、产品 tone 检查。

| Layer | 检查内容 |
|-------|----------|
| Layer A | Page route smoke（路由可访问、不 404、无崩溃） |
| Layer B | Content / banned words / domain leakage（禁用词、串域、占位符痕迹） |
| Layer C | Voice / true_focus / placeholders / product tone（文案 tone、true_focus 是否存在、AI 产品腔） |

---

## 7. QA 输出格式

每次 QA 完成后必须输出包含以下结构的报告：

```md
# QA Report

## Audit target
PR #X / branch / feature / page

## Branch / commit / preview
branch: ...  commit: ...  preview: ...

## Test scope
说明本次 QA 覆盖的范围，并注明使用哪套 Layer 定义（PR live QA layers / Page copy QA layers）

## Layer A result
(根据 Layer 定义填写)

## Layer B result
(根据 Layer 定义填写)

## Layer C result
(根据 Layer 定义填写)

## 10 问矩阵
| # | 题目 | API | engine | safety | answer_id | /answer/{id} | reload sidecar | 禁用词 | 串域 | 判断 |
|---|------|-----|--------|--------|-----------|--------------|----------------|--------|------|------|
| 1 | ... | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | clean/exposed | clean/P0 | clean/P0 | P0/P1/P2/通过 |

## P0 列表
列出所有 P0 问题，无则写 none

## P1 列表
列出所有 P1 问题，无则写 none

## P2 列表
列出所有 P2 问题，无则写 none

## Canary decision
PASS / BLOCK — 原因

## Required fixes
列出 merge 前必须修复的项目
```
