import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { Resend } from 'resend'

const FROM = 'TEBIQ <noreply@tebiq.jp>'

export interface EmailInput {
  to: string
  subject: string
  html: string
  text: string
}

export type EmailOutcome =
  | { ok: true; provider: 'mock' | 'resend'; id?: string; file?: string }
  | { ok: false; provider: 'mock' | 'resend'; error: string }

function emailProvider(): 'mock' | 'resend' {
  const configured = process.env.NOTIFICATION_EMAIL_CHANNEL
  if (configured === 'mock' || configured === 'resend') return configured
  return process.env.RESEND_API_KEY ? 'resend' : 'mock'
}

function mockDir(): string {
  return process.env.MOCK_EMAIL_DIR ?? path.join('/tmp', 'tebiq-notification-emails')
}

function safePart(value: string): string {
  return value.replace(/[^a-zA-Z0-9_.-]+/g, '_').slice(0, 80)
}

async function sendMockEmail(input: EmailInput): Promise<EmailOutcome> {
  const dir = mockDir()
  await mkdir(dir, { recursive: true })
  const file = path.join(
    dir,
    `${new Date().toISOString().replace(/[:.]/g, '-')}_${safePart(input.to)}.eml`,
  )
  const body = [
    `From: ${FROM}`,
    `To: ${input.to}`,
    `Subject: ${input.subject}`,
    'Content-Type: text/html; charset=utf-8',
    '',
    input.html,
    '',
    '--- text/plain ---',
    input.text,
  ].join('\n')
  await writeFile(file, body, 'utf8')
  console.info(`[mock-email] to=${input.to} subject="${input.subject}" file=${file}`)
  return { ok: true, provider: 'mock', file }
}

async function sendResendEmail(input: EmailInput): Promise<EmailOutcome> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { ok: false, provider: 'resend', error: 'RESEND_API_KEY not set' }
  }

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: FROM,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    })
    if (result.error) {
      return { ok: false, provider: 'resend', error: result.error.message ?? 'resend error' }
    }
    return { ok: true, provider: 'resend', id: result.data?.id }
  } catch (e) {
    return {
      ok: false,
      provider: 'resend',
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

export async function sendEmail(input: EmailInput): Promise<EmailOutcome> {
  const provider = emailProvider()
  if (provider === 'mock') return await sendMockEmail(input)
  return await sendResendEmail(input)
}
