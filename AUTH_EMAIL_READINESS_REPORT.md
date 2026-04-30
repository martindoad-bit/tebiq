# Auth Email Readiness Report

## 基线
- branch: `chore/auth-email-readiness`
- base: `origin/main` at `c0d52f89f72e7d591f08def74a37e2e42ffc3e47`
- started at: `2026-04-30T13:48:30+09:00`

## 当前邮件发送逻辑
- 发送入口: `app/api/auth/send-magic-link/route.ts`
- token: `lib/db/queries/loginMagicLinks.ts` 创建 10 分钟有效的一次性 magic link。
- 邮件通道: `lib/notifications/email-channel.ts`
- 邮件模板: `lib/notifications/templates/login-magic-link.ts`
- 是否已接 Resend: 是。`sendEmail()` 根据环境选择 Resend 或 mock。
- dev mode 行为: 非 production 且无 Resend 配置时写 mock `.eml`，并仅在 server log 输出 dev magic link。
- production 行为: production 不回退 mock；Resend 配置缺失或发送失败时返回安全错误。
- 是否还在 dev log: 仅 `NODE_ENV !== production` 时输出 magic link。
- 失败时用户看到什么:
  - `发送失败，请稍后重试。`
  - `送信に失敗しました。後ほどお試しください。`

## Resend 集成
- 是否安装 SDK: 是，`resend@^6.12.2`。
- 使用的 env 名称:
  - `RESEND_API_KEY`
  - `RESEND_FROM_EMAIL`
  - `RESEND_FROM_NAME`
- from email: `RESEND_FROM_EMAIL`，生产发送要求存在。
- from name: `RESEND_FROM_NAME`，未配置时默认 `TEBIQ`。
- HTML + plaintext: 是。
- 主题: `TEBIQ ログインリンク / TEBIQ 登录链接`。
- 邮件正文: 日中双语、10 分钟有效、无营销文案。
- 错误处理: server log 只记录 Resend error code / message / request id（如 SDK 返回），不输出 API key，不向用户返回 magic link。

## 邮件收不到的诊断结论
- 代码路径: 已经不是纯 dev log，production 会调用 Resend。
- 本轮收紧点: 只有同时存在 `RESEND_API_KEY` 和 `RESEND_FROM_EMAIL` 才视为 Resend 配置完整；production 缺任一项会安全失败，不会回退 dev log。
- 仍可能收不到的原因:
  - Resend domain / sender 尚未完成 DNS 验证。
  - `RESEND_FROM_EMAIL` 与 Resend 已验证发件域不一致。
  - 收件方把新域名邮件放入垃圾箱 / 广告邮件夹。
  - Resend Dashboard delivery log 显示 bounced / blocked / complained。
  - Vercel production 环境变量修改后未重新部署。

## 速率限制
- 同邮箱: 5 分钟最多 3 次。
- 同 IP: 1 小时最多 10 次。
- 存储方式: 复用 `lib/storage.ts`，优先 Upstash KV；KV 不可用时使用进程内内存 fallback。
- 超限返回: 429。
- 超限文案:
  - `请求过于频繁，请稍后再试。`
  - `リクエストが多すぎます。後ほどお試しください。`

## 登录页用户提示
- 收不到邮件提示: 已在成功发送后和表单底部提示检查收件箱、垃圾箱、广告邮件夹，可稍后重试或切换手机号登录。
- 手机号入口是否可见: 是，邮箱/手机号 tab 始终可见；邮箱错误块也有“使用手机号登录”按钮。

## 公司主体/法律页
- 刺狐合同会社: 已统一补到用户可见法律/订阅位置。
- contact@tebiq.jp: 已保留为联系入口。
- 更新页面:
  - `/tokusho`
  - `/privacy-policy`
  - `/privacy`
  - `/terms`
  - `/pricing` / `/subscribe`
  - `LegalFooter`
  - 登录邮件 footer

## 支付策略
- Stripe: 已有代码骨架，但本轮不接入，不在 pricing/tokusho 里承诺“已支持”。订阅可作为后续优先方案。
- PayPay: 未接入；更适合一次性付款，不适合自动订阅。
- WeChat Pay: 未接入；后续单独研究跨境收单。
- Konbini: 未接入；适合便利店付款，但不等同于自动月订阅。
- 本轮是否接支付: 否。
- 策略文档: `PAYMENT_STRATEGY_NOTE.md`。

## 验证
- npm run lint: 通过。
- npx tsc --noEmit: 通过。
- npm run build: 通过。
- npm run test: 通过。
- local dev no Resend env: mock provider 写入 `.eml` 成功。

## 创始人需要手动测试
1. 用全新邮箱注册。
2. 检查收件箱 / 垃圾箱 / 广告邮件。
3. 确认发件人为 `TEBIQ <noreply@tebiq.jp>`。
4. 点击登录链接能成功登录。
5. 5 分钟内重复请求 4 次，第 4 次应被限流。
