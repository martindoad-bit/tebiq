# Auth + Question Intake Production Report

## 基线
- branch: `codex/auth-intake-production`
- main before: `ddab59dfbcc68f6edc25882d7be0dad4efdaa7c4`
- main after: `e469f3f398ab14efa0ac95f10ba7b50bb0a77eb9`

## 合入内容
- question-intake-v1: 已合入 `origin/codex/question-intake-v1`。
- Resend integration: 已接入 magic link 邮件发送；有 `RESEND_API_KEY` 时走 Resend，无 key 且非 production 时走 mock/dev。
- migrations:
  - `0019_cheerful_junta.sql`
  - `0020_salty_spiral.sql`

## Resend
- SDK: `resend@^6.12.2` 已在依赖中。
- from email: 读取 `RESEND_FROM_EMAIL` / `RESEND_FROM_NAME`，默认 `TEBIQ <noreply@tebiq.jp>`。
- dev mode: 非 production 且无 `RESEND_API_KEY` 时写 mock email，并在 server log 输出 dev magic link。
- production behavior: production 不使用 mock fallback；Resend 失败时返回安全错误。
- rate limit:
  - 同一邮箱 5 分钟最多 3 次。
  - 同一 IP 1 小时最多 10 次。
  - 优先使用现有 Upstash KV 包装；KV 不可用时降级为进程内内存计数。

## Migration
- 0019: 新增 Decision Intelligence 相关 enum / `decision_cards` / `decision_reviews` / `query_backlog` / `answer_feedback` / 索引 / 外键。
- 0020: `query_backlog` 增加 `manual_import` 状态、放宽 `normalized_query` NOT NULL、增加 `visa_type` / `contact_email` / `status` / `priority` / `note` / `updated_at` 和索引。
- 是否非破坏性: 是。未发现 `DROP TABLE` / `DROP COLUMN` / `TRUNCATE` / 改主键 / 重命名列；`DROP NOT NULL` 是放宽约束。
- production 是否执行: 已执行，`npm run db:migrate` 成功。
- 表/字段确认:
  - `decision_cards`: 存在。
  - `decision_reviews`: 存在。
  - `query_backlog`: 存在。
  - `answer_feedback`: 存在。
  - `query_backlog.visa_type` / `contact_email` / `status` / `priority` / `note` / `updated_at`: 存在。

## 验证
- npm run lint: 通过。
- npx tsc: 通过。
- npm run build: 通过。
- npm run test: 通过。
- npm run db:generate: 通过，No schema changes。
- npm run audit:launch-copy: 通过。
- npm run validate-check-dimensions: 通过，保留 2 条内容 warning。
- local production routes:
  - `/`: 200
  - `/login`: 200
  - `/check`: 200
  - `/knowledge`: 200
  - `/photo/sample-result`: 200
  - `/decision-lab`: 200
  - `/admin/questions`: 200
  - `/admin/questions/import`: 200
  - `/admin/review-lite`: 200
- local API behavior:
  - `POST /api/auth/send-magic-link` invalid email: 400。
  - production-mode local without Resend key: 503 安全错误，不泄露技术细节。
  - 同邮箱第 4 次请求: 429 安全限流文案。
  - `POST /api/questions` local without DB: 500 安全错误。
  - `POST /api/admin/questions/import` local without DB: 500 安全错误。
- dev mode email: mock provider 写入 `.eml` 成功。
- production login email: `POST /api/auth/send-magic-link` 对 Resend 测试地址返回 `200 {"ok":true,"provider":"resend"}`。
- production magic link click: 从 DB 取测试地址未消费 token 后请求 verify route，返回 `303` 且设置 session cookie；未输出 token 或 cookie。
- production question submit: `POST /api/questions` 返回 200，写入 `[QA测试]` 问题成功。
- production admin import: `POST /api/admin/questions/import` 批量导入 10 行 `[QA批量导入]` 测试问题成功，`inserted=10`。
- production routes:
  - `/`: 200
  - `/login`: 200
  - `/admin/questions`: 200
  - `/admin/questions/import`: 200
  - `/decision-lab`: 200
  - `/check`: 200
  - `/knowledge`: 200
  - `/photo/sample-result`: 200

## 法律页主体
- `/tokusho`: 已包含 `hedgefox合同会社（刺狐合同会社）` 和 `contact@tebiq.jp`。
- `/privacy-policy`: 已补 `刺狐合同会社` 和 `contact@tebiq.jp`。
- `/pricing`: 已在订阅说明补 `刺狐合同会社` 和 `contact@tebiq.jp`。

## 仍需创始人确认
1. 是否实际收到邮件。
2. 邮件是否进垃圾箱 / 广告箱。
3. 是否能点链接登录。
4. 是否能批量导入问题。

## 是否可以进入下一步
是。代码验证、production migration、线上问题提交、批量导入、Resend API 发送和 magic link verify route 均已通过。实际收件箱到达率仍需创始人用真实邮箱确认。
