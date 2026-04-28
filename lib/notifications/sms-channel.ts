export type SmsOutcome =
  | { ok: true; provider: 'mock' | 'twilio'; id?: string }
  | { ok: false; provider: 'mock' | 'twilio' | 'none'; error: string }

function hasTwilioConfig(): boolean {
  return !!(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    (process.env.TWILIO_MESSAGING_SERVICE_SID || process.env.TWILIO_FROM_NUMBER)
  )
}

async function sendTwilioSms(input: {
  to: string
  body: string
}): Promise<SmsOutcome> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  if (!accountSid || !authToken) {
    return { ok: false, provider: 'twilio', error: 'TWILIO_ACCOUNT_SID or TWILIO_AUTH_TOKEN not set' }
  }

  const form = new URLSearchParams()
  form.set('To', input.to)
  form.set('Body', input.body)
  if (process.env.TWILIO_MESSAGING_SERVICE_SID) {
    form.set('MessagingServiceSid', process.env.TWILIO_MESSAGING_SERVICE_SID)
  } else if (process.env.TWILIO_FROM_NUMBER) {
    form.set('From', process.env.TWILIO_FROM_NUMBER)
  } else {
    return { ok: false, provider: 'twilio', error: 'Twilio sender not set' }
  }

  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64')
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    },
  )
  const data = await res.json().catch(() => null) as { sid?: string; message?: string } | null
  if (!res.ok) {
    return {
      ok: false,
      provider: 'twilio',
      error: data?.message ?? `Twilio returned ${res.status}`,
    }
  }
  return { ok: true, provider: 'twilio', id: data?.sid }
}

export async function sendSms(input: { to: string; body: string }): Promise<SmsOutcome> {
  if (process.env.SMS_PROVIDER === 'twilio' || hasTwilioConfig()) {
    return await sendTwilioSms(input)
  }

  if (process.env.NODE_ENV !== 'production') {
    console.info(`[mock-sms] to=${input.to} body="${input.body}"`)
    return { ok: true, provider: 'mock' }
  }

  return { ok: false, provider: 'none', error: 'SMS provider not configured' }
}
