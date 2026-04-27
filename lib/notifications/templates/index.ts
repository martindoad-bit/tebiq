/**
 * Notification template registry.
 *
 * Each template module exports `template` with a stable string `id`,
 * a `channel`, and a `build(data)` that returns { subject, html, text }.
 * `data` is intentionally `unknown` at the registry boundary — the call
 * site (sender / cron) is responsible for passing the right shape.
 *
 * Add new templates here. The registry is what `lib/notifications/sender.ts`
 * looks up by `templateId`, so any new template lands automatically.
 */
import { template as visaExpiry60d } from './visa_expiry_60d'
import { template as visaExpiry30d } from './visa_expiry_30d'
import { template as visaExpiry7d } from './visa_expiry_7d'
import { template as emailVerification } from './email_verification'

export type NotifChannel = 'email' | 'sms' | 'app_push' | 'line'

export interface RenderedTemplate {
  subject: string
  html: string
  text: string
}

export interface Template {
  id: string
  channel: NotifChannel
  build(data: Record<string, unknown>): RenderedTemplate
}

// Cast to the loose `Template` shape — each module gives `build` a typed
// data parameter for IDE help, but the registry has to accept any payload.
export const templates: Record<string, Template> = {
  [visaExpiry60d.id]: visaExpiry60d as unknown as Template,
  [visaExpiry30d.id]: visaExpiry30d as unknown as Template,
  [visaExpiry7d.id]: visaExpiry7d as unknown as Template,
  [emailVerification.id]: emailVerification as unknown as Template,
}

export function getTemplate(id: string): Template | null {
  return templates[id] ?? null
}
