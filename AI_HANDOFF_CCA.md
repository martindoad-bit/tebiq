# AI Handoff - CCA

最后更新: 2026-04-29T10:50:32Z

## CCA(代码)状态

- 当前任务: 1.0 上线就绪 P0 修复三项
- 当前分支: chore/p0-launch-fixes
- 当前 worktree: /Users/martin/Documents/tebiq/.claude/worktrees/codex-p0-fixes
- 状态: awaiting_merge
- 最近一次 push: push 后以 `chore/p0-launch-fixes` HEAD 为准
- 给其他 AI 的通知:
  - `chore/p0-launch-fixes` 已完成 P0-1 到 P0-3，等待创始人手机端到端测试。
  - 暂不 merge；测试通过后再进入 main。

## Block 12 production 验证

- 配额弹窗显示 `今日次数已用完`、`已归档 N 份文书`、查看提醒/升级入口。
- 新账号 magic link 登录后跳转 `/onboarding`。
- onboarding 4 个卡片可进入 `/photo`，跳过可回首页。
- 试用账号首页显示试用状态条。
- `/photo` 显示 `上传 PDF / 截图`。
- 真实日文 PDF 上传识别成功，返回 docType / issuer / documentId。
- handoff 已拆成 `AI_HANDOFF_CCA.md` / `AI_HANDOFF_CCB.md` / `AI_HANDOFF_UI.md`。

## Block 13 验证

- `npx tsc --noEmit` 通过。
- `npm run lint` 通过。
- `npm run db:generate` 二次执行 No schema changes。
- `npm run test` 通过。
- `npm run build` 通过。
- 待 review: brief 提到的 `docs/research/checklist-vs-quiz.md` 当前 main/worktree 未找到；实现按 brief 明确结构完成。

## Block 14 验证

- `npx tsc --noEmit` 通过。
- `npm run lint` 通过。
- `npm run db:generate` 通过，No schema changes。
- `npm run test` 通过。
- `npm run build` 通过。

## P0 上线修复验证

- P0-1: `/check/[visa]/[dimension]` 数据缺失时降级为准备中页，不再 404。
- P0-1: `/check` 清单优先读取 batch-04 `articles.dimension_key`，无数据时回退内置维度。
- P0-1: 用户可见文案改为 `续签材料准备检查 / 准备事项 / 递交前确认` 系统。
- P0-2: 首页去掉双层重复入口，只保留一个主 CTA，并前置住民税样例结果。
- P0-2: 新增 `/photo/sample-result`，`/photo` 和 `/timeline` 空态已接入样例。
- P0-3: `/pricing` 开通按钮上方新增日中双语消费者保护说明。
- P0-3: 新增 `/settings/account`，删除按钮使用现有软删除 API 和不可撤销二次确认文案。
- 验证通过: `npm run lint` / `npx tsc --noEmit` / `npm run build` / `npm run test`。
