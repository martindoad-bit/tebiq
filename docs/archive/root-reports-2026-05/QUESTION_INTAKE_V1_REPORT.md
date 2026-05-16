# Question Intake v1 Report

## 基线
- branch: `codex/question-intake-v1`
- base: `origin/codex/decision-intelligence-v0` at `1154194`
- started at: 2026-04-30 JST

## 本轮完成
1. 新增前台提问入口，覆盖首页、续签材料准备检查、知识中心、拍照样例结果、Decision Lab。
2. 新增 `POST /api/questions`，把用户原始问题写入 `query_backlog`。
3. 补强 `query_backlog` 数据结构，用同一张表承载前台提交、Decision Lab 查询和手动批量导入。
4. 新增 `/admin/questions`，支持列表、筛选、统计、status/priority/note 更新和进入审核/起草。
5. 新增 `/admin/questions/import`，支持粘贴 300-500 行历史问题并批量导入。
6. `/admin/review-lite?questionId=...` 可显示原始问题；没有草稿时显示“暂无草稿”。
7. 登录邮件发送失败时统一安全提示，并在邮箱登录错误下方提供“使用手机号登录”入口。

## 新增/修改路由
- `POST /api/questions`
- `GET /api/admin/questions`
- `PATCH /api/admin/questions`
- `POST /api/admin/questions/import`
- `/admin/questions`
- `/admin/questions/import`
- `/admin/review-lite?questionId=...`

## 数据结构
- 复用 `query_backlog`: 是。
- 是否新增 migration: 是，`lib/db/migrations/0020_salty_spiral.sql`。
- 新增字段:
  - `visa_type varchar(80)`
  - `contact_email varchar(255)`
  - `status varchar(32) default 'new'`
  - `priority varchar(16) default 'normal'`
  - `note text`
  - `updated_at timestamptz default now()`
- 修改字段:
  - `normalized_query` 改为 nullable，方便 manual import 保留原始问题。
- enum 补强:
  - `query_match_status` 增加 `manual_import`。
- 破坏性检查:
  - 无 `DROP TABLE` / `DROP COLUMN` / `TRUNCATE` / 改主键。
  - `DROP NOT NULL` 是放宽约束，不删除数据。

## 提问入口
- 首页: 已接入，主文案“你现在遇到什么情况？”
- check: 已接入，source_page 为 `/check` 或 `/check/{visa}`。
- knowledge: 已接入，放在搜索框下方。
- photo sample: 已接入，放在样例说明后。
- decision lab: 已接入，同时保留 v0 的快速匹配框。

提交成功文案：
> 已收到。TEBIQ 会根据收到的问题继续整理场景和手续说明。如果涉及紧急期限或个别判断，请咨询行政書士等专业人士。

未使用文案：
- 问 AI
- AI马上判断
- 专家立即回复
- 保证解决

## 批量导入
- 支持多少行: API 单次最多 800 行，目标 300-500 行可直接粘贴。
- 解析规则:
  - 按换行拆分。
  - 自动过滤空行。
  - 去掉行首 `-` / `*` / `•` / `1.` / `1、`。
  - 单次导入内按小写文本去重。
- 默认状态:
  - `source_page = manual_import`
  - `match_status = manual_import`
  - `status = new`
  - `priority = normal`

## 登录邮箱诊断
- 当前发送路径:
  - 前端: `app/login/AuthPageClient.tsx`
  - API: `app/api/auth/send-magic-link/route.ts`
  - 邮件通道: `lib/notifications/email-channel.ts`
  - 模板: `lib/notifications/templates/login-magic-link.ts`
- 依赖 env:
  - `RESEND_API_KEY` 决定是否走 Resend。
  - `NOTIFICATION_EMAIL_CHANNEL` 可强制 `mock` / `resend`。
  - `NEXT_PUBLIC_SITE_ORIGIN` 或 `NEXT_PUBLIC_SITE_URL` 用于生成 magic link origin。
  - 未读取、未输出任何 env 值。
- 可能失败原因:
  - production 未配置或配置错误的 `RESEND_API_KEY`。
  - `NOTIFICATION_EMAIL_CHANNEL=resend` 但 `RESEND_API_KEY` 不可用。
  - Resend 发件域名 / DNS / sender 未验证。
  - DB token 写入失败或 login_magic_link_tokens/dev_login_links migration 未应用。
- 已做用户侧降摩擦:
  - API 总 try/catch，DB 或邮件异常都返回安全错误。
  - 用户只看到：`登录邮件暂时没有发送成功。请稍后再试，或使用其他登录方式。`
  - 邮箱错误块里提供“使用手机号登录”按钮。
- 需要创始人后续配置:
  - 在 Vercel 确认 Resend 相关 production env。
  - 在 Resend 确认 `tebiq.jp` 发件域名和 sender 状态。
  - 不需要 CCA 在本轮读取或修改任何外部账号配置。

## 基础指标
`/admin/questions` 顶部显示：
- 总问题数
- 今日新增
- 未处理
- 高优先级
- 已忽略
- 已发布

DB 不可用时显示空状态，不 500。

## 本地 production 抽测
- `/`: 200
- `/check`: 200
- `/knowledge`: 200
- `/photo/sample-result`: 200
- `/decision-lab`: 200
- `/admin/questions`: 200
- `/admin/questions/import`: 200
- `/admin/review-lite`: 200
- `/login`: 200
- `POST /api/questions`: 本地无 `DATABASE_URL`，返回 500 安全错误 `提交暂时没有保存成功，请稍后再试`
- `POST /api/admin/questions/import`: 本地无 `DATABASE_URL`，返回 500 安全错误 `导入失败`
- `POST /api/auth/send-magic-link`: 本地无 `DATABASE_URL`，返回 503 安全错误 `登录邮件暂时没有发送成功。请稍后再试，或使用其他登录方式。`

## 验证
- `npm run lint`: pass
- `npx tsc --noEmit`: pass
- `npm run build`: pass
- `npm run test`: pass
- `npm run db:generate`: pass，二次执行 `No schema changes`

## 是否建议进入集成
是，建议进入集成预览，但不要直接上 production，原因：
1. 需要先跑 migration 0019 + 0020，才能真实收集问题和批量导入。
2. CCB 的真实 Decision seed cards 和 CODEXUI 的 UI 精修可以在集成分支里一起验证。
3. 本轮未接 Stripe / Resend / Bedrock，不改变收费和 AI 前台回答行为。
