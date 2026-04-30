/**
 * 邮箱登录 magic link — 单次链接，10 分钟有效。
 */
export interface LoginMagicLinkData {
  loginUrl: string
}

const COLORS = {
  brand: '#0F2544',
  bg: '#F7F8FA',
  body: '#334155',
  muted: '#64748B',
  card: '#FFFFFF',
  line: '#E2E8F0',
} as const

export const template = {
  id: 'login_magic_link',
  channel: 'email' as const,
  build(data: LoginMagicLinkData): { subject: string; html: string; text: string } {
    const subject = 'TEBIQ ログインリンク / TEBIQ 登录链接'
    const html = `<!doctype html>
<html lang="ja">
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans CJK JP','Noto Sans CJK SC','Noto Sans JP','Noto Sans SC',sans-serif;color:${COLORS.body};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border:1px solid ${COLORS.line};border-radius:10px;padding:32px;">
            <tr>
              <td style="font-size:18px;font-weight:600;color:${COLORS.brand};padding-bottom:20px;">TEBIQ ログインリンク / TEBIQ 登录链接</td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.8;color:${COLORS.body};">
                <p style="margin:0 0 4px;">TEBIQへのログインリンクです。</p>
                <p style="margin:0 0 16px;">このリンクは10分間有効です。</p>
              </td>
            </tr>
            <tr>
              <td align="left" style="padding:0 0 24px;">
                <a href="${data.loginUrl}" style="display:inline-block;background:${COLORS.brand};color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;">ログイン</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:14px;line-height:1.8;color:${COLORS.body};">
                <p style="margin:0 0 4px;">这是 TEBIQ 的登录链接。</p>
                <p style="margin:0 0 16px;">链接10分钟内有效。</p>
              </td>
            </tr>
            <tr>
              <td align="left" style="padding:0 0 24px;">
                <a href="${data.loginUrl}" style="display:inline-block;background:${COLORS.brand};color:#FFFFFF;text-decoration:none;font-size:14px;font-weight:600;padding:12px 28px;border-radius:8px;">登录</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;color:${COLORS.muted};line-height:1.7;border-top:1px solid ${COLORS.line};padding-top:16px;">
                <p style="margin:0 0 8px;">このメールに心当たりがない場合は無視してください。</p>
                <p style="margin:0 0 16px;">如果你没有请求登录，请忽略此邮件。</p>
                <p style="margin:0 0 6px;word-break:break-all;color:${COLORS.brand};">${data.loginUrl}</p>
                <p style="margin:16px 0 0;">TEBIQ<br />https://tebiq.jp</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

    const text = `TEBIQ ログインリンク / TEBIQ 登录链接

【日本語】
TEBIQへのログインリンクです。
このリンクは10分間有効です。

ログイン:
${data.loginUrl}

このメールに心当たりがない場合は無視してください。

【中文】
这是 TEBIQ 的登录链接。
链接10分钟内有效。

登录:
${data.loginUrl}

如果你没有请求登录，请忽略此邮件。

TEBIQ
https://tebiq.jp
`

    return { subject, html, text }
  },
}
