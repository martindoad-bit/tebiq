/**
 * 邮箱登录 magic link — 单次链接，7 分钟有效。
 */
export interface LoginMagicLinkData {
  loginUrl: string
}

const COLORS = {
  brand: '#1E3A5F',
  accent: '#F6B133',
  bg: '#FFF5E6',
  body: '#4A5563',
  card: '#FFFFFF',
} as const

export const template = {
  id: 'login_magic_link',
  channel: 'email' as const,
  build(data: LoginMagicLinkData): { subject: string; html: string; text: string } {
    const subject = '登录 TEBIQ'
    const html = `<!doctype html>
<html lang="zh-CN">
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:'Noto Sans CJK SC','Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif;color:${COLORS.body};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(30,58,95,0.06);">
            <tr>
              <td style="font-size:20px;font-weight:600;color:${COLORS.brand};padding-bottom:8px;">登录 TEBIQ</td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:${COLORS.body};">
                <p style="margin:0 0 12px;">点击下面的按钮登录。没有账号的话，会自动为你创建一个账号。</p>
                <p style="margin:0 0 12px;font-size:13px;color:#6B7280;">链接 7 分钟内有效，只能使用一次。</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:16px 0 24px;">
                <a href="${data.loginUrl}" style="display:inline-block;background:${COLORS.brand};color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:500;padding:12px 28px;border-radius:8px;">登录 / 注册</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;color:#6B7280;line-height:1.6;">
                <p style="margin:0 0 6px;">如果按钮无法点击，请复制这个链接到浏览器：</p>
                <p style="margin:0 0 12px;word-break:break-all;color:${COLORS.brand};">${data.loginUrl}</p>
                <p style="margin:0;">如果这不是你本人操作，请忽略本邮件。</p>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #E6EEF5;padding-top:16px;margin-top:16px;font-size:13px;color:#6B7280;line-height:1.6;">
                <p style="margin:0 0 4px;">TEBIQ 在日生活のお守り</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

    const text = `登录 TEBIQ

点击下面的链接登录。没有账号的话，会自动为你创建一个账号。

${data.loginUrl}

链接 7 分钟内有效，只能使用一次。

如果这不是你本人操作，请忽略本邮件。

—
TEBIQ 在日生活のお守り
`

    return { subject, html, text }
  },
}
