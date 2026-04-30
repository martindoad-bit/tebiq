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
  const configured = process.env.NOTIFICATION_EMAIL_CHANNEL
  if (configured === 'resend') return 'resend'
  if (configured === 'mock' && process.env.NODE_ENV !== 'production') return 'mock'
  if (process.env.RESEND_API_KEY) return 'resend'
  return process.env.NODE_ENV === 'production' ? 'resend' : 'mock'
}

function mockDir(): string {
  return process.env.MOCK_EMAIL_DIR ?? path.join('/tmp', 'tebiq-notification-emails')
}

function safePart(value: string): string {
  return value.replace(/[^a-zA-Z0-9_.-]+/g, '_').slice(0, 80)
}

function fromAddress(): string {
  const email = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL
  const name = process.env.RESEND_FROM_NAME?.trim() || DEFAULT_FROM_NAME
  return `${name} <${email}>`
}

function emailErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object') return String(error)
  const source = error as {
    code?: unknown
    name?: unknown
    message?: unknown
    statusCode?: unknown
  }
  const label = source.code ?? source.statusCode ?? source.name ?? 'email_error'
  const message = source.message ?? 'unknown email error'
  return `${String(label)}: ${String(message)}`
}

async function sendMockEmail(input: EmailInput): Promise<EmailOutcome> {
  const dir = mockDir()
  await mkdir(dir, { recursive: true })
  const file = path.join(
    dir,
    `${new Date().toISOString().replace(/[:.]/g, '-')}_${safePart(input.to)}.eml`,
  )
  const body = [
    `From: ${fromAddress()}`,
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
      from: fromAddress(),
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    })
    if (result.error) {
      return { ok: false, provider: 'resend', error: emailErrorMessage(result.error) }
    }
    return { ok: true, provider: 'resend', id: result.data?.id }
  } catch (e) {
    return {
      ok: false,
      provider: 'resend',
      error: emailErrorMessage(e),
    }
  }
}

export async function sendEmail(input: EmailInput): Promise<EmailOutcome> {
  const provider = emailProvider()
  if (provider === 'mock') return await sendMockEmail(input)
  return await sendResendEmail(input)
}
