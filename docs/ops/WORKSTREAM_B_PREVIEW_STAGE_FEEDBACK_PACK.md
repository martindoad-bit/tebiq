# Engineering Work Packet — Workstream B: Preview Stage Feedback

对象：ENGINE
任务标题：Workstream B — /internal/preview 阶段式反馈（非流式状态机）
背景：/internal/preview 当前提交后空白等待最长 25 秒完整 JSON 返回，用户无法感知系统状态。产品负责人裁决：不要求 token streaming，但用户提交后必须在 1–3 秒内看到状态反馈。本任务实现非流式状态机（Phase 1），不改 DeepSeek provider，不改 LLM pipeline。
产品裁决来源：2026-05-05 产品负责人指令 §4 User Preview 阶段式反馈 Phase 1

---

## 必须读取

1. `app/internal/preview/` — 当前实现（PR #24）
2. `app/api/questions/` — 提问 API（了解当前提交流程）
3. `app/answer/[id]/page.tsx` — 现有回答页（了解最终落点）
4. `docs/product/TEBIQ_COPY_SOURCE.md` — 用户端文案来源（如有 VOICE 文案）

---

## 要做什么

### B1 — 提交后状态机（必须）

用户点击「提问」或提交自由输入后，页面立即进入状态机流程，不再跳转到 `/answer/[id]` 页面（或跳转前先显示状态）。

**状态定义**：

| state | 显示文案 | 触发时机 |
|-------|---------|---------|
| `received` | 已收到你的问题。 | 提交后立即（0ms）|
| `routing` | 正在确认这个问题属于哪类在留事项。 | received 后约 500ms |
| `risk_check` | 正在检查是否涉及期限、身份变化或工作资格风险。 | routing 后约 500ms |
| `generating` | 正在生成回答。 | API 调用发出时 |
| `clarification_needed` | 还需要确认一个关键信息，才能判断下一步。 | API 返回 status=clarification_needed |
| `human_review_required` | 这类情况不建议只靠自动回答判断，需要人工确认。 | API 返回 status=out_of_scope 或 high-risk flag |
| `fallback` | 当前模型响应不完整，这条回答不能作为正式判断。 | fallback_reason 非空 |
| `error` | 当前回答生成失败，可以稍后重试，或先保存事项继续处理。 | timeout / API error |
| `final_answer` | 显示最终受控回答内容。 | API 返回成功且无 fallback |

**实现方式（Phase 1，不需要 streaming）**：

```
1. 用户提交 → 立即显示 received
2. setTimeout(500ms) → 显示 routing
3. setTimeout(500ms) → 显示 risk_check
4. 发出 POST /api/questions（或现有提交 API）
5. 等待 API 返回（保留原有逻辑）
6. 根据返回结果切换到最终状态：
   - ok + no fallback → final_answer（跳转到 /answer/[id] 或内嵌显示）
   - fallback_reason 非空 → fallback（明确提示不是正式判断）
   - status=out_of_scope / high risk → human_review_required
   - status=clarification_needed → clarification_needed
   - timeout / error → error
```

不需要真正的 streaming，用 setTimeout 模拟前两步即可。

### B2 — Timeout 与 Fallback 必须明确显示（必须）

- timeout（>25s 无返回）：显示 `error` 状态 + "当前回答生成失败，可以稍后重试"
- fallback（llm_timeout / safe-clarification）：显示 `fallback` 状态 + 明确文案，**不得包装为正常回答**
- fallback 回答若展示，必须加标注：「当前为降级回答，仅供参考，不代表 TEBIQ 正式判断」

### B3 — 页面 Preview/Internal 标记（必须）

页面顶部或底部必须有明确标记：

```
⚠️ 内部预览 / Internal Preview — 本页面为内部测试用途，回答结果不作为正式在留建议
```

### B4 — High-Risk 不得裸流（必须）

当前为非流式，此点自然满足。但需确保：
- P0 高风险题（REGRESSION_SET 7 题或 DOMAIN risk_level=HIGH）提交后，
  若 API 返回，`final_answer` 显示的是 TEBIQ 受控输出，不是 DeepSeek raw text
- DeepSeek raw 不直接暴露给页面

---

## 不能做什么

- 不实现 token-by-token streaming（Phase 2，后续再做）
- 不改 DeepSeek provider / LLM pipeline
- 不触碰 `lib/answer/`
- 不改 eval_answers DB schema
- 不引入新环境变量

---

## 验收标准

- [ ] 提交后 ≤1s 显示 `received` 状态
- [ ] ≤3s 显示 `routing` → `risk_check` 过渡动画或文字
- [ ] 25s timeout 时显示 `error` 状态，不空白
- [ ] fallback 返回时显示 `fallback` 状态 + 标注，不伪装为正常回答
- [ ] `clarification_needed` / `human_review_required` 状态有对应文案
- [ ] 页面有 "内部预览" 标记
- [ ] 无用户端 answer path 改动（PR body 声明）
- [ ] `npx tsc --noEmit` clean

---

## 完成后回报格式

```
Workstream B Preview Stage Feedback — 实现报告

B1 状态机: ✅/❌（实现了哪几个 state）
B2 Timeout/Fallback 明确显示: ✅/❌
B3 Preview 标记: ✅/❌
B4 High-risk 不裸流: ✅/❌

测试方式：
  - 提交后首个状态出现时间：
  - Timeout 触发时显示：
  - Fallback 触发时显示：
PR：#XX
```

---

**ENGINE 所有输出默认 draft / needs GM + QA review。**
**Phase 2（SSE 受控事件流）为后续独立 Work Packet，本 PR 不做。**
