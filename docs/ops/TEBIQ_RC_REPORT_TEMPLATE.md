# TEBIQ RC Sprint Report — TEMPLATE

**Source of truth:** Use this template for any RC sprint / work-block summary that claims "shipped". Derived from the校准版 v2 of `TEBIQ_1_0_RC_SPRINT_REPORT_2026-05-17.md` after the 2026-05-17 self-audit incident. Replace every `<…>` placeholder. Do not delete sections — if a section doesn't apply, write "N/A — reason".

**Hard prerequisite:** `npm run qa:pre-report-audit` must exit 0 before this report is written. Paste the audit summary at the bottom (§7 or appendix). If it didn't pass, the report cannot say "完成" / "shipped" anywhere — list the failed checks in §3.

---

**Status:** <RC Sprint N | Work Block X | …>实质完成 <NN>%（按 Codex 复核口径 / 自评口径，注明）
**Mode:** Autonomous per `TEBIQ_AI_AGENT_WORK_MODE.md`
**Branch:** `<branch>` (PR #<n>) <+ hotfixes if any>
**Base:** `<base sha>` → `<final sha>`
**Agent wallclock:** ≈ <hours>

> Honest opening：一句话说明这版报告是不是被 Codex / QA / 其他 agent 复核过；如果是 v2 校准版，注明 v1 的乐观语言是怎么被纠正的。

---

## 1. 真实完成度（11 维度，按 Codex 复核口径）

| 模块 | 完成度 | 真实状态 |
|---|---:|---|
| 生产合并 / 部署 | <NN>% | <PR / SHA / 在线状态> |
| 材料 / entity 系统 | <NN>% | <做了什么 / 没做什么> |
| 用户反馈闭环 | <NN>% | <…> |
| L2 事项推进 | <NN>% | <…> |
| L5 实务信号层 | <NN>% | <…> |
| State Ledger 盘库 | <NN>% | <…> |
| 安全债清理 | <NN>% | <…> |
| 卡片复活 / runtime 扩张 | <NN>% | <…> |
| 商业 metric | <NN>% | <…> |
| 测试 / 验收 | <NN>% | <unit / smoke / e2e 状态> |
| 文档报告 | <NN>% | <CURRENT_STATE / DECISION_LOG / 本报告自身> |

**本 sprint 整体完成度：<NN>%**
**TEBIQ 1.0 整体完成度：<NN>%**

> Codex 口径与自评不一致时，以 Codex 口径为主；自评分数仅作参考并注明分歧。

---

## 2. 实际上线的能力（用户能看到，已逐 URL 200 验证）

> 每一行都必须是 `curl` 验证过的真实状态。dynamic route 用一个真实 sample id 验。
> 不接受"应该 OK / 推断 OK / 等 cache"。

| URL | HTTP | 真实内容 |
|---|---|---|
| https://tebiq.jp/<route> | 200 | <一句话内容> |
| https://tebiq.jp/<route> | 200 | <…> |
| ... | ... | ... |

Production smoke（`npm run qa:production-smoke`）：<NN>/<NN> PASS，时间戳 <UTC>。
Production answer smoke（`npm run smoke:production-answer`）：<N>/<N> PASS。

内部 / admin（404 给外部是 by design）：
- `GET /api/internal/<…>`
- `POST /api/<…>`

---

## 3. **明确没做** 的事（不掩饰）

> §5.3 #4 强制：每一条都要 explicit "X 没修，原因是 Y，影响是 Z"。
> "推迟下 sprint" 不能掩盖未诊断的问题；如果 root cause 没找到，写"未诊断"。

### 3.1 <模块 A 剩余 NN%>

| 项 | 状态 | 原因 / 影响 |
|---|---|---|
| <具体项> | ❌ 没做 | <原因 / 影响> |

### 3.2 <模块 B 全部>

- <事项 1>（原因：<…>，影响：<…>）
- <事项 2>（原因：<…>，影响：<…>）

### 3.3 测试覆盖度

- 单测 <N> 过 / <N> skipped / <N> fail
- 5 题 production smoke <过 / 不过>
- 20 题扩展 smoke <做了 / 没做，原因：…>
- e2e user journey <做了 / 没做，原因：…>

---

## 4. 本 sprint 的事故 / postmortem（透明记录）

> 没有事故就写 "本 sprint 0 事故"，但要 explicit 写，不能省略本节。
> 有事故就一字不漏列：症状 → 误诊 → 真因 → 修复 → 教训。

### 事故 <N>: <一句话标题>
- **症状**：<…>
- **<v1> 误诊**：<…>
- **真因**：<…>
- **修复**：<PR / commit / 命令>
- **教训**：<具体到下次 audit 哪一条 / 哪份文档要加>

---

## 5. 实质交付清单（去掉过度乐观语）

**确实做了**：
- <PR / 数字 / 范围>
- <…>

**确实没做**：
- <…>
- <…>

> 不写 "全部上线 ✅"。写具体数字 / 具体 URL / 具体范围。

---

## 6. 下一步建议（按真实优先级）

| 优先级 | Work Block | 估时（agent wallclock）| 前置 |
|---|---|---|---|
| **P0** | <…> | <h> | <无 / 需要 X> |
| **P0** | <…> | <h> | <…> |
| **P1** | <…> | <h> | <…> |
| **P2** | <…> | <h> | <等 DOMAIN / 等真实数据 / 等 user 裁决> |

---

## 7. 给下一个接手 AI 的警示

> 至少 3 条，必须是本 sprint 真实踩过的坑，不是泛泛"要小心"。
> 写完后这几条要 backport 到 `TEBIQ_AI_AGENT_WORK_MODE.md §5.3` 或 §10。

1. <具体到命令 / 文件 / 行为>
2. <…>
3. <…>

---

## 附录 A：pre-report-audit 输出

> 直接粘 `npm run qa:pre-report-audit` 的最后 ~30 行。如果没 PASS，本报告必须在 §3 列出所有 fail 项。

```
（粘贴这里）
```

## 附录 B：production-url-smoke 全表

> 直接粘 `npm run qa:production-smoke` 的表格输出。

```
（粘贴这里）
```
