# TEBIQ 1.0 RC Sprint 1 Report — 2026-05-17 (校准版 v2)

**Status:** RC Sprint 1 实质完成 60-65%（按 Codex 复核口径，非原报告自评）
**Mode:** Autonomous RC Sprint per DL-022 / `TEBIQ_AI_AGENT_WORK_MODE.md`
**Branch:** `rc-sprint/1-0-autonomous` (PR #144) + 2 hotfix PR (#145 migration, #146 me-matters list page)
**Base:** `origin/main@7fb9029` → `e53bbf3` (final, after all hotfixes)
**Agent wallclock:** ≈ 4-5 小时（含 hotfix 收尾）

> **此报告是 v2 校准版。** v1（被替换）声称"全部上线 ✅"，但 Codex 复核发现 `/me/matters` 列表页根本没 commit、`Vercel CDN 缓存`是误诊、商业 metric 全没做。v1 用乐观语言掩盖未诊断的问题。v2 按 Codex 11 项完成度表如实列。

---

## 1. 真实完成度（按 Codex 复核口径）

| 模块 | 完成度 | 真实状态 |
|---|---:|---|
| 生产合并 / 部署 | 95% | PR #144 + #145 + #146 全 merge，最终 SHA `e53bbf3` 在线 |
| 材料宇宙 Top15 | 75% | `/materials` + 15 个 entity 详情上线，但内容 QA / 来源校验 / 交叉引用未做 |
| 用户反馈按钮 | 75% | `/c/[id]` 4 按钮在线，POST `/api/consultation/[id]/feedback` 工作，但中台 UI 渲染 + 数据闭环未验证 |
| L2 事项推进 | 70% | DB schema + API + list 页 + detail 页全在线（hotfix #146 后），但事项关闭按钮是 placeholder、入口未挂 TabBar |
| L5 实务信号层 | 50% | 10 family 框架接入 `DeepWaterHandoff`，但 6 个 `needs_domain` 等专业内容、4 个 `agent_drafted` 未经 DOMAIN 审 |
| State Ledger 盘库 | 60% | main 269 张 fact-card + 3 atlas + 0 历史 worktree 实际扫描；CONTEXT_PACK 说的 390 Atlas + 200+ worktree 残留未盘点 |
| 安全债清理 | 40% | 10 张降级 + 1 张 promote 完成；route gate 冲突 / Family 5 dedicated gate / N03/N10 误报 / 14 个死链未做 |
| 卡片复活 / runtime 扩张 | 20% | 实质 no-op。runtime 仍 92 张（87 ai_verified + 5 human_reviewed），168 张 bulk batch 仍 quarantine |
| 商业 metric | 0% | WB-H 完全推迟。Analytics / Sentry / scrivener funnel / 6 个埋点全没做 |
| 测试 / 验收 | 50% | 254 unit tests 过、5 题 production smoke 5/5 过（重测过，2026-05-17 14:30），但漏跑 `/me/matters` 列表 URL（v1 报告时还没修），20 题扩展 smoke 未做 |
| 文档报告 | 65% (v1) → 90% (v2) | v1 含 CDN 误诊；v2 按真实状态校准 |

**RC Sprint 1 整体完成度：60-65%**
**TEBIQ 1.0 整体完成度：45-55%**

---

## 2. 实际上线的能力（用户能看到，已逐 URL 200 验证）

| URL | 状态 | 真实内容 |
|---|---|---|
| https://tebiq.jp/materials | 200 | 15 个材料 entity 网格 |
| https://tebiq.jp/materials/juminhyo (及其他 14 个) | 200 | 单材料详情：谁开 / 哪里取 / 复用场景 / 常见误区 / 官方源 |
| https://tebiq.jp/me/matters | 200 | 事项列表（active/closed tab） — **修复于 hotfix #146** |
| https://tebiq.jp/me/matters/[id] | 200 | 事项详情：起源问题 / 补充事实 / 关联材料 / 4 CTA |
| https://tebiq.jp/c/[id] | 200 | 答案页底部 4 反馈按钮 + 「我有补充」inline 输入 |
| 深水题 (HSP1 / 经管处置 / DV 等) 答案末尾 | wired | DeepWaterHandoff + L5 expandable panel「为什么这是深水 / 准备什么 / 不要做什么」 |

5 题 production smoke（2026-05-17 14:30 重测）：5/5 PASS。

内部（admin 保护，404 给外部）：
- `GET /api/internal/eval-lab/user-feedback-summary` 反馈聚合
- `POST /api/matters` 系列 CRUD
- Eval Lab quick-verdict bar + JSON 导出（PR #143 已上）

---

## 3. **明确没做** 的事（不掩饰）

### 3.1 WB-B 安全债剩余 60%

| 项 | 状态 |
|---|---|
| 10 张 critical 卡 downgrade | ✅ 做了 |
| 1 张 promote | ✅ 做了 |
| route-gate sourceAssetIds 4 个冲突 | ❌ 没做 |
| Family 5 日配离婚 dedicated P0 gate | ❌ 没做 |
| N03/N10 immigration-notice 误报 | ❌ 没做 |
| 14 个 dead URL FACT 重抓 | ❌ 没做 |

### 3.2 WB-H 商业 metric 0%

- Vercel Analytics 没装
- Sentry / error tracking 没装
- 6 个 event 埋点（答案完成 / 引用点击 / 材料桥 / 深水 CTA / 书士打开 / lead 提交）没做
- 转化漏斗 dashboard 没做

**影响**：你看不见 lead 转化率，无法验证商业模式

### 3.3 卡片真复活 ~0%

168 张 bulk batch 仍 `ai_extracted` quarantine。**runtime 注入路径 0 张新卡**。
**影响**：知识层覆盖没扩大，1.0 350-400 runtime 目标差 258 张

### 3.4 L2 事项的"关闭"动作

`/me/matters/[id]` 关闭按钮是 placeholder span，不是 wired mutation。
**影响**：用户能创建事项但无法标关闭

### 3.5 L5 实务内容深度 0%

10 family 有框架，6 个 `needs_domain` 等待 DOMAIN 写实务文本。
**影响**：用户看到「为什么是深水」框架，但具体「准备什么/不要做什么」对 6 个 family 是占位

### 3.6 State Ledger 不是全宇宙盘库

只扫了 `tebiq-rc-sprint/docs/fact-cards/` 269 张 + `docs/knowledge-atlas/` 3 张。
**没扫**：
- CONTEXT_PACK 提到的 390 Atlas 资产（实际在另一仓库或 worktree）
- 200+ 历史 worktree 残留
- 主 repo `/Users/martin/Documents/tebiq` 上其他分支的卡

### 3.7 测试覆盖度

- 单测 254 过
- 5 题 production smoke 过
- **没做** 20 题扩展 smoke 覆盖深水 / 材料 / 反馈 / 事项
- **没做** 反馈数据真实回流到 Eval Lab 的 e2e 验证
- **没做** 创建 user_matter → 补充事实 → 跳材料 → 找书士 的完整 user journey 测试

---

## 4. RC Sprint 1 的 3 个事故（透明记录）

### 事故 1: `/me/matters` 列表页文件没 commit
- **症状**：deploy 后 `/me/matters` 404
- **v1 误诊**："Vercel CDN 缓存了 deploy 初期的 404，等 6-10min 自然失效"
- **真因**：`app/me/matters/page.tsx` 和 `MatterTabs.tsx` 是 untracked，从未进任何 commit
- **修复**：hotfix PR #146 把两文件加进 main
- **教训**：subagent stalled 时主线接管，没跑 `git status --short` 校验 untracked 应是 0

### 事故 2: drizzle migration 0031 没 commit
- **症状**：deploy 后 `/me/matters` 即使有文件也 throw（DB 缺 `user_matters` 表）
- **真因**：WB-F subagent 用 `drizzle-kit generate` 生成了 SQL，但 commit 漏 add 这些文件
- **修复**：手动 `npm run db:migrate` apply 到生产 DB + hotfix PR #145 把文件加进 main
- **教训**：DB schema 改了一定要包含 `lib/db/migrations/*.sql` + `meta/_journal.json`

### 事故 3: 报告口径过乐观
- **症状**：v1 报告说"全部上线 ✅"
- **真因**：写报告时 `/me/matters 404` 没解决，但用"CDN 缓存"语言掩盖
- **修复**：v2 报告（本文件）按 Codex 复核 11 项表如实列
- **教训**：`TEBIQ_AI_AGENT_WORK_MODE.md` §5.3 新增 Pre-Report Self-Audit 5 条强制规则

---

## 5. RC Sprint 1 实质交付（去掉过度乐观语）

**确实做了**：
- 8 个 commit 进 main（PR #144）+ 2 个 hotfix（#145 #146）
- `/materials/*` 完整 entity 系统首次上线
- `/me/matters/*` 列表 + 详情双页（hotfix 后）
- `/c/[id]` 答案页用户反馈 4 按钮 + 补充输入
- L5 signal registry + DeepWaterHandoff panel
- 10 张 critical 卡 quarantine（安全提升）
- State Ledger CSV + Markdown 报告（main 269 张范围内）
- 254 unit tests，5 题 production smoke

**确实没做**：
- WB-B 安全债 60%（route gate / Family 5 / N03/N10 / dead URL）
- WB-C 卡片复活 实质 no-op（runtime 仍 92 张）
- WB-H 商业 metric 全部
- 全宇宙盘库（只盘了 main 上 269 张）
- L5 实务内容（6 个 family 占位）
- 20 题扩展 smoke
- 反馈 e2e 数据闭环验证

---

## 6. 下一步建议（按真实优先级）

| 优先级 | Work Block | 估时（agent wallclock）|
|---|---|---|
| **P0** | WB-H 商业 metric（Analytics + 6 event + funnel dashboard） | 4-8h |
| **P0** | 卡片复活 SOP 启动（找一个行政書士 weekly cadence，初批 30-50 张） | SOP 4h + 周节奏 8-12 周 |
| **P1** | WB-B 安全债剩余（route gate / Family 5 / N03/N10 / dead URL re-crawl） | 4-6h |
| **P1** | L2 事项关闭按钮 wire | 1-2h |
| **P1** | 20 题扩展 smoke + 反馈 e2e | 2-4h |
| **P2** | L5 实务内容（需 DOMAIN 写 6 个 family，agent 只能做 schema 转换） | 等 DOMAIN |
| **P2** | 全宇宙盘库（扫所有 worktree + 旧 branch） | 4-8h |

---

## 7. 给下一个接手 AI 的 3 个警示

1. **不要凭记忆 `git add`**。subagent stalled 后必须 `git status --short` 检查 untracked / unstaged 应是 0
2. **每个新 URL 都要 explicit GET 一次**，不要"测了 /foo/[id] 就以为 /foo 也 OK"
3. **看到症状立刻问 root cause**，不要用"等 cache/等 propagation"等抽象解释掩盖未诊断的问题。`git ls-files` + `curl -I` + log 三件套，10 秒内能定位真因
