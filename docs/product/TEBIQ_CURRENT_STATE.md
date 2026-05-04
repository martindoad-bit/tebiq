# TEBIQ 当前状态

> 短期工程快照。最多 100 行，不写长文。
> 由 GM 维护。任何 active PR / 当前主线 / 阻塞变化时必须更新。
> 长期原则不在此写，见 `TEBIQ_CONTEXT_PACK.md`。重大决策不在此写，见 `TEBIQ_DECISION_LOG.md`。

| 字段 | 值 |
|------|-----|
| `last_verified` | 2026-05-04 |
| `verified_by` | GM |
| `source_of_truth` | GitHub remote `origin/main` + `gh pr view` (per-branch) + user-provided latest facts |
| `main_head` | `c39a4e3` |
| `main_head_title` | chore(infra): enable EVAL_LAB_ENABLED in production for Eval Round 1 |

---

## 当前主线

**Eval Round 1A — 真实对照样本生成与语义验证**

目标：生成 30 条 FULL_COMPARABLE 样本（DeepSeek raw + TEBIQ output），完成首轮 DOMAIN 标注，产出决策包。

参见：
- `docs/eval/EVAL_ROUND1_SAMPLE_PACK.md` — 30 题选单
- `docs/eval/EVAL_ROUND1_ANNOTATION_RUBRIC.md` — 标注评分标准

---

## 当前 Production 状态

main（`c39a4e3`）已包含：

- Eval Lab V1（DB-backed，100 题，`EVAL_LAB_ENABLED=1` 已启用到 Production）
- DeepSeek V4 Pro 主回答源（3 段式）
- Matter Draft V0
- V07 Quiet Brow VI
- Answer Core 安全外壳
- Context OS + GM 正式试运行组织模式

Production URL：`https://tebiq.jp`（Vercel 正在部署 `c39a4e3`）

---

## Eval Round 1A 进度

| 步骤 | 状态 | 说明 |
|------|------|------|
| PR #9 merge | ✅ 完成（398d55e） | 2026-05-04 13:58 JST |
| EVAL_LAB_ENABLED → Production | ✅ 完成 | Vercel env 已设置；c39a4e3 触发重部署 |
| Production 部署就绪 | ⏳ 等待 | 约 2-3 分钟 |
| 30 题 Seed + TEBIQ 通道生成 | ⏳ 等待部署 | — |
| 30 题 DeepSeek 通道生成 | ⏳ 等待部署 + API 恢复 | 上次 504 transient |
| DOMAIN / 用户标注 | ⏳ 等待双通道完成 | — |
| Round 1A 决策包 | ⏳ 等待标注完成 | — |

---

## DOMAIN v0.1 状态说明

PR #10（Domain 语义复核基础设施）的任何输出目前为：

**Pre-Eval Hypothesis Pack（预标注假设包）**，不是 Round 1A 正式结论。

用途：指导标注重点 / P0 观察清单 / must_have 候选 / handoff_trigger 候选。

不可直接触发：生产 Prompt 修改 / 用户端改版 / QA Gates 更新 / Fact Cards 上线。

---

## 当前 Active PR

| PR | 状态 | 等待 |
|----|------|------|
| [#10](https://github.com/martindoad-bit/tebiq/pull/10) | Domain 语义复核基础设施 v0.1 | 用户内容审核（标注参考材料）|
| [#11](https://github.com/martindoad-bit/tebiq/pull/11) | Product docs 增量（暂不 merge）| 产品负责人裁决：close or 提取小 patch |
| [#4](https://github.com/martindoad-bit/tebiq/pull/4) | answer envelope-first v0.2（暂停）| 产品裁决：后续检查是否 stale |

---

## 当前不做的事

- 盲修用户端回答页（无 Eval 数据支撑）
- 在标注数据闭环建立前调 Prompt
- 完整后台 / Partner Workspace / 原生 App / BI dashboard
- Autonomous agent 架构

---

## Current State 维护规则

| 规则 | 说明 |
|------|------|
| PR merge → 立即更新 | GM 负责 |
| 未确认状态 → 写 unknown | 宁可 unknown，不写错 |
| last_verified > 3 天 | 标注 stale，向 GM 报告 |
| last_verified > 7 天 | 管理类窗口必须停止 |
| remote 与本文件冲突 | 以 remote + 用户最新事实为准 |
