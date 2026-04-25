/**
 * 7 天到期提醒 — 紧迫但不引发焦虑，提示"请优先处理"。
 *
 * 文案重点：明确动作 + 安抚（受理証明書 / 特例期間），避免恐慌口吻。
 */
export interface VisaExpiry7dData {
  name?: string
  daysLeft: number
  visaType: string
  expiryDate: string
}

const ARCHIVE_URL = 'https://tebiq.jp/my'

const COLORS = {
  brand: '#1E3A5F',
  accent: '#F6B133',
  bg: '#FFF5E6',
  body: '#4A5563',
  card: '#FFFFFF',
  urgent: '#C24A2D',
} as const

function greet(name?: string): string {
  return name ? `${name} 您好，` : '您好，'
}

export const template = {
  id: 'visa_expiry_7d',
  channel: 'email' as const,
  build(data: VisaExpiry7dData): { subject: string; html: string; text: string } {
    const { name, daysLeft, visaType, expiryDate } = data
    const subject = `【请优先处理】在留资格还剩 ${daysLeft} 天到期`

    const html = `<!doctype html>
<html lang="zh-CN">
  <body style="margin:0;padding:0;background:${COLORS.bg};font-family:'Noto Sans CJK SC','Noto Sans SC','PingFang SC','Microsoft YaHei',sans-serif;color:${COLORS.body};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${COLORS.bg};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${COLORS.card};border-radius:12px;padding:32px;box-shadow:0 2px 8px rgba(30,58,95,0.06);">
            <tr>
              <td style="font-size:13px;color:${COLORS.urgent};font-weight:600;letter-spacing:0.5px;padding-bottom:8px;">请优先处理</td>
            </tr>
            <tr>
              <td style="font-size:22px;font-weight:600;color:${COLORS.brand};padding-bottom:16px;">
                在留期间还剩 ${daysLeft} 天
              </td>
            </tr>
            <tr>
              <td style="font-size:15px;line-height:1.7;color:${COLORS.body};">
                <p style="margin:0 0 12px;">${greet(name)}</p>
                <p style="margin:0 0 12px;">您的<strong style="color:${COLORS.brand};">${visaType}</strong>在留资格将于 <strong>${expiryDate}</strong> 到期，仅剩 <strong style="color:${COLORS.urgent};">${daysLeft} 天</strong>。请将更新申请放在本周首位处理。</p>
                <p style="margin:0 0 8px;font-weight:500;color:${COLORS.brand};">今明两天建议完成：</p>
                <ul style="margin:0 0 16px;padding-left:20px;">
                  <li style="margin-bottom:6px;">备齐申请书 + 照片 + 在留卡 + 护照</li>
                  <li style="margin-bottom:6px;">备齐公司材料（在职证明、源泉徴収票、纳税证明）</li>
                  <li style="margin-bottom:6px;">就近预约入管局窗口或当日整理券</li>
                </ul>
                <p style="margin:0 0 12px;">如确实来不及递交：在到期日前提交即可，受理后会拿到<strong>受理証明書</strong>，自动延长 <strong>2 个月特例期間</strong>，期间在日身份合法、可正常工作生活。请勿担心。</p>
                <p style="margin:0 0 12px;">若材料缺失或案情复杂，建议立刻联系书士。</p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:8px 0 24px;">
                <a href="${ARCHIVE_URL}" style="display:inline-block;background:${COLORS.brand};color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:500;padding:12px 28px;border-radius:8px;">查看我的档案</a>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #E6EEF5;padding-top:16px;font-size:13px;color:#6B7280;line-height:1.6;">
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

    const text = `【请优先处理】

${greet(name)}

您的${visaType}在留资格将于 ${expiryDate} 到期，仅剩 ${daysLeft} 天。请将更新申请放在本周首位处理。

今明两天建议完成：
- 备齐申请书 + 照片 + 在留卡 + 护照
- 备齐公司材料（在职证明、源泉徴収票、纳税证明）
- 就近预约入管局窗口或当日整理券

如确实来不及递交：在到期日前提交即可，受理后会拿到受理証明書，自动延长 2 个月特例期間，期间在日身份合法、可正常工作生活。请勿担心。

若材料缺失或案情复杂，建议立刻联系书士。

查看我的档案：${ARCHIVE_URL}

—
TEBIQ 在日生活のお守り
陪您稳稳走完每一次更新。

[文案待书士审核]
`

    return { subject, html, text }
  },
}
