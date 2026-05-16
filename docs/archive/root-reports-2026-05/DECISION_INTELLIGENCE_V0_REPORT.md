# Decision Intelligence v0 Report

## 基线
- branch: `codex/decision-intelligence-v0`
- base: `origin/main` at `ddab59d`
- started at: 2026-04-30 JST

## 新增路由
- `/decision-lab`
  - 决策卡列表页。
  - 顶部有“情况输入”框。
  - 关键词命中时跳到对应 card；未命中时写入 backlog 并显示“这个情况还没有整理，我们会根据收到的问题继续补充”。
- `/decision-lab/[slug]`
  - 按 `card_type` 渲染 4 类卡片：`decision_card` / `workflow` / `risk_chain` / `misconception`。
  - 展示 `answer_level`、`source_grade`、`last_verified_at`、`requires_review` 和使用边界。
  - 底部有反馈按钮：有帮助 / 不准确 / 看不懂 / 我的情况不一样。
- `/admin/review-lite`
  - 轻量审核界面。
  - 支持筛选 `needs_review`、`L3/L4`、`requires_review`、`source_grade 不足`。
  - 每条 card 显示草稿、source refs、审核评分和 flags。

## 数据结构
新增非破坏性 migration：`lib/db/migrations/0019_cheerful_junta.sql`。

新增表：
- `decision_cards`
- `decision_reviews`
- `query_backlog`
- `answer_feedback`

新增 enum：
- `decision_card_type`
- `decision_answer_level`
- `decision_status`
- `source_grade`
- `decision_reviewer_role`
- `decision_publish_decision`
- `query_match_status`
- `answer_feedback_type`

设计说明：
- AI 只是后台起草员；card 必须带 `status`、`answer_level`、`source_grade`、`requires_review`。
- 前台读取顺序：DB approved cards + repo seed cards；DB 不可用或表未迁移时自动 fallback 到内置 5 张 seed cards。
- `query_backlog` / `answer_feedback` / `decision_reviews` 写入 DB；无 `DATABASE_URL` 或 migration 未跑时返回 `saved=false`，页面不报错。

## 是否新增 migration
- 是。
- migration 仅 `CREATE TYPE` / `CREATE TABLE` / `CREATE INDEX` / `ADD FK`。
- 没有 `DROP TABLE`、`DROP COLUMN`、改主键或修改旧表。
- 不需要本轮立刻跑 production migration；未迁移时前台仍可读内置 seed cards。

## Seed Cards
当前内置 5 张 fallback seed cards：
1. `pension-switch-company-dormant`
2. `management-office-relocation`
3. `address-change-order`
4. `bring-parents-to-japan`
5. `employment-violation-risk-chain`

未来 CCB 可以把 YAML / markdown 放到：
- `docs/decision-seed-cards/**/*.yaml`
- `docs/decision-seed-cards/**/*.yml`
- `docs/decision-seed-cards/**/*.md`

loader 已支持这些路径。Next tracing 也已包含 `docs/decision-seed-cards/**/*`，Vercel production 可读取 repo seed。

## Feedback / Query 收集方式
- 查询：`POST /api/decision-lab/query`
  - 输入 `{ query, sourcePage }`
  - 简单关键词命中：
    - 年金 / 国民年金 / 公司休眠
    - 办公室 / 搬迁 / 公司地址
    - 父母 / 老人 / 永住
    - 老板 / 雇错 / 签证不符
    - 地址变更 / 在留卡
  - 命中写 `match_status=matched`；未命中写 `no_match`。
- 反馈：`POST /api/decision-lab/feedback`
  - 写入 `answer_feedback`。
  - 无 DB 时降级为 `saved=false`，不影响用户页面。
- 审核：`POST /api/admin/review-lite`
  - 写入 `decision_reviews`。
  - 无 DB 时降级为 `saved=false`。

## Admin Review-lite 使用方法
- 访问 `/admin/review-lite`。
- 如设置 `ADMIN_KEY`，需要 `/admin/review-lite?key=...`。
- 页面不进入主导航。
- 当前是轻权限版本；正式上线前建议接入统一 admin auth。

## 未完成事项
1. CCB 的真实 seed YAML 尚未合入本分支；当前使用内置 fallback seed cards。
2. `decision_cards` 的 DB importer 尚未做；v0 先让页面读 repo seed + DB approved rows。
3. `review-lite` 只保存 review record，不自动改 card status。
4. 未做 RAG、未做前台实时 AI 回答、未改收费。
5. 正式 production 使用 DB 记录 query/feedback 前，需要跑 migration 0019。

## 验证
- `npm run lint`: pass
- `npx tsc --noEmit`: pass
- `npm run build`: pass
- `npm run test`: pass
- `npm run db:generate`: pass，二次执行 `No schema changes`
- 本地 production 抽测:
  - `/decision-lab`: 200
  - `/decision-lab/pension-switch-company-dormant`: 200
  - `/decision-lab/management-office-relocation`: 200
  - `/decision-lab/bring-parents-to-japan`: 200
  - `/admin/review-lite`: 200
  - `POST /api/decision-lab/query` with `公司休眠 国民年金`: 200，命中 `pension-switch-company-dormant`，无 DB 时返回 `saved=false`

## 是否建议合 main
建议先作为功能分支给创始人/CCB/CODEXUI review，不直接合 main。

原因：
- 技术上可运行，且无 DB 时不崩。
- 但 CCB 的真实 5 张 YAML seed cards 和 CODEXUI 的 Decision Lab UI 尚未合入。
- `review-lite` 仍需正式 admin 权限策略。
