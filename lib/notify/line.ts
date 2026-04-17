export async function sendLineMessage(userId: string, message: string): Promise<void> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  if (!token) {
    console.warn('LINE_CHANNEL_ACCESS_TOKEN not set, skipping notification')
    return
  }

  await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: 'text', text: message }],
    }),
  })
}

export async function notifyPaymentSuccess(sessionId: string, visaType: string): Promise<void> {
  const adminId = process.env.LINE_ADMIN_USER_ID
  if (!adminId) return
  await sendLineMessage(adminId, `✅ 支払い完了\nセッション: ${sessionId}\nビザ種別: ${visaType}`)
}

export async function notifyReferralRequest(
  sessionId: string,
  visaType: string,
  reason: string
): Promise<void> {
  const adminId = process.env.LINE_ADMIN_USER_ID
  if (!adminId) return
  await sendLineMessage(
    adminId,
    `📋 書士相談申込\nセッション: ${sessionId}\nビザ: ${visaType}\n理由: ${reason}`
  )
}
