---
name: Engineering Task
about: GM 向 ENGINE 下达的工程任务
title: "feat/fix/chore: [简要标题]"
labels: engineering
assignees: ''
---

## Background

> 为什么要做这个任务？来自哪个产品裁决？引用 DECISION_LOG 条目（如 DL-001）或产品负责人指令。

## Product decision

> 产品负责人 / CEO 的原话或 Decision Log 编号。如果没有，必须在开工前补充。

## Scope（做什么）

- 
- 

## Out of scope（不做什么）

- 
- 

## Files likely touched

> 预计需要修改或新增的文件，供 ENGINE 评估范围。

- 
- 

## Acceptance criteria

> 至少 3 条可验证标准。ENGINE 完成后按此自测。

- [ ] 
- [ ] 
- [ ] 

## QA plan

> 由谁执行 QA，用哪套 QA Layer（见 TEBIQ_QA_GATES.md），是否需要 live 环境。

- QA 执行者：
- Layer：
- 需要 DOMAIN 语义审核：是 / 否
- 需要 Preview URL：是 / 否

## Rollback

> 如果 merge 后出问题，如何 rollback。

## Context impact

> 此任务完成后，哪些文档需要更新？

- [ ] `TEBIQ_CURRENT_STATE.md` 需要更新
- [ ] `TEBIQ_DECISION_LOG.md` 需要新增条目
- [ ] `TEBIQ_CONTEXT_PACK.md` 需要更新
- [ ] `TEBIQ_QA_GATES.md` 需要更新
- [ ] `docs/domain/` 需要更新
- [ ] 不需要任何文档更新

## Product-owner questions

> 开工前需要产品负责人确认的问题。如无，写 none。

- 
