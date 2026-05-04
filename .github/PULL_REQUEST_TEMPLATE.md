## Summary

> 1–3 句话说明这个 PR 做了什么，以及为什么。

## Scope（做了什么）

- 

## Out of scope（没做什么）

- 

## Screenshots / artifacts

> 如涉及 UI 变化，附截图或 Preview URL。如无，删除此节。

## Tests run

```
npx tsc --noEmit        → 
npm run lint            → 
npm run build           → 
npm run test            → 
```

其他测试：

## QA required

- [ ] 需要 QA 审计 — Layer：（PR live QA layers / Page copy QA layers）
- [ ] 已完成 QA — QA Report link：
- [ ] 不需要 QA（原因：）

如涉及 answer 路径：
- [ ] 10 问回归测试通过

## Context impact

```
Context impact:                    yes / no
Current State update:              yes / no
Decision Log update:               yes / no
QA Gates update:                   yes / no
Domain review needed:              yes / no
User-facing answer path changed:   yes / no
Eval data / Comparison Gate req:   yes / no
Product-owner decision needed:     yes / no
```

> 如 `User-facing answer path changed: yes`，说明是否跑了 Comparison Gate（见 `TEBIQ_QA_GATES.md §5`）。
> 如未跑，必须解释原因；不能留空。

文档影响详情：

- [ ] `docs/product/TEBIQ_CURRENT_STATE.md` → 已更新 / 已在 PR 中更新
- [ ] `docs/product/TEBIQ_DECISION_LOG.md` → 已更新 / 已在 PR 中更新
- [ ] `docs/product/TEBIQ_CONTEXT_PACK.md` → 已更新 / 待产品负责人裁决
- [ ] `docs/product/TEBIQ_QA_GATES.md` → 已更新 / 待产品负责人裁决
- [ ] `docs/domain/` → 已更新 / 待 DOMAIN 复核
- [ ] 无文档 context impact

## Docs updated

> 列出本 PR 中更新的文档文件。如无，写 none。

- 

## Rollback

> 如何 rollback 此 PR 的改动。

## Production changes

- [ ] 改了生产功能代码 — 说明：
- [ ] 只改了 docs / templates / scripts / tests（无生产影响）

## Product-owner decision needed

> 此 PR 是否有需要产品负责人确认的问题？如无，写 none。

- 

---

> 提交前 checklist：
> - [ ] Bootstrap 已执行（`git fetch origin` + `gh pr list` + 读必读文档）
> - [ ] PR body 填写完整
> - [ ] Context impact 已评估
> - [ ] 不含 `unknown` / `null` / `undefined` 或禁用词
