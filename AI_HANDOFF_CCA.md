# AI Handoff - CCA

最后更新: 2026-04-30T16:35:42+09:00

## CCA(代码)状态

- 当前任务: Answer Engine v0
- 当前分支: codex/answer-engine-v0
- 当前 worktree: /Users/martin/Documents/tebiq/.claude/worktrees/answer-engine-v0
- 状态: awaiting_merge
- 最近一次 push: 待 push
- 给其他 AI 的通知:
  - 用户提问入口已从“提交问题”改为“整理这个问题”，`POST /api/questions` 直接返回 `matched / draft / cannot_determine` 结构化答案。
  - 新增 `/answer/[id]` 结果页、`answer_drafts` 表、`/api/answer/feedback` 和 review-lite answer draft 审核列表。
  - 新增 migration `0021_slow_maelstrom.sql`，非破坏性：创建 `answer_drafts`，给 `answer_feedback` 增加 `answer_draft_id`。
  - 本轮未接实时 AI / RAG / 支付；无 DB 时仍返回 inline answer fallback，不白屏。
  - 报告: `ANSWER_ENGINE_V0_REPORT.md`。

## Auth + Question Intake Production Integration

  - 当前任务已完成并上线。
  - 已合入 `origin/codex/question-intake-v1`，保留 `/api/questions`、`/admin/questions`、批量导入和 review-lite 衔接。
  - 已接入 Resend magic link 发送；production 有 `RESEND_API_KEY` 时真发，无 key 不回退 dev。
  - 非 production dev mode 保留 mock email + server log magic link。
  - 新增 magic link rate limit：同邮箱 5 分钟 3 次、同 IP 1 小时 10 次。
  - `0019_cheerful_junta.sql` / `0020_salty_spiral.sql` 已检查为非破坏性；production migration 已执行成功。
  - production 已验证 `/api/questions` 前台提交、`/admin/questions/import` 批量导入、Resend API 发送和 magic link verify route。
  - 报告: `AUTH_INTAKE_PRODUCTION_REPORT.md`。

## Question Intake v1

- 前台入口: `/`、`/check`、`/knowledge`、`/photo/sample-result`、`/decision-lab`。
- API: `POST /api/questions`。
- Admin:
  - `/admin/questions` 列表、筛选、统计、status/priority/note 更新。
  - `/admin/questions/import` 粘贴 300-500 行历史问题，默认 `manual_import/new/normal`。
- 数据:
  - `query_backlog.visa_type`
  - `query_backlog.contact_email`
  - `query_backlog.status`
  - `query_backlog.priority`
  - `query_backlog.note`
  - `query_backlog.updated_at`
  - `query_match_status.manual_import`
- 验证: lint / typecheck / build / test / db:generate 通过。
- 本地无 `DATABASE_URL`，页面 200，写入 API 返回安全失败文案；未做任何 production DB 写入。

## Decision Intelligence v0

  - 已在 `codex/decision-intelligence-v0` 完成并作为本分支 base。
  - 新增 `/decision-lab`、`/decision-lab/[slug]`、`/admin/review-lite`。
  - 新增非破坏性 migration `0019_cheerful_junta.sql`，包含 `decision_cards` / `decision_reviews` / `query_backlog` / `answer_feedback`。
  - 无 DB / 未迁移时，Decision Lab 使用内置 5 张 seed card fallback；query/feedback/review 写入返回 `saved=false`，页面不崩。
  - CCB 可把真实 seed cards 放到 `docs/decision-seed-cards/**/*.yaml|yml|md`；loader 已支持。
  - CODEXUI 可以基于本分支精修 Decision Lab UI。
  - 暂不 merge main，等待 CCB seed cards 和 UI 分支后做集成。

## Holiday Engineering Upgrade

- base: `origin/launch/review-candidate-p0-ui` at `2174fbe382dcea2fbd5bbcf32f02d86b33b6744f`。
- batch-04 merge 检查: `origin/content/knowledge-batch-04` 已是当前 HEAD 祖先，执行 merge 返回 Already up to date。
- batch-05 merge: `origin/content/knowledge-batch-05` 已合入当前分支；`docs/knowledge-seed/dimensions-visa-specific/*.md` 纳入 importer/validator。
- batch-06 / batch-07: 仅读报告和结构，未合入；规划建议写入 `HOLIDAY_ENGINEERING_UPGRADE_REPORT.md`。
- 内容接入: `/check/{visa}/{dimension}` 优先读取 `articles.category='check_dimension' + visa_type + dimension_key`，有结构化题目时展示真实单项检查；无 DB / 无内容继续显示 `该维度准备中`。
- 验证: lint / typecheck / build / test / db:generate / validate-check-dimensions / audit:launch-copy / smoke:launch 均通过。
- 注意: 本地无 `DATABASE_URL`，`import-check-dimensions` 已验证到 DB 前置检查，会提示配置后再导入；未执行任何 production DB 写入。

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

## P0 二次扫雷

- 修正配额弹窗: 副文案含 `「我的提醒」时间线`，CTA 为 `查看时间线 / 升级会员`。
- 清理自查可见文案残留: 非 admin 前端扫描无 `续签自查 / 当前风险点 / 建议必看 / 风险 / 必看 / 危险`。
- 修正机械替换表达: `待确认事项触发项 / 待确认事项等级 / 待确认事项高`。
- 二次验证通过: `npm run lint` / `npx tsc --noEmit` / `npm run build` / `npm run test`。
- 本地 production server 抽测: `/`、`/photo`、`/photo/sample-result`、`/timeline`、`/pricing`、`/check`、5 个 `/check/{visa}/{dimension}` 组合均为 200；`/settings`、`/settings/account` 未登录 307 跳转。
- Vercel preview 已 Ready；分支 alias `https://tebiq-git-chore-p0-launch-fixes-martindoad.vercel.app` 当前直连 401，为 Preview Protection。

## Launch Bug Sweep（二轮）

- 新增报告: `LAUNCH_BUG_SWEEP_REPORT.md`。
- 修复: `/photo/sample-result` demo 字段补全；`/pricing` 消费者保护说明补联系入口；`/knowledge` 无 DB 本地 fallback；自查题库去掉 `一定被拒`。
- 验证通过: `npm run lint` / `npx tsc --noEmit` / `npm run build` / `npm run test`。
- 本地 production server 抽测: 指定 17 个页面路由通过；9 个 `/check/{visa}/{dimension}` 组合 200，均走 `该维度准备中` fallback；关键内容断言通过。
- Preview 抽测: 指定 preview 和分支 alias 均返回 401，为 Vercel Preview Protection，需创始人授权后手机检查。
