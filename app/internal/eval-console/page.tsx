import { notFound } from 'next/navigation'
import { isEvalLabEnabled } from '@/lib/eval-lab/auth'
import EvalConsoleClient from './EvalConsoleClient'

// /internal/eval-console — M1 Internal Console v1 (Issue #19)
//
// Read-only status overview of the 100-question Eval Lab seed pack.
// Internal team uses this to see who passed / failed / fell back. Reuses
// the existing /api/internal/eval-lab/state endpoint and the existing
// per-question rerun POST routes; no new API surface, no DB schema
// change.
//
// Server-component wrapper: env gate runs at request time. When
// EVAL_LAB_ENABLED is not '1' the page does not exist (404). The page
// is intentionally NOT linked from any user navigation; access is by
// direct URL only.

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Eval Console · TEBIQ Internal',
  // robots: noindex — internal tool, never want this in search.
  robots: { index: false, follow: false },
}

export default function EvalConsolePage() {
  if (!isEvalLabEnabled()) {
    notFound()
  }
  return <EvalConsoleClient />
}
