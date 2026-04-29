import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { Resend } from 'resend'

const DEFAULT_FROM_EMAIL = 'noreply@tebiq.jp'
const DEFAULT_FROM_NAME = 'TEBIQ'

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
  if (process.env.RESEND_API_KEY) return 'resend'
  if (process.env.NODE_ENV === 'production') return 'resend'
  return 'mock'
}

function mockDir(): string {
  return process.env.MOCK_EMAIL_DIR ?? path.join('/tmp', 'tebiq-notification-emails')
}

function safePart(value: string): string {
  return value.replace(/[^a-zA-Z0-9_.-]+/g, '_').slice(0, 80)
}

function sender(): string {
  const email = (process.env.RESEND_FROM_EMAIL ?? DEFAULT_FROM_EMAIL)
    .trim()
    .replace(/[\r\n<>]/g, '')
  const name = (process.env.RESEND_FROM_NAME ?? DEFAULT_FROM_NAME)
    .trim()
    .replace(/["\r\n]/g, '')
  return `${name || DEFAULT_FROM_NAME} <${email || DEFAULT_FROM_EMAIL}>`
}

async function sendMockEmail(input: EmailInput): Promise<EmailOutcome> {
  const dir = mockDir()
  await mkdir(dir, { recursive: true })
  const file = path.join(
    dir,
    `${new Date().toISOString().replace(/[:.]/g, '-')}_${safePart(input.to)}.eml`,
  )
  const body = [
    `From: ${sender()}`,
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
    console.error('[resend.email] send failed', {
      code: 'missing_api_key',
      message: 'RESEND_API_KEY is not configured',
    })
    return { ok: false, provider: 'resend', error: 'RESEND_API_KEY not set' }
  }

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: sender(),
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    })
    if (result.error) {
      const error = result.error as { name?: string; code?: string; message?: string }
      const code = error.code ?? error.name ?? 'resend_error'
      const message = error.message ?? 'resend error'
      console.error('[resend.email] send failed', { code, message })
      return { ok: false, provider: 'resend', error: `${code}: ${message}` }
    }
    return { ok: true, provider: 'resend', id: result.data?.id }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e)
    console.error('[resend.email] send failed', {
      code: 'resend_exception',
      message,
    })
    return {
      ok: false,
      provider: 'resend',
      error: message,
    }
  }
}

export async function sendEmail(input: EmailInput): Promise<EmailOutcome> {
  const provider = emailProvider()
  if (provider === 'mock') return await sendMockEmail(input)
  return await sendResendEmail(input)
}
