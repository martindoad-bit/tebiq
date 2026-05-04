import { notFound } from 'next/navigation'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import PreviewClient from './PreviewClient'

// /internal/preview — Track D User Preview Alpha (Issue #21).
//
// Internal-only entry point that lets product owner / CEO quickly
// trigger the existing answer flow against high-risk P0 scenarios
// or free-form input. Submits to the existing POST /api/questions
// route (untouched) and redirects to /answer/{id} for the full
// reviewer experience.
//
// Per Work Packet: this page does NOT embed answers, change Prompts,
// modify routing, or alter the answer page UI. Only an entry point.
//
// Server-component wrapper: env gate runs at request time. When
// EVAL_LAB_ENABLED is not '1' the page does not exist (404). The
// page is intentionally NOT linked from any user navigation; access
// is by direct URL only.

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'User Preview · TEBIQ Internal',
  // robots: noindex — internal tool, never want this in search.
  robots: { index: false, follow: false },
}

export default function InternalPreviewPage() {
  if (!isEvalLabEnabled()) {
    notFound()
  }
  return <PreviewClient />
}
