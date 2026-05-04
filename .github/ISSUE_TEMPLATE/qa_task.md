---
name: QA Task
about: QA 审计任务
title: "qa: [目标 PR 或功能]"
labels: qa
assignees: ''
---

## Target

- PR #：
- Branch：
- Commit：
- Preview URL（如有）：

## Test scope

> 说明本次 QA 覆盖的范围。

## Required docs to read

开始前必须读取（见 TEBIQ_CONTEXT_BOOTSTRAP.md）：

- [ ] `AGENTS.md`
- [ ] `docs/product/TEBIQ_CURRENT_STATE.md`
- [ ] `docs/product/TEBIQ_CONTEXT_PACK.md`
- [ ] `docs/product/TEBIQ_QA_GATES.md`
- [ ] 其他：

## QA Layer

使用哪套 Layer 定义（二选一）：

- [ ] PR live QA layers（API / sidecar / answer 路径）
- [ ] Page / copy QA layers（页面 smoke / 文案审计）

## Technical QA

Layer A 检查结果：

## Semantic QA

Layer B 检查结果：

## Visible text scan

Layer C 检查结果（禁用词扫描 + 内部字段泄漏）：

## Answer path: 10-question regression

仅 answer 路径 PR 需要填写：

| # | 题目 | API | engine | safety | answer_id | /answer/{id} | reload sidecar | 禁用词 | 串域 | 判断 |
|---|------|-----|--------|--------|-----------|--------------|----------------|--------|------|------|
| 1 | | | | | | | | | | |

## P0 list

（无则写 none）

## P1 list

（无则写 none）

## P2 list

（无则写 none）

## DOMAIN review needed

- [ ] 需要 DOMAIN-CC 语义复核
- [ ] 不需要

## Canary decision

- [ ] PASS
- [ ] BLOCK — 原因：

## Required fixes before merge

（无则写 none）
