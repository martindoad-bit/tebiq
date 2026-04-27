/**
 * 60 天到期提醒 — 平稳口吻，提示"现在开始时间充裕"。
 *
 * 全部样式 inline（邮件客户端不支持 <style> 表）。中文为主，关键日文术语保留汉字括注。
 * 文末标注「[文案待书士审核]」，正式上线前由书士替换。
 */
export interface VisaExpiry60dData {
  name?: string
  daysLeft: number
  visaType: string
  expiryDate: string
}

const ARCHIVE_URL = 'https://tebiq.jp/my'

const COLORS = {
  brand: '#233B37',
  accent: '#C49A5A',
  bg: '#F6F4EF',
  body: '#46534F',
  card: '#FFFEFA',
} as const

function greet(name?: string): string {
  return name ? `${name} 您好，` : '您好，'
}

export const template = {
  id: 'visa_expiry_60d',
  channel: 'email' as const,
  build(data: VisaExpiry60dData): { subject: string; html: string; text: string } {
    const { name, daysLeft, visaType, expiryDate } = data
    const subject = `在留资格还有 ${daysLeft} 天到期 — 现在开始准备时间充裕`

    const html = `<!doctype html>
<html lang="zh-CN">
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:'PingFang SC','Hiragino Sans','Yu Gothic','Noto Sans CJK SC','Noto Sans SC','Microsoft YaHei',sans-serif;color:${COLORS.body};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border-radius:10px;padding:32px;box-shadow:0 1px 0 rgba(30,28,22,0.035),0 12px 24px rgba(34,42,38,0.06);">
            <tr>
              <td style="font-size:20px;font-weight:600;color:${COLORS.brand};padding-bottom:16px;">
                在留期间还剩 ${daysLeft} 天
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:${COLORS.body};">
                <p style="margin:0 0 12px;">${greet(name)}</p>
                <p style="margin:0 0 12px;">您的<strong style="color:${COLORS.brand};">${visaType}</strong>在留资格将于 <strong>${expiryDate}</strong> 到期，距离今天约 <strong style="color:${COLORS.accent};">${daysLeft} 天</strong>。</p>
                <p style="margin:0 0 12px;">现在开始准备在留期间更新（在留期間更新）时间充裕，无需着急。建议利用这段时间从容地：</p>
                <ul style="margin:0 0 16px;padding-left:20px;">
                  <li style="margin-bottom:6px;">确认所需材料清单（含公司在职证明、纳税证明）</li>
                  <li style="margin-bottom:6px;">向公司人事或会社确认配合时间</li>
                  <li style="margin-bottom:6px;">如更换工作或地址有变，提前梳理变更资料</li>
                </ul>
                <p style="margin:0 0 12px;">完成更新前可凭<strong>受理証明書</strong>继续在日生活；提交后享 2 个月特例期間，请放心。</p>
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
                <p style="margin:8px 0 0;font-size:11px;color:#9CA3AF;">[文案待书士审核]</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`

    const text = `${greet(name)}

您的${visaType}在留资格将于 ${expiryDate} 到期，距离今天约 ${daysLeft} 天。

现在开始准备在留期间更新（在留期間更新）时间充裕，无需着急。建议利用这段时间从容地：
- 确认所需材料清单（含公司在职证明、纳税证明）
- 向公司人事或会社确认配合时间
- 如更换工作或地址有变，提前梳理变更资料

完成更新前可凭受理証明書继续在日生活；提交后享 2 个月特例期間，请放心。

查看我的档案：${ARCHIVE_URL}

—
TEBIQ 在日生活のお守り
陪您稳稳走完每一次更新。

[文案待书士审核]
`

    return { subject, html, text }
  },
}
