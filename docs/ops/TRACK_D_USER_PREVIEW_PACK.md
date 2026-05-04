# Engineering Work Packet — Track D User Preview Alpha

对象：ENGINE
任务标题：Track D — User Preview Alpha（内部测试入口）
背景：M1（Internal Console）已完成。现在需要让产品负责人/CEO 能用现有回答页测试真实在留场景，判断回答质量。当前 tebiq.jp 已在 Production，但缺少一个"快速进入特定场景测试"的内部入口。本任务不改 Prompt、不改路由逻辑，只提供测试入口。
产品裁决来源：2026-05-05 产品负责人指令：Track D 选择 Option A（用现有答案页）

---

## 必须读取

1. `app/ask/page.tsx` + `app/ask/AskClient.tsx` — 现有提问入口
2. `app/answer/[id]/page.tsx` — 现有回答页
3. `app/internal/eval-lab/` — 参考 eval-lab 的 EVAL_LAB_ENABLED gate 写法
4. `docs/product/TEBIQ_CONTEXT_PACK.md §1` — TEBIQ 是什么（不扩展 scope）

---

## 要做什么

### 功能 — `/internal/preview` 场景快速入口（必须）

在 `EVAL_LAB_ENABLED=1` 下，创建 `/internal/preview` 页面：

**内容**：

1. **场景列表**（从 Eval Lab 100 题中取 P0 高风险题，最多 10 条）
   - 显示字段：scenario / starter_tag / questionText
   - 每行有「提问」按钮

2. **「提问」按钮行为**：
   - 将该题 questionText 填入现有 `/ask` 流程，或
   - 直接跳转到 `/ask?q=<questionText>`（如果 ask 页支持 query param），或
   - 以最简方式触发现有回答流程

3. **「自由输入」区**：
   - 一个文本框 + 提交按钮 → 进入现有提问流程
   - 用于测试任意场景

**不做**：
- 不嵌入回答结果（让用户跳转到现有 `/answer/[id]` 页面，体验完整流程）
- 不改回答页 UI
- 不改 Prompt / 路由逻辑

---

## 数据来源

使用现有 `/api/internal/eval-lab/state?reviewer=eval-round1`，取 `risk_level=HIGH` 或前 10 题（starter_tag 含 P0 优先）。

或直接硬编码 10 条 P0 题目文本（更简单，v1 可接受）。

**GM 建议**：硬编码 10 条最快，不加 API 依赖。

---

## 约束

- 仅在 `EVAL_LAB_ENABLED=1` 下可访问，否则 404
- 不触碰 `app/answer/`、`lib/answer/`、任何 Prompt 相关文件
- 不新增环境变量
- 不改现有用户端路由

---

## 验收标准

- [ ] `/internal/preview` 在 `EVAL_LAB_ENABLED=1` 下可访问，无 404
- [ ] 显示至少 10 条 P0 场景题目
- [ ] 每条有「提问」入口，点击后进入现有回答流程
- [ ] 自由输入框可用
- [ ] 无用户端回答路径改动（PR body 声明）
- [ ] tsc clean

---

## 完成后回报格式

```
Track D Preview Alpha — 实现报告

访问路径：/internal/preview
Preview URL：...
功能覆盖：
  - [ ] 场景列表（N 条）
  - [ ] 提问按钮
  - [ ] 自由输入框
测试方式：
PR：#XX
```

---

**ENGINE 所有输出默认 draft / needs GM + QA review。**
