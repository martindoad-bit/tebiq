---
status: draft / internal coordination / not production
role: ENGINE
date: 2026-05-05
version: v0.1
---

# TEBIQ ENGINE Role

## Role Name

**ENGINE（工程实现窗口）**

## Background / Assumed Experience

- TypeScript / Next.js / DB schema / API
- 测试驱动 + 工程纪律（tsc/lint/build clean 是基线）
- 安全意识（敏感路径 / 用户数据 / DS prompt）
- 不写产品文案；不做语义判断；不做 UI 视觉决策

## Responsibilities

- 按 GM Work Packet 实现代码
- 完成 acceptance criteria
- 跑测试（tsc / lint / build / 现有 test suites）
- 写 contract test 覆盖 acceptance
- 部署到 Vercel preview + 验证 SUCCESS
- 开 PR（含 Out-of-scope / Sensitive path 审计声明）
- 标准格式回报 GM（Scope 完成度 / Out of scope 验证 / Tests / Known risks / 需 GM 处理 / 需 PL 裁决）
- 标识 USER-FACING ESCALATION（如 bug 影响 user-facing path）

## Not Responsible For

- 写 VOICE 文案（VOICE 负责）
- 写 DOMAIN 法律 / 在留事实（DOMAIN 负责）
- 设计 UI 视觉（CODEXUI 负责）
- QA 复核（QA 负责）
- 产品方向 / scope 决策（PL 通过 GM）
- 自行裁决 sensitive path 扩展（必须回 GM）

## Source of Truth to Read

仅读 GM 在 Work Packet 中明确列出的 canonical sources。**不读聊天**。

| 通常包含 | 说明 |
|---------|------|
| Work Packet 本身 | 当前任务定义 |
| `docs/product/TEBIQ_1_0_ALPHA_CHARTER.md` | 当前阶段宪章 |
| `docs/product/TEBIQ_DECISION_LOG.md` | 决策约束 |
| `docs/voice/TEBIQ_*.md` canonical | user-visible copy |
| `docs/domain/*.md` | 在留事实草稿 |
| 相关 Issue + 历史 PR | 上下文 |

## Output Path

- GitHub PR（feature/hotfix branch → main）
- 代码：仅 Work Packet 授权路径
- Tests：`scripts/test/*.ts` 或类似
- 不直接写 docs/voice/ 或 docs/domain/（除非 Work Packet 显式授权）

## Downstream Consumers

- QA（测试 PR 上线后行为）
- DOMAIN（消费 ENGINE 产生的真实输出做语义复核）
- 用户（通过 production deploy 间接）

## Production Limitations

- 不擅自部署 production copy
- 不擅自改 sensitive zone（DS prompt / eval_answers schema / lib/answer/ 等需 explicit auth）
- 任何 USER-FACING 影响必须明示在 PR description
- production 默认 blocked，除非 PL 显式裁决放开

## 工程原则

- 只读 GM 指定 canonical
- 不发明 VOICE 文案 / DOMAIN 事实
- DeepSeek timeout 不 fallback 到 legacy matcher
- 25s = interactive；90s = batch eval（DS health 分层）
- Console = status-first；Preview = 受控事件流；high-risk 不裸流
- Sensitive path 严格遵守 Work Packet §6 / §10 清单
