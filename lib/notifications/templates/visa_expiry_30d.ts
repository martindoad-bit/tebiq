/**
 * 30 天到期提醒 — 友善但明确，提示"请尽快开始准备材料"。
 */
export interface VisaExpiry30dData {
  name?: string
  daysLeft: number
  visaType: string
  expiryDate: string
}

const ARCHIVE_URL = 'https://tebiq.jp/my'

const COLORS = {
  brand: '#18324A',
  accent: '#E56F4F',
  bg: '#FAF7F1',
  body: '#46534F',
  card: '#FFFFFF',
  warn: '#E56F4F',
} as const

function greet(name?: string): string {
  return name ? `${name} 您好，` : '您好，'
}

export const template = {
  id: 'visa_expiry_30d',
  channel: 'email' as const,
  build(data: VisaExpiry30dData): { subject: string; html: string; text: string } {
    const { name, daysLeft, visaType, expiryDate } = data
    const subject = `在留资格还剩 ${daysLeft} 天 — 请尽快开始准备材料`

    const html = `<!doctype html>
<html lang="zh-CN">
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:'PingFang SC','Hiragino Sans','Yu Gothic','Noto Sans CJK SC','Noto Sans SC','Microsoft YaHei',sans-serif;color:${COLORS.body};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border-radius:10px;padding:32px;box-shadow:0 1px 0 rgba(30,28,22,0.035),0 12px 24px rgba(24,50,74,0.08);">
            <tr>
              <td style="font-size:20px;font-weight:600;color:${COLORS.brand};padding-bottom:8px;">
                在留期间还剩 ${daysLeft} 天
              </td>
            </tr>
            <tr>
              <td style="font-size:13px;color:${COLORS.warn};padding-bottom:12px;font-weight:500;">建议本周开始着手准备</td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:${COLORS.body};">
                <p style="margin:0 0 12px;">${greet(name)}</p>
                <p style="margin:0 0 12px;">您的<strong style="color:${COLORS.brand};">${visaType}</strong>在留资格将于 <strong>${expiryDate}</strong> 到期，目前还剩 <strong style="color:${COLORS.warn};">${daysLeft} 天</strong>。请尽快开始准备在留期间更新（在留期間更新）所需材料。</p>
                <p style="margin:0 0 8px;">本周建议完成：</p>
                <ul style="margin:0 0 16px;padding-left:20px;">
                  <li style="margin-bottom:6px;">向公司申请在职证明、源泉徴収票</li>
                  <li style="margin-bottom:6px;">在便民店或市役所拿到住民票、纳税证明</li>
                  <li style="margin-bottom:6px;">填写申请书草稿，确认照片、护照、在留卡复印件齐全</li>
                </ul>
                <p style="margin:0 0 12px;">如有材料不齐或案情复杂，建议尽早预约专家咨询，避免临近到期才奔波。</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 0 24px;">
                <a href="${ARCHIVE_URL}" style="display:inline-block;background:${COLORS.brand};color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:500;padding:12px 28px;border-radius:8px;">查看我的档案</a>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #DDE3DE;padding-top:16px;font-size:13px;color:#707A75;line-height:1.6;">
                <p style="margin:0 0 4px;">TEBIQ 在日生活のお守り</p>
                <p style="margin:0 0 4px;">陪您稳稳走完每一次更新。</p>
                <p style="margin:8px 0 0;font-size:11px;color:#9CA3AF;"></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

    const text = `${greet(name)}

您的${visaType}在留资格将于 ${expiryDate} 到期，目前还剩 ${daysLeft} 天。请尽快开始准备在留期间更新（在留期間更新）所需材料。

本周建议完成：
- 向公司申请在职证明、源泉徴収票
- 在便民店或市役所拿到住民票、纳税证明
- 填写申请书草稿，确认照片、护照、在留卡复印件齐全

如有材料不齐或案情复杂，建议尽早预约专家咨询，避免临近到期才奔波。

查看我的档案：${ARCHIVE_URL}

—
TEBIQ 在日生活のお守り
陪您稳稳走完每一次更新。
`

    return { subject, html, text }
  },
}
