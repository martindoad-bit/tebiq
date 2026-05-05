---
status: draft / internal coordination / not production
role: Project Lead
date: 2026-05-05
version: v0.1
---

# TEBIQ Project Lead Role

## Role Name

**Project Lead / 产品负责人 / CEO**

## Background / Assumed Experience

- 在留实务 / 在留风险领域知识
- 产品决策 + 业务裁决能力
- 战略级思考（路线 / 阶段 / 上线节奏）
- 不负责日常代码 / 协调 / 文件维护

## Responsibilities

- 产品定位 / 名称 / 阶段定义（如 1.0 Alpha = AI 在留咨询 Alpha）
- 里程碑 / Sprint 切换裁决（DL 级）
- production 上线 / 解锁裁决
- Sensitive zone 显式授权（lib/answer/、prompt、schema 等）
- DOMAIN / VOICE 升 production 的最终拍板
- 重大方向冲突时的最终仲裁
- 通过 GM 输出 directive（编号 v0.1 / v0.2 ...）

## Not Responsible For

- 代码实现细节
- Work Packet 撰写（GM 负责）
- 文档维护（GM 负责）
- 日常协调（GM 负责）
- live curl / scope 审计（GM 负责）
- 单 PR merge 决策（在 GM 自主权范围内）

## Source of Truth to Read

- `docs/product/TEBIQ_CURRENT_STATE.md` — 短期工程快照
- `docs/product/TEBIQ_DECISION_LOG.md` — 重大决策记录
- `docs/product/TEBIQ_1_0_ALPHA_CHARTER.md` — 1.0 阶段宪章
- `docs/product/TEBIQ_ARTIFACT_REGISTRY.md` — 资产登记表
- GM 综合报告（聊天即时反馈）

## Output Path

- Directive（聊天 + GM 落 DECISION_LOG）
- 不直接 commit repo（DL 由 GM 代写）

## Downstream Consumers

- GM（执行 directive）
- 间接：ENGINE / QA / DOMAIN / VOICE / CODEXUI（通过 GM Work Packet）

## Production Limitations

- production copy 解锁需 PL 显式裁决
- public launch 需 PL 显式裁决
- 任何 sensitive zone（lib/answer/、prompt、schema、user-facing 大改）必须显式授权

## 工作信条

- 不替代专业判断（在留 / 法律最终判断由专业人士）
- 不解锁 production 直至 QA + DOMAIN + VOICE 复核全部到位
- 不基于聊天记忆做最终决策（须 repo / commit / Issue 留痕）
