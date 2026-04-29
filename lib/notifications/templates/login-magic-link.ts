/**
 * 邮箱登录 magic link — 单次链接，10 分钟有效。
 */
export interface LoginMagicLinkData {
  loginUrl: string
}

const COLORS = {
  ink: '#0F2544',
  border: '#D7DEE8',
  bg: '#F7F8FA',
  body: '#3F4A5A',
  muted: '#6B7280',
  card: '#FFFFFF',
} as const

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export const template = {
  id: 'login_magic_link',
  channel: 'email' as const,
  build(data: LoginMagicLinkData): { subject: string; html: string; text: string } {
    const subject = 'TEBIQ ログインリンク / TEBIQ 登录链接'
    const loginUrl = escapeHtml(data.loginUrl)
    const buttonStyle = [
      'display:inline-block',
      `background:${COLORS.ink}`,
      'color:#FFFFFF',
      'text-decoration:none',
      'font-size:15px',
      'font-weight:600',
      'line-height:1',
      'padding:13px 28px',
      'border-radius:6px',
    ].join(';')

    const html = `<!doctype html>
<html lang="ja">
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:-apple-system,BlinkMacSystemFont,'Noto Sans CJK JP','Noto Sans CJK SC','Hiragino Sans','Yu Gothic','PingFang SC','Microsoft YaHei',sans-serif;color:${COLORS.body};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border:1px solid ${COLORS.border};border-radius:8px;padding:32px;">
            <tr>
              <td style="font-size:18px;font-weight:600;color:${COLORS.ink};padding-bottom:22px;">TEBIQ ログインリンク / TEBIQ 登录链接</td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.75;color:${COLORS.body};padding-bottom:20px;">
                <p style="margin:0 0 6px;font-weight:600;color:${COLORS.ink};">【日本語】</p>
                <p style="margin:0 0 6px;">TEBIQへのログインリンクです。</p>
                <p style="margin:0 0 16px;">このリンクは10分間有効です。</p>
                <p style="margin:0 0 16px;"><a href="${loginUrl}" style="${buttonStyle}">ログイン</a></p>
                <p style="margin:0;">このメールに心当たりがない場合は無視してください。</p>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid ${COLORS.border};font-size:15px;line-height:1.75;color:${COLORS.body};padding:20px 0;">
                <p style="margin:0 0 6px;font-weight:600;color:${COLORS.ink};">【中文】</p>
                <p style="margin:0 0 6px;">点击下方按钮登录 TEBIQ。</p>
                <p style="margin:0 0 16px;">链接10分钟内有效。</p>
                <p style="margin:0 0 16px;"><a href="${loginUrl}" style="${buttonStyle}">登录</a></p>
                <p style="margin:0;">如果你没有请求登录，请忽略此邮件。</p>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid ${COLORS.border};padding-top:18px;font-size:12px;color:${COLORS.muted};line-height:1.6;">
                <p style="margin:0 0 8px;word-break:break-all;">${loginUrl}</p>
                <p style="margin:0;">TEBIQ</p>
                <p style="margin:0;">https://tebiq.jp</p>
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
${data.loginUrl}
このメールに心当たりがない場合は無視してください。

【中文】
点击下方按钮登录 TEBIQ。
链接10分钟内有效。
${data.loginUrl}
如果你没有请求登录，请忽略此邮件。

TEBIQ
https://tebiq.jp
`

    return { subject, html, text }
  },
}
