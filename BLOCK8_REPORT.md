# BLOCK 8 REPORT — Backend

Branch: `codex/block-8`
Base: `origin/claude/block-7`

## 8 项任务完成情况

| 任务 | 状态 | 说明 |
|---|---:|---|
| 1. SMS 验证码排查 + dev fallback | ✅ | 现有代码原本只有 mock log，没有真实 SMS provider。已新增 Twilio SMS channel；`OTP_DEV_MODE=true` 且非 production 时验证码写 server log，并返回给前端显示右下角 dev 提示。 |
| 2. 注册改为邮箱优先 | ✅ | `/login` 默认邮箱 magic link；手机号为第二 tab。新增 `/register`，邮箱/手机号任选其一。Magic link token 7 分钟有效，成功后创建 session。`/my/account` 可补邮箱或手机号。 |
| 3. 拍照不需要登录 | ✅ | `/api/photo/recognize` 接受未登录请求；匿名 documents 用 `tebiq_anon_session` cookie 关联。结果页未登录时显示注册引导卡片。真实 Bedrock 识别在本地返回 503，见验证记录。 |
| 4. 大屏手机字体 | ✅ | `html` root font-size 改为 `clamp(15px, 1.5vw + 12px, 18px)`；AppShell 桌面/平板宽度放宽到 520/560，不改 Tailwind token。 |
| 5. 知识库导入工具 | ✅ | 新增 `scripts/dev-utils/import-knowledge.ts` 和 `npm run import-knowledge`。读取 `docs/knowledge-seed/*.md` frontmatter，按 slug 幂等 upsert 到 articles；不覆盖 `last_reviewed_at`。 |
| 6. 邀请页未登录拍照引导 | ✅ | `/invite/[code]` 增加“先体验拍照”；点击写入 `tebiq_invite_code` cookie 并跳 `/photo`。注册时自动读取 cookie 发放双方奖励。 |
| 7. session_id 转家庭账户迁移 | ✅ | 新增 `lib/auth/migrate-session-data.ts`，迁移 `documents`、`quiz_results`、`events`。OTP 和 magic link 登录成功后都会调用。 |
| 8. 小 bug backlog | ✅ | 见文末。 |

## SMS / 邮件环境变量

当前推荐 SMS provider：Twilio。Vercel 需要配：

- `SMS_PROVIDER=twilio`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_MESSAGING_SERVICE_SID`（推荐）或 `TWILIO_FROM_NUMBER`
- `OTP_DEV_MODE=true` 仅用于本地 / preview 排查，production 不要开

Magic link 邮件沿用现有 email channel：

- `NOTIFICATION_EMAIL_CHANNEL=mock` 可强制 mock
- `RESEND_API_KEY` 配好后自动走 Resend
- `NEXT_PUBLIC_SITE_URL` 或 `NEXT_PUBLIC_SITE_ORIGIN` 用于生成邮件里的绝对链接

## 数据库变更

新增 migration: `lib/db/migrations/0009_lively_gorgon.sql`

- `members.phone` 改 nullable
- `phone_or_email_required` check constraint
- `members_email_unique`
- `documents.session_id`
- `documents.family_id` nullable
- `documents_family_or_session_required` check constraint
- `login_magic_link_tokens`
- `articles.sources_count`
- `articles.last_verified_at`

## 字体截图

输出目录：`docs/visual-report/screenshots/font-scaling/`

已生成 25 张 after 截图：

- 宽度：320 / 375 / 393 / 430 / 768
- 页面：首页 `/`、拍照 `/photo`、登录 `/login`、注册 `/register?from=photo`、自查入口 `/check/select`

基线 before 可参考既有视觉报告截图：

- `docs/visual-report/screenshots/01-home-before.png`
- `docs/visual-report/screenshots/02-photo-before.png`
- `docs/visual-report/screenshots/login-before.png`

## 验证记录

- ✅ `npm run lint`：0 warning / 0 error
- ✅ `npx tsc --noEmit`
- ✅ `npm run build`
- ✅ `npm run db:generate`：No schema changes
- ✅ 邮箱注册 / magic link：mock email 链接验证成功，session 创建成功
- ✅ 手机号 OTP：`OTP_DEV_MODE=true` 下验证码登录成功
- ⚠️ 未登录真实拍照识别：接口链路已放开，但本地 Bedrock 返回 `service_unavailable` 503，需创始人检查 AWS/Bedrock Vercel env 和模型权限
- ✅ 未登录配额：匿名 session seed 3 条 documents 后，第 4 次识别请求返回 402 `quota_exceeded`
- ✅ 注册后迁移：匿名 `documents + quiz_results` 成功迁到新 family/member
- ✅ 邀请 cookie：邀请链接先体验拍照后，邮箱注册自动 accepted 并发放 reward

本地验证备注：当前连接的 dev DB migration history 停在旧状态，`npm run db:migrate` 被旧 migration history 卡住；为了 smoke test 手动应用了 0009 SQL 到本地连接库。代码侧 `db:generate` 已确认无 schema drift。

## 已知小问题 backlog（Block 9）

- 大屏字体：已在 T4 修，本轮继续观察视觉侧最终 clamp 上下限。
- Bedrock 本地 503：疑似 AWS/Bedrock env、模型权限或区域配置问题，待创始人看 Vercel logs / AWS 权限。
- Dev DB migration history：本地连接库 migration 记录与仓库 0005-0008 不一致，后续需要整理一次迁移状态。

## 1.0 上线就绪度更新

Backend 主链路更接近 1.0：邮箱优先注册、短信 dev fallback、匿名拍照体验、注册后迁移、邀请奖励和知识库导入都已落地。上线前剩余关键项是：真实 SMS provider 配置、Bedrock 线上识别确认、Resend 域名/发信确认、Supabase migration 正式应用。
