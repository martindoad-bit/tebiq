# RESEND_INTEGRATION_REPORT

最后更新: 2026-04-29T09:55:40Z

## 完成情况

- 已接入 Resend SDK。`RESEND_API_KEY` 存在时走 Resend 真实发送；本地未配置时保留 mock/dev-login fallback。
- magic link 有效期从 7 分钟改为 10 分钟。
- 邮件发件人从环境变量读取:
  - `RESEND_FROM_EMAIL`
  - `RESEND_FROM_NAME`
- 生产环境如果没有 `RESEND_API_KEY`，发送会失败并记录 Resend 错误，不会回退到 dev mode。
- 邮件模板已改为日中双语 HTML + plaintext fallback。
- Resend API 失败时，server log 记录错误 code/message；用户看到:
  - `发送失败，请稍后重试 / 送信に失敗しました。後ほどお試しください`
- magic link 发送限流:
  - 同一邮箱 5 分钟最多 3 次
  - 同一 IP 1 小时最多 10 次
  - 超限返回 429 + `Retry-After`

## 邮件模板

- 主题: `TEBIQ ログインリンク / TEBIQ 登录链接`
- 日文:
  - `TEBIQへのログインリンクです。`
  - `このリンクは10分間有効です。`
  - CTA: `ログイン`
- 中文:
  - `点击下方按钮登录 TEBIQ。`
  - `链接10分钟内有效。`
  - CTA: `登录`
- 底部:
  - `TEBIQ`
  - `https://tebiq.jp`

## 验证

- `npm run lint` 通过。
- `npx tsc --noEmit` 通过。
- `npm run build` 通过。
- `npm run test` 通过。
- 限流函数本地直测: 同邮箱第 1-3 次允许，第 4 次返回 email scope 429 结果。
- Preview deployment 已生成并 Ready:
  - `https://tebiq-bajbz3ytv-martindoad.vercel.app`
  - alias: `https://tebiq-git-chore-resend-integration-martindoad.vercel.app`
- Preview 当前启用了 Vercel Deployment Protection；未取得 bypass 的普通请求返回 401。因此真实收件、点击链接、Gmail/iCloud 投递位置需要创始人用受信任访问方式或 merge 前测试链接验证。

## 待创始人验证

创始人请用一个全新邮箱（不是已注册账号）测试：

- 5分钟内应该收到邮件
- 来自 `TEBIQ <noreply@tebiq.jp>`
- 检查 Gmail/iCloud 的收件箱 + 垃圾箱 + 广告箱
- 截图反馈

## 风险 / 待 review

- 限流使用现有 `lib/storage.ts`。生产如配置了 Vercel KV，则跨实例生效；未配置 KV 时使用单实例内存 fallback。
- 端到端“邮件是否进 Gmail 垃圾箱”需要创始人用真实邮箱确认。
