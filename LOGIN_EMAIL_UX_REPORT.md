# Login Email UX Report

## 基线

- branch: `codex/login-email-ux-polish`
- base: `origin/codex/auth-intake-production`
- scope: `/login` visual and microcopy only

## 修改内容

- 邮箱和手机号入口保持同级可见，顶部说明改为「邮箱和手机号都可以登录」。
- 邮箱提交成功后增加明确说明：
  - 请检查收件箱、垃圾箱、广告邮件夹。
  - 链接有效期 10 分钟。
  - 没有收到时，可以重新发送。
- 发送成功后主按钮从「发送登录链接」变为「重新发送登录链接」。
- 邮件发送失败状态改成克制提示：
  - 标题：邮件发送未完成
  - 正文保留后端返回的失败原因或通用失败文案
  - 保留「改用手机号登录」入口
- 没有改认证 API、跳转逻辑、Resend 调用逻辑。

## 截图

目录：`docs/visual-report/screenshots/login-email-ux/`

- 320: `320-login-initial.png`, `320-login-email-sent.png`
- 375: `375-login-initial.png`, `375-login-email-sent.png`
- 393: `393-login-initial.png`, `393-login-email-sent.png`
- 430: `430-login-initial.png`, `430-login-email-sent.png`
- 768: `768-login-initial.png`, `768-login-email-sent.png`

## 验证

- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed

## 未修改

- `app/api/**`
- 认证逻辑
- Resend 发送逻辑
- 数据库 / migration
- Stripe / Bedrock / notification 逻辑
