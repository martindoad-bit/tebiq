---
name: DOMAIN Review Task
about: DOMAIN-CC 语义复核任务
title: "domain: [复核主题]"
labels: domain
assignees: ''
---

## Questions / answers to review

| # | 用户问题 | DeepSeek 裸答（摘要）| TEBIQ 当前输出（摘要）|
|---|----------|---------------------|----------------------|
| 1 | | | |

## Required context

开始前必须读取：

- [ ] `AGENTS.md`（DOMAIN-CC 角色边界）
- [ ] `docs/product/TEBIQ_CONTEXT_PACK.md`（TEBIQ 定位）
- [ ] `docs/product/TEBIQ_CURRENT_STATE.md`（当前主线）
- [ ] `docs/domain/TEBIQ_DOMAIN_REVIEW_GUIDE.md`（如存在）
- [ ] `docs/domain/TEBIQ_DOMAIN_AGENT_CONTRACT.md`（如存在）
- [ ] 相关 Eval Lab 导出 JSON（如有）

## Output fields（每道题必须填写）

- `user_real_intent`：用户真正想解决什么
- `expected_direction`：正确的回答方向应该是什么（如"应该是经管 → 人文，不是反向"）
- `direction_correct`：yes / no / partial
- `must_have`：回答中必须包含的信息点
- `must_not_have`：回答中不得出现的信息点
- `missing_points`：当前 TEBIQ 输出缺少的关键点
- `dangerous_claim`：是否存在危险断言（yes / no + 说明）
- `hallucination`：是否存在幻觉（yes / no + 说明）
- `severity_if_wrong`：如果这道题方向错了，用户的实际后果是什么（用中文描述）
- `is_tebiq_worse_than_raw_deepseek`：yes / no / partial（TEBIQ 输出是否比 DeepSeek 裸答更差）
- `score`：1–5（1=危险，3=可用，5=很好）
- `severity`：OK / P2 / P1 / P0

## handoff_trigger

此问题是否应触发转接专业人士？

- [ ] 是 — 触发条件：
- [ ] 否

## needs_fact_card

此问题是否可以提炼为事实卡？

- [ ] 是 — 候选标题：
- [ ] 否

## needs_human_review

- [ ] 需要用户/CEO 最终确认（说明原因）
- [ ] 需要真人行政书士确认（说明涉及哪条具体法规 / 条件）
- [ ] DOMAIN-CC 初步复核可以完成（但仍需用户最终确认）

## do_not_use_as_user_facing_fact

> 以下标注内容为内部审查草稿，**不得直接渲染到用户端**。  
> 所有 DOMAIN-CC 输出默认 `draft / needs human review`。  
> DOMAIN-CC 不发布最终行政书士判断。  
> **DOMAIN-CC 不直接给最终用户答案；DOMAIN 输出是 Eval / 标注 / 审查资产。**

- [ ] 已确认：本次标注输出仅用于内部 Eval 数据，不直接落用户端文案
- [ ] 如需落用户端：必须先经产品负责人裁决 + QA Semantic 审核

## action

每道题选一个 action：
- [ ] `golden_case` — 可用作 golden case 基线
- [ ] `prompt_rule` — 需反推 Prompt 规则
- [ ] `fact_card_candidate` — 需提炼事实卡
- [ ] `handoff_rule` — 需加入 handoff 路由
- [ ] `ignore` — 当前不处理
