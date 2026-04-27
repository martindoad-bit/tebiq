/**
 * 邮箱验证邮件 — 单次链接，24h 失效。
 * 简短、不夸张；告诉用户为什么需要验证（避免假邮箱接收提醒导致漏看到期）。
 */
export interface EmailVerificationData {
  name?: string
  /** 完整可点击链接，例如 https://tebiq.jp/api/account/email/verify?token=xxx */
  verifyUrl: string
}

const COLORS = {
  brand: '#18324A',
  accent: '#E56F4F',
  bg: '#FAF7F1',
  body: '#46534F',
  card: '#FFFFFF',
} as const

function greet(name?: string): string {
  return name ? `${name} 您好，` : '您好，'
}

export const template = {
  id: 'email_verification',
  channel: 'email' as const,
  build(data: EmailVerificationData): { subject: string; html: string; text: string } {
    const { name, verifyUrl } = data
    const subject = '请确认你的 TEBIQ 提醒邮箱'

    const html = `<!doctype html>
<html lang="zh-CN">
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:'PingFang SC','Hiragino Sans','Yu Gothic','Noto Sans CJK SC','Noto Sans SC','Microsoft YaHei',sans-serif;color:${COLORS.body};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border-radius:10px;padding:32px;box-shadow:0 1px 0 rgba(30,28,22,0.035),0 12px 24px rgba(24,50,74,0.08);">
            <tr>
              <td style="font-size:20px;font-weight:600;color:${COLORS.brand};padding-bottom:8px;">
                确认你的提醒邮箱
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:${COLORS.body};">
                <p style="margin:0 0 12px;">${greet(name)}</p>
                <p style="margin:0 0 12px;">收到这封邮件意味着你在 TEBIQ 把这个邮箱设为了在留期限、住民税等提醒的接收地址。请点击下面的按钮确认是你本人。</p>
                <p style="margin:0 0 12px;font-size:13px;color:#707A75;">链接 24 小时内有效，验证完成后我们才会向这个邮箱发送提醒。</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:16px 0 24px;">
                <a href="${verifyUrl}" style="display:inline-block;background:${COLORS.brand};color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:500;padding:12px 28px;border-radius:8px;">确认邮箱</a>
              </td>
            </tr>
            <tr>
              <td style="font-size:12px;color:#707A75;line-height:1.6;">
                <p style="margin:0 0 6px;">如果按钮无法点击，请把以下链接复制到浏览器：</p>
                <p style="margin:0 0 12px;word-break:break-all;color:${COLORS.brand};">${verifyUrl}</p>
                <p style="margin:0;">如果这不是你本人操作，请忽略本邮件 — 你的邮箱不会被绑定到 TEBIQ。</p>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #DDE3DE;padding-top:16px;margin-top:16px;font-size:13px;color:#707A75;line-height:1.6;">
                <p style="margin:0 0 4px;">TEBIQ 在日生活のお守り</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

    const text = `${greet(name)}

收到这封邮件意味着你在 TEBIQ 把这个邮箱设为了在留期限、住民税等提醒的接收地址。请点击下面的链接确认是你本人。

确认邮箱：${verifyUrl}

链接 24 小时内有效，验证完成后我们才会向这个邮箱发送提醒。

如果这不是你本人操作，请忽略本邮件 — 你的邮箱不会被绑定到 TEBIQ。

—
TEBIQ 在日生活のお守り
`

    return { subject, html, text }
  },
}
